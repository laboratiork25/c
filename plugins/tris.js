import '../lib/language.js';
import TicTacToe from '../lib/tictactoe.js';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    const userId = m.sender;
    const groupId = m.chat;
    
    conn.game = conn.game ? conn.game : {};
    
    if (Object.values(conn.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) {
        throw global.t('trisAlreadyPlaying', userId, groupId);
    }
    
    if (!text) throw global.t('trisNoRoomName', userId, groupId, { prefix: usedPrefix, command });
    
    let room = Object.values(conn.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true));
    
    if (room) {
        await m.reply(global.t('trisGameStarting', userId, groupId));
        room.o = m.chat;
        room.game.playerO = m.sender;
        room.state = 'PLAYING';
        
        let arr = room.game.render().map(v => {
            return {
                X: '❎',
                O: '⭕',
                1: '1️⃣',
                2: '2️⃣',
                3: '3️⃣',
                4: '4️⃣',
                5: '5️⃣',
                6: '6️⃣',
                7: '7️⃣',
                8: '8️⃣',
                9: '9️⃣',
            }[v];
        });
        
        let str = `

❎ = @${room.game.playerX.split('@')[0]}
⭕ = @${room.game.playerO.split('@')[0]}

        ${arr.slice(0, 3).join('')}
        ${arr.slice(3, 6).join('')}
        ${arr.slice(6).join('')}

${global.t('trisTurnOf', userId, groupId, { player: room.game.currentTurn.split('@')[0] })}
`.trim();
        
        if (room.x !== room.o) await conn.sendMessage(room.x, { text: str, mentions: conn.parseMention(str) }, { quoted: m });
        await conn.sendMessage(room.o, { text: str, mentions: conn.parseMention(str) }, { quoted: m });
        
    } else {
        room = {
            id: 'tictactoe-' + (+new Date),
            x: m.chat,
            o: '',
            game: new TicTacToe(m.sender, 'o'),
            state: 'WAITING'
        };
        
        if (text) room.name = text;
        
        let prova = {
            "key": {
                "participants": "0@s.whatsapp.net",
                "remoteJid": "status@broadcast",
                "fromMe": false,
                "id": "Halo"
            },
            "message": {
                "groupInviteMessage": {
                    caption: global.t('trisRoomCreated', userId, groupId),
                    "vcard": `BEGIN:VCARD\nVERSION:5.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD`
                }
            },
            "participant": "0@s.whatsapp.net"
        };
        
        conn.reply(m.chat, global.t('trisWaiting', userId, groupId, { room: text }), prova, m);
        conn.game[room.id] = room;
    }
};

handler.help = ['gioca <room>', 'play <room>', 'tris <room>', 'tictactoe <room>'];
handler.tags = ['game'];
handler.command = /^(gioca|play|tris|ttt|xo|tictactoe)$/i;

export default handler;
