import fetch from "node-fetch";

let handler = async (m, { conn, args }) => {
  if (!args[0]) return conn.reply(m.chat, "Inserisci un dominio o un IP.\nEsempio: .osintweb chatunity.it", m);

  let target = args[0];
  let text = `🔍 *OSINT Web Scan*\n📁 Target: ${target}\n\n`;

  async function whoisLookup(t) {
    try {
      let r = await fetch(`https://api.hackertarget.com/whois/?q=${t}`);
      return await r.text();
    } catch {
      return "Errore WHOIS";
    }
  }

  async function dnsLookup(t) {
    try {
      let r = await fetch(`https://api.hackertarget.com/dnslookup/?q=${t}`);
      return await r.text();
    } catch {
      return "Errore DNS";
    }
  }

  async function reverseIP(t) {
    try {
      let r = await fetch(`https://api.hackertarget.com/reverseiplookup/?q=${t}`);
      return await r.text();
    } catch {
      return "Errore Reverse IP";
    }
  }

  async function geoIP(t) {
    try {
      let r = await fetch(`http://ip-api.com/json/${t}?fields=66846719`);
      return await r.json();
    } catch {
      return null;
    }
  }

  async function headersCheck(t) {
    try {
      let r = await fetch(`https://${t}`, { method: "GET", redirect: "manual" });
      let h = "";
      r.headers.forEach((v, k) => h += `${k}: ${v}\n`);
      return h;
    } catch {
      return "Impossibile ottenere headers";
    }
  }

  async function techDetect(t) {
    try {
      let r = await fetch(`https://api.wappalyzer.com/lookup/v1/?url=${t}`);
      let js = await r.json();
      if (!js[0]?.applications) return "Nessuna tecnologia rilevata";

      return js[0].applications.map(a => `• ${a.name}`).join("\n");
    } catch {
      return "Errore tecnologie";
    }
  }

  let whois = await whoisLookup(target);
  let dns = await dnsLookup(target);
  let rip = await reverseIP(target);
  let geo = await geoIP(target);
  let head = await headersCheck(target);
  let tech = await techDetect(target);

  text += `🌐 *WHOIS*\n${whois}\n\n`;
  text += `📡 *DNS Records*\n${dns}\n\n`;

  text += `🌍 *GeoIP*\n`;
  if (geo && geo.status === "success") {
    text += `IP: ${geo.query}\nPaese: ${geo.country}\nRegione: ${geo.regionName}\nCittà: ${geo.city}\nISP: ${geo.isp}\nASN: ${geo.as}\n\n`;
  } else {
    text += "Non disponibile\n\n";
  }

  text += `🖥 *Tecnologie del sito*\n${tech}\n\n`;
  text += `📌 *Reverse IP (altri siti sullo stesso server)*\n${rip}\n\n`;
  text += `📁 *HTTP Headers*\n${head}\n\n`;

  await conn.reply(m.chat, text, m);
};

handler.command = ["osintweb"];
handler.help = ["osintweb <dominio/ip>"];
handler.tags = ["osint"];

export default handler;
