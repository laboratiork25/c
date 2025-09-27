import {
  useMultiFileAuthState,
  DisconnectReason,
  makeCacheableSignalKeyStore,
  fetchLatestBaileysVersion
} from '@whiskeysockets/baileys';

import qrcode from 'qrcode';
import NodeCache from 'node-cache';
import fs from 'fs';
import path from 'path';
import pino from 'pino';
import * as ws from 'ws';
const { CONNECTING } = ws;

import { makeWASocket } from '../lib/simple.js';

const JADI_DIR = 'jadibts';
const CMD_NAME = ['collegabot', 'jadibot'];
const TAGS = ['serbot'];
const HELP = ['serbot'];
const PRIVATE_ONLY = true;

// Cornici e branding
const TOP = '⊹ ︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶ ⊹';
const SEP = '︶︶︶ ୨♡୧ ︶︶︶';
const BOTNAME = 'chatunity-bot';

// Didascalie con nuova grafica
const CAPTION_QR = `${TOP}
🚀 SUB-BOT: ${BOTNAME}

${SEP}

ⓘ Con un altro cellulare o PC, scansiona questo QR per diventare un SubBot

1. Toccare i tre puntini in alto a destra
2. Aprire “Dispositivi collegati”
3. Scansionare questo QR per accedere

${SEP}

⚠️ Il QR scade tra 45 secondi

${TOP}`;

const CAPTION_CODE = `${TOP}
🚀 SUB-BOT: ${BOTNAME}

${SEP}

ⓘ Usa questo codice per diventare un SubBot

1. Toccare i tre puntini in alto a destra
2. Aprire “Dispositivi collegati”
3. Selezionare “Collega con numero di telefono”
4. Inserire il codice mostrato

${SEP}

⚠️ Esegui il comando dal numero del bot da usare come sub-bot

${TOP}`;

if (!(global.conns instanceof Array)) global.conns = [];

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// Ripara JSON corrotto troncatandolo alla penultima graffa
function tryRepairJsonFile(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    try {
      JSON.parse(raw);
      return true; // già valido
    } catch {}
    // tenta riparazione semplice
    const last = raw.lastIndexOf('}');
    if (last > 0) {
      const raw2 = raw.slice(0, last + 1);
      JSON.parse(raw2); // valida
      fs.writeFileSync(filePath, raw2, 'utf-8');
      return true;
    }
  } catch {}
  return false;
}

