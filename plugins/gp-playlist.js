import yts from 'yt-search';
import fs from 'fs';
import path from 'path';
import '../lib/language.js';

// ==================== 🎨 DESIGN & EMOJIS ====================
const BOT_THEME = {
  FRAME: {
    TOP: '╭〔*🎵 PLAYLIST MANAGER*〕┈⊷',
    MIDDLE: '┃◈╭─────────·๏',
    LINE: '┃◈┃•',
    BOTTOM: '┃◈└───────┈⊷\n╰━━━━━━━━━┈·๏',
    SIGNATURE: '꙰ 𝗖𝗿𝗲𝗮𝘇𝗶𝗼𝗻𝗲 𝗚𝗮𝗯𝟯𝟯𝟯 ꙰'
  },
  EMOJIS: {
    ERROR: '⚠️',
    SUCCESS: '✅',
    LOADING: '⌛',
    MUSIC: '🎵',
    VIDEO: '🎬',
    INFO: 'ℹ️',
    PLAYLIST: '📋',
    SAVE: '💾',
    DELETE: '🗑️',
    HEART: '❤️',
    BACK: '🔙'
  }
};

// ==================== 🎵 MUSIC MANAGER ====================
class MusicPlayer {
  static async search(query) {
    const result = await yts(query);
    return result.all.length ? result.all[0] : null;
  }

  static formatSong(song, userId, groupId) {
    return global.t('songFormat', userId, groupId, {
      title: song.title,
      timestamp: song.timestamp || global.t('notAvailable', userId, groupId),
      author: song.author?.name || global.t('unknownAuthor', userId, groupId)
    });
  }
}

// ==================== 📁 DATABASE ====================
const DB = {
  PATH: path.join('./database', 'Musica.json'),

  init() {
    if (!fs.existsSync('./database')) fs.mkdirSync('./database', { recursive: true });
    if (!fs.existsSync(this.PATH)) fs.writeFileSync(this.PATH, '{}');
  },

  read() {
    try {
      return JSON.parse(fs.readFileSync(this.PATH));
    } catch {
      return {};
    }
  },

  write(data) {
    fs.writeFileSync(this.PATH, JSON.stringify(data, null, 2));
  },

  update(userId, updater) {
    const data = this.read();
    if (!Array.isArray(data[userId])) data[userId] = [];
    updater(data[userId]);
    this.write(data);
  }
};

