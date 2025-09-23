import '../lib/language.js';
import fetch from 'node-fetch';

const handler = async (m, { conn, command, text, isAdmin }) => {
    // Se il comando è 'muta'
    if (command === 'muta') {
        if (!isAdmin) throw 'ⓘ Non sei un amministratore';  // Controlla permessi admin

        // Ottieni informazioni sul gruppo
        const groupMetadata = await conn.groupMetadata(m.chat);
        // Ottieni jid del creatore del gruppo
        const groupOwner = groupMetadata.owner || m.chat.split('-')[0] + '@s.whatsapp.net';

        // Impedisci di mutare il creatore
        if (m.mentionedJid?.[0] === groupOwner) throw 'ⓘ Il creatore del gruppo non può essere mutato';

        // Identifica l'utente da mutare: menzionato, risposto, o testo
        let userToMute = m.mentionedJid?.[0] || m.quoted?.sender || text;
        if (userToMute === conn.user.jid) throw 'ⓘ Non puoi mutare il bot';
        
        // Controlla se l'utente è già mutato
        let userData = global.db.data.users[userToMute];
        if (userData?.muto) throw 'ⓘ Questo utente è già stato mutato/а 🔇';

        // Messaggio di notifica con vCard e immagine
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

        if (!m.mentionedJid?.[0] && !m.quoted) 
            return conn.reply(m.chat, 'Tagga la persona da mutare 👤', m);
        
        conn.reply(m.chat, '𝐈 suoi messaggi verranno eliminati', messageOptions, null, { mentions: [userToMute] });
        global.db.data.users[userToMute].muto = true; // Attiva muting nel database
    }
    // Se il comando è 'smuta'
    else if (command === 'smuta') {
        if (!isAdmin) throw 'ⓘ Non sei un amministratore';

        let userToUnmute = m.mentionedJid?.[0] || m.quoted?.sender || text;

        if (userToUnmute === m.sender) throw 'ⓘ Chiedi ad un amministratore di smutarti';

        if (!m.mentionedJid?.[0] && !m.quoted) 
            return conn.reply(m.chat, 'Tagga la persona da smutare 👤', m);

        global.db.data.users[userToUnmute].muto = false; // Disattiva muting nel database

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
}

handler.command = /^(muta|smuta)$/i;
handler.admin = true;
handler.group = true;
handler.mods = false;

export default handler;
