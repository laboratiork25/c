import '../lib/language.js';

let handler = async (m, { conn }) => {
  const userId = m.sender;
  const groupId = m.isGroup ? m.chat : null;
  
  let guidaMessage = global.t('guidaText', userId, groupId);

  let messageOptions = {
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363259442839354@newsletter',
        serverMessageId: '',
        newsletterName: global.t('newsletterName', userId, groupId)
      }
    }
  };

  conn.reply(m.chat, guidaMessage, m, messageOptions);
};

handler.help = ['guida'];
handler.tags = ['info'];
handler.command = /^(guida|guide|help)$/i;

export default handler;