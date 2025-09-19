import '../lib/language.js';

let handler = async (m, { conn, command, text }) => {
  const cornutoSpeciale = '639318481412@s.whatsapp.net';
  const userId = m.sender;
  const groupId = m.chat;

  if (!text) {
    return conn.reply(m.chat, global.t('cornuto_missing_name', userId, groupId), m);
  }

  if (m.sender === cornutoSpeciale) {
    let trollText = global.t('cornuto_speciale_text', userId, groupId);
    await conn.sendMessage(m.chat, {
      text: trollText,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363259442839354@newsletter',
          newsletterName: global.t('cornuto_newsletter_name', userId, groupId)
        }
      },
      mentions: conn.parseMention(trollText)
    }, { quoted: m });
    return;
  }

  let percent = Math.floor(Math.random() * 101);
  let statusKey =
    percent < 30 ? 'cornuto_status_low'
    : percent < 70 ? 'cornuto_status_mid'
    : percent < 90 ? 'cornuto_status_high'
    : 'cornuto_status_max';

  let finaleKey = percent > 75 ? 'cornuto_finale_alert' : 'cornuto_finale_safe';

  let response = global.t('cornuto_response', userId, groupId, {
    name: text,
    percent,
    status: global.t(statusKey, userId, groupId),
    finale: global.t(finaleKey, userId, groupId)
  });

  await conn.sendMessage(m.chat, {
    text: response,
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363259442839354@newsletter',
        newsletterName: global.t('cornuto_newsletter_name', userId, groupId)
      }
    },
    mentions: conn.parseMention(response)
  }, { quoted: m });
};

handler.help = ['cornuto @nome'];
handler.tags = ['fun'];
handler.command = /^(cornuto|cornutezza|corna|hornmeter|betrayed)$/i;
handler.fail = global.t('cornuto_fail', null, null);

export default handler;
