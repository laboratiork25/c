import fetch from 'node-fetch';
import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Lista delle mosse Bankai (con spazi vuoti per i link delle GIF)
const bankaiMoves = {
  "bankai di ichigo": "https://media1.tenor.com/m/fTKfFMOURxQAAAAd/bleach-bleach-anime.gif",
  "bankai di byakuya": "https://th.bing.com/th/id/OIP.y5eU6SpycZn2WWjrJEN0pgHaEK?rs=1&pid=ImgDetMain", // Aggiungi il link della GIF qui
  "bankai di renji": "https://th.bing.com/th/id/OIP.-82sc-Jy7Ws5iz9SgT9oAQHaEK?rs=1&pid=ImgDetMain", // Aggiungi il link della GIF qui
  "bankai di toshiro": "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3o4Z3I0cHg1a2ZwNm52bHd1aGpqMDI4cnRrcHFyYjJnM3Jrb21rdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/14pPFIQ1ToXriM/giphy.gif", // Aggiungi il link della GIF qui
  "bankai di kenpachi": "https://media1.tenor.com/m/4c9Ggdc4ztoAAAAd/kenpachi-zaraki-bankai.gif", // Aggiungi il link della GIF qui
  "bankai di rukia": "https://media1.tenor.com/m/jvwc7_wOHwEAAAAC/sode-shirayuki.gif", // Aggiungi il link della GIF qui
  "bankai di yamamoto": "https://media1.tenor.com/m/XUBpaZaAJ08AAAAC/yamamoto-yamamoto-shigekuni.gif", // Aggiungi il link della GIF qui
  "bankai di aizen": "https://media1.tenor.com/m/KyflVZBY0C8AAAAd/aizen-shikai.gif", // Aggiungi il link della GIF qui
  "niente...solo un urahara in chill": "https://media1.tenor.com/m/D7XdxpdtNSsAAAAd/kisuke.gif", // Aggiungi il link della GIF qui
  "bankai di shunsui": "https://media1.tenor.com/m/5D27zcyB-hIAAAAC/kyoraku-shunsui-bleach.gif", // Aggiungi il link della GIF qui
  "bankai di soi fon": "https://media1.tenor.com/m/kd-bBtrXEjoAAAAC/bankai-bleach.gif", // Aggiungi il link della GIF qui
  "bankai di mayuri": "https://media1.tenor.com/m/aKhshX6fGdAAAAAd/bleach-tybw.gif", // Aggiungi il link della GIF qui
  "bankai di gin": "https://media1.tenor.com/m/z3DjDTFP0xEAAAAC/sawunn.gif", // Aggiungi il link della GIF qui
  "yoruichi thunder": "https://media1.tenor.com/m/KQbZJUO8m9sAAAAd/yoruichi-thunder.gif", // Aggiungi il link della GIF qui
  "bankai di unohana": "https://media1.tenor.com/m/p7gMJraHb6YAAAAC/unohana-unohana-retsu.gif", // Aggiungi il link della GIF qui
  "bankai di hitsugaya": "https://media1.tenor.com/m/ZBxXynOJ1zcAAAAC/hitsugaya-anime.gif", // Aggiungi il link della GIF qui
  "bankai di komamura": "https://media1.tenor.com/m/0rqWg5QVCMIAAAAC/bankai-bleach.gif", // Aggiungi il link della GIF qui
  "bankai di shinji": "https://media1.tenor.com/m/y0qlSP2vJrYAAAAd/hirako-shinji-shinji.gif", // Aggiungi il link della GIF qui
  "bankai di kensei": "https://media1.tenor.com/m/ajtlQvPeDUgAAAAd/bleach-kensei-bankai.gif", // Aggiungi il link della GIF qui
  "shockwave flick di isshin": "https://media1.tenor.com/m/f_5wYbZ7ETMAAAAd/isshin-shockwave-flick.gif", // Aggiungi il link della GIF qui
  "bilancia di jugram": "https://media1.tenor.com/m/rJSrzFc-iFoAAAAd/bleach-thousand-year-blood-war.gif", // Aggiungi il link della GIF qui
};

const handler = async (m, { conn }) => {
  if (!m.isGroup) return;
 
  let user;
  if (m.quoted) {
      
    console.log(m.quoted)
    // Se il messaggio è una risposta, prende l'ID dell'autore del messaggio a cui si risponde
    user = `@${m.quoted.sender.split('@')[0]}`;
  } else if (m.mentionedJid.length) {
    // Se qualcuno è stato taggato, prende il primo taggato
    user = `@${m.mentionedJid[0].split('@')[0]}`;
  } else {
    return m.reply("⚠️ Devi rispondere a un messaggio o menzionare qualcuno!");
  }

  const moves = Object.keys(bankaiMoves);
  const randomMove = moves[Math.floor(Math.random() * moves.length)];
  const gifUrl = bankaiMoves[randomMove];

  if (!gifUrl) {
    return m.reply("⚠️ La GIF per questa mossa non è stata configurata. Aggiungi il link della GIF nel codice.");
  }

  const message = `💥 ${user} ha subito il *${randomMove}*! 💀`;

  try {
    // Scarica la GIF
    const response = await fetch(gifUrl);
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync('temp.gif', buffer);

    // Converti la GIF in MP4 usando ffmpeg
    await execAsync('ffmpeg -i temp.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" temp.mp4');

    // Invia il video come GIF animata
    await conn.sendMessage(m.chat, {
      video: { url: 'temp.mp4' },
      caption: message,
      mentions: [m.quoted ? m.quoted.sender : m.mentionedJid[0]], // Tagga la persona corretta
      gifPlayback: true // Forza WhatsApp a visualizzarlo come GIF
    });

    // Elimina i file temporanei
    fs.unlinkSync('temp.gif');
    fs.unlinkSync('temp.mp4');
  } catch (error) {
    console.error("Errore durante la conversione o l'invio della GIF:", error);
    m.reply("⚠️ Si è verificato un errore durante l'invio della GIF.");
  }
};

handler.help = ['bankai @utente (o rispondi a un messaggio)'];
handler.tags = ['fun'];
handler.command = ['bankai'];

export default handler;