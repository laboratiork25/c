import fetch from "node-fetch";

let handler = async (m, { conn, usedPrefix, command }) => {
    if (!m.quoted || !/image/.test(m.quoted.mimetype || "")) {
        return m.reply(`📸 Rispondi a una foto con: ${usedPrefix + command}`);
    }

    try {
        let buffer = await m.quoted.download();

        let res = await fetch("https://nsfw-api-py.onrender.com/classify", {
            method: "POST",
            headers: { "Content-Type": "application/octet-stream" },
            body: buffer
        });

        let json = await res.json();

        if (!json || !json.score) {
            return m.reply("❌ Errore nell'analisi dell'immagine.");
        }

        let score = json.score;
        let percent = (score * 100).toFixed(1);

        let txt =
`🔞 *NSFW Detector*
Probabilità NSFW: *${percent}%*

${percent > 70 ? "🔥 Contenuto probabilmente pornografico" : "🟢 Contenuto sicuro"}`;

        conn.reply(m.chat, txt, m);

    } catch (e) {
        m.reply("❌ Errore nell'analisi dell'immagine.");
    }
};

handler.help = ['nsfwcheck', 'porncheck'];
handler.tags = ['tools'];
handler.command = /^nsfwcheck|porncheck$/i;

export default handler;
