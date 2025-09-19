import JavaScriptObfuscator from 'javascript-obfuscator'
import '../lib/language.js';

let handler = async (m, { conn, text }) => {
  const userId = m.sender;
  const groupId = m.isGroup ? m.chat : null;
  
  // Usa il testo del messaggio citato se text è vuoto
  let codiceDaOffuscare = text || (m.quoted && m.quoted.text);

  if (!codiceDaOffuscare) {
    return m.reply(global.t('obfuscateNoCode', userId, groupId));
  }

  function offuscaCodice(codice) {
    return JavaScriptObfuscator.obfuscate(codice, {
      compact: false,
      controlFlowFlattening: true,
      deadCodeInjection: true,
      simplify: true,
      numbersToExpressions: true
    }).getObfuscatedCode();
  }

  try {
    let codiceOffuscato = await offuscaCodice(codiceDaOffuscare);
    conn.sendMessage(m.chat, { text: codiceOffuscato }, { quoted: m });
  } catch (error) {
    console.error('Obfuscation error:', error);
    m.reply(global.t('obfuscateError', userId, groupId));
  }
}

handler.help = ['offusca <codice>'];
handler.tags = ['tools'];
handler.command = /^(ofuscare|offuscare|offusca|obfuscate|obfuscare)$/i;
handler.description = 'Offusca codice JavaScript';

export default handler;