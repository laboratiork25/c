import '../lib/language.js'

const handler = async (m, { conn, text, usedPrefix, command, isOwner, isAdmin }) => {
  const userId = m.sender
  const groupId = m.isGroup ? m.chat : null
  
  // Check if user provided a language code
  if (text) {
    const langCode = text.toLowerCase().trim()
    
    if (langCode === 'it' || langCode === 'en') {
      // Set language for user
      const success = global.languageManager.setUserLanguage(userId, langCode)
      
      if (success) {
        global.languageManager.saveToDatabase()
        // Use the new language to show the confirmation message
        const message = global.t('languageChanged', userId, groupId, { lang: langCode })
        return conn.reply(m.chat, message, m)
      } else {
        const message = global.t('invalidLanguage', userId, groupId)
        return conn.reply(m.chat, message, m)
      }
    } else {
      const message = global.t('invalidLanguage', userId, groupId)
      return conn.reply(m.chat, message, m)
    }
  } else {
    // Show current language and help
    const currentLang = global.languageManager.getUserLanguage(userId, groupId)
    const helpMessage = global.t('languageHelp', userId, groupId, { prefix: usedPrefix })
    const currentMessage = global.t('currentLanguage', userId, groupId, { lang: currentLang })
    
    return conn.reply(m.chat, `${currentMessage}\n\n${helpMessage}`, m)
  }
}

// Command metadata
handler.help = ['lingua <it/en>', 'language <it/en>']
handler.tags = ['config']
handler.command = /^(lingua|language|lang)$/i

export default handler
