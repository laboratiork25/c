import { xpRange } from '../lib/levelling.js'
import { canLevelUp } from '../lib/levelling.js'
import fs from 'fs'
import path from 'path'
import { createCanvas, loadImage, registerFont } from 'canvas'

const DEFAULT_AVATAR_URL = 'https://i.ibb.co/BKHtdBNp/default-avatar-profile-icon-1280x1280.jpg'

let fontsLoaded = false
async function setupFonts() {
  if (fontsLoaded) return
  try {
    registerFont('media/fonts/BebasNeue-Regular.ttf', { family: 'Bebas Neue' })
    registerFont('media/fonts/Montserrat-Regular.ttf', { family: 'Montserrat' })
  } catch {}
  fontsLoaded = true
}

async function createCircularProfilePic(url, size = 100) {
  try {
    const img = await loadImage(url)
    const canvas = createCanvas(size, size)
    const ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(img, 0, 0, size, size)
    return canvas
  } catch {
    return null
  }
}

async function createLevelImage(username, level, currentExp, neededExp, progressPercent, pfpUrl, groupUrl, userId, groupId, canLevelUpFlag) {
  await setupFonts()
  const width = 800
  const height = 400
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, width, height)

  try {
    const bg = await loadImage(groupUrl)
    const scale = Math.max(width / bg.width, height / bg.height)
    ctx.drawImage(
      bg,
      (width - bg.width * scale) / 2,
      (height - bg.height * scale) / 2,
      bg.width * scale,
      bg.height * scale
    )
  } catch {
    ctx.fillStyle = '#333'
    ctx.fillRect(0, 0, width, height)
  }

  const margin = 50
  const cardW = width - 2 * margin
  const cardH = height - 2 * margin
  ctx.fillStyle = 'rgba(0,0,0,0.75)'
  ctx.beginPath()
  ctx.roundRect(margin, margin, cardW, cardH, 20)
  ctx.fill()

  const centerY = margin + cardH / 2
  const pfpCanvas = await createCircularProfilePic(pfpUrl, 100)
  const contentX = margin + 20
  if (pfpCanvas) ctx.drawImage(pfpCanvas, contentX, centerY - 50)

  ctx.font = 'bold 28px Montserrat'
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'left'
  ctx.fillText(username, contentX + 140, centerY - 20)

  const levelText = `🏆 Livello ${level}`
  ctx.font = '24px Montserrat'
  ctx.fillText(levelText, contentX + 140, centerY + 20)

  const barX = contentX + 140
  const barY = centerY + 50
  const barWidth = cardW - 140 - 30
  const barHeight = 20

  if (currentExp > 0) {
    ctx.fillStyle = '#555'
    ctx.beginPath()
    ctx.roundRect(barX, barY, barWidth, barHeight, 10)
    ctx.fill()
    const percent = Math.min(progressPercent / 100, 1)
    ctx.fillStyle = canLevelUpFlag ? '#00ff00' : '#fff'
    ctx.beginPath()
    ctx.roundRect(barX, barY, barWidth * percent, barHeight, 10)
    ctx.fill()
    ctx.font = '16px Montserrat'
    ctx.fillStyle = '#000000'
    ctx.textAlign = 'center'
    const progressText = `${currentExp}/${neededExp} XP`
    ctx.fillText(progressText, barX + barWidth / 2, barY + barHeight - 4)
  }

  ctx.font = '18px Montserrat'
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  const footerText = canLevelUpFlag ? '🎉 Pronto per il level up!' : 'Continua a guadagnare XP!'
  ctx.fillText(footerText, margin + cardW / 2, margin + cardH - 20)

  return canvas.toBuffer('image/png')
}

