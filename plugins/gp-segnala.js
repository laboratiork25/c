import '../lib/language.js';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    const userId = m.sender;
    const groupId = m.isGroup ? m.chat : null;
    
    // Verifica del messaggio di report
    if (!text) return conn.reply(m.chat, global.t('reportNoText', userId, groupId), m)
    if (text.length < 10) return conn.reply(m.chat, global.t('reportTooShort', userId, groupId), m)
    if (text.length > 1000) return conn.reply(m.chat, global.t('reportTooLong', userId, groupId), m)
    
    // Formattazione del report
    const reportText = global.t('reportFormat', userId, groupId, {
        sender: m.sender.split`@`[0],
        pushName: m.pushName || global.t('anonymous', userId, groupId),
        text: text
    })

    try {
        // Invia al proprietario
        await conn.reply(global.owner[0][0] + '@s.whatsapp.net', 
            m.quoted ? reportText + '\n\n' + global.t('quotedMessage', userId, groupId) + m.quoted.text : reportText, 
            m, 
            { mentions: conn.parseMention(reportText) }
        )

        // Invia al canale
        await conn.sendMessage(global.channelid, { 
            text: m.quoted ? reportText + '\n\n' + global.t('quotedMessage', userId, groupId) + m.quoted.text : reportText, 
            contextInfo: {
                externalAdReply: {
                    title: global.t('reportAdTitle', userId, groupId),
                    body: global.t('reportAdBody', userId, groupId),
                    thumbnailUrl: fotoperfil,
                    sourceUrl: redes,
                    mediaType: 1,
                    showAdAttribution: false,
                    renderLargerThumbnail: false
                }
            }
        }, { quoted: null })

        // Conferma all'utente
        await m.reply(global.t('reportSuccess', userId, groupId))
        
    } catch (error) {
        console.error(global.t('reportError', userId, groupId), error)
        await m.reply(global.t('reportSuccess', userId, groupId))
    }
}

handler.help = ['segnala']
handler.tags = ['info']
handler.command = ['segnala', 'report', 'bug', 'errore', 'reporta', 'feedback']

export default handler