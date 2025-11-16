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
        return m.reply(global.t('wantedNoProfilePic', userId, groupId));
      }
    }
    else if (!m.quoted && m.mentionedJid && m.mentionedJid.length > 0) {
      let who = m.mentionedJid[0];
      try {
        let url = await conn.profilePictureUrl(who, 'image');
        const res = await axios.get(url, { responseType: 'arraybuffer' });
        mediaBuffer = Buffer.from(res.data);
        mimeType = 'image/jpeg';
      } catch (e) {
        return m.reply(global.t('wantedNoProfilePicUser', userId, groupId));
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
        return m.reply(global.t('wantedYourProfilePic', userId, groupId));
      }
    }
    else {
      mediaBuffer = await quotedMsg.download();
    }

    let extension = '';
    if (mimeType.includes('image/jpeg')) extension = '.jpg';
    else if (mimeType.includes('image/png')) extension = '.png';
    else {
      return m.reply(global.t('wantedUnsupportedFormat', userId, groupId));
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
      throw global.t('wantedUploadError', userId, groupId);
    }

    const apiUrl = `https://api.popcat.xyz/v2/wanted?image=${encodeURIComponent(imageUrl)}`;
    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    if (!response || !response.data) {
      return m.reply(global.t('wantedAPIError', userId, groupId));
    }

    const imageBuffer = Buffer.from(response.data, "binary");

    await conn.sendMessage(m.chat, {
      image: imageBuffer,
      caption: global.t('wantedCaption', userId, groupId)
    });

  } catch (error) {
    console.error("Wanted Error:", error);
    m.reply(global.t('wantedError', userId, groupId, { error: error.response?.data?.message || error.message || "Unknown error" }));
  }
};

handler.help = ['wanted [@user/image]'];
handler.tags = ['fun'];
handler.command = /^(wanted|wantededit)$/i;

export default handler;
