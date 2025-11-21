import '../lib/language.js';

let handler = async (m, { conn, isAdmin }) => {
  const userId = m.sender;
  const groupId = m.chat;
  const text = m.text?.toLowerCase();

  if (text === '.skiplogo' || text === '.skipcar') {
    if (!m.isGroup) return m.reply(global.t('logoGroupOnly', userId, groupId));
    if (!global.logoGame?.[m.chat]) return m.reply(global.t('logoNoGame', userId, groupId));
    if (!isAdmin && !m.fromMe) return m.reply(global.t('logoAdminOnly', userId, groupId));
    
    clearTimeout(global.logoGame[m.chat].timeout);
    await conn.reply(m.chat, global.t('logoSkipped', userId, groupId, { 
      answer: global.logoGame[m.chat].risposta 
    }), m);
    delete global.logoGame[m.chat];
    return;
  }

  if (text === '.auto' || text === '.car') {
    if (global.logoGame?.[m.chat]) return m.reply(global.t('logoGameActive', userId, groupId));
    
    global.cooldowns = global.cooldowns || {};
    const now = Date.now(), key = `logo_${m.chat}`;
    if (now - (global.cooldowns[key] || 0) < 10000) {
      return m.reply(global.t('logoCooldown', userId, groupId, { 
        time: Math.ceil((10000 - (now - global.cooldowns[key]))/1000) 
      }));
    }
    global.cooldowns[key] = now;

    const loghi = [
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/audi.png', marca: 'audi' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/bmw.png', marca: 'bmw' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/mercedes-benz.png', marca: 'mercedes-benz' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/porsche.png', marca: 'porsche' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/volkswagen.png', marca: 'volkswagen' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/opel.png', marca: 'opel' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/ford.png', marca: 'ford' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/smart.png', marca: 'smart' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/fiat.png', marca: 'fiat' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/ferrari.png', marca: 'ferrari' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/lamborghini.png', marca: 'lamborghini' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/maserati.png', marca: 'maserati' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/alfa-romeo.png', marca: 'alfa-romeo' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/lancia.png', marca: 'lancia' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/pagani.png', marca: 'pagani' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/bugatti.png', marca: 'bugatti' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/tesla.png', marca: 'tesla' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/honda.png', marca: 'honda' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/toyota.png', marca: 'toyota' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/nissan.png', marca: 'nissan' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/mazda.png', marca: 'mazda' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/chevrolet.png', marca: 'chevrolet' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/volvo.png', marca: 'volvo' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/jeep.png', marca: 'jeep' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/mini.png', marca: 'mini' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/kia.png', marca: 'kia' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/hyundai.png', marca: 'hyundai' },
      { url: 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/thumb/land-rover.png', marca: 'land-rover' },
    ];

    const scelta = loghi[Math.floor(Math.random() * loghi.length)];
    const frasi = [
      global.t('logoPhrase1', userId, groupId),
      global.t('logoPhrase2', userId, groupId),
      global.t('logoPhrase3', userId, groupId),
      global.t('logoPhrase4', userId, groupId),
      global.t('logoPhrase5', userId, groupId)
    ];
    const frase = frasi[Math.floor(Math.random() * frasi.length)];

    global.logoGame = global.logoGame || {};
    global.logoGame[m.chat] = {
      risposta: scelta.marca,
      startTime: Date.now(),
      timeout: setTimeout(() => {
        if (global.logoGame?.[m.chat]) {
          conn.sendMessage(m.chat, {
            text: global.t('logoTimeout', userId, groupId, { answer: scelta.marca }),
            buttons: [
              {
                buttonId: '.auto',
                buttonText: { displayText: global.t('logoButtonPlayAgain', userId, groupId) },
                type: 1
              }
            ],
            footer: 'ChatUnity Bot'
          }, { quoted: m });
          delete global.logoGame[m.chat];
        }
      }, 60000)
    };

    await conn.sendMessage(m.chat, { 
      image: { url: scelta.url }, 
      caption: global.t('logoStart', userId, groupId, { phrase: frase, time: 60 })
    }, { quoted: m });
  }
};

handler.before = async (m, { conn }) => {
  const userId = m.sender;
  const groupId = m.chat;
  const game = global.logoGame?.[m.chat];
  
  if (!game || m.key.fromMe) return;
  
  const text = m.text?.toLowerCase().trim();
  if (!text) return;
  
  if (text === game.risposta) {
    clearTimeout(game.timeout);
    const reward = 100;
    const exp = 10;
    const timeTaken = Math.floor((Date.now() - game.startTime) / 1000);
    const timeBonus = timeTaken <= 10 ? 50 : timeTaken <= 30 ? 20 : 0;
    
    if (!global.db.data.users[m.sender]) global.db.data.users[m.sender] = {};
    global.db.data.users[m.sender].limit = (global.db.data.users[m.sender].limit || 0) + reward + timeBonus;
    global.db.data.users[m.sender].exp = (global.db.data.users[m.sender].exp || 0) + exp;

    await conn.sendMessage(m.chat, { 
      react: { text: '✅', key: m.key }
    });

    await conn.sendMessage(m.chat, {
      text: global.t('logoCorrect', userId, groupId, {
        brand: game.risposta,
        time: timeTaken,
        reward: reward + timeBonus,
        exp,
        bonus: timeBonus
      }),
      buttons: [
        {
          buttonId: '.auto',
          buttonText: { displayText: global.t('logoButtonPlayAgain', userId, groupId) },
          type: 1
        }
      ],
      footer: 'ChatUnity Bot'
    }, { quoted: m });
    
    delete global.logoGame[m.chat];
  }
};

handler.help = ['auto', 'car', 'skiplogo', 'skipcar'];
handler.tags = ['game'];
handler.command = /^(auto|car|skiplogo|skipcar)$/i;

export default handler;
