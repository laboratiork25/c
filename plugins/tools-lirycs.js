import axios from 'axios';
import cheerio from 'cheerio';
import '../lib/language.js';

const handler = async (m, { conn, text }) => {
  const userId = m.sender;
  const groupId = m.chat;

  if (!text) return m.reply(global.t('lyricsNoInput', userId, groupId));

  try {
    const searchText = text.trim();
    let artist, title;

    if (searchText.includes('-')) {
      [artist, title] = searchText.split('-').map(s => s.trim());
    } else {
      const lastSpaceIndex = searchText.lastIndexOf(' ');
      if (lastSpaceIndex === -1) {
        return m.reply(global.t('lyricsInvalidFormat', userId, groupId));
      }
      artist = searchText.substring(0, lastSpaceIndex).trim();
      title = searchText.substring(lastSpaceIndex + 1).trim();
    }

    if (!artist || !title) {
      return m.reply(global.t('lyricsMissingInfo', userId, groupId));
    }

    const cleanArtist = artist.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '');
    const url = `https://www.azlyrics.com/lyrics/${cleanArtist}/${cleanTitle}.html`;

    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(data);
    
    const lyricsDiv = $('div.main-page div.col-xs-12.col-lg-8.text-center')
      .find('div:not([class]):not([id])')
      .filter((i, el) => $(el).text().trim().length > 0)
      .first();

    const lyrics = lyricsDiv.text().trim();

    if (!lyrics) throw new Error(global.t('lyricsNotFound', userId, groupId));

    const maxLength = 2000;
    if (lyrics.length > maxLength) {
      for (let i = 0; i < lyrics.length; i += maxLength) {
        const chunk = lyrics.substring(i, i + maxLength);
        await conn.sendMessage(m.chat, { text: chunk }, { quoted: m });
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } else {
      await conn.sendMessage(m.chat, { text: lyrics }, { quoted: m });
    }

  } catch (error) {
    console.error('Errore nella ricerca del testo:', error);
    m.reply(global.t('lyricsError', userId, groupId));
  }
};

handler.help = ['lyrics <artista> - <titolo>'];
handler.tags = ['music'];
handler.command = ['lyrics', 'testo', 'parole', 'lyric'];
handler.examples = [
  'lyrics Coldplay - Viva La Vida',
  'testo Eminem Lose Yourself',
  'parole Queen Bohemian Rhapsody'
];

export default handler;