import fetch from 'node-fetch'

const thumbnails = [
    'https://th.bing.com/th/id/R.c12f3eda65987b628099939064b0e37f?rik=Fe4MkHpupFFVtQ&pid=ImgRaw&r=0',
    'https://thaka.bing.com/th/id/OIP.TdUK-tKPRaYveQ25cbEXAwHaDt?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
    'https://3.bp.blogspot.com/-hnbKhRSVXdo/VnhsfeE8Q_I/AAAAAAAADgo/i3SipNvsSnI/s1600/631083190687.jpg',
    'https://tse2.mm.bing.net/th/id/OIP.QAGfh7DiQKrNEmYkqTBasgHaFm?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    'https://tse2.mm.bing.net/th/id/OIP.OrjpWG89O5EbSiZ5_qZBUwHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    'https://tse4.mm.bing.net/th/id/OIP.DFqvbD6AhNErh36JRu7lKQHaEy?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    'https://tse3.mm.bing.net/th/id/OIP.TZcZtek5Nzkk0CQSArfXvwHaEw?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    'https://tse4.mm.bing.net/th/id/OIP.OepHu7hzFek7quISCBsxkwHaEH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    'https://tse4.mm.bing.net/th/id/OIP.J8ASKi_mLhLY1C7D8KayEAAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    'https://tse3.mm.bing.net/th/id/OIP.2k1jBe4xqYApxQO7KQHi0gHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    'https://thaka.bing.com/th/id/OIP.6LN7EtF22I8h0IQeh0heNQHaDt?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
    'https://tse3.mm.bing.net/th/id/OIP.EHHltOWfh2nn4Di5_lhi3QHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
  
];

const randomThumbnail = thumbnails[Math.floor(Math.random() * thumbnails.length)];

global.tutorial = {
    contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: "120363391446013555@newsletter",
            serverMessageId: 101,
            newsletterName: "ChatUnity",
        },
        externalAdReply: {
            title: '𝒊𝒔𝒕𝒓𝒖𝒛𝒊𝒐𝒏𝒊 𝒄𝒐𝒎𝒆 𝒖𝒔𝒂𝒓𝒆 𝒊𝒍 𝒄𝒐𝒎𝒂𝒏𝒅𝒐', // non lo so cosa fare, modofica tu il titolo o il body
            body: '𝙥𝙤𝙬𝙚𝙧𝙚𝙙 𝙗𝙮 Chatunity',
            mediaType: 1,
            thumbnailUrl: randomThumbnail,
            renderLargerThumbnail: true
        }
    }
};

global.adReplyPhishy = {
    contextInfo: { 
        forwardingScore: 9999, 
        isForwarded: false, 
        externalAdReply: {
            showAdAttribution: true,
            title: 'ciao',
            body: 'cohones',
            mediaUrl: null,
            description: null,
            previewType: "PHOTO",
            thumbnailUrl: randomThumbnail,
            thumbnail: randomThumbnail,
            sourceUrl: '',
            mediaType: 1,
            renderLargerThumbnail: true
        }
    }
};


export default global.tutorial;
