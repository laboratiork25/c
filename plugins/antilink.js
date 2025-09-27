import fetch from 'node-fetch'
import FormData from 'form-data'
import { downloadContentFromMessage } from '@whiskeysockets/baileys'

async function getMediaBuffer(message) {
    try {
        const msg = message.message?.imageMessage
            || message.message?.videoMessage
            || message.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage
            || message.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage

        if (!msg) return null
        const type = msg.mimetype?.startsWith('video') ? 'video' : 'image'
        const stream = await downloadContentFromMessage(msg, type)

        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }

        return buffer
    } catch (e) {
        console.error('Errore nel download media:', e)
        return null
    }
}

async function readQRCode(imageBuffer) {
    try {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 5000)

        const formData = new FormData()
        formData.append('file', imageBuffer, 'image.jpg')

        const response = await fetch('https://api.qrserver.com/v1/read-qr-code/', {
            method: 'POST',
            body: formData,
            signal: controller.signal
        })

        clearTimeout(timeout)
        const data = await response.json()
        return data?.[0]?.symbol?.[0]?.data || null
    } catch (e) {
        console.error('Errore lettura QR:', e)
        return null
    }
}

export async function before(msg, { isAdmin, isBotAdmin }) {
  if (msg.isBaileys && msg.fromMe) return true;
  if (!msg.isGroup) return false;

  const { antiLink } = global.db.data.chats[msg.chat] || {};
  const { restrict, allowedChannelLink = ["https://whatsapp.com/channel/0029VauhQviCsU9Ibrwlkb0h"] } = global.db.data.settings[this.user?.jid] || {};
  
  const messageText = msg.text || '';
  
  function isCommand(text) {
    const commandPrefixes = ['.', '!', '/', '#', '$', '%', '&', '*', '+', '?', '@'];
    const trimmedText = text.trim();
    
    if (commandPrefixes.some(prefix => trimmedText.startsWith(prefix))) {
      return true;
    }
    
    const commonCommands = [
      'play', 'youtube', 'yt', 'video', 'audio', 'song', 'musica', 'music',
      'download', 'dl', 'get', 'fetch', 'tiktok', 'tt', 'instagram', 'ig',
      'facebook', 'fb', 'twitter', 'x', 'pinterest', 'pin', 'reddit',
      'spotify', 'soundcloud', 'sc', 'ytdl', 'ytmp3', 'ytmp4'
    ];
    
    const firstWord = trimmedText.split(' ')[0].toLowerCase();
    return commonCommands.includes(firstWord);
  }
  
  if (isCommand(messageText)) {
    console.log(`[ANTILINK AI] Comando rilevato, ignorato: ${messageText.substring(0, 50)}...`);
    return true;
  }
  
  const linkPatterns = {
    whatsappGroup: /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/gi,
    whatsappChannel: /whatsapp\.com\/channel\/([0-9A-Za-z]{20,24})/gi,
    telegram: /(t\.me\/|telegram\.me\/|telegram\.org\/|telegram\.com\/)/gi,
    youtube: /(youtube\.com\/|youtu\.be\/|m\.youtube\.com\/)/gi,
    facebook: /(facebook\.com\/|fb\.com\/|m\.facebook\.com\/)/gi,
    twitter: /(twitter\.com\/|x\.com\/|t\.co\/)/gi,
    discord: /(discord\.gg\/|discord\.com\/invite\/|discordapp\.com\/invite\/)/gi,
    twitch: /(twitch\.tv\/|m\.twitch\.tv\/)/gi,
    reddit: /(reddit\.com\/|redd\.it\/)/gi,
    snapchat: /(snapchat\.com\/|snap\.com\/)/gi,
    onlyfans: /(onlyfans\.com\/)/gi,
    pornhub: /(pornhub\.com\/|xvideos\.com\/|xnxx\.com\/|redtube\.com\/)/gi,
    genericUrl: /(https?:\/\/(?:[-\w.])+(?:\:[0-9]+)?(?:\/(?:[\w\/_.])*(?:\?(?:[\w&=%.])*)?(?:\#(?:[\w.])*)?)?)/gi,
    shorteners: /(bit\.ly\/|tinyurl\.com\/|short\.link\/|ow\.ly\/|goo\.gl\/|t\.co\/|buff\.ly\/)/gi,
    adultContent: /(xhamster\.com|youporn\.com|tube8\.com|spankbang\.com|chaturbate\.com)/gi,
    domainOnly: /(?:^|\s)([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(?:\/\S*)?(?=\s|$)/gi,
    commonDomains: /(?:^|\s)([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+(com|org|net|edu|gov|mil|int|co\.uk|co\.it|it|de|fr|es|ru|cn|jp|br|au|ca|in|mx|nl|se|no|dk|fi|pl|tr|ar|cl|pe|ve|uy|py|bo|ec|co|gt|hn|sv|ni|cr|pa|do|cu|jm|ht|pr|bs|bb|gd|lc|vc|ag|kn|dm|tt|sr|gy|fk|bz|cc|tv|me|io|ly|tk|ml|ga|cf|to|ws|nu|fm|pw|vu|ki|nr|na|sb|pg|fj|nc|nf|ck|pn)(?:\/\S*)?(?=\s|$)/gi
  };

  const linkRegex = /\bchat[\s.\u200B\u200C\u200D\uFEFF]*whatsapp[\s.\u200B\u200C\u200D\uFEFF]*com\/([0-9A-Za-z]{20,24})/i
  const channelRegex = /\bwhatsapp[\s.\u200B\u200C\u200D\uFEFF]*com\/channel\/([0-9A-Za-z]{20,24})/i

  function analyzeContent(text) {
    const suspiciousKeywords = [
      'clicca qui', 'click here', 'guadagna', 'earn money', 'gratis', 'free', 
      'premio', 'prize', 'vincita', 'win', 'offerta limitata', 'limited offer',
      'sconto', 'discount', 'occasione', 'opportunity', 'investimento', 'investment',
      'criptovalute', 'crypto', 'bitcoin', 'trading', 'forex', 'casino', 'scommesse',
      'adulti', 'adult', '18+', 'sexy', 'hot', 'nude', 'xxx'
    ];
    
    return suspiciousKeywords.some(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  function detectHiddenLinks(text) {
    const hiddenPatterns = [
      /h\s{1,3}t\s{1,3}t\s{1,3}p\s{1,3}s?\s{0,2}:\s{0,2}\/\s{0,2}\//gi,
      /w\s{1,2}w\s{1,2}w\s{0,2}\.\s{0,2}\w+\s{0,2}\.\s{0,2}\w{2,}/gi,
      /\b\w{2,}\s{1,2}\.\s{1,2}(com|org|net|it|co|uk|de|fr|es|ru|cn|jp)\b/gi,
      /[a-zA-Z0-9]{3,}[\s\.]{1,2}[a-zA-Z0-9]{3,}[\s\.]{1,2}(com|org|net|it|co|uk)/gi,
      /(?:h.{1,3}t.{1,3}p|f.{1,3}t.{1,3}p).{1,5}:\/\//gi
    ];
    
    const suspiciousSpaces = (text.match(/\s{2,}/g) || []).length;
    if (suspiciousSpaces < 1) return false;
    
    return hiddenPatterns.some(pattern => pattern.test(text));
  }

  function isValidDomain(domain) {
    const cleanDomain = domain.split('/')[0].toLowerCase();
    
    const suspiciousDomains = [
      'pornhub.com', 'xvideos.com', 'xnxx.com', 'redtube.com', 'xhamster.com',
      'youporn.com', 'tube8.com', 'spankbang.com', 'chaturbate.com', 'onlyfans.com',
      'bit.ly', 'tinyurl.com', 'short.link', 'ow.ly', 'goo.gl', 't.co', 'buff.ly'
    ];
    
    if (suspiciousDomains.some(suspicious => cleanDomain.includes(suspicious))) {
      return true;
    }
    
    const suspiciousPatterns = [
      /^\d+\.\d+\.\d+\.\d+/,
      /[0-9]{4,}\.com/,
      /free.*\.com/,
      /porn.*\.com/,
      /adult.*\.com/,
      /casino.*\.com/,
      /bet.*\.com/,
      /win.*\.com/,
    ];
    
    return suspiciousPatterns.some(pattern => pattern.test(cleanDomain));
  }

  if (!antiLink) return true;
  if (isAdmin) return true;

  const foundLinks = [];
  let linkType = '';
  let isAllowedChannel = false;

  for (const [type, regex] of Object.entries(linkPatterns)) {
    const matches = messageText.match(regex);
    if (matches) {
      if (type === 'domainOnly' || type === 'commonDomains') {
        const validDomains = matches.filter(match => isValidDomain(match.trim()));
        if (validDomains.length > 0) {
          foundLinks.push(...validDomains);
          linkType = type;
        }
      } else {
        foundLinks.push(...matches);
        linkType = type;
        
        if (type === 'whatsappChannel') {
          isAllowedChannel = allowedChannelLink.some(allowedLink => 
            matches.some(match => messageText.includes(allowedLink))
          );
        }
        
        if (type === 'whatsappGroup') {
          try {
            const groupLink = "https://chat.whatsapp.com/" + (await this.groupInviteCode(msg.chat));
            if (messageText.includes(groupLink)) {
              isAllowedChannel = true;
            }
          } catch (error) {
            console.error("Errore nel recuperare il link del gruppo:", error);
          }
        }
      }
      
      if (foundLinks.length > 0) break;
    }
  }

  const hasSuspiciousContent = analyzeContent(messageText);
  const hasHiddenLinks = detectHiddenLinks(messageText);

  let hasQRLink = false;
  let qrLinkType = '';
  try {
    const mediaBuffer = await getMediaBuffer(msg);
    if (mediaBuffer) {
      console.log('[ANTILINK AI] Media rilevato, controllo QR code...');
      const qrData = await readQRCode(mediaBuffer);
      
      if (qrData) {
        console.log(`[ANTILINK AI] QR code trovato: ${qrData.substring(0, 50)}...`);
        
        const normalizedQRText = qrData.replace(/[\s\u200b\u200c\u200d\uFEFF]+/g, '');
        
        if (linkRegex.test(normalizedQRText) || channelRegex.test(normalizedQRText)) {
          try {
            const groupLink = `https://chat.whatsapp.com/${await this.groupInviteCode(msg.chat)}`;
            const normalizedGroupLink = groupLink.replace(/[\s.\u200B\u200C\u200D\uFEFF]/g, '');
            
            if (!normalizedQRText.includes(normalizedGroupLink)) {
              hasQRLink = true;
              qrLinkType = channelRegex.test(normalizedQRText) ? 'whatsappChannelQR' : 'whatsappGroupQR';
              console.log(`[ANTILINK AI] QR con link WhatsApp rilevato: ${qrLinkType}`);
            }
          } catch (error) {
            console.error("Errore nel verificare il link del gruppo per QR:", error);
            hasQRLink = true;
            qrLinkType = channelRegex.test(normalizedQRText) ? 'whatsappChannelQR' : 'whatsappGroupQR';
          }
        }
        
        if (!hasQRLink) {
          for (const [type, regex] of Object.entries(linkPatterns)) {
            if (regex.test(qrData)) {
              hasQRLink = true;
              qrLinkType = type + 'QR';
              console.log(`[ANTILINK AI] QR con link ${type} rilevato`);
              break;
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('[ANTILINK AI] Errore nel controllo QR:', error);
  }

  if ((foundLinks.length > 0 || hasSuspiciousContent || hasHiddenLinks || hasQRLink) && !isAllowedChannel) {
    if (!isAdmin && isBotAdmin && restrict) {
      try {
        let warningText = "*⚠ 𝐋𝐈𝐍𝐊 𝐍𝐎𝐍 𝐂𝐎𝐍𝐒𝐄𝐍𝐓𝐈𝐓𝐈*";
        
        const currentLinkType = hasQRLink ? qrLinkType : linkType;
        
        switch (currentLinkType) {
          case 'whatsappGroup':
          case 'whatsappGroupQR':
            warningText = "*⚠ 𝐋𝐈𝐍𝐊 𝐃𝐈 𝐀𝐋𝐓𝐑𝐈 𝐆𝐑𝐔𝐏𝐏𝐈 𝐍𝐎𝐍 𝐒𝐎𝐍𝐎 𝐂𝐎𝐍𝐒𝐄𝐍𝐓𝐈𝐓𝐈*";
            if (hasQRLink) warningText += "\n*🚫 𝐐𝐑 𝐂𝐎𝐃𝐄 𝐂𝐎𝐍 𝐋𝐈𝐍𝐊 𝐃𝐈 𝐆𝐑𝐔𝐏𝐏𝐎 𝐑𝐈𝐋𝐄𝐕𝐀𝐓𝐎*";
            break;
          case 'whatsappChannel':
          case 'whatsappChannelQR':
            warningText = "*⚠ 𝐋𝐈𝐍𝐊 𝐃𝐈 𝐀𝐋𝐓𝐑𝐈 𝐂𝐀𝐍𝐀𝐋𝐈 𝐍𝐎𝐍 𝐒𝐎𝐍𝐎 𝐂𝐎𝐍𝐒𝐄𝐍𝐓𝐈𝐓𝐈*";
            if (hasQRLink) warningText += "\n*🚫 𝐐𝐑 𝐂𝐎𝐃𝐄 𝐂𝐎𝐍 𝐋𝐈𝐍𝐊 𝐃𝐈 𝐂𝐀𝐍𝐀𝐋𝐄 𝐑𝐈𝐋𝐄𝐕𝐀𝐓𝐎*";
            break;
          case 'telegram':
          case 'telegramQR':
            warningText = "*⚠ 𝐋𝐈𝐍𝐊 𝐃𝐈 𝐓𝐄𝐋𝐄𝐆𝐑𝐀𝐌 𝐍𝐎𝐍 𝐒𝐎𝐍𝐎 𝐂𝐎𝐍𝐒𝐄𝐍𝐓𝐈𝐓𝐈*";
            if (hasQRLink) warningText += "\n*🚫 𝐐𝐑 𝐂𝐎𝐃𝐄 𝐂𝐎𝐍 𝐋𝐈𝐍𝐊 𝐓𝐄𝐋𝐄𝐆𝐑𝐀𝐌 𝐑𝐈𝐋𝐄𝐕𝐀𝐓𝐎*";
            break;
          case 'youtube':
          case 'youtubeQR':
            warningText = "*⚠ 𝐋𝐈𝐍𝐊 𝐃𝐈 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐍𝐎𝐍 𝐒𝐎𝐍𝐎 𝐂𝐎𝐍𝐒𝐄𝐍𝐓𝐈𝐓𝐈*";
            if (hasQRLink) warningText += "\n*🚫 𝐐𝐑 𝐂𝐎𝐃𝐄 𝐂𝐎𝐍 𝐋𝐈𝐍𝐊 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐑𝐈𝐋𝐄𝐕𝐀𝐓𝐎*";
            break;
          case 'facebook':
          case 'facebookQR':
            warningText = "*⚠ 𝐋𝐈𝐍𝐊 𝐃𝐈 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐍𝐎𝐍 𝐒𝐎𝐍𝐎 𝐂𝐎𝐍𝐒𝐄𝐍𝐓𝐈𝐓𝐈*";
            if (hasQRLink) warningText += "\n*🚫 𝐐𝐑 𝐂𝐎𝐃𝐄 𝐂𝐎𝐍 𝐋𝐈𝐍𝐊 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐑𝐈𝐋𝐄𝐕𝐀𝐓𝐎*";
            break;
          case 'twitter':
          case 'twitterQR':
            warningText = "*⚠ 𝐋𝐈𝐍𝐊 𝐃𝐈 𝐓𝐖𝐈𝐓𝐓𝐄𝐑/𝐗 𝐍𝐎𝐍 𝐒𝐎𝐍𝐎 𝐂𝐎𝐍𝐒𝐄𝐍𝐓𝐈𝐓𝐈*";
            if (hasQRLink) warningText += "\n*🚫 𝐐𝐑 𝐂𝐎𝐃𝐄 𝐂𝐎𝐍 𝐋𝐈𝐍𝐊 𝐓𝐖𝐈𝐓𝐓𝐄𝐑 𝐑𝐈𝐋𝐄𝐕𝐀𝐓𝐎*";
            break;
          case 'discord':
          case 'discordQR':
            warningText = "*⚠ 𝐋𝐈𝐍𝐊 𝐃𝐈 𝐃𝐈𝐒𝐂𝐎𝐑𝐃 𝐍𝐎𝐍 𝐒𝐎𝐍𝐎 𝐂𝐎𝐍𝐒𝐄𝐍𝐓𝐈𝐓𝐈*";
            if (hasQRLink) warningText += "\n*🚫 𝐐𝐑 𝐂𝐎𝐃𝐄 𝐂𝐎𝐍 𝐋𝐈𝐍𝐊 𝐃𝐈𝐒𝐂𝐎𝐑𝐃 𝐑𝐈𝐋𝐄𝐕𝐀𝐓𝐎*";
            break;
          case 'pornhub':
          case 'onlyfans':
          case 'adultContent':
          case 'pornhubQR':
          case 'onlyfansQR':
          case 'adultContentQR':
            warningText = "*⚠ 𝐂𝐎𝐍𝐓𝐄𝐍𝐔𝐓𝐈 𝐏𝐄𝐑 𝐀𝐃𝐔𝐋𝐓𝐈 𝐍𝐎𝐍 𝐒𝐎𝐍𝐎 𝐂𝐎𝐍𝐒𝐄𝐍𝐓𝐈𝐓𝐈*";
            if (hasQRLink) warningText += "\n*🚫 𝐐𝐑 𝐂𝐎𝐃𝐄 𝐂𝐎𝐍 𝐂𝐎𝐍𝐓𝐄𝐍𝐔𝐓𝐈 𝐀𝐃𝐔𝐋𝐓𝐈 𝐑𝐈𝐋𝐄𝐕𝐀𝐓𝐎*";
            break;
          case 'shorteners':
          case 'shortenersQR':
            warningText = "*⚠ 𝐋𝐈𝐍𝐊 𝐀𝐁𝐁𝐑𝐄𝐕𝐈𝐀𝐓𝐈 𝐒𝐎𝐒𝐏𝐄𝐓𝐓𝐈 𝐍𝐎𝐍 𝐒𝐎𝐍𝐎 𝐂𝐎𝐍𝐒𝐄𝐍𝐓𝐈𝐓𝐈*";
            if (hasQRLink) warningText += "\n*🚫 𝐐𝐑 𝐂𝐎𝐃𝐄 𝐂𝐎𝐍 𝐋𝐈𝐍𝐊 𝐀𝐁𝐁𝐑𝐄𝐕𝐈𝐀𝐓𝐎 𝐑𝐈𝐋𝐄𝐕𝐀𝐓𝐎*";
            break;
          case 'domainOnly':
          case 'commonDomains':
          case 'domainOnlyQR':
          case 'commonDomainsQR':
            warningText = "*⚠ 𝐃𝐎𝐌𝐈𝐍𝐈 𝐒𝐎𝐒𝐏𝐄𝐓𝐓𝐈 𝐍𝐎𝐍 𝐒𝐎𝐍𝐎 𝐂𝐎𝐍𝐒𝐄𝐍𝐓𝐈𝐓𝐈*";
            if (hasQRLink) warningText += "\n*🚫 𝐐𝐑 𝐂𝐎𝐃𝐄 𝐂𝐎𝐍 𝐃𝐎𝐌𝐈𝐍𝐈𝐎 𝐒𝐎𝐒𝐏𝐄𝐓𝐓𝐎 𝐑𝐈𝐋𝐄𝐕𝐀𝐓𝐎*";
            break;
          default:
            if (hasQRLink) {
              warningText = "*🚫 𝐐𝐑 𝐂𝐎𝐃𝐄 𝐂𝐎𝐍 𝐋𝐈𝐍𝐊 𝐒𝐎𝐒𝐏𝐄𝐓𝐓𝐎 𝐑𝐈𝐋𝐄𝐕𝐀𝐓𝐎*";
            } else if (hasSuspiciousContent) {
              warningText = "*⚠ 𝐂𝐎𝐍𝐓𝐄𝐍𝐔𝐓𝐎 𝐒𝐎𝐒𝐏𝐄𝐓𝐓𝐎 𝐑𝐈𝐋𝐄𝐕𝐀𝐓𝐎 𝐃𝐀𝐋𝐋'𝐀𝐈*";
            } else if (hasHiddenLinks) {
              warningText = "*⚠ 𝐋𝐈𝐍𝐊 𝐍𝐀𝐒𝐂𝐎𝐒𝐓𝐈 𝐑𝐈𝐋𝐄𝐕𝐀𝐓𝐈 𝐃𝐀𝐋𝐋'𝐀𝐈*";
            }
        }

        const warningMessage = {
          key: { 
            participants: "0@s.whatsapp.net", 
            fromMe: false, 
            id: "AntiLinkAI" + Date.now() 
          },
          message: { 
            locationMessage: { 
              name: "『𝚲𝐍𝐓𝐈 - 𝐋𝐈𝐍𝐊 𝐀𝐈』", 
              jpegThumbnail: await (await fetch("https://telegra.ph/file/a3b727e38149464863380.png")).buffer(), 
              vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;𝟑𝟑𝟑 𝐗 𝐔𝐍𝐋𝐈𝐌𝐈𝐓𝐄𝐃;;;\nFN:𝟑𝟑𝟑 𝐗 𝐔𝐍𝐋𝐈𝐌𝐈𝐓𝐄𝐃\nORG:𝟑𝟑𝟑 𝐗 𝐔𝐍𝐋𝐈𝐌𝐈𝐓𝐄𝐃\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:𝟑𝟑𝟑 𝐗 𝐔𝐍𝐋𝐈𝐌𝐈𝐓𝐄𝐃\nX-WA-BIZ-DESCRIPTION:𝐎𝐅𝐅𝐈𝐂𝐈𝐀𝐋\nX-WA-BIZ-NAME:𝟑𝟑𝟑 𝐗 𝐔𝐍𝐋𝐈𝐌𝐈𝐓𝐄𝐃\nEND:VCARD" 
            } 
          },
          participant: "0@s.whatsapp.net"
        };

        await this.reply(msg.chat, warningText, warningMessage);
        
        await this.sendMessage(msg.chat, { 
          delete: { 
            remoteJid: msg.chat, 
            fromMe: false, 
            id: msg.key.id, 
            participant: msg.key.participant 
          } 
        });
        
        await this.groupParticipantsUpdate(msg.chat, [msg.key.participant], 'remove');
        
        console.log(`[ANTILINK AI] Rimosso utente per: ${currentLinkType || 'contenuto sospetto'}`);
        if (foundLinks.length > 0) console.log(`[ANTILINK AI] Link trovati: ${foundLinks.join(', ')}`);
        if (hasQRLink) console.log(`[ANTILINK AI] QR Code con link rilevato`);
        
      } catch (error) {
        console.error("𝐄𝐑𝐑𝐎𝐑𝐄 𝐀𝐍𝐓𝐈𝐋𝐈𝐍𝐊 𝐀𝐈:", error);
      }
    }
  }

  return true;
}