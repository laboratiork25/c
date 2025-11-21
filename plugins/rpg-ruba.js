import fs from 'fs'
import path from 'path'

function cambia(num) {
  return String(num).replace(/\d/g, d => `${d}\u034F`); // U+034F
}

// Percorsi delle immagini
const thumbnailsPath = './src/img/ruba/'
const thumbnails = {
  success: fs.readFileSync(path.join(thumbnailsPath, 'success.png')),
  caught: fs.readFileSync(path.join(thumbnailsPath, 'caught.png')),
  partial: fs.readFileSync(path.join(thumbnailsPath, 'partial.png')),
  bigSteal: fs.readFileSync(path.join(thumbnailsPath, 'bigSteal.png')),
  stealth: fs.readFileSync(path.join(thumbnailsPath, 'stealth.png')),
  easterEgg: fs.readFileSync(path.join(thumbnailsPath, 'easterEgg.jpg'))
}

let cooldowns = {}
let attemptCounts = {}; // Tracks the number of attempts during cooldown
const EASTER_EGG_CHANCE = 0.6;

const MESSAGGI_GEMME = {
  successo: [
    "💎 Camminando hai trovato una gemma che brillava tra i sassi!",
    "✨ Una gemma misteriosa è apparsa ai tuoi piedi, chissà da dove viene...",
    "🪙 Tra le crepe del marciapiede hai scovato una gemma preziosa!",
    "🌠 Un raggio di sole ha illuminato una gemma nascosta nell'erba.",
    "🔮 Una gemma luccicante ti ha attirato mentre vagavi senza meta."
  ],
  fallimento: [
    "🪨 Hai solo trovato un sasso, niente gemme stavolta.",
    "🌫️ Sembrava una gemma, ma era solo un pezzo di vetro.",
    "🦗 Solo polvere e foglie, nessuna gemma in vista.",
    "😶‍🌫️ La fortuna non era dalla tua parte, nessuna gemma trovata.",
    "🍂 Hai frugato ovunque, ma niente gemme oggi."
  ]
}

