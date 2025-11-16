import '../lib/language.js';
import { tmpdir } from 'os';
import path, { join } from 'path';
import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch } from 'fs';
import fs from 'fs';

function levenshteinDistance(str1, str2) {
  const matrix = [];
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= str1.length; j++) {
    matrix[j] = j;
  }
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[str2.length][str1.length];
}

function jaccardSimilarity(str1, str2) {
  const set1 = new Set(str1.split(''));
  const set2 = new Set(str2.split(''));
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  return intersection.size / union.size;
}

function longestCommonSubsequence(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
}

function normalizeString(str) {
  return str.toLowerCase()
    .replace(/[_\-\s\.]/g, '')
    .replace(/[àáâãäåæ]/g, 'a')
    .replace(/[èéêëē]/g, 'e')
    .replace(/[ìíîïī]/g, 'i')
    .replace(/[òóôõöøō]/g, 'o')
    .replace(/[ùúûüū]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[ñ]/g, 'n')
    .replace(/[ý]/g, 'y')
    .replace(/[ß]/g, 's')
    .replace(/[đ]/g, 'd')
    .replace(/[ł]/g, 'l')
    .replace(/[ř]/g, 'r')
    .replace(/[š]/g, 's')
    .replace(/[ž]/g, 'z')
    .replace(/[0-9]/g, '');
}

function calculateAdvancedSimilarity(input, filename) {
  const normalizedInput = normalizeString(input);
  const normalizedFile = normalizeString(filename.replace('.js', ''));
  if (normalizedInput === normalizedFile) return 1.0;
  if (normalizedInput.length === 0 || normalizedFile.length === 0) return 0;
  const exactMatch = normalizedInput === normalizedFile;
  const containsMatch = normalizedFile.includes(normalizedInput) || normalizedInput.includes(normalizedFile);
  const startsWithMatch = normalizedFile.startsWith(normalizedInput) || normalizedInput.startsWith(normalizedFile);
  const endsWithMatch = normalizedFile.endsWith(normalizedInput) || normalizedInput.endsWith(normalizedFile);
  const distance = levenshteinDistance(normalizedInput, normalizedFile);
  const maxLength = Math.max(normalizedInput.length, normalizedFile.length);
  const levenshteinSimilarity = 1 - (distance / maxLength);
  const jaccardScore = jaccardSimilarity(normalizedInput, normalizedFile);
  const lcsLength = longestCommonSubsequence(normalizedInput, normalizedFile);
  const lcsScore = (2 * lcsLength) / (normalizedInput.length + normalizedFile.length);
  let nGramScore = 0;
  const nGramSize = Math.min(2, Math.min(normalizedInput.length, normalizedFile.length));
  if (nGramSize > 0) {
    const inputNGrams = new Set();
    const fileNGrams = new Set();
    for (let i = 0; i <= normalizedInput.length - nGramSize; i++) {
      inputNGrams.add(normalizedInput.substr(i, nGramSize));
    }
    for (let i = 0; i <= normalizedFile.length - nGramSize; i++) {
      fileNGrams.add(normalizedFile.substr(i, nGramSize));
    }
    const intersection = new Set([...inputNGrams].filter(x => fileNGrams.has(x)));
    const union = new Set([...inputNGrams, ...fileNGrams]);
    nGramScore = intersection.size / union.size;
  }
  let positionScore = 0;
  for (let i = 0; i < Math.min(normalizedInput.length, normalizedFile.length); i++) {
    if (normalizedInput[i] === normalizedFile[i]) {
      positionScore += (1 / Math.max(normalizedInput.length, normalizedFile.length));
    }
  }
  let score = 0;
  if (exactMatch) score = 1.0;
  else if (startsWithMatch) score = 0.95;
  else if (endsWithMatch) score = 0.9;
  else if (containsMatch) score = 0.85;
  else {
    const weights = {
      levenshtein: 0.3,
      jaccard: 0.25,
      lcs: 0.2,
      nGram: 0.15,
      position: 0.1
    };
    score = (levenshteinSimilarity * weights.levenshtein) +
            (jaccardScore * weights.jaccard) +
            (lcsScore * weights.lcs) +
            (nGramScore * weights.nGram) +
            (positionScore * weights.position);
  }
  const lengthPenalty = Math.abs(normalizedInput.length - normalizedFile.length) / Math.max(normalizedInput.length, normalizedFile.length);
  score *= (1 - lengthPenalty * 0.1);
  return Math.max(0, Math.min(1, score));
}

function findBestMatches(input, allFiles, threshold = 0.2, maxResults = 5) {
  const results = allFiles.map(file => {
    const filename = file.replace('.js', '');
    const score = calculateAdvancedSimilarity(input, filename);
    return { file, filename, score };
  });
  const filtered = results.filter(item => item.score >= threshold);
  const sorted = filtered.sort((a, b) => {
    if (Math.abs(a.score - b.score) < 0.01) {
      return a.filename.length - b.filename.length;
    }
    return b.score - a.score;
  });
  return sorted.slice(0, maxResults);
}

