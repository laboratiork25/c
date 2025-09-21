import fs from 'fs'
import acrcloud from 'acrcloud'
import '../lib/language.js'

let acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
})

let handler = async (m) => {
  const userId = m.sender;
  const groupId = m.isGroup ? m.chat : null;
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (/audio|video/.test(mime)) {
    if ((q.msg || q).seconds > 20) return m.reply(global.t('shazamFileTooLarge', userId, groupId) || '╯⊱⚠️⊱ *ATTENZIONE | WARNING* ⊱⚠️⊱╮\n\nIl file che hai caricato è troppo grande, ti consigliamo di tagliare il file in un frammento più piccolo. 10-20 secondi di audio sono sufficienti per l\'identificazione')
    await conn.reply(m.chat, wait, m)
    let media = await q.download()
    let ext = mime.split('/')[1]
    fs.writeFileSync(`./tmp/${m.sender}.${ext}`, media)
    let res = await acr.identify(fs.readFileSync(`./tmp/${m.sender}.${ext}`))
    let { code, msg } = res.status
    if (code !== 0) throw msg
    let { title, artists, album, genres, release_date } = res.metadata.music[0]
    let txt = `
${global.t('shazamSearchResult', userId, groupId) || 'RISULTATO DELLA RICERCA'}

• 📌 ${global.t('shazamTitle', userId, groupId) || 'TITOLO'}: ${title}
• 👨‍🎤 ${global.t('shazamArtist', userId, groupId) || 'ARTISTA'}: ${artists !== undefined ? artists.map(v => v.name).join(', ') : global.t('shazamNotFound', userId, groupId) || 'Non trovato'}
• 💾 ${global.t('shazamAlbum', userId, groupId) || 'ALBUM'}: ${album.name || global.t('shazamNotFound', userId, groupId) || 'Non trovato'}
• 🌐 ${global.t('shazamGenre', userId, groupId) || 'GENERE'}: ${genres !== undefined ? genres.map(v => v.name).join(', ') : global.t('shazamNotFound', userId, groupId) || 'Non trovato'}
• 📆 ${global.t('shazamReleaseDate', userId, groupId) || 'DATA DI PUBBLICAZIONE'}: ${release_date || global.t('shazamNotFound', userId, groupId) || 'Non trovato'}
`.trim()
    fs.unlinkSync(`./tmp/${m.sender}.${ext}`)

    const messageOptions = {
      contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363422724720651@newsletter',
          serverMessageId: '',
          newsletterName: `ChatUnity`
        },
      }
    };

    // Invia il messaggio con inoltro
    m.reply(txt, null, { ...messageOptions })
  } else throw global.t('shazamWrongUsage', userId, groupId) || '╯⊱❗️⊱ *USO ERRATO* ⊱❗️⊱╮\n\nRISPONDI A UN AUDIO O VIDEO'
}
handler.command = /^shazam$/i
export default handler