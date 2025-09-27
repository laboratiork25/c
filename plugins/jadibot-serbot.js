import { DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser } from '@whiskeysockets/baileys'
import qrcode from 'qrcode'
import fs from 'fs'
import pino from 'pino'
import crypto from 'crypto'
import NodeCache from 'node-cache'
import ws from 'ws'
import { makeWASocket } from '../lib/simple.js'

const SESSIONS_DIR = './chatunitysub'
if (!fs.existsSync(SESSIONS_DIR)) fs.mkdirSync(SESSIONS_DIR, { recursive: true })

if (!global.conns || !Array.isArray(global.conns)) global.conns = []

function findSubByJid(jid) {
  if (!global.conns) return null
  return global.conns.find(c => c?.user?.jid === jid)
}

function countActiveSubbots() {
  if (!global.conns) return 0
  return global.conns.filter(c => c?.ws?.socket && c.ws.socket.readyState === ws.OPEN && c.user).length
}

let serbotHandler = async (m, { conn: mainConn, args, usedPrefix, command }) => {
  const settings = (global.db?.data?.settings && global.db.data.settings[mainConn.user.jid]) || {}
  if (settings.jadibotmd === false) {
    await mainConn.reply(m.chat, '💛 Questo comando è disattivato dal mio creatore.', m)
    return
  }

  const parent = args[0] === 'plz' ? mainConn : await global.conn

  async function startSubBot() {
    const subId = crypto.randomBytes(10).toString('hex').slice(0, 8)
    const folder = `${SESSIONS_DIR}/${subId}`
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true })

    // se passano creds base64 le salvo
    if (args[0] && args[0] !== 'plz') {
      try {
        const decoded = Buffer.from(args[0], 'base64').toString('utf-8')
        // può essere una creds.json già serializzata
        fs.writeFileSync(`${folder}/creds.json`, decoded)
      } catch (err) {
      }
    }

    const { state, saveCreds } = await useMultiFileAuthState(folder)
    const msgRetryCounterCache = new NodeCache()
    const { version } = await fetchLatestBaileysVersion()

    const connectionOptions = {
      logger: pino({ level: 'silent' }),
      printQRInTerminal: false,
      browser: ['ChatUnity Sub-Bot', 'Edge', '2.0.0'],
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }).child({ level: 'fatal' }))
      },
      markOnlineOnConnect: true,
      generateHighQualityLinkPreview: true,
      getMessage: async (key) => {
        try {
          const jid = jidNormalizedUser(key.remoteJid)
          const msg = await global.store?.loadMessage(jid, key.id)
          return msg?.message || {}
        } catch {
          return {}
        }
      },
      msgRetryCounterCache,
      version
    }

    let sub = makeWASocket(connectionOptions)
    sub.isInit = false
    let isInit = true
    let qrMsgKey = null

    async function connectionUpdate(update) {
      const { connection, lastDisconnect, isNewLogin, qr } = update
      if (isNewLogin) sub.isInit = true

      if (qr) {
        try {
          const caption = '*SUB-BOT*\n\nScansiona questo QR per collegare il sub-bot a ChatUnityBot.\n🕒 Valido 120 secondi.'
          const png = await qrcode.toDataURL(qr, { scale: 8 })
          const sent = await parent.sendMessage(m.chat, { image: Buffer.from(png.split(',')[1], 'base64'), caption }, { quoted: m })
          qrMsgKey = sent.key
          setTimeout(() => {
            try {
              if (qrMsgKey) parent.sendMessage(m.chat, { delete: qrMsgKey })
            } catch {}
          }, 120000)
        } catch {}
      }

      const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
      if (code && code !== DisconnectReason.loggedOut && (sub?.ws?.socket == null || sub?.ws?.socket?.readyState !== ws.OPEN)) {
        const i = global.conns.indexOf(sub)
        if (i >= 0) {
          try { delete global.conns[i] } catch {}
          global.conns.splice(i, 1)
        }
        try { fs.rmSync(folder, { recursive: true, force: true }) } catch {}
        try { parent.sendMessage(m.chat, { text: '❌ Connessione persa con il server.' }, { quoted: m }) } catch {}
        return
      }

      if (connection === 'open') {
        sub.isInit = true
        if (!global.conns.includes(sub)) global.conns.push(sub)
        try {
          await parent.sendMessage(m.chat, { text: `✅ Sub-bot creato con successo! Numero: ${sub.user?.id?.split?.('@')?.[0] || 'sconosciuto'}` }, { quoted: m })
        } catch {}
        // cancella QR se ancora visibile
        try {
          if (qrMsgKey) parent.sendMessage(m.chat, { delete: qrMsgKey })
        } catch {}
      }
    }

    const cleanupInterval = setInterval(() => {
      try {
        if (!sub || !sub.user) {
          try { sub?.ws?.close?.() } catch {}
          try { sub?.ev?.removeAllListeners?.() } catch {}
          const i = global.conns.indexOf(sub)
          if (i >= 0) {
            try { delete global.conns[i] } catch {}
            global.conns.splice(i, 1)
          }
          clearInterval(cleanupInterval)
        }
      } catch {}
    }, 60_000)

    let coreHandler = await import('../handler.js')
    let creloadHandler = async function (restartConn) {
      try {
        const fresh = await import(`../handler.js?update=${Date.now()}`).catch(() => ({}))
        if (Object.keys(fresh || {}).length) coreHandler = fresh
      } catch {}
      if (restartConn) {
        try { sub.ws.close() } catch {}
        try { sub.ev.removeAllListeners() } catch {}
        sub = makeWASocket(connectionOptions)
        isInit = true
      }
      if (!isInit) {
        try { sub.ev.off('messages.upsert', sub.handler) } catch {}
        try { sub.ev.off('connection.update', sub.connectionUpdate) } catch {}
        try { sub.ev.off('creds.update', sub.credsUpdate) } catch {}
      }
      sub.handler = coreHandler.handler.bind(sub)
      sub.connectionUpdate = connectionUpdate.bind(sub)
      sub.credsUpdate = saveCreds.bind(sub, true)
      sub.ev.on('messages.upsert', sub.handler)
      sub.ev.on('connection.update', sub.connectionUpdate)
      sub.ev.on('creds.update', sub.credsUpdate)
      isInit = false
      return true
    }

    await creloadHandler(false)
  }

  await startSubBot()
}

