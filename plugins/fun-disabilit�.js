import '../lib/language.js';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  let userId = m.sender;
  let groupId = m.chat;

  if (!text) {
    if (m.quoted && m.quoted.sender) {
      text = '@' + m.quoted.sender.split('@')[0];
    } else {
      return conn.reply(m.chat, global.t('brain_tag_required', userId, groupId, {
        example: `${usedPrefix + command} @utente`
      }), m);
    }
  }

  let tag = text.replace(/[@]/g, '');
  let target = tag + '@s.whatsapp.net';
  let randomPercent = Math.floor(Math.random() * 100) + 1;

  let messaggioFinale = `🧠 *TEST NEURONALE COMPLETATO*\n@${tag} ha ottenuto ${randomPercent}% di attività cerebrale.\n\n${
    global.t('brain_warning', userId, groupId, { randomPercent })
  }\n\n💥 *CONCLUSIONE:* ${
    global.t('brain_conclusion', userId, groupId, { randomPercent })
  }`.trim();

  await conn.sendMessage(m.chat, {
    text: messaggioFinale,
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363259442839354@newsletter',
        newsletterName: '🔥 *SALA VERDETTI SPARATI* 🔥'
      }
    },
    mentions: [target]
  }, { quoted: m });
};

handler.help = ['down', 'ritardato', 'mongoloide', 'disabile', 'ritardata'].map(v => v + ' @tag | nome');
handler.tags = ['satira', 'game'];
handler.command = /^(down|ritardato|mongoloide|disabile|ritardata|braincheck|neuroni)$/i;

export default handler;
