let delwarnHandler = async (m, { conn, args, groupMetadata }) => {
  const userId = m.sender;
  const groupId = m.isGroup ? m.chat : null;
  
  let nomeDelBot = global.db.data.nomedelbot || global.t('defaultBotName', userId, groupId)
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
  else who = m.chat
  if (!who) return
  if (!(who in global.db.data.users)) return
  
  let warn = global.db.data.users[who].warn
  if (warn > 0) {
    global.db.data.users[who].warn -= 1
    
    const messageOptions = {
      text: global.t('delwarnMessage', userId, groupId, { 
        remaining: warn - 1 
      }),
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

    await conn.sendMessage(m.chat, messageOptions)
  } else if (warn == 0) {
    return
  }
}

delwarnHandler.help = ['delwarn @user']
delwarnHandler.tags = ['group']
delwarnHandler.command = ['delwarn', 'unwarn'] 
delwarnHandler.group = true
delwarnHandler.admin = true
delwarnHandler.botAdmin = true

// Funzione di attesa
const sleep = async (ms) => new Promise(resolve => setTimeout(resolve, ms))

export { warnHandler, delwarnHandler }