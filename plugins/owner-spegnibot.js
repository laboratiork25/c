import '../lib/language.js';

let handler = async (m, { conn, isROwner }) => {
    const userId = m.sender;
    const groupId = m.chat;
    const nomeDelBot = conn.user?.name || global.db?.data?.nomedelbot || 'ChatUnity';
    
    try {
        const chatKeys = Object.keys(global.db.data.chats || {});
        
        chatKeys.forEach(chatId => {
            if (!global.db.data.chats[chatId]) {
                global.db.data.chats[chatId] = {};
            }
            global.db.data.chats[chatId].isBanned = true;
        });
        
        await conn.sendMessage(m.chat, {
            text: global.t('shutdownInitiating', userId, groupId) + '\n' + global.t('shutdownChatsBanned', userId, groupId, { count: chatKeys.length }),
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
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        await conn.sendMessage(m.chat, {
            text: global.t('shutdownSuccess', userId, groupId),
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
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (process.send) {
            process.send('reset');
        }
        
        process.exit(0);
        
    } catch (error) {
        await conn.sendMessage(m.chat, {
            text: global.t('shutdownError', userId, groupId, { error: error.message }),
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
    }
};

handler.help = ['spegnibot', 'shutdown'];
handler.tags = ['owner'];
handler.command = /^(spegnibot|shutdown|turnoff)$/i;
handler.rowner = true;

export default handler;