let handler = async (m, { conn, text, usedPrefix, command, __dirname }) => {
  const userId = m.sender;
  const groupId = m.chat;
  const nomeDelBot = conn.user?.name || global.db?.data?.nomedelbot || 'ChatUnity';
  
  const availablePlugins = Object.keys(plugins);
  const pluginNames = availablePlugins.map(plugin => plugin.replace('.js', ''));
  
  if (!text) {
    if (global.deletePluginData) {
      delete global.deletePluginData;
    }
    const pluginList = pluginNames.slice(0, 15).map((name, i) => `┊ ${i + 1}. ${name}`).join('\n');
    return conn.sendMessage(m.chat, {
      text: global.t('deleteHelp', userId, groupId, { usedPrefix, pluginList, total: pluginNames.length }),
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
  
  const input = text.trim();
  let targetPlugin;
  
  if (/^\d+$/.test(input)) {
    const index = parseInt(input) - 1;
    if (index >= 0 && index < pluginNames.length) {
      targetPlugin = pluginNames[index];
    } else {
      throw global.t('deleteInvalidNumber', userId, groupId, { max: pluginNames.length });
    }
  } else {
    const exactMatch = pluginNames.find(name => name === input);
    if (exactMatch) {
      targetPlugin = exactMatch;
    } else {
      let allFiles;
      try {
        allFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));
      } catch {
        allFiles = fs.readdirSync('plugins').filter(file => file.endsWith('.js'));
      }
      const matches = findBestMatches(input, allFiles);
      if (matches.length === 0) {
        throw global.t('deleteNoSimilar', userId, groupId, { input });
      }
      if (matches.length === 1 && matches.score > 0.7) {
        global.deletePluginData = {
          chat: m.chat,
          filename: matches.file,
          sender: m.sender,
          dirname: __dirname,
          autoConfirm: true
        };
        return conn.sendMessage(m.chat, {
          text: global.t('deleteConfirm', userId, groupId, { filename: matches.filename, score: Math.round(matches.score * 100) }),
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
      global.deletePluginData = {
        chat: m.chat,
        options: matches,
        sender: m.sender,
        dirname: __dirname,
        isMultipleChoice: true
      };
      const optionsText = matches.map((item, index) => 
        `${index + 1}. ${item.filename} (${Math.round(item.score * 100)}%)`
      ).join('\n');
      return conn.sendMessage(m.chat, {
        text: global.t('deleteMultiChoice', userId, groupId, { input, options: optionsText }),
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
  }
  
  await deletePlugin(targetPlugin, __dirname, m, conn, userId, groupId, nomeDelBot);
};

async function deletePlugin(pluginName, __dirname, m, conn, userId, groupId, nomeDelBot) {
  try {
    const pluginPath = join(__dirname, '../plugins/' + pluginName + '.js');
    if (!existsSync(pluginPath)) {
      return conn.sendMessage(m.chat, {
        text: global.t('deleteNotFound', userId, groupId, { path: pluginPath }),
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
    unlinkSync(pluginPath);
    await conn.sendMessage(m.chat, {
      text: global.t('deleteSuccess', userId, groupId, { 
        pluginName, 
        sender: m.sender.split('@'),
        time: new Date().toLocaleString('it-IT') 
      }),
      mentions: [m.sender],
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
    console.error('Errore durante l\'eliminazione del plugin:', error);
    return conn.sendMessage(m.chat, {
      text: global.t('deleteError', userId, groupId, { error: error.message }),
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
}

handler.before = async (m, { conn }) => {
  if (!global.deletePluginData) return;
  if (m.chat !== global.deletePluginData.chat) return;
  if (m.sender !== global.deletePluginData.sender) return;
  const userId = m.sender;
  const groupId = m.chat;
  const nomeDelBot = conn.user?.name || global.db?.data?.nomedelbot || 'ChatUnity';
  const response = m.text.toLowerCase().trim();
  
  if (global.deletePluginData.isMultipleChoice) {
    const choice = parseInt(response);
    if (choice >= 1 && choice <= global.deletePluginData.options.length) {
      const selectedFile = global.deletePluginData.options[choice - 1];
      try {
        await deletePlugin(selectedFile.filename, global.deletePluginData.dirname, m, conn, userId, groupId, nomeDelBot);
        delete global.deletePluginData;
        return true;
      } catch (error) {
        await conn.sendMessage(m.chat, {
          text: global.t('deleteGenericError', userId, groupId, { error: error.message }),
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
        delete global.deletePluginData;
        return true;
      }
    }
    if (response === 'no') {
      await conn.sendMessage(m.chat, {
        text: global.t('deleteOperationCancelled', userId, groupId),
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
      delete global.deletePluginData;
      return true;
    }
    return;
  }
  
  if (response === 'si' || response === 'sì' || response === 'yes') {
    try {
      const pluginName = global.deletePluginData.filename.replace('.js', '');
      await deletePlugin(pluginName, global.deletePluginData.dirname, m, conn, userId, groupId, nomeDelBot);
      delete global.deletePluginData;
      return true;
    } catch (error) {
      await conn.sendMessage(m.chat, {
        text: global.t('deleteGenericError', userId, groupId, { error: error.message }),
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
      delete global.deletePluginData;
      return true;
    }
  }
  
  if (response === 'no') {
    await conn.sendMessage(m.chat, {
      text: global.t('deleteOperationCancelled', userId, groupId),
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
    delete global.deletePluginData;
    return true;
  }
};

handler.help = ['deleteplugin <nome>'];
handler.tags = ['owner'];
handler.command = /^(deleteplugin|dp|delplugin|rimuoviplugin|eliminaplugin)$/i;
handler.owner = true;

export default handler;