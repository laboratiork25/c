function normalizeKey(s) { return (s || '').toString().toLowerCase().replace(/[^a-z0-9]/g, '') }

const STYLES = [
  { key: 'water', name: 'Water Breathing', attack: 1.0, crit: 6 },
  { key: 'flame', name: 'Flame Breathing', attack: 1.05, crit: 5 },
  { key: 'thunder', name: 'Thunder Breathing', attack: 1.1, crit: 4 },
  { key: 'stone', name: 'Stone Breathing', attack: 0.95, crit: 8 },
  { key: 'insect', name: 'Insect Breathing', attack: 0.9, crit: 10 }
]

// Prices / store
const SHOP = [
  { id: 'nichirin-water', label: 'Nichirin (Water)', price: 200, style: 'water' },
  { id: 'nichirin-flame', label: 'Nichirin (Flame)', price: 200, style: 'flame' },
  { id: 'nichirin-thunder', label: 'Nichirin (Thunder)', price: 250, style: 'thunder' },
  { id: 'elixir', label: 'Elixir (heal)', price: 50 }
]

const MAX_DAILY_MISSIONS = 3
const COOLDOWNS = { train: 10 * 1000, hunt: 15 * 1000 } // small for testing

// Ranks inspired by Demon Slayer hierarchy (adjustable)
const RANKS = [
  { key: 'recruit',   name: 'Recruit', minLevel: 1 },
  { key: 'slayer',    name: 'Demon Slayer', minLevel: 5 },
  { key: 'captain',   name: 'Squad Captain', minLevel: 15 },
  { key: 'candidate', name: 'Pillar Candidate', minLevel: 25 },
  { key: 'hashira',   name: 'Hashira (Pillar)', minLevel: 40 }
]

function ensureUser(db, sender) {
  if (!db.data) db.data = {}
  if (!db.data.users) db.data.users = {}
  if (!db.data.users[sender]) db.data.users[sender] = { coins: 0 }
  const u = db.data.users[sender]
  if (!u.slayer) u.slayer = { joined: false, style: null, level: 1, xp: 0, coins: 0, swords: [], cooldowns: {}, missions: { lastReset: 0, daily: [] }, rank: 'recruit' }
  if (!u.slayer.cooldowns) u.slayer.cooldowns = {}
  if (!u.slayer.missions) u.slayer.missions = { lastReset: 0, daily: [] }
  return u
}

function getStyle(key) {
  if (!key) return null
  key = normalizeKey(key)
  return STYLES.find(s => s.key === key)
}

function getRankByLevel(level) {
  // find highest rank whose minLevel <= level
  let rank = RANKS[0]
  for (const r of RANKS) {
    if (level >= (r.minLevel || 0)) rank = r
  }
  return rank
}

function getRankForUser(user) {
  const s = user.slayer
  if (!s) return null
  return getRankByLevel(s.level)
}

function formatSlayerProfile(user) {
  const s = user.slayer
  if (!s.joined) return `⚠️ Non sei ancora diventato uno *Slayer*. Usa .demon join <stile> per iniziare`;
  const rank = getRankForUser(user)
  return `꒷꒦ ✦ PROFILO SLAYER ✦ ꒷꒦\n\n` +
    `👤 Utente: @${user._id || 'unknown'}\n` +
    `🔰 Stile: ${s.style || '—'}\n` +
    `🏅 Rank: ${rank ? rank.name : (s.rank || 'Recruit')}\n` +
    `🗡️ Swords: ${s.swords.length ? s.swords.join(', ') : '—'}\n` +
    `⚔️ Level: ${s.level}\n` +
    `🌟 XP: ${s.xp}\n` +
    `💰 UC: ${s.coins}\n` +
    `╰★────★────★`
}

function giveXP(user, amount) {
  const s = user.slayer
  s.xp += amount
  // level up check: simple formula 100 * level
  const needed = 50 + s.level * 50
  let voiced = ''
  const prevRank = getRankForUser(user)
  while (s.xp >= needed) {
    s.xp -= needed
    s.level += 1
    voiced += `\n✅ Sei salito al livello ${s.level}!`
  }
  const newRank = getRankForUser(user)
  if (newRank && prevRank && newRank.key !== prevRank.key) {
    voiced += `\n🎖️ PROMOSSO: ${newRank.name} (da ${prevRank.name})!`
    s.rank = newRank.key
  }
  return voiced
}

