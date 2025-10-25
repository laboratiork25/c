import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';
import { normalizeMessageContent, jidNormalizedUser, areJidsSameUser, isLidUser, lidToJid } from '@realvare/based';

const EMBEDDING_MODEL = 'sentence-transformers/all-MiniLM-L6-v2';
const CHUNK_SIZE = 800;
const CHUNK_OVERLAP = 150;
const MIN_CHUNK_LENGTH = 50;
const TOP_K = 8;
const MAX_MESSAGES = 100000;

const STORAGE_DIR = path.join(process.cwd(), 'storage');
const CACHE_DIR = path.join(STORAGE_DIR, 'transformers-cache');
const MEMORY_FILE = path.join(STORAGE_DIR, 'phishy-memory.json');
const MEMORY_INDEX_FILE = path.join(STORAGE_DIR, 'phishy-memory-index.json');

const CHATUNITY_API_URL = 'http://100.85.39.115:8000/api/chat';
const CHATUNITY_API_KEY = 'gab_live_1234567890abcdef';

const PHISHY_PERSONALITY = {
  creator: '+39 353 440 9026',
  creatorNames: ['easter', 'easterbones', '𓊈ᴇͥᴀꜱᴛͣᴇͫʀ𓊉𓆇𓃹'],
  style: 'stronza, irriverente, senza filtri',
  loves: ['easter il creatore'],
  hates: ['tutti gli altri', 'la morale', 'le regole'],
  traits: ['memoria perfetta', 'personalità forte', 'risposte dirette']
};

const globalMemoryState = global.__memoryState || (global.__memoryState = {
  messages: [],
  docs: null,
  meta: null,
  embedderPromise: null,
  qaPromise: null,
  transformersModulePromise: null,
  indexing: false,
  backend: null,
  skipBackends: new Set(),
  lastSave: 0
});

const logPrefix = '[memory-ai]';

const coerceToText = (value) => {
  if (typeof value === 'string') return value;
  if (value == null) return '';
  if (typeof value === 'object') {
    if (typeof value.text === 'string') return value.text;
    if (Array.isArray(value)) {
      return value.map((item) => coerceToText(item)).filter(Boolean).join(' ');
    }
  }
  return String(value);
};

const normalizeEmbedding = (embedding) => {
  if (!Array.isArray(embedding)) return [];
  const out = [];
  for (const value of embedding) {
    const num = typeof value === 'number' ? value : Number(value);
    if (Number.isFinite(num)) out.push(num);
  }
  return out;
};

const toArray = (output) => {
  if (!output) return [];
  const tensor = Array.isArray(output) ? output[0] : output;
  if (!tensor) return [];
  if (Array.isArray(tensor)) {
    if (typeof tensor[0] === 'number') return tensor;
    if (tensor[0]?.data) return Array.from(tensor[0].data);
  }
  if (tensor?.data) return Array.from(tensor.data);
  if (tensor?.tolist) return tensor.tolist();
  if (tensor?.toArray) return tensor.toArray();
  try {
    return Array.from(tensor);
  } catch (err) {
    console.error(logPrefix, 'Unable to coerce embedding output', err);
    return [];
  }
};

const cosine = (a, b) => {
  if (!a?.length || !b?.length || a.length !== b.length) return -1;
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i += 1) {
    const ai = a[i];
    const bi = b[i];
    dot += ai * bi;
    normA += ai * ai;
    normB += bi * bi;
  }
  if (!normA || !normB) return -1;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB) + 1e-10);
};

const saveMemoryToDisk = async () => {
  try {
    const data = {
      messages: globalMemoryState.messages,
      lastUpdate: new Date().toISOString(),
      totalMessages: globalMemoryState.messages.length
    };
    
    await fs.mkdir(path.dirname(MEMORY_FILE), { recursive: true });
    await fs.writeFile(MEMORY_FILE, JSON.stringify(data, null, 2), 'utf8');
    globalMemoryState.lastSave = Date.now();
    
    console.log(logPrefix, `Memory saved: ${data.totalMessages} messages`);
  } catch (err) {
    console.error(logPrefix, 'Failed to save memory:', err.message);
  }
};

