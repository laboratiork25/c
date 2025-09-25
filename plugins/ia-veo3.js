import axios from 'axios';

// Funzione comando .veo per generare video da prompt
export async function veoCommand(sock, chatId, message) {
    try {
        const rawText = message.message?.conversation?.trim() ||
            message.message?.extendedTextMessage?.text?.trim() ||
            message.message?.imageMessage?.caption?.trim() ||
            message.message?.videoMessage?.caption?.trim() ||
            '';

        // Estrai la parola chiave usata nel comando, ora .veo
        const used = (rawText || '').split(/\s+/)[0] || '.veo';
        if (used.toLowerCase() !== '.veo') {
            // Se il comando non è .veo esci o ignora
            return;
        }

        const args = rawText.slice(used.length).trim();
        const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const quotedText = quoted?.conversation || quoted?.extendedTextMessage?.text || '';
        const input = args || quotedText;

        if (!input) {
            await sock.sendMessage(chatId, { text: 'Fornisci un prompt. Esempio: .veo ragazza anime con capelli blu corti' }, { quoted: message });
            return;
        }

        const apiUrl = `https://okatsu-rolezapiiz.vercel.app/ai/txt2video?text=${encodeURIComponent(input)}`;
        const { data } = await axios.get(apiUrl, {
            timeout: 60000,
            headers: { 'user-agent': 'Mozilla/5.0' }
        });

        const videoUrl = data?.videoUrl || data?.result || data?.data?.videoUrl;
        if (!videoUrl) {
            throw new Error('Nessun videoUrl nella risposta API');
        }

        await sock.sendMessage(chatId, {
            video: { url: videoUrl },
            mimetype: 'video/mp4',
            caption: `Prompt: ${input}`
        }, { quoted: message });

    } catch (error) {
        console.error('[VEO] errore:', error?.message || error);
        await sock.sendMessage(chatId, { text: 'Video non generato. Prova con un prompt diverso più tardi.' }, { quoted: message });
    }
}

// Esempio di gestione messaggi con instradamento comando .veo
export function setupMessageHandler(sock) {
    sock.on('messages.upsert', async ({ messages }) => {
        if (!messages || messages.length === 0) return;
        const message = messages[0];
        if (!message.message) return;

        // Estrarre testo dal messaggio per riconoscere il comando
        const text = message.message.conversation?.trim() ||
            message.message.extendedTextMessage?.text?.trim() ||
            message.message.imageMessage?.caption?.trim() ||
            message.message.videoMessage?.caption?.trim() || '';

        if (!text) return;

        const command = text.split(/\s+/)[0].toLowerCase();

        if (command === '.veo') {
            await veoCommand(sock, message.key.remoteJid, message);
        }

        // Qui si possono aggiungere altri comandi con else if ...
    });
}
