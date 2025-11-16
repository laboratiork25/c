import '../lib/language.js';
import { createCanvas } from 'canvas';

const CARD_WIDTH = 80;
const CARD_HEIGHT = 120;
const CARD_RADIUS = 10;
const TABLE_WIDTH = 700;
const TABLE_HEIGHT = 500;

class BlackjackGame {
    constructor(playerId, userData, userId, groupId) {
        this.playerId = playerId;
        this.userData = userData;
        this.userId = userId;
        this.groupId = groupId;
        this.deck = this.createDeck();
        this.shuffleDeck();
        this.playerHand = [];
        this.dealerHand = [];
        this.playerScore = 0;
        this.dealerScore = 0;
        this.gameState = 'betting';
        this.betAmount = 0;
        this.winner = null;
        this.message = global.t('bjMakeBet', userId, groupId);
        this.startTime = Date.now();
    }

    createDeck() {
        const suits = ['♥', '♦', '♣', '♠'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const deck = [];
        
        for (const suit of suits) {
            for (const value of values) {
                deck.push({ suit, value });
            }
        }
        return deck;
    }

    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    dealCard(hand) {
        if (this.deck.length === 0) {
            this.deck = this.createDeck();
            this.shuffleDeck();
        }
        const card = this.deck.pop();
        hand.push(card);
        return card;
    }

    calculateScore(hand) {
        let score = 0;
        let aces = 0;

        for (const card of hand) {
            if (['J', 'Q', 'K'].includes(card.value)) {
                score += 10;
            } else if (card.value === 'A') {
                aces++;
                score += 11;
            } else {
                score += parseInt(card.value);
            }
        }

        while (score > 21 && aces > 0) {
            score -= 10;
            aces--;
        }

        return score;
    }

    startGame(bet) {
        if (bet > this.userData.limit) {
            return { error: global.t('bjInsufficientFunds', this.userId, this.groupId) };
        }

        this.betAmount = bet;
        this.userData.limit -= bet;
        this.playerHand = [];
        this.dealerHand = [];
        
        this.dealCard(this.playerHand);
        this.dealCard(this.dealerHand);
        this.dealCard(this.playerHand);
        this.dealCard(this.dealerHand);

        this.playerScore = this.calculateScore(this.playerHand);
        this.dealerScore = this.calculateScore([this.dealerHand[0]]);

        this.gameState = 'player-turn';
        this.message = global.t('bjYourTurn', this.userId, this.groupId);

        return { success: true };
    }

    playerHit() {
        if (this.gameState !== 'player-turn') {
            return { error: global.t('bjNotYourTurn', this.userId, this.groupId) };
        }

        this.dealCard(this.playerHand);
        this.playerScore = this.calculateScore(this.playerHand);

        if (this.playerScore > 21) {
            this.gameState = 'game-over';
            this.winner = 'dealer';
            this.message = global.t('bjBusted', this.userId, this.groupId);
            return { bust: true };
        }

        this.message = global.t('bjYourScore', this.userId, this.groupId, { score: this.playerScore });
        return { success: true, score: this.playerScore };
    }

    playerStand() {
        if (this.gameState !== 'player-turn') {
            return { error: global.t('bjNotYourTurn', this.userId, this.groupId) };
        }

        this.gameState = 'dealer-turn';
        this.dealerPlay();
        return { success: true };
    }

    dealerPlay() {
        this.dealerScore = this.calculateScore(this.dealerHand);
        
        while (this.dealerScore < 17) {
            this.dealCard(this.dealerHand);
            this.dealerScore = this.calculateScore(this.dealerHand);
        }

        this.determineWinner();
    }

    determineWinner() {
        this.gameState = 'game-over';
        
        if (this.dealerScore > 21) {
            this.winner = 'player';
            this.userData.limit += this.betAmount * 2;
            this.message = global.t('bjDealerBusted', this.userId, this.groupId);
        } else if (this.playerScore > this.dealerScore) {
            this.winner = 'player';
            this.userData.limit += this.betAmount * 2;
            this.message = global.t('bjYouWin', this.userId, this.groupId);
        } else if (this.playerScore < this.dealerScore) {
            this.winner = 'dealer';
            this.message = global.t('bjDealerWins', this.userId, this.groupId);
        } else {
            this.winner = 'push';
            this.userData.limit += this.betAmount;
            this.message = global.t('bjPush', this.userId, this.groupId);
        }
    }

    async generateTableImage() {
        const canvas = createCanvas(TABLE_WIDTH, TABLE_HEIGHT);
        const ctx = canvas.getContext('2d');

        // Sfondo tavolo di feltro verde
        ctx.fillStyle = '#0d5e2c';
        ctx.fillRect(0, 0, TABLE_WIDTH, TABLE_HEIGHT);

        // Pattern texture del feltro
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        for (let i = 0; i < TABLE_WIDTH; i += 4) {
            for (let j = 0; j < TABLE_HEIGHT; j += 4) {
                if ((i + j) % 8 === 0) {
                    ctx.fillRect(i, j, 2, 2);
                }
            }
        }

        // Bordo tavolo in legno
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 15;
        ctx.strokeRect(10, 10, TABLE_WIDTH - 20, TABLE_HEIGHT - 20);

        // Decorazione angoli
        ctx.strokeStyle = '#D2691E';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(25, 25, 15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(TABLE_WIDTH - 25, 25, 15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(25, TABLE_HEIGHT - 25, 15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(TABLE_WIDTH - 25, TABLE_HEIGHT - 25, 15, 0, Math.PI * 2);
        ctx.stroke();

        // Logo centrale
        ctx.fillStyle = 'rgba(255, 215, 0, 0.2)';
        ctx.font = 'bold 60px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('♠️♥️♣️♦️', TABLE_WIDTH / 2, TABLE_HEIGHT / 2);

        // Disegna mano giocatore
        this.drawHand(ctx, this.playerHand, TABLE_WIDTH / 2, TABLE_HEIGHT - 120, global.t('bjPlayer', this.userId, this.groupId));

        // Disegna mano dealer
        const showAllCards = this.gameState !== 'player-turn';
        this.drawHand(ctx, this.dealerHand, TABLE_WIDTH / 2, 120, global.t('bjDealer', this.userId, this.groupId), showAllCards);

        // Punteggi con sfondo
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.beginPath();
        ctx.roundRect(TABLE_WIDTH / 2 - 80, TABLE_HEIGHT - 160, 160, 30, 15);
        ctx.fill();
        
        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(`${global.t('bjScore', this.userId, this.groupId)}: ${this.playerScore}`, TABLE_WIDTH / 2, TABLE_HEIGHT - 140);

        if (showAllCards) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.beginPath();
            ctx.roundRect(TABLE_WIDTH / 2 - 80, 80, 160, 30, 15);
            ctx.fill();
            
            ctx.fillStyle = '#FFD700';
            ctx.fillText(`${global.t('bjScore', this.userId, this.groupId)}: ${this.dealerScore}`, TABLE_WIDTH / 2, 100);
        }

        // Info gioco con sfondo
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.beginPath();
        ctx.roundRect(TABLE_WIDTH / 2 - 200, TABLE_HEIGHT / 2 - 20, 400, 40, 20);
        ctx.fill();
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 18px Arial';
        ctx.fillText(this.message, TABLE_WIDTH / 2, TABLE_HEIGHT / 2 + 5);

        // Portafoglio e puntata
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.beginPath();
        ctx.roundRect(20, 20, 250, 60, 15);
        ctx.fill();
        
        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`${global.t('bjWallet', this.userId, this.groupId)}: ${this.formatNumber(this.userData.limit)} UC`, 40, 45);
        ctx.fillText(`${global.t('bjBet', this.userId, this.groupId)}: ${this.formatNumber(this.betAmount)} UC`, 40, 70);

        return canvas.toBuffer('image/png');
    }

    drawHand(ctx, hand, centerX, y, label, showAll = true) {
        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(label, centerX, y - 50);

        const totalWidth = (hand.length * CARD_WIDTH) + ((hand.length - 1) * 20);
        let x = centerX - totalWidth / 2;

        for (let i = 0; i < hand.length; i++) {
            if (!showAll && i === 1 && label === global.t('bjDealer', this.userId, this.groupId) && this.gameState === 'player-turn') {
                this.drawCardBack(ctx, x, y);
            } else {
                this.drawCard(ctx, x, y, hand[i]);
            }
            x += CARD_WIDTH + 20;
        }
    }

    drawCard(ctx, x, y, card) {
        // Sfondo carta con gradiente
        const gradient = ctx.createLinearGradient(x, y, x + CARD_WIDTH, y + CARD_HEIGHT);
        gradient.addColorStop(0, '#FFFFFF');
        gradient.addColorStop(1, '#F8F8F8');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, CARD_WIDTH, CARD_HEIGHT, CARD_RADIUS);
        ctx.fill();
        
        // Ombra
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.shadowColor = 'transparent';

        // Colore in base al seme
        ctx.fillStyle = ['♥', '♦'].includes(card.suit) ? '#FF0000' : '#000000';

        // Valore angolo superiore
        ctx.font = 'bold 22px Arial';
        ctx.fillText(card.value, x + 18, y + 28);

        // Seme angolo superiore
        ctx.font = '18px Arial';
        ctx.fillText(card.suit, x + 18, y + 50);

        // Seme centrale grande
        ctx.font = '48px Arial';
        ctx.fillText(card.suit, x + CARD_WIDTH / 2, y + CARD_HEIGHT / 2 + 15);

        // Valore angolo inferiore (ruotato)
        ctx.save();
        ctx.translate(x + CARD_WIDTH - 18, y + CARD_HEIGHT - 28);
        ctx.rotate(Math.PI);
        ctx.font = 'bold 22px Arial';
        ctx.fillText(card.value, 0, 0);
        ctx.restore();

        // Seme angolo inferiore (ruotato)
        ctx.save();
        ctx.translate(x + CARD_WIDTH - 18, y + CARD_HEIGHT - 50);
        ctx.rotate(Math.PI);
        ctx.font = '18px Arial';
        ctx.fillText(card.suit, 0, 0);
        ctx.restore();

        // Pattern decorativo
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + 10, y + 60);
        ctx.lineTo(x + CARD_WIDTH - 10, y + 60);
        ctx.stroke();
    }

