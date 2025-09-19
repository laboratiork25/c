import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs'
import path from 'path'
import '../lib/language.js';

var handler = async (m, { conn, usedPrefix }) => {

if (global.conn.user.jid !== conn.user.jid) {
return conn.reply(m.chat, '令 *Utilizza questo comando direttamente sul numero principale del Bot*', m, rcanal, )
}
await conn.reply(m.chat, '令 *Avvio del processo di eliminazione di tutti i file di sessione, eccetto il file creds.json...*', m, rcanal, )
m.react(rwait)

let sessionPath = './varebot-sub/'

try {

if (!existsSync(sessionPath)) {
return await conn.reply(m.chat, '令 *La cartella è vuota*', m, rcanal, )
}
let files = await fs.readdir(sessionPath)
let filesDeleted = 0
for (const file of files) {
if (file !== 'creds.json') {
await fs.unlink(path.join(sessionPath, file))
filesDeleted++;
}
}
if (filesDeleted === 0) {
await conn.reply(m.chat, '令 *La cartella è vuota*',  m, rcanal, )
} else {
m.react(done)
await conn.reply(m.chat, `令 *Sono stati eliminati ${filesDeleted} file di sessione, eccetto il file creds.json*`,  m, rcanal, )
conn.reply(m.chat, `令 *Ciao! Riesci a vedermi?*`, m, rcanal, )

}
} catch (err) {
console.error('Errore durante la lettura della cartella o dei file di sessione:', err);
await conn.reply(m.chat, '令 *Si è verificato un errore*',  m, rcanal, )
}

}
handler.command = /^(delzero|delsessioni|cancellasessioni)$/i

handler.rowner = true

export default handler
