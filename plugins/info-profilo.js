import '../lib/language.js';
import { createHash } from 'crypto';
import PhoneNumber from 'awesome-phonenumber';

const handler = async (m, { conn }) => {
  try {
    const userId = m.sender;
    const groupId = m.chat;
    
    if (m?.buttonId === '.setanni') {
      return conn.sendMessage(m.chat, { text: global.t('infoSetAge', userId, groupId) }, { quoted: m });
    }

    if (m?.buttonId === '.setig') {
      return conn.sendMessage(m.chat, { text: global.t('infoSetIG', userId, groupId) }, { quoted: m });
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

    const groupMetadata = await conn.groupMetadata(m.chat);
    const participants = groupMetadata.participants;
    const groupOwner = groupMetadata.owner;

    const participant = participants.find(p => p.id === who);
    const isAdmin = participant && (participant.admin === 'admin' || participant.admin === 'superadmin');
    const isFounder = who === groupOwner;

    const ruolo = isFounder ? global.t('infoRoleFounder', userId, groupId) : 
                  isAdmin ? global.t('infoRoleAdmin', userId, groupId) : 
                  global.t('infoRoleMember', userId, groupId);

    const emojiGenere = user.genere === "maschio" ? "🚹" : 
                        user.genere === "femmina" ? "🚺" : 
                        global.t('infoGenderNotSet', userId, groupId);

    const ageDisplay = user.eta ? global.t('infoAgeYears', userId, groupId, { age: user.eta }) : 
                                   global.t('infoAgeNotSet', userId, groupId);

    let pic;
    try {
      pic = await conn.profilePictureUrl(who, 'image');
      const res = await fetch(pic);
      const arrayBuffer = await res.arrayBuffer();
      pic = Buffer.from(arrayBuffer);
    } catch (error) {
      const res = await fetch('https://qu.ax/LoGxD.png');
      const arrayBuffer = await res.arrayBuffer();
      pic = Buffer.from(arrayBuffer);
    }

    conn.sendMessage(m.chat, {
      text: global.t('infoUserData', userId, groupId, {
        messages: user.messaggi || 0,
        warn: user.warn || 0,
        role: ruolo,
        age: ageDisplay,
        gender: emojiGenere,
        blasphemy: user.blasphemy || 0,
        instagram: user.instagram
      }),
      contextInfo: {
        mentionedJid: [who],
        externalAdReply: {
          title: `${user.name || 'Sconosciuto'}`,
          body: global.t('infoCreator', userId, groupId),
          thumbnail: pic,
        }
      },
      buttons: [
        { buttonId: '.setanni', buttonText: { displayText: global.t('infoSetAgeButton', userId, groupId) }, type: 1 },
        { buttonId: '.setgenere maschio', buttonText: { displayText: global.t('infoSetGenderMaleButton', userId, groupId) }, type: 1 },
        { buttonId: '.setgenere femmina', buttonText: { displayText: global.t('infoSetGenderFemaleButton', userId, groupId) }, type: 1 },
        { buttonId: '.setig', buttonText: { displayText: global.t('infoSetIGButton', userId, groupId) }, type: 1 }
      ],
      footer: global.t('infoFooter', userId, groupId),
      viewOnce: true,
      headerType: 4
    }, { quoted: m });

  } catch (error) {
    console.error(error);
  }
};

handler.help = ['info'];
handler.tags = ['group'];
handler.command = /^(info|profilo)$/i;

export default handler;
