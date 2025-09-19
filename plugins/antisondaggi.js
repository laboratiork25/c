import '../lib/language.js'

// Anti-poll plugin - prevents polls in groups
const handler = async (m, { conn, isAdmin, isBotAdmin }) => {
    const userId = m.sender
    const groupId = m.isGroup ? m.chat : null
    
    // Only work in groups
    if (!m.isGroup) return
    
    // Don't process bot's own messages
    if (m.isBaileys) return
    
    // Check if message is a poll
    const isPoll = m.message?.pollCreationMessage || m.message?.pollCreationMessageV2
    
    if (isPoll) {
        try {
            // Delete the poll message if bot is admin
            if (isBotAdmin) {
                await conn.sendMessage(m.chat, { delete: m.key })
            }
            
            // Send warning message
            const warningMessage = global.t('antiPollWarning', userId, groupId) || 
                `⚠️ *SONDAGGIO RILEVATO* ⚠️\n\nIl sondaggio di @${m.sender.split('@')[0]} è stato rimosso.\n\n❌ I sondaggi non sono consentiti in questo gruppo.`
            
            await conn.sendMessage(m.chat, {
                text: warningMessage,
                mentions: [m.sender]
            })
            
        } catch (error) {
            console.error('Anti-poll error:', error)
        }
    }
}

handler.before = true
handler.group = true

export default handler
