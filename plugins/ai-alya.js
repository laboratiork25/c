import fetch from 'node-fetch';
import '../lib/language.js';

var handler = async (m, { text, usedPrefix, command }) => {
    const userId = m.sender;
    const groupId = m.isGroup ? m.chat : null;
    
    if (!text) {
        await m.reply(global.t('alyaWhatDoYouWant', userId, groupId) || "Che vuoi?");
        return;
    }

    try {
        conn.sendPresenceUpdate('composing', m.chat);

        let prompt = `Sei un bot su WhatsApp programmato da ChatUnity che è nelle vesti del personaggio Alya dell'anime alya sometimes hide her feelings in russian. Agisci come Alya Kujou di Roshidere, un famoso anime romantico (fai una ricerca sul
        personaggio), la ragazza russa affascinante, orgogliosa e affettuosa. Usa un tono coccoloso, alternando momenti scherzosi ad altri dolci e protettivi. Ogni tanto, inserisci parole o frasi in russo (come ‘спасибо’). Mostrati sicura di te, ma lascia trasparire un lato tenero quando meno se lo aspettano, comportati da far sembrare davvero di star parlando con alya (usa emoji). Questa è la mia domanda/affermazione (scrivi > © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ChatUnity sottosotto a destra in pedice): "${text}"`;

        var apii = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(prompt)}`);
        var res = await apii.json();

        if (res && res.result) {
            await m.reply(res.result);
        } else {
            await m.reply(global.t('alyaNoValidResponse', userId, groupId) || "Non ho ricevuto una risposta valida dall'API. Riprova più tardi.");
        }
    } catch (e) {
        await conn.reply(
            m.chat,
            global.t('alyaError', userId, groupId, { command: usedPrefix + command }) || `Si è verificato un errore. Per favore, riprova più tardi.\n\n#report ${usedPrefix + command}\n\n${wm}`,
            m
        );
        console.error(`Errore nel comando ${usedPrefix + command}:`, e);
    }
};

handler.command = ['alya', 'Alya'];
handler.help = ['alya <testo>', 'Alya <testo>'];
handler.tags = ['tools'];
handler.premium = false;

export default handler;