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

    const pageRequest = args[0]
    const pageNum = parseInt(args[1])

    if (!pageRequest) {

      const txt = `📊 Il bot è in ${groups.length} gruppi\nPremi il bottone per vederli.`

      const buttons = [
        {
          index: 1,
          quickReplyButton: {
            displayText: "📜 Mostra gruppi",
            id: "LISTGROUP_PAGE_0"
          }
        }
      ]

      return conn.sendMessage(m.chat, { text: txt, templateButtons: buttons })
    }

    if (pageRequest === 'page') {
      const page = pageNum || 0
      const pages = Math.ceil(groups.length / PAGE_SIZE)

      if (page >= pages) return m.reply('❌ Pagina inesistente.')

      const start = page * PAGE_SIZE
      const current = groups.slice(start, start + PAGE_SIZE)

      const buttons = current.map((g, i) => ({
        index: i + 1,
        quickReplyButton: {
          displayText: g.subject.slice(0, 20),
          id: `LISTGROUP_INFO_${g.id}`
        }
      }))

      if (page > 0) {
        buttons.push({
          index: 98,
          quickReplyButton: {
            displayText: "⬅️ Indietro",
            id: `LISTGROUP_PAGE_${page - 1}`
          }
        })
      }

      if (page < pages - 1) {
        buttons.push({
          index: 99,
          quickReplyButton: {
            displayText: "➡️ Avanti",
            id: `LISTGROUP_PAGE_${page + 1}`
          }
        })
      }

      return conn.sendMessage(m.chat, {
        text: `📃 Pagina ${page + 1} / ${pages}\nSeleziona un gruppo:`,
        templateButtons: buttons
      })
    }

    if (pageRequest === 'info') {
      return m.reply('Usa i bottoni, non scrivere manualmente.')
    }
  }

  if (m?.message?.buttonsResponseMessage?.selectedButtonId ||
      m?.message?.templateButtonReplyMessage?.selectedId) {

    const buttonId =
      m.message.buttonsResponseMessage?.selectedButtonId ||
      m.message.templateButtonReplyMessage?.selectedId

    if (buttonId.startsWith('LISTGROUP_PAGE_')) {
      const n = parseInt(buttonId.replace('LISTGROUP_PAGE_', ''))
      return handler(m, { conn, args: ['page', n], command: 'listgroup' })
    }

    if (buttonId.startsWith('LISTGROUP_INFO_')) {

      const groupId = buttonId.replace('LISTGROUP_INFO_', '')

      if (global._groupRequests[sender].allowed <= 0) {
        return m.reply('⛔ Hai già richiesto info su 2 gruppi. Rilancia .listgroup.')
      }

      global._groupRequests[sender].allowed--

      let metadata
      try {
        metadata = await conn.groupMetadata(groupId)
      } catch {
        return m.reply('❌ Impossibile ottenere info di questo gruppo.')
      }

      let pp = ''
      try {
        pp = await conn.profilePictureUrl(groupId)
      } catch {}

      const admins = metadata.participants
        .filter(p => p.admin)
        .map(a => `• @${a.id.split('@')[0]}`)
        .join('\n') || 'Nessun admin'

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
• Membri: ${metadata.size}
• Creato il: ${creation}

👑 Admin:
${admins}

🔗 Link:
${invite}
`

      return conn.sendMessage(
        m.chat,
        {
          image: pp ? { url: pp } : undefined,
          caption,
          mentions: metadata.participants.map(x => x.id)
        }
      )
    }
  }
}

handler.command = /^listgroup$/i
export default handler
