import '../lib/language.js';
let handler = async (m, { conn, args, usedPrefix }) => {
    // Numeri autorizzati
    const authorizedNumbers = [
        "393773842461@s.whatsapp.net", // Creatore
        "393513518279@s.whatsapp.net"  // Nuovo numero autorizzato
    ];

    const isAuthorized = authorizedNumbers.includes(m.sender);

    if (!isAuthorized) {
        return conn.reply(m.chat, 
            `❌ *ACCESSO NEGATO* ❌\n\nSolo utenti autorizzati possono utilizzare questo comando!`,
            m
        );
    }

    // Identifica l'utente target
    let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;
    let amount = parseInt(args[0]);

    // Controlli di validità
    if (!amount || isNaN(amount)) {
        return conn.reply(m.chat, 
            `⚠ *VALORE MANCANTE* ⚠\n\nEsempio di uso:\n${usedPrefix}adduc 100\n${usedPrefix}adduc 50 @utente`,
            m
        );
    }

    if (amount < 1) {
        return conn.reply(m.chat, 
            "❌ *VALORE NON VALIDO* ❌\nDevi specificare un numero maggiore di 0",
            m
        );
    }

    // Operazione sul database
    try {
        if (!(who in global.db.data.users)) {
            return conn.reply(m.chat,
                `🚷 *UTENTE NON REGISTRATO* 🚷\nL'utente non è presente nel database`,
                m,
                { mentions: [who] }
            );
        }

        let user = global.db.data.users[who];
        user.limit = (user.limit || 0) + amount;

        let message = who === m.sender
            ? `✅ *Hai aggiunto ${amount} 💶 UnityCoins al tuo portafoglio*\nNuovo saldo: ${user.limit} 💶`
            : `✅ *Hai aggiunto ${amount} 💶 UnityCoins a @${who.split('@')[0]}*\nNuovo saldo: ${user.limit} 💶`;

        await conn.sendMessage(
            m.chat, 
            { 
                text: message, 
                mentions: [who] 
            }, 
            { quoted: m }
        );

    } catch (error) {
        console.error("Errore nell'aggiunta di UnityCoins:", error);
        conn.reply(m.chat, 
            "❌ *ERRORE CRITICO* ❌\nSi è verificato un problema durante l'operazione",
            m
        );
    }
};

handler.help = ['adduc <quantità> [@utente]', 'addunitycoins <quantità> [rispondi a messaggio]'];
handler.tags = ['economy', 'owner'];
handler.command = /^(adduc)$/i;
export default handler;