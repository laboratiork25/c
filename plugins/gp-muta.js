import fetch from 'node-fetch'
import fs from 'fs'

/**
 * Handler per i comandi muta/smuta
 */
const handler = async (m, { conn, command, text, isAdmin }) => {
  if (command === 'muta') {
    if (!isAdmin) throw '👑 Solo un amministratore può eseguire questo comando'

    const groupMetadata = await conn.groupMetadata(m.chat)
    const owner = groupMetadata.owner || m.chat.split`-`[0] + '@s.whatsapp.net'

    let target = m.mentionedJid?.[0]
      || m.quoted?.sender
      || text

    if (!target) {
      return conn.reply(m.chat, 'Tagga la persona da mutare 👤', m)
    }

    if (target === owner) throw 'ⓘ Il creatore del gruppo non può essere mutato'
    if (target === conn.user.jid) throw 'ⓘ Non puoi mutare il bot'

    // Inizializza la struttura dati se non esiste
    if (!global.db.data) global.db.data = {}
    if (!global.db.data.users) global.db.data.users = {}
    if (!global.db.data.users[target]) global.db.data.users[target] = {}

    if (global.db.data.users[target].muto === true) {
      throw '🔇 Questo utente è già stato mutato'
    }

    const fakeMsg = {
      key: {
        participants: '0@s.whatsapp.net',
        fromMe: false,
        id: 'Halo'
      },
      message: {
        locationMessage: {
          name: '𝐔𝐭𝐞𝐧𝐭𝐞 mutato/a',
          jpegThumbnail: await (await fetch('https://telegra.ph/file/f8324d9798fa2ed2317bc.png')).buffer(),
          vcard: `BEGIN:VCARD
VERSION:5.0
N:;Unlimited;;;
FN:Unlimited
ORG:Unlimited
TITLE:
item1.TEL;waid=19709001746:+1 (970) 900-1746
item1.X-ABLabel:Unlimited
X-WA-BIZ-DESCRIPTION:ofc
X-WA-BIZ-NAME:Unlimited
END:VCARD`
        }
      },
      participant: '0@s.whatsapp.net'
    }

    conn.reply(m.chat, '✅ Utente mutato/a', fakeMsg, null, { mentions: [target] })
    global.db.data.users[target].muto = true
  }

  if (command === 'smuta') {
    if (!isAdmin) throw '👑 Solo un amministratore può eseguire questo comando'

    let target = m.mentionedJid?.[0]
      || m.quoted?.sender
      || text

    if (!target) {
      return conn.reply(m.chat, 'Tagga la persona da smutare 👤', m)
    }

    if (target === m.sender) throw 'ⓘ Chiedi a un amministratore di smutarti'

    // Inizializza la struttura dati se non esiste
    if (!global.db.data) global.db.data = {}
    if (!global.db.data.users) global.db.data.users = {}
    if (!global.db.data.users[target]) global.db.data.users[target] = {}

    const fakeMsg = {
      key: {
        participants: '0@s.whatsapp.net',
        fromMe: false,
        id: 'Halo'
      },
      message: {
        locationMessage: {
          name: '𝐔𝐭𝐞𝐧𝐭𝐞 smutato/a',
          jpegThumbnail: await (await fetch('https://telegra.ph/file/aea704d0b242b8c41bf15.png')).buffer(),
          vcard: `BEGIN:VCARD
VERSION:5.0
N:;Unlimited;;;
FN:Unlimited
ORG:Unlimited
TITLE:
item1.TEL;waid=19709001746:+1 (970) 900-1746
item1.X-ABLabel:Unlimited
X-WA-BIZ-DESCRIPTION:ofc
X-WA-BIZ-NAME:Unlimited
END:VCARD`
        }
      },
      participant: '0@s.whatsapp.net'
    }

    global.db.data.users[target].muto = false
    conn.reply(m.chat, '✅ Utente smutato/a', fakeMsg, null, { mentions: [target] })
  }
}

handler.command = /^(muta|smuta)$/i
handler.group = true
handler.botAdmin = true
handler.admin = true

export default handler
