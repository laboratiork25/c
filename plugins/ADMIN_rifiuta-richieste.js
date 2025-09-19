// Codice di ADMIN_rifiuta-richieste.js
import '../lib/language.js';

// Rifiuta +## by Youns
let handler = async (m, { conn, isAdmin, isBotAdmin, args }) => {
  const userId = m.sender;
  const groupId = m.isGroup ? m.chat : null;
  if (!m.isGroup) return m.reply(global.t('groupOnlyCommand', userId, groupId) || "Questo comando si usa solo nei gruppi.")
  if (!isBotAdmin) return m.reply(global.t('botAdminRequiredReject', userId, groupId) || "Devo essere admin per rifiutare le richieste.")
  if (!isAdmin) return m.reply(global.t('adminOnlyCommand', userId, groupId) || "Solo gli admin del gruppo possono usare questo comando.")

  try {
    const groupId = m.chat
    const pending = await conn.groupRequestParticipantsList(groupId)
    const filtroPrefisso = args[0]

    if (!pending.length) return m.reply(global.t('noRequestsToReject', userId, groupId) || "Non ci sono richieste da rifiutare.")

    let rifiutati = 0

    for (let p of pending) {
      const numero = p.jid.split('@')[0]

      if (!filtroPrefisso || numero.startsWith(filtroPrefisso)) {
        try {
          await conn.groupRequestParticipantsUpdate(groupId, [p.jid], 'reject')
          rifiutati++
        } catch (e) {
          console.log(`[ERRORE] Non sono riuscito a rifiutare ${p.jid}:`, e)
        }
      }
    }

    if (rifiutati === 0) {
      return m.reply(filtroPrefisso ? global.t('noRequestsWithPrefix', userId, groupId, { prefix: filtroPrefisso }) || `Nessuna richiesta con prefisso +${filtroPrefisso}.` : global.t('noRequestsRejected', userId, groupId) || "Nessuna richiesta rifiutata.")
    }

    m.reply(global.t('requestsRejectedSuccess', userId, groupId, { count: rifiutati, prefix: filtroPrefisso }) || `❌ Rifiutate ${rifiutati} richieste con successo${filtroPrefisso ? ` con prefisso +${filtroPrefisso}` : ""}.`)

  } catch (err) {
    console.error('[ERRORE RIFIUTA]', err)
    m.reply(global.t('rejectRequestsError', userId, groupId) || "Errore durante il rifiuto delle richieste.")
  }
}

handler.command = ['rifiutarichieste']
handler.tags = ['gruppo']
handler.help = ['rifiuta [prefisso] - rifiuta le richieste (es. .rifiuta 39)']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler