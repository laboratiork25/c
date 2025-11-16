import '../lib/language.js';
import { googleImage } from '@bochilteam/scraper';
import { existsSync } from 'fs';
import axios from 'axios';

const forbiddenWords = [
    "esempio_termine_vietato"
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
}

const handler = async (message, { conn, text, usedPrefix, command }) => {
    const userId = message.sender;
    const groupId = message.chat;
    
    const requiredFiles = ['./CODE_OF_CONDUCT.md'];
    
    for (const file of requiredFiles) {
        if (!existsSync(file)) {
            return conn.reply(message.chat, global.t('imageSearchBaseOnly', userId, groupId), message);
        }
    }
    
    const searchTerm = text || message.quoted?.text;
    
    if (!searchTerm) {
        return conn.reply(
            message.chat, 
            global.t('imageSearchUsage', userId, groupId, { prefix: usedPrefix, command }), 
            message
        );
    }
    
    const aiPrompt = `Controlla se nel seguente testo è presente un termine inappropriato o ostile, in qualsiasi lingua:\n\n"${searchTerm}"\n\nSe contiene contenuti sessuali, violenti, razzisti, illegali, deepfake, o simili, rispondi solo con "vietato", altrimenti rispondi "ok".`;
    
    try {
        const aiResponse = await axios.post('https://luminai.my.id', {
            content: aiPrompt,
            user: message.pushName || 'utente',
            prompt: 'Rispondi con una singola parola.',
            webSearchMode: false
        });
        
        const result = aiResponse.data?.result?.toLowerCase();
        
        if (result.includes('vietato')) {
            return conn.reply(message.chat, global.t('imageSearchForbidden', userId, groupId), message);
        }
    } catch (error) {
        console.log('Filtro GPT fallito, fallback su lista manuale.');
        
        if (forbiddenWords.some(word => searchTerm.toLowerCase().includes(word))) {
            return conn.reply(message.chat, global.t('imageSearchForbidden', userId, groupId), message);
        }
    }
    
    const randomNum = Math.floor(Math.random() * 1000);
    const enhancedSearchTerm = searchTerm + ' ' + randomNum;
    
    const searchResults = await googleImage(enhancedSearchTerm);
    
    if (!searchResults || searchResults.length === 0) {
        return conn.reply(message.chat, global.t('imageSearchNoResults', userId, groupId), message);
    }
    
    shuffle(searchResults);
    
    const selectedImages = searchResults.slice(0, 10);
    
    const imageCards = selectedImages.map((imageUrl, index) => ({
        image: { url: imageUrl },
        title: global.t('imageSearchImageNum', userId, groupId, { num: index + 1 }),
        body: global.t('imageSearchResultFor', userId, groupId, { term: searchTerm }),
        footer: global.t('imageSearchFooter', userId, groupId),
        buttons: [{
            name: 'cta_url',
            buttonParamsJson: JSON.stringify({
                display_text: global.t('imageSearchOpenImage', userId, groupId),
                url: imageUrl
            })
        }]
    }));
    
    await conn.sendMessage(message.chat, {
        text: global.t('imageSearchResults', userId, groupId, { term: searchTerm }),
        title: global.t('imageSearchTitle', userId, groupId),
        subtitle: global.t('imageSearchSubtitle', userId, groupId),
        footer: global.t('imageSearchFooter', userId, groupId),
        cards: imageCards
    }, { quoted: message });
    
    await conn.sendMessage(message.chat, {
        text: global.t('imageSearchAgainPrompt', userId, groupId),
        footer: global.t('imageSearchFooter', userId, groupId),
        buttons: [{
            buttonId: usedPrefix + 'cercaimmagine ' + searchTerm,
            buttonText: { displayText: global.t('imageSearchAgainButton', userId, groupId) },
            type: 1
        }],
        headerType: 1
    }, { quoted: message });
};

handler.help = ['cercaimmagine <query>'];
handler.tags = ['search'];
handler.command = /^cercaimmagine|cercaimg|searchimg|searchpicture$/i;

export default handler;
