import { join } from 'path' 
import { promises } from 'fs'

function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}

let handler = async (m, { conn, args, usedPrefix, __dirname }) => {


    const fkontak = {
        "key": {
            "participants": "0@s.whatsapp.net",
            "remoteJid": "status@broadcast",
            "fromMe": false,
            "id": "Ciao"
        },
        "message": {
            "contactMessage": {
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Cellulare\nEND:VCARD`
            }
        },
        "participant": "0@s.whatsapp.net"
    }

    let user = global.db.data.users[m.sender]
    if (user.health <= 0) return conn.reply(m.chat, `La tua salute è già a zero 💔`, fkontak, m)

    let dannoScelto = args[0]?.toLowerCase()
    let tipoDanno = {
        piccolo: { danno: 20, key: 'danno_piccolo' },
        medio: { danno: 50, key: 'danno_medio' },
        grande: { danno: 100, key: 'danno_grande' }
    }

    if (!dannoScelto || !tipoDanno[dannoScelto]) {
        return conn.reply(m.chat, `Specifica il tipo di danno: piccolo, medio o grande.

Danni disponibili:
🔹 Piccolo (-20 salute)
🔸 Medio (-50 salute)
🔺 Grande (-100 salute)`, fkontak, m)
    }

    let danno = tipoDanno[dannoScelto]
    user.health = Math.max(0, user.health - danno.danno)

    // Ottieni la foto profilo dell'utente per la posizione quotata
    let userProfilePic = null
    try {
        userProfilePic = await conn.profilePictureUrl(m.sender, 'image')
    } catch (e) {
        userProfilePic = 'https://i.ibb.co/spvt8r4m/lalalalal.jpg'
    }
    let userProfileBuffer = null
    try {
        userProfileBuffer = await (await import('node-fetch')).default(userProfilePic).then(res => res.buffer())
    } catch (e) {
        userProfileBuffer = null
    }

    // Messaggio quotato di posizione con thumbnail profilo utente
    const quotedPosition = {
        key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Danno" },
        message: {
            locationMessage: {
                name: `💔 Danno a ${conn.getName ? conn.getName(m.sender) : m.sender}`,
                jpegThumbnail: userProfileBuffer || null
            }
        },
        participant: "0@s.whatsapp.net"
    }

    await conn.sendMessage(m.chat, {
        text: `Hai subito un danno ${dannoScelto}!\n💔 Salute: ${user.health}`
    }, { quoted: quotedPosition })
}

handler.help = ['perdi <piccolo/medio/grande>']
handler.tags = ['rpg']
handler.command = /^(perdi-vita)$/i
export default handler