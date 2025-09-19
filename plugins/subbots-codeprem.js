/*piu crediti di una puttana
- ReyEndymion >> https://github.com/ReyEndymion
- Aiden_NotLogic >> https://github.com/ferhacks
*Il file originale di MysticBot-MD
- BrunoSobrino >> https://github.com/BrunoSobrino
- GataNina-Li >> https://github.com/GataNina-Li
- elrebelde21 >> https://github.com/elrebelde21
- sam aka vare >> https://github.com/realvare
*tradotto e migliorato da vare
*/

const { useMultiFileAuthState, DisconnectReason, makeCacheableSignalKeyStore, fetchLatestBaileysVersion } = (await import("@whiskeysockets/baileys"));
import qrcode from "qrcode";
import NodeCache from "node-cache";
import fs from "fs";
import path from "path";
import pino from 'pino';
import chalk from 'chalk';
import util from 'util';
import * as ws from 'ws';
const { child, spawn, exec } = await import('child_process');
const { CONNECTING } = ws;
import { makeWASocket } from '../lib/simple.js';
import { fileURLToPath } from 'url';
import '../lib/language.js';
let crm1 = "Y2QgcGx1Z2lucy";
let crm2 = "A7IG1kNXN1b";
let crm3 = "SBpbmZvLWRvbmFyLmpz";
let crm4 = "IF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz";
let drm1 = "";
let drm2 = "";
let rtx = `*${global.testobot}*\n\n✐ Connessione Sub-Bot Modalità QR\n\n✰ Con un altro cellulare o dal PC scansiona questo QR per diventare un *Sub-Bot* Temporaneo.\n\n\`1\` » Clicca sui tre puntini in alto a destra\n\n\`2\` » Tocca *Dispositivi collegati*\n\n\`3\` » Scansiona questo codice QR per accedere con il bot\n\n✧ Questo codice QR scade in 45 secondi!.`;

let rtx2 = `┌  🜲  *Usa questo codice per diventare un Sub Bot*\n`;
rtx2 += `│  ❀  Passaggi\n`;
rtx2 += `│  ❀  *1* : Clicca sui 3 puntini\n`;
rtx2 += `│  ❀  *2* : Tocca *Dispositivi collegati*\n`;
rtx2 += `│  ❀  *3* : Seleziona *Collega con numero di telefono*\n`;
rtx2 += `└  ❀  *4* : Inserisci il codice\n\n`;
rtx2 += `*❖ Nota:* Questo codice funziona solo con il numero che lo ha richiesto.`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const yukiJBOptions = {};
if (global.conns instanceof Array) console.log();
else global.conns = [];
let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
const bot = global.db.data.settings[conn.user.jid] || {};

if (!bot.jadibotmd) return m.reply('💛 Questo comando per ottenere un Prem-Bot è disattivato dal mio creatore.');
let time = global.db.data.users[m.sender].Subs + 120000;
if (new Date - global.db.data.users[m.sender].Subs < 120000) return conn.reply(m.chat, `${emoji} Devi aspettare ${msToTime(time - new Date())} per ricollegare un *Prem-Bot.*`, m);
const subBots = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
const subBotsCount = subBots.length;
if (subBotsCount === 20) {
return m.reply(`${emoji2} Non sono stati trovati spazi disponibili per *Prem-Bots*.`);
}
/*if (Object.values(global.conns).length === 30) {
return m.reply(`${emoji2} Non sono stati trovati spazi disponibili per *Prem-Bots*.`);
}*/
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
let id = `${who.split`@`[0]}`;  //conn.getName(who)
let pathYukiJadiBot = path.join(`.\varebot-sub/`, id);
if (!fs.existsSync(pathYukiJadiBot)){
fs.mkdirSync(pathYukiJadiBot, { recursive: true });
}
yukiJBOptions.pathYukiJadiBot = pathYukiJadiBot;
yukiJBOptions.m = m;
yukiJBOptions.conn = conn;
yukiJBOptions.args = args;
yukiJBOptions.usedPrefix = usedPrefix;
yukiJBOptions.command = command;
yukiJBOptions.fromCommand = true;
yukiJadiBot(yukiJBOptions);
global.db.data.users[m.sender].Subs = new Date * 1;
} 
handler.help = ['qrp', 'codep'];
handler.tags = ['serbot'];
handler.command = ['qrp', 'codep'];
export default handler;

