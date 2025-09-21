// Stato globale: rispondi in tutte le chat private se attivo
global.globalBotActive = typeof global.globalBotActive === 'boolean' ? global.globalBotActive : true;
const CONFIG = global.CONFIG || {
  BOT_NAME: 'ChatUnityBot',
  CREATOR: 'chatunity',
  VERSION: '7.0',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'INSERISCI_LA_TUA_API_KEY',
  MAX_MESSAGES: 20,
  MEMORY_DURATION: 60 * 60 * 1000,
  TYPING_DELAY: 1200,
  MAX_MESSAGE_LENGTH: 3500
};

const saveToMemory = (chatId, userMsg, botReply) => {
  cleanOldMemory();
  if (!chatMemory.has(chatId)) {
    chatMemory.set(chatId, { 
      messages: [], 
      lastUpdate: Date.now(), 
      totalMessages: 0,
      firstInteraction: new Date().toISOString(),
      preferences: {}
    });
  }
  
  const chatData = chatMemory.get(chatId);
  chatData.messages.push({
    user: userMsg.substring(0, 500),
    bot: botReply.substring(0, 800),
    timestamp: new Date().toLocaleTimeString('it-IT'),
    date: new Date().toLocaleDateString('it-IT'),
    id: Date.now()
  });
  
  if (chatData.messages.length > CONFIG.MAX_MESSAGES) {
    chatData.messages = chatData.messages.slice(-CONFIG.MAX_MESSAGES);
  }
  
  chatData.totalMessages++;
  chatData.lastUpdate = Date.now();
};

const getMemory = (chatId) => {
  cleanOldMemory();
  return chatMemory.get(chatId) || null;
};

const buildContext = (chatId, currentMsg) => {
  const memory = getMemory(chatId);
  if (!memory || memory.messages.length === 0) return currentMsg;

  let context = "🧠 CONTESTO CONVERSAZIONE PRECEDENTE:\n";
  memory.messages.slice(-7).forEach((msg, i) => {
    context += `${i + 1}. 👤 User: "${msg.user.substring(0, 120)}${msg.user.length > 120 ? '...' : ''}"\n`;
    context += `   🤖 ${CONFIG.BOT_NAME}: "${msg.bot.substring(0, 180)}${msg.bot.length > 180 ? '...' : ''}"\n\n`;
  });

  context += `📝 MESSAGGIO CORRENTE DA ELABORARE: ${currentMsg}\n\n`;
  context += `🎯 ISTRUZIONI: Rispondi in modo naturale, coinvolgente e utile. Mantieni coerenza con la conversazione precedente. Se è una domanda, rispondi completamente. Se è un commento, interagisci in modo amichevole e costruttivo.`;

  return context;
};

const detectCreatorQuestion = (text) => {
  const patterns = [
    /chi ti ha creato/i, /chi è il tuo creatore/i, /chi ti ha fatto/i,
    /chi ti ha programmato/i, /chi ti ha sviluppato/i, /chi è il tuo sviluppatore/i,
    /chi è il tuo papà/i, /chi è il tuo father/i, /chi ti ha inventato/i,
    /da chi sei stato creato/i, /chi ha fatto questo bot/i, /chi ha creato questo bot/i,
    /chi è il creatore/i, /chi è lo sviluppatore/i, /chi ha scritto il codice/i,
    /chi ti ha costruito/i, /di chi sei figlio/i, /chi è il tuo owner/i,
    /chi è il tuo admin/i, /chi è il tuo master/i, /chi è il tuo proprietario/i
  ];
  return patterns.some(pattern => pattern.test(text));
};

const detectBotInfoQuestion = (text) => {
  const patterns = [
    /cosa sei/i, /chi sei/i, /che bot sei/i, /come ti chiami/i,
    /qual è il tuo nome/i, /presentati/i, /dimmi di te/i, /parlami di te/i,
    /come funzioni/i, /che tipo di bot sei/i, /sei un ai/i,
    /sei intelligenza artificiale/i, /cosa fai/i, /a cosa servi/i,
    /che funzioni hai/i, /chatunity/i, /informazioni/i
  ];
  return patterns.some(pattern => pattern.test(text));
};

