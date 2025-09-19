import '../lib/language.js';
const handler = async (m, {
    conn, text,
  }) => {
    if (!m.isGroup) {
      throw global.t('threats_group_only', m.sender);
    }
    const gruppi = global.db.data.chats[m.chat];
    if (gruppi.spacobot === false) {
      throw global.t('threats_disabled', m.sender);
    }
    const menzione = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
    if (!menzione) throw global.t('threats_no_target', m.sender);

    const randomThreat = pickRandom([
      global.t('threat_1'),
      global.t('threat_2'),
      global.t('threat_3'),
      global.t('threat_4'),
      global.t('threat_5'),
      global.t('threat_6'),
      global.t('threat_7'),
      global.t('threat_8'),
      global.t('threat_9'),
      global.t('threat_10'),
      global.t('threat_11'),
      global.t('threat_12'),
      global.t('threat_13'),
      global.t('threat_14')
    ]);
    
    const message = `@${menzione.split`@`[0]} ${randomThreat}`;
    const messageOptions = {
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: global.t('threats_bot_name', m.sender)
            },
        }
    };

    // Invia il messaggio con le menzioni e le opzioni
    m.reply(message, null, { mentions: [menzione], ...messageOptions });
  };

handler.command = /^(minaccia|threat|amenaza)$/i;
export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}