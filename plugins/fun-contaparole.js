import '../lib/language.js';

let handler = async (m, { text }) => {
    const userId = m.sender;
    const groupId = m.chat;
    
    let txt = text || (m.quoted && m.quoted.text);
    
    if (!txt) {
        throw global.t('countNoText', userId, groupId);
    }
    
    const caratterispeciali = /[^\w\d\s]/.test(txt);
    if (caratterispeciali) {
        throw global.t('countSpecialChars', userId, groupId);
    }
    
    const parole = txt.match(/\b\w+\b/g);
    const numeroParole = parole ? parole.length : 0;
    const numeroNumeri = txt.match(/\b\d+\b/g) ? txt.match(/\b\d+\b/g).length : 0;
    
    const numeriSpeciali = ['𝟏', '𝟐', '𝟑', '𝟒', '𝟓', '𝟔', '𝟕', '𝟖', '𝟗'];
    const numeriParole = numeroParole.toString().split('').map(digit => numeriSpeciali[digit]).join('');
    const numeriNumeri = numeroNumeri.toString().split('').map(digit => numeriSpeciali[digit]).join('');
    
    let messaggio = global.t('countResult', userId, groupId, {
        wordCount: numeriParole,
        numberCount: numeriNumeri,
        hasNumbers: numeroNumeri > 0
    });
    
    m.reply(messaggio);
}

handler.command = ['contaparole', 'wordcount'];
handler.help = ['contaparole <testo>'];
handler.tags = ['tools'];
handler.description = 'Conta le parole e i numeri in un testo';

export default handler;