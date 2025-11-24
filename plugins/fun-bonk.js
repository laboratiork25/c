import '../lib/language.js';
import jimp from 'jimp';

let handler = async (m, { conn, text }) => {
    const userId = m.sender;
    const groupId = m.chat;
    
    try {
        let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;
        let avatarUrl = await conn.profilePictureUrl(who, 'image').catch(() => null);

        if (!avatarUrl) {
            return conn.reply(m.chat, global.t('bonkNoPhoto', userId, groupId), m);
        }

        let img = await jimp.read('https://i.imgur.com/nav6WWX.png');
        let avatar = await jimp.read(avatarUrl);

        let bonk = await img.composite(avatar.resize(128, 128), 120, 90, {
            mode: 'dstOver',
            opacitySource: 1,
            opacityDest: 1
        }).getBufferAsync('image/png');

        conn.sendMessage(m.chat, { image: bonk }, { quoted: m });

    } catch (error) {
        console.error(error);
        conn.reply(m.chat, global.t('bonkError', userId, groupId), m);
    }
};

handler.help = ['bonk [@user]'];
handler.tags = ['fun'];
handler.command = /^(bonk)$/i;

export default handler;
