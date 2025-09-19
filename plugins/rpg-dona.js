import MessageType from '@whiskeysockets/baileys'
import '../lib/language.js';

let tassa = 0.02 // 2% di tassa sulle transazioni

let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] // Se in gruppo, prende l'utente menzionato
    else who = m.chat // Se in privato, usa l'utente corrente
    
    if (!who) throw global.t('mention_required', m.sender)
    
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) throw global.t('amount_required', m.sender)
    if (isNaN(txt)) throw global.t('only_numbers', m.sender)
    
    let Unitycoins = parseInt(txt)
    let costo = Unitycoins
    let tassaImporto = Math.ceil(Unitycoins * tassa)
    costo += tassaImporto
    
    if (costo < 1) throw global.t('min_transfer', m.sender)
    let users = global.db.data.users
    if (costo > users[m.sender].limit) throw global.t('insufficient_funds', m.sender)
    
    // Esegui la transazione
    users[m.sender].limit -= costo
    users[who].limit += Unitycoins
    
    await m.reply(global.t('transfer_success_sender', m.sender, null, {
        amount: -Unitycoins,
        tax: -tassaImporto,
        total: -costo
    }))
    
    // Notifica il destinatario
    conn.fakeReply(m.chat, global.t('transfer_success_receiver', who, null, {
        amount: Unitycoins
    }), who, m.text)
}

handler.help = ['daiUnitycoins *@user <quantità>*']
handler.tags = ['rpg']
handler.command = /^(donauc|bonifico|trasferisci|dona|transfer|senduc|pay)$/i
handler.register = true 

export default handler