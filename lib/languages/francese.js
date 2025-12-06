export default {
  
  // Système général
  smsAvisoMG: () => "⚠️ Attention !",
  smsWait: () => "⏳ Chargement...",
  smsError: () => "❌ Une erreur s'est produite",
  smsSuccess: () => "✅ Opération réussie",
  smsProcessing: () => "🔄 Traitement en cours...",
  
  // Commandes générales
  smsOnlyGroup: () => "❌ Cette commande fonctionne uniquement dans les groupes !",
  smsOnlyAdmin: () => "❌ Seuls les administrateurs peuvent utiliser cette commande !",
  smsOnlyOwner: () => "❌ Seul le propriétaire peut utiliser cette commande !",
  smsOnlyPremium: () => "💎 Cette commande est réservée aux utilisateurs premium !",
  smsInvalidCommand: () => "❌ Commande invalide",
  smsNoText: () => "❌ Veuillez saisir du texte",
  smsNoMedia: () => "❌ Veuillez envoyer ou répondre à un média",
  
  // IA et ChatGPT
  aiNoQuery: () => "⚠️ *Veuillez saisir une requête valide pour ChatGPT !*\n\n📌 Exemples :\n{prefix}{command} Raconte-moi une blague\n{prefix}{command} Suggère-moi 5 livres fantasy\n{prefix}{command} Code HTML pour une page de connexion",
  aiError: () => "❌ Une erreur s'est produite lors de la génération de la réponse. Veuillez réessayer plus tard.",
  aiProcessing: () => "🤖 Je traite votre demande...",
  
  // Système de bienvenue/d'adieu
  welcomeTitle: () => "✧ BIENVENUE ! ✧",
  goodbyeTitle: () => "✧ AU REVOIR ! ✧",
  welcomeDefault: (user, group, members) => `*Bienvenue* @${user} 🎉\n┊ *Groupe :* ${group}\n╰► *Membres :* ${members}`,
  goodbyeDefault: (user, members) => `*Au revoir* @${user} 👋\n┊ A quitté le groupe\n╰► *Membres restants :* ${members}`,
  
  welcomeSetHelp: () => `🎉 *Configurer le message de bienvenue*

*Utilisation :* {command} <message>

*Variables disponibles :*
• @user - Mention de l'utilisateur
• $nom - Nom de l'utilisateur  
• $groupe - Nom du groupe
• $membres - Nombre de membres
• $numero - Numéro de téléphone
• $tag - Tag utilisateur (alias de @user)

*Exemple :*
{command} Salut @user ! 👋 Bienvenue dans $groupe ! Nous sommes maintenant $membres membres ! 🎉

*Pour rétablir le message par défaut :*
{command} reset`,
  
  goodbyeSetHelp: () => `👋 *Configurer le message d'au revoir*

*Utilisation :* {command} <message>

*Variables disponibles :*
• @user - Mention de l'utilisateur
• $nom - Nom de l'utilisateur  
• $groupe - Nom du groupe
• $membres - Nombre de membres
• $numero - Numéro de téléphone
• $tag - Tag utilisateur (alias de @user)

*Exemple :*
{command} Au revoir @user ! 😢 Tu vas nous manquer dans $groupe. Il reste $membres membres.

*Pour rétablir le message par défaut :*
{command} reset`,
  
  // Système d'avertissement
  warnMentionUser: () => "❌ Vous devez mentionner un utilisateur ou répondre à son message.",
  warnBotImmune: () => "🚫 Vous ne pouvez pas avertir le bot.",
  warnUserNotFound: () => "❌ Utilisateur non trouvé dans la base de données.",
  warnMessage: (params) => `⚠️ 𝐀𝐕𝐄𝐑𝐓𝐈𝐒𝐒𝐄𝐌𝐄𝐍𝐓 {warns}/𝟑 (𝟑 𝐚𝐯𝐞𝐫𝐭𝐢𝐬𝐬𝐞𝐦𝐞𝐧𝐭𝐬=𝐛𝐚𝐧𝐧𝐢𝐬𝐬𝐞𝐦𝐞𝐧𝐭)`,
  warnBanMessage: () => "⛔ 𝐔𝐓𝐈𝐋𝐈𝐒𝐀𝐓𝐄𝐔𝐑 𝐁𝐀𝐍𝐍𝐈 𝐀𝐏𝐑𝐄𝐒 3 𝐀𝐕𝐄𝐑𝐓𝐈𝐒𝐒𝐄𝐌𝐄𝐍𝐓𝐒",
  
  menuownerChooseMenu: () => "Choisissez un menu :",
menuownerMainMenuButton: () => "🏠 Menu Principal",
menuownerAdminMenuButton: () => "🛡️ Menu Admin",
menuownerSecurityMenuButton: () => "🚨 Menu Sécurité",
menuownerGroupMenuButton: () => "👥 Menu Groupe",
menuownerAiMenuButton: () => "🤖 Menu IA",
menuownerTitle: () => "𝑴𝑬𝑵𝑼 𝑷𝑹𝑶𝑷𝑹𝑰𝑬́𝑻𝑨𝑰𝑹𝑬",
menuownerVersionLabel: () => "𝑽𝑬𝑹𝑺𝑰𝑶𝑵",
menuownerCollabLabel: () => "𝐂𝐎𝐋𝐋𝐀𝐁𝐎𝐑𝐀𝐓𝐈𝐎𝐍",
menuownerSupportLabel: () => "𝐒𝐔𝐏𝐏𝐎𝐑𝐓",
menuownerReservedCommands: () => "𝑪𝑶𝑴𝑴𝑨𝑵𝑫𝑬𝑺 𝑹𝑬𝑺𝑬𝑹𝑽𝑬𝑬𝑺 𝑨𝑼 𝑷𝑹𝑶𝑷𝑹𝑰𝑬́𝑻𝑨𝑰𝑹𝑬",
menuownerManageCommand: () => "gérer",
menuownerSetGroupsCommand: () => "groupes",
menuownerAddGroupsCommand: () => "ajoutergroupes",
menuownerResetGroupsCommand: () => "réinitialisergroupes",
menuownerBanUserCommand: () => "bannirutilisateur",
menuownerUnbanUserCommand: () => "débannirutilisateur",
menuownerCleanupCommand: () => "nettoyage",
menuownerGetFileCommand: () => "obtenirfichier",
menuownerSaveCommand: () => "sauvegarderplugin",
menuownerDpCommand: () => "supprimerplugin",
menuownerGetPluginCommand: () => "obtenirplugin",
menuownerJoinCommand: () => "rejoindre",
menuownerOutCommand: () => "quitter",
menuownerPrefixCommand: () => "préfixe",
menuownerResetPrefixCommand: () => "réinitialiserpréfixe",
menuownerGodModeCommand: () => "modeDieu",
menuownerResetCommand: () => "réinitialiser",
menuownerAddCommand: () => "ajouter",
menuownerRemoveCommand: () => "supprimer",
menuownerEveryGroupCommand: () => "chaquegroupe",
menuownerBanChatCommand: () => "bannirdiscussion",
menuownerUnbanChatCommand: () => "débannirdiscussion",
menuownerRestartCommand: () => "redémarrer",
menuownerShutdownBotCommand: () => "éteindrebot",
menuownerUpdateBotCommand: () => "mettreàjourbot",
menuownerPluginParam: () => "plugin",
menuownerLinkParam: () => "lien",
menuownerAutoAdminParam: () => "autoadmin",
menuownerNumMessagesParam: () => "nb. messages",
menuownerCommandParam: () => "commande",
menuownerGroupParam: () => "groupe",

  // Système de menus
  mainMenuTitle: () => '𝑴𝑬𝑵𝑼 𝑷𝑹𝑰𝑵𝑪𝑰𝑷𝑨𝑳',
  adminMenuTitle: () => '𝑴𝑬𝑵𝑼 𝑨𝑫𝑴𝑰𝑵',
  adminCommands: () => '𝑪𝑶𝑴𝑴𝑨𝑵𝑫𝑬𝑺 𝑨𝑫𝑴𝑰𝑵',
  chooseMenu: () => 'Choisissez un menu :',
  mainMenuButton: () => '🏠 Menu Principal',
  ownerMenuButton: () => '👑 Menu Propriétaire',
  securityMenuButton: () => '🚨 Menu Sécurité',
  groupMenuButton: () => '👥 Menu Groupe',
  aiMenuButton: () => '🤖 Menu IA',
  promoteCommand: () => 'promouvoir /mettreadmin',
  demoteCommand: () => 'rétrograder /retireradmin',
  warnCommands: () => 'avertir / retireravertissement',
  muteCommands: () => 'mute / unmute',
  setDescCommand: () => 'setdescription',
  setScheduleCommand: () => 'sethoraire',
  setNameCommand: () => 'setnom',
  hidetagCommand: () => 'hidetag',
  kickCommand: () => 'expulser / kick',
  adminsCommand: () => 'admins',
  tagallCommand: () => 'tagall',
  openCloseCommand: () => 'ouvert / fermé',
  setWelcomeCommand: () => 'setbienvenue',
  setByeCommand: () => 'setaurevoir',
  inactiveCommand: () => 'inactifs',
  listNumCommand: () => 'listenombre + préfixe',
  cleanupCommand: () => 'nettoyage + préfixe',
  clearPlayCommand: () => 'clearplay',
  rulesCommand: () => 'règles/setrègles',
  quarantineCommand: () => 'quarantaine',
  dsCommand: () => 'ds',
  listWarnCommand: () => 'listeavertissements',
  linkCommand: () => 'lien',
  linkQrCommand: () => 'lienqr',
  poweredBy: () => 'ᴘᴏᴡᴇʀᴇᴅ ʙʏ',
  
  // Menu Groupe
  groupMenuTitle: () => '𝑴𝑬𝑵𝑼 𝑮𝑹𝑶𝑼𝑷𝑬',
  memberCommands: () => '𝑪𝑶𝑴𝑴𝑨𝑵𝑫𝑬𝑺 𝑷𝑶𝑼𝑹 𝑳𝑬𝑺 𝑴𝑬𝑴𝑩𝑹𝑬𝑺',
  musicAudioSection: () => 'MUSIQUE & AUDIO',
  infoUtilitySection: () => 'INFORMATIONS & UTILITAIRES',
  imageEditSection: () => 'IMAGES & ÉDITION',
  pokemonSection: () => 'POKÉMON',
  gangSystemSection: () => 'SYSTÈME DE GANG',
  gamesCasinoSection: () => 'JEUX & CASINO',
  economyRankingSection: () => 'ÉCONOMIE & CLASSEMENTS',
  socialInteractionSection: () => 'INTERACTIONS SOCIALES',
  howMuchSection: () => 'C\'EST COMBIEN ?',
  personalityTestSection: () => 'TEST DE PERSONNALITÉ',
  songCommand: () => 'chanson',
  audioCommand: () => 'audio',
  videoCommand: () => 'vidéo',
  artistTitleCommand: () => 'artiste-titre',
  cityCommand: () => 'ville',
  textCommand: () => 'texte',
  groupCommand: () => 'groupe',
  repoCommand: () => 'dépôt',
  userCommand: () => 'utilisateur',
  topicCommand: () => 'sujet',
  checkSiteCommand: () => 'vérifiersite',
  photoToStickerCommand: () => 'photo en sticker',
  stickerToPhotoCommand: () => 'sticker en photo',
  improveQualityCommand: () => 'améliorer qualité photo',
  photoCommand: () => 'photo',
  hiddenPhotoCommand: () => 'photo cachée',
  memeCommand: () => 'meme',
  fromStickerCommand: () => 'depuis sticker',
  blurImageCommand: () => 'flouter image',
  comingSoonCommand: () => 'à venir',
  quantityCommand: () => 'quantité',
  headsOrTailsCommand: () => 'pile ou face',
  mathProblemCommand: () => 'problème maths',
  rockPaperScissorsCommand: () => 'pierre papier ciseaux',
  pokemonInfoCommand: () => 'info Pokémon',
  balanceCommand: () => 'solde',
  topUsersCommand: () => 'top utilisateurs',
  buyUCCommand: () => 'acheter UC',
  withdrawUCCommand: () => 'UC de la banque',
  earnXPCommand: () => 'gagner XP',
  proposalCommand: () => 'proposition',
  endRelationshipCommand: () => 'fin relation',
  affinityCommand: () => 'affinité',
  charmCommand: () => 'charme',
  createFightCommand: () => 'créer disputes',
  truthOrDareCommand: () => 'action ou vérité',
  versionLabel: () => '𝑽𝑬𝑹𝑺𝑰𝑶𝑵',
  supportLabel: () => '𝐒𝐔𝐏𝐏𝐎𝐑𝐓',
  
  // Menu Propriétaire
  ownerMenuTitle: () => '𝑴𝑬𝑵𝑼 𝑷𝑹𝑶𝑷𝑹𝑰𝑬́𝑻𝑨𝑰𝑹𝑬',
  ownerReservedCommands: () => '𝑪𝑶𝑴𝑴𝑨𝑵𝑫𝑬𝑺 𝑹𝑬𝑺𝑬𝑹𝑽𝑬𝑬𝑺 𝑨𝑼 𝑷𝑹𝑶𝑷𝑹𝑰𝑬́𝑻𝑨𝑰𝑹𝑬',
  setNameCommand: () => 'setnom',
  resetNameCommand: () => 'resetnom',
  manageCommand: () => 'gérer',
  setGroupsCommand: () => 'setgroupes',
  addGroupsCommand: () => 'ajoutergroupes',
  resetGroupsCommand: () => 'resetgroupes',
  setPpCommand: () => 'setpp',
  banUserCommand: () => 'bannirutilisateur',
  unbanUserCommand: () => 'débannirutilisateur',
  blockUserCommand: () => 'bloquerutilisateur',
  unblockUserCommand: () => 'débloquerutilisateur',
  getFileCommand: () => 'obtenirfichier',
  saveCommand: () => 'sauvegarder',
  dpCommand: () => 'dp',
  getPluginCommand: () => 'obtenirplugin',
  joinCommand: () => 'rejoindre',
  outCommand: () => 'quitter',
  prefixCommand: () => 'préfixe',
  resetPrefixCommand: () => 'resetpréfixe',
  godModeCommand: () => 'modeDieu',
  resetCommand: () => 'réinitialiser',
  addCommand: () => 'ajouter',
  removeCommand: () => 'supprimer',
  everyGroupCommand: () => 'chaquegroupe',
  banChatCommand: () => 'bannirdiscussion',
  unbanChatCommand: () => 'débannirdiscussion',
  restartCommand: () => 'redémarrer',
  shutdownBotCommand: () => 'éteindrebot',
  updateBotCommand: () => 'mettreàjourbot',
  imageParam: () => 'image',
  pluginParam: () => 'plugin',
  linkParam: () => 'lien',
  autoAdminParam: () => 'autoadmin',
  numMessagesParam: () => 'nb. messages',
  commandParam: () => 'commande',
  groupParam: () => 'groupe',
  
  // Menu IA
  aiMenuTitle: () => '𝑴𝑬𝑵𝑼 𝑰𝑨',
  generalCommands: () => '𝑪𝑶𝑴𝑴𝑨𝑵𝑫𝑬𝑺 𝑮𝑬́𝑵𝑬́𝑹𝑨𝑳𝑬𝑺',
  iaCommand: () => 'ia',
  alyaCommand: () => 'Alya',
  geminiCommand: () => 'gemini',
  chatgptCommand: () => 'chatgpt',
  deepseekCommand: () => 'deepseek',
  voiceCommand: () => 'voix',
  imageCommand: () => 'image',
  image2Command: () => 'image2',
  image3Command: () => 'image3',
  animalInfoCommand: () => 'infoanimal',
  kcalCommand: () => 'kcal',
  summaryCommand: () => 'résumé',
  recipeCommand: () => 'recette',
  
  // Menu Sécurité
  securityMenuTitle: () => '𝑴𝑬𝑵𝑼 𝑺𝑬́𝑪𝑼𝑹𝑰𝑻𝑬́',
  activateDisable: () => '𝐀𝐂𝐓𝐈𝐕𝐄𝐑/𝐃𝐄́𝐒𝐀𝐂𝐓𝐈𝐕𝐄𝐑',
  howToUse: () => '𝐂𝐎𝐌𝐌𝐄𝐍𝐓 𝐔𝐓𝐈𝐋𝐈𝐒𝐄𝐑',
  activateFunction: () => 'activer [fonction]',
  disableFunction: () => 'désactiver [fonction]',

// Plugin Ping/Status
systemStatusTitle: () => "⋆ ★ 🚀 𝑺𝑻𝑨𝑻𝑼𝑻 𝑫𝑼 𝑺𝑻𝑺𝑻𝑬̀𝑴𝑬 🚀 ★ ⋆",
uptime: () => "⌛ *Uptime :*",
ping: () => "⚡ *Ping :*",
cpuLabel: () => "💻 *CPU :*",
cpuUsage: () => "🔋 *Utilisation :*",
ramLabel: () => "💾 *RAM :*",
freeRam: () => "🟢 *Libre :*",
version: () => "Version :",

systemStatus: (params) => `${params?.title || '⋆ ★ 🚀 𝑺𝑻𝑨𝑻𝑼𝑻 𝑫𝑼 𝑺𝑻𝑺𝑻𝑬̀𝑴𝑬 🚀 ★ ⋆'}
╭♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩
୧ ⌛ *Uptime :* ${params?.uptime || 'N/A'}
୧ ⚡ *Ping :* ${params?.ping || 'N/A'} ms
  💻 *CPU :* ${params?.cpuModel || 'Inconnu'}
  🔋 *Utilisation :* ${params?.cpuSpeed || 'N/A'} MHz
  💾 *RAM :* ${params?.ramUsed || 'N/A'} / ${params?.ramTotal || 'N/A'}
  🟢 *Libre :* ${params?.ramFree || 'N/A'}
╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩`,

menuFooter: () => "Choisissez un menu :",
menuAdmin: () => "🛡️ Menu Admin",
menuOwner: () => "👑 Menu Propriétaire",
menuSecurity: () => "🚨 Menu Sécurité",
menuGroup: () => "👥 Menu Groupe",
menuAI: () => "🤖 Menu IA",
mainMenuTitle: () => "𝑴𝑬𝑵𝑼 𝑫𝑼 𝑩𝑶𝑻",
staffCommand: () => "staff",
candidatesCommand: () => "candidats",
installCommand: () => "installer",
guideCommand: () => "guide",
channelsCommand: () => "canaux",
systemCommand: () => "système",
faqCommand: () => "FAQ",
pingCommand: () => "ping",
reportCommand: () => "signaler",
suggestCommand: () => "suggérer",
newsCommand: () => "nouveautés",
versionLabel: () => "𝑽𝑬𝑹𝑺𝑰𝑶𝑵",
usersLabel: () => "𝐔𝐓𝐈𝐋𝐈𝐒𝐀𝐓𝐄𝐔𝐑𝐒",
chooseMenu: () => "Choisissez un menu :",
mainMenuButton: () => "🏠 Menu Principal",
ownerMenuButton: () => "👑 Menu Propriétaire",
securityMenuButton: () => "🚨 Menu Sécurité",
groupMenuButton: () => "👥 Menu Groupe",
aiMenuButton: () => "🤖 Menu IA",
adminMenuTitle: () => "𝑴𝑬𝑵𝑼 𝑨𝑫𝑴𝑰𝑵",
promoteCommand: () => "p /mettreadmin",
demoteCommand: () => "r /retireradmin",
warnCommands: () => "avertir / retireravertissement",
setScheduleCommand: () => "sethoraire",
setNameCommand: () => "setnom",
hidetagCommand: () => "hidetag",
tagallCommand: () => "tagall",
kickCommand: () => "expulser / kick",
adminsCommand: () => "admins",
openCloseCommand: () => "ouvert / fermé",
setWelcomeCommand: () => "setbienvenue",
setByeCommand: () => "setaurevoir",
inactiveCommand: () => "inactifs",
listNumCommand: () => "listenombre + préfixe",
cleanupCommand: () => "nettoyage + préfixe",
rulesCommand: () => "règles /setrègles",
listWarnCommand: () => "listeavertissements",
linkCommand: () => "lien",
linkQrCommand: () => "lienqr",
requestsCommand: () => "demandes",
adminCommands: () => "𝑪𝑶𝑴𝑴𝑨𝑵𝑫𝑬𝑺 𝑨𝑫𝑴𝑰𝑵",
poweredBy: () => "ᴘᴏᴡᴇʀᴇᴅ ʙʏ",
candidatesTitle: () => "🚀 𝐑𝐄𝐉𝐎𝐈𝐆𝐍𝐄𝐙 𝐋𝐄 𝐒𝐓𝐀𝐅𝐅 𝐃𝐄 𝐂𝐇𝐀𝐓𝐔𝐍𝐈𝐓𝐘 🚀",
candidatesIntro: () => "Vous souhaitez rejoindre le staff de ChatUnity, acquérir de l'expérience et être reconnu comme membre de l'équipe ?",
candidatesCall: () => "C'est votre chance ! 𝐑𝐞𝐦𝐩𝐥𝐢𝐬𝐬𝐞𝐳 𝐥𝐞 𝐟𝐨𝐫𝐦𝐮𝐥𝐚𝐢𝐫𝐞 (𝐫𝐞𝐬𝐭𝐞𝐫𝐚 𝐚𝐧𝐨𝐧𝐲𝐦𝐞) pour postuler et montrer vos compétences.",
candidatesWhatAwaits: () => "🔥 𝐂𝐞 𝐪𝐮𝐢 𝐯𝐨𝐮𝐬 𝐚𝐭𝐭𝐞𝐧𝐝 :",
candidatesBenefit1: () => "✨ 𝐑𝐞𝐜𝐨𝐧𝐧𝐚𝐢𝐬𝐬𝐚𝐧𝐜𝐞 𝐨𝐟𝐟𝐢𝐜𝐢𝐞𝐥𝐥𝐞 dans le bot en tant que collaborateur officiel",
candidatesBenefit2: () => "💼 𝐄𝐱𝐩𝐞́𝐫𝐢𝐞𝐧𝐜𝐞 𝐩𝐫𝐚𝐭𝐢𝐪𝐮𝐞 dans le monde des bots et de la gestion de communauté",
candidatesBenefit3: () => "🎯 𝐀𝐜𝐜𝐞̀𝐬 𝐞𝐱𝐜𝐥𝐮𝐬𝐢𝐟 aux bots bêta et aux fonctionnalités en avant-première",
candidatesBenefit4: () => "🤝 𝐂𝐨𝐥𝐥𝐚𝐛𝐨𝐫𝐚𝐭𝐢𝐨𝐧 𝐝𝐢𝐫𝐞𝐜𝐭𝐞 avec l'équipe de développement de ChatUnity",
candidatesCTA: () => "Ne manquez pas cette opportunité unique ! 𝐏𝐨𝐬𝐭𝐮𝐥𝐞𝐳 𝐦𝐚𝐢𝐧𝐭𝐞𝐧𝐚𝐧𝐭 et montrez que vous avez ce qu'il faut pour faire la différence !",
candidatesFormLabel: () => "📋 𝐅𝐨𝐫𝐦𝐮𝐥𝐚𝐢𝐫𝐞 𝐝𝐞 𝐜𝐚𝐧𝐝𝐢𝐝𝐚𝐭𝐮𝐫𝐞 :",

installTitle: () => "⋆ ︵︵ ★ 💬 𝐂𝐇𝐀𝐓𝐔𝐍𝐈𝐓𝐘-𝐁𝐎𝐓 💬 ★ ︵︵ ⋆",
installIntro: () => "Vous souhaitez installer ChatUnity Bot sur votre appareil ?",
installDescription: () => "Suivez le guide d'installation complet disponible sur GitHub avec toutes les étapes détaillées pour Termux, Windows et autres systèmes d'exploitation.",
installGuideLabel: () => "📖 𝐆𝐮𝐢𝐝𝐞 𝐂𝐨𝐦𝐩𝐥𝐞𝐭",
installRepoLabel: () => "📂 𝐃𝐞́𝐩𝐨̂𝐭 𝐆𝐢𝐭𝐇𝐮𝐛",
installVideoLabel: () => "🎥 𝐕𝐢𝐝𝐞́𝐨 𝐓𝐮𝐭𝐨𝐫𝐢𝐞𝐥",
installFeatures: () => "✨ 𝐂𝐞 𝐪𝐮𝐞 𝐯𝐨𝐮𝐬 𝐭𝐫𝐨𝐮𝐯𝐞𝐫𝐞𝐳 :",
installFeature1: () => "📱 Installation complète pour Termux",
installFeature2: () => "💻 Installation pour Windows et autres OS",
installFeature3: () => "🔧 Résolution des problèmes courants",
installFeature4: () => "📝 Commandes de configuration automatique",
installCTA: () => "Visitez le dépôt GitHub pour commencer l'installation et découvrir toutes les fonctionnalités du bot !",
installNeedHelp: () => "Besoin d'aide ? Rejoignez notre canal de support !",

systemTitle: () => "⋆ ︵★ 🖥️ 𝐒𝐓𝐀𝐓𝐔𝐓 𝐃𝐔 𝐒𝐘𝐒𝐓𝐄̀𝐌𝐄 ★︵ ⋆",
systemHost: () => "🚩 *Hôte*",
systemOS: () => "🏆 *Système d'exploitation*",
systemArch: () => "💫 *Architecture*",
systemTotalRAM: () => "🥷 *RAM Totale*",
systemFreeRAM: () => "🚀 *RAM Libre*",
systemUsedRAM: () => "⌛ *RAM Utilisée*",
systemUptime: () => "🕒 *Uptime*",
systemNodeMemory: () => "🪴 *Mémoire Node.js :*",
systemRSS: () => "RSS",
systemHeapTotal: () => "Heap Total",
systemHeapUsed: () => "Heap Utilisé",
systemExternal: () => "Externe",
systemArrayBuffer: () => "ArrayBuffer",
systemDiskSpace: () => "☁️ *Espace Disque :*",
systemDiskTotal: () => "Total",
systemDiskUsed: () => "Utilisé",
systemDiskAvailable: () => "Disponible",
systemDiskPercent: () => "Pourcentage d'Utilisation",
systemDiskError: () => "❌ Erreur lors de la récupération de l'espace disque.",

reportNoText: () => "⚠️ Veuillez saisir une description détaillée du problème que vous souhaitez signaler.",
reportTooShort: () => "⚠️ La description est trop courte. Fournissez au moins 10 caractères pour un signalement complet.",
reportTooLong: () => "⚠️ La description dépasse la limite maximale de 1000 caractères. Réduisez le texte.",
reportTitle: () => "❌️ `S𝐈𝐆𝐍𝐀𝐋𝐄𝐌𝐄𝐍𝐓` ❌️",
reportNumber: () => "📱 Numéro",
reportUser: () => "👤 Utilisateur",
reportMessage: () => "📝 Message",
reportQuote: () => "📎 Citation",
reportSuccess: () => "✅ Votre signalement a été envoyé avec succès à l'équipe de développement.\n\n_⚠️ Attention : les signalements faux ou inappropriés peuvent entraîner des restrictions d'utilisation du bot._",
reportChannelTitle: () => "⚠️ SIGNALEMENT DE BUG ⚠️",
reportChannelBody: () => "Nouveau signalement reçu",
reportAnonymous: () => "Anonyme",
suggestNoText: () => "⚠️ Veuillez saisir votre proposition de commande.\n\n*Exemple :* .suggérer (nom commande) (description fonctionnalité)",
suggestTooShort: () => "⚠️ La description est trop courte. Fournissez au moins 10 caractères pour une proposition complète.",
suggestTooLong: () => "⚠️ La description dépasse la limite maximale de 1000 caractères. Réduisez le texte.",
suggestTitle: () => "💡 `P𝐑𝐎𝐏𝐎𝐒𝐈𝐓𝐈𝐎𝐍` 💡",
suggestNumber: () => "📱 Numéro",
suggestUser: () => "👤 Utilisateur",
suggestMessage: () => "📝 Proposition",
suggestQuote: () => "📎 Citation",
suggestSuccess: () => "✅ Votre proposition a été envoyée avec succès à l'équipe de développement.\n\n_⚠️ Attention : les propositions de commandes illicites ou inappropriées peuvent entraîner des restrictions d'utilisation du bot._",
suggestChannelTitle: () => "💡 PROPOSITION DE COMMANDE 💡",
suggestChannelBody: () => "Nouvelle proposition reçue",
suggestAnonymous: () => "Anonyme",
unwarnNoUser: () => "❌ Vous devez mentionner un utilisateur ou répondre à son message pour retirer un avertissement.",
unwarnUserNotFound: () => "❌ Utilisateur non trouvé dans la base de données.",
unwarnNoWarnings: () => "ℹ️ Cet utilisateur n'a pas d'avertissements actifs à retirer.",
unwarnSuccess: (params) => `✅ 𝐀𝐯𝐞𝐫𝐭𝐢𝐬𝐬𝐞𝐦𝐞𝐧𝐭 𝐫𝐞𝐭𝐢𝐫𝐞́\n\n𝐀𝐯𝐞𝐫𝐭𝐢𝐬𝐬𝐞𝐦𝐞𝐧𝐭𝐬 𝐫𝐞𝐬𝐭𝐚𝐧𝐭𝐬 : ${params?.remaining || 0}/3`,
setnameNoText: () => "⚠️ Veuillez saisir le nouveau nom que vous souhaitez attribuer au groupe.",
setnameSuccess: () => "✅ 𝐍𝐨𝐦 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞 𝐦𝐨𝐝𝐢𝐟𝐢𝐞́ 𝐚𝐯𝐞𝐜 𝐬𝐮𝐜𝐜𝐞̀𝐬 !",
setnameError: () => "❌ Une erreur s'est produite lors de la modification du nom du groupe. Veuillez réessayer.",
hidetagDefaultMessage: () => "📢 Message pour tous",
hidetagStickerError: () => "❌ Impossible de télécharger le sticker. Veuillez réessayer.",
tagallTitle: () => "⋆ ︵︵ ★ 📢 𝐌𝐄𝐌𝐁𝐑𝐄𝐒 𝐃𝐔 𝐆𝐑𝐎𝐔𝐏𝐄 ★ ︵︵ ⋆",
tagallBot: () => "🤖 BOT",
tagallMessage: () => "📝 Message",
tagallEmptyMessage: () => "📢 Attention membres du groupe !",
tagallMemberCount: (params) => `👥 Membres totaux : ${params?.count || 0}`,
adminsCooldown: (params) => `⏳ Vous devez attendre encore ${params?.time || 'un peu'} avant de pouvoir rappeler à nouveau les administrateurs.\n\n_Cette commande a une limite d'utilisation pour éviter les abus._`,
adminsTitle: () => "⋆︵★ 🔔 𝐀𝐃𝐌𝐈𝐍𝐈𝐒𝐓𝐑𝐀𝐓𝐄𝐔𝐑𝐒 ★︵⋆",
adminsMessage: () => "📝 Raison de l'appel",
adminsWarning: () => "⚠️ Cette commande doit être utilisée uniquement pour des problèmes urgents ou des situations importantes. Une utilisation inappropriée peut entraîner le retrait du groupe.",
adminsNoMessage: () => "Demande d'assistance",
adminsNotification: () => "🔔 Les administrateurs ont été notifiés",
adminsExternalTitle: (params) => `${params?.groupName || 'Groupe'}`,
adminsExternalBody: () => "Appel aux administrateurs...",
groupOpen: () => "✅ 𝐂𝐡𝐚𝐭 𝐨𝐮𝐯𝐞𝐫𝐭𝐞 𝐩𝐨𝐮𝐫 𝐭𝐨𝐮𝐬\n\n୧ Tous les membres peuvent maintenant envoyer des messages dans le groupe.",
groupClose: () => "🔒 𝐂𝐡𝐚𝐭 𝐫𝐞́𝐬𝐞𝐫𝐯𝐞́𝐞 𝐚𝐮𝐱 𝐚𝐝𝐦𝐢𝐧𝐬\n\n୧ Seuls les administrateurs peuvent envoyer des messages dans le groupe.",
setwelcomeNoText: () => "⚠️ Veuillez saisir le message de bienvenue personnalisé que vous souhaitez configurer.\n\n*Variables disponibles :*\n୧ @user - Mentionne l'utilisateur\n୧ @group - Nom du groupe\n୧ @desc - Description du groupe",
setwelcomeSuccess: () => "✅ 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐝𝐞 𝐛𝐢𝐞𝐧𝐯𝐞𝐧𝐮𝐞 𝐜𝐨𝐧𝐟𝐢𝐠𝐮𝐫𝐞́\n\n୧ Le message de bienvenue a été défini avec succès pour ce groupe.",
setbyeNoText: () => "⚠️ Veuillez saisir le message d'au revoir personnalisé que vous souhaitez configurer.\n\n*Variables disponibles :*\n୧ @user - Mentionne l'utilisateur\n୧ @group - Nom du groupe",
setbyeSuccess: () => "✅ 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐝'𝐚𝐮 𝐫𝐞𝐯𝐨𝐢𝐫 𝐜𝐨𝐧𝐟𝐢𝐠𝐮𝐫𝐞́\n\n୧ Le message d'au revoir a été défini avec succès pour ce groupe.",
inactiveMenuTitle: () => "🌙 Gestion des Membres Inactifs",
inactiveMenuFound: (params) => `💤 Membres inactifs trouvés : *${params?.inactive || 0}/${params?.total || 0}*\n\n⏰ Inactifs depuis plus de 7 jours\n\nSélectionnez une option ci-dessous :`,
inactiveListTitle: () => "📋 Liste des Membres Inactifs",
inactiveListNone: () => "✅ Aucun membre inactif trouvé !\n\n🎉 Tous les membres sont actifs dans le groupe.",
inactiveListItem: (params) => `${params?.index}. @${params?.user}`,
inactiveRemoveStart: (params) => `⚠️ Suppression des inactifs : vous êtes sur le point de supprimer *${params?.count}* membres.\n\n❗ Cette action ne peut pas être annulée !\n\nConfirmez-vous vouloir continuer ?`,
inactiveRemoveSuccess: (params) => `✅ Suppression terminée !\n\n🗑️ Membres supprimés : *${params?.removed}*${params?.errors ? `\n⚠️ Erreurs : *${params.errors}* membres non supprimés` : ''}`,
inactiveRemoveNone: () => "✅ Aucun membre à supprimer ! Tous les membres du groupe sont actifs.",
inactiveConfirmTitle: () => "⚠️ Confirmation de Suppression",
inactiveBackButton: () => "🔄 Retour au Menu",
inactiveListButton: () => "📋 Voir la Liste",
inactiveRemoveButton: () => "🗑️ Supprimer Inactifs",
inactiveConfirmButton: () => "✅ Confirmer Suppression",
inactiveCancelButton: () => "❌ Annuler",
inactiveNotAdmin: () => "❌ Seuls les *admin* peuvent utiliser cette fonction.",
inactiveUnknown: () => "❌ Option invalide. Utilisez les boutons.",
inactiveResultTitle: () => "📊 Résultat suppression inactifs",
inactiveGroupLabel: () => "👥 Groupe",
inactiveFooter: () => "Gestion groupe inactifs",
noBotAdmin: () => "⚠️ Je dois être admin pour supprimer des utilisateurs",
  noMention: () => "⚠️ Mentionnez ou répondez au message de la personne à supprimer",
  cannotRemoveOwner: () => "⚠️ Vous ne pouvez pas supprimer le créateur du bot",
  cannotRemoveBot: () => "⚠️ Vous ne pouvez pas supprimer le bot lui-même",
  cannotRemoveSelf: () => "⚠️ Vous ne pouvez pas vous supprimer vous-même",
  targetIsGroupOwner: () => "⚠️ Vous ne pouvez pas supprimer le créateur du groupe",
  targetIsAdmin: () => "⚠️ Vous ne pouvez pas supprimer un admin du groupe",
  kickSuccess: (params) => `╭─────────────────\n│ ✦ @${params?.target} a été supprimé\n│ ✦ par @${params?.executor}${params?.reason ? `\n│\n│ 📝 Raison : ${params.reason}` : ''}\n╰─────────────────`,
  title: () => "⚠️ Utilisateurs Avertis",
totalUsers: (params) => `Total : ${params?.count || 0} utilisateurs`,
userEntry: (params) => `${params?.index}. ${params?.name || 'Inconnu'} (${params?.warns}/3)`,
noWarns: () => "✓ Aucun utilisateur n'a reçu d'avertissements",
unknownUser: () => "Inconnu",
noBotAdmin: () => "⚠️ Je dois être admin pour récupérer le lien du groupe",
qrCaption: (params) => `╭─────────────────\n│ 🔗 QR Code du groupe\n│ *${params?.groupName}*\n│\n│ Scannez pour rejoindre\n╰─────────────────`,
qrError: () => "❌ Erreur lors de la génération du QR Code",
noBotAdmin: () => "⚠️ Je dois être admin pour gérer les demandes",
noAdmin: () => "⚠️ Seuls les administrateurs du groupe peuvent utiliser cette commande",
noPending: () => "✓ Aucune demande en attente",
pendingCount: (params) => `╭─────────────────\n│ 📨 Demandes en attente : ${params?.count}\n│\n│ Sélectionnez une option\n╰─────────────────`,
menuFooter: () => "Gestion des demandes de groupe",
buttonAcceptAll: () => "✅ Tout accepter",
buttonRejectAll: () => "❌ Tout refuser",
buttonAccept39: () => "🇮🇹 Accepter +39",
buttonManage: () => "📥 Gérer les demandes",
acceptedSuccess: (params) => `✅ ${params?.count} demandes acceptées`,
rejectedSuccess: (params) => `❌ ${params?.count} demandes refusées`,
no39Found: () => "⚠️ Aucune demande avec le préfixe +39 trouvée",
accepted39Success: (params) => `✅ ${params?.count} demandes avec préfixe +39 acceptées`,
errorAccepting: () => "❌ Erreur lors de l'acceptation des demandes",
errorRejecting: () => "❌ Erreur lors du refus des demandes",
invalidNumber: () => "⚠️ Nombre invalide. Utilisez un nombre supérieur à 0",
invalidInput: () => "⚠️ Entrée invalide. Envoyez un nombre ou '39'",
manageCustom: (params) => `╭─────────────────\n│ 📥 Gestion personnalisée\n│\n│ Combien de demandes voulez-vous accepter ?\n│\n│ ✦ Utilisez : .${params?.command} accepter <nombre>\n│ ✦ Exemple : .${params?.command} accepter 7\n╰─────────────────`,
manageFooter: () => "Gestion personnalisée des demandes",
notAvailable: () => "⚠️ Cette commande est disponible uniquement avec la base de ChatUnity",
imageNotFound: () => "⚠️ Erreur lors du chargement des images",
mainTitle: () => "🌐 Nos Réseaux Sociaux",
mainSubtitle: () => "Suivez-nous partout pour rester informé",
mainFooter: () => "Powered by ChatUnity",
instagramTitle: () => "📸 Instagram",
instagramBody: () => "Suivez-nous sur Instagram pour des photos et stories quotidiennes !",
instagramButton: () => "Ouvrir Instagram",
tiktokTitle: () => "🎵 TikTok",
tiktokBody: () => "Contenu créatif et divertissant sur TikTok !",
tiktokButton: () => "Ouvrir TikTok",
youtubeTitle: () => "🎬 YouTube",
youtubeBody: () => "Vidéos, tutoriels et live sur notre chaîne YouTube !",
youtubeButton: () => "Ouvrir YouTube",
discordTitle: () => "💬 Discord",
discordBody: () => "Rejoignez notre communauté sur Discord !",
discordButton: () => "Ouvrir Discord",
telegramTitle: () => "✈️ Telegram",
telegramBody: () => "Actualités et mises à jour sur le canal Telegram !",
telegramButton: () => "Ouvrir Telegram",
whatsappTitle: () => "💚 Canal WhatsApp",
whatsappBody: () => "Restez informé sur notre canal officiel WhatsApp !",
whatsappButton: () => "Ouvrir Canal",
cardFooter: () => "ChatUnity Social",
followUpMessage: () => "👆 Faites défiler les cartes pour voir tous nos canaux sociaux !\n\n✦ Suivez-nous pour rester informé",
followUpFooter: () => "ChatUnity Team",
menuButton: () => "📋 Retour au Menu",
errorLoading: () => "⚠️ Erreur lors du chargement des réseaux sociaux",


   linkTitle: () => "🔗 LIEN DU GROUPE",
   linkFooter: () => "Copiez le lien et partagez-le",
    copyButton: () => "📋 Copier Lien",


  
  pingTitle: () => "⚡ PONG !",
  pingResponse: (params) => `⚡ *Ping :* ${params?.ping || 'N/A'} ms`,
  socialNotAvailable: () => "⚠️ La commande n'est pas disponible pour le moment. Veuillez réessayer plus tard.",
socialInstagramTitle: () => "📸 Instagram",
socialInstagramBody: () => "Suivez-nous sur Instagram pour du contenu exclusif, des mises à jour et des nouveautés du bot !",
socialInstagramButton: () => "Suivre sur Instagram",
socialTiktokTitle: () => "🎵 TikTok",
socialTiktokBody: () => "Découvrez nos vidéos sur TikTok et restez informé avec le contenu le plus viral !",
socialTiktokButton: () => "Suivre sur TikTok",
socialYoutubeTitle: () => "📺 YouTube",
socialYoutubeBody: () => "Abonnez-vous à notre chaîne YouTube pour des tutoriels, guides et mises à jour vidéo !",
socialYoutubeButton: () => "S'abonner sur YouTube",
socialDiscordTitle: () => "💬 Discord",
socialDiscordBody: () => "Rejoignez notre communauté Discord pour du support, des discussions et bien plus !",
socialDiscordButton: () => "Rejoindre Discord",
socialTelegramTitle: () => "✈️ Telegram",
socialTelegramBody: () => "Suivez-nous sur Telegram pour des actualités instantanées et des communications directes !",
socialTelegramButton: () => "Suivre sur Telegram",
socialWhatsappTitle: () => "💚 WhatsApp",
socialWhatsappBody: () => "Abonnez-vous à notre canal WhatsApp pour recevoir des mises à jour officielles !",
socialWhatsappButton: () => "Suivre sur WhatsApp",
socialCardFooter: () => "ChatUnity Social",
socialMainTitle: () => "⋆ ︵︵ ★ 🌐 𝐑𝐄́𝐒𝐄𝐀𝐔𝐗 𝐒𝐎𝐂𝐈𝐀𝐔𝐗 ★ ︵︵ ⋆",
socialMainSubtitle: () => "Suivez-nous sur nos canaux officiels",
socialMainFooter: () => "Restez connecté avec ChatUnity",
socialFollowUpMessage: () => "✨ Merci pour votre intérêt !\n\n୧ Suivez-nous sur tous nos réseaux sociaux pour ne manquer aucune mise à jour.",
socialFollowUpFooter: () => "ChatUnity - Toujours connectés",
socialMenuButton: () => "🏠 Menu Principal",
socialErrorLoading: () => "❌ Une erreur s'est produite lors du chargement des réseaux sociaux. Veuillez réessayer plus tard.",
listawarnTitle: () => "꒷꒦ ✦ Liste Utilisateurs Avertis ✦ ꒷꒦",
listawarnMode: () => "Mode",
listawarnGroup: () => "Groupe",
listawarnTotal: ({ count }) => `Total : ${count} ${count === 1 ? 'utilisateur averti' : 'utilisateurs avertis'}`,
listawarnNoWarns: () => "✨ Aucun utilisateur averti",
listawarnUnknownUser: () => "Utilisateur Inconnu",
listawarnUserNumber: ({ index }) => `${index}.`,
listawarnTag: () => "Tag :",
listawarnGroups: () => "Groupe(s) :",
listawarnNoActiveWarns: () => "Aucun avertissement actif",
listawarnErrorRetrieving: () => "Erreur lors de la récupération",
listawarnTotalWarns: ({ count }) => `${count} au total`,
listawarnOwnerOnly: () => "❌ Cette commande peut être utilisée en privé uniquement par les propriétaires.",
listawarnAllUsers: () => "Tous les utilisateurs",
kickNoBotAdmin: () => "❌ Le bot doit être administrateur pour supprimer des utilisateurs.",
kickNoMention: () => "⚠️ Mentionnez ou citez l'utilisateur à supprimer du groupe.",
kickCannotRemoveOwner: () => "🛡️ Vous ne pouvez pas supprimer le créateur du bot.",
kickCannotRemoveBot: () => "🤖 Vous ne pouvez pas supprimer le bot du groupe.",
kickCannotRemoveSelf: () => "😅 Vous ne pouvez pas vous supprimer vous-même avec cette commande.",
kickTargetIsGroupOwner: () => "👑 L'utilisateur que vous avez essayé de supprimer est le créateur du groupe.",
kickTargetIsAdmin: () => "🛡️ L'utilisateur que vous avez essayé de supprimer est administrateur.",
kickSuccess: ({ target, executor, reason }) => `꒷꒦ ✦ Utilisateur Supprimé ✦ ꒷꒦\n\n┊ 『 👤 』 Utilisateur : @${target}\n┊ 『 ⚖️ 』 Supprimé par : @${executor}${reason ? `\n┊ 『 📝 』 Raison : ${reason}` : ''}\n\n╰★────★────★`,
linkgroupNoBotAdmin: () => "❌ Le bot doit être administrateur pour obtenir le lien du groupe.",
linkgroupLinkTitle: ({ groupName }) => `꒷꒦ ✦ Lien du Groupe ✦ ꒷꒦\n\n┊ 『 📱 』 Groupe : ${groupName}\n┊ 『 🔗 』 Cliquez sur le bouton pour copier le lien`,
linkgroupLinkFooter: () => "Powered by ChatUnity Bot",
linkgroupCopyButton: () => "📋 Copier Lien",
joinNoLink: ({ prefix, command }) => `⚠️ Veuillez saisir le lien du groupe.\n\n┊ 『 💡 』 Exemple : ${prefix}${command} <lien> <jours | inf>`,
joinInvalidLink: () => "❌ Lien de groupe invalide.",
joinSuccessInfinite: () => "꒷꒦ ✦ Entrée Groupe ✦ ꒷꒦\n\n┊ 『 ✅ 』 J'ai rejoint le groupe avec succès\n┊ 『 ⏰ 』 Durée : Illimitée\n\n╰★────★────★",
joinSuccessExpired: ({ days }) => `꒷꒦ ✦ Entrée Groupe ✦ ꒷꒦\n\n┊ 『 ✅ 』 J'ai rejoint le groupe avec succès\n┊ 『 ⏰ 』 Durée : ${days} jours\n\n╰★────★────★`,
banuserNoTarget: () => "⚠️ Veuillez taguer un utilisateur, répondre à un message ou écrire le numéro de téléphone.\n\n┊ 『 💡 』 Exemple : @3934xxxxxxx",
banuserInvalidNumber: () => "❌ Numéro de téléphone invalide.",
banuserSuccess: ({ target }) => `꒷꒦ ✦ Utilisateur Banni ✦ ꒷꒦\n\n┊ 『 🚫 』 Utilisateur : @${target}\n┊ 『 ⚠️ 』 Cet utilisateur a été banni du bot\n┊ 『 📵 』 Il ne pourra plus utiliser les commandes\n\n╰★────★────★`,
unbanuserNoTarget: () => "⚠️ Taggez un utilisateur, répondez à un message ou écrivez le numéro de téléphone.\n\n┊ 『 💡 』 Exemple : @3934xxxxxxx",
unbanuserInvalidNumber: () => "❌ Numéro de téléphone invalide.",
unbanuserSuccess: ({ target }) => `꒷꒦ ✦ Utilisateur Débanni ✦ ꒷꒦\n\n┊ 『 ✅ 』 Utilisateur : @${target}\n┊ 『 🎉 』 Cet utilisateur a été débanni\n┊ 『 📱 』 Il peut maintenant utiliser les commandes du bot\n\n╰★────★────★`,
listanumNoPrefix: () => "⚠️ Veuillez saisir le préfixe téléphonique à rechercher.\n\n┊ 『 💡 』 Exemple : .listenombre 39",
listanumInvalidPrefix: () => "❌ Le préfixe doit être un nombre valide.",
listanumTitle: ({ prefix }) => `꒷꒦ ✦ Liste Numéros +${prefix} ✦ ꒷꒦`,
listanumNoUsers: ({ prefix }) => `꒷꒦ ✦ Aucun Utilisateur ✦ ꒷꒦\n\n┊ 『 ℹ️ 』 Aucun utilisateur trouvé avec le préfixe +${prefix}\n\n╰★────★────★`,
puliziaStart: ({ prefix }) => `꒷꒦ ✦ Nettoyage Démarré ✦ ꒷꒦\n\n┊ 『 🔄 』 Suppression des utilisateurs avec préfixe +${prefix}\n┊ 『 ⏳ 』 Veuillez attendre la fin...\n\n╰★────★────★`,
puliziaNoBotAdmin: () => "❌ Le bot doit être administrateur pour supprimer des utilisateurs.",
puliziaNoRestrict: () => "❌ Le mode restrictif n'est pas activé.",
puliziaUserLeft: ({ user }) => `@${user} a été supprimé`,
getNoInput: () => "⚠️ Utilisation incorrecte de la commande.\n\n╰★─ Exemples Simples ─★╮\n┊ obtenirplugin menu-groupe script\n┊ obtenirfichier config.js fichier\n\n╰★─ Exemples Multiples ─★╮\n┊ obtenirplugin admin & menu & config\n┊ obtenirplugin admin & menu & config script\n┊ obtenirplugin admin script & menu fichier\n┊ (maximum 3 plugins simultanément)\n\n╰♡꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷",
getNoPluginFound: () => "❌ Aucun plugin valide trouvé dans la requête multiple.",
getMultiSelect: ({ pluginList }) => `꒷꒦ ✦ Plugins Sélectionnés ✦ ꒷꒦\n\n${pluginList}\n\n┊ 『 ❓ 』Comment voulez-vous recevoir tous les plugins ?\n\n╰★────★────★`,
getMultiScriptBtn: () => "📄 Tous Scripts",
getMultiFileBtn: () => "📎 Tous Fichiers",
getMultiResult: ({ successCount, total, results }) => `꒷꒦ ✦ Requête Multiple ✦ ꒷꒦\n\n┊ 『 📦 』 ${successCount}/${total} plugins trouvés\n\n${results}\n\n╰★────★────★`,
getFileSelect: ({ filename }) => `꒷꒦ ✦ Fichier Sélectionné ✦ ꒷꒦\n\n┊ 『 📁 』 ${filename}\n\n┊ 『 ❓ 』 Que voulez-vous faire ?\n\n╰★────★────★`,
getScriptBtn: () => "📄 Script",
getFileBtn: () => "📎 Fichier",
getNoSimilar: ({ type, name }) => `❌ Aucun ${type} similaire à "${name}" trouvé.`,
getFoundConfirm: ({ filename, score }) => `꒷꒦ ✦ Trouvé ✦ ꒷꒦\n\n┊ 『 ✨ 』 "${filename}"\n┊ 『 📊 』 Précision : ${score}%\n\n┊ 『 ❓ 』 Confirmez-vous ?\n\n╰♡꒷ ๑ Répondez : oui/non`,
getMultiChoice: ({ name, options }) => `꒷꒦ ✦ Résultats pour "${name}" ✦ ꒷꒦\n\n${options}\n\n┊ 『 📝 』 Choisissez le numéro ou "non" pour annuler\n\n╰★────★────★`,
getDirNotFound: ({ dir }) => `❌ Répertoire ${dir} non trouvé.`,
getFileSuccess: ({ prefix, filename, type }) => `${prefix}꒷꒦ ✦ Succès ✦ ꒷꒦\n\n┊ 『 ✅ 』 Voici le ${type} : ${filename}\n\n╰★────★────★`,
getScriptSuccess: ({ prefix, filename, content }) => `${prefix}꒷꒦ ✦ Code de ${filename} ✦ ꒷꒦\n\n${content}\n\n╰★────★────★`,
getInvalidOption: () => "❌ Option invalide ! Utilisez \"fichier\" ou \"script\".",
getScriptOnlyJS: () => "❌ L'option script est disponible uniquement pour les fichiers JavaScript.",
getSyntaxError: ({ prefix, filename, error }) => `${prefix}꒷꒦ ✦ Erreur Syntaxe ✦ ꒷꒦\n\n┊ 『 ⛔️ 』 Fichier : ${filename}\n\n${error}\n\n╰★────★────★`,
getFileError: ({ prefix, filename, error }) => `${prefix}❌ Erreur : Le fichier ${filename} n'existe pas ou ne peut pas être lu.\n\n${error}`,
getProcessError: ({ filename, error }) => `❌ Erreur lors du traitement de ${filename} : ${error}`,
getOperationCancelled: () => "꒷꒦ ✦ Opération Annulée ✦ ꒷꒦\n\n┊ 『 ❌ 』 Demande annulée avec succès\n\n╰★────★────★",
getGenericError: ({ error }) => `❌ 𝐄𝐫𝐫𝐞𝐮𝐫 : ${error}`,
leaveNotAdmin: () => "⚠️ Cette commande peut être utilisée uniquement par les administrateurs et propriétaires du groupe.",
leaveMessage: () => "꒷꒦ ✦ Au Revoir ✦ ꒷꒦\n\n┊ 『 👋 』 Le bot quitte le groupe\n\n╰★────★────★",
leaveError: () => "❌ Une erreur s'est produite lors de la sortie du groupe.",
saveNoName: () => "⚠️ Veuillez spécifier le nom du plugin à sauvegarder.",
saveNoQuoted: () => "⚠️ Vous devez répondre au message contenant le code du plugin.",
saveSaveSuccess: ({ path }) => `꒷꒦ ✦ Plugin Sauvegardé ✦ ꒷꒦\n\n┊ 『 ✅ 』 Fichier créé avec succès\n┊ 『 📁 』 Chemin : ${path}\n\n╰★────★────★`,
saveErrorWrite: ({ error }) => `❌ Erreur lors de la sauvegarde du plugin.\n\n${error}`,
deleteNoPlugins: () => "⚠️ Aucun plugin disponible à supprimer.",
deleteHelp: ({ usedPrefix, pluginList, total }) => `꒷꒦ ✦ Gestionnaire Suppression Plugin ✦ ꒷꒦\n\n┊ 『 📌 』 Utilisation de la commande :\n┊ ${usedPrefix}supprimerplugin <nom>\n\n┊ 『 ✨ 』 Exemple :\n┊ ${usedPrefix}supprimerplugin menu-officiel\n\n┊ 『 📋 』 Plugins disponibles :\n${pluginList}${total > 15 ? `\n┊ ... et ${total - 15} autres plugins` : ''}\n\n╰★────★────★`,
deleteInvalidNumber: ({ max }) => `❌ Numéro invalide ! Plage : 1-${max}`,
deleteNoSimilar: ({ input }) => `❌ Aucun plugin similaire à "${input}" trouvé.`,
deleteConfirm: ({ filename, score }) => `꒷꒦ ✦ Plugin Trouvé ✦ ꒷꒦\n\n┊ 『 ✨ 』 "${filename}"\n┊ 『 📊 』 Correspondance : ${score}%\n\n┊ 『 🗑️ 』 Voulez-vous le supprimer ?\n\n╰♡꒷ ๑ Répondez : oui/non`,
deleteMultiChoice: ({ input, options }) => `꒷꒦ ✦ Résultats pour "${input}" ✦ ꒷꒦\n\n${options}\n\n┊ 『 📝 』 Choisissez le numéro ou "non" pour annuler\n\n╰★────★────★`,
deleteNotFound: ({ path }) => `꒷꒦ ✦ Attention ✦ ꒷꒦\n\n┊ 『 📁 』 Fichier non trouvé dans le système\n\n┊ 『 🔍 』 Chemin recherché :\n┊ ${path}\n\n╰★────★────★`,
deleteSuccess: ({ pluginName, sender, time }) => `꒷꒦ ✦ Plugin Supprimé ✦ ꒷꒦\n\n┊ 『 🗑️ 』 Plugin supprimé avec succès\n\n┊ 『 📝 』 Nom : ${pluginName}.js\n┊ 『 👤 』 Supprimé par : @${sender}\n┊ 『 🕐 』 Heure : ${time}\n\n┊ 『 ⚠️ 』 Note : Le bot pourrait nécessiter\n┊ un redémarrage pour appliquer les modifications\n\n╰★────★────★\n\n🎯 Opération terminée !`,
deleteError: ({ error }) => `꒷꒦ ✦ Erreur Système ✦ ꒷꒦\n\n┊ 『 ❌ 』 Impossible de supprimer le plugin\n\n┊ 『 🔍 』 Détails de l'erreur :\n┊ ${error}\n\n┊ 『 💡 』 Solutions possibles :\n┊ - Vérifiez les permissions du fichier\n┊ - Vérifiez que le plugin n'est pas en cours d'utilisation\n┊ - Réessayez dans quelques secondes\n\n╰★────★────★`,
deleteOperationCancelled: () => "꒷꒦ ✦ Opération Annulée ✦ ꒷꒦\n\n┊ 『 ❌ 』 Suppression annulée\n\n╰★────★────★",
deleteGenericError: ({ error }) => `❌ Erreur : ${error}`,
broadcastNoOwner: () => "❌ Seul le propriétaire peut utiliser cette commande !",
broadcastNoGroups: () => "❌ Le bot n'est dans aucun groupe !",
broadcastHeader: () => "꒷꒦ ✦ Message de ChatUnity ✦ ꒷꒦",
broadcastIntro: () => "┊ 『 👑 』 Chers membres du groupe, un nouveau message du propriétaire est arrivé :",
broadcastLabel: () => "┊ 『 📝 』 Message :",
broadcastNote: () => "┊ 『 ⚠️ 』 Ce message a été envoyé à tous les membres du groupe",
broadcastFooter: () => "╰★────★────★\n\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ChatUnity",
broadcastSuccess: ({ count }) => `꒷꒦ ✦ Diffusion Terminée ✦ ꒷꒦\n\n┊ 『 ✅ 』 Message envoyé avec succès\n┊ 『 📊 』 Groupes atteints : ${count}\n┊ 『 👥 』 Tous les membres ont été mentionnés\n\n╰★────★────★`,
broadcastDefaultMessage: () => "Ceci est un message par défaut envoyé à tous les groupes.",
broadcastError: ({ group, error }) => `❌ Erreur lors de l'envoi du message au groupe ${group} : ${error}`,
banChatSuccess: () => "꒷꒦ ✦ Discussion Bannie ✦ ꒷꒦\n\n┊ 『 🚫 』 Discussion bannie avec succès\n┊ 『 ⚠️ 』 Le bot ne répondra plus dans cette discussion\n\n╰★────★────★",
unbanChatSuccess: () => "꒷꒦ ✦ Discussion Débannie ✦ ꒷꒦\n\n┊ 『 ✅ 』 Discussion débannie avec succès\n┊ 『 🎉 』 Le bot peut à nouveau répondre dans cette discussion\n\n╰★────★────★",
restartInitiating: () => "꒷꒦ ✦ Redémarrage en Cours ✦ ꒷꒦\n\n┊ 『 ⏳ 』 Veuillez patienter...\n\n╰★────★────★",
restartProgress: () => "🚀🚀🚀🚀🚀🚀",
restartSuccess: () => "꒷꒦ ✦ Redémarrage Terminé ✦ ꒷꒦\n\n┊ 『 ✅ 』 Bot redémarré avec succès\n┊ 『 🎉 』 Système opérationnel\n\n╰★────★────★",
restartError: ({ error }) => `꒷꒦ ✦ Erreur Redémarrage ✦ ꒷꒦\n\n┊ 『 ❌ 』 Impossible de redémarrer le bot\n┊ 『 🔍 』 Erreur : ${error}\n\n╰★────★────★`,
shutdownInitiating: () => "꒷꒦ ✦ Extinction du Bot ✦ ꒷꒦\n\n┊ 『 🔌 』 J'éteins le bot...\n┊ 『 🚫 』 Toutes les discussions ont été bannies\n┊ 『 ⏳ 』 Veuillez attendre la fermeture\n\n╰★────★────★",
shutdownSuccess: () => "꒷꒦ ✦ Bot Éteint ✦ ꒷꒦\n\n┊ 『 ✅ 』 Extinction terminée\n┊ 『 💤 』 Bot hors ligne\n\n╰★────★────★",
shutdownChatsBanned: ({ count }) => `┊ 『 📊 』 ${count} discussions bannies`,
shutdownError: ({ error }) => `꒷꒦ ✦ Erreur Extinction ✦ ꒷꒦\n\n┊ 『 ❌ 』 Impossible d'éteindre le bot\n┊ 『 🔍 』 Erreur : ${error}\n\n╰★────★────★`,
updateInitiating: () => "꒷꒦ ✦ Mise à Jour du Bot ✦ ꒷꒦\n\n┊ 『 🔄 』 Vérification des mises à jour...\n┊ 『 ⏳ 』 Veuillez patienter\n\n╰★────★────★",
updateSuccess: ({ output }) => `꒷꒦ ✦ Mise à Jour Terminée ✦ ꒷꒦\n\n┊ 『 ✅ 』 Bot mis à jour avec succès\n\n┊ 『 📋 』 Détails :\n${output}\n\n╰★────★────★`,
updateError: ({ error }) => `꒷꒦ ✦ Erreur Mise à Jour ✦ ꒷꒦\n\n┊ 『 ❌ 』 Impossible de mettre à jour le bot\n┊ 『 🔍 』 Erreur : ${error}\n\n┊ 『 💡 』 Solutions possibles :\n┊ - Vérifiez la connexion internet\n┊ - Vérifiez les permissions Git\n┊ - Assurez-vous d'être sur une branche valide\n\n╰★────★────★`,
updateNoChanges: () => "꒷꒦ ✦ Déjà à Jour ✦ ꒷꒦\n\n┊ 『 ℹ️ 』 Le bot est déjà à la dernière version\n┊ 『 ✅ 』 Aucune mise à jour disponible\n\n╰★────★────★",
groupMenuTitle: () => "𝑴𝑬𝑵𝑼 𝑮𝑹𝑶𝑼𝑷𝑬",
chooseMenu: () => "Choisissez une catégorie dans le menu :",
mainMenuButton: () => "🏠 Menu Principal",
adminMenuButton: () => "🛡️ Menu Admin",
ownerMenuButton: () => "👑 Menu Propriétaire",
securityMenuButton: () => "🚨 Menu Sécurité",
aiMenuButton: () => "🤖 Menu IA",
musicAudioSection: () => "MUSIQUE & AUDIO",
infoUtilitySection: () => "INFORMATIONS & UTILITAIRES",
imageEditSection: () => "IMAGES & ÉDITION",
pokemonSection: () => "POKÉMON",
gamesCasinoSection: () => "JEUX & CASINO",
economyRankingSection: () => "ÉCONOMIE & CLASSEMENTS",
socialInteractionSection: () => "INTERACTIONS SOCIALES",
howMuchSection: () => "C'EST COMBIEN ?",
personalityTestSection: () => "TEST DE PERSONNALITÉ",
memberCommands: () => "𝑪𝑶𝑴𝑴𝑨𝑵𝑫𝑬𝑺 𝑷𝑶𝑼𝑹 𝑳𝑬𝑺 𝑴𝑬𝑴𝑩𝑹𝑬𝑺",
versionLabel: () => "𝑽𝑬𝑹𝑺𝑰𝑶𝑵",
collabLabel: () => "𝑪𝑶𝑳𝑳𝑨𝑩𝑶𝑹𝑨𝑻𝑰𝑶𝑵",
songCommand: () => "chanson",
audioCommand: () => "audio",
videoCommand: () => "vidéo",
cityCommand: () => "ville",
textCommand: () => "texte",
groupCommand: () => "groupe",
userCommand: () => "utilisateur",
checkSiteCommand: () => "vérifiersite",
photoToStickerCommand: () => "photo en sticker",
stickerToPhotoCommand: () => "sticker en photo",
improveQualityCommand: () => "améliorer qualité photo",
photoCommand: () => "photo",
hiddenPhotoCommand: () => "photo cachée",
memeCommand: () => "meme",
fromStickerCommand: () => "depuis sticker",
blurImageCommand: () => "flouter image",
comingSoonCommand: () => "à venir",
quantityCommand: () => "quantité",
headsOrTailsCommand: () => "pile ou face",
mathProblemCommand: () => "problème maths",
rockPaperScissorsCommand: () => "pierre papier ciseaux",
pokemonInfoCommand: () => "info Pokémon",
balanceCommand: () => "solde",
topUsersCommand: () => "top utilisateurs",
withdrawUCCommand: () => "UC de la banque",
earnXPCommand: () => "gagner XP",
endRelationshipCommand: () => "fin relation",
affinityCommand: () => "affinité",
charmCommand: () => "charme",
createFightCommand: () => "créer disputes",
truthOrDareCommand: () => "action ou vérité",
playNoText: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n ❗ Veuillez saisir un titre ou un lien\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
playNoResults: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n ❗ Aucun résultat trouvé\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
playAudioLoading: () => "┊ ┊ ┊ ┊‿ ˚➶ ｡˚\n┊ ┊ ┊ ┊. ➶ ˚\n┊ ┊ ┊ ˚✧ 🎵 Audio en approche\n┊ ˚➶ ｡˚ ☁︎ Veuillez patienter quelques instants...",
playVideoLoading: () => "┊ ┊ ┊ ┊‿ ˚➶ ｡˚\n┊ ┊ ┊ ┊. ➶ ˚\n┊ ┊ ┊ ˚✧ 🎬 Vidéo en approche\n┊ ˚➶ ｡˚ ☁︎ Veuillez patienter quelques instants...",
playDownloadComplete: () => "✅ Téléchargement terminé !",
playTooLong: ({ maxMinutes, duration }) => `╭★────★────★\n|ㅤㅤㅤㅤㅤㅤㅤ꒰¡VIDÉO TROP LONGUE !꒱\n|˚₊꒷ ⏳ ꒱ ฅ﹕Maximum : ${maxMinutes} minutes ₊˚๑\n|˚₊꒷ ⌛ ꒱ ฅ﹕Durée : ${duration} ₊˚๑\n╰★────★────★`,
playVideoInfo: ({ title, timestamp, views, author, ago, url }) => `⋆ ︵︵ ★ 🎥 INFO VIDÉO 🎥 ★ ︵︵ ⋆\n\n\n꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧\n୧ ✍️ *Titre :* ${title}\n୧ ⏳ *Durée :* ${timestamp}\n୧ 👀 *Vues :* ${views}\n୧ 🔰 *Chaîne :* ${author}\n୧ 🔳 *Publié :* ${ago}\n୧ 🔗 *Lien :* ${url}\n꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧\n\n\n╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩\n  > Choisissez un format pour télécharger\n╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩`,
playChooseFormat: () => "Choisissez un format :",
playAudioButton: () => "🎵 Audio",
playVideoButton: () => "🎬 Vidéo",
playSaveButton: () => "💾 Sauvegarder Playlist",
playError: ({ error }) => `꒰🩸꒱ ◦- ≫ ERREUR\n ★・・・・・・・★\n  ${error}\n ★・・・・・・・★`,
playNoValidLink: () => "꒰🩸꒱ ◦- ≫ ERREUR\n ★・・・・・・・★\n  Aucun lien valide trouvé\n ★・・・・・・・★",
playlistEmpty: ({ userName }) => `ℹ️ ${userName ? `${userName} n'a pas de morceaux sauvegardés` : 'Votre playlist est vide !'}`,
playlistHeader: ({ userName }) => `📋 ${userName ? `Playlist de ${userName}` : 'Votre playlist'}`,
playlistMore: ({ count }) => `...et ${count} autres morceaux`,
playlistSelectToPlay: () => "Sélectionnez un morceau à lire",
saveNoText: () => "⚠️ Veuillez spécifier un morceau à rechercher",
saveSearching: ({ query }) => `⌛ Recherche de "${query}"...`,
saveNoResults: () => "⚠️ Aucun résultat trouvé",
saveAlreadyExists: () => "⚠️ Chanson déjà dans la playlist ! Utilisez .playlist pour voir les morceaux sauvegardés.",
saveSaved: () => "✅ Chanson sauvegardée !",
saveViewPlaylist: () => "📋 Voir Playlist",
savePlay: () => "🎵 Lire",
saveDelete: () => "🗑️ Supprimer",
saveSaveNew: () => "💾 Sauvegarder nouveau",
deleteSelect: () => "🗑️ Sélectionnez le morceau à supprimer",
deleteUse: () => "Utilisez : .supprimer <nombre>",
deleteInvalid: () => "⚠️ Nombre invalide !",
deleteSuccess: () => "✅ Morceau supprimé !",
deleteRestore: () => "💾 Restaurer",
backButton: () => "🔙 Retour",
playlistError: ({ error }) => `⚠️ Erreur : ${error}`,
playlistSignature: () => "꙰ 𝗖𝗿𝗲́𝗮𝘁𝗶𝗼𝗻 𝗚𝗮𝗯𝟯𝟯𝟯 ꙰",
ytSearchMissingFiles: () => "❗ Pour utiliser cette commande, utilisez la base de ChatUnity",
ytSearchMissingQuery: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n 📌 Veuillez saisir le nom de la vidéo\n Exemple : .ytsearch compilation\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
ytSearchNoResults: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n ❌ Aucun résultat trouvé\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
ytSearchTitle: () => "🔎 Recherche YouTube",
ytSearchFooter: () => "ChatUnity ✦ Téléchargeur",
ytSearchResultTitle: () => "🎬 Résultats YouTube",
ytSearchResultHeader: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n ୧ 🎬 ୭ Résultats de recherche\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Voici les résultats trouvés ✦ ꒷꒦",
ytSearchSelectPrompt: () => "╭★────★────★────★╮\n│ 🔢 Sélectionnez une vidéo\n│ dans les résultats ci-dessus\n╰★────★────★╯",
ytSearchDuration: () => "📺 Durée :",
ytSearchViews: () => "👁 Vues :",
ytSearchChannel: () => "👤 Chaîne :",
toAudioNoMedia: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ⚠️ Répondez à une vidéo ou audio\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
toAudioDownloadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Erreur lors du téléchargement\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
toAudioConvertError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Erreur lors de la conversion\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",


weatherNoCity: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❗ Veuillez saisir le nom d'une ville\n  Utilisation : .météo [nom ville]\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
weatherInfo: ({ name, country, temp, feels, min, max, humidity, main, desc, wind, pressure }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🌍 ୭ *Météo ${name}, ${country}*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Informations météo ✦ ꒷꒦\n\n🌡 Température : ${temp}°C\n🌡 Ressentie : ${feels}°C\n🌡 Minimale : ${min}°C\n🌡 Maximale : ${max}°C\n💧 Humidité : ${humidity}%\n☁ Météo : ${main}\n🌫 Description : ${desc}\n💨 Vent : ${wind} m/s\n🔽 Pression : ${pressure} hPa\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🌤️\n│ Powered by OpenWeather\n╰★────★────★╯`,
weatherCityNotFound: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  🚫 Ville non trouvée\n  Vérifiez l'orthographe\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
weatherError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ⚠️ Erreur lors de la récupération\n  Veuillez réessayer plus tard\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
translateHelp: ({ prefix, command, languages }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🌍 ୭ *TRADUCTEUR*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Exemples d'utilisation ✦ ꒷꒦\n\n│ ${prefix}${command} Bonjour\n│ ${prefix}${command} en Bonjour\n│ ${prefix}${command} ja Hello\n│ ${prefix}${command} [répondre msg]\n│ ${prefix}parle ar texte\n\n꒷꒦ ✦ Langues disponibles ✦ ꒷꒦\n\n${languages}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🌐\n│ ChatUnity Translator\n╰★────★────★╯`,
translateNoText: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Texte manquant pour l'audio\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
translateNoLang: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Langue non spécifiée\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
translateWhatToTranslate: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Et que devrais-je traduire ?\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
translateTooLong: ({ max, length }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Texte trop long\n  Maximum : ${max} caractères\n  Votre texte : ${length} caractères\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
translateResult: ({ fromLang, toLang, translation }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🌍 ୭ *TRADUCTEUR*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ De : ${fromLang} ✦ ꒷꒦\n꒷꒦ ✦ Vers : ${toLang} ✦ ꒷꒦\n\n${translation}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎯\n│ Traduction terminée\n╰★────★────★╯`,
translateListenOriginal: () => "🔊 Écouter Original",
translateListenTranslation: () => "🎵 Écouter Traduction",
translateFooter: () => "ChatUnity Translator",
translateTTSError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Erreur audio : ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
translateError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Erreur lors de la traduction\n  Veuillez réessayer plus tard\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
antiLinkNotAdmin: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *Sauvé pour l'instant*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Je ne suis pas admin ✦ ꒷꒦\n\nJe ne peux rien faire",
antiLinkDetected: ({ user, qrDetected }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚫 ୭ *ANTI-LIEN ACTIVÉ*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Violation des règles ✦ ꒷꒦\n\n${user} 🤨 Vous avez enfreint les règles du groupe${qrDetected ? ', tu penses que je ne vois pas les QR ? 😂' : '.'}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 👮\n│ Expulsé automatiquement\n╰★────★────★╯`,
antiLinkRestrictOff: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *Restrict Désactivé*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Action requise ✦ ꒷꒦\n\nContactez le propriétaire du bot pour activer le RESTRICT\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔧\n│ Fonction non disponible\n╰★────★────★╯",
antiMediaWarning: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *ANTIMÉDIA ACTIVÉ*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Violation des règles ✦ ꒷꒦\n\nSeules les photos et vidéos à 1 vue sont autorisées\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🚫\n│ Média supprimé\n╰★────★────★╯",
antiSpamDetected: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚫 ୭ *ANTISPAM DÉTECTÉ*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Spam détecté ✦ ꒷꒦\n\nL'utilisateur a été supprimé pour comportement spam\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ⚡\n│ ChatUnity x 333 Protection\n╰★────★────★╯",
antiTrabaAdminWarning: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *ATTENTION ADMIN*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Trava détecté ✦ ꒷꒦\n\nHEY @${user} tu t'amuses à envoyer du trava ici ? Quelle chance pour toi que tu sois admin ! -.-\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🛡️\n│ Protégé par le statut\n╰★────★────★╯`,
antiTrabaDetected: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚫 ୭ *ANTI-TRAVA ACTIVÉ*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Message long détecté ✦ ꒷꒦\n\nL'utilisateur @${user} a envoyé un message trop long et sera supprimé\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🚨\n│ ChatUnity Protection\n╰★────★────★╯`,
antiTrabaNoPermission: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *Permissions Manquantes*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Action bloquée ✦ ꒷꒦\n\nJe n'ai pas les permissions d'administrateur pour supprimer ceux qui envoient du trava\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔒\n│ Demandez les permissions admin\n╰★────★────★╯",
infoSetAge: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🗓️ ୭ *Définir Âge*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Comment procéder ✦ ꒷꒦\n\nPour définir votre âge utilisez :\n.setâge <âge>\n\nPour supprimer votre âge utilisez :\n.supprimerâge\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📝\n│ Gestion profil\n╰★────★────★╯",
infoSetIG: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🌐 ୭ *Définir Instagram*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Comment procéder ✦ ꒷꒦\n\nPour définir Instagram utilisez :\n.setig <username>\n\nPour le supprimer utilisez :\n.supprimerig\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📱\n│ Gestion réseaux sociaux\n╰★────★────★╯",
infoGroupOnly: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Commande réservée aux groupes\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
infoUserData: ({ messages, warn, role, age, gender, blasphemy, instagram }) => `⋆ ︵︵ ★ 𝐈𝐍𝐅𝐎 𝐔𝐓𝐈𝐋𝐈𝐒𝐀𝐓𝐄𝐔𝐑 ★ ︵︵ ⋆\n\n\n꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧\n୧ 📝 *Messages :* ${messages}\n୧ ⚠️ *Avertissements :* ${warn} / 4\n୧ 🟣 *Rôle :* ${role}\n୧ 🗓️ *Âge :* ${age}\n୧ 🚻 *Genre :* ${gender}\n୧ 🤬 *Blasphèmes :* ${blasphemy}\n${instagram ? `୧ 🌐 instagram.com/${instagram}` : '୧ 🌐 *Instagram :* Non défini'}\n꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧`,
infoSetAgeButton: () => "🗓️ Définir Âge",
infoSetGenderMaleButton: () => "🚹 Genre Masculin",
infoSetGenderFemaleButton: () => "🚺 Genre Féminin",
infoSetIGButton: () => "🌐 Définir IG",
infoFooter: () => "Définissez vos données personnelles :",
infoCreator: () => "𝒄𝒓𝒆́𝒂𝒕𝒊𝒐𝒏 𝒅𝒆 𝑶𝒏𝒊𝒙🌟",
infoRoleFounder: () => "𝐅𝐨𝐧𝐝𝐚𝐭𝐞𝐮𝐫 ⚜️",
infoRoleAdmin: () => "𝐀𝐝𝐦𝐢𝐧 👑",
infoRoleMember: () => "𝐌𝐞𝐦𝐛𝐫𝐞 🤍",
infoGenderNotSet: () => "𝐍𝐨𝐧 𝐝𝐞́𝐟𝐢𝐧𝐢",
infoAgeNotSet: () => "Non définie",
infoAgeYears: ({ age }) => `${age} ans`,
setGenderUsage: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ Utilisation correcte de la commande\n  ━━✫ .setgenre masculin\n  ━━✫ .setgenre féminin\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
setGenderSuccess: ({ gender, emoji }) => `✓ Genre défini comme : ${gender} ${emoji}`,
deleteGenderSuccess: () => "✓ Genre supprimé",
setAgeUsage: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ Veuillez saisir un âge valide\n  ━━✫ Âge de 10 à 80 ans\n  ━━✫ Utilisez : .setâge <âge>\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
setAgeSuccess: ({ age }) => `✓ Âge défini comme : ${age} ans`,
deleteAgeSuccess: () => "✓ Âge supprimé",
rulesNotSet: ({ prefix }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⓘ Aucune règle définie\n  ━━✫ Les administrateurs n'ont pas encore\n  ━━✫ défini les règles\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n\n📌 Pour définir les règles utilisez :\n${prefix}setrègles <texte règles>`,
rulesTitle: () => "📜 𝐑𝐞̀𝐠𝐥𝐞𝐬 𝐝𝐮 𝐆𝐫𝐨𝐮𝐩𝐞",
rulesDisplay: ({ rules }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📜 ୭ *Règles du Groupe*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n${rules}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ⚖️\n│ Respectez les règles\n╰★────★────★╯`,
dashboardTitle: () => "⚡ 𝐓𝐎𝐏 10 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄𝐒 ⚡",
dashboardCommand: () => "📚 COMMANDE",
dashboardUses: () => "🗂️ UTILISATIONS",
dashboardLastUse: () => "⏱️ DERNIÈRE UTILISATION",
dashboardNeverUsed: () => "Jamais utilisée",
dashboardDaysAgo: ({ days }) => `${days} jours`,
dashboardHoursAgo: ({ hours }) => `${hours} heures`,
dashboardMinutesAgo: ({ minutes }) => `${minutes} minutes`,
dashboardSecondsAgo: () => "quelques secondes",
dashboardStats: ({ stats }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚡ ୭ *TOP 10 COMMANDES*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n${stats}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📊\n│ Statistiques bot\n╰★────★────★╯`,
imageSearchBaseOnly: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ Cette commande est disponible\n  ━━✫ uniquement avec la base ChatUnity\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
imageSearchUsage: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⓘ Utilisation de la commande\n  ━━✫ ${prefix}${command} <mot clé>\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
imageSearchForbidden: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Contenu non autorisé\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
imageSearchNoResults: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😢 Aucune image trouvée\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
imageSearchResults: ({ term }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🔍 ୭ *Résultats recherche*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Requête : ${term} ✦ ꒷꒦`,
imageSearchImageNum: ({ num }) => `Image #${num}`,
imageSearchResultFor: ({ term }) => `Résultat pour : ${term}`,
imageSearchFooter: () => "Powered by ChatUnity",
imageSearchOpenImage: () => "Ouvrir image",
imageSearchTitle: () => "Résultats images",
imageSearchSubtitle: () => "Voici les images trouvées sur Google",
imageSearchAgainPrompt: () => "🔄 Voulez-vous rechercher d'autres images avec le même terme ?",
imageSearchAgainButton: () => "Rechercher à nouveau",
obfuscateNoCode: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Veuillez saisir du code JavaScript\n  ━━✫ à obfusquer ou répondez\n  ━━✫ à un message avec du code\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
obfuscateProcessing: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Obfuscation en cours...\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
obfuscateSuccess: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🔒 ୭ *Code obfusqué*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Obfuscation terminée ✦ ꒷꒦",
obfuscateError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Erreur d'obfuscation\n  ━━✫ ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
bonkNoPhoto: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Aucune photo de profil\n  ━━✫ L'utilisateur n'a pas défini\n  ━━✫ de photo de profil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bonkError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Erreur lors de l'exécution\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
hornyCardCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🔥 ୭ *Carte Horny*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ À quel point es-tu horny ? 🥵🔥 ✦ ꒷꒦",
stupidCaption: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤡 ୭ *À quel point es-tu stupide ?*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ @${user} ✦ ꒷꒦`,
stupidDefaultText: () => "je+suis+stupide",
wantedNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Impossible de récupérer\n  ━━✫ la photo de profil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedNoProfilePicUser: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ L'utilisateur n'a pas\n  ━━✫ de photo de profil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedYourProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Vous n'avez pas de photo de profil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedUnsupportedFormat: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Format non supporté\n  ━━✫ Utilisez JPEG ou PNG\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Erreur upload image\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Erreur API\n  ━━✫ Veuillez réessayer plus tard\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Erreur : ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
wantedCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚔 ୭ *RECHERCHÉ*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Recherché ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 👮\n│ Powered by ChatUnity\n╰★────★────★╯",
jokeNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Impossible de récupérer\n  ━━✫ la photo de profil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeYourProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Vous n'avez pas de photo de profil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeUnsupportedFormat: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Format non supporté\n  ━━✫ Utilisez JPEG ou PNG\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Erreur upload image\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Erreur API\n  ━━✫ Veuillez réessayer plus tard\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Erreur : ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
jokeCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤡 ୭ *BLAGUE*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Joke over head ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 😂\n│ Powered by ChatUnity\n╰★────★────★╯",
jailNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Impossible de récupérer\n  ━━✫ la photo de profil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jailUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Erreur upload image\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jailAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Erreur API\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jailError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Erreur : ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
jailCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚔 ୭ *EN PRISON*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 👮\n│ Powered by ChatUnity\n╰★────★────★╯",
nokiaNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Impossible de récupérer\n  ━━✫ la photo de profil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaYourProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Vous n'avez pas de photo de profil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaUnsupportedFormat: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Format non supporté\n  ━━✫ Utilisez JPEG ou PNG\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Erreur upload\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Erreur API\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Erreur : ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
nokiaCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📱 ୭ *NOKIA*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📞\n│ Powered by ChatUnity\n╰★────★────★╯",
adNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Impossible de récupérer\n  ━━✫ la photo de profil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adYourProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Vous n'avez pas de photo de profil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adUnsupportedFormat: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Format non supporté\n  ━━✫ Utilisez JPEG ou PNG\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Erreur upload\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Erreur API\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Erreur : ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
adCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📢 ୭ *PUBLICITÉ*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📺\n│ Powered by ChatUnity\n╰★────★────★╯",
pokeOpenNoType: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Veuillez spécifier le type\n  ━━✫ base, imperium, premium, darkness\n  ━━✫ Exemple : .ouvrirpokemon base\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeOpenNoPacks: ({ type }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⛔ Vous n'avez pas de paquets ${type.toUpperCase()}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeOpenOpening: () => "🎁 Ouverture du paquet...",
pokeOpenRevealing: () => "✨ Révélation des cartes...",
pokeOpenNoCards: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😢 Aucune carte trouvée\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeOpenResult: ({ type, name, rarity, shiny, cardType, level, remaining }) => `🎉 Vous avez ouvert un paquet *${type.toUpperCase()}* :\n\n✨ *${name}* (${rarity})${shiny ? ' ✨ Shiny' : ''}\n🔰 Type : ${cardType} | Niv : ${level}\n\n📦 Paquets restants : *${remaining}* ${type}`,
pokeBuyUsage: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Utilisation correcte\n  ━━✫ .acheterpokemon <base|imperium|premium> <quantité>\n  ━━✫ Exemple : .acheterpokemon base 3\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeBuyNoCoins: ({ cost, balance }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ UnityCoins insuffisants\n  ━━✫ Requis : ${cost}\n  ━━✫ Solde : ${balance}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeBuySuccess: ({ quantity, type, total, balance }) => `✅ Vous avez acheté *${quantity}* paquets ${type.toUpperCase()} !\n📦 Total maintenant : ${total}\n💸 UnityCoins restants : ${balance}`,
pokeLeaderboardEmpty: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😢 Aucun collectionneur trouvé\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeLeaderboardTitle: () => "🏆 *Top 10 Collectionneurs Pokémon* :",
pokeInventoryTitle: () => "📂 VOS PAQUETS",
pokeInventoryBase: ({ count }) => `• 📦 Base : ${count}`,
pokeInventoryImperium: ({ count }) => `• 👑 Imperium : ${count}`,
pokeInventoryPremium: ({ count }) => `• 🌌 Premium : ${count}`,
pokeInventoryFooter: () => "🎁 Utilisez les boutons pour ouvrir un paquet immédiatement !",
pokeInventoryOpenBase: () => "📦 Ouvrir Base",
pokeInventoryOpenImperium: () => "👑 Ouvrir Imperium",
pokeInventoryOpenPremium: () => "🌌 Ouvrir Premium",
pokeInventoryBuy: () => "➕ Acheter Paquets",
pokeBattleNoMention: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚔️ Taggez un utilisateur\n  ━━✫ Exemple : .combattre @utilisateur\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeBattleNoPokemon: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😓 Vous n'avez pas de Pokémon\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeBattleOpponentNoPokemon: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😓 L'adversaire n'a pas de Pokémon\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeBattleResult: ({ user1, user2, poke1, poke2, result }) => `⚔️ *Combat Pokémon !*\n\n👤 @${user1} a choisi *${poke1.name}* (Niv. ${poke1.level})\n👤 @${user2} a choisi *${poke2.name}* (Niv. ${poke2.level})\n\n${result}`,
pokeBattleWinner: ({ user }) => `🏆 @${user} remporte le combat !`,
pokeBattleTie: () => "🤝 Égalité ! Les deux Pokémon sont épuisés.",
pokeEvolveNoName: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 📛 Veuillez spécifier le nom du Pokémon\n  ━━✫ Exemple : .évoluer Charmander\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeEvolveNotOwned: ({ name }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Vous ne possédez pas *${name}*\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeEvolveNoCoins: ({ balance, cost }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⛔ unitycoin insuffisant\n  ━━✫ Vous avez : ${balance}\n  ━━✫ Requis : ${cost}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeEvolveNoEvolution: ({ name }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⛔ ${name} ne peut pas évoluer\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeEvolveEvolving: ({ name }) => `✨ *${name}* est en train d'évoluer...`,
pokeEvolveProgress: () => "🔄 Évolution en cours...",
pokeEvolveSuccess: ({ from, to }) => `🎉 *${from}* a évolué en *${to}* !`,
pokeEvolveComplete: ({ balance }) => `✅ Évolution terminée !\n💰 unitycoin restants : *${balance}*`,
tradeUsage: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 📌 Utilisation correcte\n  ━━✫ .échanger @utilisateur <ton_num> <son_num>\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
tradeYourNotExist: ({ num }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Votre Pokémon n. ${num}\n  ━━✫ n'existe pas\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
tradeTheirNotExist: ({ num, user }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Le Pokémon n. ${num}\n  ━━✫ de @${user} n'existe pas\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
tradeRequest: ({ from, myPoke, theirPoke, target }) => `🔁 *Demande d'Échange*\n\n@${from} souhaite échanger :\n📤 *${myPoke.name}* (Niv. ${myPoke.level})\ncontre\n📥 *${theirPoke.name}* (Niv. ${theirPoke.level}) de @${target}\n\n✅ @${target}, répondez avec *.accepter* pour confirmer.`,
tradeNoRequest: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Aucune demande d'échange\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
tradeUnavailable: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Un des Pokémon\n  ━━✫ n'est plus disponible\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
tradeSuccess: ({ from, to, poke1, poke2 }) => `✅ Échange terminé entre @${from} et @${to} !\n\n🎁 ${poke1.name} ⇄ ${poke2.name}`,
pityTitle: () => "📊 *Système Pity Darkness*",
pityOpened: ({ count }) => `🔁 Paquets ouverts sans Darkness : *${count}*`,
pityRemaining: ({ remaining }) => `🎯 Prochain Darkness garanti dans : *${remaining}* paquets`,
pityGuaranteed: () => "✨ Le prochain paquet a un Darkness *garanti* !",
inventoryEmpty: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 📦 Inventaire vide\n  ━━✫ Utilisez .ouvrirpokemon base\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
inventoryInvalidPage: ({ max }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Page invalide\n  ━━✫ Choisissez entre 1 et ${max}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
inventoryHeader: ({ user, total, page, totalPages, perPage }) => `╭━━━🗂️ *INVENTAIRE POKÉMON* 🗂️━━━╮\n┃ 👤 *Dresseur :* @${user}\n┃ 📦 *Total :* ${total}\n┃ 📄 *Page :* ${page}/${totalPages}\n┃ 📌 *Par page :* ${perPage}\n╰━━━━━━━━━━━━━━━━━━━━━━━╯`,
inventoryDarknessButton: () => "🌑 Pokémon Darkness",
inventoryPageButton: ({ num }) => `Page ${num}`,
inventoryFooter: () => "📂 Utilisez `.inventaire [page]` ou cliquez sur les boutons pour naviguer.",
darknessInfo: () => "🌑 *PAQUETS DARKNESS* 🌑\n\nLes paquets *Darkness* ne peuvent pas être achetés, mais se trouvent **apparemment de nulle part** lorsque vous ouvrez des paquets *Premium*.\n\n➡️ Tous les 10 paquets *Premium* ouverts, vous avez 50% de chances d'obtenir un paquet *Darkness* bonus.\n\n🎲 En ouvrant un paquet *Darkness* vous pouvez trouver des Pokémon Darkness spéciaux avec 10% de chances.\n\nUtilisez *.ouvrirpokemon darkness* pour ouvrir les paquets Darkness.\n\nBonne chance ! 🍀",
trisAlreadyPlaying: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❗ Vous jouez déjà\n  ━━✫ avec quelqu'un\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
trisNoRoomName: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❗ Vous devez donner un nom à la salle\n  ━━✫ Exemple : ${prefix}${command} salle1\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
trisGameStarting: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🕹️ ୭ *PARTIE COMMENCE*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Un joueur a rejoint ✦ ꒷꒦",
trisTurnOf: ({ player }) => `Tour de @${player}`,
trisRoomCreated: () => "𝐒𝐀𝐋𝐋𝐄 𝐂𝐑𝐄́𝐄𝐄 ✓",
trisWaiting: ({ room }) => `══════ •⊰✧⊱• ══════\n*𝐄𝐧 𝐚𝐭𝐭𝐞𝐧𝐭𝐞 𝐝𝐞 𝐣𝐨𝐮𝐞𝐮𝐫𝐬 ...*\n══════════════\n🕹️ 𝐏𝐨𝐮𝐫 𝐩𝐚𝐫𝐭𝐢𝐜𝐢𝐩𝐞𝐫 𝐭𝐚𝐩𝐞𝐳\n.jouer ${room}\n══════════════\n⛔ 𝐏𝐨𝐮𝐫 𝐪𝐮𝐢𝐭𝐭𝐞𝐫 𝐥𝐚 𝐩𝐚𝐫𝐭𝐢𝐞\n𝐞𝐧 𝐜𝐨𝐮𝐫𝐬 𝐭𝐚𝐩𝐞𝐳 .quitter\n══════ •⊰✧⊱• ══════`,
slotInvalidBet: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Mise invalide\n  ━━✫ Exemple : ${prefix}${command} 100\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
slotInsufficientUC: ({ bet }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚫 UC insuffisants\n  ━━✫ Vous avez besoin de ${bet} UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
slotCooldown: ({ min, sec }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Attendez ${min}m ${sec}s\n  ━━✫ avant de rejouer\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
slotWin: ({ uc, xp }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *VOUS AVEZ GAGNÉ !*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Gains ✦ ꒷꒦\n\n┌──────────────\n│ ➕ *${uc} UC*\n│ ➕ *${xp} XP*\n└──────────────`,
slotLose: ({ uc, xp }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤡 ୭ *VOUS AVEZ PERDU !*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Pertes ✦ ꒷꒦\n\n┌──────────────\n│ ➖ *${uc} UC*\n│ ➖ *${xp} XP*\n└──────────────`,
slotBalance: ({ uc, xp, current, max, prefix }) => `\n💎 *SOLDE ACTUEL*\n\n┌──────────────\n│ 👛 *UC : ${uc}*\n│ ⭐ *XP : ${xp}*\n│ 📊 *Progression : ${current}/${max} XP*\n└──────────────\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ℹ️\n│ Utilisez ${prefix}menuxp pour plus d'XP !\n╰★────★────★╯`,
betUsage: ({ prefix, command }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎰 ୭ *CASINO*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Comment jouer ✦ ꒷꒦\n\nEntrez la quantité de 💶 UnityCoins à miser contre *ChatUnity-Bot*\n\n📌 Exemple :\n${prefix}${command} 100\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎲\n│ Choisissez une mise ci-dessous !\n╰★────★────★╯`,
betCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Vous avez déjà misé\n  ━━✫ Attendez ⏱ ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
betLose: ({ bot, user, amount, botName, userName }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎲 ୭ *RÉSULTAT*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Nombres tirés ✦ ꒷꒦\n\n🤖 *${botName}* : ${bot}\n👤 *${userName}* : ${user}\n\n╭★────★────★────★╮\n│ 😢 VOUS AVEZ PERDU !\n│ ➖ ${amount} 💶 UC\n╰★────★────★╯`,
betWin: ({ bot, user, amount, botName, userName }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎲 ୭ *RÉSULTAT*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Nombres tirés ✦ ꒷꒦\n\n🤖 *${botName}* : ${bot}\n👤 *${userName}* : ${user}\n\n╭★────★────★────★╮\n│ 🎉 VOUS AVEZ GAGNÉ !\n│ ➕ ${amount} 💶 UC\n╰★────★────★╯`,
betDraw: ({ bot, user, amount, botName, userName }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎲 ୭ *RÉSULTAT*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Nombres tirés ✦ ꒷꒦\n\n🤖 *${botName}* : ${bot}\n👤 *${userName}* : ${user}\n\n╭★────★────★────★╮\n│ 🤝 ÉGALITÉ !\n│ ↩️ ${amount} 💶 UC restitués\n╰★────★────★╯`,
betInsufficientUC: ({ amount }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 💸 Vous n'avez pas ${amount} 💶 UC\n  ━━✫ à miser !\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rpsAlreadyPlaying: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏱ Vous avez déjà joué\n  ━━✫ Attendez ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rpsChooseOption: () => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ✊ ୭ *PIERRE PAPIER CISEAUX*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Choisissez votre mouvement ✦ ꒷꒦\n\n🪨 Pierre bat Ciseaux\n📄 Papier bat Pierre\n✂️ Ciseaux bat Papier\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎲\n│ Faites votre choix !\n╰★────★────★╯`,
rpsInvalidOption: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Choix invalide\n  ━━✫ Choisissez : pierre/papier/ciseaux\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rpsDraw: ({ player, bot, reward }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤝 ୭ *ÉGALITÉ !*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Résultat ✦ ꒷꒦\n\n👤 Vous : ${player}\n🤖 Bot : ${bot}\n\n╭★────★────★────★╮\n│ 🎁 Prix de consolation\n│ ➕ ${reward} 💶 UC\n╰★────★────★╯`,
rpsWin: ({ player, bot, reward }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *VOUS AVEZ GAGNÉ !*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Résultat ✦ ꒷꒦\n\n👤 Vous : ${player}\n🤖 Bot : ${bot}\n\n╭★────★────★────★╮\n│ 🏆 Victoire épique !\n│ ➕ ${reward} 💶 UC\n╰★────★────★╯`,
rpsLose: ({ player, bot, loss }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 😢 ୭ *VOUS AVEZ PERDU !*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Résultat ✦ ꒷꒦\n\n👤 Vous : ${player}\n🤖 Bot : ${bot}\n\n╭★────★────★────★╮\n│ 💸 Meilleure chance la prochaine fois\n│ ➖ ${loss} 💶 UC\n╰★────★────★╯`,
rpsRock: () => "🪨 Pierre",
rpsPaper: () => "📄 Papier",
rpsScissors: () => "✂️ Ciseaux",
rpsButtonRock: () => "🪨 Pierre",
rpsButtonPaper: () => "📄 Papier",
rpsButtonScissors: () => "✂️ Ciseaux",
rpsButtonRetry: () => "🔄 Réessayer",
bjInsufficientFunds: () => "💰 Fonds insuffisants !",
bjNotYourTurn: () => "❌ Ce n'est pas votre tour !",
bjBusted: () => "💥 Busté ! Vous avez dépassé 21 !",
bjDealerBusted: () => "🎉 Croupier busté ! Vous avez gagné !",
bjYouWin: () => "🎉 Vous avez gagné !",
bjDealerWins: () => "😔 Le croupier gagne !",
bjPush: () => "🤝 Égalité !",
bjMakeBet: () => "💵 Faites votre mise !",
bjYourTurn: () => "📋 Votre tour ! Tirer ou Rester ?",
bjYourScore: ({ score }) => `📋 Votre score : ${score}`,
bjTimeoutTitle: () => "⏰ TEMPS ÉCOULÉ",
bjTimeoutMsg: ({ balance }) => `⏰ Temps écoulé ! Partie annulée.\n💶 Portefeuille : ${balance} UC`,
bjGameInProgress: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🎰 Partie déjà en cours\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjInvalidBet: ({ max }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Mise invalide\n  ━━✫ Montant : 10-${max} UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
bjStartCaption: ({ name, bet, balance }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎰 ୭ *BLACKJACK*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ ${name} ✦ ꒷꒦\n\n💶 Mise : ${bet} UC\n📋 Solde : ${balance} UC\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ⚡\n│ .tirer .rester .doubler\n╰★────★────★╯`,
bjNoGame: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Aucune partie en cours\n  ━━✫ Utilisez : .blackjack [mise]\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjNotYourGame: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ce n'est pas votre tour !\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjDoubleOnlyTwo: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Doublez seulement avec 2 cartes\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjDoubleInsufficientFunds: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Fonds insuffisants\n  ━━✫ pour doubler\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjFooter: () => "♠️ Blackjack Bot ♣️",
bjPlayer: () => "JOUEUR",
bjDealer: () => "CROUPIER",
bjScore: () => "SCORE",
bjWallet: () => "💶 PORTEFEUILLE",
bjBet: () => "🎯 MISE",
rouletteCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Vous avez déjà misé\n  ━━✫ Attendez ⏱ ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteUsage: ({ prefix, command }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎰 ୭ *ROULETTE*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Comment jouer ✦ ꒷꒦\n\nEntrez quantité et couleur :\n${prefix}${command} 20 noir\n${prefix}${command} 50 rouge\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎲\n│ Choisissez votre couleur !\n╰★────★────★╯`,
rouletteInvalidFormat: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Format incorrect\n  ━━✫ Exemple : ${prefix}${command} 20 noir\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteInvalidAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Quantité invalide\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteMaxBet: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Maximum 50 💶 UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteInvalidColor: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Couleur invalide\n  ━━✫ Choisissez : noir ou rouge\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteInsufficientFunds: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 💶 UC insuffisants\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteBetPlaced: ({ amount, color }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎰 ୭ *MISE PLACÉE*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Détails ✦ ꒷꒦\n\n💰 Montant : ${amount} 💶 UC\n🎨 Couleur : ${color === 'black' ? '⚫ NOIR' : '🔴 ROUGE'}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ⏱\n│ Attendez 10 secondes...\n╰★────★────★╯`,
rouletteWin: ({ amount, total, winColor }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *VOUS AVEZ GAGNÉ !*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Résultat ✦ ꒷꒦\n\n🎯 Couleur sortie : ${winColor === 'black' ? '⚫ NOIR' : '🔴 ROUGE'}\n\n╭★────★────★────★╮\n│ 💰 Gain : +${amount} 💶 UC\n│ 💎 Total : ${total} 💶 UC\n╰★────★────★╯`,
rouletteLose: ({ amount, total, winColor }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 😢 ୭ *VOUS AVEZ PERDU !*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Résultat ✦ ꒷꒦\n\n🎯 Couleur sortie : ${winColor === 'black' ? '⚫ NOIR' : '🔴 ROUGE'}\n\n╭★────★────★────★╮\n│ 💸 Perte : -${amount} 💶 UC\n│ 💎 Total : ${total} 💶 UC\n╰★────★────★╯`,
rouletteBlack: () => "⚫ Noir",
rouletteRed: () => "🔴 Rouge",
rouletteButtonBlack10: () => "⚫ 10 UC",
rouletteButtonBlack25: () => "⚫ 25 UC",
rouletteButtonBlack50: () => "⚫ 50 UC",
rouletteButtonRed10: () => "🔴 10 UC",
rouletteButtonRed25: () => "🔴 25 UC",
rouletteButtonRed50: () => "🔴 50 UC",
// Pile ou Face
cfCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Vous avez déjà joué\n  ━━✫ Attendez ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cfWaiting: ({ player }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🪙 ୭ *PILE OU FACE*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Partie commencée ✦ ꒷꒦\n\n🧑 Joueur 1 : @${player}\n🕹️ En attente du deuxième joueur...\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎲\n│ Tapez pile ou face !\n╰★────★────★╯`,
cfPlayer1Ready: ({ player, choice }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🪙 ୭ *PILE OU FACE*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Joueur 1 prêt ✦ ꒷꒦\n\n🧑 @${player} a choisi *${choice}*\n🎯 En attente du Joueur 2...\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎮\n│ À votre tour !\n╰★────★────★╯`,
cfInvalidChoice: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Choix invalide\n  ━━✫ Tapez : pile ou face\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cfResult: ({ result, p1, p2, msg, prefix, command }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🪙 ୭ *RÉSULTAT : ${result.toUpperCase()}*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n${msg}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔄\n│ ${prefix}${command} pour rejouer\n╰★────★────★╯`,
cfAlreadyChosen: ({ choice }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ Vous avez déjà choisi ${choice}\n  ━━✫ Attendez un autre joueur\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cfNotAvailable: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Partie non disponible\n  ━━✫ ${prefix}${command} pour commencer\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cfButtonHeads: () => "🪙 Pile",
cfButtonTails: () => "🪙 Face",

// PFC v2
rps2Cooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Attendez ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rps2Usage: ({ prefix, command }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ✊ ୭ *PIERRE PAPIER CISEAUX*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Comment jouer ✦ ꒷꒦\n\n${prefix}${command} pierre\n${prefix}${command} papier\n${prefix}${command} ciseaux\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎮\n│ Choisissez votre mouvement !\n╰★────★────★╯`,
rps2InvalidChoice: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Choix invalide\n  ━━✫ ${prefix}${command} pierre/papier/ciseaux\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rps2Draw: ({ bot, reward }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤝 ୭ *ÉGALITÉ !*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Bot : ${bot} ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ 🎁 +${reward} 💶 UC\n╰★────★────★╯`,
rps2Win: ({ bot, reward }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *VOUS AVEZ GAGNÉ !*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Bot : ${bot} ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ 💰 +${reward} 💶 UC\n╰★────★────★╯`,
rps2Lose: ({ bot, loss }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 😢 ୭ *VOUS AVEZ PERDU !*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Bot : ${bot} ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ 💸 -${loss} 💶 UC\n╰★────★────★╯`,
rps2ButtonRock: () => "🪨 Pierre",
rps2ButtonPaper: () => "📄 Papier",
rps2ButtonScissors: () => "✂️ Ciseaux",

// Pokédex
pokedexNoName: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Entrez le nom du Pokémon\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokedexSearching: ({ name }) => `🔍 Recherche de ${name}...`,
pokedexError: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Erreur recherche Pokémon\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokedexInfo: ({ name, id, type, abilities, height, weight, desc, url }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎌 ୭ *POKÉDEX - ${name}*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Informations ✦ ꒷꒦\n\n🔹 *Nom :* ${name}\n🔹 *ID :* ${id}\n🔹 *Type :* ${type}\n🔹 *Capacités :* ${abilities}\n🔹 *Taille :* ${height}\n🔹 *Poids :* ${weight}\n\n📝 *Description :*\n${desc}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🌐\n│ ${url}\n╰★────★────★╯`,
flagGameActive: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Partie déjà active\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagGroupOnly: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Réservé aux groupes\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagNoGame: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Aucune partie active\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagAdminOnly: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Réservé aux admins\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Attendez ${time}s\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagSkipped: ({ answer }) => `ㅤ⋆｡˚『 ╭ \`JEU INTERROMPU\` ╯ 』˚｡⋆\n╭\n│ 『 🏳️ 』 \`La réponse était :\`\n│ 『 ‼️ 』 *\`${answer}\`*\n│ 『 👑 』 _*Interrompu par un admin*_\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagStart: ({ phrase }) => `ㅤ⋆｡˚『 ╭ \`${phrase}\` ╯ 』˚｡⋆\n╭\n│ 『 🏳️ 』 \`Répondez avec le nom\` *du pays*\n│ 『 ⏱️ 』 \`Temps disponible :\` *30 secondes*\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagTimeout: ({ answer }) => `ㅤ⋆｡˚『 ╭ \`TEMPS ÉCOULÉ !\` ╯ 』˚｡⋆\n╭\n│ 『 🏳️ 』 \`La réponse était :\`\n│ 『 ‼️ 』 *\`${answer}\`*\n│ 『 💡 』 _*Soyez plus rapide la prochaine fois !*_\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagCorrect: ({ answer, time, reward, exp, bonus }) => `ㅤ⋆｡˚『 ╭ \`RÉPONSE CORRECTE !\` ╯ 』˚｡⋆\n╭\n│ 『 🏳️ 』 \`Pays :\` *${answer}*\n│ 『 ⏱️ 』 \`Temps pris :\` *${time}s*\n│ 『 🎁 』 \`Récompenses :\`\n│ 『 💰 』 *${reward}€* ${bonus > 0 ? `(+${bonus} bonus vitesse)` : ''}\n│ 『 🆙 』 *${exp} EXP*\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagAlmostThere: () => "👀 *Vous y êtes presque !*",
flagAttemptsExhausted: () => `ㅤ⋆｡˚『 ╭ \`TENTATIVES ÉPUISÉES !\` ╯ 』˚｡⋆\n╭\n│ 『 ❌ 』 \`Vous avez épuisé vos 3 tentatives !\`\n│ 『 ⏳ 』 _*Attendez que d'autres essaient...*_\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagWrongHint: ({ letter, length }) => `❌ *Réponse incorrecte !*\n\n💡 *Indice :*\n  • Commence par la lettre *"${letter}"*\n  • Comporte *${length} lettres*`,
flagWrong2: ({ remaining }) => `❌ *Réponse incorrecte !*\n\n📝 *Tentatives restantes :* ${remaining}\n🤔 *Réfléchissez bien à votre prochaine réponse !*`,
flagWrongLast: () => `❌ *Réponse incorrecte !*\n\n📝 *Dernière tentative restante...*`,
flagPlayAgain: () => "🏳️ Rejouer !",
flagError: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Erreur démarrage jeu\n  ━━✫ Réessayez dans quelques secondes\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagPhrase1: () => "🇺🇳 *DEVINEZ LE DRAPEAU !* 🇺🇳",
flagPhrase2: () => "🌍 *Quel pays représente ce drapeau ?*",
flagPhrase3: () => "🏳️ *Défi géographique : reconnaissez ce drapeau ?*",
flagPhrase4: () => "🧭 *Devinez le pays depuis son drapeau !*",
flagPhrase5: () => "🎯 *Quiz drapeaux : quel pays est-ce ?*",
flagPhrase6: () => "🌟 *Testez vos connaissances géographiques !*",
flagPhrase7: () => "🔍 *Observez attentivement et devinez le pays !*",
songGameActive: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Partie déjà en cours\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
songError: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Erreur dans le jeu\n  ━━✫ Réessayez plus tard\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
songStart: ({ artist, time }) => `  ⋆｡˚『 ╭ \`DEVINEZ LA CHANSON\` ╯ 』˚｡⋆\n╭\n┃ 『 ⏱️ 』 \`Temps :\` *${time} secondes*\n┃ 『 👤 』 \`Artiste :\` *${artist}*\n┃\n┃ ➤  \`Tapez le titre !\`\n╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒`,
songTimeout: ({ title, artist }) => `ㅤ⋆｡˚『 ╭ \`TEMPS ÉCOULÉ\` ╯ 』˚｡⋆\n╭\n│\n│ ➤ \`Personne n'a deviné !\`\n┃ 『  』🎵 \`Titre :\` *${title}*\n┃ 『  』👤 \`Artiste :\` *${artist}*\n┃\n╰⭒─ׄ─ׅ─ׄ─⭒`,
songCorrect: ({ title, artist, reward, exp }) => `ㅤㅤ⋆｡˚『 ╭ \`CORRECT\` ╯ 』˚｡⋆\n╭\n│\n│ ➤ \`Réponse Correcte !\`\n┃ 『  』🎵 \`Titre :\` *${title}*\n┃ 『  』👤 \`Artiste :\` *${artist}*\n┃\n┃ 『 🎁 』 \`Gains :\`\n│ ➤  \`${reward}\` *UC*\n│ ➤  \`${exp}\` *EXP*\n┃\n╰⭒─ׄ─ׅ─ׄ─⭒`,
songAlmostThere: () => "👀 *Vous y êtes presque !* Réessayez...",
songPlayAgain: () => "『 🎵 』 Rejouer",
songExternalTitle: () => "devinez la chanson",
songExternalArtist: ({ artist }) => `Artiste : ${artist}`,
songExternalSource: () => "ChatUnity Bot",
logoGroupOnly: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Réservé aux groupes\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoNoGame: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Aucune partie active\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoAdminOnly: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Admin uniquement\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoSkipped: ({ answer }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🛑 ୭ *JEU INTERROMPU*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ La réponse était ✦ ꒷꒦\n\n🚗 *${answer}*`,
logoGameActive: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Partie déjà en cours\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Attendez ${time}s\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoStart: ({ phrase, time }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚗 ୭ *${phrase}*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Devinez la marque ✦ ꒷꒦\n\n⌛ Temps : ${time} secondes\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔍\n│ Écrivez le nom de la marque !\n╰★────★────★╯`,
logoTimeout: ({ answer }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⏰ ୭ *TEMPS ÉCOULÉ !*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ La réponse était ✦ ꒷꒦\n\n🚗 *${answer}*\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔄\n│ Réessayez avec .auto\n╰★────★────★╯`,
logoCorrect: ({ brand, time, reward, exp, bonus }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *RÉPONSE CORRECTE !*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Détails ✦ ꒷꒦\n\n🚗 Marque : *${brand}*\n⏱ Temps : *${time}s*\n\n╭★────★────★────★╮\n│ 🎁 Récompenses :\n│ • ${reward} 💰 UC${bonus > 0 ? ` (+${bonus} bonus)` : ''}\n│ • ${exp} 🆙 EXP\n╰★────★────★╯\n\n> \\by ChatUnity\\`,
logoPhrase1: () => "🚘 DEVINEZ LE LOGO !",
logoPhrase2: () => "🏁 Quelle marque est-ce ?",
logoPhrase3: () => "🔍 Reconnaissez-vous cette voiture ?",
logoPhrase4: () => "🚗 Quiz Auto !",
logoPhrase5: () => "🏎️ Devinez la marque !",
logoButtonPlayAgain: () => "🚗 Rejouer",
missionMainTitle: ({ bot }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎯 ୭ *SYSTÈME DE MISSIONS*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ ${bot} ✦ ꒷꒦`,
missionMainStats: ({ user, money, bank, dailyDone, dailyTotal, weeklyDone, weeklyTotal }) => `👤 Utilisateur : @${user}\n💰 Solde : ${money} UC\n🏦 Banque : ${bank} UC\n📅 Quotidiennes : ${dailyDone}/${dailyTotal} terminées\n📆 Hebdomadaires : ${weeklyDone}/${weeklyTotal} terminées\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎯\n│ Sélectionnez le type de missions :\n╰★────★────★╯`,
missionButtonDaily: () => "📅 QUOTIDIENNES",
missionButtonWeekly: () => "📆 HEBDOMADAIRES",
missionButtonClaim: () => "💰 RÉCLAMER",
missionButtonBack: () => "🔙 RETOUR",
missionButtonWallet: () => "💰 PORTEFEUILLE",
missionDailyTitle: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📅 ୭ *MISSIONS QUOTIDIENNES*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n👤 @${user}`,
missionDailyReset: ({ time }) => `⏳ Reset dans : ${time}`,
missionWeeklyTitle: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📆 ୭ *MISSIONS HEBDOMADAIRES*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n👤 @${user}`,
missionWeeklyReset: ({ time }) => `⏳ Reset dans : ${time}`,
missionEntry: ({ num, title, progress, target, reward, status }) => `▢ *${num}. ${title}*\n➠ Progression : ${progress}/${target}\n➠ Récompense : ${reward} UC\n➠ Statut : ${status}`,
missionStatusCompleted: () => "✅ RÉCLAMÉE",
missionStatusReady: () => "💰 PRÊTE",
missionStatusInProgress: () => "❌ EN COURS",
missionFooterDaily: ({ prefix }) => `Utilisez "${prefix}missions claim" pour réclamer !`,
missionFooterWeekly: () => "Missions hebdomadaires - Récompenses supérieures !",
missionFooterMain: () => "Complétez les missions pour gagner des UnityCoins !",
missionNoRewards: ({ user }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ @${user} vous n'avez pas de missions\n  ━━✫ terminées à réclamer !\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
missionClaimSuccess: ({ user, total, details, money, bank }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *RÉCOMPENSES RÉCLAMÉES*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n👤 @${user}\n💰 Total réclamé : *${total} UC*\n\n${details}\n\n╭★────★────★────★╮\n│ 💰 Solde : ${money} UC\n│ 🏦 Banque : ${bank} UC\n╰★────★────★╯`,
missionClaimFooter: () => "Utilisez .portefeuille pour voir le solde complet",
missionSendMessages: ({ count }) => `Envoyez ${count} messages`,
missionExecuteCommands: ({ count }) => `Exécutez ${count} commandes`,
missionNoWarn: () => "Restez sans avertissement",
missionNoWarnWeek: () => "Restez 7 jours sans avertissement",
missionTotalMessages: ({ count }) => `Atteignez ${count} messages totaux`,
walletNotFound: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Utilisateur non trouvé\n  ━━✫ dans la base de données\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
walletTitle: () => "💰 PORTEFEUILLE",
walletInfo: ({ name, uc, bank }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💰 ୭ *PORTEFEUILLE*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ ${name} ✦ ꒷꒦\n\n👤 Utilisateur : ${name}\n💰 UnityCoins : ${uc} 💶\n🏛️ Banque : ${bank} 💳\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 💎\n│ Utilisez .déposer pour déposer\n│ Utilisez .retirer pour retirer\n╰★────★────★╯`,
walletExternalTitle: ({ name }) => `Portefeuille de ${name}`,
walletExternalBody: ({ uc }) => `Solde : ${uc} UC`,
walletButtonDeposit: () => "🏛️ Déposer",
walletButtonWithdraw: () => "💰 Retirer",
walletButtonGames: () => "🎮 Jeux",
bankNotFound: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Utilisateur non trouvé\n  ━━✫ dans la base de données\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
bankYourBalance: ({ balance }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🏛️ ୭ *VOTRE COMPTE*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Solde Bancaire ✦ ꒷꒦\n\n💰 Vous avez *${balance} 💶 UnityCoins*\ndans votre banque 🏛️\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 💎\n│ Utilisez .déposer pour déposer\n│ Utilisez .retirer pour retirer\n╰★────★────★╯`,
bankUserBalance: ({ user, balance }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🏛️ ୭ *COMPTE BANCAIRE*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ @${user} ✦ ꒷꒦\n\n💰 A *${balance} 💶 UnityCoins*\ndans la banque 🏛️`,
bankButtonDeposit: () => "🏛️ Déposer",
bankButtonWithdraw: () => "💰 Retirer",
bankButtonTransfer: () => "💸 Transférer",
transferNoMention: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Mentionnez le destinataire\n  ━━✫ Exemple : @user 100\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferNoAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Entrez le montant\n  ━━✫ de 💶 UnityCoins à transférer\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferInvalidAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Montant invalide\n  ━━✫ Utilisez uniquement des nombres\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferMinAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Minimum transférable : 1 UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferInsufficient: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 💸 Solde insuffisant\n  ━━✫ pour ce transfert\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferSuccess: ({ amount, fee, total }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💸 ୭ *TRANSFERT EFFECTUÉ*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Détails Transaction ✦ ꒷꒦\n\n💰 Montant envoyé : *${amount}* 💶 UC\n📊 Taxe 2% : *${fee}* 💶 UC\n💳 Total débité : *${total}* 💶 UC\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ✅\n│ Transfert terminé !\n╰★────★────★╯`,
transferReceived: ({ amount }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💰 ୭ *UC REÇUS*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Vous avez reçu ✦ ꒷꒦\n\n💶 *+${amount} UnityCoins*\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎁\n│ Vérifiez votre solde !\n╰★────★────★╯`,
transferSelf: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Vous ne pouvez pas transférer\n  ━━✫ à vous-même\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
robNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🧠 Taggez quelqu'un ou\n  ━━✫ répondez à un message\n  ━━✫ Exemple : ${prefix}${command} @utilisateur\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
robSelf: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🤡 Vous ne pouvez pas voler\n  ━━✫ vous-même\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
robCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚨 Vous avez déjà volé\n  ━━✫ Réessayez dans ⏱ ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
robSuccess: ({ amount, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💰 ୭ *COUP RÉUSSI !*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Vol parfait ✦ ꒷꒦\n\nVous avez volé *${amount} 💶 UC*\nà @${target}\n\n╭★────★────★────★╮\n│ 💸 +${amount} 💶 UC\n│ ୭ ˚. ᵎᵎ ✅ À votre solde\n╰★────★────★╯`,
robCaught: ({ fine, name }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚓 ୭ *ARRÊTÉ !*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Attrapé par la police ✦ ꒷꒦\n\n${name} a été arrêté !\n\n╭★────★────★────★╮\n│ 💸 Amende : -${fine} 💶 UC\n│ ୭ ˚. ᵎᵎ ❌ Meilleure chance la prochaine fois\n╰★────★────★╯`,
robPartial: ({ amount, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💸 ୭ *VOL PARTIEL*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Presque réussi ✦ ꒷꒦\n\nVous n'avez volé que *${amount} 💶 UC*\nà @${target}\n\n╭★────★────★────★╮\n│ 💰 +${amount} 💶 UC\n│ ୭ ˚. ᵎᵎ ⚠️ À votre solde\n╰★────★────★╯`,
robButtonRetry: () => "🔄 Réessayer",
robButtonWallet: () => "💰 Portefeuille",
withdrawNoAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Entrez le montant\n  ━━✫ de 💶 UnityCoins à retirer\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawNoFunds: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Vous n'avez pas de 💶 UnityCoins\n  ━━✫ sur votre compte bancaire\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawInvalidAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Montant invalide\n  ━━✫ Utilisez un nombre valide\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawMinAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Entrez au moins 1 UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawInsufficientFunds: ({ bank }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Vous n'avez que *${bank}* 💶 sur le compte\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawSuccess: ({ count, bank }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ✅ ୭ *RETRAIT EFFECTUÉ*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Vous avez retiré ✦ ꒷꒦\n\n💶 *${count} UnityCoins*\ndu compte bancaire\n\n💳 Nouveau solde banque : *${bank} UC*\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 💼\n│ Utilisez .wallet pour vérifier\n╰★────★────★╯`,
  xpLevelDisplay: ({ level }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧  Niveau : ${level}`,
  xpProgressDisplay: ({ current, needed }) => `Progression XP : ${current} / ${needed}`,
  xpFooterText: () => "╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐ Continuez à écrire pour monter de niveau !",
  xpCaption: ({ user, level, exp, next }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧\n\n┊ 『 📊 』 Profil XP de ${user}\n\n┃ Niveau actuel : ${level}\n┃ Expérience totale : ${exp}\n┃ XP manquants pour le prochain niveau : ${next}\n\n╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
rubaxpWait: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Vous devez attendre encore avant de pouvoir voler à nouveau\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpWaitTime: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Vous devez attendre encore ${time} avant de pouvoir voler à nouveau\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 📍 Vous devez tagger un utilisateur valide\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpUserNotFound: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Utilisateur non trouvé dans la base de données\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpTooPoor: ({ target, limit }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😢 @${target} a moins de *${limit} XP*\n  ━━✫ Ne volez pas les pauvres, soyez gentil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpSuccess: ({ amount, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ✅ ୭ *VOL EFFECTUÉ*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Vous avez volé ✦ ꒷꒦\n\n💰 *${amount} XP*\nà @${target}\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎮\n│ Continuez ainsi !\n╰★────★────★╯`,
rubaxpTimeFormat: ({ hours, minutes, seconds }) => `${hours} Heure(s) ${minutes} Minute(s) ${seconds} Seconde(s)`,darxpNoMention: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Vous devez mentionner un utilisateur avec @user\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpNoAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Entrez le montant de 💫 XP à transférer\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpInvalidAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Entrez uniquement des nombres valides\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpMinAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Le minimum transférable est 1 💫 XP\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpInsufficientXP: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Vous n'avez pas assez de 💫 XP pour transférer\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpSuccess: ({ xp, tassa }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n  ୧ ✅ ୭ *TRANSFERT EFFECTUÉ*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Vous avez transféré ✦ ꒷꒦\n\n💫 *${xp} XP*\n(taxe : ${tassa} XP)\n╭★────★────★────★╮\n│ Continuez à jouer !\n╰★────★────★╯`,
marry_no_target: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Vous devez mentionner un utilisateur à épouser
  ━━✫ Utilisez : ${prefix + command} @utilisateur
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_self: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Vous ne pouvez pas vous épouser vous-même
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_user_not_found: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Utilisateur non trouvé dans la base de données
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_already_married_sender: ({ spouse }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💍 ୭ *VOUS ÊTES DÉJÀ MARIÉ*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ Vous êtes marié avec ✦ ꒷꒦

❤ ${spouse}

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
marry_already_married_target: ({ target }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 ${target} est déjà marié
  ━━✫ Cherchez quelqu'un d'autre de célibataire
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_pending_proposal: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Vous avez déjà une demande de mariage en attente
  ━━✫ Attendez qu'elle soit acceptée ou refusée
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_proposal_text: ({ sender, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💍 ୭ *DEMANDE EN MARIAGE*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ ${sender} a demandé la main de ✦ ꒷꒦

❤ ${target}

Répondez par "Oui" pour accepter
ou "Non" pour refuser.

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
marry_proposal_expired: ({ sender, target }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⏳ La demande entre ${sender} et ${target}
  ━━✫ a expiré par inactivité
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_proposal_rejected: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 💔 La demande a été refusée
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_user_not_found_db: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Erreur : utilisateurs non trouvés dans la base de données
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_success: ({ sender, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💍 ୭ *MARIAGE ENREGISTRÉ*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ Nouveau couple officiel ✦ ꒷꒦

❤ ${sender}  ×  ${target}

꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧
Que l'amour commence !

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
divorce_not_married: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Vous n'êtes marié à personne
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
divorce_spouse_not_found: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Votre conjoint n'a pas été trouvé dans la base de données
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
divorce_success: ({ ex }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💔 ୭ *DIVORCE TERMINÉ*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ Vous vous êtes séparé de ✦ ꒷꒦

${ex}

· ୨୧ · · ୨୧ ·  ♡
Nouveau chapitre de votre vie commencé.

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
shipNoUser: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❗ Utilisez la commande ainsi :
  ━━✫ ${prefix + command} @utilisateur
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
shipNoUsersPair: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❗ Utilisez la commande ainsi :
  ━━✫ ${prefix + command} @utilisateur1 [@utilisateur2]
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
shipInvalidUsers: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❌ Utilisateurs invalides
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
shipCaption: ({ user1, user2, percent }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

💘 *@${user1}* ❤️ *@${user2}*
🔮 Compatibilité : *${percent}%*

· ୨୧ · · ୨୧ ·  ♡`,
shipErrorImage: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❌ Erreur lors de la génération de l'image
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
kissNoTargetMention: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 💋 Vous devez mentionner quelqu'un ou répondre à un message
  ━━✫ Exemple : ${prefix + command} @utilisateur
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
kissNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 💋 Vous devez mentionner quelqu'un pour l'embrasser
  ━━✫ Exemple : .embrasse @utilisateur
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
kissSuccess: ({ senderName, targetName }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💋 ୭ *Baiser délivré*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ ${senderName} a donné un baiser à ✦ ꒷꒦

😘 ${targetName}

· ୨୧ · · ୨୧ ·  ♡`,
odioNoText: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 😡 Vous devez spécifier quelqu'un
  ━━✫ Exemple : ${prefix + command} @utilisateur
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
odioResult: ({ target, percent }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 😡 ୭ *CALCULATEUR DE HAINE*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ Niveau de haine entre ✦ ꒷꒦

${target}  ✕  vous

🔥 Haine : *${percent}%*

꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧`,
rizzNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 Vous devez tagger quelqu'un ou répondre à un message
  ━━✫ Exemple : ${prefix + command} @utilisateur
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rizzSuccess: ({ target, line }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ ✨ ୭ *Mouvement de Rizz*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ @${target} regardez ça ✦ ꒷꒦

"${line}"

· ୨୧ · · ୨୧ ·  ♡`,
minacciaNoGroup: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Cette commande ne peut être utilisée que dans les groupes
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
minacciaDisabled: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Les menaces sont désactivées dans ce groupe
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
minacciaNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 Vous devez spécifier quelqu'un à menacer
  ━━✫ Taggez un utilisateur ou répondez à un message
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
minacciaText: ({ target, line }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

@${target} ${line}

· ୨୧ · · ୨୧ ·  ♡`,
zizzaniaNoGroup: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Cette commande ne peut être utilisée que dans les groupes
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
zizzaniaDisabled: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 La zizanie est désactivée dans ce groupe
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
zizzaniaText: ({ a, line, b }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

@${a} ${line} @${b}

· ୨୧ · · ୨୧ ·  ♡`,
ditalinoNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 Vous devez tagger quelqu'un ou répondre à un message
  ━━✫ Exemple : ${prefix + command} @utilisateur
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
ditalinoStart: ({ target }) => `🤟🏻 Je commence une série de câlins spéciaux pour *${target}*...`,
ditalinoMiddle: () => "🤟🏻 On y est presque...",
ditalinoEnd: () => "👋🏻 Mettez-vous à l'abri de la cascade !!",
ditalinoResult: ({ target, time }) => `✨ *${target}* a explosé de plaisir après *${time}ms* 🥵`,
segaNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 Vous devez tagger quelqu'un ou répondre à un message
  ━━✫ Exemple : ${prefix + command} @utilisateur
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
segaStart: ({ target }) => `Maintenant on s'occupe de ${target}... 😏`,
segaFrame: ({ frame }) => `${frame}`,
segaEnd: ({ target }) => `Oh ${target} est arrivé au maximum de plaisir ! 😋💦`,
insultNoGroup: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Cette commande ne peut être utilisée que dans les groupes
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
insultDisabled: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Les insultes sont désactivées dans ce groupe
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
insultNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 Qui voulez-vous insulter ?
  ━━✫ Taggez quelqu'un ou répondez à un message
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
insultBotLines: () => [
  `Oh non ! Vous avez découvert mon point faible : les insultes ! Comment vais-je jamais m'en remettre ?`,
  `Ah, l'art d'insulter un bot. Un vrai maître de l'ironie vous êtes !`,
  `Incroyable ! Un être humain qui insulte un bot. Tournant épique !`,
  `Vous m'avez vraiment blessé avec votre capacité à insulter un bot. Bravo !`,
  `Votre talent pour insulter un bot est ma source de divertissement préférée.`,
  `Insulter un bot : grande intelligence ou grande ennui ?`,
  `Votre maîtrise des insultes aux bots pourrait faire école.`,
  `Vous semblez le Picasso des insultes aux bots, un vrai chef-d'œuvre.`,
  `Les insultes aux bots sont votre talent caché. Carrière dans le cabaret numérique en vue ?`,
  `L'audace d'insulter une entité sans émotions. Prix pour l'originalité !`
],
insultUserText: ({ target, line }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

@${target} ${line}

· ୨୧ · · ୨୧ ·  ♡`,
friendNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⚠️ Taggez la personne à qui vous voulez envoyer la demande d'amitié
  ━━✫ Exemple : ${prefix}${command} @tag
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
friendSelf: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❌ Vous ne pouvez pas vous ajouter vous-même aux amis
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
friendUserNotFound: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚫 Personne non présente dans le système
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
friendAlready: ({ target }) => `✅ @${target} est déjà parmi vos amis.`,
friendPending: () => `⚠️ Une demande d'amitié est déjà en cours.\nAttendez une réponse ou l'annulation.`,
friendRequestText: ({ target, from }) => `👥 Demande d'amitié en cours...

@${target}, voulez-vous accepter l'amitié de @${from} ?

> ⏳ Vous avez 60 secondes pour choisir.`,
friendTimeout: ({ from, target }) => `⏳ Demande d'amitié annulée
> @${from} et @${target} n'ont pas répondu dans le délai imparti.`,
friendRejected: () => `❌ Demande d'amitié refusée.`,
friendAccepted: ({ from }) => `👥 Maintenant vous et @${from} êtes amis !`,
removeFriendNoTarget: () => `⚠️ Taggez la personne que vous voulez retirer de vos amis.`,
removeFriendNotInList: ({ target }) => `🚫 @${target} n'est pas parmi vos amis.`,
removeFriendSuccess: ({ target }) => `🚫 Vous et @${target} n'êtes plus amis.`,
friendsNoData: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⚠️ Aucune donnée utilisateur trouvée
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
friendsTitle: ({ name }) => `📜 Liste d'Amis de ${name}`,
friendsLastNone: () => `👤 Dernier ami : Personne`,
friendsLastSome: ({ last }) => `👤 Dernier ami : @${last}`,
friendsListHeader: () => `👥 Liste complète :`,
friendsListEmpty: () => `│   Personne, félicitations loup solitaire`,
friendsError: () => `❌ Une erreur s'est produite lors de l'exécution de la commande.`,
lesbicaCalcNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⚠️ Vous devez mentionner quelqu'un ou répondre à un message
  ━━✫ Exemple : ${prefix + command} @utilisateur
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
lesbicaCalcLine1: ({ tag, percentage }) => `@${tag} est ${percentage}% lesbienne, le reste n'est que confusion hormonale.`,
lesbicaCalcLine2: ({ tag, percentage }) => `Test complété : @${tag} a le cerveau câblé pour les femmes à ${percentage}%.`,
lesbicaCalcLine3: ({ tag, percentage }) => `💕 @${tag} regarde les femmes avec l'intensité de ${percentage}% porno en 4K.`,
pajeroCalcLine1: ({ tag, percentage }) => `@${tag} est ${percentage}% branleur, le reste ${100 - percentage}% le passe à chercher d'autres porno.`,
pajeroCalcLine2: ({ tag, percentage }) => `Rapport médical : @${tag} est ${percentage}% esclave de sa propre bite.`,
pajeroCalcLine3: ({ tag, percentage }) => `🍆 @${tag} pense à se branler ${percentage}% du temps, le reste il le passe à se nettoyer.`,
puttanaCalcLine1: ({ tag, percentage }) => `@${tag} est ${percentage}% pute, le taximètre ne s'éteint jamais.`,
puttanaCalcLine2: ({ tag, percentage }) => `Analyse détaillée : @${tag} a la grille tarifaire ouverte à ${percentage}% 24/7.`,
puttanaCalcLine3: ({ tag, percentage }) => `💰 @${tag} a la remise pute de ${percentage}%, dépêchez-vous avant que ça n'augmente.`,
genericCalcLine: ({ tag, percentage, cmd }) => `@${tag} est ${percentage}% ${cmd}, le reste n'est que honte accumulée.`,
downCalcNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚨 TAGGEZ QUELQU'UN, GÉNIE
  ━━✫ Exemple : ${prefix}${command} @nom
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
downCalcLine: ({ name, cmd, percent, frase, verdict }) => `*⚡️ VERDICT FINAL ⚡️*

*Sujet :* ${name}
*Niveau de "${cmd}" :* ${percent}%

*Diagnostic :* ${frase}

*Pronostic :* ${verdict}`,
downCalcPhrases: () => [
  "Il est tellement inutile que même la poubelle de recyclage le refuse.",
  "Si l'évolution fonctionnait bien, tu serais encore une cellule unique dans la boue.",
  "Tu as la profondeur émotionnelle d'une flaque d'eau et l'intelligence d'une pierre mouillée.",
  "Si le cerveau brûlait des calories, tu grossirais même en dormant.",
  "Quand tu parles, chaque neurone de la planète fait une minute de silence par respect.",
  "Si la bêtise était une énergie renouvelable, toi seul suffirais à éclairer l'Europe.",
  "Tu as la même utilité qu'un parapluie troué dans un ouragan.",
  "Si tu étais un bug, même les développeurs ne perdraient pas de temps à te corriger.",
  "Ta contribution au monde est comparable à celle d'un mégot éteint dans une flaque d'eau.",
  "Tu as la coordination mentale d'un pigeon ivre sur l'autoroute."
],
downCalcVerdicts: ({ percent }) => {
  if (percent > 90) return "🔴 CAS CLINIQUE IRRÉCUPÉRABLE. L'humanité demande officiellement le remboursement.";
  if (percent > 70) return "🟠 DANGER BIOLOGIQUE. Interdit de le faire se reproduire sans autorisation écrite de l'OMS.";
  if (percent > 40) return "🟡 DÉFAUT DE FABRICATION. À utiliser uniquement comme exemple dans les cours de ce qu'il ne faut PAS devenir.";
  return "🟢 ANOMALIE STATISTIQUE. Peut-être qu'un cerveau existe... quelque part, sous tout ce vide.";
},
alcolNoText: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🍷 Aucun nom spécifié, j'utiliserai le vôtre
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
alcolHigh: () => "🍾 Tu es tellement plein que même le foie a demandé la retraite anticipée.",
alcolMid: () => "🥂 Tu bois comme si demain n'existait pas, mais demain te présente la facture.",
alcolLow: () => "🚰 Totalement sobre, la seule chose qui tourne est ta tristesse.",
alcolResult: ({ target, percent, phrase }) => `『💬』 ══ •⊰✰⊱• ══ 『💬』

MOMENT DU TEST D'ALCOOL ! 🍷
━━━━━━━━━━━━━━
${target} a un taux d'alcoolémie de ${percent}% ! 🍷
『💬』 ══ •⊰✰⊱• ══ 『💬』

${phrase}`,
drugNoText: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🌿 Aucun nom spécifié, j'utiliserai le vôtre
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
drugHigh: () => "🌿 Tellement défoncé que s'il respire fort il intoxique le quartier.",
drugMid: () => "🌿 Il ne sait pas sniffer, mais il y met tellement d'effort qu'il finira dans les manuels médicaux.",
drugLow: () => "🌿 Un exemple à suivre… dans ce groupe c'est presque une créature mythologique.",
drugResult: ({ target, percent, phrase }) => `『💬』 ══ •⊰✰⊱• ══ 『💬』

MOMENT DU DRUG TEST ! 🌿
━━━━━━━━━━━━━━
${target} a un taux de substances dans le sang de ${percent}% ! 🌿
『💬』 ══ •⊰✰⊱• ══ 『💬』

${phrase}`,
raceCalcNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⚠️ Vous devez tagger quelqu'un ou répondre à un message
  ━━✫ Exemple : ${prefix + command} @utilisateur
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
raceCalcLine: ({ tag, percent, label }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

@${tag} est ⚫ ${percent}% ${label}

· ୨୧ · · ୨୧ ·  ♡`,
cornutoNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🤔 Il manque le nom du/de la cocu(e)
  ━━✫ Utilisez : .cocu @nom ou répondez à un message
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cornutoSpecialText: () => `🤣 *EH BIEN, VOICI LE ROI DES COCUS !* 🤣
On dit que s'il enlève ses cornes ça fait une antenne 5G📡💀`,
cornutoLow: () => "🛡 Tout tranquille... pour l'instant. Mais garde quand même un œil sur le téléphone du partenaire.",
cornutoMid: () => "😬 Quelques chats archivés de trop… le soupçon est dans l'air.",
cornutoHigh: () => "👀 Cocumètre en alerte maximale ! Les cornes se chargent à 78%.",
cornutoMax: () => "🫣 NIVEAU MONDIAL : si tu ouvres Google Maps un triangle de cornes apparaît sur ta tête.",
cornutoAdviceHigh: () => "🔔 Conseil : ne te retourne pas… ils pourraient s'en servir comme prise. 🤣",
cornutoAdviceLow: () => "😌 Respire, pour l'instant tu es dans le limbe entre béat et futur membre du club.",
cornutoResult: ({ target, percent, message, advice }) => `🔍 CALCULATEUR DE COCUTERIE 🔍

👤 ${target}
📈 Cocuterie : ${percent}%
${message}

${advice}`,
}