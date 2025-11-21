
const thumbnails = [
   'https://i.ibb.co/8LydjBGm/phishy-selfie-popup.jpg',
   'https://i.ibb.co/27fcY5KW/phishy-shiva.jpg',
   'https://i.ibb.co/KcgZzx6t/phishy-super.jpg',
   'https://i.ibb.co/LXvSVnkj/phishy-telefono.jpg',
   'https://i.ibb.co/wrwRt68H/phishy-tokyo-revengers.jpg',
   'https://i.ibb.co/mrJqdppV/phishy-tokyo-revengers2.jpg',
   'https://i.ibb.co/h1Dgryjn/phishy-vestito-rosso.jpg',
   'https://i.ibb.co/d03s1Ywv/phishy-vestito-rosso-fisheye.jpg',
   'https://i.ibb.co/xxtWLkm/pshishy-selfie-fucile.jpg',
   'https://i.ibb.co/nN8mFnQv/Immagine-2025-09-29-143849.jpg',
   'https://i.ibb.co/hFqYHzH1/phishy-gotica2.jpg',
   'https://i.ibb.co/rK1vgwMJ/Phishy-2000-pistola.jpg',
   'https://i.ibb.co/LX37ndnn/phishy-anime.jpg',
   'https://i.ibb.co/KcLYzwYR/phishy-anime2.jpg',
   'https://i.ibb.co/ccjrRQcW/phishy-chainsaw.jpg',
   'https://i.ibb.co/xc2NNhd/phishy-city-ggreen.jpg',
   'https://i.ibb.co/SXyNx6cG/phishy-class.jpg',
   'https://i.ibb.co/gMs9dGJT/phishy-class2.jpg',
   'https://i.ibb.co/mdGq9qV/phishy-class3.jpg',
   'https://i.ibb.co/60yhL8vd/phishy-creepy-cherry.jpg',
   'https://i.ibb.co/PzNBXh2X/phishy-creepy-cherryc-colori.jpg',
   'https://i.ibb.co/mVC3F0ps/phishy-dio-pistola.jpg',
   'https://i.ibb.co/yFFt7h7Z/phishy-emo-tokyo.jpg',
   'https://i.ibb.co/0jvzC50k/phishy-farfalle.jpg',
   'https://i.ibb.co/8DKK90py/phishy-fuma-ps2.jpg',
   'https://i.ibb.co/DfsXt0pc/phishy-fumo.jpg',
   'https://i.ibb.co/MLt2Hkc/phishy-fumo-rosa.jpg',
   'https://i.ibb.co/67zbCfsx/phishy-fumo2.jpg',
   'https://i.ibb.co/0y1mm4s6/phishy-gotica.jpg',
   'https://i.ibb.co/gMv2ZcpV/phishy-gotica3.jpg',
   'https://i.ibb.co/4g39VbT1/phishy-gotica4.jpg',
   'https://i.ibb.co/SXb6fbtT/phishy-gotica5.jpg',
   'https://i.ibb.co/WNyhx0Vg/phishy-grundge.jpg',
   'https://i.ibb.co/HTWQ1vh0/phishy-kill-bill.jpg',
   'https://i.ibb.co/C3bQGLJD/phishy-lago.jpg',
   'https://i.ibb.co/SDvMWcSh/phishy-lantern.jpg',
   'https://i.ibb.co/Lhd51ZXy/phishy-letto-noia.jpg',
   'https://i.ibb.co/Z6mvcJjL/phishy-letto-poligoni.jpg',
   'https://i.ibb.co/3mJr54ph/phishy-letto-sexy.jpg',
   'https://i.ibb.co/k6cTPtCS/phishy-letto-vola.jpg',
   'https://i.ibb.co/DD6scXrd/phishy-letto-vola-giallo.jpg',
   'https://i.ibb.co/Y4BkndWX/phishy-lui.jpg',
   'https://i.ibb.co/wFjzQMTF/phishy-maglietta-bianca-letto.jpg',
   'https://i.ibb.co/KxR6mDNH/phishy-maglietta-bianca-volta-letto.jpg',
   'https://i.ibb.co/fdgK147v/phishy-manga.jpg',
   'https://i.ibb.co/MyBs5hMq/phishy-matrix.jpg',
   'https://i.ibb.co/5hKrnsbZ/phishy-matrix2.jpg',
   'https://i.ibb.co/b5F1WgvR/phishy-matrix3.jpg',
   'https://i.ibb.co/7tP0Zf53/phishy-matrix4.jpg',
   'https://i.ibb.co/pBKsTSkC/phishy-morta.jpg',
   'https://i.ibb.co/bggZ7CxQ/phishy-raven.jpg'
];

const randomThumbnail = thumbnails[Math.floor(Math.random() * thumbnails.length)];

// Inizializzazione GLOBALE (viene eseguita all'avvio)
global.rcanal = {
    contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: "",
            serverMessageId: 100,
            newsletterName: "ChatUnity",
        },
        externalAdReply: {
            title: '[ ⚠ ] 𝐄𝐑𝐑𝐎𝐑𝐄',
            body: 'sei stato inculato',
            thumbnail: fs.readFileSync('./media/principale.jpeg'),
            mediaType: 1,
            renderLargerThumbnail: true
        }
    }, quoted: m
};

global.adReply = {
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

export default global.rcanal;