function checkMissions(user, type, amount = 1) {
  const s = user.slayer
  if (!s.missions || !s.missions.daily) return ''
  let out = ''
  for (const ms of s.missions.daily) {
    if (ms.type === type && ms.done < ms.target) {
      ms.done += amount
      if (ms.done >= ms.target) {
        // reward: give xp via giveXP to ensure level up logic
        const xp = ms.reward?.xp || 0
        const coins = ms.reward?.coins || 0
        giveXP(user, xp)
        s.coins = (s.coins || 0) + coins
        out += `\n🎉 Missione #${ms.id} completata! Ricompensa: ${xp} XP e ${coins} UC`
      }
    }
  }
  return out
}

let handler = async (m, { conn, args, command, usedPrefix }) => {
  const user = ensureUser(global.db, m.sender)
  const sub = (args[0] || '').toLowerCase()
  const s = user.slayer

  // help
  if (!sub || sub === 'help') {
    const help = `꒷꒦ ✦ DEMON SLAYER - RUOLO ✦ ꒷꒦\n\n` +
      `• ${usedPrefix}demon join <water|flame|thunder|stone|insect> — Diventa uno Slayer\n` +
      `• ${usedPrefix}demon profile — Mostra il tuo profilo\n` +
      `• ${usedPrefix}demon train — Allenati per ottenere XP e UC (cooldown)\n` +
      `• ${usedPrefix}demon hunt — Caccia demoni (combat system)\n` +
      `• ${usedPrefix}demon shop — Mostra negozio\n` +
      `• ${usedPrefix}demon buy <itemId> — Compra dal negozio\n\n` +
      `• ${usedPrefix}demon pvp @user — Sfida un altro Slayer\n` +
      `• ${usedPrefix}demon accept — Accetta una sfida PvP in arrivo\n` +
      `• ${usedPrefix}demon decline — Rifiuta una sfida PvP in arrivo\n\n` +
      `💡 Prova a combattere, migliorare il livello e acquistare oggetti per potenziare il tuo slayer.`
    return conn.reply(m.chat, help, m, rcanal)
  }

  // rank (show player's rank and progress to next)
  if (sub === 'rank') {
    // optional mention
    const tgt = (m.mentionedJid && m.mentionedJid[0]) || m.quoted && m.quoted.sender || m.sender
    const u = ensureUser(global.db, tgt)
    const s2 = u.slayer
    if (!s2 || !s2.joined) return conn.reply(m.chat, `❌ L'utente non è uno Slayer.`, m)
    const rankInfo = getRankByLevel(s2.level)
    const nextRank = RANKS.find(r => r.minLevel > rankInfo.minLevel)
    const levelsToNext = nextRank ? Math.max(0, nextRank.minLevel - s2.level) : 0
    return conn.reply(m.chat, `꒷꒦ ✦ RANK SLAYER ✦ ꒷꒦\n\n👤 @${tgt.split('@')[0]}\n🔰 Rank: ${rankInfo.name}\n⚔️ Livello: ${s2.level}\n🌟 XP: ${s2.xp}\n${nextRank ? `⏳ Livelli mancanti per ${nextRank.name}: ${levelsToNext}` : `🏅 Hai raggiunto il massimo rank!`}`, m, rcanal)
  }

  // leaderboard / top slayers
  if (sub === 'leaderboard' || sub === 'top') {
    const users = Object.entries((global.db.data && global.db.data.users) || {})
      .map(([jid, u]) => ({ jid, level: u.slayer?.level || 0, xp: u.slayer?.xp || 0 }))
      .filter(x => x.level > 0)
      .sort((a,b) => b.level - a.level || b.xp - a.xp)
    const top = users.slice(0, 10)
    let text = `꒷꒦ ✦ TOP SLAYERS ✦ ꒷꒦\n\n`
    top.forEach((t, i) => {
      const u = global.db.data.users[t.jid]
      const name = (t.jid || '').split('@')[0]
      const rankn = getRankByLevel(t.level)
      text += `#${i+1} ${name} — ${rankn.name} | Lv ${t.level} | XP ${t.xp}\n`
    })
    return conn.reply(m.chat, text, m, rcanal)
  }

  // Join or set style
  if (sub === 'join') {
    const styleArg = (args[1] || '').toLowerCase()
    if (!styleArg) return conn.reply(m.chat, `╭┈ ─ ─ ✦ ─ ─ ┈╮\n  ୧ ⚠️ ୭ *Uso:* ${usedPrefix}demon join <water|flame|thunder|stone|insect>\n╰★────★────★`, m, rcanal)
    const style = getStyle(styleArg)
    if (!style) return conn.reply(m.chat, `⚠️ Stile non valido — scegli: water, flame, thunder, stone, insect`, m)
    s.joined = true
    s.style = style.name
    s.level = s.level || 1
    s.xp = s.xp || 0
    s.coins = s.coins || 50 // starting coins
    s.swords = s.swords || []
    s.cooldowns = s.cooldowns || {}
    return conn.reply(m.chat, `꒷꒦ ✦ BENARRIVATO SLAYER ✦ ꒷꒦\n\nHai ottenuto il *${style.name}*!\n💰 UC iniziali: ${s.coins}\nBuona caccia, @${m.sender.split('@')[0]}`, m, rcanal)
  }

  // profile
  if (sub === 'profile') {
    // attach dynamic _id for profile rendering
    user._id = m.sender.split('@')[0]
    // attach rank info
    const rank = getRankForUser(user)
    if (rank) user.slayer.rank = rank.key
    return conn.reply(m.chat, formatSlayerProfile(user), m, rcanal)
  }

  // train
  if (sub === 'train') {
    const now = Date.now()
    if ((s.cooldowns.train || 0) > now) {
      const wait = Math.ceil(((s.cooldowns.train || 0) - now) / 1000)
      return conn.reply(m.chat, `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Sono in cooldown: aspetta ${wait}s\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`, m, rcanal)
    }
    // reward random
    const xp = 10 + Math.floor(Math.random() * 30)
    const coins = 5 + Math.floor(Math.random() * 15)
    const leveled = giveXP(user, xp)
    s.coins = (s.coins || 0) + coins
    // update missions progress
    const missionTxt = checkMissions(user, 'train', 1)
    const fullText = `꒷꒦ ✦ ALLENAMENTO ✦ ꒷꒦\n\nHai guadagnato: +${xp} XP | +${coins} UC${leveled}` + (missionTxt ? `\n${missionTxt}` : '')
    s.cooldowns.train = Date.now() + COOLDOWNS.train
    return conn.reply(m.chat, fullText, m, rcanal)
  }

  // shop
  if (sub === 'shop') {
    let text = `꒷꒦ ✦ NEGOZIO SLAYER ✦ ꒷꒦\n\n`
    SHOP.forEach(item => { text += `• ${item.label} - ${item.price} UC (id: ${item.id})\n` })
    text += `\nUsa: ${usedPrefix}demon buy <itemId>`
    return conn.reply(m.chat, text, m, rcanal)
  }

  // pvp challenge
  if (sub === 'pvp') {
    const targetJid = (m.mentionedJid && m.mentionedJid[0]) || m.quoted && m.quoted.sender || args[1]
    if (!targetJid) return conn.reply(m.chat, `❌ Devi menzionare un utente. Esempio: ${usedPrefix}demon pvp @nome`, m)
    if (targetJid === m.sender) return conn.reply(m.chat, `⚠️ Non puoi sfidare te stesso!`, m)
    const targetUser = ensureUser(global.db, targetJid)
    if (!s.joined) return conn.reply(m.chat, `⚠️ Devi prima unirti come Slayer: ${usedPrefix}demon join <stile>`, m)
    if (!targetUser.slayer || !targetUser.slayer.joined) return conn.reply(m.chat, `⚠️ L'utente non è uno Slayer.`, m)
    // cooldown
    const now = Date.now()
    if ((s.cooldowns.pvp || 0) > now) {
      const wait = Math.ceil(((s.cooldowns.pvp || 0) - now) / 1000)
      return conn.reply(m.chat, `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Sei in cooldown PvP, aspetta ancora ${wait}s\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`, m, rcanal)
    }
    // check if challenger has already an ongoing challenge
    if (s.pvp && s.pvp.target && Date.now() - (s.pvp.timestamp || 0) < 60*1000) return conn.reply(m.chat, `⚠️ Hai già una sfida in sospeso. Aspetta che venga accettata o scada.`, m)
    // check if target has pvp cooldown or pending
    if ((targetUser.slayer.cooldowns || {}).pvp > now) return conn.reply(m.chat, `⚠️ L'utente è in cooldown PvP e non può essere sfidato ora.`, m)
    if (targetUser.slayer.incomingPvp) return conn.reply(m.chat, `⚠️ L'utente ha già una sfida in sospeso.`, m)
    // create challenge
    s.pvp = { target: targetJid, timestamp: now }
    targetUser.slayer.incomingPvp = { from: m.sender, timestamp: now }
    // notify
    return conn.reply(m.chat, `꒷꒦ ✦ SFIDA PvP ✦ ꒷꒦\n\n@${m.sender.split('@')[0]} ti ha sfidato a duello!\nUsa: ${usedPrefix}demon accept per accettare o ${usedPrefix}demon decline per rifiutare (60s)`, m, rcanal)
  }

  // accept or decline
  if (sub === 'accept' || sub === 'decline') {
    const inc = s.incomingPvp
    if (!inc) return conn.reply(m.chat, `❌ Non ci sono sfide in attesa per te.`, m)
    const from = inc.from
    const fromUser = ensureUser(global.db, from)
    // check expired
    if (Date.now() - (inc.timestamp || 0) > 60*1000) {
      delete s.incomingPvp
      delete fromUser.slayer.pvp
      return conn.reply(m.chat, `⌛ La sfida è scaduta.`, m, rcanal)
    }
    if (sub === 'decline') {
      delete s.incomingPvp
      delete fromUser.slayer.pvp
      return conn.reply(m.chat, `✖️ Sfida rifiutata.`, m, rcanal)
    }
    // accept flow
    if ((fromUser.slayer.cooldowns || {}).pvp > Date.now()) return conn.reply(m.chat, `⚠️ Il challenger è in cooldown PvP e non può essere accettato.`, m)
    // ensure both joined
    if (!fromUser.slayer || !fromUser.slayer.joined) return conn.reply(m.chat, `❌ Il giocatore che ti ha sfidato non è più uno Slayer.`, m)
    // run PvP
    const res = runPvP(from, m.sender)
    // clear
    delete s.incomingPvp
    delete fromUser.slayer.pvp
    return conn.reply(m.chat, res, m, rcanal)
  }

  if (sub === 'buy') {
    const itemId = args[1]
    const item = SHOP.find(x => x.id === itemId)
    if (!item) return conn.reply(m.chat, `❌ Articolo non trovato. Usa ${usedPrefix}demon shop per vedere gli id.`, m)
    if ((s.coins || 0) < item.price) return conn.reply(m.chat, `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 💸 Non hai abbastanza UC per acquistare ${item.label}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`, m, rcanal)
    s.coins -= item.price
    if (item.id.startsWith('nichirin')) {
      s.swords.push(item.label)
      return conn.reply(m.chat, `꒷꒦ ✦ ACQUISTO ESEGUITO ✦ ꒷꒦\n\nHai acquistato: ${item.label}`, m, rcanal)
    }
    // elixir
    if (item.id === 'elixir') {
      return conn.reply(m.chat, `꒷꒦ ✦ ACQUISTO ESEGUITO ✦ ꒷꒦\n\nHai acquistato: ${item.label} (placeholder: non consumabile automatico)`, m, rcanal)
    }
  }

  // hunt
  if (sub === 'hunt') {
    const now = Date.now()
    if ((s.cooldowns.hunt || 0) > now) {
      const wait = Math.ceil(((s.cooldowns.hunt || 0) - now) / 1000)
      return conn.reply(m.chat, `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Sono in cooldown: aspetta ${wait}s\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`, m, rcanal)
    }
    if (!s.joined) return conn.reply(m.chat, `⚠️ Devi prima unirti come Slayer: ${usedPrefix}demon join <stile>`, m)
    const demonLevel = Math.max(1, s.level + (Math.floor(Math.random() * 3) - 1))
    const demonHP = 20 + demonLevel * 10
    const demonAtk = 3 + demonLevel * 2

    // player combat calculation
    const styleObj = STYLES.find(x => x.name === s.style) || STYLES[0]
    let playerAtk = Math.round(5 + s.level * 2 * (styleObj?.attack || 1))
    if (s.swords.length) playerAtk += 5
    const playerHP = 10 + s.level * 5

    // simple fight simulation
    let demonHealth = demonHP
    let playerHealth = playerHP
    let log = `꒷꒦ ✦ CACCIA DEMONI ✦ ꒷꒦\n\n🏹 Sei entrato in battaglia! Level demon: ${demonLevel}\n\n`;
    while (demonHealth > 0 && playerHealth > 0) {
      // player hits
      const critRoll = Math.random() * 100
      const crit = critRoll < (styleObj.crit || 5)
      const damage = playerAtk + (crit ? Math.floor(playerAtk * 0.5) : 0) + Math.floor(Math.random() * 4)
      demonHealth -= damage
      log += `🗡️ Colpi: Hai inflitto ${damage} danno${crit ? ' (CRITICO!)' : ''}\n`
      if (demonHealth <= 0) break
      // demon hits
      const demonDamage = demonAtk + Math.floor(Math.random() * 3)
      playerHealth -= demonDamage
      log += `👹 Demone: Ricevi ${demonDamage} danno\n`
    }
    let resText = ''
    if (playerHealth > 0) {
      const rewardXp = 20 + demonLevel * 10
      const rewardCoins = 10 + demonLevel * 5
      giveXP(user, rewardXp)
      s.coins += rewardCoins
      const missionTxtHunt = checkMissions(user, 'hunt', 1)
      const missionTxtWin = checkMissions(user, 'win', 1)
      resText = `✅ Vittoria!\nHai ottenuto: +${rewardXp} XP | +${rewardCoins} UC\n` + (missionTxtHunt ? missionTxtHunt : '') + (missionTxtWin ? missionTxtWin : '')
      // rare drop chance
      if (Math.random() < 0.08) {
        const drop = SHOP[Math.floor(Math.random() * SHOP.length)]
        s.swords.push(drop.label + ' (drop)')
        resText += `🎁 Drop raro: ${drop.label}\n`
      }
    } else {
      // lost
      const loss = Math.max(1, Math.floor(s.level * 2))
      s.coins = Math.max(0, s.coins - loss)
      resText = `💀 Sconfitta...\nHai perso ${loss} UC.\n`
    }
    s.cooldowns.hunt = Date.now() + COOLDOWNS.hunt
    return conn.reply(m.chat, log + '\n' + resText, m, rcanal)
  }

  // missions - simple daily tasks
  if (sub === 'missions') {
    const now = Date.now()
    if ((s.missions?.lastReset || 0) + 24*60*60*1000 < now) {
      s.missions = { lastReset: now, daily: [] }
    }
    if (s.missions.daily.length === 0) {
      // generate missions
      const types = ['train', 'hunt', 'win']
      for (let i = 0; i < MAX_DAILY_MISSIONS; i++) {
        const t = types[Math.floor(Math.random() * types.length)]
        s.missions.daily.push({ id: i+1, type: t, target: (t === 'train' ? 3 : (t === 'hunt' ? 2 : 1)), done: 0, reward: { xp: 30, coins: 50 } })
      }
    }
    let text = `꒷꒦ ✦ MISSIONI QUOTIDIANE ✦ ꒷꒦\n\n`
    s.missions.daily.forEach(ms => text += `• #${ms.id} ${ms.type} — ${ms.done}/${ms.target} (Ricompensa: ${ms.reward.xp} XP + ${ms.reward.coins} UC)\n`)
    text += `\nCompleta le missioni per ottenere ricompense!`
    return conn.reply(m.chat, text, m, rcanal)
  }

  // unknown sub
  return conn.reply(m.chat, `❌ Comando demon non valido. Usa ${usedPrefix}demon help per le opzioni.`, m)
}

