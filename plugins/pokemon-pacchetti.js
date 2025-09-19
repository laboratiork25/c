import '../lib/language.js';

let handler = async (m, { conn }) => {
  const userId = m.sender;
  const groupId = m.isGroup ? m.chat : null;
  
  const user = m.sender;
  global.db.data.users[user] = global.db.data.users[user] || {};
  const data = global.db.data.users[user];

  data.packInventory = data.packInventory || { base: 0, imperium: 0, premium: 0, darkness: 0 };

  const { base, imperium, premium, darkness } = data.packInventory;

  const message = global.t('myPacksMessage', userId, groupId, {
    base: base,
    imperium: imperium,
    premium: premium,
    darkness: darkness
  });

  const buttons = [];

  if (base > 0) {
    buttons.push({ 
      buttonId: '.apri base', 
      buttonText: { displayText: global.t('openBaseButton', userId, groupId) }, 
      type: 1 
    });
  }
  if (imperium > 0) {
    buttons.push({ 
      buttonId: '.apri imperium', 
      buttonText: { displayText: global.t('openImperiumButton', userId, groupId) }, 
      type: 1 
    });
  }
  if (premium > 0) {
    buttons.push({ 
      buttonId: '.apri premium', 
      buttonText: { displayText: global.t('openPremiumButton', userId, groupId) }, 
      type: 1 
    });
  }
  if (darkness > 0) {
    buttons.push({ 
      buttonId: '.apri darkness', 
      buttonText: { displayText: global.t('openDarknessButton', userId, groupId) }, 
      type: 1 
    });
  }

  if (buttons.length === 0) {
    buttons.push({ 
      buttonId: '.pacchetti', 
      buttonText: { displayText: global.t('buyPacksButton', userId, groupId) }, 
      type: 1 
    });
  }

  await conn.sendMessage(m.chat, {
    text: message,
    footer: global.t('packsFooter', userId, groupId),
    buttons,
  }, { quoted: m });
};

handler.help = ['imieiPacchetti', 'mypacks'];
handler.tags = ['pokemon'];
handler.command = /^imiei(pacchetti)?|mypacks$/i;

export default handler;