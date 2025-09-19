import fetch from "node-fetch";
import '../lib/language.js';

let handler = async (m, { conn, args }) => {
    const userId = m.sender;
    const groupId = m.chat;
    
    if (!args[0]) return m.reply(global.t('checkscamNoSite', userId, groupId));

    let sito = args[0].replace(/https?:\/\//, "").replace("www.", "").split("/")[0];

    try {
        let googleResponse = await fetch(`https://transparencyreport.google.com/safe-browsing/search?url=${sito}`);
        let isScam = googleResponse.status !== 200;

        let messaggio = global.t('checkscamResult', userId, groupId, {
            site: sito,
            isScam: isScam,
            scamUrl: `https://www.scamadviser.com/check-website/${sito}`
        });

        await conn.sendMessage(m.chat, { text: messaggio }, { quoted: m });

    } catch (err) {
        console.error(err);
        m.reply(global.t('checkscamError', userId, groupId));
    }
};

handler.command = ["checkscam", "checksite", "scamcheck"];
handler.category = "security";
handler.desc = "Controlla se un sito è scam o sicuro 🔍";
handler.help = ['checkscam <sito>'];
handler.tags = ['tools', 'security'];

export default handler;