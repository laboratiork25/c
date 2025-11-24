const cooldowns = {};
const streaks = {};
const lastClaimDates = {};

const globalClaimStats = {
    lastClaim: null,
    lastClaimUser: null,
    totalClaimsToday: 0,
    dailyStats: {},
    rewardMultiplier: 1.0,
    daysSinceLastClaim: 0
};

let handler = async (m) => {
    const user = global.db.data.users[m.sender];
    const now = Date.now();
    const nowDate = new Date(now);
    const todayStr = nowDate.toISOString().split('T')[0];

    const cooldown = 24 * 60 * 60 * 1000; // 24 ore
    const tolleranza = 6 * 60 * 60 * 1000; // 6 ore extra
    const finestraMax = cooldown + tolleranza; // 30 ore totali

    const lastClaim = cooldowns[m.sender] || 0;
    const diff = now - lastClaim;

    if (diff < cooldown) {
        const tempoRimanente = secondiAdHMS(Math.ceil((cooldown - diff) / 1000));
        return conn.reply(chat.m, `🕜 Aspetta *${tempoRimanente}* per la ricompensa giornaliera`, m, rcanal);
    }


    //ha dei bug nel salto degli streak, anchesse sei in tempo, quando recalmi i soldi ti dice che hai perso la
    //streak, anche se sono passate appena 24 ore, non salira mai la streak


    if (diff > finestraMax) {
        streaks[m.sender] = 1;
        m.reply('💤 Hai perso lo streak! Sei passato oltre le 30 ore senza reclamare.');
    } else {
        streaks[m.sender] = (streaks[m.sender] || 0) + 1;
    }

    // Bonus calcolato
    const baseReward = 100;
    const streakBonus = Math.min(streaks[m.sender] * 3, 40);
    const totalReward = Math.floor((baseReward + streakBonus) * globalClaimStats.rewardMultiplier);

    let claimMsg = `🎉 Daily Reward - Giorno ${streaks[m.sender]} 🎉\n`;
    claimMsg += `Hai ricevuto ${totalReward} 🪙 Unity Coins!\n`;
    if (streakBonus > 0) claimMsg += `(Bonus streak: +${streakBonus})\n`;
    if (globalClaimStats.rewardMultiplier > 1.0) {
        claimMsg += `(Bonus giornaliero: x${globalClaimStats.rewardMultiplier.toFixed(1)})\n`;
    }

    user.limit += totalReward;
    cooldowns[m.sender] = now;
    lastClaimDates[m.sender] = todayStr;

    globalClaimStats.lastClaim = new Date().toISOString();
    globalClaimStats.lastClaimUser = m.sender;
    globalClaimStats.totalClaimsToday++;
    if (!globalClaimStats.dailyStats[todayStr]) {
        globalClaimStats.dailyStats[todayStr] = { claims: 0, users: [] };
    }
    globalClaimStats.dailyStats[todayStr].claims++;
    if (!globalClaimStats.dailyStats[todayStr].users.includes(m.sender)) {
        globalClaimStats.dailyStats[todayStr].users.push(m.sender);
    }

    return m.reply(claimMsg);
};

handler.help = ['daily', 'claim']
handler.command = ['daily', 'claim'];
handler.tag = ['rp']
export default handler;

function secondiAdHMS(seconds) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
}
