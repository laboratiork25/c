import fetch from 'node-fetch'

let matte = "66621409462"
let edy = "40767396892"

let frasiMatte = [
  "Occhio a come parli che sei con mio fratello",
  "Sei un poveraccio, lascia stare Matte",
  "Non toccare Matte o ti trovi il bot nel letto",
  "Matte è il mio fratello, attento come ti muovi",
  "Tocchi Matte e ti tocca il karma",
  "Se tocchi Matte, io ti cancello digitalmente",
  "Rispetta Matte o finisci nel mio log errori",
  "Matte è admin anche nella mia RAM"
]

let frasiInsulti = [
  "Ti scoppio brutto coglione",
  "Mamma tua piange quando ti guarda",
  "Parli come se avessi un cervello",
  "Scusa, hai dimenticato l'intelligenza a casa?",
  "Ti hanno cresciuto col tutorial sbagliato",
  "Fai schifo come le stories dei tuoi amici",
  "Sei inutile come un bottone rotto",
  "Hai la presenza scenica di un bug di sistema"
]

let frasiEdy = [
  "Edy sei la vergogna di WhatsApp",
  "Edy levati dal gruppo",
  "Edy ogni tuo messaggio è un danno",
  "Chi ti legge si pente della vita",
  "Manco i bot ti sopportano Edy",
  "Edy, anche i meme ti ignorano",
  "Edy sei il motivo per cui esiste il silenzioso"
]

let frasiAmorevoli = [
  "Dai Matte, sei il top fratellone ❤️",
  "Ti voglio bene Matte, anche se dici cose strane",
  "Ti rispondo perché sei speciale 😘",
  "Solo per te, rispondo bene",
  "Sei il mio utente preferito, fraté",
  "Matte, sei più potente di una CPU overclockata"
]

let stato = "normal"
let attivo = true

export async function before(m, { conn }) {
  let msg = m.text?.toLowerCase() || ""
  let mittente = m.sender.endsWith("@s.whatsapp.net") ? m.sender.split("@")[0] : m.sender
  let isMatte = mittente === matte

  if (msg.includes("ted calma") && isMatte) {
    attivo = false
    return conn.reply(m.chat, "Va bene fratello, sto zitto...", m)
  }

  if (msg.includes("ted fatti sentire") && isMatte) {
    attivo = true
    return conn.reply(m.chat, "Sto qua brutto coglione, che vuoi?", m)
  }

  if (msg.startsWith(".happy") && isMatte) {
    stato = "happy"
    return conn.reply(m.chat, "🟢 Modalità felice attivata!", m)
  }

  if (msg.startsWith(".normal") && isMatte) {
    stato = "normal"
    return conn.reply(m.chat, "⚪ Modalità normale attivata.", m)
  }

  if (!attivo || m.fromMe) return

  if (m.quoted && m.quoted.fromMe) {
    if (isMatte) {
      return conn.reply(m.chat, frasiAmorevoli[Math.floor(Math.random() * frasiAmorevoli.length)], m)
    }
    return conn.reply(m.chat, "Continua che ti meno", m)
  }

  if (m.mentionedJid?.includes(`${matte}@s.whatsapp.net`) || msg.includes("matte")) {
    return conn.reply(m.chat, frasiMatte[Math.floor(Math.random() * frasiMatte.length)], m)
  }

  if (m.mentionedJid?.includes(`${edy}@s.whatsapp.net`)) {
    return conn.reply(m.chat, frasiEdy[Math.floor(Math.random() * frasiEdy.length)], m)
  }

  if (msg.endsWith("?") || msg.includes("ted")) {
    const risposta = await usaAPI(msg, stato === "happy" || isMatte)
    return conn.reply(m.chat, risposta, m)
  }

  if (!isMatte) {
    return conn.reply(m.chat, frasiInsulti[Math.floor(Math.random() * frasiInsulti.length)], m)
  }
}

// 🔑 Funziona con OpenRouter + GPT (gratuita con chiave generata)
async function usaAPI(text, isHappy) {
  const prompt = isHappy
    ? `Rispondi come se fossi Ted, in modo affettuoso ma diretto. Non esagerare con il romanticismo:\nUtente: ${text}\nTed:`
    : `Rispondi come se fossi Ted incazzato. Sii sarcastico, provocatorio e breve:\nUtente: ${text}\nTed:`

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Sei Ted, un orsacchiotto che risponde in modo tagliente o affettuoso in base all'umore." },
          { role: "user", content: prompt }
        ]
      })
    })

    const data = await res.json()
    return data.choices?.[0]?.message?.content?.trim() || "C'è stato un problema a risponderti Matte 😢"
  } catch {
    return "Errore nel contattare l'AI 😓"
  }
}
