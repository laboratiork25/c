import '../lib/language.js'

const handler = async (m, { conn, text, usedPrefix, command, isOwner, isAdmin }) => {
  const userId = m.sender
  const groupId = m.isGroup ? m.chat : null
  const validLanguages = ['it', 'en', 'zh', 'ar', 'fr', 'hi', 'id', 'pt', 'ru', 'es', 'de', 'tr']

  // Check if it's a group command for group language
  if (m.isGroup && text?.toLowerCase().startsWith('group')) {
    // Only admins can change group language
    if (!isAdmin && !isOwner) {
      return m.reply(global.t('smsOnlyAdmin', userId, groupId))
    }
    
    const langCode = text.toLowerCase().replace('group', '').trim()
    if (validLanguages.includes(langCode)) {
      const success = global.languageManager.setGroupLanguage(groupId, langCode)
      if (success) {
        global.languageManager.saveToDatabase()
        const langNames = { it: 'Italiano 🇮🇹', en: 'English 🇬🇧', zh: '中文 🇨🇳', ar: 'العربية 🇸🇦', fr: 'Français 🇫🇷', hi: 'हिन्दी 🇮🇳', id: 'Bahasa Indonesia 🇮🇩', pt: 'Português 🇵🇹', ru: 'Русский 🇷🇺', es: 'Español 🇪🇸', de: 'Deutsch 🇩🇪', tr: 'Türkçe 🇹🇷' }
        return conn.reply(m.chat, `🌍 Lingua del gruppo cambiata in: ${langNames[langCode]}`, m)
      }
    }
    return conn.reply(m.chat, `❌ Uso corretto: ${usedPrefix}${command} group it/en/zh/ar/fr/hi/id/pt/ru/es/de/tr`, m)
  }

  // Personal language change
  if (text) {
    const langCode = text.toLowerCase().trim()
    if (validLanguages.includes(langCode)) {
      global.languageManager.setUserLanguage(userId, langCode)
      global.languageManager.saveToDatabase()
      const langNames = { it: 'Italiano 🇮🇹', en: 'English 🇬🇧', zh: '中文 🇨🇳', ar: 'العربية 🇸🇦', fr: 'Français 🇫🇷', hi: 'हिन्दी 🇮🇳', id: 'Bahasa Indonesia 🇮🇩', pt: 'Português 🇵🇹', ru: 'Русский 🇷🇺', es: 'Español 🇪🇸', de: 'Deutsch 🇩🇪', tr: 'Türkçe 🇹🇷' }
      return conn.reply(m.chat, `🌍 La tua lingua personale è stata cambiata in: ${langNames[langCode]}`, m)
    } 
    return conn.reply(m.chat, `❌ Uso corretto: ${usedPrefix}${command} it/en/zh/ar/fr/hi/id/pt/ru/es/de/tr`, m)
  }

  // Show help menu if no parameters
  const helpText = `🌍 *Impostazioni Lingua*

*Lingue Disponibili:*
• 🇮🇹 it - Italiano
• 🇬🇧 en - English
• 🇨🇳 zh - 中文 (Cinese)
• 🇸🇦 ar - العربية (Arabo)
• 🇫🇷 fr - Français (Francese)
• 🇮🇳 hi - हिन्दी (Hindi)
• 🇮🇩 id - Bahasa Indonesia
• 🇵🇹 pt - Português (Portoghese)
• 🇷🇺 ru - Русский (Russo)
• 🇪🇸 es - Español (Spagnolo)
• 🇩🇪 de - Deutsch (Tedesco)
• 🇹🇷 tr - Türkçe (Turco)

*Lingua Personale:*
• ${usedPrefix}${command} <codice> - Imposta la tua lingua

*Lingua Gruppo (Solo Admin):*
• ${usedPrefix}${command} group <codice> - Imposta lingua del gruppo

*Lingua Attuale:*
• Personale: ${global.languageManager.getUserLanguage(userId)}
${groupId ? `• Gruppo: ${global.languageManager.getUserLanguage(userId, groupId)}` : ''}`

  return conn.reply(m.chat, helpText, m)
}

handler.help = ['lingua <it/en>', 'lingua group <it/en>']
handler.tags = ['config']
handler.command = /^(lingua|language|lang)$/i

export default handler
