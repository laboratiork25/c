import '../lib/language.js';
import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix }) => {
    const userId = m.sender;
    const groupId = m.chat;
    
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let user = global.db.data.users[who];
    let name = conn.getName(who);

    if (!(who in global.db.data.users)) {
        throw global.t('walletNotFound', userId, groupId);
    }

    // Inizializzazione valori se mancanti
    if (!user.limit) user.limit = 0;
    if (!user.bank) user.bank = 0;

    let userbank = user.bank;
    let imgUrl = 'https://i.ibb.co/4RSNsdx9/Sponge-Bob-friendship-wallet-meme-9.png';
    
    const message = global.t('walletInfo', userId, groupId, {
        name,
        uc: formatNumber(user.limit),
        bank: formatNumber(userbank)
    });

    const buttons = [
        { 
            buttonId: `${usedPrefix}deposit`, 
            buttonText: { displayText: global.t('walletButtonDeposit', userId, groupId) }, 
            type: 1 
        },
        { 
            buttonId: `${usedPrefix}withdraw`, 
            buttonText: { displayText: global.t('walletButtonWithdraw', userId, groupId) }, 
            type: 1 
        },
        { 
            buttonId: `${usedPrefix}games`, 
            buttonText: { displayText: global.t('walletButtonGames', userId, groupId) }, 
            type: 1 
        }
    ];

    await conn.sendMessage(m.chat, {
        text: message,
        buttons: buttons,
        footer: 'ChatUnity Economy',
        mentions: [who],
        contextInfo: {
            externalAdReply: {
                title: global.t('walletExternalTitle', userId, groupId, { name }),
                body: global.t('walletExternalBody', userId, groupId, { uc: formatNumber(user.limit) }),
                thumbnailUrl: imgUrl,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });

    await conn.sendMessage(m.chat, { 
        react: { text: '💶', key: m.key }
    });
};

handler.help = ['wallet', 'portafoglio', 'balance'];
handler.tags = ['economy'];
handler.command = /^(soldi|wallet|portafoglio|uc|saldo|unitycoins|balance)$/i;
handler.register = true;

export default handler;

function formatNumber(num) {
    return new Intl.NumberFormat('it-IT').format(num);
}
