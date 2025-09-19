import TicTacToe from '../lib/tictactoe.js';
import '../lib/language.js';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    const userId = m.sender;
    const groupId = m.isGroup ? m.chat : null;
    
    conn.game = conn.game ? conn.game : {};
    
    if (Object.values(conn.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) {
        throw global.t('alreadyPlaying', userId, groupId);
    }
    
    if (!text) throw global.t('roomNameRequired', userId, groupId, { prefix: usedPrefix, command });

    let room = Object.values(conn.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true));
    
    if (room) {
        await m.reply(global.t('gameStarting', userId, groupId));
        
        room.o = m.chat;
        room.game.playerO = m.sender;
        room.state = 'PLAYING';

        // Invia la prima immagine
        await room.game.sendGameImage();

    } else {
        // Crea nuova partita con riferimento alla connessione
        room = {
            id: 'tictactoe-' + (+new Date),
            x: m.chat,
            o: '',
            game: new TicTacToe(m.sender, 'o', conn), // Passa conn al costruttore
            state: 'WAITING'
        };
        
        if (text) room.name = text;

        const roomInfo = global.t('roomCreated', userId, groupId, {
            roomName: text,
            prefix: usedPrefix,
            command: text
        });

        await conn.reply(m.chat, roomInfo, m);
        conn.game[room.id] = room;
    }
};

handler.command = /^(gioca|tris|ttt|xo|tictactoe)$/i;
handler.help = ['tris <nome_stanza>'];
handler.tags = ['game'];

export default handler;