import '../lib/language.js';
let handler = async (m, { conn }) => {

    const createVCard = (name, number, role) => {
        return `BEGIN:VCARD
VERSION:3.0
FN:${name}
ORG:ChatUnity;
TEL;type=CELL;type=VOICE;waid=${number}:+${number}
X-ABLabel:${role}
END:VCARD`.replace(/\n/g, '\r\n');
    };

    await conn.sendMessage(m.chat, { 
        contacts: { 
            displayName: '👥 ChatUnity Staff', 
            contacts: [
                { vcard: createVCard('Creatore', '393515533859', 'Founder') },
                { vcard: createVCard('Finanziatore', '393803482529', 'Financer') },

                { vcard: createVCard('Developer 1', '393935731102', 'Developer') },
                { vcard: createVCard('Developer 2', '447365589428', 'Developer') },
                { vcard: createVCard('Developer 3', '393297570233', 'Developer') },
                { vcard: createVCard('Developer 4', '393518419909', 'Developer') },
                { vcard: createVCard('Developer 5', '639107484127', 'Developer') },
                { vcard: createVCard('Developer 6', '393509368693', 'Developer') },
                { vcard: createVCard('Developer 7', '66621409462', 'Developer') },
                { vcard: createVCard('Developer 8', '393476686131', 'Developer') },
                { vcard: createVCard('Developer 9', '393669729127', 'Developer') },
                { vcard: createVCard('Developer 10', '27746449887', 'Developer') }
            ]
        }
    }, { quoted: m });
};

handler.help = ['staff'];
handler.tags = ['info'];
handler.command = ['staff', 'team'];

export default handler;