import '../lib/language.js';

let handler = async (m, { conn, groupMetadata }) => {
  const userId = m.sender;
  const groupId = m.chat;

  if (!m.isGroup) {
    throw global.t('zizzaniaNoGroup', userId, groupId);
  }

  const gruppi = global.db?.data?.chats?.[groupId] || {};
  if (gruppi.spacobot === false) {
    throw global.t('zizzaniaDisabled', userId, groupId);
  }

  const ps = groupMetadata.participants.map(v => v.id);
  if (ps.length < 2) return;

  const getRandom = list => list[Math.floor(Math.random() * list.length)];
  const a = getRandom(ps);
  let b;
  do b = getRandom(ps);
  while (b === a);

  const aTag = a.split('@')[0];
  const bTag = b.split('@')[0];

  const line = pickRandom(global.zizzaniaLines);

  const text = global.t('zizzaniaText', userId, groupId, {
    a: aTag,
    line,
    b: bTag
  });

  await conn.reply(
    groupId,
    text,
    null,
    {
      mentions: [a, b]
    }
  );
};

handler.customPrefix = /^\.zizzania$/i;
handler.command = new RegExp('');
handler.tags = ['fun'];
handler.help = ['.zizzania'];

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

global.zizzaniaLines = [
  "vorrebbe leccare i capezzoli di",
  "adora annusare le scorregge di",
  "vorrebbe disperatamente ballare nudə con",
  "stanotte ha sognato di fare cose spinte con",
  "fa cose strane di nascosto con il cane di",
  "è follemente innamoratə della nonna di",
  "ha messo incinta la madre di",
  "passa la notte a guardare dormire",
  "durante le lezioni scolastiche ha fantasie selvagge su",
  "è la crush segreta di",
  "è la persona di fiducia… molto troppo di fiducia… di",
  "sussurra cose sporche all’orecchio di",
  "si masturba pensando alle foto di",
  "ha scopato 9 mesi prima che nascesse con la madre di"
];
