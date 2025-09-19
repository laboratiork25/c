// Fix: Crea il file rss_sources.json se non esiste (workaround per errori di altri moduli che lo richiedono)
import fs from 'fs'
import '../lib/language.js';

const rssPath = './rss_sources.json'
if (!fs.existsSync(rssPath)) {
  fs.writeFileSync(rssPath, JSON.stringify([]))
}

let handler = async (m, { conn }) => {
  const userId = m.sender;
  const groupId = m.isGroup ? m.chat : null;
  global.db.data.users[m.sender] = global.db.data.users[m.sender] || {};

  const sports = [
    { name: global.t('sportFootball', userId, groupId) || '⚽ Calcio', id: 'calcio' },
    { name: global.t('sportBasket', userId, groupId) || '🏀 Basket', id: 'basket' },
    { name: global.t('sportTennis', userId, groupId) || '🎾 Tennis', id: 'tennis' },
    { name: global.t('sportFormula1', userId, groupId) || '🏎️ Formula 1', id: 'formula1' },
    { name: global.t('sportMMA', userId, groupId) || '🥊 MMA', id: 'mma' },
    { name: global.t('sportCycling', userId, groupId) || '🚴‍♂️ Ciclismo', id: 'ciclismo' }
  ];

  const buttons = sports.map(sport => ({
    buttonId: `.sportselect ${sport.id}`,
    buttonText: { displayText: sport.name },
    type: 1
  }));

  return await conn.sendMessage(m.chat, {
    text: global.t('chooseSportMessage', userId, groupId) || '📌 *Scegli lo sport che vuoi seguire per ricevere le notizie personalizzate:*',
    footer: global.t('chooseSportFooter', userId, groupId) || '💡 Puoi cambiarlo in qualsiasi momento',
    buttons,
    headerType: 1
  }, { quoted: m });
};

handler.command = /^chooseSport$/i;
handler.help = ['chooseSport'];
handler.tags = ['settings'];
export default handler;