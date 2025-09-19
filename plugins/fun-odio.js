import '../lib/language.js';
let handler = async (m, { conn, command, text }) => {
    let nomeDelBot = global.db.data.nomedelbot || global.t('default_bot_name', m.sender)
  
    let love = global.t('hate_calculator', m.sender, null, { 
        user1: text, 
        user2: 'te', 
        percentage: Math.floor(Math.random() * 100) 
    })
  
    await conn.sendMessage(m.chat, {
      text: love,
      contextInfo: {
        mentionedJid: conn.parseMention(love),
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363259442839354@newsletter',
          serverMessageId: '',
          newsletterName: `${nomeDelBot}`
        }
      }
    })
  }
  
  handler.command = /^(odio|hate|hatred|dislike)$/i
  handler.tags = ['fun']
  handler.help = ['odio @tag']
  
  export default handler