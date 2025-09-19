import '../lib/language.js';

let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
    const userId = m.sender;
    const groupId = m.isGroup ? m.chat : null;
    
    let users = global.db.data.users[m.sender];
    let tempoAttesa = 10;

    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tempoAttesa * 1000) {
        let tempoRestante = secondiAHMS(Math.ceil((cooldowns[m.sender] + tempoAttesa * 1000 - Date.now()) / 1000));
        await conn.sendMessage(m.chat, { 
            text: global.t('rouletteCooldown', userId, groupId, { time: tempoRestante }),
            contextInfo: {
                forwardingScore: 99,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363259442839354@newsletter',
                    serverMessageId: '',
                    newsletterName: global.t('newsletterName', userId, groupId)
                }
            }
        }, { quoted: m });
        return;
    }

    cooldowns[m.sender] = Date.now();

    if (!text) {
        await conn.sendMessage(m.chat, { 
            text: global.t('rouletteFormat', userId, groupId, { prefix: usedPrefix, command }),
            contextInfo: {
                forwardingScore: 99,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363259442839354@newsletter',
                    serverMessageId: '',
                    newsletterName: global.t('newsletterName', userId, groupId)
                }
            }
        }, { quoted: m });
        return;
    }

    let args = text.trim().split(" ");
    if (args.length !== 2) {
        await conn.sendMessage(m.chat, { 
            text: global.t('rouletteInvalidFormat', userId, groupId, { prefix: usedPrefix, command }),
            contextInfo: {
                forwardingScore: 99,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363259442839354@newsletter',
                    serverMessageId: '',
                    newsletterName: global.t('newsletterName', userId, groupId)
                }
            }
        }, { quoted: m });
        return;
    }

    let limit = parseInt(args[0]);
    let color = args[1].toLowerCase();

    if (isNaN(limit) || limit <= 0) {
        await conn.sendMessage(m.chat, { 
            text: global.t('rouletteInvalidAmount', userId, groupId),
            contextInfo: {
                forwardingScore: 99,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363259442839354@newsletter',
                    serverMessageId: '',
                    newsletterName: global.t('newsletterName', userId, groupId)
                }
            }
        }, { quoted: m });
        return;
    }

    if (limit > 50) {
        await conn.sendMessage(m.chat, { 
            text: global.t('rouletteMaxBet', userId, groupId),
            contextInfo: {
                forwardingScore: 99,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363259442839354@newsletter',
                    serverMessageId: '',
                    newsletterName: global.t('newsletterName', userId, groupId)
                }
            }
        }, { quoted: m });
        return;
    }

    if (!(color === 'black' || color === 'red' || color === 'nero' || color === 'rosso')) {
        await conn.sendMessage(m.chat, { 
            text: global.t('rouletteInvalidColor', userId, groupId),
            contextInfo: {
                forwardingScore: 99,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363259442839354@newsletter',
                    serverMessageId: '',
                    newsletterName: global.t('newsletterName', userId, groupId)
                }
            }
        }, { quoted: m });
        return;
    }

    // Normalizza i colori (supporta sia italiano che inglese)
    if (color === 'nero') color = 'black';
    if (color === 'rosso') color = 'red';

    if (limit > (users.limit || 0)) {
        await conn.sendMessage(m.chat, { 
            text: global.t('rouletteInsufficient', userId, groupId),
            contextInfo: {
                forwardingScore: 99,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363259442839354@newsletter',
                    serverMessageId: '',
                    newsletterName: global.t('newsletterName', userId, groupId)
                }
            }
        }, { quoted: m });
        return;
    }

    await conn.sendMessage(m.chat, { 
        text: global.t('rouletteBetPlaced', userId, groupId, { 
            amount: limit, 
            color: color === 'black' ? global.t('black', userId, groupId) : global.t('red', userId, groupId),
            time: tempoAttesa 
        }),
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: global.t('newsletterName', userId, groupId)
            }
        }
    }, { quoted: m });

    setTimeout(() => {
        let result = Math.random();
        let win = false;

        if (result < 0.5) {
            win = color === 'black';
        } else {
            win = color === 'red';
        }
        
        if (win) {
            users.limit = (users.limit || 0) + limit;
            conn.sendMessage(m.chat, { 
                text: global.t('rouletteWin', userId, groupId, { 
                    amount: limit, 
                    total: users.limit || 0 
                }),
                contextInfo: {
                    forwardingScore: 99,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363259442839354@newsletter',
                        serverMessageId: '',
                        newsletterName: global.t('newsletterName', userId, groupId)
                    }
                }
            }, { quoted: m });
        } else {
            users.limit = Math.max(0, (users.limit || 0) - limit);
            conn.sendMessage(m.chat, { 
                text: global.t('rouletteLose', userId, groupId, { 
                    amount: limit, 
                    total: users.limit || 0 
                }),
                contextInfo: {
                    forwardingScore: 99,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363259442839354@newsletter',
                        serverMessageId: '',
                        newsletterName: global.t('newsletterName', userId, groupId)
                    }
                }
            }, { quoted: m });
        }
    }, 10000);
};

handler.tags = ['game'];
handler.help = ['ruleta *<quantità> <colore>*'];
handler.command = /^(ruleta|roulette|rt|russa)$/i;
handler.register = true;
handler.group = true;

export default handler;

function secondiAHMS(secondi) {
    let secondiRestanti = secondi % 60;
    return `${secondiRestanti} secondi`;
}