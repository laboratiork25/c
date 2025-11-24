/* PLUGIN IDEATO DA DIEH*/

import fetch from "node-fetch"
import * as cheerio from "cheerio"

const handler = async (m, { conn, text }) => {
  if (!text)
    return m.reply("🔍 Usa: *.amazon* <ricerca>\nEsempio: *.amazon auricolari bluetooth*")

  try {
    await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } })
    await m.reply("🔎 Sto cercando su Amazon, attendi qualche secondo...")

    const query = encodeURIComponent(text)
    const url = `https://www.amazon.it/s?k=${query}`

    // Headers anti-bot
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        "Accept-Language": "it-IT,it;q=0.9,en;q=0.8",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "DNT": "1",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Site": "none",
        "Referer": "https://www.amazon.it/"
      }
    })

    const html = await res.text()

    // Anti-bot check
    if (html.includes("To discuss automated access to Amazon data")) {
      return m.reply("⚠️ Amazon ha bloccato la richiesta. Riprova tra qualche secondo.")
    }

    const $ = cheerio.load(html)
    const results = []

    // Nuovo selettore 2025
    $("div[data-component-type='s-search-result']").each((i, el) => {
      if (i >= 6) return false

      const title = $(el).find("h2 span.a-text-normal").text().trim()
      const link = $(el).find("h2 a").attr("href")
      const img = $(el).find("img.s-image").attr("src")
      const price = $(el).find(".a-price .a-offscreen").first().text().trim()

      if (title && link) {
        results.push({
          title,
          link: "https://www.amazon.it" + link,
          img: img || "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
          price: price || "💸 Prezzo non disponibile"
        })
      }
    })

    if (results.length === 0) {
      await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
      return m.reply("❌ Nessun risultato trovato su Amazon.")
    }

    const items = results.map((r) => ({
      title: r.title,
      description: `💰 ${r.price}\n📦 Amazon.it`,
      image: { url: r.img },
      buttons: [
        {
          type: "url",
          text: "🔗 Apri su Amazon",
          url: r.link
        }
      ]
    }))

    await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } })
    await conn.sendCarousel(m.chat, `🛒 Risultati Amazon per: *${text}*`, items, m)

  } catch (err) {
    console.error("Errore plugin Amazon:", err)
    await conn.sendMessage(m.chat, { react: { text: "⚠️", key: m.key } })
    m.reply("⚠️ Errore durante la ricerca, riprova più tardi.")
  }
}

handler.help = ["amazon <ricerca>"]
handler.tags = ["internet", "tools"]
handler.command = /^amazon$/i

export default handler