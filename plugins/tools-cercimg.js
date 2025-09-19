import { googleImage } from '@bochilteam/scraper'
import { existsSync } from 'fs'
import axios from 'axios'
import '../lib/language.js'

const bannedWords = [
  'porn', 'sex', 'nude', 'naked', 'xxx', 'adult', 'nsfw',
    'porno', 'sesso', 'nudo', 'nuda', 'adulti', 'vietato'
]

const handler = async (m, { conn, text, usedPrefix, command }) => {
    const userId = m.sender
    const groupId = m.isGroup ? m.chat : null
    
    if (!text) {
        return conn.reply(m.chat, global.t('imageSearchHelp', userId, groupId, {
            prefix: usedPrefix,
            command: command
        }), m)
    }
    
    const searchTerm = text.toLowerCase()
    const hasBannedWord = bannedWords.some(word => searchTerm.includes(word))
    
    if (hasBannedWord) {
        return conn.reply(m.chat, global.t('imageSearchBanned', userId, groupId), m)
    }
    
    await conn.reply(m.chat, global.t('smsWait', userId, groupId), m)
    
    try {
        const results = await googleImage(text)
        
        if (!results || results.length === 0) {
            return conn.reply(m.chat, global.t('imageSearchNoResults', userId, groupId), m)
        }
        
        const randomImage = results[Math.floor(Math.random() * Math.min(results.length, 10))]
        
        if (!randomImage || !randomImage.url) {
            return conn.reply(m.chat, global.t('imageSearchError', userId, groupId), m)
        }
        
        const caption = global.t('imageSearchResult', userId, groupId, {
            searchTerm: text
        })
        
        await conn.sendFile(m.chat, randomImage.url, 'image.jpg', caption, m)
        
    } catch (error) {
        console.error('Image search error:', error)
        
        let errorMessage
        if (error.message?.includes('network') || error.message?.includes('timeout')) {
            errorMessage = global.t('imageSearchNetworkError', userId, groupId)
        } else {
            errorMessage = global.t('smsError', userId, groupId)
        }
        
        await conn.reply(m.chat, errorMessage, m)
    }
}

handler.help = ['cercimg', 'immagine', 'img', 'image']
handler.tags = ['tools']
handler.command = /^(cercimg|immagine|img|image|imagesearch)$/i

export default handler