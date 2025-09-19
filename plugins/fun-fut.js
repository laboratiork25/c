import fs from 'fs';
import Canvas from 'canvas';
import '../lib/language.js';

const players = JSON.parse(fs.readFileSync('./plugins/fifaPlayers_packs.json', 'utf8'));

let handler = async (m, { conn, command, args }) => {
  const userId = m.sender;
  const groupId = m.isGroup ? m.chat : null;
  
  command = command.replace(/^\./, '').toLowerCase();

  const user = m.sender;
  global.db.data.users[user] = global.db.data.users[user] || {};
  const data = global.db.data.users[user];
  data.fifaInventory = data.fifaInventory || { bronze: 0, silver: 0, gold: 0 };
  data.fifaPlayers = data.fifaPlayers || [];

  if (typeof data.limit === 'number') {
    data.money = data.limit;
  } else {
    data.limit = data.money || 0;
    data.money = data.limit;
  }

  const prices = { bronze: 100, silver: 300, gold: 800 };

  if (command === 'fut') {
    const txt = global.t('futInventory', userId, groupId, {
      bronze: data.fifaInventory.bronze,
      silver: data.fifaInventory.silver,
      gold: data.fifaInventory.gold,
      balance: data.limit
    });

    const buttons = [];
    for (let type of ['bronze', 'silver', 'gold']) {
      if (data.fifaInventory[type] > 0) {
        const emoji = type === 'bronze' ? '🥉' : type === 'silver' ? '🥈' : '🥇';
        buttons.push({
          buttonId: `.open ${type}`,
          buttonText: { displayText: global.t('openPackButton', userId, groupId, { emoji, type }) },
          type: 1
        });
      }
    }

    if (buttons.length === 0) {
      buttons.push({
        buttonId: '.futstore',
        buttonText: { displayText: global.t('buyPacksButton', userId, groupId) },
        type: 1
      });
    }

    return conn.sendMessage(m.chat, {
      text: txt,
      footer: global.t('futFooter', userId, groupId),
      buttons,
      headerType: 1
    }, { quoted: m });
  }

  if (command === 'futstore') {
    const txt = global.t('futStore', userId, groupId, {
      bronzePrice: prices.bronze,
      silverPrice: prices.silver,
      goldPrice: prices.gold,
      balance: data.limit
    });

    return conn.sendMessage(m.chat, {
      text: txt,
      footer: global.t('futStoreFooter', userId, groupId),
      buttons: ['bronze', 'silver', 'gold'].map(type => ({
        buttonId: `.futbuy ${type}`,
        buttonText: { displayText: type.toUpperCase() },
        type: 1
      })),
      headerType: 1
    }, { quoted: m });
  }

  if (command === 'futbuy') {
    const type = args[0]?.toLowerCase();
    if (!prices[type]) return m.reply(global.t('futBuyUsage', userId, groupId));

    if (data.limit < prices[type]) {
      return m.reply(global.t('futNotEnoughMoney', userId, groupId, {
        price: prices[type],
        type: type
      }));
    }

    data.limit -= prices[type];
    data.money = data.limit;
    data.fifaInventory[type]++;
    return m.reply(global.t('futPackBought', userId, groupId, {
      type: type,
      count: data.fifaInventory[type]
    }));
  }

  if (command === 'open') {
    const type = args[0]?.toLowerCase();
    if (!['bronze', 'silver', 'gold'].includes(type)) return m.reply(global.t('futOpenUsage', userId, groupId));
    if (data.fifaInventory[type] <= 0) return m.reply(global.t('futNoPacks', userId, groupId, { type: type }));

    data.fifaInventory[type]--;
    await conn.sendMessage(m.chat, { text: global.t('futOpeningPack', userId, groupId, { type: type }) }, { quoted: m });

    const pool = players.filter(p => p.pack === type);
    const cards = Array.from({ length: 3 }, () => pool[Math.floor(Math.random() * pool.length)]);
    const best = cards.sort((a, b) => b.rating - a.rating)[0];

    for (let [i, p] of cards.entries()) {
      if (i === 0) {
        await conn.sendMessage(m.chat, {
          image: { url: p.image },
          caption: global.t('futPlayerCard', userId, groupId, {
            name: p.name,
            rating: p.rating,
            position: p.position,
            club: p.club,
            nation: p.nation
          })
        }, { quoted: m });
      } else {
        await conn.sendMessage(m.chat, {
          text: global.t('futAdditionalPlayer', userId, groupId, {
            name: p.name,
            rating: p.rating
          })
        }, { quoted: m });
      }
    }

    data.fifaPlayers.push(...cards);
  }

  if (command === 'futrosa') {
    if (!data.fifaPlayers.length) return m.reply(global.t('futNoPlayers', userId, groupId));

    const top = data.fifaPlayers.sort((a, b) => b.rating - a.rating).slice(0, 6);
    const canvas = Canvas.createCanvas(900, 600);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, 900, 600);

    for (let i = 0; i < top.length; i++) {
      const img = await Canvas.loadImage(top[i].image);
      const x = (i % 3) * 300;
      const y = Math.floor(i / 3) * 300;
      ctx.drawImage(img, x, y, 300, 300);
    }

    const buffer = canvas.toBuffer();
    await conn.sendMessage(m.chat, { image: { buffer } }, { quoted: m });
  }
};

handler.command = /^\.?(fut|futstore|futbuy|open|futrosa|fifastore|fifabuy|fifarosa)$/i;
handler.tags = ['fifa', 'games'];
handler.help = ['fut', 'futstore', 'futbuy <tipo>', 'open <tipo>', 'futrosa'];
export default handler;