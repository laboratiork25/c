/// ౨ৎ ˖ ࣪⊹ 𝐂𝐫𝐞𝐚𝐝𝐨 𝐩𝐨𝐫 @Alba070503 𐙚˚.ᡣ𐭩

//❀ Canal Principal ≽^•˕• ྀི≼
///https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04

import axios from 'axios'
import '../lib/language.js'

const handler = async (m, { conn, text }) => {
const userId = m.sender;
const groupId = m.isGroup ? m.chat : null;
if (!text) return conn.reply(m.chat, global.t('deepseekNoText', userId, groupId) || '*Ingresa un texto para hablar con DeepSeek AI.*', m)
  
try {
let { data } = await axios.get(`https://archive-ui.tanakadomp.biz.id/ai/deepseek?text=${encodeURIComponent(text)}`)
await m.reply(data?.result || global.t('deepseekNoResponse', userId, groupId) || '❌ No se obtuvo una respuesta válida de DeepSeek AI.')
} catch {
await m.reply(global.t('deepseekError', userId, groupId) || '*❌ Error al procesar la solicitud.*')
}}

handler.command = /^(deepseek|ia3)$/i
export default handler