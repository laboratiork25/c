import '../lib/language.js';
const delay = time => new Promise(res => setTimeout(res, time));
let handler = async (m, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin }) => {
    const userId = m.sender;
    const groupId = m.chat;
    if (!args[0]) return m.reply(global.t('listanumNoPrefix', userId, groupId));
    if (isNaN(args[0])) return m.reply(global.t('listanumInvalidPrefix', userId, groupId));
    let lol = args[0].replace(/[+]/g, '');
    let ps = participants.map(u => u.id).filter(v => v !== conn.user.jid && v.startsWith(lol || lol));
    let bot = global.db?.data?.settings?.[conn.user.jid] || {};
    if (ps.length === 0) {
        return await conn.sendMessage(m.chat, {
            text: global.t('listanumNoUsers', userId, groupId, { prefix: lol })
        }, { quoted: m });
    }
    let numeros = ps.map(v => '◉ @' + v.replace(/@.+/, ''));
    const nomeDelBot = conn.user?.name || global.db?.data?.nomedelbot || 'ChatUnity';
    switch (command) {
        case "listanum":
            await conn.sendMessage(m.chat, {
                text: global.t('listanumTitle', userId, groupId, { prefix: lol }) + '\n\n' + numeros.join('\n') + '\n\n╰★────★────★',
                mentions: ps,
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
            break;
        case "kicknum":
        case "pulizia":
            if (!bot.restrict) return m.reply(global.t('puliziaNoRestrict', userId, groupId));
            if (!isBotAdmin) return m.reply(global.t('puliziaNoBotAdmin', userId, groupId));
            await conn.sendMessage(m.chat, {
                text: global.t('puliziaStart', userId, groupId, { prefix: lol }),
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
            let ownerGroup = m.chat.split('-')[0] + '@s.whatsapp.net';
            let users = participants.map(u => u.id).filter(v => v !== conn.user.jid && v.startsWith(lol || lol));
            for (let user of users) {
                if (user !== ownerGroup && user !== conn.user.jid && user !== global.owner + '@s.whatsapp.net' && user.startsWith(lol || lol) && user !== isSuperAdmin && isBotAdmin && bot.restrict) {
                    await delay(2000);
                    let responseb = await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
                    if (responseb[0].status === "404") await delay(2000);
                }
            }
            break;
    }
};
handler.help = ['listanum <prefix>', 'kicknum <prefix>', 'pulizia <prefix>'];
handler.tags = ['admin'];
handler.command = /^(listanum|kicknum|pulizia|clean)$/i;
handler.group = true;
handler.botAdmin = true;
handler.admin = true;
handler.fail = null;
export default handler;