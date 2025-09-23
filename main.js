process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1';
import './config.js';
import './api.js';
import { createRequire } from 'module';
import path, { join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { platform } from 'process';
import * as ws from 'ws';
import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, rmSync, watch } from 'fs';
import yargs from 'yargs';
import { spawn } from 'child_process';
import lodash from 'lodash';
import chalk from 'chalk';
import syntaxerror from 'syntax-error';
import { tmpdir } from 'os';
import { format } from 'util';
import Pino from 'pino';
import { Boom } from '@hapi/boom';
import { makeWASocket, protoType, serialize } from './lib/simple.js';
import { Low, JSONFile } from 'lowdb';
import { mongoDB, mongoDBV2 } from './lib/mongoDB.js';
import store from './lib/store.js';
const { proto } = (await import('@whiskeysockets/baileys')).default;
const { DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser, PHONENUMBER_MCC } = await import('@whiskeysockets/baileys');
import readline from 'readline';
import NodeCache from 'node-cache';

protoType();
serialize();

const __filename0 = (pathURL = import.meta.url, rmPrefix = platform !== 'win32') => rmPrefix ? (/file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL) : pathToFileURL(pathURL).toString();
const __dirname0 = (pathURL) => path.dirname(__filename0(pathURL, true));
global.__filename = __filename0;
global.__dirname = __dirname0;
global.__require = function require(dir = import.meta.url) { return createRequire(dir); };

global.API = (name, path_ = '/', query = {}, apikeyqueryname) =>
  (name in global.APIs ? global.APIs[name] : name) +
  path_ +
  ((query && Object.keys(query).length) || apikeyqueryname
    ? '?' +
      new URLSearchParams(
        Object.entries({
          ...query,
          ...(apikeyqueryname
            ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] }
            : {}),
        }),
      )
    : '');

global.timestamp = { start: new Date() };
global.videoList = [];
global.videoListXXX = [];

const __dirname = global.__dirname(import.meta.url);
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
global.prefix = new RegExp(
  '^[' +
    (opts['prefix'] || '*/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-.@')
      .replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') +
    ']',
);

