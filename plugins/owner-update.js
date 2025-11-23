import '../lib/language.js';
import { execSync } from 'child_process';

let handler = async (m, { conn, text }) => {
    const userId = m.sender;
    const groupId = m.chat;
    const nomeDelBot = conn.user?.name || global.db?.data?.nomedelbot || 'ChatUnity';

    try {
        // Messaggio di inizio aggiornamento
        await conn.sendMessage(m.chat, {
            text: global.t('updateInitiating', userId, groupId),
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

        // --- AGGIORNAMENTO FORZATO ---
        // Recupera tutto
        execSync('git fetch --all', { encoding: 'utf8' });

        // Reset hard per forzare
        execSync('git reset --hard origin/main', { encoding: 'utf8' });

        // Pull finale (non necessario ma utile per output)
        const output = execSync('git pull', { encoding: 'utf8' }).trim();

        // Se non ci sono cambiamenti
        if (/Already up.to.date/i.test(output)) {
            await conn.sendMessage(m.chat, {
                text: global.t('updateNoChanges', userId, groupId),
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
        } else {
            // Aggiornamento riuscito
            await conn.sendMessage(m.chat, {
                text: global.t('updateSuccess', userId, groupId, { output }),
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

    } catch (error) {
        // Messaggio di errore
        await conn.sendMessage(m.chat, {
            text: global.t('updateError', userId, groupId, { error: error.message }),
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
};

handler.help = ['aggiornabot', 'update'];
handler.tags = ['owner'];
handler.command = /^(aggiorna|update|aggiornabot)$/i;
handler.rowner = true;

export default handler;