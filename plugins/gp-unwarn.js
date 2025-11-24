import '../lib/language.js';

let handler = async (m, { conn, args, groupMetadata }) => {
    const userId = m.sender;
    const groupId = m.isGroup ? m.chat : null;
    const nomeDelBot = global.db.data.nomedelbot || `𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲`;
    
    let who;
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    else who = m.chat;
    
    if (!who) return m.reply(global.t('unwarnNoUser', userId, groupId));
    if (!(who in global.db.data.users)) return m.reply(global.t('unwarnUserNotFound', userId, groupId));
    
    let warn = global.db.data.users[who].warn;
    
    if (warn > 0) {
        global.db.data.users[who].warn -= 1;
        
        const messageOptions = {
            text: global.t('unwarnSuccess', userId, groupId, { remaining: warn - 1 }),
            contextInfo: {
                mentionedJid: [who],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363259442839354@newsletter',
                    serverMessageId: '',
                    newsletterName: `${nomeDelBot}`
                }
            }
        };
    
        await conn.sendMessage(m.chat, messageOptions);
    } else {
        return m.reply(global.t('unwarnNoWarnings', userId, groupId));
    }
};

handler.help = ['delwarn @user', 'unwarn @user'];
handler.tags = ['group'];
handler.command = /^(delwarn|unwarn|rimuoviavvertimento)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
