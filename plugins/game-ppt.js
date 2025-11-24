import '../lib/language.js';

let cooldowns = {};

let handler = async (m, { conn, text, usedPrefix, command }) => {
    const userId = m.sender;
    const groupId = m.chat;
    let punti = 300;
    let tempoAttesa = 2 * 60 * 1000;
    let user = global.db.data.users[m.sender];
 
    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tempoAttesa) {
        let tempoRimanente = secondiAHMS(Math.ceil((cooldowns[m.sender] + tempoAttesa - Date.now()) / 1000));
        return conn.reply(m.chat, global.t('rps2Cooldown', userId, groupId, { time: tempoRimanente }), m);
    }

    cooldowns[m.sender] = Date.now();

    if (!text) {
        return conn.sendMessage(m.chat, {
            text: global.t('rps2Usage', userId, groupId, { prefix: usedPrefix, command }),
            buttons: [
                { buttonId: `${usedPrefix}${command} pietra`, buttonText: { displayText: global.t('rps2ButtonRock', userId, groupId) }, type: 1 },
                { buttonId: `${usedPrefix}${command} carta`, buttonText: { displayText: global.t('rps2ButtonPaper', userId, groupId) }, type: 1 },
                { buttonId: `${usedPrefix}${command} forbici`, buttonText: { displayText: global.t('rps2ButtonScissors', userId, groupId) }, type: 1 }
            ],
            footer: '✊ ChatUnity RPS'
        }, { quoted: m });
    }

    let opzioni = ['pietra', 'carta', 'forbici'];
    let opzioniEng = ['rock', 'paper', 'scissors'];
    let textLower = text.toLowerCase();
    
    // Converti inglese in italiano
    if (opzioniEng.includes(textLower)) {
        const mapping = { rock: 'pietra', paper: 'carta', scissors: 'forbici' };
        textLower = mapping[textLower];
    }
    
    let botChoice = opzioni[Math.floor(Math.random() * opzioni.length)];

    if (!opzioni.includes(textLower)) {
        return conn.reply(m.chat, global.t('rps2InvalidChoice', userId, groupId, { prefix: usedPrefix, command }), m);
    }

    await conn.sendMessage(m.chat, { 
        react: { text: '✊', key: m.key }
    });

    await new Promise(resolve => setTimeout(resolve, 1500));

    const emojiMap = {
        pietra: '🪨',
        carta: '📄',
        forbici: '✂️'
    };

    let risultato = '';
    let puntiOttenuti = 0;

    if (textLower === botChoice) {
        await conn.sendMessage(m.chat, { 
            react: { text: '🤝', key: m.key }
        });
        risultato = global.t('rps2Draw', userId, groupId, {
            bot: `${emojiMap[botChoice]} ${botChoice}`,
            reward: 100
        });
        puntiOttenuti = 100;
    } else if (
        (textLower === 'pietra' && botChoice === 'forbici') ||
        (textLower === 'forbici' && botChoice === 'carta') ||
        (textLower === 'carta' && botChoice === 'pietra')
    ) {
        await conn.sendMessage(m.chat, { 
            react: { text: '🎉', key: m.key }
        });
        risultato = global.t('rps2Win', userId, groupId, {
            bot: `${emojiMap[botChoice]} ${botChoice}`,
            reward: punti
        });
        puntiOttenuti = punti;
    } else {
        await conn.sendMessage(m.chat, { 
            react: { text: '😢', key: m.key }
        });
        risultato = global.t('rps2Lose', userId, groupId, {
            bot: `${emojiMap[botChoice]} ${botChoice}`,
            loss: punti
        });
        puntiOttenuti = -punti;
    }

    user.limit += puntiOttenuti;
    await conn.reply(m.chat, risultato, m);
};

handler.help = ['scf', 'sassocartaforbici'];
handler.tags = ['game'];
handler.command = /^(scf|sassocartaforbici|rockpaperscissors2)$/i;

function secondiAHMS(secondi) {
    let minuti = Math.floor(secondi / 60);
    let sec = secondi % 60;
    return minuti > 0 ? `${minuti}m ${sec}s` : `${sec}s`;
}

export default handler;
