import fetch from "node-fetch";
import { FormData } from "formdata-node";
import { File } from "formdata-node/file";

let handler = async (m, { conn, usedPrefix, command }) => {
    if (!m.quoted || !/image/.test(m.quoted.mimetype || "")) {
        return m.reply(`📸 *Rispondi a una foto con:* ${usedPrefix + command}`);
    }

    const apiKey = "ada70e1b-f4e4-4d3a-9cda-8306487c2156";

    try {
        let buffer = await m.quoted.download();

        const form = new FormData();
        form.append("image", new File([buffer], "image.jpg", { type: "image/jpeg" }));

        let res = await fetch("https://api.deepai.org/api/nsfw-detector", {
            method: "POST",
            headers: {
                "api-key": apiKey
            },
            body: form
        });

        let json = await res.json();

        if (!json || json.status === "Error") {
            return m.reply("❌ *Errore API DeepAI*. Key invalidata o limite giornaliero finito.");
        }

        let score = json.output.nsfw_score;
        let percent = (score * 100).toFixed(1);

        let result =
`🔞 *NSFW CHECK — DeepAI*
👤 Richiesto da: @${m.sender.split("@")[0]}

📊 *Probabilità contenuto NSFW:*  
➡️ *${percent}%*

⚖️ *Interpretazione:*  
${score > 0.75 ? "🔥 Porno / Contenuto adulto" :
score > 0.40 ? "⚠️ Contenuto sexy o borderline" :
"🟢 Sicuro / Non NSFW"}
`;

        await conn.reply(m.chat, result, m, { mentions: [m.sender] });

    } catch (e) {
        console.log(e);
        m.reply("❌ *Errore nell'analisi dell'immagine.*");
    }
};

handler.help = ['porncheck'];
handler.tags = ['tools'];
handler.command = /^porncheck|nsfwcheck|checkporno$/i;

export default handler;
