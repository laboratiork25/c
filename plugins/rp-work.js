import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import lavoriDisponibili from '../lib/lavori.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EASTER_EGG_CHANCE = 0.2; // 20% possibilità di trovare una gemma preziosa

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender];

  if (command === 'sceglilavoro' || command === 'chooselob' || command === 'setjob' || command === 'lavoro') {
    let lavoro = args[0]?.toLowerCase();

    if (!lavoro) {
      let lavoriUtente = Object.entries(lavoriDisponibili)
        .filter(([key, det]) => user.level >= det.livello && key !== 'disoccupato')
        .sort((a, b) => a[1].livello - b[1].livello);

      if (lavoriUtente.length === 0) {
        return conn.reply(m.chat, 'Non ci sono lavori disponibili per il tuo livello attuale.', m);
      }

      // CARD ORIGINALE con istruzioni personalizzate in fondo
      try {
        const cards = lavoriUtente.map(([key, det]) => {
          const lavoroImage = path.resolve(__dirname, `../src/img/lavori/${key}.png`);
          const imageBuffer = fs.existsSync(lavoroImage) ? fs.readFileSync(lavoroImage) : Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=', 'base64');

          // Istruzione personalizzata per scegliere il lavoro
          const istruzione = `> ${usedPrefix}setjob ${key}`;

          return {
            image: imageBuffer,
            title: `${det.emoji} ${key.charAt(0).toUpperCase() + key.slice(1)}`,
            body: `Livello: ${det.livello}\nGuadagno: ${det.min}-${det.max} 💰\nCooldown: ${det.cooldown} minuti\n\n${det.descrizione ? det.descrizione + '\n' : ''}*Come scegliere questo lavoro:*\n${istruzione}`,
            // Two action buttons: one to choose the job, one to show job info
            buttons: [
              { buttonId: `${usedPrefix}sceglilavoro ${key}`, buttonText: { displayText: 'Scegli Lavoro' }, type: 1 },
              { buttonId: `${usedPrefix}infolavoro ${key}`, buttonText: { displayText: 'Info Lavoro' }, type: 1 }
            ]
          };
        });

        const cardsMsg = {
          text: `🌟 *𝐂𝐄𝐍𝐓𝐑𝐎 𝐈𝐌𝐏𝐈𝐄𝐆𝐇𝐈* 🌟`,
          title: '',
          subtitle: '',
          footer: '𝙋𝙝𝙮𝙎𝙝𝙮 ᶠᵘᶜᵏʸᵒᵘ🎌',
          cards
        };

        return await conn.sendMessage(m.chat, cardsMsg, { quoted: m }, { ephemeral: true });
      } catch (err) {
        console.error('cardsMsg failed:', err);
      }

      // Fallback 2: send a listMessage which is broadly supported and behaves like a menu/carousel
      try {
        const sections = lavoriUtente.map(([key, det]) => ({
          title: `${det.emoji} ${key.charAt(0).toUpperCase() + key.slice(1)}`,
          rowId: `${usedPrefix}sceglilavoro ${key}`,
          description: `Livello: ${det.livello} | Guadagno: ${det.min}-${det.max} 💰 | Cooldown: ${det.cooldown} minuti`
        }));

        const listMessage = {
          text: '🌟 *𝐂𝐄𝐍𝐓𝐑𝐎 𝐈𝐌𝐏𝐈𝐄𝐆𝐇𝐈* 🌟',
          footer: 'Phishy Bot',
          title: 'Lavori Disponibili',
          sections: [{ title: 'Lavori', rows: sections }]
        };

        return await conn.sendMessage(m.chat, listMessage, { quoted: m });
      } catch (e) {
        console.error('listMessage failed:', e);
      }

      // If everything failed, notify the user
      return conn.reply(m.chat, 'Impossibile inviare il carosello: nessun metodo supportato dal client.', m);
    }

    // Gestione del comando per scegliere un lavoro
    // --- CASA: blocca se l'utente è dentro casa ---
    if (user.casa && user.casa.stato === 'dentro') {
      return conn.reply(m.chat, '🚪 Non puoi lavorare mentre sei dentro casa! Esci prima con *!casa esci*.', m)
    }

    // Initialize job cooldown if not exists
    if (!user.jobCooldown) user.jobCooldown = 0;
    
    // Check if user is trying to change job during cooldown
    if (user.jobCooldown > Date.now() && lavoro && lavoro !== user.lavoro?.toLowerCase()) {
      let remainingTime = Math.ceil((user.jobCooldown - Date.now()) / (1000 * 60));
      return conn.reply(m.chat, 
        `⏳ *𝐂𝐎𝐎𝐋𝐃𝐎𝐖𝐍 𝐀𝐓𝐓𝐈𝐕𝐎!* ⏳\n\n` +
        `hai gia cambiato lavoro di recente!\n` +
        `devi aspettare*${remainingTime} minuti* prima di cambiare lavoro.\n\n` +
        `se vuoi diventare disoccupato scrivi:\n` +
        `${usedPrefix}sceglilavoro disoccupato`,
        m
      );
    }
    
    // Handle unemployed option
    if (lavoro === "disoccupato") {
      if (!user.lavoro) {
        return conn.reply(m.chat, 
          `Sei già disoccupato! ${lavoriDisponibili.disoccupato.emoji}\n` +
          `Scegli un lavoro dalla lista per iniziare a guadagnare.`,
          m
        );
      }
      
      user.lavoro = null;
      if (user.bustapaga) delete user.bustapaga[user.lavoro];
      return conn.reply(m.chat, 
        `Sei ora disoccupato! ${lavoriDisponibili.disoccupato.emoji}\n` +
        `Non guadagnerai più soldi finché non sceglierai un nuovo lavoro.`,
        m
      );
    }
    
    // Find selected job
    const lavoroSelezionato = Object.keys(lavoriDisponibili).find(
      key => key.toLowerCase() === lavoro && key !== "disoccupato"
    );
    
    if (!lavoroSelezionato) {
      return conn.reply(m.chat, 
        `*❌ LAVORO NON TROVATO ❌*\n\nIl lavoro *"${lavoro}"* non esiste.\n` +
        `Scrivi \`${usedPrefix}sceglilavoro\` senza argomenti per vedere la lista completa.`, 
        m
      );
    }
    
    const dettagliLavoro = lavoriDisponibili[lavoroSelezionato];
    
    if (user.level < dettagliLavoro.livello) {
      const progressBar = '▰'.repeat(Math.floor(user.level/10)) + '▱'.repeat(6 - Math.floor(user.level/10));
      return conn.reply(m.chat, 
        `*🔞 𝐑𝐄𝐐𝐔𝐈𝐒𝐈𝐓𝐈 𝐍𝐎𝐍 𝐒𝐎𝐃𝐃𝐈𝐒𝐅𝐀𝐓𝐓𝐈 🔞*\n\n` +
        `𝐏𝐞𝐫 𝐝𝐢𝐯𝐞𝐧𝐭𝐚𝐫𝐞 *${lavoroSelezionato}* ${dettagliLavoro.emoji} 𝐭𝐢 𝐬𝐞𝐫𝐯𝐞:\n` +
        `› 𝐋𝐢𝐯𝐞𝐥𝐥𝐨 ${dettagliLavoro.livello}\n\n` +
        `𝐈𝐥 𝐭𝐮𝐨 𝐥𝐢𝐯𝐞𝐥𝐨 𝐚𝐭𝐭𝐮𝐚𝐥𝐞:\n` +
        `› ${user.level} ${progressBar}\n\n` +
        `𝐂𝐨𝐧𝐭𝐢𝐧𝐮𝐚 𝐚 𝐠𝐢𝐨𝐜𝐚𝐫𝐞 𝐩𝐞𝐫 𝐬𝐚𝐥𝐢𝐫𝐞 𝐝𝐢 𝐥𝐢𝐯𝐞𝐥𝐨!`,
        m
      );
    }
    
    // Set 1-hour cooldown when changing jobs
    user.jobCooldown = Date.now() + (60 * 60 * 1000);
    
    // Initialize pay stub if doesn't exist
    if (!user.bustapaga) user.bustapaga = {};
    if (!user.bustapaga[lavoroSelezionato]) {
      user.bustapaga[lavoroSelezionato] = {
        esperienza: 0,
        bonus: 0
      };
    }
    
    user.lavoro = lavoroSelezionato;
    
    const expAttuale = user.bustapaga[lavoroSelezionato].esperienza;
    const bonusAttuale = user.bustapaga[lavoroSelezionato].bonus;
    
    return conn.reply(m.chat, 
      `*🎉 𝐂𝐎𝐍𝐆𝐑𝐀𝐓𝐔𝐋𝐀𝐙𝐈𝐎𝐍𝐈! 🎉*\n\n` +
      `Ora sei un *${lavoroSelezionato}* ${dettagliLavoro.emoji}!\n\n` +
      `Guadagno base: *${dettagliLavoro.min}-${dettagliLavoro.max} 💰*\n` +
      `Bonus attuale: *+${bonusAttuale}%* (${expAttuale} exp)\n\n` +
      `Cooldown lavoro: *${dettagliLavoro.cooldown} minuti*\n` +
      `Cooldown cambio lavoro: *60 minuti*\n\n` +
      `Usa il comando *${usedPrefix}work* per iniziare a guadagnare!\n` +
      `Più lavori, più il tuo stipendio aumenterà!`,
      m
    );
  }
  
  // Se il comando è 'work' o simile
  if (command === 'work' || command === 'lavora' || command === 'lavoro') {
    const now = Date.now();
 // Controlla se l'utente trova una gemma preziosa
  let easterEggFound = Math.random() < EASTER_EGG_CHANCE;
  let easterEggMessage = '';
  
  if (easterEggFound) {
    user.gemme += 1; // Incrementa il contatore gemme
    easterEggMessage = '\n\n⚠️𝐚𝐭𝐭𝐞𝐧𝐳𝐢𝐨𝐧𝐞 𝐮𝐭𝐞𝐧𝐭𝐞?\n💎 *𝐇𝐚𝐢 𝐭𝐫𝐨𝐯𝐚𝐭𝐨 𝐮𝐧𝐚 𝐠𝐞𝐦𝐦𝐚 𝐩𝐫𝐞𝐳𝐢𝐨𝐬𝐚!* 💎\n𝐎𝐫𝐚 𝐡𝐚𝐢 ' + user.gemme + ' 𝐠𝐞𝐦𝐦𝐞 𝐧𝐞𝐥 𝐭𝐮𝐨 𝐢𝐧𝐯𝐞𝐧𝐭𝐚𝐫𝐢𝐨!';
  }
    // Inizializzazione sicura
    if (!user.limit) user.limit = 0;
    if (!user.gemme) user.gemme = 0;
    if (!user.bustapaga) user.bustapaga = {};
    if (!user.cooldowns) user.cooldowns = {};
    if (!user.ultimoLavoro) user.ultimoLavoro = {};

    // Verifica lavoro selezionato
    if (!user.lavoro || !lavoriDisponibili[user.lavoro]) {
      return conn.reply(m.chat, 
        `*❌ 𝐒𝐄𝐈 𝐃𝐈𝐒𝐎𝐂𝐂𝐔𝐏𝐀𝐓𝐎 ❌*\n\n` +
        `𝐍𝐨𝐧 𝐡𝐚𝐢 𝐚𝐧𝐜𝐨𝐫𝐚 𝐬𝐜𝐞𝐥𝐭𝐨 𝐮𝐧 𝐥𝐚𝐯𝐨𝐫𝐨!\n` +
        `𝐔𝐬𝐚 𝐢𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 *${usedPrefix}sceglilavoro* 𝐩𝐞𝐫 𝐬𝐞𝐥𝐞𝐳𝐢𝐨𝐧𝐚𝐫𝐧𝐞 𝐮𝐧𝐨 𝐝𝐚𝐥𝐥𝐚 𝐥𝐢𝐬𝐭𝐚.`, 
        m, rcanal
      );
    }

    const lavoro = user.lavoro;
    const lavoroInfo = lavoriDisponibili[lavoro];
    const cooldownMs = lavoroInfo.cooldown * 60 * 1000;

    // Controllo cooldown
    if (user.ultimoLavoro[lavoro] && now - user.ultimoLavoro[lavoro] < cooldownMs) {
      const remainingTime = Math.ceil((cooldownMs - (now - user.ultimoLavoro[lavoro])) / 60000);
      return conn.reply(m.chat,
        `*⏳ 𝐂𝐎𝐎𝐋𝐃𝐎𝐖𝐍 𝐈𝐍 𝐂𝐎𝐑𝐒𝐎!* ⏳\n\n` +
        `╓───────────────╖\n` +

        `HAI GIÀ COMPLETATO IL TUO TURNO *${lavoro}* ${lavoroInfo.emoji}!\n` +
        `⏱️ *Aspetta ancora:* \n` +
        `ㅤㅤㅤㅤㅤ ⇩⇩⇩\n` +
        `ㅤㅤㅤ ${Math.ceil(remainingTime)} minuti\n` +
      `╙───────────────╜`,
        m, tutorial
      );
    }

    // Calcolo guadagno con variazione casuale
    const variazione = Math.random() * 0.4 - 0.2; // -20% a +20%
    let guadagnoBase = Math.floor(lavoroInfo.min + (lavoroInfo.max - lavoroInfo.min) * Math.random());
    guadagnoBase = Math.max(1, Math.floor(guadagnoBase * (1 + variazione)));

    // Sistema di esperienza e bonus
    user.bustapaga[lavoro] = user.bustapaga[lavoro] || { esperienza: 0, bonus: 0 };
    const bonusLivello = Math.min(Math.floor(user.bustapaga[lavoro].esperienza / 10), 50); // Max 50% bonus
    const guadagnoTotale = guadagnoBase + Math.floor(guadagnoBase * bonusLivello / 100);

    // Aggiornamento dati
    user.limit += guadagnoTotale;
    user.bustapaga[lavoro].esperienza += 1;
    user.ultimoLavoro[lavoro] = now;

    // Frase casuale con controllo di sicurezza
    const frasiLavoro = lavoroInfo.frasi || [
      `Hai completato il tuo turno come ${lavoro} ${lavoroInfo.emoji}. Guadagni:`
    ];
    const fraseCasuale = frasiLavoro[Math.floor(Math.random() * frasiLavoro.length)];

    // Progresso verso il prossimo bonus
    const progressoBonus = user.bustapaga[lavoro].esperienza % 10;
    const nextBonusIn = 10 - progressoBonus;

    // Messaggio dettagliato
const messaggio = `
*TURNO FINITO*
📌 *Resoconto giornata:*
${fraseCasuale} ${guadagnoTotale} 🪙
╓────────────────────────────╖
▸ *${lavoro} ${lavoroInfo.emoji}*
▸ *Guadagno:* ${guadagnoBase} 🪙${bonusLivello > 0 ? ` +${bonusLivello}% extra = *${guadagnoTotale} 🪙*` : ''}
▸ *Riceverai un bonus tra :* tra ${nextBonusIn} turni
▸ *Cooldown:* ${lavoroInfo.cooldown} minuti da aspettare
╙────────────────────────────╜
${easterEggMessage ? `\n${easterEggMessage}` : ''}
`.trim();
      
      
      
      
      
      
      
    // Invia messaggio con immagine di contesto
    let lavoroImage = null;
    const baseJobImgPath = path.resolve(__dirname, '../src/img/lavori');
    const lavoroImgPath = path.resolve(baseJobImgPath, `${lavoro}.png`);
    if (fs.existsSync(lavoroImgPath)) {
      lavoroImage = fs.readFileSync(lavoroImgPath);
    } else {
      lavoroImage = 'https://th.bing.com/th/id/OIP.6s5AZXgggvqpYQ1XSQERpgHaDt?rs=1&pid=ImgDetMain';
    }
    return conn.sendMessage(m.chat, {
      text: messaggio,
      contextInfo: {
        externalAdReply: {
          title: `🏆 ${lavoro.toUpperCase()} OF THE DAY!`,
          body: `Hai guadagnato ${guadagnoTotale} 💰`,
          thumbnail: Buffer.isBuffer(lavoroImage) ? lavoroImage : undefined,
          thumbnailUrl: !Buffer.isBuffer(lavoroImage) ? lavoroImage : undefined,
          sourceUrl: '',
          mediaType: 1
        }
      }
    }, { quoted: m });
  }
  
  if (command === 'infolavoro') {
    let lavoro = args[0]?.toLowerCase();

    if (!lavoro || !lavoriDisponibili[lavoro]) {
      return conn.reply(m.chat, 'Lavoro non trovato. Usa il comando senza argomenti per vedere la lista.', m);
    }

    const det = lavoriDisponibili[lavoro];
    const infoMessage = `
*📋 Informazioni Lavoro: ${lavoro.charAt(0).toUpperCase() + lavoro.slice(1)}*

` +
      `› Livello richiesto: ${det.livello}\n` +
      `› Guadagno: ${det.min}-${det.max} 💰\n` +
      `› Cooldown: ${det.cooldown} minuti\n` +
      `› Descrizione: ${det.descrizione || 'N/A'}`;

    return conn.reply(m.chat, infoMessage, m);
  }
};

handler.help = ['sceglilavoro [lavoro]', 'infolavoro [lavoro]'];
handler.tags = ['rpg'];
handler.command = ['sceglilavoro', 'chooselob', 'setjob', 'lavoro', 'infolavoro', 'work', 'lavora'];

export default handler;
