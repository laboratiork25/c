import '../lib/language.js';

let cooldowns = {};

let handler = async (m, { conn, args, usedPrefix, command }) => {
    const userId = m.sender;
    const groupId = m.chat;
    
    let user = global.db.data.users[m.sender];
    let bet = args[0] ? parseInt(args[0]) : 20;
    
    if (isNaN(bet) || bet <= 0) {
        return conn.reply(m.chat, global.t('slotInvalidBet', userId, groupId, { prefix: usedPrefix, command }), m);
    }

    if ((user.limit || 0) < bet) {
        return conn.reply(m.chat, global.t('slotInsufficientUC', userId, groupId, { bet }), m);
    }

    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < 300000) {
        let timeLeft = cooldowns[m.sender] + 300000 - Date.now();
        let min = Math.floor(timeLeft / 60000);
        let sec = Math.floor((timeLeft % 60000) / 1000);
        return conn.reply(m.chat, global.t('slotCooldown', userId, groupId, { min, sec }), m);
    }

    let win = Math.random() < 0.5;
    let resultMsg, gifFile;

    user.exp = Number(user.exp) || 0;
    user.level = Number(user.level) || 1;
    let { min: minXP, xp: levelXP, max: maxXP } = xpRange(user.level, global.multiplier || 1);
    let currentLevelXP = user.exp - minXP;

    if (win) {
        user.limit = (user.limit || 0) + 800;
        user.exp = (user.exp || 0) + 100;
        resultMsg = global.t('slotWin', userId, groupId, { uc: 800, xp: 100 });
        gifFile = './icone/vincita.gif';
    } else {
        user.limit = (user.limit || 0) - bet;
        user.exp = Math.max(0, (user.exp || 0) - bet);
        resultMsg = global.t('slotLose', userId, groupId, { uc: bet, xp: bet });
        gifFile = './icone/perdita.gif';
    }

    resultMsg += global.t('slotBalance', userId, groupId, {
        uc: user.limit || 0,
        xp: user.exp || 0,
        current: currentLevelXP,
        max: levelXP,
        prefix: usedPrefix
    });

    await conn.sendMessage(m.chat, { 
        video: { url: gifFile }, 
        gifPlayback: true 
    }, { quoted: m });

    cooldowns[m.sender] = Date.now();
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    await conn.reply(m.chat, resultMsg, m);
};

handler.help = ['slot <bet>'];
handler.tags = ['game'];
handler.command = /^slot$/i;

export default handler;

function xpRange(level, multiplier = 1) {
    if (level < 0) level = 0;
    let min = level === 0 ? 0 : Math.pow(level, 2) * 20;
    let max = Math.pow(level + 1, 2) * 20;
    let xp = Math.floor((max - min) * multiplier);
    return { min, xp, max };
}
