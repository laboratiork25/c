import yts from 'yt-search'
import fs from 'fs'
import '../lib/language.js'

const handler = async (m, { conn, text, usedPrefix, command }) => {
    const userId = m.sender
    const groupId = m.isGroup ? m.chat : null
    
    if (!text) {
        const helpMessage = global.t('ytSearchHelp', userId, groupId) || 
            `🔍 *RICERCA YOUTUBE*\n\nUso: ${usedPrefix}${command} <termine di ricerca>\n\nEsempio: ${usedPrefix}${command} musica rilassante`
        return conn.reply(m.chat, helpMessage, m)
    }
    
    const waitMessage = global.t('smsWait', userId, groupId) || '🔍 Cercando su YouTube...'
    await conn.reply(m.chat, waitMessage, m)
    
    try {
        const results = await yts(text)
        
        if (!results || !results.videos || results.videos.length === 0) {
            const noResultsMessage = global.t('ytSearchNoResults', userId, groupId) || 
                '❌ Nessun video trovato per la ricerca specificata.'
            return conn.reply(m.chat, noResultsMessage, m)
        }
        
        // Get top 5 results
        const videos = results.videos.slice(0, 5)
        
        let resultText = `🔍 *RISULTATI YOUTUBE*\n\n📝 *Ricerca:* ${text}\n\n`
        
        videos.forEach((video, index) => {
            const duration = video.duration || 'N/A'
            const views = video.views ? video.views.toLocaleString() : 'N/A'
            const uploadDate = video.ago || 'N/A'
            
            resultText += `*${index + 1}.* ${video.title}\n`
            resultText += `👤 *Canale:* ${video.author?.name || 'Sconosciuto'}\n`
            resultText += `⏱️ *Durata:* ${duration}\n`
            resultText += `👁️ *Visualizzazioni:* ${views}\n`
            resultText += `📅 *Caricato:* ${uploadDate}\n`
            resultText += `🔗 *Link:* ${video.url}\n\n`
        })
        
        resultText += `📊 *Trovati ${results.videos.length} video totali*`
        
        await conn.reply(m.chat, resultText, m)
        
    } catch (error) {
        console.error('YouTube search error:', error)
        
        let errorMessage
        if (error.message?.includes('network') || error.message?.includes('timeout')) {
            errorMessage = global.t('ytSearchNetworkError', userId, groupId) || 
                '❌ Errore di rete. Riprova più tardi.'
        } else {
            errorMessage = global.t('smsError', userId, groupId) || 
                '❌ Si è verificato un errore durante la ricerca.'
        }
        
        await conn.reply(m.chat, errorMessage, m)
    }
}

handler.help = ['ytsearch', 'youtube', 'yt']
handler.tags = ['tools']
handler.command = /^(ytsearch|youtube|yt)$/i

export default handler
