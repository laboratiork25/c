// Questo comando è stato creato da youns sotto proposta di Google Traduttore
import fetch from 'node-fetch';
import '../lib/language.js';

var handler = async (m, { text, usedPrefix, command }) => {
    const userId = m.sender;
    const groupId = m.isGroup ? m.chat : null;
    if (!text) {
        await m.reply(global.t('geminiNoText', userId, groupId) || "Che vuoi?");
        return;
    }

    try {
        conn.sendPresenceUpdate('composing', m.chat);

        let prompt = `sei gemini e questa è la mia richiesta "${text}"`;

        var apii = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(prompt)}`);
        var res = await apii.json();

        if (res && res.result) {
            await m.reply(res.result);
        } else {
            await m.reply(global.t('geminiNoResponse', userId, groupId) || "Non ho ricevuto una risposta valida dall'API. Riprova più tardi.");
        }
    } catch (e) {
        await conn.reply(
            m.chat,
            global.t('geminiError', userId, groupId) || `Si è verificato un errore. Per favore, riprova più tardi.\n\n#report ${usedPrefix + command}\n\n${wm}`,
            m
        );
        console.error(global.t('geminiConsoleError', userId, groupId) || `Errore nel comando ${usedPrefix + command}:`, e);
    }
};

handler.command = ['gemini'];
handler.help = ['bot <testo>', 'ia <testo>'];
handler.tags = ['tools'];
handler.premium = false;

export default handler;