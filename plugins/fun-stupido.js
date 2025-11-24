import '../lib/language.js';

const handler = async (m, { conn, args }) => {
  const userId = m.sender;
  const groupId = m.chat;
  
  const text = args.slice(1).join(' ');
  const who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  
  const userTag = who.split('@')[0];
  
  conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/its-so-stupid', {
    avatar: await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
    dog: text || global.t('stupidDefaultText', userId, groupId),
  }), 'stupid.png', global.t('stupidCaption', userId, groupId, { user: userTag }), m);
};

handler.help = ['stupido [@user]', 'stupida [@user]'];
handler.tags = ['fun'];
handler.command = /^(stupida|iss|stupido)$/i;

export default handler;
