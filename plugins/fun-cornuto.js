import '../lib/language.js';
let handler = async (m, { conn, command, text }) => {
    const cornutoSpeciale = '639318481412@s.whatsapp.net';

    // Se non c'è text, prova a prendere il nome/id dal messaggio citato
    let targetText = text;
    if (!targetText && m.quoted) {
        targetText = m.quoted.sender ? '@' + m.quoted.sender.split('@')[0] : m.quoted.text || '';
    }
    if (!targetText) return conn.reply(m.chat, "🤔 Manca il nome della cornuta/o! \nScrivi così: .cornuto @nome oppure rispondi a un messaggio oppure chiedi a matte😈😈", m);

    if (m.sender === cornutoSpeciale) {
        let trollText = "🤣 *BHE, ECCO IL RE DELLE CORNA!* 🤣\nSi dice che se si leva le corna ci fa l’antenna 5G📡💀";
        await conn.sendMessage(m.chat, {
            text: trollText,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363422724720651@newsletter',
                    newsletterName: '👑 Club dei Cornuti Ufficiale 👑'
                }
            },
            mentions: conn.parseMention(trollText)
        }, { quoted: m });
        return;
    }

    let percent = Math.floor(Math.random() * 101);
    let message = "";

    if (percent < 30) {
        message = "🛡 Tutto tranquillo... per ora!";
    } else if (percent < 70) {
        message = "😬 Uhm... qualche sospetto c'è!";
    } else if (percent < 90) {
        message = "👀 Cornometro in allerta! Occhio alle spalle!";
    } else {
        message = "🫣 A LIVELLO NAZIONALE! SI PARLA DI CORNISSIMO!";
    }

    let response = `🔍 CALCOLATORE DI CORNUTEZZA 🔍

👤 ${targetText}
📈 Cornutezza: ${percent}%
${message}

${percent > 75 ? "🔔 Consiglio: Mai voltare le spalle! 🤣" : "😌 Respira, potrebbe andare peggio..."}
    `.trim();

    await conn.sendMessage(m.chat, {
        text: response,
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363422724720651@newsletter',
                newsletterName: '👑 Club dei Cornuti Ufficiale 👑'
            }
        },
        mentions: conn.parseMention(response)
    }, { quoted: m });
};

handler.help = ['cornuto @nome'];
handler.tags = ['fun'];
handler.command = /^(cornuto|cornuta|corna)$/i;
handler.fail = "❗ Scrivi un nome, esempio: .cornuto @utente";

export default handler;