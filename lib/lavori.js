// Lista lavori disponibili per il sistema RPG
// NOTE: I valori `min`/`max` rappresentano una stima approssimativa di guadagno per turno/giornata
// espressa in unità eur-equivalenti (per scopo di gioco). Sono stime ragionevoli basate su medie
// salariali in Italia (fonte: Glassdoor, Indeed, Payscale, stime di mercato) convertite in paga
// giornaliera/turno. Queste sono stime semplificate e servono solo per il gioco.
const lavoriDisponibili = {
  "disoccupato": {
    emoji: "🛌",
    desc: "Nessun lavoro, nessun guadagno",
    frasi: [
      "Hai passato la giornata a guardare Netflix. Guadagno: 0 🪙",
      "Oggi hai fatto un pisolino di 3 ore. Guadagno: 0 🪙",
      "Hai giocato ai videogiochi tutto il giorno. Guadagno: 0 🪙",
      "Hai contato le crepe del soffitto per 2 ore. Guadagno: 0 🪙",
      "Hai guardato TikTok fino alle 4 del mattino. Guadagno: 0 🪙",
      "Hai ordinato pizza per colazione, pranzo e cena. Guadagno: 0 🪙",
      "Hai fatto una maratona di serie TV in pigiama. Guadagno: 0 🪙",
      "Hai scrollato Instagram per 6 ore consecutive. Guadagno: 0 🪙"
    ]
  },
  "muratore": { 
    min: 60, 
    max: 120, 
    livello: 1, 
    emoji: "👷",
    cooldown: 30,
    frasi: [
      "Oggi ti sei scottato il sedere mentre riparavi il tetto. Guadagni:",
      "Hai costruito un muro così bello che persino Trump sarebbe fiero. Guadagni:",
      "Ti è caduto un mattone sul piede, ma almeno hai finito il lavoro. Guadagni:",
      "Hai mischiato il cemento con la birra per sbaglio, ma il muro tiene. Guadagni:",
      "Hai piantato un chiodo nel pollice invece che nel muro. Guadagni:",
      "Il tuo martello è volato via e ha colpito il capo cantiere. Guadagni:",
      "Hai scambiato la colla per il gel e ora hai i capelli incollati al casco. Guadagni:",
      "Hai costruito una scala che porta al nulla. Arte moderna! Guadagni:",
      "Ti sei chiuso fuori casa con le chiavi dentro. Almeno sai scassinare. Guadagni:",
      "Hai usato il trapano come asciugacapelli per sbaglio. Guadagni:"
    ]
  },
  "cameriere": { 
    min: 40, 
    max: 90, 
    livello: 1, 
    emoji: "🍽️",
    cooldown: 10,
    frasi: [
      "Oggi hai fatto cadere dei piatti ma il boss non si è comunque arrabbiato. Guadagni:",
      "Un cliente ti ha lasciato 50€ di mancia per il tuo sorriso. Guadagni:",
      "Hai servito 20 tavole senza rompere nulla, nuovo record! Guadagni:",
      "Hai confuso l'ordine ma al cliente è piaciuto comunque. Guadagni:",
      "Hai versato vino rosso su un vestito bianco. Era della sposa. Guadagni:",
      "Un cliente ti ha chiesto il wifi e tu hai portato il router. Guadagni:",
      "Hai servito gelato con le pinze perché non trovavi il cucchiaio. Guadagni:",
      "Hai ballato mentre portavi il vassoio e tutto è rimasto in equilibrio. Guadagni:",
      "Un bambino ti ha fatto lo sgambetto ma sei riuscito a non cadere. Guadagni:",
      "Hai memorizzato 15 ordinazioni senza scriverle. Sei un genio! Guadagni:",
      "Il caffè era finito e hai servito acqua sporca. Nessuno se n'è accorto. Guadagni:",
      "Hai cantato 'Tanti auguri' stonando completamente. Guadagni:"
    ]
  },
  "badante": { 
    min: 35, 
    max: 70, 
    livello: 1, 
    emoji: "🧓",
    cooldown: 6,
    frasi: [
      "La nonna ti ha raccontato per la 10a volta la stessa storia di guerra. Guadagni:",
      "Hai giocato a carte con il nonno e ti ha battuto ancora. Guadagni:",
      "Hai preparato una minestra che ha commosso la signora Maria. Guadagni:",
      "Ti sei addormentato durante la telenovela con la tua assistita. Guadagni:",
      "Il nonno ti ha insegnato parolacce in dialetto che non conoscevi. Guadagni:",
      "Hai perso la partita a dama per la 47esima volta consecutiva. Guadagni:",
      "La nonna ti ha dato una ricetta segreta scritta nel 1943. Guadagni:",
      "Hai aiutato a ritrovare gli occhiali che erano sulla sua testa. Guadagni:",
      "Ti hanno mostrato 200 foto della stessa persona da giovane. Guadagni:",
      "Hai imparato a lavorare a maglia guardando YouTube insieme. Guadagni:",
      "Il gatto della signora ti ha graffiato mentre gli davi da mangiare. Guadagni:",
      "Hai fatto ginnastica dolce e ti sei fatto male tu. Guadagni:"
    ]
  },
  "postino": { 
    min: 50, 
    max: 110, 
    livello: 10, 
    emoji: "📮",
    cooldown: 20,
    frasi: [
      "Un cane ti ha morso il fondoschiena durante il giro. Guadagni:",
      "Hai perso metà della posta ma nessuno se n'è accorto. Guadagni:",
      "Hai consegnato una lettera d'amore scritta nel 1987. Guadagni:",
      "Ti sei perso nel quartiere ma hai fatto comunque tutte le consegne. Guadagni:",
      "Hai suonato 50 campanelli per consegnare una bolletta. Guadagni:",
      "Il vento ti ha portato via 20 lettere. Ora volano libere. Guadagni:",
      "Hai infilato la posta nella cassetta sbagliata per tutto il giorno. Guadagni:",
      "Un bambino ti ha chiesto se Babbo Natale esiste davvero. Guadagni:",
      "Hai pedalato 30 km con la catena rotta. Guadagni:",
      "Ti sei innamorato di qualcuno dal nome sulla busta. Guadagni:",
      "Hai consegnato un pacco che profumava di pesce marcio. Guadagni:",
      "Ti hanno offerto un caffè in ogni casa. Ora tremi dalla caffeina. Guadagni:"
    ]
  },
  "meccanico": { 
    min: 80, 
    max: 180, 
    livello: 20, 
    emoji: "🔧",
    cooldown: 25,
    frasi: [
      "Hai riparato una Ferrari con dello scotch e una graffetta. Guadagni:",
      "Ti sei sporcato d'olio ma la macchina ora funziona. Guadagni:",
      "Hai trovato le chiavi del cliente dentro al motore. Guadagni:",
      "Hai fatto esplodere un pneumatico durante il gonfiaggio. Guadagni:",
      "Hai cambiato l'olio e ne hai versato la metà per terra. Guadagni:",
      "Il motore faceva un rumore strano. Era solo una lattina incastrata. Guadagni:",
      "Hai riparato i freni testandomeli in discesa. Funzionano! Guadagni:",
      "Un cliente ti ha portato una bici da riparare in officina auto. Guadagni:",
      "Hai perso una vite importante ma la macchina va lo stesso. Guadagni:",
      "Ti sei incastrato sotto l'auto per 2 ore. I pompieri ti hanno salvato. Guadagni:",
      "Hai accidentalmente verniciato il gatto del cliente. Guadagni:",
      "Il clacson non funzionava. Hai urlato tu dalla finestra. Guadagni:"
    ]
  },
  "dj": { 
    min: 100, 
    max: 450, 
    livello: 20, 
    emoji: "🎧",
    cooldown: 60,
    frasi: [
      "Hai mixato 'Baby Shark' con techno e il pubblico ha impazzito. Guadagni:",
      "Ti è caduta la cuffia durante il drop ma hai salvato la situazione. Guadagni:",
      "Hai suonato per 8 ore di fila senza andare in bagno. Guadagni:",
      "Un fan ti ha offerto un drink... era solo succo di frutta. Guadagni:",
      "Hai fatto partire la musica di matrimonio durante una festa punk. Guadagni:",
      "I tuoi genitori sono venuti al concerto e hanno ballato sul palco. Guadagni:",
      "Hai scratchiato così forte da rompere il disco. Effetto speciale! Guadagni:",
      "Qualcuno ha staccato la spina e hai continuato a mimare. Guadagni:",
      "Hai messo la playlist di tua nonna per sbaglio. Tutti hanno cantato. Guadagni:",
      "Le luci stroboscopiche ti hanno fatto venire il mal di testa. Guadagni:",
      "Hai suonato 3 volte la stessa canzone senza accorgertene. Guadagni:",
      "Un piccione è entrato e ha cagato sulla consolle. Show must go on! Guadagni:"
    ]
  },
  "maffioso": { 
    min: 60, 
    max: 220, 
    livello: 30, 
    emoji: "🧔🏻‍♂️🍕",
    cooldown: 120,
    frasi: [
      "Hai 'convinto' un negoziante a pagare la protezione. Guadagni:",
      "Ti sei seduto su una torta durante un incontro importante. Guadagni:",
      "Hai perso la pistola ad acqua durante una missione. Guadagni:",
      "Il capo ti ha mandato a comprare la pizza invece che a sparare. Guadagni:",
      "Hai minacciato qualcuno con una banana invece della pistola. Guadagni:",
      "Ti hanno dato il soprannome 'Pinky' per le tue mani piccole. Guadagni:",
      "Hai fatto il lavaggio sporco... letteralmente, in lavanderia. Guadagni:",
      "Il tuo cappello è volato via durante un inseguimento in scooter. Guadagni:",
      "Hai nascosto i soldi nel freezer e si sono congelati. Guadagni:",
      "Tua mamma ti ha chiamato durante una riunione segreta. Guadagni:",
      "Hai confuso il codice segreto con la ricetta della pasta. Guadagni:",
      "Il tuo complice si è rivelato essere un poliziotto sotto copertura. Guadagni:"
    ]
  },
  "comico": { 
    min: 40, 
    max: 120, 
    livello: 40, 
    emoji: "🎭",
    cooldown: 10,
    frasi: [
      "Hai fatto una battuta sulle suocere e nessuno ha riso. Guadagni:",
      "Il tuo monologo sui calzini sporchi ha ucciso. Guadagni:",
      "Hai inciampato sul palco e il pubblico ha pensato fosse parte dello show. Guadagni:",
      "Ti sei dimenticato il finale della barzelletta e hai improvvisato. Guadagni:",
      "Hai fatto ridere più per come sei vestito che per le battute. Guadagni:",
      "Un bambino del pubblico ti ha corretto la grammatica. Guadagni:",
      "Hai raccontato una barzelletta così vecchia che tuo nonno l'aveva inventata. Guadagni:",
      "Il microfono non funzionava e hai urlato per un'ora. Guadagni:",
      "Hai fatto una imitazione di te stesso per sbaglio. Meta-umorismo. Guadagni:",
      "Ti hanno lanciato pomodori ma erano buonissimi. Guadagni:",
      "Hai pianto sul palco e tutti hanno pensato fosse una performance. Guadagni:",
      "Il tuo pubblico era composto da 3 persone e un cane. Guadagni:"
    ]
  },
  "dottore": { 
    min: 200, 
    max: 600, 
    livello: 50, 
    emoji: "👨⚕️",
    cooldown: 180,
    frasi: [
      "Hai diagnosticato un raffreddore come Ebola per sbaglio. Guadagni:",
      "Un paziente ti ha chiesto se il mal di testa è contagioso. Guadagni:",
      "Hai prescritto cioccolato come medicina e ha funzionato. Guadagni:",
      "Ti sei addormentato durante un'operazione... era solo un sogno. Guadagni:",
      "Hai curato un'unghia incarnita con un martello. Metodo innovativo. Guadagni:",
      "Un paziente ipocondriaco ti ha auto-diagnosticato 47 malattie rare. Guadagni:",
      "Hai perso lo stetoscopio ed hai usato un bicchiere di plastica. Guadagni:",
      "Ti sei iniettato il vaccino per sbaglio. Ora sei super-immune. Guadagni:",
      "Hai operato con i guanti da cucina perché non trovavi quelli chirurgici. Guadagni:",
      "Un paziente ti ha portato WebMD stampato come seconda opinione. Guadagni:",
      "Hai curato il singhiozzo spaventando il paziente. Terapia d'urto. Guadagni:",
      "Ti sei dimenticato dove hai messo il paziente anestetizzato. Guadagni:"
    ]
  },
  "cantante": { 
    min: 60, 
    max: 350, 
    livello: 50, 
    emoji: "🎤",
    cooldown: 10,
    frasi: [
      "Hai stonato così tanto che i cani del quartiere hanno ululato. Guadagni:",
      "Un fan ti ha lanciato il reggiseno... era tuo nonno. Guadagni:",
      "Hai cantato per 5 minuti col microfono spento. Guadagni:",
      "Ti si è rotta la voce durante il pezzo più importante. Guadagni:",
      "Hai dimenticato il testo e hai improvvisato con 'la la la'. Guadagni:",
      "Il tuo vestito si è strappato e hai finito in mutande. Rock'n'roll! Guadagni:",
      "Hai cantato una ballad mentre suonava techno di sottofondo. Guadagni:",
      "Un piccione ha fatto il nido nei tuoi capelli durante il concerto. Guadagni:",
      "Hai confuso le parole e hai cantato una canzone d'amore alla pizza. Guadagni:",
      "Il playback è partito al contrario e hai cantato all'indietro. Guadagni:",
      "Tua mamma è salita sul palco per asciugarti il sudore. Guadagni:",
      "Hai autografato 200 magliette con lo stesso nome sbagliato. Guadagni:"
    ]
  },
  "avvocato": { 
    min: 120, 
    max: 450, 
    livello: 50, 
    emoji: "⚖️",
    cooldown: 25,
    frasi: [
      "Hai difeso un ladro di caramelle come se fosse Al Capone. Guadagni:",
      "Ti sei addormentato in tribunale e hai sognato di vincere. Guadagni:",
      "Hai citato 'Avanzi' come precedente giuridico. Guadagni:",
      "Il giudice ti ha multato per essere arrivato in ritardo. Guadagni:",
      "Hai confuso il cliente con l'accusato per tutta l'udienza. Guadagni:",
      "La tua toga si è impigliata nella porta girevole. Entrata epica. Guadagni:",
      "Hai portato il codice penale sbagliato. Era quello di cucina. Guadagni:",
      "Il tuo cliente ha confessato mentre tu sostenevi la sua innocenza. Guadagni:",
      "Hai fatto un discorso appassionato nel processo sbagliato. Guadagni:",
      "Ti sei dimenticato il nome del tuo cliente 3 volte in un'ora. Guadagni:",
      "Hai citato una legge che non esiste. L'hai inventata sul momento. Guadagni:",
      "Il giudice ti ha chiesto di smettere di fare domande retoriche. Guadagni:"
    ]
  },
  "scienziato": { 
    min: 150, 
    max: 500, 
    livello: 60, 
    emoji: "🔬",
    cooldown: 240,
    frasi: [
      "La tua formula ha trasformato il caffè in succo d'arancia. Guadagni:",
      "Hai creato per sbaglio uno slime che canta karaoke. Guadagni:",
      "Il तuo esperimento è esploso... ma era previsto! Guadagni:",
      "Hai scoperto che i gatti cadono sempre in piedi. Rivoluzione! Guadagni:",
      "Hai inventato un robot che sa solo fare la pasta. Utilissimo. Guadagni:",
      "La tua cura per il raffreddore ha fatto crescere i capelli verdi. Guadagni:",
      "Hai clonato per sbaglio il tuo pranzo invece del DNA. Guadagni:",
      "Il tuo assistente è in realtà un chatbot che hai programmato male. Guadagni:",
      "Hai creato la macchina del tempo ma va solo indietro di 3 secondi. Guadagni:",
      "Il tuo esperimento ha attirato tutti i piccioni della città. Guadagni:",
      "Hai mescolato le provette e ora tutto sa di lampone. Guadagni:",
      "La tua scoperta rivoluzionaria era già stata fatta nel 1800. Guadagni:"
    ]
  },
  "ingegnere informatico": { 
    min: 120, 
    max: 500, 
    livello: 60, 
    emoji: "💻",
    cooldown: 300,
    frasi: [
      "Hai fixato un bug e ne hai creati 10 nuovi. Guadagni:",
      "Il tuo codice funziona ma non sai perché. Guadagni:",
      "Hai passato 8 ore su StackOverflow per 3 righe di codice. Guadagni:",
      "Hai debugato col metodo 'prova e prega'. Ha funzionato. Guadagni:",
      "Hai commentato il codice in emoji. Nessuno capisce niente. Guadagni:",
      "Il tuo programma ha preso vita e ti ha mandato email di lamentele. Guadagni:",
      "Hai programmato per 14 ore e hai realizzato di aver dimenticato il ;. Guadagni:",
      "Il cliente voleva un sito blu ma tu hai fatto tutto in Comic Sans. Guadagni:",
      "Hai hackerato per sbaglio il tuo stesso computer. Genio. Guadagni:",
      "Il tuo algoritmo funziona solo quando è luna piena. Misterioso. Guadagni:",
      "Hai fatto un backup del backup del backup del backup. Sicurezza first. Guadagni:",
      "Il tuo codice è così bello che l'hai incorniciato. Arte moderna. Guadagni:"
    ]
  },
  "astronauta": { 
    min: 300, 
    max: 1200, 
    livello: 60, 
    emoji: "🚀",
    cooldown: 420,
    frasi: [
      "Hai perso il sandwich nello spazio. Fluttua ancora lassù. Guadagni:",
      "Hai scambiato il pulsante del caffè con quello dell'autodistruzione. Guadagni:",
      "Gli alieni esistono! ...Era solo il tuo riflesso. Guadagni:",
      "Hai pianto in assenza di gravità. Le lacrime fluttuavano. Guadagni:",
      "Hai provato a camminare sulla Luna ma hai fatto un salto di 50 metri. Guadagni:",
      "Il tuo casco si è appannato e hai navigato a caso per 2 ore. Guadagni:",
      "Hai portato nello spazio la foto sbagliata della tua famiglia. Guadagni:",
      "Ti sei perso nello spazio usando Google Maps. Non funziona lì. Guadagni:",
      "Hai starnutito nella tuta spaziale. Ora puzza per sempre. Guadagni:",
      "Hai fatto un selfie con la Terra ma è venuta sfocata. Guadagni:",
      "Gli alieni ti hanno chiesto indicazioni per Area 51. Imbarazzante. Guadagni:",
      "Hai dimenticato di chiudere l'oblò e tutto è volato via. Oops. Guadagni:"
    ]
  }
};

export default lavoriDisponibili;
