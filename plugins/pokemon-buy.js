import '../lib/language.js';

let handler = async (m, { conn, args }) => {
  const user = m.sender;
  const userId = m.sender;
  const groupId = m.chat;
  
  const type = args[0]?.toLowerCase();
  const quantity = Math.max(1, parseInt(args[1]) || 1);

  const prices = {
    base: 500,
    imperium: 1500,
    premium: 5000,
  };

  if (!['base', 'imperium', 'premium'].includes(type)) {
    return m.reply(global.t('pokeBuyUsage', userId, groupId));
  }

  global.db.data.users[user] = global.db.data.users[user] || {};
  const data = global.db.data.users[user];

  data.packInventory = data.packInventory || { base: 0, imperium: 0, premium: 0 };
  data.limit = data.limit || 0;

  const totalCost = prices[type] * quantity;

  if (data.limit < totalCost) {
    return m.reply(global.t('pokeBuyNoCoins', userId, groupId, { cost: totalCost, balance: data.limit }));
  }

  data.limit -= totalCost;
  data.packInventory[type] += quantity;

  return m.reply(global.t('pokeBuySuccess', userId, groupId, { 
    quantity, 
    type, 
    total: data.packInventory[type], 
    balance: data.limit 
  }));
};

handler.help = ['buypokemon <tipo> <quantità>'];
handler.tags = ['pokemon'];
handler.command = /^buypokemon$/i;

export default handler;
