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
import P from 'pino';
import pino from 'pino';
import Pino from 'pino';
import { Boom } from '@hapi/boom';
import { makeWASocket, protoType, serialize } from './lib/simple.js';
import { Low, JSONFile } from 'lowdb';
import { mongoDB, mongoDBV2 } from './lib/mongoDB.js';
import store from './lib/store.js';
const { proto } = (await import('@realvare/based')).default;
const { DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser, PHONENUMBER_MCC } = await import('@realvare/based');
import readline from 'readline';
import NodeCache from 'node-cache';
import MongoDBAdapter from './lib/MongoDBAdapter.js';
const { CONNECTING } = ws;
const { chain } = lodash;
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;

protoType();
serialize();

const sessionFolder = './s/';

async function autoClearSessions() {
  try {
    if (!existsSync(sessionFolder)) return;
    const sessionFiles = readdirSync(sessionFolder);
    for (const file of sessionFiles) {
      if (file !== 'creds.json') {
        unlinkSync(path.join(sessionFolder, file));
      }
    }
  } catch { }
}

setInterval(autoClearSessions, 120000);

global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
  return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString();
}; 
global.__dirname = function dirname(pathURL) {
  return path.dirname(global.__filename(pathURL, true));
}; 
global.__require = function require(dir = import.meta.url) {
  return createRequire(dir);
};

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({...query, ...(apikeyqueryname ? {[apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]} : {})})) : '');

global.timestamp = {start: new Date};
global.videoList = [];
global.videoListXXX = [];

