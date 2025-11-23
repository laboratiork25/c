import fetch from 'node-fetch';
import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// GIF per l'azione
const segaGifs = [
  "https://media1.tenor.com/m/azK-UXf7o5cAAAAd/anime-scream.gif",
  "https://th.bing.com/th/id/R.988890387ce04415bf92e1e11a53d9a0?rik=ONR%2fh75kA6e62A&pid=ImgRaw&r=0",
  "https://media.tenor.com/vk28lpzLcr0AAAAM/anime-funny.gif",
  "https://media.tenor.com/aw4-neHTRXQAAAAC/scream-anime.gif",
  "https://tse1.explicit.bing.net/th/id/OIP.jzPQx0osj8OVzKtjv29ldQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
];

// Messaggi ironici completi (tutto in uno) - target verrà sostituito con @menzione
const messaggiCompleti = [
  "💀 HAHAHA! TARGET si è preso una bella sega! 8====👊D💦\n\n😂 Guardatelo com'è finito... non si riprenderà facilmente!",
  "🔥 BOOM! TARGET ha appena ricevuto il trattamento completo! 8====👊D💦\n\n😈 Spero ti sia piaciuto, campione!",
  "😂😂😂 TARGET è stato servito alla grande! 8====👊D💦\n\n💀 Questo momento rimarrà nella storia del gruppo!",
  "🎉 AHAHAH TARGET! Ti è piaciuta? 8====👊D💦\n\n😏 Non dimenticherai mai questo momento...",
  "💦 FINITO! TARGET ha appena vissuto un'esperienza indimenticabile! 8====👊D💦\n\n🤣 Sei ancora lì che tremi?",
  "😈 Ecco fatto! TARGET è stato completamente devastato! 8====👊D💦\n\n💥 Missione compiuta con successo!",
  "🤣🤣 TARGET pensava di essere al sicuro... 8====👊D💦\n\n😵 Sorpresa! Ti ho beccato!",
  "💀 RIP TARGET! Hai ricevuto la sega del secolo! 8====👊D💦\n\n🎭 Applausi per la vittima!",
  "😂 TARGET è stato colpito duramente! 8====👊D💦\n\n🏆 E il premio per la vittima migliore va a...",
  "🔥 HAHAHA TARGET! Non te l'aspettavi eh? 8====👊D💦\n\n😈 Ora sai cosa significa essere servito!"
];

const handler = async (m, { conn }) => {
  if (!m.isGroup) return;

  // Identifica il destinatario
  let destinatario;
  if (m.quoted && m.quoted.sender) {
    destinatario = m.quoted.sender;
  } else if (m.mentionedJid && m.mentionedJid.length > 0) {
    destinatario = m.mentionedJid[0];
  } else {
    return m.reply("⚠️ Devi rispondere a un messaggio o menzionare qualcuno!");
  }

  const nomeDestinatario = `@${destinatario.split('@')[0]}`;

  // Seleziona messaggio random e sostituisci TARGET con la menzione
  const messaggioCompleto = messaggiCompleti[Math.floor(Math.random() * messaggiCompleti.length)].replace(/TARGET/g, nomeDestinatario);

  try {
    // Seleziona e scarica GIF random
    const randomGifUrl = segaGifs[Math.floor(Math.random() * segaGifs.length)];
    
    const response = await fetch(randomGifUrl);
    const buffer = Buffer.from(await response.arrayBuffer());
    const tempGif = `temp_sega_${Date.now()}.gif`;
    const tempMp4 = `temp_sega_${Date.now()}.mp4`;
    
    fs.writeFileSync(tempGif, buffer);

    // Converti GIF in MP4
    await execAsync(`ffmpeg -i ${tempGif} -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${tempMp4}`);

    // Invia UN SOLO messaggio con video e caption
    await conn.sendMessage(m.chat, {
      video: { url: tempMp4 },
      caption: messaggioCompleto,
      mentions: [destinatario],
      gifPlayback: true
    }, { quoted: m });

    // Pulizia file temporanei
    if (fs.existsSync(tempGif)) fs.unlinkSync(tempGif);
    if (fs.existsSync(tempMp4)) fs.unlinkSync(tempMp4);

  } catch (error) {
    console.error("Errore durante l'esecuzione:", error);
    m.reply("⚠️ Si è verificato un errore durante l'esecuzione del comando.");
  }
};

handler.help = ['sega @utente (o rispondi a un messaggio)'];
handler.tags = ['fun'];
handler.command = ['sega', 'jerk'];

export default handler;