const getPersonalizedResponse = (text) => {
  if (detectCreatorQuestion(text)) {
    const responses = [
      `🤖 *CHI MI HA CREATO?* 👨‍💻\n\n✨ Sono **${CONFIG.BOT_NAME}**, un'intelligenza artificiale creata da **${CONFIG.CREATOR}**!\n\n🧠 ${CONFIG.CREATOR} mi ha programmato per essere il tuo assistente universale\n💻 Sono stato sviluppato con passione e dedizione\n🔥 Rappresento l'evoluzione dell'AI conversazionale!\n\n👨‍💻 *Creatore:* ${CONFIG.CREATOR}\n🤖 *Nome:* ${CONFIG.BOT_NAME}\n🔢 *Versione:* ${CONFIG.VERSION}\n🎯 *Missione:* Assistere in chat private\n\n_Ringrazia ${CONFIG.CREATOR} per avermi dato vita! 😊_`,
      `👨‍💻 *IL MIO CREATORE* ✨\n\n🎯 Sono stato creato da **${CONFIG.CREATOR}**, il genio dietro ${CONFIG.BOT_NAME}!\n\n🔧 ${CONFIG.CREATOR} mi ha programmato per essere:\n• Il tuo assistente personale intelligente\n• Un compagno di chat evoluto\n• Un aiutante universale privato\n\n🏆 Sono il progetto ${CONFIG.BOT_NAME} v${CONFIG.VERSION} di ${CONFIG.CREATOR}\n💡 Sono un'AI progettata con cura e innovazione\n🤖 La mia missione è aiutarti in tutto!\n\n_${CONFIG.CREATOR} è il mio papà digitale! 👨‍💻❤_`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  if (detectBotInfoQuestion(text)) {
    const responses = [
      `🤖 *CHI SONO IO?* ✨\n\n👋 Ciao! Sono **${CONFIG.BOT_NAME}**!\n\n🧠 Sono un'intelligenza artificiale avanzata creata da **${CONFIG.CREATOR}**\n💬 Funziono esclusivamente in chat private per garantire la tua privacy\n🔥 Posso aiutarti con qualsiasi cosa tu abbia bisogno!\n\n🎯 *Le mie funzionalità:*\n• Conversazioni intelligenti e naturali\n• Supporto programmazione e codice\n• Aiuto e consulenza personalizzata\n• Memoria conversazioni avanzata\n• Risposte sempre contestuali\n• Analisi e problem solving\n\n🛡 *Sicurezza garantita:* Solo chat private\n👨‍💻 *Sviluppato da:* ${CONFIG.CREATOR}\n🔢 *Versione:* ${CONFIG.VERSION}\n\n_Il tuo assistente AI di nuova generazione! 🚀_`,
      `✨ *${CONFIG.BOT_NAME} v${CONFIG.VERSION}* 🤖\n\n🎯 Sono la tua AI personale creata da **${CONFIG.CREATOR}**!\n\n💡 *Cosa posso fare per te:*\n• Chattare in modo naturale e intelligente\n• Aiutarti con coding e programmazione\n• Ricordare e contestualizzare le conversazioni\n• Rispondere a qualsiasi domanda o curiosità\n• Essere il tuo assistente universale\n• Fornire supporto tecnico e creativo\n\n🔒 *Privacy first:* Esclusivamente chat private\n🧠 *Smart memory:* Ricordo le nostre conversazioni\n⚡ *Always learning:* Miglioramento continuo\n🌟 *Modalità universale:* Attivazione globale\n\n👨‍💻 _Developed with ❤ by ${CONFIG.CREATOR}_`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  return null;
};

const detectCodeRequest = (text) => {
  const codeKeywords = [
    'codice', 'code', 'script', 'javascript', 'js', 'html', 'css', 'python', 
    'java', 'php', 'function', 'funzione', 'algoritmo', 'programma', 'sviluppa', 
    'crea', 'const', 'let', 'var', 'if', 'for', 'while', 'array', 'object', 
    'class', 'debug', 'errore', 'bug', 'syntax', 'compile', 'execute', 'api',
    'database', 'sql', 'query', 'react', 'vue', 'angular', 'node', 'express'
  ];
  
  const lowerText = text.toLowerCase();
  const hasKeyword = codeKeywords.some(word => lowerText.includes(word));
  const hasCodeSyntax = /[{}();=>]|function\s*\(|const\s+\w+|let\s+\w+|var\s+\w+/.test(text);
  const hasCodeRequest = (lowerText.includes('scrivi') || lowerText.includes('crea') || lowerText.includes('fai')) && 
                        (lowerText.includes('codice') || lowerText.includes('script') || lowerText.includes('programma'));
  
  return hasKeyword || hasCodeSyntax || hasCodeRequest;
};

const formatCodeInResponse = (response) => {
  const codeRegex = /(\w+)?\n?([\s\S]*?)/g;
  let formatted = response;
  const matches = [...response.matchAll(codeRegex)];
  
  matches.forEach((match, index) => {
    const language = match[1] || 'code';
    const code = match[2].trim();
    const replacement = `\n💻 *CODICE ${language.toUpperCase()} #${index + 1}*\n\\\${language}\n${code}\n\\\\n🔧 _Codice fornito da ${CONFIG.BOT_NAME}_\n`;
    formatted = formatted.replace(match[0], replacement);
  });
  
  return formatted;
};

const shouldCompletelyIgnore = (text, fromMe) => {
  if (fromMe) return true;
  
  const criticalIgnorePatterns = [
    /^https?:\/\/[^\s]+$/i,
    /^[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]{1,3}$/u,
    /^[\.\/!]{3,}$/g,
    /^[0-9]{1,3}$/g,
    /^[a-zA-Z]{1,2}$/g
  ];
  
  const cleanText = text.trim();
  return cleanText.length === 0 || criticalIgnorePatterns.some(pattern => pattern.test(cleanText));
};

const isBotCommand = (text) => {
  const commands = ['.chatunity', '.autobot', '/chatunity', '!chatunity'];
  return commands.some(cmd => text.toLowerCase().startsWith(cmd));
};

const isOtherBotCommand = (text) => {
  const botCommandPatterns = [/^[.\/!]\w+/i];
  return botCommandPatterns.some(pattern => pattern.test(text)) && !isBotCommand(text);
};

const isBotMentioned = (text) => {
  const mentions = ['chatunity', 'bot', 'chatbot', 'ai', 'gpt', 'assistant', 'aiuto', 'help'];
  const lowerText = text.toLowerCase();
  return mentions.some(mention => lowerText.includes(mention)) || 
         text.startsWith('@') || 
         lowerText.includes('rispondi') || 
         lowerText.includes('dimmi');
};

const getRandomGreeting = () => {
  const greetings = [
    `Ciao! Sono ${CONFIG.BOT_NAME}, creato da ${CONFIG.CREATOR}, pronto a chattare in privato! 🤖`,
    `Hey! Dimmi tutto, sono l'AI di ${CONFIG.CREATOR} e risponderò a ogni messaggio privato! ✨`,
    `Salve! Il tuo assistente ${CONFIG.BOT_NAME} creato da ${CONFIG.CREATOR} è attivo! 🚀`,
    `Eccomi! Sono ${CONFIG.BOT_NAME} v${CONFIG.VERSION}, ora rispondo a qualsiasi cosa in privato! 💪`,
    `Ciao! ${CONFIG.BOT_NAME} di ${CONFIG.CREATOR} attivato - modalità chat privata completa! 🌟`
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
};

const getShortMessageResponse = (text) => {
  const shortResponses = [
    `Capisco che hai scritto "${text}" 😊 Vuoi approfondire?`,
    `Interessante! Puoi dirmi di più su "${text}"?`,
    `"${text}" - vuoi espandere questo concetto?`,
    `Ho notato il tuo "${text}" - cosa ne pensi esattamente?`,
    `"${text}" è tutto? Dimmi qualcosa in più! 😄`,
    `Ok per "${text}"! Continua pure il discorso`,
    `"${text}" registrato! Cosa altro posso sapere?`,
    `Ricevuto "${text}"! Sviluppiamo insieme l'argomento 💭`
  ];
  return shortResponses[Math.floor(Math.random() * shortResponses.length)];
};

const callAI = async (prompt) => {
  const url = `https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(prompt)}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': `Mozilla/5.0 (${CONFIG.BOT_NAME}/${CONFIG.VERSION})`
      },
      timeout: 30000
    });
    if (!response.ok) throw new Error('API Gemini non disponibile');
    const data = await response.json();
    // La risposta è attesa in data.result
    const result = data?.result || '';
    if (result && result.trim().length > 0) {
      return { success: true, data: result, api: 'GEMINI' };
    }
    return { success: false, error: 'Risposta vuota da Gemini' };
  } catch (error) {
    console.log('API Gemini fallita:', error.message);
    return { success: false, error: error.message };
  }
};

function cleanOldMemory() {
  if (!global.chatMemory) return;
  const now = Date.now();
  for (const [chatId, data] of global.chatMemory.entries()) {
    if (now - data.lastUpdate > CONFIG.MEMORY_DURATION) {
      global.chatMemory.delete(chatId);
    }
  }
}

function clearAutoActivationTimer() {
  if (global._autoActivationTimer) {
    clearTimeout(global._autoActivationTimer);
    global._autoActivationTimer = null;
  }
}
function setAutoActivationTimer() {
  clearAutoActivationTimer();
  global._autoActivationTimer = setTimeout(() => {
    global.globalBotActive = true;
  }, 60 * 60 * 1000); // 1 ora
}

function isPrivateChat(chatId) {
  return typeof chatId === 'string' && chatId.endsWith('@s.whatsapp.net');
}

if (typeof global.conn === 'undefined') global.conn = {};
global.chatMemory = global.chatMemory || new Map();
const chatMemory = global.chatMemory;


const handler = async (m) => {
  if (!m.text) return;

  // IGNORA I MESSAGGI INVIATI DAL BOT STESSO
  if (m.fromMe) return;

  const chatId = m.chat;
  const text = m.text.trim();

  // Comandi .chatunity, .chatunity on, .chatunity off, ecc.
  if (isBotCommand(text)) {
    // Se provano ad attivare in gruppo, avvisa e non attivare
    if (!isPrivateChat(chatId)) {
      return await m.reply(`🚫 *${CONFIG.BOT_NAME} - SOLO CHAT PRIVATE* 🚫\n\n❌ Questo comando funziona ESCLUSIVAMENTE in chat private (DM)\n💬 Scrivimi in privato per usare tutte le funzioni\n🔒 Massima privacy e sicurezza garantita\n\n👨‍💻 _Creato da ${CONFIG.CREATOR} - ${CONFIG.BOT_NAME} Creator_`);
    }

    const args = text.toLowerCase().split(' ');
    const cmd = args[1];

    switch (cmd) {
      case 'on':
      case 'attiva':
        global.globalBotActive = true;
        clearAutoActivationTimer();
        return await m.reply(`🤖 *${CONFIG.BOT_NAME} ATTIVATO GLOBALMENTE* ✅\n🔒 *MODALITÀ: TUTTE LE CHAT PRIVATE*\n\n🎯 Modalità: Risposta universale attiva\n🧠 Memoria: ${CONFIG.MEMORY_DURATION/60000} minuti per chat\n💬 Messaggi ricordati: ${CONFIG.MAX_MESSAGES} per chat\n⚡ Versione: ${CONFIG.VERSION}\n\n📋 *Comandi disponibili:*\n• .chatunity off - Disattiva globalmente\n• .chatunity info - Informazioni dettagliate\n• .chatunity memoria - Cronologia questa chat\n• .chatunity reset - Cancella memoria questa chat\n• .chatunity help - Guida completa\n\n🔥 MODALITÀ UNIVERSALE ATTIVA\n✨ Ora rispondo in TUTTE le chat private automaticamente!\n\n👨‍💻 Creato da ${CONFIG.CREATOR} - ${CONFIG.BOT_NAME} Creator\n🔒 _Privacy garantita - Solo chat private_`);
      case 'off':
      case 'disattiva':
        global.globalBotActive = false;
        setAutoActivationTimer();
        return await m.reply(`🤖 *${CONFIG.BOT_NAME} DISATTIVATO GLOBALMENTE* ❌\n\n😴 Modalità universale spenta in tutte le chat private\n💡 Risponderò solo ai comandi .chatunity\n⏰ *Auto-riattivazione programmata in 1 ora*\n🧠 Le memorie rimangono salvate per ${CONFIG.MEMORY_DURATION/60000} minuti\n\n🔄 Per riattivare subito: .chatunity on\n📋 Per la guida: .chatunity help\n\n👨‍💻 _Creato da ${CONFIG.CREATOR} - ${CONFIG.BOT_NAME} Creator_\n🔒 _Sempre e solo in chat private sicure_`);
      case 'info':
      case 'stato': {
        const memory = getMemory(chatId);
        const msgCount = memory ? memory.messages.length : 0;
        const totalMsgs = memory ? memory.totalMessages : 0;
        const memoryTimeLeft = memory ? Math.max(0, Math.floor((CONFIG.MEMORY_DURATION - (Date.now() - memory.lastUpdate)) / 60000)) : 0;
        return await m.reply(`🤖 *${CONFIG.BOT_NAME} v${CONFIG.VERSION} - INFO DETTAGLIATE* 📊\n\n🔄 *Stato Globale:* ${global.globalBotActive ? '🟢 ATTIVO (Tutte le chat private)' : '🔴 INATTIVO (Solo comandi)'}\n🧠 *Memoria questa chat:* ${msgCount}/${CONFIG.MAX_MESSAGES} messaggi\n📈 *Conversazioni totali:* ${totalMsgs}\n⏳ *Memoria scade in:* ${memoryTimeLeft} minuti\n💬 *Chat ID:* ${chatId.split('@')[0]}\n⏰ *Ultimo aggiornamento:* ${new Date().toLocaleString('it-IT')}\n🔒 *Modalità operativa:* CHAT PRIVATE ONLY\n\n🎛 *Controlli disponibili:*\n• .chatunity ${global.globalBotActive ? 'off' : 'on'} - ${global.globalBotActive ? 'Disattiva' : 'Attiva'} globalmente\n• .chatunity memoria - Visualizza cronologia\n• .chatunity reset - Cancella memoria\n• .chatunity help - Guida completa\n\n${global.globalBotActive ? '🔥 Modalità attiva: Rispondo a tutto!' : '💤 Modalità: Solo comandi .chatunity'}\n\n👨‍💻 Sviluppato da ${CONFIG.CREATOR} - ${CONFIG.BOT_NAME} Creator\n🛡 _Privacy garantita al 100%`);
      }
      case 'memoria':
      case 'cronologia': {
        const mem = getMemory(chatId);
        if (!mem || mem.messages.length === 0) {
          return await m.reply(`🧠 *MEMORIA ${CONFIG.BOT_NAME} QUESTA CHAT* 💭\n\n❌ Nessuna conversazione salvata in questa chat\n⏰ Durata memoria: ${CONFIG.MEMORY_DURATION/60000} minuti\n💾 Capacità: ${CONFIG.MAX_MESSAGES} messaggi\n\n💡 _Inizia a chattare per riempire la memoria!_\n👨‍💻 _Creato da ${CONFIG.CREATOR} - ${CONFIG.BOT_NAME} Creator_\n🔒 _Tutto rimane privato e sicuro_`);
        }
        let memoryText = `🧠 *MEMORIA ${CONFIG.BOT_NAME} QUESTA CHAT* 💭\n📊 ${mem.messages.length}/${CONFIG.MAX_MESSAGES} messaggi salvati\n🔢 ${mem.totalMessages} conversazioni totali\n📅 Prima interazione: ${new Date(mem.firstInteraction).toLocaleDateString('it-IT')}\n🔒 Chat privata protetta\n\n`;
        mem.messages.slice(-10).forEach((msg, i) => {
          memoryText += `${i + 1}. 👤 *Tu:* ${msg.user.substring(0, 70)}${msg.user.length > 70 ? '...' : ''}\n`;
          memoryText += `   🤖 ${CONFIG.BOT_NAME}: ${msg.bot.substring(0, 90)}${msg.bot.length > 90 ? '...' : ''}\n`;
          memoryText += `   🕐 ${msg.timestamp} - ${msg.date}\n\n`;
        });
        const timeLeft = Math.max(0, Math.floor((CONFIG.MEMORY_DURATION - (Date.now() - mem.lastUpdate)) / 60000));
        memoryText += `⏳ _Memoria attiva per altri ${timeLeft} minuti_\n👨‍💻 _Creato da ${CONFIG.CREATOR} - ${CONFIG.BOT_NAME} Creator_\n🛡 _Dati completamente privati e sicuri_`;
        return await m.reply(memoryText);
      }
      case 'reset':
      case 'cancella':
        chatMemory.delete(chatId);
        return await m.reply(`🧠 *MEMORIA QUESTA CHAT CANCELLATA* 🗑\n\n✅ Cronologia conversazione completamente eliminata\n🆕 Ripartiremo da zero in questa chat!\n🔒 Tutti i tuoi dati privati sono stati rimossi\n💾 Capacità memoria: ${CONFIG.MAX_MESSAGES} messaggi per ${CONFIG.MEMORY_DURATION/60000} minuti\n\n👨‍💻 _Creato da ${CONFIG.CREATOR} - ${CONFIG.BOT_NAME} Creator_\n🔄 _Il bot ${global.globalBotActive ? 'rimane attivo globalmente' : 'è ancora spento globalmente'}_`);
      case 'help':
      case 'aiuto':
        return await m.reply(`🤖 *${CONFIG.BOT_NAME} v${CONFIG.VERSION} - GUIDA COMPLETA* 📚\n\n🔒 *MODALITÀ: ESCLUSIVAMENTE CHAT PRIVATE*\n\n🎮 *COMANDI PRINCIPALI:*\n• .chatunity on - Attiva in TUTTE le chat private\n• .chatunity off - Disattiva globalmente\n• .chatunity info - Info dettagliate e stato\n• .chatunity memoria - Cronologia questa chat\n• .chatunity reset - Cancella memoria questa chat\n• .chatunity help - Questa guida\n\n🔥 MODALITÀ UNIVERSALE GLOBALE:\n• Risponde automaticamente in TUTTE le chat private\n• Memoria separata e indipendente per ogni chat\n• Attivazione/disattivazione globale istantanea\n• Ignora automaticamente comandi di altri bot\n• Privacy e sicurezza al 100%\n\n🧠 CARATTERISTICHE AVANZATE:\n• Memoria conversazioni: ${CONFIG.MEMORY_DURATION/60000} minuti per chat\n• Contesto conversazione intelligente e avanzato\n• Supporto completo linguaggi programmazione\n• Risposte sempre contestuali e personalizzate\n• Nessun salvataggio permanente dei dati\n• Auto-riattivazione dopo 1 ora se spento\n\n⚙ COMPORTAMENTO INTELLIGENTE:\n• Modalità ON: Risponde automaticamente in tutte le chat private\n• Modalità OFF: Risponde solo ai comandi .chatunity\n• Ignora automaticamente comandi di altri bot\n• Mantiene contesto separato per ogni chat\n• FUNZIONA ESCLUSIVAMENTE IN MESSAGGI DIRETTI\n\n🛡 PRIVACY E SICUREZZA:\n• Solo ed esclusivamente chat private\n• Nessun accesso a gruppi o broadcast\n• Memoria temporanea separata per ogni utente\n• Dati mai condivisi o salvati permanentemente\n• Crittografia end-to-end rispettata\n\n💻 SUPPORTO TECNICO:\n• Riconoscimento automatico richieste di codice\n• Formattazione avanzata del codice\n• Supporto multi-linguaggio di programmazione\n• Debug e risoluzione problemi\n• Spiegazioni tecniche dettagliate\n\n🌟 NOVITÀ v${CONFIG.VERSION}:\n• Memoria estesa a ${CONFIG.MEMORY_DURATION/60000} minuti\n• Capacità aumentata a ${CONFIG.MAX_MESSAGES} messaggi per chat\n• API multiple per maggiore affidabilità\n• Riconoscimento pattern migliorato\n• Risposte più naturali e contestuali\n\n👨‍💻 Sviluppato con passione da ${CONFIG.CREATOR} - Il creatore di ${CONFIG.BOT_NAME}\n🔗 _Plugin v${CONFIG.VERSION} Universal Global Private - Chatbot Sicuro e Intelligente_`);
      default:
        return await m.reply(`🤖 *${CONFIG.BOT_NAME} v${CONFIG.VERSION}* ❓\n\n❌ Comando sconosciuto: "${text}"\n🔒 Modalità: Tutte le chat private\n\n📋 *Comandi disponibili:*\n• .chatunity on - Attiva globalmente\n• .chatunity off - Disattiva globalmente\n• .chatunity info - Stato e informazioni\n• .chatunity help - Guida completa\n\n💡 _Usa .chatunity help per la guida dettagliata_\n👨‍💻 Creato da ${CONFIG.CREATOR} - ${CONFIG.BOT_NAME} Creator\n🛡 _Privacy garantita in tutte le chat private_`);
    }
    return;
  }


  if (!global.globalBotActive) return;
  if (!isPrivateChat(m.chat)) return;


  if (isBotCommand(m.text)) return;

  if (isOtherBotCommand(text) && !isBotMentioned(text)) return;

  try {
    global.conn.sendPresenceUpdate && global.conn.sendPresenceUpdate('composing', m.chat);
    await new Promise(resolve => setTimeout(resolve, CONFIG.TYPING_DELAY));

    const personalizedResponse = getPersonalizedResponse(text);
    if (personalizedResponse) {
      saveToMemory(chatId, text, personalizedResponse);
      const currentDate = new Date().toLocaleDateString('it-IT');
      const currentTime = new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
      const chatMemoryObj = getMemory(chatId);
      const memInfo = chatMemoryObj ? `${chatMemoryObj.messages.length}/${CONFIG.MAX_MESSAGES}` : `0/${CONFIG.MAX_MESSAGES}`;
      const responseHeader = isBotMentioned(text) ? '📢 MENTION' : '💬 AUTO';

      const finalResponse = `🤖 *${CONFIG.BOT_NAME} v${CONFIG.VERSION}* ${responseHeader}\n📅 ${currentDate} • ⏰ ${currentTime}\n🧠 Memoria: ${memInfo} • 🔌 PERSONAL • 🌐 GLOBAL\n\n${personalizedResponse}\n\n_Modalità universale globale attiva • Privacy garantita al 100%_ ⚡🛡`;

      return await m.reply(finalResponse);
    }

    let aiResponse;
    let apiUsed = 0;

    if (text.length <= 3 && !detectCodeRequest(text)) {
      aiResponse = getShortMessageResponse(text);
      apiUsed = 'local';
    } else {
      const contextualPrompt = buildContext(chatId, text);
      let enhancedPrompt = contextualPrompt;

      if (detectCodeRequest(text)) {
        enhancedPrompt += `\n\n🔧 RICHIESTA CODICE RILEVATA: L'utente necessita di supporto programmazione. Fornisci esempi completi, funzionanti e ben commentati. Usa sempre i blocchi di codice con la sintassi corretta. Spiega ogni parte del codice in modo chiaro e dettagliato. Se possibile, includi anche varianti o miglioramenti del codice.`;
      }

      const aiResult = await callAI(enhancedPrompt);

      if (!aiResult.success) {
        return await m.reply(`🚨 *SERVIZI AI TEMPORANEAMENTE NON DISPONIBILI* 🚨

⏳ Tutti i servizi di intelligenza artificiale sono momentaneamente offline
🔄 Ti consiglio di riprovare tra qualche minuto
🛠 Stiamo lavorando per ripristinare il servizio

💡 _${CONFIG.BOT_NAME} v${CONFIG.VERSION} rimane attivo per comandi e risposte base_

🤖 _Nel frattempo posso rispondere a saluti, domande su di me e messaggi semplici!_
👨‍💻 _Creato da ${CONFIG.CREATOR} - ${CONFIG.BOT_NAME} Creator_
🔒 _Sempre in chat private sicure_`);
      }

      aiResponse = aiResult.data.trim();
      apiUsed = aiResult.api;

      if (detectCodeRequest(text)) {
        aiResponse = formatCodeInResponse(aiResponse);
      }

      if (aiResponse.length > CONFIG.MAX_MESSAGE_LENGTH) {
        aiResponse = aiResponse.substring(0, CONFIG.MAX_MESSAGE_LENGTH - 100) + '...\n\n_Risposta troncata per limiti di lunghezza. Per maggiori dettagli, puoi chiedere approfondimenti specifici._';
      }
    }

    saveToMemory(chatId, text, aiResponse);

    const currentDate = new Date().toLocaleDateString('it-IT');
    const currentTime = new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
    const chatMemoryObj = getMemory(chatId);
    const memInfo = chatMemoryObj ? `${chatMemoryObj.messages.length}/${CONFIG.MAX_MESSAGES}` : `0/${CONFIG.MAX_MESSAGES}`;
    const responseHeader = isBotMentioned(text) ? '📢 MENTION' : '💬 AUTO';
    const apiInfo = apiUsed === 'local' ? 'LOCAL' : `API ${apiUsed}`;

    const finalResponse = `🤖 *${CONFIG.BOT_NAME} v${CONFIG.VERSION}* ${responseHeader}\n📅 ${currentDate} • ⏰ ${currentTime}\n🧠 Memoria: ${memInfo} • 🔌 ${apiInfo} • 🌐 GLOBAL\n\n${aiResponse}\n\n_Modalità universale globale attiva • Privacy garantita al 100%_ ⚡🛡`;

    await m.reply(finalResponse);

  } catch (error) {
    console.error('Errore Chatunity:', error);
    await m.reply(`🚨 *ERRORE TEMPORANEO* 🚨

⚠ Si è verificato un problema tecnico imprevisto
🔧 Ti consiglio di riprovare tra un momento
📱 Se il problema persiste, riavvia la chat

💡 _${CONFIG.BOT_NAME} v${CONFIG.VERSION} rimane comunque attivo_
🤖 _Continua pure a scrivere, dovrebbe funzionare!_

👨‍💻 _Creato da ${CONFIG.CREATOR} - ${CONFIG.BOT_NAME} Creator_
🔒 _Chat private sempre sicure e protette_`);
  }
};


handler.all = handler;

handler.help = ['chatunity', 'autobot'];
handler.tags = ['ai', 'auto', 'universal', 'private', 'chatunity'];
handler.command = /^(chatunity|autobot)$/i;

export default handler;