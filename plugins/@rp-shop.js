import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { initializeInteractiveFunctions } from '../lib/interactive.js'

let _sharp
async function getSharp() {
    if (_sharp) return _sharp
    try {
        const mod = await import('sharp')
        _sharp = mod.default || mod
        return _sharp
    } catch (e) {
        console.warn('sharp not available for rpg-shop:', e && e.message ? e.message : e)
        return null
    }
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function formatNumber(num) {
  return String(num).replace(/\d/g, d => `${d}͏`);
}

// Blocchi di durata scudo in ms
const durataScudo = {
    scudo: 1 * 60 * 60 * 1000,      // 1 ora
    scudo3h: 3 * 60 * 60 * 1000,    // 3 ore
    scudo6h: 6 * 60 * 60 * 1000,    // 6 ore
    scudo12h: 12 * 60 * 60 * 1000   // 12 ore
}

// Funzione per controllare se lo scudo è ancora attivo
function isShieldActive(user) {
    if (!user.scudoScadenza) return false;
    return Date.now() < Date.parse(user.scudoScadenza);
}

// Funzione per ottenere il tempo rimanente dello scudo
function getShieldTimeRemaining(user) {
    if (!user.scudoScadenza) return null;
    const now = Date.now();
    const expiry = Date.parse(user.scudoScadenza);
    const remaining = expiry - now;

    if (remaining <= 0) return null;
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    return { hours, minutes, seconds, total: remaining };
}

// Funzione per calcolare la durata dello scudo attivo
function getShieldDurationMs(user) {
    if (!user.scudoScadenza) return 0;
    const now = Date.now();
    const expiry = new Date(user.scudoScadenza).getTime();
    return Math.max(0, expiry - now);
}

// Funzione per ottenere la durata dello scudo in ms
function searchShopItem(query) {
    const results = []
    const searchTerm = (query || '').toLowerCase()
    const activeDiscounts = getActiveDiscounts()

    for (const [category, items] of Object.entries(shopItems)) {
        for (const item of items) {
            if (
                item.name.toLowerCase().includes(searchTerm) ||
                item.item.toLowerCase().includes(searchTerm) ||
                (item.aliases && item.aliases.some(alias => alias.toLowerCase().includes(searchTerm)))
            ) {
                const priceInfo = discountSystem.getDiscountedPrice(item.item, item.price, activeDiscounts)
                results.push({ item: item.item, name: item.name, category, priceInfo })
            }
        }
    }

    return results
}
const thumb = fs.readFileSync(path.resolve('./media/shop/shop.png'))
// Helper: costruisce un quoted message di tipo OrderMessage, opzionalmente con thumbnail bytes
function createOrderMessage(quantity = 0, type = 'Acquisto', thumbBuffer = null) {
    const order = {
        key: { remoteJid: '0@s.whatsapp.net' },
        message: {
            orderMessage: {
                itemCount: quantity,
                status: 1,
                surface: 1,
                message: global.botname || 'Bot Shop',
                orderTitle: type,
                sellerJid: '0@s.whatsapp.net',
                thumbnail: thumb
            }
        }
    }

    return order
}
const discountSystem = {
    // Configurazione sconti possibili
    discountRanges: [
        { min: 10, max: 25, weight: 50 },
        { min: 30, max: 45, weight: 30 },
        { min: 50, max: 70, weight: 15 },
        { min: 75, max: 90, weight: 5 }
    ],

    // Durata possibile degli sconti (in minuti)
    durationOptions: [30, 45, 60, 90, 120, 180],

    // Probabilità che un oggetto abbia uno sconto
    discountChance: 0.3,

    // Intervallo per rigenerare sconti (in millisecondi)
    refreshInterval: 15 * 60 * 1000,

    generateRandomDiscount() {
        const random = Math.random() * 100;
        let weightSum = 0;
        for (const range of this.discountRanges) {
            weightSum += range.weight;
            if (random <= weightSum) return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
        }
        return this.discountRanges[0].min;
    },

    generateRandomDuration() {
        return this.durationOptions[Math.floor(Math.random() * this.durationOptions.length)];
    },

    isDiscountValid(discountData) {
        if (!discountData || !discountData.expiresAt) return false;
        return new Date() < new Date(discountData.expiresAt);
    },

    generateDiscounts(shopItems) {
        const discounts = {};
        const now = new Date();
        for (const [category, items] of Object.entries(shopItems)) {
            for (const item of items) {
                if (Math.random() < this.discountChance) {
                    const discount = this.generateRandomDiscount();
                    const duration = this.generateRandomDuration();
                    const expiresAt = new Date(now.getTime() + (duration * 60 * 1000));
                    discounts[item.item] = {
                        percentage: discount,
                        expiresAt: expiresAt.toISOString(),
                        originalPrice: item.price,
                        discountedPrice: Math.floor(item.price * (100 - discount) / 100)
                    };
                }
            }
        }
        return discounts;
    },

    getDiscountedPrice(itemKey, originalPrice, activeDiscounts) {
        const discount = activeDiscounts[itemKey];
        if (!discount || !this.isDiscountValid(discount)) return { price: originalPrice, hasDiscount: false };
        return {
            price: discount.discountedPrice,
            hasDiscount: true,
            discount: discount.percentage,
            originalPrice: originalPrice,
            expiresAt: discount.expiresAt
        };
    },

    formatTimeRemaining(expiresAt) {
        const now = new Date();
        const expiry = new Date(expiresAt);
        const remaining = expiry - now;
        if (remaining <= 0) return null;
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        if (hours > 0) return `${hours}h ${minutes}m`;
        return `${minutes}m`;
    }
};

// Lista completa del negozio con prezzi
const shopItems = {
    '🧪 POZIONI': [
        { name: 'Minore (25 HP)', price: 20, item: 'pozioneminore', aliases: ['pozione minore', 'cura minore', 'piccola'] },
        { name: 'Maggiore (50 HP)', price: 40, item: 'pozionemaggiore', aliases: ['pozione maggiore', 'cura maggiore', 'media'] },
        { name: 'Grande (100 HP)', price: 80, item: 'pozionedefinitiva', aliases: ['pozione definitiva', 'cura definitiva', 'grande'] }
    ],
    '🚗 VEICOLI': [
        { name: 'Macchina 🚗', price: 300, item: 'macchina', aliases: ['auto'] },
        { name: 'Moto 🏍️', price: 200, item: 'moto', aliases: ['motocicletta'] },
        { name: 'Bicicletta 🚴🏻', price: 50, item: 'bici', aliases: ['bicicletta'] }
    ],
    '🎣 ATTREZZI': [
        { name: 'Canna da Pesca 🎣', price: 30, item: 'canna', aliases: ['canna da pesca'] }
    ],
    '🎋 SEMI': [
        { name: 'Seme Comune 🌱', price: 15, item: 'seme_comune', aliases: ['seme', 'seme comune', 'semi'] },
        { name: 'Seme Raro 🌿', price: 120, item: 'seme_raro', aliases: ['seme raro'] },
        { name: 'Seme Tossico ☠️', price: 50, item: 'seme_tossico', aliases: ['seme tossico', 'seme veleno'] }
    ],
    '🛡️ PROTEZIONI': [
    { name: 'Vita 💞', price: 200, item: 'vita', aliases: ['vita', 'vita extra', 'seconda vita', 'respawn'] },
    { name: 'Scudo (1h) 🛡️', price: 300, item: 'scudo', aliases: ['scudo', 'scudo p', 'scudo 1h'] },
    { name: 'Scudo (3h) 🛡️', price: 500, item: 'scudo3h', aliases: ['scudo 3h', 'scudo medio'] },
    { name: 'Scudo (6h) 🛡️', price: 800, item: 'scudo6h', aliases: ['scudo 6h', 'scudo lungo'] },
    { name: 'Scudo (12h) 🛡️', price: 1200, item: 'scudo12h', aliases: ['scudo 12h', 'scudo massimo'] }
    ],
    '🥞 SPECIALI': [
        { name: 'Flame Pass 🔥', price: 500, item: 'flamePass', aliases: ['flamepass', ' flame', 'pass'] },
        { name: 'Gettone 🪙', price: 5000, item: 'joincount', aliases: ['gettoni', 'token', 'gettone', 'crediti', 'credito'] },
        { name: 'Forcina 📎', price: 9999, item: 'forcina', aliases: ['scassina', 'forcine'] },
        { name: 'Filtro 🤐', price: 4000, item: 'filtro', aliases: ['filtro', ' filtri'] },
        { name: 'Lente 🔎', price: 150000, item: 'lente', aliases: ['lente', 'lenti'] },
        { name: 'Name Tag 🏷️', price: 300, item: 'nametag', aliases: ['tag', 'name tag', 'targhetta', 'targhette'] }
    ],
    '🐾 ANIMALI': [
    { name: 'Cane🐶', price: 500, item: 'cane', aliases: ['cani'] },
    { name: 'Pollo🐔', price: 100, item: 'pollo', aliases: ['pollo', 'polli', 'chicken'] },
        { name: 'Gatto🐈', price: 300, item: 'gatto', aliases: ['gatti'] },
        { name: 'Coniglio🐇', price: 340, item: 'coniglio', aliases: ['conigli'] },
        { name: 'Drago🐲', price: 4000, item: 'drago', aliases: ['lucertola'] },
        { name: 'Piccione🐦‍⬛', price: 450, item: 'piccione', aliases: ['uccello', 'pappagallo'] },
        { name: 'Serpente🐍', price: 1200, item: 'serpente', aliases: ['serpeente'] },
        { name: 'Cavallo🐎', price: 2000, item: 'cavallo', aliases: ['cavall'] },
        { name: 'Pesce🐟', price: 500, item: 'pesce', aliases: ['pesciolino'] },
        { name: 'Riccio🦔', price: 700, item: 'riccio', aliases: ['ricci'] },
        { name: 'Scoiattolo🐿️', price: 1400, item: 'scoiattolo', aliases: ['sksk'] },
        { name: 'polpo🐙', price: 900, item: 'polpo', aliases: ['squid', 'squiddi', 'squiddy'] },
        { name: 'ragno🕷️', price: 3000, item: 'ragno', aliases: ['ragni'] },
        { name: 'scorpione🦂', price: 4000, item: 'scorpione', aliases: ['scorpioni', 'scorpy']}
    ]
}

// --- CASE DISPONIBILI (sincronizzate con rpg-casa.js) ---
const CASE = [
  {
    key: 'monolocale',
    name: 'Monolocale',
    price: 500,
    affitto: 100,
    intervallo: 3 * 24 * 60 * 60 * 1000, // 3 giorni
    vantaggi: 'Protezione base dai furti',
    svantaggi: 'Nessun bonus extra',
    thumb: 'https://th.bing.com/th/id/OIP.bT04673UsqHMTgp7f431AwHaEK',
    aliases: ['monolocale', 'mono', 'casa piccola']
  },
  {
    key: 'villa',
    name: 'Villa',
    price: 3000,
    affitto: 600,
    intervallo: 7 * 24 * 60 * 60 * 1000, // 7 giorni
    vantaggi: 'Protezione avanzata, +5% XP',
    svantaggi: 'Affitto alto',
    thumb: 'https://th.bing.com/th/id/OIP.vXmLY5v6LPxpZ7oA3xndMwHaEK?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
    aliases: ['villa', 'casa grande']
  },
  {
    key: 'castello',
    name: 'Castello',
    price: 10000,
    affitto: 2000,
    intervallo: 14 * 24 * 60 * 60 * 1000, // 14 giorni
    vantaggi: 'Protezione massima, +10% XP, +10% guadagni',
    svantaggi: 'Affitto molto alto',
    thumb: 'https://th.bing.com/th/id/OIP.PYwMW2KlbAIkyuLo8Fe61gHaDt?r=0&cb=thvnextc1&rs=1&pid=ImgDetMain&o=7&rm=3',
    aliases: ['castello', 'palazzo', 'reggia']
  }
]

// --- AGGIUNGI CASE AL NEGOZIO ---
if (!shopItems['🏡 CASE']) {
  shopItems['🏡 CASE'] = CASE.map(c => ({
    name: c.name,
    price: c.price,
    item: c.key,
    aliases: c.aliases
  }))
}

// Crea mappa alias per ricerca oggetti
function createAliasMap() {
    const aliasMap = {}
    for (const category of Object.values(shopItems)) {
        for (const item of category) {
            aliasMap[item.item] = {
                name: item.name,
                price: item.price,
                aliases: [item.item, ...item.aliases]
            }
        }
    }
    return aliasMap
}

// Gestione sconti globali
function getActiveDiscounts() {
    // Inizializza se non esiste
    if (!global.shopDiscounts) {
        global.shopDiscounts = {
            discounts: {},
            lastRefresh: 0
        };
    }
    
    const now = Date.now();
    const timeSinceRefresh = now - global.shopDiscounts.lastRefresh;
    
    // Rigenera sconti se è passato abbastanza tempo o se non ce ne sono
    if (timeSinceRefresh > discountSystem.refreshInterval || Object.keys(global.shopDiscounts.discounts).length === 0) {
        // Pulisci sconti scaduti
        for (const [key, discount] of Object.entries(global.shopDiscounts.discounts)) {
            if (!discountSystem.isDiscountValid(discount)) {
                delete global.shopDiscounts.discounts[key];
            }
        }
        
        // Genera nuovi sconti
        const newDiscounts = discountSystem.generateDiscounts(shopItems);
        global.shopDiscounts.discounts = { ...global.shopDiscounts.discounts, ...newDiscounts };
        global.shopDiscounts.lastRefresh = now;
    }
    
    return global.shopDiscounts.discounts;
}

// Genera il testo del negozio con sconti
function generateShopText(usedPrefix, balance = 0) {
    const activeDiscounts = getActiveDiscounts();
    let text = `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🏪 ୭ *NEGOZIO*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n`
    text += `꒷꒦ ✦ Saldo: ${formatNumber(balance)} 🪙 ✦ ꒷꒦\n\n`
    
    // Conta quanti sconti sono attivi
    const activeDiscountCount = Object.keys(activeDiscounts).filter(key => 
        discountSystem.isDiscountValid(activeDiscounts[key])
    ).length;
    
    if (activeDiscountCount > 0) {
        text += `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🔥 *${activeDiscountCount} OFFERTE SPECIALI!* 🔥\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n\n`
    }
    
    for (const [category, items] of Object.entries(shopItems)) {
        const catName = category.includes(' ') ? category.substring(category.indexOf(' ')+1) : category;
        const catEmoji = category.includes(' ') ? category.split(' ')[0] : '📦';
        text += `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ${catEmoji} ୭ *${catName}*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n`
        items.forEach(item => {
            const priceInfo = discountSystem.getDiscountedPrice(item.item, item.price, activeDiscounts);
            
            text += `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n`
            text += `  ━━✫ 📦 *${item.name}*\n`
            
            if (priceInfo.hasDiscount) {
                const timeRemaining = discountSystem.formatTimeRemaining(priceInfo.expiresAt);
                text += `  ━━✫ 🏷️ *SCONTO ${priceInfo.discount}%!*\n`
                text += `  ━━✫ 💰 ~~${formatNumber(priceInfo.originalPrice)}~~ ➜ ${formatNumber(priceInfo.price)} 🪙\n`
                if (timeRemaining) {
                    text += `  ━━✫ ⏰ Scade tra: ${timeRemaining}\n`
                }
            } else {
                text += `  ━━✫ 💰 Prezzo: ${formatNumber(priceInfo.price)} 🪙\n`
            }
            
            text += `  ━━✫ 🛒 \`${usedPrefix}compra ${item.item}\`\n`
            text += `╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n\n`
        })
    }
   
    text += `╭★────★────★────★╮\n`
    text += `│ ୭ ˚. ᵎᵎ 💡 *Come acquistare:*\n│ ${usedPrefix}compra <oggetto> [quantità]\n`
    text += `│ ୭ ˚. ᵎᵎ 💎 *Come vendere:*\n│ ${usedPrefix}vendi <oggetto> [quantità]\n`
    text += `│ ୭ ˚. ᵎᵎ 🔍 *Cerca oggetti:*\n│ ${usedPrefix}shop <nome oggetto>\n`
    text += `│ ୭ ˚. ᵎᵎ 🔄 *Gli sconti si rinnovano ogni 15 minuti!*\n`
    text += `╰★────★────★╯`
    
    return text
}

// Entry point: handler for shop-related commands
let handler = async (m, { conn, args, usedPrefix, command }) => {
    // ...handler body starts here
    
    // Recupera dati utente e alias map
    
    
    
    
    
    
    
    
    
    
    
    const user = global.db.data.users[m.sender] || {}
    const aliasMap = createAliasMap()
    // Percorso assoluto alla cartella immagini shop
    // Da plugins/rpg/ devo uscire 2 volte per arrivare alla root, poi entro in src/img/shop
    const baseShopImgPath = path.resolve(__dirname, '../media/shop');

    // 1. SOLO .shop mostra la lista completa, senza ricerca
    if ((command === 'shop' || command === 'negozio') && args.length === 0) {
        try {
            // IMPORTANTE: sendCarousel vuole il Buffer del file, non il percorso!
            const thumbPath = path.resolve(baseShopImgPath, 'shop.png')
            let thumb = null
            
            // Verifica che il file esista e carica il Buffer
            if (fs.existsSync(thumbPath)) {
                thumb = fs.readFileSync(thumbPath)  // ← Passa il Buffer, non il percorso!
                console.log('[SHOP] Thumb loaded:', thumbPath, 'size:', thumb.length)
            } else {
                console.warn('[SHOP] Thumb non trovata:', thumbPath)
            }
            
            // Prepare active discounts
            const activeDiscounts = getActiveDiscounts()

            // Inizializza le funzioni interattive
            initializeInteractiveFunctions(conn)

            // Build messages array per sendCarousel (formato corretto)
            const messages = []
            const categories = Object.entries(shopItems)
            let totalSections = 0
            
            // First pass to count total sections for the subtitle
            categories.forEach(([_, items]) => {
                totalSections += Math.ceil(items.length / 5)
            })

            let currentSection = 1

            categories.forEach(([category, items]) => {
                const chunkSize = 3
                for (let i = 0; i < items.length; i += chunkSize) {
                    const chunk = items.slice(i, i + chunkSize)
                    let body = ''
                    
                    chunk.forEach(item => {
                        const p = discountSystem.getDiscountedPrice(item.item, item.price, activeDiscounts)
                        if (p.hasDiscount) {
                            body += `*╭★─ ${item.name}*\n│ sconto           ➜       -${p.discount}%\n│ prezzo pieno ➜ 🪙 ~~${formatNumber(p.originalPrice)}~~\n│ prezzo            ➜ 🪙 ${formatNumber(p.price)}\n╰★────★────★────★\n\n`
                         //   🏷️ -${p.discount}% | 💰 ~~${formatNumber(p.originalPrice)}~~ ➜ ${formatNumber(p.price)} 🪙\n\n
                        } else {
                            body += `*╭★─ ${item.name}*\n│ prezzo            ➜ 🪙 ${formatNumber(p.price)}\n╰★────★────★────★\n\n`
                        }
                    })

                    const sectionTitle = i === 0 ? `꒷꒦★ 『 ${category} 』 ★꒷꒦\n┈ ─ ─ ─ ─ ─  ✦  ─ ─ ─ ─ ─ ┈` : `『${category} ${Math.floor(i / chunkSize) + 1}\n ─ ─ ─ ─ ✦ ─ ─ ─ ─ ┈`
                    
                    messages.push([
                        { title: sectionTitle, body: body.trim() },
                        `Pagina ${currentSection}/${totalSections} • Shop`,
                        thumb,
                        [], null, null, null
                    ])
                    currentSection++
                }
            })


            // Costruisci le cards per il carosello
            const cards = messages.map(msg => ({
                header: {
                    title: msg[0].title,
                    hasMediaAttachment: thumb ? true : false,
                    imageMessage: thumb ? { url: thumb } : undefined
                },
                body: {
                    text: msg[0].body
                },
                nativeFlowMessage: {
                    buttons: []
                }
            }))

            await conn.sendMessage(m.chat, {
                text: `🏪 *NEGOZIO CHATUNITY*\n\n💰 Saldo: ${formatNumber(user.limit || 0)} 🪙`,
                footer: `ChatUnity • shop\nUsa ${usedPrefix}compra <oggetto>`,
                cards: cards
            }, { quoted: m })
            
            console.log(`[SHOP] Carosello inviato con successo (${messages.length} sezioni)`)
            
            // Messaggio con bottone copia-incolla per utenti iPhone
            try {
                const imageUrl = 'https://www.lsa-conso.fr/mediatheque/8/1/7/000143718_5.jpg'
                const response = await fetch(imageUrl)
                const arrayBuffer = await response.arrayBuffer()
                const imageBuffer = Buffer.from(arrayBuffer)

                const bottoneCopia = {
                    image: imageBuffer,
                    title: `Non vedi la lista?`,
                    body: ``,
                    footer: '*Alternativa per iPhone*',
                    buttons: [
                        {
                            name: 'cta_copy',
                            buttonParamsJson: JSON.stringify({
                                display_text: '𝐜𝐨𝐩𝐢𝐚 𝐜𝐨𝐦𝐚𝐧𝐝𝐨',
                                copy_code: `${usedPrefix}shop-text`
                            })
                        }
                    ]
                }

                await conn.sendMessage(m.chat, {
                    title: '*📋 Non vedi nessuna lista?*',
                    text: '💡 Usa questo comando alternativo',
                    footer: 'ChatUnity Shop',
                    cards: [bottoneCopia]
                }, { quoted: m })
            } catch (btnErr) {
                console.error('[SHOP] Errore invio bottone copia:', btnErr)
            }
        } catch (e) {
            console.error('[SHOP] Errore nel mostrare il negozio:', e)
            // Fallback a testo semplice
            const activeDiscounts = getActiveDiscounts()
            const shopText = generateShopText(usedPrefix, user.limit || 0)
            await conn.reply(m.chat, shopText, m)
        }
        return
    }
    // 1b. .shop <item> mostra solo la ricerca
    if ((command === 'shop' || command === 'negozio') && args.length > 0) {
        const searchQuery = args.join(' ').trim()
        const results = searchShopItem(searchQuery)
        if (!results.length) {
            return conn.reply(m.chat, `🔍 𝘕𝘦𝘴𝘴𝘶𝘯 𝘳𝘪𝘴𝘶𝘭𝘵𝘢𝘵𝘰 𝘱𝘦𝘳 "${searchQuery}"`, m, rcanal)
        }
        
        // Inizializza sharp per la compressione
        sharp = await getSharp()
        let resultText = `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🔍 ୭ *RISULTATI RICERCA*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ "${searchQuery}" ✦ ꒷꒦\n\n`
        const buttons = []

        results.forEach((item, i) => {
            resultText += `✦ *${item.name}*\n`
            resultText += `  📂 ${item.category}\n`
            if (item.priceInfo.hasDiscount) {
                const timeRemaining = discountSystem.formatTimeRemaining(item.priceInfo.expiresAt)
                resultText += `  🏷️ -${item.priceInfo.discount}% | 💰 ~~${formatNumber(item.priceInfo.originalPrice)}~~ ➜ ${formatNumber(item.priceInfo.price)} 🪙\n`
                if (timeRemaining) {
                    resultText += `  ⏰ Scade tra: ${timeRemaining}\n`
                }
            } else {
                resultText += `  💰 ${formatNumber(item.priceInfo.price)} 🪙\n`
            }
            resultText += `\n`

            buttons.push({
                buttonId: `${usedPrefix}compra ${item.item}`,
                buttonText: { displayText: `Compra ${item.name}` },
                type: 1
            })
            buttons.push({
                buttonId: `${usedPrefix}vendi ${item.item}`,
                buttonText: { displayText: `Vendi ${item.name}` },
                type: 1
            })
        })

        const firstItemKey = results[0]?.item
        let thumb = null
        if (firstItemKey) {
            // Normalizza il nome file a minuscolo per compatibilità
            const itemImgPath = path.resolve(baseShopImgPath, `${firstItemKey.toLowerCase()}.png`)
            if (fs.existsSync(itemImgPath)) {
                let itemThumb = fs.readFileSync(itemImgPath);
                // Ridimensiona/comprime la thumb se troppo grande (>100 KB)
                if (itemThumb && Buffer.isBuffer(itemThumb) && itemThumb.length > 100 * 1024) {
                    try {
                        const resized = await sharp(itemThumb)
                            .resize(200, 200, { fit: 'inside' })
                            .png({ quality: 70, compressionLevel: 9 })
                            .toBuffer();
                        if (resized.length < itemThumb.length && resized.length < 100 * 1024) {
                            console.log(`[SHOP-DEBUG] Thumb compressa (.shop): da ${itemThumb.length} a ${resized.length} bytes`);
                            itemThumb = resized;
                        } else {
                            console.warn(`[SHOP-DEBUG] Thumb compressa ma ancora troppo grande (.shop, ${resized.length} bytes), uso fallback`);
                            itemThumb = null;
                        }
                    } catch (e) {
                        console.error('[SHOP-DEBUG] Errore durante la compressione thumb (.shop):', e);
                        itemThumb = null;
                    }
                }
                // Se la thumb non esiste o è sospetta, usa una di fallback
                if (!itemThumb || !Buffer.isBuffer(itemThumb) || itemThumb.length < 100) {
                    try {
                        const fallbackPath = path.resolve(baseShopImgPath, 'shop.png');
                        if (fs.existsSync(fallbackPath)) {
                            itemThumb = fs.readFileSync(fallbackPath);
                            console.log('[SHOP-DEBUG] Thumb fallback usata (.shop):', fallbackPath);
                        }
                    } catch (e) {
                        console.error('[SHOP-DEBUG] Errore caricando fallback thumb (.shop):', e);
                    }
                }
                thumb = itemThumb;
            } else {
                console.warn('[SHOP] Immagine non trovata:', itemImgPath)
            }
        }

        return await conn.sendMessage(m.chat, {
            text: resultText,
            buttons: buttons,
            headerType: 1,
            contextInfo: {
                isforwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363391446013555@newsletter",
                    serverMessageId: 100,
                    newsletterName: 'canale dei meme 🎌',
                },
                externalAdReply: {
                    title: `🔍 𝙄 𝙍𝙄𝙎𝙐𝙇𝙏𝘼𝙏𝙊 𝙋𝙀𝙍 `,
                    body: `      "${searchQuery}"`,
                    thumbnail: thumb,
                    mediaType: 1,
                    sourceUrl: ''
                }
            }
        }, { quoted: m })
    }
    // Comandi ACQUISTA/VENDI
    const input = args.join(' ').toLowerCase()
    
    // --- GESTIONE PAGAMENTO CON CARTA ---
    if (command === 'paga-carta' || command === 'paga-misto') {
        if (args.length < 2) {
            return conn.reply(m.chat, `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Uso corretto:\n  ━━✫ ${usedPrefix}${command} <oggetto> <quantità>\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`, m, rcanal)
        }
        
        const itemKey = args[0]
        const quantity = parseInt(args[1]) || 1
        
        // Trova l'oggetto
        const itemEntry = Object.entries(aliasMap).find(([key, _]) => key === itemKey)
        if (!itemEntry) {
            return conn.reply(m.chat, `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Oggetto non valido!\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`, m, rcanal)
        }
        
        const [, itemData] = itemEntry
        const activeDiscounts = getActiveDiscounts()
        const priceInfo = discountSystem.getDiscountedPrice(itemKey, itemData.price, activeDiscounts)
        const totalPrice = priceInfo.price * quantity
        
        const creditBalance = user.credito || 0
        const walletBalance = user.limit || 0
        
        if (command === 'paga-carta') {
            // Paga solo la differenza con la carta
            const missing = totalPrice - walletBalance
            
            if (creditBalance < missing) {
                return conn.reply(m.chat, `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Credito insufficiente!\n  ━━✫ Ti servono: ${formatNumber(missing)} 🪙\n  ━━✫ Hai solo: ${formatNumber(creditBalance)} 🪙\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`, m, rcanal)
            }
            
            // Procedi con il pagamento
            user.limit = 0 // Usa tutto il portafoglio
            user.credito -= missing // Sottrai la differenza dalla carta
            
        } else if (command === 'paga-misto') {
            // Usa tutto portafoglio + carta
            const totalBalance = walletBalance + creditBalance
            
            if (totalBalance < totalPrice) {
                return conn.reply(m.chat, `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Fondi insufficienti!\n  ━━✫ Ti servono: ${formatNumber(totalPrice)} 🪙\n  ━━✫ Hai solo: ${formatNumber(totalBalance)} 🪙\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`, m, rcanal)
            }
            
            // Calcola quanto usare da portafoglio e carta
            let fromWallet = Math.min(walletBalance, totalPrice)
            let fromCard = totalPrice - fromWallet
            
            user.limit -= fromWallet
            user.credito -= fromCard
        }
        
        // Gestione speciale per case e scudi (come nel codice originale)
        if (['monolocale', 'villa', 'castello'].includes(itemKey)) {
            if (!user.casa) user.casa = { stato: 'fuori', tipo: null, nextRent: null, lastPaid: null };
            if (user.casa.tipo) {
                // Rimborsa l'utente
                user.limit += (command === 'paga-carta' ? 0 : Math.min(walletBalance, totalPrice))
                user.credito += (command === 'paga-carta' ? totalPrice - walletBalance : totalPrice - Math.min(walletBalance, totalPrice))
                return conn.reply(m.chat, `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Hai già una casa (${user.casa.tipo})!\n  ━━✫ Non puoi comprarne un'altra.\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`, m, rcanal);
            }
            const casaObj = CASE.find(c => c.key === itemKey);
            user.casa = {
                stato: 'fuori',
                tipo: casaObj.key,
                nextRent: Date.now() + casaObj.intervallo,
                lastPaid: Date.now()
            };
        }
        
        if (itemKey === 'scudo' || itemKey === 'scudo3h' || itemKey === 'scudo6h' || itemKey === 'scudo12h') {
            if (quantity > 1) {
                // Rimborsa l'utente
                user.limit += (command === 'paga-carta' ? 0 : Math.min(walletBalance, totalPrice))
                user.credito += (command === 'paga-carta' ? totalPrice - walletBalance : totalPrice - Math.min(walletBalance, totalPrice))
                return conn.reply(m.chat, `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Puoi acquistare solo\n  ━━✫ uno scudo alla volta!\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`, m, rcanal)
            }
            
            let durataMs = durataScudo[itemKey] || durataScudo['scudo'];
            const nowRome = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome' }));
            const expiryTime = nowRome.getTime() + durataMs;
            user.scudoScadenza = new Date(expiryTime).toISOString();
        }
        
        // Aggiorna inventario per tutti gli oggetti tranne scudi e case
        if (!(itemKey === 'scudo' || itemKey === 'scudo3h' || itemKey === 'scudo6h' || itemKey === 'scudo12h' || ['monolocale', 'villa', 'castello'].includes(itemKey))) {
            user[itemKey] = (user[itemKey] || 0) + quantity;
        }
        
        // Messaggio di successo
        let successMessage = `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💳 ୭ *PAGAMENTO CARTA*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n` +
                            `꒷꒦ ✦ Acquisto Completato ✦ ꒷꒦\n\n` +
                            `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n` +
                            `  ━━✫ 📦 *Prodotto:* ${itemData.name} ˣ${quantity}\n` +
                            `  ━━✫ 💰 *Totale:* ${formatNumber(totalPrice)} 🪙\n`
        
        if (command === 'paga-carta') {
            successMessage += `  ━━✫ 👛 *Portafoglio:* ${formatNumber(walletBalance)} 🪙\n` +
                             `  ━━✫ 💳 *Carta:* ${formatNumber(totalPrice - walletBalance)} 🪙\n`
        } else {
            const fromWallet = Math.min(walletBalance, totalPrice)
            const fromCard = totalPrice - fromWallet
            successMessage += `  ━━✫ 👛 *Portafoglio:* ${formatNumber(fromWallet)} 🪙\n` +
                             `  ━━✫ 💳 *Carta:* ${formatNumber(fromCard)} 🪙\n`
        }
        
        successMessage += `  ━━✫ 👛 *Restante:* ${formatNumber(user.limit)} 🪙\n` +
                         `  ━━✫ 💳 *Credito:* ${formatNumber(user.credito)} 🪙\n` +
                         `╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`
        
        return conn.reply(m.chat, successMessage, m, phishy)
    }
    
    // Mostra errore solo per compra/vendi, NON per shop/negozio
    if (!input && (command === 'compra' || command === 'buy' || command === 'acquista' || command === 'vendi' || command === 'sell')) {
        return conn.reply(m.chat, `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Specifica un oggetto!\n  ━━✫ Usa ${usedPrefix}shop per la lista\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`, m, rcanal)
    }

    const parts = input.split(/\s+/)
    let quantity = 1
    let itemName = input

    // Estrai quantità se specificata
    if (!isNaN(parts[parts.length - 1])) {
        quantity = Math.max(1, parseInt(parts.pop()))
        itemName = parts.join(' ')
    }

    // Trova l'oggetto corrispondente
    const normalizedInput = itemName.replace(/[\s_]/g, '')
    const itemEntry = Object.entries(aliasMap).find(([_, data]) => 
        data.aliases.some(alias => alias.replace(/[\s_]/g, '') === normalizedInput))
    
    // Solo per compra/vendi, NON per shop/negozio
    if (!itemEntry && (command === 'compra' || command === 'buy' || command === 'acquista' || command === 'vendi' || command === 'sell')) {
        return conn.reply(m.chat, `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Oggetto non valido!\n  ━━✫ Usa ${usedPrefix}shop per la lista\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`, m, rcanal)
    }
    if (!itemEntry) return // evita errore anche per altri comandi

    const [itemKey, itemData] = itemEntry

    // --- LOGICA ACQUISTO SCUDO CON DURATA VARIABILE ---
    if (command === 'compra' || command === 'buy' || command === 'acquista') {
        // --- LOGICA ACQUISTO CASA ---
        if (['monolocale', 'villa', 'castello'].includes(itemKey)) {
            if (!user.casa) user.casa = { stato: 'fuori', tipo: null, nextRent: null, lastPaid: null };
            if (user.casa.tipo) {
                await conn.reply(m.chat, `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Hai già una casa (${user.casa.tipo})!\n  ━━✫ Non puoi comprarne un'altra.\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`, m, rcanal);
                return;
            }
        }
        // Ottieni il prezzo con eventuale sconto
        const activeDiscounts = getActiveDiscounts()
        const priceInfo = discountSystem.getDiscountedPrice(itemKey, itemData.price, activeDiscounts)
        const totalPrice = priceInfo.price * quantity
        const missing = totalPrice - user.limit

        // Gestione speciale per lo scudo
        if (itemKey === 'scudo' || itemKey === 'scudo3h' || itemKey === 'scudo6h' || itemKey === 'scudo12h') {
            if (quantity > 1) {
                await conn.reply(m.chat, `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Puoi acquistare solo\n  ━━✫ uno scudo alla volta!\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`, m, rcanal)
                return
            }
            // Calcola la durata del nuovo scudo
            let nuovaDurataMs = durataScudo[itemKey] || durataScudo['scudo'];
            let attualeDurataMs = getShieldDurationMs(user);

            // Permetti l'acquisto solo se:
            // - non hai uno scudo attivo
            // - OPPURE il nuovo scudo dura di più di quello attuale
            if (attualeDurataMs > 0 && nuovaDurataMs <= attualeDurataMs) {
                const remaining = getShieldTimeRemaining(user);
                let shieldMsg = `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Scudo già attivo!\n`;
                if (remaining && typeof remaining.minutes !== 'undefined' && typeof remaining.seconds !== 'undefined') {
                    if (typeof remaining.hours !== 'undefined' && remaining.hours > 0) {
                        shieldMsg += `  ━━✫ ⏱️ Tempo: ${remaining.hours}h ${remaining.minutes}m ${remaining.seconds}s\n`;
                    } else {
                        shieldMsg += `  ━━✫ ⏱️ Tempo: ${remaining.minutes}m ${remaining.seconds}s\n`;
                    }
                }
                shieldMsg += `  ━━✫ Puoi acquistare solo uno scudo\n  ━━✫ di durata maggiore.\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`;
                await conn.reply(m.chat, shieldMsg, m, rcanal);
                return;
            }
        }

        if (user.limit < totalPrice) {
            try {
                const thumbPath = path.resolve(baseShopImgPath, 'NOdolci.png')
                const thumb = fs.existsSync(thumbPath) ? fs.readFileSync(thumbPath) : null
                
                // Controlla se l'utente ha fondi sulla carta di credito
                const creditBalance = user.credito || 0
                const totalBalance = user.limit + creditBalance
                const canPayWithCard = creditBalance >= missing
                const canPayTotal = totalBalance >= totalPrice
                
                let errorMessage =  `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🙅🏻 Unity Coin insufficienti!\n`
                    errorMessage += `  ━━✫ 📦 *Prodotto:* ${itemData.name} \n`
                    errorMessage += `  ━━✫ 💰 *Costo:* ${formatNumber(totalPrice)} 🪙\n`
                    errorMessage += `  ━━✫ 👛 *Hai:* ${formatNumber(user.limit)} 🪙\n`
                    errorMessage += `  ━━✫ ❌ *Mancano:* ${formatNumber(missing)} 🪙\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n\n`

                let buttons = []
                
                if (canPayTotal) {
                    // L'utente può pagare con la combinazione di portafoglio + carta
                    if (canPayWithCard) {
                        
                        errorMessage =  `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 💳 Usa la carta!\n`
                      errorMessage += `  ━━✫ 📦 *Prodotto:* ${itemData.name} \n`
                      errorMessage += `  ━━✫ 💰 *Costo:* ${formatNumber(totalPrice)} 🪙\n`
                      errorMessage += `  ━━✫ 👛 *Portafoglio:* ${formatNumber(user.limit)} 🪙\n`
                      errorMessage += `  ━━✫ 💳 *Carta:* ${formatNumber(creditBalance)} 🪙\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n`
                        buttons.push({
                            buttonId: `${usedPrefix}paga-carta ${itemKey} ${quantity}`,
                            buttonText: { displayText: `💳 paga -${formatNumber(missing)} 🪙` },
                            type: 1
                        })
                    } else {
                        errorMessage += `💳 *Puoi usare portafoglio + carta per completare l'acquisto!*`
                        buttons.push({
                            buttonId: `${usedPrefix}paga-misto ${itemKey} ${quantity}`,
                            buttonText: { displayText: `💳 Paga misto (${formatNumber(totalPrice)} 🪙)` },
                            type: 1
                        })
                    }
                }
                
                if (user.limit === 0) {
                      errorMessage =  `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 👛 Portafoglio vuoto!\n`
                      errorMessage += `  ━━✫ 📦 *Prodotto:* ${itemData.name} \n`
                      errorMessage += `  ━━✫ 💰 *Costo:* ${formatNumber(totalPrice)} 🪙\n`
                      errorMessage += `  ━━✫ 👛 *Portafoglio:* ${formatNumber(user.limit)} 🪙\n`
                      errorMessage += `  ━━✫ 💳 *Carta:* ${formatNumber(creditBalance)} 🪙\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n`
                }
                
                else {
                    // L'utente non ha abbastanza neanche con la carta
                    errorMessage += `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Fondi insufficienti!\n`
                      errorMessage += `  ━━✫ 💳 *Carta:* ${formatNumber(creditBalance)} 🪙\n`
                    errorMessage += `  ━━✫ 💸 *Mancano:* ${formatNumber(totalPrice - totalBalance)} 🪙\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n\n`
                }
            
                // Se abbiamo bottoni validi, invia il messaggio con bottoni.
                // Altrimenti invia solo testo (alcune API/Client non mostrano messaggi quando
                // viene passato un array di bottoni vuoto), quindi evitiamo payload con "buttons: []".
                const ctxInfo = {
                    isforwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363391446013555@newsletter",
                        serverMessageId: 100,
                        newsletterName: 'canale dei meme 🎌',
                    },
                    externalAdReply: {
                        title: 'acquisto fallito',
                        body: canPayTotal ? 'Prova con la carta!' : 'ci dispiace!',
                        thumbnail: thumb,
                        mediaType: 1,
                        sourceUrl: ''
                    }
                }

                if (Array.isArray(buttons) && buttons.length > 0) {
                    await conn.sendMessage(m.chat, {
                        text: errorMessage,
                        buttons: buttons,
                        headerType: 1,
                        contextInfo: ctxInfo
                    }, { quoted: createOrderMessage(0, 'Acquisto Fallito', thumb) })
                } else {
                    // Invia come semplice messaggio di testo con contextInfo
                    await conn.sendMessage(m.chat, {
                        text: errorMessage,
                        contextInfo: ctxInfo
                    }, { quoted: createOrderMessage(0, 'Acquisto Fallito', thumb) })
                }
            } catch (e) {
                console.error(e)
                conn.reply(m.chat, '╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Errore acquisto!\n  ━━✫ Riprova più tardi.\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱', m)
            }
            return
        }

        user.limit -= totalPrice

        // --- LOGICA AGGIORNAMENTO CASA DOPO ACQUISTO ---
        if (['monolocale', 'villa', 'castello'].includes(itemKey)) {
            // Trova la casa acquistata tra le CASE
            const casaObj = CASE.find(c => c.key === itemKey);
            user.casa = {
                stato: 'fuori',
                tipo: casaObj.key,
                nextRent: Date.now() + casaObj.intervallo,
                lastPaid: Date.now()
            };
        }

        // Imposta la scadenza dello scudo in base al tipo acquistato
        if (itemKey === 'scudo' || itemKey === 'scudo3h' || itemKey === 'scudo6h' || itemKey === 'scudo12h') {
            let durataMs = durataScudo[itemKey] || durataScudo['scudo'];
            const nowRome = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome' }));
            const expiryTime = nowRome.getTime() + durataMs;
            user.scudoScadenza = new Date(expiryTime).toISOString();
        }

        // Aggiorna inventario per tutti gli oggetti tranne gli scudi e le case
        if (!(itemKey === 'scudo' || itemKey === 'scudo3h' || itemKey === 'scudo6h' || itemKey === 'scudo12h' || ['monolocale', 'villa', 'castello'].includes(itemKey))) {
            user[itemKey] = (user[itemKey] || 0) + quantity;
        }

        // ...resto della logica di successo...
        try {
            // Inizializza sharp per la compressione
            const sharpLib = await getSharp()
            
            // Scegli il nome dell'immagine per l'oggetto acquistato (nome fittizio, sempre minuscolo)
            const itemImgName = `${itemKey.toLowerCase()}.png`;
            const itemImgPath = path.resolve(baseShopImgPath, itemImgName); // usa sempre shop
            let itemThumb = null;
            if (fs.existsSync(itemImgPath)) {
                itemThumb = fs.readFileSync(itemImgPath);
                console.log(`[SHOP-DEBUG] Thumb trovata: ${itemImgPath}, size: ${itemThumb.length} bytes, type: ${typeof itemThumb}`);
            } else {
                console.warn('[SHOP] Immagine non trovata:', itemImgPath)
            }

            // Ridimensiona/comprime la thumb se troppo grande (>100 KB)
            let thumb = itemThumb;
            let fallbackUsed = false;
            if (sharpLib && thumb && Buffer.isBuffer(thumb) && thumb.length > 100 * 1024) {
                try {
                    const resized = await sharpLib(thumb)
                        .resize(200, 200, { fit: 'inside' })
                        .png({ quality: 70, compressionLevel: 9 })
                        .toBuffer();
                    if (resized.length < thumb.length && resized.length < 100 * 1024) {
                        console.log(`[SHOP-DEBUG] Thumb compressa: da ${thumb.length} a ${resized.length} bytes`);
                        thumb = resized;
                    } else {
                        console.warn(`[SHOP-DEBUG] Thumb compressa ma ancora troppo grande (${resized.length} bytes), uso fallback`);
                        thumb = null;
                    }
                } catch (e) {
                    console.error('[SHOP-DEBUG] Errore durante la compressione thumb:', e);
                    thumb = null;
                }
            }
            // Se la thumb non esiste o è sospetta, usa una di fallback
            if (!thumb || !Buffer.isBuffer(thumb) || thumb.length < 100) {
                try {
                    const fallbackPath = path.resolve(baseShopImgPath, 'shop.png');
                    if (fs.existsSync(fallbackPath)) {
                        thumb = fs.readFileSync(fallbackPath);
                        fallbackUsed = true;
                        console.log('[SHOP-DEBUG] Thumb fallback usata:', fallbackPath);
                    }
                } catch (e) {
                    console.error('[SHOP-DEBUG] Errore caricando fallback thumb:', e);
                }
            }
            if (thumb) {
                console.log(`[SHOP-DEBUG] Thumb finale: size ${thumb.length} bytes, fallback: ${fallbackUsed}`);
            } else {
                console.warn('[SHOP-DEBUG] Nessuna thumb valida trovata, invio solo testo.');
            }

            let successMessage = `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🛍️ ୭ *ACQUISTO COMPLETATO*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n` +
                                `✦ 📦 *${itemData.name}* ˣ${quantity}\n`

            if (priceInfo.hasDiscount) {
                const timeRemaining = discountSystem.formatTimeRemaining(priceInfo.expiresAt)
                const totalSaved = (priceInfo.originalPrice - priceInfo.price) * quantity
                successMessage += `✦ 🏷️ -${priceInfo.discount}% | 💰 ~~${formatNumber(priceInfo.originalPrice)}~~ ➜ ${formatNumber(priceInfo.price)} 🪙\n`
                successMessage += `✦ 🤑 Risparmiato: ${formatNumber(totalSaved)} 🪙\n`
            } else {
                successMessage += `✦ 💰 ${formatNumber(priceInfo.price)} 🪙\n`
            }

            successMessage += `✦ 💸 Totale: ${formatNumber(totalPrice)} 🪙\n` +
                             `✦ 👛 Saldo: ${formatNumber(user.limit)} 🪙\n`

            // Aggiungi informazioni speciali per lo scudo
            if (itemKey === 'scudo' || itemKey === 'scudo3h' || itemKey === 'scudo6h' || itemKey === 'scudo12h') {
                const expiryDate = new Date(user.scadenza);
                // Mostra l'orario in Italia (Europe/Rome)
                const expiryString = expiryDate.toLocaleString('it-IT', {
                    timeZone: 'Europe/Rome',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                // Durata dinamica
                let durataOre = 1;
                if (itemKey === 'scudo3h') durataOre = 3;
                else if (itemKey === 'scudo6h') durataOre = 6;
                else if (itemKey === 'scudo12h') durataOre = 12;
                successMessage += `\n\n✦ 🛡️ SCUDO ATTIVATO\n` +
                                 `✦ ⏳ Durata: ${durataOre}h | 📅 Scadenza: ${expiryString}`;
            }

            if (thumb) {
                await conn.sendMessage(m.chat, { 
                    text: successMessage,
                    contextInfo: {
                        isforwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: "120363391446013555@newsletter",
                            serverMessageId: 100,
                            newsletterName: 'chat unity',
                        },
                        externalAdReply: {
                            title: 'Acquisto Completato',
                            body: priceInfo.hasDiscount ? '🔥 Hai approfittato di uno sconto!' : 'Complimenti per il tuo acquisto!',
                            thumbnail: thumb,
                            mediaType: 1,
                            sourceUrl: ''
                        }
                    }
                }, { quoted: m })
            } else {
                await conn.sendMessage(m.chat, { text: successMessage }, { quoted: m })
            }
        } catch (error) {
    console.error('Errore nel comando info:', error)
    m.reply('Si è verificato un errore durante la generazione del profilo')
  }
        return
    }

    if (command === 'vendi' || command === 'sell') {
        
        // Non permettere la vendita dello scudo
        if (itemKey === 'scudo') {
            return conn.reply(m.chat, `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Non puoi vendere lo scudo!\n  ━━✫ È un oggetto non vendibile.\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`, m, rcanal)
        }
        
        // Controlla se l'utente ha l'oggetto da vendere
        if (!user[itemKey] || user[itemKey] < quantity) {
            return conn.reply(m.chat, `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Quantità insufficiente!\n  ━━✫ Non hai abbastanza ${itemData.name}\n  ━━✫ Ne possiedi: ${user[itemKey] || 0}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`, m, rcanal)
        }
        
        // Calcola il prezzo di vendita fisso (60% del prezzo originale, non del prezzo scontato)
        const sellPrice = Math.floor(itemData.price * 0.6)
        const totalSellValue = sellPrice * quantity
        
        // Controlla se la vendita farebbe superare il limite di 100.000 unity coin
        const newBalance = (user.limit || 0) + totalSellValue
        if (newBalance > 100000) {
            const maxSellable = Math.floor((100000 - (user.limit || 0)) / sellPrice)
            
            if (maxSellable <= 0) {
                return conn.reply(m.chat, `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Limite raggiunto!\n  ━━✫ Hai già raggiunto il limite\n  ━━✫ massimo di 100.000 🪙\n  ━━✫ Saldo: ${formatNumber(user.limit || 0)} 🪙\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`, m, stefano)
            }
            
            return conn.reply(m.chat, 
                `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n` +
                `  ━━✫ ❌ Limite superato!\n` +
                `  ━━✫ Non puoi vendere ${quantity} ${itemData.name}\n` +
                `  ━━✫ 👛 *Saldo:* ${formatNumber(user.limit || 0)} 🪙\n` +
                `  ━━✫ 💰 *Valore:* ${formatNumber(totalSellValue)} 🪙\n` +
                `  ━━✫ 📈 *Nuovo:* ${formatNumber(newBalance)} 🪙\n` +
                `  ━━✫ ⛔ *Limite:* 100.000 🪙\n` +
                `  ━━✫ 📉 *Max vendibili:* ${maxSellable} ${itemData.name}\n` +
                `╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`, 
                m, rcanal)
        }
        
        // Procedi con la vendita
        user[itemKey] -= quantity
        user.limit = (user.limit || 0) + totalSellValue
        
        // Rimuovi l'oggetto dall'inventario se la quantità è 0
        if (user[itemKey] <= 0) {
            delete user[itemKey]
        }
        
        try {
            // Inizializza sharp per la compressione
            const sharpLib = await getSharp()
            // Scegli il nome dell'immagine per l'oggetto venduto (nome fittizio, sempre minuscolo)
            const itemImgName = `${itemKey.toLowerCase()}.png`;
            const itemImgPath = path.resolve(baseShopImgPath, itemImgName); // usa sempre shop
            let itemThumb = null;
            if (fs.existsSync(itemImgPath)) {
                itemThumb = fs.readFileSync(itemImgPath);
                // Ridimensiona/comprime la thumb se troppo grande (>100 KB)
                if (itemThumb && Buffer.isBuffer(itemThumb) && itemThumb.length > 100 * 1024) {
                    try {
                        const resized = await sharp(itemThumb)
                            .resize(200, 200, { fit: 'inside' })
                            .png({ quality: 70, compressionLevel: 9 })
                            .toBuffer();
                        if (resized.length < itemThumb.length && resized.length < 100 * 1024) {
                            console.log(`[SHOP-DEBUG] Thumb compressa (.vendi): da ${itemThumb.length} a ${resized.length} bytes`);
                            itemThumb = resized;
                        } else {
                            console.warn(`[SHOP-DEBUG] Thumb compressa ma ancora troppo grande (.vendi, ${resized.length} bytes), uso fallback`);
                            itemThumb = null;
                        }
                    } catch (e) {
                        console.error('[SHOP-DEBUG] Errore durante la compressione thumb (.vendi):', e);
                        itemThumb = null;
                    }
                }
                // Se la thumb non esiste o è sospetta, usa una di fallback
                if (!itemThumb || !Buffer.isBuffer(itemThumb) || itemThumb.length < 100) {
                    try {
                        const fallbackPath = path.resolve(baseShopImgPath, 'shop.png');
                        if (fs.existsSync(fallbackPath)) {
                            itemThumb = fs.readFileSync(fallbackPath);
                            console.log('[SHOP-DEBUG] Thumb fallback usata (.vendi):', fallbackPath);
                        }
                    } catch (e) {
                        console.error('[SHOP-DEBUG] Errore caricando fallback thumb (.vendi):', e);
                    }
                }
            } else {
                console.warn('[SHOP] Immagine non trovata:', itemImgPath)
            }
            // Usa la thumb specifica dell'oggetto venduto
            const thumb = itemThumb;

            const successMessage = `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💰 ୭ *VENDITA COMPLETATA*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n` +
                                 `✦ 📦 *${itemData.name}* ˣ${quantity}\n` +
                                 `✦ 💰 ${formatNumber(sellPrice)} 🪙 cad.\n` +
                                 `✦ 💸 Totale: ${formatNumber(totalSellValue)} 🪙\n` +
                                 `✦ 👛 Nuovo saldo: ${formatNumber(user.limit)} 🪙\n`
         
            
            if (thumb) {
                await conn.sendMessage(m.chat, { 
                    text: successMessage,
                    contextInfo: {
                        isforwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: "120363391446013555@newsletter",
                            serverMessageId: 100,
                            newsletterName: 'canale dei meme 🎌',
                        },
                        externalAdReply: {
                            title: '𝙑𝙀𝙉𝘿𝙄𝙏𝘼 𝘾𝙊𝙈𝙋𝙇𝙀𝙏𝘼𝙏𝘼',
                            body: '𝘏𝘢𝘪 𝘨𝘶𝘢𝘥𝘢𝘨𝘯𝘢𝘵𝘰 𝘥𝘦𝘪 𝘥𝘰𝘭𝘤𝘪!',
                            thumbnail: thumb,
                            mediaType: 1,
                            sourceUrl: ''
                        }
                    }
                }, { quoted: createOrderMessage(quantity, 'Vendita Completata') })
            } else {
                await conn.sendMessage(m.chat, { text: successMessage }, { quoted: createOrderMessage(quantity, 'Vendita Completata') })
            }
        } catch (e) {
            console.error(e)
            conn.reply(m.chat, '╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Errore vendita!\n  ━━✫ Riprova più tardi.\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱', m)
        }
        return
    }
}

// Configurazione del comando
handler.help = ['shop', 'compra', 'vendi']
handler.tags = ['rpg', 'shop']
handler.command = /^(shop|negozio|compra|buy|acquista|vendi|sell|paga-carta|paga-misto)$/i
handler.register = true

export default handler

// Funzione per pulire automaticamente i dati scaduti (chiamata periodicamente)
setInterval(() => {
    if (global.shopDiscounts && global.shopDiscounts.discounts) {
        let cleaned = false
        for (const [key, discount] of Object.entries(global.shopDiscounts.discounts)) {
            if (!discountSystem.isDiscountValid(discount)) {
                delete global.shopDiscounts.discounts[key]
                cleaned = true
            }
        }
        if (cleaned) {
            console.log('🧹 Sconti scaduti rimossi automaticamente')
        }
    }
}, 5 * 60 * 1000) // Ogni 5 minuti

// Funzione di utilità per admin - forza rigenerazione sconti
global.forceRefreshDiscounts = () => {
    if (global.shopDiscounts) {
        global.shopDiscounts = {
            discounts: {},
            lastRefresh: 0
        }
        console.log('🔄 Sconti rigenerati forzatamente')
        return true
    }
    return false
}
