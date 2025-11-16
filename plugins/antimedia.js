import '../lib/language.js';

export async function before(m, { conn }) {
    if (!m.isGroup || m.isBaileys) return true;

    const chat = global.db.data.chats[m.chat];
    if (!chat.antimedia) return true;

    const msg = m.msg || {};
    const type = m.mtype || '';
    const userId = m.sender;
    const groupId = m.chat;

    if (m.sender === conn.user.jid) return true;

    const groupMetadata = await conn.groupMetadata(m.chat);
    const admins = groupMetadata.participants
        .filter(p => p.admin)
        .map(p => p.id);

    if (admins.includes(m.sender)) return true;

    if (['imageMessage', 'videoMessage'].includes(type)) {
        const isViewOnce = msg?.[type]?.viewOnce;
        const isGif = msg?.videoMessage?.gifPlayback;

        if (!isViewOnce || isGif) {
            await conn.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant || m.sender
                }
            });

            await conn.sendMessage(m.chat, {
                text: global.t('antiMediaWarning', userId, groupId),
                mentions: [m.sender]
            });
        }
    }

    return true;
}
