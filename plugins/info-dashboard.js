import '../lib/language.js';

let handler = async (m, { conn }) => {
    const userId = m.sender;
    const groupId = m.chat;
    
    let stats = Object.entries(db.data.stats).map(([key, val]) => {
        let name = Array.isArray(plugins[key]?.help) ? plugins[key]?.help?.join(' , ') : plugins[key]?.help || key;
        
        if (/exec/.test(name)) return;
        return { name, ...val };
    });
     
    stats = stats.sort((a, b) => b.total - a.total);
    
    let txt = stats.slice(0, 10).map(({ name, total, last }) => {
        return `┏━━━━━━━━━━━━━┓
┣${global.t('dashboardCommand', userId, groupId)}: ${name}
┣${global.t('dashboardUses', userId, groupId)}: ${total}
┣${global.t('dashboardLastUse', userId, groupId)}: ${getTime(last, userId, groupId)}
┗━━━━━━━━━━━━━┛`;
    }).join('\n\n');
    
    await conn.reply(m.chat, global.t('dashboardStats', userId, groupId, { stats: txt }), m);
};

handler.help = ['dashboard'];
handler.tags = ['info'];
handler.command = /^dashboard$/i;

export default handler;

function parseMs(ms) {
    if (typeof ms !== 'number') throw 'Parametro non valido';
    return {
        giorni: Math.floor(ms / 86400000),
        ore: Math.floor(ms / 3600000) % 24,
        minuti: Math.floor(ms / 60000) % 60,
        secondi: Math.floor(ms / 1000) % 60
    };
}

function getTime(ms, userId, groupId) {
    if (!ms) return global.t('dashboardNeverUsed', userId, groupId);
    let now = parseMs(+new Date() - ms);
    if (now.giorni) return global.t('dashboardDaysAgo', userId, groupId, { days: now.giorni });
    if (now.ore) return global.t('dashboardHoursAgo', userId, groupId, { hours: now.ore });
    if (now.minuti) return global.t('dashboardMinutesAgo', userId, groupId, { minutes: now.minuti });
    return global.t('dashboardSecondsAgo', userId, groupId);
}
