import { createCanvas, loadImage, registerFont } from 'canvas'
import fs from 'fs'

registerFont('fonts/Poppins-Regular.ttf', { family: 'Poppins' })
registerFont('fonts/Roboto-Regular.ttf', { family: 'Roboto' })
registerFont('fonts/Segoe-UI.ttf', { family: 'Segoe UI' })
registerFont('fonts/NotoColorEmoji.ttf', { family: 'Noto Color Emoji' })

let groupStats = Object.create(null)
let lastResetKey = getDateKeyRome()

function nowRome() {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome' }))
}

function getDateKeyRome(d = nowRome()) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function formatDateRome(iso) {
  const d = iso ? new Date(iso) : nowRome()
  const local = new Date(d.toLocaleString('en-US', { timeZone: 'Europe/Rome' }))
  const dd = String(local.getDate()).padStart(2, '0')
  const mm = String(local.getMonth() + 1).padStart(2, '0')
  const yyyy = local.getFullYear()
  const hh = String(local.getHours()).padStart(2, '0')
  const min = String(local.getMinutes()).padStart(2, '0')
  return `${dd}/${mm}/${yyyy} ${hh}:${min}`
}

function maybeDailyReset() {
  const key = getDateKeyRome()
  if (key !== lastResetKey) {
    for (const id of Object.keys(groupStats)) {
      if (groupStats[id]) groupStats[id].dailyMessages = 0
    }
    lastResetKey = key
  }
}

function getResetCountdownRome() {
  const now = nowRome()
  const midnight = new Date(now)
  midnight.setHours(24, 0, 0, 0)
  const ms = midnight - now
  const h = Math.max(0, Math.floor(ms / (1000 * 60 * 60)))
  const m = Math.max(0, Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60)))
  return { hours: h, minutes: m, nowDate: formatDateRome(now.toISOString()) }
}

function touchGroup(id, subject = '') {
  if (!groupStats[id]) {
    groupStats[id] = {
      totalMessages: 0,
      dailyMessages: 0,
      subject,
      lastUpdated: nowRome().toISOString()
    }
  }
  if (subject && groupStats[id].subject !== subject) {
    groupStats[id].subject = subject
    groupStats[id].lastUpdated = nowRome().toISOString()
  }
  return groupStats[id]
}

async function renderTopGroups(sorted, topCount) {
  const width = 1000
  const height = 200 + sorted.length * 110
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f172a'
  ctx.fillRect(0, 0, width, height)

  ctx.font = 'bold 50px Poppins, Roboto, "Segoe UI", "Noto Color Emoji", sans-serif'
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.fillText('🏆 TOP GRUPPI 🏆', width / 2, 80)

  ctx.font = '28px Roboto, Poppins, "Segoe UI", "Noto Color Emoji", sans-serif'
  ctx.textAlign = 'left'

  let y = 150
  for (let i = 0; i < sorted.length; i++) {
    const g = sorted[i]
    const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '🏅'

    ctx.fillStyle = '#ffffff'
    ctx.fillText(`${medal} #${i + 1} ${g.subject}`, 50, y)

    ctx.fillStyle = '#94a3b8'
    ctx.fillText(`📊 Oggi: ${g.dailyMessages} • 📈 Totali: ${g.totalMessages}`, 70, y + 35)
    ctx.fillText(`👥 Membri: ${g.participants} • ⏰ Ultimo: ${formatDateRome(g.lastActivity)}`, 70, y + 70)

    y += 110
  }

  const { hours, minutes, nowDate } = getResetCountdownRome()
  ctx.font = '22px Poppins, Roboto, "Segoe UI", "Noto Color Emoji", sans-serif'
  ctx.fillStyle = '#cbd5e1'
  ctx.textAlign = 'center'
  ctx.fillText(`Reset tra ${hours}h ${minutes}m • ${nowDate}`, width / 2, height - 40)

  return canvas.toBuffer('image/jpeg', { quality: 0.9 })
}

const handler = async (m, { conn, args }) => {
  maybeDailyReset()
  if (!m.isGroup) return m.reply('Questo comando funziona solo nei gruppi!')

  let topCount = 10
  if (args && args[0]) {
    const n = parseInt(args[0])
    if (!isNaN(n) && n > 0 && n <= 20) topCount = n
  }

  try {
    const groups = await conn.groupFetchAllParticipating()
    const list = Object.values(groups || {})
    const groupsData = await Promise.all(list.map(async g => {
      const id = g.id
      const subject = g.subject || 'Gruppo senza nome'
      const participants = Array.isArray(g.participants) ? g.participants.length : (g.participants?.length || 0)
      const s = touchGroup(id, subject)
      let photo
      try {
        photo = await conn.profilePictureUrl(id, 'image')
      } catch {
        photo = 'https://qu.ax/LoGxD.png'
      }
      return {
        id,
        subject,
        participants,
        totalMessages: s.totalMessages || 0,
        dailyMessages: s.dailyMessages || 0,
        photo,
        lastActivity: s.lastUpdated
      }
    }))

    const sorted = groupsData
      .sort((a, b) => {
        if (b.dailyMessages !== a.dailyMessages) return b.dailyMessages - a.dailyMessages
        if (b.totalMessages !== a.totalMessages) return b.totalMessages - a.totalMessages
        if (b.participants !== a.participants) return b.participants - a.participants
        return a.subject.localeCompare(b.subject)
      })
      .slice(0, topCount)

    const jpegBuffer = await renderTopGroups(sorted, topCount)
    await conn.sendMessage(m.chat, { image: jpegBuffer, caption: '🏆 Classifica gruppi attivi 🏆' }, { quoted: m })
  } catch (e) {
    console.error('topgruppi error:', e)
    await m.reply('Errore nel recuperare i gruppi.')
  }
}

handler.all = async (m, { conn }) => {
  maybeDailyReset()
  if (!m || !m.isGroup || !m.chat) return
  try {
    let subject = ''
    try {
      const md = await conn.groupMetadata(m.chat)
      subject = md?.subject || ''
    } catch {}
    const s = touchGroup(m.chat, subject)
    s.totalMessages++
    s.dailyMessages++
    s.lastUpdated = nowRome().toISOString()
  } catch {}
}

handler.command = /^topgruppi|topgroupss$/
handler.group = true
handler.admin = false
handler.botAdmin = false
handler.help = ['topgruppi [n]']
handler.tags = ['group']

export default handler