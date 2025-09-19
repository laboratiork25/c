import { exec } from 'child_process';
import '../lib/language.js';

let handler = async (m, { text, conn, usedPrefix, command }) => {
  const userId = m.sender;
  const groupId = m.isGroup ? m.chat : null;
  
  let cmd = text.trim();
  if (!cmd) {
    return m.reply(global.t('serverCommandRequired', userId, groupId) || "⚠️ Devi specificare il comando da eseguire. Es: `.server ls -la`");
  }

  await m.reply(global.t('executingCommand', userId, groupId, { cmd }) || `🔄 Eseguendo comando: "${cmd}"`);

  exec(cmd, { timeout: 30000 }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Errore: ${error.message}`);
      return m.reply(global.t('executionError', userId, groupId, { error: error.message }) || `❌ Errore durante l'esecuzione: ${error.message}`);
    }
    
    let output = '';
    if (stdout) output += `📤 ${global.t('output', userId, groupId) || 'Output'}:\n${stdout}`;
    if (stderr) output += `⚠️ ${global.t('errorsWarnings', userId, groupId) || 'Errori/Avvisi'}:\n${stderr}`;
    
    if (!output) output = global.t('commandExecutedNoOutput', userId, groupId) || "✅ Comando eseguito senza output";
    
    if (output.length > 4000) {
      output = output.substring(0, 4000) + "\n" + (global.t('outputTruncated', userId, groupId) || "... (output troncato)");
    }
    
    m.reply(output);
  });
};

handler.command = /^(server|cmd|exec)$/i;
handler.owner = true;
export default handler;