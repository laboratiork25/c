// Codice di database-top.js

// PLUGIN .database
// by Youns + Axtral_WiZaRd
// Gruppi totali = attivi + esclusi (bacheche escluse)

function dateKeyRome() {
  const nowRome = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome' }))
  const y = nowRome.getFullYear()
  const m = String(nowRome.getMonth() + 1).padStart(2, '0')
  const d = String(nowRome.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}` // ❗️Corretto uso di template literal
}

function ensureDB() {
  if (!global.db) global.db = { data: { users: {}, chats: {}, _dailyDate: null, excluded: { users: {}, chats: {} } } }
  if (!global.db.data) global.db.data = { users: {}, chats: {}, _dailyDate: null, excluded: { users: {}, chats: {} } }
  if (!global.db.data.users) global.db.data.users = {}
  if (!global.db.data.chats) global.db.data.chats = {}
  if (!('_dailyDate' in global.db.data)) global.db.data._dailyDate = null
  if (!global.db.data.excluded) global.db.data.excluded = { users: {}, chats: {} }
}

let handler = async (m, { conn }) => {
  ensureDB()

  const allGroups = Object.keys(conn.chats || {})
    .filter(jid => jid.endsWith('@g.us'))
    .filter(jid => !jid.includes('@c.us'))

  let excludedChats = Object.keys(global.db.data.excluded.chats || {})
  let validGroups = []

  for (const jid of allGroups) {
    let meta = {}
    try {
      meta = conn.chats[jid]?.metadata || (await conn.groupMetadata(jid)) || {}
    } catch {}

    // escludiamo bacheche e community
    if (
      meta?.isCommunity ||
      meta?.announce ||
      meta?.read_only
    ) continue

    if (!excludedChats.includes(jid)) validGroups.push(jid)
  }

  const totalGroups = validGroups.length + excludedChats.length

  // utenti
  let users = Object.keys(global.db.data.users)
  let excludedUsers = Object.keys(global.db.data.excluded.users || {})

  let caption = `📂 𝐃𝐀𝐓𝐀𝐁𝐀𝐒𝐄 𝐈𝐍𝐅𝐎\n\n`
  caption += `👥 𝐆𝐫𝐮𝐩𝐩𝐢 𝐭𝐨𝐭𝐚𝐥𝐢: *${totalGroups}*\n`
  caption += `📌 𝐆𝐫𝐮𝐩𝐩𝐢 𝐚𝐭𝐭𝐢𝐯𝐢: *${validGroups.length}*\n`
  caption += `🚫 𝐆𝐫𝐮𝐩𝐩𝐢 𝐞𝐬𝐜𝐥𝐮𝐬𝐢: *${excludedChats.length}*\n\n`
  caption += `👤 𝐔𝐭𝐞𝐧𝐭𝐢 𝐭𝐨𝐭𝐚𝐥𝐢: *${users.length}*\n`
  caption += `✅ 𝐔𝐭𝐞𝐧𝐭𝐢 𝐚𝐭𝐭𝐢𝐯𝐢: *${users.length - excludedUsers.length}*\n`
  caption += `🚫 𝐔𝐭𝐞𝐧𝐭𝐢 𝐞𝐬𝐜𝐥𝐮𝐬𝐢: *${excludedUsers.length}*`

  conn.sendMessage(m.chat, { text: caption })
}

handler.command = /^(infoglobali|gruppi)$/i
export default handler
