import '../lib/language.js';

const pinQueue = new Map();

let handler = async (m, { conn, command, usedPrefix }) => {
    const userId = m.sender;
    const groupId = m.isGroup ? m.chat : null;
    if (command === 'pin') {
        if (!m.quoted) return m.reply(global.t('pinReplyToMessage', userId, groupId) || `⚠️ Rispondi a un messaggio per fissarlo.`);

        
        pinQueue.set(m.chat, m.quoted);

        const buttons = [
            { buttonId: `${usedPrefix}pin1d`, buttonText: { displayText: global.t('pin1Day', userId, groupId) || '⏳ 1 Giorno' }, type: 1 },
            { buttonId: `${usedPrefix}pin7d`, buttonText: { displayText: global.t('pin7Days', userId, groupId) || '⏳ 7 Giorni' }, type: 1 },
            { buttonId: `${usedPrefix}pin30d`, buttonText: { displayText: global.t('pin30Days', userId, groupId) || '⏳ 30 Giorni' }, type: 1 },
        ];

        await conn.sendMessage(m.chat, {
            text: global.t('pinChooseDuration', userId, groupId) || 'Scegli per quanto tempo vuoi fissare il messaggio:',
            buttons,
            headerType: 1
        }, { quoted: m });
        return;
    }

    if (['pin1d', 'pin7d', 'pin30d'].includes(command)) {
        // Recupero il messaggio da pinnare salvato in pinQueue
        const quoted = pinQueue.get(m.chat);
        if (!quoted) return m.reply(global.t('pinNoMessageQueued', userId, groupId) || '❌ Nessun messaggio da fissare. Usa prima il comando pin rispondendo a un messaggio.');

        const messageKey = {
            remoteJid: m.chat,
            fromMe: quoted.fromMe,
            id: quoted.id,
            participant: quoted.sender
        };

        // Calcolo durata in ms in base al comando
        let durationMs = 0;
        if (command === 'pin1d') durationMs = 1 * 24 * 60 * 60 * 1000;
        else if (command === 'pin7d') durationMs = 7 * 24 * 60 * 60 * 1000;
        else if (command === 'pin30d') durationMs = 30 * 24 * 60 * 60 * 1000;

        try {
            await conn.sendMessage(m.chat, { pin: { key: messageKey, type: 1 } });

            // Conferma con il tempo in millisecondi
            

            m.react('✅️');

            // Pulisco la mappa per evitare confusione
            pinQueue.delete(m.chat);
        } catch (e) {
            console.error(e);
            m.reply(global.t('pinError', userId, groupId) || '❌ Errore nel fissare il messaggio.');
        }
        return;
    }

    // Comandi normali unpin, destacar, desmarcar
    if (['unpin', 'destacar', 'desmarcar'].includes(command)) {
        if (!m.quoted) return m.reply(global.t('unpinReplyToMessage', userId, groupId, { action: command === 'unpin' ? global.t('unpinAction', userId, groupId) || 'rimuoverlo dai fissati' : global.t('executeAction', userId, groupId) || 'eseguire l\'azione' }) || `⚠️ Rispondi a un messaggio per ${command === 'unpin' ? 'rimuoverlo dai fissati' : 'eseguire l\'azione'}.`);

        const messageKey = {
            remoteJid: m.chat,
            fromMe: m.quoted.fromMe,
            id: m.quoted.id,
            participant: m.quoted.sender
        };

        try {
            switch (command) {
                case 'unpin':
                    await conn.sendMessage(m.chat, { pin: { key: messageKey, type: 2 } });
                    break;
                case 'destacar':
                    await conn.sendMessage(m.chat, { keep: { key: messageKey, type: 1 } });
                    break;
                case 'desmarcar':
                    await conn.sendMessage(m.chat, { keep: { key: messageKey, type: 2 } });
                    break;
            }
            m.react('✅️');
        } catch (err) {
            console.error('[ERRORE]', err);
            m.reply(global.t('commandError', userId, groupId) || '❌ Errore nell\'eseguire il comando.');
        }
        return;
    }
};

handler.help = ['pin'];
handler.tags = ['gruppo'];
handler.command = ['pin', 'unpin', 'destacar', 'desmarcar', 'pin1d', 'pin7d', 'pin30d'];
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;