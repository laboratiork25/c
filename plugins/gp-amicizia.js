import '../lib/language.js';
//edited by filo222
const friendRequests = {};

let handler = async (m, { conn, participants, command, text, args, usedPrefix }) => {
    let users = global.db.data.users;
    let user = users[m.sender];

    switch (command) {
        case 'amicizia':
            await handleFriendRequest(m, user, users, text, usedPrefix, conn);
            break;
        case 'rimuoviamico':
            handleRemoveFriend(m, user, users);
            break;
    }
};

const handleFriendRequest = async (m, user, users, text, usedPrefix, conn) => {
    let mention = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : null;
    if (!mention) throw global.t('friend_no_target', m.sender, null, { prefix: usedPrefix });

    if (mention === m.sender) throw global.t('friend_self_error', m.sender);

    let destinatario = users[mention];
    if (!destinatario) throw global.t('user_not_found', m.sender);

    if (user.amici && user.amici.includes(mention)) {
        let testo = global.t('friend_already_added', m.sender, null, { user: mention.split('@')[0] });
        m.reply(testo, null, { mentions: [mention] });
        return;
    }

    if (friendRequests[m.sender] || friendRequests[mention]) throw global.t('friend_request_pending', m.sender);

    friendRequests[mention] = { from: m.sender, timeout: null };
    friendRequests[m.sender] = { to: mention, timeout: null };
    
    let testo = global.t('friend_request_sent', m.sender, null, { 
        target: mention.split('@')[0], 
        sender: m.sender.split('@')[0] 
    });

    const buttons = [
        { buttonId: 'accetta', buttonText: { displayText: global.t('button_accept', m.sender) }, type: 1 },
        { buttonId: 'rifiuta', buttonText: { displayText: global.t('button_reject', m.sender) }, type: 1 },
        { buttonId: 'rimuoviamico', buttonText: { displayText: global.t('button_remove', m.sender) }, type: 1 }
    ];

    await conn.sendMessage(m.chat, {
        text: testo,
        buttons,
        mentions: [mention, m.sender],
        headerType: 1
    }, { quoted: m });

    let timeoutCallback = () => {
        if (friendRequests[mention]) {
            let annullamento = global.t('friend_request_timeout', m.sender, null, { 
                sender: m.sender.split('@')[0], 
                target: mention.split('@')[0] 
            });
            conn.sendMessage(m.chat, { text: annullamento, mentions: [m.sender, mention] });
            delete friendRequests[mention];
            delete friendRequests[m.sender];
        }
    };

    friendRequests[mention].timeout = setTimeout(timeoutCallback, 60000); 
    friendRequests[m.sender].timeout = friendRequests[mention].timeout;
};

handler.before = async (m, { conn, participants, command, text, args, usedPrefix }) => {
    if (!(m.sender in friendRequests)) return null;

    if (!m.message || !m.message.buttonsResponseMessage) return;
    let response = m.message.buttonsResponseMessage.selectedButtonId;
    let sender = m.sender;

    let user = friendRequests[m.sender];
    if (!user) return;

    clearTimeout(user.timeout);

    if (response === 'rifiuta') {
        let fromUser = friendRequests[m.sender].from || m.sender;
        delete friendRequests[fromUser];
        delete friendRequests[m.sender];
        return m.reply(global.t('friend_request_rejected', m.sender), null, { mentions: [fromUser] });
    }

    if (response === 'accetta') {
        let fromUser = friendRequests[m.sender].from;
        let toUser = m.sender;

        let senderUser = global.db.data.users[fromUser];
        let receiverUser = global.db.data.users[toUser];

        if (!Array.isArray(senderUser.amici)) senderUser.amici = [];
        if (!Array.isArray(receiverUser.amici)) receiverUser.amici = [];

        senderUser.amici.push(toUser);
        receiverUser.amici.push(fromUser);
        
        let testo = global.t('friend_request_accepted', m.sender, null, { user: fromUser.split('@')[0] });
        m.reply(testo, null, { mentions: [fromUser] });

        delete friendRequests[fromUser];
        delete friendRequests[toUser];
    }
};

const handleRemoveFriend = (m, user, users) => {
    let mention = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : null;
    if (!mention) throw global.t('remove_no_target', m.sender);

    if (!user.amici || !user.amici.includes(mention)) throw global.t('remove_not_friend', m.sender, null, { user: mention.split('@')[0] });

    user.amici = user.amici.filter(friend => friend !== mention);
    let friend = users[mention];
    if (friend) {
        friend.amici = friend.amici.filter(friend => friend !== m.sender);
    }

    let testo = global.t('remove_success', m.sender, null, { user: mention.split('@')[0] });
    m.reply(testo, null, { mentions: [mention] });
};

handler.command = /^(amicizia|friendship|friend|addfriend|rimuoviamico|removefriend|unfriend)$/i;
export default handler;