serbotHandler.command = ['serbot', 'qr', 'code']

let byebotHandler = async (m, { conn }) => {
  try {
    if (global.conn.user.jid === conn.user.jid) {
      await conn.reply(m.chat, '⚠️ Il bot principale di ChatUnityBot non può essere disattivato.', m)
      return
    }
    await conn.reply(m.chat, '✅ Sub-bot di ChatUnityBot disattivato con successo.', m)
    try { conn.ws.close() } catch {}
  } catch (err) {
    try { await conn.reply(m.chat, `❌ Errore: ${err.message}`, m) } catch {}
  }
}
byebotHandler.command = ['byebot']

let botsHandler = async (m, { conn }) => {
  try {
    if (!global.conns || !Array.isArray(global.conns)) global.conns = []
    const unique = new Map()
    global.conns.forEach(c => {
      try {
        if (c.user && c.ws?.socket && c.ws.socket.readyState === ws.OPEN) unique.set(c.user.jid, c)
      } catch {}
    })
    const total = unique.size
    const txt = `🤖 Sub-bots ChatUnityBot attivi: ${total}`
    await conn.reply(m.chat, txt, m)
  } catch (err) {
    try { await conn.reply(m.chat, `❌ Errore: ${err.message}`, m) } catch {}
  }
}
botsHandler.command = ['bots']

let deleteSessionHandler = async (m, { conn }) => {
  try {
    const who = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    const uniq = `${who.split('@')[0]}`
    const folder = `${SESSIONS_DIR}/${uniq}`

    if (global.conns && Array.isArray(global.conns)) {
      const bot = global.conns.find(c => c.user?.jid?.startsWith(uniq))
      if (bot) {
        try { bot.ws.close() } catch {}
        try { bot.ev.removeAllListeners() } catch {}
        const idx = global.conns.indexOf(bot)
        if (idx >= 0) global.conns.splice(idx, 1)
      }
    }

    try {
      fs.rmSync(folder, { recursive: true, force: true })
      await conn.sendMessage(m.chat, { text: '✅ Sessione ChatUnityBot Sub eliminata con successo.' }, { quoted: m })
    } catch (err) {
      if (err.code === 'ENOENT') {
        await conn.sendMessage(m.chat, { text: '⚠️ Nessuna sessione ChatUnityBot Sub trovata.' }, { quoted: m })
      } else {
        console.error(err)
        await conn.sendMessage(m.chat, { text: `❌ Errore durante l’eliminazione: ${err?.message || err}` }, { quoted: m })
      }
    }
  } catch (err) {
    console.error(err)
    try { await conn.sendMessage(m.chat, { text: `❌ Errore: ${err.message}` }, { quoted: m }) } catch {}
  }
}
deleteSessionHandler.command = ['deletesession', 'delsubbot', 'logout']

let setPrimaryHandler = async (m, { conn, usedPrefix, args }) => {
  try {
    if (!args[0] && !m.quoted && !(m.mentionedJid && m.mentionedJid.length)) {
      return conn.reply(m.chat, `⚠️ Menziona il numero di un bot o rispondi al messaggio di un bot.\n> Esempio: *${usedPrefix}setprimary @123456789*`, m)
    }

    const users = [...new Set(global.conns.filter(c => c.user && c.ws?.socket && c.ws.socket.readyState === ws.OPEN).map(c => c))]
    let botJid
    let selectedBot

    if (m.mentionedJid && m.mentionedJid.length > 0) {
      botJid = m.mentionedJid[0]
    } else if (m.quoted) {
      botJid = m.quoted.sender
    } else {
      botJid = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    }

    if (botJid === conn.user.jid || botJid === global.conn.user.jid) {
      selectedBot = conn
    } else {
      selectedBot = users.find(c => c.user.jid === botJid)
    }

    if (!selectedBot) {
      return conn.reply(m.chat, `⚠️ @${botJid.split('@')[0]} non è un bot della stessa sessione, verifica i bot con *#bots*.`, m, { mentions: [botJid] })
    }

    const chatData = global.db.data.chats[m.chat] = global.db.data.chats[m.chat] || {}
    if (chatData.primaryBot === botJid) {
      return conn.reply(m.chat, `⚠️ @${botJid.split('@')[0]} è già il bot primario.`, m, { mentions: [botJid] })
    }

    chatData.primaryBot = botJid
    conn.sendMessage(m.chat, { text: `✅ Il bot @${botJid.split('@')[0]} è stato impostato come primario in questo gruppo. Gli altri bot non risponderanno qui.`, mentions: [botJid] }, { quoted: m })
  } catch (err) {
    console.error(err)
    try { await conn.reply(m.chat, `❌ Errore: ${err.message}`, m) } catch {}
  }
}
setPrimaryHandler.command = ['setprimary']
setPrimaryHandler.group = true
setPrimaryHandler.admin = true

export default serbotHandler
export { byebotHandler as byebot, botsHandler as bots, deleteSessionHandler as deletesession, setPrimaryHandler as setprimary }