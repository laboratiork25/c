import { performance } from 'perf_hooks';
import fetch from 'node-fetch';
import '../lib/language.js';

const handler = async (message, { conn, usedPrefix }) => {
    const userId = message.sender;
    const groupId = message.isGroup ? message.chat : null;
    
    const userCount = Object.keys(global.db.data.users).length;
    const botName = global.db.data.nomedelbot || 'ChatUnity';

    const menuText = global.t('terminiText', userId, groupId, { 
        prefix: usedPrefix, 
        botName, 
        userCount 
    });

    const messageOptions = {
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363422724720651@newsletter',
                serverMessageId: '',
                newsletterName: global.t('newsletterName', userId, groupId, { botName })
            },
        }
    };

    const imagePath = './menu/termini.jpeg';
    await conn.sendMessage(
        message.chat,
        { image: { url: imagePath }, caption: menuText, ...messageOptions },
        { quoted: message }
    );
};

handler.help = ['termini'];
handler.tags = ['info'];
handler.command = /^(FAQ|termini|terms|privacy)$/i;

export default handler;