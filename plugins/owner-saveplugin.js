import '../lib/language.js';
import fs from 'fs';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const userId = m.sender;
  const groupId = m.chat;
  const nomeDelBot = conn.user?.name || global.db?.data?.nomedelbot || 'ChatUnity';
  
  if (!text) throw global.t('saveNoName', userId, groupId);
  if (!m.quoted?.text) throw global.t('saveNoQuoted', userId, groupId);
  
  const path = `plugins/${text}.js`;
  
  try {
    await fs.writeFileSync(path, m.quoted.text);
    
    await conn.sendMessage(m.chat, {
      text: global.t('saveSaveSuccess', userId, groupId, { path }),
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363259442839354@newsletter',
          serverMessageId: '',
          newsletterName: nomeDelBot
        }
      }
    }, { quoted: m });
  } catch (error) {
    await conn.sendMessage(m.chat, {
      text: global.t('saveErrorWrite', userId, groupId, { error: error.message }),
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363259442839354@newsletter',
          serverMessageId: '',
          newsletterName: nomeDelBot
        }
      }
    }, { quoted: m });
  }
};

handler.help = ['saveplugin <nome>'];
handler.tags = ['owner'];
handler.command = /^(salvar|saveplugin)$/i;
handler.rowner = true;

export default handler;