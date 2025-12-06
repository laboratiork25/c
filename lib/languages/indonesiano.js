export default {
  
  // Sistem umum
  smsAvisoMG: () => "⚠️ Perhatian!",
  smsWait: () => "⏳ Memuat...",
  smsError: () => "❌ Terjadi kesalahan",
  smsSuccess: () => "✅ Operasi berhasil diselesaikan",
  smsProcessing: () => "🔄 Sedang diproses...",
  
  // Perintah umum
  smsOnlyGroup: () => "❌ Perintah ini hanya berfungsi di grup!",
  smsOnlyAdmin: () => "❌ Hanya admin yang dapat menggunakan perintah ini!",
  smsOnlyOwner: () => "❌ Hanya pemilik yang dapat menggunakan perintah ini!",
  smsOnlyPremium: () => "💎 Perintah ini hanya tersedia untuk pengguna premium!",
  smsInvalidCommand: () => "❌ Perintah tidak valid",
  smsNoText: () => "❌ Masukkan teks",
  smsNoMedia: () => "❌ Kirim atau balas media",
  
  // AI dan ChatGPT
  aiNoQuery: () => "⚠️ *Masukkan permintaan yang valid untuk ChatGPT!*\n\n📌 Contoh:\n{prefix}{command} Ceritakan lelucon\n{prefix}{command} Sarankan 5 buku fantasy\n{prefix}{command} Kode HTML untuk halaman login",
  aiError: () => "❌ Terjadi kesalahan saat menghasilkan respons. Coba lagi nanti.",
  aiProcessing: () => "🤖 Sedang memproses permintaan Anda...",
  
  // Sistem selamat datang/perpisahan
  welcomeTitle: () => "✧ SELAMAT DATANG! ✧",
  goodbyeTitle: () => "✧ SELAMAT TINGGAL! ✧",
  welcomeDefault: (user, group, members) => `*Selamat datang* @${user} 🎉\n┊ *Grup:* ${group}\n╰► *Anggota:* ${members}`,
  goodbyeDefault: (user, members) => `*Selamat tinggal* @${user} 👋\n┊ Telah meninggalkan grup\n╰► *Anggota tersisa:* ${members}`,
  
  welcomeSetHelp: () => `🎉 *Atur pesan selamat datang*

*Penggunaan:* {command} <pesan>

*Variabel tersedia:*
• @user - Tag pengguna
• $nama - Nama pengguna  
• $grup - Nama grup
• $anggota - Jumlah anggota
• $nomor - Nomor telepon
• $tag - Tag pengguna (alias dari @user)

*Contoh:*
{command} Halo @user! 👋 Selamat datang di $grup! Sekarang kita $anggota anggota! 🎉

*Untuk mengembalikan pesan default:*
{command} reset`,
  
  goodbyeSetHelp: () => `👋 *Atur pesan perpisahan*

*Penggunaan:* {command} <pesan>

*Variabel tersedia:*
• @user - Tag pengguna
• $nama - Nama pengguna  
• $grup - Nama grup
• $anggota - Jumlah anggota
• $nomor - Nomor telepon
• $tag - Tag pengguna (alias dari @user)

*Contoh:*
{command} Selamat tinggal @user! 😢 Kami akan merindukanmu di $grup. Tersisa $anggota anggota.

*Untuk mengembalikan pesan default:*
{command} reset`,
  
  // Sistem peringatan (warn)
  warnMentionUser: () => "❌ Anda harus menyebutkan pengguna atau membalas pesannya.",
  warnBotImmune: () => "🚫 Anda tidak dapat memperingatkan bot.",
  warnUserNotFound: () => "❌ Pengguna tidak ditemukan di database.",
  warnMessage: (params) => `⚠️ 𝐏𝐄𝐑𝐈𝐍𝐆𝐀𝐓𝐀𝐍 {warns}/𝟑 (𝟑 𝐩𝐞𝐫𝐢𝐧𝐠𝐚𝐭𝐚𝐧=𝐛𝐚𝐧)`,
  warnBanMessage: () => "⛔ 𝐏𝐄𝐍𝐆𝐆𝐔𝐍𝐀 𝐃𝐈𝐇𝐀𝐏𝐔𝐒 𝐒𝐄𝐓𝐄𝐋𝐀𝐇 𝟑 𝐏𝐄𝐑𝐈𝐍𝐆𝐀𝐓𝐀𝐍",
  
  menuownerChooseMenu: () => "Pilih menu:",
menuownerMainMenuButton: () => "🏠 Menu Utama",
menuownerAdminMenuButton: () => "🛡️ Menu Admin",
menuownerSecurityMenuButton: () => "🚨 Menu Keamanan",
menuownerGroupMenuButton: () => "👥 Menu Grup",
menuownerAiMenuButton: () => "🤖 Menu AI",
menuownerTitle: () => "𝑴𝑬𝑵𝑼 𝑷𝑬𝑴𝑰𝑳𝑰𝑲",
menuownerVersionLabel: () => "𝑽𝑬𝑹𝑺𝑰",
menuownerCollabLabel: () => "𝐊𝐎𝐋𝐀𝐁𝐎𝐑𝐀𝐒𝐈",
menuownerSupportLabel: () => "𝐃𝐔𝐊𝐔𝐍𝐆𝐀𝐍",
menuownerReservedCommands: () => "𝑷𝑬𝑹𝑰𝑵𝑻𝑨𝑯 𝑹𝑬𝑺𝑬𝑹𝑽𝑬𝑫 𝑼𝑵𝑻𝑼𝑲 𝑷𝑬𝑴𝑰𝑳𝑰𝑲",
menuownerManageCommand: () => "kelola",
menuownerSetGroupsCommand: () => "setgrup",
menuownerAddGroupsCommand: () => "tambahgrup",
menuownerResetGroupsCommand: () => "resetgrup",
menuownerBanUserCommand: () => "blokirpengguna",
menuownerUnbanUserCommand: () => "batalblokirpengguna",
menuownerCleanupCommand: () => "pembersihan",
menuownerGetFileCommand: () => "ambilfile",
menuownerSaveCommand: () => "simpanplugin",
menuownerDpCommand: () => "hapusplugin",
menuownerGetPluginCommand: () => "ambilplugin",
menuownerJoinCommand: () => "gabung",
menuownerOutCommand: () => "keluar",
menuownerPrefixCommand: () => "prefiks",
menuownerResetPrefixCommand: () => "resetprefiks",
menuownerGodModeCommand: () => "godmode",
menuownerResetCommand: () => "reset",
menuownerAddCommand: () => "tambahkan",
menuownerRemoveCommand: () => "hapus",
menuownerEveryGroupCommand: () => "setiapgrup",
menuownerBanChatCommand: () => "blokirchat",
menuownerUnbanChatCommand: () => "batalblokirchat",
menuownerRestartCommand: () => "restart",
menuownerShutdownBotCommand: () => "matikanbot",
menuownerUpdateBotCommand: () => "perbaruibot",
menuownerPluginParam: () => "plugin",
menuownerLinkParam: () => "tautan",
menuownerAutoAdminParam: () => "autoadmin",
menuownerNumMessagesParam: () => "jum. pesan",
menuownerCommandParam: () => "perintah",
menuownerGroupParam: () => "grup",

  // Sistem menu
  mainMenuTitle: () => '𝑴𝑬𝑵𝑼 𝑼𝑻𝑨𝑴𝑨',
  adminMenuTitle: () => '𝑴𝑬𝑵𝑼 𝑨𝑫𝑴𝑰𝑵',
  adminCommands: () => '𝑷𝑬𝑹𝑰𝑵𝑻𝑨𝑯 𝑨𝑫𝑴𝑰𝑵',
  chooseMenu: () => 'Pilih menu:',
  mainMenuButton: () => '🏠 Menu Utama',
  ownerMenuButton: () => '👑 Menu Pemilik',
  securityMenuButton: () => '🚨 Menu Keamanan',
  groupMenuButton: () => '👥 Menu Grup',
  aiMenuButton: () => '🤖 Menu AI',
  promoteCommand: () => 'promosi /jadikanadmin',
  demoteCommand: () => 'turunkan /hapusadmin',
  warnCommands: () => 'peringatan /batalkanperingatan',
  muteCommands: () => 'bisukan /suarakan',
  setDescCommand: () => 'setdeskripsi',
  setScheduleCommand: () => 'setjadwal',
  setNameCommand: () => 'setnama',
  hidetagCommand: () => 'sembunyikantag',
  kickCommand: () => 'tendang /keluarkan',
  adminsCommand: () => 'admin',
  tagallCommand: () => 'tagsemua',
  openCloseCommand: () => 'buka /tutup',
  setWelcomeCommand: () => 'setselamatdatang',
  setByeCommand: () => 'setselamattnggal',
  inactiveCommand: () => 'tidakaktif',
  listNumCommand: () => 'listanomor + prefiks',
  cleanupCommand: () => 'pembersihan + prefiks',
  clearPlayCommand: () => 'hapusputar',
  rulesCommand: () => 'aturan/setaturan',
  quarantineCommand: () => 'karantina',
  dsCommand: () => 'ds',
  listWarnCommand: () => 'daftarperingatan',
  linkCommand: () => 'tautan',
  linkQrCommand: () => 'tautanqr',
  poweredBy: () => 'ᴅɪᴅᴜᴋᴜɴɢ ᴏʟᴇʜ',
  
  // Menu grup
  groupMenuTitle: () => '𝑴𝑬𝑵𝑼 𝐆𝐑𝐔𝐏',
  memberCommands: () => '𝑷𝑬𝑹𝑰𝑵𝑻𝑨𝑯 𝑼𝑵𝑻𝑼𝑲 𝑨𝑵𝑮𝑮𝑶𝑻𝑨',
  musicAudioSection: () => 'MUSIK & AUDIO',
  infoUtilitySection: () => 'INFORMASI & UTILITAS',
  imageEditSection: () => 'GAMBAR & EDIT',
  pokemonSection: () => 'POKEMON',
  gangSystemSection: () => 'SISTEM GANG',
  gamesCasinoSection: () => 'PERMAINAN & KASINO',
  economyRankingSection: () => 'EKONOMI & PERINGKAT',
  socialInteractionSection: () => 'INTERAKSI SOSIAL',
  howMuchSection: () => 'BERAPA BANYAK?',
  personalityTestSection: () => 'TES KEPRIBADIAN',
  songCommand: () => 'lagu',
  audioCommand: () => 'audio',
  videoCommand: () => 'video',
  artistTitleCommand: () => 'artis-judul',
  cityCommand: () => 'kota',
  textCommand: () => 'teks',
  groupCommand: () => 'grup',
  repoCommand: () => 'repositori',
  userCommand: () => 'pengguna',
  topicCommand: () => 'topik',
  checkSiteCommand: () => 'ceksitus',
  photoToStickerCommand: () => 'foto ke stiker',
  stickerToPhotoCommand: () => 'stiker ke foto',
  improveQualityCommand: () => 'tingkatkan kualitas foto',
  photoCommand: () => 'foto',
  hiddenPhotoCommand: () => 'foto tersembunyi',
  memeCommand: () => 'meme',
  fromStickerCommand: () => 'dari stiker',
  blurImageCommand: () => 'buramkan gambar',
  comingSoonCommand: () => 'segera hadir',
  quantityCommand: () => 'kuantitas',
  headsOrTailsCommand: () => 'gambar atau angka',
  mathProblemCommand: () => 'soal matematika',
  rockPaperScissorsCommand: () => 'gunting batu kertas',
  pokemonInfoCommand: () => 'info Pokémon',
  balanceCommand: () => 'saldo',
  topUsersCommand: () => 'pengguna teratas',
  buyUCCommand: () => 'beli UC',
  withdrawUCCommand: () => 'UC dari bank',
  earnXPCommand: () => 'dapatkan XP',
  proposalCommand: () => 'proposal',
  endRelationshipCommand: () => 'akhiri hubungan',
  affinityCommand: () => 'kedekatan',
  charmCommand: () => 'pesona',
  createFightCommand: () => 'buat pertengkaran',
  truthOrDareCommand: () => 'jujur atau tantangan',
  versionLabel: () => '𝑽𝑬𝑹𝑺𝑰',
  supportLabel: () => '𝐃𝐔𝐊𝐔𝐍𝐆𝐀𝐍',
  
  // Menu pemilik
  ownerMenuTitle: () => '𝑴𝑬𝑵𝑼 𝑷𝑬𝑴𝑰𝑳𝑰𝑲',
  ownerReservedCommands: () => '𝑷𝑬𝑹𝑰𝑵𝑻𝑨𝑯 𝑹𝑬𝑺𝑬𝑹𝑽𝑬𝑫 𝑼𝑵𝑻𝑼𝑲 𝑷𝑬𝑴𝑰𝑳𝑰𝑲',
  setNameCommand: () => 'setnamagrup',
  resetNameCommand: () => 'resetnama',
  manageCommand: () => 'kelola',
  setGroupsCommand: () => 'setgrup',
  addGroupsCommand: () => 'tambahgrup',
  resetGroupsCommand: () => 'resetgrup',
  setPpCommand: () => 'setpp',
  banUserCommand: () => 'blokirpengguna',
  unbanUserCommand: () => 'batalblokirpengguna',
  blockUserCommand: () => 'blokirpengguna',
  unblockUserCommand: () => 'batalblokirpengguna',
  getFileCommand: () => 'ambilfile',
  saveCommand: () => 'simpan',
  dpCommand: () => 'hapus',
  getPluginCommand: () => 'ambilplugin',
  joinCommand: () => 'gabung',
  outCommand: () => 'keluar',
  prefixCommand: () => 'prefiks',
  resetPrefixCommand: () => 'resetprefiks',
  godModeCommand: () => 'godmode',
  resetCommand: () => 'reset',
  addCommand: () => 'tambahkan',
  removeCommand: () => 'hapus',
  everyGroupCommand: () => 'setiapgrup',
  banChatCommand: () => 'blokirchat',
  unbanChatCommand: () => 'batalblokirchat',
  restartCommand: () => 'restart',
  shutdownBotCommand: () => 'matikanbot',
  updateBotCommand: () => 'perbaruibot',
  imageParam: () => 'gambar',
  pluginParam: () => 'plugin',
  linkParam: () => 'tautan',
  autoAdminParam: () => 'autoadmin',
  numMessagesParam: () => 'jum. pesan',
  commandParam: () => 'perintah',
  groupParam: () => 'grup',
  
  // Menu AI
  aiMenuTitle: () => '𝑴𝑬𝑵𝑼 𝑨𝑰',
  generalCommands: () => '𝑷𝑬𝑹𝑰𝑵𝑻𝑨𝑯 𝑼𝑴𝑼𝑴',
  iaCommand: () => 'ai',
  alyaCommand: () => 'Alya',
  geminiCommand: () => 'gemini',
  chatgptCommand: () => 'chatgpt',
  deepseekCommand: () => 'deepseek',
  voiceCommand: () => 'suara',
  imageCommand: () => 'gambar',
  image2Command: () => 'gambar2',
  image3Command: () => 'gambar3',
  animalInfoCommand: () => 'infohewan',
  kcalCommand: () => 'kkal',
  summaryCommand: () => 'ringkasan',
  recipeCommand: () => 'resep',
  
  // Menu Keamanan
  securityMenuTitle: () => '𝑴𝑬𝑵𝑼 𝐅𝐔𝐍𝐆𝐒𝐈',
  activateDisable: () => '𝐀𝐊𝐓𝐈𝐅𝐊𝐀𝐍/𝐍𝐎𝐍𝐀𝐊𝐓𝐈𝐅𝐊𝐀𝐍',
  howToUse: () => '𝐂𝐀𝐑𝐀 𝐏𝐄𝐍𝐆𝐆𝐔𝐍𝐀𝐀𝐍',
  activateFunction: () => 'aktifkan [fungsi]',
  disableFunction: () => 'nonaktifkan [fungsi]',

// Plugin Ping/Status
systemStatusTitle: () => "⋆ ★ 🚀 𝑺𝑻𝑨𝑻𝑼𝑺 𝑺𝑰𝑺𝑻𝑬𝑴 🚀 ★ ⋆",
uptime: () => "⌛ *Uptime:*",
ping: () => "⚡ *Ping:*",
cpuLabel: () => "💻 *CPU:*",
cpuUsage: () => "🔋 *Penggunaan:*",
ramLabel: () => "💾 *RAM:*",
freeRam: () => "🟢 *Bebas:*",
version: () => "Versi:",

systemStatus: (params) => `${params?.title || '⋆ ★ 🚀 𝑺𝑻𝑨𝑻𝑼𝑺 𝑺𝑰𝑺𝑻𝑬𝑴 🚀 ★ ⋆'}
╭♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩
୧ ⌛ *Uptime:* ${params?.uptime || 'T/A'}
୧ ⚡ *Ping:* ${params?.ping || 'T/A'} ms
  💻 *CPU:* ${params?.cpuModel || 'Tidak Diketahui'}
  🔋 *Penggunaan:* ${params?.cpuSpeed || 'T/A'} MHz
  💾 *RAM:* ${params?.ramUsed || 'T/A'} / ${params?.ramTotal || 'T/A'}
  🟢 *Bebas:* ${params?.ramFree || 'T/A'}
╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩`,

menuFooter: () => "Pilih menu:",
menuAdmin: () => "🛡️ Menu Admin",
menuOwner: () => "👑 Menu Pemilik",
menuSecurity: () => "🚨 Menu Keamanan",
menuGroup: () => "👥 Menu Grup",
menuAI: () => "🤖 Menu AI",
mainMenuTitle: () => "𝑴𝑬𝑵𝑼 𝑩𝑶𝑻",
staffCommand: () => "staf",
candidatesCommand: () => "kandidat",
installCommand: () => "pasang",
guideCommand: () => "panduan",
channelsCommand: () => "saluran",
systemCommand: () => "sistem",
faqCommand: () => "FAQ",
pingCommand: () => "ping",
reportCommand: () => "laporkan",
suggestCommand: () => "sarankan",
newsCommand: () => "berita",
versionLabel: () => "𝑽𝑬𝑹𝑺𝑰",
usersLabel: () => "𝐏𝐄𝐍𝐆𝐆𝐔𝐍𝐀",
chooseMenu: () => "Pilih menu:",
mainMenuButton: () => "🏠 Menu Utama",
ownerMenuButton: () => "👑 Menu Pemilik",
securityMenuButton: () => "🚨 Menu Keamanan",
groupMenuButton: () => "👥 Menu Grup",
aiMenuButton: () => "🤖 Menu AI",
adminMenuTitle: () => "𝑴𝑬𝑵𝑼 𝑨𝑫𝑴𝑰𝑵",
promoteCommand: () => "p /jadikanadmin",
demoteCommand: () => "r /hapusadmin",
warnCommands: () => "peringatan /batalkanperingatan",
setScheduleCommand: () => "setjadwal",
setNameCommand: () => "setnama",
hidetagCommand: () => "sembunyikantag",
tagallCommand: () => "tagsemua",
kickCommand: () => "tendang /keluarkan",
adminsCommand: () => "admin",
openCloseCommand: () => "buka /tutup",
setWelcomeCommand: () => "setselamatdatang",
setByeCommand: () => "setselamattnggal",
inactiveCommand: () => "tidakaktif",
listNumCommand: () => "listanomor + prefiks",
cleanupCommand: () => "pembersihan + prefiks",
rulesCommand: () => "aturan /setaturan",
listWarnCommand: () => "daftarperingatan",
linkCommand: () => "tautan",
linkQrCommand: () => "tautanqr",
requestsCommand: () => "permintaan",
adminCommands: () => "𝑷𝑬𝑹𝑰𝑵𝑻𝑨𝑯 𝑨𝑫𝑴𝑰𝑵",
poweredBy: () => "ᴅɪᴅᴜᴋᴜɴɢ ᴏʟᴇʜ",
candidatesTitle: () => "🚀 𝐑𝐄𝐊𝐑𝐔𝐓𝐌𝐄𝐍 𝐒𝐓𝐀𝐅 𝐂𝐇𝐀𝐓𝐔𝐍𝐈𝐓𝐘 🚀",
candidatesIntro: () => "Ingin bergabung dengan staf ChatUnity, mendapatkan pengalaman, dan diakui sebagai anggota tim?",
candidatesCall: () => "Ini kesempatanmu! 𝐈𝐬𝐢 𝐟𝐨𝐫𝐦𝐮𝐥𝐢𝐫 (𝐚𝐧𝐨𝐧𝐢𝐦) untuk melamar dan tunjukkan kemampuanmu.",
candidatesWhatAwaits: () => "🔥 𝐀𝐩𝐚 𝐲𝐚𝐧𝐠 𝐦𝐞𝐧𝐚𝐧𝐭𝐢:",
candidatesBenefit1: () => "✨ 𝐏𝐞𝐧𝐠𝐚𝐤𝐮𝐚𝐧 𝐫𝐞𝐬𝐦𝐢 di bot sebagai kolaborator resmi",
candidatesBenefit2: () => "💼 𝐏𝐞𝐧𝐠𝐚𝐥𝐚𝐦𝐚𝐧 𝐩𝐫𝐚𝐤𝐭𝐢𝐬 di dunia bot dan manajemen komunitas",
candidatesBenefit3: () => "🎯 𝐀𝐤𝐬𝐞𝐬 𝐞𝐤𝐬𝐤𝐥𝐮𝐬𝐢𝐟 ke Bot Beta dan fitur pratinjau",
candidatesBenefit4: () => "🤝 𝐊𝐨𝐥𝐚𝐛𝐨𝐫𝐚𝐬𝐢 𝐥𝐚𝐧𝐠𝐬𝐮𝐧𝐠 dengan tim pengembangan ChatUnity",
candidatesCTA: () => "Jangan lewatkan kesempatan unik ini! 𝐋𝐚𝐦𝐚𝐫 𝐬𝐞𝐤𝐚𝐫𝐚𝐧𝐠 dan buktikan kamu memiliki yang dibutuhkan untuk membuat perbedaan!",
candidatesFormLabel: () => "📋 𝐅𝐨𝐫𝐦𝐮𝐥𝐢𝐫 𝐩𝐞𝐥𝐚𝐦𝐚𝐫𝐚𝐧:",

installTitle: () => "⋆ ︵︵ ★ 💬 𝐂𝐇𝐀𝐓𝐔𝐍𝐈𝐓𝐘-𝐁𝐎𝐓 💬 ★ ︵︵ ⋆",
installIntro: () => "Ingin memasang ChatUnity Bot di perangkat Anda?",
installDescription: () => "Ikuti panduan instalasi lengkap yang tersedia di GitHub dengan semua langkah detail untuk Termux, Windows, dan sistem operasi lainnya.",
installGuideLabel: () => "📖 𝐏𝐚𝐧𝐝𝐮𝐚𝐧 𝐋𝐞𝐧𝐠𝐤𝐚𝐩",
installRepoLabel: () => "📂 𝐑𝐞𝐩𝐨𝐬𝐢𝐭𝐨𝐫𝐢 𝐆𝐢𝐭𝐇𝐮𝐛",
installVideoLabel: () => "🎥 𝐕𝐢𝐝𝐞𝐨 𝐓𝐮𝐭𝐨𝐫𝐢𝐚𝐥",
installFeatures: () => "✨ 𝐀𝐩𝐚 𝐲𝐚𝐧𝐠 𝐚𝐤𝐚𝐧 𝐚𝐧𝐝𝐚 𝐭𝐞𝐦𝐮𝐤𝐚𝐧:",
installFeature1: () => "📱 Instalasi lengkap untuk Termux",
installFeature2: () => "💻 Instalasi untuk Windows dan OS lainnya",
installFeature3: () => "🔧 Penyelesaian masalah umum",
installFeature4: () => "📝 Perintah setup otomatis",
installCTA: () => "Kunjungi repositori GitHub untuk memulai instalasi dan temukan semua fitur bot!",
installNeedHelp: () => "Butuh bantuan? Bergabunglah dengan saluran dukungan kami!",

systemTitle: () => "⋆ ︵★ 🖥️ 𝐒𝐓𝐀𝐓𝐔𝐒 𝐒𝐈𝐒𝐓𝐄𝐌 ★︵ ⋆",
systemHost: () => "🚩 *Host*",
systemOS: () => "🏆 *Sistem Operasi*",
systemArch: () => "💫 *Arsitektur*",
systemTotalRAM: () => "🥷 *RAM Total*",
systemFreeRAM: () => "🚀 *RAM Bebas*",
systemUsedRAM: () => "⌛ *RAM Digunakan*",
systemUptime: () => "🕒 *Uptime*",
systemNodeMemory: () => "🪴 *Memori Node.js:*",
systemRSS: () => "RSS",
systemHeapTotal: () => "Heap Total",
systemHeapUsed: () => "Heap Digunakan",
systemExternal: () => "Eksternal",
systemArrayBuffer: () => "ArrayBuffer",
systemDiskSpace: () => "☁️ *Ruang Disk:*",
systemDiskTotal: () => "Total",
systemDiskUsed: () => "Digunakan",
systemDiskAvailable: () => "Tersedia",
systemDiskPercent: () => "Persentase Penggunaan",
systemDiskError: () => "❌ Kesalahan dalam mengambil ruang disk.",

reportNoText: () => "⚠️ Masukkan deskripsi detail tentang masalah yang ingin Anda laporkan.",
reportTooShort: () => "⚠️ Deskripsi terlalu singkat. Berikan setidaknya 10 karakter untuk laporan lengkap.",
reportTooLong: () => "⚠️ Deskripsi melebihi batas maksimum 1000 karakter. Kurangi teks.",
reportTitle: () => "❌️ `L A P O R A N` ❌️",
reportNumber: () => "📱 Nomor",
reportUser: () => "👤 Pengguna",
reportMessage: () => "📝 Pesan",
reportQuote: () => "📎 Kutipan",
reportSuccess: () => "✅ Laporan Anda telah berhasil dikirim ke tim pengembangan.\n\n_⚠️ Perhatian: laporan palsu atau tidak pantas dapat menyebabkan pembatasan penggunaan bot._",
reportChannelTitle: () => "⚠️ LAPORAN BUG ⚠️",
reportChannelBody: () => "Laporan baru diterima",
reportAnonymous: () => "Anonim",
suggestNoText: () => "⚠️ Masukkan usulan perintah Anda.\n\n*Contoh:* .sarankan (nama perintah) (deskripsi fungsi)",
suggestTooShort: () => "⚠️ Deskripsi terlalu singkat. Berikan setidaknya 10 karakter untuk usulan lengkap.",
suggestTooLong: () => "⚠️ Deskripsi melebihi batas maksimum 1000 karakter. Kurangi teks.",
suggestTitle: () => "💡 `U S U L A N` 💡",
suggestNumber: () => "📱 Nomor",
suggestUser: () => "👤 Pengguna",
suggestMessage: () => "📝 Usulan",
suggestQuote: () => "📎 Kutipan",
suggestSuccess: () => "✅ Usulan Anda telah berhasil dikirim ke tim pengembangan.\n\n_⚠️ Perhatian: usulan perintah terlarang atau tidak pantas dapat menyebabkan pembatasan penggunaan bot._",
suggestChannelTitle: () => "💡 USULAN PERINTAH 💡",
suggestChannelBody: () => "Usulan baru diterima",
suggestAnonymous: () => "Anonim",
unwarnNoUser: () => "❌ Anda harus menyebutkan pengguna atau membalas pesannya untuk menghapus peringatan.",
unwarnUserNotFound: () => "❌ Pengguna tidak ditemukan di database.",
unwarnNoWarnings: () => "ℹ️ Pengguna ini tidak memiliki peringatan aktif untuk dihapus.",
unwarnSuccess: (params) => `✅ 𝐏𝐞𝐫𝐢𝐧𝐠𝐚𝐭𝐚𝐧 𝐝𝐢𝐡𝐚𝐩𝐮𝐬\n\n𝐏𝐞𝐫𝐢𝐧𝐠𝐚𝐭𝐚𝐧 𝐭𝐞𝐫𝐬𝐢𝐬𝐚: ${params?.remaining || 0}/3`,
setnameNoText: () => "⚠️ Masukkan nama baru yang ingin Anda berikan ke grup.",
setnameSuccess: () => "✅ 𝐍𝐚𝐦𝐚 𝐠𝐫𝐮𝐩 𝐛𝐞𝐫𝐡𝐚𝐬𝐢𝐥 𝐝𝐢𝐮𝐛𝐚𝐡!",
setnameError: () => "❌ Terjadi kesalahan saat mengubah nama grup. Coba lagi.",
hidetagDefaultMessage: () => "📢 Pesan untuk semua",
hidetagStickerError: () => "❌ Tidak dapat mengunduh stiker. Coba lagi.",
tagallTitle: () => "⋆ ︵︵ ★ 📢 𝐀𝐍𝐆𝐆𝐎𝐓𝐀 𝐆𝐑𝐔𝐏 ★ ︵︵ ⋆",
tagallBot: () => "🤖 BOT",
tagallMessage: () => "📝 Pesan",
tagallEmptyMessage: () => "📢 Perhatian anggota grup!",
tagallMemberCount: (params) => `👥 Total anggota: ${params?.count || 0}`,
adminsCooldown: (params) => `⏳ Anda harus menunggu ${params?.time || 'sebentar'} lagi sebelum dapat memanggil admin lagi.\n\n_Perintah ini memiliki batas penggunaan untuk menghindari penyalahgunaan._`,
adminsTitle: () => "⋆︵★ 🔔 𝐀𝐃𝐌𝐈𝐍𝐈𝐒𝐓𝐑𝐀𝐓𝐎𝐑 ★︵⋆",
adminsMessage: () => "📝 Alasan panggilan",
adminsWarning: () => "⚠️ Perintah ini hanya boleh digunakan untuk masalah mendesak atau situasi penting. Penggunaan tidak pantas dapat menyebabkan pengeluaran dari grup.",
adminsNoMessage: () => "Permintaan bantuan",
adminsNotification: () => "🔔 Administrator telah diberitahu",
adminsExternalTitle: (params) => `${params?.groupName || 'Grup'}`,
adminsExternalBody: () => "Panggilan ke administrator...",
groupOpen: () => "✅ 𝐂𝐡𝐚𝐭 𝐝𝐢𝐛𝐮𝐤𝐚 𝐮𝐧𝐭𝐮𝐤 𝐬𝐞𝐦𝐮𝐚\n\n୧ Semua anggota sekarang dapat mengirim pesan di grup.",
groupClose: () => "🔒 𝐂𝐡𝐚𝐭 𝐡𝐚𝐧𝐲𝐚 𝐮𝐧𝐭𝐮𝐤 𝐚𝐝𝐦𝐢𝐧\n\n୧ Hanya administrator yang dapat mengirim pesan di grup.",
setwelcomeNoText: () => "⚠️ Masukkan pesan selamat datang kustom yang ingin Anda konfigurasi.\n\n*Variabel tersedia:*\n୧ @user - Sebutkan pengguna\n୧ @group - Nama grup\n୧ @desc - Deskripsi grup",
setwelcomeSuccess: () => "✅ 𝐏𝐞𝐬𝐚𝐧 𝐬𝐞𝐥𝐚𝐦𝐚𝐭 𝐝𝐚𝐭𝐚𝐧𝐠 𝐝𝐢𝐤𝐨𝐧𝐟𝐢𝐠𝐮𝐫𝐚𝐬𝐢\n\n୧ Pesan selamat datang telah berhasil diatur untuk grup ini.",
setbyeNoText: () => "⚠️ Masukkan pesan perpisahan kustom yang ingin Anda konfigurasi.\n\n*Variabel tersedia:*\n୧ @user - Sebutkan pengguna\n୧ @group - Nama grup",
setbyeSuccess: () => "✅ 𝐏𝐞𝐬𝐚𝐧 𝐩𝐞𝐫𝐩𝐢𝐬𝐚𝐡𝐚𝐧 𝐝𝐢𝐤𝐨𝐧𝐟𝐢𝐠𝐮𝐫𝐚𝐬𝐢\n\n୧ Pesan perpisahan telah berhasil diatur untuk grup ini.",
inactiveMenuTitle: () => "🌙 Manajemen Anggota Tidak Aktif",
inactiveMenuFound: (params) => `💤 Anggota tidak aktif ditemukan: *${params?.inactive || 0}/${params?.total || 0}*\n\n⏰ Tidak aktif selama lebih dari 7 hari\n\nPilih opsi di bawah:`,
inactiveListTitle: () => "📋 Daftar Anggota Tidak Aktif",
inactiveListNone: () => "✅ Tidak ada anggota tidak aktif ditemukan!\n\n🎉 Semua anggota aktif di grup.",
inactiveListItem: (params) => `${params?.index}. @${params?.user}`,
inactiveRemoveStart: (params) => `⚠️ Penghapusan tidak aktif: Anda akan menghapus *${params?.count}* anggota.\n\n❗ Tindakan ini tidak dapat dibatalkan!\n\nKonfirmasi ingin melanjutkan?`,
inactiveRemoveSuccess: (params) => `✅ Penghapusan selesai!\n\n🗑️ Anggota dihapus: *${params?.removed}*${params?.errors ? `\n⚠️ Kesalahan: *${params.errors}* anggota tidak dihapus` : ''}`,
inactiveRemoveNone: () => "✅ Tidak ada anggota untuk dihapus! Semua anggota grup aktif.",
inactiveConfirmTitle: () => "⚠️ Konfirmasi Penghapusan",
inactiveBackButton: () => "🔄 Kembali ke Menu",
inactiveListButton: () => "📋 Lihat Daftar",
inactiveRemoveButton: () => "🗑️ Hapus Tidak Aktif",
inactiveConfirmButton: () => "✅ Konfirmasi Penghapusan",
inactiveCancelButton: () => "❌ Batalkan",
inactiveNotAdmin: () => "❌ Hanya *admin* yang dapat menggunakan fungsi ini.",
inactiveUnknown: () => "❌ Opsi tidak valid. Gunakan tombol.",
inactiveResultTitle: () => "📊 Hasil penghapusan tidak aktif",
inactiveGroupLabel: () => "👥 Grup",
inactiveFooter: () => "Manajemen grup tidak aktif",
noBotAdmin: () => "⚠️ Saya harus menjadi admin untuk menghapus pengguna",
  noMention: () => "⚠️ Sebutkan atau balas pesan orang yang akan dihapus",
  cannotRemoveOwner: () => "⚠️ Anda tidak dapat menghapus pembuat bot",
  cannotRemoveBot: () => "⚠️ Anda tidak dapat menghapus bot itu sendiri",
  cannotRemoveSelf: () => "⚠️ Anda tidak dapat menghapus diri sendiri",
  targetIsGroupOwner: () => "⚠️ Anda tidak dapat menghapus pembuat grup",
  targetIsAdmin: () => "⚠️ Anda tidak dapat menghapus admin grup",
  kickSuccess: (params) => `╭─────────────────\n│ ✦ @${params?.target} telah dihapus\n│ ✦ oleh @${params?.executor}${params?.reason ? `\n│\n│ 📝 Alasan: ${params.reason}` : ''}\n╰─────────────────`,
  title: () => "⚠️ Pengguna yang Diperingatkan",
totalUsers: (params) => `Total: ${params?.count || 0} pengguna`,
userEntry: (params) => `${params?.index}. ${params?.name || 'Tidak Dikenal'} (${params?.warns}/3)`,
noWarns: () => "✓ Tidak ada pengguna yang menerima peringatan",
unknownUser: () => "Tidak Dikenal",
noBotAdmin: () => "⚠️ Saya harus menjadi admin untuk mengambil tautan grup",
qrCaption: (params) => `╭─────────────────\n│ 🔗 Kode QR grup\n│ *${params?.groupName}*\n│\n│ Pindai untuk bergabung\n╰─────────────────`,
qrError: () => "❌ Kesalahan saat menghasilkan Kode QR",
noBotAdmin: () => "⚠️ Saya harus menjadi admin untuk mengelola permintaan",
noAdmin: () => "⚠️ Hanya admin grup yang dapat menggunakan perintah ini",
noPending: () => "✓ Tidak ada permintaan tertunda",
pendingCount: (params) => `╭─────────────────\n│ 📨 Permintaan tertunda: ${params?.count}\n│\n│ Pilih opsi\n╰─────────────────`,
menuFooter: () => "Manajemen permintaan grup",
buttonAcceptAll: () => "✅ Terima semua",
buttonRejectAll: () => "❌ Tolak semua",
buttonAccept39: () => "🇮🇹 Terima +39",
buttonManage: () => "📥 Kelola permintaan",
acceptedSuccess: (params) => `✅ Diterima ${params?.count} permintaan`,
rejectedSuccess: (params) => `❌ Ditolak ${params?.count} permintaan`,
no39Found: () => "⚠️ Tidak ditemukan permintaan dengan awalan +39",
accepted39Success: (params) => `✅ Diterima ${params?.count} permintaan dengan awalan +39`,
errorAccepting: () => "❌ Kesalahan saat menerima permintaan",
errorRejecting: () => "❌ Kesalahan saat menolak permintaan",
invalidNumber: () => "⚠️ Nomor tidak valid. Gunakan angka lebih besar dari 0",
invalidInput: () => "⚠️ Input tidak valid. Kirim angka atau '39'",
manageCustom: (params) => `╭─────────────────\n│ 📥 Manajemen kustom\n│\n│ Berapa banyak permintaan yang ingin Anda terima?\n│\n│ ✦ Gunakan: .${params?.command} terima <nomor>\n│ ✦ Contoh: .${params?.command} terima 7\n╰─────────────────`,
manageFooter: () => "Manajemen permintaan kustom",
notAvailable: () => "⚠️ Perintah ini hanya tersedia dengan basis ChatUnity",
imageNotFound: () => "⚠️ Kesalahan saat memuat gambar",
mainTitle: () => "🌐 Jaringan Sosial Kami",
mainSubtitle: () => "Ikuti kami di mana saja untuk tetap terupdate",
mainFooter: () => "Didukung oleh ChatUnity",
instagramTitle: () => "📸 Instagram",
instagramBody: () => "Ikuti kami di Instagram untuk foto dan cerita harian!",
instagramButton: () => "Buka Instagram",
tiktokTitle: () => "🎵 TikTok",
tiktokBody: () => "Konten kreatif dan menghibur di TikTok!",
tiktokButton: () => "Buka TikTok",
youtubeTitle: () => "🎬 YouTube",
youtubeBody: () => "Video, tutorial, dan siaran langsung di saluran YouTube kami!",
youtubeButton: () => "Buka YouTube",
discordTitle: () => "💬 Discord",
discordBody: () => "Bergabunglah dengan komunitas kami di Discord!",
discordButton: () => "Buka Discord",
telegramTitle: () => "✈️ Telegram",
telegramBody: () => "Berita dan pembaruan di saluran Telegram!",
telegramButton: () => "Buka Telegram",
whatsappTitle: () => "💚 Saluran WhatsApp",
whatsappBody: () => "Tetap update di saluran WhatsApp resmi kami!",
whatsappButton: () => "Buka Saluran",
cardFooter: () => "Sosial ChatUnity",
followUpMessage: () => "👆 Gulir kartu untuk melihat semua saluran sosial kami!\n\n✦ Ikuti kami untuk tetap terupdate",
followUpFooter: () => "Tim ChatUnity",
menuButton: () => "📋 Kembali ke Menu",
errorLoading: () => "⚠️ Kesalahan saat memuat sosial",


   linkTitle: () => "🔗 TAUTAN GRUP",
   linkFooter: () => "Salin tautan dan bagikan",
    copyButton: () => "📋 Salin Tautan",


  
  pingTitle: () => "⚡ PONG!",
  pingResponse: (params) => `⚡ *Ping:* ${params?.ping || 'T/A'} ms`,
  socialNotAvailable: () => "⚠️ Perintah tidak tersedia saat ini. Coba lagi nanti.",
socialInstagramTitle: () => "📸 Instagram",
socialInstagramBody: () => "Ikuti kami di Instagram untuk konten eksklusif, pembaruan, dan berita bot!",
socialInstagramButton: () => "Ikuti di Instagram",
socialTiktokTitle: () => "🎵 TikTok",
socialTiktokBody: () => "Temukan video kami di TikTok dan tetap update dengan konten paling viral!",
socialTiktokButton: () => "Ikuti di TikTok",
socialYoutubeTitle: () => "📺 YouTube",
socialYoutubeBody: () => "Berlangganan saluran YouTube kami untuk tutorial, panduan, dan pembaruan video!",
socialYoutubeButton: () => "Berlangganan di YouTube",
socialDiscordTitle: () => "💬 Discord",
socialDiscordBody: () => "Bergabunglah dengan komunitas Discord kami untuk dukungan, obrolan, dan banyak lagi!",
socialDiscordButton: () => "Masuk ke Discord",
socialTelegramTitle: () => "✈️ Telegram",
socialTelegramBody: () => "Ikuti kami di Telegram untuk berita instan dan komunikasi langsung!",
socialTelegramButton: () => "Ikuti di Telegram",
socialWhatsappTitle: () => "💚 WhatsApp",
socialWhatsappBody: () => "Berlangganan saluran WhatsApp kami untuk menerima pembaruan resmi!",
socialWhatsappButton: () => "Ikuti di WhatsApp",
socialCardFooter: () => "Sosial ChatUnity",
socialMainTitle: () => "⋆ ︵︵ ★ 🌐 𝐒𝐎𝐒𝐈𝐀𝐋 𝐌𝐄𝐃𝐈𝐀 ★ ︵︵ ⋆",
socialMainSubtitle: () => "Ikuti kami di saluran resmi kami",
socialMainFooter: () => "Tetap terhubung dengan ChatUnity",
socialFollowUpMessage: () => "✨ Terima kasih atas minat Anda!\n\n୧ Ikuti kami di semua saluran sosial kami untuk tidak ketinggalan pembaruan apa pun.",
socialFollowUpFooter: () => "ChatUnity - Selalu terhubung",
socialMenuButton: () => "🏠 Menu Utama",
socialErrorLoading: () => "❌ Terjadi kesalahan saat memuat sosial. Coba lagi nanti.",
listawarnTitle: () => "꒷꒦ ✦ Daftar Pengguna yang Diperingatkan ✦ ꒷꒦",
listawarnMode: () => "Mode",
listawarnGroup: () => "Grup",
listawarnTotal: ({ count }) => `Total: ${count} ${count === 1 ? 'pengguna diperingatkan' : 'pengguna diperingatkan'}`,
listawarnNoWarns: () => "✨ Tidak ada pengguna yang diperingatkan",
listawarnUnknownUser: () => "Pengguna Tidak Dikenal",
listawarnUserNumber: ({ index }) => `${index}.`,
listawarnTag: () => "Tag:",
listawarnGroups: () => "Grup:",
listawarnNoActiveWarns: () => "Tidak ada peringatan aktif",
listawarnErrorRetrieving: () => "Kesalahan dalam pengambilan",
listawarnTotalWarns: ({ count }) => `${count} total`,
listawarnOwnerOnly: () => "❌ Perintah ini hanya dapat digunakan secara pribadi oleh pemilik.",
listawarnAllUsers: () => "Semua pengguna",
kickNoBotAdmin: () => "❌ Bot harus menjadi administrator untuk menghapus pengguna.",
kickNoMention: () => "⚠️ Sebutkan atau kutip pengguna yang akan dihapus dari grup.",
kickCannotRemoveOwner: () => "🛡️ Anda tidak dapat menghapus pembuat bot.",
kickCannotRemoveBot: () => "🤖 Anda tidak dapat menghapus bot dari grup.",
kickCannotRemoveSelf: () => "😅 Anda tidak dapat menghapus diri sendiri dengan perintah ini.",
kickTargetIsGroupOwner: () => "👑 Pengguna yang Anda coba hapus adalah pembuat grup.",
kickTargetIsAdmin: () => "🛡️ Pengguna yang Anda coba hapus adalah administrator.",
kickSuccess: ({ target, executor, reason }) => `꒷꒦ ✦ Pengguna Dihapus ✦ ꒷꒦\n\n┊ 『 👤 』 Pengguna: @${target}\n┊ 『 ⚖️ 』 Dihapus oleh: @${executor}${reason ? `\n┊ 『 📝 』 Alasan: ${reason}` : ''}\n\n╰★────★────★`,
linkgroupNoBotAdmin: () => "❌ Bot harus menjadi administrator untuk mendapatkan tautan grup.",
linkgroupLinkTitle: ({ groupName }) => `꒷꒦ ✦ Tautan Grup ✦ ꒷꒦\n\n┊ 『 📱 』 Grup: ${groupName}\n┊ 『 🔗 』 Klik tombol untuk menyalin tautan`,
linkgroupLinkFooter: () => "Didukung oleh ChatUnity Bot",
linkgroupCopyButton: () => "📋 Salin Tautan",
joinNoLink: ({ prefix, command }) => `⚠️ Masukkan tautan grup.\n\n┊ 『 💡 』 Contoh: ${prefix}${command} <tautan> <hari | inf>`,
joinInvalidLink: () => "❌ Tautan grup tidak valid.",
joinSuccessInfinite: () => "꒷꒦ ✦ Masuk Grup ✦ ꒷꒦\n\n┊ 『 ✅ 』 Saya telah berhasil bergabung dengan grup\n┊ 『 ⏰ 』 Keanggotaan: Tidak Terbatas\n\n╰★────★────★",
joinSuccessExpired: ({ days }) => `꒷꒦ ✦ Masuk Grup ✦ ꒷꒦\n\n┊ 『 ✅ 』 Saya telah berhasil bergabung dengan grup\n┊ 『 ⏰ 』 Keanggotaan: ${days} hari\n\n╰★────★────★`,
banuserNoTarget: () => "⚠️ Silakan tag pengguna, balas pesan, atau tulis nomor telepon.\n\n┊ 『 💡 』 Contoh: @628xxxxxxx",
banuserInvalidNumber: () => "❌ Nomor telepon tidak valid.",
banuserSuccess: ({ target }) => `꒷꒦ ✦ Pengguna Diblokir ✦ ꒷꒦\n\n┊ 『 🚫 』 Pengguna: @${target}\n┊ 『 ⚠️ 』 Pengguna ini telah diblokir dari bot\n┊ 『 📵 』 Tidak akan dapat menggunakan perintah lagi\n\n╰★────★────★`,
unbanuserNoTarget: () => "⚠️ Tag pengguna, balas pesan, atau tulis nomor telepon.\n\n┊ 『 💡 』 Contoh: @628xxxxxxx",
unbanuserInvalidNumber: () => "❌ Nomor telepon tidak valid.",
unbanuserSuccess: ({ target }) => `꒷꒦ ✦ Pengguna Dibuka Blokirnya ✦ ꒷꒦\n\n┊ 『 ✅ 』 Pengguna: @${target}\n┊ 『 🎉 』 Pengguna ini telah dibuka blokirnya\n┊ 『 📱 』 Sekarang dapat menggunakan perintah bot\n\n╰★────★────★`,
listanumNoPrefix: () => "⚠️ Masukkan awalan telepon yang akan dicari.\n\n┊ 『 💡 』 Contoh: .listanum 62",
listanumInvalidPrefix: () => "❌ Awalan harus berupa nomor yang valid.",
listanumTitle: ({ prefix }) => `꒷꒦ ✦ Daftar Nomor +${prefix} ✦ ꒷꒦`,
listanumNoUsers: ({ prefix }) => `꒷꒦ ✦ Tidak Ada Pengguna ✦ ꒷꒦\n\n┊ 『 ℹ️ 』 Tidak ditemukan pengguna dengan awalan +${prefix}\n\n╰★────★────★`,
puliziaStart: ({ prefix }) => `꒷꒦ ✦ Pembersihan Dimulai ✦ ꒷꒦\n\n┊ 『 🔄 』 Menghapus pengguna dengan awalan +${prefix}\n┊ 『 ⏳ 』 Tunggu penyelesaian...\n\n╰★────★────★`,
puliziaNoBotAdmin: () => "❌ Bot harus menjadi administrator untuk menghapus pengguna.",
puliziaNoRestrict: () => "❌ Mode restriktif tidak diaktifkan.",
puliziaUserLeft: ({ user }) => `@${user} telah dihapus`,
getNoInput: () => "⚠️ Penggunaan perintah tidak benar.\n\n╰★─ Contoh Tunggal ─★╮\n┊ getplugin menu-grup skrip\n┊ getfile config.js file\n\n╰★─ Contoh Berganda ─★╮\n┊ getplugin admin & menu & config\n┊ getplugin admin & menu & config skrip\n┊ getplugin admin skrip & menu file\n┊ (maksimal 3 plugin bersamaan)\n\n╰♡꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷",
getNoPluginFound: () => "❌ Tidak ditemukan plugin yang valid dalam permintaan berganda.",
getMultiScriptBtn: () => "📄 Semua Skrip",
getMultiFileBtn: () => "📎 Semua File",
getMultiResult: ({ successCount, total, results }) => `꒷꒦ ✦ Permintaan Berganda ✦ ꒷꒦\n\n┊ 『 📦 』 ${successCount}/${total} plugin ditemukan\n\n${results}\n\n╰★────★────★`,
getFileSelect: ({ filename }) => `꒷꒦ ✦ File Dipilih ✦ ꒷꒦\n\n┊ 『 📁 』 ${filename}\n\n┊ 『 ❓ 』 Apa yang ingin Anda lakukan?\n\n╰★────★────★`,
getScriptBtn: () => "📄 Skrip",
getFileBtn: () => "📎 File",
getNoSimilar: ({ type, name }) => `❌ Tidak ditemukan ${type} serupa dengan "${name}".`,
getFoundConfirm: ({ filename, score }) => `꒷꒦ ✦ Ditemukan ✦ ꒷꒦\n\n┊ 『 ✨ 』 "${filename}"\n┊ 『 📊 』 Akurasi: ${score}%\n\n┊ 『 ❓ 』 Konfirmasi?\n\n╰♡꒷ ๑ Balas: ya/tidak`,
getMultiChoice: ({ name, options }) => `꒷꒦ ✦ Hasil untuk "${name}" ✦ ꒷꒦\n\n${options}\n\n┊ 『 📝 』 Pilih nomor atau "tidak" untuk membatalkan\n\n╰★────★────★`,
getDirNotFound: ({ dir }) => `❌ Direktori ${dir} tidak ditemukan.`,
getFileSuccess: ({ prefix, filename, type }) => `${prefix}꒷꒦ ✦ Berhasil ✦ ꒷꒦\n\n┊ 『 ✅ 』 Inilah ${type}: ${filename}\n\n╰★────★────★`,
getScriptSuccess: ({ prefix, filename, content }) => `${prefix}꒷꒦ ✦ Kode dari ${filename} ✦ ꒷꒦\n\n${content}\n\n╰★────★────★`,
getInvalidOption: () => "❌ Opsi tidak valid! Gunakan \"file\" atau \"skrip\".",
getScriptOnlyJS: () => "❌ Opsi skrip hanya tersedia untuk file JavaScript.",
getSyntaxError: ({ prefix, filename, error }) => `${prefix}꒷꒦ ✦ Kesalahan Sintaks ✦ ꒷꒦\n\n┊ 『 ⛔️ 』 File: ${filename}\n\n${error}\n\n╰★────★────★`,
getFileError: ({ prefix, filename, error }) => `${prefix}❌ Kesalahan: File ${filename} tidak ada atau tidak dapat dibaca.\n\n${error}`,
getProcessError: ({ filename, error }) => `❌ Kesalahan dalam memproses ${filename}: ${error}`,
getOperationCancelled: () => "꒷꒦ ✦ Operasi Dibatalkan ✦ ꒷꒦\n\n┊ 『 ❌ 』 Permintaan berhasil dibatalkan\n\n╰★────★────★",
getGenericError: ({ error }) => `❌ 𝐊𝐞𝐬𝐚𝐥𝐚𝐡𝐚𝐧: ${error}`,
leaveNotAdmin: () => "⚠️ Perintah ini hanya dapat digunakan oleh admin dan pemilik grup.",
leaveMessage: () => "꒷꒦ ✦ Selamat Tinggal ✦ ꒷꒦\n\n┊ 『 👋 』 Bot sedang meninggalkan grup\n\n╰★────★────★",
leaveError: () => "❌ Terjadi kesalahan saat keluar dari grup.",
saveNoName: () => "⚠️ Tentukan nama plugin yang akan disimpan.",
saveNoQuoted: () => "⚠️ Harus membalas pesan yang berisi kode plugin.",
saveSaveSuccess: ({ path }) => `꒷꒦ ✦ Plugin Disimpan ✦ ꒷꒦\n\n┊ 『 ✅ 』 File berhasil dibuat\n┊ 『 📁 』 Jalur: ${path}\n\n╰★────★────★`,
saveErrorWrite: ({ error }) => `❌ Kesalahan saat menyimpan plugin.\n\n${error}`,
deleteNoPlugins: () => "⚠️ Tidak ada plugin yang tersedia untuk dihapus.",
deleteHelp: ({ usedPrefix, pluginList, total }) => `꒷꒦ ✦ Manajer Hapus Plugin ✦ ꒷꒦\n\n┊ 『 📌 』 Penggunaan perintah:\n┊ ${usedPrefix}deleteplugin <nama>\n\n┊ 『 ✨ 』 Contoh:\n┊ ${usedPrefix}deleteplugin menu-official\n\n┊ 『 📋 』 Plugin tersedia:\n${pluginList}${total > 15 ? `\n┊ ... dan ${total - 15} plugin lainnya` : ''}\n\n╰★────★────★`,
deleteInvalidNumber: ({ max }) => `❌ Nomor tidak valid! Rentang: 1-${max}`,
deleteNoSimilar: ({ input }) => `❌ Tidak ditemukan plugin serupa dengan "${input}".`,
deleteConfirm: ({ filename, score }) => `꒷꒦ ✦ Plugin Ditemukan ✦ ꒷꒦\n\n┊ 『 ✨ 』 "${filename}"\n┊ 『 📊 』 Kecocokan: ${score}%\n\n┊ 『 🗑️ 』 Ingin menghapusnya?\n\n╰♡꒷ ๑ Balas: ya/tidak`,
deleteMultiChoice: ({ input, options }) => `꒷꒦ ✦ Hasil untuk "${input}" ✦ ꒷꒦\n\n${options}\n\n┊ 『 📝 』 Pilih nomor atau "tidak" untuk membatalkan\n\n╰★────★────★`,
deleteNotFound: ({ path }) => `꒷꒦ ✦ Perhatian ✦ ꒷꒦\n\n┊ 『 📁 』 File tidak ditemukan di sistem file\n\n┊ 『 🔍 』 Jalur yang dicari:\n┊ ${path}\n\n╰★────★────★`,
deleteSuccess: ({ pluginName, sender, time }) => `꒷꒦ ✦ Plugin Dihapus ✦ ꒷꒦\n\n┊ 『 🗑️ 』 Plugin berhasil dihapus\n\n┊ 『 📝 』 Nama: ${pluginName}.js\n┊ 『 👤 』 Dihapus oleh: @${sender}\n┊ 『 🕐 』 Waktu: ${time}\n\n┊ 『 ⚠️ 』 Catatan: Bot mungkin memerlukan\n┊ restart untuk menerapkan perubahan\n\n╰★────★────★\n\n🎯 Operasi selesai!`,
deleteError: ({ error }) => `꒷꒦ ✦ Kesalahan Sistem ✦ ꒷꒦\n\n┊ 『 ❌ 』 Tidak dapat menghapus plugin\n\n┊ 『 🔍 』 Detail kesalahan:\n┊ ${error}\n\n┊ 『 💡 』 Solusi yang mungkin:\n┊ -  Periksa izin file\n┊ -  Pastikan plugin tidak sedang digunakan\n┊ -  Coba lagi dalam beberapa detik\n\n╰★────★────★`,
deleteOperationCancelled: () => "꒷꒦ ✦ Operasi Dibatalkan ✦ ꒷꒦\n\n┊ 『 ❌ 』 Penghapusan dibatalkan\n\n╰★────★────★",
deleteGenericError: ({ error }) => `❌ Kesalahan: ${error}`,
broadcastNoOwner: () => "❌ Hanya pemilik yang dapat menggunakan perintah ini!",
broadcastNoGroups: () => "❌ Bot tidak berada di grup mana pun!",
broadcastHeader: () => "꒷꒦ ✦ Pesan dari ChatUnity ✦ ꒷꒦",
broadcastIntro: () => "┊ 『 👑 』 Para anggota grup yang terhormat, telah datang pesan baru dari pemilik:",
broadcastLabel: () => "┊ 『 📝 』 Pesan:",
broadcastNote: () => "┊ 『 ⚠️ 』 Pesan ini telah dikirim ke semua anggota grup",
broadcastFooter: () => "╰★────★────★\n\n> © ᴅɪᴅᴜᴋᴜɴɢ ᴏʟᴇʜ ChatUnity",
broadcastSuccess: ({ count }) => `꒷꒦ ✦ Broadcast Selesai ✦ ꒷꒦\n\n┊ 『 ✅ 』 Pesan berhasil dikirim\n┊ 『 📊 』 Grup terjangkau: ${count}\n┊ 『 👥 』 Semua anggota telah disebutkan\n\n╰★────★────★`,
broadcastDefaultMessage: () => "Ini adalah pesan default yang dikirim ke semua grup.",
broadcastError: ({ group, error }) => `❌ Kesalahan dalam mengirim pesan ke grup ${group}: ${error}`,
banChatSuccess: () => "꒷꒦ ✦ Chat Diblokir ✦ ꒷꒦\n\n┊ 『 🚫 』 Chat berhasil diblokir\n┊ 『 ⚠️ 』 Bot tidak akan merespons lagi di chat ini\n\n╰★────★────★",
unbanChatSuccess: () => "꒷꒦ ✦ Chat Dibuka Blokirnya ✦ ꒷꒦\n\n┊ 『 ✅ 』 Chat berhasil dibuka blokirnya\n┊ 『 🎉 』 Bot dapat merespons kembali di chat ini\n\n╰★────★────★",
restartInitiating: () => "꒷꒦ ✦ Restart Berlangsung ✦ ꒷꒦\n\n┊ 『 ⏳ 』 Mohon tunggu...\n\n╰★────★────★",
restartProgress: () => "🚀🚀🚀🚀🚀🚀",
restartSuccess: () => "꒷꒦ ✦ Restart Selesai ✦ ꒷꒦\n\n┊ 『 ✅ 』 Bot berhasil direstart\n┊ 『 🎉 』 Sistem operasi\n\n╰★────★────★",
restartError: ({ error }) => `꒷꒦ ✦ Kesalahan Restart ✦ ꒷꒦\n\n┊ 『 ❌ 』 Tidak dapat merestart bot\n┊ 『 🔍 』 Kesalahan: ${error}\n\n╰★────★────★`,
shutdownInitiating: () => "꒷꒦ ✦ Matikan Bot ✦ ꒷꒦\n\n┊ 『 🔌 』 Saya mematikan bot...\n┊ 『 🚫 』 Semua chat telah diblokir\n┊ 『 ⏳ 』 Tunggu penutupan\n\n╰★────★────★",
shutdownSuccess: () => "꒷꒦ ✦ Bot Dimatikan ✦ ꒷꒦\n\n┊ 『 ✅ 』 Pemadatan selesai\n┊ 『 💤 』 Bot offline\n\n╰★────★────★",
shutdownChatsBanned: ({ count }) => `┊ 『 📊 』 ${count} chat diblokir`,
shutdownError: ({ error }) => `꒷꒦ ✦ Kesalahan Matikan ✦ ꒷꒦\n\n┊ 『 ❌ 』 Tidak dapat mematikan bot\n┊ 『 🔍 』 Kesalahan: ${error}\n\n╰★────★────★`,
updateInitiating: () => "꒷꒦ ✦ Pembaruan Bot ✦ ꒷꒦\n\n┊ 『 🔄 』 Memeriksa pembaruan...\n┊ 『 ⏳ 』 Mohon tunggu\n\n╰★────★────★",
updateSuccess: ({ output }) => `꒷꒦ ✦ Pembaruan Selesai ✦ ꒷꒦\n\n┊ 『 ✅ 』 Bot berhasil diperbarui\n\n┊ 『 📋 』 Detail:\n${output}\n\n╰★────★────★`,
updateError: ({ error }) => `꒷꒦ ✦ Kesalahan Pembaruan ✦ ꒷꒦\n\n┊ 『 ❌ 』 Tidak dapat memperbarui bot\n┊ 『 🔍 』 Kesalahan: ${error}\n\n┊ 『 💡 』 Solusi yang mungkin:\n┊ -  Periksa koneksi internet\n┊ -  Periksa izin Git\n┊ -  Pastikan Anda berada di cabang yang valid\n\n╰★────★────★`,
updateNoChanges: () => "꒷꒦ ✦ Sudah Diperbarui ✦ ꒷꒦\n\n┊ 『 ℹ️ 』 Bot sudah pada versi terbaru\n┊ 『 ✅ 』 Tidak ada pembaruan tersedia\n\n╰★────★────★",
groupMenuTitle: () => "𝑴𝑬𝑵𝑼 𝑮𝑹𝑼𝑷",
chooseMenu: () => "Pilih kategori dari menu:",
mainMenuButton: () => "🏠 Menu Utama",
adminMenuButton: () => "🛡️ Menu Admin",
ownerMenuButton: () => "👑 Menu Pemilik",
securityMenuButton: () => "🚨 Menu Keamanan",
aiMenuButton: () => "🤖 Menu AI",
musicAudioSection: () => "MUSIK & AUDIO",
infoUtilitySection: () => "INFORMASI & UTILITAS",
imageEditSection: () => "GAMBAR & EDIT",
pokemonSection: () => "POKEMON",
gamesCasinoSection: () => "PERMAINAN & KASINO",
economyRankingSection: () => "EKONOMI & PERINGKAT",
socialInteractionSection: () => "INTERAKSI SOSIAL",
howMuchSection: () => "BERAPA BANYAK?",
personalityTestSection: () => "TES KEPRIBADIAN",
memberCommands: () => "𝑷𝑬𝑹𝑰𝑵𝑻𝑨𝑯 𝑼𝑵𝑻𝑼𝑲 𝑨𝑵𝑮𝑮𝑶𝑻𝑨",
versionLabel: () => "𝑽𝑬𝑹𝑺𝑰",
collabLabel: () => "𝑲𝑶𝑳𝑨𝑩𝑶𝑹𝑨𝑺𝑰",
songCommand: () => "lagu",
audioCommand: () => "audio",
videoCommand: () => "video",
cityCommand: () => "kota",
textCommand: () => "teks",
groupCommand: () => "grup",
userCommand: () => "pengguna",
checkSiteCommand: () => "ceksitus",
photoToStickerCommand: () => "foto ke stiker",
stickerToPhotoCommand: () => "stiker ke foto",
improveQualityCommand: () => "tingkatkan kualitas foto",
photoCommand: () => "foto",
hiddenPhotoCommand: () => "foto tersembunyi",
memeCommand: () => "meme",
fromStickerCommand: () => "dari stiker",
blurImageCommand: () => "buramkan gambar",
comingSoonCommand: () => "segera hadir",
quantityCommand: () => "kuantitas",
headsOrTailsCommand: () => "gambar atau angka",
mathProblemCommand: () => "soal matematika",
rockPaperScissorsCommand: () => "gunting batu kertas",
pokemonInfoCommand: () => "info Pokémon",
balanceCommand: () => "saldo",
topUsersCommand: () => "pengguna teratas",
withdrawUCCommand: () => "UC dari bank",
earnXPCommand: () => "dapatkan XP",
endRelationshipCommand: () => "akhiri hubungan",
affinityCommand: () => "kedekatan",
charmCommand: () => "pesona",
createFightCommand: () => "buat pertengkaran",
truthOrDareCommand: () => "jujur atau tantangan",
playNoText: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n ❗ Masukkan judul atau tautan\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
playNoResults: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n ❗ Tidak ditemukan hasil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
playAudioLoading: () => "┊ ┊ ┊ ┊‿ ˚➶ ｡˚\n┊ ┊ ┊ ┊. ➶ ˚\n┊ ┊ ┊ ˚✧ 🎵 Audio dalam perjalanan\n┊ ˚➶ ｡˚ ☁︎ Tunggu beberapa saat...",
playVideoLoading: () => "┊ ┊ ┊ ┊‿ ˚➶ ｡˚\n┊ ┊ ┊ ┊. ➶ ˚\n┊ ┊ ┊ ˚✧ 🎬 Video dalam perjalanan\n┊ ˚➶ ｡˚ ☁︎ Tunggu beberapa saat...",
playDownloadComplete: () => "✅ Unduhan selesai!",
playTooLong: ({ maxMinutes, duration }) => `╭★────★────★\n|ㅤㅤㅤㅤㅤㅤㅤ꒰VIDEO TERLALU PANJANG!꒱\n|˚₊꒷ ⏳ ꒱ ฅ﹕Maksimal: ${maxMinutes} menit ₊˚๑\n|˚₊꒷ ⌛ ꒱ ฅ﹕Durasi: ${duration} ₊˚๑\n╰★────★────★`,
playVideoInfo: ({ title, timestamp, views, author, ago, url }) => `⋆ ︵︵ ★ 🎥 INFO VIDEO 🎥 ★ ︵︵ ⋆\n\n\n꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧\n୧ ✍️ *Judul:* ${title}\n୧ ⏳ *Durasi:* ${timestamp}\n୧ 👀 *Penayangan:* ${views}\n୧ 🔰 *Saluran:* ${author}\n୧ 🔳 *Dipublikasikan:* ${ago}\n୧ 🔗 *Tautan:* ${url}\n꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧\n\n\n╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩\n  > Pilih format untuk mengunduh\n╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩`,
playChooseFormat: () => "Pilih format:",
playAudioButton: () => "🎵 Audio",
playVideoButton: () => "🎬 Video",
playSaveButton: () => "💾 Simpan Playlist",
playError: ({ error }) => `꒰🩸꒱ ◦- ≫ KESALAHAN\n ★・・・・・・・★\n  ${error}\n ★・・・・・・・★`,
playNoValidLink: () => "꒰🩸꒱ ◦- ≫ KESALAHAN\n ★・・・・・・・★\n  Tidak ditemukan tautan yang valid\n ★・・・・・・・★",
playlistEmpty: ({ userName }) => `ℹ️ ${userName ? `${userName} tidak memiliki lagu tersimpan` : 'Playlist Anda kosong!'}`,
playlistHeader: ({ userName }) => `📋 ${userName ? `Playlist ${userName}` : 'Playlist Anda'}`,
playlistMore: ({ count }) => `...dan ${count} lagu lainnya`,
playlistSelectToPlay: () => "Pilih lagu untuk diputar",
saveNoText: () => "⚠️ Tentukan lagu untuk dicari",
saveSearching: ({ query }) => `⌛ Mencari "${query}"...`,
saveNoResults: () => "⚠️ Tidak ditemukan hasil",
saveAlreadyExists: () => "⚠️ Lagu sudah ada di playlist! Gunakan .playlist untuk melihat lagu tersimpan.",
saveSaved: () => "✅ Lagu disimpan!",
saveViewPlaylist: () => "📋 Lihat Playlist",
savePlay: () => "🎵 Putar",
saveDelete: () => "🗑️ Hapus",
saveSaveNew: () => "💾 Simpan baru",
deleteSelect: () => "🗑️ Pilih lagu yang akan dihapus",
deleteUse: () => "Gunakan: .hapus <nomor>",
deleteInvalid: () => "⚠️ Nomor tidak valid!",
deleteSuccess: () => "✅ Lagu dihapus!",
deleteRestore: () => "💾 Pulihkan",
backButton: () => "🔙 Kembali",
playlistError: ({ error }) => `⚠️ Kesalahan: ${error}`,
playlistSignature: () => "꙰ 𝗞𝗿𝗲𝗮𝘀𝗶 𝗚𝗮𝗯𝟯𝟯𝟯 ꙰",
ytSearchMissingFiles: () => "❗ Untuk menggunakan perintah ini, gunakan basis ChatUnity",
ytSearchMissingQuery: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n 📌 Masukkan nama video\n Contoh: .ytsearch kompilasi\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
ytSearchNoResults: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n ❌ Tidak ditemukan hasil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
ytSearchTitle: () => "🔎 Pencarian YouTube",
ytSearchFooter: () => "ChatUnity ✦ Pengunduh",
ytSearchResultTitle: () => "🎬 Hasil Pencarian YouTube",
ytSearchResultHeader: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n ୧ 🎬 ୭ Hasil pencarian\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Berikut hasil yang ditemukan ✦ ꒷꒦",
ytSearchSelectPrompt: () => "╭★────★────★────★╮\n│ 🔢 Pilih video\n│ dari hasil di atas\n╰★────★────★╯",
ytSearchDuration: () => "📺 Durasi:",
ytSearchViews: () => "👁 Penayangan:",
ytSearchChannel: () => "👤 Saluran:",
toAudioNoMedia: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ⚠️ Balas video atau audio\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
toAudioDownloadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Kesalahan saat mengunduh\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
toAudioConvertError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Kesalahan saat mengonversi\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",


weatherNoCity: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❗ Masukkan nama kota\n  Penggunaan: .cuaca [nama kota]\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
weatherInfo: ({ name, country, temp, feels, min, max, humidity, main, desc, wind, pressure }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🌍 ୭ *Cuaca ${name}, ${country}*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Informasi cuaca ✦ ꒷꒦\n\n🌡 Suhu: ${temp}°C\n🌡 Terasa: ${feels}°C\n🌡 Minimum: ${min}°C\n🌡 Maksimum: ${max}°C\n💧 Kelembapan: ${humidity}%\n☁ Cuaca: ${main}\n🌫 Deskripsi: ${desc}\n💨 Angin: ${wind} m/s\n🔽 Tekanan: ${pressure} hPa\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🌤️\n│ Didukung oleh OpenWeather\n╰★────★────★╯`,
weatherCityNotFound: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  🚫 Kota tidak ditemukan\n  Periksa penulisan\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
weatherError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ⚠️ Kesalahan saat mengambil data\n  Coba lagi nanti\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
translateHelp: ({ prefix, command, languages }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🌍 ୭ *PENERJEMAH*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Contoh penggunaan ✦ ꒷꒦\n\n│ ${prefix}${command} Halo\n│ ${prefix}${command} en Halo\n│ ${prefix}${command} ja Hello\n│ ${prefix}${command} [balas pesan]\n│ ${prefix}bicarakan ar teks\n\n꒷꒦ ✦ Bahasa tersedia ✦ ꒷꒦\n\n${languages}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🌐\n│ Penerjemah ChatUnity\n╰★────★────★╯`,
translateNoText: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Teks tidak ada untuk audio\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
translateNoLang: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Bahasa tidak ditentukan\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
translateWhatToTranslate: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Dan apa yang harus saya terjemahkan?\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
translateTooLong: ({ max, length }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Teks terlalu panjang\n  Maksimal: ${max} karakter\n  Anda: ${length} karakter\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
translateResult: ({ fromLang, toLang, translation }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🌍 ୭ *PENERJEMAH*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Dari: ${fromLang} ✦ ꒷꒦\n꒷꒦ ✦ Ke: ${toLang} ✦ ꒷꒦\n\n${translation}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎯\n│ Terjemahan selesai\n╰★────★────★╯`,
translateListenOriginal: () => "🔊 Dengarkan Asli",
translateListenTranslation: () => "🎵 Dengarkan Terjemahan",
translateFooter: () => "Penerjemah ChatUnity",
translateTTSError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Kesalahan audio: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
translateError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Kesalahan saat menerjemahkan\n  Coba lagi nanti\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
antiLinkNotAdmin: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *Disimpan untuk saat ini*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Saya bukan admin ✦ ꒷꒦\n\nSaya tidak bisa berbuat apa-apa",
antiLinkDetected: ({ user, qrDetected }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚫 ୭ *ANTI-LINK DIHIDUPKAN*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Pelanggaran aturan ✦ ꒷꒦\n\n${user} 🤨 Anda melanggar aturan grup${qrDetected ? ', menurutmu saya tidak melihat QR? 😂' : '.'}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 👮\n│ Dikeluarkan otomatis\n╰★────★────★╯`,
antiLinkRestrictOff: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *Restrict Dinonaktifkan*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Tindakan diperlukan ✦ ꒷꒦\n\nHubungi pemilik bot untuk mengaktifkan RESTRICT\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔧\n│ Fungsi tidak tersedia\n╰★────★────★╯",
antiMediaWarning: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *ANTIMEDIA AKTIF*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Pelanggaran aturan ✦ ꒷꒦\n\nHanya foto dan video dengan 1 tampilan diizinkan\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🚫\n│ Media dihapus\n╰★────★────★╯",
antiSpamDetected: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚫 ୭ *ANTISPAM TERDETEKSI*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Spam terdeteksi ✦ ꒷꒦\n\nPengguna telah dihapus karena perilaku spam\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ⚡\n│ ChatUnity x 333 Protection\n╰★────★────★╯",
antiTrabaAdminWarning: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *PERHATIAN ADMIN*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Trava terdeteksi ✦ ꒷꒦\n\nHEY @${user} kebetulan kamu senang mengirim trava di sini? Beruntung kamu adalah admin! -.-\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🛡️\n│ Dilindungi oleh status\n╰★────★────★╯`,
antiTrabaDetected: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚫 ୭ *ANTI-TRAVA DIHIDUPKAN*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Pesan panjang terdeteksi ✦ ꒷꒦\n\nPengguna @${user} telah mengirim pesan terlalu panjang dan akan dihapus\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🚨\n│ Perlindungan ChatUnity\n╰★────★────★╯`,
antiTrabaNoPermission: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *Izin Hilang*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Tindakan diblokir ✦ ꒷꒦\n\nSaya tidak memiliki izin administrator untuk menghapus pengirim trava\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔒\n│ Minta izin admin\n╰★────★────★╯",
infoSetAge: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🗓️ ୭ *Atur Usia*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Cara melanjutkan ✦ ꒷꒦\n\nUntuk mengatur usia Anda gunakan:\n.setusia <usia>\n\nUntuk menghapus usia Anda gunakan:\n.hapususia\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📝\n│ Manajemen profil\n╰★────★────★╯",
infoSetIG: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🌐 ୭ *Atur Instagram*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Cara melanjutkan ✦ ꒷꒦\n\nUntuk mengatur Instagram gunakan:\n.setig <username>\n\nUntuk menghapusnya gunakan:\n.hapusig\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📱\n│ Manajemen sosial\n╰★────★────★╯",
infoGroupOnly: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Perintah hanya untuk grup\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
infoUserData: ({ messages, warn, role, age, gender, blasphemy, instagram }) => `⋆ ︵︵ ★ 𝐈𝐍𝐅𝐎 𝐏𝐄𝐍𝐆𝐆𝐔𝐍𝐀 ★ ︵︵ ⋆\n\n\n꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧\n୧ 📝 *Pesan:* ${messages}\n୧ ⚠️ *Peringatan:* ${warn} / 4\n୧ 🟣 *Peran:* ${role}\n୧ 🗓️ *Usia:* ${age}\n୧ 🚻 *Jenis Kelamin:* ${gender}\n୧ 🤬 *Makian:* ${blasphemy}\n${instagram ? `୧ 🌐 instagram.com/${instagram}` : '୧ 🌐 *Instagram:* Tidak diatur'}\n꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧`,
infoSetAgeButton: () => "🗓️ Atur Usia",
infoSetGenderMaleButton: () => "🚹 Jenis Kelamin Laki-laki",
infoSetGenderFemaleButton: () => "🚺 Jenis Kelamin Perempuan",
infoSetIGButton: () => "🌐 Atur IG",
infoFooter: () => "Atur data pribadi Anda:",
infoCreator: () => "𝒌𝒓𝒆𝒂𝒔𝒊 𝒅𝒊 𝑶𝒏𝒊𝒙🌟",
infoRoleFounder: () => "𝐏𝐞𝐧𝐝𝐢𝐫𝐢 ⚜️",
infoRoleAdmin: () => "𝐀𝐝𝐦𝐢𝐧 👑",
infoRoleMember: () => "𝐀𝐧𝐠𝐠𝐨𝐭𝐚 🤍",
infoGenderNotSet: () => "𝐁𝐞𝐥𝐮𝐦 𝐝𝐢𝐚𝐭𝐮𝐫",
infoAgeNotSet: () => "Belum diatur",
infoAgeYears: ({ age }) => `${age} tahun`,
setGenderUsage: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ Penggunaan perintah yang benar\n  ━━✫ .setkelamin laki-laki\n  ━━✫ .setkelamin perempuan\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
setGenderSuccess: ({ gender, emoji }) => `✓ Jenis kelamin diatur sebagai: ${gender} ${emoji}`,
deleteGenderSuccess: () => "✓ Jenis kelamin dihapus",
setAgeUsage: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ Masukkan usia yang valid\n  ━━✫ Usia dari 10 hingga 80 tahun\n  ━━✫ Gunakan: .setusia <usia>\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
setAgeSuccess: ({ age }) => `✓ Usia diatur sebagai: ${age} tahun`,
deleteAgeSuccess: () => "✓ Usia dihapus",
rulesNotSet: ({ prefix }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⓘ Tidak ada aturan yang diatur\n  ━━✫ Admin belum\n  ━━✫ mengatur aturan\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n\n📌 Untuk mengatur aturan gunakan:\n${prefix}setaturan <teks aturan>`,
rulesTitle: () => "📜 𝐀𝐭𝐮𝐫𝐚𝐧 𝐆𝐫𝐮𝐩",
rulesDisplay: ({ rules }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📜 ୭ *Aturan Grup*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n${rules}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ⚖️\n│ Hormati aturan\n╰★────★────★╯`,
dashboardTitle: () => "⚡ 𝐓𝐎𝐏 10 𝐏𝐄𝐑𝐈𝐍𝐓𝐀𝐇 ⚡",
dashboardCommand: () => "📚 PERINTAH",
dashboardUses: () => "🗂️ PENGGUNAAN",
dashboardLastUse: () => "⏱️ PENGGUNAAN TERAKHIR",
dashboardNeverUsed: () => "Tidak pernah digunakan",
dashboardDaysAgo: ({ days }) => `${days} hari lalu`,
dashboardHoursAgo: ({ hours }) => `${hours} jam lalu`,
dashboardMinutesAgo: ({ minutes }) => `${minutes} menit lalu`,
dashboardSecondsAgo: () => "beberapa detik lalu",
dashboardStats: ({ stats }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚡ ୭ *TOP 10 PERINTAH*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n${stats}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📊\n│ Statistik bot\n╰★────★────★╯`,
imageSearchBaseOnly: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ Perintah ini tersedia\n  ━━✫ hanya dengan basis ChatUnity\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
imageSearchUsage: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⓘ Penggunaan perintah\n  ━━✫ ${prefix}${command} <kata kunci>\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
imageSearchForbidden: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Konten tidak diizinkan\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
imageSearchNoResults: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😢 Tidak ditemukan gambar\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
imageSearchResults: ({ term }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🔍 ୭ *Hasil pencarian*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Kueri: ${term} ✦ ꒷꒦`,
imageSearchImageNum: ({ num }) => `Gambar #${num}`,
imageSearchResultFor: ({ term }) => `Hasil untuk: ${term}`,
imageSearchFooter: () => "Didukung oleh ChatUnity",
imageSearchOpenImage: () => "Buka gambar",
imageSearchTitle: () => "Hasil gambar",
imageSearchSubtitle: () => "Berikut gambar yang ditemukan di Google",
imageSearchAgainPrompt: () => "🔄 Ingin mencari gambar lain dengan istilah yang sama?",
imageSearchAgainButton: () => "Cari lagi",
obfuscateNoCode: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Masukkan kode JavaScript\n  ━━✫ untuk diobfuscat atau balas\n  ━━✫ pesan dengan kode\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
obfuscateProcessing: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Obfuscation sedang berlangsung...\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
obfuscateSuccess: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🔒 ୭ *Kode diobfuscat*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Obfuscation selesai ✦ ꒷꒦",
obfuscateError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Kesalahan obfuscation\n  ━━✫ ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
bonkNoPhoto: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Tidak ada foto profil\n  ━━✫ Pengguna tidak mengatur\n  ━━✫ foto profil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bonkError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Kesalahan saat eksekusi\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
hornyCardCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🔥 ୭ *Kartu Horny*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Seberapa horny Anda? 🥵🔥 ✦ ꒷꒦",
stupidCaption: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤡 ୭ *Seberapa bodoh Anda?*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ @${user} ✦ ꒷꒦`,
stupidDefaultText: () => "im+bodoh",
wantedNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Tidak dapat mengambil\n  ━━✫ foto profil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedNoProfilePicUser: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Pengguna tidak memiliki\n  ━━✫ foto profil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedYourProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Anda tidak memiliki foto profil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedUnsupportedFormat: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Format tidak didukung\n  ━━✫ Gunakan JPEG atau PNG\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Kesalahan unggah gambar\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Kesalahan API\n  ━━✫ Coba lagi nanti\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Kesalahan: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
wantedCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚔 ୭ *DICARI*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Dicari ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 👮\n│ Didukung oleh ChatUnity\n╰★────★────★╯",
jokeNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Tidak dapat mengambil\n  ━━✫ foto profil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeYourProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Anda tidak memiliki foto profil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeUnsupportedFormat: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Format tidak didukung\n  ━━✫ Gunakan JPEG atau PNG\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Kesalahan unggah gambar\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Kesalahan API\n  ━━✫ Coba lagi nanti\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Kesalahan: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
jokeCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤡 ୭ *LELUCON*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Lelucon di atas kepala ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 😂\n│ Didukung oleh ChatUnity\n╰★────★────★╯",
jailNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Tidak dapat mengambil\n  ━━✫ foto profil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jailUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Kesalahan unggah gambar\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jailAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Kesalahan API\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jailError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Kesalahan: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
jailCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚔 ୭ *DI PENJARA*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 👮\n│ Didukung oleh ChatUnity\n╰★────★────★╯",
nokiaNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Tidak dapat mengambil\n  ━━✫ foto profil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaYourProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Anda tidak memiliki foto profil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaUnsupportedFormat: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Format tidak didukung\n  ━━✫ Gunakan JPEG atau PNG\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Kesalahan unggah\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Kesalahan API\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Kesalahan: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
nokiaCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📱 ୭ *NOKIA*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📞\n│ Didukung oleh ChatUnity\n╰★────★────★╯",
adNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Tidak dapat mengambil\n  ━━✫ foto profil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adYourProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Anda tidak memiliki foto profil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adUnsupportedFormat: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Format tidak didukung\n  ━━✫ Gunakan JPEG atau PNG\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Kesalahan unggah\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Kesalahan API\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Kesalahan: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
adCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📢 ୭ *IKLAN*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📺\n│ Didukung oleh ChatUnity\n╰★────★────★╯",
pokeOpenNoType: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Tentukan jenis\n  ━━✫ base, imperium, premium, darkness\n  ━━✫ Contoh: .bukaPokemon base\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeOpenNoPacks: ({ type }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⛔ Anda tidak memiliki paket ${type.toUpperCase()}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeOpenOpening: () => "🎁 Membuka paket...",
pokeOpenRevealing: () => "✨ Mengungkap kartu...",
pokeOpenNoCards: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😢 Tidak ada kartu ditemukan\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeOpenResult: ({ type, name, rarity, shiny, cardType, level, remaining }) => `🎉 Anda membuka paket *${type.toUpperCase()}*:\n\n✨ *${name}* (${rarity})${shiny ? ' ✨ Shiny' : ''}\n🔰 Jenis: ${cardType} | Lvl: ${level}\n\n📦 Paket tersisa: *${remaining}* ${type}`,
pokeBuyUsage: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Penggunaan benar\n  ━━✫ .beliPokemon <base|imperium|premium> <jumlah>\n  ━━✫ Contoh: .beliPokemon base 3\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeBuyNoCoins: ({ cost, balance }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ UnityCoins tidak cukup\n  ━━✫ Diperlukan: ${cost}\n  ━━✫ Saldo: ${balance}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeBuySuccess: ({ quantity, type, total, balance }) => `✅ Anda membeli *${quantity}* paket ${type.toUpperCase()}!\n📦 Total sekarang: ${total}\n💸 UnityCoins tersisa: ${balance}`,
pokeLeaderboardEmpty: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😢 Tidak ada kolektor ditemukan\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeLeaderboardTitle: () => "🏆 *Top 10 Kolektor Pokémon*:",
pokeInventoryTitle: () => "📂 PAKET ANDA",
pokeInventoryBase: ({ count }) => `• 📦 Base: ${count}`,
pokeInventoryImperium: ({ count }) => `• 👑 Imperium: ${count}`,
pokeInventoryPremium: ({ count }) => `• 🌌 Premium: ${count}`,
pokeInventoryFooter: () => "🎁 Gunakan tombol untuk membuka paket sekarang!",
pokeInventoryOpenBase: () => "📦 Buka Base",
pokeInventoryOpenImperium: () => "👑 Buka Imperium",
pokeInventoryOpenPremium: () => "🌌 Buka Premium",
pokeInventoryBuy: () => "➕ Beli Paket",
pokeBattleNoMention: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚔️ Tag pengguna\n  ━━✫ Contoh: .lawan @pengguna\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeBattleNoPokemon: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😓 Anda tidak memiliki Pokémon\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeBattleOpponentNoPokemon: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😓 Lawan tidak memiliki Pokémon\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeBattleResult: ({ user1, user2, poke1, poke2, result }) => `⚔️ *Pertempuran Pokémon!*\n\n👤 @${user1} memilih *${poke1.name}* (Lv. ${poke1.level})\n👤 @${user2} memilih *${poke2.name}* (Lv. ${poke2.level})\n\n${result}`,
pokeBattleWinner: ({ user }) => `🏆 @${user} memenangkan pertempuran!`,
pokeBattleTie: () => "🤝 Seri! Kedua Pokémon kelelahan.",
pokeEvolveNoName: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 📛 Tentukan nama Pokémon\n  ━━✫ Contoh: .evolusi Charmander\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeEvolveNotOwned: ({ name }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Anda tidak memiliki *${name}*\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeEvolveNoCoins: ({ balance, cost }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⛔ UnityCoins tidak cukup\n  ━━✫ Anda: ${balance}\n  ━━✫ Diperlukan: ${cost}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeEvolveNoEvolution: ({ name }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⛔ ${name} tidak dapat berevolusi\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeEvolveEvolving: ({ name }) => `✨ *${name}* sedang berevolusi...`,
pokeEvolveProgress: () => "🔄 Evolusi sedang berlangsung...",
pokeEvolveSuccess: ({ from, to }) => `🎉 *${from}* berevolusi menjadi *${to}*!`,
pokeEvolveComplete: ({ balance }) => `✅ Evolusi selesai!\n💰 UnityCoins tersisa: *${balance}*`,
tradeUsage: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 📌 Penggunaan benar\n  ━━✫ .tukar @pengguna <nomor_anda> <nomor_dia>\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
tradeYourNotExist: ({ num }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Pokémon Anda no. ${num}\n  ━━✫ tidak ada\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
tradeTheirNotExist: ({ num, user }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Pokémon no. ${num}\n  ━━✫ milik @${user} tidak ada\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
tradeRequest: ({ from, myPoke, theirPoke, target }) => `🔁 *Permintaan Pertukaran*\n\n@${from} ingin menukar:\n📤 *${myPoke.name}* (Lv. ${myPoke.level})\ndengan\n📥 *${theirPoke.name}* (Lv. ${theirPoke.level}) milik @${target}\n\n✅ @${target}, balas dengan *.terima* untuk konfirmasi.`,
tradeNoRequest: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Tidak ada permintaan pertukaran\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
tradeUnavailable: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Salah satu Pokémon\n  ━━✫ tidak tersedia lagi\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
tradeSuccess: ({ from, to, poke1, poke2 }) => `✅ Pertukaran selesai antara @${from} dan @${to}!\n\n🎁 ${poke1.name} ⇄ ${poke2.name}`,
pityTitle: () => "📊 *Sistem Pity Darkness*",
pityOpened: ({ count }) => `🔁 Paket dibuka tanpa Darkness: *${count}*`,
pityRemaining: ({ remaining }) => `🎯 Darkness berikutnya dijamin dalam: *${remaining}* paket`,
pityGuaranteed: () => "✨ Paket berikutnya memiliki Darkness *terjamin*!",
inventoryEmpty: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 📦 Inventori kosong\n  ━━✫ Gunakan .bukaPokemon base\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
inventoryHeader: ({ user, total, page, totalPages, perPage }) => `╭━━━🗂️ *INVENTORI POKÉMON* 🗂️━━━╮\n┃ 👤 *Pelatih:* @${user}\n┃ 📦 *Total:* ${total}\n┃ 📄 *Halaman:* ${page}/${totalPages}\n┃ 📌 *Per halaman:* ${perPage}\n╰━━━━━━━━━━━━━━━━━━━━━━━╯`,
inventoryDarknessButton: () => "🌑 Pokémon Darkness",
inventoryPageButton: ({ num }) => `Halaman ${num}`,
inventoryFooter: () => "📂 Gunakan `.inventori [halaman]` atau klik tombol untuk navigasi.",
darknessInfo: () => "🌑 *PAKET DARKNESS* 🌑\n\nPaket *Darkness* tidak dapat dibeli, tetapi ditemukan **secara tiba-tiba** saat Anda membuka paket *Premium*.\n\n➡️ Setiap 10 paket *Premium* terbuka, Anda memiliki 50% peluang mendapatkan paket *Darkness* bonus.\n\n🎲 Membuka paket *Darkness* dapat menemukan Pokémon Darkness spesial dengan 10% peluang.\n\nGunakan *.bukaPokemon darkness* untuk membuka paket Darkness.\n\nSemoga beruntung! 🍀",
trisAlreadyPlaying: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❗ Anda sudah bermain\n  ━━✫ dengan seseorang\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
trisNoRoomName: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❗ Beri nama ruangan\n  ━━✫ Contoh: ${prefix}${command} ruang1\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
trisGameStarting: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🕹️ ୭ *PERMAINAN DIMULAI*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Seorang pemain bergabung ✦ ꒷꒦",
trisTurnOf: ({ player }) => `Giliran @${player}`,
trisRoomCreated: () => "𝐑𝐔𝐀𝐍𝐆𝐀𝐍 𝐃𝐈𝐁𝐔𝐀𝐓 ✓",
trisWaiting: ({ room }) => `══════ •⊰✧⊱• ══════\n*𝐌𝐞𝐧𝐮𝐧𝐠𝐠𝐮 𝐩𝐞𝐦𝐚𝐢𝐧 ...*\n══════════════\n🕹️ 𝐔𝐧𝐭𝐮𝐤 𝐛𝐞𝐫𝐠𝐚𝐛𝐮𝐧𝐠 𝐤𝐞𝐭𝐢𝐤\n.main ${room}\n══════════════\n⛔ 𝐔𝐧𝐭𝐮𝐤 𝐤𝐞𝐥𝐮𝐚𝐫 𝐝𝐚𝐫𝐢 𝐩𝐞𝐫𝐦𝐚𝐢𝐧𝐚𝐧\n𝐛𝐞𝐫𝐣𝐚𝐥𝐚𝐧 𝐤𝐞𝐭𝐢𝐤 .keluar\n══════ •⊰✧⊱• ══════`,
slotInvalidBet: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Taruhan tidak valid\n  ━━✫ Contoh: ${prefix}${command} 100\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
slotInsufficientUC: ({ bet }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚫 UC tidak cukup\n  ━━✫ Anda butuh ${bet} UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
slotCooldown: ({ min, sec }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Tunggu ${min}m ${sec}s\n  ━━✫ sebelum bermain lagi\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
slotWin: ({ uc, xp }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *ANDA MENANG!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Kemenangan ✦ ꒷꒦\n\n┌──────────────\n│ ➕ *${uc} UC*\n│ ➕ *${xp} XP*\n└──────────────`,
slotLose: ({ uc, xp }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤡 ୭ *ANDA KALAH!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Kekalahan ✦ ꒷꒦\n\n┌──────────────\n│ ➖ *${uc} UC*\n│ ➖ *${xp} XP*\n└──────────────`,
slotBalance: ({ uc, xp, current, max, prefix }) => `\n💎 *SALDO SEKARANG*\n\n┌──────────────\n│ 👛 *UC: ${uc}*\n│ ⭐ *XP: ${xp}*\n│ 📊 *Kemajuan: ${current}/${max} XP*\n└──────────────\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ℹ️\n│ Gunakan ${prefix}menuxp untuk lebih banyak XP!\n╰★────★────★╯`,
betUsage: ({ prefix, command }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎰 ୭ *KASINO*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Cara bermain ✦ ꒷꒦\n\nMasukkan jumlah 💶 UnityCoins untuk bertaruh melawan *ChatUnity-Bot*\n\n📌 Contoh:\n${prefix}${command} 100\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎲\n│ Pilih jumlah di bawah!\n╰★────★────★╯`,
betCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Anda sudah bertaruh\n  ━━✫ Tunggu ⏱ ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
betLose: ({ bot, user, amount, botName, userName }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎲 ୭ *HASIL*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Angka yang ditarik ✦ ꒷꒦\n\n🤖 *${botName}*: ${bot}\n👤 *${userName}*: ${user}\n\n╭★────★────★────★╮\n│ 😢 ANDA KALAH!\n│ ➖ ${amount} 💶 UC\n╰★────★────★╯`,
betWin: ({ bot, user, amount, botName, userName }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎲 ୭ *HASIL*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Angka yang ditarik ✦ ꒷꒦\n\n🤖 *${botName}*: ${bot}\n👤 *${userName}*: ${user}\n\n╭★────★────★────★╮\n│ 🎉 ANDA MENANG!\n│ ➕ ${amount} 💶 UC\n╰★────★────★╯`,
betDraw: ({ bot, user, amount, botName, userName }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎲 ୭ *HASIL*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Angka yang ditarik ✦ ꒷꒦\n\n🤖 *${botName}*: ${bot}\n👤 *${userName}*: ${user}\n\n╭★────★────★────★╮\n│ 🤝 SERI!\n│ ↩️ ${amount} 💶 UC dikembalikan\n╰★────★────★╯`,
betInsufficientUC: ({ amount }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 💸 Anda tidak memiliki ${amount} 💶 UC\n  ━━✫ untuk bertaruh!\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rpsAlreadyPlaying: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏱ Anda sudah bermain\n  ━━✫ Tunggu ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rpsChooseOption: () => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ✊ ୭ *BATU KERTAS GUNTING*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Pilih langkah Anda ✦ ꒷꒦\n\n🪨 Batu mengalahkan Gunting\n📄 Kertas mengalahkan Batu\n✂️ Gunting mengalahkan Kertas\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎲\n│ Buat pilihan Anda!\n╰★────★────★╯`,
rpsInvalidOption: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Pilihan tidak valid\n  ━━✫ Pilih: batu/kertas/gunting\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rpsDraw: ({ player, bot, reward }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤝 ୭ *SERI!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Hasil ✦ ꒷꒦\n\n👤 Anda: ${player}\n🤖 Bot: ${bot}\n\n╭★────★────★────★╮\n│ 🎁 Hadiah penghiburan\n│ ➕ ${reward} 💶 UC\n╰★────★────★╯`,
rpsWin: ({ player, bot, reward }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *ANDA MENANG!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Hasil ✦ ꒷꒦\n\n👤 Anda: ${player}\n🤖 Bot: ${bot}\n\n╭★────★────★────★╮\n│ 🏆 Kemenangan epik!\n│ ➕ ${reward} 💶 UC\n╰★────★────★╯`,
rpsLose: ({ player, bot, loss }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 😢 ୭ *ANDA KALAH!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Hasil ✦ ꒷꒦\n\n👤 Anda: ${player}\n🤖 Bot: ${bot}\n\n╭★────★────★────★╮\n│ 💸 Semoga beruntung lain kali\n│ ➖ ${loss} 💶 UC\n╰★────★────★╯`,
rpsRock: () => "🪨 Batu",
rpsPaper: () => "📄 Kertas",
rpsScissors: () => "✂️ Gunting",
rpsButtonRock: () => "🪨 Batu",
rpsButtonPaper: () => "📄 Kertas",
rpsButtonScissors: () => "✂️ Gunting",
rpsButtonRetry: () => "🔄 Coba lagi",
bjInsufficientFunds: () => "💰 Dana tidak cukup!",
bjNotYourTurn: () => "❌ Bukan giliran Anda!",
bjBusted: () => "💥 Bust! Melebihi 21!",
bjDealerBusted: () => "🎉 Dealer bust! Anda menang!",
bjYouWin: () => "🎉 Anda menang!",
bjDealerWins: () => "😔 Dealer menang!",
bjPush: () => "🤝 Seri!",
bjMakeBet: () => "💵 Buat taruhan Anda!",
bjYourTurn: () => "📋 Giliran Anda! Ambil atau Tahan?",
bjYourScore: ({ score }) => `📋 Skor Anda: ${score}`,
bjTimeoutTitle: () => "⏰ WAKTU HABIS",
bjTimeoutMsg: ({ balance }) => `⏰ Waktu habis! Permainan dibatalkan.\n💶 Dompet: ${balance} UC`,
bjGameInProgress: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🎰 Permainan sudah berjalan\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjInvalidBet: ({ max }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Taruhan tidak valid\n  ━━✫ Jumlah: 10-${max} UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
bjStartCaption: ({ name, bet, balance }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎰 ୭ *BLACKJACK*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ ${name} ✦ ꒷꒦\n\n💶 Taruhan: ${bet} UC\n📋 Saldo: ${balance} UC\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ⚡\n│ .hit .stand .double\n╰★────★────★╯`,
bjNoGame: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Tidak ada permainan berjalan\n  ━━✫ Gunakan: .blackjack [taruhan]\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjNotYourGame: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Bukan giliran Anda!\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjDoubleOnlyTwo: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Gandakan hanya dengan 2 kartu\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjDoubleInsufficientFunds: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Dana tidak cukup\n  ━━✫ untuk menggandakan\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjFooter: () => "♠️ Blackjack Bot ♣️",
bjPlayer: () => "PEMAIN",
bjDealer: () => "DEALER",
bjScore: () => "SKOR",
bjWallet: () => "💶 DOMPET",
bjBet: () => "🎯 TARUHAN",
rouletteCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Anda sudah bertaruh\n  ━━✫ Tunggu ⏱ ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteUsage: ({ prefix, command }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎰 ୭ *ROULETTE*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Cara bermain ✦ ꒷꒦\n\nMasukkan jumlah dan warna:\n${prefix}${command} 20 black\n${prefix}${command} 50 red\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎲\n│ Pilih warna Anda!\n╰★────★────★╯`,
rouletteInvalidFormat: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Format salah\n  ━━✫ Contoh: ${prefix}${command} 20 black\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteInvalidAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Jumlah tidak valid\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteMaxBet: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Maksimal 50 💶 UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteInvalidColor: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Warna tidak valid\n  ━━✫ Pilih: black atau red\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteInsufficientFunds: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 💶 UC tidak cukup\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteBetPlaced: ({ amount, color }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎰 ୭ *TARUHAN DITEMPATKAN*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Detail ✦ ꒷꒦\n\n💰 Jumlah: ${amount} 💶 UC\n🎨 Warna: ${color === 'black' ? '⚫ HITAM' : '🔴 MERAH'}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ⏱\n│ Tunggu 10 detik...\n╰★────★────★╯`,
rouletteWin: ({ amount, total, winColor }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *ANDA MENANG!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Hasil ✦ ꒷꒦\n\n🎯 Warna yang keluar: ${winColor === 'black' ? '⚫ HITAM' : '🔴 MERAH'}\n\n╭★────★────★────★╮\n│ 💰 Kemenangan: +${amount} 💶 UC\n│ 💎 Total: ${total} 💶 UC\n╰★────★────★╯`,
rouletteLose: ({ amount, total, winColor }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 😢 ୭ *ANDA KALAH!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Hasil ✦ ꒷꒦\n\n🎯 Warna yang keluar: ${winColor === 'black' ? '⚫ HITAM' : '🔴 MERAH'}\n\n╭★────★────★────★╮\n│ 💸 Kekalahan: -${amount} 💶 UC\n│ 💎 Total: ${total} 💶 UC\n╰★────★────★╯`,
rouletteBlack: () => "⚫ Hitam",
rouletteRed: () => "🔴 Merah",
rouletteButtonBlack10: () => "⚫ 10 UC",
rouletteButtonBlack25: () => "⚫ 25 UC",
rouletteButtonBlack50: () => "⚫ 50 UC",
rouletteButtonRed10: () => "🔴 10 UC",
rouletteButtonRed25: () => "🔴 25 UC",
rouletteButtonRed50: () => "🔴 50 UC",
// Coin Flip
cfCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Anda sudah bermain\n  ━━✫ Tunggu ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cfWaiting: ({ player }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🪙 ୭ *GAMBAR ATAU ANGKA*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Permainan dimulai ✦ ꒷꒦\n\n🧑 Pemain 1: @${player}\n🕹️ Menunggu pemain kedua...\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎲\n│ Ketik gambar atau angka!\n╰★────★────★╯`,
cfPlayer1Ready: ({ player, choice }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🪙 ୭ *GAMBAR ATAU ANGKA*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Pemain 1 siap ✦ ꒷꒦\n\n🧑 @${player} memilih *${choice}*\n🎯 Menunggu Pemain 2...\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎮\n│ Giliran Anda!\n╰★────★────★╯`,
cfInvalidChoice: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Pilihan tidak valid\n  ━━✫ Ketik: gambar atau angka\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cfResult: ({ result, p1, p2, msg, prefix, command }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🪙 ୭ *HASIL: ${result.toUpperCase()}*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n${msg}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔄\n│ ${prefix}${command} untuk bermain lagi\n╰★────★────★╯`,
cfAlreadyChosen: ({ choice }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ Anda sudah memilih ${choice}\n  ━━✫ Tunggu pemain lain\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cfNotAvailable: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Permainan tidak tersedia\n  ━━✫ ${prefix}${command} untuk memulai\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cfButtonHeads: () => "🪙 Gambar",
cfButtonTails: () => "🪙 Angka",

// RPS v2
rps2Cooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Tunggu ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rps2Usage: ({ prefix, command }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ✊ ୭ *BATU KERTAS GUNTING*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Cara bermain ✦ ꒷꒦\n\n${prefix}${command} batu\n${prefix}${command} kertas\n${prefix}${command} gunting\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎮\n│ Pilih langkah Anda!\n╰★────★────★╯`,
rps2InvalidChoice: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Pilihan tidak valid\n  ━━✫ ${prefix}${command} batu/kertas/gunting\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rps2Draw: ({ bot, reward }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤝 ୭ *SERI!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Bot: ${bot} ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ 🎁 +${reward} 💶 UC\n╰★────★────★╯`,
rps2Win: ({ bot, reward }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *ANDA MENANG!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Bot: ${bot} ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ 💰 +${reward} 💶 UC\n╰★────★────★╯`,
rps2Lose: ({ bot, loss }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 😢 ୭ *ANDA KALAH!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Bot: ${bot} ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ 💸 -${loss} 💶 UC\n╰★────★────★╯`,
rps2ButtonRock: () => "🪨 Batu",
rps2ButtonPaper: () => "📄 Kertas",
rps2ButtonScissors: () => "✂️ Gunting",

// Pokedex
pokedexNoName: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Masukkan nama Pokémon\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokedexSearching: ({ name }) => `🔍 Mencari ${name}...`,
pokedexError: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Kesalahan pencarian Pokémon\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokedexInfo: ({ name, id, type, abilities, height, weight, desc, url }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎌 ୭ *POKÉDEX - ${name}*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Informasi ✦ ꒷꒦\n\n🔹 *Nama:* ${name}\n🔹 *ID:* ${id}\n🔹 *Tipe:* ${type}\n🔹 *Kemampuan:* ${abilities}\n🔹 *Tinggi:* ${height}\n🔹 *Berat:* ${weight}\n\n📝 *Deskripsi:*\n${desc}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🌐\n│ ${url}\n╰★────★────★╯`,
flagGameActive: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Permainan sudah aktif\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagGroupOnly: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Hanya untuk grup\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagNoGame: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Tidak ada permainan aktif\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagAdminOnly: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Hanya untuk admin\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Tunggu ${time}s\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagSkipped: ({ answer }) => `ㅤ⋆｡˚『 ╭ \`PERMAINAN DIINTERUPSI\` ╯ 』˚｡⋆\n╭\n│ 『 🏳️ 』 \`Jawabannya adalah:\`\n│ 『 ‼️ 』 *\`${answer}\`*\n│ 『 👑 』 _*Diinterupsi oleh admin*_\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagStart: ({ phrase }) => `ㅤ⋆｡˚『 ╭ \`${phrase}\` ╯ 』˚｡⋆\n╭\n│ 『 🏳️ 』 \`Jawab dengan nama\` *negara*\n│ 『 ⏱️ 』 \`Waktu tersedia:\` *30 detik*\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagTimeout: ({ answer }) => `ㅤ⋆｡˚『 ╭ \`WAKTU HABIS!\` ╯ 』˚｡⋆\n╭\n│ 『 🏳️ 』 \`Jawabannya adalah:\`\n│ 『 ‼️ 』 *\`${answer}\`*\n│ 『 💡 』 _*Lebih cepat lain kali!*_\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagCorrect: ({ answer, time, reward, exp, bonus }) => `ㅤ⋆｡˚『 ╭ \`JAWABAN BENAR!\` ╯ 』˚｡⋆\n╭\n│ 『 🏳️ 』 \`Negara:\` *${answer}*\n│ 『 ⏱️ 』 \`Waktu yang dibutuhkan:\` *${time}s*\n│ 『 🎁 』 \`Hadiah:\`\n│ 『 💰 』 *${reward}€* ${bonus > 0 ? `(+${bonus} bonus kecepatan)` : ''}\n│ 『 🆙 』 *${exp} EXP*\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagAlmostThere: () => "👀 *Hampir saja!*",
flagAttemptsExhausted: () => `ㅤ⋆｡˚『 ╭ \`PERCOBAAN HABIS!\` ╯ 』˚｡⋆\n╭\n│ 『 ❌ 』 \`Anda telah menghabiskan 3 percobaan!\`\n│ 『 ⏳ 』 _*Tunggu yang lain mencoba...*_\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagWrongHint: ({ letter, length }) => `❌ *Jawaban salah!*\n\n💡 *Petunjuk:*\n  • Dimulai dengan huruf *"${letter}"*\n  • Terdiri dari *${length} huruf*`,
flagWrong2: ({ remaining }) => `❌ *Jawaban salah!*\n\n📝 *Percobaan tersisa:* ${remaining}\n🤔 *Pikirkan baik-baik jawaban berikutnya!*`,
flagWrongLast: () => `❌ *Jawaban salah!*\n\n📝 *Percobaan terakhir tersisa...*`,
flagPlayAgain: () => "🏳️ Main Lagi!",
flagError: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Kesalahan memulai permainan\n  ━━✫ Coba lagi beberapa detik\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagPhrase1: () => "🇺🇳 *TEBAK BENDERANYA!* 🇺🇳",
flagPhrase2: () => "🌍 *Negara mana yang diwakili bendera ini?*",
flagPhrase3: () => "🏳️ *Tantangan geografis: kenali bendera ini?*",
flagPhrase4: () => "🧭 *Tebak negara dari benderanya!*",
flagPhrase5: () => "🎯 *Kuis bendera: negara mana ini?*",
flagPhrase6: () => "🌟 *Uji pengetahuan geografis Anda!*",
flagPhrase7: () => "🔍 *Perhatikan baik-baik dan tebak negaranya!*",
songGameActive: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Permainan sudah berjalan\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
songError: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Kesalahan dalam permainan\n  ━━✫ Coba lagi nanti\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
songStart: ({ artist, time }) => `  ⋆｡˚『 ╭ \`TEBAK LAGU\` ╯ 』˚｡⋆\n╭\n┃ 『 ⏱️ 』 \`Waktu:\` *${time} detik*\n┃ 『 👤 』 \`Artis:\` *${artist}*\n┃\n┃ ➤  \`Tulis judulnya!\`\n╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒`,
songTimeout: ({ title, artist }) => `ㅤ⋆｡˚『 ╭ \`WAKTU HABIS\` ╯ 』˚｡⋆\n╭\n│\n│ ➤ \`Tidak ada yang menebak!\`\n┃ 『  』🎵 \`Judul:\` *${title}*\n┃ 『  』👤 \`Artis:\` *${artist}*\n┃\n╰⭒─ׄ─ׅ─ׄ─⭒`,
songCorrect: ({ title, artist, reward, exp }) => `ㅤㅤ⋆｡˚『 ╭ \`BENAR\` ╯ 』˚｡⋆\n╭\n│\n│ ➤ \`Jawaban Benar!\`\n┃ 『  』🎵 \`Judul:\` *${title}*\n┃ 『  』👤 \`Artis:\` *${artist}*\n┃\n┃ 『 🎁 』 \`Kemenangan:\`\n│ ➤  \`${reward}\` *UC*\n│ ➤  \`${exp}\` *EXP*\n┃\n╰⭒─ׄ─ׅ─ׄ─⭒`,
songAlmostThere: () => "👀 *Hampir saja!* Coba lagi...",
songPlayAgain: () => "『 🎵 』 Main Lagi",
songExternalTitle: () => "tebak lagu",
songExternalArtist: ({ artist }) => `Artis: ${artist}`,
songExternalSource: () => "ChatUnity Bot",
logoGroupOnly: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Hanya untuk grup\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoNoGame: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Tidak ada permainan aktif\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoAdminOnly: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Hanya admin\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoSkipped: ({ answer }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🛑 ୭ *PERMAINAN DIINTERUPSI*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Jawabannya adalah ✦ ꒷꒦\n\n🚗 *${answer}*`,
logoGameActive: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Permainan sudah berjalan\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Tunggu ${time}s\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoStart: ({ phrase, time }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚗 ୭ *${phrase}*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Tebak mereknya ✦ ꒷꒦\n\n⌛ Waktu: ${time} detik\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔍\n│ Tulis nama mereknya!\n╰★────★────★╯`,
logoTimeout: ({ answer }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⏰ ୭ *WAKTU HABIS!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Jawabannya adalah ✦ ꒷꒦\n\n🚗 *${answer}*\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔄\n│ Coba lagi dengan .mobil\n╰★────★────★╯`,
logoCorrect: ({ brand, time, reward, exp, bonus }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *JAWABAN BENAR!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Detail ✦ ꒷꒦\n\n🚗 Merek: *${brand}*\n⏱ Waktu: *${time}s*\n\n╭★────★────★────★╮\n│ 🎁 Hadiah:\n│ • ${reward} 💰 UC${bonus > 0 ? ` (+${bonus} bonus)` : ''}\n│ • ${exp} 🆙 EXP\n╰★────★────★╯\n\n> \\by ChatUnity\\`,
logoPhrase1: () => "🚘 TEBAK LOGO!",
logoPhrase2: () => "🏁 Merek apa ini?",
logoPhrase3: () => "🔍 Kenali mobil ini?",
logoPhrase4: () => "🚗 Kuis Mobil!",
logoPhrase5: () => "🏎️ Tebak mereknya!",
logoButtonPlayAgain: () => "🚗 Main Lagi",
missionMainTitle: ({ bot }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎯 ୭ *SISTEM MISI*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ ${bot} ✦ ꒷꒦`,
missionMainStats: ({ user, money, bank, dailyDone, dailyTotal, weeklyDone, weeklyTotal }) => `👤 Pengguna: @${user}\n💰 Saldo: ${money} UC\n🏦 Bank: ${bank} UC\n📅 Harian: ${dailyDone}/${dailyTotal} selesai\n📆 Mingguan: ${weeklyDone}/${weeklyTotal} selesai\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎯\n│ Pilih jenis misi:\n╰★────★────★╯`,
missionButtonDaily: () => "📅 HARIAN",
missionButtonWeekly: () => "📆 MINGGUAN",
missionButtonClaim: () => "💰 KLAIM",
missionButtonBack: () => "🔙 KEMBALI",
missionButtonWallet: () => "💰 DOMPET",
missionDailyTitle: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📅 ୭ *MISI HARIAN*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n👤 @${user}`,
missionDailyReset: ({ time }) => `⏳ Reset dalam: ${time}`,
missionWeeklyTitle: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📆 ୭ *MISI MINGGUAN*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n👤 @${user}`,
missionWeeklyReset: ({ time }) => `⏳ Reset dalam: ${time}`,
missionEntry: ({ num, title, progress, target, reward, status }) => `▢ *${num}. ${title}*\n➠ Kemajuan: ${progress}/${target}\n➠ Hadiah: ${reward} UC\n➠ Status: ${status}`,
missionStatusCompleted: () => "✅ DIKLAIM",
missionStatusReady: () => "💰 SIAP",
missionStatusInProgress: () => "❌ DALAM PROSES",
missionFooterDaily: ({ prefix }) => `Gunakan "${prefix}misiklaim" untuk mengklaim!`,
missionFooterWeekly: () => "Misi mingguan - Hadiah lebih besar!",
missionFooterMain: () => "Selesaikan misi untuk mendapatkan UnityCoins!",
missionNoRewards: ({ user }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ @${user} Anda tidak memiliki misi\n  ━━✫ selesai untuk diklaim!\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
missionClaimSuccess: ({ user, total, details, money, bank }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *HADIAH DIKLAIM*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n👤 @${user}\n💰 Total diklaim: *${total} UC*\n\n${details}\n\n╭★────★────★────★╮\n│ 💰 Saldo: ${money} UC\n│ 🏦 Bank: ${bank} UC\n╰★────★────★╯`,
missionClaimFooter: () => "Gunakan .dompet untuk melihat saldo lengkap",
missionSendMessages: ({ count }) => `Kirim ${count} pesan`,
missionExecuteCommands: ({ count }) => `Jalankan ${count} perintah`,
missionNoWarn: () => "Tetap tanpa peringatan",
missionNoWarnWeek: () => "Tetap 7 hari tanpa peringatan",
missionTotalMessages: ({ count }) => `Capai ${count} total pesan`,
walletNotFound: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Pengguna tidak ditemukan\n  ━━✫ dalam database\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
walletTitle: () => "💰 DOMPET",
walletInfo: ({ name, uc, bank }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💰 ୭ *DOMPET*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ ${name} ✦ ꒷꒦\n\n👤 Pengguna: ${name}\n💰 UnityCoins: ${uc} 💶\n🏛️ Bank: ${bank} 💳\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 💎\n│ Gunakan .deposit untuk menyetor\n│ Gunakan .tarik untuk menarik\n╰★────★────★╯`,
walletExternalTitle: ({ name }) => `Dompet ${name}`,
walletExternalBody: ({ uc }) => `Saldo: ${uc} UC`,
walletButtonDeposit: () => "🏛️ Setor",
walletButtonWithdraw: () => "💰 Tarik",
walletButtonGames: () => "🎮 Permainan",
bankNotFound: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Pengguna tidak ditemukan\n  ━━✫ dalam database\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
bankYourBalance: ({ balance }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🏛️ ୭ *AKUN ANDA*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Saldo Bank ✦ ꒷꒦\n\n💰 Anda memiliki *${balance} 💶 UnityCoins*\ndi bank Anda 🏛️\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 💎\n│ Gunakan .deposit untuk menyetor\n│ Gunakan .tarik untuk menarik\n╰★────★────★╯`,
bankUserBalance: ({ user, balance }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🏛️ ୭ *AKUN BANK*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ @${user} ✦ ꒷꒦\n\n💰 Memiliki *${balance} 💶 UnityCoins*\ndi bank 🏛️`,
bankButtonDeposit: () => "🏛️ Setor",
bankButtonWithdraw: () => "💰 Tarik",
bankButtonTransfer: () => "💸 Transfer",
transferNoMention: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Sebutkan penerima\n  ━━✫ Contoh: @pengguna 100\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferNoAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Masukkan jumlah\n  ━━✫ 💶 UnityCoins untuk ditransfer\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferInvalidAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Jumlah tidak valid\n  ━━✫ Gunakan hanya angka\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferMinAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Minimal transfer: 1 UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferInsufficient: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 💸 Saldo tidak cukup\n  ━━✫ untuk transfer ini\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferSuccess: ({ amount, fee, total }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💸 ୭ *TRANSFER BERHASIL*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Detail Transaksi ✦ ꒷꒦\n\n💰 Jumlah dikirim: *${amount}* 💶 UC\n📊 Biaya 2%: *${fee}* 💶 UC\n💳 Total didebit: *${total}* 💶 UC\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ✅\n│ Transfer selesai!\n╰★────★────★╯`,
transferReceived: ({ amount }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💰 ୭ *UC DITERIMA*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Anda menerima ✦ ꒷꒦\n\n💶 *+${amount} UnityCoins*\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎁\n│ Cek saldo Anda!\n╰★────★────★╯`,
transferSelf: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Tidak dapat mentransfer\n  ━━✫ ke diri sendiri\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
robNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🧠 Tag seseorang atau\n  ━━✫ balas pesan\n  ━━✫ Contoh: ${prefix}${command} @pengguna\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
robSelf: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🤡 Tidak dapat mencuri\n  ━━✫ dari diri sendiri\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
robCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚨 Anda sudah mencuri\n  ━━✫ Coba lagi dalam ⏱ ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
robSuccess: ({ amount, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💰 ୭ *PENJAMBretan BERHASIL!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Pencurian sempurna ✦ ꒷꒦\n\nAnda mencuri *${amount} 💶 UC*\ndari @${target}\n\n╭★────★────★────★╮\n│ 💸 +${amount} 💶 UC\n│ ୭ ˚. ᵎᵎ ✅ Ke saldo Anda\n╰★────★────★╯`,
robCaught: ({ fine, name }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚓 ୭ *DITANGKAP!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Tertangkap polisi ✦ ꒷꒦\n\n${name} telah dihentikan!\n\n╭★────★────★────★╮\n│ 💸 Denda: -${fine} 💶 UC\n│ ୭ ˚. ᵎᵎ ❌ Semoga beruntung lain kali\n╰★────★────★╯`,
robPartial: ({ amount, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💸 ୭ *PENJAMBretan PARSIAL*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Hampir berhasil ✦ ꒷꒦\n\nAnda hanya mencuri *${amount} 💶 UC*\ndari @${target}\n\n╭★────★────★────★╮\n│ 💰 +${amount} 💶 UC\n│ ୭ ˚. ᵎᵎ ⚠️ Ke saldo Anda\n╰★────★────★╯`,
robButtonRetry: () => "🔄 Coba Lagi",
robButtonWallet: () => "💰 Dompet",
withdrawNoAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Masukkan jumlah\n  ━━✫ 💶 UnityCoins untuk ditarik\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawNoFunds: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Anda tidak memiliki 💶 UnityCoins\n  ━━✫ di akun bank\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawInvalidAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Jumlah tidak valid\n  ━━✫ Gunakan angka valid\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawMinAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Masukkan minimal 1 UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawInsufficientFunds: ({ bank }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Anda hanya memiliki *${bank}* 💶 di akun\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawSuccess: ({ count, bank }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ✅ ୭ *PENARIKAN BERHASIL*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Anda menarik ✦ ꒷꒦\n\n💶 *${count} UnityCoins*\ndari akun bank\n\n💳 Saldo bank baru: *${bank} UC*\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 💼\n│ Gunakan .dompet untuk memeriksa\n╰★────★────★╯`,
  xpLevelDisplay: ({ level }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧  Level: ${level}`,
  xpProgressDisplay: ({ current, needed }) => `Kemajuan XP: ${current} / ${needed}`,
  xpFooterText: () => "╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐ Lanjutkan menulis untuk naik level!",
  xpCaption: ({ user, level, exp, next }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧\n\n┊ 『 📊 』 Profil XP ${user}\n\n┃ Level saat ini: ${level}\n┃ Pengalaman total: ${exp}\n┃ XP menuju level berikutnya: ${next}\n\n╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
rubaxpWait: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Anda harus menunggu sebelum dapat mencuri lagi\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpWaitTime: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Anda harus menunggu ${time} sebelum dapat mencuri lagi\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 📍 Anda harus menandai pengguna valid\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpUserNotFound: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Pengguna tidak ditemukan di database\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpTooPoor: ({ target, limit }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😢 @${target} memiliki kurang dari *${limit} XP*\n  ━━✫ Jangan mencuri dari yang miskin, baiklah\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpSuccess: ({ amount, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ✅ ୭ *PENJAMBRetan BERHASIL*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Anda mencuri ✦ ꒷꒦\n\n💰 *${amount} XP*\ndari @${target}\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎮\n│ Teruskan!\n╰★────★────★╯`,
rubaxpTimeFormat: ({ hours, minutes, seconds }) => `${hours} Jam ${minutes} Menit ${seconds} Detik`,darxpNoMention: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Anda harus menyebutkan pengguna dengan @user\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpNoAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Masukkan jumlah 💫 XP untuk ditransfer\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpInvalidAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Masukkan hanya angka valid\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpMinAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Minimal yang dapat ditransfer adalah 1 💫 XP\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpInsufficientXP: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Anda tidak memiliki cukup 💫 XP untuk ditransfer\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpSuccess: ({ xp, tassa }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n  ୧ ✅ ୭ *TRANSFER BERHASIL*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Anda mentransfer ✦ ꒷꒦\n\n💫 *${xp} XP*\n(biaya: ${tassa} XP)\n╭★────★────★────★╮\n│ Terus bermain!\n╰★────★────★╯`,
marry_no_target: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Anda harus menyebutkan pengguna untuk dinikahi
  ━━✫ Gunakan: ${prefix + command} @pengguna
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_self: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Tidak dapat menikahi diri sendiri
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_user_not_found: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Pengguna tidak ditemukan di database
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_already_married_sender: ({ spouse }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💍 ୭ *ANDA SUDAH MENIKAH*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ Anda terdaftar menikah dengan ✦ ꒷꒦

❤ ${spouse}

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
marry_already_married_target: ({ target }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 ${target} sudah menikah
  ━━✫ Cari yang lain
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_pending_proposal: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Anda sudah memiliki proposal pernikahan tertunda
  ━━✫ Tunggu sampai diterima atau ditolak
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_proposal_text: ({ sender, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💍 ୭ *PROPOSAL PERNIKAHAN*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ ${sender} meminang tangan ✦ ꒷꒦

❤ ${target}

Balas dengan "Ya" untuk menerima
atau "Tidak" untuk menolak.

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
marry_proposal_expired: ({ sender, target }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⏳ Proposal antara ${sender} dan ${target}
  ━━✫ telah kedaluwarsa karena tidak aktif
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_proposal_rejected: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 💔 Proposal ditolak
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_user_not_found_db: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Kesalahan: pengguna tidak ditemukan di database
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_success: ({ sender, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💍 ୭ *PERNIKAHAN DICATAT*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ Pasangan baru resmi ✦ ꒷꒦

❤ ${sender}  ×  ${target}

꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧
Biarkan cinta dimulai!

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
divorce_not_married: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Anda tidak menikah dengan siapa pun
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
divorce_spouse_not_found: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Pasangan Anda tidak ditemukan di database
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
divorce_success: ({ ex }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💔 ୭ *PERCERAIAN SELESAI*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ Anda berpisah dari ✦ ꒷꒦

${ex}

· ୨୧ · · ୨୧ ·  ♡
Babak baru kehidupan Anda dimulai.

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
shipNoUser: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❗ Gunakan perintah seperti ini:
  ━━✫ ${prefix + command} @pengguna
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
shipNoUsersPair: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❗ Gunakan perintah seperti ini:
  ━━✫ ${prefix + command} @pengguna1 [@pengguna2]
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
shipInvalidUsers: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❌ Pengguna tidak valid
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
shipCaption: ({ user1, user2, percent }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

💘 *@${user1}* ❤️ *@${user2}*
🔮 Kecocokan: *${percent}%*

· ୨୧ · · ୨୧ ·  ♡`,
shipErrorImage: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❌ Kesalahan saat membuat gambar
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
kissNoTargetMention: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 💋 Anda harus menyebutkan seseorang atau membalas pesan
  ━━✫ Contoh: ${prefix + command} @pengguna
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
kissNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 💋 Anda harus menyebutkan seseorang untuk dicium
  ━━✫ Contoh: .cium @pengguna
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
kissSuccess: ({ senderName, targetName }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💋 ୭ *CIUMAN DISAMPAIKAN*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ ${senderName} memberikan ciuman kepada ✦ ꒷꒦

😘 ${targetName}

· ୨୧ · · ୨୧ ·  ♡`,
odioNoText: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 😡 Anda harus menentukan seseorang
  ━━✫ Contoh: ${prefix + command} @pengguna
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
odioResult: ({ target, percent }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 😡 ୭ *KALKULATOR KEBENCIAN*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ Tingkat kebencian antara ✦ ꒷꒦

${target}  ✕  Anda

🔥 Kebencian: *${percent}%*

꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧`,
rizzNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 Anda harus menandai seseorang atau membalas pesan
  ━━✫ Contoh: ${prefix + command} @pengguna
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rizzSuccess: ({ target, line }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ ✨ ୭ *GERAKAN RIZZ*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ @${target} lihat ini ✦ ꒷꒦

"${line}"

· ୨୧ · · ୨୧ ·  ♡`,
minacciaNoGroup: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Perintah ini hanya dapat digunakan di grup
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
minacciaDisabled: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Ancaman dinonaktifkan di grup ini
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
minacciaNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 Anda harus menentukan siapa yang akan diancam
  ━━✫ Tandai pengguna atau balas pesan
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
minacciaText: ({ target, line }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

@${target} ${line}

· ୨୧ · · ୨୧ ·  ♡`,
zizzaniaNoGroup: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Perintah ini hanya dapat digunakan di grup
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
zizzaniaDisabled: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Keributan dinonaktifkan di grup ini
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
zizzaniaText: ({ a, line, b }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

@${a} ${line} @${b}

· ୨୧ · · ୨୧ ·  ♡`,
ditalinoNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 Anda harus menandai seseorang atau membalas pesan
  ━━✫ Contoh: ${prefix + command} @pengguna
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
ditalinoStart: ({ target }) => `🤟🏻 Memulai serangkaian belaian khusus untuk *${target}*...`,
ditalinoMiddle: () => "🤟🏻 Hampir selesai...",
ditalinoEnd: () => "👋🏻 Berlindung dari air terjun!!",
ditalinoResult: ({ target, time }) => `✨ *${target}* meledak dalam kesenangan setelah *${time}ms* 🥵`,
segaNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 Anda harus menandai seseorang atau membalas pesan
  ━━✫ Contoh: ${prefix + command} @pengguna
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
segaStart: ({ target }) => `Sekarang kita urusi ${target}... 😏`,
segaFrame: ({ frame }) => `${frame}`,
segaEnd: ({ target }) => `Oh ${target} telah mencapai puncak kenikmatan! 😋💦`,
insultNoGroup: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Perintah ini hanya dapat digunakan di grup
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
insultDisabled: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Hinaan dinonaktifkan di grup ini
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
insultNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 Siapa yang ingin Anda hina?
  ━━✫ Tandai seseorang atau balas pesan
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
insultBotLines: () => [
  `Oh tidak! Anda menemukan kelemahan saya: hinaan! Bagaimana saya akan pulih?`,
  `Ah, seni menghina bot. Anda benar-benar ahli ironi!`,
  `Luar biasa! Manusia menghina bot. Perubahan epik!`,
  `Anda benar-benar melukai saya dengan kemampuan menghina bot. Bagus!`,
  `Keahlian Anda dalam menghina bot adalah sumber hiburan favorit saya.`,
  `Menghina bot: kecerdasan besar atau kebosanan besar?`,
  `Keahlian Anda dalam menghina bot bisa jadi pelajaran.`,
  `Anda seperti Picasso dalam menghina bot, sebuah mahakarya.`,
  `Menghina bot adalah bakat tersembunyi Anda. Karier di kabaret digital akan datang?`,
  `Keberanian menghina entitas tanpa emosi. Penghargaan untuk orisinalitas!`
],
insultUserText: ({ target, line }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

@${target} ${line}

· ୨୧ · · ୨୧ ·  ♡`,
friendNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⚠️ Tandai orang yang ingin Anda kirim permintaan pertemanan
  ━━✫ Contoh: ${prefix}${command} @tag
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
friendSelf: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❌ Tidak dapat menambahkan diri sendiri sebagai teman
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
friendUserNotFound: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚫 Orang tidak ada dalam sistem
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
friendAlready: ({ target }) => `✅ @${target} sudah ada di daftar teman Anda.`,
friendPending: () => `⚠️ Permintaan pertemanan sudah berlangsung.\nTunggu jawaban atau pembatalan.`,
friendRequestText: ({ target, from }) => `👥 Permintaan pertemanan berlangsung...

@${target}, ingin menerima pertemanan dari @${from}?

> ⏳ Anda memiliki 60 detik untuk memilih.`,
friendTimeout: ({ from, target }) => `⏳ Permintaan pertemanan dibatalkan
> @${from} dan @${target} tidak merespons dalam waktu yang ditentukan.`,
friendRejected: () => `❌ Permintaan pertemanan ditolak.`,
friendAccepted: ({ from }) => `👥 Sekarang Anda dan @${from} berteman!`,
removeFriendNoTarget: () => `⚠️ Tandai orang yang ingin Anda hapus dari daftar teman.`,
removeFriendNotInList: ({ target }) => `🚫 @${target} tidak ada di daftar teman Anda.`,
removeFriendSuccess: ({ target }) => `🚫 Anda dan @${target} tidak lagi berteman.`,
friendsNoData: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⚠️ Tidak ada data pengguna ditemukan
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
friendsTitle: ({ name }) => `📜 Daftar Teman ${name}`,
friendsLastNone: () => `👤 Teman terakhir: Tidak ada`,
friendsLastSome: ({ last }) => `👤 Teman terakhir: @${last}`,
friendsListHeader: () => `👥 Daftar lengkap:`,
friendsListEmpty: () => `│   Tidak ada, selamat serigala tunggal`,
friendsError: () => `❌ Terjadi kesalahan saat menjalankan perintah.`,
lesbicaCalcNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⚠️ Anda harus menyebutkan seseorang atau membalas pesan
  ━━✫ Contoh: ${prefix + command} @pengguna
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
lesbicaCalcLine1: ({ tag, percentage }) => `@${tag} ${percentage}% lesbian, sisanya hanya kebingungan hormonal.`,
lesbicaCalcLine2: ({ tag, percentage }) => `Tes selesai: @${tag} memiliki otak yang terhubung untuk wanita sebesar ${percentage}%.`,
lesbicaCalcLine3: ({ tag, percentage }) => `💕 @${tag} melihat wanita dengan intensitas ${percentage}% porno dalam 4K.`,
pajeroCalcLine1: ({ tag, percentage }) => `@${tag} ${percentage}% pajero, ${100 - percentage}% sisanya dihabiskan mencari porno lain.`,
pajeroCalcLine2: ({ tag, percentage }) => `Laporan medis: @${tag} ${percentage}% budak penisnya sendiri.`,
pajeroCalcLine3: ({ tag, percentage }) => `🍆 @${tag} berpikir untuk masturbasi ${percentage}% waktu, sisanya dihabiskan untuk membersihkan.`,
puttanaCalcLine1: ({ tag, percentage }) => `@${tag} ${percentage}% pelacur, meteran taksi tidak pernah mati.`,
puttanaCalcLine2: ({ tag, percentage }) => `Analisis rinci: @${tag} memiliki daftar harga terbuka ${percentage}% 24/7.`,
puttanaCalcLine3: ({ tag, percentage }) => `💰 @${tag} memiliki diskon pelacur ${percentage}%, buruan sebelum naik.`,
genericCalcLine: ({ tag, percentage, cmd }) => `@${tag} ${percentage}% ${cmd}, sisanya hanya rasa malu yang menumpuk.`,
downCalcNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚨 TANDAI SESEORANG, JENIUS
  ━━✫ Contoh: ${prefix}${command} @nama
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
downCalcLine: ({ name, cmd, percent, frase, verdict }) => `*⚡️ VERDICT AKHIR ⚡️*

*Subjek:* ${name}
*Level "${cmd}":* ${percent}%

*Diagnosis:* ${frase}

*Prognosis:* ${verdict}`,
downCalcPhrases: () => [
  "Sangat tidak berguna sehingga bahkan tempat sampah daur ulang menolaknya.",
  "Jika evolusi bekerja dengan baik, Anda masih akan menjadi sel tunggal di lumpur.",
  "Anda memiliki kedalaman emosional kubangan dan kecerdasan batu basah.",
  "Jika otak membakar kalori, Anda akan gemuk bahkan saat tidur.",
  "Saat Anda berbicara, setiap neuron di planet ini melakukan satu menit keheningan untuk menghormati.",
  "Jika kebodohan adalah energi terbarukan, hanya Anda yang cukup untuk menerangi Eropa.",
  "Anda memiliki kegunaan yang sama seperti payung berlubang di tengah badai.",
  "Jika Anda adalah bug, bahkan pengembang tidak akan membuang waktu untuk memperbaikinya.",
  "Kontribusi Anda pada dunia sebanding dengan puntung rokok yang padam di kubangan.",
  "Anda memiliki koordinasi mental merpati mabuk di jalan raya."
],
downCalcVerdicts: ({ percent }) => {
  if (percent > 90) return "🔴 KASUS KLINIS TIDAK DAPAT DISEMBUHKAN. Kemanusiaan secara resmi meminta pengembalian dana.";
  if (percent > 70) return "🟠 BAHAYA BIOLOGIS. Dilarang bereproduksi tanpa izin tertulis dari WHO.";
  if (percent > 40) return "🟡 CACAT PRODUKSI. Gunakan hanya sebagai contoh dalam kursus tentang apa yang TIDAK menjadi.";
  return "🟢 ANOMALI STATISTIK. Mungkin ada otak... di suatu tempat, di bawah semua kekosongan itu.";
},
alcolNoText: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🍷 Tidak ada nama yang ditentukan, akan menggunakan milik Anda
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
alcolHigh: () => "🍾 Anda begitu penuh sehingga bahkan hati meminta pensiun dini.",
alcolMid: () => "🥂 Minum seolah besok tidak ada, tetapi besok menagih Anda.",
alcolLow: () => "🚰 Sepenuhnya sadar, satu-satunya yang berputar adalah kesedihan Anda.",
alcolResult: ({ target, percent, phrase }) => `『💬』 ══ •⊰✰⊱• ══ 『💬』

MOMEN TES ALKOHOL! 🍷
━━━━━━━━━━━━━━
${target} memiliki tingkat alkohol ${percent}%! 🍷
『💬』 ══ •⊰✰⊱• ══ 『💬』

${phrase}`,
drugNoText: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🌿 Tidak ada nama yang ditentukan, akan menggunakan milik Anda
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
drugHigh: () => "🌿 Sangat mabuk sehingga jika bernapas kuat dapat mencemari lingkungan.",
drugMid: () => "🌿 Tidak bisa menghisap, tetapi berusaha keras sehingga akan masuk ke manual medis.",
drugLow: () => "🌿 Contoh untuk diikuti... di grup ini hampir makhluk mitologis.",
drugResult: ({ target, percent, phrase }) => `『💬』 ══ •⊰✰⊱• ══ 『💬』

MOMEN TES NARKOBA! 🌿
━━━━━━━━━━━━━━
${target} memiliki tingkat zat dalam darah ${percent}%! 🌿
『💬』 ══ •⊰✰⊱• ══ 『💬』

${phrase}`,
raceCalcNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⚠️ Anda harus menandai seseorang atau membalas pesan
  ━━✫ Contoh: ${prefix + command} @pengguna
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
raceCalcLine: ({ tag, percent, label }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

@${tag} adalah ⚫ ${percent}% ${label}

· ୨୧ · · ୨୧ ·  ♡`,
cornutoNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🤔 Kurang nama yang dikhianati
  ━━✫ Gunakan: .cornuto @nama atau balas pesan
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cornutoSpecialText: () => `🤣 *BAIKLAH, INILAH RAJA PENGKHIANATAN!* 🤣
Dikatakan jika dia melepas tanduk, dia bisa membuat antena 5G📡💀`,
cornutoLow: () => "🛡 Semua tenang... untuk sekarang. Tapi tetap awasi telepon pasangan.",
cornutoMid: () => "😬 Beberapa chat diarsipkan terlalu banyak... kecurigaan di udara.",
cornutoHigh: () => "👀 Cornometer dalam siaga tinggi! Tanduk sedang memuat 78%.",
cornutoMax: () => "🫣 LEVEL DUNIA: jika Anda membuka Google Maps, segitiga tanduk muncul di kepala Anda.",
cornutoAdviceHigh: () => "🔔 Nasihat: jangan berbalik... bisa digunakan sebagai pegangan. 🤣",
cornutoAdviceLow: () => "😌 Bernapaslah, untuk saat ini Anda berada di limbo antara bahagia dan anggota klub masa depan.",
cornutoResult: ({ target, percent, message, advice }) => `🔍 KALKULATOR PENGKHIANATAN 🔍

👤 ${target}
📈 Tingkat Pengkhianatan: ${percent}%
${message}

${advice}`,
}