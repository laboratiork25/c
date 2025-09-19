import ws from 'ws'
import '../lib/language.js';

let handler = async (m, { conn }) => {
   let uniqueUsers = new Map()

   if (!global.conns || !Array.isArray(global.conns)) {
     global.conns = []
   }

   global.conns.forEach((conn) => {
     if (conn.user && conn.ws?.socket?.readyState !== ws.CLOSED) {
       uniqueUsers.set(conn.user.jid, conn)
     }
   })

   let totalUsers = uniqueUsers.size
   let txt = '*`🍭 Subbots attivo:`*' + ` » *${totalUsers || 0}*`

   await conn.reply(m.chat, txt, m, rcanal)
}

handler.command = ['bots']
export default handler