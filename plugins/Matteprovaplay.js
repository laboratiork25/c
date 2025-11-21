import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply("Metti un link YouTube.\nesempio:\n.haramm https://youtu.be/xxxx")

  let url = args[0]

  try {
    m.reply("🔄 Sto analizzando il video...")

    let api = `https://apisnodz.com.br/api/downloads/youtube/dl?url=${encodeURIComponent(url)}`
    let res = await fetch(api)
    let json = await res.json()

    if (!json || !json.resultado) return m.reply("❌ Errore API o video non valido.")

    let info = json.resultado
    let title = info.titulo || "Sconosciuto"
    let thumb = info.thumbnail || null
    let audio = info.audio || null
    let video = info.video || null

    await conn.sendMessage(m.chat, {
      image: { url: thumb },
      caption: `🎵 *${title}*\n\nAudio e video pronti al download.`
    })

    if (audio) {
      await conn.sendMessage(m.chat, {
        audio: { url: audio },
        mimetype: "audio/mpeg",
        fileName: title + ".mp3"
      }, { quoted: m })
    }

    if (video) {
      await conn.sendMessage(m.chat, {
        video: { url: video },
        mimetype: "video/mp4",
        fileName: title + ".mp4"
      }, { quoted: m })
    }

    await conn.sendMessage(m.chat, {
      text: "Vuoi riprodurre il video in chiamata?",
      buttons: [
        { buttonId: `.haramcall ${video}`, buttonText: { displayText: "🎧 Entra in call" }, type: 1 }
      ],
      headerType: 1
    })

  } catch (e) {
    console.log(e)
    return m.reply("❌ Errore nel processare il video.")
  }
}

let callHandler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply("Dammi il link video MP4.")

  let url = args[0]

  try {
    await conn.sendMessage(m.chat, { text: "📞 Mi collego alla call..." })

    await conn.groupCallJoin(m.chat, url, {
      audio: true,
      video: false,
      timeout: 30000
    })

  } catch (e) {
    console.log(e)
    return m.reply("❌ Non riesco a riprodurre nella call.")
  }
}

handler.command = ['haramm']
callHandler.command = ['haramcall']

export default [handler, callHandler]
