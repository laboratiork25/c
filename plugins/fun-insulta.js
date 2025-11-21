import '../lib/language.js';

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

let handler = async (m, { conn }) => {
  const userId = m.sender;
  const groupId = m.chat;

  if (!m.isGroup) throw global.t('insultNoGroup', userId, groupId);

  const gruppi = global.db?.data?.chats?.[groupId] || {};
  if (gruppi.spacobot === false) throw global.t('insultDisabled', userId, groupId);

  let menzione = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null) || null;
  if (!menzione) throw global.t('insultNoTarget', userId, groupId);

  const targetId = menzione.split('@')[0];

  if (menzione === conn.user.jid) {
    const botLines = global.t('insultBotLines', userId, groupId);
    const line = pickRandom(botLines);
    return conn.reply(groupId, line, m);
  }

  const insultList = [
    'tua mamma fa talmente schifo che deve dare il viagra al suo vibratore',
    'sei talmente negro che Carlo Conti al confronto è Biancaneve',
    'sei così brutto che tua madre da piccolo non sapeva se prendere una culla o una gabbia',
    'sei simpatico come un grappolo di emorroidi',
    'ti puzza talmente l’alito che la gente scoreggia per cambiare aria',
    'tua madre prende più schizzi di uno scoglio',
    'meglio un figlio in guerra che un coglione con i risvoltini come te',
    'tua madre è come Super Mario, salta per prendere i soldi',
    'hai meno neuroni di un panino al latte, e sono pure senza glutine',
    'sei così brutto che quando preghi Gesù si mette su invisibile',
    'sei così poco fotogenico che i filtri di Instagram ti bloccano per proteggere gli utenti',
    'le tue scorregge fanno talmente schifo che il Big Bang a confronto sembra una loffa',
    'il buco del culo di tua madre ha visto più palle dei draghetti di Bubble Game',
    'se ti vede la morte dice che è arrivato il cambio',
    'hai il buco del culo con lo stesso diametro del traforo del Monte Bianco',
    'tua madre è come il sole, batte sempre sulle strade',
    'dall’alito sembra che ti si sia arenato il cadavere di un’orca in gola',
    'sei così cornuto che se ti vede un cervo va in depressione',
    'non ti picchio solo perché la merda schizza',
    'sei così brutto che quando accendi il computer si avvia subito l’antivirus',
    'la tua famiglia è così povera che i topi lasciano elemosina sotto il frigorifero',
    'sei utile come una stufa in estate',
    'sei utile come un culo senza il buco',
    'sei utile come un paio di mutande in un porno',
    'sei fastidioso come un chiodo nel culo',
    'a te la testa serve solo per tenere distanti le orecchie',
    'sei così brutto che quando lanci un boomerang non torna',
    'sei talmente sfigato che se ti cade l’uccello rimbalza e ti picchia nel culo',
    'sei la prova che Dio a volte sbaglia… e poi si diverte'
  ];

  const line = pickRandom(insultList);

  const text = global.t('insultUserText', userId, groupId, {
    target: targetId,
    line
  });

  await conn.reply(
    groupId,
    text,
    m,
    {
      mentions: [menzione]
    }
  );
};

handler.command = /^(insulta|insult)$/i;
handler.tags = ['fun'];
handler.help = ['insulta @user', 'insult @user'];

export default handler;
