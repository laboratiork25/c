import os from 'os';
import { execSync } from 'child_process';
import '../lib/language.js';

const formatBytes = (bytes, decimali = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimali < 0 ? 0 : decimali;
    const misure = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + misure[i];
};

const getSpazioDisco = () => {
    try {
        const stdout = execSync('df -h | grep -E "^/dev/root|^/dev/sda1"').toString();
        const [ , dimensione, usato, disponibile, percentuale ] = stdout.split(/\s+/);
        return { dimensione, usato, disponibile, percentuale };
    } catch (error) {
        console.error(global.t('diskSpaceError', m.sender, m.isGroup ? m.chat : null));
        return null;
    }
};

const handler = async (m, { conn }) => {
    const userId = m.sender;
    const groupId = m.isGroup ? m.chat : null;
    
    const memoriaTotale = os.totalmem();
    const memoriaLibera = os.freemem();
    const memoriaUsata = memoriaTotale - memoriaLibera;
    const _tempoAttivo = process.uptime() * 1000;
    const tempoAttivo = formatoOrario(_tempoAttivo);
    const nomeHost = os.hostname();
    const piattaforma = os.platform();
    const architettura = os.arch();
    const usoNode = process.memoryUsage();
    const spazioDisco = getSpazioDisco();

    const messaggio = global.t('systemStatusText', userId, groupId, {
        nomeHost,
        piattaforma,
        architettura,
        memoriaTotale: formatBytes(memoriaTotale),
        memoriaLibera: formatBytes(memoriaLibera),
        memoriaUsata: formatBytes(memoriaUsata),
        tempoAttivo,
        rss: formatBytes(usoNode.rss),
        heapTotal: formatBytes(usoNode.heapTotal),
        heapUsed: formatBytes(usoNode.heapUsed),
        external: formatBytes(usoNode.external),
        arrayBuffers: formatBytes(usoNode.arrayBuffers),
        dimensioneDisco: spazioDisco ? spazioDisco.dimensione : global.t('notAvailable', userId, groupId),
        usatoDisco: spazioDisco ? spazioDisco.usato : global.t('notAvailable', userId, groupId),
        disponibileDisco: spazioDisco ? spazioDisco.disponibile : global.t('notAvailable', userId, groupId),
        percentualeDisco: spazioDisco ? spazioDisco.percentuale : global.t('notAvailable', userId, groupId)
    });

    const rcanal = {};
    await conn.reply(m.chat, messaggio.trim(), m, rcanal);
};

handler.help = ['sistema'];
handler.tags = ['info'];
handler.command = ['system', 'sistema', 'status', 'stats'];
handler.register = true;

export default handler;

function formatoOrario(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}