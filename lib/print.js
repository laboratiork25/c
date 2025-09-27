import { WAMessageStubType } from '@whiskeysockets/baileys'
import PhoneNumber from 'awesome-phonenumber'
import chalk from 'chalk'
import { watchFile } from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// NOTA: disabilitato il render delle immagini in terminale per ridurre I/O
// const terminalImage = global.opts?.img ? require('terminal-image') : ''
const terminalImage = null

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g

// Throttle globale per log: max 10 log/sec con coda breve
const LOG_WINDOW_MS = 100 // 10 Hz
const LOG_BURST_MAX = 5   // massimo di 5 messaggi per finestra
let lastWindowStart = 0
let windowCount = 0

function canLogNow() {
  const now = Date.now()
  if (now - lastWindowStart > LOG_WINDOW_MS) {
    lastWindowStart = now
    windowCount = 0
  }
  if (windowCount < LOG_BURST_MAX) {
    windowCount++
    return true
  }
  return false
}

// Debounce per lo stesso mittente: non più di 1 log per 1s
if (!global.__printSenderGate) global.__printSenderGate = { lastJid: null, lastTime: 0 }
const SENDER_DEBOUNCE_MS = 1000

export default async function (m, conn = { user: {} }) {
  if (!m || m.key?.fromMe) return

  try {
    const senderJid = conn.decodeJid(m.sender)
    const chatJid = conn.decodeJid(m.chat || '')
    const botJid = conn.decodeJid(conn.user?.jid)

    if (!chatJid) {
      // skip senza log
      return
    }

    // Debounce stesso mittente
    const now = Date.now()
    if (global.__printSenderGate.lastJid === senderJid && (now - global.__printSenderGate.lastTime) < SENDER_DEBOUNCE_MS) {
      return
    }
    global.__printSenderGate.lastJid = senderJid
    global.__printSenderGate.lastTime = now

    // Rate limit finestra
    if (!canLogNow()) {
      return
    }

    const _name = await safeGetName(conn, senderJid)
    const sender = formatPhoneNumber(senderJid, _name)
    const chat = (await safeGetName(conn, chatJid)) || 'Chat Sconosciuta'
    // Rinominato bot visualizzato
    const me = formatPhoneNumber(botJid || '', 'chatunity-bot')

    const isOwner = Array.isArray(global.owner)
      ? global.owner.map(([number]) => number).includes(senderJid.split('@')[0])
      : global.owner === senderJid.split('@')[0]

    const isGroup = chatJid.endsWith('@g.us') || false
    const isAdmin = isGroup ? await checkAdmin(conn, chatJid, senderJid) : false
    const isPremium = global.prems?.includes(senderJid) || false
    const isBanned = global.DATABASE?.data?.users?.[senderJid]?.banned || false

    const user = global.DATABASE?.data?.users?.[senderJid] || { exp: '?', diamond: '?', level: '¿', euro: '?', bank: '?' }

    // Evita download media sul path “print”
    const filesize = getFileSize(m)
    const ts = formatTimestamp(m.messageTimestamp)
    const messageAge = getMessageAge(m.messageTimestamp)

    const c = getColorScheme()
    const bordi = getBorders(c) // Banner aggiornato con chatunity-bot
    const tipo = formatType(m)

    const righe = [
      `${bordi.top}`,
      `${bordi.pipe} ${c.label('📱 Bot:')} ${c.text(me)}`,
      `${bordi.pipe} ${c.label('⏰ Ora:')} ${c.text(ts)}${messageAge ? c.secondary(' • ') + c.meta(messageAge) : ''}`,
      `${bordi.pipe} ${c.label('👤 Da:')} ${c.text(sender)}${isGroup ? ` ${c.secondary('|')} ${getUserStatus(isOwner, isAdmin, isPremium, isBanned, c)}` : ''}`,
      `${bordi.pipe} ${c.label('💬 Chat:')} ${c.text(chat)}${isGroup ? c.secondary(' (Gruppo)') : c.secondary(' (Privato)')}`,
      `${bordi.pipe} ${c.label('📨 Tipo:')} ${c.text(tipo)}${getMessageFlags(m, c)}`
    ]

    if (filesize) righe.push(`${bordi.pipe} ${c.label('📦 Dimensione:')} ${c.text(formatSize(filesize))}`)
    if (m.isCommand) righe.push(`${bordi.pipe} ${c.label('⚙️ Comando:')} ${c.text(getCommand(m.text))}`)
    if (user.exp !== '?') {
      const extra = user.euro !== '?' ? c.secondary(' | ') + c.label('💰 ') + c.text(user.euro) : ''
      righe.push(`${bordi.pipe} ${c.label('⭐ EXP:')} ${c.text(user.exp)}${extra}`)
    }

    if (isGroup && chatJid) {
      // Metadati gruppo con protezione rate error
      const participantCount = await safeGroupCount(conn, chatJid)
      if (participantCount) {
        righe.push(`${bordi.pipe} ${c.label('👥 Membri:')} ${c.text(participantCount)}`)
      }
    }

    if (m.quoted) {
      const quotedSenderJid = conn.decodeJid(m.quoted.sender)
      const qname = await safeGetName(conn, quotedSenderJid) || 'Utente'
      const qtype = formatType(m.quoted)
      righe.push(`${bordi.pipe} ${c.label('↪️ Risposta a:')} ${c.text(qname)} ${c.secondary('(')}${c.meta(qtype)}${c.secondary(')')}`)
    }

    if (m.forwarded) {
      righe.push(`${bordi.pipe} ${c.label('↗️ Inoltrato:')} ${c.text('Sì')}`)
    }
    if (m.broadcast) {
      righe.push(`${bordi.pipe} ${c.label('📢 Broadcast:')} ${c.text('Sì')}`)
    }

    righe.push(`${bordi.bottom}`)

    // Stampa unica aggregata
    console.log('\n' + righe.join('\n'))

    // Log testo formattato (senza immagini)
    const logText = await formatText(m, conn)
    if (logText?.trim()) console.log(logText)

    if (m.messageStubParameters) {
      const decoded = m.messageStubParameters.map(jid =>
        chalk.gray(formatPhoneNumber(conn.decodeJid(jid), ''))
      ).join(', ')
      console.log(decoded)
    }

    logMessageSpecifics(m, c)

    if (m.reactions && m.reactions.length > 0) {
      const reactions = m.reactions.map(r => `${r.text} (${r.count})`).join(', ')
      console.log(`${c.secondary('🎭 Reazioni:')} ${c.text(reactions)}`)
    }

    if (m.editedTimestamp) {
      const editTime = new Date(m.editedTimestamp * 1000).toLocaleTimeString('it-IT')
      console.log(`${c.secondary('✏️ Modificato:')} ${c.text(editTime)}`)
    }

  } catch (error) {
    // Error gate per evitare spam
    if (!global.lastErrorTime || Date.now() - global.lastErrorTime > 5000) {
      console.error(chalk.red('Errore in print.js:'), error.message)
      global.lastErrorTime = Date.now();
    }
  }
}

