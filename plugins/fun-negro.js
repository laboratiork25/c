import '../lib/language.js';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  let userId = m.sender;
  let groupId = m.chat;

  let target = text
    ? text.replace(/[@]/g, '') + '@s.whatsapp.net'
    : (m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0]);

  if (!target) return;

  if (command === 'negro' || command === 'nero') {
    let name = await conn.getName(target);
    let percent = Math.floor(Math.random() * 100) + 1;

    conn.reply(
      m.chat,
      global.t('nero_result', userId, groupId, {
        tag: target.split('@')[0],
        percent,
        label: command.toUpperCase()
      }),
      null,
      {
        mentions: [target]
      }
    );
  }
};

handler.help = ['negro', 'nero'].map(v => v + ' @tag | nombre');
handler.tags = ['calculator'];
handler.command = /^(nero|negro|black)$/i;

export default handler;
