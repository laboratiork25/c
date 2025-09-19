import fs from 'fs';
import archiver from 'archiver';
import '../lib/language.js';

let handler = async (m, { text, conn, usedPrefix, command, __dirname }) => {
  const userId = m.sender;
  const groupId = m.isGroup ? m.chat : null;
  
  if (!text) return m.reply(global.t('zipUsage', userId, groupId, { command: usedPrefix + command }) || `⚠️ Usa: ${usedPrefix + command} <nome_archivio>`);

  let archiveName = text.trim();
  let archivePath = `./${archiveName}.zip`;

  await m.reply(global.t('creatingBackup', userId, groupId) || `🔄 Creazione del backup in corso...`);

  const output = fs.createWriteStream(archivePath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', async () => {
    console.log(`Archivio creato: ${archive.pointer()} bytes`);
    await m.reply(global.t('backupCreatedSending', userId, groupId, { archiveName }) || `✅ Backup ${archiveName}.zip creato. Inviando...`);

    let fileData = fs.readFileSync(archivePath);
    await conn.sendMessage(m.chat, {
      document: fileData,
      mimetype: 'application/zip',
      fileName: `${archiveName}.zip`
    }, { quoted: m });

    fs.unlinkSync(archivePath);
  });

  archive.on('error', (err) => {
    console.error(err);
    m.reply(global.t('compressionError', userId, groupId, { error: err.message }) || `❌ Errore durante la compressione: ${err.message}`);
  });

  archive.pipe(output);

  // Usa glob per includere tutti i file e cartelle tranne "node_modules" e "Sessioni"
  archive.glob('**/*', {
    ignore: ['node_modules/**', 'Sessioni/**']
  });

  await archive.finalize();
};

handler.command = /^zip$/i;
handler.owner = true;
export default handler;