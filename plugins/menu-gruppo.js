import { performance } from 'perf_hooks';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import '../lib/language.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (message, { conn, usedPrefix, command }) => {
    const userId = message.sender;
    const groupId = message.isGroup ? message.chat : null;

    const menuText = generateMenuText(usedPrefix, userId, groupId);
    const imagePath = path.join(__dirname, '../menu/gruppo.jpeg');

    await conn.sendMessage(message.chat, {
        image: { url: imagePath },
        caption: menuText,
        footer: global.t('chooseMenu', userId, groupId) || 'Scegli un menu:',
        buttons: [
            { buttonId: `${usedPrefix}menu`, buttonText: { displayText: global.t('mainMenuButton', userId, groupId) || "🏠 Menu Principale" }, type: 1 },
            { buttonId: `${usedPrefix}menuadmin`, buttonText: { displayText: global.t('adminMenuButton', userId, groupId) || "🛡️ Menu Admin" }, type: 1 },
            { buttonId: `${usedPrefix}menuowner`, buttonText: { displayText: global.t('ownerMenuButton', userId, groupId) || "👑 Menu Owner" }, type: 1 },
            { buttonId: `${usedPrefix}menusicurezza`, buttonText: { displayText: global.t('securityMenuButton', userId, groupId) || "🚨 Menu Sicurezza" }, type: 1 },
            { buttonId: `${usedPrefix}menuia`, buttonText: { displayText: global.t('aiMenuButton', userId, groupId) || "🤖 Menu IA" }, type: 1 }
        ],
        viewOnce: true,
        headerType: 4
    });
};

handler.help = ['menugruppo'];
handler.tags = ['menugruppo'];
handler.command = /^(gruppo|menugruppo)$/i;

export default handler;

