import '../lib/language.js';

const friendRequests = {};

let handler = async (m, { conn, participants, command, text, args, usedPrefix }) => {
  const userId = m.sender;
  const groupId = m.chat;
  const users = global.db?.data?.users || {};
  const user = users[userId];

  switch (command) {
    case 'amicizia':
    case 'friend':
      await handleFriendRequest(m, user, users, text, usedPrefix, conn, userId, groupId);
      break;
    case 'rimuoviamico':
    case 'removefriend':
      handleRemoveFriend(m, user, users, userId, groupId);
      break;
  }
};

const handleFriendRequest = async (m, user, users, text, usedPrefix, conn, userId, groupId) => {
  const mention = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
  if (!mention) {
    throw global.t('friendNoTarget', userId, groupId, { prefix: usedPrefix, command: 'amicizia' });
  }

  if (mention === userId) {
    throw global.t('friendSelf', userId, groupId);
  }

  const destinatario = users[mention];
  if (!destinatario) {
    throw global.t('friendUserNotFound', userId, groupId);
  }

  if (user.amici && user.amici.includes(mention)) {
    const testo = global.t('friendAlready', userId, groupId, {
      target: mention.split('@')[0]
    });
    return m.reply(testo, null, { mentions: [mention] });
  }

  if (friendRequests[userId] || friendRequests[mention]) {
    throw global.t('friendPending', userId, groupId);
  }

  friendRequests[mention] = { from: userId, timeout: null };
  friendRequests[userId] = { to: mention, timeout: null };

  const testo = global.t('friendRequestText', userId, groupId, {
    target: mention.split('@')[0],
    from: userId.split('@')[0]
  });

  const buttons = [
    { buttonId: 'accetta', buttonText: { displayText: '✅ Accetta' }, type: 1 },
    { buttonId: 'rifiuta', buttonText: { displayText: '❌ Rifiuta' }, type: 1 },
    { buttonId: 'rimuoviamico', buttonText: { displayText: '🚫 Rimuovi amico' }, type: 1 }
  ];

  await conn.sendMessage(
    groupId,
    {
      text: testo,
      buttons,
      mentions: [mention, userId],
      headerType: 1
    },
    { quoted: m }
  );

  const timeoutCallback = () => {
    if (friendRequests[mention]) {
      const annullamento = global.t('friendTimeout', userId, groupId, {
        from: userId.split('@')[0],
        target: mention.split('@')[0]
      });
      conn.sendMessage(groupId, { text: annullamento, mentions: [userId, mention] });
      delete friendRequests[mention];
      delete friendRequests[userId];
    }
  };

  friendRequests[mention].timeout = setTimeout(timeoutCallback, 60000);
  friendRequests[userId].timeout = friendRequests[mention].timeout;
};

handler.before = async (m, { conn, participants, command, text, args, usedPrefix }) => {
  const userId = m.sender;
  const groupId = m.chat;

  if (!(userId in friendRequests)) return null;
  if (!m.message || !m.message.buttonsResponseMessage) return;

  const response = m.message.buttonsResponseMessage.selectedButtonId;
  const user = friendRequests[userId];
  if (!user) return;

  clearTimeout(user.timeout);

  if (response === 'rifiuta') {
    const fromUser = friendRequests[userId].from || userId;
    delete friendRequests[fromUser];
    delete friendRequests[userId];
    return m.reply(global.t('friendRejected', userId, groupId), null, { mentions: [fromUser] });
  }

  if (response === 'accetta') {
    const fromUser = friendRequests[userId].from;
    const toUser = userId;

    const senderUser = global.db?.data?.users?.[fromUser];
    const receiverUser = global.db?.data?.users?.[toUser];

    if (!Array.isArray(senderUser.amici)) senderUser.amici = [];
    if (!Array.isArray(receiverUser.amici)) receiverUser.amici = [];

    if (!senderUser.amici.includes(toUser)) senderUser.amici.push(toUser);
    if (!receiverUser.amici.includes(fromUser)) receiverUser.amici.push(fromUser);

    const testo = global.t('friendAccepted', userId, groupId, {
      from: fromUser.split('@')[0]
    });

    await m.reply(testo, null, { mentions: [fromUser] });

    delete friendRequests[fromUser];
    delete friendRequests[toUser];
  }
};

