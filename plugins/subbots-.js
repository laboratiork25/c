import '../lib/language.js';
let handler = async (m, { conn }) => {
  if (global.conn.user.jid == conn.user.jid) {
    conn.reply(m.chat, `令 Il bot principale non può essere disattivato.`, m, rcanal);
  } else {
    await conn.reply(m.chat, `😐 Subbot disattivato.`, m, rcanal);
    conn.ws.close();
  }
};

handler.command = handler.help = ['byebot'];
handler.owner = true;
handler.private = true;
handler.register = true;

export default handler;
