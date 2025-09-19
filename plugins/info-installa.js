import os from 'os'
import util from 'util'
import sizeFormatter from 'human-readable'
import MessageType from '@whiskeysockets/baileys'
import fs from 'fs'
const ims = './bb.jpg'
import { performance } from 'perf_hooks'
import '../lib/language.js';

let handler = async (m, { conn, usedPrefix }) => {
    const userId = m.sender;
    const groupId = m.isGroup ? m.chat : null;
    
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime) 
    let totalreg = Object.keys(global.db.data.users).length
    const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
    const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'))
    const groups = chats.filter(([id]) => id.endsWith('@g.us'))
    const used = process.memoryUsage()
    const { restrict } = global.db.data.settings[conn.user.jid] || {}
    const { autoread } = global.opts
    let old = performance.now()
    let neww = performance.now()
    let speed = (neww - old).toFixed(4)
    
    let prova = { 
        "key": {
            "participants":"0@s.whatsapp.net", 
            "remoteJid": "status@broadcast", 
            "fromMe": false, 
            "id": "Halo"
        }, 
        "message": { 
            "orderMessage": { 
                text: global.t('scaricaOrderText', userId, groupId),
                "itemCount": 2023,
                "status": 1,
                "surface" : 1,
                "message": global.t('scaricaOrderText', userId, groupId),
                "vcard": `BEGIN:VCARD\nVERSION:5.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=15395490858:+1 (539) 549-0858\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD`
            }
        }, 
        "participant": "0@s.whatsapp.net"
    }
    
    let info = global.t('scaricaText', userId, groupId)
    
    conn.reply(m.chat, info, prova, m, {
        contextInfo: { 
            externalAdReply: { 
                mediaUrl: null, 
                mediaType: 1, 
                description: null, 
                title: global.t('scaricaTitle', userId, groupId),
                body: global.t('scaricaBody', userId, groupId),         
                previewType: 0, 
                thumbnail: fs.readFileSync("./menu/Menu2.jpg"),
                sourceUrl: global.t('scaricaSource', userId, groupId)
            }
        }
    })
}

handler.help = ['infobot', 'speed']
handler.tags = ['info', 'tools']
handler.command = /^(scarica|installa|git|instalarbot|download|install)$/i

export default handler

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    console.log({ms,h,m,s})
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}