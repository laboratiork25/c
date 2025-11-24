import '../lib/language.js';
import axios from "axios";
import FormData from 'form-data';
import fs from 'fs';
import os from 'os';
import path from "path";

let handler = async (m, { conn }) => {
  const userId = m.sender;
  const groupId = m.chat;
  
  try {
    let quotedMsg = m.quoted || m;
    let mimeType = (quotedMsg.msg || quotedMsg).mimetype || '';
    let mediaBuffer;

    if (m.quoted && !mimeType.startsWith('image/')) {
      let who = m.quoted.sender || m.sender;
      try {
        let url = await conn.profilePictureUrl(who, 'image');
        const res = await axios.get(url, { responseType: 'arraybuffer' });
        mediaBuffer = Buffer.from(res.data);
        mimeType = 'image/jpeg';
      } catch (e) {
        return m.reply(global.t('nokiaNoProfilePic', userId, groupId));
      }
    } else if (!m.quoted && !mimeType.startsWith('image/')) {
      try {
        let url = await conn.profilePictureUrl(m.sender, 'image');
        const res = await axios.get(url, { responseType: 'arraybuffer' });
        mediaBuffer = Buffer.from(res.data);
        mimeType = 'image/jpeg';
      } catch (e) {
        return m.reply(global.t('nokiaYourProfilePic', userId, groupId));
      }
    } else {
      mediaBuffer = await quotedMsg.download();
    }

    let extension = mimeType.includes('png') ? '.png' : '.jpg';
    if (!mimeType.includes('jpeg') && !mimeType.includes('png')) {
      return m.reply(global.t('nokiaUnsupportedFormat', userId, groupId));
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

    if (!imageUrl) throw global.t('nokiaUploadError', userId, groupId);

    const apiUrl = `https://api.popcat.xyz/v2/nokia?image=${encodeURIComponent(imageUrl)}`;
    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    if (!response?.data) return m.reply(global.t('nokiaAPIError', userId, groupId));

    await conn.sendMessage(m.chat, {
      image: Buffer.from(response.data, "binary"),
      caption: global.t('nokiaCaption', userId, groupId)
    });

  } catch (error) {
    m.reply(global.t('nokiaError', userId, groupId, { error: error.message || "Unknown error" }));
  }
};

handler.help = ['nokia [@user/image]'];
handler.tags = ['fun'];
handler.command = /^(nokia|nokiaedit)$/i;

export default handler;