handler.help = ['demon <help|join|profile|train|hunt|shop|buy|missions|pvp|accept|decline>']
handler.tags = ['rpg', 'fun']
handler.command = /^(demon|slayer|demonslayer)$/i
handler.register = true
handler.priority = 1

export default handler

function runPvP(challengerJid, targetJid) {
  const u1 = ensureUser(global.db, challengerJid)
  const u2 = ensureUser(global.db, targetJid)
  const s1 = u1.slayer
  const s2 = u2.slayer
  // stats calculate
  const style1 = STYLES.find(x => x.name === s1.style) || STYLES[0]
  const style2 = STYLES.find(x => x.name === s2.style) || STYLES[0]
  let atk1 = Math.round(5 + s1.level * 2 * (style1?.attack || 1)) + (s1.swords.length ? 5 : 0)
  let atk2 = Math.round(5 + s2.level * 2 * (style2?.attack || 1)) + (s2.swords.length ? 5 : 0)
  let hp1 = 10 + s1.level * 5
  let hp2 = 10 + s2.level * 5
  let log = `꒷꒦ ✦ PvP DUEL ✦ ꒷꒦\n\n` + `🏁 ${challengerJid.split('@')[0]} VS ${targetJid.split('@')[0]}\n\n`
  // fight rounds with speed advantage random
  let turn = Math.random() > 0.5 ? 1 : 2
  while (hp1 > 0 && hp2 > 0) {
    if (turn === 1) {
      const crit = Math.random() * 100 < (style1.crit || 5)
      const dmg = atk1 + (crit ? Math.floor(atk1 * 0.5) : 0) + Math.floor(Math.random() * 4)
      hp2 -= dmg
      log += `🗡️ ${challengerJid.split('@')[0]} colpisce ${dmg}${crit ? ' (CRIT!)' : ''} — HP ${Math.max(0,hp2)}\n`
      turn = 2
      if (hp2 <= 0) break
    } else {
      const crit = Math.random() * 100 < (style2.crit || 5)
      const dmg = atk2 + (crit ? Math.floor(atk2 * 0.5) : 0) + Math.floor(Math.random() * 4)
      hp1 -= dmg
      log += `🗡️ ${targetJid.split('@')[0]} colpisce ${dmg}${crit ? ' (CRIT!)' : ''} — HP ${Math.max(0,hp1)}\n`
      turn = 1
      if (hp1 <= 0) break
    }
  }
  const now = Date.now()
  const cooldown = 60*1000
  // handle results
  let res = ''
  if (hp1 > 0) {
    // challenger wins
    const rewardXp = 30 + s1.level * 10
    const rewardCoins = 20 + s1.level * 10
    giveXP(u1, rewardXp)
    s1.coins += rewardCoins
    // loser penalty
    const loss = Math.max(1, Math.floor(s2.level * 2))
    s2.coins = Math.max(0, s2.coins - loss)
    res = `🏆 ${challengerJid.split('@')[0]} vince!\nRicompensa: +${rewardXp} XP | +${rewardCoins} UC\nSconfitta: ${targetJid.split('@')[0]} perde ${loss} UC\n`
    // missions
    checkMissions(u1, 'win', 1)
  } else {
    const rewardXp = 30 + s2.level * 10
    const rewardCoins = 20 + s2.level * 10
    giveXP(u2, rewardXp)
    s2.coins += rewardCoins
    const loss = Math.max(1, Math.floor(s1.level * 2))
    s1.coins = Math.max(0, s1.coins - loss)
    res = `🏆 ${targetJid.split('@')[0]} vince!\nRicompensa: +${rewardXp} XP | +${rewardCoins} UC\nSconfitta: ${challengerJid.split('@')[0]} perde ${loss} UC\n`
    checkMissions(u2, 'win', 1)
  }
  // set cooldowns for both
  s1.cooldowns.pvp = now + cooldown
  s2.cooldowns.pvp = now + cooldown
  return log + '\n' + res
}
