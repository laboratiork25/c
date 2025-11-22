let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;

async function before(m, { conn }) {
    // Verifica che sia chat privata
    if (m.isGroup) return;
    if (!m.text) return;
    
    // Verifica che il messaggio contenga un link di gruppo WhatsApp
    if (!linkRegex.test(m.text)) return;
    
    // Estrai il codice di invito dal link
    let [_, code] = m.text.match(linkRegex) || [];
    if (!code) {
        return m.reply('『 ❌ 』 *Link non valido*\n\n' +
                      '✅ Formato corretto: https://chat.whatsapp.com/xxxxxxxxx');
    }
    
    // Messaggio di elaborazione
    let processingMsg = await m.reply('🔄 Analizzando il gruppo...\n⏳ Controllo requisiti in corso...');
    
    try {
        // Ottieni informazioni sul gruppo senza entrare
        let groupInfo;
        try {
            groupInfo = await conn.groupGetInviteInfo(code);
        } catch (error) {
            return m.reply('『 ❌ 』 *Errore nell\'ottenere informazioni sul gruppo*\n\n' +
                          '💡 Possibili cause:\n' +
                          '• Link scaduto o revocato\n' +
                          '• Link non valido\n' +
                          '• Gruppo eliminato');
        }
        
        // Controlla il numero di membri (deve essere almeno 5)
        const MIN_MEMBERS = 5;
        if (groupInfo.size < MIN_MEMBERS) {
            return m.reply(`『 ❌ 』 **Gruppo troppo piccolo**\n\n` +
                          `📊 *Membri attuali:* ${groupInfo.size}\n` +
                          `📋 *Minimo richiesto:* ${MIN_MEMBERS} membri\n\n` +
                          `💡 Torna quando il gruppo avrà più membri!`);
        }
        
        // Controlla se gli inviti sono limitati agli amministratori
        if (groupInfo.restrict) {
            return m.reply('『 ❌ 』 *Accesso limitato*\n\n' +
                          '🔒 Solo gli amministratori possono invitare membri in questo gruppo.\n' +
                          '💡 Chiedi a un admin di aggiungermi manualmente.');
        }
        
        // Controlla se il bot è già nel gruppo
        try {
            let groupData = await conn.groupMetadata(groupInfo.id).catch(() => null);
            if (groupData) {
                return m.reply('『 ⚠ 』 *Sono già in questo gruppo!*\n\n' +
                              `📝 Nome: ${groupData.subject}\n` +
                              `👥 Membri: ${groupData.participants.length}`);
            }
        } catch (e) {
            // Gruppo non trovato, ok per procedere
        }

        // Aggiorna il messaggio di elaborazione
        await conn.sendMessage(m.chat, {
            text: '✅ Requisiti soddisfatti!\n🚀 Ingresso nel gruppo in corso...',
            edit: processingMsg.key
        });
        
        // Entra nel gruppo
        let joinResult = await conn.groupAcceptInvite(code);

        // Inizializza i dati del gruppo nel database
        let chats = global.db.data.chats[joinResult];
        if (!chats) {
            chats = global.db.data.chats[joinResult] = {};
        }

        chats.joinedBy = m.sender;
        chats.joinedAt = Date.now();

        // Messaggio di conferma all'utente
        let successMessage = `✅ **Ingresso completato con successo!**\n\n` +
                            `🏷 *Gruppo:* ${groupInfo.subject || 'Nome non disponibile'}\n` +
                            `👥 *Membri:* ${groupInfo.size}\n` +
                            `📅 *Data ingresso:* ${new Date().toLocaleString('it-IT')}\n\n` +
                            `💡 *Per assistenza, contatta:* wa.me/393773842461`;
        
        await m.reply(successMessage);

        // Invia messaggio di benvenuto al gruppo
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            await conn.sendMessage(joinResult, {
                text: `👋 **Ciao a tutti!**\n\n` +
                     `🤖 Sono ChatUnity Bot, felice di essere qui!\n\n` +
                     `💡 Per assistenza:\n` +
                     `📱 Contatta: wa.me/393773842461\n\n` +
                     `🚀 Buona giornata a tutti!`
            });
        } catch (welcomeError) {
            // Ignora errori nel messaggio di benvenuto
        }
        
    } catch (error) {
        let errorMessage = '『 ❌ 』 *Errore durante l\'ingresso nel gruppo*\n\n';
        
        if (error.message.includes('forbidden')) {
            errorMessage += '🔒 Accesso negato. Il gruppo potrebbe aver limitazioni.';
        } else if (error.message.includes('not-found')) {
            errorMessage += '🔍 Gruppo non trovato. Il link potrebbe essere scaduto.';
        } else if (error.message.includes('conflict')) {
            errorMessage += '⚠ Sono già nel gruppo o c\'è un conflitto.';
        } else {
            errorMessage += `💡 Riprova tra qualche minuto o verifica il link.\n📋 Errore: ${error.message}`;
        }
        
        errorMessage += '\n\n📧 Se il problema persiste, contatta: wa.me/393773842461';
        
        return m.reply(errorMessage);
    }
}

export default {
    before
};
