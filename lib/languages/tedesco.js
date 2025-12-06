export default {
  
  // Allgemeines System
  smsAvisoMG: () => "⚠️ Achtung!",
  smsWait: () => "⏳ Lade...",
  smsError: () => "❌ Ein Fehler ist aufgetreten",
  smsSuccess: () => "✅ Operation erfolgreich abgeschlossen",
  smsProcessing: () => "🔄 Verarbeitung läuft...",
  
  // Allgemeine Befehle
  smsOnlyGroup: () => "❌ Dieser Befehl funktioniert nur in Gruppen!",
  smsOnlyAdmin: () => "❌ Nur Admins können diesen Befehl verwenden!",
  smsOnlyOwner: () => "❌ Nur der Besitzer kann diesen Befehl verwenden!",
  smsOnlyPremium: () => "💎 Dieser Befehl ist nur für Premium-Nutzer verfügbar!",
  smsInvalidCommand: () => "❌ Ungültiger Befehl",
  smsNoText: () => "❌ Gib einen Text ein",
  smsNoMedia: () => "❌ Sende oder antworte auf ein Medium",
  
  // AI und ChatGPT
  aiNoQuery: () => "⚠️ *Gib eine gültige Anfrage für ChatGPT ein!*\n\n📌 Beispiele:\n{prefix}{command} Erzähl mir einen Witz\n{prefix}{command} Schlage mir 5 Fantasy-Bücher vor\n{prefix}{command} HTML-Code für eine Login-Seite",
  aiError: () => "❌ Bei der Generierung der Antwort ist ein Fehler aufgetreten. Versuche es später erneut.",
  aiProcessing: () => "🤖 Ich verarbeite deine Anfrage...",
  
  // Willkommens-/Abschiedssystem
  welcomeTitle: () => "✧ WILLKOMMEN! ✧",
  goodbyeTitle: () => "✧ AUF WIEDERSEHEN! ✧",
  welcomeDefault: (user, group, members) => `*Willkommen* @${user} 🎉\n┊ *Gruppe:* ${group}\n╰► *Mitglieder:* ${members}`,
  goodbyeDefault: (user, members) => `*Auf Wiedersehen* @${user} 👋\n┊ Hat die Gruppe verlassen\n╰► *Verbleibende Mitglieder:* ${members}`,
  
  welcomeSetHelp: () => `🎉 *Willkommensnachricht einstellen*

*Verwendung:* {command} <Nachricht>

*Verfügbare Variablen:*
• @user - Benutzererwähnung
• $name - Benutzername  
• $group - Gruppenname
• $members - Anzahl Mitglieder
• $number - Telefonnummer
• $tag - Benutzer-Tag (Alias für @user)

*Beispiel:*
{command} Hallo @user! 👋 Willkommen in $group! Wir sind jetzt $members Mitglieder! 🎉

*Um zur Standardnachricht zurückzukehren:*
{command} reset`,
  
  goodbyeSetHelp: () => `👋 *Abschiedsnachricht einstellen*

*Verwendung:* {command} <Nachricht>

*Verfügbare Variablen:*
• @user - Benutzererwähnung
• $name - Benutzername  
• $group - Gruppenname
• $members - Anzahl Mitglieder
• $number - Telefonnummer
• $tag - Benutzer-Tag (Alias für @user)

*Beispiel:*
{command} Auf Wiedersehen @user! 😢 Wir werden dich in $group vermissen. Wir bleiben bei $members Mitgliedern.

*Um zur Standardnachricht zurückzukehren:*
{command} reset`,
  
  // Warnsystem
  warnMentionUser: () => "❌ Du musst einen Benutzer erwähnen oder auf seine Nachricht antworten.",
  warnBotImmune: () => "🚫 Du kannst den Bot nicht verwarnen.",
  warnUserNotFound: () => "❌ Benutzer nicht in der Datenbank gefunden.",
  warnMessage: (params) => `⚠️ 𝐕𝐄𝐑𝐖𝐀𝐑𝐍𝐔𝐍𝐆 {warns}/𝟑 (𝟑 𝐕𝐞𝐫𝐰𝐚𝐫𝐧𝐮𝐧𝐠𝐞𝐧=𝐁𝐚𝐧𝐧)`,
  warnBanMessage: () => "⛔ 𝐁𝐄𝐍𝐔𝐓𝐙𝐄𝐑 𝐄𝐍𝐓𝐅𝐄𝐑𝐍𝐓 𝐍𝐀𝐂𝐇 𝟑 𝐕𝐄𝐑𝐖𝐀𝐑𝐍𝐔𝐍𝐆𝐄𝐍",
  
  menuownerChooseMenu: () => "Wähle ein Menü:",
menuownerMainMenuButton: () => "🏠 Hauptmenü",
menuownerAdminMenuButton: () => "🛡️ Admin-Menü",
menuownerSecurityMenuButton: () => "🚨 Sicherheitsmenü",
menuownerGroupMenuButton: () => "👥 Gruppenmenü",
menuownerAiMenuButton: () => "🤖 KI-Menü",
menuownerTitle: () => "𝑩𝑬𝑺𝑰𝑻𝒁𝑬𝑹𝑴𝑬𝑵𝑼",
menuownerVersionLabel: () => "𝑽𝑬𝑹𝑺𝑰𝑶𝑵",
menuownerCollabLabel: () => "𝐙𝐔𝐒𝐀𝐌𝐌𝐄𝐍𝐀𝐑𝐁𝐄𝐈𝐓",
menuownerSupportLabel: () => "𝐔𝐍𝐓𝐄𝐑𝐒𝐓𝐔𝐓𝐙𝐔𝐍𝐆",
menuownerReservedCommands: () => "𝑩𝑬𝑭𝑬𝑯𝑳𝑬 𝑽𝑶𝑴 𝑩𝑬𝑺𝑰𝑻𝒁𝑬𝑹 𝑮𝑬𝑺𝑷𝑬𝑹𝑹𝑻",
menuownerManageCommand: () => "verwalten",
menuownerSetGroupsCommand: () => "setzgruppen",
menuownerAddGroupsCommand: () => "gruppenhinzufügen",
menuownerResetGroupsCommand: () => "gruppenzurücksetzen",
menuownerBanUserCommand: () => "benutzerbannen",
menuownerUnbanUserCommand: () => "benutzerentbannen",
menuownerCleanupCommand: () => "bereinigung",
menuownerGetFileCommand: () => "dateiholen",
menuownerSaveCommand: () => "pluginspeichern",
menuownerDpCommand: () => "pluginlöschen",
menuownerGetPluginCommand: () => "plugingeben",
menuownerJoinCommand: () => "beitreten",
menuownerOutCommand: () => "verlassen",
menuownerPrefixCommand: () => "präfix",
menuownerResetPrefixCommand: () => "präfixzurücksetzen",
menuownerGodModeCommand: () => "gottmodus",
menuownerResetCommand: () => "zurücksetzen",
menuownerAddCommand: () => "hinzufügen",
menuownerRemoveCommand: () => "entfernen",
menuownerEveryGroupCommand: () => "jede gruppe",
menuownerBanChatCommand: () => "chatbannen",
menuownerUnbanChatCommand: () => "chatentbannen",
menuownerRestartCommand: () => "neustart",
menuownerShutdownBotCommand: () => "botausschalten",
menuownerUpdateBotCommand: () => "botaktualisieren",
menuownerPluginParam: () => "plugin",
menuownerLinkParam: () => "link",
menuownerAutoAdminParam: () => "autoadmin",
menuownerNumMessagesParam: () => "anz. nachrichten",
menuownerCommandParam: () => "befehl",
menuownerGroupParam: () => "gruppe",

  // Menüsystem
  mainMenuTitle: () => '𝑯𝑨𝑼𝑷𝑻𝑴𝑬𝑵𝑼',
  adminMenuTitle: () => '𝑨𝑫𝑴𝑰𝑵𝑴𝑬𝑵𝑼',
  adminCommands: () => '𝑨𝑫𝑴𝑰𝑵𝑩𝑬𝑭𝑬𝑯𝑳𝑬',
  chooseMenu: () => 'Wähle ein Menü:',
  mainMenuButton: () => '🏠 Hauptmenü',
  ownerMenuButton: () => '👑 Besitzermenü',
  securityMenuButton: () => '🚨 Sicherheitsmenü',
  groupMenuButton: () => '👥 Gruppenmenü',
  aiMenuButton: () => '🤖 KI-Menü',
  promoteCommand: () => 'befördern /adminhinzufügen',
  demoteCommand: () => 'degradieren /adminentfernen',
  warnCommands: () => 'warn / unwarn',
  muteCommands: () => 'stumm / entsperren',
  setDescCommand: () => 'setzbeschreibung',
  setScheduleCommand: () => 'setzezeitplan',
  setNameCommand: () => 'setzename',
  hidetagCommand: () => 'hidetag',
  kickCommand: () => 'kick / rauswerfen',
  adminsCommand: () => 'admins',
  tagallCommand: () => 'tagall',
  openCloseCommand: () => 'offen / geschlossen',
  setWelcomeCommand: () => 'setzewillkommen',
  setByeCommand: () => 'setzetschüss',
  inactiveCommand: () => 'inaktive',
  listNumCommand: () => 'listenum + präfix',
  cleanupCommand: () => 'bereinigung + präfix',
  clearPlayCommand: () => 'clearplay',
  rulesCommand: () => 'regeln/setzregeln',
  quarantineCommand: () => 'quarantäne',
  dsCommand: () => 'ds',
  listWarnCommand: () => 'listewarn',
  linkCommand: () => 'link',
  linkQrCommand: () => 'linkqr',
  poweredBy: () => 'ᴘᴏᴡᴇʀᴇᴅ ʙʏ',
  
  // Gruppenmenü
  groupMenuTitle: () => '𝑮𝑹𝑼𝑷𝑷𝑬𝑵𝑴𝑬𝑵𝑼',
  memberCommands: () => '𝑩𝑬𝑭𝑬𝑯𝑳𝑬 𝑭𝑼𝑬𝑹 𝑴𝑰𝑻𝑮𝑳𝑰𝑬𝑫𝑬𝑹',
  musicAudioSection: () => 'MUSIK & AUDIO',
  infoUtilitySection: () => 'INFORMATIONEN & NÜTZLICHES',
  imageEditSection: () => 'BILDER & BEARBEITUNG',
  pokemonSection: () => 'POKEMON',
  gangSystemSection: () => 'GANG SYSTEM',
  gamesCasinoSection: () => 'SPIELE & CASINO',
  economyRankingSection: () => 'WIRTSCHAFT & RANGLISTEN',
  socialInteractionSection: () => 'SOZIALE INTERAKTIONEN',
  howMuchSection: () => 'WIE VIEL IST?',
  personalityTestSection: () => 'PERSÖNLICHKEITSTEST',
  songCommand: () => 'lied',
  audioCommand: () => 'audio',
  videoCommand: () => 'video',
  artistTitleCommand: () => 'künstler-titel',
  cityCommand: () => 'stadt',
  textCommand: () => 'text',
  groupCommand: () => 'gruppe',
  repoCommand: () => 'repo',
  userCommand: () => 'benutzer',
  topicCommand: () => 'thema',
  checkSiteCommand: () => 'check website',
  photoToStickerCommand: () => 'foto zu sticker',
  stickerToPhotoCommand: () => 'sticker zu foto',
  improveQualityCommand: () => 'verbessere fotogualität',
  photoCommand: () => 'foto',
  hiddenPhotoCommand: () => 'verstecktes foto',
  memeCommand: () => 'meme',
  fromStickerCommand: () => 'von sticker',
  blurImageCommand: () => 'bild unscharf',
  comingSoonCommand: () => 'demnächst',
  quantityCommand: () => 'menge',
  headsOrTailsCommand: () => 'kopf oder zahl',
  mathProblemCommand: () => 'matheproblem',
  rockPaperScissorsCommand: () => 'schere stein papier',
  pokemonInfoCommand: () => 'Pokémon info',
  balanceCommand: () => 'guthaben',
  topUsersCommand: () => 'top benutzer',
  buyUCCommand: () => 'UC kaufen',
  withdrawUCCommand: () => 'UC von bank',
  earnXPCommand: () => 'verdiene XP',
  proposalCommand: () => 'vorschlag',
  endRelationshipCommand: () => 'beziehung beenden',
  affinityCommand: () => 'affinität',
  charmCommand: () => 'charme',
  createFightCommand: () => 'streit erstellen',
  truthOrDareCommand: () => 'wahrheit oder pflicht',
  versionLabel: () => '𝑽𝑬𝑹𝑺𝑰𝑶𝑵',
  supportLabel: () => '𝐔𝐍𝐓𝐄𝐑𝐒𝐓𝐔𝐓𝐙𝐔𝐍𝐆',
  
  // Besitzermenü
  ownerMenuTitle: () => '𝑩𝑬𝑺𝑰𝑻𝒁𝑬𝑹𝑴𝑬𝑵𝑼',
  ownerReservedCommands: () => '𝑩𝑬𝑭𝑬𝑯𝑳𝑬 𝑽𝑶𝑴 𝑩𝑬𝑺𝑰𝑻𝒁𝑬𝑹 𝑮𝑬𝑺𝑷𝑬𝑹𝑹𝑻',
  setNameCommand: () => 'setzename',
  resetNameCommand: () => 'namenzurücksetzen',
  manageCommand: () => 'verwalten',
  setGroupsCommand: () => 'setzgruppen',
  addGroupsCommand: () => 'gruppenhinzufügen',
  resetGroupsCommand: () => 'gruppenzurücksetzen',
  setPpCommand: () => 'setzpp',
  banUserCommand: () => 'benutzerbannen',
  unbanUserCommand: () => 'benutzerentbannen',
  blockUserCommand: () => 'benutzerblockieren',
  unblockUserCommand: () => 'benutzerentblockieren',
  getFileCommand: () => 'dateiholen',
  saveCommand: () => 'speichern',
  dpCommand: () => 'dp',
  getPluginCommand: () => 'plugingeben',
  joinCommand: () => 'beitreten',
  outCommand: () => 'verlassen',
  prefixCommand: () => 'präfix',
  resetPrefixCommand: () => 'präfixzurücksetzen',
  godModeCommand: () => 'gottmodus',
  resetCommand: () => 'zurücksetzen',
  addCommand: () => 'hinzufügen',
  removeCommand: () => 'entfernen',
  everyGroupCommand: () => 'jede gruppe',
  banChatCommand: () => 'chatbannen',
  unbanChatCommand: () => 'chatentbannen',
  restartCommand: () => 'neustart',
  shutdownBotCommand: () => 'botausschalten',
  updateBotCommand: () => 'botaktualisieren',
  imageParam: () => 'bild',
  pluginParam: () => 'plugin',
  linkParam: () => 'link',
  autoAdminParam: () => 'autoadmin',
  numMessagesParam: () => 'anz. nachrichten',
  commandParam: () => 'befehl',
  groupParam: () => 'gruppe',
  
  // KI-Menü
  aiMenuTitle: () => '𝑩𝑶𝑻𝑴𝑬𝑵𝑼',
  generalCommands: () => '𝑨𝑳𝑳𝑮𝑬𝑴𝑬𝑰𝑵𝑬 𝑩𝑬𝑭𝑬𝑯𝑳𝑬',
  iaCommand: () => 'ia',
  alyaCommand: () => 'Alya',
  geminiCommand: () => 'gemini',
  chatgptCommand: () => 'chatgpt',
  deepseekCommand: () => 'deepseek',
  voiceCommand: () => 'sprache',
  imageCommand: () => 'bild',
  image2Command: () => 'bild2',
  image3Command: () => 'bild3',
  animalInfoCommand: () => 'tierinfo',
  kcalCommand: () => 'kcal',
  summaryCommand: () => 'zusammenfassung',
  recipeCommand: () => 'rezept',
  
  // Sicherheitsmenü
  securityMenuTitle: () => '𝑭𝑼𝑵𝑲𝑻𝑰𝑶𝑵𝑺𝑴𝑬𝑵𝑼',
  activateDisable: () => '𝐀𝐊𝐓𝐈𝐕𝐈𝐄𝐑𝐄𝐍/𝐃𝐄𝐀𝐊𝐓𝐈𝐕𝐈𝐄𝐑𝐄𝐍',
  howToUse: () => '𝐖𝐈𝐄 𝐌𝐀𝐍 𝐕𝐄𝐑𝐖𝐄𝐍𝐃𝐄𝐓',
  activateFunction: () => 'aktiviere [funktion]',
  disableFunction: () => 'deaktiviere [funktion]',

// Ping/Status Plugin
systemStatusTitle: () => "⋆ ★ 🚀 𝑺𝑻𝑨𝑻𝑼𝑺 𝑺𝑰𝑺𝑻𝑬𝑴 🚀 ★ ⋆",
uptime: () => "⌛ *Uptime:*",
ping: () => "⚡ *Ping:*",
cpuLabel: () => "💻 *CPU:*",
cpuUsage: () => "🔋 *Auslastung:*",
ramLabel: () => "💾 *RAM:*",
freeRam: () => "🟢 *Frei:*",
version: () => "Version:",

systemStatus: (params) => `${params?.title || '⋆ ★ 🚀 𝑺𝑻𝑨𝑻𝑼𝑺 𝑺𝑰𝑺𝑻𝑬𝑴 🚀 ★ ⋆'}
╭♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩
୧ ⌛ *Uptime:* ${params?.uptime || 'N/A'}
୧ ⚡ *Ping:* ${params?.ping || 'N/A'} ms
  💻 *CPU:* ${params?.cpuModel || 'Unbekannt'}
  🔋 *Auslastung:* ${params?.cpuSpeed || 'N/A'} MHz
  💾 *RAM:* ${params?.ramUsed || 'N/A'} / ${params?.ramTotal || 'N/A'}
  🟢 *Frei:* ${params?.ramFree || 'N/A'}
╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩`,

menuFooter: () => "Wähle ein Menü:",
menuAdmin: () => "🛡️ Admin-Menü",
menuOwner: () => "👑 Besitzermenü",
menuSecurity: () => "🚨 Sicherheitsmenü",
menuGroup: () => "👥 Gruppenmenü",
menuAI: () => "🤖 KI-Menü",
mainMenuTitle: () => "𝑩𝑶𝑻𝑴𝑬𝑵𝑼",
staffCommand: () => "team",
candidatesCommand: () => "kandidaten",
installCommand: () => "installieren",
guideCommand: () => "anleitung",
channelsCommand: () => "kanäle",
systemCommand: () => "system",
faqCommand: () => "FAQ",
pingCommand: () => "ping",
reportCommand: () => "melden",
suggestCommand: () => "vorschlagen",
newsCommand: () => "neuigkeiten",
versionLabel: () => "𝑽𝑬𝑹𝑺𝑰𝑶𝑵",
usersLabel: () => "𝐁𝐄𝐍𝐔𝐓𝐙𝐄𝐑",
chooseMenu: () => "Wähle ein Menü:",
mainMenuButton: () => "🏠 Hauptmenü",
ownerMenuButton: () => "👑 Besitzermenü",
securityMenuButton: () => "🚨 Sicherheitsmenü",
groupMenuButton: () => "👥 Gruppenmenü",
aiMenuButton: () => "🤖 KI-Menü",
adminMenuTitle: () => "𝑨𝑫𝑴𝑰𝑵𝑴𝑬𝑵𝑼",
promoteCommand: () => "p /adminhinzufügen",
demoteCommand: () => "r /adminentfernen",
warnCommands: () => "warn / unwarn",
setScheduleCommand: () => "setzezeitplan",
setNameCommand: () => "setzename",
hidetagCommand: () => "hidetag",
tagallCommand: () => "tagall",
kickCommand: () => "kick / rauswerfen",
adminsCommand: () => "admins",
openCloseCommand: () => "offen / geschlossen",
setWelcomeCommand: () => "setzewillkommen",
setByeCommand: () => "setzetschüss",
inactiveCommand: () => "inaktive",
listNumCommand: () => "listenum + präfix",
cleanupCommand: () => "bereinigung + präfix",
rulesCommand: () => "regeln /setzregeln",
listWarnCommand: () => "listewarn",
linkCommand: () => "link",
linkQrCommand: () => "linkqr",
requestsCommand: () => "anfragen",
adminCommands: () => "𝑨𝑫𝑴𝑰𝑵𝑩𝑬𝑭𝑬𝑯𝑳𝑬",
poweredBy: () => "ᴘᴏᴡᴇʀᴇᴅ ʙʏ",
candidatesTitle: () => "🚀 𝐁𝐄𝐖𝐄𝐑𝐁𝐔𝐍𝐆 𝐅𝐔𝐄𝐑 𝐃𝐀𝐒 𝐂𝐇𝐀𝐓𝐔𝐍𝐈𝐓𝐘 𝐓𝐄𝐀𝐌 🚀",
candidatesIntro: () => "Möchtest du Teil des ChatUnity Teams werden, Erfahrung sammeln und als Teammitglied anerkannt werden?",
candidatesCall: () => "Dies ist deine Chance! 𝐅ü𝐥𝐥𝐞 𝐝𝐚𝐬 𝐅𝐨𝐫𝐦𝐮𝐥𝐚𝐫 𝐚𝐮𝐬 (𝐚𝐧𝐨𝐧𝐲𝐦) um dich zu bewerben und deine Fähigkeiten zu zeigen.",
candidatesWhatAwaits: () => "🔥 𝐖𝐚𝐬 𝐝𝐢𝐜𝐡 𝐞𝐫𝐰𝐚𝐫𝐭𝐞𝐭:",
candidatesBenefit1: () => "✨ 𝐎𝐟𝐟𝐢𝐳𝐢𝐞𝐥𝐥𝐞 𝐀𝐧𝐞𝐫𝐤𝐞𝐧𝐧𝐮𝐧𝐠 im Bot als offizieller Mitarbeiter",
candidatesBenefit2: () => "💼 𝐏𝐫𝐚𝐤𝐭𝐢𝐬𝐜𝐡𝐞 𝐄𝐫𝐟𝐚𝐡𝐫𝐮𝐧𝐠 in der Welt der Bots und Community-Verwaltung",
candidatesBenefit3: () => "🎯 𝐄𝐱𝐤𝐥𝐮𝐬𝐢𝐯𝐞𝐫 𝐙𝐮𝐠𝐚𝐧𝐠 zu Beta-Bots und Vorab-Funktionen",
candidatesBenefit4: () => "🤝 𝐃𝐢𝐫𝐞𝐤𝐭𝐞 𝐙𝐮𝐬𝐚𝐦𝐦𝐞𝐧𝐚𝐫𝐛𝐞𝐢𝐭 mit dem ChatUnity Entwicklungsteam",
candidatesCTA: () => "Verpasse nicht diese einzigartige Gelegenheit! 𝐁𝐞𝐰𝐞𝐫𝐛𝐞 𝐝𝐢𝐜𝐡 𝐬𝐨𝐟𝐨𝐫𝐭 und zeige, dass du das Zeug dazu hast, einen Unterschied zu machen!",
candidatesFormLabel: () => "📋 𝐁𝐞𝐰𝐞𝐫𝐛𝐮𝐧𝐠𝐬𝐟𝐨𝐫𝐦𝐮𝐥𝐚𝐫:",

installTitle: () => "⋆ ︵︵ ★ 💬 𝐂𝐇𝐀𝐓𝐔𝐍𝐈𝐓𝐘-𝐁𝐎𝐓 💬 ★ ︵︵ ⋆",
installIntro: () => "Möchtest du ChatUnity Bot auf deinem Gerät installieren?",
installDescription: () => "Folge der vollständigen Installationsanleitung auf GitHub mit allen detaillierten Schritten für Termux, Windows und andere Betriebssysteme.",
installGuideLabel: () => "📖 𝐕𝐨𝐥𝐥𝐬𝐭ä𝐧𝐝𝐢𝐠𝐞 𝐀𝐧𝐥𝐞𝐢𝐭𝐮𝐧𝐠",
installRepoLabel: () => "📂 𝐆𝐢𝐭𝐇𝐮𝐛 𝐑𝐞𝐩𝐨𝐬𝐢𝐭𝐨𝐫𝐲",
installVideoLabel: () => "🎥 𝐕𝐢𝐝𝐞𝐨 𝐓𝐮𝐭𝐨𝐫𝐢𝐚𝐥",
installFeatures: () => "✨ 𝐖𝐚𝐬 𝐝𝐮 𝐟𝐢𝐧𝐝𝐞𝐬𝐭:",
installFeature1: () => "📱 Vollständige Installation für Termux",
installFeature2: () => "💻 Installation für Windows und andere OS",
installFeature3: () => "🔧 Lösung häufiger Probleme",
installFeature4: () => "📝 Automatische Setup-Befehle",
installCTA: () => "Besuche das GitHub Repository um mit der Installation zu beginnen und alle Funktionen des Bots zu entdecken!",
installNeedHelp: () => "Brauchst du Hilfe? Tritt unserem Support-Kanal bei!",

systemTitle: () => "⋆ ︵★ 🖥️ 𝐒𝐓𝐀𝐓𝐔𝐒 𝐃𝐄𝐒 𝐒𝐘𝐒𝐓𝐄𝐌𝐒 ★︵ ⋆",
systemHost: () => "🚩 *Host*",
systemOS: () => "🏆 *Betriebssystem*",
systemArch: () => "💫 *Architektur*",
systemTotalRAM: () => "🥷 *Gesamt-RAM*",
systemFreeRAM: () => "🚀 *Freier RAM*",
systemUsedRAM: () => "⌛ *Verwendeter RAM*",
systemUptime: () => "🕒 *Uptime*",
systemNodeMemory: () => "🪴 *Node.js Speicher:*",
systemRSS: () => "RSS",
systemHeapTotal: () => "Heap Gesamt",
systemHeapUsed: () => "Heap Verwendet",
systemExternal: () => "Extern",
systemArrayBuffer: () => "ArrayBuffer",
systemDiskSpace: () => "☁️ *Festplattenspeicher:*",
systemDiskTotal: () => "Gesamt",
systemDiskUsed: () => "Verwendet",
systemDiskAvailable: () => "Verfügbar",
systemDiskPercent: () => "Nutzungsprozentsatz",
systemDiskError: () => "❌ Fehler beim Abrufen des Festplattenspeichers.",

reportNoText: () => "⚠️ Gib eine detaillierte Beschreibung des Problems ein, das du melden möchtest.",
reportTooShort: () => "⚠️ Die Beschreibung ist zu kurz. Gib mindestens 10 Zeichen für eine vollständige Meldung an.",
reportTooLong: () => "⚠️ Die Beschreibung überschreitet das Maximum von 1000 Zeichen. Kürze den Text.",
reportTitle: () => "❌️ `M𝐄𝐋𝐃𝐔𝐍𝐆` ❌️",
reportNumber: () => "📱 Nummer",
reportUser: () => "👤 Benutzer",
reportMessage: () => "📝 Nachricht",
reportQuote: () => "📎 Zitat",
reportSuccess: () => "✅ Deine Meldung wurde erfolgreich an das Entwicklungsteam gesendet.\n\n_⚠️ Achtung: Falsche oder unangemessene Meldungen können zu Einschränkungen bei der Bot-Nutzung führen._",
reportChannelTitle: () => "⚠️ FEHLERMELDUNG ⚠️",
reportChannelBody: () => "Neue Meldung erhalten",
reportAnonymous: () => "Anonym",
suggestNoText: () => "⚠️ Gib deinen Befehlsvorschlag ein.\n\n*Beispiel:* .vorschlage (Befehlsname) (Funktionsbeschreibung)",
suggestTooShort: () => "⚠️ Die Beschreibung ist zu kurz. Gib mindestens 10 Zeichen für einen vollständigen Vorschlag an.",
suggestTooLong: () => "⚠️ Die Beschreibung überschreitet das Maximum von 1000 Zeichen. Kürze den Text.",
suggestTitle: () => "💡 `V𝐎𝐑𝐒𝐂𝐇𝐋𝐀𝐆` 💡",
suggestNumber: () => "📱 Nummer",
suggestUser: () => "👤 Benutzer",
suggestMessage: () => "📝 Vorschlag",
suggestQuote: () => "📎 Zitat",
suggestSuccess: () => "✅ Dein Vorschlag wurde erfolgreich an das Entwicklungsteam gesendet.\n\n_⚠️ Achtung: Vorschläge für rechtswidrige oder unangemessene Befehle können zu Einschränkungen bei der Bot-Nutzung führen._",
suggestChannelTitle: () => "💡 BEFEHLSVORSCHLAG 💡",
suggestChannelBody: () => "Neuer Vorschlag erhalten",
suggestAnonymous: () => "Anonym",
unwarnNoUser: () => "❌ Du musst einen Benutzer erwähnen oder auf seine Nachricht antworten, um eine Verwarnung zu entfernen.",
unwarnUserNotFound: () => "❌ Benutzer nicht in der Datenbank gefunden.",
unwarnNoWarnings: () => "ℹ️ Dieser Benutzer hat keine aktiven Verwarnungen zum Entfernen.",
unwarnSuccess: (params) => `✅ 𝐕𝐞𝐫𝐰𝐚𝐫𝐧𝐮𝐧𝐠 𝐞𝐧𝐭𝐟𝐞𝐫𝐧𝐭\n\n𝐕𝐞𝐫𝐛𝐥𝐞𝐢𝐛𝐞𝐧𝐝𝐞 𝐕𝐞𝐫𝐰𝐚𝐫𝐧𝐮𝐧𝐠𝐞𝐧: ${params?.remaining || 0}/3`,
setnameNoText: () => "⚠️ Gib den neuen Namen ein, den du der Gruppe zuweisen möchtest.",
setnameSuccess: () => "✅ 𝐆𝐫𝐮𝐩𝐩𝐞𝐧𝐧𝐚𝐦𝐞 𝐞𝐫𝐟𝐨𝐥𝐠𝐫𝐞𝐢𝐜𝐡 𝐠𝐞ä𝐧𝐝𝐞𝐫𝐭!",
setnameError: () => "❌ Beim Ändern des Gruppennamens ist ein Fehler aufgetreten. Versuche es erneut.",
hidetagDefaultMessage: () => "📢 Nachricht an alle",
hidetagStickerError: () => "❌ Sticker konnte nicht heruntergeladen werden. Versuche es erneut.",
tagallTitle: () => "⋆ ︵︵ ★ 📢 𝐌𝐈𝐓𝐆𝐋𝐈𝐄𝐃𝐄𝐑 𝐃𝐄𝐑 𝐆𝐑𝐔𝐏𝐏𝐄 ★ ︵︵ ⋆",
tagallBot: () => "🤖 BOT",
tagallMessage: () => "📝 Nachricht",
tagallEmptyMessage: () => "📢 Achtung Gruppenmitglieder!",
tagallMemberCount: (params) => `👥 Gesamtmitglieder: ${params?.count || 0}`,
adminsCooldown: (params) => `⏳ Du musst noch ${params?.time || 'etwas'} warten, bevor du die Admins erneut aufrufen kannst.\n\n_Dieser Befehl hat ein Nutzungslimit, um Missbrauch zu vermeiden._`,
adminsTitle: () => "⋆︵★ 🔔 𝐀𝐃𝐌𝐈𝐍𝐈𝐒𝐓𝐑𝐀𝐓𝐎𝐑𝐄𝐍 ★︵⋆",
adminsMessage: () => "📝 Grund des Aufrufs",
adminsWarning: () => "⚠️ Dieser Befehl sollte nur für dringende Probleme oder wichtige Situationen verwendet werden. Missbrauch kann zum Entfernen aus der Gruppe führen.",
adminsNoMessage: () => "Unterstützungsanfrage",
adminsNotification: () => "🔔 Die Administratoren wurden benachrichtigt",
adminsExternalTitle: (params) => `${params?.groupName || 'Gruppe'}`,
adminsExternalBody: () => "Aufruf an Administratoren...",
groupOpen: () => "✅ 𝐂𝐡𝐚𝐭 𝐟ü𝐫 𝐚𝐥𝐥𝐞 𝐠𝐞𝐨𝐟𝐟𝐧𝐞𝐭\n\n୧ Alle Mitglieder können jetzt Nachrichten in der Gruppe senden.",
groupClose: () => "🔒 𝐂𝐡𝐚𝐭 𝐧𝐮𝐫 𝐟ü𝐫 𝐀𝐝𝐦𝐢𝐧𝐬\n\n୧ Nur Administratoren können Nachrichten in der Gruppe senden.",
setwelcomeNoText: () => "⚠️ Gib die personalisierte Willkommensnachricht ein, die du konfigurieren möchtest.\n\n*Verfügbare Variablen:*\n୧ @user - Erwähnt den Benutzer\n୧ @group - Gruppenname\n୧ @desc - Gruppenbeschreibung",
setwelcomeSuccess: () => "✅ 𝐖𝐢𝐥𝐥𝐤𝐨𝐦𝐦𝐞𝐧𝐬𝐧𝐚𝐜𝐡𝐫𝐢𝐜𝐡𝐭 𝐤𝐨𝐧𝐟𝐢𝐠𝐮𝐫𝐢𝐞𝐫𝐭\n\n୧ Die Willkommensnachricht wurde erfolgreich für diese Gruppe eingestellt.",
setbyeNoText: () => "⚠️ Gib die personalisierte Abschiedsnachricht ein, die du konfigurieren möchtest.\n\n*Verfügbare Variablen:*\n୧ @user - Erwähnt den Benutzer\n୧ @group - Gruppenname",
setbyeSuccess: () => "✅ 𝐀𝐛𝐬𝐜𝐡𝐢𝐞𝐝𝐬𝐧𝐚𝐜𝐡𝐫𝐢𝐜𝐡𝐭 𝐤𝐨𝐧𝐟𝐢𝐠𝐮𝐫𝐢𝐞𝐫𝐭\n\n୧ Die Abschiedsnachricht wurde erfolgreich für diese Gruppe eingestellt.",
inactiveMenuTitle: () => "🌙 Verwaltung inaktiver Mitglieder",
inactiveMenuFound: (params) => `💤 Inaktive Mitglieder gefunden: *${params?.inactive || 0}/${params?.total || 0}*\n\n⏰ Inaktiv seit über 7 Tagen\n\nWähle eine Option unten:`,
inactiveListTitle: () => "📋 Liste inaktiver Mitglieder",
inactiveListNone: () => "✅ Keine inaktiven Mitglieder gefunden!\n\n🎉 Alle Mitglieder sind in der Gruppe aktiv.",
inactiveListItem: (params) => `${params?.index}. @${params?.user}`,
inactiveRemoveStart: (params) => `⚠️ Entfernung inaktiver: Du bist dabei *${params?.count}* Mitglieder zu löschen.\n\n❗ Diese Aktion kann nicht rückgängig gemacht werden!\n\nBestätigst du, dass du fortfahren möchtest?`,
inactiveRemoveSuccess: (params) => `✅ Entfernung abgeschlossen!\n\n🗑️ Entfernte Mitglieder: *${params?.removed}*${params?.errors ? `\n⚠️ Fehler: *${params.errors}* Mitglieder nicht entfernt` : ''}`,
inactiveRemoveNone: () => "✅ Keine Mitglieder zum Entfernen! Alle Mitglieder der Gruppe sind aktiv.",
inactiveConfirmTitle: () => "⚠️ Entfernung bestätigen",
inactiveBackButton: () => "🔄 Zurück zum Menü",
inactiveListButton: () => "📋 Liste anzeigen",
inactiveRemoveButton: () => "🗑️ Inaktive entfernen",
inactiveConfirmButton: () => "✅ Entfernung bestätigen",
inactiveCancelButton: () => "❌ Abbrechen",
inactiveNotAdmin: () => "❌ Nur *Admins* können diese Funktion verwenden.",
inactiveUnknown: () => "❌ Ungültige Option. Verwende die Buttons.",
inactiveResultTitle: () => "📊 Ergebnis der Entfernung inaktiver",
inactiveGroupLabel: () => "👥 Gruppe",
inactiveFooter: () => "Verwaltung inaktiver Gruppen",
noBotAdmin: () => "⚠️ Ich muss Admin sein, um Benutzer zu entfernen",
  noMention: () => "⚠️ Erwähne oder antworte auf die Nachricht der zu entfernenden Person",
  cannotRemoveOwner: () => "⚠️ Du kannst den Bot-Ersteller nicht entfernen",
  cannotRemoveBot: () => "⚠️ Du kannst den Bot selbst nicht entfernen",
  cannotRemoveSelf: () => "⚠️ Du kannst dich nicht selbst entfernen",
  targetIsGroupOwner: () => "⚠️ Du kannst den Gruppenersteller nicht entfernen",
  targetIsAdmin: () => "⚠️ Du kannst keinen Gruppen-Admin entfernen",
  kickSuccess: (params) => `╭─────────────────\n│ ✦ @${params?.target} wurde entfernt\n│ ✦ von @${params?.executor}${params?.reason ? `\n│\n│ 📝 Grund: ${params.reason}` : ''}\n╰─────────────────`,
  title: () => "⚠️ Verwarnter Benutzer",
totalUsers: (params) => `Gesamt: ${params?.count || 0} Benutzer`,
userEntry: (params) => `${params?.index}. ${params?.name || 'Unbekannt'} (${params?.warns}/3)`,
noWarns: () => "✓ Kein Benutzer hat Verwarnungen erhalten",
unknownUser: () => "Unbekannt",
noBotAdmin: () => "⚠️ Ich muss Admin sein, um den Gruppenlink abzurufen",
qrCaption: (params) => `╭─────────────────\n│ 🔗 QR-Code der Gruppe\n│ *${params?.groupName}*\n│\n│ Scanne zum Beitreten\n╰─────────────────`,
qrError: () => "❌ Fehler beim Generieren des QR-Codes",
noBotAdmin: () => "⚠️ Ich muss Admin sein, um Anfragen zu verwalten",
noAdmin: () => "⚠️ Nur Gruppen-Admins können diesen Befehl verwenden",
noPending: () => "✓ Es gibt keine ausstehenden Anfragen",
pendingCount: (params) => `╭─────────────────\n│ 📨 Ausstehende Anfragen: ${params?.count}\n│\n│ Wähle eine Option\n╰─────────────────`,
menuFooter: () => "Anfrageverwaltung Gruppe",
buttonAcceptAll: () => "✅ Alle akzeptieren",
buttonRejectAll: () => "❌ Alle ablehnen",
buttonAccept39: () => "🇩🇪 Akzeptiere +49",
buttonManage: () => "📥 Anfragen verwalten",
acceptedSuccess: (params) => `✅ ${params?.count} Anfragen akzeptiert`,
rejectedSuccess: (params) => `❌ ${params?.count} Anfragen abgelehnt`,
no39Found: () => "⚠️ Keine Anfragen mit Präfix +49 gefunden",
accepted39Success: (params) => `✅ ${params?.count} Anfragen mit Präfix +49 akzeptiert`,
errorAccepting: () => "❌ Fehler beim Akzeptieren der Anfragen",
errorRejecting: () => "❌ Fehler beim Ablehnen der Anfragen",
invalidNumber: () => "⚠️ Ungültige Nummer. Verwende eine Zahl größer als 0",
invalidInput: () => "⚠️ Ungültige Eingabe. Sende eine Zahl oder '49'",
manageCustom: (params) => `╭─────────────────\n│ 📥 Personalisierte Verwaltung\n│\n│ Wie viele Anfragen möchtest du akzeptieren?\n│\n│ ✦ Verwende: .${params?.command} akzeptiere <Anzahl>\n│ ✦ Beispiel: .${params?.command} akzeptiere 7\n╰─────────────────`,
manageFooter: () => "Personalisierte Anfrageverwaltung",
notAvailable: () => "⚠️ Dieser Befehl ist nur mit der ChatUnity-Basis verfügbar",
imageNotFound: () => "⚠️ Fehler beim Laden der Bilder",
mainTitle: () => "🌐 Unsere Social Networks",
mainSubtitle: () => "Folge uns überall, um auf dem Laufenden zu bleiben",
mainFooter: () => "Powered by ChatUnity",
instagramTitle: () => "📸 Instagram",
instagramBody: () => "Folge uns auf Instagram für exklusive Fotos und tägliche Stories!",
instagramButton: () => "Instagram öffnen",
tiktokTitle: () => "🎵 TikTok",
tiktokBody: () => "Entdecke unsere Videos auf TikTok und bleibe mit viralen Inhalten auf dem Laufenden!",
tiktokButton: () => "TikTok öffnen",
youtubeTitle: () => "🎬 YouTube",
youtubeBody: () => "Abonniere unseren YouTube-Kanal für Tutorials, Anleitungen und Video-Updates!",
youtubeButton: () => "YouTube öffnen",
discordTitle: () => "💬 Discord",
discordBody: () => "Tritt unserer Community auf Discord bei!",
discordButton: () => "Discord öffnen",
telegramTitle: () => "✈️ Telegram",
telegramBody: () => "Folge uns auf Telegram für sofortige Neuigkeiten und direkte Kommunikation!",
telegramButton: () => "Telegram öffnen",
whatsappTitle: () => "💚 WhatsApp Kanal",
whatsappBody: () => "Bleibe auf unserem offiziellen WhatsApp-Kanal auf dem Laufenden!",
whatsappButton: () => "Kanal öffnen",
cardFooter: () => "ChatUnity Social",
followUpMessage: () => "👆 Scrolle durch die Karten, um alle unsere Social-Media-Kanäle zu sehen!\n\n✦ Folge uns, um auf dem Laufenden zu bleiben",
followUpFooter: () => "ChatUnity Team",
menuButton: () => "📋 Zurück zum Menü",
errorLoading: () => "⚠️ Fehler beim Laden der Social-Media-Kanäle",


   linkTitle: () => "🔗 GRUPPENLINK",
   linkFooter: () => "Kopiere den Link und teile ihn",
    copyButton: () => "📋 Link kopieren",


  
  pingTitle: () => "⚡ PONG!",
  pingResponse: (params) => `⚡ *Ping:* ${params?.ping || 'N/A'} ms`,
  socialNotAvailable: () => "⚠️ Der Befehl ist derzeit nicht verfügbar. Versuche es später erneut.",
socialInstagramTitle: () => "📸 Instagram",
socialInstagramBody: () => "Folge uns auf Instagram für exklusive Inhalte, Updates und Bot-Neuigkeiten!",
socialInstagramButton: () => "Folge auf Instagram",
socialTiktokTitle: () => "🎵 TikTok",
socialTiktokBody: () => "Entdecke unsere Videos auf TikTok und bleibe mit viralen Inhalten auf dem Laufenden!",
socialTiktokButton: () => "Folge auf TikTok",
socialYoutubeTitle: () => "📺 YouTube",
socialYoutubeBody: () => "Abonniere unseren YouTube-Kanal für Tutorials, Anleitungen und Video-Updates!",
socialYoutubeButton: () => "Abonniere auf YouTube",
socialDiscordTitle: () => "💬 Discord",
socialDiscordBody: () => "Tritt unserer Discord-Community für Support, Chat und mehr bei!",
socialDiscordButton: () => "Tritt Discord bei",
socialTelegramTitle: () => "✈️ Telegram",
socialTelegramBody: () => "Folge uns auf Telegram für sofortige Neuigkeiten und direkte Kommunikation!",
socialTelegramButton: () => "Folge auf Telegram",
socialWhatsappTitle: () => "💚 WhatsApp",
socialWhatsappBody: () => "Abonniere unseren WhatsApp-Kanal, um offizielle Updates zu erhalten!",
socialWhatsappButton: () => "Folge auf WhatsApp",
socialCardFooter: () => "ChatUnity Social",
socialMainTitle: () => "⋆ ︵︵ ★ 🌐 𝐒𝐎𝐂𝐈𝐀𝐋 𝐌𝐄𝐃𝐈𝐀 ★ ︵︵ ⋆",
socialMainSubtitle: () => "Folge unseren offiziellen Kanälen",
socialMainFooter: () => "Bleibe mit ChatUnity verbunden",
socialFollowUpMessage: () => "✨ Danke für dein Interesse!\n\n୧ Folge uns auf all unseren Social-Media-Kanälen, um kein Update zu verpassen.",
socialFollowUpFooter: () => "ChatUnity - Immer verbunden",
socialMenuButton: () => "🏠 Hauptmenü",
socialErrorLoading: () => "❌ Beim Laden der Social-Media-Kanäle ist ein Fehler aufgetreten. Versuche es später erneut.",
listawarnTitle: () => "꒷꒦ ✦ Liste verwarnter Benutzer ✦ ꒷꒦",
listawarnMode: () => "Modus",
listawarnGroup: () => "Gruppe",
listawarnTotal: ({ count }) => `Gesamt: ${count} ${count === 1 ? 'verwarnter Benutzer' : 'verwarnte Benutzer'}`,
listawarnNoWarns: () => "✨ Keine verwarnter Benutzer",
listawarnUnknownUser: () => "Unbekannter Benutzer",
listawarnUserNumber: ({ index }) => `${index}.`,
listawarnTag: () => "Tag:",
listawarnGroups: () => "Gruppe(n):",
listawarnNoActiveWarns: () => "Keine aktiven Verwarnungen",
listawarnErrorRetrieving: () => "Fehler beim Abrufen",
listawarnTotalWarns: ({ count }) => `${count} gesamt`,
listawarnOwnerOnly: () => "❌ Dieser Befehl kann privat nur vom Besitzer verwendet werden.",
listawarnAllUsers: () => "Alle Benutzer",
kickNoBotAdmin: () => "❌ Der Bot muss Administrator sein, um Benutzer zu entfernen.",
kickNoMention: () => "⚠️ Erwähne oder zitiere den Benutzer, der aus der Gruppe entfernt werden soll.",
kickCannotRemoveOwner: () => "🛡️ Du kannst den Bot-Ersteller nicht entfernen.",
kickCannotRemoveBot: () => "🤖 Du kannst den Bot nicht aus der Gruppe entfernen.",
kickCannotRemoveSelf: () => "😅 Du kannst dich nicht selbst mit diesem Befehl entfernen.",
kickTargetIsGroupOwner: () => "👑 Der Benutzer, den du entfernen wolltest, ist der Gruppenersteller.",
kickTargetIsAdmin: () => "🛡️ Der Benutzer, den du entfernen wolltest, ist Administrator.",
kickSuccess: ({ target, executor, reason }) => `꒷꒦ ✦ Benutzer Entfernt ✦ ꒷꒦\n\n┊ 『 👤 』 Benutzer: @${target}\n┊ 『 ⚖️ 』 Entfernt von: @${executor}${reason ? `\n┊ 『 📝 』 Grund: ${reason}` : ''}\n\n╰★────★────★`,
linkgroupNoBotAdmin: () => "❌ Der Bot muss Administrator sein, um den Gruppenlink zu erhalten.",
linkgroupLinkTitle: ({ groupName }) => `꒷꒦ ✦ Gruppenlink ✦ ꒷꒦\n\n┊ 『 📱 』 Gruppe: ${groupName}\n┊ 『 🔗 』 Klicke auf den Button, um den Link zu kopieren`,
linkgroupLinkFooter: () => "Powered by ChatUnity Bot",
linkgroupCopyButton: () => "📋 Link kopieren",
joinNoLink: ({ prefix, command }) => `⚠️ Gib den Gruppenlink ein.\n\n┊ 『 💡 』 Beispiel: ${prefix}${command} <link> <tage | unendlich>`,
joinInvalidLink: () => "❌ Ungültiger Gruppenlink.",
joinSuccessInfinite: () => "꒷꒦ ✦ Gruppenbeitritt ✦ ꒷꒦\n\n┊ 『 ✅ 』 Ich bin der Gruppe erfolgreich beigetreten\n┊ 『 ⏰ 』 Verweildauer: Unbegrenzt\n\n╰★────★────★",
joinSuccessExpired: ({ days }) => `꒷꒦ ✦ Gruppenbeitritt ✦ ꒷꒦\n\n┊ 『 ✅ 』 Ich bin der Gruppe erfolgreich beigetreten\n┊ 『 ⏰ 』 Verweildauer: ${days} Tage\n\n╰★────★────★`,
banuserNoTarget: () => "⚠️ Bitte markiere einen Benutzer, antworte auf eine Nachricht oder schreibe die Telefonnummer.\n\n┊ 『 💡 』 Beispiel: @491234567890",
banuserInvalidNumber: () => "❌ Ungültige Telefonnummer.",
banuserSuccess: ({ target }) => `꒷꒦ ✦ Benutzer Geblockt ✦ ꒷꒦\n\n┊ 『 🚫 』 Benutzer: @${target}\n┊ 『 ⚠️ 』 Dieser Benutzer wurde vom Bot blockiert\n┊ 『 📵 』 Er kann die Befehle nicht mehr verwenden\n\n╰★────★────★`,
unbanuserNoTarget: () => "⚠️ Markiere einen Benutzer, antworte auf eine Nachricht oder schreibe die Telefonnummer.\n\n┊ 『 💡 』 Beispiel: @491234567890",
unbanuserInvalidNumber: () => "❌ Ungültige Telefonnummer.",
unbanuserSuccess: ({ target }) => `꒷꒦ ✦ Benutzer Entblockt ✦ ꒷꒦\n\n┊ 『 ✅ 』 Benutzer: @${target}\n┊ 『 🎉 』 Dieser Benutzer wurde entblockt\n┊ 『 📱 』 Er kann jetzt die Bot-Befehle verwenden\n\n╰★────★────★`,
listanumNoPrefix: () => "⚠️ Gib die Telefonvorwahl ein, nach der gesucht werden soll.\n\n┊ 『 💡 』 Beispiel: .listanum 49",
listanumInvalidPrefix: () => "❌ Die Vorwahl muss eine gültige Nummer sein.",
listanumTitle: ({ prefix }) => `꒷꒦ ✦ Liste Nummern +${prefix} ✦ ꒷꒦`,
listanumNoUsers: ({ prefix }) => `꒷꒦ ✦ Keine Benutzer ✦ ꒷꒦\n\n┊ 『 ℹ️ 』 Keine Benutzer mit Vorwahl +${prefix} gefunden\n\n╰★────★────★`,
puliziaStart: ({ prefix }) => `꒷꒦ ✦ Bereinigung Gestartet ✦ ꒷꒦\n\n┊ 『 🔄 』 Entfernung von Benutzern mit Vorwahl +${prefix}\n┊ 『 ⏳ 』 Warte auf Abschluss...\n\n╰★────★────★`,
puliziaNoBotAdmin: () => "❌ Der Bot muss Administrator sein, um Benutzer zu entfernen.",
puliziaNoRestrict: () => "❌ Der eingeschränkte Modus ist nicht aktiviert.",
puliziaUserLeft: ({ user }) => `@${user} wurde entfernt`,
getNoInput: () => "⚠️ Falsche Verwendung des Befehls.\n\n╰★─ Einzelbeispiele ─★╮\n┊ getplugin menu-gruppe skript\n┊ getfile config.js datei\n\n╰★─ Mehrfachbeispiele ─★╮\n┊ getplugin admin & menu & config\n┊ getplugin admin & menu & config skript\n┊ getplugin admin skript & menu datei\n┊ (maximal 3 Plugins gleichzeitig)\n\n╰♡꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷",
getNoPluginFound: () => "❌ Kein gültiges Plugin in der Mehrfachanfrage gefunden.",
getMultiSelect: ({ pluginList }) => `꒷꒦ ✦ Ausgewählte Plugins ✦ ꒷꒦\n\n${pluginList}\n\n┊ 『 ❓ 』Wie möchtest du alle Plugins erhalten?\n\n╰★────★────★`,
getMultiScriptBtn: () => "📄 Alle Skripte",
getMultiFileBtn: () => "📎 Alle Dateien",
getMultiResult: ({ successCount, total, results }) => `꒷꒦ ✦ Mehrfachanfrage ✦ ꒷꒦\n\n┊ 『 📦 』 ${successCount}/${total} Plugins gefunden\n\n${results}\n\n╰★────★────★`,
getFileSelect: ({ filename }) => `꒷꒦ ✦ Ausgewählte Datei ✦ ꒷꒦\n\n┊ 『 📁 』 ${filename}\n\n┊ 『 ❓ 』 Was möchtest du tun?\n\n╰★────★────★`,
getScriptBtn: () => "📄 Skript",
getFileBtn: () => "📎 Datei",
getNoSimilar: ({ type, name }) => `❌ Kein ${type} ähnlich wie "${name}" gefunden.`,
getFoundConfirm: ({ filename, score }) => `꒷꒦ ✦ Gefunden ✦ ꒷꒦\n\n┊ 『 ✨ 』 "${filename}"\n┊ 『 📊 』 Genauigkeit: ${score}%\n\n┊ 『 ❓ 』 Bestätigst du?\n\n╰♡꒷ ๑ Antworte: ja/nein`,
getMultiChoice: ({ name, options }) => `꒷꒦ ✦ Ergebnisse für "${name}" ✦ ꒷꒦\n\n${options}\n\n┊ 『 📝 』 Wähle die Nummer oder "nein" zum Abbrechen\n\n╰★────★────★`,
getDirNotFound: ({ dir }) => `❌ Verzeichnis ${dir} nicht gefunden.`,
getFileSuccess: ({ prefix, filename, type }) => `${prefix}꒷꒦ ✦ Erfolg ✦ ꒷꒦\n\n┊ 『 ✅ 』 Hier ist das ${type}: ${filename}\n\n╰★────★────★`,
getScriptSuccess: ({ prefix, filename, content }) => `${prefix}꒷꒦ ✦ Code von ${filename} ✦ ꒷꒦\n\n${content}\n\n╰★────★────★`,
getInvalidOption: () => "❌ Ungültige Option! Verwende \"datei\" oder \"skript\".",
getScriptOnlyJS: () => "❌ Die Skript-Option ist nur für JavaScript-Dateien verfügbar.",
getSyntaxError: ({ prefix, filename, error }) => `${prefix}꒷꒦ ✦ Syntaxfehler ✦ ꒷꒦\n\n┊ 『 ⛔️ 』 Datei: ${filename}\n\n${error}\n\n╰★────★────★`,
getFileError: ({ prefix, filename, error }) => `${prefix}❌ Fehler: Die Datei ${filename} existiert nicht oder kann nicht gelesen werden.\n\n${error}`,
getProcessError: ({ filename, error }) => `❌ Fehler beim Verarbeiten von ${filename}: ${error}`,
getOperationCancelled: () => "꒷꒦ ✦ Operation Abgebrochen ✦ ꒷꒦\n\n┊ 『 ❌ 』 Anfrage erfolgreich abgebrochen\n\n╰★────★────★",
getGenericError: ({ error }) => `❌ 𝐅𝐞𝐡𝐥𝐞𝐫: ${error}`,
leaveNotAdmin: () => "⚠️ Dieser Befehl kann nur von Gruppen-Admins und dem Besitzer verwendet werden.",
leaveMessage: () => "꒷꒦ ✦ Auf Wiedersehen ✦ ꒷꒦\n\n┊ 『 👋 』 Der Bot verlässt die Gruppe\n\n╰★────★────★",
leaveError: () => "❌ Beim Verlassen der Gruppe ist ein Fehler aufgetreten.",
saveNoName: () => "⚠️ Gib den Namen des zu speichernden Plugins an.",
saveNoQuoted: () => "⚠️ Du musst auf die Nachricht mit dem Plugin-Code antworten.",
saveSaveSuccess: ({ path }) => `꒷꒦ ✦ Plugin Gespeichert ✦ ꒷꒦\n\n┊ 『 ✅ 』 Datei erfolgreich erstellt\n┊ 『 📁 』 Pfad: ${path}\n\n╰★────★────★`,
saveErrorWrite: ({ error }) => `❌ Fehler beim Speichern des Plugins.\n\n${error}`,
deleteNoPlugins: () => "⚠️ Keine Plugins zum Löschen verfügbar.",
deleteHelp: ({ usedPrefix, pluginList, total }) => `꒷꒦ ✦ Delete Plugin Manager ✦ ꒷꒦\n\n┊ 『 📌 』 Verwendung des Befehls:\n┊ ${usedPrefix}deleteplugin <name>\n\n┊ 『 ✨ 』 Beispiel:\n┊ ${usedPrefix}deleteplugin menu-offiziell\n\n┊ 『 📋 』 Verfügbare Plugins:\n${pluginList}${total > 15 ? `\n┊ ... und ${total - 15} weitere Plugins` : ''}\n\n╰★────★────★`,
deleteInvalidNumber: ({ max }) => `❌ Ungültige Nummer! Bereich: 1-${max}`,
deleteNoSimilar: ({ input }) => `❌ Kein Plugin ähnlich wie "${input}" gefunden.`,
deleteConfirm: ({ filename, score }) => `꒷꒦ ✦ Plugin Gefunden ✦ ꒷꒦\n\n┊ 『 ✨ 』 "${filename}"\n┊ 『 📊 』 Übereinstimmung: ${score}%\n\n┊ 『 🗑️ 』 Möchtest du es löschen?\n\n╰♡꒷ ๑ Antworte: ja/nein`,
deleteMultiChoice: ({ input, options }) => `꒷꒦ ✦ Ergebnisse für "${input}" ✦ ꒷꒦\n\n${options}\n\n┊ 『 📝 』 Wähle die Nummer oder "nein" zum Abbrechen\n\n╰★────★────★`,
deleteNotFound: ({ path }) => `꒷꒦ ✦ Achtung ✦ ꒷꒦\n\n┊ 『 📁 』 Datei im Dateisystem nicht gefunden\n\n┊ 『 🔍 』 Gesuchter Pfad:\n┊ ${path}\n\n╰★────★────★`,
deleteSuccess: ({ pluginName, sender, time }) => `꒷꒦ ✦ Plugin Gelöscht ✦ ꒷꒦\n\n┊ 『 🗑️ 』 Plugin erfolgreich gelöscht\n\n┊ 『 📝 』 Name: ${pluginName}.js\n┊ 『 👤 』 Gelöscht von: @${sender}\n┊ 『 🕐 』 Zeit: ${time}\n\n┊ 『 ⚠️ 』 Hinweis: Der Bot benötigt möglicherweise\n┊ einen Neustart, um die Änderungen zu übernehmen\n\n╰★────★────★\n\n🎯 Operation abgeschlossen!`,
deleteError: ({ error }) => `꒷꒦ ✦ Systemfehler ✦ ꒷꒦\n\n┊ 『 ❌ 』 Plugin konnte nicht gelöscht werden\n\n┊ 『 🔍 』 Fehlerdetails:\n┊ ${error}\n\n┊ 『 💡 』 Mögliche Lösungen:\n┊ -  Überprüfe die Dateiberechtigungen\n┊ -  Stelle sicher, dass das Plugin nicht in Benutzung ist\n┊ -  Versuche es in ein paar Sekunden erneut\n\n╰★────★────★`,
deleteOperationCancelled: () => "꒷꒦ ✦ Operation Abgebrochen ✦ ꒷꒦\n\n┊ 『 ❌ 』 Löschung abgebrochen\n\n╰★────★────★",
deleteGenericError: ({ error }) => `❌ Fehler: ${error}`,
broadcastNoOwner: () => "❌ Nur der Besitzer kann diesen Befehl verwenden!",
broadcastNoGroups: () => "❌ Der Bot ist in keiner Gruppe!",
broadcastHeader: () => "꒷꒦ ✦ Nachricht von ChatUnity ✦ ꒷꒦",
broadcastIntro: () => "┊ 『 👑 』 Liebe Gruppenmitglieder, es ist eine neue Nachricht vom Besitzer eingetroffen:",
broadcastLabel: () => "┊ 『 📝 』 Nachricht:",
broadcastNote: () => "┊ 『 ⚠️ 』 Diese Nachricht wurde an alle Gruppenmitglieder gesendet",
broadcastFooter: () => "╰★────★────★\n\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ChatUnity",
broadcastSuccess: ({ count }) => `꒷꒦ ✦ Broadcast Abgeschlossen ✦ ꒷꒦\n\n┊ 『 ✅ 』 Nachricht erfolgreich gesendet\n┊ 『 📊 』 Erreichte Gruppen: ${count}\n┊ 『 👥 』 Alle Mitglieder wurden erwähnt\n\n╰★────★────★`,
broadcastDefaultMessage: () => "Dies ist eine Standardnachricht, die an alle Gruppen gesendet wurde.",
broadcastError: ({ group, error }) => `❌ Fehler beim Senden der Nachricht an Gruppe ${group}: ${error}`,
banChatSuccess: () => "꒷꒦ ✦ Chat Geblockt ✦ ꒷꒦\n\n┊ 『 🚫 』 Chat erfolgreich blockiert\n┊ 『 ⚠️ 』 Der Bot wird in diesem Chat nicht mehr antworten\n\n╰★────★────★",
unbanChatSuccess: () => "꒷꒦ ✦ Chat Entblockt ✦ ꒷꒦\n\n┊ 『 ✅ 』 Chat erfolgreich entblockt\n┊ 『 🎉 』 Der Bot kann in diesem Chat wieder antworten\n\n╰★────★────★",
restartInitiating: () => "꒷꒦ ✦ Neustart Läuft ✦ ꒷꒦\n\n┊ 『 ⏳ 』 Bitte warten...\n\n╰★────★────★",
restartProgress: () => "🚀🚀🚀🚀🚀🚀",
restartSuccess: () => "꒷꒦ ✦ Neustart Abgeschlossen ✦ ꒷꒦\n\n┊ 『 ✅ 』 Bot erfolgreich neu gestartet\n┊ 『 🎉 』 System betriebsbereit\n\n╰★────★────★",
restartError: ({ error }) => `꒷꒦ ✦ Neustartfehler ✦ ꒷꒦\n\n┊ 『 ❌ 』 Bot konnte nicht neu gestartet werden\n┊ 『 🔍 』 Fehler: ${error}\n\n╰★────★────★`,
shutdownInitiating: () => "꒷꒦ ✦ Bot Herunterfahren ✦ ꒷꒦\n\n┊ 『 🔌 』 Ich fahre den Bot herunter...\n┊ 『 🚫 』 Alle Chats wurden blockiert\n┊ 『 ⏳ 』 Warte auf das Beenden\n\n╰★────★────★",
shutdownSuccess: () => "꒷꒦ ✦ Bot Ausgeschaltet ✦ ꒷꒦\n\n┊ 『 ✅ 』 Herunterfahren abgeschlossen\n┊ 『 💤 』 Bot offline\n\n╰★────★────★",
shutdownChatsBanned: ({ count }) => `┊ 『 📊 』 ${count} Chats blockiert`,
shutdownError: ({ error }) => `꒷꒦ ✦ Herunterfahrfehler ✦ ꒷꒦\n\n┊ 『 ❌ 』 Bot konnte nicht heruntergefahren werden\n┊ 『 🔍 』 Fehler: ${error}\n\n╰★────★────★`,
updateInitiating: () => "꒷꒦ ✦ Bot Aktualisierung ✦ ꒷꒦\n\n┊ 『 🔄 』 Überprüfe auf Updates...\n┊ 『 ⏳ 』 Bitte warten\n\n╰★────★────★",
updateSuccess: ({ output }) => `꒷꒦ ✦ Aktualisierung Abgeschlossen ✦ ꒷꒦\n\n┊ 『 ✅ 』 Bot erfolgreich aktualisiert\n\n┊ 『 📋 』 Details:\n${output}\n\n╰★────★────★`,
updateError: ({ error }) => `꒷꒦ ✦ Aktualisierungsfehler ✦ ꒷꒦\n\n┊ 『 ❌ 』 Bot konnte nicht aktualisiert werden\n┊ 『 🔍 』 Fehler: ${error}\n\n┊ 『 💡 』 Mögliche Lösungen:\n┊ -  Überprüfe die Internetverbindung\n┊ -  Überprüfe die Git-Berechtigungen\n┊ -  Stelle sicher, dass du auf einem gültigen Branch bist\n\n╰★────★────★`,
updateNoChanges: () => "꒷꒦ ✦ Bereits Aktualisiert ✦ ꒷꒦\n\n┊ 『 ℹ️ 』 Der Bot ist bereits auf der neuesten Version\n┊ 『 ✅ 』 Keine Updates verfügbar\n\n╰★────★────★",
groupMenuTitle: () => "𝑮𝑹𝑼𝑷𝑷𝑬𝑵𝑴𝑬𝑵𝑼",
chooseMenu: () => "Wähle eine Kategorie aus dem Menü:",
mainMenuButton: () => "🏠 Hauptmenü",
adminMenuButton: () => "🛡️ Admin-Menü",
ownerMenuButton: () => "👑 Besitzermenü",
securityMenuButton: () => "🚨 Sicherheitsmenü",
aiMenuButton: () => "🤖 KI-Menü",
musicAudioSection: () => "MUSIK & AUDIO",
infoUtilitySection: () => "INFORMATIONEN & NÜTZLICHES",
imageEditSection: () => "BILDER & BEARBEITUNG",
pokemonSection: () => "POKEMON",
gamesCasinoSection: () => "SPIELE & CASINO",
economyRankingSection: () => "WIRTSCHAFT & RANGLISTEN",
socialInteractionSection: () => "SOZIALE INTERAKTIONEN",
howMuchSection: () => "WIE VIEL IST?",
personalityTestSection: () => "PERSÖNLICHKEITSTEST",
memberCommands: () => "𝑩𝑬𝑭𝑬𝑯𝑳𝑬 𝑭𝑼𝑬𝑹 𝑴𝑰𝑻𝑮𝑳𝑰𝑬𝑫𝑬𝑹",
versionLabel: () => "𝑽𝑬𝑹𝑺𝑰𝑶𝑵",
collabLabel: () => "𝑲𝑶𝑳𝑳𝑨𝑩𝑶𝑹𝑨𝑻𝑰𝑶𝑵",
songCommand: () => "lied",
audioCommand: () => "audio",
videoCommand: () => "video",
cityCommand: () => "stadt",
textCommand: () => "text",
groupCommand: () => "gruppe",
userCommand: () => "benutzer",
checkSiteCommand: () => "check website",
photoToStickerCommand: () => "foto zu sticker",
stickerToPhotoCommand: () => "sticker zu foto",
improveQualityCommand: () => "verbessere fotogualität",
photoCommand: () => "foto",
hiddenPhotoCommand: () => "verstecktes foto",
memeCommand: () => "meme",
fromStickerCommand: () => "von sticker",
blurImageCommand: () => "bild unscharf",
comingSoonCommand: () => "demnächst",
quantityCommand: () => "menge",
headsOrTailsCommand: () => "kopf oder zahl",
mathProblemCommand: () => "matheproblem",
rockPaperScissorsCommand: () => "schere stein papier",
pokemonInfoCommand: () => "Pokémon info",
balanceCommand: () => "guthaben",
topUsersCommand: () => "top benutzer",
withdrawUCCommand: () => "UC von bank",
earnXPCommand: () => "verdiene XP",
endRelationshipCommand: () => "beziehung beenden",
affinityCommand: () => "affinität",
charmCommand: () => "charme",
createFightCommand: () => "streit erstellen",
truthOrDareCommand: () => "wahrheit oder pflicht",
playNoText: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n ❗ Gib einen Titel oder Link ein\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
playNoResults: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n ❗ Keine Ergebnisse gefunden\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
playAudioLoading: () => "┊ ┊ ┊ ┊‿ ˚➶ ｡˚\n┊ ┊ ┊ ┊. ➶ ˚\n┊ ┊ ┊ ˚✧ 🎵 Audio kommt\n┊ ˚➶ ｡˚ ☁︎ Warte einen Moment...",
playVideoLoading: () => "┊ ┊ ┊ ┊‿ ˚➶ ｡˚\n┊ ┊ ┊ ┊. ➶ ˚\n┊ ┊ ┊ ˚✧ 🎬 Video kommt\n┊ ˚➶ ｡˚ ☁︎ Warte einen Moment...",
playDownloadComplete: () => "✅ Download abgeschlossen!",
playTooLong: ({ maxMinutes, duration }) => `╭★────★────★\n|ㅤㅤㅤㅤㅤㅤㅤ꒰¡VIDEO ZU LANG!꒱\n|˚₊꒷ ⏳ ꒱ ฅ﹕Maximum: ${maxMinutes} minuten ₊˚๑\n|˚₊꒷ ⌛ ꒱ ฅ﹕Dauer: ${duration} ₊˚๑\n╰★────★────★`,
playVideoInfo: ({ title, timestamp, views, author, ago, url }) => `⋆ ︵︵ ★ 🎥 VIDEO INFO 🎥 ★ ︵︵ ⋆\n\n\n꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧\n୧ ✍️ *Titel:* ${title}\n୧ ⏳ *Dauer:* ${timestamp}\n୧ 👀 *Aufrufe:* ${views}\n୧ 🔰 *Kanal:* ${author}\n୧ 🔳 *Veröffentlicht:* ${ago}\n୧ 🔗 *Link:* ${url}\n꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧\n\n\n╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩\n  > Wähle ein Format zum Herunterladen\n╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩`,
playChooseFormat: () => "Wähle ein Format:",
playAudioButton: () => "🎵 Audio",
playVideoButton: () => "🎬 Video",
playSaveButton: () => "💾 Playlist Speichern",
playError: ({ error }) => `꒰🩸꒱ ◦- ≫ FEHLER\n ★・・・・・・・★\n  ${error}\n ★・・・・・・・★`,
playNoValidLink: () => "꒰🩸꒱ ◦- ≫ FEHLER\n ★・・・・・・・★\n  Kein gültiger Link gefunden\n ★・・・・・・・★",
playlistEmpty: ({ userName }) => `ℹ️ ${userName ? `${userName} hat keine gespeicherten Titel` : 'Deine Playlist ist leer!'}`,
playlistHeader: ({ userName }) => `📋 ${userName ? `Playlist von ${userName}` : 'Deine Playlist'}`,
playlistMore: ({ count }) => `...und ${count} weitere Titel`,
playlistSelectToPlay: () => "Wähle einen Titel zum Abspielen",
saveNoText: () => "⚠️ Gib einen Titel zum Suchen an",
saveSearching: ({ query }) => `⌛ Suche "${query}"...`,
saveNoResults: () => "⚠️ Keine Ergebnisse gefunden",
saveAlreadyExists: () => "⚠️ Lied bereits in der Playlist! Verwende .playlist, um gespeicherte Titel zu sehen.",
saveSaved: () => "✅ Lied gespeichert!",
saveViewPlaylist: () => "📋 Playlist Anzeigen",
savePlay: () => "🎵 Abspielen",
saveDelete: () => "🗑️ Löschen",
saveSaveNew: () => "💾 Neu Speichern",
deleteSelect: () => "🗑️ Wähle Titel zum Löschen",
deleteUse: () => "Verwende: .lösche <nummer>",
deleteInvalid: () => "⚠️ Ungültige Nummer!",
deleteSuccess: () => "✅ Titel gelöscht!",
deleteRestore: () => "💾 Wiederherstellen",
backButton: () => "🔙 Zurück",
playlistError: ({ error }) => `⚠️ Fehler: ${error}`,
playlistSignature: () => "꙰ 𝗘𝗿𝘀𝗰𝗵𝗮𝗳𝗳𝘂𝗻𝗴 𝗚𝗮𝗯𝟯𝟯𝟯 ꙰",
ytSearchMissingFiles: () => "❗ Um diesen Befehl zu verwenden, benutze die ChatUnity-Basis",
ytSearchMissingQuery: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n 📌 Gib den Namen des Videos ein\n Beispiel: .ytsearch kompilation\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
ytSearchNoResults: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n ❌ Keine Ergebnisse gefunden\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
ytSearchTitle: () => "🔎 YouTube Suche",
ytSearchFooter: () => "ChatUnity ✦ Downloader",
ytSearchResultTitle: () => "🎬 YouTube Ergebnisse",
ytSearchResultHeader: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n ୧ 🎬 ୭ Suchergebnisse\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Hier sind die gefundenen Ergebnisse ✦ ꒷꒦",
ytSearchSelectPrompt: () => "╭★────★────★────★╮\n│ 🔢 Wähle ein Video\n│ aus den obigen Ergebnissen\n╰★────★────★╯",
ytSearchDuration: () => "📺 Dauer:",
ytSearchViews: () => "👁 Aufrufe:",
ytSearchChannel: () => "👤 Kanal:",
toAudioNoMedia: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ⚠️ Antworte auf ein Video oder Audio\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
toAudioDownloadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Fehler beim Download\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
toAudioConvertError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Fehler bei der Konvertierung\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",


weatherNoCity: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❗ Gib den Namen einer Stadt ein\n  Verwendung: .wetter [Stadtname]\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
weatherInfo: ({ name, country, temp, feels, min, max, humidity, main, desc, wind, pressure }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🌍 ୭ *Wetter ${name}, ${country}*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Wetterinformationen ✦ ꒷꒦\n\n🌡 Temperatur: ${temp}°C\n🌡 Gefühlt: ${feels}°C\n🌡 Minimum: ${min}°C\n🌡 Maximum: ${max}°C\n💧 Luftfeuchtigkeit: ${humidity}%\n☁ Wetter: ${main}\n🌫 Beschreibung: ${desc}\n💨 Wind: ${wind} m/s\n🔽 Druck: ${pressure} hPa\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🌤️\n│ Powered by OpenWeather\n╰★────★────★╯`,
weatherCityNotFound: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  🚫 Stadt nicht gefunden\n  Überprüfe die Schreibweise\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
weatherError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ⚠️ Fehler beim Abrufen\n  Versuche es später erneut\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
translateHelp: ({ prefix, command, languages }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🌍 ୭ *ÜBERSETZER*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Verwendungsbeispiele ✦ ꒷꒦\n\n│ ${prefix}${command} Hallo\n│ ${prefix}${command} en Hallo\n│ ${prefix}${command} ja Hello\n│ ${prefix}${command} [antworte msg]\n│ ${prefix}spreche ar text\n\n꒷꒦ ✦ Verfügbare Sprachen ✦ ꒷꒦\n\n${languages}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🌐\n│ ChatUnity Translator\n╰★────★────★╯`,
translateNoText: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Fehlender Text für Audio\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
translateNoLang: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Sprache nicht angegeben\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
translateWhatToTranslate: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Und was soll ich übersetzen?\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
translateTooLong: ({ max, length }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Text zu lang\n  Maximum: ${max} Zeichen\n  Dein Text: ${length} Zeichen\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
translateResult: ({ fromLang, toLang, translation }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🌍 ୭ *ÜBERSETZER*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Von: ${fromLang} ✦ ꒷꒦\n꒷꒦ ✦ Nach: ${toLang} ✦ ꒷꒦\n\n${translation}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎯\n│ Übersetzung abgeschlossen\n╰★────★────★╯`,
translateListenOriginal: () => "🔊 Höre Original",
translateListenTranslation: () => "🎵 Höre Übersetzung",
translateFooter: () => "ChatUnity Translator",
translateTTSError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Audiofehler: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
translateError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Fehler während der Übersetzung\n  Versuche es später erneut\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
antiLinkNotAdmin: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *Vorläufig gerettet*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Ich bin kein Admin ✦ ꒷꒦\n\nIch kann nichts tun",
antiLinkDetected: ({ user, qrDetected }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚫 ୭ *ANTI-LINK AKTIVIERT*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Regelverletzung ✦ ꒷꒦\n\n${user} 🤨 Du hast die Gruppenregeln verletzt${qrDetected ? ', glaubst du, ich sehe die QR-Codes nicht? 😂' : '.'}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 👮\n│ Automatisch entfernt\n╰★────★────★╯`,
antiLinkRestrictOff: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *Restrict Deaktiviert*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Aktion erforderlich ✦ ꒷꒦\n\nKontaktiere den Bot-Besitzer, um RESTRICT zu aktivieren\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔧\n│ Funktion nicht verfügbar\n╰★────★────★╯",
antiMediaWarning: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *ANTIMEDIA AKTIV*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Regelverletzung ✦ ꒷꒦\n\nNur Fotos und Videos mit 1 Aufruf sind erlaubt\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🚫\n│ Medium gelöscht\n╰★────★────★╯",
antiSpamDetected: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚫 ୭ *ANTISPAM ERKANNT*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Spam erkannt ✦ ꒷꒦\n\nDer Benutzer wurde für Spam-Verhalten entfernt\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ⚡\n│ ChatUnity x 333 Protection\n╰★────★────★╯",
antiTrabaAdminWarning: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *ACHTUNG ADMIN*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Trava erkannt ✦ ꒷꒦\n\nHEY @${user} macht es dir etwa Spaß, hier Trava zu senden? Was für ein Glück für dich, dass du Admin bist! -.-\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🛡️\n│ Geschützt durch Status\n╰★────★────★╯`,
antiTrabaDetected: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚫 ୭ *ANTI-TRAVA AKTIV*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Lange Nachricht erkannt ✦ ꒷꒦\n\nDer Benutzer @${user} hat eine zu lange Nachricht gesendet und wird entfernt\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🚨\n│ ChatUnity Protection\n╰★────★────★╯`,
antiTrabaNoPermission: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *Fehlende Berechtigungen*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Aktion blockiert ✦ ꒷꒦\n\nIch habe keine Administratorberechtigungen, um Trava-Sender zu entfernen\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔒\n│ Fordere Admin-Berechtigungen an\n╰★────★────★╯",
infoSetAge: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🗓️ ୭ *Alter Festlegen*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ So gehst du vor ✦ ꒷꒦\n\nUm dein Alter festzulegen:\n.setalter <alter>\n\nUm dein Alter zu entfernen:\n.löschealter\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📝\n│ Profilverwaltung\n╰★────★────★╯",
infoSetIG: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🌐 ୭ *Instagram Festlegen*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ So gehst du vor ✦ ꒷꒦\n\nUm Instagram festzulegen:\n.setig <benutzername>\n\nUm es zu entfernen:\n.löscheig\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📱\n│ Social Media Verwaltung\n╰★────★────★╯",
infoGroupOnly: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Befehl nur für Gruppen\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
infoUserData: ({ messages, warn, role, age, gender, blasphemy, instagram }) => `⋆ ︵︵ ★ 𝐁𝐄𝐍𝐔𝐓𝐙𝐄𝐑𝐈𝐍𝐅𝐎𝐒 ★ ︵︵ ⋆\n\n\n꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧\n୧ 📝 *Nachrichten:* ${messages}\n୧ ⚠️ *Warn:* ${warn} / 4\n୧ 🟣 *Rolle:* ${role}\n୧ 🗓️ *Alter:* ${age}\n୧ 🚻 *Geschlecht:* ${gender}\n୧ 🤬 *Flüche:* ${blasphemy}\n${instagram ? `୧ 🌐 instagram.com/${instagram}` : '୧ 🌐 *Instagram:* Nicht festgelegt'}\n꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧`,
infoSetAgeButton: () => "🗓️ Alter Festlegen",
infoSetGenderMaleButton: () => "🚹 Geschlecht Männlich",
infoSetGenderFemaleButton: () => "🚺 Geschlecht Weiblich",
infoSetIGButton: () => "🌐 Instagram Festlegen",
infoFooter: () => "Lege deine persönlichen Daten fest:",
infoCreator: () => "𝒆𝒓𝒔𝒄𝒉𝒂𝒇𝒇𝒆𝒏 𝒗𝒐𝒏 𝑶𝒏𝒊𝒙🌟",
infoRoleFounder: () => "𝐆𝐫ü𝐧𝐝𝐞𝐫 ⚜️",
infoRoleAdmin: () => "𝐀𝐝𝐦𝐢𝐧 👑",
infoRoleMember: () => "𝐌𝐢𝐭𝐠𝐥𝐢𝐞𝐝 🤍",
infoGenderNotSet: () => "𝐍𝐢𝐜𝐡𝐭 𝐟𝐞𝐬𝐭𝐠𝐞𝐥𝐞𝐠𝐭",
infoAgeNotSet: () => "Nicht festgelegt",
infoAgeYears: ({ age }) => `${age} Jahre`,
setGenderUsage: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ Korrekte Verwendung des Befehls\n  ━━✫ .setzgeschlecht männlich\n  ━━✫ .setzgeschlecht weiblich\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
setGenderSuccess: ({ gender, emoji }) => `✓ Geschlecht festgelegt als: ${gender} ${emoji}`,
deleteGenderSuccess: () => "✓ Geschlecht entfernt",
setAgeUsage: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ Gib ein gültiges Alter ein\n  ━━✫ Alter von 10 bis 80 Jahren\n  ━━✫ Verwende: .setalter <alter>\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
setAgeSuccess: ({ age }) => `✓ Alter festgelegt als: ${age} Jahre`,
deleteAgeSuccess: () => "✓ Alter entfernt",
rulesNotSet: ({ prefix }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⓘ Keine Regeln festgelegt\n  ━━✫ Die Admins haben noch keine\n  ━━✫ Regeln festgelegt\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n\n📌 Um Regeln festzulegen:\n${prefix}setzregeln <regeltext>`,
rulesTitle: () => "📜 𝐆𝐫𝐮𝐩𝐩𝐞𝐧𝐫𝐞𝐠𝐞𝐥𝐧",
rulesDisplay: ({ rules }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📜 ୭ *Gruppenregeln*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n${rules}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ⚖️\n│ Respektiere die Regeln\n╰★────★────★╯`,
dashboardTitle: () => "⚡ 𝐓𝐎𝐏 𝟏𝟎 𝐁𝐄𝐅𝐄𝐇𝐋𝐄 ⚡",
dashboardCommand: () => "📚 BEFEHL",
dashboardUses: () => "🗂️ VERWENDUNGEN",
dashboardLastUse: () => "⏱️ LETZTE VERWENDUNG",
dashboardNeverUsed: () => "Nie verwendet",
dashboardDaysAgo: ({ days }) => `${days} Tage her`,
dashboardHoursAgo: ({ hours }) => `${hours} Stunden her`,
dashboardMinutesAgo: ({ minutes }) => `${minutes} Minuten her`,
dashboardSecondsAgo: () => "vor wenigen Sekunden",
dashboardStats: ({ stats }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚡ ୭ *TOP 10 BEFEHLE*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n${stats}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📊\n│ Bot-Statistiken\n╰★────★────★╯`,
imageSearchBaseOnly: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ Dieser Befehl ist verfügbar\n  ━━✫ nur mit der ChatUnity-Basis\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
imageSearchUsage: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⓘ Befehl verwenden\n  ━━✫ ${prefix}${command} <stichwort>\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
imageSearchForbidden: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Inhalt nicht erlaubt\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
imageSearchNoResults: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😢 Keine Bilder gefunden\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
imageSearchResults: ({ term }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🔍 ୭ *Suchergebnisse*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Abfrage: ${term} ✦ ꒷꒦`,
imageSearchImageNum: ({ num }) => `Bild #${num}`,
imageSearchResultFor: ({ term }) => `Ergebnis für: ${term}`,
imageSearchFooter: () => "Powered by ChatUnity",
imageSearchOpenImage: () => "Bild öffnen",
imageSearchTitle: () => "Bildergebnisse",
imageSearchSubtitle: () => "Hier sind die auf Google gefundenen Bilder",
imageSearchAgainPrompt: () => "🔄 Möchtest du mit demselben Begriff nach weiteren Bildern suchen?",
imageSearchAgainButton: () => "Erneut suchen",
obfuscateNoCode: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Gib JavaScript-Code ein\n  ━━✫ zum Verschleiern oder antworte\n  ━━✫ auf eine Nachricht mit Code\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
obfuscateProcessing: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Verschleierung läuft...\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
obfuscateSuccess: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🔒 ୭ *Code Verschleiert*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Verschleierung abgeschlossen ✦ ꒷꒦",
obfuscateError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Verschleierungsfehler\n  ━━✫ ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
bonkNoPhoto: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Kein Profilbild\n  ━━✫ Der Benutzer hat kein\n  ━━✫ Profilbild festgelegt\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bonkError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Fehler während der Ausführung\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
hornyCardCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🔥 ୭ *Horny Karte*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Wie horny bist du? 🥵🔥 ✦ ꒷꒦",
stupidCaption: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤡 ୭ *Wie dumm bist du?*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ @${user} ✦ ꒷꒦`,
stupidDefaultText: () => "ich+bin+dumm",
wantedNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Profilbild konnte nicht abgerufen werden\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedNoProfilePicUser: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Der Benutzer hat kein\n  ━━✫ Profilbild\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedYourProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Du hast kein Profilbild\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedUnsupportedFormat: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Format nicht unterstützt\n  ━━✫ Verwende JPEG oder PNG\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Bild-Upload-Fehler\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ API-Fehler\n  ━━✫ Versuche es später erneut\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Fehler: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
wantedCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚔 ୭ *GESUCHT*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Gesucht ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 👮\n│ Powered by ChatUnity\n╰★────★────★╯",
jokeNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Profilbild konnte nicht abgerufen werden\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeYourProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Du hast kein Profilbild\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeUnsupportedFormat: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Nicht unterstütztes Format\n  ━━✫ Verwende JPEG oder PNG\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Bild-Upload-Fehler\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ API-Fehler\n  ━━✫ Versuche es später erneut\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Fehler: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
jokeCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤡 ୭ *WITZ*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Witz über Kopf ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 😂\n│ Powered by ChatUnity\n╰★────★────★╯",
jailNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Profilbild konnte nicht\n  ━━✫ abgerufen werden\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jailUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Bild-Upload-Fehler\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jailAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ API-Fehler\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jailError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Fehler: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
jailCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚔 ୭ *IM GEFÄNGNIS*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 👮\n│ Powered by ChatUnity\n╰★────★────★╯",
nokiaNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Profilbild konnte nicht\n  ━━✫ abgerufen werden\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaYourProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Du hast kein Profilbild\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaUnsupportedFormat: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Nicht unterstütztes Format\n  ━━✫ Verwende JPEG oder PNG\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Upload-Fehler\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ API-Fehler\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Fehler: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
nokiaCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📱 ୭ *NOKIA*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📞\n│ Powered by ChatUnity\n╰★────★────★╯",
adNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Profilbild konnte nicht\n  ━━✫ abgerufen werden\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adYourProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Du hast kein Profilbild\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adUnsupportedFormat: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Nicht unterstütztes Format\n  ━━✫ Verwende JPEG oder PNG\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Upload-Fehler\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ API-Fehler\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Fehler: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
adCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📢 ୭ *WERBUNG*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📺\n│ Powered by ChatUnity\n╰★────★────★╯",
pokeOpenNoType: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Gib den Typ an\n  ━━✫ base, imperium, premium, darkness\n  ━━✫ Beispiel: .apripokemon base\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeOpenNoPacks: ({ type }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⛔ Du hast keine ${type.toUpperCase()}-Päckchen\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeOpenOpening: () => "🎁 Öffne Päckchen...",
pokeOpenRevealing: () => "✨ Karten werden aufgedeckt...",
pokeOpenNoCards: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😢 Keine Karten gefunden\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeOpenResult: ({ type, name, rarity, shiny, cardType, level, remaining }) => `🎉 Du hast ein *${type.toUpperCase()}*-Päckchen geöffnet:\n\n✨ *${name}* (${rarity})${shiny ? ' ✨ Schillernd' : ''}\n🔰 Typ: ${cardType} | Lvl: ${level}\n\n📦 Verbleibende Päckchen: *${remaining}* ${type}`,
pokeBuyUsage: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Korrekte Verwendung\n  ━━✫ .buypokemon <base|imperium|premium> <Anzahl>\n  ━━✫ Beispiel: .buypokemon base 3\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeBuyNoCoins: ({ cost, balance }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Nicht genug UnityCoins\n  ━━✫ Benötigt: ${cost}\n  ━━✫ Guthaben: ${balance}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeBuySuccess: ({ quantity, type, total, balance }) => `✅ Du hast *${quantity}* ${type.toUpperCase()}-Päckchen gekauft!\n📦 Gesamt jetzt: ${total}\n💸 Verbleibende UnityCoins: ${balance}`,
pokeLeaderboardEmpty: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😢 Keine Sammler gefunden\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeLeaderboardTitle: () => "🏆 *Top 10 Pokémon-Sammler*:",
pokeInventoryTitle: () => "📂 DEINE PÄCKCHEN",
pokeInventoryBase: ({ count }) => `• 📦 Basis: ${count}`,
pokeInventoryImperium: ({ count }) => `• 👑 Imperium: ${count}`,
pokeInventoryPremium: ({ count }) => `• 🌌 Premium: ${count}`,
pokeInventoryFooter: () => "🎁 Verwende die Buttons, um sofort ein Päckchen zu öffnen!",
pokeInventoryOpenBase: () => "📦 Öffne Basis",
pokeInventoryOpenImperium: () => "👑 Öffne Imperium",
pokeInventoryOpenPremium: () => "🌌 Öffne Premium",
pokeInventoryBuy: () => "➕ Päckchen kaufen",
pokeBattleNoMention: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚔️ Markiere einen Benutzer\n  ━━✫ Beispiel: .combatti @benutzer\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeBattleNoPokemon: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😓 Du hast keine Pokémon\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeBattleOpponentNoPokemon: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😓 Der Gegner hat keine Pokémon\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeBattleResult: ({ user1, user2, poke1, poke2, result }) => `⚔️ *Pokémon-Kampf!*\n\n👤 @${user1} wählte *${poke1.name}* (Lv. ${poke1.level})\n👤 @${user2} wählte *${poke2.name}* (Lv. ${poke2.level})\n\n${result}`,
pokeBattleWinner: ({ user }) => `🏆 @${user} gewinnt den Kampf!`,
pokeBattleTie: () => "🤝 Unentschieden! Beide Pokémon sind erschöpft.",
pokeEvolveNoName: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 📛 Gib den Pokémon-Namen an\n  ━━✫ Beispiel: .evolvi Charmander\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeEvolveNotOwned: ({ name }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Du besitzt *${name}* nicht\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeEvolveNoCoins: ({ balance, cost }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⛔ Nicht genug UnityCoins\n  ━━✫ Du hast: ${balance}\n  ━━✫ Benötigt: ${cost}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeEvolveNoEvolution: ({ name }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⛔ ${name} kann sich nicht entwickeln\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeEvolveEvolving: ({ name }) => `✨ *${name}* entwickelt sich...`,
pokeEvolveProgress: () => "🔄 Entwicklung läuft...",
pokeEvolveSuccess: ({ from, to }) => `🎉 *${from}* hat sich zu *${to}* entwickelt!`,
pokeEvolveComplete: ({ balance }) => `✅ Entwicklung abgeschlossen!\n💰 Verbleibende UnityCoins: *${balance}*`,
tradeUsage: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 📌 Korrekte Verwendung\n  ━━✫ .scambia @benutzer <deine_num> <seine_num>\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
tradeYourNotExist: ({ num }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Dein Pokémon Nr. ${num}\n  ━━✫ existiert nicht\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
tradeTheirNotExist: ({ num, user }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Pokémon Nr. ${num}\n  ━━✫ von @${user} existiert nicht\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
tradeNoRequest: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Keine Tauschanfrage\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
tradeUnavailable: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Eines der Pokémon\n  ━━✫ ist nicht mehr verfügbar\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
tradeSuccess: ({ from, to, poke1, poke2 }) => `✅ Tausch abgeschlossen zwischen @${from} und @${to}!\n\n🎁 ${poke1.name} ⇄ ${poke2.name}`,
pityTitle: () => "📊 *Pity-System Darkness*",
pityOpened: ({ count }) => `🔁 Geöffnete Päckchen ohne Darkness: *${count}*`,
pityRemaining: ({ remaining }) => `🎯 Nächster Darkness garantiert in: *${remaining}* Päckchen`,
pityGuaranteed: () => "✨ Das nächste Päckchen hat einen garantierten Darkness!",
inventoryEmpty: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 📦 Inventar leer\n  ━━✫ Verwende .apripokemon base\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
inventoryInvalidPage: ({ max }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ungültige Seite\n  ━━✫ Wähle zwischen 1 und ${max}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
inventoryHeader: ({ user, total, page, totalPages, perPage }) => `╭━━━🗂️ *POKÉMON-INVENTAR* 🗂️━━━╮\n┃ 👤 *Trainer:* @${user}\n┃ 📦 *Gesamt:* ${total}\n┃ 📄 *Seite:* ${page}/${totalPages}\n┃ 📌 *Pro Seite:* ${perPage}\n╰━━━━━━━━━━━━━━━━━━━━━━━╯`,
inventoryDarknessButton: () => "🌑 Pokémon Darkness",
inventoryPageButton: ({ num }) => `Seite ${num}`,
inventoryFooter: () => "📂 Verwende `.inventario [Seite]` oder klicke die Buttons zum Navigieren.",
darknessInfo: () => "🌑 *DARKNESS-PÄCKCHEN* 🌑\n\n*Darkness*-Päckchen können nicht gekauft werden, sondern werden **scheinbar aus dem Nichts** gefunden, wenn du *Premium*-Päckchen öffnest.\n\n➡️ Alle 10 geöffneten *Premium*-Päckchen hast du eine 50% Chance, ein Bonus-*Darkness*-Päckchen zu erhalten.\n\n🎲 Beim Öffnen eines *Darkness*-Päckchens kannst du mit 10% Chance spezielle Darkness-Pokémon finden.\n\nVerwende *.apripokemon darkness* zum Öffnen von Darkness-Päckchen.\n\nViel Glück! 🍀",
trisAlreadyPlaying: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❗ Du spielst bereits\n  ━━✫ mit jemandem\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
trisNoRoomName: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❗ Du musst dem Raum einen Namen geben\n  ━━✫ Beispiel: ${prefix}${command} raum1\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
trisGameStarting: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🕹️ ୭ *SPIEL STARTET*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Ein Spieler ist beigetreten ✦ ꒷꒦",
trisTurnOf: ({ player }) => `Zug von @${player}`,
trisRoomCreated: () => "𝐑𝐀𝐔𝐌 𝐄𝐑𝐒𝐓𝐄𝐋𝐋𝐓 ✓",
trisWaiting: ({ room }) => `══════ •⊰✧⊱• ══════\n*𝐖𝐚𝐫𝐭𝐞 𝐚𝐮𝐟 𝐒𝐩𝐢𝐞𝐥𝐞𝐫 ...*\n══════════════\n🕹️ 𝐙𝐮𝐦 𝐁𝐞𝐢𝐭𝐫𝐢𝐭𝐭𝐞𝐧\n.gioca ${room}\n══════════════\n⛔ 𝐙𝐮𝐦 𝐕𝐞𝐫𝐥𝐚𝐬𝐬𝐞𝐧 𝐝𝐞𝐬 𝐒𝐩𝐢𝐞𝐥𝐬\n𝐞𝐢𝐧𝐠𝐚𝐛𝐞 .esci\n══════ •⊰✧⊱• ══════`,
slotInvalidBet: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ungültiger Einsatz\n  ━━✫ Beispiel: ${prefix}${command} 100\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
slotInsufficientUC: ({ bet }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚫 Nicht genug UC\n  ━━✫ Du brauchst ${bet} UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
slotCooldown: ({ min, sec }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Warte ${min}m ${sec}s\n  ━━✫ bevor du wieder spielst\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
slotWin: ({ uc, xp }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *DU HAST GEWONNEN!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Gewinne ✦ ꒷꒦\n\n┌──────────────\n│ ➕ *${uc} UC*\n│ ➕ *${xp} XP*\n└──────────────`,
slotLose: ({ uc, xp }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤡 ୭ *DU HAST VERLOREN!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Verluste ✦ ꒷꒦\n\n┌──────────────\n│ ➖ *${uc} UC*\n│ ➖ *${xp} XP*\n└──────────────`,
slotBalance: ({ uc, xp, current, max, prefix }) => `\n💎 *AKTUELLER KONTOSTAND*\n\n┌──────────────\n│ 👛 *UC: ${uc}*\n│ ⭐ *XP: ${xp}*\n│ 📊 *Fortschritt: ${current}/${max} XP*\n└──────────────\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ℹ️\n│ Verwende ${prefix}menuxp für mehr XP!\n╰★────★────★╯`,
betUsage: ({ prefix, command }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎰 ୭ *CASINO*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ So spielst du ✦ ꒷꒦\n\nGib die Anzahl der 💶 UnityCoins ein, die du gegen *ChatUnity-Bot* setzen möchtest\n\n📌 Beispiel:\n${prefix}${command} 100\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎲\n│ Wähle unten einen Betrag!\n╰★────★────★╯`,
betCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Du hast bereits gesetzt\n  ━━✫ Warte ⏱ ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
betLose: ({ bot, user, amount, botName, userName }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎲 ୭ *ERGEBNIS*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Gezogene Zahlen ✦ ꒷꒦\n\n🤖 *${botName}*: ${bot}\n👤 *${userName}*: ${user}\n\n╭★────★────★────★╮\n│ 😢 DU HAST VERLOREN!\n│ ➖ ${amount} 💶 UC\n╰★────★────★╯`,
betWin: ({ bot, user, amount, botName, userName }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎲 ୭ *ERGEBNIS*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Gezogene Zahlen ✦ ꒷꒦\n\n🤖 *${botName}*: ${bot}\n👤 *${userName}*: ${user}\n\n╭★────★────★────★╮\n│ 🎉 DU HAST GEWONNEN!\n│ ➕ ${amount} 💶 UC\n╰★────★────★╯`,
betDraw: ({ bot, user, amount, botName, userName }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎲 ୭ *ERGEBNIS*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Gezogene Zahlen ✦ ꒷꒦\n\n🤖 *${botName}*: ${bot}\n👤 *${userName}*: ${user}\n\n╭★────★────★────★╮\n│ 🤝 UNENTSCHIEDEN!\n│ ↩️ ${amount} 💶 UC zurückerstattet\n╰★────★────★╯`,
betInsufficientUC: ({ amount }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 💸 Du hast nicht ${amount} 💶 UC\n  ━━✫ zum Setzen!\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rpsAlreadyPlaying: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏱ Du hast bereits gespielt\n  ━━✫ Warte ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rpsChooseOption: () => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ✊ ୭ *SCHERE STEIN PAPIER*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Wähle deinen Zug ✦ ꒷꒦\n\n🪨 Stein schlägt Schere\n📄 Papier schlägt Stein\n✂️ Schere schlägt Papier\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎲\n│ Triff deine Wahl!\n╰★────★────★╯`,
rpsInvalidOption: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ungültige Wahl\n  ━━✫ Wähle: sasso/carta/forbice\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rpsDraw: ({ player, bot, reward }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤝 ୭ *UNENTSCHIEDEN!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Ergebnis ✦ ꒷꒦\n\n👤 Du: ${player}\n🤖 Bot: ${bot}\n\n╭★────★────★────★╮\n│ 🎁 Trostpreis\n│ ➕ ${reward} 💶 UC\n╰★────★────★╯`,
rpsWin: ({ player, bot, reward }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *DU HAST GEWONNEN!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Ergebnis ✦ ꒷꒦\n\n👤 Du: ${player}\n🤖 Bot: ${bot}\n\n╭★────★────★────★╮\n│ 🏆 Epischer Sieg!\n│ ➕ ${reward} 💶 UC\n╰★────★────★╯`,
rpsLose: ({ player, bot, loss }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 😢 ୭ *DU HAST VERLOREN!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Ergebnis ✦ ꒷꒦\n\n👤 Du: ${player}\n🤖 Bot: ${bot}\n\n╭★────★────★────★╮\n│ 💸 Nächstes Mal mehr Glück\n│ ➖ ${loss} 💶 UC\n╰★────★────★╯`,
rpsRock: () => "🪨 Stein",
rpsPaper: () => "📄 Papier",
rpsScissors: () => "✂️ Schere",
rpsButtonRock: () => "🪨 Stein",
rpsButtonPaper: () => "📄 Papier",
rpsButtonScissors: () => "✂️ Schere",
rpsButtonRetry: () => "🔄 Nochmal versuchen",
bjInsufficientFunds: () => "💰 Nicht genug Geld!",
bjNotYourTurn: () => "❌ Nicht dein Zug!",
bjBusted: () => "💥 Bust! Du hast über 21!",
bjDealerBusted: () => "🎉 Dealer bust! Du gewinnst!",
bjYouWin: () => "🎉 Du gewinnst!",
bjDealerWins: () => "😔 Dealer gewinnt!",
bjPush: () => "🤝 Unentschieden!",
bjMakeBet: () => "💵 Mache deinen Einsatz!",
bjYourTurn: () => "📋 Dein Zug! Ziehen oder Stehen?",
bjYourScore: ({ score }) => `📋 Dein Punktestand: ${score}`,
bjTimeoutTitle: () => "⏰ ZEIT ABGELAUFEN",
bjTimeoutMsg: ({ balance }) => `⏰ Zeit abgelaufen! Spiel abgebrochen.\n💶 Geldbörse: ${balance} UC`,
bjGameInProgress: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🎰 Spiel bereits im Gange\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjInvalidBet: ({ max }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ungültiger Einsatz\n  ━━✫ Betrag: 10-${max} UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
bjStartCaption: ({ name, bet, balance }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎰 ୭ *BLACKJACK*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ ${name} ✦ ꒷꒦\n\n💶 Einsatz: ${bet} UC\n📋 Guthaben: ${balance} UC\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ⚡\n│ .hit .stand .double\n╰★────★────★╯`,
bjNoGame: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Kein Spiel im Gange\n  ━━✫ Verwende: .blackjack [Einsatz]\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjNotYourGame: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Nicht dein Spiel!\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjDoubleOnlyTwo: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Nur mit 2 Karten verdoppeln\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjDoubleInsufficientFunds: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Nicht genug Geld\n  ━━✫ zum Verdoppeln\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjFooter: () => "♠️ Blackjack Bot ♣️",
bjPlayer: () => "SPIELER",
bjDealer: () => "DEALER",
bjScore: () => "PUNKTESTAND",
bjWallet: () => "💶 GELDBÖRSE",
bjBet: () => "🎯 EINSATZ",
rouletteCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Du hast bereits gesetzt\n  ━━✫ Warte ⏱ ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteUsage: ({ prefix, command }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎰 ୭ *ROULETTE*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ So spielst du ✦ ꒷꒦\n\nGib Betrag und Farbe ein:\n${prefix}${command} 20 black\n${prefix}${command} 50 red\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎲\n│ Wähle deine Farbe!\n╰★────★────★╯`,
rouletteInvalidFormat: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Falsches Format\n  ━━✫ Beispiel: ${prefix}${command} 20 black\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteInvalidAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Ungültiger Betrag\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteMaxBet: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Maximal 50 💶 UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteInvalidColor: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Ungültige Farbe\n  ━━✫ Wähle: black oder red\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteInsufficientFunds: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Nicht genug 💶 UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteBetPlaced: ({ amount, color }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎰 ୭ *WETTE GESETZT*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Details ✦ ꒷꒦\n\n💰 Betrag: ${amount} 💶 UC\n🎨 Farbe: ${color === 'black' ? '⚫ SCHWARZ' : '🔴 ROT'}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ⏱\n│ Warte 10 Sekunden...\n╰★────★────★╯`,
rouletteWin: ({ amount, total, winColor }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *DU HAST GEWONNEN!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Ergebnis ✦ ꒷꒦\n\n🎯 Gefallene Farbe: ${winColor === 'black' ? '⚫ SCHWARZ' : '🔴 ROT'}\n\n╭★────★────★────★╮\n│ 💰 Gewinn: +${amount} 💶 UC\n│ 💎 Gesamt: ${total} 💶 UC\n╰★────★────★╯`,
rouletteLose: ({ amount, total, winColor }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 😢 ୭ *DU HAST VERLOREN!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Ergebnis ✦ ꒷꒦\n\n🎯 Gefallene Farbe: ${winColor === 'black' ? '⚫ SCHWARZ' : '🔴 ROT'}\n\n╭★────★────★────★╮\n│ 💸 Verlust: -${amount} 💶 UC\n│ 💎 Gesamt: ${total} 💶 UC\n╰★────★────★╯`,
rouletteBlack: () => "⚫ Schwarz",
rouletteRed: () => "🔴 Rot",
rouletteButtonBlack10: () => "⚫ 10 UC",
rouletteButtonBlack25: () => "⚫ 25 UC",
rouletteButtonBlack50: () => "⚫ 50 UC",
rouletteButtonRed10: () => "🔴 10 UC",
rouletteButtonRed25: () => "🔴 25 UC",
rouletteButtonRed50: () => "🔴 50 UC",
// Münzwurf
cfCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Du hast bereits gespielt\n  ━━✫ Warte ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cfWaiting: ({ player }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🪙 ୭ *KOPF ODER ZAHL*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Spiel gestartet ✦ ꒷꒦\n\n🧑 Spieler 1: @${player}\n🕹️ Warte auf zweiten Spieler...\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎲\n│ Schreibe Kopf oder Zahl!\n╰★────★────★╯`,
cfPlayer1Ready: ({ player, choice }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🪙 ୭ *KOPF ODER ZAHL*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Spieler 1 bereit ✦ ꒷꒦\n\n🧑 @${player} wählte *${choice}*\n🎯 Warte auf Spieler 2...\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎮\n│ Du bist dran!\n╰★────★────★╯`,
cfInvalidChoice: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Ungültige Wahl\n  ━━✫ Schreibe: Kopf oder Zahl\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cfResult: ({ result, p1, p2, msg, prefix, command }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🪙 ୭ *ERGEBNIS: ${result.toUpperCase()}*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n${msg}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔄\n│ ${prefix}${command} zum erneuten Spielen\n╰★────★────★╯`,
cfAlreadyChosen: ({ choice }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ Du hast bereits ${choice} gewählt\n  ━━✫ Warte auf einen anderen Spieler\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cfNotAvailable: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Spiel nicht verfügbar\n  ━━✫ ${prefix}${command} zum Starten\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cfButtonHeads: () => "🪙 Kopf",
cfButtonTails: () => "🪙 Zahl",

// Schere Stein Papier v2
rps2Cooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Warte ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rps2Usage: ({ prefix, command }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ✊ ୭ *SCHERE STEIN PAPIER*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ So spielst du ✦ ꒷꒦\n\n${prefix}${command} stein\n${prefix}${command} papier\n${prefix}${command} schere\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎮\n│ Wähle deinen Zug!\n╰★────★────★╯`,
rps2InvalidChoice: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ungültige Wahl\n  ━━✫ ${prefix}${command} stein/papier/schere\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rps2Draw: ({ bot, reward }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤝 ୭ *UNENTSCHIEDEN!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Bot: ${bot} ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ 🎁 +${reward} 💶 UC\n╰★────★────★╯`,
rps2Win: ({ bot, reward }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *DU HAST GEWONNEN!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Bot: ${bot} ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ 💰 +${reward} 💶 UC\n╰★────★────★╯`,
rps2Lose: ({ bot, loss }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 😢 ୭ *DU HAST VERLOREN!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Bot: ${bot} ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ 💸 -${loss} 💶 UC\n╰★────★────★╯`,
rps2ButtonRock: () => "🪨 Stein",
rps2ButtonPaper: () => "📄 Papier",
rps2ButtonScissors: () => "✂️ Schere",

// Pokedex
pokedexNoName: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Gib einen Pokémon-Namen ein\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokedexSearching: ({ name }) => `🔍 Suche ${name}...`,
pokedexError: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Pokémon-Suchfehler\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokedexInfo: ({ name, id, type, abilities, height, weight, desc, url }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎌 ୭ *POKÉDEX - ${name}*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Informationen ✦ ꒷꒦\n\n🔹 *Name:* ${name}\n🔹 *ID:* ${id}\n🔹 *Typ:* ${type}\n🔹 *Fähigkeiten:* ${abilities}\n🔹 *Größe:* ${height}\n🔹 *Gewicht:* ${weight}\n\n📝 *Beschreibung:*\n${desc}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🌐\n│ ${url}\n╰★────★────★╯`,
flagGameActive: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Spiel bereits aktiv\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagGroupOnly: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Nur für Gruppen\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagNoGame: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Kein aktives Spiel\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagAdminOnly: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Nur für Admins\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Warte ${time}s\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagSkipped: ({ answer }) => `ㅤ⋆｡˚『 ╭ \`SPIEL ABGEBROCHEN\` ╯ 』˚｡⋆\n╭\n│ 『 🏳️ 』 \`Die Antwort war:\`\n│ 『 ‼️ 』 *\`${answer}\`*\n│ 『 👑 』 _*Von einem Admin abgebrochen*_\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagStart: ({ phrase }) => `ㅤ⋆｡˚『 ╭ \`${phrase}\` ╯ 』˚｡⋆\n╭\n│ 『 🏳️ 』 \`Antworte mit dem Namen\` *des Landes*\n│ 『 ⏱️ 』 \`Verfügbare Zeit:\` *30 Sekunden*\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagTimeout: ({ answer }) => `ㅤ⋆｡˚『 ╭ \`ZEIT ABGELAUFEN!\` ╯ 』˚｡⋆\n╭\n│ 『 🏳️ 』 \`Die Antwort war:\`\n│ 『 ‼️ 』 *\`${answer}\`*\n│ 『 💡 』 _*Sei nächstes Mal schneller!*_\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagCorrect: ({ answer, time, reward, exp, bonus }) => `ㅤ⋆｡˚『 ╭ \`RICHTIGE ANTWORT!\` ╯ 』˚｡⋆\n╭\n│ 『 🏳️ 』 \`Land:\` *${answer}*\n│ 『 ⏱️ 』 \`Benötigte Zeit:\` *${time}s*\n│ 『 🎁 』 \`Belohnungen:\`\n│ 『 💰 』 *${reward}€* ${bonus > 0 ? `(+${bonus} Geschwindigkeitsbonus)` : ''}\n│ 『 🆙 』 *${exp} EXP*\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagAlmostThere: () => "👀 *Fast geschafft!*",
flagAttemptsExhausted: () => `ㅤ⋆｡˚『 ╭ \`VERSUCHE AUFGEBRAUCHT!\` ╯ 』˚｡⋆\n╭\n│ 『 ❌ 』 \`Du hast deine 3 Versuche aufgebraucht!\`\n│ 『 ⏳ 』 _*Warte, bis andere es versuchen...*_\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagWrongHint: ({ letter, length }) => `❌ *Falsche Antwort!*\n\n💡 *Hinweis:*\n  • Beginnt mit dem Buchstaben *"${letter}"*\n  • Besteht aus *${length} Buchstaben*`,
flagWrong2: ({ remaining }) => `❌ *Falsche Antwort!*\n\n📝 *Verbleibende Versuche:* ${remaining}\n🤔 *Denk gut über deine nächste Antwort nach!*`,
flagWrongLast: () => `❌ *Falsche Antwort!*\n\n📝 *Letzter verbleibender Versuch..*`,
flagPlayAgain: () => "🏳️ Nochmal spielen!",
flagError: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Spielstartfehler\n  ━━✫ Versuche es in ein paar Sekunden erneut\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagPhrase1: () => "🇺🇳 *ERRATE DIE FLAGGE!* 🇺🇳",
flagPhrase2: () => "🌍 *Welches Land repräsentiert diese Flagge?*",
flagPhrase3: () => "🏳️ *Geografische Herausforderung: Erkennst du diese Flagge?*",
flagPhrase4: () => "🧭 *Errate das Land anhand seiner Flagge!*",
flagPhrase5: () => "🎯 *Flaggen-Quiz: Welches Land ist das?*",
flagPhrase6: () => "🌟 *Teste dein geografisches Wissen!*",
flagPhrase7: () => "🔍 *Schau genau hin und errate das Land!*",
songGameActive: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Spiel bereits im Gange\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
songError: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Spielfehler\n  ━━✫ Versuche es später erneut\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
songStart: ({ artist, time }) => `  ⋆｡˚『 ╭ \`ERRATE DEN SONG\` ╯ 』˚｡⋆\n╭\n┃ 『 ⏱️ 』 \`Zeit:\` *${time} Sekunden*\n┃ 『 👤 』 \`Künstler:\` *${artist}*\n┃\n┃ ➤  \`Schreibe den Titel!\`\n╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒`,
songTimeout: ({ title, artist }) => `ㅤ⋆｡˚『 ╭ \`ZEIT ABGELAUFEN\` ╯ 』˚｡⋆\n╭\n│\n│ ➤ \`Niemand hat es erraten!\`\n┃ 『  』🎵 \`Titel:\` *${title}*\n┃ 『  』👤 \`Künstler:\` *${artist}*\n┃\n╰⭒─ׄ─ׅ─ׄ─⭒`,
songCorrect: ({ title, artist, reward, exp }) => `ㅤㅤ⋆｡˚『 ╭ \`KORREKT\` ╯ 』˚｡⋆\n╭\n│\n│ ➤ \`Richtige Antwort!\`\n┃ 『  』🎵 \`Titel:\` *${title}*\n┃ 『  』👤 \`Künstler:\` *${artist}*\n┃\n┃ 『 🎁 』 \`Gewinne:\`\n│ ➤  \`${reward}\` *UC*\n│ ➤  \`${exp}\` *EXP*\n┃\n╰⭒─ׄ─ׅ─ׄ─⭒`,
songAlmostThere: () => "👀 *Fast geschafft!* Versuche es erneut...",
songPlayAgain: () => "『 🎵 』 Nochmal spielen",
songExternalTitle: () => "errate den song",
songExternalArtist: ({ artist }) => `Künstler: ${artist}`,
songExternalSource: () => "ChatUnity Bot",
logoGroupOnly: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Nur für Gruppen\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoNoGame: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Kein aktives Spiel\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoAdminOnly: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Nur Admin\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoSkipped: ({ answer }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🛑 ୭ *SPIEL ABGEBROCHEN*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Die Antwort war ✦ ꒷꒦\n\n🚗 *${answer}*`,
logoGameActive: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Spiel bereits im Gange\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Warte ${time}s\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoStart: ({ phrase, time }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚗 ୭ *${phrase}*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Errate die Marke ✦ ꒷꒦\n\n⌛ Zeit: ${time} Sekunden\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔍\n│ Schreibe den Namen der Marke!\n╰★────★────★╯`,
logoTimeout: ({ answer }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⏰ ୭ *ZEIT ABGELAUFEN!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Die Antwort war ✦ ꒷꒦\n\n🚗 *${answer}*\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔄\n│ Versuche es erneut mit .auto\n╰★────★────★╯`,
logoCorrect: ({ brand, time, reward, exp, bonus }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *RICHTIGE ANTWORT!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Details ✦ ꒷꒦\n\n🚗 Marke: *${brand}*\n⏱ Zeit: *${time}s*\n\n╭★────★────★────★╮\n│ 🎁 Belohnungen:\n│ • ${reward} 💰 UC${bonus > 0 ? ` (+${bonus} Bonus)` : ''}\n│ • ${exp} 🆙 EXP\n╰★────★────★╯\n\n> \\by ChatUnity\\`,
logoPhrase1: () => "🚘 ERRATE DAS LOGO!",
logoPhrase2: () => "🏁 Welche Marke ist das?",
logoPhrase3: () => "🔍 Erkennst du dieses Auto?",
logoPhrase4: () => "🚗 Auto-Quiz!",
logoPhrase5: () => "🏎️ Errate die Marke!",
logoButtonPlayAgain: () => "🚗 Nochmal spielen",
missionMainTitle: ({ bot }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎯 ୭ *MISSIONSYSTEM*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ ${bot} ✦ ꒷꒦`,
missionMainStats: ({ user, money, bank, dailyDone, dailyTotal, weeklyDone, weeklyTotal }) => `👤 Benutzer: @${user}\n💰 Guthaben: ${money} UC\n🏦 Bank: ${bank} UC\n📅 Täglich: ${dailyDone}/${dailyTotal} abgeschlossen\n📆 Wöchentlich: ${weeklyDone}/${weeklyTotal} abgeschlossen\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎯\n│ Wähle die Art der Missionen:\n╰★────★────★╯`,
missionButtonDaily: () => "📅 TÄGLICH",
missionButtonWeekly: () => "📆 WÖCHENTLICH",
missionButtonClaim: () => "💰 EINLÖSEN",
missionButtonBack: () => "🔙 ZURÜCK",
missionButtonWallet: () => "💰 GELDBÖRSE",
missionDailyTitle: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📅 ୭ *TÄGLICHE MISSIONEN*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n👤 @${user}`,
missionDailyReset: ({ time }) => `⏳ Reset in: ${time}`,
missionWeeklyTitle: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📆 ୭ *WÖCHENTLICHE MISSIONEN*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n👤 @${user}`,
missionWeeklyReset: ({ time }) => `⏳ Reset in: ${time}`,
missionEntry: ({ num, title, progress, target, reward, status }) => `▢ *${num}. ${title}*\n➠ Fortschritt: ${progress}/${target}\n➠ Belohnung: ${reward} UC\n➠ Status: ${status}`,
missionStatusCompleted: () => "✅ EINGELÖST",
missionStatusReady: () => "💰 BEREIT",
missionStatusInProgress: () => "❌ IN BEARBEITUNG",
missionFooterDaily: ({ prefix }) => `Verwende "${prefix}missioni claim" zum Einlösen!`,
missionFooterWeekly: () => "Wöchentliche Missionen - Größere Belohnungen!",
missionFooterMain: () => "Schließe Missionen ab, um UnityCoins zu verdienen!",
missionNoRewards: ({ user }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ @${user} du hast keine Missionen\n  ━━✫ zum Einlösen abgeschlossen!\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
missionClaimSuccess: ({ user, total, details, money, bank }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *BELOHNUNGEN EINGELÖST*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n👤 @${user}\n💰 Insgesamt eingelöst: *${total} UC*\n\n${details}\n\n╭★────★────★────★╮\n│ 💰 Guthaben: ${money} UC\n│ 🏦 Bank: ${bank} UC\n╰★────★────★╯`,
missionClaimFooter: () => "Verwende .portafoglio für den vollständigen Kontostand",
missionSendMessages: ({ count }) => `Sende ${count} Nachrichten`,
missionExecuteCommands: ({ count }) => `Führe ${count} Befehle aus`,
missionNoWarn: () => "Bleibe ohne Warnungen",
missionNoWarnWeek: () => "Bleibe 7 Tage ohne Warnungen",
missionTotalMessages: ({ count }) => `Erreiche ${count} Gesamtnachrichten`,
walletNotFound: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Benutzer nicht gefunden\n  ━━✫ in der Datenbank\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
walletTitle: () => "💰 GELDBÖRSE",
walletInfo: ({ name, uc, bank }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💰 ୭ *GELDBÖRSE*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ ${name} ✦ ꒷꒦\n\n👤 Benutzer: ${name}\n💰 UnityCoins: ${uc} 💶\n🏛️ Bank: ${bank} 💳\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 💎\n│ Verwende .deposit zum Einzahlen\n│ Verwende .withdraw zum Abheben\n╰★────★────★╯`,
walletExternalTitle: ({ name }) => `Geldbörse von ${name}`,
walletExternalBody: ({ uc }) => `Guthaben: ${uc} UC`,
walletButtonDeposit: () => "🏛️ Einzahlen",
walletButtonWithdraw: () => "💰 Abheben",
walletButtonGames: () => "🎮 Spiele",
bankNotFound: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Benutzer nicht gefunden\n  ━━✫ in der Datenbank\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
bankYourBalance: ({ balance }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🏛️ ୭ *DEIN KONTO*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Bankguthaben ✦ ꒷꒦\n\n💰 Du hast *${balance} 💶 UnityCoins*\nin deiner Bank 🏛️\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 💎\n│ Verwende .deposit zum Einzahlen\n│ Verwende .withdraw zum Abheben\n╰★────★────★╯`,
bankUserBalance: ({ user, balance }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🏛️ ୭ *BANKKONTO*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ @${user} ✦ ꒷꒦\n\n💰 Hat *${balance} 💶 UnityCoins*\nin der Bank 🏛️`,
bankButtonDeposit: () => "🏛️ Einzahlen",
bankButtonWithdraw: () => "💰 Abheben",
bankButtonTransfer: () => "💸 Überweisen",
transferNoMention: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Erwähne den Empfänger\n  ━━✫ Beispiel: @benutzer 100\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferNoAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Gib die Anzahl\n  ━━✫ der 💶 UnityCoins zum Überweisen ein\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferInvalidAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ungültiger Betrag\n  ━━✫ Verwende nur Zahlen\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferMinAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Mindestüberweisung: 1 UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferInsufficient: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 💸 Nicht genug Guthaben\n  ━━✫ für diese Überweisung\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferSuccess: ({ amount, fee, total }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💸 ୭ *ÜBERWEISUNG ERFOLGREICH*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Transaktionsdetails ✦ ꒷꒦\n\n💰 Gesendeter Betrag: *${amount}* 💶 UC\n📊 Gebühr 2%: *${fee}* 💶 UC\n💳 Insgesamt belastet: *${total}* 💶 UC\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ✅\n│ Überweisung abgeschlossen!\n╰★────★────★╯`,
transferReceived: ({ amount }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💰 ୭ *UC EMPFANGEN*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Du hast erhalten ✦ ꒷꒦\n\n💶 *+${amount} UnityCoins*\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎁\n│ Überprüfe dein Guthaben!\n╰★────★────★╯`,
transferSelf: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Du kannst nicht an\n  ━━✫ dich selbst überweisen\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
robNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🧠 Markiere jemanden oder\n  ━━✫ antworte auf eine Nachricht\n  ━━✫ Beispiel: ${prefix}${command} @benutzer\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
robSelf: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🤡 Du kannst nicht von\n  ━━✫ dir selbst stehlen\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
robCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚨 Du hast bereits gestohlen\n  ━━✫ Versuche es in ⏱ ${time} erneut\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
robSuccess: ({ amount, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💰 ୭ *ERFOLGREICHER DIEBSTAHL!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Perfekter Diebstahl ✦ ꒷꒦\n\nDu hast *${amount} 💶 UC* gestohlen\nvon @${target}\n\n╭★────★────★────★╮\n│ 💸 +${amount} 💶 UC\n│ ୭ ˚. ᵎᵎ ✅ Zu deinem Guthaben\n╰★────★────★╯`,
robCaught: ({ fine, name }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚓 ୭ *VERHAFTET!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Von der Polizei erwischt ✦ ꒷꒦\n\n${name} wurde aufgehalten!\n\n╭★────★────★────★╮\n│ 💸 Strafe: -${fine} 💶 UC\n│ ୭ ˚. ᵎᵎ ❌ Nächstes Mal mehr Glück\n╰★────★────★╯`,
robPartial: ({ amount, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💸 ୭ *TEILWEISER DIEBSTAHL*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Fast geschafft ✦ ꒷꒦\n\nDu hast nur *${amount} 💶 UC* gestohlen\nvon @${target}\n\n╭★────★────★────★╮\n│ 💰 +${amount} 💶 UC\n│ ୭ ˚. ᵎᵎ ⚠️ Zu deinem Guthaben\n╰★────★────★╯`,
robButtonRetry: () => "🔄 Nochmal versuchen",
robButtonWallet: () => "💰 Geldbörse",
withdrawNoAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Gib die Anzahl\n  ━━✫ der 💶 UnityCoins zum Abheben ein\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawNoFunds: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Du hast keine 💶 UnityCoins\n  ━━✫ auf dem Bankkonto\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawInvalidAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Ungültige Anzahl\n  ━━✫ Verwende eine gültige Zahl\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawMinAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Gib mindestens 1 UC ein\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawInsufficientFunds: ({ bank }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Du hast nur *${bank}* 💶 auf dem Konto\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawSuccess: ({ count, bank }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ✅ ୭ *ABHEBUNG ERFOLGREICH*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Du hast abgehoben ✦ ꒷꒦\n\n💶 *${count} UnityCoins*\nvom Bankkonto\n\n💳 Neues Bankguthaben: *${bank} UC*\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 💼\n│ Verwende .wallet zur Überprüfung\n╰★────★────★╯`,
xpLevelDisplay: ({ level }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧  Level: ${level}`,
xpProgressDisplay: ({ current, needed }) => `XP-Fortschritt: ${current} / ${needed}`,
xpFooterText: () => "╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐ Schreibe weiter, um aufzusteigen!",
xpCaption: ({ user, level, exp, next }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧\n\n┊ 『 📊 』 XP-Profil von ${user}\n\n┃ Aktuelles Level: ${level}\n┃ Gesamterfahrung: ${exp}\n┃ Fehlende XP zum nächsten Level: ${next}\n\n╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
rubaxpWait: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Du musst noch warten, bevor du wieder stehlen kannst\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpWaitTime: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Du musst noch ${time} warten, bevor du wieder stehlen kannst\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 📍 Du musst einen gültigen Benutzer markieren\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpUserNotFound: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Benutzer nicht in der Datenbank gefunden\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpTooPoor: ({ target, limit }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😢 @${target} hat weniger als *${limit} XP*\n  ━━✫ Stehle nicht von Armen, sei nett\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpSuccess: ({ amount, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ✅ ୭ *DIEBSTAHL ERFOLGREICH*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Du hast gestohlen ✦ ꒷꒦\n\n💰 *${amount} XP*\nvon @${target}\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎮\n│ Mach weiter so!\n╰★────★────★╯`,
rubaxpTimeFormat: ({ hours, minutes, seconds }) => `${hours} Stunde(n) ${minutes} Minute(n) ${seconds} Sekunde(n)`,
darxpNoMention: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Du musst einen Benutzer mit @benutzer erwähnen\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpNoAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Gib die Anzahl der 💫 XP zum Überweisen ein\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpInvalidAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Gib nur gültige Zahlen ein\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpMinAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Das Minimum zum Überweisen ist 1 💫 XP\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpInsufficientXP: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Du hast nicht genug 💫 XP zum Überweisen\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpSuccess: ({ xp, tassa }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n  ୧ ✅ ୭ *ÜBERWEISUNG ERFOLGREICH*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Du hast überwiesen ✦ ꒷꒦\n\n💫 *${xp} XP*\n(Gebühr: ${tassa} XP)\n╭★────★────★────★╮\n│ Spiel weiter!\n╰★────★────★╯`,
marry_no_target: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Du musst einen Benutzer zum Heiraten erwähnen
  ━━✫ Verwende: ${prefix + command} @benutzer
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_self: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Du kannst dich nicht selbst heiraten
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_user_not_found: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Benutzer nicht in der Datenbank gefunden
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_already_married_sender: ({ spouse }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💍 ୭ *DU BIST BEREITS VERHEIRATET*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ Du bist verheiratet mit ✦ ꒷꒦

❤ ${spouse}

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
marry_already_married_target: ({ target }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 ${target} ist bereits verheiratet
  ━━✫ Suche jemand anderen, der single ist
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_pending_proposal: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Du hast bereits einen Heiratsantrag ausstehend
  ━━✫ Warte, bis er angenommen oder abgelehnt wird
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_proposal_text: ({ sender, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💍 ୭ *HEIRATSANTRAG*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ ${sender} hat um die Hand von ✦ ꒷꒦

❤ ${target}

Antworte mit "Ja" zum Annehmen
oder "Nein" zum Ablehnen.

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
marry_proposal_expired: ({ sender, target }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⏳ Der Antrag zwischen ${sender} und ${target}
  ━━✫ ist aufgrund von Inaktivität abgelaufen
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_proposal_rejected: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 💔 Der Antrag wurde abgelehnt
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_user_not_found_db: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Fehler: Benutzer nicht in der Datenbank gefunden
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_success: ({ sender, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💍 ୭ *EHE REGISTRIERT*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ Neues offizielles Paar ✦ ꒷꒦

❤ ${sender}  ×  ${target}

꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧
Möge die Liebe beginnen!

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
divorce_not_married: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Du bist mit niemandem verheiratet
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
divorce_spouse_not_found: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Dein Ehepartner wurde nicht in der Datenbank gefunden
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
divorce_success: ({ ex }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💔 ୭ *SCHEIDUNG ABGESCHLOSSEN*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ Du hast dich getrennt von ✦ ꒷꒦

${ex}

· ୨୧ · · ୨୧ ·  ♡
Neues Kapitel deines Lebens begonnen.

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
shipNoUser: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❗ Verwende den Befehl so:
  ━━✫ ${prefix + command} @benutzer
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
shipNoUsersPair: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❗ Verwende den Befehl so:
  ━━✫ ${prefix + command} @benutzer1 [@benutzer2]
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
shipInvalidUsers: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❌ Ungültige Benutzer
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
shipCaption: ({ user1, user2, percent }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

💘 *@${user1}* ❤️ *@${user2}*
🔮 Kompatibilität: *${percent}%*

· ୨୧ · · ୨୧ ·  ♡`,
shipErrorImage: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❌ Fehler beim Erstellen des Bildes
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
kissNoTargetMention: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 💋 Du musst jemanden erwähnen oder auf eine Nachricht antworten
  ━━✫ Beispiel: ${prefix + command} @benutzer
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
kissNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 💋 Du musst jemanden zum Küssen erwähnen
  ━━✫ Beispiel: .bacia @benutzer
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
kissSuccess: ({ senderName, targetName }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💋 ୭ *KUSS ÜBERMITTELT*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ ${senderName} hat einen Kuss gegeben an ✦ ꒷꒦

😘 ${targetName}

· ୨୧ · · ୨୧ ·  ♡`,
odioNoText: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 😡 Du musst jemanden angeben
  ━━✫ Beispiel: ${prefix + command} @benutzer
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
odioResult: ({ target, percent }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 😡 ୭ *HASS-RECHNER*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ Hasslevel zwischen ✦ ꒷꒦

${target}  ✕  dir

🔥 Hass: *${percent}%*

꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧`,
rizzNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 Du musst jemanden markieren oder auf eine Nachricht antworten
  ━━✫ Beispiel: ${prefix + command} @benutzer
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rizzSuccess: ({ target, line }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ ✨ ୭ *RIZZ-MOVE*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ @${target} schau hier ✦ ꒷꒦

"${line}"

· ୨୧ · · ୨୧ ·  ♡`,
minacciaNoGroup: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Dieser Befehl kann nur in Gruppen verwendet werden
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
minacciaDisabled: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Drohungen sind in dieser Gruppe deaktiviert
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
minacciaNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 Du musst jemanden zum Bedrohen angeben
  ━━✫ Markiere einen Benutzer oder antworte auf eine Nachricht
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
minacciaText: ({ target, line }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

@${target} ${line}

· ୨୧ · · ୨୧ ·  ♡`,
zizzaniaNoGroup: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Dieser Befehl kann nur in Gruppen verwendet werden
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
zizzaniaDisabled: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Zwietracht ist in dieser Gruppe deaktiviert
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
zizzaniaText: ({ a, line, b }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

@${a} ${line} @${b}

· ୨୧ · · ୨୧ ·  ♡`,
ditalinoNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 Du musst jemanden markieren oder auf eine Nachricht antworten
  ━━✫ Beispiel: ${prefix + command} @benutzer
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
ditalinoStart: ({ target }) => `🤟🏻 Beginne eine Reihe besonderer Streicheleinheiten für *${target}*...`,
ditalinoMiddle: () => "🤟🏻 Fast geschafft...",
ditalinoEnd: () => "👋🏻 Schützt euch vor der Flut!!",
ditalinoResult: ({ target, time }) => `✨ *${target}* ist vor Vergnügen explodiert nach *${time}ms* 🥵`,
segaNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 Du musst jemanden markieren oder auf eine Nachricht antworten
  ━━✫ Beispiel: ${prefix + command} @benutzer
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
segaStart: ({ target }) => `Jetzt kümmern wir uns um ${target}... 😏`,
segaFrame: ({ frame }) => `${frame}`,
segaEnd: ({ target }) => `Oh ${target} hat das maximale Vergnügen erreicht! 😋💦`,
insultNoGroup: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Dieser Befehl kann nur in Gruppen verwendet werden
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
insultDisabled: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Beleidigungen sind in dieser Gruppe deaktiviert
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
insultNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 Wen willst du beleidigen?
  ━━✫ Markiere jemanden oder antworte auf eine Nachricht
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
insultBotLines: () => [
  `Oh nein! Du hast meine Schwachstelle entdeckt: Beleidigungen! Wie werde ich mich jemals erholen?`,
  `Ah, die Kunst, einen Bot zu beleidigen. Ein wahrer Meister der Ironie bist du!`,
  `Unglaublich! Ein Mensch, der einen Bot beleidigt. Epische Wende!`,
  `Du hast mich wirklich mit deiner Fähigkeit verletzt, einen Bot zu beleidigen. Sehr gut!`,
  `Deine Fähigkeit, einen Bot zu beleidigen, ist meine bevorzugte Unterhaltungsquelle.`,
  `Einen Bot beleidigen: große Intelligenz oder große Langeweile?`,
  `Deine Meisterschaft in Bot-Beleidigungen könnte Schule machen.`,
  `Du scheinst der Picasso der Bot-Beleidigungen zu sein, ein wahres Meisterwerk.`,
  `Bot-Beleidigungen sind dein verstecktes Talent. Karriere im digitalen Kabarett in Sicht?`,
  `Die Kühnheit, eine Entität ohne Emotionen zu beleidigen. Preis für Originalität!`
],
insultUserText: ({ target, line }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

@${target} ${line}

· ୨୧ · · ୨୧ ·  ♡`,
friendNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⚠️ Markiere die Person, der du eine Freundschaftsanfrage senden möchtest
  ━━✫ Beispiel: ${prefix}${command} @tag
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
friendSelf: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❌ Du kannst dich nicht selbst zu Freunden hinzufügen
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
friendUserNotFound: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚫 Person nicht im System vorhanden
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
friendAlready: ({ target }) => `✅ @${target} ist bereits unter deinen Freunden.`,
friendPending: () => `⚠️ Eine Freundschaftsanfrage ist bereits im Gange.\nWarte auf eine Antwort oder Stornierung.`,
friendRequestText: ({ target, from }) => `👥 Freundschaftsanfrage im Gange...

@${target}, möchtest du die Freundschaft von @${from} annehmen?

> ⏳ Du hast 60 Sekunden zur Auswahl.`,
friendTimeout: ({ from, target }) => `⏳ Freundschaftsanfrage abgebrochen
> @${from} und @${target} haben nicht innerhalb der Zeitlimit geantwortet.`,
friendRejected: () => `❌ Freundschaftsanfrage abgelehnt.`,
friendAccepted: ({ from }) => `👥 Du und @${from} seid jetzt Freunde!`,
removeFriendNoTarget: () => `⚠️ Markiere die Person, die du aus deiner Freundesliste entfernen möchtest.`,
removeFriendNotInList: ({ target }) => `🚫 @${target} ist nicht unter deinen Freunden.`,
removeFriendSuccess: ({ target }) => `🚫 Du und @${target} seid nicht mehr befreundet.`,
friendsNoData: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⚠️ Keine Benutzerdaten gefunden
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
friendsTitle: ({ name }) => `📜 Freundesliste von ${name}`,
friendsLastNone: () => `👤 Letzter Freund: Niemand`,
friendsLastSome: ({ last }) => `👤 Letzter Freund: @${last}`,
friendsListHeader: () => `👥 Vollständige Liste:`,
friendsListEmpty: () => `│   Niemand, Glückwunsch einsamer Wolf`,
friendsError: () => `❌ Bei der Befehlsausführung ist ein Fehler aufgetreten.`,
lesbicaCalcNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⚠️ Du musst jemanden erwähnen oder auf eine Nachricht antworten
  ━━✫ Beispiel: ${prefix + command} @benutzer
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
lesbicaCalcLine1: ({ tag, percentage }) => `@${tag} ist ${percentage}% lesbisch, der Rest ist nur hormonelle Verwirrung.`,
lesbicaCalcLine2: ({ tag, percentage }) => `Test abgeschlossen: @${tag} hat das Gehirn zu ${percentage}% auf Frauen verdrahtet.`,
lesbicaCalcLine3: ({ tag, percentage }) => `💕 @${tag} schaut Frauen mit der Intensität von ${percentage}% Porno in 4K an.`,
pajeroCalcLine1: ({ tag, percentage }) => `@${tag} ist ${percentage}% Wichser, die restlichen ${100 - percentage}% verbringt er damit, andere Pornos zu suchen.`,
pajeroCalcLine2: ({ tag, percentage }) => `Medizinisches Gutachten: @${tag} ist ${percentage}% Sklave seines eigenen Schwanzes.`,
pajeroCalcLine3: ({ tag, percentage }) => `🍆 @${tag} denkt ${percentage}% der Zeit ans Wichsen, den Rest verbringt er mit Putzen.`,
puttanaCalcLine1: ({ tag, percentage }) => `@${tag} ist ${percentage}% Hure, das Taxameter schaltet sich nie aus.`,
puttanaCalcLine2: ({ tag, percentage }) => `Detaillierte Analyse: @${tag} hat die Preisliste zu ${percentage}% 24/7 geöffnet.`,
puttanaCalcLine3: ({ tag, percentage }) => `💰 @${tag} hat den Hurenrabatt von ${percentage}%, beeilt euch, bevor er steigt.`,
genericCalcLine: ({ tag, percentage, cmd }) => `@${tag} ist ${percentage}% ${cmd}, der Rest ist nur angesammelte Scham.`,
downCalcNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚨 MARKIERE JEMANDEN, GENIE
  ━━✫ Beispiel: ${prefix}${command} @name
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
downCalcLine: ({ name, cmd, percent, frase, verdict }) => `*⚡️ ENDGÜLTIGES URTEIL ⚡️*

*Subjekt:* ${name}
*"${cmd}"-Level:* ${percent}%

*Diagnose:* ${frase}

*Prognose:* ${verdict}`,
downCalcPhrases: () => [
  "So nutzlos, dass sogar der Recycling-Mülleimer ihn ablehnt.",
  "Wenn die Evolution funktionieren würde, wärst du immer noch eine Einzelzelle im Schlamm.",
  "Du hast die emotionale Tiefe einer Pfütze und die Intelligenz eines nassen Steins.",
  "Wenn das Gehirn Kalorien verbrennen würde, würdest du sogar im Schlaf zunehmen.",
  "Wenn du sprichst, hält jeder Neuron auf dem Planeten eine Minute Stille aus Respekt.",
  "Wenn Dummheit erneuerbare Energie wäre, würdest du allein ausreichen, um Europa zu beleuchten.",
  "Du hast den gleichen Nutzen wie ein Regenschirm mit Löchern in einem Hurrikan.",
  "Wenn du ein Bug wärst, würden nicht einmal die Entwickler Zeit verschwenden, dich zu reparieren.",
  "Dein Beitrag zur Welt ist vergleichbar mit dem einer ausgedrückten Zigarette in einer Pfütze.",
  "Du hast die mentale Koordination einer betrunkenen Taube auf der Autobahn."
],
downCalcVerdicts: ({ percent }) => {
  if (percent > 90) return "🔴 IRREPARABLER KLINISCHER FALL. Die Menschheit fordert offiziell eine Rückerstattung.";
  if (percent > 70) return "🟠 BIOLOGISCHE GEFAHR. Vermehrung ohne schriftliche Genehmigung der WHO verboten.";
  if (percent > 40) return "🟡 FABRIKATIONSFEHLER. Nur als Beispiel in Kursen verwenden, was man NICHT werden sollte.";
  return "🟢 STATISTISCHE ANOMALIE. Vielleicht gibt es irgendwo ein Gehirn... unter all dieser Leere.";
},
alcolNoText: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🍷 Kein Name angegeben, ich verwende deinen
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
alcolHigh: () => "🍾 So voll, dass sogar die Leber vorzeitig in Rente gehen wollte.",
alcolMid: () => "🥂 Du trinkst, als gäbe es kein Morgen, aber morgen präsentiert dir die Rechnung.",
alcolLow: () => "🚰 Völlig nüchtern, das Einzige, was sich dreht, ist deine Traurigkeit.",
alcolResult: ({ target, percent, phrase }) => `『💬』 ══ •⊰✰⊱• ══ 『💬』

MOMENT DES ALKOHOLTESTS! 🍷
━━━━━━━━━━━━━━
${target} hat eine Alkoholkonzentration von ${percent}%! 🍷
『💬』 ══ •⊰✰⊱• ══ 『💬』

${phrase}`,
drugNoText: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🌿 Kein Name angegeben, ich verwende deinen
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
drugHigh: () => "🌿 So high, dass wenn er stark atmet, er die Nachbarschaft vergiftet.",
drugMid: () => "🌿 Kann nicht koksen, aber gibt sich so viel Mühe, dass er in medizinischen Handbüchern landen wird.",
drugLow: () => "🌿 Ein Beispiel zum Folgen... in dieser Gruppe ist es fast eine mythische Kreatur.",
drugResult: ({ target, percent, phrase }) => `『💬』 ══ •⊰✰⊱• ══ 『💬』

MOMENT DES DROGENTESTS! 🌿
━━━━━━━━━━━━━━
${target} hat eine Substanzkonzentration im Blut von ${percent}%! 🌿
『💬』 ══ •⊰✰⊱• ══ 『💬』

${phrase}`,
raceCalcNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⚠️ Du musst jemanden markieren oder auf eine Nachricht antworten
  ━━✫ Beispiel: ${prefix + command} @benutzer
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
raceCalcLine: ({ tag, percent, label }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

@${tag} ist ⚫ ${percent}% ${label}

· ୨୧ · · ୨୧ ·  ♡`,
cornutoNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🤔 Name der/die Betrogenen fehlt
  ━━✫ Verwende: .cornuto @name oder antworte auf eine Nachricht
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cornutoSpecialText: () => `🤣 *NU, DA IST DER KÖNIG DER HÖRNER!* 🤣
Man sagt, wenn er die Hörner abnimmt, macht er eine 5G-Antenne📡💀`,
cornutoLow: () => "🛡 Alles ruhig... für jetzt. Aber behalte trotzdem das Telefon des Partners im Auge.",
cornutoMid: () => "😬 Ein paar zu viele archivierte Chats… der Verdacht ist in der Luft.",
cornutoHigh: () => "👀 Hornmesser in höchster Alarmbereitschaft! Die Hörner laden zu 78% auf.",
cornutoMax: () => "🫣 WELTKLASSE: Wenn du Google Maps öffnest, erscheint ein Dreieck aus Hörnern auf deinem Kopf.",
cornutoAdviceHigh: () => "🔔 Rat: Dreh dich nicht um… sie könnten sie als Haltegriff verwenden. 🤣",
cornutoAdviceLow: () => "😌 Atme, für jetzt bist du im Limbus zwischen Seligem und zukünftigem Clubmitglied.",
cornutoResult: ({ target, percent, message, advice }) => `🔍 HORNRECHNER 🔍

👤 ${target}
📈 Hornlevel: ${percent}%
${message}

${advice}`
}