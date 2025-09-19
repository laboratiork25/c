import '../lib/language.js'

const handler = async (m, { conn, participants, groupMetadata, isAdmin, isBotAdmin }) => {
    const userId = m.sender
    const groupId = m.isGroup ? m.chat : null
    
    if (!m.isGroup) {
        const errorMessage = global.t('smsGroupOnly', userId, groupId) || 
            '❌ Questo comando può essere usato solo nei gruppi!'
        return conn.reply(m.chat, errorMessage, m)
    }
    
    if (!isAdmin) {
        const noPermissionMessage = global.t('smsAdminOnly', userId, groupId) || 
            '❌ Solo gli amministratori possono usare questo comando!'
        return conn.reply(m.chat, noPermissionMessage, m)
    }
    
    if (!isBotAdmin) {
        const botNotAdminMessage = global.t('smsBotNotAdmin', userId, groupId) || 
            '❌ Il bot deve essere amministratore per eseguire questo comando!'
        return conn.reply(m.chat, botNotAdminMessage, m)
    }
    
    try {
        const groupParticipants = participants || groupMetadata?.participants || []
        const admins = groupParticipants.filter(p => p.admin === 'admin' || p.admin === 'superadmin')
        
        let adminText = '👑 *AMMINISTRATORI DEL GRUPPO*\n\n'
        
        if (admins.length === 0) {
            adminText += '❌ Nessun amministratore trovato.'
        } else {
            admins.forEach((admin, index) => {
                const adminId = admin.id || admin
                const adminName = admin.notify || adminId.split('@')[0] || 'Sconosciuto'
                const adminType = admin.admin === 'superadmin' ? '👑 Super Admin' : '🛡️ Admin'
                
                adminText += `${index + 1}. ${adminName}\n`
                adminText += `   ${adminType}\n`
                adminText += `   @${adminId.split('@')[0]}\n\n`
            })
        }
        
        adminText += `📊 *Totale amministratori:* ${admins.length}\n`
        adminText += `👥 *Totale membri:* ${groupParticipants.length}`
        
        await conn.reply(m.chat, adminText, m, {
            mentions: admins.map(admin => admin.id || admin)
        })
        
    } catch (error) {
        console.error('Admin list error:', error)
        const errorMessage = global.t('smsError', userId, groupId) || 
            '❌ Errore durante il recupero della lista amministratori.'
        await conn.reply(m.chat, errorMessage, m)
    }
}

handler.help = ['admins', 'amministratori']
handler.tags = ['group']
handler.command = /^(admins|amministratori)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
