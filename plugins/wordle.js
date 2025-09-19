import { createCanvas } from 'canvas'
import '../lib/language.js'

const WORDLE_WORDS = [
    'AMORE', 'AMICO', 'ALBERO', 'ACQUA', 'ANIMA',
    'BELLO', 'BUONO', 'BIANCO', 'BARCA', 'BOSCO',
    'CASA', 'CUORE', 'CIELO', 'CALDO', 'CAMPO',
    'DOLCE', 'DONNA', 'DENTE', 'DANZA', 'DRAGO',
    'ERBA', 'ESTATE', 'EPOCA', 'EROE', 'ENERGIA',
    'FIORE', 'FUOCO', 'FORTE', 'FIUME', 'FESTA',
    'GATTO', 'GIOCO', 'GRANDE', 'GIOIA', 'GUERRA',
    'HOTEL', 'HELLO', 'HOUSE', 'HAPPY', 'HEART',
    'ISOLA', 'INVERNO', 'IDEA', 'ITALIA', 'INSIEME',
    'LUCE', 'LUNA', 'LIBRO', 'LUNGO', 'LIBERTÀ',
    'MARE', 'MONDO', 'MUSICA', 'MADRE', 'MONTE',
    'NOTTE', 'NOME', 'NUOVO', 'NATURA', 'NERO',
    'OCCHI', 'OGGI', 'ORECCHIO', 'OMBRA', 'OPERA',
    'PACE', 'PAROLA', 'PAESE', 'PORTA', 'PIAZZA',
    'QUADRO', 'QUANDO', 'QUESTO', 'QUINTA', 'QUOTA',
    'ROSSO', 'RAGAZZA', 'RICCO', 'RADIO', 'REGNO',
    'SOLE', 'STRADA', 'STORIA', 'SCUOLA', 'SOGNO',
    'TEMPO', 'TERRA', 'TAVOLO', 'TRENO', 'TUTTO',
    'UOMO', 'ULTIMO', 'UFFICIO', 'UNIRE', 'UTILE',
    'VERDE', 'VENTO', 'VITA', 'VOCE', 'VIAGGIO',
    'WATER', 'WORLD', 'WRITE', 'WATCH', 'WOMAN',
    'XILOFONO', 'XENOFOBIA', 'XEROX', 'XERES', 'XIFO',
    'YOGA', 'YACHT', 'YOUNG', 'YEARS', 'YELLOW',
    'ZONA', 'ZERO', 'ZUCCA', 'ZITTO', 'ZAINO'
]

const gameState = new Map()

function createWordleImage(attempts, currentWord, targetWord) {
    const canvas = createCanvas(300, 360)
    const ctx = canvas.getContext('2d')
    
    // Background
    ctx.fillStyle = '#121213'
    ctx.fillRect(0, 0, 300, 360)
    
    // Title
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 24px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('WORDLE', 150, 30)
    
    // Grid
    const cellSize = 50
    const startX = 25
    const startY = 50
    
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 5; col++) {
            const x = startX + col * (cellSize + 5)
            const y = startY + row * (cellSize + 5)
            
            let letter = ''
            let bgColor = '#3a3a3c'
            let textColor = '#ffffff'
            
            if (row < attempts.length) {
                letter = attempts[row][col] || ''
                if (letter) {
                    if (targetWord[col] === letter) {
                        bgColor = '#6aaa64' // Green - correct position
                    } else if (targetWord.includes(letter)) {
                        bgColor = '#c9b458' // Yellow - wrong position
                    } else {
                        bgColor = '#787c7e' // Gray - not in word
                    }
                }
            } else if (row === attempts.length && currentWord) {
                letter = currentWord[col] || ''
                if (letter) {
                    bgColor = '#565758'
                }
            }
            
            // Draw cell
            ctx.fillStyle = bgColor
            ctx.fillRect(x, y, cellSize, cellSize)
            
            // Draw border
            ctx.strokeStyle = '#3a3a3c'
            ctx.lineWidth = 2
            ctx.strokeRect(x, y, cellSize, cellSize)
            
            // Draw letter
            if (letter) {
                ctx.fillStyle = textColor
                ctx.font = 'bold 24px Arial'
                ctx.textAlign = 'center'
                ctx.fillText(letter, x + cellSize/2, y + cellSize/2 + 8)
            }
        }
    }
    
    return canvas.toBuffer()
}

const handler = async (m, { conn, text, usedPrefix, command }) => {
    const userId = m.sender
    const groupId = m.isGroup ? m.chat : null
    
    if (!text) {
        const helpMessage = global.t('wordleHelp', userId, groupId) || 
            `🎯 *WORDLE*\n\nIndovina la parola di 5 lettere!\n\nUso: ${usedPrefix}${command} <parola>\nEsempio: ${usedPrefix}${command} AMORE\n\nOppure: ${usedPrefix}${command} new - per iniziare una nuova partita`
        return conn.reply(m.chat, helpMessage, m)
    }
    
    const gameKey = `${userId}_wordle`
    
    if (text.toLowerCase() === 'new' || text.toLowerCase() === 'nuovo') {
        const targetWord = WORDLE_WORDS[Math.floor(Math.random() * WORDLE_WORDS.length)]
        gameState.set(gameKey, {
            targetWord,
            attempts: [],
            currentWord: '',
            gameOver: false
        })
        
        const newGameMessage = global.t('wordleNewGame', userId, groupId) || 
            '🎯 *Nuova partita Wordle iniziata!*\n\nIndovina la parola di 5 lettere.\nHai 6 tentativi!'
        
        const image = createWordleImage([], '', targetWord)
        return conn.sendFile(m.chat, image, 'wordle.png', newGameMessage, m)
    }
    
    const guess = text.toUpperCase().replace(/[^A-Z]/g, '')
    
    if (guess.length !== 5) {
        const errorMessage = global.t('wordleInvalidLength', userId, groupId) || 
            '❌ La parola deve essere di esattamente 5 lettere!'
        return conn.reply(m.chat, errorMessage, m)
    }
    
    let game = gameState.get(gameKey)
    if (!game) {
        const targetWord = WORDLE_WORDS[Math.floor(Math.random() * WORDLE_WORDS.length)]
        game = {
            targetWord,
            attempts: [],
            currentWord: '',
            gameOver: false
        }
        gameState.set(gameKey, game)
    }
    
    if (game.gameOver) {
        const gameOverMessage = global.t('wordleGameOver', userId, groupId) || 
            '🎯 La partita è già finita! Usa "new" per iniziarne una nuova.'
        return conn.reply(m.chat, gameOverMessage, m)
    }
    
    game.attempts.push(guess)
    
    let resultMessage = ''
    
    if (guess === game.targetWord) {
        game.gameOver = true
        resultMessage = global.t('wordleWin', userId, groupId) || 
            `🎉 *Complimenti!* Hai indovinato la parola: *${game.targetWord}*\n\nTentativi: ${game.attempts.length}/6`
    } else if (game.attempts.length >= 6) {
        game.gameOver = true
        resultMessage = global.t('wordleLose', userId, groupId) || 
            `😔 *Game Over!* La parola era: *${game.targetWord}*\n\nRiprova con una nuova partita!`
    } else {
        resultMessage = global.t('wordleContinue', userId, groupId) || 
            `🎯 Tentativo ${game.attempts.length}/6\n\nContinua a indovinare!`
    }
    
    const image = createWordleImage(game.attempts, '', game.targetWord)
    await conn.sendFile(m.chat, image, 'wordle.png', resultMessage, m)
}

handler.help = ['wordle']
handler.tags = ['game']
handler.command = /^(wordle)$/i

export default handler
