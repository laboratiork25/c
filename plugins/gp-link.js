import '../lib/language.js';
async function handler(m, { conn, isBotAdmin }) {
    const userId = m.sender;
    const groupId = m.chat;
    if (!isBotAdmin) {
        return await conn.sendMessage(m.chat, {
            text: global.t('linkgroupNoBotAdmin', userId, groupId)
        }, { quoted: m });
    }
    const metadata = await conn.groupMetadata(m.chat);
    const inviteCode = await conn.groupInviteCode(m.chat);
    const nomeDelBot = conn.user?.name || global.db?.data?.nomedelbot || 'ChatUnity';
    await conn.sendMessage(m.chat, {
        text: global.t('linkgroupLinkTitle', userId, groupId, { groupName: metadata.subject }),
        footer: global.t('linkgroupLinkFooter', userId, groupId),
        interactiveButtons: [
            {
                name: 'cta_copy',
                buttonParamsJson: JSON.stringify({
                    display_text: global.t('linkgroupCopyButton', userId, groupId),
                    copy_code: `https://chat.whatsapp.com/${inviteCode}`
                })
            }
        ],
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
handler.help = ['linkgroup'];
handler.tags = ['group'];
handler.command = /^link(gro?up)?$/i;
handler.group = true;
handler.botAdmin = true;
export default handler;
