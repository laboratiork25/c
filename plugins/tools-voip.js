import axios from 'axios';
import '../lib/language.js';

const tempNumHandler = async (conn, mek, m, { from, args, reply }) => {
    try {
        if (!args || args.length < 1) {
            return reply(`❌ *Utilizzo:* .tempnum <codice-paese>\nEsempio: .tempnum it\n\n📦 Usa .otpbox <numero>* per controllare gli OTP`);
        }

        const countryCode = args[0].toLowerCase();
        
        const { data } = await axios.get(
            `https://api.vreden.my.id/api/tools/fakenumber/listnumber?id=${countryCode}`,
            { 
                timeout: 10000,
                validateStatus: status => status === 200
            }
        );

        if (!data?.result || !Array.isArray(data.result)) {
            return reply(`⚠ Formato di risposta API non valido\nProva .tempnum it`);
        }

        if (data.result.length === 0) {
            return reply(`📭 Nessun numero disponibile per *${countryCode.toUpperCase()}*\nProva un altro codice paese!\n\nUsa .otpbox <numero> dopo la selezione`);
        }

        const numbers = data.result.slice(0, 25);
        const numberList = numbers.map((num, i) => 
            `${String(i+1).padStart(2, ' ')}. ${num.number}`
        ).join("\n");

        await reply(
            `╭──「 📱 NUMERI TEMPORANEI 」\n` +
            `│\n` +
            `│ Paese: ${countryCode.toUpperCase()}\n` +
            `│ Numeri Trovati: ${numbers.length}\n` +
            `│\n` +
            `${numberList}\n\n` +
            `╰──「 📦 USA: .otpbox <numero> 」\n` +
            `_Esempio: .otpbox +393331234567_`
        );

    } catch (err) {
        const errorMessage = err.code === "ECONNABORTED" ? 
            `⏳ *Timeout*: L'API ha impiegato troppo tempo\nProva con codici paese più piccoli come 'it', 'us'` :
            `⚠ *Errore*: ${err.message}\nFormato: .tempnum <codice-paese>`;
            
        reply(`${errorMessage}\n\n🔑 Ricorda: .otpbox <numero>`);
    }
};

const tempListHandler = async (conn, m, { reply }) => {
    try {
        const { data } = await axios.get("https://api.vreden.my.id/api/tools/fakenumber/country");

        if (!data || !data.result) return reply("❌ Impossibile ottenere la lista dei paesi.");

        const countries = data.result.map((c, i) => `*${i + 1}.* ${c.title} \`(${c.id})\``).join("\n");

        await reply(`🌍 *Paesi Disponibili:* ${data.result.length}\n\n${countries}`);
    } catch (e) {
        reply("❌ Errore nel recupero della lista dei paesi per numeri temporanei.");
    }
};

const otpBoxHandler = async (conn, mek, m, { from, args, reply }) => {
    try {
        if (!args[0] || !args[0].startsWith("+")) {
            return reply(`❌ *Utilizzo:* .otpbox <numero-completo>\nEsempio: .otpbox +393331234567`);
        }

        const phoneNumber = args[0].trim();
        
        const { data } = await axios.get(
            `https://api.vreden.my.id/api/tools/fakenumber/message?nomor=${encodeURIComponent(phoneNumber)}`,
            { 
                timeout: 10000,
                validateStatus: status => status === 200
            }
        );

        if (!data?.result || !Array.isArray(data.result)) {
            return reply("⚠ Nessun messaggio OTP trovato per questo numero");
        }

        const otpMessages = data.result.map(msg => {
            const otpMatch = msg.content.match(/\b\d{4,8}\b/g);
            const otpCode = otpMatch ? otpMatch[0] : "Non trovato";
            
            return `┌ *Da:* ${msg.from || "Sconosciuto"}
│ *Codice:* ${otpCode}
│ *Ora:* ${msg.time_wib || msg.timestamp}
└ *Messaggio:* ${msg.content.substring(0, 50)}${msg.content.length > 50 ? "..." : ""}`;
        }).join("\n\n");

        await reply(
            `╭──「 🔑 MESSAGGI OTP 」\n` +
            `│ Numero: ${phoneNumber}\n` +
            `│ Messaggi trovati: ${data.result.length}\n` +
            `│\n` +
            `${otpMessages}\n` +
            `╰──「 📌 Usa .tempnum per ottenere numeri 」`
        );

    } catch (err) {
        const errorMsg = err.code === "ECONNABORTED" ?
            "⌛ Tempo scaduto per il controllo OTP. Riprova più tardi" :
            `⚠ Errore: ${err.response?.data?.error || err.message}`;
        
        reply(`${errorMsg}\n\nUso: .otpbox +393331234567`);
    }
};

// Handler principale che gestisce tutti i comandi
export const handler = async (m, conn, { command, args, reply }) => {
    switch(command) {
        case 'tempnum':
        case 'fakenum':
        case 'tempnumber':
            return tempNumHandler(conn, m, { args, reply });
            
        case 'templist':
        case 'tempnumberlist':
        case 'tempnlist':
        case 'listnumbers':
            return tempListHandler(conn, m, { reply });
            
        case 'otpbox':
        case 'checkotp':
        case 'getotp':
            return otpBoxHandler(conn, m, { args, reply });
            
        default:
            // Comando non riconosciuto
            break;
    }
};