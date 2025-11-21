import '../lib/language.js';

let cooldowns = {};

let handler = async (m, { conn, text, command, usedPrefix }) => {
  const userId = m.sender;
  const groupId = m.chat;
  let users = global.db.data.users;

  const senderId = m.sender;
  const senderName = await conn.getName(senderId);

  // Trova il target: da menzione o messaggio citato
  let targetId = m.mentionedJid?.[0] || m.quoted?.sender;

  if (!targetId) {
    return m.reply(global.t('robNoTarget', userId, groupId, { prefix: usedPrefix, command }));
  }

  if (targetId === senderId) {
    return m.reply(global.t('robSelf', userId, groupId));
  }

  // Inizializza utenti se non esistono
  if (!users[senderId]) users[senderId] = { limit: 0 };
  if (!users[targetId]) users[targetId] = { limit: 0 };
  if (!users[senderId].limit) users[senderId].limit = 0;
  if (!users[targetId].limit) users[targetId].limit = 0;

  // Cooldown 5 minuti
  const cooldownTime = 5 * 60 * 1000;
  if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < cooldownTime) {
    let tempoRimanente = formattaTempo(Math.ceil((cooldowns[senderId] + cooldownTime - Date.now()) / 1000));
    return m.reply(global.t('robCooldown', userId, groupId, { time: tempoRimanente }));
  }

  cooldowns[senderId] = Date.now();

  const minRubare = 50;
  const maxRubare = 100;
  const quantita = Math.floor(Math.random() * (maxRubare - minRubare + 1)) + minRubare;

  const esito = Math.floor(Math.random() * 3); // 0 = successo, 1 = catturato, 2 = parziale

  const buttons = [
    { buttonId: `${usedPrefix}portafoglio`, buttonText: { displayText: global.t('robButtonWallet', userId, groupId) }, type: 1 }
  ];

  switch (esito) {
    case 0: // Successo
      users[senderId].limit += quantita;
      users[targetId].limit = Math.max(0, users[targetId].limit - quantita);
      
      await conn.sendMessage(m.chat, { 
        react: { text: '💰', key: m.key }
      });
      
      await conn.sendMessage(m.chat, {
        text: global.t('robSuccess', userId, groupId, {
          amount: formatNumber(quantita),
          target: targetId.split("@")[0]
        }),
        buttons: buttons,
        footer: 'ChatUnity RPG',
        mentions: [targetId]
      }, { quoted: m });
      break;

    case 1: // Catturato
      let multa = Math.min(Math.floor(Math.random() * (users[senderId].limit - minRubare + 1)) + minRubare, maxRubare);
      multa = Math.max(0, multa);
      users[senderId].limit = Math.max(0, users[senderId].limit - multa);
      
      await conn.sendMessage(m.chat, { 
        react: { text: '🚓', key: m.key }
      });
      
      await conn.sendMessage(m.chat, {
        text: global.t('robCaught', userId, groupId, {
          fine: formatNumber(multa),
          name: senderName
        }),
        buttons: buttons,
        footer: 'ChatUnity RPG'
      }, { quoted: m });
      break;

    case 2: // Parziale
      let parziale = Math.min(Math.floor(Math.random() * (users[targetId].limit / 2 - minRubare + 1)) + minRubare, maxRubare);
      parziale = Math.max(0, parziale);
      users[senderId].limit += parziale;
      users[targetId].limit = Math.max(0, users[targetId].limit - parziale);
      
      await conn.sendMessage(m.chat, { 
        react: { text: '💸', key: m.key }
      });
      
      await conn.sendMessage(m.chat, {
        text: global.t('robPartial', userId, groupId, {
          amount: formatNumber(parziale),
          target: targetId.split("@")[0]
        }),
        buttons: buttons,
        footer: 'ChatUnity RPG',
        mentions: [targetId]
      }, { quoted: m });
      break;
  }

  global.db.write();
};

handler.help = ['ruba @user', 'rob @user', 'rapina'];
handler.tags = ['rpg'];
handler.command = /^(ruba|rapina|rob|steal)$/i;
handler.register = true;
handler.group = true;

function formattaTempo(secondi) {
  let minuti = Math.floor(secondi / 60);
  let secondiRimanenti = Math.floor(secondi % 60);
  return `${minuti}m ${secondiRimanenti}s`;
}

function formatNumber(num) {
  return new Intl.NumberFormat('it-IT').format(num);
}

export default handler;
