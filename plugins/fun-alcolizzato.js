import '../lib/language.js';

let handler = async (m, { conn, command, text }) => {
  const userId = m.sender;
  const groupId = m.chat;
  const nomeDelBot = conn.user?.name || global.db?.data?.nomedelbot || 'ChatUnity';

  const width = Math.floor(Math.random() * 101);

  let finalPhrase;
  if (width >= 70) {
    finalPhrase = global.t('alcolHigh', userId, groupId);
  } else if (width >= 30) {
    finalPhrase = global.t('alcolMid', userId, groupId);
  } else {
    finalPhrase = global.t('alcolLow', userId, groupId);
  }

  let targetName;
  if (text && text.trim().length > 0) {
    targetName = text;
  } else {
    targetName = 'Tu';
  }

  const msg = global.t('alcolResult', userId, groupId, {
    target: targetName,
    percent: width,
    phrase: finalPhrase
  });

  await m.reply(
    msg,
    null,
    {
      mentions: conn.parseMention(msg),
      contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363259442839354@newsletter',
          serverMessageId: '',
          newsletterName: nomeDelBot
        }
      }
    }
  );
};

handler.command = /^(alcolizzato|alcol|alcohol)$/i;
handler.tags = ['fun'];
handler.help = ['alcol [@tag | nome]', 'alcohol [@tag | name]'];

export default handler;
