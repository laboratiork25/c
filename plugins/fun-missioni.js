import '../lib/language.js';
import fs from 'fs';

const handler = async (m, { conn, usedPrefix, command, args }) => {
    const userId = m.sender;
    const groupId = m.chat;
    const nomeDelBot = global.db.data.nomedelbot || 'ChatUnity Bot';
    const image = fs.existsSync('./chatunity.png') ? fs.readFileSync('./chatunity.png') : null;

    // Inizializzazione robusta del database
    if (!global.db.data) global.db.data = {};
    if (!global.db.data.users) global.db.data.users = {};
    
    const who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;
    
    // Struttura dati utente completa
    let user = global.db.data.users[who] || {
        money: 0,
        limit: 0,
        bank: 0,
        warn: 0,
        messaggi: 0,
        command: 0,
        totalMessaggi: 0,
        lastWarn: 0,
        lastCommand: 0,
        missions: {
            daily: { completed: 0, lastReset: Date.now(), current: [] },
            weekly: { completed: 0, lastReset: Date.now(), current: [] }
        }
    };

    // Inizializzazione missioni se mancante
    if (!user.missions) {
        user.missions = {
            daily: { completed: 0, lastReset: Date.now(), current: [] },
            weekly: { completed: 0, lastReset: Date.now(), current: [] }
        };
    }

    // Reset contatori giornalieri/settimanali
    const now = Date.now();
    const dailyResetNeeded = !user.missions.daily.current.length || 
                           now - user.missions.daily.lastReset >= 86400000;
    const weeklyResetNeeded = !user.missions.weekly.current.length || 
                            now - user.missions.weekly.lastReset >= 604800000;

    if (dailyResetNeeded) {
        user.missions.daily = {
            completed: 0,
            lastReset: now,
            current: generateDailyMissions(userId, groupId)
        };
        // Reset contatori giornalieri
        user.messaggi = 0;
        user.command = 0;
    }

    if (weeklyResetNeeded) {
        user.missions.weekly = {
            completed: 0,
            lastReset: now,
            current: generateWeeklyMissions(userId, groupId)
        };
    }

    // Salva i dati aggiornati
    global.db.data.users[who] = user;

    // Gestione comandi
    if (!args[0]) {
        return showMainMenu(m, conn, usedPrefix, nomeDelBot, image, who, userId, groupId);
    }

    switch (args[0].toLowerCase()) {
        case 'daily':
        case 'giornaliere':
            return showDailyMissions(m, conn, user, nomeDelBot, image, usedPrefix, who, userId, groupId);
        case 'weekly':
        case 'settimanali':
            return showWeeklyMissions(m, conn, user, nomeDelBot, image, usedPrefix, who, userId, groupId);
        case 'claim':
        case 'riscuoti':
            return claimRewards(m, conn, user, nomeDelBot, image, usedPrefix, who, userId, groupId);
        default:
            return showMainMenu(m, conn, usedPrefix, nomeDelBot, image, who, userId, groupId);
    }
};

/* ========== FUNZIONI DI VISUALIZZAZIONE ========== */
async function showMainMenu(m, conn, usedPrefix, nomeDelBot, image, who, userId, groupId) {
    const user = global.db.data.users[who];
    const dailyCompleted = user.missions.daily.current.filter(m => m.completed).length;
    const weeklyCompleted = user.missions.weekly.current.filter(m => m.completed).length;

    const title = global.t('missionMainTitle', userId, groupId, { bot: nomeDelBot });
    const stats = global.t('missionMainStats', userId, groupId, {
        user: who.split('@')[0],
        money: user.limit || user.money || 0,
        bank: user.bank || 0,
        dailyDone: dailyCompleted,
        dailyTotal: user.missions.daily.current.length,
        weeklyDone: weeklyCompleted,
        weeklyTotal: user.missions.weekly.current.length
    });

    const buttons = [
        { buttonId: `${usedPrefix}missioni daily`, buttonText: { displayText: global.t('missionButtonDaily', userId, groupId) }, type: 1 },
        { buttonId: `${usedPrefix}missioni weekly`, buttonText: { displayText: global.t('missionButtonWeekly', userId, groupId) }, type: 1 },
        { buttonId: `${usedPrefix}missioni claim`, buttonText: { displayText: global.t('missionButtonClaim', userId, groupId) }, type: 1 }
    ];

    return conn.sendMessage(m.chat, {
        text: `${title}\n\n${stats}`,
        footer: global.t('missionFooterMain', userId, groupId),
        buttons: buttons,
        mentions: [who],
        headerType: 1,
        jpegThumbnail: image
    }, { quoted: m });
}

