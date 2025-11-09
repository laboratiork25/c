import axios from 'axios'
import cheerio from 'cheerio'

const COMMON_SITES = [
  { name: 'GitHub', url: 'https://github.com/{u}' },
  { name: 'Twitter', url: 'https://twitter.com/{u}' },
  { name: 'X (twitter.com)', url: 'https://twitter.com/{u}' },
  { name: 'Instagram', url: 'https://www.instagram.com/{u}/' },
  { name: 'Facebook', url: 'https://www.facebook.com/{u}' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@{u}' },
  { name: 'YouTube (channel)', url: 'https://www.youtube.com/@{u}' },
  { name: 'Pinterest', url: 'https://www.pinterest.com/{u}/' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/{u}' },
  { name: 'Reddit', url: 'https://www.reddit.com/user/{u}' },
  { name: 'Medium', url: 'https://medium.com/@{u}' },
  { name: 'StackOverflow', url: 'https://stackoverflow.com/users/{u}' },
  { name: 'GitLab', url: 'https://gitlab.com/{u}' },
  { name: 'Dribbble', url: 'https://dribbble.com/{u}' },
  { name: 'Behance', url: 'https://www.behance.net/{u}' },
  { name: 'SoundCloud', url: 'https://soundcloud.com/{u}' },
  { name: 'Twitch', url: 'https://www.twitch.tv/{u}' },
  { name: 'Flickr', url: 'https://www.flickr.com/people/{u}/' },
  { name: 'Product Hunt', url: 'https://www.producthunt.com/@{u}' },
  { name: 'Goodreads', url: 'https://www.goodreads.com/{u}' },
  { name: 'Imgur', url: 'https://imgur.com/user/{u}' },
  { name: 'Pinterest (alt)', url: 'https://pinterest.com/{u}/' },
  { name: 'Discourse', url: 'https://{u}.discourse.group/' }
]

const CACHE_TTL = 1000 * 60 * 60
const MAX_BATCH = 6
const REQUEST_TIMEOUT = 10000

const memoryCache = new Map()

function now() {
  return Date.now()
}

function getCached(key) {
  const e = memoryCache.get(key)
  if (!e) return null
  if (now() - e.ts > CACHE_TTL) {
    memoryCache.delete(key)
    return null
  }
  return e.value
}

function setCached(key, value) {
  memoryCache.set(key, { ts: now(), value })
}

async function probeUrl(url) {
  try {
    const res = await axios.get(url, {
      timeout: REQUEST_TIMEOUT,
      maxRedirects: 5,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; UsernameFinder/1.0)'
      },
      validateStatus: status => status < 600
    })
    return { status: res.status, data: res.data, headers: res.headers }
  } catch (e) {
    if (e.response) return { status: e.response.status, data: e.response.data, headers: e.response.headers }
    return { error: e.message || 'network error' }
  }
}

function extractHandlesFromHtml(html, baseUrl) {
  const $ = cheerio.load(html || '')
  const found = new Set()
  $('a[href]').each((i, el) => {
    const href = $(el).attr('href')
    if (!href) return
    const clean = href.split('?')[0].split('#')[0]
    const patterns = [
      /twitter\.com\/([A-Za-z0-9_\.]{1,40})/i,
      /instagram\.com\/([A-Za-z0-9_\.]{1,40})/i,
      /github\.com\/([A-Za-z0-9_\-]{1,40})/i,
      /tiktok\.com\/@([A-Za-z0-9_\-\.]{1,40})/i,
      /reddit\.com\/user\/([A-Za-z0-9_\-]{1,40})/i,
      /linkedin\.com\/in\/([A-Za-z0-9_\-]{1,40})/i,
      /youtube\.com\/(@[A-Za-z0-9_\-]{1,40})/i,
      /behance\.net\/([A-Za-z0-9_\-]{1,40})/i
    ]
    for (const p of patterns) {
      const m = clean.match(p)
      if (m && m[1]) {
        found.add(m[1].replace(/^@/, ''))
      }
    }
  })
  const bodyText = $('body').text()
  const atMatches = bodyText.match(/@([A-Za-z0-9_\-\.]{3,50})/g) || []
  atMatches.forEach(a => {
    const t = a.replace(/^@/, '')
    found.add(t)
  })
  return Array.from(found)
}

