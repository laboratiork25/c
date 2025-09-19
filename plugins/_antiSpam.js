// Codice di _antispam.js
import '../lib/language.js';

let userSpamCounters = {};  // Start
const STICKER_LIMIT = 6;  // Start
const PHOTO_VIDEO_LIMIT = 13;  // Start
const RESET_TIMEOUT = 5000;  // Start

export async function before(m, { isAdmin, isBotAdmin, conn }) {
    const userId = m.sender;
    const groupId = m.isGroup ? m.chat : null;
    
    if (m.isBaileys && m.fromMe) return true;
    if (!m.isGroup) return false;

    let chat = global.db.data.chats[m.chat] || {};
    let bot = global.db.data.settings[this.user.jid] || {};
    let delet = m.key.participant;
    let bang = m.key.id;
    const sender = m.sender;  // Start

    // Start
    if (!userSpamCounters[m.chat]) {
        userSpamCounters[m.chat] = {};
    }
    if (!userSpamCounters[m.chat][sender]) {
        userSpamCounters[m.chat][sender] = { stickerCount: 0, photoVideoCount: 0, tagCount: 0, messageIds: [], lastMessageTime: 0, timer: null };
    }

    const counter = userSpamCounters[m.chat][sender];
    const currentTime = Date.now();

    // Start
    const isSticker = m.message?.stickerMessage;
    // DlStart
    const isPhoto = m.message?.imageMessage || m.message?.videoMessage;
    // Start
    const isTaggingAll = m.message?.extendedTextMessage?.text?.includes('@all') || m.message?.extendedTextMessage?.text?.includes('@everyone');

    if (isSticker || isPhoto || isTaggingAll) {
        if (isSticker) {
            counter.stickerCount++;
        } else if (isPhoto) {
            counter.photoVideoCount++;
        } else if (isTaggingAll) {
            counter.tagCount++;
        }

        counter.messageIds.push(m.key.id);
        counter.lastMessageTime = currentTime;

        // Start
        if (counter.timer) {
            clearTimeout(counter.timer);
        }

        // Start
        const isStickerSpam = counter.stickerCount >= STICKER_LIMIT;
        const isPhotoVideoSpam = counter.photoVideoCount >= PHOTO_VIDEO_LIMIT;
        const isTagSpam = counter.tagCount > 0;

        if (isStickerSpam || isPhotoVideoSpam || isTagSpam) {
            if (isBotAdmin && bot.restrict) {
                try {
                    console.log(global.t('spamDetectedModifying', userId, groupId) || 'Spam rilevato! Modificando le impostazioni del gruppo...');

                    // Start
                    await conn.groupSettingUpdate(m.chat, 'announcement');
                    console.log(global.t('onlyAdminsCanSend', userId, groupId) || 'Solo gli amministratori possono inviare messaggi.');

                    // Start
                    if (!isAdmin) {
                        let responseb = await conn.groupParticipantsUpdate(m.chat, [sender], 'remove');
                        console.log(`Participant removal response: ${JSON.stringify(responseb)}`);

                        if (responseb[0].status === "404") {
                            console.log(global.t('userNotFoundOrRemoved', userId, groupId) || 'Utente non trovato o già rimosso.');
                        }
                    } else {
                        console.log(global.t('userIsAdminNotRemoved', userId, groupId) || 'L\'utente è un amministratore e non verrà rimosso.');
                    }

                    // Start
                    for (const messageId of counter.messageIds) {
                        await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: messageId, participant: delet } });
                        console.log(`Messaggio con ID ${messageId} eliminato.`);
                    }
                    console.log(global.t('allSpamMessagesDeleted', userId, groupId) || 'Tutti i messaggi di spam sono stati eliminati.');

                    // Start
                    await conn.groupSettingUpdate(m.chat, 'not_announcement');
                    console.log(global.t('chatReactivatedForAll', userId, groupId) || 'Chat riattivata per tutti i membri.');

                    // Start
                    await conn.sendMessage(m.chat, { text: global.t('antispamDetected', userId, groupId) || '*antispam by Origin detected*' });
                    console.log(global.t('antispamNotificationSent', userId, groupId) || 'Messaggio di notifica antispam inviato.');

                    // Start
                    delete userSpamCounters[m.chat][sender];
                    console.log(global.t('spamCounterReset', userId, groupId) || 'Contatore di spam per l\'utente resettato.');

                } catch (error) {
                    console.error(global.t('spamHandlingError', userId, groupId) || 'Errore durante la gestione dello spam:', error);
                }
            } else {
                console.log(global.t('botNotAdminOrRestrictionDisabled', userId, groupId) || 'Bot non è amministratore o la restrizione è disattivata. Non posso eseguire l\'operazione.');
            }
        } else {
            // Start
            counter.timer = setTimeout(() => {
                delete userSpamCounters[m.chat][sender];
                console.log(global.t('spamCounterResetTimeout', userId, groupId) || 'Contatore di spam per l\'utente resettato dopo il timeout.');
            }, RESET_TIMEOUT);
        }
    } else {
        // Start
        if (currentTime - counter.lastMessageTime > RESET_TIMEOUT && (counter.stickerCount > 0 || counter.photoVideoCount > 0 || counter.tagCount > 0)) {
            console.log(global.t('timeoutExpiredReset', userId, groupId) || 'Timeout scaduto. Reset del contatore di spam per l\'utente.');
            delete userSpamCounters[m.chat][sender];
        }
    }

    return true;
}
