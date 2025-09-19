import '../lib/language.js';

let handler = async (m, { conn, args }) => {
  const userId = m.sender;
  const groupId = m.isGroup ? m.chat : null;
  
  const user = m.sender;
  global.db.data.users[user] = global.db.data.users[user] || {};
  const data = global.db.data.users[user];
  data.pokemons = data.pokemons || [];

  const total = data.pokemons.length;
  if (total === 0) return m.reply(global.t('emptyInventory', userId, groupId));

  const page = Math.max(1, parseInt(args[0]) || 1);
  const perPage = 50;
  const totalPages = Math.ceil(total / perPage);
  if (page > totalPages) return m.reply(global.t('invalidPage', userId, groupId, { totalPages }));

  const rarityEmojis = {
    'Comune': '⚪', 'Non Comune': '🟢',
    'Raro': '🔵', 'Leggendario': '🟣',
    'Misterioso': '🌌', 'Darkness': '🌑'
  };

  const typeEmojis = {
    'Fuoco': '🔥', 'Acqua': '💧', 'Erba': '🍃', 'Elettro': '⚡',
    'Psico': '🧠', 'Buio': '🌑', 'Normale': '🔘', 'Drago': '🐉',
    'Fata': '✨', 'Roccia': '🪨', 'Spettro': '👻', 'Lotta': '🥊',
    'Acciaio': '⚙️', 'Terra': '🌍', 'Veleno': '☠️'
  };

  const start = (page - 1) * perPage;
  const end = start + perPage;

  let header = global.t('inventoryHeader', userId, groupId, {
    user: user.split('@')[0],
    total,
    page,
    totalPages,
    perPage
  });

  let list = data.pokemons.slice(start, end).map((p, i) => {
    const emojiR = rarityEmojis[p.rarity] || '❓';
    const emojiT = typeEmojis[p.type] || '🔘';
    const lvl = p.level || 1;
    return global.t('pokemonEntry', userId, groupId, {
      index: start + i + 1,
      name: p.name,
      level: lvl,
      rarityEmoji: emojiR,
      rarity: p.rarity,
      typeEmoji: emojiT,
      type: p.type
    });
  }).join('\n\n');

  let message = header + '\n' + list;

  const buttons = [];

  buttons.push({
    buttonId: `.darkness`,
    buttonText: { displayText: global.t('buttonDarkness', userId, groupId) },
    type: 1
  });

  const visibleButtons = 3;
  let startPage = Math.max(1, page - 1);
  let endPage = Math.min(totalPages, startPage + visibleButtons - 1);

  if (endPage - startPage < visibleButtons - 1) {
    startPage = Math.max(1, endPage - visibleButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    buttons.push({
      buttonId: `.inventario ${i}`,
      buttonText: { displayText: global.t('pageButton', userId, groupId, { 
        page: i, 
        current: i === page 
      }) },
      type: 1
    });
  }

  return conn.sendMessage(m.chat, {
    text: message.trim(),
    buttons,
    footer: global.t('inventoryFooter', userId, groupId),
    mentions: [user],
    contextInfo: {
      externalAdReply: {
        title: global.t('adTitle', userId, groupId),
        body: global.t('adBody', userId, groupId, { 
          page, 
          totalPages, 
          total 
        }),
        thumbnailUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
};

handler.help = ['inventario [pagina]'];
handler.tags = ['pokemon'];
handler.command = /^(inventario|inventory|pokemonlist|pokedex)(\s+\d+)?$/i;

export default handler;