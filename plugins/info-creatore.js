import pkg from '@realvare/based'
const { generateWAMessageFromContent } = pkg

let handler = async (m, { conn }) => {
  // vCard primo contatto
  let vcard1 = `BEGIN:VCARD
VERSION:3.0
FN: ˙ . ᵗˢᵏ ꒷ . 𝐧𝐞𝐱𝐮𝐬 𖦹˙🪽
ORG: Davide¹
TEL;type=CELL;type=VOICE;waid=393518419909:+39 351 841 9909
END:VCARD`

  // vCard secondo contatto
  let vcard2 = `BEGIN:VCARD
VERSION:3.0
FN: ˙ . ᵗˢᵏ ꒷ . Luca 𖦹˙🪽
ORG: Davide²
TEL;type=CELL;type=VOICE;waid=393793399399:+39 379 339 9399
END:VCARD`

  // primo invio -> entrambi i contatti insieme
  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: "Owners",
      contacts: [
        { vcard: vcard1 },
        { vcard: vcard2 }
      ]
    }
  }, { quoted: m })

  // secondo invio -> messaggio CTA URL con più bottoni
  let msg = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: { title: "I miei social" },
          body: { text: "Puoi cobtattarmi anche qua: 👇" },
          footer: { text: nomebot },
          nativeFlowMessage: {
            buttons: [
              {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                  display_text: "『 💻 』 GitHub",
                  url: "https://github.com/Davjde333",
                  merchant_url: "https://github.com/Davjde333"
                })
              },
              {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                  display_text: "『 📸 』 Instagram",
                  url: "https://instagram.com/dxvjde",
                  merchant_url: "https://instagram.com/dxvjde"
                })
              }
            ]
          }
        }
      }
    }
  }, { userJid: m.sender })

  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['creatore'] 
export default handlerp
