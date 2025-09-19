import '../lib/language.js';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  let userId = m.sender;
  let groupId = m.chat;

  if (!text) {
    if (m.quoted && m.quoted.sender) {
      text = '@' + m.quoted.sender.split('@')[0];
    } else {
      return conn.reply(m.chat, global.t('tag_required', userId, groupId, {
        example: `${usedPrefix + command} @utente`
      }), m);
    }
  }

  let tag = text.replace(/[@]/g, '');
  let target = tag + '@s.whatsapp.net';
  let name = await conn.getName(target);
  let percentage = Math.floor(Math.random() * 100) + 1;

  let cmd = command.toLowerCase();

  let response = {
    emoji: global.t(`${cmd}_emoji`, userId, groupId),
    messages: global.t(`${cmd}_messages`, userId, groupId, {
      tag,
      percentage
    })
  };

  let randomMessage = response.messages[Math.floor(Math.random() * response.messages.length)];

  await conn.sendMessage(m.chat, {
    text: `${response.emoji} ${randomMessage}`,
    mentions: [target]
  }, { quoted: m });
};

handler.help = ['gay', 'lesbica', 'puttana', 'prostituta', 'prostituto']
  .map(v => v + ' @tag | nome');
handler.tags = ['fun'];
handler.command = /^(lesbica|puttana|prostituta|prostituto|slut|whore|dyke|hooker)$/i;

export default handler;
