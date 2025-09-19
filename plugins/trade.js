import '../lib/language.js';
let tradeRequests = {}

let handler = async (m, { conn, args, command }) => {
    global.db.data.users = global.db.data.users || {}
    let sender = m.sender
    let userId = m.sender
    let groupId = m.chat.endsWith('@g.us') ? m.chat : null
    let users = global.db.data.users
    let username = `@${sender.split('@')[0]}`

    if (command === 'scambia') {
        let target = m.mentionedJid?.[0]
        if (!target) return m.reply(global.t('tradeUsage', userId, groupId))
        
        let myIndex = parseInt(args[1]) - 1
        let theirIndex = parseInt(args[2]) - 1
        let myPokemons = users[sender]?.pokemons || []
        let theirPokemons = users[target]?.pokemons || []

        if (!myPokemons[myIndex]) return m.reply(global.t('tradeInvalidSelf', userId, groupId, { number: args[1] }))
        if (!theirPokemons[theirIndex]) return m.reply(global.t('tradeInvalidOther', userId, groupId, { 
            number: args[2], 
            user: target.split('@')[0] 
        }), null, { mentions: [target] })

        tradeRequests[target] = {
            from: sender,
            myIndex,
            theirIndex
        }

        let myPoke = myPokemons[myIndex]
        let theirPoke = theirPokemons[theirIndex]

        let txt = global.t('tradeRequestHeader', userId, groupId) + '\n\n' +
                  global.t('tradeRequestFrom', userId, groupId, { user: username }) + '\n' +
                  global.t('tradeRequestOffer', userId, groupId, { 
                      pokemon: myPoke.name, 
                      level: myPoke.level 
                  }) + '\n' +
                  global.t('tradeRequestFor', userId, groupId, { 
                      pokemon: theirPoke.name, 
                      level: theirPoke.level, 
                      targetUser: target.split('@')[0] 
                  }) + '\n\n' +
                  global.t('tradeRequestAccept', userId, groupId, { targetUser: target.split('@')[0] })
        
        return conn.reply(m.chat, txt, m, { mentions: [target, sender] })
    }

    if (command === 'accetta') {
        let trade = tradeRequests[sender]
        if (!trade) return m.reply(global.t('tradeNoRequest', userId, groupId))

        let { from, myIndex, theirIndex } = trade
        let myPokemons = users[sender]?.pokemons || []
        let theirPokemons = users[from]?.pokemons || []

        let myPoke = myPokemons[myIndex]
        let theirPoke = theirPokemons[theirIndex]

        if (!myPoke || !theirPoke) {
            delete tradeRequests[sender]
            return m.reply(global.t('tradePokemonUnavailable', userId, groupId))
        }

        // Effettua lo scambio
        users[sender].pokemons[myIndex] = theirPoke
        users[from].pokemons[theirIndex] = myPoke

        delete tradeRequests[sender]

        return m.reply(global.t('tradeCompleted', userId, groupId, { 
            user1: from.split('@')[0], 
            user2: sender.split('@')[0], 
            pokemon1: theirPoke.name, 
            pokemon2: myPoke.name 
        }), null, {
            mentions: [from, sender]
        })
    }
}

handler.help = ['scambia @utente <tuo_num> <suo_num>', 'accetta']
handler.tags = ['pokemon']
handler.command = /^(scambia|trade|accetta|accept)$/i

export default handler