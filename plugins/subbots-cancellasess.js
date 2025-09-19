
import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync, promises as fs} from "fs"
import path, { join } from 'path'
import '../lib/language.js';

let handler  = async (m, { conn: parentw, usedPrefix, command}, args) => {

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let uniqid = `${who.split`@`[0]}`
let userS = `${conn.getName(who)}`

try {
await fs.rmdir(".//" + uniqid, { recursive: true, force: true })
await parentw.sendMessage(m.chat, { text: '令 varesub-Bot eliminato.' }, { quoted: fkontak })
} catch(err) {
if (err.code === 'ENOENT' && err.path === `./varebot-sub/${uniqid}`) {
await parentw.sendMessage(m.chat, { text: "🌠 nessuna sessione di varebotsub incontrata." }, { quoted: fkontak })
} else {
await m.react(error)
}}}
handler.command = /^(deletesess?ion|eliminarsesion|borrarsesion|delsess?ion|cerrarsesion|delserbot|logout)$/i
handler.fail = null

export default handler
