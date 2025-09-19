import fetch from "node-fetch";
import yts from 'yt-search';
import axios from "axios";
import '../lib/language.js';

const formatAudio = ['mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav'];
const formatVideo = ['360', '480', '720', '1080'];
const MAX_DURATION = 600;

const ddownr = {
  download: async (url, format) => {
    if (!formatAudio.includes(format) && !formatVideo.includes(format)) {
      throw new Error(global.t('formatNotSupported', null, null));
    }

    try {
      const { data } = await axios.get(`https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });

      if (data?.success) {
        return {
          id: data.id,
          image: data.info.image,
          title: data.title,
          downloadUrl: await ddownr.cekProgress(data.id)
        };
      } else {
        throw new Error(global.t('detailsError', null, null));
      }
    } catch (error) {
      console.error(global.t('downloadErrorLog', null, null), error.message);
      throw new Error(global.t('downloadError', null, null));
    }
  },

  cekProgress: async (id) => {
    try {
      while (true) {
        const { data } = await axios.get(`https://p.oceansaver.in/ajax/progress.php?id=${id}`, {
          headers: { 'User-Agent': 'Mozilla/5.0' }
        });

        if (data?.success && data.progress === 1000) {
          return data.download_url;
        }
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (error) {
      console.error(global.t('progressErrorLog', null, null), error.message);
      throw new Error(global.t('progressError', null, null));
    }
  }
};

const handler = async (m, { conn, text, usedPrefix, command, args }) => {
  const userId = m.sender;
  const groupId = m.isGroup ? m.chat : null;
  
  try {
    if (!text.trim()) {
      await conn.sendMessage(m.chat, { 
        text: global.t('noInputText', userId, groupId),
        contextInfo: {
          forwardingScore: 99,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363259442839354@newsletter',
            serverMessageId: '',
            newsletterName: global.t('newsletterName', userId, groupId)
          }
        }
      }, { quoted: m });
      return;
    }

    if (command === 'playaudio' || command === 'playvideo') {
      const search = await yts(text);
      if (!search.all.length) {
        await conn.sendMessage(m.chat, { 
          text: global.t('noResults', userId, groupId),
          contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363259442839354@newsletter',
              serverMessageId: '',
              newsletterName: global.t('newsletterName', userId, groupId)
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
          text: global.t('audioComing', userId, groupId) 
        }, { quoted: m });
        
        const api = await ddownr.download(url, 'mp3');
        await conn.sendMessage(m.chat, { 
          audio: { url: api.downloadUrl }, 
          mimetype: "audio/mpeg",
          contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363259442839354@newsletter',
              serverMessageId: '',
              newsletterName: global.t('newsletterName', userId, groupId)
            }
          }
        }, { quoted: m });
      } else {
        await conn.sendMessage(m.chat, { 
          text: global.t('videoComing', userId, groupId) 
        }, { quoted: m });
        
        let sources = [
          `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
          `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
          `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
          `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
        ];
        
        const results = await Promise.allSettled(sources.map(src => fetch(src).then(res => res.json())));
        for (const result of results) {
          if (result.status === "fulfilled") {
            const { data, result: resResult, downloads } = result.value;
            const downloadUrl = data?.dl || resResult?.download?.url || downloads?.url || data?.download?.url;
            if (downloadUrl) {
              return await conn.sendMessage(m.chat, {
                video: { url: downloadUrl },
                fileName: `${title}.mp4`,
                mimetype: 'video/mp4',
                caption: global.t('downloadComplete', userId, groupId),
                thumbnail: thumb,
                contextInfo: {
                  forwardingScore: 99,
                  isForwarded: true,
                  forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363259442839354@newsletter',
                    serverMessageId: '',
                    newsletterName: global.t('newsletterName', userId, groupId)
                  }
                }
              }, { quoted: m });
            }
          }
        }
        await conn.sendMessage(m.chat, { 
          text: global.t('noValidLink', userId, groupId),
          contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363259442839354@newsletter',
              serverMessageId: '',
              newsletterName: global.t('newsletterName', userId, groupId)
            }
          }
        }, { quoted: m });
      }
      return;
    }

    if (command === 'play') {
      const search = await yts(text);
      if (!search.all.length) {
        await conn.sendMessage(m.chat, { 
          text: global.t('noResults', userId, groupId),
          contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363259442839354@newsletter',
              serverMessageId: '',
              newsletterName: global.t('newsletterName', userId, groupId)
            }
          }
        }, { quoted: m });
        return;
      }

      const videoInfo = search.all[0];
      const durationInSeconds = videoInfo.seconds;
      if (durationInSeconds > MAX_DURATION) {
        return await conn.sendMessage(m.chat, { 
          text: global.t('videoTooLong', userId, groupId, {
            timestamp: videoInfo.timestamp
          }),
          contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363259442839354@newsletter',
              serverMessageId: '',
              newsletterName: global.t('newsletterName', userId, groupId)
            }
          }
        }, { quoted: m });
      }

      const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;
      const formattedViews = new Intl.NumberFormat().format(views);
      
      const infoMessage = global.t('videoInfo', userId, groupId, {
        title,
        timestamp,
        views: formattedViews,
        author: author?.name || global.t('unknownAuthor', userId, groupId),
        ago,
        url
      });

      const thumb = (await conn.getFile(thumbnail))?.data;

      await conn.sendMessage(m.chat, {
        text: infoMessage,
        footer: global.t('chooseFormat', userId, groupId),
        buttons: [
          { buttonId: `${usedPrefix}playaudio ${title}`, buttonText: { displayText: global.t('buttonAudio', userId, groupId) }, type: 1 },
          { buttonId: `${usedPrefix}playvideo ${title}`, buttonText: { displayText: global.t('buttonVideo', userId, groupId) }, type: 1 },
          { buttonId: `${usedPrefix}salva ${title}`, buttonText: { displayText: global.t('buttonSave', userId, groupId) }, type: 1 }
        ],
        viewOnce: true,
        headerType: 4,
        contextInfo: {
          forwardingScore: 99,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363259442839354@newsletter',
            serverMessageId: '',
            newsletterName: global.t('newsletterName', userId, groupId)
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
      text: error.message.startsWith('╭━━') ? error.message : global.t('genericError', userId, groupId, {
        error: error.message
      }),
      contextInfo: {
        forwardingScore: 99,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363259442839354@newsletter',
          serverMessageId: '',
          newsletterName: global.t('newsletterName', userId, groupId)
        }
      }
    }, { quoted: m });
  }
};

handler.command = handler.help = ['play', 'playaudio', 'playvideo', 'ytmp4', 'play2', 'youtube', 'yt'];
handler.tags = ['downloader'];

export default handler;