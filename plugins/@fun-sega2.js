import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import ffmpegStatic from 'ffmpeg-static';
import { spawn } from 'child_process';

// Fonti MP4 (loop GIF style) affidabili da Tenor/Giphy anziché anteprime statiche
// Usare direttamente endpoints .mp4 per evitare perdita di fotogrammi.
const segaClips = [
  "https://media.giphy.com/media/d0JPBhiwCm6Kk/giphy.mp4",
  "https://media.giphy.com/media/KxhWj5grlueu9ajWXw/giphy.mp4",
  "https://media.giphy.com/media/OcKa0zdwVimJ2/giphy.mp4",
];

// Messaggi ironici completi (tutto in uno) - target verra sostituito con @menzione
const messaggiCompleti = [
  "💀 HAHAHA! TARGET si e preso una bella sega! 8====👊D💦\n\n😂 Guardatelo come finito... non si riprendera facilmente!",
  "🔥 BOOM! TARGET ha appena ricevuto il trattamento completo! 8====👊D💦\n\n😈 Spero ti sia piaciuto, campione!",
  "😂😂😂 TARGET e stato servito alla grande! 8====👊D💦\n\n💀 Questo momento rimarra nella storia del gruppo!",
  "🎉 AHAHAH TARGET! Ti e piaciuta? 8====👊D💦\n\n😏 Non dimenticherai mai questo momento...",
  "💦 FINITO! TARGET ha appena vissuto un'esperienza indimenticabile! 8====👊D💦\n\n🤣 Sei ancora li che tremi?",
  "😈 Ecco fatto! TARGET e stato completamente devastato! 8====👊D💦\n\n💥 Missione compiuta con successo!",
  "🤣🤣 TARGET pensava di essere al sicuro... 8====👊D💦\n\n😵 Sorpresa! Ti ho beccato!",
  "💀 RIP TARGET! Hai ricevuto la sega del secolo! 8====👊D💦\n\n🎭 Applausi per la vittima!",
  "😂 TARGET e stato colpito duramente! 8====👊D💦\n\n🏆 E il premio per la vittima migliore va a...",
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
    // Funzione helper per scaricare con retry su diversi link
    const downloadRandomClip = async () => {
      // Mischia l'array per provare link casuali
      const shuffled = segaClips.sort(() => 0.5 - Math.random());
      
      for (const url of shuffled) {
        try {
          console.log('Fetching MP4 clip:', url);
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const buffer = Buffer.from(await res.arrayBuffer());
          if (buffer.length < 1000) throw new Error("File troppo piccolo");
          return buffer; // Successo
        } catch (e) {
          console.log(`Errore download clip ${url}: ${e.message}, provo il prossimo...`);
          continue;
        }
      }
      throw new Error("Nessuna clip disponibile (tutti i download falliti)");
    };

    // 1. Scarica il video originale (MP4)
    const clipBuf = await downloadRandomClip();
    console.log('Clip size:', clipBuf.length);

    // Salva temporaneo per ffmpeg normalizzazione (durata / compatibilità)
    const inPath = path.join(process.cwd(), 'tmp', `sega_in_${Date.now()}.mp4`);
    const outPath = path.join(process.cwd(), 'tmp', `sega_out_${Date.now()}.mp4`);
    fs.writeFileSync(inPath, clipBuf);

    // Normalizza con ffmpeg per garantire compatibilità gifPlayback (riduce dimensioni / keyframes)
    await new Promise((resolve, reject) => {
      const ff = spawn(ffmpegStatic || 'ffmpeg', [
        '-y',
        '-i', inPath,
        '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2,fps=15',
        '-movflags', 'faststart',
        '-pix_fmt', 'yuv420p',
        '-preset', 'veryfast',
        '-t', '4', // limita a 4s per loop gradevole
        outPath
      ]);
      ff.on('error', reject);
      ff.stderr.on('data', d => {});
      ff.on('close', code => {
        if (code !== 0 || !fs.existsSync(outPath)) return reject(new Error('ffmpeg exit code ' + code));
        resolve();
      });
    });

    const finalBuf = fs.readFileSync(outPath);
    console.log('Normalized clip size:', finalBuf.length);

    await conn.sendMessage(m.chat, {
      video: finalBuf,
      caption: messaggioCompleto,
      gifPlayback: true,
      mentions: [destinatario],
      mimetype: 'video/mp4'
    }, { quoted: m });

    console.log('Animated clip sent successfully');

    // Cleanup
    try { fs.unlinkSync(inPath); } catch {}
    try { fs.unlinkSync(outPath); } catch {}

  } catch (error) {
    console.error("Errore durante l'esecuzione:", error);
    m.reply("⚠️ Si e verificato un errore durante l'esecuzione del comando.");
  }
};

handler.help = ['sega @utente (o rispondi a un messaggio)'];
handler.tags = ['fun'];
handler.command = ['segone', 'jerk'];

export default handler;
