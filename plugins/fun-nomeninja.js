import '../lib/language.js';

function handler(m, { text }) {
  const userId = m.sender;
  const groupId = m.chat;

  if (!text) {
    return conn.sendMessage(m.chat, {
      text: global.t('nomeninja_missing', userId, groupId),
      contextInfo: {
        forwardingScore: 99,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363259442839354@newsletter',
          serverMessageId: '',
          newsletterName: global.t('nomeninja_newsletter', userId, groupId)
        }
      }
    }, { quoted: m });
  }

  let teks = text || (m.quoted && m.quoted.text) || m.text;
  let ninjaName = teks.replace(/[a-z]/gi, v => {
    return {
      'a': 'ka', 'b': 'tsu', 'c': 'mi', 'd': 'te', 'e': 'ku', 'f': 'hi',
      'g': 'ji', 'h': 'ri', 'i': 'ki', 'j': 'zu', 'k': 'me', 'l': 'ta',
      'm': 'rin', 'n': 'to', 'o': 'mo', 'p': 'no', 'q': 'ke', 'r': 'shi',
      's': 'ari', 't': 'chi', 'u': 'do', 'v': 'ru', 'w': 'mei', 'x': 'na',
      'y': 'fu', 'z': 'mori'
    }[v.toLowerCase()] || v;
  });

  conn.sendMessage(m.chat, {
    text: ninjaName,
    contextInfo: {
      forwardingScore: 99,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363259442839354@newsletter',
        serverMessageId: '',
        newsletterName: global.t('nomeninja_newsletter', userId, groupId)
      }
    }
  }, { quoted: m });
}

handler.help = ['nomeninja *<nome>*'];
handler.tags = ['fun'];
handler.command = /^(nomeninja|ninja_name|shinobi)$/i;
handler.register = true;

export default handler;
