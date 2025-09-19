import '../lib/language.js';

const gratuito = 500;
const premium = 1000;
const cooldowns = {};

let handler = async (m, { conn, isPrems }) => {
  let user = global.db.data.users[m.sender];
  const tempoAttesa = 24 * 60 * 60; // 24 ore in secondi
  
  // Controllo cooldown
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tempoAttesa * 1000) {
    const tempoRimanente = formattaTempo(Math.ceil((cooldowns[m.sender] + tempoAttesa * 1000 - Date.now()) / 1000));
    
    let message = global.t('daily_cooldown', m.sender, {
      amount: isPrems ? premium : gratuito,
      time: tempoRimanente
    });
    
    await conn.sendMessage(m.chat, { 
        text: message,
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m, detectLink: true });
    return;
  }

  // Assegna le Unitycoins al saldo (limit)
  user.limit += isPrems ? premium : gratuito;
  
  let message = global.t('daily_success', m.sender, {
    amount: isPrems ? premium : gratuito,
    balance: user.limit
  });
  
  await conn.sendMessage(m.chat, { 
      text: message,
      contextInfo: {
          forwardingScore: 99,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: '120363259442839354@newsletter',
              serverMessageId: '',
              newsletterName: 'ChatUnity'
          }
      }
  }, { quoted: m, detectLink: true });

  // Imposta il cooldown
  cooldowns[m.sender] = Date.now();
  global.db.write(); // Salva i dati
}

handler.help = ['daily'];
handler.tags = ['rpg'];
handler.command = /^(giornaliero|claim|daily|rewards)$/i;
handler.register = true;

function formattaTempo(secondi) {
  const ore = Math.floor(secondi / 3600);
  const minuti = Math.floor((secondi % 3600) / 60);
  const secondiRimanenti = secondi % 60;
  return global.t('daily_time_format', null, {
    hours: ore,
    minutes: minuti,
    seconds: secondiRimanenti
  });
}

export default handler;