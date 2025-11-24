import dns from 'dns/promises'
import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'

const WHOIS_API_KEY = process.env.WHOIS_API_KEY || ''
const OSINT_API_URL = process.env.OSINT_API_URL || ''
const OSINT_API_KEY = process.env.OSINT_API_KEY || ''

function normalizeTarget(input) {
  if (!input) return null
  input = input.trim()
  if (/^[0-9]{1,3}(\.[0-9]{1,3}){3}$/.test(input)) return { type: 'ip', value: input }
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) return { type: 'email', value: input }
  if (/^[a-zA-Z0-9_.-]+$/.test(input) && !input.includes('.')) return { type: 'username', value: input }
  if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input)) return { type: 'domain', value: input.toLowerCase() }
  return { type: 'unknown', value: input }
}

async function whoisLookup(domain) {
  if (!WHOIS_API_KEY) return { error: 'WHOIS API key non configurata. Impostare WHOIS_API_KEY.' }
  try {
    const url = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${encodeURIComponent(WHOIS_API_KEY)}&domainName=${encodeURIComponent(domain)}&outputFormat=JSON`
    const res = await fetch(url, { method: 'GET', timeout: 20000 })
    if (!res.ok) return { error: `WHOIS HTTP ${res.status}` }
    const j = await res.json()
    return { data: j }
  } catch (e) {
    return { error: e.message || String(e) }
  }
}

async function ipLookup(ip) {
  try {
    const res = await fetch(`http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,message,country,regionName,city,isp,org,as,query,timezone,proxy,hosting`, { method: 'GET', timeout: 10000 })
    if (!res.ok) return { error: `IP lookup HTTP ${res.status}` }
    const j = await res.json()
    return j
  } catch (e) {
    return { error: e.message || String(e) }
  }
}

async function crtSh(domain) {
  try {
    const res = await fetch(`https://crt.sh/?q=${encodeURIComponent(domain)}&output=json`, { method: 'GET', timeout: 15000 })
    if (!res.ok) return { error: `crt.sh HTTP ${res.status}` }
    const j = await res.json()
    return Array.isArray(j) ? j.slice(0, 20) : j
  } catch (e) {
    return { error: e.message || String(e) }
  }
}

async function dnsRecords(domain) {
  const out = {}
  try {
    out.A = await dns.resolve(domain, 'A').catch(()=>[])
    out.AAAA = await dns.resolve(domain, 'AAAA').catch(()=>[])
    out.MX = await dns.resolve(domain, 'MX').catch(()=>[])
    out.TXT = await dns.resolve(domain, 'TXT').catch(()=>[])
    out.NS = await dns.resolve(domain, 'NS').catch(()=>[])
    out.CNAME = await dns.resolve(domain, 'CNAME').catch(()=>[])
  } catch (e) {
    out.error = e.message || String(e)
  }
  return out
}

async function optionalOsintApis(query) {
  if (!OSINT_API_URL) return { note: 'Nessuna API OSINT configurata (OSINT_API_URL mancante).' }
  try {
    const url = `${OSINT_API_URL.replace(/\/$/,'')}/search?query=${encodeURIComponent(query)}`
    const headers = { 'Accept': 'application/json' }
    if (OSINT_API_KEY) headers['Authorization'] = `Bearer ${OSINT_API_KEY}`
    const res = await fetch(url, { method: 'GET', headers, timeout: 20000 })
    if (!res.ok) return { error: `OSINT API HTTP ${res.status}` }
    const j = await res.json()
    return { data: j }
  } catch (e) {
    return { error: e.message || String(e) }
  }
}

function short(v) {
  if (v == null) return '-'
  if (typeof v === 'object') return JSON.stringify(v)
  return String(v)
}

