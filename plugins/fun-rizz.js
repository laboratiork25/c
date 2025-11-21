import '../lib/language.js';

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
      global.t('rizzNoTarget', userId, groupId, { prefix: usedPrefix, command }),
      null
    );
  }

  const targetUser = destinatario.split('@')[0];
  const line = pickRandom(global.rizz);

  const msg = global.t('rizzSuccess', userId, groupId, {
    target: targetUser,
    line
  });

  await m.reply(msg, null, { mentions: [destinatario] });
};

handler.tags = ['fun'];
handler.command = handler.help = ['rizz'];

export default handler;

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}

global.rizz = [
  "Se il tuo corpo fosse una prigione e le tue labbra catene, che bel posto per scontare la mia condanna.",
  "Tante stelle nello spazio e nessuna brilla come te.",
  "Mi piace il caffè, ma preferisco averti-tè.",
  "Non sei Google, ma hai tutto quello che cerco.",
  "Ti regalo questo fiore, anche se nessuno sarà mai bello come te.",
  "Se ogni goccia d'acqua sul tuo corpo fosse un bacio, vorrei diventare un temporale.",
  "Nella mia vita manca vita, manca luce, manca qualcuno… e quel qualcuno sei tu.",
  "Mi piaci così tanto che non so nemmeno da dove iniziare a dirtelo.",
  "Tutti si fermano al tuo fisico, ma a me piace soprattutto il tuo cuore.",
  "La tua bellezza mi acceca perché nasce dal cuore e si riflette nei tuoi occhi.",
  "Se ti hanno detto che sei bella ti hanno mentito: non sei bella, sei stupenda.",
  "Se la bellezza fosse tempo, tu saresti l’eternità.",
  "Se amarti fosse peccato, avrei l’inferno assicurato.",
  "Sei l’unica cosa che manca alla mia vita per essere perfetta.",
  "Quello che sento per te è così grande che mi servirebbe un altro universo per contenerlo.",
  "La matematica non mente: io + te = per sempre.",
  "Di notte brilla la luna, di giorno il sole, ma i tuoi occhi illuminano il mio cuore.",
  "Non cercarmi: preferisco perdermi nel tuo sguardo.",
  "Alcuni vogliono il mondo, altri il sole… io voglio solo un posto nel tuo cuore.",
  "Se fossi un astronauta ti porterei su Plutone, ma non potendolo fare ti porto sempre nel cuore.",
  "Sento dire che Disneyland è il posto più felice del mondo… ma sono sicuri di essere mai stati accanto a te?",
  "Scommetto che ti chiami Google: hai tutto quello che stavo cercando.",
  "Hai una matita e una gomma? Voglio cancellare il tuo passato e scrivere il nostro futuro.",
  "Voglio che il nostro amore sia come Pi greco: irrazionale e infinito.",
  "Sto scrivendo un libro sulle cose belle della vita e tu sei nella prima pagina.",
  "Non sono sempre stato religioso… ma ora sì, perché sembri la risposta alle mie preghiere.",
  "Immagina: non pensi che saremmo perfetti su una torta nuziale con le nostre facce?",
  "Sei il tipo di persona che mia madre vorrebbe che portassi a casa. Vuoi conoscerla?",
  "Il tuo viso è così perfetto che sembra che Dio abbia messo il doppio dell’impegno quando ti ha creato."
];