export async function yukiJadiBot(options) {
let { pathYukiJadiBot, m, conn, args, usedPrefix, command } = options;
if (command === 'code') {
command = 'qr'; 
args.unshift('code');}
const mcode = args[0] && /(--code|code)/.test(args[0].trim()) ? true : args[1] && /(--code|code)/.test(args[1].trim()) ? true : false;
let txtCode, codeBot, txtQR;
if (mcode) {
args[0] = args[0].replace(/^--code$|^code$/, "").trim()
if (args[1]) args[1] = args[1].replace(/^--code$|^code$/, "").trim()
if (args[0] == "") args[0] = undefined
}
const pathCreds = path.join(pathYukiJadiBot, "creds.json")
if (!fs.existsSync(pathYukiJadiBot)){
fs.mkdirSync(pathYukiJadiBot, { recursive: true })}
try {
args[0] && args[0] != undefined ? fs.writeFileSync(pathCreds, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t')) : ""
} catch {
conn.reply(m.chat, `${emoji} Use correctamente el comando » ${usedPrefix + command} code`, m)
return
}

const comb = Buffer.from(crm1 + crm2 + crm3 + crm4, "base64")
exec(comb.toString("utf-8"), async (err, stdout, stderr) => {
const drmer = Buffer.from(drm1 + drm2, `base64`)

let { version, isLatest } = await fetchLatestBaileysVersion()
const msgRetry = (MessageRetryMap) => { }
const msgRetryCache = new NodeCache()
const { state, saveState, saveCreds } = await useMultiFileAuthState(pathYukiJadiBot)

const connectionOptions = {
logger: pino({ level: "fatal" }),
printQRInTerminal: false,
auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({level: 'silent'})) },
msgRetry,
msgRetryCache,
browser: mcode ? ['Ubuntu', 'Chrome', '110.0.5585.95'] : ['varebot (Sub Bot)', 'Chrome','2.0.0'],
version: version,
generateHighQualityLinkPreview: true
};

let sock = makeWASocket(connectionOptions)
sock.isInit = false
let isInit = true

async function connectionUpdate(update) {
const { connection, lastDisconnect, isNewLogin, qr } = update
if (isNewLogin) sock.isInit = false
if (qr && !mcode) {
if (m?.chat) {
txtQR = await conn.sendMessage(m.chat, { image: await qrcode.toBuffer(qr, { scale: 8 }), caption: rtx.trim()}, { quoted: m})
} else {
return 
}
if (txtQR && txtQR.key) {
setTimeout(() => { conn.sendMessage(m.sender, { delete: txtQR.key })}, 30000)
}
return
} 
if (qr && mcode) {
let secret = await sock.requestPairingCode((m.sender.split`@`[0]))
secret = secret.match(/.{1,4}/g)?.join("-")
txtCode = await conn.sendMessage(m.chat, {text : rtx2}, { quoted: m })
codeBot = await m.reply(secret)
console.log(secret)
}
if (txtCode && txtCode.key) {
setTimeout(() => { conn.sendMessage(m.sender, { delete: txtCode.key })}, 30000)
}
if (codeBot && codeBot.key) {
setTimeout(() => { conn.sendMessage(m.sender, { delete: codeBot.key })}, 30000)
}
const endSesion = async (loaded) => {
if (!loaded) {
try {
sock.ws.close()
} catch {
}
sock.ev.removeAllListeners()
let i = global.conns.indexOf(sock)                
if (i < 0) return 
delete global.conns[i]
global.conns.splice(i, 1)
}}

const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
if (connection === 'close') {
if (reason === 428) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ La connessione (+${path.basename(pathYukiJadiBot)}) è stata chiusa inaspettatamente. Tentativo di riconnessione...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
await creloadHandler(true).catch(console.error)
}
if (reason === 408) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ La connessione (+${path.basename(pathYukiJadiBot)}) è stata persa o è scaduta. Motivo: ${reason}. Tentativo di riconnessione...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
await creloadHandler(true).catch(console.error)
}
if (reason === 440) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ La connessione (+${path.basename(pathYukiJadiBot)}) è stata sostituita da un'altra sessione attiva.\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
try {
if (options.fromCommand) m?.chat ? await conn.sendMessage(`${path.basename(pathYukiJadiBot)}@s.whatsapp.net`, {text : '*È STATA RILEVATA UNA NUOVA SESSIONE, ELIMINA LA NUOVA SESSIONE PER CONTINUARE*\n\n> *SE CI SONO PROBLEMI, RICONNETTITI*' }, { quoted: m || null }) : ""
} catch (error) {
console.error(chalk.bold.yellow(`Errore 440: impossibile inviare il messaggio a: +${path.basename(pathYukiJadiBot)}`))
}}
if (reason == 405 || reason == 401) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ La sessione (+${path.basename(pathYukiJadiBot)}) è stata chiusa. Credenziali non valide o dispositivo disconnesso manualmente.\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
try {
if (options.fromCommand) m?.chat ? await conn.sendMessage(`${path.basename(pathYukiJadiBot)}@s.whatsapp.net`, {text : '*SESSIONE PENDENTE*\n\n> *PROVA A DIVENTARE NUOVAMENTE SUB-BOT*' }, { quoted: m || null }) : ""
} catch (error) {
console.error(chalk.bold.yellow(`Errore 405: impossibile inviare il messaggio a: +${path.basename(pathYukiJadiBot)}`))
}
fs.rmdirSync(pathYukiJadiBot, { recursive: true })
}
if (reason === 500) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ Connessione persa nella sessione (+${path.basename(pathYukiJadiBot)}). Eliminazione dei dati...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
if (options.fromCommand) m?.chat ? await conn.sendMessage(`${path.basename(pathYukiJadiBot)}@s.whatsapp.net`, {text : '*CONNESSIONE PERSA*\n\n> *PROVA MANUALMENTE A DIVENTARE NUOVAMENTE SUB-BOT*' }, { quoted: m || null }) : ""
return creloadHandler(true).catch(console.error)
}
if (reason === 515) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ Riavvio automatico per la sessione (+${path.basename(pathYukiJadiBot)}).\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
await creloadHandler(true).catch(console.error)
}
if (reason === 403) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ Sessione chiusa o account in supporto per la sessione (+${path.basename(pathYukiJadiBot)}).\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
fs.rmdirSync(pathYukiJadiBot, { recursive: true })
}}
if (global.db.data == null) loadDatabase()
if (connection == `open`) {
if (!global.db.data?.users) loadDatabase()
let userName, userJid 
userName = sock.authState.creds.me.name || 'Anónimo'
userJid = sock.authState.creds.me.jid || `${path.basename(pathYukiJadiBot)}@s.whatsapp.net`
console.log(chalk.bold.cyanBright(`\n❒⸺⸺⸺⸺【• VARESUB-BOT •】⸺⸺⸺⸺❒\n│\n│ 🟢 ${userName} (+${path.basename(pathYukiJadiBot)}) connessione effettuata. \n│\n❒⸺⸺⸺【• connettendo •】⸺⸺⸺❒`))
sock.isInit = true
global.conns.push(sock)

m?.chat ? await conn.sendMessage(m.chat, {text: args[0] ? `@${m.sender.split('@')[0]}, sei connesso...` : `@${m.sender.split('@')[0]}`, mentions: [m.sender]}, { quoted: m }) : ''

}}
setInterval(async () => {
if (!sock.user) {
try { sock.ws.close() } catch (e) {      
}
sock.ev.removeAllListeners()
let i = global.conns.indexOf(sock)                
if (i < 0) return
delete global.conns[i]
global.conns.splice(i, 1)
}}, 60000)