let handler = async (m, { conn, args }) => {
  const input = (args && args.length) ? args.join(' ').trim() : ''
  if (!input) return conn.sendMessage(m.chat, { text: 'Uso: .cerca <dominio|ip|email|username>' }, { quoted: m })
  const t = normalizeTarget(input)
  const sections = []
  sections.push(`Risultati OSINT per: ${t.value}`)
  sections.push(`Tipo interpretato: ${t.type}`)

  if (t.type === 'domain') {
    const dnsR = await dnsRecords(t.value)
    sections.push('DNS Records:')
    sections.push(`A: ${short(dnsR.A)}`)
    sections.push(`AAAA: ${short(dnsR.AAAA)}`)
    sections.push(`MX: ${short(dnsR.MX)}`)
    sections.push(`NS: ${short(dnsR.NS)}`)
    sections.push(`TXT: ${short(dnsR.TXT)}`)
    const crt = await crtSh(t.value)
    if (crt.error) sections.push(`crt.sh: Errore: ${crt.error}`)
    else sections.push(`crt.sh: ${Array.isArray(crt) ? crt.length + ' risultati (mostrati max 20)' : short(crt)}`)
    const who = await whoisLookup(t.value)
    if (who.error) sections.push(`WHOIS: ${who.error}`)
    else sections.push(`WHOIS: ${JSON.stringify(who.data, null, 2).slice(0,2000)}`)
    const osint = await optionalOsintApis(t.value)
    if (osint.error) sections.push(`API OSINT: ${osint.error}`)
    else if (osint.note) sections.push(`API OSINT: ${osint.note}`)
    else sections.push(`API OSINT: ${JSON.stringify(osint.data).slice(0,2000)}`)
  } else if (t.type === 'ip') {
    const ipr = await ipLookup(t.value)
    if (ipr.error) sections.push(`IP lookup: ${ipr.error}`)
    else sections.push(`IP lookup: ${JSON.stringify(ipr, null, 2)}`)
    const reverse = await dns.reverse(t.value).catch(()=>[])
    sections.push(`Reverse DNS: ${short(reverse)}`)
    const osint = await optionalOsintApis(t.value)
    if (osint.error) sections.push(`API OSINT: ${osint.error}`)
    else if (osint.note) sections.push(`API OSINT: ${osint.note}`)
    else sections.push(`API OSINT: ${JSON.stringify(osint.data).slice(0,2000)}`)
  } else if (t.type === 'email') {
    const domain = t.value.split('@').slice(-1)[0]
    const ipinfo = await ipLookup(domain).catch(()=>null)
    sections.push(`Domain collegato all'email: ${domain}`)
    const dnsR = await dnsRecords(domain)
    sections.push('DNS Records:')
    sections.push(`A: ${short(dnsR.A)}`)
    sections.push(`MX: ${short(dnsR.MX)}`)
    const who = await whoisLookup(domain)
    if (who.error) sections.push(`WHOIS: ${who.error}`)
    else sections.push(`WHOIS: ${JSON.stringify(who.data, null, 2).slice(0,2000)}`)
    const osint = await optionalOsintApis(t.value)
    if (osint.error) sections.push(`API OSINT: ${osint.error}`)
    else if (osint.note) sections.push(`API OSINT: ${osint.note}`)
    else sections.push(`API OSINT: ${JSON.stringify(osint.data).slice(0,2000)}`)
  } else if (t.type === 'username') {
    const osint = await optionalOsintApis(t.value)
    if (osint.error) sections.push(`API OSINT: ${osint.error}`)
    else if (osint.note) sections.push(`API OSINT: ${osint.note}`)
    else sections.push(`API OSINT: ${JSON.stringify(osint.data).slice(0,2000)}`)
    sections.push('Nota: per ricerca username più approfondita usare strumenti esterni come Maigret o Sherlock in ambiente separato.')
  } else {
    sections.push('Formato non riconosciuto. Inserire dominio, IP, email o username.')
  }

  const out = sections.join('\n\n')
  const safeOut = out.length > 4000 ? out.slice(0,4000) + '\n\n[Output troncato per lunghezza]' : out
  await conn.sendMessage(m.chat, { text: safeOut }, { quoted: m })
}

handler.command = /^(cerca|jsjs|osint)$/i
handler.tags = ['osint']
handler.help = ['cerca <dominio|ip|email|username>']

export default handler
