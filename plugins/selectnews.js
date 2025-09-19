import fs from 'fs'
import '../lib/language.js'

// Default news sources if rss_sources.json doesn't exist
const defaultSources = {
    "tecnologia": [
        {
            "name": "TechCrunch",
            "url": "https://techcrunch.com/feed/"
        },
        {
            "name": "Wired Italia",
            "url": "https://www.wired.it/rss"
        }
    ],
    "sport": [
        {
            "name": "Gazzetta dello Sport",
            "url": "https://www.gazzetta.it/rss/homepage.xml"
        }
    ],
    "generale": [
        {
            "name": "ANSA",
            "url": "https://www.ansa.it/sito/ansait_rss.xml"
        },
        {
            "name": "Repubblica",
            "url": "https://www.repubblica.it/rss/homepage/rss2.0.xml"
        }
    ]
}

let sources
try {
    sources = JSON.parse(fs.readFileSync('rss_sources.json', 'utf8'))
} catch (error) {
    sources = defaultSources
}

async function fetchCategory(category) {
    try {
        const categoryName = category.toLowerCase()
        const categorySources = sources[categoryName] || sources['generale']
        
        if (!categorySources || categorySources.length === 0) {
            return []
        }
        
        const randomSource = categorySources[Math.floor(Math.random() * categorySources.length)]
        
        const response = await fetch(randomSource.url)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const xmlText = await response.text()
        const items = xmlText.match(/<item[^>]*>([\s\S]*?)<\/item>/gi) || []
        const news = []
        
        for (let i = 0; i < Math.min(5, items.length); i++) {
            const item = items[i]
            const title = item.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/<!\[CDATA\[|\]\]>/g, '').trim()
            const description = item.match(/<description[^>]*>([\s\S]*?)<\/description>/i)?.[1]?.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<[^>]*>/g, '').trim()
            const link = item.match(/<link[^>]*>([\s\S]*?)<\/link>/i)?.[1]?.trim()
            
            if (title) {
                news.push({
                    title,
                    description: description?.substring(0, 100) + '...' || '',
                    link: link || '',
                    source: randomSource.name,
                    category: categoryName
                })
            }
        }
        
        return news
    } catch (error) {
        console.error(`Error fetching ${category} news:`, error)
        return []
    }
}

const handler = async (m, { conn, text, usedPrefix, command }) => {
    const userId = m.sender
    const groupId = m.isGroup ? m.chat : null
    
    const availableCategories = Object.keys(sources)
    
    if (!text) {
        const helpMessage = global.t('selectNewsHelp', userId, groupId) || 
            `📰 *SELEZIONA CATEGORIA NOTIZIE*\n\nCategorie disponibili:\n${availableCategories.map(cat => `• ${cat}`).join('\n')}\n\nUso: ${usedPrefix}${command} <categoria>\nEsempio: ${usedPrefix}${command} tecnologia`
        return conn.reply(m.chat, helpMessage, m)
    }
    
    const category = text.toLowerCase()
    
    if (!availableCategories.includes(category)) {
        const invalidCategoryMessage = global.t('selectNewsInvalid', userId, groupId) || 
            `❌ Categoria non valida. Categorie disponibili:\n${availableCategories.map(cat => `• ${cat}`).join('\n')}`
        return conn.reply(m.chat, invalidCategoryMessage, m)
    }
    
    const waitMessage = global.t('smsWait', userId, groupId) || '📰 Caricando notizie...'
    await conn.reply(m.chat, waitMessage, m)
    
    try {
        const news = await fetchCategory(category)
        
        if (news.length === 0) {
            const errorMessage = global.t('smsError', userId, groupId) || 
                `❌ Nessuna notizia trovata per la categoria "${category}".`
            return conn.reply(m.chat, errorMessage, m)
        }
        
        let newsText = `📰 *NOTIZIE ${category.toUpperCase()}* 📰\n\n`
        
        news.forEach((article, index) => {
            newsText += `*${index + 1}.* ${article.title}\n`
            if (article.description) {
                newsText += `📝 ${article.description}\n`
            }
            if (article.link) {
                newsText += `🔗 ${article.link}\n`
            }
            newsText += `📰 *Fonte:* ${article.source}\n\n`
        })
        
        await conn.reply(m.chat, newsText, m)
        
    } catch (error) {
        console.error('Select news handler error:', error)
        const errorMessage = global.t('smsError', userId, groupId) || 
            '❌ Errore durante il caricamento delle notizie.'
        await conn.reply(m.chat, errorMessage, m)
    }
}

handler.help = ['selectnews', 'categoria', 'cat']
handler.tags = ['info']
handler.command = /^(selectnews|categoria|cat)$/i

export default handler
