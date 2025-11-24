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
    let quotedMsg = m.quoted ? m.quoted : m;
    let mimeType = (quotedMsg.msg || quotedMsg).mimetype || '';

    let mediaBuffer;

    if (m.quoted && (!mimeType || !mimeType.startsWith('image/'))) {
      let who = m.quoted.sender || m.sender;
      try {
        let url = await conn.profilePictureUrl(who, 'image');
        const res = await axios.get(url, { responseType: 'arraybuffer' });
        mediaBuffer = Buffer.from(res.data);
        mimeType = 'image/jpeg';
      } catch (e) {
        return m.reply(global.t('jokeNoProfilePic', userId, groupId));
      }
    }
    else if (!m.quoted && (!mimeType || !mimeType.startsWith('image/'))) {
      let who = m.sender;
      try {
        let url = await conn.profilePictureUrl(who, 'image');
        const res = await axios.get(url, { responseType: 'arraybuffer' });
        mediaBuffer = Buffer.from(res.data);
        mimeType = 'image/jpeg';
      } catch (e) {
        return m.reply(global.t('jokeYourProfilePic', userId, groupId));
      }
    }
    else {
      mediaBuffer = await quotedMsg.download();
    }

    let extension = '';
    if (mimeType.includes('image/jpeg')) extension = '.jpg';
    else if (mimeType.includes('image/png')) extension = '.png';
    else {
      return m.reply(global.t('jokeUnsupportedFormat', userId, groupId));
    }

    const tempFilePath = path.join(os.tmpdir(), `imgscan_${Date.now()}${extension}`);
    fs.writeFileSync(tempFilePath, mediaBuffer);

    const form = new FormData();
    form.append('fileToUpload', fs.createReadStream(tempFilePath), `image${extension}`);
    form.append('reqtype', 'fileupload');

    const uploadResponse = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    const imageUrl = uploadResponse.data;
    fs.unlinkSync(tempFilePath);

    if (!imageUrl) {
      throw global.t('jokeUploadError', userId, groupId);
    }

    const apiUrl = `https://api.popcat.xyz/v2/jokeoverhead?image=${encodeURIComponent(imageUrl)}`;
    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    if (!response || !response.data) {
      return m.reply(global.t('jokeAPIError', userId, groupId));
    }

    const imageBuffer = Buffer.from(response.data, "binary");

    await conn.sendMessage(m.chat, {
      image: imageBuffer,
      caption: global.t('jokeCaption', userId, groupId)
    });

  } catch (error) {
    console.error("Joke Error:", error);
    m.reply(global.t('jokeError', userId, groupId, { error: error.response?.data?.message || error.message || "Unknown error" }));
  }
};

handler.help = ['scherzo [@user/image]', 'joke [@user/image]'];
handler.tags = ['fun'];
handler.command = /^(scherzo|jokedit|joke)$/i;

export default handler;
