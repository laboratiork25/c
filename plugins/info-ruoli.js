// Plugin fatto da Axtral_WiZaRd
import fs from 'fs';

const handler = m => m;

handler.before = async function (message, { conn }) {
    const imageFallback = 'media/fallback.png'; 

    const fetchBuffer = async (url) => {
        if (!url) return null;
        if (!/^https?:\/\//i.test(url)) {
            try {
                return fs.readFileSync(url);
            } catch (e) {
                return null;
            }
        }
        try {
            const fetchFn = globalThis.fetch || (await import('node-fetch').then(m => m.default));
            const res = await fetchFn(url);
            if (!res || !res.ok) return null;
            const ab = await res.arrayBuffer();
            return Buffer.from(ab);
        } catch (e) {
            console.error('fetchBuffer error:', e);
            return null;
        }
    };

    const chat = global.db.data.chats[message.chat] || {};
    const detectEnabled = chat.detect;

    if (message.messageStubType === 29 && detectEnabled) {
        let profilePicture;
        try {
            profilePicture = await conn.profilePictureUrl(message.messageStubParameters[0], 'image');
        } catch (e) {
            profilePicture = null;
        }

        const promotedUser = message.messageStubParameters[0];
        const sender = message.sender;

        const promotedName = await conn.getName(promotedUser).catch(() => null) || promotedUser.split('@')[0];
        const senderName   = await conn.getName(sender).catch(() => null) || sender.split('@')[0];

        await conn.sendMessage(message.chat, {
            text: `${senderName} 𝐡𝐚 𝐩𝐫𝐨𝐦𝐨𝐬𝐬𝐨 ${promotedName}`,
            contextInfo: {
                mentionedJid: [],
                externalAdReply: {
                    title: '𝐌𝐞𝐬𝐬𝐚𝐠𝐠𝐢𝐨 𝐝𝐢 𝐩𝐫𝐨𝐦𝐨𝐳𝐢𝐨𝐧𝐞 👑',
                    thumbnail: await fetchBuffer(profilePicture || imageFallback),
                },
            },
        }, { quoted: null });
    }

    if (message.messageStubType === 30 && detectEnabled) {
        let profilePicture;
        try {
            profilePicture = await conn.profilePictureUrl(message.messageStubParameters[0], 'image');
        } catch (e) {
            profilePicture = null;
        }

        const demotedUser = message.messageStubParameters[0];
        const sender = message.sender;

        const demotedName = await conn.getName(demotedUser).catch(() => null) || demotedUser.split('@')[0];
        const senderName  = await conn.getName(sender).catch(() => null) || sender.split('@')[0];

        await conn.sendMessage(message.chat, {
            text: `${senderName} 𝐡𝐚 𝐫𝐞𝐭𝐫𝐨𝐜𝐞𝐬𝐬𝐨 ${demotedName}`,
            contextInfo: {
                mentionedJid: [],
                externalAdReply: {
                    title: '𝐌𝐞𝐬𝐬𝐚𝐠𝐠𝐢𝐨 𝐝𝐢 𝐫𝐞𝐭𝐫𝐨𝐜𝐞𝐬𝐬𝐢𝐨𝐧𝐞 🙇🏻‍♂',
                    thumbnail: await fetchBuffer(profilePicture || imageFallback),
                },
            },
        }, { quoted: null });
    }
};

export default handler;
