import '../lib/language.js';

const playAgainButtons = (userId, groupId) => [{
    name: 'quick_reply',
    buttonParamsJson: JSON.stringify({ 
        display_text: global.t('flagPlayAgain', userId, groupId), 
        id: `.bandiera` 
    })
}];

let handler = async (m, { conn, args, participants, isAdmin, isBotAdmin, usedPrefix, command }) => {
    const userId = m.sender;
    const groupId = m.chat;
    
    const frases = [
        global.t('flagPhrase1', userId, groupId),
        global.t('flagPhrase2', userId, groupId),
        global.t('flagPhrase3', userId, groupId),
        global.t('flagPhrase4', userId, groupId),
        global.t('flagPhrase5', userId, groupId),
        global.t('flagPhrase6', userId, groupId),
        global.t('flagPhrase7', userId, groupId)
    ];

    if (m.text?.toLowerCase() === '.skipbandiera') {
        if (!m.isGroup) return m.reply(global.t('flagGroupOnly', userId, groupId));
        if (!global.bandieraGame?.[m.chat]) return m.reply(global.t('flagNoGame', userId, groupId));

        if (!isAdmin && !m.fromMe) {
            return m.reply(global.t('flagAdminOnly', userId, groupId));
        }

        clearTimeout(global.bandieraGame[m.chat].timeout);
        
        let skipText = global.t('flagSkipped', userId, groupId, { 
            answer: global.bandieraGame[m.chat].rispostaOriginale 
        });

        await conn.sendMessage(m.chat, {
            text: skipText,
            footer: 'ChatUnity Bot',
            interactiveButtons: playAgainButtons(userId, groupId)
        }, { quoted: m });
        delete global.bandieraGame[m.chat];
        return;
    }
    
    if (global.bandieraGame?.[m.chat]) {
        return m.reply(global.t('flagGameActive', userId, groupId));
    }

    const cooldownKey = `bandiera_${m.chat}`;
    const lastGame = global.cooldowns?.[cooldownKey] || 0;
    const now = Date.now();
    const cooldownTime = 5000;

    if (now - lastGame < cooldownTime) {
        const remainingTime = Math.ceil((cooldownTime - (now - lastGame)) / 1000);
        return m.reply(global.t('flagCooldown', userId, groupId, { time: remainingTime }));
    }

    global.cooldowns = global.cooldowns || {};
    global.cooldowns[cooldownKey] = now;

    let bandiere = [
        { url: 'https://flagcdn.com/w320/it.png', nome: 'Italia' },
        { url: 'https://flagcdn.com/w320/fr.png', nome: 'Francia' },
        { url: 'https://flagcdn.com/w320/de.png', nome: 'Germania' },
        { url: 'https://flagcdn.com/w320/gb.png', nome: 'Regno Unito' },
        { url: 'https://flagcdn.com/w320/es.png', nome: 'Spagna' },
        { url: 'https://flagcdn.com/w320/se.png', nome: 'Svezia' },
        { url: 'https://flagcdn.com/w320/no.png', nome: 'Norvegia' },
        { url: 'https://flagcdn.com/w320/fi.png', nome: 'Finlandia' },
        { url: 'https://flagcdn.com/w320/dk.png', nome: 'Danimarca' },
        { url: 'https://flagcdn.com/w320/pl.png', nome: 'Polonia' },
        { url: 'https://flagcdn.com/w320/pt.png', nome: 'Portogallo' },
        { url: 'https://flagcdn.com/w320/gr.png', nome: 'Grecia' },
        { url: 'https://flagcdn.com/w320/ch.png', nome: 'Svizzera' },
        { url: 'https://flagcdn.com/w320/at.png', nome: 'Austria' },
        { url: 'https://flagcdn.com/w320/be.png', nome: 'Belgio' },
        { url: 'https://flagcdn.com/w320/nl.png', nome: 'Paesi Bassi' },
        { url: 'https://flagcdn.com/w320/ua.png', nome: 'Ucraina' },
        { url: 'https://flagcdn.com/w320/ro.png', nome: 'Romania' },
        { url: 'https://flagcdn.com/w320/hu.png', nome: 'Ungheria' },
        { url: 'https://flagcdn.com/w320/cz.png', nome: 'Repubblica Ceca' },
        { url: 'https://flagcdn.com/w320/ie.png', nome: 'Irlanda' },
        { url: 'https://flagcdn.com/w320/bg.png', nome: 'Bulgaria' },
        { url: 'https://flagcdn.com/w320/us.png', nome: 'Stati Uniti' },
        { url: 'https://flagcdn.com/w320/ca.png', nome: 'Canada' },
        { url: 'https://flagcdn.com/w320/mx.png', nome: 'Messico' },
        { url: 'https://flagcdn.com/w320/br.png', nome: 'Brasile' },
        { url: 'https://flagcdn.com/w320/ar.png', nome: 'Argentina' },
        { url: 'https://flagcdn.com/w320/cl.png', nome: 'Cile' },
        { url: 'https://flagcdn.com/w320/au.png', nome: 'Australia' },
        { url: 'https://flagcdn.com/w320/nz.png', nome: 'Nuova Zelanda' },
        { url: 'https://flagcdn.com/w320/cn.png', nome: 'Cina' },
        { url: 'https://flagcdn.com/w320/jp.png', nome: 'Giappone' },
        { url: 'https://flagcdn.com/w320/in.png', nome: 'India' },
        { url: 'https://flagcdn.com/w320/kr.png', nome: 'Corea del Sud' },
        { url: 'https://flagcdn.com/w320/tr.png', nome: 'Turchia' },
        { url: 'https://flagcdn.com/w320/eg.png', nome: 'Egitto' },
        { url: 'https://flagcdn.com/w320/za.png', nome: 'Sudafrica' }
    ];
    
    let scelta = bandiere[Math.floor(Math.random() * bandiere.length)];
    let frase = frases[Math.floor(Math.random() * frases.length)];

    try {
        let startCaption = global.t('flagStart', userId, groupId, { phrase: frase });

        let msg = await conn.sendMessage(m.chat, {
            image: { url: scelta.url },
            caption: startCaption,
            footer: 'ChatUnity Bot'
        }, { quoted: m });
        
        global.bandieraGame = global.bandieraGame || {};
        global.bandieraGame[m.chat] = {
            id: msg.key.id,
            risposta: scelta.nome.toLowerCase(),
            rispostaOriginale: scelta.nome,
            tentativi: {},
            suggerito: false,
            startTime: Date.now(),
            timeout: setTimeout(async () => {
                if (global.bandieraGame?.[m.chat]) {
                    let timeoutText = global.t('flagTimeout', userId, groupId, { answer: scelta.nome });
                    
                    await conn.sendMessage(m.chat, {
                        text: timeoutText,
                        footer: 'ChatUnity Bot',
                        interactiveButtons: playAgainButtons(userId, groupId)
                    }, { quoted: msg });
                    delete global.bandieraGame[m.chat];
                }
            }, 30000)
        };
    } catch (error) {
        console.error('Errore nel gioco bandiere:', error);
        m.reply(global.t('flagError', userId, groupId));
    }
};

