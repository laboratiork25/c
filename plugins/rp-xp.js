// PLUGIN
import '../lib/language.js';
import fs from 'fs/promises';
import path from 'path';
import { createCanvas, loadImage, registerFont } from 'canvas';

const dbPath = path.resolve('./xp-counter.json');
const DEFAULT_AVATAR_URL = 'https://i.ibb.co/BKHtdBNp/default-avatar-profile-icon-1280x1280.jpg';

async function readDB() {
  try {
    return JSON.parse(await fs.readFile(dbPath, 'utf-8'));
  } catch (e) {
    if (e.code === 'ENOENT') {
      await fs.writeFile(dbPath, '{}', 'utf-8');
      return {};
    } else {
      throw e;
    }
  }
}

async function writeDB(db) {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8');
}

let fontsLoaded = false;
async function setupFonts() {
  if (fontsLoaded) return;
  try {
    registerFont('media/fonts/BebasNeue-Regular.ttf', { family: 'Bebas Neue' });
    registerFont('media/fonts/Montserrat-Regular.ttf', { family: 'Montserrat' });
  } catch {}
  fontsLoaded = true;
}

function levelFromXP(xp) {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

function xpRange(level) {
  const min = level === 1 ? 0 : Math.pow(level - 1, 2) * 100;
  const max = Math.pow(level, 2) * 100;
  return { min, max, xpNeeded: max - min };
}

async function createCircularProfilePic(url, size = 100) {
  try {
    const img = await loadImage(url);
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, 0, 0, size, size);
    return canvas;
  } catch {
    return null;
  }
}

async function createXPImage(username, level, xpCurrent, xpNeeded, pfpUrl, groupUrl, userId, groupId) {
  await setupFonts();
  const width = 800;
  const height = 400;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, width, height);

  try {
    const bg = await loadImage(groupUrl);
    const scale = Math.max(width / bg.width, height / bg.height);
    ctx.drawImage(
      bg,
      (width - bg.width * scale) / 2,
      (height - bg.height * scale) / 2,
      bg.width * scale,
      bg.height * scale
    );
  } catch {
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, width, height);
  }

  const margin = 50;
  const cardW = width - 2 * margin;
  const cardH = height - 2 * margin;
  ctx.fillStyle = 'rgba(0,0,0,0.75)';
  ctx.beginPath();
  ctx.roundRect(margin, margin, cardW, cardH, 20);
  ctx.fill();

  const centerY = margin + cardH / 2;
  const pfpCanvas = await createCircularProfilePic(pfpUrl, 100);
  const contentX = margin + 20;
  if (pfpCanvas) ctx.drawImage(pfpCanvas, contentX, centerY - 50);

  ctx.font = 'bold 28px Montserrat';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'left';
  ctx.fillText(username, contentX + 140, centerY - 20);

  const levelText = global.t('xpLevelDisplay', userId, groupId, { level });
  ctx.font = '24px Montserrat';
  ctx.fillText(levelText, contentX + 140, centerY + 20);

  const barX = contentX + 140;
  const barY = centerY + 50;
  const barWidth = cardW - 140 - 30;
  const barHeight = 20;

  if (xpCurrent > 0) {
    ctx.fillStyle = '#555';
    ctx.beginPath();
    ctx.roundRect(barX, barY, barWidth, barHeight, 10);
    ctx.fill();
    const percent = Math.min(xpCurrent / xpNeeded, 1);
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.roundRect(barX, barY, barWidth * percent, barHeight, 10);
    ctx.fill();
    ctx.font = '16px Montserrat';
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    const progressText = global.t('xpProgressDisplay', userId, groupId, { current: xpCurrent, needed: xpNeeded });
    ctx.fillText(progressText, barX + barWidth / 2, barY + barHeight - 4);
  }

  ctx.font = '18px Montserrat';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  const footerText = global.t('xpFooterText', userId, groupId);
  ctx.fillText(footerText, margin + cardW / 2, margin + cardH - 20);

  return canvas.toBuffer('image/png');
}

let handler = async (m, { conn }) => {
  const userId = m.sender;
  const groupId = m.chat;
  const db = await readDB();
  if (!db[userId]) db[userId] = { exp: 0 };
  const user = db[userId];
  user.exp = Number(user.exp) || 0;

  const level = levelFromXP(user.exp);
  const { min, max, xpNeeded } = xpRange(level);
  const xpCurrent = user.exp - min;
  const xpToNext = max - user.exp;

  const userName = await conn.getName(userId);
  const [pfpUrl, groupUrl] = await Promise.all([
    conn.profilePictureUrl(userId).catch(() => DEFAULT_AVATAR_URL),
    conn.profilePictureUrl(groupId).catch(() => DEFAULT_AVATAR_URL),
  ]);

  const xpImage = await createXPImage(userName, level, xpCurrent, xpNeeded, pfpUrl, groupUrl, userId, groupId);

  const caption = global.t('xpCaption', userId, groupId, {
    user: userName,
    level,
    exp: user.exp,
    next: xpToNext,
  });

  const nomeDelBot = conn.user?.name || global.db?.data?.nomedelbot || 'ChatUnity';

  await conn.sendMessage(
    groupId,
    {
      image: xpImage,
      caption,
      mentions: [userId],
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363259442839354@newsletter',
          serverMessageId: '',
          newsletterName: nomeDelBot,
        },
      },
    },
    { quoted: m }
  );

  await writeDB(db);
};

handler.help = ['xp'];
handler.tags = ['rpg'];
handler.command = /^(xp|exp|esperienza|experience|level|lvl)$/i;
handler.register = true;
export default handler;
