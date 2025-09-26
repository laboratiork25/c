import '../lib/language.js';
import fetch from 'node-fetch';

// Handler comandi muta/smuta
const handler = async (m, { conn, command, text, isAdmin }) => {
    if (command === 'muta') {
        if (!isAdmin) throw 'ⓘ Non sei un amministratore';

        const groupMetadata = await conn.groupMetadata(m.chat);
        const groupOwner = groupMetadata.owner || m.chat.split('-')[0] + '@s.whatsapp.net';

        let userToMute = m.mentionedJid?.[0] || m.quoted?.sender || text;
        if (!userToMute) return conn.reply(m.chat, 'Tagga la persona da mutare 👤', m);
        if (userToMute === groupOwner) throw 'ⓘ Il creatore del gruppo non può essere mutato';
        if (userToMute === conn.user.jid) throw 'ⓘ Non puoi mutare il bot';

        let userData = global.db.data.users[userToMute] || {};
        if (userData.muto) throw 'ⓘ Questo utente è già stato mutato/a 🔇';

        // Imposta lo stato muto
        global.db.data.users[userToMute] = { ...userData, muto: true };

        let messageOptions = {
            key: { participants: '0@s.whatsapp.net', fromMe: false, id: '0' },
            message: {
                locationMessage: {
                    name: 'Utente mutato/a',
                    jpegThumbnail: await (await fetch('https://telegra.ph/file/f8324d9798fa2ed2317bc.png')).buffer(),
                    vcard: 'BEGIN:VCARD\nVERSION:5.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD'
                }
            },
            participant: '0@s.whatsapp.net'
        };

        conn.reply(m.chat, '𝐈 suoi messaggi verranno eliminati', messageOptions, null, { mentions: [userToMute] });
    }

    else if (command === 'smuta') {
        if (!isAdmin) throw 'ⓘ Non sei un amministratore';

        let userToUnmute = m.mentionedJid?.[0] || m.quoted?.sender || text;
        if (!userToUnmute) return conn.reply(m.chat, 'Tagga la persona da smutare 👤', m);
        if (userToUnmute === m.sender) throw 'ⓘ Chiedi ad un amministratore di smutarti';

        let userData = global.db.data.users[userToUnmute] || {};
        global.db.data.users[userToUnmute] = { ...userData, muto: false };

        let messageOptions = {
            key: { participants: '0@s.whatsapp.net', fromMe: false, id: '0' },
            message: {
                locationMessage: {
                    name: 'Utente smutato/a',
                    jpegThumbnail: await (await fetch('https://telegra.ph/file/aea704d0b242b8c41bf15.png')).buffer(),
                    vcard: 'BEGIN:VCARD\nVERSION:5.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD'
                }
            },
            participant: '0@s.whatsapp.net'
        };

        conn.reply(m.chat, '𝐈 suoi messaggi non verranno eliminati', messageOptions, null, { mentions: [userToUnmute] });
    }
};

handler.command = /^(muta|smuta)$/i;
handler.admin = true;
handler.group = true;
handler.mods = false;
export default handler;

// Controllo ed eliminazione messaggi mutati
// Questa logica va inserita nel listener dei messaggi del bot
async function onMessage(m, conn) {
    // Solo in gruppi, ignora messaggi di sistema
    if (!m.isGroup || !m.sender || !m.chat) return;

    let userData = global.db.data.users[m.sender] || {};
    // Controlla in real time lo stato "muto"
    if (userData.muto === true) {
        try {
            await conn.deleteMessage(m.chat, m.key);
        } catch (e) {
            // Gestisci eventuali errori di permessi o altro
        }
    }
}

// Esempio: collegamento listener in framework bot
// conn.on('chat-update', m => onMessage(m, conn));
