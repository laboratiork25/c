// Configurazione date scolastiche italiane
const CONFIG_SCUOLA = {
  annoCorrente: {
    fine: new Date('2025-06-10'),
    inizio: new Date('2025-09-15')
  },
  annoProssimo: {
    fine: new Date('2026-06-10'),
    inizio: new Date('2026-09-15')
  },
  vacanze: {
    natale: { inizio: new Date('2024-12-23'), fine: new Date('2025-01-06') },
    pasqua: { inizio: new Date('2025-04-17'), fine: new Date('2025-04-22') },
    carnevale: { inizio: new Date('2025-03-03'), fine: new Date('2025-03-05') }
  }
};

// Funzioni helper
const calcolaGiorni = (data1, data2) => Math.ceil((data2 - data1) / (1000 * 60 * 60 * 24));
const giornoSettimana = (data) => ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'][data.getDay()];
const èWeekend = (data) => data.getDay() === 0 || data.getDay() === 6;

const inVacanza = (oggi) => {
  for (const [nome, periodo] of Object.entries(CONFIG_SCUOLA.vacanze)) {
    if (oggi >= periodo.inizio && oggi <= periodo.fine) {
      return { stato: true, nome, fine: periodo.fine };
    }
  }
  return { stato: false };
};

const messaggiVariati = {
  lunedi: ['😭 Maledetto lunedì...', '💀 Lunedì, il nemico di tutti...', '😩 Lunedì? Già?'],
  venerdi: ['🎉 È venerdì! Il weekend è vicino!', '😎 Venerdì, finalmente!', '🔥 Venerdì: l\'ultimo ostacolo!'],
  weekend: ['🏖️ Weekend! Goditi ogni secondo!', '😌 Weekend meritato!', '🎮 Weekend mode: ON'],
  vacanza: (nome) => {
    const msgs = {
      natale: ['🎄 Vacanze di Natale! Panettone e relax!', '🎅 Ho ho ho! Vacanze natalizie!'],
      pasqua: ['🐰 Vacanze di Pasqua! Cioccolato per tutti!', '🥚 Pausa pasquale attivata!'],
      carnevale: ['🎭 Carnevale! Tempo di maschere e divertimento!', '🎊 Vacanze di Carnevale!']
    };
    return msgs[nome] ? msgs[nome][Math.floor(Math.random() * msgs[nome].length)] : '';
  }
};

