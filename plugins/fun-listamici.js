import '../lib/language.js';
import { createHash } from 'crypto';
import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';
import fs from 'fs';

const handler = async (m, { conn, usedPrefix, command }) => {
  const userId = m.sender;
  const groupId = m.chat;

  try {
    const mention = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null) || userId;
    const who = mention || userId;

    if (!global.db.data.users) global.db.data.users = {};
    if (!global.db.data.users[who]) global.db.data.users[who] = { amici: [], name: '' };

    const user = global.db.data.users[who];
    const friends = Array.isArray(user.amici) ? user.amici : [];

    const displayName = (user.name && user.name.trim() !== '')
      ? user.name
      : await conn.getName(who).catch(() => 'Sconosciuto');

    const lastFriend = friends[friends.length - 1];
    const lastFriendName = lastFriend ? lastFriend.split('@')[0] : null;

    const title = global.t('friendsTitle', userId, groupId, { name: displayName });

    const lastLine = lastFriend
      ? global.t('friendsLastSome', userId, groupId, { last: lastFriendName })
      : global.t('friendsLastNone', userId, groupId);

    const header = global.t('friendsListHeader', userId, groupId);

    const friendList = friends.length > 0
      ? friends.map((friend, index) => `${index + 1}. @${friend.split('@')[0]}`).join('\n')
      : global.t('friendsListEmpty', userId, groupId);

    const message =
`${title}
┌───────────────
│ ${lastLine}
│
│ ${header}
${friends.length > 0 ? friendList : friendList}
└───────────────`;

    await conn.sendMessage(
      m.chat,
      {
        text: message,
        mentions: friends
      },
      { quoted: m }
    );
  } catch (err) {
    console.error('Error in handler:', err);
    await conn.reply(
      m.chat,
      global.t('friendsError', userId, groupId),
      m
    );
  }
};

handler.help = ['listamici', 'friendlist']
handler.command = ['listamici', 'friendlist'];
handler.tag = ['fun']
export default handler;
