import '../lib/language.js';

let handler = async (m, { conn, command }) => {
    const userId = m.sender;
    const groupId = m.isGroup ? m.chat : null;
    const nomeDelBot = global.db.data.nomedelbot || 'ChatUnity';
    
    let isOpen = command === 'aperto' || command === 'open';
    
    await conn.groupSettingUpdate(m.chat, isOpen ? 'not_announcement' : 'announcement');
    
    await conn.sendMessage(m.chat, {
        text: isOpen ? global.t('groupOpen', userId, groupId) : global.t('groupClose', userId, groupId),
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: `${nomeDelBot}`
            }
        }
    }, { quoted: m });
};

handler.help = ['open', 'close'];
handler.tags = ['group'];
handler.command = /^(aperto|chiuso|open|close)$/i;
handler.admin = true;
handler.botAdmin = true;
handler.group = true;

export default handler;