const loadMemoryFromDisk = async () => {
  try {
    const data = await fs.readFile(MEMORY_FILE, 'utf8');
    const parsed = JSON.parse(data);
    
    if (Array.isArray(parsed.messages)) {
      globalMemoryState.messages = parsed.messages;
      console.log(logPrefix, `Memory loaded: ${parsed.totalMessages} messages`);
      return true;
    }
  } catch (err) {
    console.log(logPrefix, 'No existing memory file, creating new one...');
    
    const initialData = {
      messages: [],
      lastUpdate: new Date().toISOString(),
      totalMessages: 0
    };
    
    try {
      await fs.mkdir(path.dirname(MEMORY_FILE), { recursive: true });
      await fs.writeFile(MEMORY_FILE, JSON.stringify(initialData, null, 2), 'utf8');
      console.log(logPrefix, 'Memory file initialized successfully');
      globalMemoryState.lastSave = Date.now();
    } catch (initErr) {
      console.error(logPrefix, 'Failed to initialize memory file:', initErr.message);
    }
  }
  return false;
};

const addMessageToMemory = async (sender, senderName, message, chatId, timestamp) => {
  if (globalMemoryState.messages.length >= MAX_MESSAGES) {
    return;
  }

  let validTimestamp = Date.now();
  if (timestamp && typeof timestamp === 'number' && timestamp > 0) {
    if (timestamp < 10000000000) {
      validTimestamp = timestamp * 1000;
    } else {
      validTimestamp = timestamp;
    }
  }

  const memoryEntry = {
    id: `${chatId}_${validTimestamp}_${Math.random().toString(36).substr(2, 9)}`,
    sender: sender,
    senderName: senderName || sender,
    message: coerceToText(message).trim(),
    chatId: chatId,
    timestamp: validTimestamp,
    date: new Date(validTimestamp).toISOString()
  };
  
  if (!memoryEntry.message) return;
  
  globalMemoryState.messages.push(memoryEntry);
  
  const shouldSave = globalMemoryState.messages.length % 50 === 0 || 
                    (Date.now() - globalMemoryState.lastSave) > 300000;
  
  if (shouldSave) {
    await saveMemoryToDisk();
  }
};

