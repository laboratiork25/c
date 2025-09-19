import '../lib/language.js';
let handler = async (m, { conn, text }) => {
  if (!m.isGroup) throw '';
  
  let gruppi = global.db.data.chats[m.chat];
  if (gruppi.spacobot === false) throw '';
  
  let menzione = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
  if (!menzione) throw global.t('insulta_no_target', m.sender);
  
  if (menzione === conn.user.jid) {
    const botInsults = [
      global.t('bot_insult_1', m.sender),
      global.t('bot_insult_2', m.sender),
      global.t('bot_insult_3', m.sender),
      global.t('bot_insult_4', m.sender),
      global.t('bot_insult_5', m.sender),
      global.t('bot_insult_6', m.sender),
      global.t('bot_insult_7', m.sender),
      global.t('bot_insult_8', m.sender),
      global.t('bot_insult_9', m.sender),
      global.t('bot_insult_10', m.sender),
      global.t('bot_insult_11', m.sender),
      global.t('bot_insult_12', m.sender),
      global.t('bot_insult_13', m.sender),
      global.t('bot_insult_14', m.sender),
      global.t('bot_insult_15', m.sender),
      global.t('bot_insult_16', m.sender),
      global.t('bot_insult_17', m.sender),
      global.t('bot_insult_18', m.sender),
      global.t('bot_insult_19', m.sender),
      global.t('bot_insult_20', m.sender),
      global.t('bot_insult_21', m.sender),
      global.t('bot_insult_22', m.sender),
      global.t('bot_insult_23', m.sender),
      global.t('bot_insult_24', m.sender),
      global.t('bot_insult_25', m.sender),
      global.t('bot_insult_26', m.sender),
      global.t('bot_insult_27', m.sender),
      global.t('bot_insult_28', m.sender),
      global.t('bot_insult_29', m.sender),
      global.t('bot_insult_30', m.sender),
      global.t('bot_insult_31', m.sender),
      global.t('bot_insult_32', m.sender),
      global.t('bot_insult_33', m.sender),
      global.t('bot_insult_34', m.sender),
      global.t('bot_insult_35', m.sender),
      global.t('bot_insult_36', m.sender),
      global.t('bot_insult_37', m.sender),
      global.t('bot_insult_38', m.sender),
      global.t('bot_insult_39', m.sender),
      global.t('bot_insult_40', m.sender),
    ];
    
    return conn.reply(m.chat, pickRandom(botInsults), m);
  }
  
  conn.reply(m.chat, `@${menzione.split('@')[0]} ${pickRandom(global.insultiList)}`, m, {
    mentions: [menzione],
  });
};

handler.command = /^insulta$/i;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// Inizializza la lista di insulti
global.insultiList = Array.from({ length: 70 }, (_, i) => 
    global.t(`insult_${i + 1}`, null)
);