// plugins/enable.js

// Elenco delle funzioni gestite dal bot
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

// Inizializzazione sicura dei dati globali (evita undefined)
function ensureDb() {
  if (!global.db) global.db = {};
  if (!global.db.data) global.db.data = {};
  if (!global.db.data.chats) global.db.data.chats = {};
  if (!global.db.data.owners) global.db.data.owners = {};
  return global.db;
}

let handler = async (message, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  // Assicura la struttura del DB
  const db = ensureDb();

  const chatId = message?.chat || (message?.key && message.key.remoteJid) || 'unknown-chat';
  const senderId = message?.sender || message?.key?.participant || message?.participant || 'unknown-sender';

  // Inizializza lo spazio della chat se manca
  if (!db.data.chats[chatId]) db.data.chats[chatId] = {};
  const chatSettings = db.data.chats[chatId];

  // Prepara il menu con lo stato corrente di ogni feature
  const featuresStatus = features.map(feature => {
    const isOn = feature.ownerOnly
      ? !!db.data.owners[senderId]
      : !!chatSettings[feature.key];
    const statusIcon = isOn ? '🟢' : '🔴';
    const ownerTag = feature.ownerOnly ? ' (Owner)' : '';
    return `┃◈┃ ${statusIcon} *${feature.label}*${ownerTag}`;
  }).join('\n');

  const menuText =
    `\n╭〔 *🔧 MESSAGGIO STATO* 〕┈⊷\n` +
    `${featuresStatus}\n` +
    `╰━━━━━━━━━━━━━┈·๏\n`;

  // Parsing argomento funzione
  const featureArg = (args?.[0] || '').toLowerCase().trim();
  const selectedFeature = features.find(f => f.label.toLowerCase() === featureArg);

  // Se non è stata indicata una feature valida, mostra il menu interattivo testuale
  if (!featureArg || !selectedFeature) {
    const interactiveMsg = {
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
            rowId: `${usedPrefix}attiva ${f.label.toLowerCase()}`
          }))
        }
      ]
    };
    return await conn.sendMessage(chatId, interactiveMsg);
  }

  // Controllo permessi owner per feature ownerOnly
  if (selectedFeature.ownerOnly && !(isOwner && isROwner)) {
    return await conn.sendMessage(chatId, '❌ Solo il proprietario può attivare/disattivare questa funzione.', message);
  }

  // Determina se attivare o disattivare
  const enableReg = /^(attiva|enable|on|1|true)$/i;
  const disableReg = /^(disabilita|disattiva|disable|off|0|false)$/i;
  let enableFeature = enableReg.test(command?.toLowerCase() || '');
  if (disableReg.test(command?.toLowerCase() || '')) enableFeature = false;

  // Applica la modifica
  if (selectedFeature.ownerOnly) {
    // Stato per utente (owner-only) memorizzato in db.data.owners
    db.data.owners[senderId] = enableFeature;
  } else {
    // Stato per chat memorizzato in db.data.chats[chatId]
    chatSettings[selectedFeature.key] = enableFeature;
  }

  // Risposta testuale di conferma senza immagini
  const actionLabel = enableFeature ? 'attivata' : 'disattivata';
  const confirmText =
    `\n┃◈┃ Funzione *${selectedFeature.label}* ${actionLabel}\n` +
    `╰━━━━━━━━━━━━━┈·๏\n`;

  await conn.sendMessage(chatId, confirmText);
};

// Metadati comando
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
