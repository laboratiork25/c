import '../lib/language.js';
let handler = async (m, { conn }) => {
  let userId = m.sender
  let groupId = m.chat.endsWith('@g.us') ? m.chat : null
  
  const message = global.t('darknessInfoHeader', userId, groupId) + '\n\n' +
    global.t('darknessInfoDescription1', userId, groupId) + '\n\n' +
    global.t('darknessInfoDescription2', userId, groupId) + '\n\n' +
    global.t('darknessInfoDescription3', userId, groupId) + '\n\n' +
    global.t('darknessInfoDescription4', userId, groupId) + '\n\n' +
    global.t('darknessInfoFooter', userId, groupId);

  await conn.sendMessage(m.chat, { text: message }, { quoted: m });
};

handler.help = ['darknessinfo'];
handler.tags = ['pokemon'];
handler.command = /^(darknessinfo|infodarkness|darkness)$/i;

export default handler;