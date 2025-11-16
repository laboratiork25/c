import '../lib/language.js';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    const userId = m.sender;
    const groupId = m.isGroup ? m.chat : null;
    const nomeDelBot = global.db.data.nomedelbot || 'ChatUnity';

    if (!text) return conn.reply(m.chat, global.t('suggestNoText', userId, groupId), m);
    if (text.length < 10) return conn.reply(m.chat, global.t('suggestTooShort', userId, groupId), m);
    if (text.length > 1000) return conn.reply(m.chat, global.t('suggestTooLong', userId, groupId), m);

    const title = global.t('suggestTitle', userId, groupId);
    const numberLabel = global.t('suggestNumber', userId, groupId);
    const userLabel = global.t('suggestUser', userId, groupId);
    const messageLabel = global.t('suggestMessage', userId, groupId);
    const quoteLabel = global.t('suggestQuote', userId, groupId);
    const anonymous = global.t('suggestAnonymous', userId, groupId);

    const suggestText = `*${title}*

${numberLabel}:
• Wa.me/${m.sender.split`@`[0]}

${userLabel}: 
• ${m.pushName || anonymous}

${messageLabel}:
• ${text}`;

    try {
        await conn.reply(global.owner[0][0] + '@s.whatsapp.net', 
            m.quoted ? suggestText + `\n\n${quoteLabel}:\n` + m.quoted.text : suggestText, 
            m, 
            { mentions: conn.parseMention(suggestText) }
        );

        await conn.sendMessage(global.channelid, { 
            text: m.quoted ? suggestText + `\n\n${quoteLabel}:\n` + m.quoted.text : suggestText, 
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363259442839354@newsletter',
                    serverMessageId: '',
                    newsletterName: `${nomeDelBot}`
                },
                externalAdReply: {
                    title: global.t('suggestChannelTitle', userId, groupId),
                    body: global.t('suggestChannelBody', userId, groupId),
                    thumbnailUrl: fotoperfil,
                    sourceUrl: redes,
                    mediaType: 1,
                    showAdAttribution: false,
                    renderLargerThumbnail: false
                }
            }
        }, { quoted: null });

        await m.reply(global.t('suggestSuccess', userId, groupId));
        
    } catch (error) {
        console.error('Errore nella proposta:', error);
        await m.reply(global.t('suggestSuccess', userId, groupId));
    }
};

handler.help = ['suggest'];
handler.tags = ['info'];
handler.command = /^(consiglia|suggest|proponi|propose)$/i;

export default handler;
