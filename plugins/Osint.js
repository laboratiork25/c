import fetch from "node-fetch";

let handler = async (m, { conn, args }) => {
  if (!args[0]) {
    return conn.reply(m.chat, "Sintassi non valida. Utilizzare: .osintweb <dominio o indirizzo IP>", m);
  }

  const target = args[0];

  async function safeFetch(url, type = "text") {
    try {
      const res = await fetch(url, { timeout: 15000 });
      if (!res.ok) return null;
      return type === "json" ? res.json() : res.text();
    } catch {
      return null;
    }
  }

  const rdapDomain = async (d) =>
    await safeFetch(`https://rdap.org/domain/${d}`, "json");

  const rdapIP = async (ip) =>
    await safeFetch(`https://rdap.org/ip/${ip}`, "json");

  const dnsLookup = async (t) =>
    await safeFetch(`https://api.hackertarget.com/dnslookup/?q=${t}`);

  const reverseIP = async (t) =>
    await safeFetch(`https://api.hackertarget.com/reverseiplookup/?q=${t}`);

  const portScan = async (t) =>
    await safeFetch(`https://api.hackertarget.com/nmap/?q=${t}`);

  const httpHeaders = async (t) =>
    await safeFetch(`https://api.hackertarget.com/httpheaders/?q=${t}`);

  const extractEmails = async (t) =>
    await safeFetch(`https://api.hackertarget.com/hostsearch/?q=${t}`);

  const techDetect = async (t) =>
    await safeFetch(`https://api.wappalyzer.com/lookup/v1/?url=${t}`, "json");

  const screenshot = async (t) =>
    `https://image.thum.io/get/fullpage/${t}`;

  let output = "";
  output += "RAPPORTO OSINT AVANZATO\n";
  output += "----------------------------------------\n";
  output += `Target analizzato: ${target}\n`;
  output += "----------------------------------------\n\n";

  const dom = await rdapDomain(target);
  if (dom && !dom.errorCode) {
    output += "INFORMAZIONI RDAP (DOMINIO)\n";
    output += `Dominio: ${dom.ldhName}\n`;
    output += `Registrar: ${dom.registrar}\n`;
    output += `Data di registrazione: ${dom.events?.find(e => e.eventAction === "registration")?.eventDate}\n`;
    output += `Data di scadenza: ${dom.events?.find(e => e.eventAction === "expiration")?.eventDate}\n`;
    output += "Nameserver:\n";
    if (dom.nameservers) {
      dom.nameservers.forEach(ns => {
        output += `- ${ns.ldhName}\n`;
      });
    }
    output += "\n";
  }

  const ip = await rdapIP(target);
  if (ip && !ip.errorCode) {
    output += "INFORMAZIONI IP\n";
    output += `Handle: ${ip.handle}\n`;
    output += `Organizzazione: ${ip.name}\n`;
    output += `Intervallo IP: ${ip.startAddress} - ${ip.endAddress}\n`;
    output += `ASN: ${ip.asn}\n`;
    output += `Paese: ${ip.country}\n`;
    output += "\n";
  }

  const dns = await dnsLookup(target);
  if (dns) {
    output += "RECORD DNS\n";
    output += dns + "\n\n";
  }

  const rev = await reverseIP(target);
  if (rev) {
    output += "DOMINI SULLO STESSO SERVER\n";
    output += rev + "\n\n";
  }

  const ports = await portScan(target);
  if (ports) {
    output += "PORT SCAN\n";
    output += ports + "\n\n";
  }

  const headers = await httpHeaders(target);
  if (headers) {
    output += "INTESTAZIONI HTTP\n";
    output += headers + "\n\n";
  }

  const emails = await extractEmails(target);
  if (emails) {
    output += "POTENZIALI EMAIL/DOMINI CORRELATI\n";
    output += emails + "\n\n";
  }

  const tech = await techDetect(target);
  if (tech && tech[0]?.applications) {
    output += "TECNOLOGIE INDIVIDUATE\n";
    tech[0].applications.forEach(a => {
      output += `- ${a.name}\n`;
    });
    output += "\n";
  }

  output += "SCREENSHOT DEL SITO (URL)\n";
  output += await screenshot(target) + "\n\n";

  output += "----------------------------------------\n";
  output += "Analisi completata.\n";

  await conn.reply(m.chat, output, m);
};

handler.command = ["osintweb", "osintfull"];
handler.help = ["osintweb <dominio/ip>"];
handler.tags = ["osint"];

export default handler;
