import { performance } from 'perf_hooks';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import '../lib/language.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (message, { conn }) => {
    const newsText = `*RILASCIO V7.0*\n\n`
                  + `📅 disponibili dal 22 \n`


    await conn.sendMessage(
        message.chat,
        { text: newsText },
        { quoted: message }
    );
};

handler.help = ['novita'];
handler.tags = ['info'];
handler.command = /^(novita|aggiornamenti|novità)$/i;

export default handler;