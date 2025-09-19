import { areJidsSameUser } from '@whiskeysockets/baileys'
import '../lib/language.js'

const handler = async (m, { conn }) => {
  if (m.messageStubType === 27 || m.messageStubType === 'add') {
    const groupId = m.key.remoteJid;
    try {
      const metadata = await conn.groupMetadata(groupId);
      const memberCount = metadata.participants.length;

      if (memberCount < 30) {
        await conn.sendMessage(groupId, {
          text: `❌ Questo gruppo ha solo ${memberCount} membri.\nPer favore, aumentate il numero di partecipanti e invitatemi di nuovo.`
        });
        await conn.groupLeave(groupId);
      } else {
        await conn.sendMessage(groupId, {
          text: `👋 Ciao a tutti! Grazie per l'invito.\nQuesto gruppo ha ${memberCount} membri, quindi resto volentieri!\nScrivete *.menu* per vedere cosa posso fare.`
        });
      }
    } catch (err) {
      console.error('Errore durante la gestione dell’ingresso nel gruppo:', err);
    }
  }
};

handler.before = handler;

export default handler;
