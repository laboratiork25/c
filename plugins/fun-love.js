import '../lib/language.js';
let handler = async (m, { conn, command, text }) => {
    if (!text) return m.reply(global.t('love_no_target', m.sender));
    
    let lovePercentage = Math.floor(Math.random() * 100);
    let love = global.t('love_result', m.sender, {
        target: text,
        percentage: lovePercentage
    }).trim();
    
    // Get bot name from database or use default
    let nomeDelBot = global.db.data.nomedelbot || global.t('love_default_bot_name', m.sender);
  
    await conn.sendMessage(m.chat, { 
        text: love,
        contextInfo: {
            mentionedJid: conn.parseMention(love),
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: nomeDelBot
            }
        }
    }, { quoted: m });
};
  
handler.help = ['love'];
handler.tags = ['fun'];
handler.command = /^(love|amore|affinity)$/i;
export default handler;