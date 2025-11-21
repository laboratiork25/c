import { canLevelUp, xpRange } from '../lib/levelling.js'
import fs from 'fs'

let handler = async (m, { conn }) => {
    try {
        let name = conn.getName(m.sender)
        let user = global.db.data.users[m.sender]
        
        // Se l'utente non è registrato
        if (!user) {
            user = {
                level: 1,
                exp: 0,
                role: 'Random wz'
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
            const imgNotEnoughXP = './media/nolevelup.png'
            let thumbBuffer = null
            try {
                thumbBuffer = fs.readFileSync(imgNotEnoughXP)
            } catch {}

            await conn.sendMessage(m.chat, {
            text: txt,
            contextInfo: {
                isforwarded: true,
                forwardedNewsletterMessageInfo: {
                newsletterJid: globqal.canale, 
                serverMessageId: 100,
                newsletterName: global.nomebot,
                },
                externalAdReply: {

                    title: `level up`,
                    body: `fallito di merda`,
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
                    user.pozione_maggiore += 3
                    premiTxt += `\n🎁 *Premi per il livello 10:*\n`
                    premiTxt += `• +3 Pozioni Maggiori🧪\n`
                    premiTxt += `• lavori sbloccati:\n`
                    premiTxt += `postino✉️\n`
                } else if (level === 20) {
                    user.pozione_definitiva += 1
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
                    user.forcina += 1
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
            const imgLevelUp = './media/levelup.jpg'
            let levelUpThumb = null
            try {
                levelUpThumb = fs.readFileSync(imgLevelUp)
            } catch {}

            await conn.sendMessage(m.chat, {
            text: txt,
            contextInfo: {
                isforwarded: true,
                forwardedNewsletterMessageInfo: {
                newsletterJid: global.canale,
                serverMessageId: 100,
                newsletterName: global.nomebot,
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

handler.help = ['levelup']
handler.tags = ['rpg']
handler.command = [ 'levelup', 'lvlup']
export default handler