async function batchPromises(items, fn, batchSize) {
  const results = []
  for (let i = 0; i < items.length; i += batchSize) {
    const slice = items.slice(i, i + batchSize)
    const promises = slice.map(x => fn(x))
    const settled = await Promise.allSettled(promises)
    results.push(...settled.map(s => (s.status === 'fulfilled' ? s.value : { error: s.reason })))
  }
  return results
}

let handler = async (m, { conn, args }) => {
  const username = (args || []).join(' ').trim()
  if (!username) return conn.reply(m.chat, 'Uso: .find <username> esempio .find mario.rossi', m)
  const cacheKey = `find:${username.toLowerCase()}`
  const cached = getCached(cacheKey)
  if (cached) {
    const text = formatResult(username, cached)
    return conn.sendMessage(m.chat, { text }, { quoted: m })
  }
  const sites = COMMON_SITES.map(s => ({ name: s.name, url: s.url.replace('{u}', encodeURIComponent(username)) }))
  const probeFn = async site => {
    const r = await probeUrl(site.url)
    if (r.error) return { site: site.name, url: site.url, exists: false, error: r.error }
    const status = r.status || 0
    const ok = status >= 200 && status < 400
    const body = r.data || ''
    let foundHandles = []
    if (ok && typeof body === 'string') {
      try {
        foundHandles = extractHandlesFromHtml(body, site.url)
      } catch {}
    }
    return { site: site.name, url: site.url, status, exists: ok, handles: foundHandles.slice(0, 20) }
  }
  const probes = await batchPromises(sites, probeFn, MAX_BATCH)
  const found = probes.filter(p => p.exists)
  const aggregatedHandles = new Set()
  for (const p of probes) {
    if (p.handles && p.handles.length) {
      p.handles.forEach(h => aggregatedHandles.add(h))
    }
  }
  const extraCandidates = Array.from(aggregatedHandles).filter(h => h.toLowerCase() !== username.toLowerCase())
  const expanded = []
  if (extraCandidates.length > 0) {
    const moreSites = COMMON_SITES.map(s => ({ name: s.name, url: s.url }))
    const expandFn = async h => {
      const results = []
      for (const s of moreSites.slice(0, 25)) {
        const url = s.url.replace('{u}', encodeURIComponent(h))
        const r = await probeUrl(url)
        const ok = r && r.status >= 200 && r.status < 400
        if (ok) results.push({ site: s.name, url, status: r.status })
      }
      return { handle: h, results }
    }
    for (let i = 0; i < extraCandidates.length && i < 10; i++) {
      const res = await expandFn(extraCandidates[i])
      if (res.results.length) expanded.push(res)
    }
  }
  const final = { probes, found, expanded }
  setCached(cacheKey, final)
  const text = formatResult(username, final)
  await conn.sendMessage(m.chat, { text }, { quoted: m })
}

function formatResult(username, data) {
  let lines = []
  lines.push(`🔎 Ricerca username: ${username}`)
  lines.push('')
  lines.push('📍 Siti controllati:')
  for (const p of data.probes) {
    const okMark = p.exists ? '✅' : '❌'
    const status = p.status ? `(${p.status})` : ''
    lines.push(`${okMark} ${p.site} ${status} -> ${p.url}`)
  }
  lines.push('')
  const foundCount = data.found ? data.found.length : 0
  lines.push(`🟢 Trovati: ${foundCount}`)
  if (foundCount) {
    for (const f of data.found) {
      lines.push(`• ${f.site} -> ${f.url}`)
    }
  }
  if (data.expanded && data.expanded.length) {
    lines.push('')
    lines.push('🔁 Espansione da handle scoperti nella pagina:')
    for (const e of data.expanded) {
      lines.push(`• handle: ${e.handle}`)
      for (const r of e.results) {
        lines.push(`   - ${r.site} -> ${r.url} (${r.status})`)
      }
    }
  }
  lines.push('')
  lines.push('ℹ️ Nota: risultati basati su controllo URL e scansione pubblica della pagina. Potrebbero esserci falsi positivi/negativi.')
  return lines.join('\n')
}

handler.command = /^find$/i
handler.tags = ['osint']
handler.help = ['find <username>']
handler.premium = false
handler.owner = false
handler.mods = false
handler.group = false
handler.private = true

export default handler
