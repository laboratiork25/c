import '../lib/language.js';

const cornutoSpeciale = '639318481412@s.whatsapp.net';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  const userId = m.sender;
  const groupId = m.chat;

  let targetText = text;
  if (!targetText && m.quoted) {
    targetText = m.quoted.sender
      ? '@' + m.quoted.sender.split('@')[0]
      : m.quoted.text || '';
  }
  if (!targetText) {
    return conn.reply(groupId, global.t('cornutoNoTarget', userId, groupId), m);
  }

  if (m.sender === cornutoSpeciale) {
    const trollText = global.t('cornutoSpecialText', userId, groupId);
    await conn.sendMessage(
      groupId,
      {
        text: trollText,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363259442839354@newsletter',
            serverMessageId: '',
            newsletterName: '👑 Club dei Cornuti Ufficiale 👑'
          }
        },
        mentions: conn.parseMention(trollText)
      },
      { quoted: m }
    );
    return;
  }

  const percent = Math.floor(Math.random() * 101);
  let baseMsg;
  if (percent < 30) {
    baseMsg = global.t('cornutoLow', userId, groupId);
  } else if (percent < 70) {
    baseMsg = global.t('cornutoMid', userId, groupId);
  } else if (percent < 90) {
    baseMsg = global.t('cornutoHigh', userId, groupId);
  } else {
    baseMsg = global.t('cornutoMax', userId, groupId);
  }

  const advice =
    percent > 75
      ? global.t('cornutoAdviceHigh', userId, groupId)
      : global.t('cornutoAdviceLow', userId, groupId);

  const response = global.t('cornutoResult', userId, groupId, {
    target: targetText,
    percent,
    message: baseMsg,
    advice
  });

  await conn.sendMessage(
    groupId,
    {
      text: response,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363259442839354@newsletter',
          serverMessageId: '',
          newsletterName: '👑 Club dei Cornuti Ufficiale 👑'
        }
      },
      mentions: conn.parseMention(response)
    },
    { quoted: m }
  );
};

handler.help = ['cornuto @nome', 'cornuta @nome', 'corna @nome'];
handler.tags = ['fun'];
handler.command = /^(cornuto|cornuta|corna)$/i;

export default handler;
