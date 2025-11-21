import '../lib/language.js';

let limiteXP = 3000;

let handler = async (m, { conn, usedPrefix, command }) => {
  const userId = m.sender;
  const groupId = m.chat;
  const db = global.db.data.users;

  if (new Date() - db[userId].ultimoFurto < 7200000) {
    const tempoAttesa = db[userId].ultimoFurto + 7200000;
    const diffTime = tempoAttesa - new Date();
    const { hours, minutes, seconds } = formattaTempo(diffTime);
    return conn.reply(
      m.chat,
      global.t('rubaxpWaitTime', userId, groupId, { time: rubaxpTimeFormat({ hours, minutes, seconds }) }),
      m
    );
  }

  let target;
  if (m.isGroup) {
    target = m.mentionedJid?.[0] ?? (m.quoted ? m.quoted.sender : false);
  } else {
    target = m.chat;
  }

  if (!target) return conn.reply(m.chat, global.t('rubaxpNoTarget', userId, groupId), m);
  if (!(target in db)) return conn.reply(m.chat, global.t('rubaxpUserNotFound', userId, groupId), m);

  const user = db[target];
  const xpRubati = Math.floor(Math.random() * limiteXP);

  if (user.exp < xpRubati) {
    return conn.reply(
      m.chat,
      global.t('rubaxpTooPoor', userId, groupId, { target: target.split('@')[0], limit: limiteXP }),
      m,
      { mentions: [target] }
    );
  }

  db[userId].exp += xpRubati;
  db[target].exp -= xpRubati;

  await conn.reply(
    m.chat,
    global.t('rubaxpSuccess', userId, groupId, { amount: xpRubati, target: target.split('@')[0] }),
    m,
    { mentions: [target] }
  );

  db[userId].ultimoFurto = Date.now();
};

function formattaTempo(durata) {
  const secondi = Math.floor((durata / 1000) % 60);
  const minuti = Math.floor((durata / (1000 * 60)) % 60);
  const ore = Math.floor((durata / (1000 * 60 * 60)) % 24);
  return { hours: ore, minutes: minuti, seconds: secondi };
}

handler.help = ['rubaxp'];
handler.tags = ['rpg'];
handler.command = ['rubaxp'];

export default handler;
