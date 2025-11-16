import '../lib/language.js';

let buatall = 1;
let cooldowns = {};

let handler = async (m, { conn, args, usedPrefix, command, DevMode }) => {
    const userId = m.sender;
    const groupId = m.chat;
    
    let user = global.db.data.users[m.sender];
    let randomaku = Math.floor(Math.random() * 101);
    let randomkamu = Math.floor(Math.random() * 101);
    let Aku = randomaku * 1;
    let Kamu = randomkamu * 1;
    let count = args[0];
    let who = m.fromMe ? conn.user.jid : m.sender;
    let username = conn.getName(who);

    let tiempoEspera = 15;

    if (args.length < 1) {
        const maxUC = Math.max(10, Math.floor(user.limit / 2));
        const tagli = [10, 50, 100, 250, 500, 1000].filter(n => n <= maxUC);
        return conn.sendMessage(m.chat, {
            text: global.t('betUsage', userId, groupId, { prefix: usedPrefix, command }),
            buttons: tagli.map(n => ({
                buttonId: `${usedPrefix + command} ${n}`,
                buttonText: { displayText: `${n} 💶` },
                type: 1
            }))
        }, { quoted: m });
    }

    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
        let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000));
        conn.reply(m.chat, global.t('betCooldown', userId, groupId, { time: tiempoRestante }), m);
        return;
    }

    cooldowns[m.sender] = Date.now();

    count = count
        ? /all/i.test(count)
            ? Math.floor(global.db.data.users[m.sender].limit / buatall)
            : parseInt(count)
        : args[0]
        ? parseInt(args[0])
        : 1;
    count = Math.max(1, count);

    if (user.limit >= count * 1) {
        user.limit -= count * 1;
        
        await conn.sendMessage(m.chat, { 
            react: { text: '🎲', key: m.key }
        });
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        if (Aku > Kamu) {
            await conn.sendMessage(m.chat, { 
                react: { text: '😢', key: m.key }
            });
            conn.reply(
                m.chat,
                global.t('betLose', userId, groupId, {
                    bot: Aku,
                    user: Kamu,
                    amount: formatNumber(count),
                    botName: 'ChatUnity-Bot',
                    userName: username
                }),
                m
            );
        } else if (Aku < Kamu) {
            user.limit += count * 2;
            await conn.sendMessage(m.chat, { 
                react: { text: '🎉', key: m.key }
            });
            conn.reply(
                m.chat,
                global.t('betWin', userId, groupId, {
                    bot: Aku,
                    user: Kamu,
                    amount: formatNumber(count * 2),
                    botName: 'ChatUnity-Bot',
                    userName: username
                }),
                m
            );
        } else {
            user.limit += count * 1;
            await conn.sendMessage(m.chat, { 
                react: { text: '🤝', key: m.key }
            });
            conn.reply(
                m.chat,
                global.t('betDraw', userId, groupId, {
                    bot: Aku,
                    user: Kamu,
                    amount: formatNumber(count * 1),
                    botName: 'ChatUnity-Bot',
                    userName: username
                }),
                m
            );
        }
    } else {
        conn.reply(m.chat, global.t('betInsufficientUC', userId, groupId, { amount: formatNumber(count) }), m);
    }
};

handler.help = ['scommetti <amount>', 'bet <amount>', 'casino <amount>'];
handler.tags = ['game'];
handler.command = /^(scommetti|casinò|casino|bet)$/i;
handler.register = true;

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function segundosAHMS(segundos) {
    let minuti = Math.floor(segundos / 60);
    let secondi = segundos % 60;
    return `${minuti}m ${secondi}s`;
}

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
