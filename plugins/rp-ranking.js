//modifica i rank come preferisci


let handler = m => m;

handler.before = function (m) {
    let user = global.db.data.users[m.sender];
    let level = user.level;

    const roles = [
        { min: 0, max: 9, role: '*💀 RANDOM SU VIRIDI*' },

        { min: 10, max: 15, role: '*🍼 PAIACCIO DI VIRIDI*' },

        { min: 20, max: 29, role: '*😈 SPAMMERINO*' },

        { min: 30, max: 39, role: '*🧠 IQ POSITIVO*' },

        { min: 40, max: 49, role: '*🔥 ZOZZAPER*' },

        { min: 50, max: 59, role: '*👹 HATER DI EBOLINI*' },

        { min: 60, max: 61, role: '*🎩 DOXER NATO* ' },

        { min: 70, max: 75, role: '*👑 MEME MAKER* ' },

        { min: 76, max: 79, role: '*😼 PRO-SCIUTTO*' },

        { min: 80, max: 87, role: '*👑 PHISHETTO*' },


        { min: 88, max: 95, role: '*⚡ DEMONE DI PHISHY* ' },

        { min: 96, max: 97, role: '*💎 ASCESO II* ✨' },
        { min: 98, max: 99, role: '*💎 ASCESO I* ✨' },

        { min: 100, max: 101, role: '*👑 CAPO BELLO* 🏁' },
        { min: 102, max: Infinity, role: '*👑 ∞ CAPO BELLO* 💎🏁' }
    ];

    // Assegna il ruolo
    user.role = roles.find(r => level >= r.min && level <= r.max)?.role || '*👑 ∞ CAPO BELLO* 💎🏁';

    return true;
};

export default handler;