    drawCardBack(ctx, x, y) {
        // Sfondo con gradiente blu
        const gradient = ctx.createLinearGradient(x, y, x + CARD_WIDTH, y + CARD_HEIGHT);
        gradient.addColorStop(0, '#1a237e');
        gradient.addColorStop(1, '#283593');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, CARD_WIDTH, CARD_HEIGHT, CARD_RADIUS);
        ctx.fill();
        
        // Bordo oro
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Pattern decorativo
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 3; j++) {
                ctx.beginPath();
                ctx.arc(x + 20 + i * 15, y + 30 + j * 30, 5, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Punto interrogativo centrale
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('?', x + CARD_WIDTH / 2, y + CARD_HEIGHT / 2 + 15);
    }

    formatNumber(num) {
        return new Intl.NumberFormat('it-IT').format(num);
    }
}

global.blackjackGame = global.blackjackGame || {};

async function handleBlackjackTimeout(conn, chat, gameId, userId, groupId) {
    const game = global.blackjackGame?.[chat];
    if (!game || game.id !== gameId) return;

    try {
        const image = await game.generateTableImage();
        
        await conn.sendMessage(chat, {
            image: image,
            caption: global.t('bjTimeoutMsg', userId, groupId, { balance: game.formatNumber(game.userData.limit) }),
            footer: global.t('bjFooter', userId, groupId)
        });
        
        delete global.blackjackGame[chat];
    } catch (error) {
        console.error('[BLACKJACK] Errore timeout:', error);
        delete global.blackjackGame[chat];
    }
}

