import '../lib/language.js';

let handler = async (m, { conn, command, text }) => {
  const userId = m.sender;
  const groupId = m.chat;

  let width = Math.floor(Math.random() * 101);

  let phraseKey = width >= 70
    ? 'drogato_phrase_high'
    : width >= 30
    ? 'drogato_phrase_mid'
    : 'drogato_phrase_low';

  let message = global.t('drogato_message', userId, groupId, {
    name: text || 'Tu',
    percent: width,
    phrase: global.t(phraseKey, userId, groupId)
  });

  const messageOptions = {
    contextInfo: {
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363259442839354@newsletter',
        serverMessageId: '',
        newsletterName: global.t('drogato_newsletter_name', userId, groupId)
      },
    }
  };

  m.reply(message, null, {
    mentions: conn.parseMention(message),
    ...messageOptions
  });
};

handler.command = /^(drogato|droga|stonato|fumato)$/i;

export default handler;
