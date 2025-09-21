import '../lib/language.js';
let handler = async (m, { conn, args, usedPrefix, command }) => {
    // Prende il nome del bot
    let nomeDelBot = global.db.data.nomedelbot || `𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲`

    // Solo se il comando è "aperto" (ignora argomenti)
    if (command === 'aperto') {
        // Prova a cambiare le impostazioni del gruppo
        try {
            await conn.groupSettingUpdate(m.chat, 'not_announcement');
            await conn.sendMessage(m.chat, {
                text: '𝐂𝐡𝐚𝐭 𝐚𝐩𝐞𝐫𝐭𝐚 𝐩𝐞𝐫 𝐭𝐮𝐭𝐭𝐢',
                contextInfo: {
                    forwardingScore: 99,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363422724720651@newsletter',
                        serverMessageId: '',
                        newsletterName: `${nomeDelBot}`
                    }
                }
            }, { quoted: m });
        } catch (e) {
            await m.reply('❌ Non posso modificare le impostazioni: assicurati che io sia admin!');
        }
    }
}
handler.help = ['aperto'];
handler.tags = ['group'];
handler.command = /^aperto$/i;
handler.admin = true;
handler.botAdmin = true;

export default handler