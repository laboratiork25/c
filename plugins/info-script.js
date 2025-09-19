import moment from 'moment-timezone';
import fetch from 'node-fetch';
import '../lib/language.js';

let handler = async (m, { conn, args }) => {
  const userId = m.sender;
  const groupId = m.isGroup ? m.chat : null;
  
  try {
    let response = await fetch('https://api.github.com/repos/chatunitycenter/chatunity-bot');
    let repoData = await response.json();

    let messageText = global.t('repoInfo', userId, groupId, {
      name: repoData.name,
      url: repoData.html_url,
      size: (repoData.size / 1024).toFixed(2),
      updatedAt: moment(repoData.updated_at).format('DD/MM/YY - HH:mm:ss'),
      watchers: repoData.watchers_count,
      forks: repoData.forks_count,
      stars: repoData.stargazers_count,
      issues: repoData.open_issues_count
    });

    const messageOptions = {
      mentions: [],
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363259442839354@newsletter',
          serverMessageId: '',
          newsletterName: global.t('newsletterName', userId, groupId)
        }
      }
    };

    await conn.sendMessage(m.chat, { text: messageText, ...messageOptions });
  } catch (error) {
    console.error(global.t('sendErrorLog', userId, groupId), error);
    m.reply(global.t('sendError', userId, groupId));
  }
};

handler.help = ['info'];
handler.tags = ['info'];
handler.command = /^(script|repo|repository|github)$/i;

export default handler;