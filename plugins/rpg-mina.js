import '../lib/language.js';
let cooldowns = {};

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  
  // Inizializzazione sicura
  user.exp = Number(user.exp) || 0;
  
  let risultato = Math.floor(Math.random() * 5000);
  let nome = conn.getName(m.sender);
  let tempoAttesa = 5 * 60 * 1000; // 5 minuti in millisecondi

  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tempoAttesa) {
    let tempoRimanente = secondiAMMS(Math.ceil((cooldowns[m.sender] + tempoAttesa - Date.now()) / 1000));
    await conn.sendMessage(m.chat, { 
        text: global.t('mining_cooldown', m.sender, null, { nome: nome, tempo: tempoRimanente }),
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
    return;
  }

  user.exp += risultato;
  await conn.sendMessage(m.chat, { 
      text: global.t('mining_complete', m.sender, null, { risultato: risultato, totale: user.exp }),
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
  await m.react('⛏');
  cooldowns[m.sender] = Date.now();
};

handler.help = ['mina'];
handler.tags = ['rpg'];
handler.command = /^(mina|miming|mine|mining|dig)$/i;
handler.register = true;
export default handler;

function secondiAMMS(secondi) {
  let minuti = Math.floor(secondi / 60);
  let secondiRimanenti = secondi % 60;
  return `${minuti}m ${secondiRimanenti}s`;
}