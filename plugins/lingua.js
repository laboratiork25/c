import '../lib/language.js'

const handler = async (m, { conn, text, usedPrefix, command, isOwner, isAdmin }) => {
  const userId = m.sender
  const groupId = m.isGroup ? m.chat : null

  // Check if it's a group command for group language
  if (m.isGroup && text?.toLowerCase().startsWith('group')) {
    // Only admins can change group language
    if (!isAdmin && !isOwner) {
      return m.reply(global.t('smsOnlyAdmin', userId, groupId))
    }
    
    const langCode = text.toLowerCase().replace('group', '').trim()
    if (langCode === 'it' || langCode === 'en') {
      const success = global.languageManager.setGroupLanguage(groupId, langCode)
      if (success) {
        global.languageManager.saveToDatabase()
        return conn.reply(m.chat, `🌍 Lingua del gruppo cambiata in: ${langCode === 'it' ? 'Italiano 🇮🇹' : 'English 🇬🇧'}`, m)
      }
    }
    return conn.reply(m.chat, `❌ Uso corretto: ${usedPrefix}${command} group it/en`, m)
  }

  // Personal language change
  if (text) {
    const langCode = text.toLowerCase().trim()
    if (langCode === 'it' || langCode === 'en') {
      global.languageManager.setUserLanguage(userId, langCode)
      global.languageManager.saveToDatabase()
      return conn.reply(m.chat, `🌍 La tua lingua personale è stata cambiata in: ${langCode === 'it' ? 'Italiano 🇮🇹' : 'English 🇬🇧'}`, m)
    } 
    return conn.reply(m.chat, `❌ Uso corretto: ${usedPrefix}${command} it/en`, m)
  }

  // Show help menu if no parameters
  const helpText = `🌍 *Impostazioni Lingua*

*Lingua Personale:*
• ${usedPrefix}${command} it - Imposta Italiano
• ${usedPrefix}${command} en - Imposta Inglese

*Lingua Gruppo (Solo Admin):*
• ${usedPrefix}${command} group it - Imposta Italiano
• ${usedPrefix}${command} group en - Imposta Inglese

*Lingua Attuale:*
• Personale: ${global.languageManager.getUserLanguage(userId)}
${groupId ? `• Gruppo: ${global.languageManager.getUserLanguage(userId, groupId)}` : ''}`

  return conn.reply(m.chat, helpText, m)
}

handler.help = ['lingua <it/en>', 'lingua group <it/en>']
handler.tags = ['config']
handler.command = /^(lingua|language|lang)$/i

export default handler
