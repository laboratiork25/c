import { performance } from 'perf_hooks'
import '../lib/language.js';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let nomeDelBot = global.db.data.nomedelbot || global.t('fap_default_bot_name', m.sender, null, null, {})

  // Identifica il destinatario: risposto o menzionato
  let destinatario;
  if (m.quoted && m.quoted.sender) {
    destinatario = m.quoted.sender;
  } else if (m.mentionedJid && m.mentionedJid.length > 0) {
    destinatario = m.mentionedJid[0];
  } else {
    return m.reply(global.t('fap_no_target', m.sender, null, null, { prefix: usedPrefix, command: command }));
  }

  let nomeDestinatario = `@${destinatario.split('@')[0]}`

  // Messaggio iniziale
  let { key } = await conn.sendMessage(m.chat, { 
    text: global.t('fap_start', m.sender, null, null, { target: nomeDestinatario }),
    mentions: [destinatario]
  }, { quoted: m })

  const array = [
    global.t('fap_animation_1', m.sender, null, null, {}),
    global.t('fap_animation_2', m.sender, null, null, {}),
    global.t('fap_animation_3', m.sender, null, null, {}),
    global.t('fap_animation_4', m.sender, null, null, {}),
    global.t('fap_animation_5', m.sender, null, null, {})
  ]

  for (let item of array) {
    await conn.sendMessage(m.chat, { 
      text: item, 
      edit: key,
      mentions: [destinatario]
    }, { quoted: m })
    await new Promise(resolve => setTimeout(resolve, 20))
  }

  // Messaggio finale
  return conn.sendMessage(m.chat, { 
    text: global.t('fap_finish', m.sender, null, null, { target: nomeDestinatario }),
    edit: key,
    mentions: [destinatario]
  }, { quoted: m })
}

handler.help = ['sega']
handler.tags = ['fun']
handler.command = /^(sega|fap|masturbate)$/i

export default handler