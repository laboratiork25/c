import { performance } from 'perf_hooks';
import fetch from 'node-fetch';
import '../lib/language.js';

const handler = async (message, { conn, usedPrefix }) => {
    const userId = message.sender;
    const groupId = message.isGroup ? message.chat : null;
    const userCount = Object.keys(global.db.data.users).length;
    const botName = global.db.data.nomedelbot || 'ChatUnity';

    const menuText = generateMenuText(usedPrefix, botName, userCount, userId, groupId);
    
    const messageOptions = {
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: `${botName}`
            },
        }
    };

    const imagePath = './termini.jpeg';
    await conn.sendMessage(message.chat, { image: { url: imagePath }, caption: menuText, ...messageOptions }, { quoted: message });
};

async function fetchThumbnail(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        return new Uint8Array(arrayBuffer);
    } catch (error) {
        console.error('Errore durante il fetch della thumbnail:', error);
        return 'default-thumbnail';
    }
}

handler.help = ['candidates'];
handler.tags = ['info'];
handler.command = /^(candidati|candidates|apply)$/i;

export default handler;

function generateMenuText(prefix, botName, userCount, userId, groupId) {
    const title = global.t('candidatesTitle', userId, groupId);
    const intro = global.t('candidatesIntro', userId, groupId);
    const call = global.t('candidatesCall', userId, groupId);
    const whatAwaits = global.t('candidatesWhatAwaits', userId, groupId);
    const benefit1 = global.t('candidatesBenefit1', userId, groupId);
    const benefit2 = global.t('candidatesBenefit2', userId, groupId);
    const benefit3 = global.t('candidatesBenefit3', userId, groupId);
    const benefit4 = global.t('candidatesBenefit4', userId, groupId);
    const cta = global.t('candidatesCTA', userId, groupId);
    const formLabel = global.t('candidatesFormLabel', userId, groupId);

    return `
${title}

${intro}

${call}

${whatAwaits}

•   ${benefit1}
•   ${benefit2}
•   ${benefit3}
•   ${benefit4}

${cta}

> ${formLabel}
[https://docs.google.com/forms/d/e/1FAIpQLSd4no8yx-QuRf7xFyIcLYHLSNkF2cRaHvsO_prmlIwdKqBC4Q/viewform?usp=dialog](https://docs.google.com/forms/d/e/1FAIpQLSd4no8yx-QuRf7xFyIcLYHLSNkF2cRaHvsO_prmlIwdKqBC4Q/viewform?usp=dialog)
`.trim();
}
