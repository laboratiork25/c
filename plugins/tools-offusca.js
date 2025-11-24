import '../lib/language.js';
import JavaScriptObfuscator from 'javascript-obfuscator';

let handler = async (m, { conn, text }) => {
  const userId = m.sender;
  const groupId = m.chat;
  
  let codiceDaOffuscare = text || (m.quoted && m.quoted.text);

  if (!codiceDaOffuscare) {
    return m.reply(global.t('obfuscateNoCode', userId, groupId));
  }

  try {
    await m.reply(global.t('obfuscateProcessing', userId, groupId));
    
    function offuscaCodice(codice) {
      return JavaScriptObfuscator.obfuscate(codice, {
        compact: false,
        controlFlowFlattening: true,
        deadCodeInjection: true,
        simplify: true,
        numbersToExpressions: true
      }).getObfuscatedCode();
    }

    let codiceOffuscato = await offuscaCodice(codiceDaOffuscare);
    
    await conn.sendMessage(m.chat, { 
      text: `${global.t('obfuscateSuccess', userId, groupId)}\n\n${codiceOffuscato}` 
    }, { quoted: m });
    
  } catch (error) {
    await m.reply(global.t('obfuscateError', userId, groupId, { error: error.message }));
  }
};

handler.help = ['offusca <code>', 'obfuscate <code>'];
handler.tags = ['tools'];
handler.command = /^(ofuscare|offuscare|offusca|obfuscate)$/i;

export default handler;
