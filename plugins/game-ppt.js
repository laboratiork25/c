import '../lib/language.js';
let cooldowns = {}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let userId = m.sender;
    let groupId = m.chat.endsWith('@g.us') ? m.chat : null;
    
    let punti = 300;
    let tempoAttesa = 2 * 60 * 1000; // 2 minuti
    let user = global.db.data.users[m.sender];
 
    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tempoAttesa) {
        let tempoRimanente = secondiAHMS(Math.ceil((cooldowns[m.sender] + tempoAttesa - Date.now()) / 1000));
        return conn.reply(m.chat, global.t('scfCooldown', userId, groupId, { time: tempoRimanente }), m);
    }

    cooldowns[m.sender] = Date.now();

    if (!text) {
        return conn.sendMessage(m.chat, { 
            text: global.t('scfNoChoice', userId, groupId, { prefix: usedPrefix, command: command }),
            contextInfo: {
                forwardingScore: 99,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363259442839354@newsletter',
                    serverMessageId: '',
                    newsletterName: 'ChatUnity'
                }
            }
        }, { quoted: m });
    }

    let opzioni = ['pietra', 'carta', 'forbici'];
    let botChoice = opzioni[Math.floor(Math.random() * opzioni.length)];

    if (!opzioni.includes(text.toLowerCase())) {
        return conn.sendMessage(m.chat, { 
            text: global.t('scfInvalidChoice', userId, groupId, { prefix: usedPrefix, command: command }),
            contextInfo: {
                forwardingScore: 99,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363259442839354@newsletter',
                    serverMessageId: '',
                    newsletterName: 'ChatUnity'
                }
            }
        }, { quoted: m });
    }

    let risultato = '';
    let puntiOttenuti = 0;
    let userChoice = text.toLowerCase();

    if (userChoice === botChoice) {
        risultato = global.t('scfDraw', userId, groupId, { points: 100 });
        puntiOttenuti = 100;
    } else if (
        (userChoice === 'pietra' && botChoice === 'forbici') ||
        (userChoice === 'forbici' && botChoice === 'carta') ||
        (userChoice === 'carta' && botChoice === 'pietra')
    ) {
        risultato = global.t('scfWin', userId, groupId, { points: punti });
        puntiOttenuti = punti;
    } else {
        risultato = global.t('scfLose', userId, groupId, { points: punti });
        puntiOttenuti = -punti;
    }

    // Inizializza user.limit se non esiste
    if (!user.limit) user.limit = 0;
    user.limit += puntiOttenuti;

    await conn.sendMessage(m.chat, { 
        text: global.t('scfResult', userId, groupId, { 
            result: risultato, 
            botChoice: botChoice.toUpperCase(),
            newBalance: user.limit 
        }),
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });
}

handler.help = ['scf'];
handler.tags = ['game'];
handler.command = ['scf', 'sassocartaforbici', 'rps', 'rockpaperscissors'];

function secondiAHMS(secondi) {
    return `${secondi % 60} secondi`;
}

export default handler;