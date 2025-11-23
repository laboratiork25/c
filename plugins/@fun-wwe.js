import fetch from 'node-fetch';
import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const wweMoves = {
  "angolo slam": "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWxzOHUzZW5uZmVqeWYzcmNnNjVwNnczZ281dnJhOHIwbnQ1em41bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fxw59lYDPJy4z9FU1s/giphy.gif",
  "rko in bocca": "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHF0dm1nMXZkeTk3aDlqczU1bW4zdHYwYWF0bW1ka2Y4dXd5YmQzbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26n6Mr1bkvZNAJup2/giphy.gif",
  "rko alla randy orton": "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHF0dm1nMXZkeTk3aDlqczU1bW4zdHYwYWF0bW1ka2Y4dXd5YmQzbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26n6Mr1bkvZNAJup2/giphy.gif",
  "caduta dal ring con spinta": "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDRjY3o3aHNqejZ1YXR6NzJwZTFrdWV6cWx3enNocDhlaDYzZXI1ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d1G6hkAftr7bu8Mw/giphy.gif",
  "sediata sulle spalle": "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXlnNTFuMTNmY3psaGFsZHZ5d2dncGlzYWxsNmdmZHB2anoxN3drZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26n6F6aW2wZtbXCwM/giphy.gif",
  "pugnetto in faccia": "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHc4YWNxdWJ3OGJ4ZzlhY2poYXF0djEyNWJjZGF2dXpuM2V3YnptciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8YsjSXJy3ZslePU0zk/giphy.gif",
  "preparati a soffrire": "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExazJ2dzBvNHNoc2YzbWhiZ3FnMnFtdHphZ3NvdHo5eXl1Y2tycmZ4dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kHxMpITyV49QAOBqY4/giphy.gif",
  "caduta dal ring su altre persone come il bowling": "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzl5cmd0MXB3Z2xrMnR0ZWQ0M3BlcG05NThhYjFpMXIyOXp2NzNwZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RI4LPCRD0jIyXraX7S/giphy.gif",
  "6-1-9": "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2JkMmhiOGg3Z3FjcGJ6YXNvaHFkazk2Z3gxMjhoNnNwaHQ0b3EwZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SiGHMZHmBsE465awIF/giphy.gif",
  "6-1-9 alla rey mysterio": "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzNxdXlmcWs5Y2VjbmlvbnpnYng2bDBkanl4M3Y4eTlhM2Fid3VvdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nwtSklJSe6eUKsVBSN/giphy.gif",
  "table slam": "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnZmejI2N2FmZHNmbWtkYWZ2ZTI2dmZuZTM2bDFkc2k3aTF6YzM0eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/x4aIHgpVdBpZM8aDph/giphy.gif",
  "volo dal ring come un salame": "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmh3aDgwMGxnMnZyaWtpeHIzNHBtc2E0c3ZiZm5zNDY3c25vM2sweCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26gN0cvOYv37mMuCk/giphy.gif",
  "fa un saluto alla camera, ciao mamminaaa": "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbndycGs4bjVsMGt6YWE1a3E3OGFyb2ZnY2I5cXBpNGozZTVncmw0ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4HcKPE9NnqTr9hxca8/giphy.gif",
  "dagli tu un nome a questa mossa.....": "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExODVsNDEwZGs4aXpjYjl4MGIwOGVoczU3b3M0Mm9yMmhub2Q5cnhkdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEhn4uUwwleiWJ7ZC/giphy.gif"
};

const handler = async (m, { conn }) => {
  if (!m.isGroup) return;

  let user;
  if (m.quoted) {
    // Se il messaggio è una risposta, prende l'ID dell'autore del messaggio a cui si risponde
    user = `@${m.quoted.sender.split('@')[0]}`;
  } else if (m.mentionedJid.length) {
    // Se qualcuno è stato taggato, prende il primo taggato
    user = `@${m.mentionedJid[0].split('@')[0]}`;
  } else {
    return m.reply("⚠️ Devi rispondere a un messaggio o menzionare qualcuno!");
  }

  const moves = Object.keys(wweMoves);
  const randomMove = moves[Math.floor(Math.random() * moves.length)];
  const gifUrl = wweMoves[randomMove];

  const message = `💥 ${user} ha subito la mossa *${randomMove}*! 💀`;

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

handler.help = ['wwe @utente (o rispondi a un messaggio)'];
handler.tags = ['fun'];
handler.command = ['wwe'];

export default handler;
