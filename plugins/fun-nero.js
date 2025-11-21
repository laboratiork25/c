import '../lib/language.js';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  const userId = m.sender;
  const groupId = m.chat;

  let target =
    (text && text.replace(/[@\s]/g, '') + '@s.whatsapp.net') ||
    (m.quoted ? m.quoted.sender : (m.mentionedJid && m.mentionedJid[0]));

  if (!target) {
    return m.reply(
      global.t('raceCalcNoTarget', userId, groupId, { prefix: usedPrefix, command }),
      null
    );
  }

  const tag = target.split('@')[0];
  const percent = Math.floor(Math.random() * 100) + 1;
  const label = command.toLowerCase();

  const msg = global.t('raceCalcLine', userId, groupId, {
    tag,
    percent,
    label
  });

  await conn.reply(
    groupId,
    msg.trim(),
    null,
    {
      mentions: [target]
    }
  );
};

handler.help = ['negro', 'nero'].map(v => v + ' @tag | nome');
handler.tags = ['calculator'];
handler.command = /^(nero|nigga|nigger|negro)$/i;

export default handler;
