import fs from 'fs';
import path from 'path';
import '../lib/language.js';

let handler = async (m, { text, conn, usedPrefix, command }) => {
  const userId = m.sender;
  const groupId = m.isGroup ? m.chat : null;
  let fileName = text.trim();
  if (!fileName) {
    return m.reply(global.t('fileNameRequired', userId, groupId) || "⚠️ Devi specificare il nome del file da creare. Es: `.file nome.txt`");
  }
  
  let filePath = path.join(process.cwd(), fileName);
  
  if (fs.existsSync(filePath)) {
    return m.reply(global.t('fileAlreadyExists', userId, groupId, { fileName }) || `⚠️ Il file "${fileName}" esiste già.`);
  }
  
  fs.writeFile(filePath, '', (err) => {
    if (err) {
      console.error(`Errore nella creazione del file: ${err.message}`);
      return m.reply(global.t('fileCreationError', userId, groupId, { error: err.message }) || `❌ Errore nella creazione del file: ${err.message}`);
    }
    m.reply(global.t('fileCreatedSuccess', userId, groupId, { fileName }) || `✅ Il file "${fileName}" è stato creato con successo nella cartella del bot.`);
  });
};

handler.command = /^file$/i;
handler.owner = true;
export default handler;