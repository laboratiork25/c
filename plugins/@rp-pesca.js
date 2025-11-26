import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Lista pesci con peso (probabilità relative) e prezzo di vendita
const FISH_LIST = [
  { key: 'pesce_comune', name: 'Pesce Comune', emoji: '🐟', weight: 50, price: 10 },
  { key: 'pesce_mediano', name: 'Pesce Mediano', emoji: '🐠', weight: 30, price: 40 },
  { key: 'pesce_grande', name: 'Tonno', emoji: '🐡', weight: 15, price: 120 },
  { key: 'pesce_rare', name: 'Pesce Raro', emoji: '🦈', weight: 4, price: 800 },
  { key: 'pesce_leggendario', name: 'Pesce Leggendario', emoji: '🐲', weight: 1, price: 5000 }
]

const COOLDOWN_MS = 10 * 60 * 1000 // 10 minuti tra una pesca e l'altra

function weightedRandom(list) {
  const total = list.reduce((s, i) => s + i.weight, 0)
  let r = Math.random() * total
  for (const item of list) {
    if (r < item.weight) return item
    r -= item.weight
  }
  return list[0]
}

function ensureUser(db, sender) {
  if (!db.data) db.data = {}
  if (!db.data.users) db.data.users = {}
  if (!db.data.users[sender]) db.data.users[sender] = { limit: 0 }
  return db.data.users[sender]
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const user = ensureUser(global.db, m.sender)
  const sub = (args[0] || '').toLowerCase()

  // Comando: /fish sell <item> <qty>
  if (['sell', 'vendi'].includes(sub) || (command === 'pescavendi')) {
    // supporto: /fish sell pesce_comune 2
    let item = args[1]
    let qty = Math.max(1, parseInt(args[2]) || 1)
    if (!item) return conn.reply(m.chat, `🏫 Usa: ${usedPrefix}fish sell <nome_del_pesce> [quantità]\nPuoi vedere tutti i tuoi pesci dentro .profilo`, m, tutorial)

    const fishDef = FISH_LIST.find(f => f.key === item || f.name.toLowerCase().includes(item))
    if (!fishDef) return conn.reply(m.chat, `❌ Pesce non valido. Prova ${usedPrefix}fish inv per la lista`, m)

    const have = user[item] || 0
    if (have < qty) return conn.reply(m.chat, `❌ Non hai abbastanza ${fishDef.name}. Ne hai: ${have}`, m)

    const sellValue = Math.floor(fishDef.price * 0.6) * qty
    user[item] = have - qty
    if (user[item] <= 0) delete user[item]
    user.limit = (user.limit || 0) + sellValue

    return conn.reply(m.chat, `💰 Hai venduto ${qty} x ${fishDef.emoji} ${fishDef.name} per ${sellValue} 🍬\nSaldo: ${user.limit} 🍬`, m, phishy)
  }

  // NOTE: inventory subcommand removed — use the global .inv command to view your items.

  // Comando principale: pesca
  // Verifiche: possiede canna?
  if (!user.canna || user.canna <= 0) {
    return conn.reply(m.chat, `🏫 Ti serve una canna da pesca per pescare.\n🎣 Comprala con: \n\`${usedPrefix}shop canna\``, m, tutorial )
  }

  // Cooldown
  user.cooldowns = user.cooldowns || {}
  const last = user.cooldowns.fish || 0
  const now = Date.now()
  if (now - last < COOLDOWN_MS) {
    const leftMs = COOLDOWN_MS - (now - last);
    const leftSec = Math.ceil(leftMs / 1000);
    if (leftSec >= 60) {
      const leftMin = Math.ceil(leftSec / 60);
      return conn.reply(m.chat, `⏳ non ci sono ancora pesci da catturare. Riprova tra ${leftMin} minuti`, m, phishy);
    } else {
      return conn.reply(m.chat, `⏳ non ci sono ancora pesci da catturare. Riprova tra ${leftSec} secondi`, m, phishy);
    }
  }

  // Simula azione pesca con delay
  await conn.reply(m.chat, '🎣 Lanci la lenza... aspetta qualche secondo...', m)
  await new Promise(r => setTimeout(r, 1500 + Math.floor(Math.random() * 2000)))

  // Determina successo (possibilità anche di nulla)
  const missChance = 0.12 // 12% niente
  if (Math.random() < missChance) {
    user.cooldowns.fish = Date.now()
    return conn.reply(m.chat, '😕 Non hai preso nulla questa volta. Riprova!', m)
  }

  const caught = weightedRandom(FISH_LIST)
  user[caught.key] = (user[caught.key] || 0) + 1
  user.cooldowns.fish = Date.now()

  // messaggio di successo
  const msg = `✅ Hai pescato: ${caught.emoji} *${caught.name}*\nValore medio: ${caught.price} 🍬\nUsa ${usedPrefix}fish sell ${caught.key} per venderlo.`
  return conn.reply(m.chat, msg, m)
}

handler.help = ['fish', 'pesca', 'pescare']
handler.tags = ['rpg', 'fun']
handler.command = /^(fish|pesca|pescare|pescavendi)$/i
handler.register = true

export default handler
