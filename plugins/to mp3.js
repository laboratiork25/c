import { toAudio } from '../lib/converter.js'
import '../lib/language.js';

let handler = async (m, { conn, usedPrefix, command }) => {
    let userId = m.sender;
    let groupId = m.chat;
    
    let q = m.quoted ? m.quoted : m
    let mime = (q || q.msg).mimetype || q.mediaType || ''
    
    if (!/video|audio/.test(mime)) throw global.t('invalidMediaType', userId, groupId)
    
    let media = await q.download()
    if (!media) throw global.t('downloadError', userId, groupId)
    
    let audio = await toAudio(media, 'mp4')
    if (!audio.data) throw global.t('conversionError', userId, groupId)
    
    conn.sendMessage(m.chat, { audio: audio.data, mimetype: 'audio/mpeg' }, { quoted: m })
}

handler.alias = ['tomp3', 'toaudio']
handler.command = /^to(mp3)$/i

export default handler