import fetch from 'node-fetch';
import '../lib/language.js';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  // Ignora i messaggi con prefisso 'a' o 'A'
  if (usedPrefix.toLowerCase() === 'a') return;

  if (!text) {
    const message = global.t('aiNoQuery', m.sender, m.isGroup ? m.chat : null, { prefix: usedPrefix, command });
    return conn.reply(m.chat, message, m);
  }

  try {
    await conn.sendPresenceUpdate('composing', m.chat);

    // Tutti i comandi usano la nuova API Gemini
    const geminiResponse = await callGeminiAPI(text);
    await m.reply(geminiResponse);
    return;

  } catch (error) {
    console.error('Errore nella risposta IA:', error);
    const errorMessage = global.t('aiError', m.sender, m.isGroup ? m.chat : null);
    await conn.reply(m.chat, errorMessage, m);
  }
};

// 🔧 Funzione: chiamata alla nuova API Gemini
async function callGeminiAPI(prompt) {
  try {
    const url = `https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(prompt)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0'
      },
      timeout: 30000
    });
    if (!response.ok) throw new Error('API Gemini non disponibile');
    const data = await response.json();
    return data?.result || "🤖 Non ho trovato una risposta adeguata.";
  } catch (error) {
    console.error('Errore Gemini API:', error);
    return "❌ Errore durante la richiesta all'API Gemini.";
  }
}

// Metadati comando
handler.help = ['chatgpt <testo>', 'ia <testo>'];
handler.tags = ['ai'];
handler.command = /^(openai|chatgpt|ia|ai|openai2|chatgpt2|bot)$/i;

export default handler;