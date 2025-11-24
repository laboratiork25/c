import '../lib/language.js';

let handler = async (m, { conn, command }) => {
    const userId = m.sender;
    const groupId = m.chat;
    const nomeDelBot = conn.user?.name || global.db?.data?.nomedelbot || 'ChatUnity';
    
    const isBan = /^(banchat|bangp)$/i.test(command);
    
    if (!global.db.data.chats[m.chat]) {
        global.db.data.chats[m.chat] = {};
    }
    
    global.db.data.chats[m.chat].isBanned = isBan;
    
    const messageKey = isBan ? 'banChatSuccess' : 'unbanChatSuccess';
    
    await conn.sendMessage(m.chat, {
        text: global.t(messageKey, userId, groupId),
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: nomeDelBot
            }
        }
    }, { quoted: m });
};

handler.help = ['banchat', 'unbanchat'];
handler.tags = ['owner'];
handler.command = /^(banchat|bangp|unbanchat|unbangp)$/i;
handler.rowner = true;

export default handler;