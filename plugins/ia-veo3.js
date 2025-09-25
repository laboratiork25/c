import axios from 'axios';

export async function soraCommand(sock, chatId, message) {
    try {
        const rawText = message.message?.conversation?.trim() ||
            message.message?.extendedTextMessage?.text?.trim() ||
            message.message?.imageMessage?.caption?.trim() ||
            message.message?.videoMessage?.caption?.trim() ||
            '';

        // Estrai prompt dopo la keyword o usa testo citato
        const used = (rawText || '').split(/\s+/)[0] || '.veo';
        const args = rawText.slice(used.length).trim();
        const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const quotedText = quoted?.conversation || quoted?.extendedTextMessage?.text || '';
        const input = args || quotedText;

        if (!input) {
            await sock.sendMessage(chatId, { text: 'Fornisci un prompt. Esempio: .sora ragazza anime con capelli blu corti' }, { quoted: message });
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
        console.error('[SORA] errore:', error?.message || error);
        await sock.sendMessage(chatId, { text: 'Video non generato. Prova con un prompt diverso più tardi.' }, { quoted: message });
    }
}
