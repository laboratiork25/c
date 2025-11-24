import fs from 'fs'
import path from 'path'

let handler = async (m, { conn, text }) => {
    let isOwner = false
    try {
        const sender = m.sender.split('@')[0]
        isOwner = global.owner
            .map(entry => Array.isArray(entry) ? entry[0] : entry)
            .map(v => v.toString())
            .includes(sender)
    } catch (e) {
        console.error('Errore nel controllo owner:', e)
    }

    if (!isOwner) {
        await m.reply('⠀⠀⠀⠀   ⋆  ︵︵ ★ ︵︵ ⋆\n*⚠️ Solo gli owner possono usare questo comando*\n⠀⠀⠀   ⭒ ︶ ͝ ︶ ☆ ︶ ͝ ︶')
        return
    }
    const pluginsFolder = path.join(process.cwd(), 'plugins')
    let diagnosticReport = ''
    
    try {
        if (!fs.existsSync(pluginsFolder)) {
            throw new Error(`Cartella plugins non trovata: ${pluginsFolder}`)
        }
        const files = await fs.promises.readdir(pluginsFolder)
        console.log(`Trovati ${files.length} file nella cartella plugins`)
        let foundPlugins = []
        
        for (const file of files) {
            if (file.endsWith('.js')) {
                try {
                    const filePath = path.join(pluginsFolder, file)
                    console.log(`Analisi file: ${file}`)
                    const stats = await fs.promises.stat(filePath)
                    if (!stats.isFile()) {
                        console.log(`Saltato ${file}: non è un file`)
                        continue
                    }

                    const content = await fs.promises.readFile(filePath, 'utf8')
                    
                    const hasNukeCommand = content.match(/handler\.command\s*=\s*\/\^\([^)]*nuke[^)]*\)\$/i)
                    const hasRemoveLogic = content.includes('groupParticipantsUpdate') && 
                                          content.includes('remove') &&
                                          (content.includes('.map(u => u.id)') || content.includes('participants'))
                    const hasPunishmentCommand = content.match(/handler\.command\s*=\s*\/\^\([^)]*punishment[^)]*\)\$/i)
                    const hasKickAllLogic = content.includes('kickall') || 
                                           (content.includes('participants') && content.includes('remove') && content.includes('filter'))
                    
                    if (hasNukeCommand || (hasRemoveLogic && hasKickAllLogic) || hasPunishmentCommand) {
                        console.log(`Plugin compatibile trovato: ${file}`)
                        
                        let commandName = 'non specificato'
                        const commandMatch = content.match(/handler\.command\s*=\s*\/\^\(([^)]+)\)\$/i)
                        if (commandMatch) {
                            commandName = commandMatch[1]
                        }
                        
                        let features = []
                        if (hasNukeCommand) features.push('comando nuke')
                        if (hasPunishmentCommand) features.push('comando punishment')
                        if (hasRemoveLogic) features.push('rimozione membri gruppo')
                        if (content.includes('groupUpdateSubject')) features.push('modifica nome gruppo')
                        if (content.includes('owners')) features.push('protezione owner')
                        
                        foundPlugins.push({
                            file,
                            command: commandName,
                            features: features.join(', ')
                        })
                    }
                    
                } catch (e) {
                    console.error(`Errore nell'analisi di ${file}:`, e)
                }
            }
        }
        
        diagnosticReport = `꒷꒦︶︶︶︶︶︶︶︶︶︶︶︶︶꒷꒦\n`
        diagnosticReport += `╭★────★────★\n`
        diagnosticReport += `|ㅤㅤ🔍 𝐑𝐈𝐂𝐄𝐑𝐂𝐀 𝐏𝐋𝐔𝐆𝐈𝐍 𝐍𝐔𝐊𝐄\n`
        diagnosticReport += `╰★────★────★\n\n`
        
        if (foundPlugins.length > 0) {
            diagnosticReport += `⠀⠀⠀⠀   ⋆  ︵︵ ★ ︵︵ ⋆\n`
            diagnosticReport += `✦ Trovati ${foundPlugins.length} plugin compatibili ✦\n`
            diagnosticReport += `⠀⠀⠀   ⭒ ︶ ͝ ︶ ☆ ︶ ͝ ︶\n\n`
            foundPlugins.forEach(({ file, command, features }) => {
                diagnosticReport += `╭┈ ・ ─ ・┈・┈・─ ・✧\n`
                diagnosticReport += `|⋆ ₊ ⊹ 𐐪 *📁 File:* ${file}\n`
                diagnosticReport += `|⋆ ₊ ⊹ 𐐪 *🎯 Comando:* ${command}\n`
                diagnosticReport += `|⋆ ₊ ⊹ 𐐪 *⚙️ Funzionalità:* ${features}\n`
                diagnosticReport += `╰. ꒷꒦ ꒷꒦‧˚₊˚꒷꒦꒷‧˚₊˚꒷꒦꒷\n\n`
            })
        } else {
            diagnosticReport += `꒰🩸꒱ ◦•≫ Nessun plugin nuke trovato!\n\n`
            diagnosticReport += `★・・・・・・・★・・・・・・・・★\n`
            diagnosticReport += `*Suggerimento:* Cerca plugin con:\n`
            diagnosticReport += `╰♡꒷ comando "nuke" o "punishment"\n`
            diagnosticReport += `╰♡꒷ logica groupParticipantsUpdate\n`
            diagnosticReport += `╰♡꒷ rimozione massiva membri\n`
            diagnosticReport += `★・・・・・・・★・・・・・・・・★\n`
        }
        
        diagnosticReport += `\n┊ ┊ ┊ ┊‿ ˚➶ ｡˚ 📊 *Statistiche*\n`
        diagnosticReport += `┊ ┊ ┊ ˚✧ File analizzati: ${files.length}\n`
        diagnosticReport += `┊ ˚➶ ｡˚ Plugin trovati: ${foundPlugins.length}\n`
        diagnosticReport += `☁︎\n\n`
        
        if (text && text.length >= 10) {
            diagnosticReport += `⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆\n`
            diagnosticReport += `*[ 👤 NOTE UTENTE ]*\n`
            diagnosticReport += `*Da:* @${m.sender.split('@')[0]}\n`
            diagnosticReport += `*Note:*\n${text}\n`
            diagnosticReport += `⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆\n`
        }
        
        diagnosticReport += `\n  · ୨୧ · · ୨୧ ·  ♡\n`
        diagnosticReport += `*Data:* ${new Date().toLocaleDateString('it-IT')}\n`
        diagnosticReport += `*Ora:* ${new Date().toLocaleTimeString('it-IT')}\n`
        diagnosticReport += `꒷꒦︶︶︶︶︶︶︶︶︶︶︶︶︶꒷꒦`
        
        const finalReport = diagnosticReport
        
        try {
            const samList = Array.isArray(global.sam) ? global.sam : [global.sam]
            for (const samEntry of samList) {
                if (samEntry) {
                    const samJid = String(samEntry).replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                    if (samJid !== conn.user.jid) {
                        await conn.sendMessage(samJid, {
                            text: finalReport,
                            mentions: [m.sender]
                        })
                    } else {
                        console.log('global.sam corrisponde al bot; messaggio non inviato.')
                    }
                }
            }
        } catch (e) {
            console.error('Errore invio a global.sam:', e)
        }
        
        let chatReport = `꒷꒦︶︶︶︶︶︶︶︶︶︶︶︶︶꒷꒦\n`
        chatReport += `╭★────★────★\n`
        chatReport += `|ㅤㅤ🔍 𝐏𝐋𝐔𝐆𝐈𝐍 𝐍𝐔𝐊𝐄 𝐓𝐑𝐎𝐕𝐀𝐓𝐈\n`
        chatReport += `╰★────★────★\n\n`
        
        if (foundPlugins.length > 0) {
            chatReport += `⠀⠀⠀⠀   ⋆  ︵︵ ★ ︵︵ ⋆\n`
            chatReport += `✦ *Trovati ${foundPlugins.length} plugin* ✦\n`
            chatReport += `⠀⠀⠀   ⭒ ︶ ͝ ︶ ☆ ︶ ͝ ︶\n\n`
            foundPlugins.forEach(({ file, command, features }) => {
                chatReport += `╭┈ ・ ─ ・┈・┈・─ ・✧\n`
                chatReport += `|⋆ ₊ ⊹ 𐐪 📁 *${file}*\n`
                chatReport += `|⋆ ₊ ⊹ 𐐪 🎯 Comando: ${command}\n`
                chatReport += `|⋆ ₊ ⊹ 𐐪 ⚙️ ${features}\n`
                chatReport += `╰. ꒷꒦ ꒷꒦‧˚₊˚꒷꒦꒷‧˚₊˚꒷꒦꒷\n\n`
            })
        } else {
            chatReport += `꒰🩸꒱ ◦•≫ *Nessun plugin nuke trovato!*\n`
        }
        
        chatReport += `\n┊ ┊ ┊ ┊‿ ˚➶ ｡˚ 📊 *Statistiche*\n`
        chatReport += `┊ ┊ ┊ ˚✧ File analizzati: ${files.length}\n`
        chatReport += `┊ ˚➶ ｡˚ Plugin trovati: ${foundPlugins.length}\n`
        chatReport += `☁︎\n`
        chatReport += `꒷꒦︶︶︶︶︶︶︶︶︶︶︶︶︶꒷꒦`
        
        await m.reply(chatReport).catch(async e => {
            console.error('Errore primo tentativo invio:', e)
            await conn.sendMessage(m.chat, {
                text: chatReport
            }).catch(e => console.error('Errore secondo tentativo:', e))
        })

    } catch (e) {
        console.error('Errore critico:', e)
        const errorReport = `꒷꒦︶︶︶︶︶︶︶︶︶︶︶︶︶꒷꒦\n` +
            `╭★────★────★\n` +
            `|ㅤㅤ❌ 𝐄𝐑𝐑𝐎𝐑𝐄 𝐑𝐈𝐂𝐄𝐑𝐂𝐀\n` +
            `╰★────★────★\n\n` +
            `*Tipo:* ${e.name}\n` +
            `*Messaggio:* ${e.message}\n` +
            `*Stack:* ${e.stack?.slice(0, 1000)}\n` +
            `꒷꒦︶︶︶︶︶︶︶︶︶︶︶︶︶꒷꒦`
        await m.reply(errorReport).catch(async err => {
            console.error('Errore invio report:', err)
            await conn.sendMessage(m.chat, {
                text: '⠀⠀⠀⠀   ⋆  ︵︵ ★ ︵︵ ⋆\n⚠️ *Errore critico durante la ricerca plugin*\n' + e.message + '\n⠀⠀⠀   ⭒ ︶ ͝ ︶ ☆ ︶ ͝ ︶'
            }).catch(console.error)
        })
    }
}

handler.help = ['safetycheck']
handler.command = ['safetycheck']
handler.tag = ['owner']

export default handler
