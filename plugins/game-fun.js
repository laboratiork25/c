import '../lib/language.js';

const gameSessions = {};
let cooldowns = {};

let handler = async (m, { conn, text, command, usedPrefix }) => {
    const userId = m.sender;
    const groupId = m.isGroup ? m.chat : null;
    
    const tempoAttesa = 5; // secondi

    // Cooldown
    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tempoAttesa * 1000) {
        let tempoRimanente = secondiAHMS(Math.ceil((cooldowns[m.sender] + tempoAttesa * 1000 - Date.now()) / 1000));
        return m.reply(global.t('coinCooldown', userId, groupId, { time: tempoRimanente }));
    }

    if (!text || ['testa', 'croce', 'head', 'tail'].includes(text.toLowerCase())) {
        // Normalizza la scelta (supporta inglese e italiano)
        let normalizedChoice = text ? text.toLowerCase() : '';
        if (normalizedChoice === 'head') normalizedChoice = 'testa';
        if (normalizedChoice === 'tail') normalizedChoice = 'croce';

        if (!gameSessions[m.chat]) {
            if (!text) {
                return conn.sendMessage(m.chat, {
                    text: global.t('coinWaitingPlayer1', userId, groupId, { 
                        player: m.sender.split('@')[0],
                        prefix: usedPrefix,
                        command 
                    }),
                    footer: global.t('coinFooter', userId, groupId),
                    mentions: [m.sender],
                    headerType: 1
                }, { quoted: m });
            }

            gameSessions[m.chat] = {
                player1: m.sender,
                choice1: normalizedChoice,
                player2: null,
                choice2: null,
                status: 'waiting'
            };

            return conn.sendMessage(m.chat, {
                text: global.t('coinPlayer1Chose', userId, groupId, { 
                    player: m.sender.split('@')[0],
                    choice: normalizedChoice,
                    prefix: usedPrefix,
                    command 
                }),
                footer: global.t('coinJoinPrompt', userId, groupId),
                mentions: [m.sender],
                headerType: 1
            }, { quoted: m });
        } else {
            let session = gameSessions[m.chat];

            if (session.status === 'waiting' && m.sender !== session.player1) {
                if (!['testa', 'croce'].includes(normalizedChoice)) {
                    return conn.sendMessage(m.chat, {
                        text: global.t('coinInvalidChoice', userId, groupId),
                        footer: global.t('coinFooter', userId, groupId),
                        headerType: 1
                    }, { quoted: m });
                }

                session.player2 = m.sender;
                session.choice2 = normalizedChoice;
                session.status = 'ready';

                const risultato = Math.random() < 0.5 ? 'testa' : 'croce';
                const vincitore1 = session.choice1 === risultato;
                const vincitore2 = session.choice2 === risultato;

                let messaggio = global.t('coinResult', userId, groupId, { result: risultato.toUpperCase() }) + '\n\n';

                if (vincitore1) {
                    global.db.data.users[session.player1].limit = (global.db.data.users[session.player1].limit || 0) + 500;
                    messaggio += global.t('coinPlayerWin', userId, groupId, { 
                        player: session.player1.split('@')[0], 
                        amount: 500 
                    }) + '\n';
                } else {
                    global.db.data.users[session.player1].limit = Math.max(0, (global.db.data.users[session.player1].limit || 0) - 250);
                    messaggio += global.t('coinPlayerLose', userId, groupId, { 
                        player: session.player1.split('@')[0], 
                        amount: 250 
                    }) + '\n';
                }

                if (vincitore2) {
                    global.db.data.users[session.player2].limit = (global.db.data.users[session.player2].limit || 0) + 500;
                    messaggio += global.t('coinPlayerWin', userId, groupId, { 
                        player: session.player2.split('@')[0], 
                        amount: 500 
                    }) + '\n';
                } else {
                    global.db.data.users[session.player2].limit = Math.max(0, (global.db.data.users[session.player2].limit || 0) - 250);
                    messaggio += global.t('coinPlayerLose', userId, groupId, { 
                        player: session.player2.split('@')[0], 
                        amount: 250 
                    }) + '\n';
                }

                conn.sendMessage(m.chat, {
                    text: messaggio + global.t('coinPlayAgain', userId, groupId, { 
                        prefix: usedPrefix, 
                        command 
                    }),
                    mentions: [session.player1, session.player2],
                    footer: global.t('coinFooter', userId, groupId),
                    headerType: 1
                }, { quoted: m });

                cooldowns[session.player1] = Date.now();
                cooldowns[session.player2] = Date.now();
                delete gameSessions[m.chat];
                return;
            }

            if (session.status === 'waiting' && m.sender === session.player1) {
                return m.reply(global.t('coinAlreadyChose', userId, groupId, { choice: session.choice1 }));
            }

            return conn.sendMessage(m.chat, {
                text: global.t('coinInvalidGame', userId, groupId, { 
                    prefix: usedPrefix, 
                    command 
                }),
                footer: global.t('coinFooter', userId, groupId),
                headerType: 1
            }, { quoted: m });
        }
    }

    return conn.sendMessage(m.chat, {
        text: global.t('coinInvalidCommand', userId, groupId, { 
            prefix: usedPrefix, 
            command 
        }),
        footer: global.t('coinFooter', userId, groupId),
        headerType: 1
    }, { quoted: m });
};

function secondiAHMS(secondi) {
    return `${secondi % 60} secondi`;
}

handler.help = ['moneta'];
handler.tags = ['game'];
handler.command = /^(cf|flip|moneta|coin|headsortails)$/i;
handler.register = true;

export default handler;