import '../lib/language.js';
const limiteXP = 3000; // Massimo XP rubabile

const handler = async (m, {conn, usedPrefix, command}) => {
  // Controllo tempo di attesa
  const tempoAttesa = global.db.data.users[m.sender].ultimoFurto + 7200000; // 2 ore
  if (new Date() - global.db.data.users[m.sender].ultimoFurto < 7200000) {
    return conn.reply(m.chat, 
      global.t('steal_cooldown', m.sender, null, { tempo: formattaTempo(tempoAttesa - new Date()) }), 
      m
    );
  }

  // Identifica l'utente target
  let target;
  if (m.isGroup) {
    target = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  } else {
    target = m.chat;
  }

  // Verifiche target
  if (!target) return conn.reply(m.chat, global.t('tag_required', m.sender), m);
  if (!(target in global.db.data.users)) {
    return conn.reply(m.chat, global.t('user_not_found', m.sender), m);
  }

  // Calcolo furto
  const user = global.db.data.users[target];
  const xpRubati = Math.floor(Math.random() * limiteXP);
  
  if (user.exp < xpRubati) {
    return conn.reply(m.chat, 
      global.t('insufficient_target_xp', m.sender, null, { 
        user: target.split('@')[0], 
        limite: limiteXP 
      }), 
      m, 
      { mentions: [target] }
    );
  }

  // Esecuzione furto
  global.db.data.users[m.sender].exp += xpRubati;
  global.db.data.users[target].exp -= xpRubati;
  
  await conn.reply(m.chat, 
    global.t('steal_success', m.sender, null, { 
      amount: xpRubati, 
      user: target.split('@')[0] 
    }), 
    m, 
    { mentions: [target] }
  );
  
  global.db.data.users[m.sender].ultimoFurto = new Date().getTime();
};

// Funzione formattazione tempo
function formattaTempo(durata) {
  const secondi = Math.floor((durata / 1000) % 60);
  const minuti = Math.floor((durata / (1000 * 60)) % 60);
  const ore = Math.floor((durata / (1000 * 60 * 60)) % 24);
  
  return `${ore} ${global.t('hours', m.sender)} ${minuti} ${global.t('minutes', m.sender)} ${secondi} ${global.t('seconds', m.sender)}`;
}

handler.help = ['rubaxp'];
handler.tags = ['rpg'];
handler.command = /^(rubaxp|stealxp|robxp|rob|steal)$/i;
export default handler;