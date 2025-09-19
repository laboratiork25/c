import baileys from '@whiskeysockets/baileys';
const {
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  MessageRetryMap,
  makeCacheableSignalKeyStore,
  jidNormalizedUser
} = baileys;

import moment from 'moment-timezone';
import NodeCache from 'node-cache';
import qrcode from 'qrcode';
import crypto from 'crypto';
import fs from 'fs';
import pino from 'pino';
import * as ws from 'ws';
const { CONNECTING } = ws;
import { Boom } from '@hapi/boom';
import { makeWASocket } from '../lib/simple.js';
import '../lib/language.js';

if (!(global.conns instanceof Array)) global.conns = [];

let handler = async (m, { conn: _conn, args, usedPrefix, command }) => {

  
  let parent = args[0] && args[0] === 'plz' ? _conn : await global.conn;

  async function serbot() {
    let authFolderB = m.sender.split('@')[0];
    const userFolderPath = `./subbot/${authFolderB}`;

    if (!fs.existsSync(userFolderPath)) {
      fs.mkdirSync(userFolderPath, { recursive: true });
    }

    if (args[0]) {
      fs.writeFileSync(
        `${userFolderPath}/creds.json`,
        JSON.stringify(JSON.parse(Buffer.from(args[0], 'base64').toString('utf-8')), null, '\t')
      );
    }

    const { state, saveCreds } = await useMultiFileAuthState(userFolderPath);
    const msgRetryCounterCache = new NodeCache();
    const { version } = await fetchLatestBaileysVersion();
    let phoneNumber = m.sender.split('@')[0];

    const methodCode = !!phoneNumber || process.argv.includes('code');
    const MethodMobile = process.argv.includes('mobile');

    const connectionOptions = {
      logger: pino({ level: 'silent' }),
      printQRInTerminal: false,
      mobile: MethodMobile,
      browser: ['Ubuntu', 'Chrome', '20.0.04'],
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }).child({ level: 'fatal' }))
      },
      markOnlineOnConnect: true,
      generateHighQualityLinkPreview: true,
      getMessage: async (clave) => {
        let jid = jidNormalizedUser(clave.remoteJid);
        let msg = await store.loadMessage(jid, clave.id);
        return msg?.message || '';
      },
      msgRetryCounterCache,
      msgRetryCounterMap: MessageRetryMap,
      version
    };

    let conn = makeWASocket(connectionOptions);

    if (methodCode && !conn.authState.creds.registered) {
      if (!phoneNumber) return;

      let cleanedNumber = phoneNumber.replace(/[^0-9]/g, '');
      let codeBot = await conn.requestPairingCode(cleanedNumber);
      codeBot = codeBot?.match(/.{1,4}/g)?.join('-') || codeBot;

      let txt = `┌  🜲  *Usa questo codice per diventare un Sub Bot*\n`
      txt += `│  ❀  Passi\n`
      txt += `│  ❀  *1* : Clicca sui 3 puntini\n`
      txt += `│  ❀  *2* : Tocca dispositivi collegati\n`
      txt += `│  ❀  *3* : Seleziona *Collega con il numero di telefono*\n`
      txt += `└  ❀  *4* : Scrivi il Codice\n\n`
      txt += `*❖ Nota:* Questo codice funziona solo sul numero in cui è stato richiesto`;

      await parent.reply(m.chat, txt, m);
      await parent.reply(m.chat, codeBot, m);
    }

    conn.isInit = false;
    let isInit = true;

    async function connectionUpdate(update) {
      const { connection, lastDisconnect, isNewLogin } = update;
      if (isNewLogin) conn.isInit = true;

      const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;

      if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
        let i = global.conns.indexOf(conn);
        if (i >= 0) {
          delete global.conns[i];
          global.conns.splice(i, 1);
        }
        fs.rmdirSync(userFolderPath, { recursive: true });
        if (code !== DisconnectReason.connectionClosed) {
          parent.sendMessage(m.chat, { text: 'Conexión perdida..' }, { quoted: m });
        }
      }

      if (global.db.data == null) loadDatabase();

      if (connection === 'open') {
        conn.isInit = true;
        global.conns.push(conn);
        await parent.reply(m.chat, args[0] ? 'Conectado con éxito' : `❀ Connesso con successo a WhatsApp. La prossima volta usa *#delsesion* o *#code* per riconnetterti.\n\n> ${dev}`, m);
        await sleep(5000);
        if (args[0]) return;

        await parent.reply(conn.user.jid, `La prossima volta invia questo messaggio per accedere senza usare un altro codice:`, m);
        await parent.sendMessage(conn.user.jid, {
          text: usedPrefix + command + ' ' + Buffer.from(fs.readFileSync(`./subbot/${authFolderB}/creds.json`), 'utf-8').toString('base64')
        }, { quoted: m });
      }
    }

    setInterval(async () => {
      if (!conn.user) {
        try { conn.ws.close(); } catch { }
        conn.ev.removeAllListeners();
        let i = global.conns.indexOf(conn);
        if (i >= 0) {
          delete global.conns[i];
          global.conns.splice(i, 1);
        }
      }
    }, 60000);

    let handler = await import('../handler.js');
    let creloadHandler = async function (restatConn) {
      try {
        const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error);
        if (Object.keys(Handler || {}).length) handler = Handler;
      } catch (e) {
        console.error(e);
      }
      if (restatConn) {
        try { conn.ws.close(); } catch { }
        conn.ev.removeAllListeners();
        conn = makeWASocket(connectionOptions);
        isInit = true;
      }

      if (!isInit) {
        conn.ev.off('messages.upsert', conn.handler);
        conn.ev.off('connection.update', conn.connectionUpdate);
        conn.ev.off('creds.update', conn.credsUpdate);
      }

      conn.handler = handler.handler.bind(conn);
      conn.connectionUpdate = connectionUpdate.bind(conn);
      conn.credsUpdate = saveCreds.bind(conn, true);

      conn.ev.on('messages.upsert', conn.handler);
      conn.ev.on('connection.update', conn.connectionUpdate);
      conn.ev.on('creds.update', conn.credsUpdate);
      isInit = false;
      return true;
    };

    creloadHandler(false);
  }

  serbot();
};

handler.command = ['code', 'Code', 'serbot'];
handler.rowner = false;

export default handler;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
