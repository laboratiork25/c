import '../lib/language.js';

let handler = async (m, { conn }) => {
  const userId = m.sender;
  const groupId = m.chat;
  
  const message = global.t('darknessInfo', userId, groupId);

  await conn.sendMessage(m.chat, { text: message }, { quoted: m });
};

handler.help = ['darknessinfo'];
handler.tags = ['pokemon'];
handler.command = /^darknessinfo$/i;

export default handler;
