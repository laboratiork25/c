//thanks to army!
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class LanguageManager {
    constructor() {
        this.languages = {}
        this.defaultLanguage = 'it'
        this.userLanguages = new Map()
        this.groupLanguages = new Map()
        this.loadLanguages().catch(console.error)
    }

    async loadLanguages() {
        const languageDir = path.join(__dirname, 'languages')
        const langCodeMap = {
            'italiano': 'it',
            'english': 'en',
            'cinese': 'zh',
            'arabo': 'ar',
            'francese': 'fr',
            'hindi': 'hi',
            'indonesiano': 'id',
            'portoghese': 'pt',
            'russo': 'ru',
            'spagnolo': 'es',
            'tedesco': 'de',
            'turco': 'tr'
        }
        
        try {
            const files = fs.readdirSync(languageDir)
            
            for (const file of files) {
                if (file.endsWith('.js')) {
                    const fileName = file.replace('.js', '')
                    const langCode = langCodeMap[fileName] || fileName
                    
                    try {
                        const filePath = path.join(languageDir, file)
                        const fileUrl = pathToFileURL(filePath).href
                        const langModule = await import(fileUrl)
                        this.languages[langCode] = langModule.default || langModule
                    } catch (error) {
                    }
                }
            }
        } catch (error) {
        }
    }

    setUserLanguage(userId, language) {
        const validLanguages = ['it', 'en', 'zh', 'ar', 'fr', 'hi', 'id', 'pt', 'ru', 'es', 'de', 'tr']
        if (validLanguages.includes(language)) {
            this.userLanguages.set(userId, language)
            this.saveToDatabase()
            return true
        }
        return false
    }
    
    setGroupLanguage(groupId, language) {
        const validLanguages = ['it', 'en', 'zh', 'ar', 'fr', 'hi', 'id', 'pt', 'ru', 'es', 'de', 'tr']
        if (validLanguages.includes(language)) {
            this.groupLanguages.set(groupId, language)
            this.saveToDatabase()
            return true
        }
        return false
    }

    getUserLanguage(userId, groupId = null) {
        if (groupId && this.groupLanguages.has(groupId)) {
            return this.groupLanguages.get(groupId)
        }
        
        if (this.userLanguages.has(userId)) {
            return this.userLanguages.get(userId)
        }
        
        // Finally fallback to default
        return this.defaultLanguage
    }

    getText(key, userId, groupId = null, replacements = {}) {
        const language = this.getUserLanguage(userId, groupId)
        const langData = this.languages[language] || this.languages[this.defaultLanguage]
        
        if (!langData) {
            console.warn(`⚠️ Language data not loaded for ${language}, using fallback`)
            return this.getFallbackText(key, replacements)
        }
        
        let text = langData[key]
        
        // ✅ Verifica se esiste la chiave PRIMA di controllare il tipo
        if (!text) {
            console.warn(`⚠️ Key "${key}" not found in language "${language}"`)
            return this.getFallbackText(key, replacements)
        }
        
        // Handle function-based messages
        if (typeof text === 'function') {
            try {
                const result = text(replacements)
                if (typeof result === 'string') {
                    // Applica i replacements al risultato della funzione
                    let finalText = result
                    Object.keys(replacements).forEach(placeholder => {
                        finalText = finalText.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), replacements[placeholder])
                    })
                    return finalText
                }
                return result || this.getFallbackText(key, replacements)
            } catch (error) {
                console.error(`❌ Error executing language function for key ${key}:`, error)
                return this.getFallbackText(key, replacements)
            }
        }
        
        // Handle string-based messages
        if (typeof text === 'string') {
            Object.keys(replacements).forEach(placeholder => {
                text = text.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), replacements[placeholder])
            })
            return text
        }
        
        return this.getFallbackText(key, replacements)
    }

    getFallbackText(key, replacements = {}) {
        const fallbacks = {
            warnMentionUser: "❌ Devi menzionare un utente o rispondere al suo messaggio.",
            warnBotImmune: "🚫 Non puoi avvertire il bot.",
            warnUserNotFound: "❌ Utente non trovato nel database.",
            warnMessage: `⚠️ AVVERTIMENTO ${replacements.warns || 0}/3 (3 avvertimenti=ban)`,
            warnBanMessage: "⛔ UTENTE RIMOSSO DOPO 3 AVVERTIMENTI",
            helpMenu: `📋 *Menu Aiuto ChatUnity Bot*\n\n🤖 *Comandi AI:*\n• {prefix}ia <testo> - ChatGPT\n• {prefix}img <testo> - Genera immagini\n\n👥 *Comandi Gruppo:*\n• {prefix}benvenuto - Gestisci messaggi benvenuto\n• {prefix}antilink - Attiva/disattiva antilink\n\n🌍 *Lingua:*\n• {prefix}lingua <it/en> - Cambia lingua\n\n📞 *Supporto:*\n• {prefix}support - Contatta il supporto`,
            smsWait: '⏳ Caricamento...',
            smsError: '❌ Si è verificato un errore',
            smsSuccess: '✅ Operazione completata con successo',
            invalidLanguage: '❌ Lingua non valida. Usa "it" per italiano o "en" per inglese.',
            languageChanged: '🌍 Lingua cambiata con successo!',
            languageHelp: '🌍 *Gestione Lingua*\n\n*Lingue disponibili:*\n• 🇮🇹 Italiano (it)\n• 🇺🇸 English (en)\n• 🇨🇳 中文 (zh)\n• 🇸🇦 العربية (ar)\n• 🇫🇷 Français (fr)\n• 🇮🇳 हिंदी (hi)\n• 🇮🇩 Bahasa Indonesia (id)\n• 🇧🇷 Português (pt)\n• 🇷🇺 Русский (ru)\n• 🇪🇸 Español (es)\n• 🇩🇪 Deutsch (de)\n• 🇹🇷 Türkçe (tr)\n\n*Uso:*\n{prefix}lingua it - Imposta italiano\n{prefix}lingua en - Imposta inglese',
            currentLanguage: '🌍 Lingua attuale: Italiano 🇮🇹'
        }
        
        let text = fallbacks[key] || key
        
        Object.keys(replacements).forEach(placeholder => {
            text = text.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), replacements[placeholder])
        })
        
        return text
    }

    // Get available languages
    getAvailableLanguages() {
        return Object.keys(this.languages)
    }

    saveToDatabase() {
        if (global.db?.data) {
            if (!global.db.data.settings) global.db.data.settings = {}
            global.db.data.settings.userLanguages = Object.fromEntries(this.userLanguages)
            global.db.data.settings.groupLanguages = Object.fromEntries(this.groupLanguages)
            if (global.db.save) global.db.save()
        }
    }

    loadFromDatabase() {
        if (global.db && global.db.data && global.db.data.settings) {
            if (global.db.data.settings.userLanguages) {
                this.userLanguages = new Map(Object.entries(global.db.data.settings.userLanguages))
            }
            if (global.db.data.settings.groupLanguages) {
                this.groupLanguages = new Map(Object.entries(global.db.data.settings.groupLanguages))
            }
        }
    }
}

global.languageManager = new LanguageManager()

global.t = (key, userId, groupId = null, replacements = {}) => {
    return global.languageManager.getText(key, userId, groupId, replacements)
}

export default global.languageManager
