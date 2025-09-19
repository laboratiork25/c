import axios from 'axios';
import '../lib/language.js';

let soraHandler = async (m, { conn }) => {
  try {
    const rawText = m.message?.conversation?.trim() ||
      m.message?.extendedTextMessage?.text?.trim() ||
      m.message?.imageMessage?.caption?.trim() ||
      m.message?.videoMessage?.caption?.trim() ||
      '';

    const used = (rawText || '').split(/\s+/)[0] || '.sora';
    const args = rawText.slice(used.length).trim();
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const quotedText = quoted?.conversation || quoted?.extendedTextMessage?.text || '';
    const input = args || quotedText;

    if (!input) {
      return m.reply('Provide a prompt. Example: .sora anime girl with short blue hair');
    }

    const apiUrl = `https://okatsu-rolezapiiz.vercel.app/ai/txt2video?text=${encodeURIComponent(input)}`;
    const { data } = await axios.get(apiUrl, { timeout: 60000, headers: { 'user-agent': 'Mozilla/5.0' } });

    const videoUrl = data?.videoUrl || data?.result || data?.data?.videoUrl;
    if (!videoUrl) {
      throw new Error('No videoUrl in API response');
    }

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      mimetype: 'video/mp4',
      caption: `Prompt: ${input}`
    }, { quoted: m });

  } catch (error) {
    console.error('[SORA] error:', error?.message || error);
    await m.reply('Failed to generate video. Try a different prompt later.');
  }
};

soraHandler.help = ['sora']
soraHandler.tags = ['ai']
soraHandler.command = /^\.sora$/i

export default soraHandler;
