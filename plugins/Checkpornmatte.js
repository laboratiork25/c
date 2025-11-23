import fetch from "node-fetch";

let handler = async (m, { conn, usedPrefix, command }) => {
    if (!m.quoted || !/image/.test(m.quoted.mimetype || "")) {
        return m.reply(`📸 Rispondi a una foto con: ${usedPrefix + command}`);
    }

    try {
        let buffer = await m.quoted.download();

        let res = await fetch("https://classify.p.rapidapi.com/nsfw", {
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream"
            },
            body: buffer
        });

        let json = await res.json();

        if (!json || !json.nsfw) {
            return m.reply("❌ Errore nell'analisi dell'immagine.");
        }

        let riscoso = json.nsfw;
        let percentuale = (riscoso * 100).toFixed(1);

        let testo =
`🔞 NSFW DETECTOR
Probabilità contenuto NSFW: ${percentuale}%

${percentuale > 70 ? "🔥 Contenuto probabilmente porno" : "🟢 Non sembra NSFW"}`;

        conn.reply(m.chat, testo, m);

    } catch (e) {
        m.reply("❌ Errore nell'analisi dell'immagine.");
    }
};

handler.help = ['nsfwcheck', 'porncheck'];
handler.tags = ['tools'];
handler.command = /^nsfwcheck|porncheck$/i;

export default handler;
