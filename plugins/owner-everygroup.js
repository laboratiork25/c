import '../lib/language.js';

let handler = async (m, { conn, isOwner, text }) => {
    const userId = m.sender;
    const groupId = m.chat;
    const nomeDelBot = conn.user?.name || global.db?.data?.nomedelbot || 'ChatUnity';
    
    if (!isOwner) {
        return conn.sendMessage(m.chat, {
            text: global.t('broadcastNoOwner', userId, groupId),
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363259442839354@newsletter',
                    serverMessageId: '',
                    newsletterName: nomeDelBot
                }
            }
        }, { quoted: m });
    }
    
    const customMessage = text || global.t('broadcastDefaultMessage', userId, groupId);
    
    let groups = [];
    try {
        const groupData = await conn.groupFetchAllParticipating();
        groups = Object.keys(groupData);
    } catch (e) {
        const chats = Object.keys(conn.chats || {});
        groups = chats.filter(chat => chat.endsWith('@g.us'));
    }
    
    if (groups.length === 0) {
        return conn.sendMessage(m.chat, {
            text: global.t('broadcastNoGroups', userId, groupId),
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363259442839354@newsletter',
                    serverMessageId: '',
                    newsletterName: nomeDelBot
                }
            }
        }, { quoted: m });
    }
    
    const hiddenTag = "‎";
    let successCount = 0;
    let failCount = 0;
    
    for (let group of groups) {
        try {
            const metadata = await conn.groupMetadata(group).catch(() => null);
            
            if (!metadata || !metadata.participants || metadata.participants.length === 0) {
                failCount++;
                continue;
            }
            
            const participants = metadata.participants.map(u => u.id);
            
            const messageText = `${global.t('broadcastHeader', userId, groupId)}\n\n${global.t('broadcastIntro', userId, groupId)}\n\n${global.t('broadcastLabel', userId, groupId)}\n${customMessage}\n\n${global.t('broadcastNote', userId, groupId)}\n\n${global.t('broadcastFooter', userId, groupId)}\n\n${hiddenTag}`;
            
            await conn.sendMessage(group, { 
                text: messageText,
                mentions: participants,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363259442839354@newsletter',
                        serverMessageId: '',
                        newsletterName: nomeDelBot
                    }
                }
            });
            
            successCount++;
            await new Promise(resolve => setTimeout(resolve, 5000));
            
        } catch (err) {
            failCount++;
            if (err.message && err.message.includes('rate-overlimit')) {
                console.log(`⚠️ Rate limit raggiunto al gruppo ${successCount + 1}, pausa di 30 secondi...`);
                await new Promise(resolve => setTimeout(resolve, 30000));
            } else {
                console.error(`❌ Errore gruppo ${group}: ${err.message}`);
            }
        }
    }
    
    await conn.sendMessage(m.chat, {
        text: global.t('broadcastSuccess', userId, groupId, { count: successCount }),
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: nomeDelBot
            }
        }
    }, { quoted: m });
};

handler.help = ['everygroup <messaggio>'];
handler.tags = ['owner'];
handler.command = /^(everygroup|broadcastgroup|bcgroup)$/i;
handler.owner = true;

export default handler;
