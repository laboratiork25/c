import fetch from 'node-fetch';
import '../lib/language.js';

const API_KEY = '9746da2c-ac5f-487c-b4ae-fc55d1cd58b3';

const packPrices = {
  base: 100,
  imperium: 10000000,
  premium: 1000000000000
};

const rarities = {
  base: ['Common', 'Common', 'Uncommon'],
  imperium: ['Common', 'Uncommon', 'Rare'],
  premium: ['Rare', 'Rare', 'Rare Holo'],
  darkness: ['Misterioso']
};

const darknessPokemons = [
  {
    name: "Darkrai",
    rarity: "Misterioso",
    type: "Dark",
    image: "https://images.pokemontcg.io/dp7/3_hires.png",
    hp: "110"
  },
  {
    name: "Umbreon",
    rarity: "Misterioso",
    type: "Dark",
    image: "https://images.pokemontcg.io/ecard2/H32_hires.png",
    hp: "90"
  },
  {
    name: "Tyranitar",
    rarity: "Misterioso",
    type: "Dark/Rock",
    image: "https://images.pokemontcg.io/ex15/30_hires.png",
    hp: "150"
  },
  {
    name: "Zoroark",
    rarity: "Misterioso",
    type: "Dark",
    image: "https://images.pokemontcg.io/bw6/71_hires.png",
    hp: "100"
  },
  {
    name: "Houndoom",
    rarity: "Misterioso",
    type: "Dark/Fire",
    image: "https://images.pokemontcg.io/ex15/4_hires.png",
    hp: "90"
  }
];

function convertRarityLabel(rarity, userId, groupId) {
  switch (rarity) {
    case 'Common': return global.t('rarityCommon', userId, groupId);
    case 'Uncommon': return global.t('rarityUncommon', userId, groupId);
    case 'Rare': return global.t('rarityRare', userId, groupId);
    case 'Rare Holo': return global.t('rarityLegendary', userId, groupId);
    case 'Misterioso': return global.t('rarityMysterious', userId, groupId);
    default: return rarity;
  }
}

