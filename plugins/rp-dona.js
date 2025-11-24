import '../lib/language.js';

let tassa = 0.02; // 2% di tassa sulle transazioni

let handler = async (m, { conn, text }) => {
    const userId = m.sender;
    const groupId = m.chat;
    
    let who;
    if (m.isGroup) who = m.mentionedJid?.[0]; // Se in gruppo, prende l'utente menzionato
    else who = m.chat; // Se in privato, usa l'utente corrente
    
    if (!who) throw global.t('transferNoMention', userId, groupId);
    if (who === m.sender) throw global.t('transferSelf', userId, groupId);
    
    let txt = text.replace('@' + who.split`@`[0], '').trim();
    if (!txt) throw global.t('transferNoAmount', userId, groupId);
    if (isNaN(txt)) throw global.t('transferInvalidAmount', userId, groupId);
    
    let Unitycoins = parseInt(txt);
    let costo = Unitycoins;
    let tassaImporto = Math.ceil(Unitycoins * tassa);
    costo += tassaImporto;
    
    if (costo < 1) throw global.t('transferMinAmount', userId, groupId);
    
    let users = global.db.data.users;
    
    // Inizializzazione sicura
    if (!users[m.sender]) users[m.sender] = { limit: 0 };
    if (!users[who]) users[who] = { limit: 0 };
    if (!users[m.sender].limit) users[m.sender].limit = 0;
    if (!users[who].limit) users[who].limit = 0;
    
    if (costo > users[m.sender].limit) throw global.t('transferInsufficient', userId, groupId);
    
    // Esegui la transazione
    users[m.sender].limit -= costo;
    users[who].limit += Unitycoins;
    
    // Messaggio di conferma per mittente
    await conn.sendMessage(m.chat, {
        text: global.t('transferSuccess', userId, groupId, {
            amount: formatNumber(Unitycoins),
            fee: formatNumber(tassaImporto),
            total: formatNumber(costo)
        }),
        mentions: [who],
        contextInfo: {
            externalAdReply: {
                title: '💸 Trasferimento UC',
                body: `Inviati ${formatNumber(Unitycoins)} UC`,
                thumbnailUrl: 'https://i.ibb.co/transfer-icon.png',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
    
    // Notifica il destinatario
    await conn.sendMessage(who, {
        text: global.t('transferReceived', userId, groupId, { 
            amount: formatNumber(Unitycoins) 
        }),
        mentions: [m.sender]
    });

    await conn.sendMessage(m.chat, { 
        react: { text: '💸', key: m.key }
    });
};

handler.help = ['transfer @user <amount>', 'bonifico @user <amount>'];
handler.tags = ['economy'];
handler.command = /^(daiUnitycoins|transfer|bonifico|trasferisci|donauc|pay)$/i;
handler.register = true;

export default handler;

function formatNumber(num) {
    return new Intl.NumberFormat('it-IT').format(num);
}
