import fetch from 'node-fetch';
import '../lib/language.js';

let handler = async (m, { conn, usedPrefix }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let user = global.db.data.users[who];
    let name = conn.getName(who);

    if (!(who in global.db.data.users)) {
        throw global.t('wallet_user_not_found', who);
    }

    if (!user.limit) user.limit = 0;
    if (!user.bank) user.bank = 0;

    let userbank = user.bank;
    let imgUrl = 'https://i.ibb.co/4RSNsdx9/Sponge-Bob-friendship-wallet-meme-9.png';

    let txt = global.t('wallet_display', who, {
        name: name,
        limit: formatNumber(user.limit),
        bank: formatNumber(userbank)
    });

    await conn.sendMessage(m.chat, {
        text: txt,
        mentions: [who],
        contextInfo: {
            externalAdReply: {
                title: global.t('wallet_ad_title', who, { name: name }),
                body: global.t('wallet_ad_body', who, { limit: user.limit }),
                thumbnailUrl: imgUrl,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    });

    m.react('💶');
};

handler.help = ['wallet'];
handler.tags = ['economy'];
handler.command = /^(soldi|wallet|portafoglio|uc|saldo|unitycoins|money|balance)$/i;
handler.register = true;

export default handler;

function formatNumber(num) {
    return new Intl.NumberFormat('it-IT').format(num);
}