function generateMenuText(prefix, userId, groupId) {
    const vs = global.vs || '8.0';
    const menuTitle = global.t('groupMenuTitle', userId, groupId) || '𝑴𝑬𝑵𝑼 𝐆𝐑𝐔𝐏𝐏𝐎';
    
    const createSection = (title, commands) => {
        const commandLines = commands.trim().split('\n').map(c => `┃◈┃• ${c.trim()}`).join('\n');
        return `┃◈╭─✦ *${title}* ✦═╗\n${commandLines}\n┃◈╰━━━━━━━━━━━━┈⊷`;
    };

    const sections = [
        createSection(global.t('musicAudioSection', userId, groupId) || 'MUSICA & AUDIO', `
🎵 *.play* (${global.t('songCommand', userId, groupId) || 'canzone'})
🎥 *.playlist*
🎥 *.ytsearch*
🎶 *.shazam* (${global.t('audioCommand', userId, groupId) || 'audio'})
🔊 *.tomp3* (${global.t('videoCommand', userId, groupId) || 'video'})
🎤 *.lyrics* (${global.t('artistTitleCommand', userId, groupId) || 'artista-titolo'})
        `),
        createSection(global.t('infoUtilitySection', userId, groupId) || 'INFORMAZIONI & UTILITÀ', `
🌍 *.meteo* (${global.t('cityCommand', userId, groupId) || 'città'})
🕒 *.orario* (${global.t('cityCommand', userId, groupId) || 'città'})
🌐 *.traduci* (${global.t('textCommand', userId, groupId) || 'testo'})
📊 *.contaparole* (${global.t('textCommand', userId, groupId) || 'testo'})
🆔 *.id* (${global.t('groupCommand', userId, groupId) || 'gruppo'})
💻 *.gitclone* (${global.t('repoCommand', userId, groupId) || 'repo'})
ℹ️ *.info* [@${global.t('userCommand', userId, groupId) || 'utente'}]
📜 *.regole*
📚 *.wikipedia* (${global.t('topicCommand', userId, groupId) || 'argomento'})
🔍 *.checkscam* (${global.t('checkSiteCommand', userId, groupId) || 'check sito'})
📜 *.dashboard*
🔍 *.cercaimmagine*
❓ *.script*
🛡️ *.offusca*
📰 *.news*
🗞️ *.notiziario*
        `),
        createSection(global.t('imageEditSection', userId, groupId) || 'IMMAGINI & MODIFICA', `
🛠️ *.sticker* (${global.t('photoToStickerCommand', userId, groupId) || 'foto a sticker'})
🖼️ *.png* (${global.t('stickerToPhotoCommand', userId, groupId) || 'sticker a foto'})
📷 *.hd* (${global.t('improveQualityCommand', userId, groupId) || 'migliora qualità foto'})
🖼️ *.rimuovisfondo* (${global.t('photoCommand', userId, groupId) || 'foto'})
🔍 *.rivela* (${global.t('hiddenPhotoCommand', userId, groupId) || 'foto nascosta'})
🤕 *.bonk* (${global.t('memeCommand', userId, groupId) || 'meme'})
🖼️ *.toimg* (${global.t('fromStickerCommand', userId, groupId) || 'da sticker'})
📖 *.leggi* (${global.t('photoCommand', userId, groupId) || 'foto'})
🌀 *.blur* (${global.t('blurImageCommand', userId, groupId) || 'sfoca immagine'})
🖼️ *.pinterest* (${global.t('comingSoonCommand', userId, groupId) || 'in arrivo'})
🎴 *.hornycard* [@${global.t('userCommand', userId, groupId) || 'utente'}]
🧠 *.stupido/a* @
🌀 *.emojimix*
🎯 *.wanted* @
🤡 *.scherzo* @
📱 *.nokia* @
🚔 *.carcere* @
📢 *.ads* @
        `),
        createSection(global.t('pokemonSection', userId, groupId) || 'POKEMON', `
🥚 *.apripokemon*
🛒 *.buypokemon*
🏆 *.classificapokemon*
🎁 *.pacchetti*
⚔️ *.combatti*
🔄 *.evolvi*
🌑 *.darknessinfo*
🎒 *.inventario*
🍀 *.pity*
🔄 *.scambia*
        `),
        createSection(global.t('gangSystemSection', userId, groupId) || 'GANG SYSTEM', `
🥷🏻 *.creagang*
🔪 *.infogang*
⛓ *.abbandonagang*
🩸 *.invitogang* @
🎧 *.caccialogang* @
        `),
        createSection(global.t('gamesCasinoSection', userId, groupId) || 'GIOCHI & CASINÒ', `
🎮 *.tris*
🎲 *.dado*
🎰 *.slot*
🏏 *.casinò*
💰 *.scommessa* (${global.t('quantityCommand', userId, groupId) || 'quantità'})
💰 *.blackjack*
💰 *.wordle*
🔫 *.roulette*
🪙 *.moneta* (${global.t('headsOrTailsCommand', userId, groupId) || 'testa o croce'})
🧮 *.mate* (${global.t('mathProblemCommand', userId, groupId) || 'problema mate'})
📈 *.scf* (${global.t('rockPaperScissorsCommand', userId, groupId) || 'sasso carta forbici'})
🐾 *.pokedex* (${global.t('pokemonInfoCommand', userId, groupId) || 'info Pokémon'})
🏳️ *.bandiera*
🎶 *.ic*
🤖 *.auto*
⚽ *.fut*
🎯 *.missioni*
        `),
        createSection(global.t('economyRankingSection', userId, groupId) || 'ECONOMIA & CLASSIFICHE', `
💰 *.portafoglio* (${global.t('balanceCommand', userId, groupId) || 'saldo'})
🏦 *.banca*
💸 *.daily*
🏆 *.topuser* (${global.t('topUsersCommand', userId, groupId) || 'top utenti'})
🏆 *.topgruppi*
💳 *.donauc*
🤑 *.ruba* @${global.t('userCommand', userId, groupId) || 'utente'}
📤 *.ritira* (${global.t('withdrawUCCommand', userId, groupId) || 'UC dalla banca'})
⛏️ *.mina* (${global.t('earnXPCommand', userId, groupId) || 'guadagna XP'})
📊 *.xp*
♾️ *.donaxp* @${global.t('userCommand', userId, groupId) || 'utente'}
🎯 *.rubaxp* @${global.t('userCommand', userId, groupId) || 'utente'}
        `),
        createSection(global.t('socialInteractionSection', userId, groupId) || 'INTERAZIONI SOCIALI', `
💔 *.divorzia* (${global.t('endRelationshipCommand', userId, groupId) || 'fine relazione'})
💌 *.amore* @${global.t('userCommand', userId, groupId) || 'utente'} (${global.t('affinityCommand', userId, groupId) || 'affinità'})
💋 *.bacia* @${global.t('userCommand', userId, groupId) || 'utente'}
😡 *.odio* @${global.t('userCommand', userId, groupId) || 'utente'}
🗣️ *.rizz* @${global.t('userCommand', userId, groupId) || 'utente'} (${global.t('charmCommand', userId, groupId) || 'fascino'})
☠️ *.minaccia* @${global.t('userCommand', userId, groupId) || 'utente'}
🔥 *.zizzania* @${global.t('userCommand', userId, groupId) || 'utente'} (${global.t('createFightCommand', userId, groupId) || 'crea litigi'})
🚫 *.obbligo* (${global.t('truthOrDareCommand', userId, groupId) || 'obb o v'})
💋 *.ditalino* @
💋 *.sega* @
💋 *.scopa* @
🖕 *.insulta* @
👥 *.amicizia/listamici* @
        `),
        createSection(global.t('howMuchSection', userId, groupId) || 'QUANTO È?', `
🏳️‍🌈 *.gay* @
🏳️‍🌈 *.lesbica* @
♿ *.ritardato/a* @
♿ *.down* @
♿ *.disabile* @
♿ *.mongoloide* @
⚫ *.negro* @
🐓 *.cornuto* @
        `),
        createSection(global.t('personalityTestSection', userId, groupId) || 'TEST PERSONALITÀ', `
🍺 *.alcolizzato*
🌿 *.drogato*
🍑 *.figa*
🍑 *.ano*
🎭 *.personalita*
🔮 *.zodiaco*
🏹 *.nomeninja*
😈 *.infame*
🙏 *.topbestemmie*
        `)
    ];

    const footer = `
┃◈╭─✦ *INFO* ✦═╗
┃◈┃• *${global.t('versionLabel', userId, groupId) || '𝑽𝑬𝑹𝑺𝑰𝑶𝑵𝑬'}:* ${vs}
┃◈┃• ${global.t('collabLabel', userId, groupId) || '𝐂𝐎𝐋𝐋𝐀𝐁: 𝐎𝐍𝐄 𝐏𝐈𝐄𝐂𝐄'}
┃◈┃• *${global.t('supportLabel', userId, groupId) || '𝐒𝐔𝐏𝐏𝐎𝐑𝐓𝐎'}:* (.supporto)
┃◈╰━━━━━━━━━━━━┈⊷
    `.trim();

    return `
╭━〔 *⚡${menuTitle}⚡* 〕━┈⊷
┃◈╭━━━━━━━━━━━━━·๏
┃◈┃• *${global.t('memberCommands', userId, groupId) || '𝑪𝑶𝑴𝑨𝑵𝑫𝑰 𝑷𝑬𝑹 𝑰 𝑴𝑬𝑴𝑩𝑹𝑰'}*
┃◈╰━━━━━━━━━━━━┈⊷
┃◈
${sections.join('\n┃◈\n')}
┃◈
${footer}
╰━━━━━━━━━━━━━┈·๏
    `.trim();
}
