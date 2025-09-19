import '../lib/language.js';

let handler = async (m, { conn, args, participants, isAdmin, isBotAdmin }) => {
  const userId = m.sender;
  const groupId = m.isGroup ? m.chat : null;

  if (m.text?.toLowerCase() === '.skipbandiera') {
    if (!m.isGroup) return m.reply(global.t('flagGroupOnly', userId, groupId))
    if (!global.bandieraGame?.[m.chat]) return m.reply(global.t('flagNoGame', userId, groupId))
    
    if (!isAdmin && !m.fromMe) {
      return m.reply(global.t('flagAdminOnly', userId, groupId))
    }

    clearTimeout(global.bandieraGame[m.chat].timeout)
    await conn.reply(m.chat, global.t('flagGameStopped', userId, groupId, {
      answer: global.bandieraGame[m.chat].risposta
    }), m)
    delete global.bandieraGame[m.chat]
    return
  }

  if (global.bandieraGame?.[m.chat]) {
    return m.reply(global.t('flagGameActive', userId, groupId))
  }

  const cooldownKey = `bandiera_${m.chat}`
  const lastGame = global.cooldowns?.[cooldownKey] || 0
  const now = Date.now()
  const cooldownTime = 10000

  if (now - lastGame < cooldownTime) {
    const remainingTime = Math.ceil((cooldownTime - (now - lastGame)) / 1000)
    return m.reply(global.t('flagCooldown', userId, groupId, { time: remainingTime }))
  }

  global.cooldowns = global.cooldowns || {}
  global.cooldowns[cooldownKey] = now

  let bandiere = [
    { url: 'https://flagcdn.com/w320/it.png', nome: 'Italia' },
    { url: 'https://flagcdn.com/w320/fr.png', nome: 'Francia' },
    { url: 'https://flagcdn.com/w320/de.png', nome: 'Germania' },
    { url: 'https://flagcdn.com/w320/gb.png', nome: 'Regno Unito' },
    { url: 'https://flagcdn.com/w320/es.png', nome: 'Spagna' },
    // ... (tutte le altre bandiere rimangono uguali)
  ]

  let frasi = [
    global.t('flagChallenge1', userId, groupId),
    global.t('flagChallenge2', userId, groupId),
    global.t('flagChallenge3', userId, groupId),
    global.t('flagChallenge4', userId, groupId),
    global.t('flagChallenge5', userId, groupId),
    global.t('flagChallenge6', userId, groupId),
    global.t('flagChallenge7', userId, groupId),
  ]

  let scelta = bandiere[Math.floor(Math.random() * bandiere.length)]
  let frase = frasi[Math.floor(Math.random() * frasi.length)]

  try {
    let msg = await conn.sendMessage(m.chat, {
      image: { url: scelta.url },
      caption: global.t('flagGameCaption', userId, groupId, {
        challenge: frase,
        time: 30
      }),
      quoted: m
    })

    global.bandieraGame = global.bandieraGame || {}
    global.bandieraGame[m.chat] = {
      id: msg.key.id,
      risposta: scelta.nome.toLowerCase(),
      rispostaOriginale: scelta.nome,
      tentativi: {},
      suggerito: false,
      startTime: Date.now(),
      timeout: setTimeout(() => {
        if (global.bandieraGame?.[m.chat]) {
          conn.reply(m.chat, global.t('flagTimeOut', userId, groupId, {
            answer: scelta.nome
          }), msg)
          delete global.bandieraGame[m.chat]
        }
      }, 30000)
    }
  } catch (error) {
    console.error(global.t('flagGameError', userId, groupId, { error: error.message }))
    m.reply(global.t('flagStartError', userId, groupId))
  }
}

function normalizeString(str) {
    if (!str) return ''
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, '')
        .trim()
}

function calculateSimilarity(str1, str2) {
    const words1 = str1.split(' ').filter(word => word.length > 1)
    const words2 = str2.split(' ').filter(word => word.length > 1)
    
    if (words1.length === 0 || words2.length === 0) return 0
    
    const matches = words1.filter(word => 
        words2.some(w2 => w2.includes(word) || word.includes(w2))
    )
    
    return matches.length / Math.max(words1.length, words2.length)
}