function normalizeString(str) {
    if (!str) return '';
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, '')
        .trim();
}

function calculateSimilarity(str1, str2) {
    const words1 = str1.split(' ').filter(word => word.length > 1);
    const words2 = str2.split(' ').filter(word => word.length > 1);

    if (words1.length === 0 || words2.length === 0) return 0;

    const matches = words1.filter(word =>
        words2.some(w2 => w2.includes(word) || word.includes(w2))
    );

    return matches.length / Math.max(words1.length, words2.length);
}

function isAnswerCorrect(userAnswer, correctAnswer) {
    if (userAnswer.length < 2) return false;

    const similarityScore = calculateSimilarity(userAnswer, correctAnswer);

    return (
        userAnswer === correctAnswer ||
        (correctAnswer.includes(userAnswer) && userAnswer.length > correctAnswer.length * 0.5) ||
        (userAnswer.includes(correctAnswer) && userAnswer.length < correctAnswer.length * 1.5) ||
        similarityScore >= 0.8
    );
}

handler.before = async (m, { conn, usedPrefix, command }) => {
    const chat = m.chat;
    const userId = m.sender;
    const groupId = m.chat;
    const game = global.bandieraGame?.[chat];
    
    if (m.message && m.message.interactiveResponseMessage) {
        const response = m.message.interactiveResponseMessage;
        
        if (response.nativeFlowResponseMessage?.paramsJson) {
            try {
                const params = JSON.parse(response.nativeFlowResponseMessage.paramsJson);
                if (params.id === '.bandiera') {
                    if (!global.bandieraGame?.[chat]) {
                        const fakeMessage = {
                            ...m,
                            text: usedPrefix + 'bandiera',
                            body: usedPrefix + 'bandiera'
                        };
                        try {
                            await handler(fakeMessage, { conn, usedPrefix, command: 'bandiera' });
                        } catch (error) {
                            console.error('Errore nel riavvio del gioco dai bottoni:', error);
                            conn.reply(chat, global.t('flagError', userId, groupId), m);
                        }
                    }
                }
            } catch (error) {
                console.error('Errore nel parsing dei parametri del bottone:', error);
            }
        }
        return;
    }
    
    if (!game || !m.quoted || m.quoted.id !== game.id || m.key.fromMe) return;

    const userAnswer = normalizeString(m.text || '');
    const correctAnswer = normalizeString(game.risposta);

    if (!userAnswer || userAnswer.length < 2) return;

    const similarityScore = calculateSimilarity(userAnswer, correctAnswer);

    if (isAnswerCorrect(userAnswer, correctAnswer)) {
        clearTimeout(game.timeout);

        const timeTaken = Math.round((Date.now() - game.startTime) / 1000);
        let reward = Math.floor(Math.random() * 31) + 20;
        let exp = 150;

        const timeBonus = timeTaken <= 10 ? 20 : timeTaken <= 20 ? 10 : 0;
        reward += timeBonus;

        if (!global.db.data.users[m.sender]) global.db.data.users[m.sender] = {};
        global.db.data.users[m.sender].limit = (global.db.data.users[m.sender].limit || 0) + reward;
        global.db.data.users[m.sender].exp = (global.db.data.users[m.sender].exp || 0) + exp;

        let congratsMessage = global.t('flagCorrect', userId, groupId, {
            answer: game.rispostaOriginale,
            time: timeTaken,
            reward,
            exp,
            bonus: timeBonus
        });
        
        await conn.sendMessage(chat, {
            text: congratsMessage,
            footer: 'ChatUnity Bot',
            interactiveButtons: playAgainButtons(userId, groupId)
        }, { quoted: m });
        delete global.bandieraGame[chat];
        
    } else if (similarityScore >= 0.6 && !game.suggerito) {
        game.suggerito = true;
        await conn.reply(chat, global.t('flagAlmostThere', userId, groupId), m);
        
    } else if (game.tentativi[m.sender] >= 3) {
        let failText = global.t('flagAttemptsExhausted', userId, groupId);
        
        await conn.sendMessage(chat, {
            text: failText,
            footer: 'ChatUnity Bot',
            interactiveButtons: playAgainButtons(userId, groupId)
        }, { quoted: m });
        delete global.bandieraGame[chat];
        
    } else {
        game.tentativi[m.sender] = (game.tentativi[m.sender] || 0) + 1;
        const tentativiRimasti = 3 - game.tentativi[m.sender];

        if (tentativiRimasti === 1) {
            const primaLettera = game.rispostaOriginale[0].toUpperCase();
            const numeroLettere = game.rispostaOriginale.length;
            await conn.reply(chat, global.t('flagWrongHint', userId, groupId, { 
                letter: primaLettera, 
                length: numeroLettere 
            }), m);
        } else if (tentativiRimasti === 2) {
            await conn.reply(chat, global.t('flagWrong2', userId, groupId, { remaining: tentativiRimasti }), m);
        } else {
            await conn.reply(chat, global.t('flagWrongLast', userId, groupId), m);
        }
    }
};

handler.command = /^(bandiera|flag|skipbandiera|bandera|banderaskip|bandeira|skipbandeira|flagge|flaggeüberspringen|跳过旗帜|旗帜|пропустить_флаг|флаг|تخطي_العلم|علم|झंडा|झंडास्किप|drapeau|passerdrapeau|bendera|lewatbendera|bayrak|bayrağı_geç)$/i;
handler.help = ['bandiera', 'flag', 'skipbandiera', 'bandera', 'banderaskip', 'bandeira', 'skipbandeira', 'flagge', 'flaggeüberspringen', '跳过旗帜', '旗帜', 'пропустить_флаг', 'флаг', 'تخطي_العلم', 'علم', 'झंडा', 'झंडास्किप', 'drapeau', 'passerdrapeau', 'bendera', 'lewatbendera', 'bayrak', 'bayrağı_geç'];

handler.tags = ['game'];
handler.group = true;
handler.register = true;

export default handler;
