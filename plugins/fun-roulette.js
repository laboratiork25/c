import '../lib/language.js';

let cooldowns = {};

let handler = async (m, { conn, text, command, usedPrefix }) => {
  const userId = m.sender;
  const groupId = m.chat;
  let users = global.db.data.users[m.sender];
  let tempoAttesa = 10;

  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tempoAttesa * 1000) {
    let tempoRestante = secondiAHMS(Math.ceil((cooldowns[m.sender] + tempoAttesa * 1000 - Date.now()) / 1000));
    return conn.reply(m.chat, global.t('rouletteCooldown', userId, groupId, { time: tempoRestante }), m);
  }

  cooldowns[m.sender] = Date.now();

  if (!text) {
    return conn.sendMessage(m.chat, {
      text: global.t('rouletteUsage', userId, groupId, { prefix: usedPrefix, command }),
      buttons: [
        { buttonId: `${usedPrefix}${command} 10 black`, buttonText: { displayText: global.t('rouletteButtonBlack10', userId, groupId) }, type: 1 },
        { buttonId: `${usedPrefix}${command} 25 black`, buttonText: { displayText: global.t('rouletteButtonBlack25', userId, groupId) }, type: 1 },
        { buttonId: `${usedPrefix}${command} 50 black`, buttonText: { displayText: global.t('rouletteButtonBlack50', userId, groupId) }, type: 1 },
        { buttonId: `${usedPrefix}${command} 10 red`, buttonText: { displayText: global.t('rouletteButtonRed10', userId, groupId) }, type: 1 },
        { buttonId: `${usedPrefix}${command} 25 red`, buttonText: { displayText: global.t('rouletteButtonRed25', userId, groupId) }, type: 1 },
        { buttonId: `${usedPrefix}${command} 50 red`, buttonText: { displayText: global.t('rouletteButtonRed50', userId, groupId) }, type: 1 }
      ],
      footer: '🎰 ChatUnity Roulette'
    }, { quoted: m });
  }

  let args = text.trim().split(" ");
  if (args.length !== 2) {
    return conn.reply(m.chat, global.t('rouletteInvalidFormat', userId, groupId, { prefix: usedPrefix, command }), m);
  }

  let limit = parseInt(args[0]);
  let color = args[1].toLowerCase();

  if (isNaN(limit) || limit <= 0) {
    return conn.reply(m.chat, global.t('rouletteInvalidAmount', userId, groupId), m);
  }

  if (limit > 50) {
    return conn.reply(m.chat, global.t('rouletteMaxBet', userId, groupId), m);
  }

  if (!(color === 'black' || color === 'red')) {
    return conn.reply(m.chat, global.t('rouletteInvalidColor', userId, groupId), m);
  }

  if (limit > users.limit) {
    return conn.reply(m.chat, global.t('rouletteInsufficientFunds', userId, groupId), m);
  }

  await conn.sendMessage(m.chat, { 
    react: { text: '🎰', key: m.key }
  });

  await conn.reply(m.chat, global.t('rouletteBetPlaced', userId, groupId, { amount: limit, color }), m);

  setTimeout(async () => {
    let result = Math.random();
    let winColor = result < 0.5 ? 'black' : 'red';
    let win = color === winColor;
    
    if (win) {
      users.limit += limit;
      await conn.sendMessage(m.chat, { 
        react: { text: '🎉', key: m.key }
      });
      await conn.reply(m.chat, global.t('rouletteWin', userId, groupId, { 
        amount: limit, 
        total: users.limit,
        winColor 
      }), m);
    } else {
      users.limit -= limit;
      await conn.sendMessage(m.chat, { 
        react: { text: '😢', key: m.key }
      });
      await conn.reply(m.chat, global.t('rouletteLose', userId, groupId, { 
        amount: limit, 
        total: users.limit,
        winColor 
      }), m);
    }
  }, 10000);
};

handler.tags = ['game'];
handler.help = ['ruleta <amount> <color>', 'roulette <amount> <color>'];
handler.command = /^(ruleta|roulette|rt)$/i;
handler.register = true;
handler.group = true;

export default handler;

function secondiAHMS(secondi) {
  return `${secondi}s`;
}