async function safeGetName(conn, jid) {
  try {
    return await conn.getName(jid) || ''
  } catch {
    return ''
  }
}

async function safeGroupCount(conn, chatJid) {
  try {
    const groupMeta = await conn.groupMetadata(chatJid)
    return groupMeta?.participants?.length || null
  } catch {
    return null
  }
}

function formatPhoneNumber(jid, name) {
  if (!jid) return 'Sconosciuto'
  try {
    const number = PhoneNumber('+' + jid.split('@')[0]).getNumber('international')
    return number + (name ? ` ~${name}` : '')
  } catch {
    return (jid || '') + (name ? ` ~${name}` : '')
  }
}

async function checkAdmin(conn, chatId, senderId) {
  try {
    const decodedSender = conn.decodeJid(senderId)
    const groupMeta = await conn.groupMetadata(chatId)
    return groupMeta?.participants?.some(p =>
      (conn.decodeJid(p.id) === decodedSender || p.jid === decodedSender) &&
      (p.admin === 'admin' || p.admin === 'superadmin')
    ) || false
  } catch {
    return false
  }
}

function getFileSize(m) {
  return m.msg?.fileLength ||
         m.msg?.fileSha256?.length ||
         m.text?.length ||
         m.caption?.length ||
         0
}

function formatTimestamp(timestamp) {
  const date = timestamp ? new Date(timestamp * 1000) : new Date()
  return date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

function getMessageAge(timestamp) {
  if (!timestamp) return ''
  const now = Date.now() / 1000
  const sec = now - timestamp
  if (sec < 60) return `${Math.floor(sec)}s fa`
  if (sec < 3600) return `${Math.floor(sec / 60)}m fa`
  if (sec < 86400) return `${Math.floor(sec / 3600)}h fa`
  return ''
}

function getColorScheme() {
  const violet = color => chalk.hex(color)
  return {
    label: violet('#6349d8ff').bold,
    text: violet('#ffffffff'),
    secondary: violet('#6944ceff'),
    meta: violet('#5f40ceff'),
    bright: violet('#7247e7ff'),
    bold: chalk.bold,
    italic: chalk.italic,
    white: chalk.whiteBright,
    gray: chalk.gray,
    cyan: chalk.cyanBright,
    magenta: chalk.magentaBright,
    blue: chalk.blueBright,
    green: chalk.greenBright,
    red: chalk.redBright,
    yellow: chalk.yellowBright,
    background: chalk.bgMagentaBright,
    info: violet('#F8F8FF'),
    warning: violet('#FFB6C1'),
    error: violet('#FF6347'),
    success: violet('#a298fbff')
  }
}

function getBorders(c) {
  // Titolo aggiornato a chatunity-bot
  return {
    top: `${c.secondary.bold('╔════════════')}『 ${c.success.bold('chatunity-bot')} 』${c.secondary.bold('════════════╗')}`,
    bottom: `${c.secondary.bold('╚════════════════════════════════════════')}${c.secondary.bold('╝')}`,
    pipe: c.secondary.bold('║')
  }
}

function formatType(m) {
  return (m.mtype || 'unknown').replace(/Message/gi, '')
}

function getUserStatus(isOwner, isAdmin, isPremium, isBanned, c) {
  let status = []
  if (isOwner) status.push(c.success('Owner'))
  if (isAdmin) status.push(c.warning('Admin'))
  if (isPremium) status.push(c.bright('Premium'))
  if (isBanned) status.push(c.error('Bannato'))
  return status.length ? `(${status.join(' | ')})` : (c.text('User'))
}

function getMessageFlags(m, c) {
  let flags = []
  if (m.isCommand) flags.push(c.label('Cmd'))
  if (m.quoted) flags.push(c.meta('In risposta'))
  return flags.length ? ` ${c.secondary('•')} ${flags.join(' ')}` : ''
}

function getCommand(text) {
  if (!text) return ''
  return text.split(' ')[0].slice(1)
}

function formatSize(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)) + ' ' + sizes[i]
}

