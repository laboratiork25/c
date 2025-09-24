import MessageType from '@whiskeysockets/baileys'

let tassa = 0.02 // 2% di tassa sulle transazioni

let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] // Se in gruppo, prende l'utente menzionato
    else who = m.chat // Se in privato, usa l'utente corrente
    
    if (!who) throw '🚩 𝚍𝚎𝚟𝚒 𝚖𝚎𝚗𝚣𝚒𝚘𝚗𝚊𝚛𝚎 𝚒𝚕 destinatario @user*'
    
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) throw '🚩 𝚒𝚗𝚜𝚎𝚛𝚒𝚜𝚌𝚒 𝚕𝚊 𝚚𝚞𝚊𝚗𝚝𝚒𝚝𝚊 𝚍𝚒 💶 𝚞𝚗𝚒𝚝𝚢𝚌𝚘𝚒𝚗𝚜 𝚍𝚊 𝚝𝚛𝚊𝚜𝚏𝚎𝚛𝚒𝚛𝚎'
    if (isNaN(txt)) throw '𝚖𝚊 𝚑𝚘 𝚜𝚎𝚒 𝚏𝚛𝚘𝚌𝚒𝚘? 𝚜𝚌𝚛𝚒𝚟𝚒 𝚜𝚘𝚕𝚘 𝚗𝚞𝚖𝚎𝚛𝚒'
    
    let Unitycoins = parseInt(txt)
    let costo = Unitycoins
    let tassaImporto = Math.ceil(Unitycoins * tassa)
    costo += tassaImporto
    
    if (costo < 1) throw '🚩 𝚒𝚕 𝚖𝚒𝚗𝚒𝚖𝚘 𝚍𝚊 𝚝𝚛𝚊𝚜𝚏𝚛𝚒𝚛𝚎 𝚎 1 𝚞𝚗𝚒𝚝𝚢𝚌𝚘𝚒𝚗𝚜'
    let users = global.db.data.users
    if (costo > users[m.sender].limit) throw '𝚗𝚘𝚗 𝚑𝚊𝚒 𝚊𝚋𝚋𝚊𝚜𝚝𝚊𝚗𝚣𝚊 💶 𝚞𝚗𝚒𝚝𝚢𝚌𝚘𝚒𝚗𝚜 𝚙𝚎𝚛 𝚚𝚞𝚎𝚜𝚝𝚘 𝚝𝚛𝚊𝚜𝚏𝚎𝚛𝚒𝚖𝚎𝚗𝚝𝚘'
    
    // Esegui la transazione
    users[m.sender].limit -= costo
    users[who].limit += Unitycoins
    
    await m.reply(`*${-Unitycoins}* 💶 𝚞𝚗𝚒𝚝𝚢𝚌𝚘𝚒𝚗𝚜 
𝚝𝚊𝚜𝚜𝚊 2% : *${-tassaImporto}* 💶 𝚝𝚊𝚜𝚜𝚊 𝚒𝚖𝚙𝚘𝚛𝚝o
𝚝𝚘𝚝𝚊𝚕𝚎 𝚊𝚍𝚍𝚎𝚋𝚒𝚝𝚘: *${-costo}* 💶 𝚞𝚗𝚒𝚝𝚢𝚌𝚘𝚒𝚗𝚜`)
    
    // Notifica il destinatario
    conn.fakeReply(m.chat, `*+${Unitycoins}* 💶 𝚞𝚗𝚒𝚝𝚢𝚌𝚘𝚒𝚗𝚜 𝚛𝚒𝚌𝚎𝚟𝚞𝚝𝚎!`, who, m.text)
}

handler.help = ['daiUnitycoins *@user <quantità>*']
handler.tags = ['rpg']
handler.command = ['daiUnitycoins', 'bonifico', 'trasferisci','donauc']
handler.register = true 

export default handler