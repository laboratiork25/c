import '../lib/language.js';
const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3}|inf)?/i;
const isNumber = (x) => (x = parseInt(x), typeof x === 'number' && !isNaN(x));
let handler = async (m, { conn, text, isOwner, usedPrefix, command }) => {
    const userId = m.sender;
    const groupId = m.chat;
    if (!text) {
        return m.reply(global.t('joinNoLink', userId, groupId, { prefix: usedPrefix, command }));
    }
    let [_, code, expired] = text.match(linkRegex) || [];
    if (!code) {
        return m.reply(global.t('joinInvalidLink', userId, groupId));
    }
    let res = await conn.groupAcceptInvite(code);
    const nomeDelBot = conn.user?.name || global.db?.data?.nomedelbot || 'ChatUnity';
    if (expired === 'inf') {
        await conn.sendMessage(m.chat, {
            text: global.t('joinSuccessInfinite', userId, groupId),
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
    } else {
        expired = Math.floor(Math.min(999, Math.max(1, isOwner ? isNumber(expired) ? parseInt(expired) : 0 : 3)));
        await conn.sendMessage(m.chat, {
            text: global.t('joinSuccessExpired', userId, groupId, { days: expired }),
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
        let chats = global.db?.data?.chats?.[res];
        if (!chats) {
            if (!global.db.data.chats) global.db.data.chats = {};
            chats = global.db.data.chats[res] = {};
        }
        if (expired) chats.expired = +new Date() + expired * 1000 * 60 * 60 * 24;
    }
};
handler.help = ['join <link> <giorni | inf>'];
handler.tags = ['creatore'];
handler.command = ['join'];
handler.owner = true;
export default handler;