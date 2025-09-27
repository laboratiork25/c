import {
  useMultiFileAuthState,
  DisconnectReason,
  makeCacheableSignalKeyStore,
  fetchLatestBaileysVersion
} from '@realvare/based'
import qrcode from 'qrcode'
import NodeCache from 'node-cache'
import fs from 'fs'
import path from 'path'
import pino from 'pino'
import * as ws from 'ws'
import { makeWASocket } from '../lib/simple.js'

const JADI_DIR = 'jadibts'
const CMD_NAME = ['collegabot', 'jadibot']
const TAGS = ['serbot']
const HELP = ['serbot']
const PRIVATE_ONLY = true
const BOTNAME = 'chatunity-bot'

const TOP = '╭───────────────⟢'
const BOTTOM = '╰────────────────⟢'
const SEP = '⟣───────────────────⟢'

const CAPTION_QR = `${TOP}
🚀 SUB-BOT: ${BOTNAME}

${SEP}

📲 Scansiona questo QR per collegarti come SubBot

1. Apri WhatsApp
2. Tocca ⋮ → Dispositivi collegati
3. Scansiona questo QR

⚠ Il QR scade in 45 secondi

${BOTTOM}`

const CAPTION_CODE = `${TOP}
🚀 SUB-BOT: ${BOTNAME}

${SEP}

📲 Usa questo codice per collegarti come SubBot

1. Apri WhatsApp
2. Tocca ⋮ → Dispositivi collegati
3. Seleziona "Collega con numero di telefono"
4. Inserisci il codice ricevuto qui

⚠ Questo codice è valido solo per poco tempo

${BOTTOM}`

if (!(global.conns instanceof Array)) global.conns = []

const sleep = (ms) => new Promise((res) => setTimeout(res, ms))

function getUserDirFromMessage(m, conn) {
  const targetJid = (m.mentionedJid && m.mentionedJid[0])
    ? m.mentionedJid[0]
    : (m.fromMe ? conn.user?.jid : m.sender)
  const bare = String((targetJid || '').split('@')[0] || '')
  const userDir = path.join('./', JADI_DIR, bare)
  return { bare, userDir }
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.sendMessage(
      m.chat,
      {
        text: `${TOP}\nScegli come collegare il SubBot:\n${BOTTOM}`,
        buttons: [
          { buttonId: `${usedPrefix + command} qr`, buttonText: { displayText: '🔳 Collegati con QR' }, type: 1 },
          { buttonId: `${usedPrefix + command} code`, buttonText: { displayText: '🔑 Collegati con CODE' }, type: 1 }
        ],
        headerType: 1
      },
      { quoted: m }
    )
  }

  const wantCode = /code/i.test(args[0])

  const { bare, userDir } = getUserDirFromMessage(m, conn)
  if (!bare) return m.reply(`${TOP}\nFormato utente non valido.\n${BOTTOM}`)
  if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true })

  const credsPath = path.join(userDir, 'creds.json')

  async function startSubBot() {
    const { version } = await fetchLatestBaileysVersion()
    const logger = pino({ level: 'silent' })
    const msgRetryCache = new NodeCache()
    const { state, saveCreds } = await useMultiFileAuthState(userDir)

    const sockConfig = {
      printQRInTerminal: false,
      logger,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, logger)
      },
      msgRetry: () => {},
      msgRetryCache,
      syncFullHistory: true,
      browser: wantCode
        ? ['Windows', 'Chrome', '114.0.5735.198']
        : [`${BOTNAME} (Sub Bot)`, 'Chrome', '2.0.0'],
      version,
      getMessage: async () => ({ conversation: 'Messaggio ricevuto' })
    }

    let sock = makeWASocket(sockConfig)
    sock.isInit = false

    async function onConnectionUpdate(update) {
      const { connection, lastDisconnect, isNewLogin, qr } = update
      if (isNewLogin) sock.isInit = false

      if (qr && !wantCode) {
        try {
          const img = await qrcode.toBuffer(qr, { scale: 8 })
          await conn.sendMessage(m.chat, { image: img, caption: CAPTION_QR }, { quoted: m })
        } catch {}
      }

      if (connection === 'connecting' && wantCode && !sock.authState.creds.registered) {
        try {
          await conn.sendMessage(m.chat, { text: CAPTION_CODE }, { quoted: m })
          await sleep(2000)
          const phone = String(m.sender.split('@')[0]).replace(/\D/g, '')
          const code = await sock.requestPairingCode(phone)
          await conn.sendMessage(
            m.chat,
            {
              text: `${TOP}\n🔑 CODICE DI COLLEGAMENTO:\n\n👉 ${code}\n\nUsalo subito per collegare il SubBot!\n${BOTTOM}`
            },
            { quoted: m }
          )
        } catch {
          await m.reply(`${TOP}\n❌ Impossibile generare il codice, riprova.\n${BOTTOM}`)
        }
      }

      if (connection === 'open') {
        sock.isInit = true
        global.conns.push(sock)
        await conn.sendMessage(m.chat, { text: `${TOP}\n✅ SubBot connesso con successo!\n${BOTTOM}` }, { quoted: m })
      }

      if (connection === 'close') {
        const statusCode =
          lastDisconnect?.error?.output?.statusCode ??
          lastDisconnect?.error?.output?.payload?.statusCode

        if (!sock.authState.creds.registered) {
          console.log('⏳ Chiusura temporanea ignorata (SubBot non ancora registrato).')
          return
        }

        if (statusCode === DisconnectReason.loggedOut) {
          if (fs.existsSync(credsPath)) fs.unlinkSync(credsPath)
          await m.reply(`${TOP}\n❌ Sessione scaduta. Esegui di nuovo il comando.\n${BOTTOM}`)
        } else {
          console.log('🔄 Tentativo di riconnessione SubBot...')
          await sleep(2000)
          startSubBot()
        }
      }
    }

    sock.ev.on('connection.update', onConnectionUpdate)
    sock.ev.on('creds.update', saveCreds)
    sock.ev.on('messages.upsert', async (ev) => {
      try {
        const mod = await import('../handler.js?update=' + Date.now())
        if (mod?.handler) await mod.handler.call(sock, ev)
      } catch {}
    })
  }

  await startSubBot()
}

handler.command = CMD_NAME
handler.tags = TAGS
handler.help = HELP
handler.private = PRIVATE_ONLY

export default handler
