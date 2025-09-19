import '../lib/language.js';
let handler = async (m, { conn, command, text }) => {
    if (!text) return conn.sendMessage(m.chat, { 
        text: global.t('personality_no_name', m.sender),
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: global.t('bot_name', m.sender)
            }
        }
    }, { quoted: m });

    let personalita = global.t('personality_template', m.sender, null, {
        name: text,
        moralitaBuona: pickRandom(global.percentuali),
        moralitaCattiva: pickRandom(global.percentuali),
        tipoPersona: pickRandom(global.tipiPersona),
        sempre: pickRandom(global.sempre),
        intelligenza: pickRandom(global.percentuali),
        pigrizia: pickRandom(global.percentuali),
        coraggio: pickRandom(global.percentuali),
        paura: pickRandom(global.percentuali),
        fama: pickRandom(global.percentuali),
        genere: pickRandom(global.generi)
    });

    await conn.sendMessage(m.chat, { 
        text: personalita,
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: global.t('bot_name', m.sender)
            }
        },
        mentions: conn.parseMention(personalita)
    }, { quoted: m });
};

handler.help = ['personalita *<nome>*', 'personalità *<nome>*'];
handler.tags = ['fun'];
handler.command = /^(personalit(a|à)|personality|character)$/i;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// Inizializza gli array con le traduzioni
global.percentuali = Array.from({ length: 24 }, (_, i) => 
    global.t(`percentage_${i + 1}`, null)
);

global.tipiPersona = Array.from({ length: 11 }, (_, i) => 
    global.t(`person_type_${i + 1}`, null)
);

global.sempre = Array.from({ length: 11 }, (_, i) => 
    global.t(`always_${i + 1}`, null)
);

global.generi = Array.from({ length: 25 }, (_, i) => 
    global.t(`gender_${i + 1}`, null)
);