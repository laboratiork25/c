import QRCode from 'qrcode'
import '../lib/language.js';
async function handler(m, { conn, isBotAdmin }) {
  const userId = m.sender
  const groupId = m.chat

  if (!isBotAdmin) {
    return await conn.sendMessage(m.chat, {
      text: global.t('linkqr.noBotAdmin', userId, groupId)
    }, { quoted: m })
  }

  try {
    const metadata = await conn.groupMetadata(m.chat)
    const inviteCode = await conn.groupInviteCode(m.chat)
    const inviteLink = `https://chat.whatsapp.com/${inviteCode}`
    const qrImageBuffer = await QRCode.toBuffer(inviteLink)

    await conn.sendMessage(m.chat, {
      image: qrImageBuffer,
      caption: global.t('linkqr.qrCaption', userId, groupId, { groupName: metadata.subject })
    }, { quoted: m })
  } catch (error) {
    await conn.sendMessage(m.chat, {
      text: global.t('linkqr.qrError', userId, groupId)
    }, { quoted: m })
  }
}

handler.help = ['linkqr']
handler.tags = ['group']
handler.command = /^linkqr(gro?up)?$/i
handler.group = true
handler.botAdmin = true

export default handler