let handler = async (m, { conn, mentionedJid, args }) => {
    // Controlla se è un comando levelup
    if (args[0] && args[0].toLowerCase() === 'up') {
        return await handleLevelUp(m, { conn })
    }

    // Ottieni l'utente target
    let targetJid = mentionedJid && mentionedJid[0] ? mentionedJid[0] : m.sender
    let user = global.db.data.users[targetJid]

    // Inizializza l'utente se non esiste
    if (!user) {
        user = {
            level: 1,
            exp: 0,
            role: '*random wz*',
            name: conn.getName(targetJid)
        }
        global.db.data.users[targetJid] = user
    }

    // Calcola EXP e progresso CORRETTO
    let currentLevel = user.level || 1
    let currentExp = user.exp || 0

    // Ottieni i range per il livello attuale
    let { min, xp, max } = xpRange(currentLevel, global.multiplier)

    // Calcola gli EXP per il livello successivo
    let nextLevelRange = xpRange(currentLevel + 1, global.multiplier)
    let neededExp = nextLevelRange.min - currentExp

    // Calcola la percentuale di completamento del livello corrente
    let expInCurrentLevel = currentExp - min
    let progressRatio = expInCurrentLevel / xp
    let progressPercent = Math.round(progressRatio * 100)

    // Verifica se può fare level up
    let canLevelUpFlag = canLevelUp(currentLevel, currentExp, global.multiplier)

    // Ottieni il nome e le immagini profilo
    let userName = user.name || conn.getName(targetJid)
    const [pfpUrl, groupUrl] = await Promise.all([
        conn.profilePictureUrl(targetJid).catch(() => DEFAULT_AVATAR_URL),
        conn.profilePictureUrl(m.chat).catch(() => DEFAULT_AVATAR_URL),
    ])

    // Crea l'immagine del livello
    const levelImage = await createLevelImage(
        userName,
        currentLevel,
        expInCurrentLevel,
        xp,
        progressPercent,
        pfpUrl,
        groupUrl,
        targetJid,
        m.chat,
        canLevelUpFlag
    )

    // Prepara il messaggio con l'immagine
    let caption = `👤 *Utente:* ${userName}\n`
    caption += `🏆 *Livello attuale:* ${currentLevel}\n`
    caption += `🎯 *Rank:* ${user.role}\n`
    caption += `📊 *XP:* ${expInCurrentLevel}/${xp}\n`
    caption += `📈 *Progresso:* ${progressPercent}%\n\n`

    if (canLevelUpFlag) {
        caption += `🎉 *Sei pronto a salire livello ${currentLevel + 1}!*\nUsa il comando \`level up\``
    } else {
        caption += `⚡ Ti mancano ${neededExp} XP per salire di livello`
    }

    const nomeDelBot = conn.user?.name || global.db?.data?.nomedelbot || 'ChatUnity'

    await conn.sendMessage(
        m.chat,
        {
            image: levelImage,
            caption,
            mentions: [targetJid],
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363259442839354@newsletter',
                    serverMessageId: '',
                    newsletterName: nomeDelBot,
                },
            },
        },
        { quoted: m }
    )
}
        
        
        
            
   
handler.help = ['livello @user', 'level up']
handler.tags = ['rpg']
handler.command = ['livello', 'level', 'lvl']
export default handler

