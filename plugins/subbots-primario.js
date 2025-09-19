import ws from 'ws';
import '../lib/language.js';

let handler = async (m, { conn, usedPrefix, args }) => {
if (!args[0] && !m.quoted) return m.reply(`⚠️ Menziona il numero di un bot o rispondi al messaggio di un bot.\n> Esempio: *${usedPrefix}setprimary @0*`);

const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];

let botJid;
let selectedBot;

if (m.mentionedJid && m.mentionedJid.length > 0) {
botJid = m.mentionedJid[0];
} else if (m.quoted) {
botJid = m.quoted.sender;
} else {
botJid = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
} if (botJid === conn.user.jid || botJid === global.conn.user.jid) {
selectedBot = conn;
} else {
selectedBot = users.find(conn => conn.user.jid === botJid);
}

if (!selectedBot) {
return conn.reply(m.chat, `⚠️ @${botJid.split`@`[0]} non è un bot della stessa sessione, verifica i bot connessi usando *#bots*.`, m, { mentions: [botJid] });
}

let chat = global.db.data.chats[m.chat];
if (chat.primaryBot === botJid) {
return conn.reply(m.chat, `⚠️ @${botJid.split`@`[0]} è già il bot primario.`, m, { mentions: [botJid] });
}

chat.primaryBot = botJid;
conn.sendMessage(m.chat, { text: `✅ Il bot @${botJid.split('@')[0]} è stato impostato come primario in questo gruppo. Gli altri bot non risponderanno qui.`, mentions: [botJid]}, { quoted: m });
};

handler.command = ['setprimary'];
handler.group = true;
handler.admin = true;

export default handler;