import '../lib/language.js';
import { toAudio } from '../lib/converter.js';

let handler = async (m, { conn, usedPrefix, command }) => {
    const userId = m.sender;
    const groupId = m.chat;
    
    let q = m.quoted ? m.quoted : m;
    let mime = (q || q.msg).mimetype || q.mediaType || '';
    
    if (!/video|audio/.test(mime)) {
        throw global.t('toAudioNoMedia', userId, groupId);
    }
    
    let media = await q.download();
    if (!media) {
        throw global.t('toAudioDownloadError', userId, groupId);
    }
    
    let audio = await toAudio(media, 'mp4');
    if (!audio.data) {
        throw global.t('toAudioConvertError', userId, groupId);
    }
    
    await conn.sendMessage(m.chat, { 
        audio: audio.data,  
        mimetype: 'audio/mpeg' 
    }, { quoted: m });
};

handler.help = ['tomp3', 'toaudio'];
handler.tags = ['converter'];
handler.command = /^to(mp3|audio)$/i;

export default handler;