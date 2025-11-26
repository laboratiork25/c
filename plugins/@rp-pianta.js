

const PLANTS = [
  // common / fast
  { key: 'fiore_rosso', name: 'Fiore Rosso', emoji: '🌹', growTime: 600, effects: { type: 'bonus', kind: 'dolci', amount: 120 } }, // 10 min
  { key: 'erba_magica', name: 'Erba Magica', emoji: '🌿', growTime: 900, effects: { type: 'bonus', kind: 'exp', amount: 100 } }, // 15 min
  { key: 'pianta_veloce', name: 'Pianta Veloce', emoji: '⚡', growTime: 600, effects: { type: 'bonus', kind: 'cooldown_reduce', amount: 0.5 } }, // 10 min
  { key: 'erba_curativa', name: 'Erba Curativa', emoji: '🍀', growTime: 1200, effects: { type: 'bonus', kind: 'exp', amount: 150 } }, // 20 min
  { key: 'fiore_giallo', name: 'Fiore Giallo', emoji: '🌼', growTime: 720, effects: { type: 'bonus', kind: 'dolci', amount: 80 } }, // 12 min
  { key: 'foglia_leggera', name: 'Foglia Leggera', emoji: '🍃', growTime: 720, effects: { type: 'bonus', kind: 'exp', amount: 60 } }, // 12 min

  // uncommon
  { key: 'rosa_bianca', name: 'Rosa Bianca', emoji: '🌸', growTime: 1500, effects: { type: 'bonus', kind: 'dolci', amount: 250 } }, // 25 min
  { key: 'pianta_pazza', name: 'Pianta Pazza', emoji: '🎲', growTime: 1200, effects: { type: 'random' } }, // 20 min
  { key: 'fiore_luminoso', name: 'Fiore Luminoso', emoji: '✨', growTime: 1800, effects: { type: 'bonus', kind: 'exp', amount: 200 } }, // 30 min
  { key: 'erba_leggendaria', name: 'Erba Leggendaria', emoji: '🌟', growTime: 3600, effects: { type: 'bonus', kind: 'dolci', amount: 700 } }, // 1h

  // rare / valuable
  { key: 'erba_fortuna', name: 'Erba della Fortuna', emoji: '🍃', growTime: 2400, effects: { type: 'bonus', kind: 'dolci', amount: 500 } }, // 40 min
  { key: 'pianta_scudo', name: 'Pianta Scudo', emoji: '🛡️', growTime: 4200, effects: { type: 'bonus', kind: 'scudo', duration: 4 * 60 * 60 * 1000 } }, // 1h 10min
  { key: 'albero_dorato', name: 'Albero Dorato', emoji: '🌲', growTime: 7200, effects: { type: 'bonus', kind: 'dolci', amount: 1800 } }, // 2h

  // slow / high reward
  { key: 'albero_frutto', name: 'Albero da Frutto', emoji: '🌳', growTime: 9000, effects: { type: 'bonus', kind: 'dolci', amount: 2700 } }, // 2h 30min
  { key: 'pianta_lenta', name: 'Pianta Lenta', emoji: '🪴', growTime: 5400, effects: { type: 'bonus', kind: 'exp', amount: 400 } }, // 1h 30min
  { key: 'melograno', name: 'Melograno Antico', emoji: '🥀', growTime: 7200, effects: { type: 'bonus', kind: 'dolci', amount: 1350 } }, // 2h

  // utility / item seeds
  { key: 'seme_raro', name: 'Seme Raro', emoji: '🫘', growTime: 600, effects: { type: 'bonus', kind: 'item', item: { type: 'seed', key: 'seme_raro', amount: 2 } } }, // 10 min
  { key: 'seme_comune', name: 'Seme Comune', emoji: '🌱', growTime: 600, effects: { type: 'bonus', kind: 'item', item: { type: 'seed', key: 'seme_comune', amount: 2 } } }, // 10 min

  // chaotic / risky
  { key: 'fungo_malefico', name: 'Fungo Malefico', emoji: '🍄', growTime: 900, effects: { type: 'malus', kind: 'dolci', amount: -120 } }, // 15 min
  { key: 'pianta_tossica', name: 'Pianta Tossica', emoji: '☠️', growTime: 600, effects: { type: 'malus', kind: 'limit', amount: -300 } }, // 10 min
  { key: 'nebbia_nera', name: 'Nebbia Nera', emoji: '🌫️', growTime: 900, effects: { type: 'malus', kind: 'random', amount: -1 } }, // 15 min

  // buff / special
  { key: 'pianta_tempo', name: 'Pianta del Tempo', emoji: '⏳', growTime: 3600, effects: { type: 'bonus', kind: 'cooldown_reduce', amount: 0.7 } }, // 1h
  { key: 'pianta_abbondanza', name: 'Pianta Abbondanza', emoji: '💰', growTime: 5400, effects: { type: 'bonus', kind: 'money', amount: 1500 } }, // 1h 30min
  { key: 'fiore_sussurrante', name: 'Fiore Sussurrante', emoji: '💠', growTime: 2400, effects: { type: 'bonus', kind: 'rarity_boost', duration: 60*60*1000, amount: 0.3 } }, // 40 min

  // novelty / one-off
  { key: 'pianta_clone', name: 'Pianta Clone', emoji: '🪻', growTime: 1800, effects: { type: 'bonus', kind: 'multi', items: [{ kind: 'dolci', amount: 120 }, { kind: 'exp', amount: 80 }] } }, // 30 min
  { key: 'pianta_misteriosa', name: 'Pianta Misteriosa', emoji: '🧪', growTime: 3600, effects: { type: 'random' } } // 1h
]

