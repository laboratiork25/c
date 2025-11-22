import moment from "moment-timezone"

let handler = async (m, { conn, command, args }) => {

  if (command === "listgroup") {

    let groups = Object.entries(conn.chats)
      .filter(([jid]) => jid.endsWith("@g.us"))
      .map(([jid, chat]) => ({
        id: jid,
        subject: chat.subject || "Gruppo senza nome",
        participants: chat?.participants?.length || 0
      }))

    if (groups.length === 0)
      return m.reply("❌ Il bot non è in nessun gruppo.")

    global.groupCache = {}
    groups.forEach((g, i) => {
      global.groupCache[i + 1] = g.id
    })

    let text = `📊 *Il bot è in ${groups.length} gruppi*\n\n`
    text += `Usa: \`.groupinfo numero\`\nEsempio → \`.groupinfo 1\`\n\n`

    let max = 10
    let list = groups.slice(0, max)

    list.forEach((g, i) => {
      text += `${i + 1}. *${g.subject}* — ${g.participants} membri\n`
    })

    if (groups.length > max)
      text += `\n🔽 Mostro solo i primi ${max}.`

    return m.reply(text)
  }

  if (command === "groupinfo") {

    if (!args[0])
      return m.reply("❌ Inserisci un numero.\nEsempio: `.groupinfo 1`")

    let n = parseInt(args[0])
    if (!n || !global.groupCache || !global.groupCache[n])
      return m.reply("❌ Numero non valido, esegui prima `.listgroup`.")

    let gid = global.groupCache[n]

    let info
    try {
      info = await conn.groupMetadata(gid)
    } catch {
      return m.reply("❌ Errore nel recupero dei metadati del gruppo.")
    }

    let admin = info.participants
      .filter(p => p.admin)
      .map(a => `• @${a.id.split("@")[0]}`)
      .join("\n") || "Nessun admin trovato"

    let creation = moment(info.creation * 1000)
      .tz("Europe/Rome")
      .format("DD/MM/YYYY HH:mm")

    let invite = info.inviteCode
      ? `https://chat.whatsapp.com/${info.inviteCode}`
      : "Nessun link"

    let text = `📄 *INFO GRUPPO*\n\n`
    text += `🏷️ *Nome:* ${info.subject}\n`
    text += `🆔 *ID:* ${gid}\n`
    text += `👥 *Membri:* ${info.participants.length}\n`
    text += `🔰 *Admin:*\n${admin}\n\n`
    text += `🔗 *Link:* ${invite}\n`
    text += `📆 *Creato il:* ${creation}\n`
    text += `🛡️ *Restrizioni:* ${info.restrict ? "❌ Solo admin" : "✔️ Tutti"}\n`
    text += `📣 *Annunci:* ${info.announce ? "🔒 Solo admin possono scrivere" : "💬 Tutti possono scrivere"}\n`

    try {
      let pp = await conn.profilePictureUrl(gid, "image")
      return await conn.sendMessage(m.chat, {
        image: { url: pp },
        caption: text,
        mentions: info.participants.map(p => p.id)
      })
    } catch {
      return m.reply(text)
    }
  }
}

handler.help = ["listgroup", "groupinfo"]
handler.tags = ["group"]
handler.command = ["listgroup", "groupinfo"]

export default handler
