import '../lib/language.js';

let handler = async (m, { conn }) => {
  const user = m.sender;
  const userId = m.sender;
  const groupId = m.chat;
  
  global.db.data.users[user] = global.db.data.users[user] || {};
  const data = global.db.data.users[user];

  data.packInventory = data.packInventory || { base: 0, imperium: 0, premium: 0 };

  const { base, imperium, premium } = data.packInventory;

  const message = `${global.t('pokeInventoryTitle', userId, groupId)}\n\n${global.t('pokeInventoryBase', userId, groupId, { count: base })}\n${global.t('pokeInventoryImperium', userId, groupId, { count: imperium })}\n${global.t('pokeInventoryPremium', userId, groupId, { count: premium })}\n\n${global.t('pokeInventoryFooter', userId, groupId)}`;

  const buttons = [];

  if (base > 0) {
    buttons.push({ buttonId: '.apripokemon base', buttonText: { displayText: global.t('pokeInventoryOpenBase', userId, groupId) }, type: 1 });
  }
  if (imperium > 0) {
    buttons.push({ buttonId: '.apripokemon imperium', buttonText: { displayText: global.t('pokeInventoryOpenImperium', userId, groupId) }, type: 1 });
  }
  if (premium > 0) {
    buttons.push({ buttonId: '.apripokemon premium', buttonText: { displayText: global.t('pokeInventoryOpenPremium', userId, groupId) }, type: 1 });
  }

  if (buttons.length === 0) {
    buttons.push({ buttonId: '.pacchetti', buttonText: { displayText: global.t('pokeInventoryBuy', userId, groupId) }, type: 1 });
  }

  await conn.sendMessage(m.chat, {
    text: message,
    footer: '✨ Colleziona carte rare e crea il tuo team!',
    buttons,
  }, { quoted: m });
};

handler.help = ['pacchetti'];
handler.tags = ['pokemon'];
handler.command = /^(pacchetti|imieipacchetti|mypacks)$/i;
export default handler;
