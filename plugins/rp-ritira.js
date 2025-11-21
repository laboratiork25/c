import '../lib/language.js';

let handler = async (m, { conn, args }) => {
    const userId = m.sender;
    const groupId = m.chat;

    if (!global.db.data.users) global.db.data.users = {};

    let user = global.db.data.users[m.sender] || {};
    
    user.bank = Number(user.bank) || 0;
    user.limit = Number(user.limit) || 0;

    if (!args[0]) {
        return conn.sendMessage(m.chat, {
            text: global.t('withdrawNoAmount', userId, groupId)
        }, { quoted: m });
    }

    if (args[0].toLowerCase() === 'all') {
        let count = Math.floor(user.bank);
        if (count <= 0) {
            return conn.sendMessage(m.chat, {
                text: global.t('withdrawNoFunds', userId, groupId)
            }, { quoted: m });
        }
        user.bank -= count;
        user.limit += count;
        await conn.sendMessage(m.chat, {
            text: global.t('withdrawSuccess', userId, groupId, {
                count,
                bank: formatNumber(user.bank)
            })
        }, { quoted: m });
        return;
    }

    if (isNaN(args[0])) {
        return conn.sendMessage(m.chat, {
            text: global.t('withdrawInvalidAmount', userId, groupId)
        }, { quoted: m });
    }

    let count = Math.floor(Number(args[0]));
    if (count < 1) {
        return conn.sendMessage(m.chat, {
            text: global.t('withdrawMinAmount', userId, groupId)
        }, { quoted: m });
    }

    if (user.bank <= 0) {
        return conn.sendMessage(m.chat, {
            text: global.t('withdrawNoFunds', userId, groupId)
        }, { quoted: m });
    }

    if (user.bank < count) {
        return conn.sendMessage(m.chat, {
            text: global.t('withdrawInsufficientFunds', userId, groupId, { bank: formatNumber(user.bank) })
        }, { quoted: m });
    }

    user.bank -= count;
    user.limit += count;

    await conn.sendMessage(m.chat, {
        text: global.t('withdrawSuccess', userId, groupId, {
            count,
            bank: formatNumber(user.bank)
        })
    }, { quoted: m });
};

handler.help = ['ritira', 'withdraw'];
handler.tags = ['rpg'];
handler.command = ['withdraw', 'retirar', 'ritira'];
handler.register = true;

function formatNumber(num) {
    return new Intl.NumberFormat('it-IT').format(num);
}

export default handler;
