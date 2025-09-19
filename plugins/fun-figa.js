import '../lib/language.js';

let handler = async (m, { conn, command, text }) => {
  const userId = m.sender;
  const groupId = m.chat;

  let width = Math.floor(Math.random() * 31);

  let phraseKey = width >= 8
    ? 'figa_phrase_high'
    : 'figa_phrase_low';

  let message = global.t('figa_message', userId, groupId, {
    name: text || 'Tu',
    width,
    phrase: global.t(phraseKey, userId, groupId)
  });

  const messageOptions = {
    contextInfo: {
      forwardingScore: 0,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363259442839354@newsletter',
        serverMessageId: '',
        newsletterName: conn.user.name
      }
    }
  };

  await conn.sendMessage(m.chat, { text: message, ...messageOptions });
};

handler.command = /^(figa|apertura|cmcheck)$/i;

export default handler;
