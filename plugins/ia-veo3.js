import axios from 'axios'
import '../lib/language.js'

const handler = async (m, { conn, text }) => {
    const userId = m.sender
    const groupId = m.isGroup ? m.chat : null

    if (!text) {
        return conn.reply(
            m.chat,
            global.t('veoNoText', userId, groupId) || '*Fornisci un testo per generare un video con .veo.*',
            m
        )
    }

    try {
        const apiUrl = `https://okatsu-rolezapiiz.vercel.app/ai/txt2video?text=${encodeURIComponent(text)}`
        const { data } = await axios.get(apiUrl, {
            timeout: 60000,
            headers: { 'user-agent': 'Mozilla/5.0' }
        })

        const videoUrl = data?.videoUrl || data?.result || data?.data?.videoUrl
        if (!videoUrl) {
            return conn.reply(
                m.chat,
                global.t('veoNoVideoUrl', userId, groupId) || '❌ Nessun video generato dall\'API.',
                m
            )
        }

        await conn.sendMessage(
            m.chat,
            {
                video: { url: videoUrl },
                mimetype: 'video/mp4',
                caption: `Prompt: ${text}`
            },
            { quoted: m }
        )
    } catch (error) {
        console.error('[VEO] errore:', error?.message || error)
        await conn.reply(
            m.chat,
            global.t('veoError', userId, groupId) || '*❌ Errore durante la generazione del video.*',
            m
        )
    }
}

handler.command = /^veo$/i

export default handler
