import '../lib/language.js';

let buatall = 1;
let cooldowns = {};

let handler = async (m, { conn, args, usedPrefix, command }) => {
    const userId = m.sender;
    const groupId = m.isGroup ? m.chat : null;
    
    let user = global.db.data.users[m.sender];
    let randomaku = Math.floor(Math.random() * 101);
    let randomkamu = Math.floor(Math.random() * 55);
    let Aku = randomaku * 1;
    let Kamu = randomkamu * 1;
    let count = args[0];
    let who = m.fromMe ? conn.user.jid : m.sender;
    let username = conn.getName(who);

    let tiempoEspera = 15;

    // Mostra i bottoni SOLO se non è stato ancora scelto un importo
    if (args.length < 1) {
        // Calcola i tagli disponibili in base ai coins dell'utente
        const maxUC = Math.max(10, Math.floor((user.limit || 0) / 2));
        const tagli = [10, 50, 100, 250, 500, 1000].filter(n => n <= maxUC);
        
        return conn.sendMessage(m.chat, {
            text: global.t('casinoChooseBet', userId, groupId, { 
                prefix: usedPrefix, 
                command 
            }),
            buttons: tagli.map(n => ({
                buttonId: `${usedPrefix + command} ${n}`,
                buttonText: { displayText: global.t('casinoBetButton', userId, groupId, { amount: n }) },
                type: 1
            }))
        }, { quoted: m });
    }

    // Applica il cooldown
    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
        let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000));
        return conn.reply(m.chat, global.t('casinoCooldown', userId, groupId, { time: tiempoRestante }), m);
    }

    cooldowns[m.sender] = Date.now();

    count = count
        ? /all/i.test(count)
            ? Math.floor((user.limit || 0) / buatall)
            : parseInt(count)
        : args[0]
        ? parseInt(args[0])
        : 1;
    count = Math.max(1, count);

    if ((user.limit || 0) >= count * 1) {
        user.limit -= count * 1;
        
        if (Aku > Kamu) {
            // Perso
            conn.reply(
                m.chat,
                global.t('casinoLost', userId, groupId, {
                    botScore: Aku,
                    playerScore: Kamu,
                    username,
                    amount: formatNumber(count)
                }),
                m
            );
        } else if (Aku < Kamu) {
            // Vinto
            user.limit += count * 2;
            conn.reply(
                m.chat,
                global.t('casinoWon', userId, groupId, {
                    botScore: Aku,
                    playerScore: Kamu,
                    username,
                    amount: formatNumber(count * 2)
                }),
                m
            );
        } else {
            // Pareggio
            user.limit += count * 1;
            conn.reply(
                m.chat,
                global.t('casinoTie', userId, groupId, {
                    botScore: Aku,
                    playerScore: Kamu,
                    username,
                    amount: formatNumber(count * 1)
                }),
                m
            );
        }
    } else {
        conn.reply(m.chat, global.t('casinoInsufficient', userId, groupId, { 
            amount: formatNumber(count) 
        }), m);
    }
};

handler.help = ['scommetti <quantità>'];
handler.tags = ['game'];
handler.command = /^(scommetti|casinò|casino|bet|gamble|scommetti)$/i;
handler.register = true;

export default handler;

function segundosAHMS(segundos) {
    let minuti = Math.floor(segundos / 60);
    let secondi = segundos % 60;
    return `${minuti}m ${secondi}s`;
}

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}