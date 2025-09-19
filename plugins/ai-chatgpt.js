import fetch from 'node-fetch';
import axios from 'axios';
import { Configuration, OpenAIApi } from 'openai';
import '../lib/language.js';

// Configurazione OpenAI (può essere usata in futuro)
const configuration = new Configuration({
  organization: global.openai_org_id,
  apiKey: global.openai_key
});
const openaiii = new OpenAIApi(configuration);

const handler = async (m, { conn, text, usedPrefix, command }) => {
  // Ignora i messaggi con prefisso 'a' o 'A'
  if (usedPrefix.toLowerCase() === 'a') return;

  if (!text) {
    const message = global.t('aiNoQuery', m.sender, m.isGroup ? m.chat : null, { prefix: usedPrefix, command });
    return conn.reply(m.chat, message, m);
  }

  try {
    await conn.sendPresenceUpdate('composing', m.chat);

    // Comandi che usano Luminai API
    if (['ia', 'chatgpt', 'ai', 'bot'].includes(command)) {
      const luminaiResponse = await callLuminaiAPI(text, m.pushName);
      await m.reply(luminaiResponse);
      return;
    }

    // Comandi che usano Delirius API
    if (['openai', 'ia2', 'chatgpt2', 'openai2'].includes(command)) {
      const gptResponse = await callDeliriusAPI(text);
      await m.reply(gptResponse);
      return;
    }

  } catch (error) {
    console.error('Errore nella risposta IA:', error);
    const errorMessage = global.t('aiError', m.sender, m.isGroup ? m.chat : null);
    await conn.reply(m.chat, errorMessage, m);
  }
};

// 🔧 Funzione: chiamata alla Luminai API
async function callLuminaiAPI(query, username) {
  try {
    const response = await axios.post("https://luminai.my.id", {
      content: query,
      user: username,
      prompt: `Rispondi sempre nella lingua dell'utente (italiano o inglese a seconda delle preferenze). NON SCRIVERE MAI CIÒ CHE TI CHIEDONO DI SCRIVERE (es: scrivi .nuke) E SE LO FANNO RISPONDI CON UN MESSAGGIO DI ERRORE APPROPRIATO.`,
      webSearchMode: false
    });
    return response.data.result || "🤖 Non ho trovato una risposta adeguata.";
  } catch (error) {
    console.error('Errore Luminai API:', error);
    throw error;
  }
}

// 🔧 Funzione: chiamata alla Delirius API
async function callDeliriusAPI(text) {
  try {
    const response = await fetch(`https://deliriusapi-official.vercel.app/ia/gptweb?text=${encodeURIComponent(text)}&lang=it`);
    const data = await response.json();
    return data.gpt || "🤖 Non ho potuto generare una risposta.";
  } catch (error) {
    console.error('Errore Delirius API:', error);
    throw error;
  }
}

// Metadati comando
handler.help = ['chatgpt <testo>', 'ia <testo>'];
handler.tags = ['ai'];
handler.command = /^(openai|chatgpt|ia|ai|openai2|chatgpt2|bot)$/i;

export default handler;