const __dirname = global.__dirname(import.meta.url);

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
global.prefix = new RegExp('^[' + (opts['prefix'] || '*/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-.@').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');

if (opts['db'] && opts['db'] === 'mongodb') {
    global.db = new Low(new MongoDBAdapter('mongodb://192.168.1.112:27017', 'botDB', 'shared_data'));
} else if (/https?:\/\//.test(opts['db'] || '')) {
    global.db = new Low(new cloudDBAdapter(opts['db']));
} else {
    global.db = new Low(new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`));
}

global.DATABASE = global.db; 
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise((resolve) => setInterval(async function() {
      if (!global.db.READ) {
        clearInterval(this);
        resolve(global.db.data == null ? global.loadDatabase() : global.db.data);
      }
    }, 1 * 1000));
  }
  if (global.db.data !== null) return;
  global.db.READ = true;
  await global.db.read().catch(console.error);
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
  global.db.chain = chain(global.db.data);
};
loadDatabase();

global.chatgpt = new Low(new JSONFile(path.join(__dirname, '/db/chatgpt.json')));
global.loadChatgptDB = async function loadChatgptDB() {
  if (global.chatgpt.READ) {
    return new Promise((resolve) =>
      setInterval(async function() {
        if (!global.chatgpt.READ) {
          clearInterval(this);
          resolve( global.chatgpt.data === null ? global.loadChatgptDB() : global.chatgpt.data );
        }
      }, 1 * 1000));
  }
  if (global.chatgpt.data !== null) return;
  global.chatgpt.READ = true;
  await global.chatgpt.read().catch(console.error);
  global.chatgpt.READ = null;
  global.chatgpt.data = {
    users: {},
    ...(global.chatgpt.data || {}),
  };
  global.chatgpt.chain = lodash.chain(global.chatgpt.data);
};
loadChatgptDB();

global.authFile = `s`;
const {state, saveState, saveCreds} = await useMultiFileAuthState(global.authFile);
const msgRetryCounterMap = (MessageRetryMap) => { };
const msgRetryCounterCache = new NodeCache()
const {version} = await fetchLatestBaileysVersion();
let phoneNumber = global.botnumber

const methodCodeQR = process.argv.includes("qr")
const methodCode = !!phoneNumber || process.argv.includes("code")
const MethodMobile = process.argv.includes("mobile")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (texto) => new Promise((resolver) => rl.question(texto, resolver))
let opcion
if (methodCodeQR) {
  opcion = '1'
}
if (!methodCodeQR && !methodCode && !fs.existsSync(`./${authFile}/creds.json`)) {
  do {
    opcion = await question(`
╭★────★────★────★────★────★
|ㅤㅤㅤㅤㅤㅤㅤ꒰¡${chalk.blue.bold.cyan('METODO DI COLLEGAMENTO')}!꒱
|˚₊꒷ 👾 ꒱ ฅ﹕${chalk.bold.redBright(`Opzione 1:`)} ${chalk.greenBright('Codice QR')} ₊˚๑
|˚₊꒷ ☁️ ꒱ ฅ﹕${chalk.bold.redBright(`Opzione 2:`)} ${chalk.greenBright('Codice 8 caratteri')} ₊˚๑
╰★────★────★────★────★────★

${chalk.bold.magentaBright('---> ')}`);
    if (!/^[1-2]$/.test(opcion)) {
      console.log(chalk.bold.redBright('\n꒰🩸꒱ Opzione non valida. Inserisci solo 1 o 2.\n'));
    }
  } while (opcion !== '1' && opcion !== '2' || fs.existsSync(`./${authFile}/creds.json`))
}

console.info = () => {}
const connectionOptions = {
  logger: pino({ level: 'silent' }),
  printQRInTerminal: opcion == '1' ? true : methodCodeQR ? true : false,
  mobile: MethodMobile, 
  browser: opcion == '1' ? ['𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲 (lavoro)', 'Edge', '20.0.04'] : methodCodeQR ? ['𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲 (lavoro)', 'Edge', '20.0.04'] : ["Mac OS", "Safari", "20.0.04"],
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
  },
  markOnlineOnConnect: true, 
  generateHighQualityLinkPreview: true, 
  syncFullHistory: true,  
  defaultQueryTimeoutMs: 60000,
  getMessage: async (clave) => {
    let jid = jidNormalizedUser(clave.remoteJid)
    let msg = await store.loadMessage(jid, clave.id)
    return msg?.message || ""
  },
  msgRetryCounterCache,
  msgRetryCounterMap,
  decodeJid: (jid) => {
    if (!jid) return jid;
    let decoded = jid;
    if (/:\d+@/gi.test(jid)) {
      decoded = jidNormalizedUser(jid);
    }
    if (typeof decoded === 'object' && decoded.user && decoded.server) {
      decoded = `${decoded.user}@${decoded.server}`;
    }
    if (decoded.endsWith('@lid')) {
      decoded = decoded.replace('@lid', '@s.whatsapp.net');
    }
    return decoded;
  },
  version,  
}

global.conn = makeWASocket(connectionOptions);

if (!fs.existsSync(`./${authFile}/creds.json`)) {
  if (opcion === '2' || methodCode) {
    opcion = '2'
    if (!conn.authState.creds.registered) {  
      if (MethodMobile) throw new Error(`Impossibile utilizzare un codice di accoppiamento con l'API mobile`)
      let numeroTelefono
      if (!!phoneNumber) {
        numeroTelefono = phoneNumber.replace(/[^0-9]/g, '')
        if (!Object.keys(PHONENUMBER_MCC).some(v => numeroTelefono.startsWith(v))) {
          console.log(chalk.bgBlack(chalk.bold.redBright(`\n꒰🩸꒱ Inserisci il numero di telefono WhatsApp\nEsempio: +39 333 333 3333\n`)))
          process.exit(0)
        }
      } else {
        while (true) {
          numeroTelefono = await question(chalk.bgBlack(chalk.bold.yellowBright(`\n┊ ┊ ┊ Inserisci il numero di telefono WhatsApp\n┊ ┊ ┊ Esempio: +39 333 333 3333\n`)))
          numeroTelefono = numeroTelefono.replace(/[^0-9]/g, '')
          if (numeroTelefono.match(/^\d+$/) && Object.keys(PHONENUMBER_MCC).some(v => numeroTelefono.startsWith(v))) {
            break 
          } else {
            console.log(chalk.bgBlack(chalk.bold.redBright(`\n꒰🩸꒱ Numero non valido. Riprova.\n`)))
          }
        }
        rl.close()  
      } 
      setTimeout(async () => {
        let codigo = await conn.requestPairingCode(numeroTelefono, 'unitybot')
        codigo = codigo?.match(/.{1,4}/g)?.join("-") || codigo
        console.log(`
╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ${chalk.yellowBright('Collega il tuo bot...')}
  ━━✫ ${chalk.black.bgCyanBright('CODICE:')} ${chalk.black.bgGreenBright(codigo)}
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
`)
      }, 3000)
  }}
}

