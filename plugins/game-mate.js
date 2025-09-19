import '../lib/language.js';

let activeGames = new Map(); // Utilizza una Map per gestire meglio i giochi attivi

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let userId = m.sender;
    let groupId = m.chat.endsWith('@g.us') ? m.chat : null;
    
    conn.math = conn.math ? conn.math : {};
  
    if (args.length < 1) {
        throw global.t('mathDifficultyLevels', userId, groupId, {
            levels: Object.keys(modes).map(v => `▢ ${v}`).join('\n'),
            example: `${usedPrefix + command} normale`
        }).trim();
    }

    let mode = args[0].toLowerCase();
    if (!(mode in modes)) {
        throw global.t('mathInvalidDifficulty', userId, groupId, {
            levels: Object.keys(modes).map(v => `▢ ${v}`).join('\n'),
            example: `${usedPrefix + command} normale`
        }).trim();
    }
  
    let id = m.chat;

    // Verifica se c'è già un gioco attivo in questa chat
    if (activeGames.has(id)) {
        let activeGame = activeGames.get(id);
        let remainingTime = ((activeGame.math.time - (Date.now() - activeGame.startTime)) / 1000);
        
        return conn.reply(m.chat, 
            global.t('mathActiveGame', userId, groupId, {
                question: activeGame.math.str,
                remainingTime: remainingTime.toFixed(1)
            }), 
            activeGame.message
        );
    }

    let math = genMath(mode);
    let startTime = Date.now();
    
    try {
        let message = await conn.reply(m.chat, 
            global.t('mathQuestion', userId, groupId, {
                question: math.str,
                time: (math.time / 1000).toFixed(0),
                bonus: math.bonus
            }), 
            m
        );

        // Salva il gioco attivo
        let gameData = {
            message: message,
            math: math,
            startTime: startTime,
            timeoutId: setTimeout(() => {
                if (activeGames.has(id)) {
                    conn.reply(m.chat, 
                        global.t('mathTimeUp', userId, groupId, {
                            answer: math.result
                        }), 
                        activeGames.get(id).message
                    );
                    activeGames.delete(id);
                }
            }, math.time)
        };
        
        activeGames.set(id, gameData);
        conn.math[id] = gameData;
        
        // Handler per verificare le risposte
        let answerHandler = async ({ messages }) => {
            try {
                let msg = messages[0];
                if (!msg?.message || !activeGames.has(id) || msg.key.remoteJid !== id) return;
                
                let text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
                
                if (text === math.result.toString()) {
                    let timeTaken = (Date.now() - startTime) / 1000;
                    let score = Math.max(1, Math.floor(math.bonus * (1 - timeTaken / (math.time / 1000))));
                    
                    await conn.reply(m.chat, 
                        global.t('mathCorrectAnswer', userId, groupId, {
                            timeTaken: timeTaken.toFixed(2),
                            score: score
                        }), 
                        msg
                    );
                    
                    // Pulizia
                    clearTimeout(activeGames.get(id).timeoutId);
                    activeGames.delete(id);
                    conn.ev.off('messages.upsert', answerHandler);
                    
                } else if (/^-?\d+(\.\d+)?$/.test(text)) {
                    await conn.reply(m.chat, global.t('mathWrongAnswer', userId, groupId), msg);
                }
            } catch (error) {
                console.error('Error in answer handler:', error);
            }
        };
        
        conn.ev.on('messages.upsert', answerHandler);
        
        // Rimuovi l'handler dopo un po' per evitare memory leaks
        setTimeout(() => {
            if (activeGames.has(id)) {
                conn.ev.off('messages.upsert', answerHandler);
            }
        }, math.time + 10000);
        
    } catch (error) {
        console.error('Error in math game:', error);
        if (activeGames.has(id)) {
            clearTimeout(activeGames.get(id).timeoutId);
            activeGames.delete(id);
        }
        throw global.t('mathError', userId, groupId);
    }
};

handler.help = ['mate <livello>'];
handler.tags = ['game'];
handler.command = ['mate', 'math', 'calcolo', 'calculate']; 

let modes = {
    noob: [-3, 3, -3, 3, '+-', 15000, 100],
    easy: [-10, 10, -10, 10, '*/+-', 20000, 400],
    medium: [-40, 40, -20, 20, '*/+-', 40000, 700],
    hard: [-100, 100, -70, 70, '*/+-', 30000, 800],
    extreme: [-999999, 999999, -999999, 999999, '*/', 99999, 4500]
};

let operators = {
    '+': '+',
    '-': '-',
    '*': '×',
    '/': '÷'
};

function genMath(mode) {
    let [a1, a2, b1, b2, ops, time, bonus] = modes[mode];
    let a, b, op, result;
    
    // Genera operazioni valide
    do {
        a = randomInt(a1, a2);
        b = randomInt(b1, b2);
        op = pickRandom([...ops]);
        
        // Evita divisioni per zero e risultati non interi per alcune difficoltà
        if (op === '/') {
            if (b === 0) b = 1;
            // Per difficoltà basse, assicura divisioni con risultato intero
            if (['noob', 'easy'].includes(mode)) {
                a = b * randomInt(Math.max(1, Math.floor(a1/b)), Math.floor(a2/b));
            }
        }
        
        result = calculate(a, b, op);
        
    } while (
        // Evita risultati troppo complessi per difficoltà basse
        (['noob', 'easy'].includes(mode) && !Number.isInteger(result)) ||
        // Evita numeri troppo grandi per la formattazione
        result.toString().length > 20
    );
    
    return {
        str: `${a} ${operators[op]} ${b}`,
        mode,
        time,
        bonus,
        result
    };
}

function calculate(a, b, op) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': 
            let result = a / b;
            return Math.round(result * 100) / 100; // Arrotonda a 2 decimali
        default: return 0;
    }
}

function randomInt(from, to) {
    if (from > to) [from, to] = [to, from];
    from = Math.ceil(from);
    to = Math.floor(to);
    return Math.floor(Math.random() * (to - from + 1)) + from;
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

handler.modes = modes;

export default handler;