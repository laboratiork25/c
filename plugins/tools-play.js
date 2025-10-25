import fetch from "node-fetch";
import yts from 'yt-search';
import axios from "axios";

const formatAudio = ['mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav'];
const formatVideo = ['360', '480', '720', '1080'];
const MAX_DURATION = 600;

global.APIs = {
  xyro: { url: "https://xyro.site", key: null },
  yupra: { url: "https://api.yupra.my.id", key: null },
  vreden: { url: "https://api.vreden.web.id", key: null },
  delirius: { url: "https://api.delirius.store", key: null },
  zenzxz: { url: "https://api.zenzxz.my.id", key: null },
  siputzx: { url: "https://api.siputzx.my.id", key: null }
};

async function fetchFromApis(apis) {
  for (const { api, endpoint, extractor } of apis) {
    try {
      const res = await fetch(endpoint, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const json = await res.json();
      const url = extractor(json);
      if (url) {
        return { api, url };
      }
    } catch (e) {}
  }
  throw new Error(`
꒰🩸꒱ ◦•≫ ERRORE
 ★・・・・・・・★
  Nessun link valido trovato
 ★・・・・・・・★
`);
}

async function getAud(url) {
  const apis = [
    { api: 'Xyro', endpoint: `${global.APIs.xyro.url}/download/youtubemp3?url=${encodeURIComponent(url)}`, extractor: res => res.result?.dl },
    { api: 'Yupra', endpoint: `${global.APIs.yupra.url}/api/downloader/ytmp3?url=${encodeURIComponent(url)}`, extractor: res => res.resultado?.enlace },
    { api: 'Vreden', endpoint: `${global.APIs.vreden.url}/api/ytmp3?url=${encodeURIComponent(url)}`, extractor: res => res.result?.download?.url },
    { api: 'Delirius', endpoint: `${global.APIs.delirius.url}/download/ymp3?url=${encodeURIComponent(url)}`, extractor: res => res.data?.download?.url },
    { api: 'ZenzzXD', endpoint: `${global.APIs.zenzxz.url}/downloader/ytmp3?url=${encodeURIComponent(url)}`, extractor: res => res.download_url },
    { api: 'ZenzzXD v2', endpoint: `${global.APIs.zenzxz.url}/downloader/ytmp3v2?url=${encodeURIComponent(url)}`, extractor: res => res.download_url }
  ];
  return await fetchFromApis(apis);
}

async function getVid(url) {
  const apis = [
    { api: 'Xyro', endpoint: `${global.APIs.xyro.url}/download/youtubemp4?url=${encodeURIComponent(url)}&quality=360`, extractor: res => res.result?.dl },
    { api: 'Yupra', endpoint: `${global.APIs.yupra.url}/api/downloader/ytmp4?url=${encodeURIComponent(url)}`, extractor: res => res.resultado?.formatos?.[0]?.url },
    { api: 'Vreden', endpoint: `${global.APIs.vreden.url}/api/ytmp4?url=${encodeURIComponent(url)}`, extractor: res => res.result?.download?.url },
    { api: 'Delirius', endpoint: `${global.APIs.delirius.url}/download/ytmp4?url=${encodeURIComponent(url)}`, extractor: res => res.data?.download?.url },
    { api: 'ZenzzXD', endpoint: `${global.APIs.zenzxz.url}/downloader/ytmp4?url=${encodeURIComponent(url)}`, extractor: res => res.download_url },
    { api: 'ZenzzXD v2', endpoint: `${global.APIs.zenzxz.url}/downloader/ytmp4v2?url=${encodeURIComponent(url)}`, extractor: res => res.download_url }
  ];
  return await fetchFromApis(apis);
}

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) {
      await conn.sendMessage(m.chat, {
        text: `
╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❗ Inserisci un titolo o link
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
`,
        contextInfo: {
          forwardingScore: 99,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363422724720651@newsletter',
            serverMessageId: '',
            newsletterName: 'ChatUnity'
          }
        }
      }, { quoted: m });
      return;
    }

    if (command === 'playaudio' || command === 'playvideo') {
      const search = await yts(text);
      if (!search.all.length) {
        await conn.sendMessage(m.chat, {
          text: `
╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❗ Nessun risultato trovato
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
`,
          contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363422724720651@newsletter',
              serverMessageId: '',
              newsletterName: 'ChatUnity'
            }
          }
        }, { quoted: m });
        return;
      }
      const videoInfo = search.all[0];
      const { url, title, thumbnail } = videoInfo;
      const thumb = (await conn.getFile(thumbnail))?.data;

      if (command === 'playaudio') {
        await conn.sendMessage(m.chat, { 
          text: `
┊ ┊ ┊ ┊‿ ˚➶ ｡˚
┊ ┊ ┊ ┊. ➶ ˚
┊ ┊ ┊ ˚✧ 🎵 Audio in arrivo
┊ ˚➶ ｡˚ ☁︎ Attendi qualche istante...
` 
        }, { quoted: m });
        const { url: downloadUrl } = await getAud(url);
        await conn.sendMessage(m.chat, {
          audio: { url: downloadUrl },
          mimetype: "audio/mpeg",
          contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363422724720651@newsletter',
              serverMessageId: '',
              newsletterName: 'ChatUnity'
            }
          }
        }, { quoted: m });
      } else {
        await conn.sendMessage(m.chat, { 
          text: `
┊ ┊ ┊ ┊‿ ˚➶ ｡˚
┊ ┊ ┊ ┊. ➶ ˚
┊ ┊ ┊ ˚✧ 🎬 Video in arrivo
┊ ˚➶ ｡˚ ☁︎ Attendi qualche istante...
` 
        }, { quoted: m });
        const { url: downloadUrl } = await getVid(url);
        if (downloadUrl) {
          return await conn.sendMessage(m.chat, {
            video: { url: downloadUrl },
            fileName: `${title}.mp4`,
            mimetype: 'video/mp4',
            caption: '✅ Download completato!',
            thumbnail: thumb,
            contextInfo: {
              forwardingScore: 99,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: '120363422724720651@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
              }
            }
          }, { quoted: m });
        }
      }
      return;
    }

    if (command === 'play') {
      const search = await yts(text);
      if (!search.all.length) {
        await conn.sendMessage(m.chat, {
          text: `
╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❗ Nessun risultato trovato
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
`,
          contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363422724720651@newsletter',
              serverMessageId: '',
              newsletterName: 'ChatUnity'
            }
          }
        }, { quoted: m });
        return;
      }

      const videoInfo = search.all[0];
      const durationInSeconds = videoInfo.seconds;
      if (durationInSeconds > MAX_DURATION) {
        return await conn.sendMessage(m.chat, {
          text: `
╭★────★────★────★────★────★
|ㅤㅤㅤㅤㅤㅤㅤ꒰¡VIDEO TROPPO LUNGO!꒱
|˚₊꒷ ⏳ ꒱ ฅ﹕Massimo: 5 minuti ₊˚๑
|˚₊꒷ ⌛ ꒱ ฅ﹕Durata: ${videoInfo.timestamp} ₊˚๑
╰★────★────★────★────★────★
`,
          contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363422724720651@newsletter',
              serverMessageId: '',
              newsletterName: 'ChatUnity'
            }
          }
        }, { quoted: m });
      }

      const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;
      const formattedViews = new Intl.NumberFormat().format(views);
      const infoMessage = `
⋆ ︵︵ ★ 🎥 INFO VIDEO 🎥 ★ ︵︵ ⋆

꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧
୧ ✍️ *Titolo:* ${title}
୧ ⏳ *Durata:* ${timestamp}
୧ 👀 *Visualizzazioni:* ${formattedViews}
୧ 🔰 *Canale:* ${author?.name || "Sconosciuto"}
୧ 🔳 *Pubblicato:* ${ago}
୧ 🔗 *Link:* ${url}
꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩
  > Scegli un formato per scaricare
╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩
`;

      const thumb = (await conn.getFile(thumbnail))?.data;

      await conn.sendMessage(m.chat, {
        text: infoMessage,
        footer: 'Scegli un formato:',
        buttons: [
          { buttonId: `${usedPrefix}playaudio ${title}`, buttonText: { displayText: "🎵 Audio" }, type: 1 },
          { buttonId: `${usedPrefix}playvideo ${title}`, buttonText: { displayText: "🎬 Video" }, type: 1 },
          { buttonId: `${usedPrefix}salva ${title}`, buttonText: { displayText: "💾 Salva Playlist" }, type: 1 }
        ],
        viewOnce: true,
        headerType: 4,
        contextInfo: {
          forwardingScore: 99,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363422724720651@newsletter',
            serverMessageId: '',
            newsletterName: 'chatunity'
          },
          externalAdReply: {
            mediaType: 1,
            previewType: 0,
            mediaUrl: url,
            sourceUrl: url,
            thumbnail: thumb,
          }
        }
      }, { quoted: m });
      return;
    }

  } catch (error) {
    await conn.sendMessage(m.chat, {
      text: error.message.startsWith('꒰🩸꒱') ? error.message : `
꒰🩸꒱ ◦•≫ ERRORE
 ★・・・・・・・★
  ${error.message}
 ★・・・・・・・★
`,
      contextInfo: {
        forwardingScore: 99,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363422724720651@newsletter',
          serverMessageId: '',
          newsletterName: 'chatunity'
        }
      }
    }, { quoted: m });
  }
};

handler.command = handler.help = ['play', 'playaudio', 'playvideo', 'ytmp4', 'play2'];
handler.tags = ['downloader'];

export default handler;