const SEEDS = {
  seme_comune: {
    pool: ['fiore_rosso', 'erba_magica', 'pianta_veloce', 'erba_curativa', 'fiore_giallo', 'foglia_leggera', 'seme_comune'],
    aliases: [
      'seme comune', 'seme-comune', 'seme_comune', 'semecomune', 'seme',
      'seme  comune', 'seme  comune', 'seme comune', 'seme comune', 'seme comune'
    ]
  },
  seme_raro: {
    pool: ['pianta_scudo', 'pianta_pazza', 'rosa_bianca', 'erba_fortuna', 'fiore_luminoso', 'erba_leggendaria', 'seme_raro'],
    aliases: [
      'seme raro', 'seme-raro', 'seme_raro', 'semeraro',
      'seme  raro', 'seme  raro', 'seme raro', 'seme raro', 'seme raro'
    ]
  },
  seme_tossico: {
    pool: ['fungo_malefico', 'pianta_tossica', 'nebbia_nera', 'pianta_pazza'],
    aliases: [
      'seme tossico', 'seme-tossico', 'seme_tossico', 'semetossico',
      'seme  tossico', 'seme tossico', 'seme tossico', 'seme tossico'
    ]
  },
  seme_epico: {
    pool: ['albero_dorato', 'albero_frutto', 'melograno', 'pianta_abbondanza', 'pianta_tempo'],
    aliases: [
      'seme epico', 'seme-epico', 'seme_epico',
      'seme  epico', 'seme epico', 'seme epico', 'seme epico'
    ]
  }
}

function findSeedKey(input) {
  if (!input) return null
  const nk = normalizeKey(input)
  // check direct keys
  for (const k of Object.keys(SEEDS)) {
    if (normalizeKey(k) === nk) return k
  }
  // check aliases
  for (const [k, v] of Object.entries(SEEDS)) {
    if (v.aliases && v.aliases.some(a => normalizeKey(a) === nk)) return k
  }
  return null
}

const MAX_POTS = 6
const COOLDOWN_PLANT_MS = 10 * 1000 // 10s per semi per prevenire spam

function ensureUser(db, sender) {
  if (!db.data) db.data = {}
  if (!db.data.users) db.data.users = {}
  if (!db.data.users[sender]) db.data.users[sender] = { limit: 0 }
  const u = db.data.users[sender]
  if (!u.vasetti) u.vasetti = Array(MAX_POTS).fill(null)
  if (!u.cooldowns) u.cooldowns = {}
  return u
}

function normalizeKey(s) {
  return (s || '').toString().toLowerCase().replace(/[\s_\-]/g, '')
}

function findPlantDef(key) {
  if (!key) return null
  const nk = normalizeKey(key)
  return PLANTS.find(p => p.key === key || normalizeKey(p.key) === nk || normalizeKey(p.name) === nk)
}

function weightedPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