async function startBlackjack(conn, m, bet) {
    const chat = m.chat;
    const who = m.sender;
    const userId = m.sender;
    const groupId = m.chat;
    const user = global.db.data.users[who];

    if (!user) return conn.reply(m.chat, '❌ Utente non trovato nel database!', m);

    if (global.blackjackGame?.[chat]) {
        return conn.reply(m.chat, global.t('bjGameInProgress', userId, groupId), m);
    }

    try {
        const betAmount = parseInt(bet);
        if (isNaN(betAmount) || betAmount < 10 || betAmount > user.limit) {
            return conn.reply(m.chat, global.t('bjInvalidBet', userId, groupId, { max: user.limit }), m);
        }

        const game = new BlackjackGame(who, user, userId, groupId);
        const result = game.startGame(betAmount);
        if (result.error) return conn.reply(m.chat, result.error, m);

        const image = await game.generateTableImage();
        const name = conn.getName(who);
        
        const caption = global.t('bjStartCaption', userId, groupId, {
            name,
            bet: game.formatNumber(betAmount),
            balance: game.formatNumber(user.limit)
        });

        const msg = await conn.sendMessage(chat, {
            image: image,
            caption: caption,
            footer: global.t('bjFooter', userId, groupId),
            mentions: [who]
        }, { quoted: m });

        game.id = msg.key.id;
        global.blackjackGame[chat] = game;

        game.timeoutId = setTimeout(() => {
            handleBlackjackTimeout(conn, chat, msg.key.id, userId, groupId);
        }, 120000);

    } catch (error) {
        console.error('Errore blackjack:', error);
        await conn.reply(m.chat, '❌ Errore nell\'avvio del gioco', m);
    }
}

