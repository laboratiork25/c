import '../lib/language.js';

export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) {
        return true;
    }
    if (!m.isGroup) {
        return false;
    }
    
    let chat = global.db.data.chats[m.chat] || {};
    let bot = global.db.data.settings[this.user.jid] || {};
    const userId = m.sender;
    const groupId = m.chat;
    
    if (chat.antiTraba && m.text.length > 4000) {
        const user = m.sender.split("@")[0];
        
        if (isAdmin) {
            return await conn.sendMessage(m.chat, { 
                text: global.t('antiTrabaAdminWarning', userId, groupId, { user }), 
                mentions: [m.sender] 
            });
        }

        if (isBotAdmin) {
            await conn.sendMessage(m.chat, { 
                delete: { 
                    remoteJid: m.chat, 
                    fromMe: false, 
                    id: m.key.id, 
                    participant: m.key.participant 
                }
            });

            setTimeout(async () => {
                await conn.sendMessage(m.chat, {
                    text: global.t('antiTrabaDetected', userId, groupId, { user }),
                    mentions: [m.sender]
                });
            }, 0);

            setTimeout(async () => {
                await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            }, 1000);

        } else if (!bot.restrict) {
            return m.reply(global.t('antiTrabaNoPermission', userId, groupId));
        }
    }
    
    return true;
}

