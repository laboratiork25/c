import '../lib/language.js'

const handler = async (m, { conn, usedPrefix, command, args, isOwner, isROwner }) => {
    const userId = m.sender
    const groupId = m.isGroup ? m.chat : null
    
    if (!(isROwner || isOwner)) {
        const noPermissionMessage = global.t('smsOwnerOnly', userId, groupId) || 
            '❌ Solo il proprietario del bot può usare questo comando!'
        return conn.reply(m.chat, noPermissionMessage, m)
    }
    
    if (!args[0]) {
        const helpMessage = global.t('enableHelp', userId, groupId) || 
            `📋 *GESTIONE PLUGIN*\n\nUso: ${usedPrefix}${command} <nome-plugin>\n\nEsempio: ${usedPrefix}${command} welcome\n\nPer vedere tutti i plugin: ${usedPrefix}plugins`
        return conn.reply(m.chat, helpMessage, m)
    }
    
    const pluginName = args[0].toLowerCase()
    
    try {
        // Check if plugin exists
        const pluginPath = `./plugins/${pluginName}.js`
        
        // This is a simplified version - in a real implementation,
        // you would need to manage plugin states in a database or config file
        global.plugins = global.plugins || {}
        
        if (!global.plugins[pluginPath]) {
            const notFoundMessage = global.t('pluginNotFound', userId, groupId) || 
                `❌ Plugin "${pluginName}" non trovato!`
            return conn.reply(m.chat, notFoundMessage, m)
        }
        
        // Enable the plugin
        global.plugins[pluginPath].disabled = false
        
        const successMessage = global.t('pluginEnabled', userId, groupId) || 
            `✅ Plugin "${pluginName}" abilitato con successo!`
        
        await conn.reply(m.chat, successMessage, m)
        
    } catch (error) {
        console.error('Enable plugin error:', error)
        const errorMessage = global.t('smsError', userId, groupId) || 
            '❌ Errore durante l\'abilitazione del plugin.'
        await conn.reply(m.chat, errorMessage, m)
    }
}

handler.help = ['enable', 'abilita']
handler.tags = ['owner']
handler.command = /^(enable|abilita)$/i
handler.rowner = true

export default handler