function isAnswerCorrect(userAnswer, correctAnswer) {
    if (userAnswer.length < 2) return false
    
    const similarityScore = calculateSimilarity(userAnswer, correctAnswer)
    
    return (
        userAnswer === correctAnswer ||
        (correctAnswer.includes(userAnswer) && userAnswer.length > correctAnswer.length * 0.5) ||
        (userAnswer.includes(correctAnswer) && userAnswer.length < correctAnswer.length * 1.5) ||
        similarityScore >= 0.8
    )
}

handler.before = async (m, { conn }) => {
    const userId = m.sender;
    const groupId = m.chat;
    
    const chat = m.chat
    const game = global.bandieraGame?.[chat]
    
    if (!game || !m.quoted || m.quoted.id !== game.id || m.key.fromMe) return
    
    const userAnswer = normalizeString(m.text || '')
    const correctAnswer = normalizeString(game.risposta)
    
    if (!userAnswer || userAnswer.length < 2) return
    
    const similarityScore = calculateSimilarity(userAnswer, correctAnswer)

    if (isAnswerCorrect(userAnswer, correctAnswer)) {
        clearTimeout(game.timeout)
        
        const timeTaken = Math.round((Date.now() - game.startTime) / 1000)
        let reward = Math.floor(Math.random() * 31) + 20
        let exp = 500
        
        const timeBonus = timeTaken <= 10 ? 20 : timeTaken <= 20 ? 10 : 0
        reward += timeBonus
        
        if (!global.db.data.users[m.sender]) global.db.data.users[m.sender] = {}
        if (global.db.data.users[m.sender].limit == null) global.db.data.users[m.sender].limit = 0
        if (global.db.data.users[m.sender].exp == null) global.db.data.users[m.sender].exp = 0

        global.db.data.users[m.sender].limit = Number(global.db.data.users[m.sender].limit) + Number(reward)
        global.db.data.users[m.sender].exp = Number(global.db.data.users[m.sender].exp) + Number(exp)

        if (global.db && typeof global.db.write === 'function') {
            await global.db.write();
            await global.db.read();
        }

        let congratsMessage = global.t('flagCorrectAnswer', userId, groupId, {
            country: game.rispostaOriginale,
            time: timeTaken,
            reward: reward,
            timeBonus: timeBonus,
            exp: exp,
            balance: global.db.data.users[m.sender].limit
        })

        await conn.reply(chat, congratsMessage, m)
        delete global.bandieraGame[chat]
        
    } else if (similarityScore >= 0.6 && !game.suggerito) {
        game.suggerito = true
        await conn.reply(chat, global.t('flagAlmostThere', userId, groupId), m)
        
    } else if (game.tentativi[m.sender] >= 3) {
        await conn.reply(chat, global.t('flagNoAttempts', userId, groupId), m)
        
    } else {
        game.tentativi[m.sender] = (game.tentativi[m.sender] || 0) + 1
        const tentativiRimasti = 3 - game.tentativi[m.sender]
        
        if (tentativiRimasti === 1) {
            const primaLettera = game.rispostaOriginale[0].toUpperCase()
            const numeroLettere = game.rispostaOriginale.length
            await conn.reply(chat, global.t('flagHint', userId, groupId, {
                letter: primaLettera,
                length: numeroLettere
            }), m)
        } else if (tentativiRimasti === 2) {
            await conn.reply(chat, global.t('flagWrongAttempt', userId, groupId, {
                attempts: tentativiRimasti
            }), m)
        } else {
            await conn.reply(chat, global.t('flagLastAttempt', userId, groupId), m)
        }
    }
}

handler.help = ['bandiera', 'flag']
handler.tags = ['giochi', 'games']
handler.command = /^(bandiera|skipbandiera|flag|skipflag)$/i
handler.group = true
handler.register = true

export default handler