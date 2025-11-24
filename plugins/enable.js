import fs from 'fs';
import fetch from 'node-fetch';
import '../lib/language.js';

const features = [
  { key: 'antiLink',           label: 'AntiLink' },
  { key: 'antiLinkHard',       label: 'Antilinkhard' },
  { key: 'antimedia',          label: 'Antimedia' },
  { key: 'antispamcomandi',    label: 'AntispamComandi' },
  { key: 'welcome',            label: 'Benvenuto' },
  { key: 'autosticker',        label: 'Autosticker' },
  { key: 'antibot',            label: 'Antibot' },
  { key: 'detect',             label: 'Detect' },
  { key: 'risposte',           label: 'Risposte' },
  { key: 'gpt',                label: 'GPT' },
  { key: 'antispam',           label: 'Antispam' },
  { key: 'antiviewonce',       label: 'Antiviewonce' },
  { key: 'sologruppo',         label: 'SoloGruppo' },
  { key: 'soloprivato',        label: 'SoloPrivato' },
  { key: 'soloadmin',          label: 'soloadmin' },
  { key: 'isBanned',           label: 'BanGruppo' },
  { key: 'antinuke',           label: 'AntiNuke' },
  { key: 'conclave',          label: 'Conclave' },
  { key: 'antiCall',           label: 'AntiCall' },
  { key: 'antiinsta',          label: 'Antiinsta' },
  { key: 'antiporno',          label: 'Antiporno' },
  { key: 'antitrava',          label: 'Antitrava' },
  { key: 'antivirus',          label: 'Antivirus' },
  { key: 'antivoip',           label: 'Antivoip' },
  { key: 'antiArab',           label: 'Antiarab' },
  { key: 'antisondaggi',       label: 'Antisondaggi' },
  { key: 'antitiktok',         label: 'AntiTikTok' },
  { key: 'chatbotPrivato',     label: 'ChatbotPrivato', ownerOnly: true },
];

const STATUS_HEADER = `
╭★────★────★
|ㅤㅤㅤ꒰¡𝐒𝐓𝐀𝐓𝐎 𝐅𝐔𝐍𝐙𝐈𝐎𝐍𝐄!꒱
`;

const STATUS_FOOTER = `
╰★────★────★
`;

const ONLY_OWNER_MSG = '❌ Solo il proprietario può attivare/disattivare questa funzione.';
const ONLY_PRIVATE_CHATBOT_MSG = '❌ Puoi attivare/disattivare la funzione *ChatbotPrivato* solo in chat privata.';

let handler = async (m, { conn, command, args, isOwner, isROwner }) => {
  const name = await conn.getName(m.sender);
  const chats = (global.db?.data?.chats || {});
  const chatData = chats[m.chat] || {};

  const featureArg = (args[0] || '').toLowerCase();
  const selected = features.find(f => f.label.toLowerCase() === featureArg);

  if (!featureArg || !selected) {
    const availableFunctions = features.map(f => `- ${f.label}`).join('\n');
    const errorMsg = featureArg
      ? `❌ La funzione "${featureArg}" non esiste o è stata scritta male.\n\nFunzioni disponibili:\n${availableFunctions}`
      : `❗ Usa il comando seguito dal nome di una funzione.\n\nFunzioni disponibili:\n${availableFunctions}`;
    await conn.reply(m.chat, errorMsg, m);
    return;
  }

  if (selected.ownerOnly && !(isOwner || isROwner)) {
    await conn.reply(m.chat, ONLY_OWNER_MSG, m);
    return;
  }

  const isEnable = /attiva|abilita|enable|on|start|true|1|activar|encender|iniciar|habilitar|ativar|ligar|einschalten|aktivieren|开始|启动|开启|включить|активировать|تشغيل|تفعيل|चालू|सक्रिय|activer|démarrer|allumer|mengaktifkan|menyalakan|başlat|etkinleştir|aç/i.test(command.toLowerCase());

const isDisable = /disattiva|disabilita|disable|off|stop|false|0|desactivar|apagar|detener|deshabilitar|desligar|desativar|ausschalten|deaktivieren|关闭|停用|结束|выключить|деактивировать|إيقاف|تعطيل|बंद|निष्क्रिय|désactiver|arrêter|éteindre|menonaktifkan|mematikan|bitir|devre dışı bırak|kapat/i.test(command.toLowerCase());

let setTo = isEnable && !isDisable;
 let setTo = isEnable && !isDisable;

  if (selected.key === 'antivoip') {
    chatData.antivoip = setTo;
  } else if (selected.key === 'chatbotPrivato') {
    if (m.isGroup) {
      await conn.reply(m.chat, ONLY_PRIVATE_CHATBOT_MSG, m);
      return;
    }
    if (!global.privateChatbot) global.privateChatbot = {};
    global.privateChatbot[m.sender] = setTo;
  } else {
    chatData[selected.key] = setTo;
  }

  if (global.db?.data?.chats) {
    global.db.data.chats[m.chat] = chatData;
  }

  const stateIcon = (selected.key === 'chatbotPrivato'
    ? (global.privateChatbot?.[m.sender] ? '🟢' : '🔴')
    : (chatData[selected.key] ? '🟢' : '🔴'));

  const stateVerb = setTo ? '𝐚𝐭𝐭𝐢𝐯𝐚𝐭𝐚' : '𝐝𝐢𝐬𝐚𝐭𝐭𝐢𝐯𝐚𝐭𝐚';
  const statusMsg = `
${STATUS_HEADER}
|˚₊꒷ ${stateIcon} ꒱ ฅ﹕*${selected.label}* ${stateVerb} ₊˚๑
${STATUS_FOOTER}
`.trim();

  await conn.reply(m.chat, statusMsg, m);
};

handler.help = ['attiva <feature>', 'disabilita <feature>', 'disattiva <feature>', 'enable <feature>', 'disable <feature>', 'on <feature>', 'off <feature>'];

handler.tags = ['Impostazioni Bot', 'owner'];

handler.command = /^(attiva|abilita|disabilita|disattiva|enable|disable|on|off|start|stop|activar|encender|iniciar|desactivar|apagar|detener|ativar|ligar|desligar|desativar|einschalten|aktivieren|ausschalten|deaktivieren|开始|启动|开启|关闭|停用|结束|включить|активировать|выключить|деактивировать|تشغيل|تفعيل|إيقاف|تعطيل|चालू|सक्रिय|बंद|निष्क्रिय|activer|démarrer|allumer|désactiver|arrêter|éteindre|mengaktifkan|menyalakan|menonaktifkan|mematikan|başlat|etkinleştir|aç|bitir|devre\s*dışı\s*bırak)$/i;

handler.group = true;
handler.ownerOnly = false;


export default handler;
