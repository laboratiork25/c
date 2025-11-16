import '../lib/language.js';
import fs from 'fs';
import syntaxError from 'syntax-error';
import path from 'path';

const _fs = fs.promises;

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

function findBestMatches(input, allFiles, isPlugin = false, threshold = 0.2, maxResults = 5) {
  const results = allFiles.map(file => {
    const filename = isPlugin ? file.replace('.js', '') : file;
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

async function findFile(filename, isPlugin, __dirname) {
  let pathFile;
  if (isPlugin) {
    pathFile = path.join(__dirname, filename);
  } else {
    pathFile = filename;
  }
  try {
    await _fs.access(pathFile);
    return pathFile;
  } catch {
    return null;
  }
}

function parseMultiplePlugins(text) {
  const cleanText = text.replace(/\s+(script|file)\s*$/i, '');
  const parts = cleanText.split('&').map(part => part.trim());
  const plugins = [];
  for (const part of parts) {
    if (part.length > 0) {
      const args = part.trim().split(/\s+/);
      plugins.push({
        name: args,
        option: args[1] || null
      });
    }
  }
  return plugins.slice(0, 3);
}

function getGlobalOption(text) {
  const match = text.match(/\s+(script|file)\s*$/i);
  return match ? match.toLowerCase() : null;[1]
}

let handler = async (m, { text, usedPrefix, command, __dirname, conn }) => {
  const userId = m.sender;
  const groupId = m.chat;
  const isPlugin = /p(lugin)?/i.test(command);
  const nomeDelBot = conn.user?.name || global.db?.data?.nomedelbot || 'ChatUnity';
  
  if (!text) {
    throw global.t('getNoInput', userId, groupId);
  }
  
  if (isPlugin && text.includes('&')) {
    const plugins = parseMultiplePlugins(text);
    const globalOption = getGlobalOption(text);
    
    if (plugins.length === 0) {
      throw global.t('getNoPluginFound', userId, groupId);
    }
    
    if (globalOption) {
      plugins.forEach(plugin => {
        if (!plugin.option) {
          plugin.option = globalOption;
        }
      });
    }
    
    const hasAllOptions = plugins.every(p => p.option);
    
    if (!hasAllOptions) {
      if (global.getMultiFileData) {
        delete global.getMultiFileData;
      }
      const basePluginString = plugins.map(p => p.name).join(' & ');
      global.getMultiFileData = {
        chat: m.chat,
        plugins: plugins,
        dirname: __dirname,
        sender: m.sender,
        baseString: basePluginString
      };
      const pluginList = plugins.map((p, i) => `${i + 1}. ${p.name}`).join('\n');
      const buttons = [
        [global.t('getMultiScriptBtn', userId, groupId), `${usedPrefix + command} ${basePluginString} script`],
        [global.t('getMultiFileBtn', userId, groupId), `${usedPrefix + command} ${basePluginString} file`]
      ];
      return await conn.sendButton(m.chat, global.t('getMultiSelect', userId, groupId, { pluginList }), nomeDelBot, null, buttons, m);
    }
    
    let successCount = 0;
    const results = [];
    
    for (const [index, pluginData] of plugins.entries()) {
      try {
        const filename = pluginData.name.replace(/plugin(s)?\//i, '') + (/\.js$/i.test(pluginData.name) ? '' : '.js');
        const foundPath = await findFile(filename, true, __dirname);
        if (foundPath) {
          results.push({
            index: index + 1,
            filename: filename,
            path: foundPath,
            option: pluginData.option,
            success: true
          });
          successCount++;
        } else {
          results.push({
            index: index + 1,
            filename: filename,
            success: false,
            error: `Plugin "${pluginData.name}" non trovato`
          });
        }
      } catch (error) {
        results.push({
          index: index + 1,
          filename: pluginData.name,
          success: false,
          error: error.message
        });
      }
    }
    
    const resultText = results.map(r => 
      r.success ? `✅ ${r.index}. ${r.filename}` : `❌ ${r.index}. ${r.error}`
    ).join('\n');
    
    await conn.sendMessage(m.chat, {
      text: global.t('getMultiResult', userId, groupId, { successCount, total: plugins.length, results: resultText }),
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
    
    for (const result of results.filter(r => r.success)) {
      try {
        await processFile(result.path, result.filename, result.option, true, m, conn, result.index, userId, groupId, nomeDelBot);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        await conn.sendMessage(m.chat, {
          text: global.t('getProcessError', userId, groupId, { filename: result.filename, error: error.message }),
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
    return;
  }
  
  const args = text.split(' ');
  
  if (args.length < 2) {
    const fileArg = args;
    let filename;
    if (isPlugin) {
      filename = fileArg.replace(/plugin(s)?\//i, '') + (/\.js$/i.test(fileArg) ? '' : '.js');
    } else {
      filename = path.basename(fileArg);
    }
    if (global.getFileData) {
      delete global.getFileData;
    }
    const buttons = [
      [global.t('getScriptBtn', userId, groupId), `${usedPrefix + command} ${text} script`],
      [global.t('getFileBtn', userId, groupId), `${usedPrefix + command} ${text} file`]
    ];
    return await conn.sendButton(m.chat, global.t('getFileSelect', userId, groupId, { filename }), nomeDelBot, null, buttons, m);
  }
  
  const option = args.toLowerCase();[1]
  const fileArg = args;
  let filename, pathFile;
  
  if (isPlugin) {
    filename = fileArg.replace(/plugin(s)?\//i, '') + (/\.js$/i.test(fileArg) ? '' : '.js');
    pathFile = path.join(__dirname, filename);
  } else {
    filename = path.basename(fileArg);
    pathFile = fileArg;
  }
  
  const foundPath = await findFile(filename, isPlugin, __dirname);
  
  if (!foundPath) {
    let allFiles;
    if (isPlugin) {
      try {
        allFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));
      } catch {
        allFiles = fs.readdirSync('plugins').filter(file => file.endsWith('.js'));
      }
    } else {
      const dir = path.dirname(pathFile);
      try {
        allFiles = fs.readdirSync(dir);
      } catch {
        throw global.t('getDirNotFound', userId, groupId, { dir });
      }
    }
    const searchName = isPlugin ? filename.replace('.js', '') : filename;
    const matches = findBestMatches(searchName, allFiles, isPlugin);
    if (matches.length === 0) {
      const type = isPlugin ? 'plugin' : 'file';
      throw global.t('getNoSimilar', userId, groupId, { type, name: searchName });
    }
    if (matches.length === 1 && matches.score > 0.7) {
      global.getFileData = {
        chat: m.chat,
        filename: matches.file,
        option: option,
        isPlugin: isPlugin,
        dirname: __dirname,
        sender: m.sender,
        autoConfirm: true
      };
      return conn.sendMessage(m.chat, {
        text: global.t('getFoundConfirm', userId, groupId, { filename: matches.filename, score: Math.round(matches.score * 100) }),
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
    global.getFileData = {
      chat: m.chat,
      options: matches,
      option: option,
      isPlugin: isPlugin,
      dirname: __dirname,
      sender: m.sender,
      isMultipleChoice: true
    };
    const optionsText = matches.map((item, index) => 
      `${index + 1}. ${item.filename} (${Math.round(item.score * 100)}%)`
    ).join('\n');
    return conn.sendMessage(m.chat, {
      text: global.t('getMultiChoice', userId, groupId, { name: searchName, options: optionsText }),
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
  
  await processFile(foundPath, filename, option, isPlugin, m, conn, null, userId, groupId, nomeDelBot);
};

async function processFile(pathFile, filename, option, isPlugin, m, conn, index = null, userId, groupId, nomeDelBot) {
  const header = "//Plugin fatto da Gabs333 x Staff ChatUnity\n";
  const prefix = index ? `[${index}] ` : '';
  
  try {
    const isJS = /\.js$/i.test(filename);
    let fileContent;
    if (isJS) {
      fileContent = await _fs.readFile(pathFile, 'utf8');
    } else {
      fileContent = await _fs.readFile(pathFile);
    }
    
    if (option === 'file') {
      if (isJS) {
        const contentToSend = header + fileContent;
        await conn.sendMessage(m.chat, {
          document: Buffer.from(contentToSend, 'utf8'),
          mimetype: 'application/javascript',
          fileName: filename,
          caption: global.t('getFileSuccess', userId, groupId, { prefix, filename, type: isPlugin ? 'plugin' : 'file' }),
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
      } else {
        await conn.sendMessage(m.chat, {
          document: fileContent,
          fileName: filename,
          caption: global.t('getFileSuccess', userId, groupId, { prefix, filename, type: 'file' }),
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
    } else if (option === 'script') {
      if (!isJS) throw global.t('getScriptOnlyJS', userId, groupId);
      await conn.sendMessage(m.chat, {
        text: global.t('getScriptSuccess', userId, groupId, { prefix, filename, content: fileContent }),
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
    } else {
      throw global.t('getInvalidOption', userId, groupId);
    }
    
    if (isJS) {
      const error = syntaxError(fileContent, filename, {
        sourceType: 'module',
        allowReturnOutsideFunction: true,
        allowAwaitOutsideFunction: true
      });
      if (error) {
        await conn.sendMessage(m.chat, {
          text: global.t('getSyntaxError', userId, groupId, { prefix, filename, error }),
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
  } catch (err) {
    await conn.sendMessage(m.chat, {
      text: global.t('getFileError', userId, groupId, { prefix, filename, error: err }),
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
  if (!global.getFileData) return;
  if (m.chat !== global.getFileData.chat) return;
  if (m.sender !== global.getFileData.sender) return;
  const userId = m.sender;
  const groupId = m.chat;
  const nomeDelBot = conn.user?.name || global.db?.data?.nomedelbot || 'ChatUnity';
  const response = m.text.toLowerCase().trim();
  
  if (global.getFileData.isMultipleChoice) {
    const choice = parseInt(response);
    if (choice >= 1 && choice <= global.getFileData.options.length) {
      const selectedFile = global.getFileData.options[choice - 1];
      try {
        let pathFile;
        if (global.getFileData.isPlugin) {
          pathFile = path.join(global.getFileData.dirname, selectedFile.file);
        } else {
          pathFile = selectedFile.file;
        }
        await processFile(pathFile, selectedFile.file, global.getFileData.option, global.getFileData.isPlugin, m, conn, null, userId, groupId, nomeDelBot);
        delete global.getFileData;
        return true;
      } catch (error) {
        await conn.sendMessage(m.chat, {
          text: global.t('getGenericError', userId, groupId, { error: error.message }),
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
        delete global.getFileData;
        return true;
      }
    }
    if (response === 'no') {
      await conn.sendMessage(m.chat, {
        text: global.t('getOperationCancelled', userId, groupId),
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
      delete global.getFileData;
      return true;
    }
    return;
  }
  
  if (response === 'si' || response === 'sì' || response === 'yes') {
    try {
      let pathFile;
      if (global.getFileData.isPlugin) {
        pathFile = path.join(global.getFileData.dirname, global.getFileData.filename);
      } else {
        pathFile = global.getFileData.filename;
      }
      await processFile(pathFile, global.getFileData.filename, global.getFileData.option, global.getFileData.isPlugin, m, conn, null, userId, groupId, nomeDelBot);
      delete global.getFileData;
      return true;
    } catch (error) {
      await conn.sendMessage(m.chat, {
        text: global.t('getGenericError', userId, groupId, { error: error.message }),
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
      delete global.getFileData;
      return true;
    }
  }
  
  if (response === 'no') {
    await conn.sendMessage(m.chat, {
      text: global.t('getOperationCancelled', userId, groupId),
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
    delete global.getFileData;
    return true;
  }
};

handler.help = ['getplugin <nome file>', 'getfile <percorso file>', 'getplugin <plugin1> & <plugin2> & <plugin3>'];
handler.tags = ['owner'];
handler.command = /^g(et)?(p(lugin)?|f(ile)?)$/i;
handler.rowner = true;

export default handler;