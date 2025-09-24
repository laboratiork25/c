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

// Normalizza stringhe per confronto
const norm = (s = '') => String(s).toLowerCase().trim();

// Deduci stato corrente di una feature
function isFeatureOn(db, chatId, senderId, feature) {
  if (feature.ownerOnly) {
    const byOwner = db.data.owners[senderId] || {};
    return !!byOwner[feature.key];
  }
  const chatSettings = db.data.chats[chatId] || {};
  return !!chatSettings[feature.key];
}

let handler = async (message, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  const db = ensureDb();

  const chatId =
    message?.chat ||
    (message?.key && message.key.remoteJid) ||
    message?.key?.remoteJid ||
    'unknown-chat';

  const senderId =
    message?.sender ||
    message?.key?.participant ||
    message?.participant ||
    message?.key?.id ||
    'unknown-sender';

  // Inizializza strutture
  if (!db.data.chats[chatId]) db.data.chats[chatId] = {};
  if (!db.data.owners[senderId]) db.data.owners[senderId] = {};
  const chatSettings = db.data.chats[chatId];

  // Costruisci menu stato
  const featuresStatus = features.map(feature => {
    const isOn = isFeatureOn(db, chatId, senderId, feature);
    const statusIcon = isOn ? '🟢' : '🔴';
    const ownerTag = feature.ownerOnly ? ' (Owner)' : '';
    return `┃◈┃ ${statusIcon} *${feature.label}*${ownerTag}`;
  }).join('\n');

  const menuText =
    `\n╭〔 *🔧 MESSAGGIO STATO* 〕┈⊷\n` +
    `${featuresStatus}\n` +
    `╰━━━━━━━━━━━━━┈·๏\n`;

  // Parsing argomenti: <feature> [on|off]
  const featureArg = norm(args?.[0] || '');
  const stateArg = norm(args?.[1] || '');

  // Trova feature per label o key
  const selectedFeature = features.find(f =>
    norm(f.label) === featureArg || norm(f.key) === featureArg
  );

  // Se manca feature valida, mostra una List Message interattiva
  if (!featureArg || !selectedFeature) {
    const sections = [
      {
        title: 'Impostazioni Bot',
        rows: features.map(f => ({
          title: f.label,
          description: `Attiva/Disattiva ${f.label}`,
          rowId: `${usedPrefix}attiva ${norm(f.label)}`
        }))
      }
    ];

    // Baileys list message format
    const interactiveMsg = {
      text: 'Impostazioni Bot',
      footer: 'Seleziona una funzione da attivare/disattivare',
      title: 'Impostazioni Bot',
      buttonText: 'Funzioni',
      sections
    };

    await conn.sendMessage(chatId, interactiveMsg); // List message in Baileys
    // Inoltre invia lo stato corrente come testo
    await conn.sendMessage(chatId, { text: menuText });
    return;
  }

  // Controllo permessi owner per feature ownerOnly (basta essere owner o real owner)
  if (selectedFeature.ownerOnly && !(isOwner || isROwner)) {
    await conn.sendMessage(chatId, { text: '❌ Solo il proprietario può attivare/disattivare questa funzione.' });
    return;
  }

  // Regex per interpretare enable/disable
  const enableReg = /^(attiva|enable|on|1|true)$/i;
  const disableReg = /^(disabilita|disattiva|disable|off|0|false)$/i;

  // Deduci intento: priorità a argomento esplicito, poi dal comando
  let enableFeature;
  if (enableReg.test(stateArg)) enableFeature = true;
  else if (disableReg.test(stateArg)) enableFeature = false;
  else if (enableReg.test(norm(command || ''))) enableFeature = true;
  else if (disableReg.test(norm(command || ''))) enableFeature = false;
  else {
    // Se non specificato, toggla lo stato corrente
    enableFeature = !isFeatureOn(db, chatId, senderId, selectedFeature);
  }

  // Applica modifica
  if (selectedFeature.ownerOnly) {
    if (!db.data.owners[senderId]) db.data.owners[senderId] = {};
    db.data.owners[senderId][selectedFeature.key] = !!enableFeature;
  } else {
    chatSettings[selectedFeature.key] = !!enableFeature;
  }

  const actionLabel = enableFeature ? 'attivata' : 'disattivata';
  const confirmText =
    `\n┃◈┃ Funzione *${selectedFeature.label}* ${actionLabel}\n` +
    `╰━━━━━━━━━━━━━┈·๏\n`;

  await conn.sendMessage(chatId, { text: confirmText });
};

// Metadati comando
handler.help = [
  'attiva <feature> [on|off]',
  'disattiva <feature>',
  'enable <feature> [on|off]',
  'disable <feature>'
];
handler.tags = ['settings', 'owner'];
handler.command = /^(attiva|disabilita|disattiva|enable|disable)$/i;
handler.group = true;
handler.bot = true;

export default handler;
