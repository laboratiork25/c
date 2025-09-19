import '../lib/language.js';

const handler = async (m, { conn, args, usedPrefix }) => {
  const userId = m.sender;
  const groupId = m.isGroup ? m.chat : null;
  
  if (args && args[0]) {
    const botName = args[0].toLowerCase();
    const botInfo = global.t(`botInfo_${botName}`, userId, groupId);
    
    if (botInfo) {
      await conn.sendMessage(
        m.chat,
        {
          text: botInfo,
          footer: global.t('returnToEgemonia', userId, groupId),
          buttons: [
            { buttonId: `${usedPrefix}egemonia`, buttonText: { displayText: global.t('backButton', userId, groupId) }, type: 1 }
          ],
          viewOnce: true,
          headerType: 4
        },
        { quoted: m }
      );
      return;
    }
  }

  const text = global.t('egemoniaMainText', userId, groupId, { usedPrefix });

  await conn.sendMessage(
    m.chat,
    {
      text,
      footer: global.t('egemoniaFooter', userId, groupId),
      buttons: [
        { buttonId: `${usedPrefix}egemonia 333bot`, buttonText: { displayText: global.t('button_333bot', userId, groupId) }, type: 1 },
        { buttonId: `${usedPrefix}egemonia bixbybot`, buttonText: { displayText: global.t('button_bixby', userId, groupId) }, type: 1 },
        { buttonId: `${usedPrefix}egemonia originbot`, buttonText: { displayText: global.t('button_origin', userId, groupId) }, type: 1 },
        { buttonId: `${usedPrefix}egemonia universalbot`, buttonText: { displayText: global.t('button_universal', userId, groupId) }, type: 1 },
        { buttonId: `${usedPrefix}egemonia turbobot`, buttonText: { displayText: global.t('button_turbo', userId, groupId) }, type: 1 },
        { buttonId: `${usedPrefix}egemonia onixbot`, buttonText: { displayText: global.t('button_onix', userId, groupId) }, type: 1 },
        { buttonId: `${usedPrefix}egemonia varebot`, buttonText: { displayText: global.t('button_varebot', userId, groupId) }, type: 1 }
      ],
      viewOnce: true,
      headerType: 4
    },
    { quoted: m }
  );
};

handler.help = ['egemonia'];
handler.tags = ['info'];
handler.command = /^(egemonia|hegemony)$/i;

export default handler;