import '../lib/language.js';


let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (m.key.fromMe) return;

    console.log("[DEBUG] Comando ricevuto:", command);
    console.log("[DEBUG] Testo ricevuto:", text);

    let who = [];
    if (m.isGroup) {
        who = m.mentionedJid.length > 0 ? m.mentionedJid : m.quoted ? [m.quoted.sender] : text ? text.split(',').map(t => t.replace(/[^0-9]/g, '') + '@s.whatsapp.net') : [];
    } else {
        who = text ? [text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'] : [m.chat];
    }

    console.log("[DEBUG] Utenti menzionati:", who);

    if (who.length === 0) {
        console.log("[DEBUG] Nessun utente menzionato o messaggio risposto.");
        return m.reply(global.t('kissNoTargetMention', m.sender, m.chat, { prefix: usedPrefix, command }));
    }

    if (!text && !m.mentionedJid.length && !m.quoted) {
        console.log("[DEBUG] Nessun argomento fornito per il comando.");
        return m.reply(global.t('kissNoTarget', m.sender, m.chat));
    }

    // Ensure user records exist and increment bacini for each kissed user
    for (const w of who) {
        if (!global.db.data.users[w]) global.db.data.users[w] = {};
        global.db.data.users[w].bacini = (global.db.data.users[w].bacini || 0) + 1;
        console.log("[DEBUG] Incremented bacini for:", w, global.db.data.users[w].bacini);
    }

    let baciati;
    if (who.length === 1) {
        baciati = [`@${m.sender.split('@')[0]}`, `@${who[0].split('@')[0]}`];
    } else {
        baciati = who.map(w => `@${w.split('@')[0]}`);
    }

    console.log("[DEBUG] Utenti baciati:", baciati);

    let message;
    if (who.length === 1) {
        const senderName = baciati[0];
        const targetName = baciati[1];
        message = global.t('kissSuccess', m.sender, m.chat, { senderName, targetName });
    } else {
        message = global.t('kissMultiple', m.sender, m.chat, { baciati });
    }

    let bacio = await conn.reply(m.chat, message, m, { mentions: who.length === 1 ? [m.sender, ...who] : who });

    conn.sendMessage(m.chat, { react: { text: '💋', key: bacio.key }});
};
handler.isGroup = true;
handler.command = /^(bacio|bacia|kiss|beso|beijo|kuss|吻|поцелуй|قبلة|चुम्बन|baiser|ciuman|öpücük)$/i;
handler.help = ['bacio', 'bacia', 'kiss', 'beso', 'beijo', 'kuss', '吻', 'поцелуй', 'قبلة', 'चुम्बन', 'baiser', 'ciuman', 'öpücük'];

export default handler;