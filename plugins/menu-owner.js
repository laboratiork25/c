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
    const menuText = generateMenuText(usedPrefix, userId, groupId);
    const imagePath = path.join(__dirname, '../media/owner.jpeg');
    const nomeDelBot = conn.user?.name || global.db?.data?.nomedelbot || 'ChatUnity';
    await conn.sendMessage(message.chat, {
        image: fs.existsSync(imagePath) ? { url: imagePath } : { url: 'https://telegra.ph/file/710185c7e0247662d8ca6.png' },
        caption: menuText,
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: nomeDelBot
            }
        }
    }, { quoted: message });
};
handler.help = ['menuowner'];
handler.tags = ['menu'];
handler.command = /^(menuowner)$/i;
export default handler;
function generateMenuText(prefix, userId, groupId) {
    const vs = global.vs || '8.0';
    const collab = global.collab || 'ONE PIECE';
    const menuTitle = global.t('menuownerTitle', userId, groupId);
    const versionText = global.t('menuownerVersionLabel', userId, groupId);
    const collabText = global.t('menuownerCollabLabel', userId, groupId);
    const supportText = global.t('menuownerSupportLabel', userId, groupId);
    const commandList = `
• ⚙️ *${prefix}${global.t('menuownerManageCommand', userId, groupId)}* @
• ⚙️ *${prefix}${global.t('menuownerSetGroupsCommand', userId, groupId)}*
• ⚙️ *${prefix}${global.t('menuownerAddGroupsCommand', userId, groupId)}* @
• ⚙️ *${prefix}${global.t('menuownerResetGroupsCommand', userId, groupId)}* @
• ⚙️ *${prefix}${global.t('menuownerBanUserCommand', userId, groupId)}* @
• ⚙️ *${prefix}${global.t('menuownerUnbanUserCommand', userId, groupId)}* @
• ⚙️ *${prefix}${global.t('menuownerCleanupCommand', userId, groupId)}* (+)
• ⚙️ *${prefix}${global.t('menuownerGetFileCommand', userId, groupId)}*
• ⚙️ *${prefix}${global.t('menuownerSaveCommand', userId, groupId)}* (${global.t('menuownerPluginParam', userId, groupId)})
• ⚙️ *${prefix}${global.t('menuownerDpCommand', userId, groupId)}* (${global.t('menuownerPluginParam', userId, groupId)})
• ⚙️ *${prefix}${global.t('menuownerGetPluginCommand', userId, groupId)}*
• ⚙️ *${prefix}${global.t('menuownerJoinCommand', userId, groupId)}* + ${global.t('menuownerLinkParam', userId, groupId)}
• ⚙️ *${prefix}${global.t('menuownerOutCommand', userId, groupId)}*
• ⚙️ *${prefix}${global.t('menuownerPrefixCommand', userId, groupId)}* (?)
• ⚙️ *${prefix}${global.t('menuownerResetPrefixCommand', userId, groupId)}*
• ⚙️ *${prefix}${global.t('menuownerGodModeCommand', userId, groupId)}* {${global.t('menuownerAutoAdminParam', userId, groupId)}}
• ⚙️ *${prefix}${global.t('menuownerResetCommand', userId, groupId)}* @
• ⚙️ *${prefix}${global.t('menuownerAddCommand', userId, groupId)}* (${global.t('menuownerNumMessagesParam', userId, groupId)}) @
• ⚙️ *${prefix}${global.t('menuownerRemoveCommand', userId, groupId)}* (${global.t('menuownerNumMessagesParam', userId, groupId)}) @
• ⚙️ *${prefix}${global.t('menuownerEveryGroupCommand', userId, groupId)}* (${global.t('menuownerCommandParam', userId, groupId)})
• ⚙️ *${prefix}${global.t('menuownerBanChatCommand', userId, groupId)}* (${global.t('menuownerGroupParam', userId, groupId)})
• ⚙️ *${prefix}${global.t('menuownerUnbanChatCommand', userId, groupId)}* (${global.t('menuownerGroupParam', userId, groupId)})
• ⚙️ *${prefix}${global.t('menuownerRestartCommand', userId, groupId)}*
• ⚙️ *${prefix}${global.t('menuownerShutdownBotCommand', userId, groupId)}*
• ⚙️ *${prefix}${global.t('menuownerUpdateBotCommand', userId, groupId)}*
    `.trim();
    return `
⋆ ︵︵ ★ ${menuTitle} ★ ︵︵ ⋆


*${global.t('menuownerReservedCommands', userId, groupId)}*


꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧
${commandList.split('\n').map(line => line.trim() ? `୧ ${line.trim()}` : '').filter(Boolean).join('\n')}
꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧


╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩
  ୧・*${versionText}:* ${vs}
  ୧・*${collabText}:* ${collab}
  ୧・*${supportText}:* (.supporto)
╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩
`.trim();
}