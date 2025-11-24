import '../lib/language.js';
import ytSearch from 'yt-search';
import fs from 'fs';

const handler = async (m, { conn, text }) => {
const userId = m.sender;
const groupId = m.chat;

text
const requiredFiles = [
    './CODE_OF_CONDUCT.md',
];

const missing = requiredFiles.find(file => !fs.existsSync(file));
if (missing) {
    return await conn.sendMessage(m.chat, { 
        text: global.t('ytSearchMissingFiles', userId, groupId) 
    }, { quoted: m });
}

if (!text?.trim()) {
    return await conn.sendMessage(m.chat, { 
        text: global.t('ytSearchMissingQuery', userId, groupId) 
    }, { quoted: m });
}

const chatId = m.chat;
const searchResults = await ytSearch(text);
const videos = searchResults.videos.slice(0, 5);

if (!videos.length) {
    return m.reply(global.t('ytSearchNoResults', userId, groupId));
}

const cards = videos.map(video => ({
    image: { url: video.thumbnail },
    title: video.title,
    body: `${global.t('ytSearchDuration', userId, groupId)} ${video.timestamp}\n${global.t('ytSearchViews', userId, groupId)} ${video.views.toLocaleString()}\n${global.t('ytSearchChannel', userId, groupId)} ${video.author.name}`,
    footer: global.t('ytSearchFooter', userId, groupId)
}));

await conn.sendMessage(chatId, {
    text: global.t('ytSearchResultHeader', userId, groupId),
    title: global.t('ytSearchResultTitle', userId, groupId),
    footer: global.t('ytSearchFooter', userId, groupId),
    cards
}, { quoted: m });

const buttons = videos.map((video, index) => ({
    buttonId: `.ytformat ${index}`,
    buttonText: { displayText: `${index + 1}` },
    type: 1
}));

await conn.sendMessage(chatId, {
    text: global.t('ytSearchSelectPrompt', userId, groupId),
    footer: global.t('ytSearchFooter', userId, groupId),
    buttons,
    headerType: 1
}, { quoted: m });

conn.ytCache = conn.ytCache || {};
conn.ytCache[chatId] = videos;
};

handler.help = ['ytsearch <query>'];
handler.tags = ['downloader'];
handler.command = /^ytsearch$/i;

export default handler;