/*
 * Plugin per modificare una voce del database per tutti gli utenti
 * Solo per Owner - Operazioni di massa sul database
 * 
 * Comandi:
 * - .regala set <chiave> <valore>           - Imposta un valore per tutti
 * - .regala add <chiave> <valore>           - Aggiunge un valore numerico per tutti
 * - .regala remove <chiave>                 - Rimuove una chiave per tutti
 * - .regala list                            - Mostra le chiavi più comuni
 * - .regala preview <chiave> <valore>       - Anteprima senza modificare
 * 
 * Esempi:
 * .regala set registered true
 * .regala add limit 1000
 * .regala remove oldProperty
 */

let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
    // Verifica che sia l'owner (usando il parametro isOwner passato dall'handler)
    if (!isOwner) {
        return conn.reply(m.chat, '❌ Solo l\'owner può usare questo comando!', m)
    }

    // Verifica che esista il database
    if (!global.db || !global.db.data || !global.db.data.users) {
        return conn.reply(m.chat, '❌ Database non disponibile!', m)
    }

    const users = global.db.data.users
    const totalUsers = Object.keys(users).length

    // Subcomandi
    const subcommand = args[0]?.toLowerCase()

    if (!subcommand) {
        const help = `*🗄️ MODIFICA DATABASE - GUIDA*

*Comandi disponibili:*

📝 *SET* - Imposta un valore
\`${usedPrefix}regala set <chiave> <valore>\`
Esempio: \`${usedPrefix}regala set registered true\`

➕ *ADD* - Aggiunge valore numerico
\`${usedPrefix}regala add <chiave> <numero>\`
Esempio: \`${usedPrefix}regala add dolci 1000\`
💡 Puoi usare "dolci" o "caramelle" al posto di "limit"

➖ *REMOVE* - Rimuove una chiave
\`${usedPrefix}regala remove <chiave>\`
Esempio: \`${usedPrefix}regala remove oldProperty\`

📋 *LIST* - Mostra chiavi comuni
\`${usedPrefix}regala list\`

👁️ *PREVIEW* - Anteprima modifiche
\`${usedPrefix}regala preview set <chiave> <valore>\`

📊 *Database attuale:*
├ Utenti totali: ${totalUsers}
└ Chiavi disponibili: usa \`.regala list\``

        return conn.reply(m.chat, help, m)
    }

    // ===== LIST: Mostra le chiavi più comuni =====
    if (subcommand === 'list') {
        const keyCount = {}
        const keyTypes = {}
        const keyValues = {}

        // Analizza tutte le chiavi
        for (const [jid, userData] of Object.entries(users)) {
            if (typeof userData !== 'object') continue
            
            for (const [key, value] of Object.entries(userData)) {
                // Conta occorrenze
                keyCount[key] = (keyCount[key] || 0) + 1
                
                // Salva tipo
                if (!keyTypes[key]) {
                    keyTypes[key] = typeof value
                }
                
                // Salva esempio valore
                if (!keyValues[key]) {
                    keyValues[key] = value
                }
            }
        }

        // Ordina per frequenza
        const sortedKeys = Object.entries(keyCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 30) // Prime 30 chiavi

        let listText = `*🗄️ CHIAVI DATABASE (Top 30)*\n\n`
        listText += `📊 *Totale utenti:* ${totalUsers}\n\n`

        sortedKeys.forEach(([key, count], index) => {
            const percentage = ((count / totalUsers) * 100).toFixed(1)
            const type = keyTypes[key]
            const example = keyValues[key]
            
            let exampleStr = ''
            if (type === 'number') {
                exampleStr = `(es: ${example})`
            } else if (type === 'boolean') {
                exampleStr = `(${example ? '✅' : '❌'})`
            } else if (type === 'string') {
                exampleStr = `(es: "${String(example).substring(0, 20)}...")`
            } else if (type === 'object') {
                exampleStr = `(oggetto)`
            }

            listText += `${index + 1}. *${key}* [${type}]\n`
            listText += `   ├ Presente in: ${count}/${totalUsers} (${percentage}%)\n`
            listText += `   └ ${exampleStr}\n\n`
        })

        return conn.reply(m.chat, listText, m)
    }

    // ===== PREVIEW: Anteprima senza modificare =====
    if (subcommand === 'preview') {
        const operation = args[1]?.toLowerCase()
        const key = args[2]
        const value = args.slice(3).join(' ')

        if (!operation || !key) {
            return conn.reply(m.chat, `⚠️ Uso: ${usedPrefix}regala preview <set|add|remove> <chiave> [valore]`, m)
        }

        let previewText = `*👁️ ANTEPRIMA MODIFICHE*\n\n`
        previewText += `📊 *Database:* ${totalUsers} utenti\n`
        previewText += `🔧 *Operazione:* ${operation.toUpperCase()}\n`
        previewText += `🔑 *Chiave:* ${key}\n\n`

        let affected = 0
        let examples = []

        for (const [jid, userData] of Object.entries(users)) {
            if (typeof userData !== 'object') continue

            if (operation === 'set') {
                affected++
                if (examples.length < 3) {
                    const oldValue = userData[key] !== undefined ? userData[key] : 'undefined'
                    examples.push(`${jid.split('@')[0]}: ${oldValue} → ${value}`)
                }
            } else if (operation === 'add') {
                if (typeof userData[key] === 'number') {
                    affected++
                    if (examples.length < 3) {
                        const oldValue = userData[key]
                        const newValue = oldValue + Number(value)
                        examples.push(`${jid.split('@')[0]}: ${oldValue} → ${newValue}`)
                    }
                }
            } else if (operation === 'remove') {
                if (userData[key] !== undefined) {
                    affected++
                    if (examples.length < 3) {
                        examples.push(`${jid.split('@')[0]}: ${userData[key]} → rimosso`)
                    }
                }
            }
        }

        previewText += `✨ *Utenti interessati:* ${affected}/${totalUsers}\n\n`
        
        if (examples.length > 0) {
            previewText += `📝 *Esempi di modifiche:*\n`
            examples.forEach(ex => previewText += `├ ${ex}\n`)
        }

        previewText += `\n⚠️ *Questa è solo un'anteprima!*\n`
        previewText += `Per applicare: \`${usedPrefix}regala ${operation} ${key} ${value}\``

        return conn.reply(m.chat, previewText, m)
    }

    // ===== SET: Imposta un valore =====
    if (subcommand === 'set') {
        let key = args[1]
        const value = args.slice(2).join(' ')

        if (!key || value === undefined || value === '') {
            return conn.reply(m.chat, `⚠️ Uso: ${usedPrefix}regala set <chiave> <valore>\n\nEsempio: ${usedPrefix}regala set registered true`, m)
        }

        // Alias: converte "dolci" o "caramelle" in "limit" (il parametro tecnico)
        if (key.toLowerCase() === 'dolci' || key.toLowerCase() === 'caramelle') {
            key = 'limit'
        }

        // Converti il valore al tipo corretto
        let parsedValue
        if (value.toLowerCase() === 'true') {
            parsedValue = true
        } else if (value.toLowerCase() === 'false') {
            parsedValue = false
        } else if (value.toLowerCase() === 'null') {
            parsedValue = null
        } else if (!isNaN(value) && value.trim() !== '') {
            parsedValue = Number(value)
        } else {
            parsedValue = value
        }

        // Esegui la modifica immediatamente (senza conferma)
        let modified = 0
        for (const [jid, userData] of Object.entries(users)) {
            if (typeof userData === 'object') {
                userData[key] = parsedValue
                modified++
            }
        }

        return conn.reply(m.chat, 
            `✅ *MODIFICA COMPLETATA*\n\n` +
            `🔧 Operazione: SET\n` +
            `🔑 Chiave: \`${key}\`\n` +
            `💎 Valore: \`${parsedValue}\`\n` +
            `👥 Utenti modificati: ${modified}/${totalUsers}\n\n` +
            `✨ Database aggiornato con successo!`, 
            m
        )
    }

    // ===== ADD: Aggiunge un valore numerico =====
    if (subcommand === 'add') {
        let key = args[1]
        const value = args[2]
        if (!key || !value || isNaN(value)) {
            return conn.reply(m.chat, `⚠️ Uso: ${usedPrefix}regala add <chiave> <numero>\n\nEsempio: ${usedPrefix}regala add dolci 1000`, m)
        }

        // Alias: converte "dolci" o "caramelle" in "limit" (il parametro tecnico)
        if (key.toLowerCase() === 'dolci' || key.toLowerCase() === 'caramelle') {
            key = 'limit'
        }

        const numValue = Number(value)

        // Conta quanti utenti hanno la chiave come numero
        let affectedCount = 0
        for (const userData of Object.values(users)) {
            if (typeof userData === 'object' && typeof userData[key] === 'number') {
                affectedCount++
            }
        }

        // Esegui la modifica immediatamente (senza conferma)
        let modified = 0
        for (const userData of Object.values(users)) {
            if (typeof userData === 'object' && typeof userData[key] === 'number') {
                userData[key] += numValue
                modified++
            }
        }

        return conn.reply(m.chat, 
            `✅ *MODIFICA COMPLETATA*\n\n` +
            `🔧 Operazione: ADD\n` +
            `🔑 Chiave: \`${key}\`\n` +
            `➕ Valore aggiunto: \`${numValue}\`\n` +
            `👥 Utenti modificati: ${modified}/${totalUsers}\n` +
            `👥 Utenti interessati: ${affectedCount}/${totalUsers}\n\n` +
            `✨ Database aggiornato con successo!`, 
            m
        )
    }

    // ===== REMOVE: Rimuove una chiave =====
    if (subcommand === 'remove' || subcommand === 'delete') {
        const key = args[1]

        if (!key) {
            return conn.reply(m.chat, `⚠️ Uso: ${usedPrefix}regala remove <chiave>\n\nEsempio: ${usedPrefix}regala remove oldProperty`, m)
        }

        // Conta quanti utenti hanno la chiave
        let affectedCount = 0
        for (const userData of Object.values(users)) {
            if (typeof userData === 'object' && userData[key] !== undefined) {
                affectedCount++
            }
        }

        if (affectedCount === 0) {
            return conn.reply(m.chat, `ℹ️ La chiave \`${key}\` non esiste in nessun utente!`, m)
        }

        // Esegui la rimozione immediatamente (senza conferma)
        let removed = 0
        for (const userData of Object.values(users)) {
            if (typeof userData === 'object' && userData[key] !== undefined) {
                delete userData[key]
                removed++
            }
        }

        return conn.reply(m.chat, 
            `✅ *RIMOZIONE COMPLETATA*\n\n` +
            `🔧 Operazione: REMOVE\n` +
            `🔑 Chiave: \`${key}\`\n` +
            `👥 Utenti modificati: ${removed}/${totalUsers}\n` +
            `👥 Utenti interessati: ${affectedCount}/${totalUsers}\n\n` +
            `✨ Chiave rimossa dal database!`, 
            m
        )
    }

    // Subcomando non riconosciuto
    return conn.reply(m.chat, `❌ Subcomando non riconosciuto: \`${subcommand}\`\n\nUsa \`${usedPrefix}moddb\` per vedere la guida.`, m)
}

handler.help = ['regala', 'regalo']
handler.tags = ['owner']
handler.command = /^(regala|regalo)$/i
handler.owner = true

export default handler
