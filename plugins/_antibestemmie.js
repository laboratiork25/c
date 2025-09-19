import '../lib/language.js';
let handler = async (m, { conn, isAdmin, isBotAdmin, usedPrefix, command }) => {
    // Gestione comando per attivare/disattivare la funzionalità
    if (command === 'antibestemmia') {
        if (!m.isGroup) return m.reply('Questo comando funziona solo nei gruppi!');
        if (!isAdmin) return m.reply('Solo gli admin possono usare questo comando!');
        
        global.db.data.chats[m.chat] = global.db.data.chats[m.chat] || {};
        global.db.data.chats[m.chat].antibestemmie = !global.db.data.chats[m.chat].antibestemmie;
        
        return m.reply(`Anti-bestemmie ${global.db.data.chats[m.chat].antibestemmie ? 'attivato' : 'disattivato'}!`);
    }

    // Funzione principale di rilevamento
    if (
        !m.isGroup ||
        !global.db.data.chats?.[m.chat]?.antibestemmie ||
        isAdmin ||
        !isBotAdmin ||
        typeof m.text !== 'string'
    ) return;

    try {
        // Cache locale per evitare troppe richieste API
        const cacheKey = `bestemmia:${m.sender}:${m.text.toLowerCase().trim()}`;
        if (global.cache && global.cache[cacheKey]) return;
        
        // Controllo rapido con regex locale prima di chiamare l'API
        const quickCheck = /(d[i1!][o0]|porc|madonn|crist|ges[uù])/i.test(m.text);
        if (!quickCheck) return;
        
        // Chiamata all'API esterna
        const apiUrl = `https://deliriusapi-official.vercel.app/ia/gptweb?text=${encodeURIComponent(m.text)}&lang=it`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        
        const data = await response.json();
        const isBestemmia = data.result && data.result.includes("bestemmia");
        
        // Salva nella cache
        if (global.cache) global.cache[cacheKey] = isBestemmia;
        if (!isBestemmia) return;

        // Gestione utente e warn
        if (!global.db.data.users) global.db.data.users = {};
        if (!global.db.data.users[m.sender]) {
            global.db.data.users[m.sender] = { warn: 0, lastWarn: 0 };
        }

        const user = global.db.data.users[m.sender];
        const now = Date.now();
        
        // Reset warn dopo 24 ore
        if (now - user.lastWarn > 86400000) user.warn = 0;
        
        user.warn += 1;
        user.lastWarn = now;

        // Elimina il messaggio
        await conn.sendMessage(m.chat, { delete: m.key }).catch(console.error);

        // Gestione azioni in base ai warn
        if (user.warn >= 3) {
            user.warn = 0;
            try {
                await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
                await conn.sendMessage(
                    m.chat, 
                    { 
                        text: `⛔ *${m.pushName || 'Utente'} rimosso* per bestemmie ripetute (3 avvertimenti)`,
                        mentions: [m.sender]
                    }, 
                    { quoted: m }
                );
            } catch (e) {
                console.error("Errore rimozione utente:", e);
                await conn.sendMessage(
                    m.chat, 
                    { text: `⚠️ Impossibile rimuovere l'utente per bestemmie. Controlla i permessi del bot.` },
                    { quoted: m }
                );
            }
        } else {
            const remaining = 3 - user.warn;
            await conn.sendMessage(
                m.chat, 
                { 
                    text: `⚠️ *Avvertimento ${user.warn}/3* a ${m.pushName || 'Utente'} per bestemmia!\n` +
                          `⚠️ *Mancano ${remaining} avvertimenti* prima del ban.`,
                    mentions: [m.sender]
                }, 
                { quoted: m }
            );
        }
    } catch (error) {
        console.error("Errore nel controllo delle bestemmie:", error);
        // Fallback a controllo locale in caso di errore API
        const localCheck = /(d[i1!][o0][\s\W]?[^a-z]|porc[o0]|madonn|crist|ges[uù])/i.test(m.text);
        if (localCheck) {
            await conn.sendMessage(m.chat, { delete: m.key }).catch(console.error);
            await conn.sendMessage(
                m.chat,
                { text: `⚠️ Messaggio eliminato per possibile contenuto inappropriato.` },
                { quoted: m }
            );
        }
    }
};

handler.command = ['antibestemmia'];
handler.tags = ['group'];
handler.help = ['antibestemmia (attiva/disattiva il filtro bestemmie)'];
handler.admin = true;
handler.group = true;

export default handler;