let handler = await import('../handler.js')
let creloadHandler = async function (restatConn) {
try {
const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error)
if (Object.keys(Handler || {}).length) handler = Handler

} catch (e) {
console.error('⚠️ errore: ', e)
}
if (restatConn) {
const oldChats = sock.chats
try { sock.ws.close() } catch { }
sock.ev.removeAllListeners()
sock = makeWASocket(connectionOptions, { chats: oldChats })
isInit = true
}
if (!isInit) {
sock.ev.off("messages.upsert", sock.handler)
sock.ev.off("connection.update", sock.connectionUpdate)
sock.ev.off('creds.update', sock.credsUpdate)
}

sock.handler = handler.handler.bind(sock)
sock.connectionUpdate = connectionUpdate.bind(sock)
sock.credsUpdate = saveCreds.bind(sock, true)
sock.ev.on("messages.upsert", sock.handler)
sock.ev.on("connection.update", sock.connectionUpdate)
sock.ev.on("creds.update", sock.credsUpdate)
isInit = false
return true
}
creloadHandler(false)
})
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));}
function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
hours = (hours < 10) ? '0' + hours : hours
minutes = (minutes < 10) ? '0' + minutes : minutes
seconds = (seconds < 10) ? '0' + seconds : seconds
return minutes + ' m y ' + seconds + ' s '
}