let handler = async (m, { conn, text, command, usedPrefix }) => {
  const groupMetadata = await conn.groupMetadata(m.chat)
  const groupOwner = groupMetadata.owner || m.chat.split('-')[0] + "@s.whatsapp.net"
  const botOwner = global.owner[0] + "@s.whatsapp.net"
  let users = global.db.data.users
  let senderId = m.sender
  let senderName = conn.getName(senderId)
  let user = users[senderId]

  if (!user.health) user.health = 100
  if (!user.gemme) user.gemme = 0

  // --- CASA: blocca se il ladro è dentro casa (compatibilità con tutte le tipologie) ---
  if (user.casa && user.casa.stato === 'dentro') {
    return conn.reply(m.chat, '🚪 Non puoi rubare mentre sei dentro casa! Esci prima con *!casa esci*.', m, rcanal)
  }

  let tempoAttesa = 5 * 60;
  if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < tempoAttesa * 1000) {
    attemptCounts[senderId] = (attemptCounts[senderId] || 0) + 1;

    if (attemptCounts[senderId] > 3) {
      return conn.reply(m.chat, '𝙘𝙤𝙜𝙡𝙞𝙤𝙣𝙚 𝙖𝙗𝙪𝙨𝙖𝙩𝙤 𝙣𝙤𝙣 𝙨𝙥𝙖𝙢𝙢𝙖𝙧𝙚 𝙧𝙪𝙗𝙖 𝙖𝙨𝙥𝙚𝙩𝙩𝙖, 𝙣𝙤𝙣 𝙩𝙚 𝙡𝙤 𝙧𝙞𝙥𝙚𝙩𝙤 𝙥𝙞ù', m, rcanal);
    }

    let tempoRimanente = secondiAHMS(Math.ceil((cooldowns[senderId] + tempoAttesa * 1000 - Date.now()) / 1000))
    return conn.reply(m.chat, `⚠️ 𝘿𝙚𝙫𝙞 𝙖𝙨𝙥𝙚𝙩𝙩𝙖𝙧𝙚 ${tempoRimanente} 𝙥𝙧𝙞𝙢𝙖 𝙙𝙞 𝙧𝙪𝙗𝙖𝙧𝙚 𝙖𝙣𝙘𝙤𝙧𝙖.`, m, tutorial)
  }

  // Reset attempt count after cooldown expires
  attemptCounts[senderId] = 0;

  let senderLimit = user.limit || 0
  let senderHealth = user.health || 100

  let mentionedUser = m.mentionedJid && m.mentionedJid[0]
  let repliedUser = m.quoted && m.quoted.sender
  let targetUserId = mentionedUser || repliedUser

  if (!targetUserId) return conn.reply(m.chat, '❗ 𝘿𝙚𝙫𝙞 𝙢𝙚𝙣𝙯𝙞𝙤𝙣𝙖𝙧𝙚 𝙪𝙣 𝙪𝙩𝙚𝙣𝙩𝙚 𝙤 𝙧𝙞𝙨𝙥𝙤𝙣𝙙𝙚𝙧𝙚 𝙖 𝙪𝙣 𝙢𝙚𝙨𝙨𝙖𝙜𝙜𝙞𝙤 𝙥𝙚𝙧 𝙧𝙪𝙗𝙖𝙧𝙚 Unity Coins (🪙).', m, tutorial)

  // --- CASA: blocca se la vittima è dentro casa (compatibilità con tutte le tipologie) ---
  let targetUser = users[targetUserId]
  let targetInCasa = false
  if (targetUser && targetUser.casa && targetUser.casa.tipo && targetUser.casa.stato === 'dentro') {
    targetInCasa = true
  }
  // Rimuovi/ignora i vecchi flag legacy!
  // if (!targetInCasa && targetUser) {
  //   if (targetUser.monolocale || targetUser.villa || targetUser.castello) {
  //     targetInCasa = true
  //   }
  // }
  let bypassCasa = false
  if (targetInCasa && (user.level || 0) >= 50) {
    bypassCasa = true
  }
  if (targetInCasa && !bypassCasa) {
    return conn.reply(m.chat, `🚪 L'utente è protetto perché è dentro casa! Solo i ladri di livello 50+ possono rubare chi è in casa.`, m, rcanal)
  }

  // --- CONTROLLO SCUDO: calcola se scaduto usando la scadenza nel database meno l'ora attuale ---
  if (users[targetUserId]?.scudoScadenza) {
    // Calcola ora attuale in Italia
    const nowRome = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome' }));
    const expiry = new Date(users[targetUserId].scudoScadenza);
    const diffMs = expiry - nowRome;
    if (diffMs > 0) {
      const tempoFormattato = millisecondiAHMS(diffMs);
      const fkontak = contattoFake(m);
      await conn.sendMessage(m.chat, {
        text: `🛡️ ${senderName}, il tentativo di furto è fallito! @${targetUserId.split("@")[0]} è protetto da uno scudo ancora per ${tempoFormattato}.`,
        contextInfo: { mentionedJid: [targetUserId] }
      }, { quoted: fkontak });
      return;
    }
  }

  // registra cooldown
  cooldowns[senderId] = Date.now()

  // INVENTARIO: compatibilità e modificatori basati su oggetti posseduti
  const inventory = user.inventory || {}
  const hasItem = (name) => (inventory[name] || 0) > 0

  // Controlli possedimenti ladro (dal profilo.js)
  const ladroForcina = user.forcina || 0
  const ladroCanna = user.canna || 0
  const ladroAnimali = {
    cane: user.cane || false,
    gatto: user.gatto || false,
    coniglio: user.coniglio || false,
    serpente: user.serpente || false,
    ragno: user.ragno || false
  }

  // Controlli possedimenti vittima (dal profilo.js)
  const vittimaAnimali = {
    cane: targetUser?.cane || false,
    gatto: targetUser?.gatto || false,
    drago: targetUser?.drago || false,
    serpente: targetUser?.serpente || false,
    ragno: targetUser?.ragno || false,
    piccione: targetUser?.piccione || false,
    scorpione: targetUser?.scorpione || false
  }
  const vittimaVeicoli = {
    macchina: targetUser?.macchina || false,
    moto: targetUser?.moto || false,
    bici: targetUser?.bici || false
  }
  const vittimaOggetti = {
    forcina: (targetUser?.forcina || 0) > 0,
    canna: (targetUser?.canna || 0) > 0,
    lente: (targetUser?.lente || 0) > 0
  }

  // Modificatori derivati dall'inventario
  const stealMultiplier = 1 + (hasItem('guanti') ? 0.30 : 0) + (hasItem('magnet') ? 0.50 : 0)
  const stealthBonus = hasItem('cappuccio') ? 0.20 : 0
  const noisePenalty = hasItem('scarpeRumore') ? 0.20 : 0
  const victimBarrier = (users[targetUserId] && users[targetUserId].barriera) ? 0.5 : 0

  // Easter egg chance può essere incrementata da oggetti particolari
  const effectiveEasterEggChance = Math.min(0.95, EASTER_EGG_CHANCE + (hasItem('cercaUova') ? 0.15 : 0))

  // Determina se attivare eventi bizzarri basati su possedimenti
  const bizzarroChance = 0.25 + (Object.values(vittimaAnimali).some(Boolean) ? 0.15 : 0) + (Object.values(ladroAnimali).some(Boolean) ? 0.10 : 0)

  let targetUserLimit = users[targetUserId]?.limit || 0
  let targetUserHealth = users[targetUserId]?.health || 100

  let minAmount, maxAmount
  if (targetUserLimit > 1000) {
    minAmount = 50
    maxAmount = 200
  } else if (targetUserLimit >= 100) {
    minAmount = 15
    maxAmount = 50
  } else {
    minAmount = 5
    maxAmount = 15
  }

  // Calcola importo e danni tenendo conto dei modificatori
  let baseAmount = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount
  let amountTaken = Math.min(Math.floor(baseAmount * stealMultiplier), targetUserLimit)
  // Minor chance di subire danno se si hanno oggetti furtivi
  let healthDamage = Math.max(1, Math.floor((Math.random() * 19 + 2) * (1 - stealthBonus + noisePenalty)))

  // Easter Egg Bonus (usa chance effettiva)
  let gemmaTrovata = Math.random() < effectiveEasterEggChance
  let gemmaMessage = ''
  if (gemmaTrovata) {
    user.gemme += 1
    let frase = pickRandom(MESSAGGI_GEMME.successo)
    gemmaMessage = `\n\n💎 *${frase}*\nHai ora ${user.gemme} gemma${user.gemme === 1 ? '' : 'e'} nel tuo inventario!`
  } else {
    let frase = pickRandom(MESSAGGI_GEMME.fallimento)
    gemmaMessage = `\n\n😶 *${frase}*`
  }

  // Determina range eventi: normale (0-4), casa (5-7), bizzarri (11-20)
  let maxRange = bypassCasa ? 8 : 5
  if (Math.random() < bizzarroChance) {
    maxRange = 21 // include eventi bizzarri 11-20
  }
  let randomOption = Math.floor(Math.random() * maxRange)
  let messageText = ''
  let thumbnailCase = thumbnails.success
  let caseTitle = "Furto Riuscito!"
  let caseBody = ""

  switch (randomOption) {
    case 0:
      user.limit += amountTaken
      users[targetUserId].limit -= amountTaken
      users[targetUserId].health = Math.max(targetUserHealth - healthDamage, 0)
      messageText = `✅ ${senderName} Hai rubato con successo a @${targetUserId.split("@")[0]} e gli hai inflitto anche una bella testata nel mentre.\n\nUnity Coins (🪙) rubati: *${cambia(amountTaken)}*\ndanni causati: *${healthDamage} 💔*\n${gemmaMessage}`
      thumbnailCase = thumbnails.success
      caseTitle = "Furto Riuscito!"
      caseBody = `Hai rubato ${amountTaken} Unity Coins (🪙)`
      break
    case 1:
      let amountSubtracted = Math.min(Math.floor(Math.random() * (senderLimit - minAmount + 1)) + minAmount, senderLimit)
      user.limit -= amountSubtracted
      user.health -= healthDamage
      messageText = `❌ ${senderName} Sei stato catturato! e hai perso delle Unity Coins (🪙). La pula ti ha anche picchiato.\n\nUnity Coins (🪙) persi: *${cambia(amountSubtracted)}*\n danni subiti: *${healthDamage} 💔*\n${gemmaMessage}`
      thumbnailCase = thumbnails.caught
      caseTitle = "Sei stato Catturato!"
      caseBody = `Hai perso ${amountSubtracted} Unity Coins (🪙)`
      break
    case 2:
      let smallAmountTaken = Math.min(Math.floor(Math.random() * (targetUserLimit / 2 - minAmount + 1)) + minAmount, targetUserLimit)
      user.limit += smallAmountTaken
      users[targetUserId].limit -= smallAmountTaken
      users[targetUserId].health -= healthDamage
      messageText = `⚠️🏃 ${senderName} Ti hanno individuato e hai rubato *poche Unity Coins (🪙)* da @${targetUserId.split("@")[0]}.\nSei anche riuscito a fargli del danno emotivo.\nUnity Coins (🪙) rubati: *${cambia(smallAmountTaken)}*\ndanni causati: *${healthDamage} 💔*${gemmaMessage}`
      thumbnailCase = thumbnails.partial
      caseTitle = "Furto Parziale!"
      caseBody = `Hai rubato ${smallAmountTaken} Unity Coins (🪙)`
      break
    case 3:
      let megaAmount = Math.min(Math.floor(Math.random() * (maxAmount * 2 - minAmount + 1)) + minAmount, targetUserLimit)
      let autoDanno = healthDamage + Math.floor(Math.random() * 10)
      user.limit += megaAmount
      users[targetUserId].limit -= megaAmount
      user.health -= autoDanno
      messageText = `💥 ${senderName} Hai rubato un BOTTO di *Unity Coins (🪙)* da @${targetUserId.split("@")[0]}, ma sei inciampato e ti sei fatto male alla testa.\n\nUnity Coins (🪙) rubati: *${cambia(megaAmount)}*\n danni subiti: *${autoDanno} 💥*${gemmaMessage}`
      thumbnailCase = thumbnails.bigSteal
      caseTitle = "Colpo Grosso!"
      caseBody = `Hai rubato ${megaAmount} Unity Coins (🪙)`
      break
    case 4:
      let furtino = Math.min(Math.floor(Math.random() * 5) + 1, targetUserLimit)
      user.limit += furtino
      users[targetUserId].limit -= furtino
      messageText = `🫣 ${senderName} Hai rubato in silenzio delle *Unity Coins (🪙)* da @${targetUserId.split("@")[0]}... Nessuno se n'è accorto!\n\nUnity Coins (🪙) rubati: *${cambia(furtino)}*\n ${gemmaMessage}`
      thumbnailCase = thumbnails.stealth
      caseTitle = "Furto Silenzioso!"
      caseBody = `Hai rubato ${furtino} Unity Coins (🪙)`
      break
    // Bizzarro: incontro con una carovana di formiche giganti
    case 8:
      {
        const ants = Math.floor(Math.random() * 50) + 10
        const lost = Math.min(Math.floor(ants / 5), user.limit)
        user.limit -= lost
        users[targetUserId].limit += Math.floor(lost / 2)
        user.health = Math.max(0, user.health - Math.floor(ants / 10))
        messageText = `🐜 ${senderName} sei stato travolto da una carovana di formiche giganti mentre scappavi!\nHai perso *${cambia(lost)}* Unity Coins (🪙) e alcune sono finite per strada...\nHai subito ${Math.floor(ants/10)} danni.`
        thumbnailCase = thumbnails.caught
        caseTitle = "Invasione di Formiche!"
        caseBody = `Hai perso ${lost} Unity Coins (🪙)`
      }
      break

    // Bizzarro: trovi un nido di conigli da cui estrai qualche caramella
    case 9:
      {
        const rabbits = Math.floor(Math.random() * 8) + 3
        const gain = Math.min(Math.floor(rabbits * (hasItem('sacco') ? 12 : 6)), 500)
        user.limit += gain
        messageText = `🐰 ${senderName} hai trovato un nido di conigliettì che custodivano Unity Coins (🪙)!\nHai ottenuto *${cambia(gain)}* grazie al tuo fiuto.`
        thumbnailCase = thumbnails.success
        caseTitle = "Nido Fortunato!"
        caseBody = `Hai trovato ${gain} Unity Coins (🪙)`
      }
      break

    // Bizzarro: vittima offre un patto (scambio temporaneo di oggetti)
    case 10:
      {
        const offer = Math.floor(Math.random() * 3)
        if (offer === 0 && users[targetUserId]) {
          // scambio: prendi un oggetto temporaneo
          user.inventory = user.inventory || {}
          user.inventory['caramellaMagica'] = (user.inventory['caramellaMagica'] || 0) + 1
          messageText = `🧙‍♂️ ${senderName} La vittima, presa dal panico, ti offre una *caramella magica* in cambio del silenzio.\nHai guadagnato 1 caramella magica nel tuo inventario.`
          thumbnailCase = thumbnails.partial
          caseTitle = "Patto Strano"
          caseBody = `Hai ricevuto 1 caramella magica`
        } else {
          messageText = `🤝 ${senderName} La vittima cerca di negoziare ma riesce solo a darti qualche consiglio inutile. Niente di fatto.`
          thumbnailCase = thumbnails.partial
          caseTitle = "Negoziato Fallito"
          caseBody = `Nessuna ricompensa`
        }
      }
      break
    // --- Nuovi casi speciali per ladro livello 50+ che ruba in casa ---
    case 5:
      // Il ladro viene scoperto e scappa senza nulla
      messageText = `🚨 ${senderName} hai provato a entrare in casa di @${targetUserId.split("@")[0]}, ma l'allarme è scattato! Sei dovuto scappare a mani vuote.`
      thumbnailCase = thumbnails.caught
      caseTitle = "Allarme!"
      caseBody = `Fuga a mani vuote`
      break
    case 6:
      // Il ladro trova la porta blindata e non riesce ad aprire
      messageText = `🔒 ${senderName} hai trovato una porta blindata a casa di @${targetUserId.split("@")[0]} e non sei riuscito a entrare. Riprova più tardi!`
      thumbnailCase = thumbnails.caught
      caseTitle = "Porta Blindata!"
      caseBody = `Furto fallito`
      break
    case 7:
      // Il ladro trova una cassaforte piena di dolci (bonus extra)
      let jackpot = Math.min(Math.floor(Math.random() * 300) + 100, targetUserLimit)
      user.limit += jackpot
      users[targetUserId].limit -= jackpot
      messageText = `💰 ${senderName} hai trovato la cassaforte segreta di @${targetUserId.split("@")[0]}!\nHai rubato un bottino di *${cambia(jackpot)} Unity Coins (🪙)*\n${gemmaMessage}`
      thumbnailCase = thumbnails.bigSteal
      caseTitle = "Colpo nella Cassaforte!"
      caseBody = `Hai rubato ${jackpot} caramelle`
      break

    // === EVENTI BIZZARRI BASATI SU POSSEDIMENTI (11-20) ===
    case 11:
      // Cane della vittima abbaia e sveglia il quartiere
      if (vittimaAnimali.cane) {
        user.health = Math.max(0, user.health - 15)
        messageText = `🐕 ${senderName} il cane di @${targetUserId.split("@")[0]} ti ha sentito e ha svegliato tutto il quartiere abbaiando!\nSei dovuto scappare ferito e a mani vuote. (-15 HP)`
        thumbnailCase = thumbnails.caught
        caseTitle = "Cane Guardiano!"
        caseBody = "Fuga precipitosa"
      } else {
        // Fallback se non ha cane
        const randomSteal = Math.min(Math.floor(Math.random() * 30) + 10, targetUserLimit)
        user.limit += randomSteal
        users[targetUserId].limit -= randomSteal
        messageText = `🔍 ${senderName} hai cercato un cane ma non c'era... hai comunque trovato *${cambia(randomSteal)}* Unity Coins (🪙) nascoste.`
        thumbnailCase = thumbnails.partial
        caseTitle = "Ricerca Vana"
        caseBody = `Hai trovato ${randomSteal} Unity Coins (🪙)`
      }
      break

    case 12:
      // Gatto della vittima si fa accarezzare e chiede Unity Coins (🪙)
      if (vittimaAnimali.gatto) {
        const tribute = Math.min(Math.floor(Math.random() * 20) + 5, user.limit)
        user.limit -= tribute
        messageText = `🐱 ${senderName} il gatto di @${targetUserId.split("@")[0]} ti ha fatto le fusa e ti ha convinto a dargli delle Unity Coins (🪙)!\nHai perso *${cambia(tribute)}* per il suo charme felino.`
        thumbnailCase = thumbnails.partial
        caseTitle = "Gatto Manipolatore"
        caseBody = `Hai perso ${tribute} Unity Coins (🪙)`
      } else {
        const bonus = Math.floor(Math.random() * 15) + 5
        user.limit += bonus
        messageText = `🐱 ${senderName} hai trovato un gatto randagio che ti ha portato fortuna! (+${cambia(bonus)} Unity Coins (🪙))`
        thumbnailCase = thumbnails.success
        caseTitle = "Gatto Fortunato"
        caseBody = `Hai guadagnato ${bonus} Unity Coins (🪙)`
      }
      break

    case 13:
      // Drago della vittima sputa fuoco (se ce l'ha)
      if (vittimaAnimali.drago) {
        const burnDamage = Math.floor(Math.random() * 25) + 10
        user.health = Math.max(0, user.health - burnDamage)
        messageText = `🐉 ${senderName} il DRAGO di @${targetUserId.split("@")[0]} ti ha scoperto e ti ha dato fuoco!\nSei fuggito ustionato. (-${burnDamage} HP)`
        thumbnailCase = thumbnails.caught
        caseTitle = "Drago Furioso!"
        caseBody = "Ustioni gravi"
      } else {
        // Trova gemme colorate finte
        user.gemme = (user.gemme || 0) + 2
        messageText = `🔹 ${senderName} hai trovato delle gemme colorate finte ma comunque belle! (+2 gemme)`
        thumbnailCase = thumbnails.success
        caseTitle = "Gemme Finte"
        caseBody = "Hai trovato 2 gemme"
      }
      break

    case 14:
      // Macchina della vittima suona l'allarme
      if (vittimaVeicoli.macchina) {
        const panicAmount = Math.min(Math.floor(Math.random() * 40) + 20, user.limit)
        user.limit -= panicAmount
        user.health -= 10
        messageText = `🚗 ${senderName} hai urtato la macchina di @${targetUserId.split("@")[0]} e l'allarme è partito!\nNel panico hai perso *${cambia(panicAmount)}* Unity Coins (🪙) e ti sei fatto male. (-10 HP)`
        thumbnailCase = thumbnails.caught
        caseTitle = "Allarme Auto!"
        caseBody = `Hai perso ${panicAmount} Unity Coins (🪙)`
      } else {
        messageText = `🚗 ${senderName} hai cercato una macchina da svaligiare ma non ce n'erano. Che delusione!`
        thumbnailCase = thumbnails.partial
        caseTitle = "Nessuna Auto"
        caseBody = "Niente da rubare"
      }
      break

    case 15:
      // Ladro usa la forcina per scassinare (se ce l'ha)
      if (ladroForcina > 0) {
        const masterTheft = Math.min(Math.floor(Math.random() * 150) + 75, targetUserLimit)
        user.limit += masterTheft
        users[targetUserId].limit -= masterTheft
        // Consuma forcina con probabilità 30%
        if (Math.random() < 0.3) {
          user.forcina--
          messageText = `📎 ${senderName} hai usato la forcina per scassinare tutto!\nHai rubato *${cambia(masterTheft)}* Unity Coins (🪙) ma la forcina si è rotta. (-1 forcina)`
        } else {
          messageText = `📎 ${senderName} hai usato la forcina da maestro ladro!\nHai rubato *${cambia(masterTheft)}* Unity Coins (🪙) senza lasciare tracce.`
        }
        thumbnailCase = thumbnails.bigSteal
        caseTitle = "Scasso Professionale"
        caseBody = `Hai rubato ${masterTheft} Unity Coins (🪙)`
      } else {
        messageText = `📎 ${senderName} avresti voluto usare una forcina ma non ce l'hai! Furto mediocre...`
        const normalSteal = Math.min(Math.floor(Math.random() * 20) + 5, targetUserLimit)
        user.limit += normalSteal
        users[targetUserId].limit -= normalSteal
        thumbnailCase = thumbnails.partial
        caseTitle = "Senza Attrezzi"
        caseBody = `Hai rubato ${normalSteal} Unity Coins (🪙)`
      }
      break

    case 16:
      // Serpente del ladro aiuta nel furto (se ce l'ha)
      if (ladroAnimali.serpente) {
        const snakeHelp = Math.min(Math.floor(Math.random() * 80) + 40, targetUserLimit)
        user.limit += snakeHelp
        users[targetUserId].limit -= snakeHelp
        // Il serpente può mordere la vittima
        if (Math.random() < 0.4) {
          users[targetUserId].health = Math.max(0, users[targetUserId].health - 20)
          messageText = `🐍 ${senderName} il tuo serpente ti ha aiutato nel furto e ha anche morso @${targetUserId.split("@")[0]}!\nHai rubato *${cambia(snakeHelp)}* Unity Coins (🪙) e inflitto 20 danni.`
        } else {
          messageText = `🐍 ${senderName} il tuo serpente ti ha aiutato a intrufolarti silenziosamente!\nHai rubato *${cambia(snakeHelp)}* Unity Coins (🪙) senza essere notato.`
        }
        thumbnailCase = thumbnails.success
        caseTitle = "Serpente Complice"
        caseBody = `Hai rubato ${snakeHelp} Unity Coins (🪙)`
      } else {
        messageText = `🐍 ${senderName} hai sognato di avere un serpente che ti aiutasse... svegliati e vai a rubacchiare da solo!`
        thumbnailCase = thumbnails.partial
        caseTitle = "Sogni di Serpenti"
        caseBody = "Nessun aiuto"
      }
      break

    case 17:
      // Ragno della vittima intrappolà il ladro
      if (vittimaAnimali.ragno) {
        const webDamage = Math.floor(Math.random() * 15) + 8
        user.health = Math.max(0, user.health - webDamage)
        messageText = `🕷️ ${senderName} sei finito nella ragnatela del ragno di @${targetUserId.split("@")[0]}!\nTi sei liberato ma ferito. (-${webDamage} HP)`
        thumbnailCase = thumbnails.caught
        caseTitle = "Ragnatela!"
        caseBody = "Intrappolato"
      } else {
        // Trova ragnatele con Unity Coins (🪙)
        const webCandy = Math.floor(Math.random() * 25) + 10
        user.limit += webCandy
        messageText = `🕸️ ${senderName} hai trovato delle ragnatele piene di Unity Coins (🪙) abbandonate! (+${cambia(webCandy)} Unity Coins (🪙))`
        thumbnailCase = thumbnails.success
        caseTitle = "Ragnatele Ricche"
        caseBody = `Hai trovato ${webCandy} Unity Coins (🪙)`
      }
      break

    case 18:
      // Piccione della vittima fa la spia
      if (vittimaAnimali.piccione) {
        messageText = `🐦 ${senderName} il piccione di @${targetUserId.split("@")[0]} ti ha visto e ha fatto la spia!\nOra tutto il vicinato sa che sei un ladro. Che vergogna!`
        thumbnailCase = thumbnails.caught
        caseTitle = "Piccione Spia"
        caseBody = "Reputazione rovinata"
      } else {
        const featherLuck = Math.floor(Math.random() * 30) + 15
        user.limit += featherLuck
        messageText = `🪶 ${senderName} hai trovato una piuma di piccione portafortuna! (+${cambia(featherLuck)} Unity Coins (🪙))`
        thumbnailCase = thumbnails.success
        caseTitle = "Piuma Fortunata"
        caseBody = `Hai trovato ${featherLuck} Unity Coins (🪙)`
      }
      break

    case 19:
      // Coniglio del ladro distrae mentre rubi (se ce l'ha)
      if (ladroAnimali.coniglio) {
        const distraction = Math.min(Math.floor(Math.random() * 120) + 60, targetUserLimit)
        user.limit += distraction
        users[targetUserId].limit -= distraction
        messageText = `🐰 ${senderName} il tuo coniglio ha fatto da diversivo saltellando in giro!\nMentre tutti lo guardavano, hai rubato *${cambia(distraction)}* Unity Coins (🪙) indisturbato.`
        thumbnailCase = thumbnails.stealth
        caseTitle = "Diversivo Peloso"
        caseBody = `Hai rubato ${distraction} Unity Coins (🪙)`
      } else {
        messageText = `🐰 ${senderName} hai inseguito un coniglio selvatico pensando fosse tuo e hai perso tempo prezioso!`
        thumbnailCase = thumbnails.partial
        caseTitle = "Coniglio Sbagliato"
        caseBody = "Tempo perso"
      }
      break

    case 20:
      // Scorpione della vittima punge il ladro
      if (vittimaAnimali.scorpione) {
        const stingDamage = Math.floor(Math.random() * 30) + 15
        user.health = Math.max(0, user.health - stingDamage)
        // Veleno: continua a fare danno
        user.veleno = { turni: 3, danno: 5 }
        messageText = `🦂 ${senderName} lo scorpione di @${targetUserId.split("@")[0]} ti ha punto!\nSei avvelenato! (-${stingDamage} HP immediati, -5 HP per 3 turni)`
        thumbnailCase = thumbnails.caught
        caseTitle = "Puntura Velenosa!"
        caseBody = "Avvelenato"
      } else {
        // Trova scorpioni di Unity Coins (🪙)
        const candyScorpions = Math.floor(Math.random() * 20) + 8
        user.limit += candyScorpions
        messageText = `🍭 ${senderName} hai trovato degli scorpioni di Unity Coins (🪙)! Che fortuna! (+${cambia(candyScorpions)} Unity Coins (🪙))`
        thumbnailCase = thumbnails.success
        caseTitle = "Scorpioni Fortunati"
        caseBody = `Hai trovato ${candyScorpions} Unity Coins (🪙)`
      }
      break
  }

  const fkontak = contattoFake(m)
  await conn.sendMessage(m.chat, {
    text: messageText,
    contextInfo: { mentionedJid: [targetUserId] }
  }, { quoted: fkontak })
}
handler.tags = ['rpg']
handler.help = ['crimen']
handler.command = ['ruba', 'crimine', 'runa', 'rubq']
handler.group = true

