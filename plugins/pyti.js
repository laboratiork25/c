import '../lib/language.js';

let handler = async (m, { conn }) => {
  const userId = m.sender;
  const groupId = m.isGroup ? m.chat : null;
  
  const user = m.sender;
  global.db.data.users[user] = global.db.data.users[user] || {};
  const data = global.db.data.users[user];

  data.pityCounter = data.pityCounter || 0;

  const rimanenti = Math.max(15 - data.pityCounter, 0);

  let messaggio = global.t('pitySystem', userId, groupId, {
    pityCounter: data.pityCounter,
    remaining: rimanenti
  });

  if (data.pityCounter >= 15) {
    messaggio += global.t('pityGuaranteed', userId, groupId);
  }

  await conn.sendMessage(m.chat, { 
    text: messaggio, 
    mentions: [user] 
  }, { quoted: m });
};

handler.help = ['pity'];
handler.tags = ['pokemon'];
handler.command = /^(pity|pitycounter|darknesscounter)$/i;

export default handler;