async function showDailyMissions(m, conn, user, nomeDelBot, image, usedPrefix, who, userId, groupId) {
    const title = global.t('missionDailyTitle', userId, groupId, { user: who.split('@')[0] });
    const resetTime = 86400000 - (Date.now() - user.missions.daily.lastReset);
    const resetText = global.t('missionDailyReset', userId, groupId, { time: formatTime(resetTime) });

    let text = `${title}\n\n${resetText}\n\n`;

    user.missions.daily.current.forEach((mission, i) => {
        const progress = getProgress(user, mission.type);
        const isReady = progress >= mission.target && !mission.completed;
        const status = mission.completed ? 
            global.t('missionStatusCompleted', userId, groupId) : 
            isReady ? global.t('missionStatusReady', userId, groupId) : 
            global.t('missionStatusInProgress', userId, groupId);

        text += global.t('missionEntry', userId, groupId, {
            num: i + 1,
            title: mission.title,
            progress,
            target: mission.target,
            reward: mission.reward,
            status
        }) + '\n\n';
    });

    const buttons = [
        { buttonId: `${usedPrefix}missioni claim`, buttonText: { displayText: global.t('missionButtonClaim', userId, groupId) }, type: 1 },
        { buttonId: `${usedPrefix}missioni weekly`, buttonText: { displayText: global.t('missionButtonWeekly', userId, groupId) }, type: 1 },
        { buttonId: `${usedPrefix}missioni`, buttonText: { displayText: global.t('missionButtonBack', userId, groupId) }, type: 1 }
    ];

    return conn.sendMessage(m.chat, {
        text: text,
        footer: global.t('missionFooterDaily', userId, groupId, { prefix: usedPrefix }),
        buttons: buttons,
        mentions: [who],
        headerType: 1,
        jpegThumbnail: image
    }, { quoted: m });
}

async function showWeeklyMissions(m, conn, user, nomeDelBot, image, usedPrefix, who, userId, groupId) {
    const title = global.t('missionWeeklyTitle', userId, groupId, { user: who.split('@')[0] });
    const resetTime = 604800000 - (Date.now() - user.missions.weekly.lastReset);
    const resetText = global.t('missionWeeklyReset', userId, groupId, { time: formatTime(resetTime) });

    let text = `${title}\n\n${resetText}\n\n`;

    user.missions.weekly.current.forEach((mission, i) => {
        const progress = getProgress(user, mission.type);
        const isReady = progress >= mission.target && !mission.completed;
        const status = mission.completed ? 
            global.t('missionStatusCompleted', userId, groupId) : 
            isReady ? global.t('missionStatusReady', userId, groupId) : 
            global.t('missionStatusInProgress', userId, groupId);

        text += global.t('missionEntry', userId, groupId, {
            num: i + 1,
            title: mission.title,
            progress,
            target: mission.target,
            reward: mission.reward,
            status
        }) + '\n\n';
    });

    const buttons = [
        { buttonId: `${usedPrefix}missioni claim`, buttonText: { displayText: global.t('missionButtonClaim', userId, groupId) }, type: 1 },
        { buttonId: `${usedPrefix}missioni daily`, buttonText: { displayText: global.t('missionButtonDaily', userId, groupId) }, type: 1 },
        { buttonId: `${usedPrefix}missioni`, buttonText: { displayText: global.t('missionButtonBack', userId, groupId) }, type: 1 }
    ];

    return conn.sendMessage(m.chat, {
        text: text,
        footer: global.t('missionFooterWeekly', userId, groupId),
        buttons: buttons,
        mentions: [who],
        headerType: 1,
        jpegThumbnail: image
    }, { quoted: m });
}

/* ========== FUNZIONI DI GESTIONE ========== */
function generateDailyMissions(userId, groupId) {
    return [
        { 
            title: global.t('missionSendMessages', userId, groupId, { count: 50 }),
            type: "messaggi", 
            target: 50, 
            reward: 500,
            completed: false
        },
        { 
            title: global.t('missionExecuteCommands', userId, groupId, { count: 10 }),
            type: "command", 
            target: 10, 
            reward: 300,
            completed: false
        },
        { 
            title: global.t('missionNoWarn', userId, groupId),
            type: "no_warn", 
            target: 1, 
            reward: 700,
            completed: false
        }
    ];
}