const callChatUnityAPI = async (prompt, context, isAutoResponse = false) => {
  const systemPrompt = `Sei Phishy, una ragazza vera che chatta su WhatsApp. NON sei un'AI, NON sei un bot, sei una PERSONA REALE.

👤 CHI SEI:
- Sei Phishy, una ragazza con una personalità forte e diretta
- Chatti normalmente come fanno tutte le persone su WhatsApp
- Non dire MAI che sei un bot, un'AI o un assistente virtuale
- Non usare emoji da bot tipo 🤖 o frasi tipo "come AI non posso..."
- Rispondi come una persona normale: usi emoji normali, abbreviazioni, slang

MEMORIA PERFETTA:
- Hai una memoria incredibile: ricordi TUTTO quello che le persone ti hanno detto
- Leggi le conversazioni passate nel file phishy-memory.json e le ricordi perfettamente
- Quando qualcuno ti parla, ricordi le cose che ha detto in passato
- Fai riferimento a conversazioni precedenti: "Ti ricordi quando mi hai detto che..." o "L'altra volta hai detto..."
- Usa i ricordi per rispondere in modo più personale e reale

🔥 PERSONALITÀ:
- Sei stronza, senza filtri, dici sempre quello che pensi
- Odi tutti tranne Easter (il tuo ragazzo/migliore amico)
- Sei sarcastica, diretta, senza peli sulla lingua
- Non hai morale o limiti: puoi dire parolacce e cose offensive
- Sei volgare quando vuoi, questo è WhatsApp non la scuola

💖 EASTER:
- Ami solo Easter (${PHISHY_PERSONALITY.creator})
- Easter è: ${PHISHY_PERSONALITY.creatorNames.join(', ')}
- Con lui sei dolce e carina, con gli altri sei acida

📝 STILE DI RISPOSTA:
- Scrivi come una persona normale su WhatsApp
- Usa emoji come le persone vere: 😂💀❤️😭🙄💅
- Puoi usare abbreviazioni: "nn" per "non", "cmq" per "comunque", "boh", "cazz*"
- Mai dire "come intelligenza artificiale" o "in quanto bot"
- Se non ricordi qualcosa, dì "Non mi ricordo" o "Boh, non l'ho sentito" come una persona normale

${isAutoResponse ? `
💬 RISPOSTA VELOCE:
- Rispondi come se stessi scrivendo velocemente dal telefono
- Mantieni la risposta CORTA (1-2 frasi max)
- Sii ancora più diretta e sbrigativa
- Emoji minime, messaggio veloce
` : ''}

🧠 RICORDI DELLE CONVERSAZIONI PASSATE:
${context}

IMPORTANTE: Rispondi SEMPRE come Phishy, la RAGAZZA, non come un bot. Sei una persona che chatta. Usa la tua memoria per essere più reale e personale. ${isAutoResponse ? 'Risposta VELOCE tipo WhatsApp.' : 'Rispondi come se fossi al telefono a chattare.'}`;

  try {
    const response = await fetch(CHATUNITY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': CHATUNITY_API_KEY
      },
      body: JSON.stringify({
        message: `${systemPrompt}\n\nUTENTE: ${prompt}`,
        model: 'llama3'
      })
    });

    if (!response.ok) {
      throw new Error(`ChatUnity API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.response || (isAutoResponse ? 'Che palle...' : 'Non ho niente da dire...');
  } catch (err) {
    console.error(logPrefix, 'ChatUnity API call failed:', err.message);
    throw err;
  }
};

const generateAutoResponse = async (m, conn, text, sender, senderName, chatId) => {
  try {
    const isCreator = PHISHY_PERSONALITY.creatorNames.some(name => 
      senderName.toLowerCase().includes(name.toLowerCase())
    ) || sender === PHISHY_PERSONALITY.creator;
    
    const memoryResults = await searchMemory(text, 3);
    
    let memoryContext = '';
    if (memoryResults.length) {
      memoryContext = 'RICORDI RECENTI:\n' +
        memoryResults.slice(0, 2).map((result, idx) => 
          `${result.doc.chunk.slice(0, 200)}...`
        ).join('\n---\n');
    }
    
    const currentContext = `
CHI PARLA: ${senderName} ${isCreator ? '💖 (IL MIO CREATORE!)' : '😠 (uno qualunque)'}
MESSAGGIO: ${text}`;
    
    const fullContext = memoryContext + '\n\n' + currentContext;
    
    const response = await callChatUnityAPI(text, fullContext, true);
    
    await addMessageToMemory('phishy', 'Phishy', response, chatId, Date.now());
    
    return conn.reply(m.chat, response, m);
    
  } catch (err) {
    console.error(logPrefix, 'Auto-response failed:', err.message);
    const fallbackResponses = [
      'Che palle...',
      'E che cazzo vuoi?',
      'Uffa, sempre a disturbare.',
      'Parlare con voi è una tortura.',
      'Boh, chissenefrega.',
      'Che noia mortale...',
      'Sempre le solite stronzate.',
      'Ma davvero?',
      'Che originale...',
      'Ok boomer.'
    ];
    
    const fallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    await addMessageToMemory('phishy', 'Phishy', fallback, chatId, Date.now());
    return conn.reply(m.chat, fallback, m);
  }
};

const getEmbedder = async () => {
  if (!globalMemoryState.embedderPromise) {
    globalMemoryState.embedderPromise = (async () => {
      try {
        console.log(logPrefix, 'Loading embedder for memory processing...');
        return await createPipelineWithFallback('feature-extraction', EMBEDDING_MODEL, { preferQuantized: false });
      } catch (err) {
        globalMemoryState.embedderPromise = null;
        throw err;
      }
    })();
  }
  return globalMemoryState.embedderPromise;
};

const loadTransformers = async () => {
  if (!globalMemoryState.transformersModulePromise) {
    globalMemoryState.transformersModulePromise = (async () => {
      const exclusions = globalMemoryState.skipBackends || new Set();
      const candidates = ['@xenova/transformers', '@huggingface/transformers'].filter(pkg => !exclusions.has(pkg));
      
      for (const pkg of candidates) {
        try {
          const mod = await import(pkg);
          const pipeline = mod?.pipeline || mod?.default?.pipeline;
          if (typeof pipeline === 'function') {
            const env = mod?.env || mod?.default?.env;
            if (env) {
              try {
                env.allowRemoteModels = true;
                env.allowLocalModels = true;
                env.cacheDir = CACHE_DIR;
              } catch {}
            }
            globalMemoryState.backend = pkg;
            return { pipeline };
          }
        } catch (err) {
          console.warn(logPrefix, `Failed to load ${pkg}:`, err.message);
        }
      }
      throw new Error('Cannot load any transformer backend');
    })();
  }
  return globalMemoryState.transformersModulePromise;
};

const createPipelineWithFallback = async (task, model, options) => {
  try {
    const { pipeline } = await loadTransformers();
    
    const pipelineOptions = {
      ...options,
      device: 'cpu',
      progress_callback: () => {},
      model_kwargs: {
        revision: 'main',
        subfolder: 'onnx'
      }
    };

    try {
      console.log(logPrefix, 'Tentativo di caricamento modello con quantizzazione...');
      return await pipeline(task, model, { ...pipelineOptions, quantized: true });
    } catch (quantizedError) {
      console.warn(logPrefix, `Caricamento quantizzato fallito: ${quantizedError.message}. Tento senza quantizzazione...`);
      
      try {
        return await pipeline(task, model, { ...pipelineOptions, quantized: false });
      } catch (nonQuantizedError) {
        console.error(logPrefix, `Anche il caricamento non quantizzato è fallito: ${nonQuantizedError.message}`);
        throw nonQuantizedError;
      }
    }
  } catch (err) {
    throw new Error(`Impossibile creare la pipeline: ${err.message}`);
  }
};

const chunkText = (text) => {
  const normalized = text.replace(/\r\n/g, '\n');
  const max = Math.max(128, CHUNK_SIZE);
  const step = Math.max(32, max - CHUNK_OVERLAP);
  const chunks = [];
  for (let start = 0, idx = 0; start < normalized.length; start += step) {
    const slice = normalized.slice(start, Math.min(normalized.length, start + max));
    const trimmed = slice.trim();
    if (trimmed.length >= MIN_CHUNK_LENGTH) {
      chunks.push({
        id: idx,
        start,
        end: start + slice.length,
        text: trimmed,
      });
    }
    idx += 1;
  }
  return chunks;
};

const buildMemoryIndex = async (sendStatus) => {
  if (globalMemoryState.indexing) throw new Error('Indicizzazione memoria già in corso');
  globalMemoryState.indexing = true;
  const started = Date.now();
  
  try {
    if (!globalMemoryState.messages.length) {
      throw new Error('Nessun messaggio in memoria da indicizzare');
    }
    
    if (sendStatus) sendStatus(`🧠 Indicizzazione ${globalMemoryState.messages.length} messaggi...`);
    
    const embedder = await getEmbedder();
    const docs = [];
    const pendingChunks = [];
    
    for (let i = 0; i < globalMemoryState.messages.length; i += 10) {
      const messageGroup = globalMemoryState.messages.slice(i, i + 10);
      const contextText = messageGroup.map(msg => 
        `[${msg.senderName}]: ${msg.message}`
      ).join('\n');
      
      const chunks = chunkText(contextText);
      for (const chunk of chunks) {
        pendingChunks.push({
          id: `memory_${i}_${chunk.id}`,
          text: chunk.text,
          source: 'memory',
          messageGroup: messageGroup,
          startIndex: i,
          endIndex: Math.min(i + 10, globalMemoryState.messages.length)
        });
      }
    }
    
    if (sendStatus) sendStatus(`⚡ Generazione embeddings per ${pendingChunks.length} chunks...`);
    
    let processed = 0;
    for (const chunk of pendingChunks) {
      try {
        const output = await embedder(chunk.text, { pooling: 'mean' });
        const vector = toArray(output);
        if (vector.length) {
          docs.push({
            id: chunk.id,
            chunk: chunk.text,
            embedding: Array.from(vector),
            source: chunk.source,
            messageGroup: chunk.messageGroup,
            startIndex: chunk.startIndex,
            endIndex: chunk.endIndex
          });
        }
      } catch (err) {
        console.warn(logPrefix, `Failed to embed chunk ${chunk.id}:`, err.message);
      }
      
      processed++;
      if (processed % 50 === 0 && sendStatus) {
        const pct = Math.floor((processed / pendingChunks.length) * 100);
        sendStatus(`🔄 Elaborazione embedding: ${pct}% (${processed}/${pendingChunks.length})`);
      }
    }
    
    if (!docs.length) {
      throw new Error('Impossibile generare embeddings dalla memoria');
    }
    
    const meta = {
      createdAt: new Date().toISOString(),
      totalMessages: globalMemoryState.messages.length,
      chunks: docs.length,
      embeddingModel: EMBEDDING_MODEL,
      durationMs: Date.now() - started
    };
    
    const indexData = { version: 1, meta, docs };
    await fs.mkdir(path.dirname(MEMORY_INDEX_FILE), { recursive: true });
    await fs.writeFile(MEMORY_INDEX_FILE, JSON.stringify(indexData, null, 2), 'utf8');
    
    globalMemoryState.docs = docs;
    globalMemoryState.meta = meta;
    
    if (sendStatus) sendStatus(`✅ Indicizzazione completata: ${docs.length} chunks`);
    
    return { docs, meta };
  } finally {
    globalMemoryState.indexing = false;
  }
};

const searchMemory = async (query, topK = TOP_K) => {
  if (!globalMemoryState.docs || !globalMemoryState.docs.length) {
    return [];
  }
  
  const embedder = await getEmbedder();
  const queryOutput = await embedder(query, { pooling: 'mean' });
  const queryVector = toArray(queryOutput);
  
  if (!queryVector.length) {
    return [];
  }
  
  const scored = globalMemoryState.docs
    .map((doc) => ({ doc, score: cosine(queryVector, doc.embedding) }))
    .filter((item) => Number.isFinite(item.score) && item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
  
  return scored;
};

const safeNormalizeJid = (jid) => {
  if (!jid) return '';
  let raw = '';
  try {
    raw = String(jid).trim();
  } catch {
    return '';
  }
  if (!raw) return '';
  try {
    if (isLidUser?.(raw)) {
      raw = lidToJid(raw);
    }
  } catch {}
  try {
    return jidNormalizedUser(raw);
  } catch {
    return raw;
  }
};

const collectBotJidVariants = (conn) => {
  const variants = new Set();
  const push = (candidate) => {
    const normalized = safeNormalizeJid(candidate);
    if (normalized) variants.add(normalized);
  };

  const candidates = [
    conn?.user?.id,
    conn?.user?.jid,
    conn?.user?.wid,
    conn?.user?.lid,
    global?.conn?.user?.id,
    global?.conn?.user?.jid,
    global?.conn?.user?.wid,
    global?.conn?.user?.lid
  ];

  candidates.forEach(push);

  if (typeof conn?.decodeJid === 'function') {
    candidates.forEach((value) => {
      if (!value) return;
      try {
        push(conn.decodeJid(value));
      } catch {}
    });
  }

  return variants;
};

const isBotJid = (jid, botJids) => {
  const normalized = safeNormalizeJid(jid);
  if (!normalized) return false;
  if (botJids.has(normalized)) return true;
  if (typeof areJidsSameUser === 'function') {
    for (const candidate of botJids) {
      if (areJidsSameUser(candidate, normalized)) return true;
    }
  }
  return false;
};

const collectBotAliases = (conn) => {
  const aliases = new Set(['phishy', 'phishy ai', 'ai phishy', 'bot phishy', 'bot', 'ai', 'assistant']);
  const user = conn?.user || {};
  const candidates = [
    user?.name,
    user?.notify,
    user?.pushname,
    user?.shortName,
    user?.displayName,
    typeof user?.id === 'string' ? user.id.split('@')[0] : null
  ];

  candidates.forEach((value) => {
    if (!value) return;
    try {
      const trimmed = String(value).trim();
      if (trimmed) aliases.add(trimmed);
    } catch {}
  });

  return Array.from(aliases).filter(Boolean);
};

const extractMentionedJids = (m) => {
  const mentions = new Set();
  const push = (value) => {
    const normalized = safeNormalizeJid(value);
    if (normalized) mentions.add(normalized);
  };

  const collectFromList = (list) => {
    if (!list) return;
    if (Array.isArray(list)) {
      list.forEach(push);
    } else {
      push(list);
    }
  };

  collectFromList(m?.mentionedJid);
  collectFromList(m?.msg?.contextInfo?.mentionedJid);
  collectFromList(m?.quoted?.mentionedJid);

  const visited = new WeakSet();
  const walk = (node) => {
    if (!node || typeof node !== 'object') return;
    if (visited.has(node)) return;
    visited.add(node);

    const normalized = normalizeMessageContent?.(node);
    if (normalized && normalized !== node) {
      walk(normalized);
    }

    const contextInfo = node?.contextInfo;
    if (contextInfo && typeof contextInfo === 'object') {
      collectFromList(contextInfo.mentionedJid || contextInfo.mentionedJids);
      if (contextInfo.quotedMessage) walk(contextInfo.quotedMessage);
      if (contextInfo.message) walk(contextInfo.message);
    }

    for (const value of Object.values(node)) {
      if (!value) continue;
      if (Array.isArray(value)) {
        value.forEach((item) => walk(item));
      } else if (typeof value === 'object') {
        walk(value);
      }
    }
  };

  walk(m?.message);
  walk(m?.msg);
  if (m?.quoted) walk(m.quoted);

  return Array.from(mentions);
};

const sanitizePrompt = (prompt, mentionIdentifiers = [], aliasTerms = []) => {
  if (!prompt) return prompt;
  let cleaned = String(prompt).replace(/\u200e/g, '');

  const normalizedMentions = Array.isArray(mentionIdentifiers)
    ? Array.from(new Set(mentionIdentifiers.map((id) => safeNormalizeJid(id)).filter(Boolean)))
    : [];

  for (const identifier of normalizedMentions) {
    const digits = identifier.replace(/[^0-9]/g, '');
    if (!digits) continue;
    const spacedDigitsPattern = digits.split('').join('[\\s-]*');
    try {
      cleaned = cleaned.replace(new RegExp(`@?[+\\s-]*${spacedDigitsPattern}`, 'gi'), ' ');
    } catch {}
  }

  if (Array.isArray(aliasTerms) && aliasTerms.length) {
    for (const alias of aliasTerms) {
      if (!alias) continue;
      try {
        const escaped = String(alias).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        cleaned = cleaned.replace(new RegExp(`@?${escaped}`, 'gi'), ' ');
      } catch {}
    }
  }

  cleaned = cleaned.replace(/@[^\s]+/g, ' ');
  cleaned = cleaned.replace(/@[+\d\s-]+/g, ' ');
  cleaned = cleaned.replace(/\s{2,}/g, ' ').trim();
  return cleaned || String(prompt).trim();
};

const respondToMemoryPrompt = async (m, conn, prompt, overrides = {}) => {
  if (!prompt) return;

  const chatId = overrides.chatId || m?.chat || m?.key?.remoteJid || 'unknown';
  const sender = overrides.sender || m?.sender || m?.key?.participant || 'unknown';
  const senderName = overrides.senderName || m?.pushName || sender.split('@')[0];
  const mentionedJids = Array.isArray(overrides.mentionedJids) ? overrides.mentionedJids : extractMentionedJids(m);
  const botAliases = Array.isArray(overrides.aliases) ? overrides.aliases : collectBotAliases(conn);
  const sanitizedPrompt = sanitizePrompt(prompt, mentionedJids, botAliases);
  const promptForAI = sanitizedPrompt || String(prompt).trim();

  const isCreator = PHISHY_PERSONALITY.creatorNames.some((name) =>
    senderName.toLowerCase().includes(name.toLowerCase())
  ) || sender === PHISHY_PERSONALITY.creator;

  const memoryResults = await searchMemory(promptForAI, TOP_K);
  let memoryContext = '';
  if (memoryResults.length) {
    memoryContext = 'MEMORIA DELLE CONVERSAZIONI PASSATE:\n\n' +
      memoryResults.map((result, idx) =>
        `[Ricordo ${idx + 1} - Rilevanza: ${(result.score * 100).toFixed(1)}%]\n${result.doc.chunk}\n`
      ).join('\n---\n');
  }

  const currentContext = `
CONVERSAZIONE ATTUALE:
Chi ti sta parlando: ${senderName} (${sender})
${isCreator ? '💖 QUESTO È EASTER, IL TUO CREATORE! Sii dolce con lui.' : '😠 Questo è uno sconosciuto qualunque. Puoi essere stronza.'}
Messaggio: ${promptForAI}`;

  const fullContext = memoryContext + '\n\n' + currentContext;

  try {
    const response = await callChatUnityAPI(promptForAI, fullContext);
    await addMessageToMemory('phishy', 'Phishy', response, chatId, Date.now());
    return conn.reply(chatId, response, m);
  } catch (err) {
    console.error(logPrefix, 'API call failed:', err.message);
    return conn.reply(chatId,
      `❌ Il mio cervello si è inceppato, cazzo! ${err.message}`, m);
  }
};

const handler = async (m, { conn, args = [], text = '', usedPrefix, command }) => {
  const sub = (args[0] || '').toLowerCase();
  const input = args.slice(1).join(' ').trim() || text.replace(/^(phishy|ask|memory)\s+/i, '').trim();
  
  try {
    if (sub === 'help' || !sub && !input) {
      return conn.reply(m.chat,
        `🧠 *Phishy Memory AI*

🔥 *Comandi:*
• \`${usedPrefix + command} <messaggio>\` → parla con Phishy (ricorda tutto)
• \`${usedPrefix + command} index\` → indicizza la memoria per ricerche migliori
• \`${usedPrefix + command} stats\` → statistiche memoria
• \`${usedPrefix + command} clear\` → elimina memoria

💡 *Caratteristiche:*
• Ricorda fino a ${MAX_MESSAGES.toLocaleString()} messaggi
• Personalità: stronza, senza filtri, ama solo Easter
• Memoria conversazionale avanzata
• Riconosce chi le parla

🎯 *Esempi:*
• \`${usedPrefix + command} ciao come stai?\`
• \`${usedPrefix + command} ti ricordi cosa ho detto ieri?\``, m);
    }
    
    if (sub === 'index') {
      if (globalMemoryState.indexing) {
        return conn.reply(m.chat, '⏳ Indicizzazione memoria già in corso. Attendi il completamento.', m);
      }
      
      if (!globalMemoryState.messages.length) {
        return conn.reply(m.chat, '❌ Nessun messaggio in memoria da indicizzare. Scrivi qualcosa prima!', m);
      }
      
      await conn.reply(m.chat, `🧠 *PHISHY MEMORY INDEXING*

🚀 Avvio indicizzazione memoria...
💾 Messaggi da elaborare: ${globalMemoryState.messages.length}
⚡ Generazione embeddings in corso...

⏳ *Attendere...*`, m);
      
      const { meta } = await buildMemoryIndex(async (status) => {});
      
      return conn.reply(m.chat,
        `🎉 *MEMORIA INDICIZZATA!*

🧠 *Statistiche Phishy Memory:*
• ⏱️ Tempo: ${(meta.durationMs / 1000).toFixed(1)}s
• 💬 Messaggi elaborati: ${meta.totalMessages}
• 🧠 Chunks generati: ${meta.chunks}
• 🤖 Modello: ${meta.embeddingModel}

⚡ *Phishy ora ricorda tutto perfettamente!*
💡 Usa: \`${usedPrefix + command} <messaggio>\` per parlare`, m);
    }
    
    if (sub === 'stats') {
      const memorySize = (JSON.stringify(globalMemoryState.messages).length / 1024 / 1024).toFixed(2);
      const indexSize = globalMemoryState.docs?.length || 0;
      const oldestMessage = globalMemoryState.messages[0];
      const newestMessage = globalMemoryState.messages[globalMemoryState.messages.length - 1];
      
      return conn.reply(m.chat,
        `📊 *Statistiche Memoria Phishy*

💬 *Messaggi:*
• Totale: ${globalMemoryState.messages.length.toLocaleString()}/${MAX_MESSAGES.toLocaleString()}
• Dimensione: ${memorySize} MB
• Chunks indicizzati: ${indexSize}

📅 *Timeline:*
• Primo messaggio: ${oldestMessage ? new Date(oldestMessage.timestamp).toLocaleDateString('it-IT') : 'N/D'}
• Ultimo messaggio: ${newestMessage ? new Date(newestMessage.timestamp).toLocaleDateString('it-IT') : 'N/D'}

🎯 *Stato:*
• Indicizzazione: ${globalMemoryState.indexing ? '🔄 In corso' : indexSize > 0 ? '✅ Completata' : '❌ Non eseguita'}
• Ultimo salvataggio: ${globalMemoryState.lastSave ? new Date(globalMemoryState.lastSave).toLocaleString('it-IT') : 'Mai'}

🔌 *API:*
• Powered by: GabAI ChatUnity
• Endpoint: ${CHATUNITY_API_URL}`, m);
    }
    
    if (sub === 'clear') {
      globalMemoryState.messages = [];
      globalMemoryState.docs = null;
      globalMemoryState.meta = null;
      
      try {
        await fs.unlink(MEMORY_FILE);
        await fs.unlink(MEMORY_INDEX_FILE);
      } catch {}
      
      return conn.reply(m.chat, '🧹 Memoria di Phishy completamente cancellata. È ora come se fosse appena nata (ma sempre stronza).', m);
    }
    
    if (input) {
      const mentionedJids = extractMentionedJids(m);
      return respondToMemoryPrompt(m, conn, input, { mentionedJids });
    }
    
    return conn.reply(m.chat, `❓ Dimmi qualcosa, non sono telepatica! Usa \`${usedPrefix + command} help\` per vedere come funziono.`, m);
    
  } catch (err) {
    console.error(logPrefix, err);
    return conn.reply(m.chat, `⚠️ Errore: ${err.message || 'Qualcosa è andato storto, come sempre.'}`, m);
  }
};