let handler = async (m, { conn, args, command, usedPrefix }) => {
    
  const user = ensureUser(global.db, m.sender)
  const sub = (args[0] || '').toLowerCase()

  // pianta <seme> <vaso>
  if (['pianta', 'semina', 'planter'].includes(command)) {
      

    const seedInput = args[0]
    const seedKey = findSeedKey(seedInput)
    const slot = parseInt(args[1]) - 1
    if (!seedInput) return conn.reply(m.chat, `╭┈ ─ ─ ✦ ─ ─ ┈╮\n  ୧ ⚠️ ୭ *Uso:* ${usedPrefix}pianta <nome_seme> <numero_vaso(1-${MAX_POTS})>\n╰★────★────★\n\n💡 Compra semi con: ${usedPrefix}shop`, m)
    if (!seedKey) return conn.reply(m.chat, `╭┈ ─ ─ ✦ ─ ─ ┈╮\n  ୧ ⚠️ ୭ *Seme non valido*\n╰★────★────★\n\nCompra semi con: ${usedPrefix}shop (es. seme comune)`, m)
    if (isNaN(slot) || slot < 0 || slot >= MAX_POTS) return conn.reply(m.chat, `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Vaso non valido\n  ━━✫ Usa un numero tra 1 e ${MAX_POTS}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`, m, rcanal)

    if ((user.vasetti[slot] || {}).planted) return conn.reply(m.chat, `꒷꒦ ✦ VASO OCCUPATO ✦ ꒷꒦\n\n❌ Il vaso ${slot+1} è già occupato. Usa ${usedPrefix}vasetti per vedere i tuoi vasi.`, m, rcanal)

    const now = Date.now()
    user.cooldowns.plant = user.cooldowns.plant || 0
    if (now - user.cooldowns.plant < COOLDOWN_PLANT_MS) return conn.reply(m.chat, `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Attendi ancora prima di piantare un altro seme\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`, m, rcanal)

  // check seed in inventory (use resolved seedKey)
  if (!user[seedKey] || user[seedKey] <= 0) return conn.reply(m.chat, `╭┈ ─ ─ ✦ ─ ─ ┈╮\n  ୧ ❌ ୭ Non hai questo seme\n╰★────★────★\n\nCompra semi con: ${usedPrefix}shop`, m)
  user[seedKey]--
  if (user[seedKey] <= 0) delete user[seedKey]

    // scegli pianta dal pool
  const pool = SEEDS[seedKey].pool
    const plantKey = weightedPick(pool)
    const plantDef = findPlantDef(plantKey)
    const finishAt = Date.now() + (plantDef.growTime * 1000)

    user.vasetti[slot] = {
      planted: true,
      plant: plantKey,
      plantedAt: Date.now(),
      finishAt
    }
    user.cooldowns.plant = Date.now()

    return conn.reply(m.chat, `꒷꒦ ✦ PIANTATA ✦ ꒷꒦\n\n🌱 Hai piantato ${plantDef.emoji} *${plantDef.name}* nel vaso ${slot+1}.\n⏳ Crescerà in circa ${plantDef.growTime}s.`, m, rcanal)
  }

  // vasetti - mostra i vasi
  if (['vasetti', 'vasi', 'giardino'].includes(command)) {
    let text = `꒷꒦ ✦ I TUOI VASI ✦ ꒷꒦\n\n`
    user.vasetti.forEach((v, i) => {
      if (!v || !v.planted) {
      text += `• Vaso ${i+1}: Vuoto 𓎶\n`
      } else {
        const plant = findPlantDef(v.plant)
        const now = Date.now()
        if (now >= v.finishAt) {
          text += `• Vaso ${i+1}: ${plant.emoji} ${plant.name} — *PRONTA*\n`
        } else {
          const left = Math.ceil((v.finishAt - now)/1000)
          text += `• Vaso ${i+1}: ${plant.emoji} ${plant.name} — cresce in ${left}s\n`
        }
      }
    })
    text += `\n\n💡 Usa: ${usedPrefix}pianta <nome_seme> <numero_vaso> | ${usedPrefix}raccogli <numero_vaso>`
    text += `\n\n💡 Compra semi con: ${usedPrefix}shop`
    return conn.reply(m.chat, text, m, rcanal)
  }
    
  // raccogli <vaso>
  if (['raccogli', 'colti', 'harvest'].includes(command)) {
    const slot = parseInt(args[0]) - 1
    if (isNaN(slot) || slot < 0 || slot >= MAX_POTS) return conn.reply(m.chat, `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Vaso non valido\n  ━━✫ Usa un numero tra 1 e ${MAX_POTS}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`, m, rcanal)
    const v = user.vasetti[slot]
    if (!v || !v.planted) return conn.reply(m.chat, `╭┈ ─ ─ ✦ ─ ─ ┈╮\n  ୧ ⚠️  ୭ Vaso ${slot+1}: vuoto\n╰★────★────★`, m, rcanal)
    const plantDef = findPlantDef(v.plant)
    if (Date.now() < v.finishAt) return conn.reply(m.chat, `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ La pianta non è ancora pronta\n  ━━✫ Riprova più tardi\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`, m, rcanal)

    // applica effetti
    const eff = plantDef.effects
    let effectMsg = ''
    if (eff.type === 'bonus') {
      if (eff.kind === 'dolci') {
        const amt = eff.amount || 0
        user.limit = (user.limit || 0) + amt
        effectMsg = `+${amt} 🍬 dolci`
      } else if (eff.kind === 'exp') {
        const amt = eff.amount || 0
        user.exp = (user.exp || 0) + amt
        effectMsg = `+${amt} XP`
      } else if (eff.kind === 'scudo') {
        const expiry = Date.now() + (eff.duration || 0)
        user.scudoScadenza = new Date(expiry).toISOString()
        const minutes = Math.floor((eff.duration || 0) / 60000)
        effectMsg = `Scudo attivato per ${minutes}m`
      } else if (eff.kind === 'cooldown_reduce') {
        user.coolModifiers = user.coolModifiers || {}
        user.coolModifiers.plant = { multiplier: eff.amount || 1, expiresAt: Date.now() + 60*60*1000 }
        const pct = Math.round((1 - (eff.amount || 1)) * 100)
        effectMsg = `Riduzione cooldown del ${pct}% per 1h`
      }
      conn.reply(m.chat, `꒷꒦ ✦ RACCOLTO ✦ ꒷꒦\n\n🌿 Hai raccolto ${plantDef.emoji} *${plantDef.name}*\n• Effetto: ${effectMsg}`, m, rcanal)
    } else if (eff.type === 'malus') {
      if (eff.kind === 'dolci') {
        const amt = Math.abs(eff.amount || 0)
        user.limit = Math.max(0, (user.limit || 0) - amt)
        effectMsg = `-${amt} 🍬 dolci`
      } else {
        effectMsg = `Effetto negativo applicato`
      }
      conn.reply(m.chat, `꒷꒦ ✦ RACCOLTO — MALUS ✦ ꒷꒦\n\n☠️ Hai raccolto ${plantDef.emoji} *${plantDef.name}*\n• Malus: ${effectMsg}`, m, rcanal)
    } else if (eff.type === 'random') {
      // eventi casuali: positivo o negativo
      const rand = Math.random()
      if (rand < 0.5) {
        const gained = Math.floor(Math.random()*200)
        user.limit = (user.limit || 0) + gained
        effectMsg = `+${gained} 🍬 dolci (random)`
        conn.reply(m.chat, `꒷꒦ ✦ RACCOLTO — CASUALE ✦ ꒷꒦\n\n🎲 Hai raccolto ${plantDef.emoji} *${plantDef.name}*\n• Effetto: ${effectMsg}`, m, rcanal)
      } else {
        const lost = Math.floor(Math.random()*100)
        user.limit = Math.max(0, (user.limit || 0) - lost)
        effectMsg = `-${lost} 🍬 dolci (random)`
        conn.reply(m.chat, `꒷꒦ ✦ RACCOLTO — CASUALE ✦ ꒷꒦\n\n🎲 Hai raccolto ${plantDef.emoji} *${plantDef.name}*\n• Effetto: ${effectMsg}`, m, rcanal)
      }
    }

    // registra la pianta raccolta (statistiche)
    user.plantsCollected = user.plantsCollected || {}
    user.plantsCollected[plantDef.key] = (user.plantsCollected[plantDef.key] || 0) + 1

    // svuota il vaso
    user.vasetti[slot] = null
    return
  }

  // annaffia <vaso> (riduce tempo di crescita del 20%)
  if (['annaffia', 'water'].includes(command)) {
    const slot = parseInt(args[0]) - 1
    if (isNaN(slot) || slot < 0 || slot >= MAX_POTS) return conn.reply(m.chat, `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Vaso non valido\n  ━━✫ Usa un numero tra 1 e ${MAX_POTS}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`, m, rcanal)
    const v = user.vasetti[slot]
    if (!v || !v.planted) return conn.reply(m.chat, `╭┈ ─ ─ ✦ ─ ─ ┈╮\n  ୧ ⚠️  ୭ Vaso ${slot+1}: vuoto\n╰★────★────★`, m, rcanal)
    const now = Date.now()
    if (now >= v.finishAt) return conn.reply(m.chat, `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ℹ️ La pianta è già pronta\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`, m)
    const remaining = v.finishAt - now
    v.finishAt = now + Math.floor(remaining * 0.8)
    return conn.reply(m.chat, `꒷꒦ ✦ ANNAFFIATO ✦ ꒷꒦\n\n💧 Hai annaffiato il vaso ${slot+1}. Tempo di crescita diminuito del 20%.`, m, rcanal)
  }

  // scava <vaso> (rimuove pianta senza effetti)
  if (['scava', 'remove', 'ripulisci'].includes(command)) {
    const slot = parseInt(args[0]) - 1
    if (isNaN(slot) || slot < 0 || slot >= MAX_POTS) return conn.reply(m.chat, `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Vaso non valido\n  ━━✫ Usa un numero tra 1 e ${MAX_POTS}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`, m, rcanal)
    const v = user.vasetti[slot]
    if (!v || !v.planted) return conn.reply(m.chat, `╭┈ ─ ─ ✦ ─ ─ ┈╮\n  ୧ ⚠️  ୭ Vaso ${slot+1}: vuoto\n╰★────★────★`, m, rcanal)
    user.vasetti[slot] = null
    return conn.reply(m.chat, `꒷꒦ ✦ VASO SVUOTATO ✦ ꒷꒦\n\n🪴 Hai svuotato il vaso ${slot+1}.`, m, rcanal)
  }

 if (['giardinaggio', 'helpgiardino'].includes(command)) {
  // aiuto
  const help = `꒷꒦ ✦ GIARDINAGGIO ✦ ꒷꒦\n\n` +
    `• \`𝚟𝚊𝚜𝚎𝚝𝚝𝚒\` - Mostra i tuoi vasi\n` +
    `• \`𝚙𝚒𝚊𝚗𝚝𝚊 <nome_seme> <numero_vaso>\` - 𝘗𝘪𝘢𝘯𝘵𝘢 𝘶𝘯 𝘴𝘦𝘮𝘦\n` +
    `• \`𝚛𝚊𝚌𝚌𝚘𝚗𝚐𝚕𝚒 <numero_vaso>\` - 𝘙𝘢𝘤𝘤𝘰𝘨𝘭𝘪 𝘭𝘢 𝘱𝘪𝘢𝘯𝘵𝘢 𝘱𝘳𝘰𝘯𝘵𝘢\n` +
    `• \`𝚊𝚗𝚗𝚏𝚒𝚊 <numero_vaso>\` - 𝘈𝘤𝘤𝘦𝘭𝘦𝘳𝘢 𝘭𝘢 𝘤𝘳𝘦𝘴𝘤𝘪𝘵𝘢 (20%)\n` +
    `• \`𝚜𝚌𝚊𝚟𝚊 <numero_vaso>\` - 𝘙𝘪𝘮𝘶𝘰𝘷𝘪 𝘭𝘢 𝘱𝘪𝘢𝘯𝘵𝘢\n` +
  `\n💡 Usa i semi per iniziare a piantare (comprali con ${usedPrefix}shop)\n`;

 return conn.reply(m.chat, help, m, rcanal);
    }

}
handler.help = ['pianta', 'vasetti', 'raccogli', 'annaffia', 'scava']
handler.tags = ['rpg', 'fun', 'garden']
handler.command = /^(pianta|semina|planter|vasetti|vasi|giardino|raccogli|colti|harvest|annaffia|water|scava|remove|ripulisci|giardinaggio|help giardino|helpgiardino)$/i
handler.register = true
handler.priority = 1;

export default handler
