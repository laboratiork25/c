import { cpus as _cpus, totalmem, freemem } from 'os'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'
import '../lib/language.js';

let format = sizeFormatter({
  std: 'JEDEC',
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})

let handler = async (m, { conn, usedPrefix, command }) => {
  const userId = m.sender;
  const groupId = m.isGroup ? m.chat : null;
  
  let nomeDelBot = global.db.data.nomedelbot || global.t('defaultBotName', userId, groupId)
  let versioneBot = '5.2'
  let old = performance.now()
  let neww = performance.now()
  let speed = (neww - old).toFixed(2)
  let uptime = process.uptime() * 1000

  const cpus = _cpus().map(cpu => {
    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
    return cpu
  })

  const cpu = cpus.reduce((last, cpu, _, { length }) => {
    last.total += cpu.total
    last.speed += cpu.speed / length
    last.times.user += cpu.times.user
    last.times.nice += cpu.times.nice
    last.times.sys += cpu.times.sys
    last.times.idle += cpu.times.idle
    last.times.irq += cpu.times.irq
    return last
  }, {
    speed: 0,
    total: 0,
    times: {
      user: 0,
      nice: 0,
      sys: 0,
      idle: 0,
      irq: 0
    }
  })

  let cpuModel = cpus[0]?.model || global.t('unknownModel', userId, groupId)
  let cpuSpeed = cpu.speed.toFixed(2)

  let caption = global.t('pingText', userId, groupId, {
    uptime: clockString(uptime),
    speed,
    cpuModel,
    cpuSpeed,
    usedMem: format(totalmem() - freemem()),
    totalMem: format(totalmem()),
    freeMem: format(freemem())
  })

  const profilePictureUrl = await fetchProfilePictureUrl(conn, m.sender)

  let messageOptions = {
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363259442839354@newsletter',
        serverMessageId: '',
        newsletterName: global.t('newsletterName', userId, groupId, { nomeDelBot })
      }
    }
  }

  if (profilePictureUrl !== 'default-profile-picture-url') {
    try {
      messageOptions.contextInfo.externalAdReply = {
        title: global.t('pingTitle', userId, groupId, { nomeDelBot }),
        body: global.t('pingBody', userId, groupId, { versioneBot }),
        mediaType: 1,
        renderLargerThumbnail: false,
        previewType: 'thumbnail',
        thumbnail: await fetchThumbnail('https://i.ibb.co/9mWwC5PP/Whats-App-Image-2025-07-06-at-23-32-06.jpg'),
      }
    } catch (error) {
      console.error(global.t('thumbnailError', userId, groupId), error)
    }
  }

  try {
    await conn.sendMessage(m.chat, {
      text: caption,
      ...messageOptions
    })
  } catch (error) {
    console.error(global.t('sendMessageError', userId, groupId), error)
  }
}

async function fetchProfilePictureUrl(conn, sender) {
  try {
    return await conn.profilePictureUrl(sender)
  } catch (error) {
    console.error(global.t('profilePictureError', null, null), error)
    return 'default-profile-picture-url'
  }
}

async function fetchThumbnail(url) {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(global.t('fetchError', null, null))
    const buffer = await response.buffer()
    return buffer
  } catch (error) {
    console.error(global.t('thumbnailFetchError', null, null), error)
    return 'default-thumbnail'
  }
}

handler.help = ['ping', 'speed']
handler.tags = ['info', 'tools']
handler.command = /^(ping|speed|stat)$/i

export default handler

function clockString(ms) {
  let d = Math.floor(ms / 86400000)
  let h = Math.floor(ms / 3600000) % 24
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [d, h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}