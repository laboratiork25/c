import { performance } from 'perf_hooks';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import '../lib/language.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (message, { conn, usedPrefix, command }) => {
    const userId = message.sender;
    const groupId = message.isGroup ? message.chat : null;
    const userCount = Object.keys(global.db.data.users).length;
    const botName = global.db.data.nomedelbot || 'ChatUnity';

    const menuText = generateMenuText(usedPrefix, botName, userCount, userId, groupId);
    const videoPath = path.join(__dirname, '../media/principale.gif');

    const footerText = global.t('menuFooter', userId, groupId);
    const adminMenuText = global.t('menuAdmin', userId, groupId);
    const ownerMenuText = global.t('menuOwner', userId, groupId);
    const securityMenuText = global.t('menuSecurity', userId, groupId);
    const groupMenuText = global.t('menuGroup', userId, groupId);
    const aiMenuText = global.t('menuAI', userId, groupId);

    const buttons = [
        { quickReplyButton: { displayText: adminMenuText, id: `${usedPrefix}menuadmin` } },
        { quickReplyButton: { displayText: ownerMenuText, id: `${usedPrefix}menuowner` } },
        { quickReplyButton: { displayText: securityMenuText, id: `${usedPrefix}menusicurezza` } },
        { quickReplyButton: { displayText: groupMenuText, id: `${usedPrefix}menugruppo` } },
        { quickReplyButton: { displayText: aiMenuText, id: `${usedPrefix}menuia` } }
    ];

    const msg = {
        video: { url: videoPath },
        caption: menuText,
        footer: footerText,
        templateButtons: buttons
    };

    await conn.sendMessage(message.chat, msg, { quoted: message });
};

handler.help = ['menu'];
handler.tags = ['menu'];
handler.command = /^(menu|comandi|commands)$/i;

export default handler;

function generateMenuText(prefix, botName, userCount, userId, groupId) {
    const menuTitle = global.t('mainMenuTitle', userId, groupId);
    const staffText = global.t('staffCommand', userId, groupId);
    const candidatesText = global.t('candidatesCommand', userId, groupId);
    const installText = global.t('installCommand', userId, groupId);
    const channelsText = global.t('channelsCommand', userId, groupId);
    const systemText = global.t('systemCommand', userId, groupId);
    const pingText = global.t('pingCommand', userId, groupId);
    const reportText = global.t('reportCommand', userId, groupId);
    const suggestText = global.t('suggestCommand', userId, groupId);
    const versionText = global.t('versionLabel', userId, groupId);
    const collabText = global.t('collabLabel', userId, groupId);
    const usersText = global.t('usersLabel', userId, groupId);
    const vs = global.vs || '8.0';

    return `
⋆ ︵★ ${menuTitle} ★︵ ⋆
୧ 👑 ୭ *${prefix}${staffText}*
୧ 📜 ୭ *${prefix}${candidatesText}*
୧ 📥 ୭ *${prefix}${installText}*
୧ 📝 ୭ *${prefix}${channelsText}* 
୧ ⚙️ ୭ *${prefix}${systemText}*
୧ 🚀 ୭ *${prefix}${pingText}*
୧ 📝 ୭ *${prefix}${reportText}* 
୧ 💡 ୭ *${prefix}${suggestText}* 
୧ 🤖 ୭ *${prefix}chatunity*
୧ 🗣️ ୭ *${prefix}gruppi*
╰♡꒷ ๑ ⋆˚₊⋆──ʚ˚ɞ──⋆˚₊⋆ ๑ ⪩
  ୧・${versionText}: ${vs}
  ୧・${collabText}
  ୧・${usersText}: ${userCount}
╰♡꒷ ๑ ⋆˚₊⋆──ʚ˚ɞ──⋆˚₊⋆ ๑ ⪩
`.trim();
}