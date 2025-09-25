import axios from 'axios'
import '../lib/language.js'

const handler = async (m, { conn, text }) => {
    if (!text) {
        return conn.reply(
            m.chat,
            '*Fornisci un testo per generare un video con .veo.*',
            m
        )
    }

    try {
        const apiUrl = `https://okatsu-rolezapiiz.vercel.app/ai/txt2video?text=${encodeURIComponent(text)}`
        const response = await axios.get(apiUrl, {
            timeout: 60000,
            headers: { 'user-agent': 'Mozilla/5.0' }
        })

        const data = response.data
        console.log('[VEO] API response:', data)

        const videoUrl = data?.videoUrl || data?.result || data?.data?.videoUrl
        if (!videoUrl) {
            console.error('[VEO] Nessun videoUrl trovato nella risposta')
            return conn.reply(
                m.chat,
                '❌ Nessun video generato dall\'API.',
                m
            )
        }

        await conn.sendMessage(
            m.chat,
            {
                video: { url: videoUrl },
                mimetype: 'video/mp4',
                caption: `> GENERATO DA CHATUNITY-BOT`
            },
            { quoted: m }
        )
    } catch (error) {
        console.error('[VEO] errore durante generazione video:', error)
        await conn.reply(
            m.chat,
            '*❌ Errore durante la generazione del video. Riprova più tardi.*',
            m
        )
    }
}

handler.command = /^veo$/i

export default handler
