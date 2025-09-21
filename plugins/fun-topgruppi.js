import { createCanvas, loadImage, registerFont } from 'canvas'
import fs from 'fs'

// Registra i font solo se la cartella esiste
function safeRegisterFont(fontPath, options) {
  try {
    if (fs.existsSync(fontPath)) {
      registerFont(fontPath, options)
    }
  } catch {}
}

safeRegisterFont('fonts/Poppins-Regular.ttf', { family: 'Poppins' })
safeRegisterFont('fonts/Roboto-Regular.ttf', { family: 'Roboto' })
safeRegisterFont('fonts/Segoe-UI.ttf', { family: 'Segoe UI' })
safeRegisterFont('fonts/NotoColorEmoji.ttf', { family: 'Noto Color Emoji' })

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

// AGGIUNGI questa funzione per la ricarica giornaliera dei portafogli
async function dailyWalletRecharge(conn) {
  maybeDailyReset();
  // Prendi la classifica aggiornata
  const groups = await conn.groupFetchAllParticipating();
  const list = Object.values(groups || {});
  const groupsData = await Promise.all(list.map(async g => {
    const id = g.id;
    const subject = g.subject || 'Gruppo senza nome';
    const participants = Array.isArray(g.participants) ? g.participants : (g.participants?.map?.(p => p.id) || []);
    const s = touchGroup(id, subject);
    return {
      id,
      subject,
      participants,
      totalMessages: s.totalMessages || 0,
      dailyMessages: s.dailyMessages || 0,
      lastActivity: s.lastUpdated
    }
  }));

  const sorted = groupsData
    .sort((a, b) => {
      if (b.dailyMessages !== a.dailyMessages) return b.dailyMessages - a.dailyMessages;
      if (b.totalMessages !== a.totalMessages) return b.totalMessages - a.totalMessages;
      if ((b.participants?.length || 0) !== (a.participants?.length || 0)) return (b.participants?.length || 0) - (a.participants?.length || 0);
      return a.subject.localeCompare(b.subject);
    })
    .slice(0, 3);

  // Premi: 1° 2000, 2° 1000, 3° 500
  const rewards = [2000, 1000, 500];
  let notifyMsgs = [];

  for (let pos = 0; pos < sorted.length; pos++) {
    const group = sorted[pos];
    const reward = rewards[pos];
    if (!group || !group.id || !Array.isArray(group.participants)) continue;
    let count = 0;
    for (const userId of group.participants) {
      // Prendi il db portafoglio
      let user = global.db?.data?.users?.[userId];
      if (!user) continue;
      if (!user.limit) user.limit = 0;
      user.limit += reward;
      count++;
    }
    // Messaggio di avviso nel gruppo
    if (count > 0) {
      let msg = `💸 *RICARICA GIORNALIERA PORTAFOGLI*\n\n🏆 Questo gruppo è in posizione #${pos + 1} nella classifica giornaliera!\nTutti i membri hanno ricevuto:\n${reward} 💶 UnityCoins\n\nComplimenti a tutti!`;
      await conn.sendMessage(group.id, { text: msg });
      notifyMsgs.push({ group: group.subject, reward, count });
    }
  }
  return notifyMsgs;
}

// Esegui la ricarica giornaliera quando cambia giorno (dopo maybeDailyReset)
let lastRechargeKey = null;
async function maybeDailyRecharge(conn) {
  const key = getDateKeyRome();
  if (key !== lastRechargeKey) {
    lastRechargeKey = key;
    await dailyWalletRecharge(conn);
  }
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
  await maybeDailyRecharge(conn)
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