// ==================== 🎛️ HANDLER PRINCIPALE ====================
const handler = async (m, { conn, text, args, command, usedPrefix }) => {
  DB.init();
  const userId = m.sender;
  const groupId = m.chat;
  const isButton = !!m?.key?.id && !text;
  const targetUser = isButton ? userId : (m.quoted?.sender && m.quoted.sender !== userId ? m.quoted.sender : userId);
  const userName = (m.quoted?.sender && m.quoted.sender !== userId) ? (m.quoted.pushName || global.t('user', userId, groupId)) : null;

  if (command === 'playlist' && (!text || text.trim() === '')) {
    const songs = DB.read()[targetUser] || [];

    if (!songs.length) {
      return m.reply(global.t('emptyPlaylist', userId, groupId, { userName: userName }));
    }

    let message = `${BOT_THEME.FRAME.TOP}\n` +
                 `${BOT_THEME.FRAME.MIDDLE}\n` +
                 `${BOT_THEME.FRAME.LINE} ${BOT_THEME.EMOJIS.PLAYLIST} ${userName ? global.t('userPlaylist', userId, groupId, { userName: userName }) : global.t('yourPlaylist', userId, groupId)}\n`;

    songs.slice(0, 10).forEach((song, index) => {
      message += `${BOT_THEME.FRAME.LINE} ${index + 1}. ${song.title}\n` +
                `${BOT_THEME.FRAME.LINE} ⏳ ${song.timestamp} | 📺 ${song.channel}\n`;
    });

    if (songs.length > 10) {
      message += `${BOT_THEME.FRAME.LINE} ${global.t('moreSongs', userId, groupId, { count: songs.length - 10 })}\n`;
    }

    message += `${BOT_THEME.FRAME.BOTTOM}\n\n` +
               `${BOT_THEME.EMOJIS.HEART} ${BOT_THEME.FRAME.SIGNATURE}`;

    const buttons = [
      ...songs.slice(0, 5).map((song, i) => (
        { buttonId: `${usedPrefix}play ${song.title}`, buttonText: { displayText: `${i + 1}🎵 ${song.title.slice(0, 20)}` }, type: 1 }
      )),
      { buttonId: `${usedPrefix}salva`, buttonText: { displayText: `${BOT_THEME.EMOJIS.SAVE} ${global.t('saveNew', userId, groupId)}` }, type: 1 }
    ];

    if (!userName) {
      buttons.push(
        { buttonId: `${usedPrefix}elimina`, buttonText: { displayText: `${BOT_THEME.EMOJIS.DELETE} ${global.t('delete', userId, groupId)}` }, type: 1 }
      );
    }
    buttons.push(
      { buttonId: `${usedPrefix}menu`, buttonText: { displayText: `${BOT_THEME.EMOJIS.BACK} ${global.t('back', userId, groupId)}` }, type: 1 }
    );

    return conn.sendMessage(m.chat, {
      text: message,
      buttons: buttons,
      footer: global.t('selectSong', userId, groupId),
      viewOnce: true,
      headerType: 4
    }, { quoted: m });
  }

  try {
    if (command === 'salva') {
      if (!text) return m.reply(global.t('specifySong', userId, groupId));

      const loadingMsg = await m.reply(`${BOT_THEME.FRAME.TOP}\n` +
        `${BOT_THEME.FRAME.MIDDLE}\n` +
        `${BOT_THEME.FRAME.LINE} ${BOT_THEME.EMOJIS.LOADING} ${global.t('searching', userId, groupId, { query: text })}\n` +
        `${BOT_THEME.FRAME.BOTTOM}`);

      const song = await MusicPlayer.search(text);
      if (!song) {
        await conn.sendMessage(m.chat, { delete: loadingMsg.key });
        return m.reply(global.t('noResults', userId, groupId));
      }

      let exists = false;
      DB.update(userId, songs => {
        exists = songs.some(s => s.url === song.url);
        if (!exists) songs.push({
          title: song.title,
          url: song.url,
          timestamp: song.timestamp,
          channel: song.author?.name,
          addedAt: new Date().toISOString()
        });
      });

      await conn.sendMessage(m.chat, { delete: loadingMsg.key });

      if (exists) {
        return m.reply(global.t('songExists', userId, groupId, { prefix: usedPrefix }));
      }

      return conn.sendMessage(m.chat, {
        text: `${BOT_THEME.FRAME.TOP}\n` +
              `${BOT_THEME.FRAME.MIDDLE}\n` +
              `${BOT_THEME.FRAME.LINE} ${BOT_THEME.EMOJIS.SUCCESS} ${global.t('songSaved', userId, groupId)}\n` +
              `${BOT_THEME.FRAME.LINE} ${MusicPlayer.formatSong(song, userId, groupId)}\n` +
              `${BOT_THEME.FRAME.BOTTOM}\n\n` +
              `${BOT_THEME.EMOJIS.HEART} ${BOT_THEME.FRAME.SIGNATURE}`,
        buttons: [
          { buttonId: `${usedPrefix}playlist`, buttonText: { displayText: `${BOT_THEME.EMOJIS.PLAYLIST} ${global.t('viewPlaylist', userId, groupId)}` }, type: 1 },
          { buttonId: `${usedPrefix}play ${song.title}`, buttonText: { displayText: `${BOT_THEME.EMOJIS.MUSIC} ${global.t('play', userId, groupId)}` }, type: 1 },
          { buttonId: `${usedPrefix}elimina`, buttonText: { displayText: `${BOT_THEME.EMOJIS.DELETE} ${global.t('delete', userId, groupId)}` }, type: 1 }
        ],
        viewOnce: true,
        headerType: 4
      }, { quoted: m });
    }

    if (command === 'playlist') {
      const songs = DB.read()[targetUser] || [];

      if (!songs.length) {
        return m.reply(global.t('emptyPlaylist', userId, groupId, { userName: userName }));
      }

      let message = `${BOT_THEME.FRAME.TOP}\n` +
                   `${BOT_THEME.FRAME.MIDDLE}\n` +
                   `${BOT_THEME.FRAME.LINE} ${BOT_THEME.EMOJIS.PLAYLIST} ${userName ? global.t('userPlaylist', userId, groupId, { userName: userName }) : global.t('yourPlaylist', userId, groupId)}\n`;

      songs.slice(0, 10).forEach((song, index) => {
        message += `${BOT_THEME.FRAME.LINE} ${index + 1}. ${song.title}\n` +
                  `${BOT_THEME.FRAME.LINE} ⏳ ${song.timestamp} | 📺 ${song.channel}\n`;
      });

      if (songs.length > 10) {
        message += `${BOT_THEME.FRAME.LINE} ${global.t('moreSongs', userId, groupId, { count: songs.length - 10 })}\n`;
      }

      message += `${BOT_THEME.FRAME.BOTTOM}\n\n` +
                 `${BOT_THEME.EMOJIS.HEART} ${BOT_THEME.FRAME.SIGNATURE}`;

      const buttons = songs.slice(0, 5).map((song, i) => (
        { buttonId: `${usedPrefix}play ${song.title}`, buttonText: { displayText: `${i + 1}🎵 ${song.title.slice(0, 20)}` }, type: 1 }
      ));

      if (!userName) {
        buttons.push(
          { buttonId: `${usedPrefix}elimina`, buttonText: { displayText: `${BOT_THEME.EMOJIS.DELETE} ${global.t('delete', userId, groupId)}` }, type: 1 }
        );
      }

      return conn.sendMessage(m.chat, {
        text: message,
        buttons: [
          ...buttons,
          { buttonId: `${usedPrefix}menu`, buttonText: { displayText: `${BOT_THEME.EMOJIS.BACK} ${global.t('back', userId, groupId)}` }, type: 1 },
          { buttonId: `${usedPrefix}salva`, buttonText: { displayText: `${BOT_THEME.EMOJIS.SAVE} ${global.t('saveNew', userId, groupId)}` }, type: 1 }
        ],
        viewOnce: true,
        headerType: 4
      }, { quoted: m });
    }

    if (command === 'elimina') {
      const index = parseInt(args[0]) - 1;
      const songs = DB.read()[userId] || [];

      if (isNaN(index)) {
        let message = `${BOT_THEME.FRAME.TOP}\n` +
                      `${BOT_THEME.FRAME.MIDDLE}\n` +
                      `${BOT_THEME.FRAME.LINE} ${BOT_THEME.EMOJIS.DELETE} ${global.t('selectDelete', userId, groupId)}\n`;

        songs.slice(0, 10).forEach((song, i) => {
          message += `${BOT_THEME.FRAME.LINE} ${i + 1}. ${song.title}\n`;
        });

        message += `${BOT_THEME.FRAME.BOTTOM}\n\n` +
                   `${global.t('deleteUsage', userId, groupId, { prefix: usedPrefix })}\n` +
                   `${BOT_THEME.EMOJIS.HEART} ${BOT_THEME.FRAME.SIGNATURE}`;

        const buttons = songs.slice(0, 5).map((_, i) => (
          { buttonId: `${usedPrefix}elimina ${i + 1}`, buttonText: { displayText: `${i + 1}🗑️ ${global.t('delete', userId, groupId)}` }, type: 1 }
        ));

        buttons.push(
          { buttonId: `${usedPrefix}playlist`, buttonText: { displayText: `${BOT_THEME.EMOJIS.BACK} ${global.t('back', userId, groupId)}` }, type: 1 }
        );

        return conn.sendMessage(m.chat, { 
          text: message,
          buttons: buttons,
          viewOnce: true,
          headerType: 4
        }, { quoted: m });
      }

      if (index < 0 || index >= songs.length) {
        return m.reply(global.t('invalidNumber', userId, groupId));
      }

      const [deletedSong] = songs.splice(index, 1);
      DB.update(userId, s => s.splice(index, 1));

      return conn.sendMessage(m.chat, {
        text: `${BOT_THEME.FRAME.TOP}\n` +
              `${BOT_THEME.FRAME.MIDDLE}\n` +
              `${BOT_THEME.FRAME.LINE} ${BOT_THEME.EMOJIS.SUCCESS} ${global.t('songDeleted', userId, groupId)}\n` +
              `${BOT_THEME.FRAME.LINE} 🎵 ${deletedSong.title}\n` +
              `${BOT_THEME.FRAME.BOTTOM}\n\n` +
              `${BOT_THEME.EMOJIS.HEART} ${BOT_THEME.FRAME.SIGNATURE}`,
        buttons: [
          { buttonId: `${usedPrefix}playlist`, buttonText: { displayText: `${BOT_THEME.EMOJIS.PLAYLIST} ${global.t('viewPlaylist', userId, groupId)}` }, type: 1 },
          { buttonId: `${usedPrefix}salva ${deletedSong.title}`, buttonText: { displayText: `${BOT_THEME.EMOJIS.SAVE} ${global.t('restore', userId, groupId)}` }, type: 1 },
          { buttonId: `${usedPrefix}salva`, buttonText: { displayText: `${BOT_THEME.EMOJIS.SAVE} ${global.t('saveNew', userId, groupId)}` }, type: 1 }
        ],
        viewOnce: true,
        headerType: 4
      }, { quoted: m });
    }

  } catch (error) {
    console.error('Handler error:', error);
    return m.reply(global.t('errorOccurred', userId, groupId, { error: error.message }));
  }
};

handler.help = [
  'salva <titolo> - Aggiunge un brano alla playlist',
  'playlist - Mostra la tua playlist',
  'playlist (rispondi) - Mostra playlist altrui',
  'elimina <n> - Rimuove un brano'
];
handler.tags = ['music'];
handler.command = ['salva', 'save', 'playlist', 'elimina', 'delete'];

export default handler;