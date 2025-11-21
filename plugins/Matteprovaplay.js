import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
  if (!args[0]) {
    return m.reply("Inserisci un link YouTube.\nEsempio:\n.haramm https://youtu.be/xxxx")
  }

  let url = args[0]
  m.reply("🎵 Sto preparando il download...")

  try {
    let api = `https://apisnodz.com.br/api/downloads/youtube/dl?url=${encodeURIComponent(url)}`
    let r = await fetch(api)
    let j = await r.json()

    if (!j || !j.resultado) return m.reply("❌ API non ha risposto. Prova un altro link.")

    let info = j.resultado
    let title = info.titulo || "Sconosciuto"
    let thumb = info.thumbnail
    let audio = info.audio
    let video = info.video

    if (thumb) {
      await conn.sendMessage(m.chat, {
        image: { url: thumb },
        caption: `🎬 *${title}*\n\nAudio e Video pronti al download.`
      }, { quoted: m })
    }

    if (audio) {
      await conn.sendMessage(m.chat, {
        audio: { url: audio },
        mimetype: "audio/mpeg"
      }, { quoted: m })
    }

    if (video) {
      await conn.sendMessage(m.chat, {
        video: { url: video },
        mimetype: "video/mp4"
      }, { quoted: m })
    }

    await conn.sendMessage(m.chat, {
      text: "🎧 Vuoi entrare in call?",
      buttons: [
        { buttonId: `.joincall`, buttonText: { displayText: "Entra in call" }, type: 1 }
      ],
      headerType: 1
    })

  } catch (e) {
    console.log(e)
    m.reply("❌ Errore durante il download.")
  }
}

handler.command = ['haramm']
export default handler
