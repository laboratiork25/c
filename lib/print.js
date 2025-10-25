import PhoneNumber from 'awesome-phonenumber';
import chalk from 'chalk';
import { watchFile } from 'fs';
import { fileURLToPath } from 'url';

const terminalImage = global.opts?.img ? require('terminal-image') : '';
const urlRegex = (await import('url-regex-safe')).default({ strict: false });

function formatUserJid(jid, name) {
    if (!jid) return 'Sconosciuto';
    const cleanJid = jid.split(':')[0];
    try {
        const number = PhoneNumber('+' + cleanJid.replace('@s.whatsapp.net', '')).getNumber('international');
        return number + (name ? ` ~${name}` : '');
    } catch {
        return (cleanJid.replace('@s.whatsapp.net', '') || '') + (name ? ` ~${name}` : '');
    }
}

function calculateFileSize(m) {
    if (!m.msg) return m.text ? m.text.length : 0;
    return m.msg.fileLength?.low || m.msg.fileLength || m.msg.vcard?.length || m.text?.length || 0;
}

function formatSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function formatDuration(seconds) {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

async function formatMessageContent(m, conn) {
    let log = m.text || m.caption || '';
    if (!log) return '';

    log = log.replace(/\u200e+/g, '');

    const mdRegex = /(?<=(?:^|[\s\n])\S?)(?:([*_~])(.+?)\1|``````)(?=\S?(?:[\s\n]|$))/g;
    const mdFormat = (depth = 4) => (_, type, text, monospace) => {
        const types = { '_': 'italic', '*': 'bold', '~': 'strikethrough' };
        text = text || monospace;
        return !types[type] || depth < 1 ? text : chalk[types[type]](text.replace(mdRegex, mdFormat(depth - 1)));
    };
    log = log.replace(mdRegex, mdFormat(4));

    if (log.length < 4096) {
        log = log.replace(urlRegex, (url) => chalk.blueBright(url));
    }

    if (m.mentionedJid) {
        for (const user of m.mentionedJid) {
            const decodedJid = conn.decodeJid(user);
            const name = await conn.getName(decodedJid);
            const number = decodedJid.split('@')[0].split(':')[0];
            log = log.replace('@' + number, chalk.yellow('@' + (name || number)));
        }
    }

    if (m.error) return chalk.red(log);
    if (m.isCommand) return chalk.yellow(log);
    return log;
}

export default async function (m, conn = { user: {} }) {
    if (!m) return;
    
    const senderJid = conn.decodeJid(m.sender);
    const chatJid = conn.decodeJid(m.chat);

    let _name = await conn.getName(senderJid);
    let sender = formatUserJid(senderJid, _name);
    let chatName = await conn.getName(chatJid);

    let me = formatUserJid(conn.user?.jid, conn.user?.name);
    let user = global.db.data.users[senderJid] || {};

    let oraAttuale = new Date();
    let oraItaliana = oraAttuale.toLocaleTimeString('it-IT');

    const filesize = calculateFileSize(m);
    const formattedSize = formatSize(filesize);
    const mtype = m.mtype ? m.mtype.replace(/message$/i, '').replace('audio', m.msg?.ptt ? 'PTT' : 'Audio').replace(/^./, v => v.toUpperCase()) : 'Unknown';
    
    const logLines = [
        `╭───────────────────···`,
        `│ 🟢 ${chalk.black(chalk.bgGreenBright(me))}`,
        `│ ⏰ ${chalk.cyanBright(oraItaliana)}`,
        `│ 🗣  ${chalk.white(sender)}`,
        `│ 💬 ${chalk.yellow(m.isGroup ? 'Gruppo: ' + chatName : 'Chat: ' + chatName)}`,
        `│ 📑 ${chalk.cyanBright(m.messageStubType ? m.messageStubType : mtype)}`,
        `│ 📊 ${chalk.cyanBright(formattedSize)}`
    ];

    if (user.exp !== undefined) {
        logLines.push(`│ ⭐ ${chalk.magenta('Exp:')} ${chalk.magentaBright(user.exp)} | ${chalk.green('Limit:')} ${chalk.greenBright(user.limit)}`);
    }

    if (m.quoted) {
        const quotedSenderJid = conn.decodeJid(m.quoted.sender);
        const qname = await conn.getName(quotedSenderJid);
        const qtype = m.quoted.mtype ? m.quoted.mtype.replace(/Message/gi, '') : 'Unknown';
        logLines.push(`│ ↪️ ${chalk.gray('Risposta a:')} ${chalk.gray(qname)} (${chalk.gray(qtype)})`);
    }

    logLines.push(`╰───────────────────···`);

    console.log(logLines.join('\n'));

    try {
        if (global.opts['img'] && /sticker|image|video/gi.test(m.mtype)) {
            const img = await terminalImage.buffer(await m.download());
            console.log(img.trimEnd());
        }
    } catch (e) {
        console.error(chalk.red('[PRINT] Errore download immagine:'), e);
    }
    
    const formattedText = await formatMessageContent(m, conn);
    if (formattedText) {
        console.log(formattedText);
    }

    if (/document/i.test(m.mtype)) {
        console.log(`🗂️  ${m.msg.fileName || 'Documento'}`);
    } else if (/contact/i.test(m.mtype)) {
        console.log(`👨  ${m.msg.displayName || 'Contatto'}`);
    } else if (/audio/i.test(m.mtype)) {
        const duration = formatDuration(m.msg.seconds);
        console.log(`${m.msg.ptt ? '🎤 (PTT)' : '🎵 (Audio)'} - ${duration}`);
    } else if (/video/i.test(m.mtype)) {
        const duration = formatDuration(m.msg.seconds);
        console.log(`🎥 (Video)${m.msg.gifPlayback ? ' (GIF)' : ''} - ${duration}`);
    }

    console.log();
}

let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
    console.log(chalk.redBright(`[SYSTEM] Aggiornato 'lib/print.js'`));
});

if (!global.messageListenerAttached) {
    const conn = global.conn;
    if (conn && conn.ev) {
        conn.ev.on('messages.update', (updates) => {
            for (const { key, update } of updates) {
                if (update.message?.editedMessage) {
                     console.log(
                        chalk.yellow.bold('✏️ Messaggio Modificato'),
                        chalk.gray(`(in ${key.remoteJid})`)
                    );
                }
                if (update.message === null) {
                    console.log(
                        chalk.red.bold('🗑️ Messaggio Eliminato'),
                        chalk.gray(`(ID: ${key.id})`)
                    );
                }
            }
        });
        global.messageListenerAttached = true;
        console.log(chalk.green('[SYSTEM] Listener per modifiche/eliminazioni messaggi attivato.'));
    }
}
