// Codice di ADMIN_accetta-richieste.js
import '../lib/language.js'

let handler = async (m, { conn, isAdmin, isBotAdmin, participants, groupMetadata }) => {
  const userId = m.sender
  const groupId = m.isGroup ? m.chat : null
  
  if (!m.isGroup) return m.reply(global.t('smsOnlyGroup', userId, groupId) || "Questo comando si usa solo nei gruppi.")
  if (!isBotAdmin) return m.reply(global.t('smsBotNotAdmin', userId, groupId) || "Devo essere admin per accettare le richieste.")
  if (!isAdmin) return m.reply(global.t('smsOnlyAdmin', userId, groupId) || "Solo gli admin del gruppo possono usare questo comando.")

  try {
    const groupId = m.chat
    const pending = await conn.groupRequestParticipantsList(groupId)

    if (!pending.length) return m.reply(global.t('noRequestsToAccept', userId, groupId) || "Non ci sono richieste da accettare.")

    let accettati = 0

    for (let p of pending) {
      try {
        await conn.groupRequestParticipantsUpdate(groupId, [p.jid], 'approve')
        accettati++
      } catch (e) {
        console.log(`[ERRORE] Non sono riuscito ad accettare ${p.jid}:`, e)
      }
    }

    const successMessage = global.t('requestsAccepted', userId, groupId, { count: accettati }) || `✅ Accettate ${accettati} richieste con successo.`
    m.reply(successMessage)

  } catch (err) {
    console.error('[ERRORE ACCETTA]', err)
    m.reply(global.t('acceptRequestsError', userId, groupId) || 'Errore durante l\'accettazione delle richieste.')
  }
}

handler.command = ['accettarichieste']
handler.tags = ['gruppo']
handler.help = ['accetta - accetta tutte le richieste in sospeso']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler