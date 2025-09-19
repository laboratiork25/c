import '../lib/language.js';
let handler = async (m, { conn, usedPrefix, args }) => {
    let user = global.db.data.users[m.sender];
    let puntata = parseInt(args[0]);

    if (!puntata) {
        const text = `🪙 *COINFLIP* 🪙

Scegli quanto vuoi puntare:

💰 Puntate basse: 10€, 50€, 100€
💰 Puntate medie: 500€, 1000€, 5000€
💰 Puntate alte: 10.000€, 50.000€, 100.000€
💰 Puntate estreme: 500.000€, 1.000.000€`


        return await conn.sendMessage(m.chat, {
            text: text,
            footer: "🪙 Coinflip | 🎮 Minigames",
            buttons: [
            { buttonId: `${usedPrefix}coinflip 10`, buttonText: { displayText: "10€" }, type: 1 },
            { buttonId: `${usedPrefix}coinflip 50`, buttonText: { displayText: "50€" }, type: 1 },
            { buttonId: `${usedPrefix}coinflip 100`, buttonText: { displayText: "100€" }, type: 1 },
            { buttonId: `${usedPrefix}coinflip 500`, buttonText: { displayText: "500€" }, type: 1 },
            { buttonId: `${usedPrefix}coinflip 1000`, buttonText: { displayText: "1.000€" }, type: 1 },
            { buttonId: `${usedPrefix}coinflip 5000`, buttonText: { displayText: "5.000€" }, type: 1 },
            { buttonId: `${usedPrefix}coinflip 10000`, buttonText: { displayText: "10.000€" }, type: 1 },
            { buttonId: `${usedPrefix}coinflip 50000`, buttonText: { displayText: "50.000€" }, type: 1 },
            { buttonId: `${usedPrefix}coinflip 100000`, buttonText: { displayText: "100.000€" }, type: 1 },
            { buttonId: `${usedPrefix}coinflip 500000`, buttonText: { displayText: "500.000€" }, type: 1 },
            { buttonId: `${usedPrefix}coinflip 1000000`, buttonText: { displayText: "1.000.000€" }, type: 1 }
        ],
            headerType: 1
        }, { quoted: m })
    }

    if (isNaN(puntata) || puntata <= 0) {
        return conn.reply(m.chat, "❌ Inserisci una puntata valida!", m)
    }

    if (puntata > user.money) {
        let deficit = puntata - user.money;
        return conn.reply(m.chat, `💸 Saldo insufficiente!\n❌ Ti mancano *${deficit}€* per giocare.`, m)
    }

    let scelta = Math.random() < 0.5 ? "Testa" : "Croce";

    let risultato = Math.random() < 0.5 ? "Testa" : "Croce";
    
    let win = (scelta === risultato);

    if (win) {
        user.money += puntata
    } else {
        user.money -= puntata
    }

    let response = `🪙 *TESTA O CROCE* 💿\n\n` +
        `È uscito: *${risultato}*\n` +
        `La tua scelta: *${scelta}*\n\n` +
        (win ? `🎉 *HAI VINTO*\n💰 Guadagni: +${puntata}€` : `😢 *HAI PERSO*\n💸 Perdi: -${puntata}€`)

    await conn.sendMessage(m.chat, {
        text: response,
        footer: "🪙 Coinflip | 🎮 Minigames",
        buttons: [
            { buttonId: `.coinflip ${puntata}`, buttonText: { displayText: "🪙 Testa (" + puntata + "€)" }, type: 1 },
        { buttonId: `.coinflip ${puntata}`, buttonText: { displayText: "💿 Croce (" + puntata + "€)" }, type: 1 },
        { buttonId: `.coinflip`, buttonText: { displayText: "💵 Cambia puntata" }, type: 1 }
        ],
        headerType: 1
    }, { quoted: m })
}

handler.command = /^(coinflip)$/i
export default handler