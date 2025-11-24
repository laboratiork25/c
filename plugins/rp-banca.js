import '../lib/language.js';

let handler = async (m, { conn, usedPrefix }) => {
    const userId = m.sender;
    const groupId = m.chat;
    
    let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;

    if (!(who in global.db.data.users)) {
        return m.reply(global.t('bankNotFound', userId, groupId));
    }

    let user = global.db.data.users[who];
    
    // Inizializzazione sicura
    user.bank = Number(user.bank) || 0;

    const balance = formatNumber(user.bank);
    const isOwn = who === m.sender;
    
    const message = isOwn 
        ? global.t('bankYourBalance', userId, groupId, { balance })
        : global.t('bankUserBalance', userId, groupId, { 
            user: who.split('@')[0], 
            balance 
          });

    const buttons = isOwn ? [
        { 
            buttonId: `${usedPrefix}deposit`, 
            buttonText: { displayText: global.t('bankButtonDeposit', userId, groupId) }, 
            type: 1 
        },
        { 
            buttonId: `${usedPrefix}withdraw`, 
            buttonText: { displayText: global.t('bankButtonWithdraw', userId, groupId) }, 
            type: 1 
        },
        { 
            buttonId: `${usedPrefix}transfer`, 
            buttonText: { displayText: global.t('bankButtonTransfer', userId, groupId) }, 
            type: 1 
        }
    ] : [];

    // Invia l'immagine cubank.jpg
    await conn.sendMessage(m.chat, {
        image: { url: 'icone/cubank.jpg' },
        caption: message,
        buttons: buttons.length > 0 ? buttons : undefined,
        footer: 'ChatUnity Bank',
        mentions: [who],
        contextInfo: {
            externalAdReply: {
                title: '🏛️ ChatUnity Bank',
                body: `Saldo: ${balance} UC`,
                thumbnailUrl: 'https://i.ibb.co/bank-icon.png',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });

    await conn.sendMessage(m.chat, { 
        react: { text: '🏛️', key: m.key }
    });
};

handler.help = ['bank', 'banca'];
handler.tags = ['economy'];
handler.command = /^(bank|banca)$/i;
handler.register = true;

export default handler;

function formatNumber(num) {
    return new Intl.NumberFormat('it-IT').format(num);
}
