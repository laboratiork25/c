import '../lib/language.js';

let handler = async (m, { conn, text, isROwner, isOwner, command }) => {
    const userId = m.sender;
    const groupId = m.isGroup ? m.chat : null;
    const nomeDelBot = global.db.data.nomedelbot || 'ChatUnity';
    
    const isWelcome = command === 'setwelcome' || command === 'setbenvenuto';
    
    if (text) {
        if (isWelcome) {
            global.db.data.chats[m.chat].sWelcome = text;
        } else {
            global.db.data.chats[m.chat].sBye = text;
        }
        
        await conn.sendMessage(m.chat, {
            text: isWelcome ? global.t('setwelcomeSuccess', userId, groupId) : global.t('setbyeSuccess', userId, groupId),
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
    } else {
        throw isWelcome ? global.t('setwelcomeNoText', userId, groupId) : global.t('setbyeNoText', userId, groupId);
    }
};

handler.help = ['setwelcome <text>', 'setbye <text>'];
handler.tags = ['group'];
handler.command = /^(setwelcome|setbenvenuto|setbye|setaddio)$/i;
handler.admin = true;
handler.group = true;

export default handler;
