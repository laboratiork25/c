import '../lib/language.js';

let richiestaInAttesa = {}

async function handler(m, { conn, isAdmin, isBotAdmin, args, usedPrefix, command }) {
  if (!m.isGroup) return

  const userId = m.sender
  const groupId = m.chat

  if (richiestaInAttesa[m.sender]) {
    const pending = await conn.groupRequestParticipantsList(groupId)
    const input = (m.text || '').trim()
    delete richiestaInAttesa[m.sender]

    if (/^\d+$/.test(input)) {
      const numero = parseInt(input)
      if (numero <= 0) {
        return m.reply(global.t('richieste.invalidNumber', userId, groupId))
      }
      const daAccettare = pending.slice(0, numero)
      try {
        const jidList = daAccettare.map(p => p.jid)
        await conn.groupRequestParticipantsUpdate(groupId, jidList, 'approve')
        return m.reply(global.t('richieste.acceptedSuccess', userId, groupId, { count: jidList.length }))
      } catch {
        return m.reply(global.t('richieste.errorAccepting', userId, groupId))
      }
    }

    if (input === '39' || input === '+39') {
      const daAccettare = pending.filter(p => p.jid.startsWith('39') || p.jid.startsWith('+39'))
      if (!daAccettare.length) {
        return m.reply(global.t('richieste.no39Found', userId, groupId))
      }
      try {
        const jidList = daAccettare.map(p => p.jid)
        await conn.groupRequestParticipantsUpdate(groupId, jidList, 'approve')
        return m.reply(global.t('richieste.accepted39Success', userId, groupId, { count: jidList.length }))
      } catch {
        return m.reply(global.t('richieste.errorAccepting', userId, groupId))
      }
    }

    return m.reply(global.t('richieste.invalidInput', userId, groupId))
  }

  if (!isBotAdmin) {
    return m.reply(global.t('richieste.noBotAdmin', userId, groupId))
  }

  if (!isAdmin) {
    return m.reply(global.t('richieste.noAdmin', userId, groupId))
  }

  const pending = await conn.groupRequestParticipantsList(groupId)
  if (!pending.length) {
    return m.reply(global.t('richieste.noPending', userId, groupId))
  }

  if (!args[0]) {
    return conn.sendMessage(m.chat, {
      text: global.t('richieste.pendingCount', userId, groupId, { count: pending.length }),
      footer: global.t('richieste.menuFooter', userId, groupId),
      buttons: [
        { buttonId: `${usedPrefix}${command} accetta`, buttonText: { displayText: global.t('richieste.buttonAcceptAll', userId, groupId) }, type: 1 },
        { buttonId: `${usedPrefix}${command} rifiuta`, buttonText: { displayText: global.t('richieste.buttonRejectAll', userId, groupId) }, type: 1 },
        { buttonId: `${usedPrefix}${command} accetta39`, buttonText: { displayText: global.t('richieste.buttonAccept39', userId, groupId) }, type: 1 },
        { buttonId: `${usedPrefix}${command} gestisci`, buttonText: { displayText: global.t('richieste.buttonManage', userId, groupId) }, type: 1 }
      ],
      headerType: 1,
      viewOnce: true
    }, { quoted: m })
  }

  if (args[0] === 'accetta') {
    const numero = parseInt(args[1])
    const daAccettare = isNaN(numero) || numero <= 0 ? pending : pending.slice(0, numero)
    try {
      const jidList = daAccettare.map(p => p.jid)
      await conn.groupRequestParticipantsUpdate(groupId, jidList, 'approve')
      return m.reply(global.t('richieste.acceptedSuccess', userId, groupId, { count: jidList.length }))
    } catch {
      return m.reply(global.t('richieste.errorAccepting', userId, groupId))
    }
  }

  if (args[0] === 'rifiuta') {
    try {
      const jidList = pending.map(p => p.jid)
      await conn.groupRequestParticipantsUpdate(groupId, jidList, 'reject')
      return m.reply(global.t('richieste.rejectedSuccess', userId, groupId, { count: jidList.length }))
    } catch {
      return m.reply(global.t('richieste.errorRejecting', userId, groupId))
    }
  }

  if (args[0] === 'accetta39') {
    const daAccettare = pending.filter(p => p.jid.startsWith('39') || p.jid.startsWith('+39'))
    if (!daAccettare.length) {
      return m.reply(global.t('richieste.no39Found', userId, groupId))
    }
    try {
      const jidList = daAccettare.map(p => p.jid)
      await conn.groupRequestParticipantsUpdate(groupId, jidList, 'approve')
      return m.reply(global.t('richieste.accepted39Success', userId, groupId, { count: jidList.length }))
    } catch {
      return m.reply(global.t('richieste.errorAccepting', userId, groupId))
    }
  }

  if (args[0] === 'gestisci') {
    return conn.sendMessage(m.chat, {
      text: global.t('richieste.manageCustom', userId, groupId, { command }),
      footer: global.t('richieste.manageFooter', userId, groupId),
      buttons: [
        { buttonId: `${usedPrefix}${command} accetta 10`, buttonText: { displayText: "10" }, type: 1 },
        { buttonId: `${usedPrefix}${command} accetta 20`, buttonText: { displayText: "20" }, type: 1 },
        { buttonId: `${usedPrefix}${command} accetta 50`, buttonText: { displayText: "50" }, type: 1 },
        { buttonId: `${usedPrefix}${command} accetta 100`, buttonText: { displayText: "100" }, type: 1 },
        { buttonId: `${usedPrefix}${command} accetta 200`, buttonText: { displayText: "200" }, type: 1 }
      ],
      headerType: 1,
      viewOnce: true
    }, { quoted: m })
  }
}

handler.help = ['richieste']
handler.tags = ['group']
handler.command = ['richieste', 'requests']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