conn.isInit = false;
conn.well = false;
console.log(chalk.yellowBright(`\n· ୨୧ · · ୨୧ · Caricamento in corso... · ୨୧ · · ୨୧ ·\n`));

if (!opts['test']) {
  if (global.db) {
    setInterval(async () => {
      if (global.db.data) await global.db.write();
      if (opts['autocleartmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'tmp', 'jadibts'], tmp.forEach((filename) => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])));
    }, 10 * 1000);
  }
}

if (opts['server']) (await import('./server.js')).default(global.conn, PORT);

function clearTmp() {
  const tmp = [join(__dirname, './tmp')];
  const filename = [];
  tmp.forEach((dirname) => readdirSync(dirname).forEach((file) => filename.push(join(dirname, file))));
  return filename.map((file) => {
    const stats = statSync(file);
    if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 3)) return unlinkSync(file);
    return false;
  });
}

function purgeSession() {
  let prekey = []
  let directorio = readdirSync("./s")
  let filesFolderPreKeys = directorio.filter(file => {
    return file.startsWith('pre-key-')
  })
  prekey = [...prekey, ...filesFolderPreKeys]
  filesFolderPreKeys.forEach(files => {
    unlinkSync(`./s/${files}`)
  })
} 

function purgeSessionSB() {
  try {
    let listaDirectorios = readdirSync('./jadibts/');
    let SBprekey = []
    listaDirectorios.forEach(directorio => {
      if (statSync(`./jadibts/${directorio}`).isDirectory()) {
        let DSBPreKeys = readdirSync(`./jadibts/${directorio}`).filter(fileInDir => {
          return fileInDir.startsWith('pre-key-')
        })
        SBprekey = [...SBprekey, ...DSBPreKeys]
        DSBPreKeys.forEach(fileInDir => {
          unlinkSync(`./jadibts/${directorio}/${fileInDir}`)
        })
      }
    })
    if (SBprekey.length === 0) return;
  } catch (err) {
    console.log(chalk.bold.red(`\n꒰🩸꒱ Errore durante l'eliminazione dei file\n`))
  }
}

function purgeOldFiles() {
  const directories = ['./s/', './jadibts/']
  const oneHourAgo = Date.now() - (60 * 60 * 1000)
  directories.forEach(dir => {
    readdirSync(dir, (err, files) => {
      if (err) throw err
      files.forEach(file => {
        const filePath = path.join(dir, file)
        stat(filePath, (err, stats) => {
          if (err) throw err;
          if (stats.isFile() && stats.mtimeMs < oneHourAgo && file !== 'creds.json') { 
            unlinkSync(filePath, err => {  
              if (err) throw err
            })
          }
        }) 
      }) 
    }) 
  })
}

async function connectionUpdate(update) {
  const {connection, lastDisconnect, isNewLogin} = update;
  global.stopped = connection;
  if (isNewLogin) conn.isInit = true;
  const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
  if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
    await global.reloadHandler(true).catch(console.error);
    global.timestamp.connect = new Date;
  }
  if (global.db.data == null) loadDatabase();
  if (update.qr != 0 && update.qr != undefined || methodCodeQR) {
    if (opcion == '1' || methodCodeQR) {
      console.log(`
┊ ┊ ┊ ┊‿ ˚➶ ｡˚
┊ ┊ ┊ ┊. ➶ ˚
┊ ┊ ┊ ˚✧ ${chalk.yellow('Scansiona questo codice QR')}
┊ ˚➶ ｡˚ ☁︎ ${chalk.gray('Scade tra 60 secondi')}
`);
    }
  }
  if (connection == 'open') {
    try {
      await conn.groupAcceptInvite('FjPBDj4sUgFLJfZiLwtTvk');
    } catch (error) {
      console.error('Error accepting group invite:', error.message);
      if (error.data === 401) {
        console.error('Authorization error: Please check your credentials or session.');
      } else {
        console.error('Unexpected error:', error);
      }
    }
    console.log(chalk.green(`
╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩
    ChatUnity-Bot connesso ✅️
╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩
`))
  }
  let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
  if (reason == 405) {
    await fs.unlinkSync("./s/" + "creds.json")
    console.log(chalk.bold.redBright(`
꒰🩸꒱ ◦•≫ Connessione sostituita
 ★・・・・・・・★
  Riavvio in corso...
 ★・・・・・・・★
`)) 
    process.send('reset')
  }
  if (connection === 'close') {
    if (reason === DisconnectReason.badSession) {
      conn.logger.error(chalk.red(`
꒰🩸꒱ ◦•≫ Sessione errata
 ★・・・・・・・★
  Elimina la cartella ${global.authFile}
  ed esegui nuovamente la scansione
 ★・・・・・・・★
`));
    } else if (reason === DisconnectReason.connectionClosed) {
      conn.logger.warn(chalk.yellow(`
┊ ┊ ┊ ˚✧ Connessione chiusa
┊ ˚➶ ｡˚ ☁︎ Riconnessione in corso...
`));
      await global.reloadHandler(true).catch(console.error);
    } else if (reason === DisconnectReason.connectionLost) {
      conn.logger.warn(chalk.yellow(`
┊ ┊ ┊ ˚✧ Connessione persa al server
┊ ˚➶ ｡˚ ☁︎ Riconnessione in corso...
`));
      await global.reloadHandler(true).catch(console.error);
    } else if (reason === DisconnectReason.connectionReplaced) {
      conn.logger.error(chalk.red(`
꒰🩸꒱ ◦•≫ Connessione sostituita
 ★・・・・・・・★
  È stata aperta un'altra nuova sessione
  Disconnettiti dalla sessione corrente
 ★・・・・・・・★
`));
    } else if (reason === DisconnectReason.loggedOut) {
      conn.logger.error(chalk.red(`
꒰🩸꒱ ◦•≫ Connessione chiusa
 ★・・・・・・・★
  Elimina la cartella ${global.authFile}
  ed esegui nuovamente la scansione
 ★・・・・・・・★
`));
    } else if (reason === DisconnectReason.restartRequired) {
      conn.logger.info(chalk.cyan(`
╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ Riavvio richiesto
  ━━✫ Riavviare il server in caso di problemi
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
`));
      await global.reloadHandler(true).catch(console.error);
    } else if (reason === DisconnectReason.timedOut) {
      conn.logger.warn(chalk.yellow(`
┊ ┊ ┊ ˚✧ Connessione scaduta
┊ ˚➶ ｡˚ ☁︎ Riconnessione in corso...
`));
      await global.reloadHandler(true).catch(console.error);
    } else {
      conn.logger.warn(chalk.yellow(`
┊ ┊ ┊ ˚✧ Motivo disconnessione sconosciuto
┊ ˚➶ ｡˚ ☁︎ ${reason || ''}: ${connection || ''}
`));
      await global.reloadHandler(true).catch(console.error);
    }
  }
}

process.on('uncaughtException', console.error);

const maxConcurrentMessages = 1;
let runningMessages = 0;
const messageQueue = [];

async function rateLimitedMessageHandler(m) {
  return new Promise((resolve) => {
    messageQueue.push({ m, resolve });
    processNextMessage();
  });
}

function processNextMessage() {
  if (runningMessages >= maxConcurrentMessages || messageQueue.length === 0) return;
  runningMessages++;
  const { m, resolve } = messageQueue.shift();
  (async () => {
    try {
      await handler.handler.call(global.conn, m);
    } catch (error) {
      console.error('Error in message handler:', error);
    }
    setTimeout(() => {
      runningMessages--;
      processNextMessage();
    }, 500);
    resolve();
  })();
}

let isInit = true;
let handler = await import('./handler.js');
global.reloadHandler = async function(restatConn) {
  try {
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error);
    if (Object.keys(Handler || {}).length) handler = Handler;
  } catch (e) {
    console.error(e);
  }
  if (restatConn) {
    const oldChats = global.conn.chats;
    try {
      global.conn.ws.close();
    } catch { }
    conn.ev.removeAllListeners();
    global.conn = makeWASocket(connectionOptions, {chats: oldChats});
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

conn.welcome = `
╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ Benvenuto/a @user!
  ━━✫ Gruppo: @subject
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
`

conn.bye = `
┊ ┊ ┊ ┊‿ ˚➶ ｡˚
┊ ┊ ┊ ┊. ➶ ˚
┊ ┊ ┊ ˚✧ @user ha abbandonato il gruppo
┊ ˚➶ ｡˚ ☁︎ Ci mancherai!
`

conn.sIcon = `
⋆ ︵︵ ★ AGGIORNAMENTO GRUPPO ★ ︵︵ ⋆
  ୧・ Immagine gruppo modificata
`

conn.sRevoke = `
╭★────★────★────★────★────★
|ㅤㅤㅤㅤㅤㅤㅤ꒰¡LINK REIMPOSTATO!꒱
|˚₊꒷ 🔗 ꒱ ฅ﹕Nuovo link: @revoke ₊˚๑
╰★────★────★────★────★────★
`


  conn.handler = rateLimitedMessageHandler;
  conn.participantsUpdate = handler.participantsUpdate.bind(global.conn);
  conn.groupsUpdate = handler.groupsUpdate.bind(global.conn);
  conn.onDelete = handler.deleteUpdate.bind(global.conn);
  conn.onCall = handler.callUpdate.bind(global.conn);
  conn.connectionUpdate = connectionUpdate.bind(global.conn);
  conn.credsUpdate = saveCreds.bind(global.conn, true);

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
    } catch (e) {
      conn.logger.error(e);
      delete global.plugins[filename];
    }
  }
}
filesInit().then((_) => Object.keys(global.plugins)).catch(console.error);

global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    const dir = global.__filename(join(pluginFolder, filename), true);
    if (filename in global.plugins) {
      if (existsSync(dir)) conn.logger.info(` updated plugin - '${filename}'`);
      else {
        conn.logger.warn(`deleted plugin - '${filename}'`);
        return delete global.plugins[filename];
      }
    } else conn.logger.info(`new plugin - '${filename}'`);
    const err = syntaxerror(readFileSync(dir), filename, {
      sourceType: 'module',
      allowAwaitOutsideFunction: true,
    });
    if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`);
    else {
      try {
        const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`));
        global.plugins[filename] = module.default || module;
      } catch (e) {
        conn.logger.error(`error require plugin '${filename}\n${format(e)}'`);
      } finally {
        global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)));
      }
    }
  }
};
Object.freeze(global.reload);
watch(pluginFolder, global.reload);
await global.reloadHandler();
async function _quickTest() {
  const test = await Promise.all([
    spawn('ffmpeg'),
    spawn('ffprobe'),
    spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    spawn('convert'),
    spawn('magick'),
    spawn('gm'),
    spawn('find', ['--version']),
  ].map((p) => {
    return Promise.race([
      new Promise((resolve) => {
        p.on('close', (code) => {
          resolve(code !== 127);
        });
      }),
      new Promise((resolve) => {
        p.on('error', (_) => resolve(false));
      })]);
  }));
  const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
  const s = global.support = {ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find};
  Object.freeze(global.support);
}
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return;
  const a = await clearTmp();
  console.log(chalk.cyanBright(`
╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ AUTOCLEARTMP
  ━━✫ Archivi eliminati con successo ✅
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
`));
}, 180000);
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return;
  await purgeSession();
  console.log(chalk.cyanBright(`
╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ AUTO ELIMINAZIONE SESSIONI
  ━━✫ Archivi eliminati con successo ✅
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
`));
}, 1000 * 60 * 60);
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return;
  await purgeSessionSB();
  console.log(chalk.cyanBright(`
╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ AUTO ELIMINAZIONE SESSIONI SUB-BOTS
  ━━✫ Archivi eliminati con successo ✅
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
`));
}, 1000 * 60 * 60);
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return;
  await purgeOldFiles();
  console.log(chalk.cyanBright(`
╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ AUTO ELIMINAZIONE OLDFILES
  ━━✫ Archivi eliminati con successo ✅
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
`));
}, 1000 * 60 * 60);
_quickTest().catch(console.error);