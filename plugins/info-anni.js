import '../lib/language.js';

const setetaHandler = async (m, { conn, command, text }) => {
  const who = m.sender;
  const userId = m.sender;
  const groupId = m.chat;

  const repliedMessage = m.quoted?.text?.trim();
  const isReplyToSetanni = m.quoted?.text?.includes('.setanni') || m.quoted?.text?.includes('Età');

  const etaFromReply = parseInt(m.text);
  const isValidEta = !isNaN(etaFromReply) && etaFromReply >= 10 && etaFromReply <= 80;

  if (m.quoted && isValidEta && isReplyToSetanni) {
    global.db.data.users[who].eta = etaFromReply;
    return conn.reply(m.chat, global.t('setAgeSuccess', userId, groupId, { age: etaFromReply }), m);
  }

  if (command === 'setanni') {
    const eta = parseInt(text);
    if (!eta || isNaN(eta) || eta < 10 || eta > 80) {
      return conn.reply(m.chat, global.t('setAgeUsage', userId, groupId), m);
    }

    global.db.data.users[who].eta = eta;
    return conn.reply(m.chat, global.t('setAgeSuccess', userId, groupId, { age: eta }), m);
  }

  if (command === 'eliminaanni') {
    delete global.db.data.users[who].eta;
    return conn.reply(m.chat, global.t('deleteAgeSuccess', userId, groupId), m);
  }
};

setetaHandler.help = ['setanni <età>', 'eliminaanni'];
setetaHandler.tags = ['user'];
setetaHandler.command = /^(setanni|eliminaanni)$/i;

export default setetaHandler;
