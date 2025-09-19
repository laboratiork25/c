import axios from 'axios';
import '../lib/language.js';

let handler = async (m, { conn, usedPrefix, command, text }) => {
  let user = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;
  let userId = m.sender;
  let groupId = m.chat;

  let name = await conn.getName(user);
  let randomPercent = Math.floor(Math.random() * 100) + 1;

  let avatarUrl;
  try {
    avatarUrl = await conn.profilePictureUrl(user, 'image').catch(_ => null);
    if (!avatarUrl) throw new Error('No avatar');
  } catch {
    avatarUrl = 'https://telegra.ph/file/6880771a42bad09dd6087.jpg';
  }

  const apiUrl = `https://api.siputzx.my.id/api/canvas/gay?nama=${encodeURIComponent(name)}&avatar=${encodeURIComponent(avatarUrl)}&num=${randomPercent}`;

  try {
    const response = await axios.get(apiUrl, {
      responseType: 'arraybuffer',
    });

    const buffer = Buffer.from(response.data, 'binary');

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: global.t('gay.caption', userId, groupId, {
        user: user.split('@')[0],
        percent: randomPercent
      }),
      mentions: [user],
    }, { quoted: m });

  } catch (e) {
    console.error('Error in gay command:', e);
    m.reply(global.t('gay.error', userId, groupId));
  }
};

handler.help = ['gay @utente'];
handler.tags = ['fun'];
handler.command = /^(gay|frocio|rainbow)$/i;

export default handler;
