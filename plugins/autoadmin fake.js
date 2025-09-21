import { performance } from 'perf_hooks'
import '../lib/language.js';

let handler = async (m, { conn, usedPrefix }) => {
  let nomeDelBot = global.db.data.nomedelbot || `𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲`
  
  const messageOptions = {
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363422724720651@newsletter',
        serverMessageId: '',
        newsletterName: `${nomeDelBot}`
      }
    }
  }

  let info = `
𝐑𝐢𝐭𝐞𝐧𝐭𝐚, 𝐬𝐚𝐫𝐚𝐢 𝐩𝐢𝐮́ 𝐟𝐨𝐫𝐭𝐮𝐧𝐚𝐭𝐨 😂`.trim()

  await conn.sendMessage(m.chat, {
    text: info,
    ...messageOptions
  })
}

handler.help = ['autoadmin']
handler.tags = ['fun']
handler.command = /^(autoadmin)$/i

export default handler