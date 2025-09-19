import fetch from 'node-fetch'
import '../lib/language.js'

const sources = [
    {
        name: 'Corriere della Sera',
        url: 'https://www.corriere.it/rss/homepage.xml'
    },
    {
        name: 'Repubblica',
        url: 'https://www.repubblica.it/rss/homepage/rss2.0.xml'
    },
    {
        name: 'La Stampa',
        url: 'https://www.lastampa.it/rss/homepage.xml'
    },
    {
        name: 'ANSA',
        url: 'https://www.ansa.it/sito/ansait_rss.xml'
    },
    {
        name: 'Il Sole 24 Ore',
        url: 'https://www.ilsole24ore.com/rss/notizie.xml'
    }
]

async function getNews() {
    try {
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
        console.error('Error fetching news:', error)
        return []
    }
}

const handler = async (m, { conn, usedPrefix, command }) => {
    const userId = m.sender
    const groupId = m.isGroup ? m.chat : null
    
    const waitMessage = global.t('smsWait', userId, groupId)
    await conn.reply(m.chat, waitMessage, m)
    
    try {
        const news = await getNews()
        
        if (news.length === 0) {
            const errorMessage = global.t('newsNoResults', userId, groupId)
            return conn.reply(m.chat, errorMessage, m)
        }
        
        let newsText = global.t('newsHeader', userId, groupId) + '\n\n'
        
        news.forEach((article, index) => {
            newsText += global.t('newsArticle', userId, groupId, {
                index: index + 1,
                title: article.title,
                description: article.description,
                link: article.link,
                source: article.source
            }) + '\n\n'
        })
        
        await conn.reply(m.chat, newsText, m)
        
    } catch (error) {
        console.error('News handler error:', error)
        const errorMessage = global.t('newsError', userId, groupId)
        await conn.reply(m.chat, errorMessage, m)
    }
}

handler.help = ['notiziario', 'news', 'notizie']
handler.tags = ['info']
handler.command = /^(notiziario|news|notizie)$/i

export default handler