let handler = async (m, { conn, command, usedPrefix, text }) => {
    const chat = m.chat;
    const userId = m.sender;
    const groupId = m.chat;
    const game = global.blackjackGame?.[chat];

    if (command === 'blackjack') {
        await startBlackjack(conn, m, text || '100');
        return;
    }

    if (!game) {
        return conn.reply(m.chat, global.t('bjNoGame', userId, groupId), m);
    }

    if (m.sender !== game.playerId) {
        return conn.reply(m.chat, global.t('bjNotYourGame', userId, groupId), m);
    }

    if (command === 'hit' || command === 'carta') {
        const result = game.playerHit();
        if (result.error) return conn.reply(m.chat, result.error, m);

        const image = await game.generateTableImage();
        let caption = global.t('bjYourScore', userId, groupId, { score: game.playerScore });
        if (result.bust) caption = game.message;

        await conn.sendMessage(chat, { 
            image: image, 
            caption: caption,
            footer: global.t('bjFooter', userId, groupId)
        });
        
        if (game.gameState === 'game-over') {
            delete global.blackjackGame[chat];
        }
        return;
    }

    if (command === 'stand' || command === 'stai') {
        const result = game.playerStand();
        if (result.error) return conn.reply(m.chat, result.error, m);

        const image = await game.generateTableImage();
        await conn.sendMessage(chat, { 
            image: image, 
            caption: game.message,
            footer: global.t('bjFooter', userId, groupId)
        });
        delete global.blackjackGame[chat];
        return;
    }

    if (command === 'double' || command === 'raddoppia') {
        if (game.playerHand.length !== 2) {
            return conn.reply(m.chat, global.t('bjDoubleOnlyTwo', userId, groupId), m);
        }

        if (game.userData.limit < game.betAmount) {
            return conn.reply(m.chat, global.t('bjDoubleInsufficientFunds', userId, groupId), m);
        }

        game.userData.limit -= game.betAmount;
        game.betAmount *= 2;

        game.playerHit();
        if (game.playerScore <= 21) {
            game.playerStand();
        }

        const image = await game.generateTableImage();
        await conn.sendMessage(chat, { 
            image: image, 
            caption: game.message,
            footer: global.t('bjFooter', userId, groupId)
        });
        
        if (game.gameState === 'game-over') {
            delete global.blackjackGame[chat];
        }
    }
};

handler.help = ['blackjack [bet]', 'hit/carta', 'stand/stai', 'double/raddoppia'];
handler.tags = ['game'];
handler.command = /^(blackjack|hit|carta|stand|stai|double|raddoppia)$/i;
handler.group = true;
handler.register = true;

export default handler;
