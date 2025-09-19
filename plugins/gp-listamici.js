import { createHash } from 'crypto';
import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';
import fs from 'fs';
import '../lib/language.js';

const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const mention = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
    const who = mention || m.sender;

    if (!global.db.data.users) global.db.data.users = {};
    if (!global.db.data.users[who]) global.db.data.users[who] = { amici: [] };

    const user = global.db.data.users[who];
    const friends = user.amici || [];

    const lastFriend = friends[friends.length - 1]; 
    const lastFriendName = lastFriend ? lastFriend.split('@')[0] : global.t('no_friends', m.sender);

    const friendList = friends.length > 0
      ? friends.map((friend, index) => `${index + 1}. @${friend.split('@')[0]}`).join('\n')
      : global.t('no_friends', m.sender);

    const message = global.t('friends_list', m.sender, null, {
      name: user.name && user.name.trim() !== '' ? user.name : global.t('unknown_user', m.sender),
      lastFriend: friends.length > 0 ? "@" + lastFriendName : global.t('no_friends', m.sender),
      friendList: friends.length > 0 ? friendList : global.t('no_friends_list', m.sender)
    });

    await conn.sendMessage(m.chat, {
      text: message,
      mentions: friends
    }, { quoted: m });

  } catch (err) {
    console.error('Error in handler:', err);
    conn.reply(m.chat, global.t('friends_error', m.sender));
  }
};

handler.command = /^(listamici|friendslist|myfriends|amici)$/i;
export default handler;