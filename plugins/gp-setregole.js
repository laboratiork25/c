import '../lib/language.js';
let handler = async function (m, { conn, text, usedPrefix }) {
  let chat = global.db.data.chats[m.chat];
  if (text) {
    chat.rules = text;
    await conn.sendMessage(m.chat, { 
        text: `ⓘ 𝐑𝐞𝐠𝐨𝐥𝐞 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐩𝐨 𝐬𝐞𝐭𝐭𝐚𝐭𝐞 𝐜𝐨𝐧 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐨`,
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363422724720651@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });
  } else throw `ⓘ 𝐍𝐞𝐬𝐬𝐮𝐧𝐚 𝐫𝐞𝐠𝐨𝐥𝐚 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐩𝐨 𝐬𝐞𝐭𝐭𝐚𝐭𝐚`;
};

handler.help = ['setrules <text>'];
handler.tags = ['group'];
handler.command = ['setrules', 'setregole'];
handler.group = true;
handler.admin = true;

export default handler;