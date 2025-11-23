import fetch from "node-fetch";

let handler = async (m, { conn, usedPrefix, command }) => {
    if (!m.quoted || !/image/.test(m.quoted.mimetype || "")) {
        return m.reply(`📸 *Rispondi a una foto con:* ${usedPrefix + command}`);
    }

    let apiKey = "ada70e1b-f4e4-4d3a-9cda-8306487c2156";

    try {
        let buffer = await m.quoted.download();
        let formData = new FormData();
        formData.append("image", buffer, "image.jpg");

        let res = await fetch("https://api.deepai.org/api/nsfw-detector", {
            method: "POST",
            headers: {
                "api-key": apiKey
            },
            body: formData
        });

        let json = await res.json();

        if (!json || json.status === "Error") {
            return m.reply("❌ Errore API. Possibile key errata o limite superato.");
        }

        let score = json.output.nsfw_score;
        let percent = (score * 100).toFixed(1);

        let text = `
🔞 *NSFW CHECK — DeepAI*  
👤 Richiesto da: @${m.sender.split("@")[0]}

📊 *Probabilità contenuto NSFW:*  
➡️ *${percent}%*

⚖️ *Interpretazione:*  
${score > 0.75 ? "🔥 Probabilmente porno" :
score > 0.40 ? "⚠️ Contenuto sexy / rischioso" :
"🟢 Sicuro / Non NSFW"}
        `.trim();

        await conn.reply(m.chat, text, m, { mentions: [m.sender] });

    } catch (e) {
        console.log(e);
        m.reply("❌ Errore nell'analisi dell'immagine.");
    }
};

handler.help = ['porncheck'];
handler.tags = ['tools'];
handler.command = /^(porncheck|nsfwcheck|checkporno)$/i;

export default handler;