function formatDuration(sec) {
  if (typeof sec !== 'number' || isNaN(sec) || sec < 0) return ''
  const hours = Math.floor(sec / 3600)
  const minutes = Math.floor((sec % 3600) / 60)
  const seconds = Math.floor(sec % 60)
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function logMessageSpecifics(m, c) {
  // Ridotto ma informativo; nessun I/O aggiuntivo
  const specifics = {
    documentMessage: () => {
      const fileName = m.msg?.fileName || 'Documento'
      const mimetype = m.msg?.mimetype || 'Sconosciuto'
      const pages = m.msg?.pageCount ? ` (${m.msg.pageCount} pagine)` : ''
      console.log(`${c.secondary('📄')} ${fileName}${pages} - ${mimetype}`)
    },
    contactMessage: () => {
      const name = m.msg?.displayName || 'Contatto'
      const vcard = m.msg?.vcard ? ' (contatto)' : ''
      console.log(`${c.secondary('👤')} ${name}${vcard}`)
    },
    contactsArrayMessage: () => {
      const count = m.msg?.contacts?.length || '?'
      console.log(`${c.secondary('👨‍👩‍👧‍👦 ')} ${count} contatti`)
    },
    audioMessage: () => {
      const duration = formatDuration(m.msg?.seconds)
      const type = m.msg?.ptt ? 'Messaggio vocale' : 'Audio'
      const waveform = m.msg?.waveform ? ' 🎵' : ''
      console.log(`${c.secondary('🎵 ')} ${type}${duration ? ' - ' + duration : ''}${waveform}`)
    },
    videoMessage: () => {
      const duration = formatDuration(m.msg?.seconds)
      const gif = m.msg?.gifPlayback ? ' (GIF)' : ''
      console.log(`${c.secondary('🎥')} Video${duration ? ' - ' + duration : ''}${gif}`)
    },
    imageMessage: () => {
      const width = m.msg?.width
      const height = m.msg?.height
      const dimensions = width && height ? ` (${width}x${height})` : ''
      console.log(`${c.secondary('🖼️')} Immagine${dimensions}`)
    },
    stickerMessage: () => {
      const animated = m.msg?.isAnimated ? ' (Animato)' : ''
      console.log(`${c.secondary('🌟')} Sticker${animated}`)
    },
    reactionMessage: () => {
      const reaction = m.msg?.text || '❤️'
      console.log(`${c.secondary('✧')} Reazione: ${reaction}`)
    },
    pollCreationMessage: () => {
      const question = m.msg?.name || 'Sondaggio'
      const options = m.msg?.options?.length || 0
      console.log(`${c.secondary('🗳️')} ${question} (${options} opzioni)`)
    },
    productMessage: () => {
      const title = m.msg?.product?.title || 'Prodotto'
      const price = m.msg?.product?.priceAmount1000 ? ` - ${m.msg.product.priceAmount1000 / 1000} ${m.msg.product.currency}` : ''
      console.log(`${c.secondary('🛍️')} ${title}${price}`)
    },
    locationMessage: () => {
      const lat = m.msg?.degreesLatitude
      const lng = m.msg?.degreesLongitude
      const name = m.msg?.name || 'Posizione'
      const coords = lat && lng ? ` (${lat?.toFixed?.(4)}, ${lng?.toFixed?.(4)})` : ''
      console.log(`${c.secondary('📍')} ${name}${coords}`)
    },
    liveLocationMessage: () => {
      const duration = m.msg?.contextInfo?.expiration ? formatDuration(m.msg.contextInfo.expiration) : ''
      console.log(`${c.secondary('📡')} Posizione in tempo reale${duration ? ' - ' + duration : ''}`)
    },
  }

  const handler = specifics[m.mtype]
  if (handler) {
    try { handler() } catch (e) {
      if (!global.lastSpecificError || Date.now() - global.lastSpecificError > 5000) {
        console.error(chalk.red('Errore nel log dei dettagli del messaggio:'), e.message)
        global.lastSpecificError = Date.now();
      }
    }
  }
}

async function formatText(m, conn) {
  if (!m.text && !m.caption) return ''
  let text = (m.text || m.caption || '').replace(/\u200e+/g, '')

  // Evidenzia URL solo per testi corti (meno I/O)
  if (text.length < 2048) {
    text = text.replace(urlRegex, url => chalk.cyanBright(url))
  }

  // Menzioni (con gate error)
  if (m.mentionedJid) {
    for (const id of m.mentionedJid) {
      try {
        const decodedId = conn.decodeJid(id)
        const name = await safeGetName(conn, decodedId) || 'Utente'
        text = text.replace('@' + id.split('@')[0], chalk.blueBright('@' + name))
      } catch (e) {
        if (!global.lastMentionError || Date.now() - global.lastMentionError > 5000) {
          console.error(chalk.red('Errore nel recupero del nome utente:'), e.message)
          global.lastMentionError = Date.now();
        }
      }
    }
  }

  // Hashtag e numeri
  text = text.replace(/#[\w\u0590-\u05ff]+/g, hashtag => chalk.cyanBright(hashtag))
  text = text.replace(/\+?[\d\s\-\(\)]{10,}/g, phone => chalk.magentaBright(phone))

  if (m.error) return chalk.red(text)
  if (m.isCommand) return chalk.bgMagentaBright(text)
  if (m.quoted) return chalk.greenBright(text.trim() || '[Messaggio Vuoto]')
  return chalk.whiteBright(text.trim() || '[Messaggio Vuoto]')
}

watchFile(__filename, () => {
  console.log(chalk.bgMagentaBright.black(" File: 'lib/print.js' aggiornato! "))
})
