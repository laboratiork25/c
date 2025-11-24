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
    const imagePath = path.join(__dirname, '../media/admin.jpeg');

    await conn.sendMessage(message.chat, {
        image: { url: imagePath },
        caption: menuText,
        footer: global.t('chooseMenu', userId, groupId),
        buttons: [
            { buttonId: `${usedPrefix}menu`, buttonText: { displayText: global.t('mainMenuButton', userId, groupId) }, type: 1 },
            { buttonId: `${usedPrefix}menuowner`, buttonText: { displayText: global.t('ownerMenuButton', userId, groupId) }, type: 1 },
            { buttonId: `${usedPrefix}menusicurezza`, buttonText: { displayText: global.t('securityMenuButton', userId, groupId) }, type: 1 },
            { buttonId: `${usedPrefix}menugruppo`, buttonText: { displayText: global.t('groupMenuButton', userId, groupId) }, type: 1 },
            { buttonId: `${usedPrefix}menuia`, buttonText: { displayText: global.t('aiMenuButton', userId, groupId) }, type: 1 }
        ],
        viewOnce: true,
        headerType: 4
    });
};

handler.help = ['menuadmin'];
handler.tags = ['menuadmin'];
handler.command = /^(menuadmin|adminmenu)$/i;

export default handler;

function generateMenuText(prefix, userId, groupId) {
    const menuTitle = global.t('adminMenuTitle', userId, groupId);

    const commandList = `
• 👑 *${global.t('promoteCommand', userId, groupId)}*
• 👑 *${global.t('demoteCommand', userId, groupId)}*
• 👑 *${global.t('warnCommands', userId, groupId)}*
• 👑 *${global.t('setNameCommand', userId, groupId)}*
• 👑 *${global.t('hidetagCommand', userId, groupId)}*
• 👑 *${global.t('tagallCommand', userId, groupId)}*
• 👑 *${global.t('kickCommand', userId, groupId)}*
• 👑 *${global.t('adminsCommand', userId, groupId)}*
• 👑 *${global.t('openCloseCommand', userId, groupId)}*
• 👑 *${global.t('setWelcomeCommand', userId, groupId)}*
• 👑 *${global.t('setByeCommand', userId, groupId)}*
• 👑 *${global.t('inactiveCommand', userId, groupId)}*
• 👑 *${global.t('listNumCommand', userId, groupId)}*
• 👑 *${global.t('cleanupCommand', userId, groupId)}*
• 👑 *${global.t('rulesCommand', userId, groupId)}*
• 👑 *${global.t('listWarnCommand', userId, groupId)}*
• 👑 *${global.t('linkCommand', userId, groupId)}*
• 👑 *${global.t('linkQrCommand', userId, groupId)}*
• 👑 *${global.t('requestsCommand', userId, groupId)}*
    `.trim();

    return `
⋆ ︵︵ ★ ${menuTitle} ★ ︵︵ ⋆

*${global.t('adminCommands', userId, groupId)} 👑*

꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧
${commandList.split('\n').map(line => `୧ ${line.trim()}`).join('\n')}
꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

> © ${global.t('poweredBy', userId, groupId)} 𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲
`.trim();
}
