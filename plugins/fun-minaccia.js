import '../lib/language.js';

let handler = async (m, { conn, text }) => {
  const userId = m.sender;
  const groupId = m.chat;

  if (!m.isGroup) {
    throw global.t('minacciaNoGroup', userId, groupId);
  }

  const gruppi = global.db?.data?.chats?.[groupId] || {};
  if (gruppi.spacobot === false) {
    throw global.t('minacciaDisabled', userId, groupId);
  }

  let menzione = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null) || text;
  if (!menzione) {
    throw global.t('minacciaNoTarget', userId, groupId);
  }

  const target = menzione.split('@')[0];
  const line = pickRandom(global.minacciaLines);

  const message = global.t('minacciaText', userId, groupId, {
    target,
    line
  });

  await m.reply(message, null, {
    mentions: [menzione]
  });
};

handler.command = /^(minaccia|threat)$/i;
handler.tags = ['fun'];
handler.help = ['minaccia @user', 'threat @user'];

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

global.minacciaLines = [
  "oggi ti va bene, ma domani controllo io se sei ancora così tranquillo.",
  "parli troppo forte per uno che potrebbe ritrovarsi muto da un momento all’altro.",
  "continua così e ti faccio rimpiangere ogni singolo messaggio che hai inviato.",
  "sei a due passi dal trasformare una chat in un problema reale.",
  "stai scherzando con il fuoco, e non sempre l’acqua arriva in tempo.",
  "un altro messaggio del genere e capirai la differenza tra online e realtà.",
  "hai presente il tasto invio? Usalo con più prudenza, potrebbe costarti caro.",
  "certe battute fanno ridere… finché qualcuno non decide di smettere di ridere.",
  "sei così coraggioso dietro lo schermo, speriamo tu lo sia anche dal vivo.",
  "le parole volano, ma certe conseguenze atterrano dritte in faccia.",
  "sembra che tu stia chiedendo attenzioni, spera solo di ricevere quelle giuste.",
  "ogni messaggio che scrivi è un passo in più verso un problema che non vuoi.",
  "non ti rendi conto, ma stai giocando a un gioco che non ti conviene vincere.",
  "la pazienza è tanta, ma non è infinita. La tua linea è quasi finita.",
  "stai camminando sul filo: un altro passo e non ci sarà più terra sotto i piedi."
];