if (opts['db'] && opts['db'] === 'mongodb') {
  const MongoDBAdapter = (await import('./lib/MongoDBAdapter.js')).default;
  global.db = new Low(new MongoDBAdapter(process.env.MONGODB_URI || 'mongodb://192.168.1.112:27017', 'botDB', 'shared_data'));
} else if (/https?:\/\//.test(opts['db'] || '')) {
  const { cloudDBAdapter } = await import('./lib/cloudDBAdapter.js');
  global.db = new Low(new cloudDBAdapter(opts['db']));
} else {
  global.db = new Low(new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`));
}

global.DATABASE = global.db;
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise((resolve) =>
      setInterval(async function () {
        if (!global.db.READ) {
          clearInterval(this);
          resolve(global.db.data == null ? global.loadDatabase() : global.db.data);
        }
      }, 1000),
    );
  }
  if (global.db.data !== null) return;
  global.db.READ = true;
  await global.db.read().catch(() => {});
  global.db.READ = null;
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(global.db.data || {}),
  };
  global.db.chain = lodash.chain(global.db.data);
};
await global.loadDatabase();

global.chatgpt = new Low(new JSONFile(path.join(__dirname, '/db/chatgpt.json')));
global.loadChatgptDB = async function loadChatgptDB() {
  if (global.chatgpt.READ) {
    return new Promise((resolve) =>
      setInterval(async function () {
        if (!global.chatgpt.READ) {
          clearInterval(this);
          resolve(global.chatgpt.data === null ? global.loadChatgptDB() : global.chatgpt.data);
        }
      }, 1000),
    );
  }
  if (global.chatgpt.data !== null) return;
  global.chatgpt.READ = true;
  await global.chatgpt.read().catch(() => {});
  global.chatgpt.READ = null;
  global.chatgpt.data = {
    users: {},
    ...(global.chatgpt.data || {}),
  };
  global.chatgpt.chain = lodash.chain(global.chatgpt.data);
};
await global.loadChatgptDB();

const sessionFolder = './s/';
async function autoClearSessions() {
  try {
    if (!existsSync(sessionFolder)) return;
    const sessionFiles = readdirSync(sessionFolder);
    for (const file of sessionFiles) {
      if (file !== 'creds.json' && file.startsWith('pre-key-')) {
        unlinkSync(path.join(sessionFolder, file));
      }
    }
  } catch {}
}
setInterval(autoClearSessions, 300000);

const { state, saveCreds } = await useMultiFileAuthState('s');
const msgRetryCounterCache = new NodeCache({ stdTTL: 900, checkperiod: 120 });
const msgRetryCounterMap = (MessageRetryMap) => {};
const { version } = await fetchLatestBaileysVersion();

const methodCodeQR = process.argv.includes('qr');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (texto) => new Promise((resolver) => rl.question(texto, resolver));
let opcion = methodCodeQR ? '1' : undefined;

if (methodCodeQR) {
  opcion = '1';
}

if (!methodCodeQR && !process.argv.includes('code') && !existsSync(`./s/creds.json`)) {
  do {
    let lineM = '⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》';
    opcion = await question(
      `╭${lineM}  
┊ ${chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┊ ${chalk.blueBright('┊')} ${chalk.blue.bgBlue.bold.cyan('METODO DI COLLEGAMENTO')}
┊ ${chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}   
┊ ${chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}     
┊ ${chalk.italic.magenta('Scrivi solo il numero(1 o 2)')}
┊ ${chalk.blueBright('┊')} ${chalk.italic.magenta('per connetterti')}
┊ ${chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')} 
┊ ${chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}    
┊ ${chalk.blueBright('┊')} ${chalk.green.bgMagenta.bold.yellow('COME CONNETTERSI?')}
┊ ${chalk.blueBright('┊')} ${chalk.bold.redBright(`⇢  Opzione 1:`)} ${chalk.greenBright('Codice qr')}
┊ ${chalk.blueBright('┊')} ${chalk.bold.redBright(`⇢  Opzione 2:`)} ${chalk.greenBright('Codice 8 caratteri')}
┊ ${chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')} 
╰${lineM}\n${chalk.bold.magentaBright('---> ')}`,
    );

    if (!/^[1-2]$/.test(opcion)) console.log(chalk.bold.redBright('Opzione non valida. Inserisci solo 1 o 2.'));
  } while ((opcion !== '1' && opcion !== '2') || existsSync(`./s/creds.json`));
}

const decodeCache = new Map();
function decodeJidCached(jid) {
  if (!jid) return jid;
  if (decodeCache.has(jid)) return decodeCache.get(jid);
  let decoded = jid;
  if (/:\d+@/gi.test(jid)) decoded = jidNormalizedUser(jid);
  if (typeof decoded === 'object' && decoded.user && decoded.server) decoded = `${decoded.user}@${decoded.server}`;
  if (decoded.endsWith('@lid')) decoded = decoded.replace('@lid', '@s.whatsapp.net');
  decodeCache.set(jid, decoded);
  return decoded;
}

const groupMetaCache = new Map();
const groupMetaTTL = 5 * 60 * 1000;
function setGroupMetaCache(id, meta) {
  groupMetaCache.set(id, { meta, ts: Date.now() });
}
function getGroupMetaCached(id) {
  const entry = groupMetaCache.get(id);
  if (!entry) return null;
  if (Date.now() - entry.ts > groupMetaTTL) {
    groupMetaCache.delete(id);
    return null;
  }
  return entry.meta;
}

console.info = () => {};

const connectionOptions = {
  logger: Pino({ level: 'silent' }),
  printQRInTerminal: opcion === '1',
  mobile: process.argv.includes('mobile'),
  browser: opcion === '1' ? ['ChatUnity', 'Edge', '20.0.04'] : ['Mac OS', 'Safari', '20.0.04'],
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: 'fatal' }).child({ level: 'fatal' })),
  },
  markOnlineOnConnect: false,
  generateHighQualityLinkPreview: false,
  syncFullHistory: false,
  defaultQueryTimeoutMs: 45000,
  getMessage: async (clave) => {
    try {
      const jid = decodeJidCached(clave.remoteJid);
      const msg = await store.loadMessage(jid, clave.id);
      return msg?.message || '';
    } catch {
      return '';
    }
  },
  msgRetryCounterCache,
  msgRetryCounterMap,
  decodeJid: decodeJidCached,
  version,
};

global.conn = makeWASocket(connectionOptions);

if (!existsSync(`./s/creds.json`)) {
  if (opcion === '2' || process.argv.includes('code')) {
    if (!conn.authState.creds.registered) {
      if (process.argv.includes('mobile')) throw new Error('Impossibile utilizzare un codice di accoppiamento con l\'API mobile');
      let numeroTelefono;
      if (!!global.botnumber) {
        numeroTelefono = global.botnumber.replace(/[^0-9]/g, '');
        if (!Object.keys(PHONENUMBER_MCC).some((v) => numeroTelefono.startsWith(v))) {
          console.log(chalk.bgBlack(chalk.bold.redBright('Inserisci un numero WhatsApp valido')));
          process.exit(0);
        }
      } else {
        while (true) {
          numeroTelefono = await question(chalk.bgBlack(chalk.bold.yellowBright('Inserisci numero WhatsApp (es. +39 333 333 3333)\n')));
          numeroTelefono = numeroTelefono.replace(/[^0-9]/g, '');

          if (numeroTelefono.match(/^\d+$/) && Object.keys(PHONENUMBER_MCC).some((v) => numeroTelefono.startsWith(v))) break;
          else console.log(chalk.bgBlack(chalk.bold.redBright('Numero non valido')));
        }
        rl.close();
      }
      setTimeout(async () => {
        let code = await conn.requestPairingCode(numeroTelefono, 'unitybot');
        code = code?.match(/.{1,4}/g)?.join('-') || code;
        console.log(chalk.yellowBright('Collega il tuo bot con questo codice:'));
        console.log(chalk.black(chalk.bgGreenBright(code)));
      }, 2000);
    }
  }
}

conn.isInit = false;
conn.well = false;

if (!opts['test']) {
  let pendingDBWrite = false;
  let lastWrite = 0;
  const minInterval = 8000;
  setInterval(async () => {
    try {
      if (!global.db?.data) return;
      const now = Date.now();
      if (pendingDBWrite || now - lastWrite >= minInterval) {
        pendingDBWrite = false;
        await global.db.write();
        lastWrite = now;
      }
    } catch {}
  }, 5000);
}

if (opts['server']) (await import('./server.js')).default(global.conn, PORT);

function clearTmp() {
  const tmp = [join(__dirname, './tmp')];
  const files = [];
  tmp.forEach((dirname) => {
    if (!existsSync(dirname)) return;
    readdirSync(dirname).forEach((file) => files.push(join(dirname, file)));
  });
  files.forEach((file) => {
    try {
      const stats = statSync(file);
      if (stats.isFile() && Date.now() - stats.mtimeMs >= 1000 * 60 * 3) unlinkSync(file);
    } catch {}
  });
}

function purgeSession() {
  try {
    if (!existsSync('./s')) return;
    const files = readdirSync('./s').filter((f) => f.startsWith('pre-key-'));
    for (const f of files) unlinkSync(`./s/${f}`);
  } catch {}
}

function purgeSessionSB() {
  try {
    if (!existsSync('./jadibts')) return;
    const dirs = readdirSync('./jadibts/').filter((d) => {
      try { return statSync(`./jadibts/${d}`).isDirectory(); } catch { return false; }
    });
    for (const d of dirs) {
      const files = readdirSync(`./jadibts/${d}`).filter((f) => f.startsWith('pre-key-'));
      for (const f of files) unlinkSync(`./jadibts/${d}/${f}`);
    }
  } catch {}
}

function purgeOldFiles() {
  const directories = ['./s/', './jadibts/'];
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  directories.forEach((dir) => {
    try {
      if (!existsSync(dir)) return;
      const files = readdirSync(dir);
      for (const file of files) {
        if (file === 'creds.json') continue;
        const filePath = path.join(dir, file);
        const stats = statSync(filePath);
        if (stats.isFile() && stats.mtimeMs < oneHourAgo) unlinkSync(filePath);
      }
    } catch {}
  });
}

async function connectionUpdate(update) {
  const { connection, lastDisconnect, isNewLogin } = update;
  global.stopped = connection;
  if (isNewLogin) conn.isInit = true;
  const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
  if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
    await global.reloadHandler(true).catch(() => {});
    global.timestamp.connect = new Date();
  }
  if (global.db.data == null) loadDatabase();
  if (update.qr && (opcion === '1' || methodCodeQR)) {
    console.log(chalk.yellow('Scansiona il QR, scade in 60 secondi.'));
  }
  if (connection === 'open') {
    console.log(chalk.green('\nChatUnity-Bot connesso\n'));
  }
  const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
  if (reason == 405) {
    try { unlinkSync('./s/creds.json'); } catch {}
    console.log(chalk.bold.redBright('Connessione sostituita, riavvio...'));
    if (process.send) process.send('reset');
  }
  if (connection === 'close') {
    if (reason === DisconnectReason.connectionClosed || reason === DisconnectReason.connectionLost || reason === DisconnectReason.restartRequired || reason === DisconnectReason.timedOut) {
      await global.reloadHandler(true).catch(() => {});
    } else if (reason === DisconnectReason.badSession || reason === DisconnectReason.loggedOut) {
      console.log(chalk.bold.redBright('Sessione non valida: elimina la cartella s e riconnetti.'));
    } else {
      await global.reloadHandler(true).catch(() => {});
    }
  }
}

process.on('uncaughtException', () => {});

let isInit = true;
let handler = await import('./handler.js');
global.reloadHandler = async function (restatConn) {
  try {
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(() => {});
    if (Handler && Object.keys(Handler).length) handler = Handler;
  } catch {}
  if (restatConn) {
    const oldChats = global.conn.chats;
    try { global.conn.ws.close(); } catch {}
    conn.ev.removeAllListeners();
    global.conn = makeWASocket(connectionOptions, { chats: oldChats });
    isInit = true;
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler);
    conn.ev.off('group-participants.update', conn.participantsUpdate);
    conn.ev.off('groups.update', conn.groupsUpdate);
    conn.ev.off('message.delete', conn.onDelete);
    conn.ev.off('call', conn.onCall);
    conn.ev.off('connection.update', conn.connectionUpdate);
    conn.ev.off('creds.update', conn.credsUpdate);
  }

  conn.welcome = '@user benvenuto/benvenuta in @subject';
  conn.bye = '@user ha abbandonato il gruppo';
  conn.sIcon = 'immagine gruppo modificata';
  conn.sRevoke = 'link reimpostato, nuovo link: @revoke';

  const origHandler = handler.handler.bind(global.conn);
  const origParticipantsUpdate = handler.participantsUpdate.bind(global.conn);
  const origGroupsUpdate = handler.groupsUpdate.bind(global.conn);
  const origOnDelete = handler.deleteUpdate.bind(global.conn);
  const origOnCall = handler.callUpdate.bind(global.conn);

  const upsertQueue = [];
  let upsertProcessing = false;
  let lastUpsertProcess = 0;
  const minUpsertInterval = 150;
  async function processUpsertQueue() {
    if (upsertProcessing) return;
    upsertProcessing = true;
    try {
      while (upsertQueue.length) {
        const now = Date.now();
        const wait = Math.max(0, minUpsertInterval - (now - lastUpsertProcess));
        if (wait) await new Promise((r) => setTimeout(r, wait));
        const evt = upsertQueue.shift();
        await origHandler(evt);
        lastUpsertProcess = Date.now();
      }
    } finally {
      upsertProcessing = false;
    }
  }

  conn.handler = (evt) => {
    upsertQueue.push(evt);
    processUpsertQueue();
  };

  const groupUpdateQueue = [];
  let groupUpdateProcessing = false;
  let lastGroupUpdateProcess = 0;
  const minGroupInterval = 300;
  async function processGroupUpdateQueue() {
    if (groupUpdateProcessing) return;
    groupUpdateProcessing = true;
    try {
      while (groupUpdateQueue.length) {
        const now = Date.now();
        const wait = Math.max(0, minGroupInterval - (now - lastGroupUpdateProcess));
        if (wait) await new Promise((r) => setTimeout(r, wait));
        const evt = groupUpdateQueue.shift();
        await origGroupsUpdate(evt);
        lastGroupUpdateProcess = Date.now();
      }
    } finally {
      groupUpdateProcessing = false;
    }
  }
  conn.groupsUpdate = (evt) => {
    groupUpdateQueue.push(evt);
    processGroupUpdateQueue();
  };

  conn.participantsUpdate = async (evt) => {
    await origParticipantsUpdate(evt);
  };

  conn.onDelete = async (evt) => {
    await origOnDelete(evt);
  };

  conn.onCall = async (evt) => {
    await origOnCall(evt);
  };

  conn.connectionUpdate = connectionUpdate.bind(global.conn);
  conn.credsUpdate = saveCreds.bind(global.conn, true);

  conn.getGroupMetadata = async (jid) => {
    const cached = getGroupMetaCached(jid);
    if (cached) return cached;
    const meta = await conn.groupMetadata(jid).catch(() => null);
    if (meta) setGroupMetaCache(jid, meta);
    return meta;
  };

  conn.ev.on('messages.upsert', conn.handler);
  conn.ev.on('group-participants.update', conn.participantsUpdate);
  conn.ev.on('groups.update', conn.groupsUpdate);
  conn.ev.on('message.delete', conn.onDelete);
  conn.ev.on('call', conn.onCall);
  conn.ev.on('connection.update', conn.connectionUpdate);
  conn.ev.on('creds.update', conn.credsUpdate);
  isInit = false;
  return true;
};

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'));
const pluginFilter = (filename) => /\.js$/.test(filename);
global.plugins = {};
async function filesInit() {
  for (const filename of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      const file = global.__filename(join(pluginFolder, filename));
      const module = await import(file);
      global.plugins[filename] = module.default || module;
    } catch {
      delete global.plugins[filename];
    }
  }
}
await filesInit();

global.reload = async (_ev, filename) => {
  if (!pluginFilter(filename)) return;
  const dir = global.__filename(join(pluginFolder, filename), true);
  if (filename in global.plugins) {
    if (!existsSync(dir)) return delete global.plugins[filename];
  }
  const err = syntaxerror(readFileSync(dir), filename, { sourceType: 'module', allowAwaitOutsideFunction: true });
  if (err) return;
  try {
    const module = await import(`${global.__filename(dir)}?update=${Date.now()}`);
    global.plugins[filename] = module.default || module;
  } catch {}
  finally {
    global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)));
  }
};
Object.freeze(global.reload);
watch(pluginFolder, global.reload);

async function _quickTest() {
  const bins = ['ffmpeg', 'ffprobe', 'convert', 'magick', 'gm', 'find'];
  const tests = await Promise.all(
    [
      spawn('ffmpeg'),
      spawn('ffprobe'),
      spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
      spawn('convert'),
      spawn('magick'),
      spawn('gm'),
      spawn('find', ['--version']),
    ].map((p) => {
      return Promise.race([
        new Promise((resolve) => p.on('close', (code) => resolve(code !== 127))),
        new Promise((resolve) => p.on('error', () => resolve(false))),
      ]);
    }),
  );
  const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = tests;
  const s = (global.support = { ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find });
  Object.freeze(global.support);
}
_quickTest().catch(() => {});

setInterval(async () => {
  if (global.stopped === 'close' || !conn || !conn.user) return;
  clearTmp();
}, 240000);

setInterval(async () => {
  if (global.stopped === 'close' || !conn || !conn.user) return;
  purgeSession();
}, 60 * 60 * 1000);

setInterval(async () => {
  if (global.stopped === 'close' || !conn || !conn.user) return;
  purgeSessionSB();
}, 60 * 60 * 1000);

setInterval(async () => {
  if (global.stopped === 'close' || !conn || !conn.user) return;
  purgeOldFiles();
}, 60 * 60 * 1000);
