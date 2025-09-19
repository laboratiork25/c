import '../lib/language.js';

// Warn handler
let warnHandler = async (m, { conn, text, args, groupMetadata, usedPrefix, command }) => {
  const userId = m.sender;
  const groupId = m.isGroup ? m.chat : null;
  
  let war = 2 // <-- numero di warning prima del ban

  let who
  if (m.isGroup) {
    who = m.mentionedJid?.[0] || m.quoted?.sender
  } else {
    who = m.chat
  }

  if (!who) return m.reply(global.t('warnNoMention', userId, groupId))

  // 🔒 BLOCCA AVVERTIMENTI AL BOT
  if (who === conn.user.jid) {
    return m.reply(global.t('warnBot', userId, groupId))
  }

  if (!(who in global.db.data.users)) {
    return m.reply(global.t('warnUserNotFound', userId, groupId))
  }

  let user = global.db.data.users[who]
  let warn = user.warn || 0
  let nomeDelBot = global.db.data.nomedelbot || global.t('defaultBotName', userId, groupId)

  const messageOptions = {
    contextInfo: {
      mentionedJid: [who],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363259442839354@newsletter',
        serverMessageId: '',
        newsletterName: global.t('newsletterName', userId, groupId, { nomeDelBot })
      }
    }
  }

  if (warn < war) {
    user.warn += 1
    await conn.sendMessage(m.chat, {
      text: global.t('warnMessage', userId, groupId, { 
        current: user.warn, 
        max: war + 1 
      }),
      ...messageOptions
    })
  } else if (warn >= war) {
    user.warn = 0
    await conn.sendMessage(m.chat, {
      text: global.t('warnBanMessage', userId, groupId),
      ...messageOptions
    })
    await sleep(1000)
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
  }
}

warnHandler.help = ['warn @user']
warnHandler.tags = ['group']
warnHandler.command = /^(ammonisci|avvertimento|warn|warning)$/i
warnHandler.group = true
warnHandler.admin = true
warnHandler.botAdmin = true

// Aggiungi la funzione sleep mancante
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default warnHandler