import '../lib/language.js';
let handler = async (m, { conn, participants, args }) => {
    global.db.data.users = global.db.data.users || {}
    let userId = m.sender
    let groupId = m.chat.endsWith('@g.us') ? m.chat : null
    
    let mentionedJid = (m.mentionedJid && m.mentionedJid[0]) || ''
    if (!mentionedJid) return m.reply(global.t('battleTagUser', userId, groupId))

    let user1 = m.sender
    let user2 = mentionedJid

    let p1 = global.db.data.users[user1]?.pokemons || []
    let p2 = global.db.data.users[user2]?.pokemons || []

    if (!p1.length) return m.reply(global.t('battleNoPokemonSelf', userId, groupId))
    if (!p2.length) return m.reply(global.t('battleNoPokemonOpponent', userId, groupId))

    let poke1 = pickRandom(p1)
    let poke2 = pickRandom(p2)

    let power1 = poke1.level + randBetween(-10, 10)
    let power2 = poke2.level + randBetween(-10, 10)

    let winner, loser, resultText

    if (power1 > power2) {
        winner = user1
        loser = user2
        resultText = global.t('battleWinner', userId, groupId, { user: user1.split('@')[0] })
    } else if (power2 > power1) {
        winner = user2
        loser = user1
        resultText = global.t('battleWinner', userId, groupId, { user: user2.split('@')[0] })
    } else {
        resultText = global.t('battleDraw', userId, groupId)
    }

    let battleText = global.t('battleHeader', userId, groupId) + '\n\n' +
        global.t('battlePlayer1', userId, groupId, { 
            user: user1.split('@')[0], 
            pokemon: poke1.name, 
            level: poke1.level 
        }) + '\n' +
        global.t('battlePlayer2', userId, groupId, { 
            user: user2.split('@')[0], 
            pokemon: poke2.name, 
            level: poke2.level 
        }) + '\n\n' +
        resultText

    await conn.sendMessage(m.chat, { 
        text: battleText, 
        mentions: [user1, user2] 
    }, { quoted: m })
}

handler.help = ['combatti @utente']
handler.tags = ['pokemon']
handler.command = /^(combatti|battle|fight)$/i

export default handler

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function randBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}