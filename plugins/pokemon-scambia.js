import '../lib/language.js';

let tradeRequests = {};

let handler = async (m, { conn, args, command }) => {
    const userId = m.sender;
    const groupId = m.chat;
    
    global.db.data.users = global.db.data.users || {};
    let sender = m.sender;
    let users = global.db.data.users;
    let username = sender.split('@')[0];

    if (command === 'scambia' || command === 'trade') {
        let target = m.mentionedJid?.[0];
        if (!target) return m.reply(global.t('tradeUsage', userId, groupId));
        
        let myIndex = parseInt(args[1]) - 1;
        let theirIndex = parseInt(args[2]) - 1;
        let myPokemons = users[sender]?.pokemons || [];
        let theirPokemons = users[target]?.pokemons || [];

        if (!myPokemons[myIndex]) return m.reply(global.t('tradeYourNotExist', userId, groupId, { num: args[1] }));
        if (!theirPokemons[theirIndex]) return m.reply(global.t('tradeTheirNotExist', userId, groupId, { num: args[2], user: target.split('@')[0] }), null, { mentions: [target] });

        tradeRequests[target] = {
            from: sender,
            myIndex,
            theirIndex
        };

        let myPoke = myPokemons[myIndex];
        let theirPoke = theirPokemons[theirIndex];

        let txt = global.t('tradeRequest', userId, groupId, {
            from: username,
            myPoke,
            theirPoke,
            target: target.split('@')[0]
        });
        
        return conn.reply(m.chat, txt, m, { mentions: [target, sender] });
    }

    if (command === 'accetta' || command === 'accept') {
        let trade = tradeRequests[sender];
        if (!trade) return m.reply(global.t('tradeNoRequest', userId, groupId));

        let { from, myIndex, theirIndex } = trade;
        let myPokemons = users[sender]?.pokemons || [];
        let theirPokemons = users[from]?.pokemons || [];

        let myPoke = myPokemons[myIndex];
        let theirPoke = theirPokemons[theirIndex];

        if (!myPoke || !theirPoke) {
            delete tradeRequests[sender];
            return m.reply(global.t('tradeUnavailable', userId, groupId));
        }

        users[sender].pokemons[myIndex] = theirPoke;
        users[from].pokemons[theirIndex] = myPoke;

        delete tradeRequests[sender];

        return m.reply(global.t('tradeSuccess', userId, groupId, {
            from: from.split('@')[0],
            to: sender.split('@')[0],
            poke1: theirPoke,
            poke2: myPoke
        }), null, { mentions: [from, sender] });
    }
};

handler.help = ['scambia @user <your_num> <their_num>', 'trade @user <your_num> <their_num>', 'accetta', 'accept'];
handler.tags = ['pokemon'];
handler.command = /^(scambia|trade|accetta|accept)$/i;

export default handler;
