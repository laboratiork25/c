import '../lib/language.js';

let handler = async (m, { conn, text, participants, command, usedPrefix }) => {
  const userId = m.sender;
  const groupId = m.chat;

  if (!text) {
    if (m.quoted && m.quoted.sender) {
      text = '@' + m.quoted.sender.split('@')[0];
    } else {
      return conn.reply(
        groupId,
        global.t('kissNoTargetMention', userId, groupId, { prefix: usedPrefix, command }),
        m
      );
    }
  }

  let utentiMenzionati = m.mentionedJid || [];
  if (!utentiMenzionati.length && m.quoted && m.quoted.sender) {
    utentiMenzionati = [m.quoted.sender];
  }

  if (!utentiMenzionati.length) {
    return m.reply(global.t('kissNoTarget', userId, groupId));
  }

  const utenteBaciato = utentiMenzionati[0];

  const senderName = await conn.getName(userId);
  const targetName = await conn.getName(utenteBaciato);

  const messaggio = global.t('kissSuccess', userId, groupId, {
    senderName,
    targetName
  });

  await conn.sendMessage(
    groupId,
    {
      text: messaggio,
      mentions: [utenteBaciato],
      buttons: [
        {
          buttonId: `${usedPrefix}bacia @${userId.split('@')[0]}`,
          buttonText: { displayText: '💋 Ricambia il bacio' },
          type: 1
        }
      ],
      footer: '꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧'
    },
    { quoted: m }
  );
};
handler.help = ['bacia @user', 'kiss @user']
handler.command = ['bacia', 'kiss'];
handler.tag = ['fun']
export default handler;

