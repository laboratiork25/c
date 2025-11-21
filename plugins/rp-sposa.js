import '../lib/language.js';
const proposals = {};

let handler = async (m, { conn, participants, command, text, args, usedPrefix }) => {
  const userId = m.sender;
  const groupId = m.chat;
  const users = global.db?.data?.users || {};
  const user = users[userId];

  switch (command) {
    case 'sposa':
    case 'marry':
      await handleSposa(m, user, users, text, usedPrefix, conn, userId, groupId);
      break;
    case 'divorzia':
    case 'divorce':
      handleDivorzia(m, user, users, userId, groupId);
      break;
  }
};

const handleSposa = async (m, user, users, text, usedPrefix, conn, userId, groupId) => {
  let mention = (m.mentionedJid && m.mentionedJid[0])
    ? m.mentionedJid[0]
    : (m.quoted ? m.quoted.sender : null);

  if (!mention || typeof mention !== 'string' || !mention.endsWith('@s.whatsapp.net')) {
    throw global.t('marry_no_target', userId, groupId, { prefix: usedPrefix, command: 'sposa' });
  }

  if (mention === userId) {
    throw global.t('marry_self', userId, groupId);
  }

  const destinatario = users[mention];
  if (!destinatario) {
    throw global.t('marry_user_not_found', userId, groupId);
  }

  if (user.sposato) {
    const testo = global.t('marry_already_married_sender', userId, groupId, {
      spouse: `@${user.coniuge?.split('@')[0] || 'sconosciuto'}`
    });
    return m.reply(testo, null, { mentions: user.coniuge ? [user.coniuge] : [] });
  }

  if (destinatario.sposato) {
    const testo = global.t('marry_already_married_target', userId, groupId, {
      target: `@${mention.split('@')[0]}`
    });
    return m.reply(testo, null, { mentions: [mention] });
  }

  if (proposals[userId] || proposals[mention]) {
    throw global.t('marry_pending_proposal', userId, groupId);
  }

  proposals[mention] = { from: userId, timeout: null };
  proposals[userId] = { to: mention, timeout: null };

  const testo = global.t('marry_proposal_text', userId, groupId, {
    target: `@${mention.split('@')[0]}`,
    sender: `@${userId.split('@')[0]}`
  });

  await conn.sendMessage(
    groupId,
    {
      text: testo,
      mentions: [mention, userId],
      buttons: [
        {
          buttonId: ".marry-yes",
          buttonText: { displayText: "💍 Si" },
          type: 1
        },
        {
          buttonId: ".marry-no",
          buttonText: { displayText: "💔 No" },
          type: 1
        }
      ],
      footer: "꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧",
      headerType: 4
    },
    { quoted: m }
  );

  const timeoutCallback = () => {
    if (proposals[mention]) {
      const annullamento = global.t('marry_proposal_expired', null, groupId, {
        sender: `@${userId.split('@')[0]}`,
        target: `@${mention.split('@')[0]}`
      });
      conn.sendMessage(groupId, {
        text: annullamento,
        mentions: [userId, mention]
      });
      delete proposals[mention];
      delete proposals[userId];
    }
  };

  proposals[mention].timeout = setTimeout(timeoutCallback, 60000);
  proposals[userId].timeout = proposals[mention].timeout;
};

handler.before = async (m, { conn }) => {
  if (!m.text) return;

  const userId = m.sender;
  const groupId = m.chat;
  const current = proposals[userId];
  if (!current) return;

  clearTimeout(current.timeout);

  if (/^No|no$/i.test(m.text)) {
    const fromUser = proposals[userId].from || userId;
    delete proposals[fromUser];
    delete proposals[userId];
    return m.reply(global.t('marry_proposal_rejected', userId, groupId), null, { mentions: [fromUser] });
  }

  if (/^Si|si$/i.test(m.text)) {
    const fromUser = proposals[userId].from;
    const toUser = userId;

    const senderUser = global.db?.data?.users?.[fromUser];
    const receiverUser = global.db?.data?.users?.[toUser];

    if (!senderUser || !receiverUser) {
      delete proposals[fromUser];
      delete proposals[toUser];
      return m.reply(global.t('marry_user_not_found_db', userId, groupId));
    }

    senderUser.sposato = true;
    senderUser.coniuge = toUser;
    senderUser.primoMatrimonio = true;
    receiverUser.sposato = true;
    receiverUser.coniuge = fromUser;
    receiverUser.primoMatrimonio = true;

    const testo = global.t('marry_success', userId, groupId, {
      sender: `@${toUser.split('@')[0]}`,
      target: `@${fromUser.split('@')[0]}`
    });

    await m.reply(testo, null, { mentions: [toUser, fromUser] });

    delete proposals[fromUser];
    delete proposals[toUser];
  }
};

const handleDivorzia = (m, user, users, userId, groupId) => {
  if (!user.sposato) {
    throw global.t('divorce_not_married', userId, groupId);
  }

  const ex = users[user.coniuge];
  if (!ex) {
    throw global.t('divorce_spouse_not_found', userId, groupId);
  }

  if (!Array.isArray(user.ex)) user.ex = [];
  if (!user.ex.includes(user.coniuge)) user.ex.push(user.coniuge);

  if (!Array.isArray(ex.ex)) ex.ex = [];
  if (!ex.ex.includes(userId)) ex.ex.push(userId);

  user.sposato = false;
  const exConiuge = user.coniuge;
  user.coniuge = '';
  ex.sposato = false;
  ex.coniuge = '';

  const testo = global.t('divorce_success', userId, groupId, {
    ex: `@${exConiuge?.split('@')[0] || 'sconosciuto'}`
  });

  m.reply(testo, null, { mentions: exConiuge ? [exConiuge] : [] });
};

handler.group = true;
handler.command = /^(sposa|divorzia|marry|divorce)$/i;
export default handler;
