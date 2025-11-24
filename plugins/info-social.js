import { existsSync } from 'fs'
import axios from 'axios'
import '../lib/language.js'

async function handler(message, { conn, usedPrefix }) {
  const userId = message.sender
  const groupId = message.chat
  const nomeDelBot = global.db.data.nomedelbot || 'ChatUnity'

  const requiredFiles = ['./CODE_OF_CONDUCT.md']

  for (const file of requiredFiles) {
    if (!existsSync(file)) {
      return conn.reply(message.chat, global.t('socialNotAvailable', userId, groupId), message)
    }
  }

  try {
    const socialImages = {
      instagram: 'https://i.ibb.co/gM7QPk0p/images-1.jpg',
      tiktok: 'https://i.ibb.co/Mk0GQVwM/images.png',
      youtube: 'https://i.ibb.co/Z6fWNt42/images-1.png',
      discord: 'https://i.ibb.co/4gnQ9VFy/images.jpg',
      telegram: 'https://i.ibb.co/ds5WQD0y/images-2.jpg',
      whatsapp: 'https://i.ibb.co/rG9XPFmJ/iconica-di-whatsapp-3d-113255-84795.jpg'
    }

    const downloadImage = async (url) => {
      const response = await axios.get(url, { responseType: 'arraybuffer' })
      return Buffer.from(response.data, 'binary')
    }

    const [instagramImg, tiktokImg, youtubeImg, discordImg, telegramImg, whatsappImg] = await Promise.all([
      downloadImage(socialImages.instagram),
      downloadImage(socialImages.tiktok),
      downloadImage(socialImages.youtube),
      downloadImage(socialImages.discord),
      downloadImage(socialImages.telegram),
      downloadImage(socialImages.whatsapp)
    ])

    const socialCards = [
      {
                image: whatsappImg,
        title: global.t('socialWhatsappTitle', userId, groupId),
        body: global.t('socialWhatsappBody', userId, groupId),
        footer: global.t('socialCardFooter', userId, groupId),
        buttons: [{
          name: 'cta_url',
          buttonParamsJson: JSON.stringify({
            display_text: global.t('socialWhatsappButton', userId, groupId),
            url: 'https://whatsapp.com/channel/0029VaZVlJZHwXb8naJBQN0J'

          })
        }]
      },
      {
        image: tiktokImg,
        title: global.t('socialTiktokTitle', userId, groupId),
        body: global.t('socialTiktokBody', userId, groupId),
        footer: global.t('socialCardFooter', userId, groupId),
        buttons: [{
          name: 'cta_url',
          buttonParamsJson: JSON.stringify({
            display_text: global.t('socialTiktokButton', userId, groupId),
            url: 'https://tiktok.com/@chatunitycenter'
          })
        }]
      },
      {
        image: youtubeImg,
        title: global.t('socialYoutubeTitle', userId, groupId),
        body: global.t('socialYoutubeBody', userId, groupId),
        footer: global.t('socialCardFooter', userId, groupId),
        buttons: [{
          name: 'cta_url',
          buttonParamsJson: JSON.stringify({
            display_text: global.t('socialYoutubeButton', userId, groupId),
            url: 'https://youtube.com/chatunity'
          })
        }]
      },
      {
        image: discordImg,
        title: global.t('socialDiscordTitle', userId, groupId),
        body: global.t('socialDiscordBody', userId, groupId),
        footer: global.t('socialCardFooter', userId, groupId),
        buttons: [{
          name: 'cta_url',
          buttonParamsJson: JSON.stringify({
            display_text: global.t('socialDiscordButton', userId, groupId),
            url: 'https://discord.gg/FnbV47JK'
          })
        }]
      },
      {
        image: telegramImg,
        title: global.t('socialTelegramTitle', userId, groupId),
        body: global.t('socialTelegramBody', userId, groupId),
        footer: global.t('socialCardFooter', userId, groupId),
        buttons: [{
          name: 'cta_url',
          buttonParamsJson: JSON.stringify({
            display_text: global.t('socialTelegramButton', userId, groupId),
            url: 'https://t.me/ChatUnityTG'
          })
        }]
      },
      {
        image: instagramImg,
        title: global.t('socialInstagramTitle', userId, groupId),
        body: global.t('socialInstagramBody', userId, groupId),
        footer: global.t('socialCardFooter', userId, groupId),
        buttons: [{
          name: 'cta_url',
          buttonParamsJson: JSON.stringify({
            display_text: global.t('socialInstagramButton', userId, groupId),
            url: 'https://instagram.com/chatunity_'
          })
        }]
      }
    ]

    await conn.sendMessage(message.chat, {
      text: global.t('socialMainTitle', userId, groupId),
      title: global.t('socialMainTitle', userId, groupId),
      subtitle: global.t('socialMainSubtitle', userId, groupId),
      footer: global.t('socialMainFooter', userId, groupId),
      cards: socialCards,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363259442839354@newsletter',
          serverMessageId: '',
          newsletterName: `${nomeDelBot}`
        }
      }
    }, { quoted: message })

    await conn.sendMessage(message.chat, {
      text: global.t('socialFollowUpMessage', userId, groupId),
      footer: global.t('socialFollowUpFooter', userId, groupId),
      buttons: [{
        buttonId: usedPrefix + 'menu',
        buttonText: { displayText: global.t('socialMenuButton', userId, groupId) },
        type: 1
      }],
      headerType: 1,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363259442839354@newsletter',
          serverMessageId: '',
          newsletterName: `${nomeDelBot}`
        }
      }
    }, { quoted: message })

  } catch (error) {
    console.error('Errore comando social:', error)
    await conn.reply(message.chat, global.t('socialErrorLoading', userId, groupId), message)
  }
}

handler.help = ['social', 'socials']
handler.tags = ['info']
handler.command = /^(social|socials|socialmedia|redes)$/i

export default handler
