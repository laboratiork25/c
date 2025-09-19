import MessageType from '@whiskeysockets/baileys'
import '../lib/language.js';

let tassa = 0.02 // 2% di tassa sulle transazioni

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0] // Se in gruppo, prende l'utente menzionato
  else who = m.chat // Se in privato, usa l'utente corrente
  
  if (!who) throw global.t('transferxp_no_user', m.sender, { prefix: usedPrefix, command: command })
  
  let txt = text.replace('@' + who.split`@`[0], '').trim()
  if (!txt) throw global.t('transferxp_no_amount', m.sender)
  if (isNaN(txt)) throw global.t('transferxp_nan', m.sender)
  
  let xp = parseInt(txt)
  let exp = xp
  let tassaImporto = Math.ceil(xp * tassa) // Calcola la tassa del 2%
  exp += tassaImporto
  
  if (exp < 1) throw global.t('transferxp_minimum', m.sender)
  
  let users = global.db.data.users
  if (exp > users[m.sender].exp) throw global.t('transferxp_insufficient', m.sender)
  
  // Esegui la transazione
  users[m.sender].exp -= exp
  users[who].exp += xp

  // Messaggio di conferma
  let confirmationMessage = global.t('transferxp_confirmation', m.sender, {
    amount: xp,
    tax: tassaImporto,
    total: exp
  });
  
  await conn.sendMessage(m.chat, { 
      text: confirmationMessage,
      contextInfo: {
          forwardingScore: 99,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: '120363259442839354@newsletter',
              serverMessageId: '',
              newsletterName: 'ChatUnity'
          }
      }
  }, { quoted: m });

  // Notifica al ricevente
  let recipientMessage = global.t('transferxp_recipient', who, { amount: xp });
  await conn.sendMessage(m.chat, { 
      text: recipientMessage,
      contextInfo: {
          forwardingScore: 99,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: '120363259442839354@newsletter',
              serverMessageId: '',
              newsletterName: 'ChatUnity'
          }
      }
  }, { quoted: m, mentions: [who] });
}

handler.help = ['darxp *@user <quantità>*']
handler.tags = ['rpg']
handler.command = /^(daixp|daiexp|donaxp|givexp|transferxp)$/i 
handler.register = true 

export default handler