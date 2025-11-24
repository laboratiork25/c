import '../lib/language.js';
import axios from 'axios';

let handler = async (m, { conn, command, usedPrefix }) => {
  const userId = m.sender;
  const groupId = m.chat;
  const mentions = m.mentionedJid || [];

  let user1;
  let user2;

  if (/^crush$/i.test(command)) {
    if (mentions.length !== 1) {
      return m.reply(global.t('shipNoUser', userId, groupId, { prefix: usedPrefix, command }));
    }
    user1 = userId;
    user2 = mentions[0];
  } else if (/^ship$/i.test(command)) {
    if (mentions.length === 1) {
      user1 = userId;
      user2 = mentions[0];
    } else if (mentions.length >= 2) {
      user1 = mentions[0];
      user2 = mentions[1];
    } else {
      return m.reply(global.t('shipNoUsersPair', userId, groupId, { prefix: usedPrefix, command }));
    }
  }

  if (!user1 || !user2) {
    return m.reply(global.t('shipInvalidUsers', userId, groupId));
  }

  let name1 = 'Utente 1';
  let name2 = 'Utente 2';
  try {
    name1 = await conn.getName(user1);
  } catch {}
  try {
    name2 = await conn.getName(user2);
  } catch {}

  let avatar1;
  let avatar2;
  try {
    avatar1 = await conn.profilePictureUrl(user1, 'image');
  } catch {
    avatar1 = 'https://telegra.ph/file/6880771a42bad09dd6087.jpg';
  }

  try {
    avatar2 = await conn.profilePictureUrl(user2, 'image');
  } catch {
    avatar2 = 'https://telegra.ph/file/6880771a42bad09dd6087.jpg';
  }

  const background = 'https://i.ibb.co/4YBNyvP/images-76.jpg';
  const percent = Math.floor(Math.random() * 101);

  const apiUrl = `https://api.siputzx.my.id/api/canvas/ship?avatar1=${encodeURIComponent(avatar1)}&avatar2=${encodeURIComponent(avatar2)}&background=${encodeURIComponent(background)}&persen=${percent}`;

  try {
    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');

    const caption = global.t('shipCaption', userId, groupId, {
      user1: user1.split('@')[0],
      user2: user2.split('@')[0],
      percent
    });

    await conn.sendMessage(
      groupId,
      {
        image: buffer,
        caption,
        mentions: [user1, user2],
        buttons: [
          {
            buttonId: `${usedPrefix}crush @${user1.split('@')[0]}`,
            buttonText: { displayText: '💘 Crush Again' },
            type: 1
          },
          {
            buttonId: `${usedPrefix}ship @${user1.split('@')[0]} @${user2.split('@')[0]}`,
            buttonText: { displayText: '🔁 Ricalcola' },
            type: 1
          }
        ],
        footer: '꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧'
      },
      { quoted: m }
    );
  } catch (err) {
    console.error(err);
    return m.reply(global.t('shipErrorImage', userId, groupId));
  }
};

handler.help = ['ship @utente1 [@utente2]', 'crush @utente', 'ship @user1 [@user2]', 'crush @user', 'ship @amigo1 [@amigo2]', 'crush @amigo', 'ship @amigo1 [@amigo2]', 'crush @amigo', 'ship @freund1 [@freund2]', 'crush @freund', 'ship @朋友1 [@朋友2]', 'crush @朋友', 'ship @друг1 [@друг2]', 'crush @друг', 'ship @صديق1 [@صديق2]', 'crush @صديق', 'ship @दोस्त1 [@दोस्त2]', 'crush @दोस्त', 'ship @ami1 [@ami2]', 'crush @ami', 'ship @teman1 [@teman2]', 'crush @teman', 'ship @arkadaş1 [@arkadaş2]', 'crush @arkadaş'];

handler.tags = ['fun'];

handler.command = /^(ship|crush|match|coppia|coppietta|shipea|emparejar|pareja|casal|casalzinho|paar|verkuppeln|配对|姻缘|шип|пара|توافق|حب|जोड़ी|मिलान|couple|amour|jodoh|pasangan|eşleştir|çift)$/i;

export default handler;
