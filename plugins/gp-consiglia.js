import '../lib/language.js';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    const userId = m.sender;
    const groupId = m.isGroup ? m.chat : null;
    
    // Verifica del messaggio di proposta
    if (!text) return conn.reply(m.chat, global.t('proposalNoText', userId, groupId), m)
    if (text.length < 10) return conn.reply(m.chat, global.t('proposalTooShort', userId, groupId), m)
    if (text.length > 1000) return conn.reply(m.chat, global.t('proposalTooLong', userId, groupId), m)
    
    // Formattazione della proposta
    const proposalText = global.t('proposalFormat', userId, groupId, {
        sender: m.sender.split`@`[0],
        pushName: m.pushName || global.t('anonymous', userId, groupId),
        text: text
    })

    try {
        // Invia al proprietario
        await conn.reply(global.owner[0][0] + '@s.whatsapp.net', 
            m.quoted ? proposalText + '\n\n' + global.t('quotedMessage', userId, groupId) + m.quoted.text : proposalText, 
            m, 
            { mentions: conn.parseMention(proposalText) }
        )

        // Invia al canale
        await conn.sendMessage(global.channelid, { 
            text: m.quoted ? proposalText + '\n\n' + global.t('quotedMessage', userId, groupId) + m.quoted.text : proposalText, 
            contextInfo: {
                externalAdReply: {
                    title: global.t('proposalAdTitle', userId, groupId),
                    body: global.t('proposalAdBody', userId, groupId),
                    thumbnailUrl: fotoperfil,
                    sourceUrl: redes,
                    mediaType: 1,
                    showAdAttribution: false,
                    renderLargerThumbnail: false
                }
            }
        }, { quoted: null })

        // Conferma all'utente
        await m.reply(global.t('proposalSuccess', userId, groupId))
        
    } catch (error) {
        console.error(global.t('proposalError', userId, groupId), error)
        await m.reply(global.t('proposalSuccess', userId, groupId))
    }
}

handler.help = ['consiglia']
handler.tags = ['gp']
handler.command = ['consiglia', 'suggerisci', 'proponi', 'suggest']

export default handler