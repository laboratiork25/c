import '../lib/language.js';

const gameSessions = {};
let cooldowns = {};

let handler = async (m, { conn, text, command, usedPrefix }) => {
    const userId = m.sender;
    const groupId = m.chat;
    const tempoAttesa = 5;

    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tempoAttesa * 1000) {
        let tempoRimanente = secondiAHMS(Math.ceil((cooldowns[m.sender] + tempoAttesa * 1000 - Date.now()) / 1000));
        return m.reply(global.t('cfCooldown', userId, groupId, { time: tempoRimanente }));
    }

    const validChoices = ['testa', 'croce', 'heads', 'tails'];
    let normalizedText = text?.toLowerCase();
    
    // Converti inglese in italiano
    if (normalizedText === 'heads') normalizedText = 'testa';
    if (normalizedText === 'tails') normalizedText = 'croce';

    if (!text || validChoices.includes(normalizedText)) {
        if (!gameSessions[m.chat]) {
            if (!text) {
                return conn.sendMessage(m.chat, {
                    text: global.t('cfWaiting', userId, groupId, { player: m.sender.split('@')[0] }),
                    buttons: [
                        { buttonId: `${usedPrefix}${command} testa`, buttonText: { displayText: global.t('cfButtonHeads', userId, groupId) }, type: 1 },
                        { buttonId: `${usedPrefix}${command} croce`, buttonText: { displayText: global.t('cfButtonTails', userId, groupId) }, type: 1 }
                    ],
                    footer: '🎮 ChatUnity Coin Flip',
                    mentions: [m.sender]
                }, { quoted: m });
            }

            gameSessions[m.chat] = {
                player1: m.sender,
                choice1: normalizedText,
                player2: null,
                choice2: null,
                status: 'waiting'
            };

            return conn.sendMessage(m.chat, {
                text: global.t('cfPlayer1Ready', userId, groupId, { 
                    player: m.sender.split('@')[0], 
                    choice: normalizedText 
                }),
                buttons: [
                    { buttonId: `${usedPrefix}${command} testa`, buttonText: { displayText: global.t('cfButtonHeads', userId, groupId) }, type: 1 },
                    { buttonId: `${usedPrefix}${command} croce`, buttonText: { displayText: global.t('cfButtonTails', userId, groupId) }, type: 1 }
                ],
                footer: '🎮 ChatUnity Coin Flip',
                mentions: [m.sender]
            }, { quoted: m });
        } else {
            let session = gameSessions[m.chat];

            if (session.status === 'waiting' && m.sender !== session.player1) {
                if (!validChoices.includes(normalizedText)) {
                    return conn.reply(m.chat, global.t('cfInvalidChoice', userId, groupId), m);
                }

                session.player2 = m.sender;
                session.choice2 = normalizedText;
                session.status = 'ready';

                await conn.sendMessage(m.chat, { 
                    react: { text: '🪙', key: m.key }
                });

                const risultato = Math.random() < 0.5 ? 'testa' : 'croce';
                const vincitore1 = session.choice1 === risultato;
                const vincitore2 = session.choice2 === risultato;

                let messaggio = '';

                if (vincitore1) {
                    global.db.data.users[session.player1].limit += 500;
                    messaggio += `✅ @${session.player1.split('@')[0]} ha vinto 500 💶\n`;
                } else {
                    global.db.data.users[session.player1].limit -= 250;
                    messaggio += `❌ @${session.player1.split('@')[0]} ha perso 250 💶\n`;
                }

                if (vincitore2) {
                    global.db.data.users[session.player2].limit += 500;
                    messaggio += `✅ @${session.player2.split('@')[0]} ha vinto 500 💶\n`;
                } else {
                    global.db.data.users[session.player2].limit -= 250;
                    messaggio += `❌ @${session.player2.split('@')[0]} ha perso 250 💶\n`;
                }

                conn.sendMessage(m.chat, {
                    text: global.t('cfResult', userId, groupId, {
                        result: risultato,
                        p1: session.player1.split('@')[0],
                        p2: session.player2.split('@')[0],
                        msg: messaggio,
                        prefix: usedPrefix,
                        command
                    }),
                    mentions: [session.player1, session.player2],
                    footer: '🎮 ChatUnity Coin Flip'
                }, { quoted: m });

                cooldowns[session.player1] = Date.now();
                cooldowns[session.player2] = Date.now();
                delete gameSessions[m.chat];
                return;
            }

            if (session.status === 'waiting' && m.sender === session.player1) {
                return m.reply(global.t('cfAlreadyChosen', userId, groupId, { choice: session.choice1 }));
            }

            return conn.reply(m.chat, global.t('cfNotAvailable', userId, groupId, { prefix: usedPrefix, command }), m);
        }
    }

    return conn.reply(m.chat, global.t('cfInvalidChoice', userId, groupId), m);
};

function secondiAHMS(secondi) {
    return `${secondi % 60}s`;
}

handler.help = ['moneta', 'coinflip', 'cf'];
handler.tags = ['game'];
handler.command = /^(cf|flip|moneta|coinflip)$/i;
handler.register = true;

export default handler;
