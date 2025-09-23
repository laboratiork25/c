import '../lib/language.js';
let cooldowns = {};

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  
  // Inizializza exp se non è già presente
  user.exp = Number(user.exp) || 0;
  
  // Genera un risultato casuale tra 0 e 4999
  let risultato = Math.floor(Math.random() * 5000);
  let nome = conn.getName(m.sender);
  let tempoAttesa = 5 * 60 * 1000; // 5 minuti in millisecondi

  // Controllo cooldown singolo utente
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tempoAttesa) {
    let tempoRimanente = secondiAMMS(Math.ceil((cooldowns[m.sender] + tempoAttesa - Date.now()) / 1000));
    await conn.sendMessage(m.chat, { 
        text: global.t('mining_cooldown', m.sender, null, { nome: nome, tempo: tempoRimanente }),
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363422724720651@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });
    return;
  }

  // Aggiorna exp utente con il risultato della minata
  user.exp += risultato;
  await conn.sendMessage(m.chat, { 
      text: global.t('mining_complete', m.sender, null, { risultato: risultato, totale: user.exp }),
      contextInfo: {
          forwardingScore: 99,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: '120363422724720651@newsletter',
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

// Converte secondi in stringa mm:ss es: 2m 10s
function secondiAMMS(secondi) {
  let minuti = Math.floor(secondi / 60);
  let secondiRimanenti = secondi % 60;
  return `${minuti}m ${secondiRimanenti}s`;
}
