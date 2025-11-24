import '../lib/language.js';

let handler = async (m, { conn, command, text }) => {
  const userId = m.sender;
  const groupId = m.chat;
  const nomeDelBot = conn.user?.name || global.db?.data?.nomedelbot || 'ChatUnity';

  const width = Math.floor(Math.random() * 101);

  let finalPhrase;
  if (width >= 70) {
    finalPhrase = global.t('drugHigh', userId, groupId);
  } else if (width >= 30) {
    finalPhrase = global.t('drugMid', userId, groupId);
  } else {
    finalPhrase = global.t('drugLow', userId, groupId);
  }

  let targetName;
  if (text && text.trim().length > 0) {
    targetName = text;
  } else {
    targetName = 'Tu';
  }

  const msg = global.t('drugResult', userId, groupId, {
    target: targetName,
    percent: width,
    phrase: finalPhrase
  });

  await m.reply(
    msg,
    null,
    {
      mentions: conn.parseMention(msg),
      contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363259442839354@newsletter',
          serverMessageId: '',
          newsletterName: nomeDelBot
        }
      }
    }
  );
};

handler.command = /^(drogato|drugtest|drogadicto|pruebadrogas|drogado|testedrogas|drogenschnelltest|drogi_test|毒品测试|наркотест|drug_test_ar|مخدرات_اختبار|ड्रगटेस्ट|testdrogue|testnarkoba|uyuşturucutesti)$/i;

handler.help = [
  'drogato [@tag | nome]',
  'drugtest [@tag | name]',
  'drogadicto [@tag | nombre]',
  'pruebadrogas [@tag | nombre]',
  'drogado [@tag | nome]',
  'testedrogas [@tag | nome]',
  'drogenschnelltest [@tag | name]',
  'drogi_test [@tag | name]',
  '毒品测试 [@tag | 名字]',
  'наркотест [@tag | имя]',
  'drug_test_ar [@tag | اسم]',
  'مخدرات_اختبار [@tag | اسم]',
  'ड्रगटेस्ट [@tag | नाम]',
  'testdrogue [@tag | nom]',
  'testnarkoba [@tag | nama]',
  'uyuşturucutesti [@tag | isim]'
];

handler.tags = ['fun'];

export default handler;
