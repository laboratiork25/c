import { createHash } from 'crypto';
import PhoneNumber from 'awesome-phonenumber';
import '../lib/language.js';

const handler = async (m, { conn }) => {
  try {
    const userId = m.sender;
    const groupId = m.chat;

    if (m?.buttonId === '.setanni') {
      return conn.sendMessage(m.chat, { text: global.t('infoSetAgeHelp', userId, groupId) }, { quoted: m });
    }

    if (m?.buttonId === '.setig') {
      return conn.sendMessage(m.chat, { text: global.t('infoSetIgHelp', userId, groupId) }, { quoted: m });
    }

    if (!m.isGroup) {
      return conn.sendMessage(m.chat, { text: global.t('infoGroupOnly', userId, groupId) }, { quoted: m });
    }

    const mention = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : m.sender);
    const who = mention || m.sender;

    if (!global.db.data.users[who]) {
      global.db.data.users[who] = { 
        money: 0, warn: 0, warnlink: 0, 
        muto: false, banned: false, 
        messaggi: 0, blasphemy: 0, 
        blasphemyCounted: 0,
        command: 0, vittorieSlot: 0, 
        categoria: null, instagram: null, 
        eta: null, genere: null
      };
    }

    const user = global.db.data.users[who];

    const gradi = [
      global.t('grade1', userId, groupId), global.t('grade2', userId, groupId),
      global.t('grade3', userId, groupId), global.t('grade4', userId, groupId),
      global.t('grade5', userId, groupId), global.t('grade6', userId, groupId),
      global.t('grade7', userId, groupId), global.t('grade8', userId, groupId),
      global.t('grade9', userId, groupId), global.t('grade10', userId, groupId),
      global.t('grade11', userId, groupId), global.t('grade12', userId, groupId),
      global.t('grade13', userId, groupId), global.t('grade14', userId, groupId),
      global.t('grade15', userId, groupId), global.t('grade16', userId, groupId),
      global.t('grade17', userId, groupId), global.t('grade18', userId, groupId),
      global.t('grade19', userId, groupId), global.t('grade20', userId, groupId),
      global.t('grade21', userId, groupId), global.t('grade22', userId, groupId),
      global.t('grade23', userId, groupId), global.t('grade24', userId, groupId),
      global.t('grade25', userId, groupId), global.t('grade26', userId, groupId),
      global.t('grade27', userId, groupId), global.t('grade28', userId, groupId),
    ];

    const livello = Math.floor(user.messaggi / 1000);
    const grado = livello >= 30 ? global.t('gradeMax', userId, groupId) : (gradi[livello] || "-");

    const groupMetadata = await conn.groupMetadata(m.chat);
    const participants = groupMetadata.participants;
    const groupOwner = groupMetadata.owner;

    const participant = participants.find(p => p.id === who);
    const isAdmin = participant && (participant.admin === 'admin' || participant.admin === 'superadmin');
    const isFounder = who === groupOwner;

    const ruolo = isFounder ? global.t('roleFounder', userId, groupId) : 
                 isAdmin ? global.t('roleAdmin', userId, groupId) : 
                 global.t('roleMember', userId, groupId);

    const emojiGenere = user.genere === "maschio" ? global.t('genderMale', userId, groupId) : 
                       user.genere === "femmina" ? global.t('genderFemale', userId, groupId) : 
                       global.t('genderNotSet', userId, groupId);

    let pic;
    try {
      const res = await fetch(pic);
      const arrayBuffer = await res.arrayBuffer();
      pic = Buffer.from(arrayBuffer);
    } catch (error) {
      const res = await fetch('https://qu.ax/LoGxD.png');
      const arrayBuffer = await res.arrayBuffer();
      pic = Buffer.from(arrayBuffer);
    }

    const infoText = global.t('infoText', userId, groupId, {
      messages: user.messaggi || 0,
      warn: user.warn || 0,
      role: ruolo,
      age: user.eta ? `${user.eta} ${global.t('years', userId, groupId)}` : global.t('notSet', userId, groupId),
      gender: emojiGenere,
      blasphemy: user.blasphemy || 0,
      instagram: user.instagram ? `instagram.com/${user.instagram}` : global.t('instagramNotSet', userId, groupId)
    });

    conn.sendMessage(m.chat, {
      text: infoText,
      contextInfo: {
        mentionedJid: [who],
        externalAdReply: {
          title: `${user.name || global.t('unknown', userId, groupId)}`,
          body: global.t('creationBy', userId, groupId),
          thumbnail: pic,
        }
      },
      buttons: [
        { buttonId: '.setanni', buttonText: { displayText: global.t('buttonSetAge', userId, groupId) }, type: 1 },
        { buttonId: '.setgenere maschio', buttonText: { displayText: global.t('buttonSetMale', userId, groupId) }, type: 1 },
        { buttonId: '.setgenere femmina', buttonText: { displayText: global.t('buttonSetFemale', userId, groupId) }, type: 1 },
        { buttonId: '.setig', buttonText: { displayText: global.t('buttonSetIg', userId, groupId) }, type: 1 }
      ],
      footer: global.t('footerSetData', userId, groupId),
      viewOnce: true,
      headerType: 4
    }, { quoted: m });

  } catch (error) {
    console.error(error);
  }
};

handler.command = /^(info|profile)$/i;
handler.help = ['info [@user]'];
handler.tags = ['info'];
handler.description = 'Mostra le informazioni del profilo utente';

export default handler;