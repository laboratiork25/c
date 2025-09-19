import { format } from 'util'
import '../lib/language.js'

let debugMode = !1
let winScore = 4999
let playScore = 99

export async function before(m) {
    let ok
    let isWin = !1
    let isTie = !1
    let isSurrender = !1
    this.game = this.game ? this.game : {}
    
    let room = Object.values(this.game).find(room => room.id && room.game && room.state && room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender) && room.state == 'PLAYING')
    
    if (room) {
        if (!/^([1-9]|(me)?nyerah|\rendirse\|rendirse|RENDIRSE|surr?ender)$/i.test(m.text)) 
            return !0
        
        isSurrender = !/^[1-9]$/.test(m.text)
        
        if (m.sender !== room.game.currentTurn) { 
            if (!isSurrender)
                return !0 
        }
        
        if (debugMode)
            m.reply('[DEBUG]\n' + format({
                isSurrender,
                text: m.text 
            }))
        
        if (!isSurrender && 1 > (ok = room.game.turn(m.sender === room.game.playerO, parseInt(m.text) - 1))) {
            // Rimuovi il messaggio di errore testuale
            return !0 
        }
        
        if (m.sender === room.game.winner)
            isWin = true
        else if (room.game.board === 511)
            isTie = true
        
        if (isSurrender) {
            room.game._currentTurn = m.sender === room.game.playerX
            isWin = true 
        }
        
        let winner = isSurrender ? room.game.currentTurn : room.game.winner
        
        // ⚠️ RIMOSSO COMPLETAMENTE L'INVIO DEL TESTO
        // Le immagini vengono già inviate automaticamente dal metodo sendGameImage della classe TicTacToe
        
        if (isTie || isWin) {
            // Invia immagine di fine gioco se c'è un vincitore o pareggio
            if (room.game.sendGameEndImage) {
                await room.game.sendGameEndImage(isWin ? winner : null);
            }
            
            // Gestisci l'esperienza
            let users = global.db.data.users
            users[room.game.playerX].exp += playScore
            users[room.game.playerO].exp += playScore
            if (isWin)
                users[winner].exp += winScore - playScore
            
            if (debugMode)
                m.reply('[DEBUG]\n' + format(room))
            
            delete this.game[room.id]
        }
    }
    return !0 
}