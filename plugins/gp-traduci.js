import '../lib/language.js';
import fetch from 'node-fetch';

const languages = {
    'it': 'Italiano 『🇮🇹』', 'en': 'Inglese 『🇬🇧』', 'es': 'Spagnolo 『🇪🇸』', 'fr': 'Francese 『🇫🇷』',
    'de': 'Tedesco 『🇩🇪』', 'pt': 'Portoghese 『🇵🇹』', 'ru': 'Russo 『🇷🇺』', 'ja': 'Giapponese 『🇯🇵』',
    'ko': 'Coreano 『🇰🇷』', 'zh': 'Cinese 『🇨🇳』', 'ar': 'Arabo 『🇸🇦』', 'hi': 'Hindi 『🇮🇳』',
    'nl': 'Olandese 『🇳🇱』', 'pl': 'Polacco 『🇵🇱』', 'sv': 'Svedese 『🇸🇪』', 'tr': 'Turco 『🇹🇷』',
    'uk': 'Ucraino 『🇺🇦』', 'th': 'Thailandese 『🇹🇭』', 'vi': 'Vietnamita 『🇻🇳』', 'cs': 'Ceco 『🇨🇿』',
    'da': 'Danese 『🇩🇰』', 'fi': 'Finlandese 『🇫🇮』', 'no': 'Norvegese 『🇳🇴』', 'he': 'Ebraico 『🇮🇱』',
    'el': 'Greco 『🇬🇷』', 'hu': 'Ungherese 『🇭🇺』', 'id': 'Indonesiano 『🇮🇩』', 'ms': 'Malese 『🇲🇾』'
};

const max = 5000;
const maxtts = 200;

const splitText = (text, maxLength) => {
    if (text.length <= maxLength) return [text];
    const chunks = [];
    let current = '';
    const sentences = text.split(/[.!?]+/);
    for (const sentence of sentences) {
        if ((current + sentence).length <= maxLength) {
            current += sentence + '.';
        } else {
            if (current) chunks.push(current.trim());
            current = sentence + '.';
        }
    }
    if (current) chunks.push(current.trim());
    return chunks;
};

const generateTTS = async (text, lang, conn, m, userId, groupId) => {
    try {
        const cleanText = text.replace(/[^\w\s.,!?àèìòùáéíóúäëïöüñç]/gi, '').trim();
        if (!cleanText) throw new Error('Testo vuoto dopo la pulizia');
        
        const audioText = cleanText.length > maxtts ? cleanText.substring(0, maxtts) : cleanText;
        const ttsApis = [
            {
                name: 'Google TTS',
                url: `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${encodeURIComponent(audioText)}&tl=${lang}&total=1&idx=0&textlen=${audioText.length}`,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Referer': 'https://translate.google.com/',
                    'Accept': 'audio/mpeg, */*'
                }
            }
        ];
        
        let audioBuffer = null;
        for (const api of ttsApis) {
            try {
                const response = await fetch(api.url, {
                    method: 'GET',
                    headers: { ...api.headers, 'Accept': 'audio/mpeg, audio/wav, audio/ogg, */*' },
                    timeout: 10000
                });
                
                if (response.ok) {
                    audioBuffer = await response.arrayBuffer();
                    if (audioBuffer && audioBuffer.byteLength > 100) break;
                }
            } catch (apiError) {
                continue;
            }
        }
        
        if (!audioBuffer || audioBuffer.byteLength <= 100) {
            throw new Error('Tutte le API TTS hanno fallito');
        }
        
        await conn.sendMessage(m.chat, {
            audio: Buffer.from(audioBuffer),
            mimetype: 'audio/mpeg',
            ptt: true
        }, { quoted: m });
        
        return true;
    } catch (error) {
        await m.reply(global.t('translateTTSError', userId, groupId, { error: error.message }));
        return false;
    }
};

const handler = async (m, { conn, args, usedPrefix, command }) => {
    const userId = m.sender;
    const groupId = m.chat;
    
    const languagesList = Object.entries(languages).map(([code, name]) => `│ ${code}: ${name}`).join('\n');
    
    if (command === 'ascolta_originale' || command === 'ascolta_traduzione') {
        // args[0] = lingua, resto = testo (fallback a quoted text)
        const lang = (args[0] || '').toLowerCase();
        const text = args.slice(1).join(' ') || m.quoted?.text || '';

        if (!text) return m.reply(global.t('translateNoText', userId, groupId));
        if (!lang) return m.reply(global.t('translateNoLang', userId, groupId));
        
        await m.react('🔊');
        const success = await generateTTS(text, lang, conn, m, userId, groupId);
        if (success) await m.react('✅');
        else await m.react('❌');
        return;
    }
    
    if (!args && !m.quoted?.text) {
        return m.reply(global.t('translateHelp', userId, groupId, { prefix: usedPrefix, command, languages: languagesList }));
    }
    
    let sourceLang = 'auto';
    let targetLang = 'it';
    let text = args.join(' ');
    let audioOnly = /^(parla|say)$/i.test(command);
    
    // Se il primo argomento è un codice lingua supportato, usalo come target e rimuovilo dal testo
    if (Array.isArray(args) && args[0]) {
        const possible = String(args[0]).toLowerCase();
        if (possible === 'auto') {
            // lascia source auto, testo dopo il primo argomento
            text = args.slice(1).join(' ');
        } else if (languages[possible]) {
            targetLang = possible;
            text = args.slice(1).join(' ');
        }
        // altrimenti non toccare targetLang e text (restano come impostati)
    }
    
    if (!text && m.quoted?.text) text = m.quoted.text;
    if (!text) return m.reply(global.t('translateWhatToTranslate', userId, groupId));
    if (text.length > max) return m.reply(global.t('translateTooLong', userId, groupId, { max, length: text.length }));
    
    await m.react('⌛');
    
    try {
        const textChunks = splitText(text, 1000);
        let fullTranslation = '';
        let detectedLang = sourceLang;
        
        for (const chunk of textChunks) {
            const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(chunk)}`;
            const res = await fetch(url, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
            });
            const json = await res.json();
            
            if (json && json) {
                fullTranslation += json.map(item => item).join('');
                if (!detectedLang || detectedLang === 'auto') detectedLang = json || sourceLang;
            }
        }
        
        await m.react('✅');
        
        if (audioOnly) {
            await generateTTS(fullTranslation, targetLang, conn, m, userId, groupId);
        } else {
            const shortOriginal = text.substring(0, 50);
            const shortTranslation = fullTranslation.substring(0, 50);
            
            const buttons = [
                { buttonId: `.ascolta_originale ${detectedLang} ${shortOriginal}`, buttonText: { displayText: global.t('translateListenOriginal', userId, groupId) }, type: 1 },
                { buttonId: `.ascolta_traduzione ${targetLang} ${shortTranslation}`, buttonText: { displayText: global.t('translateListenTranslation', userId, groupId) }, type: 1 }
            ];
            
            await conn.sendMessage(m.chat, {
                text: global.t('translateResult', userId, groupId, {
                    fromLang: languages[detectedLang] || detectedLang,
                    toLang: languages[targetLang],
                    translation: fullTranslation
                }),
                footer: global.t('translateFooter', userId, groupId),
                buttons,
                headerType: 1
            }, { quoted: m });
        }
    } catch (err) {
        await m.react('❌');
        await m.reply(global.t('translateError', userId, groupId));
    }
};

handler.help = ['traduci [lingua] [testo]', 'parla [lingua] [testo]'];
handler.tags = ['utility'];
handler.command = /^(traduct|traduci|tr|traduzione|parla|ascolta_originale|ascolta_traduzione)$/i;

export default handler;