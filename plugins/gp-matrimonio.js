import '../lib/language.js';
const proposals = {};

let handler = async (m, { conn, participants, command, text, args, usedPrefix }) => {
    let users = global.db.data.users;
    let user = users[m.sender];

    switch (command) {
        case 'sposa':
            await handleSposa(m, user, users, text, usedPrefix, conn);
            break;
        case 'divorzia':
            handleDivorzia(m, user, users);
            break;
    }
};

const handleSposa = async (m, user, users, text, usedPrefix, conn) => {
    let mention = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : null);
    if (!mention || typeof mention !== 'string' || !mention.endsWith('@s.whatsapp.net')) 
        throw global.t('marry_no_target', m.sender, { prefix: usedPrefix, command: 'sposa' });

    if (mention === m.sender) throw global.t('marry_self', m.sender);
    
    let destinatario = users[mention];
    if (!destinatario) throw global.t('marry_user_not_found', m.sender);
    
    if (user.sposato) {
        let testo = global.t('marry_already_married_sender', m.sender, { 
            spouse: `@${user.coniuge?.split('@')[0] || 'sconosciuto'}` 
        });
        m.reply(testo, null, { mentions: user.coniuge ? [user.coniuge] : [] });
        return;
    }
    
    if (destinatario.sposato) {
        let testo = global.t('marry_already_married_target', m.sender, { 
            target: `@${mention.split('@')[0]}` 
        });
        m.reply(testo, null, { mentions: [mention] });
        return;
    }
    
    if (proposals[m.sender] || proposals[mention]) throw global.t('marry_pending_proposal', m.sender);

    proposals[mention] = { from: m.sender, timeout: null };
    proposals[m.sender] = { to: mention, timeout: null };

    let testo = global.t('marry_proposal_text', m.sender, {
        target: `@${mention.split('@')[0]}`,
        sender: `@${m.sender.split('@')[0]}`
    });

    await conn.sendMessage(m.chat, {
        text: testo,
        mentions: [mention, m.sender],
        buttons: [
            { buttonId: "Si", buttonText: { displayText: global.t('marry_button_yes', m.sender) }, type: 1 },
            { buttonId: "No", buttonText: { displayText: global.t('marry_button_no', m.sender) }, type: 1 }
        ],
        viewOnce: true,
        headerType: 4
    }, { quoted: m });

    let timeoutCallback = () => {
        if (proposals[mention]) {
            let annullamento = global.t('marry_proposal_expired', null, {
                sender: `@${m.sender.split('@')[0]}`,
                target: `@${mention.split('@')[0]}`
            });
            conn.sendMessage(m.chat, { text: annullamento, mentions: [m.sender, mention] });
            delete proposals[mention];
            delete proposals[m.sender];
        }
    };

    proposals[mention].timeout = setTimeout(timeoutCallback, 60000); 
    proposals[m.sender].timeout = proposals[mention].timeout;
};

handler.before = async (m) => {
    if (!m.text) return;

    let user = proposals[m.sender];
    if (!user) return;

    clearTimeout(user.timeout);

    if (/^No|no$/i.test(m.text)) {
        let fromUser = proposals[m.sender].from || m.sender;
        delete proposals[fromUser];
        delete proposals[m.sender];
        return m.reply(global.t('marry_proposal_rejected', m.sender), null, { mentions: [fromUser] });
    }

    if (/^Si|si$/i.test(m.text)) {
        let fromUser = proposals[m.sender].from;
        let toUser = m.sender;

        // Controlla che entrambi gli utenti esistano nel database
        let senderUser = global.db.data.users[fromUser];
        let receiverUser = global.db.data.users[toUser];
        if (!senderUser || !receiverUser) {
            delete proposals[fromUser];
            delete proposals[toUser];
            return m.reply(global.t('marry_user_not_found_db', m.sender));
        }

        senderUser.sposato = true;
        senderUser.coniuge = toUser;
        senderUser.primoMatrimonio = true; 
        receiverUser.sposato = true;
        receiverUser.coniuge = fromUser;
        receiverUser.primoMatrimonio = true;

        let testo = global.t('marry_success', m.sender, {
            sender: `@${m.sender.split('@')[0]}`,
            target: `@${fromUser.split('@')[0]}`
        });
        
        await m.reply(testo, null, { mentions: [m.sender, fromUser] });

        delete proposals[fromUser];
        delete proposals[toUser];
    }
};

const handleDivorzia = (m, user, users) => {
    if (!user.sposato) throw global.t('divorce_not_married', m.sender);

    let ex = users[user.coniuge];
    if (!ex) throw global.t('divorce_spouse_not_found', m.sender);

    if (!Array.isArray(user.ex)) user.ex = [];
    if (!user.ex.includes(user.coniuge)) user.ex.push(user.coniuge);

    if (!Array.isArray(ex.ex)) ex.ex = [];
    if (!ex.ex.includes(m.sender)) ex.ex.push(m.sender);

    user.sposato = false;
    let exConiuge = user.coniuge; // Salva il coniuge prima di cancellarlo
    user.coniuge = '';
    ex.sposato = false;
    ex.coniuge = '';

    let testo = global.t('divorce_success', m.sender, {
        ex: `@${exConiuge?.split('@')[0] || 'sconosciuto'}`
    });
    
    m.reply(testo, null, { mentions: exConiuge ? [exConiuge] : [] });
};

handler.group = true;
handler.command = /^(sposa|divorzia|marry|divorce)$/i;
export default handler;