// Funzione per gestire il levelup
async function handleLevelUp(m, { conn }) {
    try {
        let name = conn.getName(m.sender)
        let user = global.db.data.users[m.sender]

        // Se l'utente non è registrato
        if (!user) {
            user = {
                level: 1,
                exp: 0,
                role: 'Novizio'
            }
            global.db.data.users[m.sender] = user
        }

        // Se NON può salire di livello
        if (!canLevelUp(user.level, user.exp, global.multiplier)) {
            let { min, xp, max } = xpRange(user.level, global.multiplier)
            let currentExp = user.exp - min
            let neededExp = max - user.exp
            let progressPercent = Math.round((currentExp / xp) * 100)

            const [pfpUrl, groupUrl] = await Promise.all([
                conn.profilePictureUrl(m.sender).catch(() => DEFAULT_AVATAR_URL),
                conn.profilePictureUrl(m.chat).catch(() => DEFAULT_AVATAR_URL),
            ])

            const levelImage = await createLevelImage(
                name,
                user.level,
                currentExp,
                xp,
                progressPercent,
                pfpUrl,
                groupUrl,
                m.sender,
                m.chat,
                false
            )

            let caption = `📉 *NON ABBASTANZA XP!* 📉\n\n`
            caption += `👤 *Utente:* ${name}\n`
            caption += `🏆 *Livello attuale:* ${user.level}\n`
            caption += `🧩 *XP mancanti:* ${neededExp}\n\n`
            caption += `✨ *EXP Attuali:* ${currentExp}/${xp}\n`
            caption += `📈 *Progresso:* ${progressPercent}%\n\n`
            caption += `⚡ *EXP mancanti per livello ${user.level + 1}:* ${neededExp} EXP`
            caption += `\n\n💡 *Suggerimento:* scrivi più spesso per guadagnare XP!`

            const nomeDelBot = conn.user?.name || global.db?.data?.nomedelbot || 'ChatUnity'

            await conn.sendMessage(m.chat, {
                image: levelImage,
                caption,
                contextInfo: {
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363259442839354@newsletter',
                        serverMessageId: '',
                        newsletterName: nomeDelBot,
                    },
                }
            }, { quoted: m })
            return
        }

        // Se può salire di livello
        let before = user.level
        let skippedLevels = []
        while (canLevelUp(user.level, user.exp, global.multiplier)) {
            skippedLevels.push(user.level + 1)
            user.level++
        }

        if (before !== user.level) {
            // Premi per tutti i livelli saltati
            let premiTxt = ''
            for (let level of skippedLevels) {
                if (level === 10) {
                    user.pozione_maggiore = (user.pozione_maggiore || 0) + 3
                    premiTxt += `\n🎁 *Premi per il livello 10:*\n`
                    premiTxt += `• +3 Pozioni Maggiori🧪\n`
                    premiTxt += `• lavori sbloccati:\n`
                    premiTxt += `postino✉️\n`
                } else if (level === 20) {
                    user.pozione_definitiva = (user.pozione_definitiva || 0) + 1
                    user.moto = true
                    premiTxt += `\n🎁 *Premi per il livello 20:*\n`
                    premiTxt += `• 1 Pozione Definitiva🧪\n`
                    premiTxt += `• hai la Moto sbloccata!🏍️\n`
                    premiTxt += `• lavori sbloccati:\n`
                    premiTxt += `meccanico🧑🏻‍🔧\ndj 🎧\n`
                } else if (level === 30) {
                    user.macchina = true
                    premiTxt += `\n🎁 *Premi per il livello 30:*\n`
                    premiTxt += `• hai sbloccato i tesori🦜 usa .tesoro\n`
                    premiTxt += `• 🚗 Macchina sbloccata!\n`
                    premiTxt += `• lavori sbloccati:\n`
                    premiTxt += `pagliaccio🎭\n`
                } else if (level === 40) {
                    user.forcina = (user.forcina || 0) + 1
                    premiTxt += `\n🎁 *Premi per il livello 40:*\n`
                    premiTxt += `• 🖇️ Forcina sbloccata!\n`
                    premiTxt += `• lavori sbloccati:\n`
                    premiTxt += `mafioso🧔🏻‍♂️🍕\n`
                } else if (level === 50) {
                    premiTxt += `\n🎁 *Premi per il livello 50:*\n`
                    premiTxt += `• lavori sbloccati:\n`
                    premiTxt += `avvocato⚖️\ncantante🎤\n`
                } else if (level === 60) {
                    premiTxt += `\n🎁 *Premi per il livello 60:*\n`
                    premiTxt += `• lavori sbloccati:\n`
                    premiTxt += `scienziato🔬\ningegnere informatico💻\nastronauta🚀\n`
                }
            }

            const [pfpUrl, groupUrl] = await Promise.all([
                conn.profilePictureUrl(m.sender).catch(() => DEFAULT_AVATAR_URL),
                conn.profilePictureUrl(m.chat).catch(() => DEFAULT_AVATAR_URL),
            ])

            // Calcola il progresso per il nuovo livello
            let { min, xp } = xpRange(user.level, global.multiplier)
            let currentExp = user.exp - min
            let progressPercent = Math.round((currentExp / xp) * 100)

            const levelImage = await createLevelImage(
                name,
                user.level,
                currentExp,
                xp,
                progressPercent,
                pfpUrl,
                groupUrl,
                m.sender,
                m.chat,
                false
            )

            let caption = `🎉 *LEVEL UP!* 🎉\n\n`
            caption += `👤 *Utente:* ${name}\n`
            caption += `⚡ *Progresso:* ${before} ➔ ${user.level}\n`
            caption += `🏅 *Nuovo Rank:* ${user.role}\n\n`

            // Aggiungi i premi al messaggio solo se esistono
            if (premiTxt) caption += premiTxt
            caption += `\n📅 ${new Date().toLocaleString('it-IT')}`

            const nomeDelBot = conn.user?.name || global.db?.data?.nomedelbot || 'ChatUnity'

            await conn.sendMessage(m.chat, {
                image: levelImage,
                caption,
                contextInfo: {
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363259442839354@newsletter',
                        serverMessageId: '',
                        newsletterName: nomeDelBot,
                    },
                }
            }, { quoted: m })
        }
    } catch (error) {
        console.error('Errore:', error)
        await conn.sendMessage(m.chat, {
            text: '❌ Errore durante l\'aggiornamento del livello'
        })
    }
}