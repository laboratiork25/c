import '../lib/language.js';

let handler = async function (m, { conn, text, usedPrefix }) {
    const userId = m.sender;
    const groupId = m.chat;
    
    let chat = global.db.data.chats[m.chat];
    
    if (!chat.rules || chat.rules === '') {
        throw global.t('rulesNotSet', userId, groupId, { prefix: usedPrefix });
    }

    await conn.sendMessage(m.chat, { 
        text: global.t('rulesDisplay', userId, groupId, { rules: chat.rules })
    }, { quoted: m });
};

handler.help = ['rules', 'regole'];
handler.tags = ['group'];
handler.command = /^(rules|regole)$/i;
handler.group = true;

export default handler;
