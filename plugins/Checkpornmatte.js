import fetch from "node-fetch";

let handler = async (m, { conn, usedPrefix, command }) => {
    if (!m.quoted || !/image/.test(m.quoted.mimetype || "")) {
        return m.reply(`📸 Rispondi a una foto con: ${usedPrefix + command}`);
    }

    try {
        let buffer = await m.quoted.download();

        let res = await fetch(
            "https://api-inference.huggingface.co/models/Falconsai/nsfw_image_detection",
            {
                method: "POST",
                headers: { "Content-Type": "application/octet-stream" },
                body: buffer
            }
        );

        let json = await res.json();

        if (!json || !json[0]) {
            return m.reply("❌ Errore nell'analisi dell'immagine.");
        }

        let result = json[0];
        let labels = result.map(v => `${v.label}: ${(v.score * 100).toFixed(1)}%`).join("\n");
        let top = result.reduce((a, b) => (a.score > b.score ? a : b));

        let final =
`🔞 NSFW Detector
📊 Risultati:
${labels}

⚖️ Valutazione:
${top.label === "NSFW" ? "🔥 Contenuto porno" : "🟢 Non NSFW"}`;

        conn.reply(m.chat, final, m);

    } catch (e) {
        return m.reply("❌ Errore nell'analisi dell'immagine.");
    }
};

handler.help = ['porncheck'];
handler.tags = ['tools'];
handler.command = /^porncheck|nsfwcheck|checkporno$/i;

export default handler;
