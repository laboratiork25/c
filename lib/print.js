import PhoneNumber from 'awesome-phonenumber'
import chalk from 'chalk'
import { watchFile } from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g

export default async function (m, conn = { user: {} }) {
  const c = getColorScheme();

  if (!global.messageUpdateListenerSet && conn.ev) {
    conn.ev.on('message.delete', (key) => {
      console.log(`${c.secondary.bold('╭───────────')}『 ${c.error.bold('MESSAGGIO ELIMINATO')} 』${c.secondary.bold('───────────╮')}`);
      console.log(`${c.secondary.bold('│')} ${c.label('ID:')} ${c.text(key.id)}`);
      console.log(`${c.secondary.bold('│')} ${c.label('Da:')} ${c.text(formatPhoneNumber(key.participant || key.remoteJid, ''))}`);
      console.log(`${c.secondary.bold('╰──────────────────────────────────────────╯')}`);
    });

    conn.ev.on('message.edit', (m) => {
      const editedContent = m.message?.conversation ||
                            m.message?.extendedTextMessage?.text ||
                            m.message?.imageMessage?.caption ||
                            'Contenuto non disponibile';

      console.log(`${c.secondary.bold('╭───────────')}『 ${c.warning.bold('MESSAGGIO MODIFICATO')} 』${c.secondary.bold('───────────╮')}`);
      console.log(`${c.secondary.bold('│')} ${c.label('ID:')} ${c.text(m.key.id)}`);
      console.log(`${c.secondary.bold('│')} ${c.label('Da:')} ${c.text(formatPhoneNumber(m.sender, m.pushName))}`);
      console.log(`${c.secondary.bold('│')} ${c.label('Nuovo Contenuto:')} ${c.text(editedContent)}`);
      console.log(`${c.secondary.bold('╰──────────────────────────────────────────╯')}`);
    });

    global.messageUpdateListenerSet = true
  }

  if (!m || m.key?.fromMe) return

  try {
    const senderJid = m.sender
    const chatJid = m.chat
    const botJid = conn.user?.jid ? conn.decodeJid(conn.user.jid) : ''

    if (!chatJid) {
      console.warn('chatJid is undefined, skipping print');
      return;
    }

    const sender = formatPhoneNumber(senderJid, m.name || m.pushName || '')
    const chat = m.isGroup ? (m.chat?.metadata?.subject || await conn.getName(chatJid)) : 'Chat Privata'
    const me = formatPhoneNumber(botJid || '', conn.user?.name || 'Bot')
    const isOwner = global.owner.some(owner => owner[0] === senderJid.split('@')[0])
    const isGroup = m.isGroup
    const isAdmin = isGroup ? (m.chat?.metadata?.participants.find(p => p.id === senderJid)?.admin === 'admin' || m.chat?.metadata?.participants.find(p => p.id === senderJid)?.admin === 'superadmin') : false
    const isPremium = (global.prems || []).includes(senderJid)
    const isBanned = global.DATABASE?.data?.users?.[senderJid]?.banned || false

    if (global.lastLogJid === senderJid && Date.now() - global.lastLogTime < 1000) return;
    global.lastLogJid = senderJid;
    global.lastLogTime = Date.now();

    const user = global.DATABASE?.data?.users?.[senderJid] || { exp: '?', diamond: '?', level: '¿', euro: '?', bank: '?' }

    const filesize = getFileSize(m)
    const ts = formatTimestamp(m.messageTimestamp)
    const messageAge = getMessageAge(m.messageTimestamp)

    const c = getColorScheme()
    const bordi = getBorders(c)
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
    if (m.isCommand) {
      righe.push(`${bordi.pipe} ${c.label('⚙️ Comando:')} ${c.text(getCommand(m.text))}`)
      if (m.plugin) {
        righe.push(`${bordi.pipe} ${c.label('📂 Plugin:')} ${c.bright(m.plugin)}`)
      }
    }
    if (user.exp !== '?') righe.push(`${bordi.pipe} ${c.label('⭐ EXP:')} ${c.text(user.exp)}${user.limit !== '?' ? c.secondary(' | ') + c.label('💰 ') + c.text(user.limit) : ''}`)

    if (isGroup && chatJid) {
      const groupMeta = m.chat?.metadata
      const participantCount = Array.isArray(groupMeta?.participants) ? groupMeta.participants.length : '?'
      righe.push(`${bordi.pipe} ${c.label('👥 Membri:')} ${c.text(participantCount)}`)
    }

    if (m.quoted) {
      const quotedSenderJid = conn.decodeJid(m.quoted.sender)
      const qname = await conn.getName(quotedSenderJid) || 'Utente'
      const qtype = formatType(m.quoted)
      righe.push(`${bordi.pipe} ${c.label('↪️ Risposta a:')} ${c.text(qname)} ${c.secondary('(')}${c.meta(qtype)}${c.secondary(')')}`)
    }

    if (m.isForwarded) {
      righe.push(`${bordi.pipe} ${c.label('↗️ Inoltrato:')} ${c.text('Sì')}`)
    }

    if (m.broadcast) {
      righe.push(`${bordi.pipe} ${c.label('📢 Broadcast:')} ${c.text('Sì')}`)
    }

    righe.push(`${bordi.bottom}`)

    console.log('\n' + righe.join('\n'))

    const logText = await formatText(m, conn)
    if (logText?.trim()) console.log(logText)

    const params = Array.isArray(m.messageStubParameters) ? m.messageStubParameters : []
    if (params.length) {
      try {
        const decoded = params
          .filter(Boolean)
          .map(jid => chalk.gray(formatPhoneNumber(conn.decodeJid(jid), '')))
          .join(', ')
        if (decoded.trim()) console.log(decoded)
      } catch (e) {
      }
    }

    logMessageSpecifics(m, c)

    const reactionsArr = Array.isArray(m.reactions) ? m.reactions : []
    if (reactionsArr.length > 0) {
      const reactions = reactionsArr.map(r => `${r.text} (${r.count})`).join(', ')
      console.log(`${c.secondary('🎭 Reazioni:')} ${c.text(reactions)}`)
    }

    if (m.editedTimestamp) {
      const editTime = new Date(m.editedTimestamp * 1000).toLocaleTimeString('it-IT')
      console.log(`${c.secondary('✏️ Modificato:')} ${c.text(editTime)}`)
    }

  } catch (error) {
    if (!global.lastErrorTime || Date.now() - global.lastErrorTime > 5000) {
      console.error(chalk.red('Errore in print.js:'), error.message)
      global.lastErrorTime = Date.now();
    }
  }
}