async function getRandomCardByRarity(rarity, userId, groupId) {
  try {
    const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=rarity:"${encodeURIComponent(rarity)}"&pageSize=50`, {
      headers: { 'X-Api-Key': API_KEY }
    });

    if (!res.ok) throw new Error(global.t('apiError', userId, groupId, { status: res.status, statusText: res.statusText }));

    const json = await res.json();
    const cards = json.data || [];
    if (cards.length === 0) return null;

    const card = cards[Math.floor(Math.random() * cards.length)];
    return {
      name: card.name,
      type: card.types?.join('/') || global.t('unknownType', userId, groupId),
      rarity: convertRarityLabel(rarity, userId, groupId),
      image: card.images?.large || card.images?.small || null,
      hp: card.hp || global.t('unknownHP', userId, groupId),
      subtype: card.subtypes?.join(', ') || null,
      shiny: Math.random() < 0.05,
      level: Math.floor(Math.random() * 100) + 1
    };
  } catch (err) {
    console.error(global.t('fetchError', userId, groupId, { error: err.message }));
    return null;
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function mostraAnimazioneDarkness(conn, m, pokemon, user, userId, groupId) {
  const animazione = [
    global.t('darknessAnimation1', userId, groupId),
    global.t('darknessAnimation2', userId, groupId),
    global.t('darknessAnimation3', userId, groupId),
    global.t('darknessAnimation4', userId, groupId),
    global.t('darknessAnimation5', userId, groupId, { name: pokemon.name.toUpperCase() })
  ];
  for (let frame of animazione) {
    await conn.sendMessage(m.chat, { text: frame, mentions: [user] }, { quoted: m });
    await delay(800);
  }
  await conn.sendMessage(m.chat, {
    image: { url: pokemon.image },
    caption: global.t('darknessCardCaption', userId, groupId, {
      name: pokemon.name,
      rarity: pokemon.rarity,
      type: pokemon.type,
      level: pokemon.level,
      shiny: pokemon.shiny ? ' ✨ Shiny' : ''
    }),
    mentions: [user]
  }, { quoted: m });
}

let handler = async (m, { conn, args }) => {
  const user = m.sender;
  const userId = m.sender;
  const groupId = m.isGroup ? m.chat : null;
  
  global.db.data.users[user] = global.db.data.users[user] || {};
  const data = global.db.data.users[user];

  data.packInventory = data.packInventory || { base: 0, imperium: 0, premium: 0, darkness: 0 };
  data.pokemons = data.pokemons || [];

  const packType = args[0]?.toLowerCase();
  if (!['base', 'imperium', 'premium', 'darkness'].includes(packType)) {
    return m.reply(global.t('invalidPackType', userId, groupId, { prefix: usedPrefix || '.' }));
  }

  if ((data.packInventory[packType] || 0) <= 0) {
    return m.reply(global.t('noPacksAvailable', userId, groupId, { packType: packType.toUpperCase() }));
  }

  data.packInventory[packType]--;

  await conn.sendMessage(m.chat, { text: global.t('openingPack', userId, groupId), mentions: [user] }, { quoted: m });
  await delay(1200);
  await conn.sendMessage(m.chat, { text: global.t('revealingCards', userId, groupId), mentions: [user] }, { quoted: m });
  await delay(1200);

  let cards = [];

  if (packType === 'darkness') {
    for (let i = 0; i < 3; i++) {
      const card = JSON.parse(JSON.stringify(darknessPokemons[Math.floor(Math.random() * darknessPokemons.length)]));
      card.level = Math.floor(Math.random() * 100) + 1;
      card.shiny = Math.random() < 0.05;
      cards.push(card);
    }
  } else {
    const cardPromises = rarities[packType].map(r => getRandomCardByRarity(r, userId, groupId));
    cards = (await Promise.all(cardPromises)).filter(Boolean);

    data.pityCounter = data.pityCounter || 0;
    const chanceDarkness = Math.random() < 0.10;
    const pityTriggered = data.pityCounter >= 15;
    const foundDarkness = chanceDarkness || pityTriggered;

    if (foundDarkness) {
      const darkness = JSON.parse(JSON.stringify(darknessPokemons[Math.floor(Math.random() * darknessPokemons.length)]));
      darkness.level = Math.floor(Math.random() * 100) + 1;
      darkness.shiny = Math.random() < 0.05;
      cards.push(darkness);
      data.packInventory.darkness = (data.packInventory.darkness || 0) + 1;
      await mostraAnimazioneDarkness(conn, m, darkness, user, userId, groupId);
      data.pokemons.push(darkness);
      data.pityCounter = 0;

      if (pityTriggered && !chanceDarkness) {
        await conn.sendMessage(m.chat, {
          text: global.t('pitySystemTriggered', userId, groupId),
          mentions: [user]
        }, { quoted: m });
      }

      return;
    } else {
      data.pityCounter++;
    }

    if ((packType === 'imperium' || packType === 'premium') && Math.random() < 0.1) {
      const bonusCard = await getRandomCardByRarity('Rare Holo', userId, groupId);
      if (bonusCard) cards.push(bonusCard);
    }
  }

  for (const card of cards) {
    data.pokemons.push({
      name: card.name,
      rarity: card.rarity,
      type: card.type,
      shiny: card.shiny,
      level: card.level
    });
  }

  if (cards.length === 0) return m.reply(global.t('noCardsFound', userId, groupId));

  const rarityRank = { 
    [global.t('rarityCommon', userId, groupId)]: 1, 
    [global.t('rarityUncommon', userId, groupId)]: 2, 
    [global.t('rarityRare', userId, groupId)]: 3, 
    [global.t('rarityLegendary', userId, groupId)]: 4, 
    [global.t('rarityMysterious', userId, groupId)]: 5 
  };
  const best = [...cards].sort((a, b) => (rarityRank[b.rarity] || 0) - (rarityRank[a.rarity] || 0))[0];

  const msg = global.t('packOpenedResult', userId, groupId, {
    packType: packType.toUpperCase(),
    name: best.name,
    rarity: best.rarity,
    shiny: best.shiny ? global.t('shinyLabel', userId, groupId) : '',
    type: best.type,
    level: best.level,
    remaining: data.packInventory[packType],
    packTypeLower: packType
  });

  const messageContent = {
    caption: msg,
    mentions: [user],
    buttons: [
      {
        buttonId: '.pity',
        buttonText: { displayText: global.t('checkPityButton', userId, groupId) },
        type: 1
      }
    ]
  };

  if (best.image) {
    await conn.sendMessage(m.chat, {
      image: { url: best.image },
      ...messageContent
    }, { quoted: m });
  } else {
    await conn.sendMessage(m.chat, {
      text: msg,
      ...messageContent
    }, { quoted: m });
  }
};

handler.help = ['apri <base|imperium|premium|darkness>'];
handler.tags = ['pokemon'];
handler.command = /^apripokemon|openpack|pokemonpack$/i;

export default handler;