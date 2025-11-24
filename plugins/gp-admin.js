import '../lib/language.js';

const handler = async (m, { conn, participants, groupMetadata, args, isOwner, isAdmin }) => {
    const userId = m.sender;
    const groupId = m.isGroup ? m.chat : null;
    const nomeDelBot = global.db.data.nomedelbot || 'ChatUnity';
    
    const cooldownInMilliseconds = 18 * 60 * 60 * 1000;
    
    if (!isOwner && !isAdmin) {
        const lastUsed = handler.cooldowns.get(m.sender) || 0;
        const now = Date.now();
        
        if (now - lastUsed < cooldownInMilliseconds) {
            const timeLeft = cooldownInMilliseconds - (now - lastUsed);
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            const timeString = `${hours > 0 ? `${hours} ore, ` : ''}${minutes > 0 ? `${minutes} minuti e ` : ''}${seconds} secondi`;
            
            await m.reply(global.t('adminsCooldown', userId, groupId, { time: timeString }));
            return;
        }
        handler.cooldowns.set(m.sender, now);
    }
    
    const foto = await conn.profilePictureUrl(m.chat, 'image').catch((_) => null) || './media/menu/varebotcoc.jpg';
    const adminGruppo = participants.filter((p) => p.admin);
    const mentionList = adminGruppo.map(p => p.id);
    const messaggioUtente = args.join` ` || global.t('adminsNoMessage', userId, groupId);
    
    const title = global.t('adminsTitle', userId, groupId);
    const messageLabel = global.t('adminsMessage', userId, groupId);
    const warning = global.t('adminsWarning', userId, groupId);
    const notification = global.t('adminsNotification', userId, groupId);
    
    const testo = `${title}

꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧
${mentionList.map((jid, index) => `୧ ${index + 1}. @${jid.split('@')[0]}`).join('\n')}
꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
${messageLabel}:
${messaggioUtente}
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱

> ${warning}

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩`.trim();

    await conn.sendMessage(m.chat, {
        text: testo,
        contextInfo: {
            mentionedJid: mentionList,
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: `${nomeDelBot}`
            },
            externalAdReply: {
                title: global.t('adminsExternalTitle', userId, groupId, { groupName: groupMetadata.subject }),
                body: global.t('adminsExternalBody', userId, groupId),
                thumbnailUrl: foto,
                mediaType: 1,
                renderLargerThumbnail: false
            }
        }
    }, { quoted: m });
};

handler.cooldowns = new Map();

handler.help = ['admins <text>'];
handler.tags = ['group'];
handler.command = /^(admins|@admins|admin|amministratori)$/i;
handler.group = true;

handler.cooldown = 18 * 60 * 60 * 1000;

export default handler;
