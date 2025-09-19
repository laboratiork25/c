import '../lib/language.js';
let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { 
        text: global.t('obbligo_message', m.sender, null, { sfida: pickRandom(global.sfidaTroll) }),
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
};

handler.help = ['obbligo'];
handler.tags = ['fun'];
handler.command = /^(obbligo|sfida|dare|truthordare|tod)$/i;
export default handler;

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())];
}

// Convertiamo l'array in funzioni di traduzione
global.sfidaTroll = Array.from({ length: 25 }, (_, i) => 
    global.t(`sfida_${i + 1}`, null)
);