const handleRemoveFriend = (m, user, users, userId, groupId) => {
  const mention = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
  if (!mention) {
    throw global.t('removeFriendNoTarget', userId, groupId);
  }

  if (!user.amici || !user.amici.includes(mention)) {
    throw global.t('removeFriendNotInList', userId, groupId, {
      target: mention.split('@')[0]
    });
  }

  user.amici = user.amici.filter(friend => friend !== mention);
  const friend = users[mention];
  if (friend && Array.isArray(friend.amici)) {
    friend.amici = friend.amici.filter(f => f !== userId);
  }

  const testo = global.t('removeFriendSuccess', userId, groupId, {
    target: mention.split('@')[0]
  });

  m.reply(testo, null, { mentions: [mention] });
};

handler.command = ['amicizia', 'aggiungiamico', 'rimuoviamico', 'friend', 'addfriend', 'befriend', 'removefriend', 'deletefriend', 'unfriend', 'amigo', 'agregaramigo', 'añadiramigo', 'eliminadamigo', 'quitarmigo', 'borraramigo', 'amigo', 'adicionaramigo', 'adicionaramizade', 'removeramigo', 'apagaramigo', 'excluiramigo', 'freund', 'freundhinzufügen', 'freundaddieren', 'freundentfernen', 'freundlöschen', 'freundentbinden', '朋友', '添加朋友', '加为好友', '删除朋友', '移除好友', 'друг', 'добавитьдруга', 'добавитьвдрузья', 'удалитьдруга', 'убратьиздрузей', 'صديق', 'اضافةصديق', 'احذفصديق', 'ازالصداقة', 'दोस्त', 'मित्रजोड़ें', 'दोस्तहटाएं', 'दोस्तमिटाएं', 'ami', 'ajouterami', 'ajouterunami', 'supprimerami', 'retirerami', 'enleverami', 'teman', 'tambahteman', 'tambahkansahabat', 'hapusteman', 'hapuskanteman', 'buangteman', 'arkadaş', 'arkadaşıekle', 'arkadaşekle', 'arkadaşısil', 'arkadaşıkaldır', 'arkadaşçıkar'];

handler.help = ['amicizia @user', 'aggiungiamico @user', 'rimuoviamico @user', 'friend @user', 'addfriend @user', 'befriend @user', 'removefriend @user', 'deletefriend @user', 'unfriend @user', 'amigo @user', 'agregaramigo @user', 'añadiramigo @user', 'eliminadamigo @user', 'quitarmigo @user', 'borraramigo @user', 'amigo @user', 'adicionaramigo @user', 'adicionaramizade @user', 'removeramigo @user', 'apagaramigo @user', 'excluiramigo @user', 'freund @user', 'freundhinzufügen @user', 'freundaddieren @user', 'freundentfernen @user', 'freundlöschen @user', 'freundentbinden @user', '朋友 @user', '添加朋友 @user', '加为好友 @user', '删除朋友 @user', '移除好友 @user', 'друг @user', 'добавитьдруга @user', 'добавитьвдрузья @user', 'удалитьдруга @user', 'убратьиздрузей @user', 'صديق @user', 'اضافةصديق @user', 'احذفصديق @user', 'ازالصداقة @user', 'दोस्त @user', 'मित्रजोड़ें @user', 'दोस्तहटाएं @user', 'दोस्तमिटाएं @user', 'ami @user', 'ajouterami @user', 'ajouterunami @user', 'supprimerami @user', 'retirerami @user', 'enleverami @user', 'teman @user', 'tambahteman @user', 'tambahkansahabat @user', 'hapusteman @user', 'hapuskanteman @user', 'buangteman @user', 'arkadaş @user', 'arkadaşıekle @user', 'arkadaşekle @user', 'arkadaşısil @user', 'arkadaşıkaldır @user', 'arkadaşçıkar @user'];

handler.tags = ['fun'];

export default handler;