let handler = async (message, { conn }) => {
  const oggi = new Date();
  oggi.setHours(0, 0, 0, 0); // Reset ore per confronto preciso
  let frase = '';
  let emoji = '';
  let dettagli = '';

  // Check se siamo in vacanza
  const checkVacanza = inVacanza(oggi);
  if (checkVacanza.stato) {
    const giorniRimasti = calcolaGiorni(oggi, checkVacanza.fine);
    frase = messaggiVariati.vacanza(checkVacanza.nome);
    dettagli = `\n\n🎁 Ancora *${giorniRimasti} giorni* di vacanza!`;
  }
  // Check weekend
  else if (èWeekend(oggi)) {
    frase = messaggiVariati.weekend[Math.floor(Math.random() * messaggiVariati.weekend.length)];
    dettagli = `\n\n📅 Oggi è ${giornoSettimana(oggi)}, approfitta!`;
  }
  // Periodo scolastico prima delle vacanze estive
  else if (oggi < CONFIG_SCUOLA.annoCorrente.fine) {
    const giorniMancanti = calcolaGiorni(oggi, CONFIG_SCUOLA.annoCorrente.fine);
    const percentualeAnno = Math.round((1 - (giorniMancanti / 200)) * 100);
    
    // Check giorno della settimana
    const giorno = oggi.getDay();
    if (giorno === 1) {
      emoji = messaggiVariati.lunedi[Math.floor(Math.random() * messaggiVariati.lunedi.length)];
    } else if (giorno === 5) {
      emoji = messaggiVariati.venerdi[Math.floor(Math.random() * messaggiVariati.venerdi.length)];
    }

    if (giorniMancanti > 100) {
      frase = `📚 Mancano ancora *${giorniMancanti} giorni* (${percentualeAnno}% dell'anno completato) alla fine della scuola...\n\nLa libertà è lontana, ma ogni giorno è un passo avanti! 💪`;
    } else if (giorniMancanti > 60) {
      frase = `⏳ *${giorniMancanti} giorni* alla fine! Sei a metà strada, resisti! 🎯\n\n_Progress: ${percentualeAnno}%_ ${'█'.repeat(Math.floor(percentualeAnno/10))}${'░'.repeat(10-Math.floor(percentualeAnno/10))}`;
    } else if (giorniMancanti > 30) {
      frase = `🔥 Solo *${giorniMancanti} giorni*! L'ultimo mese è quello più duro...\n\nMa ce la farai! ${percentualeAnno}% completato! 💪`;
    } else if (giorniMancanti > 14) {
      frase = `😱 *${giorniMancanti} giorni* alla libertà! Ormai è questione di settimane!\n\n🎯 Target: ${CONFIG_SCUOLA.annoCorrente.fine.toLocaleDateString('it-IT')}`;
    } else if (giorniMancanti > 7) {
      frase = `🚀 *${giorniMancanti} giorni*! Due settimane e sei libero!\n\nL'emozione sale! 🎊`;
    } else if (giorniMancanti > 3) {
      frase = `💥 *${giorniMancanti} giorni*! L'ultima settimana! Modalità sopravvivenza attivata!\n\n_La fine è vicina..._`;
    } else if (giorniMancanti === 3) {
      frase = `⚡ *3 GIORNI*! Il countdown finale è iniziato!\n\n🎯 Lunedì, Martedì, Mercoledì... e poi LIBERTÀ!`;
    } else if (giorniMancanti === 2) {
      frase = `🎯 *2 GIORNI*! Dopodomani è FINITA!\n\n_Resisti ancora un po'..._`;
    } else if (giorniMancanti === 1) {
      frase = `🚨 *DOMANI È L'ULTIMO GIORNO!*\n\nPreparati a urlare di gioia! 🎉🎊🎈`;
    } else {
      frase = `🎉🎊🎈 *ULTIMO GIORNO DI SCUOLA!*\n\n🏖️ FINALMENTE LIBERI! Estate incoming! ☀️`;
    }
    
    if (emoji) dettagli = `\n\n${emoji}`;
  }
  // Vacanze estive
  else if (oggi < CONFIG_SCUOLA.annoCorrente.inizio) {
    const giorniMancanti = calcolaGiorni(oggi, CONFIG_SCUOLA.annoCorrente.inizio);
    const giorniDaFine = calcolaGiorni(CONFIG_SCUOLA.annoCorrente.fine, oggi);
    const totaleVacanza = calcolaGiorni(CONFIG_SCUOLA.annoCorrente.fine, CONFIG_SCUOLA.annoCorrente.inizio);
    const percentualeVacanza = Math.round((giorniDaFine / totaleVacanza) * 100);

    if (giorniDaFine <= 3) {
      frase = `🎉 *VACANZE INIZIATE!* Sono passati solo ${giorniDaFine} giorni dalla fine della scuola!\n\n🏖️ Hai ancora *${giorniMancanti} giorni* di libertà assoluta! Goditi ogni istante! ☀️`;
    } else if (giorniMancanti > 60) {
      frase = `🏝️ Estate piena! Hai goduto ${giorniDaFine} giorni di libertà!\n\n😎 Altri *${giorniMancanti} giorni* di vacanza! (${100-percentualeVacanza}% ancora disponibile)\n\nNon pensare alla scuola, goditi il momento! ☀️`;
    } else if (giorniMancanti > 30) {
      frase = `🌊 La vacanza continua! *${giorniMancanti} giorni* di libertà!\n\n_Vacanza al ${percentualeVacanza}%_ ${'█'.repeat(Math.floor(percentualeVacanza/10))}${'░'.repeat(10-Math.floor(percentualeVacanza/10))}\n\nMa il tempo vola... 😅`;
    } else if (giorniMancanti > 21) {
      frase = `⏰ *${giorniMancanti} giorni* al ritorno... Un mese di libertà!\n\n_Approfitta ora, poi sarà troppo tardi!_ 😎`;
    } else if (giorniMancanti > 14) {
      frase = `😰 *${giorniMancanti} giorni* e la campanella ricomincia a suonare...\n\nL'ansia post-vacanza inizia a farsi sentire... Ma goditi ancora! 🏖️`;
    } else if (giorniMancanti > 7) {
      frase = `😱 Solo *${giorniMancanti} giorni* all'inizio della scuola!\n\n_Due settimane..._ L'ansia sale, ma resisti! Vivi al massimo! 💪`;
    } else if (giorniMancanti > 3) {
      frase = `💀 *${giorniMancanti} giorni* e si torna tra i banchi...\n\nL'ultima settimana di libertà. Qualcuno ha già iniziato! 📚`;
    } else if (giorniMancanti === 3) {
      frase = `🚨 *3 GIORNI* al ritorno! Il countdown finale è iniziato!\n\nPreparati mentalmente... 😭`;
    } else if (giorniMancanti === 2) {
      frase = `😭 *2 GIORNI*... Dopodomani si ricomincia!\n\n_Addio libertà, è stato bello finché è durato..._`;
    } else if (giorniMancanti === 1) {
      frase = `💀 *DOMANI SI TORNA A SCUOLA!*\n\nL'estate è finita. Preparati mentalmente (e fisicamente). 📚😭`;
    } else {
      frase = `📚 *OGGI SI RICOMINCIA!*\n\nBentornati nell'inferno scolastico... La vacanza è solo un ricordo. 😭\n\n_Prossima libertà: ${CONFIG_SCUOLA.annoProssimo.fine.toLocaleDateString('it-IT')}_`;
    }
  }
  // Inizio anno scolastico (primi giorni di settembre)
  else if (oggi.getMonth() === 8 && oggi.getDate() >= 10 && oggi.getDate() < 15) {
    frase = `😈 Alcuni hanno già iniziato la scuola... tu godi ancora!\n\n🏖️ Ma tra poco toccherà anche a te! L'ansia è nell'aria...\n\n_Data di inizio: ${CONFIG_SCUOLA.annoCorrente.inizio.toLocaleDateString('it-IT')}_`;
  }
  // Anno scolastico successivo
  else {
    const fineScuolaProssima = CONFIG_SCUOLA.annoProssimo.fine;
    const giorniMancanti = calcolaGiorni(oggi, fineScuolaProssima);
    const giorniDaInizio = calcolaGiorni(CONFIG_SCUOLA.annoCorrente.inizio, oggi);
    const percentualeAnno = Math.round((giorniDaInizio / 200) * 100);

    // Check giorno della settimana
    const giorno = oggi.getDay();
    if (giorno === 1) {
      emoji = messaggiVariati.lunedi[Math.floor(Math.random() * messaggiVariati.lunedi.length)];
    } else if (giorno === 5) {
      emoji = messaggiVariati.venerdi[Math.floor(Math.random() * messaggiVariati.venerdi.length)];
    }

    if (giorniDaInizio <= 7) {
      frase = `📚 La scuola è ricominciata da solo *${giorniDaInizio} giorni*!\n\nL'estate è un ricordo lontano... Mancano *${giorniMancanti} giorni* alla fine. 😭\n\n_Il viaggio è appena iniziato..._`;
    } else if (giorniDaInizio <= 30) {
      frase = `😫 Sei dentro da *${giorniDaInizio} giorni*...\n\nIl primo mese è sempre il più difficile! Ancora *${giorniMancanti} giorni* alla libertà!\n\n_Progress: ${percentualeAnno}%_ ${'█'.repeat(Math.floor(percentualeAnno/10))}${'░'.repeat(10-Math.floor(percentualeAnno/10))}`;
    } else if (giorniMancanti > 150) {
      frase = `😩 Sei dentro da *${giorniDaInizio} giorni*... Mancano ancora *${giorniMancanti} giorni*!\n\nLa strada è lunga, ma non mollare! ${percentualeAnno}% completato! 💪`;
    } else if (giorniMancanti > 100) {
      frase = `⏳ *${giorniMancanti} giorni* alla fine della scuola...\n\nOgni giorno è una conquista! ${percentualeAnno}% dell'anno completato! 🎯`;
    } else if (giorniMancanti > 60) {
      frase = `🔥 *${giorniMancanti} giorni*! Sei oltre la metà!\n\n_Progress: ${percentualeAnno}%_ ${'█'.repeat(Math.floor(percentualeAnno/10))}${'░'.repeat(10-Math.floor(percentualeAnno/10))}\n\nContinua così! 💪`;
    } else if (giorniMancanti > 30) {
      frase = `😬 *${giorniMancanti} giorni* alla fine!\n\nL'ultimo periodo! Resisti ancora un po'! ${percentualeAnno}% fatto! 🎯`;
    } else if (giorniMancanti > 14) {
      frase = `🚀 Solo *${giorniMancanti} giorni*! Meno di un mese!\n\nPotrai presto urlare "libertà!"! 🎉`;
    } else if (giorniMancanti > 7) {
      frase = `💥 *${giorniMancanti} giorni*! Due settimane!\n\nLa fuga è vicina! 🏃‍♂️💨`;
    } else if (giorniMancanti > 3) {
      frase = `⚡ *${giorniMancanti} giorni*! L'ultima settimana!\n\nResisti! Sei quasi arrivato! 🔥`;
    } else if (giorniMancanti > 1) {
      frase = `🎯 *${giorniMancanti} GIORNI*! Il countdown finale!\n\nLa libertà è dietro l'angolo! 🎊`;
    } else if (giorniMancanti === 1) {
      frase = `🚨 *DOMANI È L'ULTIMO GIORNO!*\n\nPreparati a scappare! 🏃‍♂️💨🎉`;
    } else {
      frase = `🎉🎊🎈 *ULTIMO GIORNO DI SCUOLA!*\n\n🏖️ FINALMENTE LIBERI! Hai fatto un anno intero! 💪☀️`;
    }

    if (emoji) dettagli = `\n\n${emoji}`;
  }

  // Messaggio finale con informazioni aggiuntive
  const messaggioFinale = frase + dettagli;

  try {
    await conn.sendMessage(message.chat, {
      text: messaggioFinale,
      contextInfo: {
        mentionedJid: [message.sender],
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: global.canale || '120363259442839354@newsletter',
          serverMessageId: '',
          newsletterName: global.nomebot || 'ChatUnity Bot',
        }
      }
    });
  } catch (error) {
    // Fallback se context info non funziona
    await conn.sendMessage(message.chat, { text: messaggioFinale });
  }
};

handler.command = ['scuola'];
handler.tags = ['info'];
handler.help = ['scuola'];

export default handler;
