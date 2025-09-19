// crediti: Onix, di Riad
import '../lib/language.js';

let handler = async (m, { conn, text }) => {
    const userId = m.sender;
    const groupId = m.isGroup ? m.chat : null;
    let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;

    // Verifica se l'utente target è il numero del bot
    if (who === conn.user.jid) {
        await conn.sendMessage(m.chat, { 
            text: global.t('profilePicBotError', userId, groupId) || `🚫 Impossibile ottenere la foto profilo del bot.` 
        }, { quoted: m });
        return;
    }

    try {
        // Recupera la foto profilo dell'utente (se esiste)
        let profilePicture = await conn.profilePictureUrl(who, 'image');
        await conn.sendMessage(m.chat, { 
            image: { url: profilePicture }, 
            caption: global.t('profilePicCaption', userId, groupId) || `📸` 
        }, { quoted: m, mentions: [who] });
    } catch (e) {
        // Caso in cui l'utente non ha una foto profilo o non è disponibile
        await conn.sendMessage(m.chat, { 
            text: global.t('profilePicNotFound', userId, groupId, { user: who.split('@')[0] }) || `@${who.split('@')[0]} 𝐧𝐨𝐧 𝐡𝐚 𝐮𝐧𝐚 𝐟𝐨𝐭𝐨 𝐩𝐫𝐨𝐟𝐢𝐥𝐨 🚫`, 
            mentions: [who] 
        }, { quoted: m });
    }
};

handler.command = /^(pic)$/i;
handler.group = true;
handler.admin = true;
export default handler;