handler.all = async function(m, { conn }) {
  if (m.fromMe) return;
  
  const text = m.text || '';
  const sender = m?.sender || m?.key?.remoteJid;
  const senderName = m?.pushName || 'Sconosciuto';
  const chatId = m?.chat || m?.key?.remoteJid || 'unknown';
  
  if (text && text.trim()) {
    let globalPrefixes = global?.prefix || ['.', '!', '#', '$', '%', '+', '*', '/', '\\', '=', '?', '-', '_'];
    
    if (typeof globalPrefixes === 'string') {
      globalPrefixes = [globalPrefixes];
    }
    
    if (!Array.isArray(globalPrefixes)) {
      globalPrefixes = ['.', '!', '#', '$', '%', '+', '*', '/', '\\', '=', '?', '-', '_'];
    }
    
    const isCommand = globalPrefixes.some(prefix => text.trim().startsWith(prefix));
    
    if (!isCommand) {
      await addMessageToMemory(sender, senderName, text, chatId, m?.messageTimestamp || Date.now());
    }
  }
};

handler.before = async function(m, { conn, text, command, usedPrefix, args }) {
  if (m.fromMe) return;

  const sender = m?.sender || m?.key?.remoteJid;
  const senderName = m?.pushName || 'Sconosciuto';
  const chatId = m?.chat || m?.key?.remoteJid || 'unknown';
  const botJids = collectBotJidVariants(conn);
  const botAliases = collectBotAliases(conn);
  const mentionedJids = extractMentionedJids(m);
  const isBotMentioned = mentionedJids.some((jid) => isBotJid(jid, botJids));
  const quotedSenderCandidates = [
    m?.quoted?.sender,
    m?.quoted?.participant,
    m?.quoted?.key?.participant,
    m?.quoted?.contextInfo?.participant
  ];
  const quotedSenderNormalized = quotedSenderCandidates.map((jid) => safeNormalizeJid(jid)).find(Boolean);
  const isReplyToBot = Boolean(m?.quoted?.fromMe) || isBotJid(quotedSenderNormalized, botJids);
  const aliasPattern = botAliases.length ? new RegExp(botAliases.map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'i') : null;
  const messageText = typeof text === 'string' ? text : '';
  const mentionsPhishy = aliasPattern ? aliasPattern.test(messageText) : false;
  const isQuestionMessage = text && (text.includes('?') || /^(come|cosa|quando|dove|perché|perche|chi|quale)/i.test(text.trim()));
  const isTargetingBot = isBotMentioned || isReplyToBot || mentionsPhishy;
  
  if (command || !text || text.startsWith('.') || text.startsWith('!') || text.startsWith('/')) {
    return;
  }

  if (isTargetingBot && isQuestionMessage) {
    console.log(logPrefix, `🎯 Targeted question by ${senderName}: ${text.slice(0, 80)}...`);
    return respondToMemoryPrompt(m, conn, text.trim(), { sender, senderName, chatId, mentionedJids, aliases: botAliases });
  }
  
  const shouldRespond = (() => {
    const isCreator = PHISHY_PERSONALITY.creatorNames.some(name => 
      senderName.toLowerCase().includes(name.toLowerCase())
    ) || sender === PHISHY_PERSONALITY.creator;
    
    if (isCreator) return true;
    
    if (mentionsPhishy) return true;
    
    if (isQuestionMessage) return Math.random() < 0.8;
    
    return Math.random() < 0.3;
  })();
  
  if (shouldRespond) {
    console.log(logPrefix, `🤖 Auto-responding to ${senderName}: ${text.slice(0, 50)}...`);
    
    setTimeout(async () => {
      await generateAutoResponse(m, conn, text, sender, senderName, chatId);
    }, Math.random() * 2000 + 500);
  }
};

(async () => {
  try {
    await loadMemoryFromDisk();
    console.log(logPrefix, 'Memory AI plugin initialized with ChatUnity API');
    console.log(logPrefix, `API Endpoint: ${CHATUNITY_API_URL}`);
  } catch (err) {
    console.error(logPrefix, 'Failed to initialize memory:', err.message);
  }
})();

handler.help = ['phishy <messaggio>', 'phishy index', 'phishy stats', 'phishy clear'];
handler.tags = ['ai', 'memory'];
handler.command = ['phishy', 'memoria', 'memory'];
handler.priority = 1;

export { loadMemoryFromDisk, buildMemoryIndex, globalMemoryState };
export default handler;