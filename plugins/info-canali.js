import '../lib/language.js';

const handler = async (m, { conn }) => {
  const userId = m.sender;
  const groupId = m.isGroup ? m.chat : null;
  
  const text = global.t('canaliText', userId, groupId);

  await conn.sendMessage(m.chat, {
    text,
    footer: global.t('canaliFooter', userId, groupId)
  }, { quoted: m });
};

handler.help = ['canali'];
handler.tags = ['info'];
handler.command = /^(canali|channels|canales)$/i;

export default handler;