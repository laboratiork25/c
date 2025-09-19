import '../lib/language.js';

let handler = async function (m, { conn, text, usedPrefix }) {
    const userId = m.sender;
    const groupId = m.chat;
    
    let chat = global.db.data.chats[m.chat];
    if (!chat.rules || chat.rules === '') {
        throw global.t('noRulesSet', userId, groupId, { prefix: usedPrefix });
    }

    await conn.sendMessage(m.chat, { 
        text: global.t('rulesMessage', userId, groupId, { rules: chat.rules }),
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });
};

handler.help = ['rules'];
handler.tags = ['group'];
handler.command = ['rules', 'regole', 'norme'];
export default handler;