export default handler

function secondiAHMS(secondi) {
  const ore = Math.floor(secondi / 3600)
  const minuti = Math.floor((secondi % 3600) / 60)
  const sec = secondi % 60
  return [ore, minuti, sec]
    .map(v => v.toString().padStart(2, '0'))
    .join(':')
}



function millisecondiAHMS(millisecondi) {
  const secondi = Math.floor(millisecondi / 1000)
  const minuti = Math.floor(secondi / 60)
  const ore = Math.floor(minuti / 60)
  
  const secondiRimanenti = secondi % 60
  const minutiRimanenti = minuti % 60
  
  
  if (ore > 0) {
    return `${ore} ore, ${minutiRimanenti} minuti e ${secondiRimanenti} secondi`
  } else if (minuti > 0) {
    return `${minutiRimanenti} minuti e ${secondiRimanenti} secondi`
  } else {
    return `${secondiRimanenti} secondi`
  }
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function contattoFake(m) {
  return {
    "key": {
      "participants": "0@s.whatsapp.net",
      "remoteJid": "status@broadcast",
      "fromMe": false,
      "id": "Ruba"
    },
    "message": {
      "contactMessage": {
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:Crimine\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Cellulare\nEND:VCARD`
      }
    },
    "participant": "0@s.whatsapp.net"
  }
}
