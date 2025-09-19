import '../lib/language.js';

const handler = async (msg, { client, conn }) => {
  const userId = msg.sender;
  const groupId = msg.chat;

  const percent = Math.floor(Math.random() * 101);
  if (!conn?.sendMessage) throw new Error("Bro, manca il conn 😒");

  const savageReactions = global.t('infame_reactions', userId, groupId, { percent });
  const randomSavage = savageReactions[Math.floor(Math.random() * savageReactions.length)];

  const livello = percent > 80
    ? global.t('infame_admin', userId, groupId)
    : percent > 50
    ? global.t('infame_zone', userId, groupId)
    : global.t('infame_clean', userId, groupId);

  const response = global.t('infame_result', userId, groupId, {
    percent,
    livello,
    reaction: randomSavage
  });

  await conn.sendMessage(
    msg.chat,
    {
      text: response,
      mentions: [msg.sender],
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: global.t('infame_title', userId, groupId),
          body: global.t('infame_body', userId, groupId),
          thumbnail: Buffer.alloc(0)
        }
      }
    },
    { quoted: msg }
  );
};

handler.command = /^(infame|quantosbirro|sbirrocheck|snitchlevel|ratmeter)$/i;
handler.tags = ['social'];
handler.help = ['infame @user', 'quantosbirro (scopri quanto sei infame)'];

export default handler;
