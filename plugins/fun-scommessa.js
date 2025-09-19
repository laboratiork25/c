import '../lib/language.js';

let cooldowns = {};

let handler = async (m, { conn, text, usedPrefix, command }) => {
    const userId = m.sender;
    const groupId = m.isGroup ? m.chat : null;
    
    let punti = 300;
    let tempoAttesa = 5 * 1000;
    let user = global.db.data.users[m.sender];

    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tempoAttesa) {
        let tempoRestante = secondiAHMS(Math.ceil((cooldowns[m.sender] + tempoAttesa - Date.now()) / 1000));
        return conn.reply(
            m.chat,
            global.t('pptCooldown', userId, groupId, { time: tempoRestante }),
            m
        );
    }

    cooldowns[m.sender] = Date.now();

    if (!text) {
        return conn.sendMessage(m.chat, {
            text: global.t('pptChooseOption', userId, groupId),
            buttons: [
                { buttonId: `${usedPrefix + command} sasso`, buttonText: { displayText: global.t('pptRock', userId, groupId) }, type: 1 },
                { buttonId: `${usedPrefix + command} carta`, buttonText: { displayText: global.t('pptPaper', userId, groupId) }, type: 1 },
                { buttonId: `${usedPrefix + command} forbice`, buttonText: { displayText: global.t('pptScissors', userId, groupId) }, type: 1 }
            ]
        }, { quoted: m });
    }

    let opzioni = ['sasso', 'carta', 'forbice'];
    let astro = opzioni[Math.floor(Math.random() * opzioni.length)];

    if (!opzioni.includes(text)) {
        return conn.sendMessage(m.chat, {
            text: global.t('pptInvalidOption', userId, groupId),
            buttons: [
                { buttonId: `${usedPrefix + command} sasso`, buttonText: { displayText: global.t('pptRock', userId, groupId) }, type: 1 },
                { buttonId: `${usedPrefix + command} carta`, buttonText: { displayText: global.t('pptPaper', userId, groupId) }, type: 1 },
                { buttonId: `${usedPrefix + command} forbice`, buttonText: { displayText: global.t('pptScissors', userId, groupId) }, type: 1 }
            ]
        }, { quoted: m });
    }

    let risultato = '';
    let puntiOttenuti = 0;

    if (text === astro) {
        risultato = global.t('pptTie', userId, groupId, { points: 100 });
        puntiOttenuti = 100;
    } else if (
        (text === 'sasso' && astro === 'forbice') ||
        (text === 'forbice' && astro === 'carta') ||
        (text === 'carta' && astro === 'sasso')
    ) {
        risultato = global.t('pptWin', userId, groupId, { points: punti });
        puntiOttenuti = punti;
    } else {
        risultato = global.t('pptLose', userId, groupId, { points: punti });
        puntiOttenuti = -punti;
    }

    user.limit = (user.limit || 0) + puntiOttenuti;
    
    conn.sendMessage(m.chat, {
        text: global.t('pptResult', userId, groupId, {
            userChoice: text,
            botChoice: astro,
            result: risultato,
            currentBalance: user.limit || 0
        }),
        buttons: [
            { buttonId: `${usedPrefix + command}`, buttonText: { displayText: global.t('pptRetry', userId, groupId) }, type: 1 }
        ]
    }, { quoted: m });
};

handler.help = ['ppt'];
handler.tags = ['game'];
handler.command = /^(scommessa|ppt|piedra|papel|tijera|rps|rockpaperscissors)$/i;
handler.register = true;

export default handler;

function secondiAHMS(secondi) {
    let minuti = Math.floor(secondi / 60);
    let secondiRimanenti = secondi % 60;
    return `${minuti}m ${secondiRimanenti}s`;
}