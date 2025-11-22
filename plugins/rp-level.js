import { xpRange } from '../lib/levelling.js'
import { canLevelUp } from '../lib/levelling.js'
import fs from 'fs'
import path from 'path';

let handler = async (m, { conn, mentionedJid, args }) => {
    // Controlla se è un comando levelup
    if (args[0] && args[0].toLowerCase() === 'up') {
        return await handleLevelUp(m, { conn });
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
    
    
    // Percorsi delle immagini locali
  const basePath = './media/level/';
  const levelImageBuffer = fs.readFileSync(path.join(basePath, 'level.jpg'));


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
    let progress = Math.floor(progressRatio * 10)
    
    // Barra di progresso
    let progressBar = '【'
    for (let i = 0; i < 10; i++) {
        progressBar += i < progress ? '■' : '□'
    }
    progressBar += '】'

    // Ottieni il nome
    let userName = user.name || conn.getName(targetJid)
    let nomeDelBot = global.nomebot

    // Prepara il messaggio
    let text = `👤 *Utente:* ${user.name}\n`
    text += `🏆 *Livello attuale:* ${currentLevel}\n`
    text += `🎯 *Rank:* ${user.role}\n`
    text += `✨ *EXP Totali:* ${currentExp}\n`
    text += `📊 *EXP nel livello:* ${expInCurrentLevel}/${xp}\n`
    text += `📈 *Progresso:* ${progressBar} ${Math.round(progressRatio * 100)}%\n\n`
    
    // Messaggio speciale se ha raggiunto il massimo EXP per questo livello
    if (expInCurrentLevel >= xp) {
        text += `🎉 *Pronto per salire al livello ${currentLevel + 1}! Usa il comando [.levelup] per avanzare.`
    } else {
        text += `⚡ *EXP mancanti per livello ${currentLevel + 1}:* ${neededExp} EXP`
    }

    // Immagine profilo
    let pp = levelImageBuffer
    // let apii = await conn.getFile(pp)  // Non necessario, pp è già un Buffer
        
    await conn.sendMessage(m.chat, { 
        text: text,
        contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: global.canale,
              serverMessageId: 100,
              newsletterName: global.nomebot,
            },
            externalAdReply: {
             title: `Controlla il tuo stato`,
             body:  `Livello e progresso`,
             thumbnail: pp,  // Usa direttamente il Buffer
                sourceUrl: "", 
                mediaType: 1,
                renderLargerThumbnail: false
            },
            mentionedJid: [targetJid]  // Usa il JID, non l'oggetto user
        },
    }, { quoted: m })
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

        // Calcola EXP e progresso
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        let currentExp = user.exp - min
        let neededExp = max - user.exp
        let progress = Math.floor((currentExp / xp) * 10)
        
        // Barra di progresso
        let progressBar = '【'
        for (let i = 0; i < 10; i++) {
            progressBar += i < progress ? '■' : '□'
        }
        progressBar += '】'
        
        // Se NON può salire di livello
        if (!canLevelUp(user.level, user.exp, global.multiplier)) {
            let { min, xp, max } = xpRange(user.level, global.multiplier)
            let txt = `*📉NON ABBASTANZA XP!📉*\n\n`
            txt += `👤 *Utente:* ${name}\n`
            txt += `🏆 *Livello attuale:* ${user.level}\n`
            txt += `🧩 *XP mancanti:* ${max - user.exp}\n\n`
            txt += `✨ *EXP Attuali:* ${currentExp}/${xp}\n`
            txt += `📈 *Progresso:* ${progressBar} ${Math.round((currentExp / xp) * 100)}%\n\n`
            txt += `⚡ *EXP mancanti per livello ${user.level + 1}:* ${neededExp} EXP`

            txt += `\n\n💡 *Suggerimento:* scrivi più spesso per guadagnare XP!`

            // Thumbnail per XP insufficiente
            const imgNotEnoughXP = './src/img/level/nolevelup.png'
            let thumbBuffer = null
            try {
                thumbBuffer = fs.readFileSync(imgNotEnoughXP)
            } catch {}

            await conn.sendMessage(m.chat, {
                text: txt,
                contextInfo: {
                    isforwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363401234816773@newsletter",
                        serverMessageId: 100,
                        newsletterName: 'canale dei meme 🎌',
                    },
                    externalAdReply: {
                        title: `levelup`,
                        body: `aumenti di livello`,
                        thumbnail: thumbBuffer,
                        mediaType: 1,
                        sourceUrl: ''
                    }
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

            let txt = `🎉 *LEVEL UP!* 🎉\n\n`
            txt += `👤 *Utente:* ${name}\n`
            txt += `⚡ *Progresso:* ${before} ➔ ${user.level}\n`
            txt += `🏅 *Nuovo Rank:* ${user.role}\n\n`
            
            // Aggiungi i premi al messaggio solo se esistono
            if (premiTxt) txt += premiTxt
            txt += `\n📅 ${new Date().toLocaleString('it-IT')}`
            
            // Thumbnail per LEVEL UP
            const imgLevelUp = './src/img/level/levelup.jpg'
            let levelUpThumb = null
            try {
                levelUpThumb = fs.readFileSync(imgLevelUp)
            } catch {}

            await conn.sendMessage(m.chat, {
                text: txt,
                contextInfo: {
                    isforwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363401234816773@newsletter",
                        serverMessageId: 100,
                        newsletterName: 'canale dei meme 🎌',
                    },
                    externalAdReply: {
                        title: `levelup`,
                        body: `aumenti di livello`,
                        thumbnail: levelUpThumb,
                        mediaType: 1,
                        sourceUrl: ''
                    }
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