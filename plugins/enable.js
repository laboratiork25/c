// Funzioni gestite dal bot
const features = [
    { key: 'antispamcomandi', label: 'AntispamComandi' },
    { key: 'antiLinkHard', label: 'Antilinkhard' },
    { key: 'autosticker', label: 'Autosticker' },
    { key: 'welcome', label: 'Benvenuto' },
    // ... altre funzioni come prima ...
    { key: 'antiviewonce', label: 'Antiviewonce', ownerOnly: true }
];

// Inizializzazione sicura dei dati globali
function ensureDbStructure() {
    if (!global.db) global.db = {};
    if (!global.db.data) global.db.data = {};
    if (!global.db.data.chats) global.db.data.chats = {};
    if (!global.db.data.owners) global.db.data.owners = {};
}

let handler = async (message, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
    ensureDbStructure();
    let chatId = message.chat;
    let senderId = message.sender;
    // Inizializza la chat se non esiste
    if (!global.db.data.chats[chatId]) global.db.data.chats[chatId] = {};
    let chatSettings = global.db.data.chats[chatId];

    // Menu funzioni con stato
    let featuresStatus = features.map(feature => {
        let status = feature.ownerOnly
            ? (global.db.data.owners[senderId] ? '🟢' : '🔴')
            : (chatSettings[feature.key] ? '🟢' : '🔴');
        let ownerTag = feature.ownerOnly ? ' (Owner)' : '';
        return `┃◈┃ ${status} *${feature.label}*${ownerTag}`;
    }).join('\n');

    const menuText = `\n╭〔 *🔧 MESSAGGIO STATO* 〕┈⊷\n${featuresStatus}\n╰━━━━━━━━━━━━━┈·๏\n`;

    // Parsing funzione richiesta
    let featureArg = (args[0] || '').toLowerCase();
    let selectedFeature = features.find(f => f.label.toLowerCase() === featureArg);

    if (!featureArg || !selectedFeature) {
        // Mostra menu testuale senza immagini
        let interactiveMsg = {
            text: menuText,
            footer: 'Seleziona una funzione da attivare/disattivare',
            title: 'Impostazioni Bot',
            buttonText: 'Funzioni',
            sections: [{
                title: 'Impostazioni Bot',
                rows: features.map(f => ({
                    title: f.label,
                    description: `Attiva/Disattiva ${f.label}`,
                    rowId: usedPrefix + 'attiva ' + f.label.toLowerCase()
                }))
            }]
        };
        return await conn.sendMessage(chatId, interactiveMsg);
    }

    // OwnerOnly check
    if (selectedFeature.ownerOnly && !(isOwner && isROwner)) {
        return conn.sendMessage(chatId, '❌ Solo il proprietario può attivare/disattivare questa funzione.', message);
    }

    // Attivazione/disattivazione
    let enableReg = /attiva|enable|on|1|true/i;
    let disableReg = /disabilita|disattiva|disable|off|0|false/i;
    let enableFeature = enableReg.test(command.toLowerCase());
    let disableFeature = disableReg.test(command.toLowerCase());
    if (disableFeature) enableFeature = false;

    if (selectedFeature.ownerOnly) {
        global.db.data.owners[senderId] = enableFeature;
    } else {
        chatSettings[selectedFeature.key] = enableFeature;
    }

    let action = enableFeature ? 'attivata' : 'disattivata';
    await conn.sendMessage(chatId, `\n┃◈┃ Funzione *${selectedFeature.label}* ${action}\n╰━━━━━━━━━━━━━┈·๏\n`);
};

handler.help = [
    'attiva <feature>',
    'disabilita <feature>',
    'disattiva <feature>'
];
handler.tags = ['settings', 'owner'];
handler.command = /^(attiva|disabilita|disattiva|enable|disable)/i;
handler.group = true;
handler.bot = true;

export default handler;
