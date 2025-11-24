import '../lib/language.js';
import { performance } from 'perf_hooks';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const userId = m.sender;
  const groupId = m.chat;

  let destinatario;
  if (m.quoted && m.quoted.sender) {
    destinatario = m.quoted.sender;
  } else if (m.mentionedJid && m.mentionedJid.length > 0) {
    destinatario = m.mentionedJid[0];
  } else {
    return m.reply(
      global.t('ditalinoNoTarget', userId, groupId, { prefix: usedPrefix, command }),
      null
    );
  }

  const nomeDestinatario = `@${destinatario.split('@')[0]}`;

  const startText = global.t('ditalinoStart', userId, groupId, { target: nomeDestinatario });
  const midText = global.t('ditalinoMiddle', userId, groupId);
  const endText = global.t('ditalinoEnd', userId, groupId);

  const sequenza = [startText, midText, endText];

  const startTime = performance.now();
  for (const msg of sequenza) {
    await m.reply(msg, null, { mentions: [destinatario] });
  }
  const endTime = performance.now();
  const elapsedTime = (endTime - startTime).toFixed(2);

  const resultMessage = global.t('ditalinoResult', userId, groupId, {
    target: nomeDestinatario,
    time: elapsedTime
  });

  await conn.reply(groupId, resultMessage, m, { mentions: [destinatario] });
};

handler.help = ['ditalino @user', 'finger @user']
handler.command = ['ditalino', 'finger'];
handler.tags = ['fun'];
export default handler;
