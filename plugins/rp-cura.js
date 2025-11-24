import { join } from 'path'
import { promises as fs } from 'fs'

let _sharp
async function getSharp() {
    if (_sharp) return _sharp
    try {
        const mod = await import('sharp')
        _sharp = mod.default || mod
        return _sharp
    } catch (e) {
        console.warn('sharp not available for rpg-cura_heal:', e && e.message ? e.message : e)
        return null
    }
}

function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}

let handler = async (m, { conn, args, usedPrefix, __dirname, isReply }) => {
    const sharp = await getSharp()
    if (!sharp) return m.reply('⚠️ *Funzione non disponibile!*\n\n📌 Il modulo nativo "sharp" non è stato trovato sul sistema.\nContatta l\'amministratore del bot.')
    const nomeUtente = conn.getName ? conn.getName(m.sender) : m.sender;
    const fkontak = {
        key: {
            participants: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            fromMe: false,
            id: "Ciao"
        },
        message: {
            contactMessage: {
                displayName: nomeUtente,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${nomeUtente};;;\nFN:${nomeUtente}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Cellulare\nEND:VCARD`
            }
        },
        participant: "0@s.whatsapp.net"
    }



    let user = global.db.data.users[m.sender]
    if (user.health >= 100) return conn.reply(m.chat, `❤️ *Salute già al massimo!*\n\n✨ La tua salute è già piena! Non hai bisogno di curarti al momento.`, fkontak, m)

    let pozioneScelta = args[0]?.toLowerCase()
    let tipoPozione = {
        minore: { cura: 20, key: 'pozioneminore', nome: 'Minore', img: 'pozioneminore.png', emoji: '🥤' },
        maggiore: { cura: 50, key: 'pozionemaggiore', nome: 'Maggiore', img: 'pozionemaggiore.png', emoji: '🍷' },
        definitiva: { cura: 100, key: 'pozionedefinitiva', nome: 'Definitiva', img: 'pozionedefinitiva.png', emoji: '🧪' }
    }

    // Se manca la scelta o è errata, mostra i bottoni
    if (!pozioneScelta || !tipoPozione[pozioneScelta]) {
        let buttons = [
            { buttonId: `${usedPrefix}cura minore`, buttonText: { displayText: '🥤 Minore (+20)' }, type: 1 },
            { buttonId: `${usedPrefix}cura maggiore`, buttonText: { displayText: '🍷 Maggiore (+50)' }, type: 1 },
            { buttonId: `${usedPrefix}cura definitiva`, buttonText: { displayText: '🧪 Definitiva (+100)' }, type: 1 },
        ];
        let buttonMessage = {
            text: `💊 *SCEGLI LA POZIONE PER CURARTI*\n\n┊ 🥤 *Minore* → Ripristina 20 HP\n┊ 🍷 *Maggiore* → Ripristina 50 HP\n┊ 🧪 *Definitiva* → Ripristina 100 HP\n╰─────────────────\n\n✨ Seleziona una pozione per recuperare la tua salute!`,
            footer: '⚕️ ChatUnity RPG - Sistema di Cura',
            buttons: buttons,
            headerType: 1
        };
        return await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
    }

    let pozione = tipoPozione[pozioneScelta]
    if (user[pozione.key] < 1) {
        return conn.reply(m.chat, `❌ *Pozione non disponibile!*\n\n📌 Non hai pozioni ${pozione.nome} nel tuo inventario.\n\n💡 *Suggerimento:* Puoi acquistare pozioni nel negozio con il comando *!shop*`, m)
    }

    user[pozione.key] -= 1
    user.health = Math.min(100, user.health + pozione.cura)

    // Carica la thumbnail della pozione
    let thumbPath = join(__dirname, '../src/img/shop', pozione.img)
    let thumb = undefined
    try {
        thumb = await fs.readFile(thumbPath)
    } catch (e) {
        thumb = null
    }

    // Messaggio posizione con thumbnail pozione e link canale
    await conn.sendMessage(m.chat, {
        text: `✅ *Pozione usata con successo!*\n\n${pozione.emoji} *Tipo:* Pozione ${pozione.nome}\n❤️ *Salute attuale:* ${user.health}/100\n✨ *Cura ricevuta:* +${pozione.cura} HP\n\n╰─────────────────\n💊 Ti senti molto meglio ora!`,

        contextInfo: {
            externalAdReply: {
                title: `🧪 Pozione ${pozione.nome} usata con successo!`,
                body: `Salute ripristinata: ${user.health}/100 HP`,
                mediaType: 1,
                thumbnail: thumb || null,
                sourceUrl: '',
                 forwardedNewsletterMessageInfo: {
             newsletterJid: "120363391446013555@newsletter",
                serverMessageId: '',
                newsletterName: 'ChatUnity RPG',
            }
            }
        }
    }, { quoted: fkontak })
}

handler.help = ['cura <minore/maggiore/definitiva>']
handler.tags = ['rpg']
handler.command = /^(cura|heal|pozione)$/i
export default handler