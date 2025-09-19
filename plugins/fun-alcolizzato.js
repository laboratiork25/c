import '../lib/language.js';

let handler = async (m, { conn, command, text }) => {
  const userId = m.sender;
  const groupId = m.chat;

  let width = Math.floor(Math.random() * 101);

  let finalKey = width >= 70
    ? 'alcol_phrase_high'
    : width >= 30
    ? 'alcol_phrase_mid'
    : 'alcol_phrase_low';

  let message = global.t('alcol_message', userId, groupId, {
    name: text || 'Tu',
    percent: width,
    phrase: global.t(finalKey, userId, groupId)
  });

  const messageOptions = {
    contextInfo: {
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363259442839354@newsletter',
        serverMessageId: '',
        newsletterName: global.t('alcol_newsletter_name', userId, groupId)
      },
    }
  };

  m.reply(message, null, {
    mentions: conn.parseMention(message),
    ...messageOptions
  });
};

handler.command = /^(alcolizzato|alcol|ubriaco|vino|birra)$/i;

export default handler;
