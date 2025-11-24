import '../lib/language.js';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  const userId = m.sender;
  const groupId = m.chat;

  if (!text) {
    if (m.quoted && m.quoted.sender) {
      text = '@' + m.quoted.sender.split('@')[0];
    } else {
      return conn.reply(
        groupId,
        global.t('lesbicaCalcNoTarget', userId, groupId, { prefix: usedPrefix, command }),
        m
      );
    }
  }

  const tag = text.replace(/[@\s]/g, '');
  const target = `${tag}@s.whatsapp.net`;

  const percentage = Math.floor(Math.random() * 100) + 1;
  const cmd = command.toLowerCase();

  let textKeyPool = [];

  if (cmd === 'lesbica') {
    textKeyPool = ['lesbicaCalcLine1', 'lesbicaCalcLine2', 'lesbicaCalcLine3'];
  } else if (cmd === 'pajero') {
    textKeyPool = ['pajeroCalcLine1', 'pajeroCalcLine2', 'pajeroCalcLine3'];
  } else if (cmd === 'puttana' || cmd === 'prostituta' || cmd === 'prostituto') {
    textKeyPool = ['puttanaCalcLine1', 'puttanaCalcLine2', 'puttanaCalcLine3'];
  } else {
    const line = global.t('genericCalcLine', userId, groupId, {
      tag,
      percentage,
      cmd
    });
    return conn.sendMessage(
      groupId,
      {
        text: line,
        mentions: [target]
      },
      { quoted: m }
    );
  }

  const key = textKeyPool[Math.floor(Math.random() * textKeyPool.length)];

  const line = global.t(key, userId, groupId, {
    tag,
    percentage
  });

  await conn.sendMessage(
    groupId,
    {
      text: line,
      mentions: [target]
    },
    { quoted: m }
  );
};

handler.help = ['lesbica', 'pajero', 'puttana', 'prostituta', 'prostituto']
  .map(v => `${v} @tag | nome`);
handler.tags = ['fun'];
handler.command = /^(lesbica|pajero|puttana|prostituta|prostituto)$/i;

export default handler;
