import fetch from 'node-fetch';

const API_KEY = 'AIzaSyDbivtyYcPb2HlePNw8Wx_XKoVAFNveck8';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`;

const handler = async (m, { conn, text = '' }) => {
  if (!text || !text.trim()) {
    return conn.reply(m.chat, `🤖 *Gemini AI*

💡 Uso: .gemini <domanda>

📝 *Esempi:*
• .gemini cos'è l'intelligenza artificiale?
• .gemini spiegami la fisica quantistica
• .gemini scrivi una storia breve`, m);
  }

  try {
    await conn.sendPresenceUpdate('composing', m.chat);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: text
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!answer) {
      throw new Error('Nessuna risposta ricevuta da Gemini');
    }

    return conn.reply(m.chat, `🤖 *Gemini AI*

${answer}`, m);

  } catch (err) {
    console.error('[gemini-plugin]', err);
    return conn.reply(m.chat, `⚠️ Errore: ${err.message || 'Errore imprevisto'}`, m);
  }
};

handler.help = ['gemini'];
handler.tags = ['ai'];
handler.command = ['gemini', 'gem'];

export default handler;
