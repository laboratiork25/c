import '../lib/language.js';

let handler = async (m, { conn }) => {
  const user = m.sender;
  const userId = m.sender;
  const groupId = m.chat;
  
  global.db.data.users[user] = global.db.data.users[user] || {};
  const data = global.db.data.users[user];

  data.pityCounter = data.pityCounter || 0;

  const rimanenti = Math.max(15 - data.pityCounter, 0);

  let messaggio = `${global.t('pityTitle', userId, groupId)}\n\n`;
  messaggio += `${global.t('pityOpened', userId, groupId, { count: data.pityCounter })}\n`;
  messaggio += `${global.t('pityRemaining', userId, groupId, { remaining: rimanenti })}\n`;

  if (data.pityCounter >= 15) {
    messaggio += `\n${global.t('pityGuaranteed', userId, groupId)}`;
  }

  await conn.sendMessage(m.chat, { text: messaggio, mentions: [user] }, { quoted: m });
};

handler.help = ['pity'];
handler.tags = ['pokemon'];
handler.command = /^pity$/i;

export default handler;
