import '../lib/language.js';
import fs from 'fs';

const handler = async (m, { conn, usedPrefix, command, args }) => {
    const nomeDelBot = global.db.data.nomedelbot || global.t('missioni_default_bot_name', m.sender);
    const image = fs.existsSync('./chatunity.png') ? fs.readFileSync('./chatunity.png') : null;

    if (!global.db.data) global.db.data = {};
    if (!global.db.data.users) global.db.data.users = {};
    
    const who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;
    
    let user = global.db.data.users[who] || {
        money: 0,
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

    if (!user.missions) {
        user.missions = {
            daily: { completed: 0, lastReset: Date.now(), current: [] },
            weekly: { completed: 0, lastReset: Date.now(), current: [] }
        };
    }

    const now = Date.now();
    const dailyResetNeeded = !user.missions.daily.current.length || 
                           now - user.missions.daily.lastReset >= 86400000;
    const weeklyResetNeeded = !user.missions.weekly.current.length || 
                            now - user.missions.weekly.lastReset >= 604800000;

    if (dailyResetNeeded) {
        user.missions.daily = {
            completed: 0,
            lastReset: now,
            current: generateDailyMissions()
        };
    }

    if (weeklyResetNeeded) {
        user.missions.weekly = {
            completed: 0,
            lastReset: now,
            current: generateWeeklyMissions()
        };
    }

    global.db.data.users[who] = user;

    if (!args[0]) {
        return showMainMenu(m, conn, usedPrefix, nomeDelBot, image, who);
    }

    switch (args[0].toLowerCase()) {
        case 'daily':
        case 'giornaliere':
            return showDailyMissions(m, conn, user, nomeDelBot, image, usedPrefix, who);
        case 'weekly':
        case 'settimanali':
            return showWeeklyMissions(m, conn, user, nomeDelBot, image, usedPrefix, who);
        case 'claim':
        case 'riscuoti':
            return claimRewards(m, conn, user, nomeDelBot, image, usedPrefix, who);
        default:
            return showMainMenu(m, conn, usedPrefix, nomeDelBot, image, who);
    }
};

async function showMainMenu(m, conn, usedPrefix, nomeDelBot, image, who) {
    const user = global.db.data.users[who];
    const dailyCompleted = user.missions.daily.current.filter(m => m.completed).length;
    const weeklyCompleted = user.missions.weekly.current.filter(m => m.completed).length;

    const buttons = [
        { buttonId: `${usedPrefix}missioni daily`, buttonText: { displayText: global.t('missioni_button_daily', who) }, type: 1 },
        { buttonId: `${usedPrefix}missioni weekly`, buttonText: { displayText: global.t('missioni_button_weekly', who) }, type: 1 },
        { buttonId: `${usedPrefix}missioni claim`, buttonText: { displayText: global.t('missioni_button_claim', who) }, type: 1 }
    ];

    return conn.sendMessage(m.chat, {
        text: global.t('missioni_main_menu', who, {
            botName: nomeDelBot.toUpperCase(),
            user: `@${who.split('@')[0]}`,
            balance: user.limit || 0,
            bank: user.bank || 0,
            dailyCompleted: dailyCompleted,
            dailyTotal: user.missions.daily.current.length,
            weeklyCompleted: weeklyCompleted,
            weeklyTotal: user.missions.weekly.current.length
        }),
        footer: global.t('missioni_main_footer', who),
        buttons: buttons,
        mentions: [who],
        headerType: 1,
        jpegThumbnail: image
    }, { quoted: m });
}

async function showDailyMissions(m, conn, user, nomeDelBot, image, usedPrefix, who) {
    const resetTime = 86400000 - (Date.now() - user.missions.daily.lastReset);
    
    let missionText = '';
    user.missions.daily.current.forEach((mission, i) => {
        const progress = getProgress(user, mission.type);
        const isReady = progress >= mission.target && !mission.completed;
        missionText += global.t('missioni_mission_entry', who, {
            index: i+1,
            title: mission.title,
            progress: progress,
            target: mission.target,
            reward: mission.reward,
            status: mission.completed ? global.t('missioni_status_claimed', who) : 
                   isReady ? global.t('missioni_status_ready', who) : 
                   global.t('missioni_status_in_progress', who)
        }) + '\n\n';
    });

    const buttons = [
        { buttonId: `${usedPrefix}missioni claim`, buttonText: { displayText: global.t('missioni_button_claim', who) }, type: 1 },
        { buttonId: `${usedPrefix}missioni weekly`, buttonText: { displayText: global.t('missioni_button_weekly', who) }, type: 1 },
        { buttonId: `${usedPrefix}missioni`, buttonText: { displayText: global.t('missioni_button_back', who) }, type: 1 }
    ];

    return conn.sendMessage(m.chat, {
        text: global.t('missioni_daily_header', who, {
            user: `@${who.split('@')[0]}`,
            resetTime: formatTime(resetTime),
            missions: missionText
        }),
        footer: global.t('missioni_daily_footer', who, { prefix: usedPrefix }),
        buttons: buttons,
        mentions: [who],
        headerType: 1,
        jpegThumbnail: image
    }, { quoted: m });
}

async function showWeeklyMissions(m, conn, user, nomeDelBot, image, usedPrefix, who) {
    const resetTime = 604800000 - (Date.now() - user.missions.weekly.lastReset);
    
    let missionText = '';
    user.missions.weekly.current.forEach((mission, i) => {
        const progress = getProgress(user, mission.type);
        const isReady = progress >= mission.target && !mission.completed;
        missionText += global.t('missioni_mission_entry', who, {
            index: i+1,
            title: mission.title,
            progress: progress,
            target: mission.target,
            reward: mission.reward,
            status: mission.completed ? global.t('missioni_status_claimed', who) : 
                   isReady ? global.t('missioni_status_ready', who) : 
                   global.t('missioni_status_in_progress', who)
        }) + '\n\n';
    });

    const buttons = [
        { buttonId: `${usedPrefix}missioni claim`, buttonText: { displayText: global.t('missioni_button_claim', who) }, type: 1 },
        { buttonId: `${usedPrefix}missioni daily`, buttonText: { displayText: global.t('missioni_button_daily', who) }, type: 1 },
        { buttonId: `${usedPrefix}missioni`, buttonText: { displayText: global.t('missioni_button_back', who) }, type: 1 }
    ];

    return conn.sendMessage(m.chat, {
        text: global.t('missioni_weekly_header', who, {
            user: `@${who.split('@')[0]}`,
            resetTime: formatTime(resetTime),
            missions: missionText
        }),
        footer: global.t('missioni_weekly_footer', who),
        buttons: buttons,
        mentions: [who],
        headerType: 1,
        jpegThumbnail: image
    }, { quoted: m });
}

function generateDailyMissions() {
    return [
        { 
            title: global.t('missioni_daily_1_title'), 
            type: "messaggi", 
            target: 50, 
            reward: 500,
            completed: false
        },
        { 
            title: global.t('missioni_daily_2_title'), 
            type: "command", 
            target: 10, 
            reward: 300,
            completed: false
        },
        { 
            title: global.t('missioni_daily_3_title'), 
            type: "no_warn", 
            target: 1, 
            reward: 700,
            completed: false
        }
    ];
}

function generateWeeklyMissions() {
    return [
        { 
            title: global.t('missioni_weekly_1_title'), 
            type: "messaggi", 
            target: 300, 
            reward: 2500,
            completed: false
        },
        { 
            title: global.t('missioni_weekly_2_title'), 
            type: "command", 
            target: 50, 
            reward: 1500,
            completed: false
        },
        { 
            title: global.t('missioni_weekly_3_title'), 
            type: "no_warn_week", 
            target: 1, 
            reward: 3500,
            completed: false
        },
        { 
            title: global.t('missioni_weekly_4_title'), 
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
            return user.warn > 0 ? 0 : 1;
        case 'no_warn_week':
            const weekAgo = Date.now() - 604800000;
            return (user.warn > 0 || (user.lastWarn && user.lastWarn > weekAgo)) ? 0 : 1;
        case 'total_messaggi':
            return user.totalMessaggi || user.messaggi || 0;
        default:
            return 0;
    }
}

async function claimRewards(m, conn, user, nomeDelBot, image, usedPrefix, who) {
    let total = 0;
    let claimed = 0;
    let details = [];

    for (const mission of user.missions.daily.current) {
        const progress = getProgress(user, mission.type);
        if (progress >= mission.target && !mission.completed) {
            total += mission.reward;
            claimed++;
            mission.completed = true;
            user.missions.daily.completed++;
            details.push(global.t('missioni_claim_detail', who, {
                title: mission.title,
                reward: mission.reward
            }));
        }
    }

    for (const mission of user.missions.weekly.current) {
        const progress = getProgress(user, mission.type);
        if (progress >= mission.target && !mission.completed) {
            total += mission.reward;
            claimed++;
            mission.completed = true;
            user.missions.weekly.completed++;
            details.push(global.t('missioni_claim_detail', who, {
                title: mission.title,
                reward: mission.reward
            }));
        }
    }

    if (claimed === 0) {
        return conn.reply(m.chat, global.t('missioni_no_claims', who), m, { mentions: [who] });
    }

    user.limit = (user.limit || 0) + total;
    global.db.data.users[who] = user;

    const buttons = [
        { buttonId: `${usedPrefix}portafoglio`, buttonText: { displayText: global.t('missioni_button_wallet', who) }, type: 1 },
        { buttonId: `${usedPrefix}missioni`, buttonText: { displayText: global.t('missioni_button_missions', who) }, type: 1 }
    ];

    await conn.sendMessage(m.chat, {
        text: global.t('missioni_claim_success', who, {
            user: `@${who.split('@')[0]}`,
            total: total,
            details: details.join('\n'),
            balance: user.limit,
            bank: user.bank
        }),
        footer: global.t('missioni_claim_footer', who),
        buttons: buttons,
        mentions: [who],
        headerType: 1,
        jpegThumbnail: image
    }, { quoted: m });

    try {
        fs.writeFileSync('./db_users_backup.json', JSON.stringify(global.db.data.users, null, 2));
    } catch (e) {
        console.error(global.t('missioni_backup_error', who), e);
    }
}

function formatTime(ms) {
    if (ms <= 0) return '00:00:00';
    
    const seconds = Math.floor(ms / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

handler.help = ['missioni'];
handler.tags = ['rpg'];
handler.command = /^(missioni|missions|daily|weekly)$/i;
handler.register = true;

export default handler;