function getUserDirFromMessage(m, conn) {
  const targetJid = (m.mentionedJid && m.mentionedJid[0])
    ? m.mentionedJid[0]
    : (m.fromMe ? conn.user?.jid : m.sender);
  const bare = String((targetJid || '').split('@')[0] || '');
  const userDir = path.join('./', JADI_DIR, bare);
  return { bare, userDir };
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
  // Rileva se richiesta modalità pairing code
  const wantCode =
    (args[0] && /(^--code$|^code$)/.test(args[0].trim())) ||
    (args[1] && /(^--code$|^code$)/.test(args[1].trim())) || false;

  // Pulisci flag
  if (wantCode) {
    if (args[0]) args[0] = args[0].replace(/^--code$|^code$/,'').trim() || undefined;
    if (args[1]) args[1] = args[1].replace(/^--code$|^code$/,'').trim() || undefined;
  }

  // Prepara cartella e creds
  const { bare, userDir } = getUserDirFromMessage(m, conn);
  if (!bare) return m.reply(`${TOP}\nFormato utente non valido.\n${TOP}`);
  if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });

  const credsPath = path.join(userDir, 'creds.json');

  // Se passato un base64 in args[0], scrivilo
  if (args[0] && args[0] !== undefined) {
    try {
      const json = JSON.stringify(
        JSON.parse(Buffer.from(args[0], 'base64').toString('utf-8')),
        null,
        '\t'
      );
      fs.writeFileSync(credsPath, json, 'utf-8');
    } catch {
      // ignora creds base64 invalido
    }
  }

  // Se esiste creds.json corrotto, prova riparazione; se registered === false, elimina
  if (fs.existsSync(credsPath)) {
    tryRepairJsonFile(credsPath);
    try {
      const j = JSON.parse(fs.readFileSync(credsPath, 'utf-8'));
      if (j && j.registered === false) fs.unlinkSync(credsPath);
    } catch {
      // se ancora invalido, rimuovi per evitare loop
      try { fs.unlinkSync(credsPath); } catch {}
    }
  }

  // Avvio sub-socket
  async function startSubBot() {
    const { version } = await fetchLatestBaileysVersion();
    const logger = pino({ level: 'silent' });
    const msgRetryCache = new NodeCache();

    const { state, saveCreds } = await useMultiFileAuthState(userDir);

    const sockConfig = {
      printQRInTerminal: false,
      logger,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, logger)
      },
      msgRetry: () => {},
      msgRetryCache,
      // ricevere più history come desktop
      syncFullHistory: true,
      // Browser config: QR -> desktop; PairingCode -> Windows/Chrome 114 (workaround)
      browser: wantCode
        ? ['Windows', 'Chrome', '114.0.5735.198']
        : [`${BOTNAME} (Sub Bot)`, 'Chrome', '2.0.0'],
      // usare la versione rilevata di Baileys
      version,
      defaultQueryTimeoutMs: undefined,
      getMessage: async () => ({ conversation: 'Lettura del messaggio in arrivo:' })
    };

    let sock = makeWASocket(sockConfig);
    sock.isInit = false;

    const closeAndRemove = () => {
      try { sock.ws.close(); } catch {}
      try { sock.ev.removeAllListeners(); } catch {}
      const idx = global.conns.indexOf(sock);
      if (idx >= 0) {
        delete global.conns[idx];
        global.conns.splice(idx, 1);
      }
    };

    const waitWsOpen = async (timeoutMs = 15000) => {
      const start = Date.now();
      while (Date.now() - start < timeoutMs) {
        if (sock?.ws && sock.ws.readyState === ws.OPEN) return true;
        await sleep(200);
      }
      return false;
    };

    async function onConnectionUpdate(update) {
      const { connection, lastDisconnect, isNewLogin, qr } = update;
      if (isNewLogin) sock.isInit = false;

      // QR
      if (qr && !wantCode) {
        try {
          const img = await qrcode.toBuffer(qr, { scale: 8 });
          await conn.sendMessage(m.chat, { image: img, caption: CAPTION_QR }, { quoted: m });
        } catch {}
      }

      // Pairing code
      if ((connection === 'connecting' || qr) && wantCode && !sock.authState.creds.registered) {
        try {
          await conn.sendMessage(m.chat, { text: CAPTION_CODE }, { quoted: m });
          await sleep(1500);
          const wsReady = await waitWsOpen(10000);
          if (!wsReady) throw new Error('Socket non pronto per pairing code');
          const phone = String(m.sender.split('@')[0]).replace(/\D/g, ''); // E.164 senza +
          if (!phone) throw new Error('Numero non valido');
          const code = await sock.requestPairingCode(phone);
          await conn.sendMessage(m.chat, { text: `${TOP}\n${code}\n${TOP}` }, { quoted: m });
        } catch (e) {
          await m.reply(`${TOP}\nImpossibile generare il codice di abbinamento, riprovare.\n${TOP}`);
        }
      }

      const statusCode =
        lastDisconnect?.error?.output?.statusCode ??
        lastDisconnect?.error?.output?.payload?.statusCode;

      if (connection === 'close') {
        if (statusCode === DisconnectReason.restartRequired) {
          await sleep(1500);
          return startSubBot();
        }
        if (statusCode === DisconnectReason.timedOut) {
          await sleep(2500);
          await m.reply(`${TOP}\n⌛ Connessione scaduta, riconnessione in corso...\n${TOP}`);
          return startSubBot();
        }
        if (statusCode === DisconnectReason.connectionLost) {
          await sleep(1500);
          return startSubBot();
        }
        if (statusCode === DisconnectReason.connectionClosed || statusCode === 428) {
          await sleep(1500);
          return startSubBot();
        }
        if (statusCode === DisconnectReason.loggedOut || statusCode === 401 || statusCode === 0x195) {
          if (fs.existsSync(credsPath)) {
            const repaired = tryRepairJsonFile(credsPath);
            if (!repaired) {
              try { fs.unlinkSync(credsPath); } catch {}
            }
          }
          closeAndRemove();
          await m.reply(`${TOP}\nSessione non valida o scaduta. Eseguire nuovamente il comando per riconnettere.\n${TOP}`);
          return;
        }
        console.log('Chiusura inattesa: code=', statusCode);
        await sleep(1500);
        return startSubBot();
      }

      if (connection === 'open') {
        sock.isInit = true;
        global.conns.push(sock);
        try {
          if (typeof joinChannels === 'function') await joinChannels(sock);
        } catch {}
        await conn.sendMessage(
          m.chat,
          {
            text: args[0]
              ? `${TOP}\nⓘ Sei connesso!! Per favore attendi, i messaggi sono in caricamento...\n${TOP}`
              : `${TOP}\n✅ Connesso con successo!! Usa ${usedPrefix + command} per collegare altri sub-bot\n${TOP}`
          },
          { quoted: m }
        );

        // invia backup creds in base64 se non forniti in input
        try {
          if (!args[0] && fs.existsSync(credsPath)) {
            const b64 = Buffer.from(fs.readFileSync(credsPath, 'utf-8')).toString('base64');
            await conn.sendMessage(m.chat, { text: `${usedPrefix + command} ${b64}` }, { quoted: m });
          }
        } catch {}
      }
    }

    // Sanity timer: se user sparisce, rimuovi
    const sanity = setInterval(() => {
      if (!sock?.user || sock.ws?.readyState === ws.CLOSED) {
        try { sock.ws?.close(); } catch {}
        try { sock.ev?.removeAllListeners(); } catch {}
        const idx = global.conns.indexOf(sock);
        if (idx >= 0) {
          delete global.conns[idx];
          global.conns.splice(idx, 1);
        }
      }
    }, 60000);

    // Wire listeners
    sock.ev.on('connection.update', onConnectionUpdate);
    sock.ev.on('creds.update', saveCreds);
    sock.ev.on('messages.upsert', async (ev) => {
      try {
        const mod = await import('../handler.js?update=' + Date.now());
        if (mod?.handler) await mod.handler.call(sock, ev);
      } catch {}
    });
  }

  await startSubBot();
};

handler.command = CMD_NAME;
handler.tags = TAGS;
handler.help = HELP;
handler.private = PRIVATE_ONLY;

export default handler;
