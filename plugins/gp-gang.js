import '../lib/language.js';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    const userId = m.sender;
    const groupId = m.isGroup ? m.chat : null;
    
    const gangData = global.db.data.gang = global.db.data.gang || {};
    const gangRequests = global.db.data.gangRequests = global.db.data.gangRequests || {};
    const users = global.db.data.users;

    // 🎯 SISTEMA ACCETTA/RIFIUTA
    if (command === 'accetta' || command === 'rifiuta') {
        const req = gangRequests[m.sender];
        if (!req) return m.reply(global.t('noPendingRequest', userId, groupId));

        clearTimeout(req.timeout);
        const g = gangData[req.gangId];

        if (command === 'accetta') {
            g.members.push(m.sender);
            users[m.sender].gang = { id: req.gangId, role: 'member' };

            await conn.sendMessage(m.chat, {
                text: global.t('gangJoinSuccess', userId, groupId, {
                    user: m.sender.split('@')[0],
                    emoji: g.emoji,
                    name: g.name,
                    count: g.members.length
                }),
                mentions: [m.sender],
                contextInfo: {
                    externalAdReply: {
                        title: global.t('gangWelcomeTitle', userId, groupId),
                        body: global.t('gangWelcomeBody', userId, groupId, { name: g.name }),
                        thumbnailUrl: 'https://i.imgur.com/4Q7W7aA.png',
                        mediaType: 1
                    }
                }
            });
        } else {
            await conn.sendMessage(m.chat, {
                text: global.t('gangReject', userId, groupId, {
                    user: m.sender.split('@')[0]
                }),
                mentions: [m.sender]
            });
        }

        delete gangRequests[m.sender];
        return;
    }

    // 🏴 CREA GANG
    if (command === 'creagang') {
        const user = users[m.sender];
        if (user.gang) {
            return m.reply(global.t('alreadyInGang', userId, groupId));
        }

        if (args.length < 2) {
            return m.reply(global.t('createGangFormat', userId, groupId, { prefix: usedPrefix }));
        }

        const name = args.slice(0, -1).join(' ');
        const emoji = args[args.length - 1];

        if (name.length > 20) {
            return m.reply(global.t('gangNameTooLong', userId, groupId));
        }

        const gangId = name.toLowerCase().replace(/\s+/g, '_');
        if (gangData[gangId]) {
            return m.reply(global.t('gangExists', userId, groupId));
        }

        // 🎲 Assegna un colore casuale alla gang
        const gangColors = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠', '⚫', '⚪'];
        const randomColor = gangColors[Math.floor(Math.random() * gangColors.length)];

        gangData[gangId] = {
            id: gangId,
            name,
            emoji,
            color: randomColor,
            boss: m.sender,
            members: [m.sender],
            created: Date.now(),
            level: 1,
            exp: 0
        };

        user.gang = {
            id: gangId,
            role: 'boss',
            joinDate: Date.now()
        };

        return m.reply(global.t('gangCreated', userId, groupId, {
            emoji,
            name,
            color: randomColor,
            prefix: usedPrefix
        }));
    }

    // 🚪 LASCIA GANG
    if (command === 'lasciagang') {
        const user = users[m.sender];
        if (!user.gang) {
            return m.reply(global.t('notInGang', userId, groupId));
        }

        const gangId = user.gang.id;
        const gang = gangData[gangId];

        if (user.gang.role === 'boss') {
            return m.reply(global.t('bossCannotLeave', userId, groupId));
        }

        gang.members = gang.members.filter(jid => jid !== m.sender);
        delete users[m.sender].gang;

        return m.reply(global.t('gangLeft', userId, groupId, {
            emoji: gang.emoji,
            name: gang.name
        }));
    }

    // 📩 INVITA IN GANG
    if (command === 'invitogang') {
        const user = users[m.sender];
        if (!user.gang) {
            return m.reply(global.t('notInGang', userId, groupId));
        }

        const gangId = user.gang.id;
        const gangInfo = gangData[gangId];

        if (user.gang.role !== 'boss') {
            return m.reply(global.t('onlyBossCanInvite', userId, groupId));
        }

        if (!m.mentionedJid || m.mentionedJid.length === 0) {
            return m.reply(global.t('mentionUser', userId, groupId));
        }

        const mention = m.mentionedJid[0];
        if (users[mention]?.gang) {
            return m.reply(global.t('userAlreadyInGang', userId, groupId));
        }

        if (gangInfo.members.length >= 6) {
            return m.reply(global.t('gangFull', userId, groupId, { max: 6 }));
        }

        gangRequests[mention] = {
            gangId,
            inviter: m.sender,
            timeout: setTimeout(() => {
                delete gangRequests[mention];
                conn.sendMessage(m.chat, {
                    text: global.t('inviteExpired', userId, groupId, {
                        user: mention.split('@')[0]
                    }),
                    mentions: [mention]
                });
            }, 60 * 1000)
        };

        await conn.sendMessage(m.chat, {
            text: global.t('gangInvite', userId, groupId, {
                inviter: m.sender.split('@')[0],
                emoji: gangInfo.emoji,
                name: gangInfo.name,
                color: gangInfo.color,
                members: gangInfo.members.length,
                max: 6
            }),
            mentions: [mention, m.sender],
            buttons: [
                { buttonId: `${usedPrefix}accetta`, buttonText: { displayText: global.t('acceptButton', userId, groupId) }, type: 1 },
                { buttonId: `${usedPrefix}rifiuta`, buttonText: { displayText: global.t('rejectButton', userId, groupId) }, type: 1 }
            ],
            headerType: 1,
            contextInfo: {
                externalAdReply: {
                    title: global.t('gangInviteTitle', userId, groupId),
                    body: global.t('gangInviteBody', userId, groupId, { name: gangInfo.name }),
                    thumbnailUrl: 'https://i.imgur.com/8Q3aZ7B.png',
                    mediaType: 1
                }
            }
        }, { quoted: m });
    }
};

handler.help = ['creagang [nome] [emoji]', 'invitogang @user', 'accetta', 'rifiuta', 'lasciagang'];
handler.tags = ['gang'];
handler.command = ['creagang', 'invitogang', 'accetta', 'rifiuta', 'lasciagang', 'gangcreate', 'ganginvite', 'leavegang'];

export default handler;