import '../lib/language.js';
let handler = async (m, { conn, text, usedPrefix }) => {
    let user = m.mentionedJid?.[0] || m.quoted?.sender;

    if (!user) throw global.t('scopa_no_target', m.sender, null, null, { prefix: usedPrefix });

    let target = user.split('@')[0];
    let sender = m.sender.split('@')[0];

    let message = global.t('scopa_message', m.sender, null, null, { sender: sender, target: target });


    await conn.reply(m.chat, message, m, { mentions: [user, m.sender] });

    await conn.sendMessage(m.chat, {
        react: {
            text: '💦',
            key: m.key
        }
    });
};


handler.customPrefix = /^\.(scopa|fuck|folla)$/i;
handler.command = new RegExp; 
export default handler;