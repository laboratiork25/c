import '../lib/language.js';

const setgenereHandler = async (m, { conn, usedPrefix, command, text }) => {
  const who = m.sender;
  const userId = m.sender;
  const groupId = m.chat;

  if (command === 'setgenere') {
    if (!text || !['maschio', 'femmina'].includes(text.toLowerCase())) {
      return conn.reply(m.chat, global.t('setGenderUsage', userId, groupId), m);
    }

    const emoji = text.toLowerCase() === 'maschio' ? '🚹' : '🚺';
    global.db.data.users[who].genere = text.trim().toLowerCase();

    conn.reply(m.chat, global.t('setGenderSuccess', userId, groupId, { gender: text.trim().toLowerCase(), emoji }), m);
  }

  if (command === 'eliminagenere') {
    delete global.db.data.users[who].genere;
    conn.reply(m.chat, global.t('deleteGenderSuccess', userId, groupId), m);
  }
};

setgenereHandler.help = ['setgenere <maschio/femmina>', 'eliminagenere'];
setgenereHandler.tags = ['user'];
setgenereHandler.command = /^(setgenere|eliminagenere)$/i;

export default setgenereHandler;
