// Import dei moduli necessari
import fs from 'fs';
import fetch from 'node-fetch';

// Elenco delle funzioni del bot con chiave e etichetta
const features = [
    { key: 'antispamcomandi', label: 'AntispamComandi' },
    { key: 'antiLinkHard', label: 'Antilinkhard' },
    { key: 'autosticker', label: 'Autosticker' },
    { key: 'welcome', label: 'Benvenuto' },
    { key: 'isBanned', label: 'BanGruppo' },
    { key: 'isGroup', label: 'SoloGruppo' },
    { key: 'soloadmin', label: 'SoloAdmin' },
    { key: 'detect', label: 'Detect' },
    { key: 'risposte', label: 'Risposte' },
    { key: 'antibot', label: 'Antibot' },
    { key: 'antispam', label: 'Antispam' },
    { key: 'antimedia', label: 'Antimedia' },
    { key: 'antiporno', label: 'Antiporno' },
    { key: 'soloprivato', label: 'SoloPrivato' },
    { key: 'admin', label: 'SoloAdmin' },
    { key: 'group', label: 'SoloGruppo' },
    { key: 'antiinsta', label: 'Antiinsta' },
    { key: 'Antibestemmie', label: 'Antibestemmie' },
    { key: 'antitiktok', label: 'AntiTikTok' },
    { key: 'antivirus', label: 'Antivirus' },
    { key: 'antiCall', label: 'AntiCall' },
    { key: 'antivoip', label: 'Antivoip' },
    { key: 'Antitrava', label: 'Antitrava' },
    { key: 'Antiarab', label: 'Antiarab' },
    { key: 'antiviewonce', label: 'Antiviewonce', ownerOnly: true }
];

// Handler principale del comando
let handler = async (message, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
    // Controlla la presenza delle immagini usate nei messaggi
    const images = ['./termini.jpeg', './bal.png', './settings.png'];
    for (const img of images) {
        try {
            await fs.promises.stat(img);
        } catch {
            return message.reply('❌ File immagine mancante.');
        }
    }

    // Dati della chat corrente
    let chatSettings = global.db.data.chats[message.chat] || {};

    // Costruisci la lista delle funzioni con il loro stato attuale
    let featuresStatus = features.map(feature => {
        let status = feature.ownerOnly
            ? (global.db.data.owners[message.sender] ? '🟢' : '🔴')
            : (chatSettings[feature.key] ? '🟢' : '🔴'
        );
        let ownerTag = feature.ownerOnly ? ' (Owner)' : '';
        return `┃◈┃ ${status} *${feature.label}*${ownerTag}`;
    }).join('\n');

    // Testo del menu delle funzioni disponibili
    const menuText = `\n╭〔 *🔧 MESSAGGIO STATO* 〕┈⊷\n${featuresStatus}\n╰━━━━━━━━━━━━━┈·๏\n`;

    // Se non viene indicata la funzione da attivare/disattivare, mostra il menu
    let featureArg = (args[0] || '').toLowerCase();
    let selectedFeature = features.find(f => f.label.toLowerCase() === featureArg);

    if (!featureArg || !selectedFeature) {
        // Messaggio interattivo con bottoni (scheda)
        let interactiveMsg = {
            text: menuText,
            footer: 'Seleziona una funzione da attivare/disattivare',
            title: 'Impostazioni Bot',
            buttonText: 'Funzioni',
            sections: [
                {
                    title: 'Impostazioni Bot',
                    rows: features.map(f => ({
                        title: f.label,
                        description: `Attiva/Disattiva ${f.label}`,
                        rowId: usedPrefix + 'attiva ' + f.label.toLowerCase()
                    }))
                }
            ]
        };
        // Messaggio citato con thumbnail e localizzazione
        let quotedMsg = {
            key: {
                participants: '0@s.whatsapp.net',
                fromMe: false,
                id: 'JadiBot'
            },
            message: {
                locationMessage: {
                    name: 'Impostazioni Bot',
                    jpegThumbnail: fs.readFileSync('./settings.png'),
                    vcard: 'BEGIN:VCARD...'
                }
            },
            participant: '0@s.whatsapp.net'
        };
        return await conn.sendMessage(message.chat, interactiveMsg, { quoted: quotedMsg });
    }

    // Controllo per funzione ownerOnly
    if (selectedFeature.ownerOnly && !(isOwner && isROwner))
        return conn.sendMessage(message.chat, '❌ Solo il proprietario può attivare/disattivare questa funzione.', message);

    // Determina il comando (attiva/disattiva)
    let enableReg = /attiva|enable|on|1|true/i;
    let disableReg = /disabilita|disattiva|disable|off|0|false/i;
    let enableFeature = enableReg.test(command.toLowerCase());
    let disableFeature = disableReg.test(command.toLowerCase());
    if (disableFeature) enableFeature = false;

    // Applica la modifica sulla funzione selezionata (varie tipologie di storage)
    if (selectedFeature.key === 'antivoip') {
        chatSettings.antivoip = enableFeature;
    } else if (selectedFeature.key === 'antispamcomandi') {
        global.db.data.owners[message.sender] = enableFeature;
    } else {
        chatSettings[selectedFeature.key] = enableFeature;
    }

    // Risposta con stato aggiornato
    let statusIcon = enableFeature ? '🟢' : '🔴';
    let actionLabel = enableFeature ? 'attivata' : 'disattivata';
    let replyText = `\n┃◈┃ Funzione *${selectedFeature.label}* ${actionLabel}\n╰━━━━━━━━━━━━━┈·๏\n`;

    // Immagine aggiornata in base allo stato
    const thumbnailUrl = enableFeature
        ? 'https://telegra.ph/file/00edd0958c94359540a8f.png'
        : 'https://telegra.ph/file/de558c2aa7fc80d32b8c3.png';

    let quotedMsg = {
        key: {
            participants: '0@s.whatsapp.net',
            fromMe: false,
            id: 'JadiBot'
        },
        message: {
            locationMessage: {
                name: 'Impostazioni Bot',
                jpegThumbnail: await (await fetch(thumbnailUrl)).buffer(),
                vcard: 'BEGIN:VCARD...'
            }
        },
        participant: '0@s.whatsapp.net'
    };

    // Risposta finale
    await conn.sendMessage(message.chat, replyText, null, { quoted: quotedMsg });
};

// Metadata del comando per il sistema
handler.help = [
    'attiva <feature>',
    'disabilita <feature>',
    'disattiva <feature>'
];
handler.tags = ['settings', 'owner'];
handler.command = /^(attiva|disabilita|disattiva|enable|disable)/i;
handler.group = true;
handler.bot = true;

// Esportazione dell'handler
export default handler;
