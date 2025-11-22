import fs from 'fs'

const PAGE_SIZE = 10
const MAX_INFO_REQUESTS = 2

if (!global._groupRequests) global._groupRequests = {}

let handler = async (m, { conn, args, command }) => {

  const sender = m.sender

  if (!global._groupRequests[sender]) {
    global._groupRequests[sender] = { allowed: MAX_INFO_REQUESTS }
  }

  const groups = Object.entries(conn.chats)
    .filter(([id, data]) => id.endsWith('@g.us') && data.isChats)
    .map(([id, data]) => ({ id, subject: data.subject || 'Senza nome' }))

  if (command === 'listgroup') {
    if (groups.length === 0) {
      return conn.sendMessage(m.chat, { text: '❌ Il bot non è in nessun gruppo.' })
    }

    const total = groups.length

    await conn.sendMessage(
      m.chat,
      {
        text: `📊 Il bot è in ${total} gruppi\nPremi il bottone per vederli.`,
        buttons: [
          { buttonId: `.listgroup page 0`, buttonText: { displayText: "📜 Mostra gruppi" }, type: 1 }
        ]
      }
    )

    return
  }

  if (command === 'listgroup' && args[0] === 'page') {

    const page = parseInt(args[1]) || 0
    const pages = Math.ceil(groups.length / PAGE_SIZE)

    if (page >= pages) return m.reply('❌ Pagina inesistente.')

    const start = page * PAGE_SIZE
    const current = groups.slice(start, start + PAGE_SIZE)

    const buttons = current.map(g => ({
      buttonId: `.listgroup info ${g.id}`,
      buttonText: { displayText: g.subject.slice(0, 20) },
      type: 1
    }))

    const nav = []
    if (page > 0) nav.push({ buttonId: `.listgroup page ${page - 1}`, buttonText: { displayText: "⬅️ Indietro" }, type: 1 })
    if (page < pages - 1) nav.push({ buttonId: `.listgroup page ${page + 1}`, buttonText: { displayText: "➡️ Avanti" }, type: 1 })

    await conn.sendMessage(
      m.chat,
      {
        text: `📃 Pagina ${page + 1} / ${pages}\nSeleziona un gruppo:`,
        buttons: [...buttons, ...nav]
      }
    )

    return
  }

  if (command === 'listgroup' && args[0] === 'info') {

    const groupId = args[1]

    if (!groupId || !groupId.endsWith('@g.us')) {
      return m.reply('❌ ID gruppo non valido.')
    }

    if (global._groupRequests[sender].allowed <= 0) {
      return m.reply('⛔ Hai già richiesto info su 2 gruppi. Rilancia .listgroup.')
    }

    global._groupRequests[sender].allowed--

    let metadata
    try {
      metadata = await conn.groupMetadata(groupId)
    } catch {
      return m.reply('❌ Impossibile ottenere info da questo gruppo.')
    }

    let pp = ''
    try {
      pp = await conn.profilePictureUrl(groupId, 'image')
    } catch {
      pp = null
    }

    const admins = metadata.participants
      .filter(p => p.admin)
      .map(a => `• @${a.id.split('@')[0]}`)
      .join('\n') || 'Nessun admin rilevato'

    const creation = new Date(metadata.creation * 1000).toLocaleString()

    let invite = ''
    try {
      invite = await conn.groupInviteCode(groupId)
      invite = `https://chat.whatsapp.com/${invite}`
    } catch {
      invite = 'Non disponibile'
    }

    const caption =
`📌 INFO GRUPPO

• Nome: ${metadata.subject}
• ID: ${metadata.id}
• Membri: ${metadata.size}
• Creato il: ${creation}

👑 Admin:
${admins}

🔗 Link:
${invite}
`

    await conn.sendMessage(
      m.chat,
      {
        image: pp ? { url: pp } : undefined,
        caption,
        mentions: metadata.participants.map(x => x.id)
      }
    )
  }

}

handler.command = /^listgroup$/i
export default handler
