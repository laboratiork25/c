//Plugin fatto da Gabs & 333 Staff
import QRCode from 'qrcode';
import '../lib/language.js';

const handler = async (m, { conn }) => {
    const userId = m.sender;
    const groupId = m.isGroup ? m.chat : null;
    try {
        const inviteLink = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat);
        const qrImageBuffer = await QRCode.toBuffer(inviteLink);
        await conn.sendMessage(m.chat, { image: qrImageBuffer, caption: global.t('adminLinkQRSuccess', userId, groupId) || 'Ecco il QR Code per il link del gruppo!' });
    } catch (error) {
        m.reply(global.t('adminLinkQRError', userId, groupId) || 'Errore durante la generazione del QR Code: ' + error.message);
    }
};

handler.help = ['linkgroup'];
handler.tags = ['group'];
handler.command = /^linkqr(gro?up)?$/i;
handler.group = true;
handler.botAdmin = true;

export default handler;