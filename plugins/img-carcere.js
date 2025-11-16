import '../lib/language.js';
import axios from "axios";
import FormData from 'form-data';
import fs from 'fs';
import os from 'os';
import path from "path";

let handler = async (m, { conn, args }) => {
  const userId = m.sender;
  const groupId = m.chat;
  
  try {
    let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;

    let mediaBuffer;
    try {
      let url = await conn.profilePictureUrl(who, 'image');
      const res = await axios.get(url, { responseType: 'arraybuffer' });
      mediaBuffer = Buffer.from(res.data);
    } catch (e) {
      return m.reply(global.t('jailNoProfilePic', userId, groupId));
    }

    const tempFilePath = path.join(os.tmpdir(), `imgscan_${Date.now()}.jpg`);
    fs.writeFileSync(tempFilePath, mediaBuffer);

    const form = new FormData();
    form.append('fileToUpload', fs.createReadStream(tempFilePath), 'image.jpg');
    form.append('reqtype', 'fileupload');

    const uploadResponse = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    const imageUrl = uploadResponse.data;
    fs.unlinkSync(tempFilePath);

    if (!imageUrl) throw global.t('jailUploadError', userId, groupId);

    const apiUrl = `https://api.popcat.xyz/v2/jail?image=${encodeURIComponent(imageUrl)}`;
    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    if (!response?.data) return m.reply(global.t('jailAPIError', userId, groupId));

    await conn.sendMessage(m.chat, {
      image: Buffer.from(response.data, "binary"),
      caption: global.t('jailCaption', userId, groupId)
    });

  } catch (error) {
    m.reply(global.t('jailError', userId, groupId, { error: error.message || "Unknown error" }));
  }
};

handler.help = ['jail [@user]', 'carcere [@user]'];
handler.tags = ['fun'];
handler.command = /^(jail|carcere)$/i;

export default handler;
