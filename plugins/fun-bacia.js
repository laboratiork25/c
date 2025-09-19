import '../lib/language.js';
let handler = async (m, { conn, text, participants, command, usedPrefix }) => {
    // Se non è stato menzionato nessuno, verifica se il messaggio è una risposta
    if (!text) {
        if (m.quoted && m.quoted.sender) {
            text = '@' + m.quoted.sender.split('@')[0];
        } else {
            return conn.reply(m.chat, global.t('kiss_no_target', m.sender, { prefix: usedPrefix, command: command }), m);
        }
    }

    // Prende gli utenti menzionati nel messaggio
    let utentiMenzionati = m.mentionedJid;

    // Se non ci sono menzionati e non è una risposta, usa il sender del messaggio citato
    if (!utentiMenzionati.length && m.quoted && m.quoted.sender) {
        utentiMenzionati = [m.quoted.sender];
    }

    // Se ancora non c'è nessuno da baciare
    if (!utentiMenzionati.length) {
        return m.reply(global.t('kiss_no_mention', m.sender));
    }

    let utenteBaciato = utentiMenzionati[0];

    // Messaggio del bacio
    let messaggio = global.t('kiss_message', m.sender, {
        sender: await conn.getName(m.sender),
        target: await conn.getName(utenteBaciato)
    });

    await conn.sendMessage(m.chat, { text: messaggio, mentions: [utenteBaciato] }, { quoted: m });
};

handler.command = /^(bacia|kiss|besa)$/i;
export default handler;