import '../lib/language.js';
import { promises as fs } from 'fs';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  const userId = m.sender;
  const groupId = m.chat;

  let target =
    (text && text.replace(/[@\s]/g, '') + '@s.whatsapp.net') ||
    (m.quoted ? m.quoted.sender : (m.mentionedJid && m.mentionedJid[0]));

  if (!target) {
    return conn.reply(
      groupId,
      global.t('downCalcNoTarget', userId, groupId, { prefix: usedPrefix, command }),
      m
    );
  }

  const name = await conn.getName(target).catch(() => `@${target.split('@')[0]}`);
  const randomPercent = Math.floor(Math.random() * 101);

  const phrases = global.t('downCalcPhrases', userId, groupId);
  const fraseRandom = phrases[Math.floor(Math.random() * phrases.length)];

  const conclusione = global.t('downCalcVerdicts', userId, groupId, {
    percent: randomPercent
  });

  const msg = global.t('downCalcLine', userId, groupId, {
    name,
    cmd: command.toUpperCase(),
    percent: randomPercent,
    frase: fraseRandom,
    verdict: conclusione
  });

  await conn.sendMessage(
    groupId,
    {
      text: msg,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363259442839354@newsletter',
          serverMessageId: '',
          newsletterName: '🔥 ISTITUTO NAZIONALE IDIOZIA 🔥'
        }
      },
      mentions: [target]
    },
    { quoted: m }
  );
};

handler.help = ['down', 'ritardato', 'mongoloide', 'disabile', 'ritardata'].map(v => v + ' [@tag]');
handler.tags = ['satira', 'game'];
handler.command = /^(down|ritardato|mongoloide|disabile|ritardata)$/i;

export default handler;
