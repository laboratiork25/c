import '../lib/language.js';
const botName = global.t('default_bot_name', m?.sender) || "ChatUnityBot"; // Nome del bot

let handler = async (m, { conn, text }) => {
    // Destinatario finale da taggare
    let destinatario; 

    // Se è una risposta a un messaggio
    if (m.quoted && m.quoted.sender) {
        destinatario = m.quoted.sender;
    } 
    // Se ci sono utenti menzionati
    else if (m.mentionedJid && m.mentionedJid.length > 0) {
        destinatario = m.mentionedJid[0];
    } 
    // Nessun destinatario trovato
    else {
        return m.reply(global.t('rizz_no_target', m.sender));
    }

    let chiHaUsato = `@${m.sender.split('@')[0]}`;
    let chiTaggare = `@${destinatario.split('@')[0]}`;

    m.reply(
        global.t('rizz_message', m.sender, null, {
            piropo: pickRandom(global.piropo),
            sender: chiHaUsato,
            target: chiTaggare
        }),
        null,
        {
            mentions: [destinatario] // Solo il destinatario viene taggato
        }
    );
};

handler.tags = ['fun'];
handler.command = handler.help = /^(rizz|flirt|seduce|pickup)$/i;

export default handler;

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())];
}

global.piropo = [
    global.t('piropo_1', null),
    global.t('piropo_2', null),
    global.t('piropo_3', null),
    global.t('piropo_4', null),
    global.t('piropo_5', null),
    global.t('piropo_6', null),
    global.t('piropo_7', null),
    global.t('piropo_8', null),
    global.t('piropo_9', null),
    global.t('piropo_10', null),
    global.t('piropo_11', null),
    global.t('piropo_12', null),
    global.t('piropo_13', null),
    global.t('piropo_14', null),
    global.t('piropo_15', null),
    global.t('piropo_16', null),
    global.t('piropo_17', null),
    global.t('piropo_18', null),
    global.t('piropo_19', null),
    global.t('piropo_20', null),
    global.t('piropo_21', null),
    global.t('piropo_22', null),
    global.t('piropo_23', null),
    global.t('piropo_24', null),
    global.t('piropo_25', null),
    global.t('piropo_26', null),
    global.t('piropo_27', null),
    global.t('piropo_28', null),
    global.t('piropo_29', null),
    global.t('piropo_30', null),
    global.t('piropo_31', null),
    global.t('piropo_32', null),
    global.t('piropo_33', null),
    global.t('piropo_34', null),
    global.t('piropo_35', null),
    global.t('piropo_36', null),
    global.t('piropo_37', null)
];