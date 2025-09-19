import '../lib/language.js';

let handler = async (m, { conn, text, usedPrefix, command, participants, isOwner, groupMetadata }) => {
  const userId = m.sender;
  const groupId = m.isGroup ? m.chat : null;
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
  let [_, code] = text.match(linkRegex) || [];
  if (!code) throw global.t('invalidLink', userId, groupId) || `Link non valido!`;

  m.reply(global.t('joiningGroup', userId, groupId) || `😎 Attendi 3 secondi, sto entrando nel gruppo`);
  await delay(3000);

  try {
      let res = await conn.groupAcceptInvite(code);
      let b = await conn.groupMetadata(res);
      let d = b.participants.map(v => v.id);
      let member = d.toString();
      let now = new Date() * 1;

      await conn.reply(res, global.t('groupJoinGreeting', userId, groupId, { groupName: b.subject, prefix: usedPrefix }) || `Ciao amici di ${b.subject}\n\nI miei comandi sono visualizzabili in ${usedPrefix}menu`, m, { mentions: d });

  } catch (e) {
      throw global.t('botAlreadyInGroup', userId, groupId) || `Il bot è già nel gruppo`;
  }
}

handler.help = ['join <chat.whatsapp.com>'];
handler.tags = ['owner'];
handler.command = ['join'];
handler.rowner = true;

export default handler;