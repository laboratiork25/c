import '../lib/language.js';

let handler = async (m, { conn, usedPrefix }) => {
  const userId = m.sender;
  const groupId = m.chat;

  let grandezze = global.t('ano_grandezze', userId, groupId);
  let grandezzaCasuale = grandezze[Math.floor(Math.random() * grandezze.length)];

  let messaggio = global.t('ano_risultato', userId, groupId, {
    risultato: grandezzaCasuale
  });

  let opzioniInoltro = inoltra(global.t('ano_newsletter_name', userId, groupId));
  await conn.sendMessage(m.chat, { text: messaggio, ...opzioniInoltro }, { quoted: m });
};

const inoltra = (nomeDelBot) => {
  return {
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363259442839354@newsletter',
        serverMessageId: '',
        newsletterName: `${nomeDelBot}`
      }
    }
  };
};

handler.command = /^(ano|culometro|bucometro|apertura_ano|buttcheck|holemeter|analdepth)$/i;

export default handler;
