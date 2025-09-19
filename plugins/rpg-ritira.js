import '../lib/language.js';
let handler = async (m, { args, usedPrefix, command }) => {
    let user = global.db.data.users[m.sender];
    
    // Inizializza i valori se non esistono
    user.bank = Number(user.bank) || 0;
    user.limit = Number(user.limit) || 0;

    if (!args[0]) return conn.sendMessage(m.chat, { 
        text: global.t('withdraw_no_amount', m.sender),
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });

    if (args[0].toLowerCase() === 'all' || args[0].toLowerCase() === 'tutto') {
       let count = Math.floor(user.bank);
       if (count <= 0) return conn.sendMessage(m.chat, { 
           text: global.t('withdraw_no_money', m.sender),
           contextInfo: {
               forwardingScore: 99,
               isForwarded: true,
               forwardedNewsletterMessageInfo: {
                   newsletterJid: '120363259442839354@newsletter',
                   serverMessageId: '',
                   newsletterName: 'ChatUnity'
               }
           }
       }, { quoted: m });
       user.bank -= count;
       user.limit += count;
       await conn.sendMessage(m.chat, { 
           text: global.t('withdraw_success_all', m.sender, { amount: count }),
           contextInfo: {
               forwardingScore: 99,
               isForwarded: true,
               forwardedNewsletterMessageInfo: {
                   newsletterJid: '120363259442839354@newsletter',
                   serverMessageId: '',
                   newsletterName: 'ChatUnity'
               }
           }
       }, { quoted: m });
       return;
    }

    if (isNaN(args[0])) return conn.sendMessage(m.chat, { 
        text: global.t('withdraw_invalid_number', m.sender),
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });

    let count = Math.floor(Number(args[0]));
    if (count < 1) return conn.sendMessage(m.chat, { 
        text: global.t('withdraw_minimum', m.sender),
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });

    if (user.bank <= 0) return conn.sendMessage(m.chat, { 
        text: global.t('withdraw_no_money', m.sender),
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });

    if (user.bank < count) return conn.sendMessage(m.chat, { 
        text: global.t('withdraw_insufficient', m.sender, { balance: user.bank }),
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });

    user.bank -= count;
    user.limit += count;
    await conn.sendMessage(m.chat, { 
        text: global.t('withdraw_success', m.sender, { 
            amount: count, 
            balance: user.bank 
        }),
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });
};

handler.help = ['withdraw', 'ritira'];
handler.tags = ['rpg'];
handler.command = /^(withdraw|retirar|ritira|preleva)$/i;
handler.register = true;
export default handler;