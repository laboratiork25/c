import '../lib/language.js'

let handler = async (m, { conn, text, args, command }) => {
  const userId = m.sender
  const groupId = m.isGroup ? m.chat : null
  const jid = m.chat;
  const now = Date.now();
  const startTime = now + 60 * 60 * 1000;
  const endTime = now + 3 * 60 * 60 * 1000;

  const eventName = global.t('eventName', userId, groupId) || 'mangiamo zozzap'
  const eventDescription = global.t('eventDescription', userId, groupId) || 'preparate i culi'
  const eventLocationName = global.t('eventLocationName', userId, groupId) || 'zozzap'

  await conn.sendMessage(
    jid,
    {
      event: {
        isCanceled: false,
        name: eventName,
        description: eventDescription,
        location: {
          degreesLatitude: 45.4642,
          degreesLongitude: 9.19,
          name: eventLocationName
        },
        startTime,
        endTime,
        extraGuestsAllowed: true
      }
    },
    { quoted: m }
  );
};

handler.command = ['creaevento'];
export default handler;