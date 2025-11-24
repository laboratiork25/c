import '../lib/language.js';

let handler = async (m, { conn, participants, args }) => {
    const userId = m.sender;
    const groupId = m.chat;
    
    global.db.data.users = global.db.data.users || {};
    let user1 = m.sender;
    let mentionedJid = (m.mentionedJid && m.mentionedJid[0]) || '';
    
    if (!mentionedJid) return m.reply(global.t('pokeBattleNoMention', userId, groupId));

    let user2 = mentionedJid;

    let p1 = global.db.data.users[user1]?.pokemons || [];
    let p2 = global.db.data.users[user2]?.pokemons || [];

    if (!p1.length) return m.reply(global.t('pokeBattleNoPokemon', userId, groupId));
    if (!p2.length) return m.reply(global.t('pokeBattleOpponentNoPokemon', userId, groupId));

    let poke1 = pickRandom(p1);
    let poke2 = pickRandom(p2);

    let power1 = poke1.level + randBetween(-10, 10);
    let power2 = poke2.level + randBetween(-10, 10);

    let resultText;

    if (power1 > power2) {
        resultText = global.t('pokeBattleWinner', userId, groupId, { user: user1.split('@')[0] });
    } else if (power2 > power1) {
        resultText = global.t('pokeBattleWinner', userId, groupId, { user: user2.split('@')[0] });
    } else {
        resultText = global.t('pokeBattleTie', userId, groupId);
    }

    let battleText = global.t('pokeBattleResult', userId, groupId, {
        user1: user1.split('@')[0],
        user2: user2.split('@')[0],
        poke1,
        poke2,
        result: resultText
    });

    await conn.sendMessage(m.chat, { text: battleText, mentions: [user1, user2] }, { quoted: m });
};

handler.help = ['combatti @utente'];
handler.tags = ['pokemon'];
handler.command = /^(combatti|battle)$/i;
export default handler;

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
