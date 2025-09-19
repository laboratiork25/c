import { performance } from "perf_hooks";
import '../lib/language.js';

// Funzione per selezionare un elemento casuale da un array
function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

let handler = async (m, { conn, text }) => {
    let destinatario;

    // Se è una risposta a un messaggio
    if (m.quoted && m.quoted.sender) {
        destinatario = m.quoted.sender;
    }
    // Se ci sono utenti menzionati
    else if (m.mentionedJid && m.mentionedJid.length > 0) {
        destinatario = m.mentionedJid[0];
    }
    // Se non c'è nulla
    else {
        return m.reply(global.t('ditalino_no_target', m.sender));
    }

    let nomeDestinatario = `@${destinatario.split('@')[0]}`;

    // Messaggi personalizzati
    let sequenza = [
        global.t('ditalino_start', m.sender, null, { user: nomeDestinatario }),
        global.t('ditalino_almost', m.sender),
        global.t('ditalino_warning', m.sender)
    ];

    // Invia i messaggi uno alla volta
    for (let msg of sequenza) {
        await m.reply(msg, null, { mentions: [destinatario] });
    }

    // Calcolo del tempo
    let startTime = performance.now();
    let endTime = performance.now();
    let elapsedTime = (endTime - startTime).toFixed(2);

    let resultMessage = global.t('ditalino_result', m.sender, null, { 
        user: nomeDestinatario, 
        time: elapsedTime 
    });

    conn.reply(m.chat, resultMessage, m, { mentions: [destinatario] });
};

handler.command = /^(ditalino|fingering|finger)$/i;
handler.tags = ["fun"];
export default handler;