import fetch from 'node-fetch'
import yts from 'yt-search'
let handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply('Inserisci un link YouTube. Esempio:\n.haramm https://youtu.be/xxxxx')
  let url = args[0].trim()
  await m.reply('🎵 Preparando il download...')
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)
  try {
    const api = `https://apisnodz.com.br/api/downloads/youtube/dl?url=${encodeURIComponent(url)}`
    let res = await fetch(api, { signal: controller.signal })
    clearTimeout(timeout)
    let text = await res.text()
    let j = null
    try { j = JSON.parse(text) } catch(e) { j = null }
    if (!res.ok || !j) {
      let info = await tryYtSearch(url)
      let reply = `❌ API primaria non ha fornito dati utili.\nHTTP ${res.status}\n`
      reply += `Risposta (troncata): ${String(text).slice(0,800)}\n\n`
      if (info.found) {
        reply += `⚠️ Ho trovato il video con yt-search:\nTitolo: ${info.title}\nDurata: ${info.timestamp}\nLink: ${info.url}\nSe vuoi che provi di nuovo con questa risorsa, riprova con lo stesso link o prova un altro servizio.`
        await conn.sendMessage(m.chat, { text: reply }, { quoted: m })
      } else {
        reply += 'ℹ️ Fallback yt-search non ha trovato il video. Controlla il link.'
        await conn.sendMessage(m.chat, { text: reply }, { quoted: m })
      }
      return
    }
    let body = j.resultado || j.result || j.data || j
    let title = body.titulo || body.title || body.name || 'Sconosciuto'
    let thumb = body.thumbnail || body.thumb || body.imagem || (body.preview && body.preview[0]) || null
    let audio = (body.audio && (body.audio.url || body.audio)) || (body.audioUrl) || (body.download && body.download.audio) || null
    let video = (body.video && (body.video.url || body.video)) || (body.videoUrl) || (body.download && body.download.video) || null
    if (!audio && !video) {
      let info = await tryYtSearch(url)
      let reply = `❌ L'API ha risposto ma non ha fornito URL audio/video.\nTitolo stimato: ${title}\nRisposta API (troncata): ${JSON.stringify(body).slice(0,800)}\n\n`
      if (info.found) reply += `yt-search ha trovato: ${info.title} (${info.timestamp})\nLink: ${info.url}`
      await conn.sendMessage(m.chat, { text: reply }, { quoted: m })
      return
    }
    if (thumb) {
      try {
        await conn.sendMessage(m.chat, { image: { url: thumb }, caption: `🎬 ${title}` }, { quoted: m })
      } catch {}
    } else {
      await conn.sendMessage(m.chat, { text: `🎬 ${title}` }, { quoted: m })
    }
    if (audio) {
      try {
        await conn.sendMessage(m.chat, { audio: { url: audio }, mimetype: 'audio/mpeg' }, { quoted: m })
      } catch (e) {
        await conn.sendMessage(m.chat, { text: `⚠️ Non è stato possibile inviare l'audio direttamente. URL: ${audio}` }, { quoted: m })
      }
    }
    if (video) {
      try {
        await conn.sendMessage(m.chat, { video: { url: video }, mimetype: 'video/mp4' }, { quoted: m })
      } catch (e) {
        await conn.sendMessage(m.chat, { text: `⚠️ Non è stato possibile inviare il video direttamente. URL: ${video}` }, { quoted: m })
      }
    }
    await conn.sendMessage(m.chat, {
      text: 'Vuoi entrare in call?',
      buttons: [{ buttonId: '.joincall', buttonText: { displayText: 'Entra in call' }, type: 1 }],
      headerType: 1
    }, { quoted: m })
  } catch (err) {
    clearTimeout(timeout)
    let info = await tryYtSearch(args[0])
    let msg = `❌ Errore durante la richiesta all'API primaria: ${String(err.message).slice(0,200)}\n\n`
    if (info.found) msg += `Fallback: ho trovato il video con yt-search:\nTitolo: ${info.title}\nDurata: ${info.timestamp}\nLink: ${info.url}\nUsalo direttamente o prova un'altra API.`
    else msg += 'Fallback yt-search non ha trovato il video. Controlla il link fornito.'
    await conn.sendMessage(m.chat, { text: msg }, { quoted: m })
  }
}
handler.command = ['haramm']
export default handler

async function tryYtSearch(q) {
  try {
    let s = await yts(q)
    let v = (s && s.videos && s.videos[0]) ? s.videos[0] : null
    if (!v) return { found: false }
    return { found: true, title: v.title, url: v.url, timestamp: v.timestamp, seconds: v.seconds, author: v.author?.name || '' }
  } catch (e) {
    return { found: false }
  }
}
