import fetch from 'node-fetch'
import '../lib/language.js'

const sourcesBySport = {
    'calcio': [
        {
            'name': 'Gazzetta dello Sport',
            'url': 'https://www.gazzetta.it/rss/Calcio.xml'
        },
        {
            'name': 'Corriere dello Sport',
            'url': 'https://www.corrieredellosport.it/rss'
        }
    ],
    'basket': [
        {
            'name': 'Gazzetta Basket',
            'url': 'https://www.gazzetta.it/rss/Basket.xml'
        }
    ],
    'tennis': [
        {
            'name': 'Gazzetta Tennis',
            'url': 'https://www.gazzetta.it/rss/Tennis.xml'
        }
    ]
}

async function getSportsNews(sport = 'calcio') {
    try {
        const sources = sourcesBySport[sport.toLowerCase()] || sourcesBySport['calcio']
        const randomSource = sources[Math.floor(Math.random() * sources.length)]
        
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
                    source: randomSource.name
                })
            }
        }
        
        return news
    } catch (error) {
        console.error('Error fetching sports news:', error)
        return []
    }
}

const handler = async (m, { conn, text, usedPrefix, command }) => {
    const userId = m.sender
    const groupId = m.isGroup ? m.chat : null
    
    const sport = text?.toLowerCase() || 'calcio'
    const availableSports = Object.keys(sourcesBySport)
    
    if (text && !availableSports.includes(sport)) {
        const helpMessage = global.t('sportsNewsHelp', userId, groupId) || 
            `⚽ *NOTIZIE SPORTIVE*\n\nSport disponibili: ${availableSports.join(', ')}\n\nUso: ${usedPrefix}${command} <sport>\nEsempio: ${usedPrefix}${command} calcio`
        return conn.reply(m.chat, helpMessage, m)
    }
    
    const waitMessage = global.t('smsWait', userId, groupId) || '⏳ Caricando notizie sportive...'
    await conn.reply(m.chat, waitMessage, m)
    
    try {
        const news = await getSportsNews(sport)
        
        if (news.length === 0) {
            const errorMessage = global.t('smsError', userId, groupId) || 
                '❌ Nessuna notizia sportiva trovata al momento.'
            return conn.reply(m.chat, errorMessage, m)
        }
        
        let newsText = `⚽ *NOTIZIE ${sport.toUpperCase()}* ⚽\n\n`
        
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
        console.error('Sports news handler error:', error)
        const errorMessage = global.t('smsError', userId, groupId) || 
            '❌ Errore durante il caricamento delle notizie sportive.'
        await conn.reply(m.chat, errorMessage, m)
    }
}

handler.help = ['sport', 'calcio', 'basket', 'tennis']
handler.tags = ['info']
handler.command = /^(sport|calcio|basket|tennis)$/i

export default handler