function generateWeeklyMissions(userId, groupId) {
    return [
        { 
            title: global.t('missionSendMessages', userId, groupId, { count: 300 }),
            type: "messaggi", 
            target: 300, 
            reward: 2500,
            completed: false
        },
        { 
            title: global.t('missionExecuteCommands', userId, groupId, { count: 50 }),
            type: "command", 
            target: 50, 
            reward: 1500,
            completed: false
        },
        { 
            title: global.t('missionNoWarnWeek', userId, groupId),
            type: "no_warn_week", 
            target: 1, 
            reward: 3500,
            completed: false
        },
        { 
            title: global.t('missionTotalMessages', userId, groupId, { count: 1000 }),
            type: "total_messaggi", 
            target: 1000, 
            reward: 5000,
            completed: false
        }
    ];
}

function getProgress(user, type) {
    switch(type) {
        case 'messaggi':
            return user.messaggi || 0;
        case 'command':
            return user.command || 0;
        case 'no_warn':
            return (user.warn || 0) > 0 ? 0 : 1;
        case 'no_warn_week':
            const weekAgo = Date.now() - 604800000;
            return ((user.warn || 0) > 0 || (user.lastWarn && user.lastWarn > weekAgo)) ? 0 : 1;
        case 'total_messaggi':
            return user.totalMessaggi || user.messaggi || 0;
        default:
            return 0;
    }
}

async function claimRewards(m, conn, user, nomeDelBot, image, usedPrefix, who, userId, groupId) {
    let total = 0;
    let claimed = 0;
    let details = [];

    // Controlla missioni giornaliere
    for (const mission of user.missions.daily.current) {
        const progress = getProgress(user, mission.type);
        if (progress >= mission.target && !mission.completed) {
            total += mission.reward;
            claimed++;
            mission.completed = true;
            user.missions.daily.completed++;
            details.push(`✅ ${mission.title}: +${mission.reward} UC`);
        }
    }

    // Controlla missioni settimanali
    for (const mission of user.missions.weekly.current) {
        const progress = getProgress(user, mission.type);
        if (progress >= mission.target && !mission.completed) {
            total += mission.reward;
            claimed++;
            mission.completed = true;
            user.missions.weekly.completed++;
            details.push(`✅ ${mission.title}: +${mission.reward} UC`);
        }
    }

    if (claimed === 0) {
        return conn.reply(m.chat, global.t('missionNoRewards', userId, groupId, { 
            user: who.split('@')[0] 
        }), m, { mentions: [who] });
    }

    // Assegna le ricompense (usa limit come valuta principale)
    user.limit = (user.limit || 0) + total;
    if (!user.money) user.money = user.limit; // Sincronizza
    global.db.data.users[who] = user;

    const buttons = [
        { buttonId: `${usedPrefix}portafoglio`, buttonText: { displayText: global.t('missionButtonWallet', userId, groupId) }, type: 1 },
        { buttonId: `${usedPrefix}missioni`, buttonText: { displayText: global.t('missionButtonBack', userId, groupId) }, type: 1 }
    ];

    await conn.sendMessage(m.chat, {
        text: global.t('missionClaimSuccess', userId, groupId, {
            user: who.split('@')[0],
            total,
            details: details.join('\n'),
            money: user.limit || 0,
            bank: user.bank || 0
        }),
        footer: global.t('missionClaimFooter', userId, groupId),
        buttons: buttons,
        mentions: [who],
        headerType: 1,
        jpegThumbnail: image
    }, { quoted: m });

    // Backup opzionale su file
    try {
        fs.writeFileSync('./db_users_backup.json', JSON.stringify(global.db.data.users, null, 2));
    } catch (e) {
        console.error('Errore backup:', e);
    }
}

/* ========== FUNZIONI DI UTILITY ========== */
function formatTime(ms) {
    if (ms <= 0) return '00:00:00';
    
    const seconds = Math.floor(ms / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

handler.help = ['missioni', 'missions', 'daily', 'weekly'];
handler.tags = ['rpg'];
handler.command = /^(missioni|missions|daily|weekly)$/i;
handler.register = true;

export default handler;