function formatPhoneNumber(jid, name) {
  if (!jid) return 'Sconosciuto';
  let userPart = jid.split('@')[0];
  let cleanNumber = userPart.split(':')[0];
  try {
    const numberObj = PhoneNumber('+' + String(cleanNumber));
    const number = numberObj.getNumber('international') || ('+' + cleanNumber);
    return number + (name ? ` ~${name}` : '');
  } catch {
    return (cleanNumber || '') + (name ? ` ~${name}` : '');
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
  return date.toLocaleTimeString('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
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
    background: chalk.bgBlueBright,
    info: violet('#F8F8FF'),
    warning: violet('#FFB6C1'),
    error: violet('#FF6347'),
    success: violet('#a298fbff')
  }
}

function getBorders(c) {
  return {
    top: `${c.secondary.bold('╭★────★────★')}『 ${c.success.bold('CHATUNITY-BOT')} 』${c.secondary.bold('★────★────★')}`,
    bottom: `${c.secondary.bold('╰★────★────★────★')}${c.secondary.bold('╝')}`,
    pipe: c.secondary.bold('|˚')
  }
}

function formatType(m) {
  return (m.mtype || 'unknown').replace(/Message/gi, '')
}

function getUserStatus(isOwner, isAdmin, isPremium, isBanned, c) {
  let status = []
  if (isOwner) status.push(c.success('Owner'))
  if (isAdmin) status.push(c.warning('Admin'))
  if (isBanned) status.push(c.error('Bannato'))
  return status.length ? `(${status.join(' | ')})` : c.text('User')
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
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
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
      const count = Array.isArray(m.msg?.contacts) ? m.msg.contacts.length : '?'
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
      const options = Array.isArray(m.msg?.options) ? m.msg.options.length : 0
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
      const coords = lat && lng ? ` (${lat.toFixed(4)}, ${lng.toFixed(4)})` : ''
      console.log(`${c.secondary('📍')} ${name}${coords}`)
    },
    liveLocationMessage: () => {
      const duration = m.msg?.contextInfo?.expiration ? formatDuration(m.msg.contextInfo.expiration) : ''
      console.log(`${c.secondary('📡')} Posizione in tempo reale${duration ? ' - ' + duration : ''}`)
    },
  }

  const handler = specifics[m.mtype]
  if (handler) {
    try {
      handler()
    } catch (e) {
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
  const mdRegex = /(?<=(?:^|[\s\n])\S?)(?:([*_~`])(.+?)\1|``````|`([^`]+)`)(?=\S?(?:[\s\n]|$))/g

  const mdFormat = (depth = 4) => (_, type, textInner, code, inlineCode) => {
    const types = { '_': 'italic', '*': 'bold', '~': 'strikethrough', '`': 'gray' }
    const val = textInner || code || inlineCode
    if (!types[type] || depth < 1) return val
    return chalk[types[type]](val.replace(mdRegex, mdFormat(depth - 1)))
  }

  if (text.length < 2048) {
    text = text.replace(urlRegex, url => chalk.cyanBright(url))
  }
  text = text.replace(mdRegex, mdFormat(4))

  if (Array.isArray(m.mentionedJid)) {
    for (const id of m.mentionedJid) {
      try {
        let mentionJid = conn.decodeJid(id);
        let originalNum = mentionJid.split('@')[0];
        let displayNum = originalNum.split(':')[0];
        let name = await conn.getName(mentionJid) || displayNum;

        const participant = m.chat?.metadata?.participants.find(p => conn.decodeJid(p.id) === mentionJid)
        if (participant?.id) {
            name = await conn.getName(participant.id) || displayNum
        } 

        const replacement = chalk.blueBright('@' + displayNum + (name && name !== displayNum ? ' ~' + name : ''));
        text = text.replace('@' + originalNum, replacement);
      } catch (e) {
        if (!global.lastMentionError || Date.now() - global.lastMentionError > 5000) {
          console.error(chalk.red('Errore nel recupero del nome utente:'), e.message)
          global.lastMentionError = Date.now();
        }
      }
    }
  }

  text = text.replace(/#[\w\u0590-\u05ff]+/g, hashtag => chalk.cyanBright(hashtag))
  text = text.replace(/\+?[\d\s\-\(\)]{10,}/g, phone => chalk.magentaBright(phone))

  if (m.error) return chalk.red(text)
  if (m.isCommand) return chalk.bgBlueBright(text)  
  if (m.quoted) return chalk.greenBright(text.trim() || '[Messaggio Vuoto]')
  return chalk.whiteBright(text.trim() || '[Messaggio Vuoto]')
}

watchFile(fileURLToPath(import.meta.url), () => {
  console.log(chalk.bgHex('#3b0d95')(chalk.white.bold("File: 'lib/print.js' Aggiornato")))
})
