export default {
  
  // Sistema general
  smsAvisoMG: () => "⚠️ ¡Atención!",
  smsWait: () => "⏳ Cargando...",
  smsError: () => "❌ Se ha producido un error",
  smsSuccess: () => "✅ Operación completada con éxito",
  smsProcessing: () => "🔄 Procesando...",
  
  // Comandos generales
  smsOnlyGroup: () => "❌ ¡Este comando solo funciona en grupos!",
  smsOnlyAdmin: () => "❌ ¡Solo los administradores pueden usar este comando!",
  smsOnlyOwner: () => "❌ ¡Solo el propietario puede usar este comando!",
  smsOnlyPremium: () => "💎 ¡Este comando solo está disponible para usuarios premium!",
  smsInvalidCommand: () => "❌ Comando no válido",
  smsNoText: () => "❌ Ingresa algún texto",
  smsNoMedia: () => "❌ Envía o responde a un archivo multimedia",
  
  // IA y ChatGPT
  aiNoQuery: () => "⚠️ *¡Ingresa una consulta válida para ChatGPT!*\n\n📌 Ejemplos:\n{prefix}{command} Cuéntame un chiste\n{prefix}{command} Sugiéreme 5 libros de fantasía\n{prefix}{command} Código HTML para una página con login",
  aiError: () => "❌ Se ha producido un error al generar la respuesta. Vuelve a intentarlo más tarde.",
  aiProcessing: () => "🤖 Estoy procesando tu solicitud...",
  
  // Sistema de bienvenida/despedida
  welcomeTitle: () => "✧ ¡BIENVENIDO/A! ✧",
  goodbyeTitle: () => "✧ ¡ADIÓS! ✧",
  welcomeDefault: (user, group, members) => `*Bienvenido/a* @${user} 🎉\n┊ *Grupo:* ${group}\n╰► *Miembros:* ${members}`,
  goodbyeDefault: (user, members) => `*Adiós* @${user} 👋\n┊ Ha dejado el grupo\n╰► *Miembros restantes:* ${members}`,
  
  welcomeSetHelp: () => `🎉 *Configurar mensaje de bienvenida*

*Uso:* {command} <mensaje>

*Variables disponibles:*
• @user - Menciona al usuario
• $nombre - Nombre del usuario  
• $grupo - Nombre del grupo
• $miembros - Número de miembros
• $numero - Número de teléfono
• $tag - Etiqueta del usuario (alias de @user)

*Ejemplo:*
{command} ¡Hola @user! 👋 Bienvenido/a a $grupo! Ahora somos $miembros miembros! 🎉

*Para restaurar el mensaje predeterminado:*
{command} reset`,
  
  goodbyeSetHelp: () => `👋 *Configurar mensaje de despedida*

*Uso:* {command} <mensaje>

*Variables disponibles:*
• @user - Menciona al usuario
• $nombre - Nombre del usuario  
• $grupo - Nombre del grupo
• $miembros - Número de miembros
• $numero - Número de teléfono
• $tag - Etiqueta del usuario (alias de @user)

*Ejemplo:*
{command} ¡Adiós @user! 😢 Te echaremos de menos en $grupo. Quedamos en $miembros miembros.

*Para restaurar el mensaje predeterminado:*
{command} reset`,
  
  // Sistema de advertencias
  warnMentionUser: () => "❌ Debes mencionar a un usuario o responder a su mensaje.",
  warnBotImmune: () => "🚫 No puedes advertir al bot.",
  warnUserNotFound: () => "❌ Usuario no encontrado en la base de datos.",
  warnMessage: (params) => `⚠️ 𝐀𝐃𝐕𝐄𝐑𝐓𝐄𝐍𝐂𝐈𝐀 {warns}/𝟑 (𝟑 𝐚𝐝𝐯𝐞𝐫𝐭𝐞𝐧𝐜𝐢𝐚𝐬=𝐛𝐚𝐧)`,
  warnBanMessage: () => "⛔ 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 𝐄𝐋𝐈𝐌𝐈𝐍𝐀𝐃𝐎 𝐓𝐑𝐀𝐒 3 𝐀𝐃𝐕𝐄𝐑𝐓𝐄𝐍𝐂𝐈𝐀𝐒",
  
  menuownerChooseMenu: () => "Elige un menú:",
  menuownerMainMenuButton: () => "🏠 Menú Principal",
  menuownerAdminMenuButton: () => "🛡️ Menú Admin",
  menuownerSecurityMenuButton: () => "🚨 Menú Seguridad",
  menuownerGroupMenuButton: () => "👥 Menú Grupo",
  menuownerAiMenuButton: () => "🤖 Menú IA",
  menuownerTitle: () => "𝑴𝑬𝑵𝑼 𝑷𝑹𝑶𝑷𝑰𝑬𝑻𝑨𝑹𝑰𝑶",
  menuownerVersionLabel: () => "𝑽𝑬𝑹𝑺𝑰𝑶𝑵",

  menuownerSupportLabel: () => "𝐒𝐎𝐏𝐎𝐑𝐓𝐄",
  menuownerReservedCommands: () => "𝑪𝑶𝑴𝑨𝑵𝑫𝑶𝑺 𝑹𝑬𝑺𝑬𝑹𝑽𝑨𝑫𝑶𝑺 𝑨𝑳 𝑷𝑹𝑶𝑷𝑰𝑬𝑻𝑨𝑹𝑰𝑶",
  menuownerManageCommand: () => "gestionar",
  menuownerSetGroupsCommand: () => "setgrupos",
  menuownerAddGroupsCommand: () => "agregargrupos",
  menuownerResetGroupsCommand: () => "resetgrupos",
  menuownerBanUserCommand: () => "banuser",
  menuownerUnbanUserCommand: () => "unbanuser",
  menuownerCleanupCommand: () => "limpiar",
  menuownerGetFileCommand: () => "getfile",
  menuownerSaveCommand: () => "guardarplugin",
  menuownerDpCommand: () => "delplugin",
  menuownerGetPluginCommand: () => "getplugin",
  menuownerJoinCommand: () => "unirse",
  menuownerOutCommand: () => "salir",
  menuownerPrefixCommand: () => "prefijo",
  menuownerResetPrefixCommand: () => "resetprefijo",
  menuownerGodModeCommand: () => "mododios",
  menuownerResetCommand: () => "reiniciar",
  menuownerAddCommand: () => "agregar",
  menuownerRemoveCommand: () => "eliminar",
  menuownerEveryGroupCommand: () => "cadagrupo",
  menuownerBanChatCommand: () => "banchat",
  menuownerUnbanChatCommand: () => "unbanchat",
  menuownerRestartCommand: () => "reiniciar",
  menuownerShutdownBotCommand: () => "apagarbot",
  menuownerUpdateBotCommand: () => "actualizarbot",
  menuownerPluginParam: () => "plugin",
  menuownerLinkParam: () => "enlace",
  menuownerAutoAdminParam: () => "autoadmin",
  menuownerNumMessagesParam: () => "num. mensajes",
  menuownerCommandParam: () => "comando",
  menuownerGroupParam: () => "grupo",

  // Sistema de menús
  mainMenuTitle: () => '𝑴𝑬𝑵𝑼 𝑷𝑹𝑰𝑵𝑪𝑰𝑷𝑨𝑳',
  adminMenuTitle: () => '𝑴𝑬𝑵𝑼 𝑨𝑫𝑴𝑰𝑵',
  adminCommands: () => '𝑪𝑶𝑴𝑨𝑵𝑫𝑶𝑺 𝑨𝑫𝑴𝑰𝑵',
  chooseMenu: () => 'Elige un menú:',
  mainMenuButton: () => '🏠 Menú Principal',
  ownerMenuButton: () => '👑 Menú Propietario',
  securityMenuButton: () => '🚨 Menú Seguridad',
  groupMenuButton: () => '👥 Menú Grupo',
  aiMenuButton: () => '🤖 Menú IA',
  promoteCommand: () => 'promover /haceradmin',
  demoteCommand: () => 'degradar /quitaradmin',
  warnCommands: () => 'advertir / quitaradvertencia',
  muteCommands: () => 'silenciar / dessilenciar',
  setDescCommand: () => 'setdescripcion',
  setScheduleCommand: () => 'sethorario',
  setNameCommand: () => 'setnombre',
  hidetagCommand: () => 'ocultaretiqueta',
  kickCommand: () => 'expulsar / echare',
  adminsCommand: () => 'admins',
  tagallCommand: () => 'etiquetartodos',
  openCloseCommand: () => 'abierto / cerrado',
  setWelcomeCommand: () => 'setbienvenida',
  setByeCommand: () => 'setdespedida',
  inactiveCommand: () => 'inactivos',
  listNumCommand: () => 'listanum + prefijo',
  cleanupCommand: () => 'limpiar + prefijo',
  clearPlayCommand: () => 'limpiarreproduccion',
  rulesCommand: () => 'reglas/setreglas',
  quarantineCommand: () => 'cuarentena',
  dsCommand: () => 'ds',
  listWarnCommand: () => 'listaadvertencias',
  linkCommand: () => 'enlace',
  linkQrCommand: () => 'enlaceqr',
  poweredBy: () => 'ᴘᴏᴡᴇʀᴇᴅ ʙʏ',
  
  // Menú grupo
  groupMenuTitle: () => '𝑴𝑬𝑵𝑼 𝑮𝑹𝑼𝑷𝑶',
  memberCommands: () => '𝑪𝑶𝑴𝑨𝑵𝑫𝑶𝑺 𝑷𝑨𝑹𝑨 𝑳𝑶𝑺 𝑴𝑰𝑬𝑴𝑩𝑹𝑶𝑺',
  musicAudioSection: () => 'MÚSICA & AUDIO',
  infoUtilitySection: () => 'INFORMACIÓN & UTILIDADES',
  imageEditSection: () => 'IMÁGENES & EDICIÓN',
  pokemonSection: () => 'POKEMON',
  gangSystemSection: () => 'SISTEMA DE BANDAS',
  gamesCasinoSection: () => 'JUEGOS & CASINO',
  economyRankingSection: () => 'ECONOMÍA & CLASIFICACIONES',
  socialInteractionSection: () => 'INTERACCIONES SOCIALES',
  howMuchSection: () => '¿CUÁNTO ES?',
  personalityTestSection: () => 'TEST DE PERSONALIDAD',
  songCommand: () => 'cancion',
  audioCommand: () => 'audio',
  videoCommand: () => 'video',
  artistTitleCommand: () => 'artista-titulo',
  cityCommand: () => 'ciudad',
  textCommand: () => 'texto',
  groupCommand: () => 'grupo',
  repoCommand: () => 'repositorio',
  userCommand: () => 'usuario',
  topicCommand: () => 'tema',
  checkSiteCommand: () => 'verificarsitio',
  photoToStickerCommand: () => 'foto a sticker',
  stickerToPhotoCommand: () => 'sticker a foto',
  improveQualityCommand: () => 'mejorar calidad foto',
  photoCommand: () => 'foto',
  hiddenPhotoCommand: () => 'foto oculta',
  memeCommand: () => 'meme',
  fromStickerCommand: () => 'desde sticker',
  blurImageCommand: () => 'desenfocar imagen',
  comingSoonCommand: () => 'próximamente',
  quantityCommand: () => 'cantidad',
  headsOrTailsCommand: () => 'cara o cruz',
  mathProblemCommand: () => 'problema mate',
  rockPaperScissorsCommand: () => 'piedra papel tijeras',
  pokemonInfoCommand: () => 'info Pokémon',
  balanceCommand: () => 'saldo',
  topUsersCommand: () => 'top usuarios',
  buyUCCommand: () => 'comprar UC',
  withdrawUCCommand: () => 'UC del banco',
  earnXPCommand: () => 'ganar XP',
  proposalCommand: () => 'propuesta',
  endRelationshipCommand: () => 'fin relación',
  affinityCommand: () => 'afinidad',
  charmCommand: () => 'encanto',
  createFightCommand: () => 'crear peleas',
  truthOrDareCommand: () => 'verdad o reto',
  versionLabel: () => '𝑽𝑬𝑹𝑺𝑰𝑶𝑵',
  collabLabel: () => '𝐂𝐎𝐋𝐀𝐁:',
  supportLabel: () => '𝐒𝐎𝐏𝐎𝐑𝐓𝐄',
  
  // Menú propietario
  ownerMenuTitle: () => '𝑴𝑬𝑵𝑼 𝑷𝑹𝑶𝑷𝑰𝑬𝑻𝑨𝑹𝑰𝑶',
  ownerReservedCommands: () => '𝑪𝑶𝑴𝑨𝑵𝑫𝑶𝑺 𝑹𝑬𝑺𝑬𝑹𝑽𝑨𝑫𝑶𝑺 𝑨𝑳 𝑷𝑹𝑶𝑷𝑰𝑬𝑻𝑨𝑹𝑰𝑶',
  setNameCommand: () => 'establecernombre',
  resetNameCommand: () => 'resetnombre',
  manageCommand: () => 'gestionar',
  setGroupsCommand: () => 'establecergrupos',
  addGroupsCommand: () => 'agregargrupos',
  resetGroupsCommand: () => 'resetgrupos',
  setPpCommand: () => 'establecerpp',
  banUserCommand: () => 'banusuario',
  unbanUserCommand: () => 'desbanusuario',
  blockUserCommand: () => 'bloquearusuario',
  unblockUserCommand: () => 'desbloquearusuario',
  getFileCommand: () => 'obtenerarchivo',
  saveCommand: () => 'guardar',
  dpCommand: () => 'dp',
  getPluginCommand: () => 'obtenerplugin',
  joinCommand: () => 'unirse',
  outCommand: () => 'salir',
  prefixCommand: () => 'prefijo',
  resetPrefixCommand: () => 'resetprefijo',
  godModeCommand: () => 'mododios',
  resetCommand: () => 'reiniciar',
  addCommand: () => 'agregar',
  removeCommand: () => 'eliminar',
  everyGroupCommand: () => 'cadagrupo',
  banChatCommand: () => 'banchat',
  unbanChatCommand: () => 'desbanchat',
  restartCommand: () => 'reiniciar',
  shutdownBotCommand: () => 'apagarbot',
  updateBotCommand: () => 'actualizarbot',
  imageParam: () => 'imagen',
  pluginParam: () => 'plugin',
  linkParam: () => 'enlace',
  autoAdminParam: () => 'autoadmin',
  numMessagesParam: () => 'num. mensajes',
  commandParam: () => 'comando',
  groupParam: () => 'grupo',
  
  // Menú IA
  aiMenuTitle: () => '𝑴𝑬𝑵𝑼 𝑫𝑬 𝑰𝑨',
  generalCommands: () => '𝑪𝑶𝑴𝑨𝑵𝑫𝑶𝑺 𝑮𝑬𝑵𝑬𝑹𝑨𝑳𝑬𝑺',
  iaCommand: () => 'ia',
  alyaCommand: () => 'Alya',
  geminiCommand: () => 'gemini',
  chatgptCommand: () => 'chatgpt',
  deepseekCommand: () => 'deepseek',
  voiceCommand: () => 'voz',
  imageCommand: () => 'imagen',
  image2Command: () => 'imagen2',
  image3Command: () => 'imagen3',
  animalInfoCommand: () => 'infoanimal',
  kcalCommand: () => 'kcal',
  summaryCommand: () => 'resumen',
  recipeCommand: () => 'receta',
  
  // Menú Seguridad
  securityMenuTitle: () => '𝑴𝑬𝑵𝑼 𝑺𝑬𝑮𝑼𝑹𝑰𝑫𝑨𝑫',
  activateDisable: () => '𝐀𝐂𝐓𝐈𝐕𝐀𝐑/𝐃𝐄𝐒𝐀𝐂𝐓𝐈𝐕𝐀𝐑',
  howToUse: () => '𝐂𝐎𝐌𝐎 𝐒𝐄 𝐔𝐒𝐀',
  activateFunction: () => 'activar [función]',
  disableFunction: () => 'desactivar [función]',

// Plugin Ping/Status
systemStatusTitle: () => "⋆ ★ 🚀 𝑬𝑺𝑻𝑨𝑫𝑶 𝑫𝑬𝑳 𝑺𝑰𝑺𝑻𝑬𝑴𝑨 🚀 ★ ⋆",
uptime: () => "⌛ *Tiempo activo:*",
ping: () => "⚡ *Ping:*",
cpuLabel: () => "💻 *CPU:*",
cpuUsage: () => "🔋 *Uso:*",
ramLabel: () => "💾 *RAM:*",
freeRam: () => "🟢 *Libre:*",
version: () => "Versión:",

systemStatus: (params) => `${params?.title || '⋆ ★ 🚀 𝑬𝑺𝑻𝑨𝑫𝑶 𝑫𝑬𝑳 𝑺𝑰𝑺𝑻𝑬𝑴𝑨 🚀 ★ ⋆'}
╭♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩
୧ ⌛ *Tiempo activo:* ${params?.uptime || 'N/A'}
୧ ⚡ *Ping:* ${params?.ping || 'N/A'} ms
  💻 *CPU:* ${params?.cpuModel || 'Desconocido'}
  🔋 *Uso:* ${params?.cpuSpeed || 'N/A'} MHz
  💾 *RAM:* ${params?.ramUsed || 'N/A'} / ${params?.ramTotal || 'N/A'}
  🟢 *Libre:* ${params?.ramFree || 'N/A'}
╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩`,

menuFooter: () => "Elige un menú:",
menuAdmin: () => "🛡️ Menú Admin",
menuOwner: () => "👑 Menú Propietario",
menuSecurity: () => "🚨 Menú Seguridad",
menuGroup: () => "👥 Menú Grupo",
menuAI: () => "🤖 Menú IA",
mainMenuTitle: () => "𝑴𝑬𝑵𝑼 𝑫𝑬𝑳 𝑩𝑶𝑻",
staffCommand: () => "staff",
candidatesCommand: () => "candidatos",
installCommand: () => "instalar",
guideCommand: () => "guía",
channelsCommand: () => "canales",
systemCommand: () => "sistema",
faqCommand: () => "FAQ",
pingCommand: () => "ping",
reportCommand: () => "reportar",
suggestCommand: () => "sugerir",
newsCommand: () => "novedades",
versionLabel: () => "𝑽𝑬𝑹𝑺𝑰𝑶𝑵",

usersLabel: () => "𝐔𝐒𝐔𝐀𝐑𝐈𝐎𝐒",
chooseMenu: () => "Elige un menú:",
mainMenuButton: () => "🏠 Menú Principal",
ownerMenuButton: () => "👑 Menú Propietario",
securityMenuButton: () => "🚨 Menú Seguridad",
groupMenuButton: () => "👥 Menú Grupo",
aiMenuButton: () => "🤖 Menú IA",
adminMenuTitle: () => "𝑴𝑬𝑵𝑼 𝑨𝑫𝑴𝑰𝑵",
promoteCommand: () => "p /haceradmin",
demoteCommand: () => "r /quitaradmin",
warnCommands: () => "advertir / quitaradvertencia",
setScheduleCommand: () => "establecerhorario",
setNameCommand: () => "establecernombre",
hidetagCommand: () => "ocultaretiqueta",
tagallCommand: () => "etiquetartodos",
kickCommand: () => "expulsar / echare",
adminsCommand: () => "admins",
openCloseCommand: () => "abierto / cerrado",
setWelcomeCommand: () => "establecerbienvenida",
setByeCommand: () => "establecerdespedida",
inactiveCommand: () => "inactivos",
listNumCommand: () => "listanum + prefijo",
cleanupCommand: () => "limpiar + prefijo",
rulesCommand: () => "reglas / establecerreglas",
listWarnCommand: () => "listaadvertencias",
linkCommand: () => "enlace",
linkQrCommand: () => "enlaceqr",
requestsCommand: () => "solicitudes",
adminCommands: () => "𝑪𝑶𝑴𝑨𝑵𝑫𝑶𝑺 𝑨𝑫𝑴𝑰𝑵",
poweredBy: () => "ᴘᴏᴡᴇʀᴇᴅ ʙʏ",
candidatesTitle: () => "🚀 𝐔𝐍𝐄𝐓𝐄 𝐀𝐋 𝐒𝐓𝐀𝐅𝐅 𝐃𝐄 𝐂𝐇𝐀𝐓𝐔𝐍𝐈𝐓𝐘 🚀",
candidatesIntro: () => "¿Quieres unirte al staff de ChatUnity, ganar experiencia y ser reconocido como miembro del equipo?",
candidatesCall: () => "¡Esta es tu oportunidad! 𝐂𝐨𝐦𝐩𝐥𝐞𝐭𝐚 𝐞𝐥 𝐟𝐨𝐫𝐦𝐮𝐥𝐚𝐫𝐢𝐨 (𝐬𝐞𝐫á 𝐚𝐧ó𝐧𝐢𝐦𝐨) para postularte y mostrar tus habilidades.",
candidatesWhatAwaits: () => "🔥 𝐋𝐨 𝐪𝐮𝐞 𝐭𝐞 𝐞𝐬𝐩𝐞𝐫𝐚:",
candidatesBenefit1: () => "✨ 𝐑𝐞𝐜𝐨𝐧𝐨𝐜𝐢𝐦𝐢𝐞𝐧𝐭𝐨 𝐨𝐟𝐢𝐜𝐢𝐚𝐥 en el bot como colaborador oficial",
candidatesBenefit2: () => "💼 𝐄𝐱𝐩𝐞𝐫𝐢𝐞𝐧𝐜𝐢𝐚 𝐩𝐫á𝐜𝐭𝐢𝐜𝐚 en el mundo de los bots y la gestión de comunidades",
candidatesBenefit3: () => "🎯 𝐀𝐜𝐜𝐞𝐬𝐨 𝐞𝐱𝐜𝐥𝐮𝐬𝐢𝐯𝐨 a los Bot Beta y a las funcionalidades en primicia",
candidatesBenefit4: () => "🤝 𝐂𝐨𝐥𝐚𝐛𝐨𝐫𝐚𝐜𝐢ó𝐧 𝐝𝐢𝐫𝐞𝐜𝐭𝐚 con el equipo de desarrollo de ChatUnity",
candidatesCTA: () => "¡No pierdas esta oportunidad única! 𝐏𝐨𝐬𝐭ú𝐥𝐚𝐭𝐞 𝐚𝐡𝐨𝐫𝐚 𝐦𝐢𝐬𝐦𝐨 y demuestra que tienes lo necesario para marcar la diferencia!",
candidatesFormLabel: () => "📋 𝐅𝐨𝐫𝐦𝐮𝐥𝐚𝐫𝐢𝐨 𝐝𝐞 𝐩𝐨𝐬𝐭𝐮𝐥𝐚𝐜𝐢ó𝐧:",

installTitle: () => "⋆ ︵︵ ★ 💬 𝐂𝐇𝐀𝐓𝐔𝐍𝐈𝐓𝐘-𝐁𝐎𝐓 💬 ★ ︵︵ ⋆",
installIntro: () => "¿Quieres instalar ChatUnity Bot en tu dispositivo?",
installDescription: () => "Sigue la guía completa de instalación disponible en GitHub con todos los pasos detallados para Termux, Windows y otros sistemas operativos.",
installGuideLabel: () => "📖 𝐆𝐮í𝐚 𝐂𝐨𝐦𝐩𝐥𝐞𝐭𝐚",
installRepoLabel: () => "📂 𝐑𝐞𝐩𝐨𝐬𝐢𝐭𝐨𝐫𝐢𝐨 𝐆𝐢𝐭𝐇𝐮𝐛",
installVideoLabel: () => "🎥 𝐕𝐢𝐝𝐞𝐨 𝐓𝐮𝐭𝐨𝐫𝐢𝐚𝐥",
installFeatures: () => "✨ 𝐐𝐮é 𝐞𝐧𝐜𝐨𝐧𝐭𝐫𝐚𝐫á𝐬:",
installFeature1: () => "📱 Instalación completa para Termux",
installFeature2: () => "💻 Instalación para Windows y otros SO",
installFeature3: () => "🔧 Resolución de problemas comunes",
installFeature4: () => "📝 Comandos de configuración automática",
installCTA: () => "¡Visita el repositorio GitHub para comenzar la instalación y descubrir todas las funcionalidades del bot!",
installNeedHelp: () => "¿Necesitas ayuda? ¡Únete a nuestro canal de soporte!",

systemTitle: () => "⋆ ︵★ 🖥️ 𝐄𝐒𝐓𝐀𝐃𝐎 𝐃𝐄𝐋 𝐒𝐈𝐒𝐓𝐄𝐌𝐀 ★︵ ⋆",
systemHost: () => "🚩 *Host*",
systemOS: () => "🏆 *Sistema Operativo*",
systemArch: () => "💫 *Arquitectura*",
systemTotalRAM: () => "🥷 *RAM Total*",
systemFreeRAM: () => "🚀 *RAM Libre*",
systemUsedRAM: () => "⌛ *RAM Usada*",
systemUptime: () => "🕒 *Tiempo activo*",
systemNodeMemory: () => "🪴 *Memoria Node.js:*",
systemRSS: () => "RSS",
systemHeapTotal: () => "Heap Total",
systemHeapUsed: () => "Heap Usada",
systemExternal: () => "Externa",
systemArrayBuffer: () => "ArrayBuffer",
systemDiskSpace: () => "☁️ *Espacio en Disco:*",
systemDiskTotal: () => "Total",
systemDiskUsed: () => "Usado",
systemDiskAvailable: () => "Disponible",
systemDiskPercent: () => "Porcentaje de Uso",
systemDiskError: () => "❌ Error al recuperar el espacio en disco.",

reportNoText: () => "⚠️ Ingresa una descripción detallada del problema que quieres reportar.",
reportTooShort: () => "⚠️ La descripción es demasiado corta. Proporciona al menos 10 caracteres para un reporte completo.",
reportTooLong: () => "⚠️ La descripción supera el límite máximo de 1000 caracteres. Reduce el texto.",
reportTitle: () => "❌️ `R E P O R T E` ❌️",
reportNumber: () => "📱 Número",
reportUser: () => "👤 Usuario",
reportMessage: () => "📝 Mensaje",
reportQuote: () => "📎 Cita",
reportSuccess: () => "✅ Tu reporte ha sido enviado con éxito al equipo de desarrollo.\n\n_⚠️ Atención: reportes falsos o inapropiados pueden conllevar restricciones en el uso del bot._",
reportChannelTitle: () => "⚠️ REPORTE DE ERROR ⚠️",
reportChannelBody: () => "Nuevo reporte recibido",
reportAnonymous: () => "Anónimo",
suggestNoText: () => "⚠️ Ingresa tu propuesta de comando.\n\n*Ejemplo:* .sugerir (nombre comando) (descripción funcionalidad)",
suggestTooShort: () => "⚠️ La descripción es demasiado corta. Proporciona al menos 10 caracteres para una propuesta completa.",
suggestTooLong: () => "⚠️ La descripción supera el límite máximo de 1000 caracteres. Reduce el texto.",
suggestTitle: () => "💡 `P R O P U E S T A` 💡",
suggestNumber: () => "📱 Número",
suggestUser: () => "👤 Usuario",
suggestMessage: () => "📝 Propuesta",
suggestQuote: () => "📎 Cita",
suggestSuccess: () => "✅ Tu propuesta ha sido enviada con éxito al equipo de desarrollo.\n\n_⚠️ Atención: propuestas de comandos ilícitos o inapropiados pueden conllevar restricciones en el uso del bot._",
suggestChannelTitle: () => "💡 PROPUESTA DE COMANDO 💡",
suggestChannelBody: () => "Nueva propuesta recibida",
suggestAnonymous: () => "Anónimo",
unwarnNoUser: () => "❌ Debes mencionar a un usuario o responder a su mensaje para eliminar una advertencia.",
unwarnUserNotFound: () => "❌ Usuario no encontrado en la base de datos.",
unwarnNoWarnings: () => "ℹ️ Este usuario no tiene advertencias activas para eliminar.",
unwarnSuccess: (params) => `✅ 𝐀𝐝𝐯𝐞𝐫𝐭𝐞𝐧𝐜𝐢𝐚 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐝𝐚\n\n𝐀𝐝𝐯𝐞𝐫𝐭𝐞𝐧𝐜𝐢𝐚𝐬 𝐫𝐞𝐬𝐭𝐚𝐧𝐭𝐞𝐬: ${params?.remaining || 0}/3`,
setnameNoText: () => "⚠️ Ingresa el nuevo nombre que quieres asignar al grupo.",
setnameSuccess: () => "✅ ¡𝐍𝐨𝐦𝐛𝐫𝐞 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐨 𝐦𝐨𝐝𝐢𝐟𝐢𝐜𝐚𝐝𝐨 𝐜𝐨𝐧 é𝐱𝐢𝐭𝐨!",
setnameError: () => "❌ Se ha producido un error al modificar el nombre del grupo. Vuelve a intentarlo.",
hidetagDefaultMessage: () => "📢 Mensaje para todos",
hidetagStickerError: () => "❌ No se puede descargar el sticker. Vuelve a intentarlo.",
tagallTitle: () => "⋆ ︵︵ ★ 📢 𝐌𝐈𝐄𝐌𝐁𝐑𝐎𝐒 𝐃𝐄𝐋 𝐆𝐑𝐔𝐏𝐎 ★ ︵︵ ⋆",
tagallBot: () => "🤖 BOT",
tagallMessage: () => "📝 Mensaje",
tagallEmptyMessage: () => "📢 ¡Atención miembros del grupo!",
tagallMemberCount: (params) => `👥 Miembros totales: ${params?.count || 0}`,
adminsCooldown: (params) => `⏳ Debes esperar aún ${params?.time || 'un poco'} antes de poder llamar nuevamente a los administradores.\n\n_Este comando tiene un límite de uso para evitar abusos._`,
adminsTitle: () => "⋆︵★ 🔔 𝐀𝐃𝐌𝐈𝐍𝐈𝐒𝐓𝐑𝐀𝐃𝐎𝐑𝐄𝐒 ★︵⋆",
adminsMessage: () => "📝 Motivo de la llamada",
adminsWarning: () => "⚠️ Este comando debe utilizarse solo para problemas urgentes o situaciones importantes. El uso inapropiado puede conllevar la eliminación del grupo.",
adminsNoMessage: () => "Solicitud de asistencia",
adminsNotification: () => "🔔 Se ha notificado a los administradores",
adminsExternalTitle: (params) => `${params?.groupName || 'Grupo'}`,
adminsExternalBody: () => "Llamando a los administradores...",
groupOpen: () => "✅ 𝐂𝐡𝐚𝐭 𝐚𝐛𝐢𝐞𝐫𝐭𝐚 𝐩𝐚𝐫𝐚 𝐭𝐨𝐝𝐨𝐬\n\n୧ Todos los miembros pueden ahora enviar mensajes en el grupo.",
groupClose: () => "🔒 𝐂𝐡𝐚𝐭 𝐬𝐨𝐥𝐨 𝐩𝐚𝐫𝐚 𝐚𝐝𝐦𝐢𝐧𝐬\n\n୧ Solo los administradores pueden enviar mensajes en el grupo.",
setwelcomeNoText: () => "⚠️ Ingresa el mensaje de bienvenida personalizado que deseas configurar.\n\n*Variables disponibles:*\n୧ @user - Menciona al usuario\n୧ @group - Nombre del grupo\n୧ @desc - Descripción del grupo",
setwelcomeSuccess: () => "✅ 𝐌𝐞𝐧𝐬𝐚𝐣𝐞 𝐝𝐞 𝐛𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐚 𝐜𝐨𝐧𝐟𝐢𝐠𝐮𝐫𝐚𝐝𝐨\n\n୧ El mensaje de bienvenida se ha establecido con éxito para este grupo.",
setbyeNoText: () => "⚠️ Ingresa el mensaje de despedida personalizado que deseas configurar.\n\n*Variables disponibles:*\n୧ @user - Menciona al usuario\n୧ @group - Nombre del grupo",
setbyeSuccess: () => "✅ 𝐌𝐞𝐧𝐬𝐚𝐣𝐞 𝐝𝐞 𝐝𝐞𝐬𝐩𝐞𝐝𝐢𝐝𝐚 𝐜𝐨𝐧𝐟𝐢𝐠𝐮𝐫𝐚𝐝𝐨\n\n୧ El mensaje de despedida se ha establecido con éxito para este grupo.",
inactiveMenuTitle: () => "🌙 Gestión de Miembros Inactivos",
inactiveMenuFound: (params) => `💤 Miembros inactivos encontrados: *${params?.inactive || 0}/${params?.total || 0}*\n\n⏰ Inactivos desde hace más de 7 días\n\nSelecciona una opción a continuación:`,
inactiveListTitle: () => "📋 Lista de Miembros Inactivos",
inactiveListNone: () => "✅ ¡No se han encontrado miembros inactivos!\n\n🎉 Todos los miembros están activos en el grupo.",
inactiveListItem: (params) => `${params?.index}. @${params?.user}`,
inactiveRemoveStart: (params) => `⚠️ Eliminación de inactivos: estás a punto de eliminar *${params?.count}* miembros.\n\n❗ ¡Esta acción no se puede deshacer!\n\n¿Confirmas que quieres continuar?`,
inactiveRemoveSuccess: (params) => `✅ ¡Eliminación completada!\n\n🗑️ Miembros eliminados: *${params?.removed}*${params?.errors ? `\n⚠️ Errores: *${params.errors}* miembros no eliminados` : ''}`,
inactiveRemoveNone: () => "✅ ¡No hay miembros para eliminar! Todos los miembros del grupo están activos.",
inactiveConfirmTitle: () => "⚠️ Confirmar Eliminación",
inactiveBackButton: () => "🔄 Volver al Menú",
inactiveListButton: () => "📋 Ver Lista",
inactiveRemoveButton: () => "🗑️ Eliminar Inactivos",
inactiveConfirmButton: () => "✅ Confirmar Eliminación",
inactiveCancelButton: () => "❌ Cancelar",
inactiveNotAdmin: () => "❌ Solo los *admin* pueden usar esta función.",
inactiveUnknown: () => "❌ Opción no válida. Usa los botones.",
inactiveResultTitle: () => "📊 Resultado eliminación inactivos",
inactiveGroupLabel: () => "👥 Grupo",
inactiveFooter: () => "Gestión grupo inactivos",
noBotAdmin: () => "⚠️ Debo ser admin para eliminar usuarios",
  noMention: () => "⚠️ Menciona o responde al mensaje de la persona a eliminar",
  cannotRemoveOwner: () => "⚠️ No puedes eliminar al creador del bot",
  cannotRemoveBot: () => "⚠️ No puedes eliminar el bot mismo",
  cannotRemoveSelf: () => "⚠️ No puedes eliminarte a ti mismo",
  targetIsGroupOwner: () => "⚠️ No puedes eliminar al creador del grupo",
  targetIsAdmin: () => "⚠️ No puedes eliminar un admin del grupo",
  kickSuccess: (params) => `╭─────────────────\n│ ✦ @${params?.target} ha sido eliminado\n│ ✦ por @${params?.executor}${params?.reason ? `\n│\n│ 📝 Motivo: ${params.reason}` : ''}\n╰─────────────────`,
  title: () => "⚠️ Usuarios Advertidos",
totalUsers: (params) => `Total: ${params?.count || 0} usuarios`,
userEntry: (params) => `${params?.index}. ${params?.name || 'Desconocido'} (${params?.warns}/3)`,
noWarns: () => "✓ Ningún usuario ha recibido advertencias",
unknownUser: () => "Desconocido",
noBotAdmin: () => "⚠️ Debo ser admin para recuperar el enlace del grupo",
qrCaption: (params) => `╭─────────────────\n│ 🔗 Código QR del grupo\n│ *${params?.groupName}*\n│\n│ Escanea para unirte\n╰─────────────────`,
qrError: () => "❌ Error durante la generación del código QR",
noBotAdmin: () => "⚠️ Debo ser admin para gestionar las solicitudes",
noAdmin: () => "⚠️ Solo los admin del grupo pueden usar este comando",
noPending: () => "✓ No hay solicitudes pendientes",
pendingCount: (params) => `╭─────────────────\n│ 📨 Solicitudes pendientes: ${params?.count}\n│\n│ Selecciona una opción\n╰─────────────────`,
menuFooter: () => "Gestión solicitudes grupo",
buttonAcceptAll: () => "✅ Aceptar todas",
buttonRejectAll: () => "❌ Rechazar todas",
buttonAccept39: () => "🇮🇹 Aceptar +39",
buttonManage: () => "📥 Gestionar solicitudes",
acceptedSuccess: (params) => `✅ Aceptadas ${params?.count} solicitudes`,
rejectedSuccess: (params) => `❌ Rechazadas ${params?.count} solicitudes`,
no39Found: () => "⚠️ No se encontraron solicitudes con prefijo +39",
accepted39Success: (params) => `✅ Aceptadas ${params?.count} solicitudes con prefijo +39`,
errorAccepting: () => "❌ Error durante la aceptación de solicitudes",
errorRejecting: () => "❌ Error durante el rechazo de solicitudes",
invalidNumber: () => "⚠️ Número no válido. Usa un número mayor que 0",
invalidInput: () => "⚠️ Entrada no válida. Envía un número o '39'",
manageCustom: (params) => `╭─────────────────\n│ 📥 Gestión personalizada\n│\n│ ¿Cuántas solicitudes quieres aceptar?\n│\n│ ✦ Usa: .${params?.command} aceptar <número>\n│ ✦ Ejemplo: .${params?.command} aceptar 7\n╰─────────────────`,
manageFooter: () => "Gestión personalizada solicitudes",
notAvailable: () => "⚠️ Este comando solo está disponible con la base de ChatUnity",
imageNotFound: () => "⚠️ Error durante la carga de imágenes",
mainTitle: () => "🌐 Nuestras Redes Sociales",
mainSubtitle: () => "Síguenos en todas partes para mantenerte actualizado",
mainFooter: () => "Powered by ChatUnity",
instagramTitle: () => "📸 Instagram",
instagramBody: () => "¡Síguenos en Instagram para fotos y stories diarias!",
instagramButton: () => "Abrir Instagram",
tiktokTitle: () => "🎵 TikTok",
tiktokBody: () => "¡Contenidos creativos y divertidos en TikTok!",
tiktokButton: () => "Abrir TikTok",
youtubeTitle: () => "🎬 YouTube",
youtubeBody: () => "¡Videos, tutoriales y directos en nuestro canal de YouTube!",
youtubeButton: () => "Abrir YouTube",
discordTitle: () => "💬 Discord",
discordBody: () => "¡Únete a nuestra comunidad en Discord!",
discordButton: () => "Abrir Discord",
telegramTitle: () => "✈️ Telegram",
telegramBody: () => "¡Noticias y actualizaciones en el canal de Telegram!",
telegramButton: () => "Abrir Telegram",
whatsappTitle: () => "💚 Canal WhatsApp",
whatsappBody: () => "¡Mantente actualizado en nuestro canal oficial de WhatsApp!",
whatsappButton: () => "Abrir Canal",
cardFooter: () => "ChatUnity Social",
followUpMessage: () => "👆 Desliza las cards para ver todos nuestros canales sociales!\n\n✦ Síguenos para mantenerte actualizado",
followUpFooter: () => "ChatUnity Team",
menuButton: () => "📋 Volver al Menú",
errorLoading: () => "⚠️ Error durante la carga de los social",


   linkTitle: () => "🔗 ENLACE DEL GRUPO",
   linkFooter: () => "Copia el enlace y compártelo",
    copyButton: () => "📋 Copiar Enlace",


  
  pingTitle: () => "⚡ ¡PONG!",
  pingResponse: (params) => `⚡ *Ping:* ${params?.ping || 'N/A'} ms`,
  socialNotAvailable: () => "⚠️ El comando no está disponible en este momento. Vuelve a intentarlo más tarde.",
socialInstagramTitle: () => "📸 Instagram",
socialInstagramBody: () => "¡Síguenos en Instagram para contenidos exclusivos, actualizaciones y novedades del bot!",
socialInstagramButton: () => "Seguir en Instagram",
socialTiktokTitle: () => "🎵 TikTok",
socialTiktokBody: () => "¡Descubre nuestros videos en TikTok y mantente actualizado con los contenidos más virales!",
socialTiktokButton: () => "Seguir en TikTok",
socialYoutubeTitle: () => "📺 YouTube",
socialYoutubeBody: () => "¡Suscríbete a nuestro canal de YouTube para tutoriales, guías y actualizaciones en video!",
socialYoutubeButton: () => "Suscribirse en YouTube",
socialDiscordTitle: () => "💬 Discord",
socialDiscordBody: () => "¡Únete a nuestra comunidad Discord para soporte, chat y mucho más!",
socialDiscordButton: () => "Entrar a Discord",
socialTelegramTitle: () => "✈️ Telegram",
socialTelegramBody: () => "¡Síguenos en Telegram para noticias instantáneas y comunicaciones directas!",
socialTelegramButton: () => "Seguir en Telegram",
socialWhatsappTitle: () => "💚 WhatsApp",
socialWhatsappBody: () => "¡Suscríbete a nuestro canal de WhatsApp para recibir actualizaciones oficiales!",
socialWhatsappButton: () => "Seguir en WhatsApp",
socialCardFooter: () => "ChatUnity Social",
socialMainTitle: () => "⋆ ︵︵ ★ 🌐 𝐑𝐄𝐃𝐄𝐒 𝐒𝐎𝐂𝐈𝐀𝐋𝐄𝐒 ★ ︵︵ ⋆",
socialMainSubtitle: () => "Síguenos en nuestros canales oficiales",
socialMainFooter: () => "Mantente conectado con ChatUnity",
socialFollowUpMessage: () => "✨ ¡Gracias por tu interés!\n\n୧ Síguenos en todos nuestros canales sociales para no perderte ninguna actualización.",
socialFollowUpFooter: () => "ChatUnity - Siempre conectados",
socialMenuButton: () => "🏠 Menú Principal",
socialErrorLoading: () => "❌ Se ha producido un error durante la carga de los social. Vuelve a intentarlo más tarde.",
listawarnTitle: () => "꒷꒦ ✦ Lista Usuarios Advertidos ✦ ꒷꒦",
listawarnMode: () => "Modo",
listawarnGroup: () => "Grupo",
listawarnTotal: ({ count }) => `Total: ${count} ${count === 1 ? 'usuario advertido' : 'usuarios advertidos'}`,
listawarnNoWarns: () => "✨ Ningún usuario advertido",
listawarnUnknownUser: () => "Usuario Desconocido",
listawarnUserNumber: ({ index }) => `${index}.`,
listawarnTag: () => "Etiqueta:",
listawarnGroups: () => "Grupo/s:",
listawarnNoActiveWarns: () => "Ninguna advertencia activa",
listawarnErrorRetrieving: () => "Error en la recuperación",
listawarnTotalWarns: ({ count }) => `${count} totales`,
listawarnOwnerOnly: () => "❌ Este comando puede ser usado en privado solo por los propietarios.",
listawarnAllUsers: () => "Todos los usuarios",
kickNoBotAdmin: () => "❌ El bot debe ser administrador para eliminar usuarios.",
kickNoMention: () => "⚠️ Menciona o cita al usuario a eliminar del grupo.",
kickCannotRemoveOwner: () => "🛡️ No puedes eliminar al creador del bot.",
kickCannotRemoveBot: () => "🤖 No puedes eliminar el bot del grupo.",
kickCannotRemoveSelf: () => "😅 No puedes eliminarte a ti mismo con este comando.",
kickTargetIsGroupOwner: () => "👑 El usuario que has intentado eliminar es el creador del grupo.",
kickTargetIsAdmin: () => "🛡️ El usuario que has intentado eliminar es administrador.",
kickSuccess: ({ target, executor, reason }) => `꒷꒦ ✦ Usuario Eliminado ✦ ꒷꒦\n\n┊ 『 👤 』 Usuario: @${target}\n┊ 『 ⚖️ 』 Eliminado por: @${executor}${reason ? `\n┊ 『 📝 』 Motivo: ${reason}` : ''}\n\n╰★────★────★`,
linkgroupNoBotAdmin: () => "❌ El bot debe ser administrador para obtener el enlace del grupo.",
linkgroupLinkTitle: ({ groupName }) => `꒷꒦ ✦ Enlace del Grupo ✦ ꒷꒦\n\n┊ 『 📱 』 Grupo: ${groupName}\n┊ 『 🔗 』 Haz clic en el botón para copiar el enlace`,
linkgroupLinkFooter: () => "Powered by ChatUnity Bot",
linkgroupCopyButton: () => "📋 Copiar Enlace",
joinNoLink: ({ prefix, command }) => `⚠️ Ingresa el enlace del grupo.\n\n┊ 『 💡 』 Ejemplo: ${prefix}${command} <enlace> <días | inf>`,
joinInvalidLink: () => "❌ Enlace del grupo no válido.",
joinSuccessInfinite: () => "꒷꒦ ✦ Ingreso Grupo ✦ ꒷꒦\n\n┊ 『 ✅ 』 Me he unido correctamente al grupo\n┊ 『 ⏰ 』 Permanencia: Ilimitada\n\n╰★────★────★",
joinSuccessExpired: ({ days }) => `꒷꒦ ✦ Ingreso Grupo ✦ ꒷꒦\n\n┊ 『 ✅ 』 Me he unido correctamente al grupo\n┊ 『 ⏰ 』 Permanencia: ${days} días\n\n╰★────★────★`,
banuserNoTarget: () => "⚠️ Por favor etiqueta un usuario, responde a un mensaje o escribe el número de teléfono.\n\n┊ 『 💡 』 Ejemplo: @3934xxxxxxx",
banuserInvalidNumber: () => "❌ Número de teléfono no válido.",
banuserSuccess: ({ target }) => `꒷꒦ ✦ Usuario Bloqueado ✦ ꒷꒦\n\n┊ 『 🚫 』 Usuario: @${target}\n┊ 『 ⚠️ 』 Este usuario ha sido bloqueado del bot\n┊ 『 📵 』 Ya no podrá utilizar los comandos\n\n╰★────★────★`,
unbanuserNoTarget: () => "⚠️ Etiqueta un usuario, responde a un mensaje o escribe el número de teléfono.\n\n┊ 『 💡 』 Ejemplo: @3934xxxxxxx",
unbanuserInvalidNumber: () => "❌ Número de teléfono no válido.",
unbanuserSuccess: ({ target }) => `꒷꒦ ✦ Usuario Desbloqueado ✦ ꒷꒦\n\n┊ 『 ✅ 』 Usuario: @${target}\n┊ 『 🎉 』 Este usuario ha sido desbloqueado\n┊ 『 📱 』 Ahora puede utilizar los comandos del bot\n\n╰★────★────★`,
listanumNoPrefix: () => "⚠️ Ingresa el prefijo telefónico a buscar.\n\n┊ 『 💡 』 Ejemplo: .listanum 39",
listanumInvalidPrefix: () => "❌ El prefijo debe ser un número válido.",
listanumTitle: ({ prefix }) => `꒷꒦ ✦ Lista Números +${prefix} ✦ ꒷꒦`,
listanumNoUsers: ({ prefix }) => `꒷꒦ ✦ Ningún Usuario ✦ ꒷꒦\n\n┊ 『 ℹ️ 』 No se encontraron usuarios con prefijo +${prefix}\n\n╰★────★────★`,
puliziaStart: ({ prefix }) => `꒷꒦ ✦ Limpieza Iniciada ✦ ꒷꒦\n\n┊ 『 🔄 』 Eliminando usuarios con prefijo +${prefix}\n┊ 『 ⏳ 』 Espera a que se complete...\n\n╰★────★────★`,
puliziaNoBotAdmin: () => "❌ El bot debe ser administrador para eliminar usuarios.",
puliziaNoRestrict: () => "❌ El modo restrictivo no está habilitado.",
puliziaUserLeft: ({ user }) => `@${user} ha sido eliminado`,
getNoInput: () => "⚠️ Uso incorrecto del comando.\n\n╰★─ Ejemplos Individuales ─★╮\n┊ getplugin menu-grupo script\n┊ getfile config.js file\n\n╰★─ Ejemplos Múltiples ─★╮\n┊ getplugin admin & menu & config\n┊ getplugin admin & menu & config script\n┊ getplugin admin script & menu file\n┊ (máximo 3 plugins simultáneamente)\n\n╰♡꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷",
getNoPluginFound: () => "❌ No se encontró ningún plugin válido en la solicitud múltiple.",
getMultiSelect: ({ pluginList }) => `꒷꒦ ✦ Plugins Seleccionados ✦ ꒷꒦\n\n${pluginList}\n\n┊ 『 ❓ 』¿Cómo quieres recibir todos los plugins?\n\n╰★────★────★`,
getMultiScriptBtn: () => "📄 Todos Script",
getMultiFileBtn: () => "📎 Todos Archivos",
getMultiResult: ({ successCount, total, results }) => `꒷꒦ ✦ Solicitud Múltiple ✦ ꒷꒦\n\n┊ 『 📦 』 ${successCount}/${total} plugins encontrados\n\n${results}\n\n╰★────★────★`,
getFileSelect: ({ filename }) => `꒷꒦ ✦ Archivo Seleccionado ✦ ꒷꒦\n\n┊ 『 📁 』 ${filename}\n\n┊ 『 ❓ 』 ¿Qué quieres hacer?\n\n╰★────★────★`,
getScriptBtn: () => "📄 Script",
getFileBtn: () => "📎 Archivo",
getNoSimilar: ({ type, name }) => `❌ No se encontró ${type} similar a "${name}".`,
getFoundConfirm: ({ filename, score }) => `꒷꒦ ✦ Encontrado ✦ ꒷꒦\n\n┊ 『 ✨ 』 "${filename}"\n┊ 『 📊 』 Precisión: ${score}%\n\n┊ 『 ❓ 』 ¿Confirmas?\n\n╰♡꒷ ๑ Responde: si/no`,
getMultiChoice: ({ name, options }) => `꒷꒦ ✦ Resultados para "${name}" ✦ ꒷꒦\n\n${options}\n\n┊ 『 📝 』 Elige el número o "no" para cancelar\n\n╰★────★────★`,
getDirNotFound: ({ dir }) => `❌ Directorio ${dir} no encontrado.`,
getFileSuccess: ({ prefix, filename, type }) => `${prefix}꒷꒦ ✦ Éxito ✦ ꒷꒦\n\n┊ 『 ✅ 』 Aquí está el ${type}: ${filename}\n\n╰★────★────★`,
getScriptSuccess: ({ prefix, filename, content }) => `${prefix}꒷꒦ ✦ Código de ${filename} ✦ ꒷꒦\n\n${content}\n\n╰★────★────★`,
getInvalidOption: () => "❌ ¡Opción no válida! Usa \"file\" o \"script\".",
getScriptOnlyJS: () => "❌ La opción script solo está disponible para archivos JavaScript.",
getSyntaxError: ({ prefix, filename, error }) => `${prefix}꒷꒦ ✦ Error Sintaxis ✦ ꒷꒦\n\n┊ 『 ⛔️ 』 Archivo: ${filename}\n\n${error}\n\n╰★────★────★`,
getFileError: ({ prefix, filename, error }) => `${prefix}❌ Error: El archivo ${filename} no existe o no puede leerse.\n\n${error}`,
getProcessError: ({ filename, error }) => `❌ Error al procesar ${filename}: ${error}`,
getOperationCancelled: () => "꒷꒦ ✦ Operación Cancelada ✦ ꒷꒦\n\n┊ 『 ❌ 』 Solicitud cancelada con éxito\n\n╰★────★────★",
getGenericError: ({ error }) => `❌ 𝐄𝐫𝐫𝐨𝐫: ${error}`,
leaveNotAdmin: () => "⚠️ Este comando solo puede ser usado por admin y propietarios del grupo.",
leaveMessage: () => "꒷꒦ ✦ Adiós ✦ ꒷꒦\n\n┊ 『 👋 』 El bot está abandonando el grupo\n\n╰★────★────★",
leaveError: () => "❌ Se ha producido un error durante la salida del grupo.",
saveNoName: () => "⚠️ Especifica el nombre del plugin a guardar.",
saveNoQuoted: () => "⚠️ Es necesario responder al mensaje que contiene el código del plugin.",
saveSaveSuccess: ({ path }) => `꒷꒦ ✦ Plugin Guardado ✦ ꒷꒦\n\n┊ 『 ✅ 』 Archivo creado con éxito\n┊ 『 📁 』 Ruta: ${path}\n\n╰★────★────★`,
saveErrorWrite: ({ error }) => `❌ Error durante el guardado del plugin.\n\n${error}`,
deleteNoPlugins: () => "⚠️ No hay plugins disponibles para eliminar.",
deleteHelp: ({ usedPrefix, pluginList, total }) => `꒷꒦ ✦ Delete Plugin Manager ✦ ꒷꒦\n\n┊ 『 📌 』 Uso del comando:\n┊ ${usedPrefix}deleteplugin <nombre>\n\n┊ 『 ✨ 』 Ejemplo:\n┊ ${usedPrefix}deleteplugin menu-official\n\n┊ 『 📋 』 Plugins disponibles:\n${pluginList}${total > 15 ? `\n┊ ... y otros ${total - 15} plugins` : ''}\n\n╰★────★────★`,
deleteInvalidNumber: ({ max }) => `❌ ¡Número no válido! Rango: 1-${max}`,
deleteNoSimilar: ({ input }) => `❌ No se encontró plugin similar a "${input}".`,
deleteConfirm: ({ filename, score }) => `꒷꒦ ✦ Plugin Encontrado ✦ ꒷꒦\n\n┊ 『 ✨ 』 "${filename}"\n┊ 『 📊 』 Coincidencia: ${score}%\n\n┊ 『 🗑️ 』 ¿Quieres eliminarlo?\n\n╰♡꒷ ๑ Responde: si/no`,
deleteMultiChoice: ({ input, options }) => `꒷꒦ ✦ Resultados para "${input}" ✦ ꒷꒦\n\n${options}\n\n┊ 『 📝 』 Elige el número o "no" para cancelar\n\n╰★────★────★`,
deleteNotFound: ({ path }) => `꒷꒦ ✦ Atención ✦ ꒷꒦\n\n┊ 『 📁 』 Archivo no encontrado en el sistema\n\n┊ 『 🔍 』 Ruta buscada:\n┊ ${path}\n\n╰★────★────★`,
deleteSuccess: ({ pluginName, sender, time }) => `꒷꒦ ✦ Plugin Eliminado ✦ ꒷꒦\n\n┊ 『 🗑️ 』 Plugin eliminado con éxito\n\n┊ 『 📝 』 Nombre: ${pluginName}.js\n┊ 『 👤 』 Eliminado por: @${sender}\n┊ 『 🕐 』 Hora: ${time}\n\n┊ 『 ⚠️ 』 Nota: El bot podría requerir\n┊ un reinicio para aplicar los cambios\n\n╰★────★────★\n\n🎯 ¡Operación completada!`,
deleteError: ({ error }) => `꒷꒦ ✦ Error Sistema ✦ ꒷꒦\n\n┊ 『 ❌ 』 No se puede eliminar el plugin\n\n┊ 『 🔍 』 Detalles error:\n┊ ${error}\n\n┊ 『 💡 』 Posibles soluciones:\n┊ -  Comprueba los permisos del archivo\n┊ -  Verifica que el plugin no esté en uso\n┊ -  Vuelve a intentarlo en unos segundos\n\n╰★────★────★`,
deleteOperationCancelled: () => "꒷꒦ ✦ Operación Cancelada ✦ ꒷꒦\n\n┊ 『 ❌ 』 Eliminación cancelada\n\n╰★────★────★",
deleteGenericError: ({ error }) => `❌ Error: ${error}`,
broadcastNoOwner: () => "❌ ¡Solo el propietario puede usar este comando!",
broadcastNoGroups: () => "❌ ¡El bot no está en ningún grupo!",
broadcastHeader: () => "꒷꒦ ✦ Mensaje de ChatUnity ✦ ꒷꒦",
broadcastIntro: () => "┊ 『 👑 』 Queridos miembros del grupo, ha llegado un nuevo mensaje por parte del propietario:",
broadcastLabel: () => "┊ 『 📝 』 Mensaje:",
broadcastNote: () => "┊ 『 ⚠️ 』 Este mensaje ha sido enviado a todos los miembros del grupo",
broadcastFooter: () => "╰★────★────★\n\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ChatUnity",
broadcastSuccess: ({ count }) => `꒷꒦ ✦ Broadcast Completado ✦ ꒷꒦\n\n┊ 『 ✅ 』 Mensaje enviado con éxito\n┊ 『 📊 』 Grupos alcanzados: ${count}\n┊ 『 👥 』 Todos los miembros han sido mencionados\n\n╰★────★────★`,
broadcastDefaultMessage: () => "Este es un mensaje predeterminado enviado a todos los grupos.",
broadcastError: ({ group, error }) => `❌ Error en el envío del mensaje al grupo ${group}: ${error}`,
banChatSuccess: () => "꒷꒦ ✦ Chat Bloqueada ✦ ꒷꒦\n\n┊ 『 🚫 』 Chat bloqueada con éxito\n┊ 『 ⚠️ 』 El bot ya no responderá en esta chat\n\n╰★────★────★",
unbanChatSuccess: () => "꒷꒦ ✦ Chat Desbloqueada ✦ ꒷꒦\n\n┊ 『 ✅ 』 Chat desbloqueada con éxito\n┊ 『 🎉 』 El bot puede volver a responder en esta chat\n\n╰★────★────★",
restartInitiating: () => "꒷꒦ ✦ Reinicio en curso ✦ ꒷꒦\n\n┊ 『 ⏳ 』 Espere por favor...\n\n╰★────★────★",
restartProgress: () => "🚀🚀🚀🚀🚀🚀",
restartSuccess: () => "꒷꒦ ✦ Reinicio Completado ✦ ꒷꒦\n\n┊ 『 ✅ 』 Bot reiniciado con éxito\n┊ 『 🎉 』 Sistema operativo\n\n╰★────★────★",
restartError: ({ error }) => `꒷꒦ ✦ Error Reinicio ✦ ꒷꒦\n\n┊ 『 ❌ 』 No se puede reiniciar el bot\n┊ 『 🔍 』 Error: ${error}\n\n╰★────★────★`,
shutdownInitiating: () => "꒷꒦ ✦ Apagado Bot ✦ ꒷꒦\n\n┊ 『 🔌 』 Estoy apagando el bot...\n┊ 『 🚫 』 Todas las chats han sido bloqueadas\n┊ 『 ⏳ 』 Espere el cierre\n\n╰★────★────★",
shutdownSuccess: () => "꒷꒦ ✦ Bot Apagado ✦ ꒷꒦\n\n┊ 『 ✅ 』 Apagado completado\n┊ 『 💤 』 Bot offline\n\n╰★────★────★",
shutdownChatsBanned: ({ count }) => `┊ 『 📊 』 ${count} chats bloqueadas`,
shutdownError: ({ error }) => `꒷꒦ ✦ Error Apagado ✦ ꒷꒦\n\n┊ 『 ❌ 』 No se puede apagar el bot\n┊ 『 🔍 』 Error: ${error}\n\n╰★────★────★`,
updateInitiating: () => "꒷꒦ ✦ Actualización Bot ✦ ꒷꒦\n\n┊ 『 🔄 』 Comprobando actualizaciones...\n┊ 『 ⏳ 』 Espere por favor\n\n╰★────★────★",
updateSuccess: ({ output }) => `꒷꒦ ✦ Actualización Completada ✦ ꒷꒦\n\n┊ 『 ✅ 』 Bot actualizado con éxito\n\n┊ 『 📋 』 Detalles:\n${output}\n\n╰★────★────★`,
updateError: ({ error }) => `꒷꒦ ✦ Error Actualización ✦ ꒷꒦\n\n┊ 『 ❌ 』 No se puede actualizar el bot\n┊ 『 🔍 』 Error: ${error}\n\n┊ 『 💡 』 Posibles soluciones:\n┊ -  Verifica la conexión a internet\n┊ -  Comprueba los permisos Git\n┊ -  Asegúrate de estar en una rama válida\n\n╰★────★────★`,
updateNoChanges: () => "꒷꒦ ✦ Ya Actualizado ✦ ꒷꒦\n\n┊ 『 ℹ️ 』 El bot ya está en la última versión\n┊ 『 ✅ 』 No hay actualizaciones disponibles\n\n╰★────★────★",
groupMenuTitle: () => "𝑴𝑬𝑵𝑼 𝑮𝑹𝑼𝑷𝑶",
chooseMenu: () => "Elige una categoría del menú:",
mainMenuButton: () => "🏠 Menú Principal",
adminMenuButton: () => "🛡️ Menú Admin",
ownerMenuButton: () => "👑 Menú Propietario",
securityMenuButton: () => "🚨 Menú Seguridad",
aiMenuButton: () => "🤖 Menú IA",
musicAudioSection: () => "MÚSICA & AUDIO",
infoUtilitySection: () => "INFORMACIÓN & UTILIDADES",
imageEditSection: () => "IMÁGENES & EDICIÓN",
pokemonSection: () => "POKEMON",
gamesCasinoSection: () => "JUEGOS & CASINO",
economyRankingSection: () => "ECONOMÍA & CLASIFICACIONES",
socialInteractionSection: () => "INTERACCIONES SOCIALES",
howMuchSection: () => "¿CUÁNTO ES?",
personalityTestSection: () => "TEST DE PERSONALIDAD",
memberCommands: () => "𝑪𝑶𝑴𝑨𝑵𝑫𝑶𝑺 𝑷𝑨𝑹𝑨 𝑳𝑶𝑺 𝑴𝑰𝑬𝑴𝑩𝑹𝑶𝑺",
versionLabel: () => "𝑽𝑬𝑹𝑺𝑰𝑶𝑵",
collabLabel: () => "𝑪𝑶𝑳𝑨𝑩𝑶𝑹𝑨𝑪𝑰Ó𝑵",
songCommand: () => "canción",
audioCommand: () => "audio",
videoCommand: () => "video",
cityCommand: () => "ciudad",
textCommand: () => "texto",
groupCommand: () => "grupo",
userCommand: () => "usuario",
checkSiteCommand: () => "verificar sitio",
photoToStickerCommand: () => "foto a sticker",
stickerToPhotoCommand: () => "sticker a foto",
improveQualityCommand: () => "mejorar calidad foto",
photoCommand: () => "foto",
hiddenPhotoCommand: () => "foto oculta",
memeCommand: () => "meme",
fromStickerCommand: () => "desde sticker",
blurImageCommand: () => "desenfocar imagen",
comingSoonCommand: () => "próximamente",
quantityCommand: () => "cantidad",
headsOrTailsCommand: () => "cara o cruz",
mathProblemCommand: () => "problema mate",
rockPaperScissorsCommand: () => "piedra papel tijeras",
pokemonInfoCommand: () => "info Pokémon",
balanceCommand: () => "saldo",
topUsersCommand: () => "top usuarios",
withdrawUCCommand: () => "UC del banco",
earnXPCommand: () => "ganar XP",
endRelationshipCommand: () => "fin relación",
affinityCommand: () => "afinidad",
charmCommand: () => "encanto",
createFightCommand: () => "crear peleas",
truthOrDareCommand: () => "verdad o reto",
playNoText: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n ❗ Ingresa un título o enlace\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
playNoResults: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n ❗ No se encontraron resultados\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
playAudioLoading: () => "┊ ┊ ┊ ┊‿ ˚➶ ｡˚\n┊ ┊ ┊ ┊. ➶ ˚\n┊ ┊ ┊ ˚✧ 🎵 Audio en camino\n┊ ˚➶ ｡˚ ☁︎ Espera unos instantes...",
playVideoLoading: () => "┊ ┊ ┊ ┊‿ ˚➶ ｡˚\n┊ ┊ ┊ ┊. ➶ ˚\n┊ ┊ ┊ ˚✧ 🎬 Video en camino\n┊ ˚➶ ｡˚ ☁︎ Espera unos instantes...",
playDownloadComplete: () => "✅ ¡Descarga completada!",
playTooLong: ({ maxMinutes, duration }) => `╭★────★────★\n|ㅤㅤㅤㅤㅤㅤㅤ꒰¡VIDEO DEMASIADO LARGO!꒱\n|˚₊꒷ ⏳ ꒱ ฅ﹕Máximo: ${maxMinutes} minutos ₊˚๑\n|˚₊꒷ ⌛ ꒱ ฅ﹕Duración: ${duration} ₊˚๑\n╰★────★────★`,
playVideoInfo: ({ title, timestamp, views, author, ago, url }) => `⋆ ︵︵ ★ 🎥 INFO VIDEO 🎥 ★ ︵︵ ⋆\n\n\n꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧\n୧ ✍️ *Título:* ${title}\n୧ ⏳ *Duración:* ${timestamp}\n୧ 👀 *Visualizaciones:* ${views}\n୧ 🔰 *Canal:* ${author}\n୧ 🔳 *Publicado:* ${ago}\n୧ 🔗 *Enlace:* ${url}\n꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧\n\n\n╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩\n  > Elige un formato para descargar\n╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩`,
playChooseFormat: () => "Elige un formato:",
playAudioButton: () => "🎵 Audio",
playVideoButton: () => "🎬 Video",
playSaveButton: () => "💾 Guardar Playlist",
playError: ({ error }) => `꒰🩸꒱ ◦- ≫ ERROR\n ★・・・・・・・★\n  ${error}\n ★・・・・・・・★`,
playNoValidLink: () => "꒰🩸꒱ ◦- ≫ ERROR\n ★・・・・・・・★\n  No se encontró enlace válido\n ★・・・・・・・★",
playlistEmpty: ({ userName }) => `ℹ️ ${userName ? `${userName} no tiene canciones guardadas` : '¡Tu playlist está vacía!'}`,
playlistHeader: ({ userName }) => `📋 ${userName ? `Playlist de ${userName}` : 'Tu playlist'}`,
playlistMore: ({ count }) => `...y otras ${count} canciones`,
playlistSelectToPlay: () => "Selecciona una canción para reproducir",
saveNoText: () => "⚠️ Especifica una canción para buscar",
saveSearching: ({ query }) => `⌛ Buscando "${query}"...`,
saveNoResults: () => "⚠️ No se encontraron resultados",
saveAlreadyExists: () => "⚠️ ¡Canción ya en playlist! Usa .playlist para ver las canciones guardadas.",
saveSaved: () => "✅ ¡Canción guardada!",
saveViewPlaylist: () => "📋 Ver Playlist",
savePlay: () => "🎵 Reproducir",
saveDelete: () => "🗑️ Eliminar",
saveSaveNew: () => "💾 Guardar nueva",
deleteSelect: () => "🗑️ Selecciona canción a eliminar",
deleteUse: () => "Usa: .eliminar <número>",
deleteInvalid: () => "⚠️ ¡Número no válido!",
deleteSuccess: () => "✅ ¡Canción eliminada!",
deleteRestore: () => "💾 Restaurar",
backButton: () => "🔙 Atrás",
playlistError: ({ error }) => `⚠️ Error: ${error}`,
playlistSignature: () => "꙰ 𝗖𝗿𝗲𝗮𝗰𝗶ó𝗻 𝗱𝗲 𝗚𝗮𝗯𝟯𝟯𝟯 ꙰",
ytSearchMissingFiles: () => "❗ Para usar este comando usa la base de ChatUnity",
ytSearchMissingQuery: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n 📌 Ingresa el nombre del video\n Ejemplo: .ytsearch compilación\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
ytSearchNoResults: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n ❌ No se encontraron resultados\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
ytSearchTitle: () => "🔎 Búsqueda YouTube",
ytSearchFooter: () => "ChatUnity ✦ Descargador",
ytSearchResultTitle: () => "🎬 Resultados YouTube",
ytSearchResultHeader: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n ୧ 🎬 ୭ Resultados búsqueda\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Aquí están los resultados encontrados ✦ ꒷꒦",
ytSearchSelectPrompt: () => "╭★────★────★────★╮\n│ 🔢 Selecciona un video\n│ de los resultados arriba\n╰★────★────★╯",
ytSearchDuration: () => "📺 Duración:",
ytSearchViews: () => "👁 Visualizaciones:",
ytSearchChannel: () => "👤 Canal:",
toAudioNoMedia: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ⚠️ Responde a un video o audio\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
toAudioDownloadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Error durante la descarga\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
toAudioConvertError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Error durante la conversión\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",


weatherNoCity: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❗ Ingresa el nombre de una ciudad\n  Uso: .tiempo [nombre ciudad]\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
weatherInfo: ({ name, country, temp, feels, min, max, humidity, main, desc, wind, pressure }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🌍 ୭ *Tiempo ${name}, ${country}*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Información del tiempo ✦ ꒷꒦\n\n🌡 Temperatura: ${temp}°C\n🌡 Percibida: ${feels}°C\n🌡 Mínima: ${min}°C\n🌡 Máxima: ${max}°C\n💧 Humedad: ${humidity}%\n☁ Tiempo: ${main}\n🌫 Descripción: ${desc}\n💨 Viento: ${wind} m/s\n🔽 Presión: ${pressure} hPa\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🌤️\n│ Powered by OpenWeather\n╰★────★────★╯`,
weatherCityNotFound: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  🚫 Ciudad no encontrada\n  Revisa la escritura\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
weatherError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ⚠️ Error durante la recuperación\n  Vuelve a intentarlo más tarde\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
translateHelp: ({ prefix, command, languages }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🌍 ୭ *TRADUCTOR*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Ejemplos de uso ✦ ꒷꒦\n\n│ ${prefix}${command} Hola\n│ ${prefix}${command} en Hola\n│ ${prefix}${command} ja Hello\n│ ${prefix}${command} [responder msg]\n│ ${prefix}habla ar texto\n\n꒷꒦ ✦ Idiomas disponibles ✦ ꒷꒦\n\n${languages}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🌐\n│ ChatUnity Translator\n╰★────★────★╯`,
translateNoText: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Texto faltante para audio\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
translateNoLang: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Idioma no especificado\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
translateWhatToTranslate: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ ¿Y qué debería traducir?\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
translateTooLong: ({ max, length }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Texto demasiado largo\n  Máximo: ${max} caracteres\n  El tuyo: ${length} caracteres\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
translateResult: ({ fromLang, toLang, translation }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🌍 ୭ *TRADUCTOR*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ De: ${fromLang} ✦ ꒷꒦\n꒷꒦ ✦ A: ${toLang} ✦ ꒷꒦\n\n${translation}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎯\n│ Traducción completada\n╰★────★────★╯`,
translateListenOriginal: () => "🔊 Escuchar Original",
translateListenTranslation: () => "🎵 Escuchar Traducción",
translateFooter: () => "ChatUnity Translator",
translateTTSError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Error audio: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
translateError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Error durante traducción\n  Vuelve a intentarlo más tarde\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
antiLinkNotAdmin: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *Salvado por ahora*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ No soy admin ✦ ꒷꒦\n\nNo puedo hacer nada",
antiLinkDetected: ({ user, qrDetected }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚫 ୭ *ANTI-LINK ACTIVADO*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Violación de reglas ✦ ꒷꒦\n\n${user} 🤨 Has infringido las reglas del grupo${qrDetected ? ', ¿crees que no veo los QR? 😂' : '.'}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 👮\n│ Expulsado automáticamente\n╰★────★────★╯`,
antiLinkRestrictOff: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *Restrict Desactivado*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Acción requerida ✦ ꒷꒦\n\nContacta al propietario del bot para activar el RESTRICT\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔧\n│ Función no disponible\n╰★────★────★╯",
antiMediaWarning: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *ANTIMEDIA ACTIVO*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Violación de reglas ✦ ꒷꒦\n\nSolo fotos y videos con 1 visualización están permitidos\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🚫\n│ Media eliminado\n╰★────★────★╯",
antiSpamDetected: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚫 ୭ *ANTISPAM DETECTADO*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Spam detectado ✦ ꒷꒦\n\nEl usuario ha sido eliminado por comportamiento spam\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ⚡\n│ ChatUnity x 333 Protection\n╰★────★────★╯",
antiTrabaAdminWarning: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *ATENCIÓN ADMIN*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Trava detectado ✦ ꒷꒦\n\nOYE @${user} ¿acaso te diviertes enviando trava aquí? ¡Qué suerte que eres admin! -.-\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🛡️\n│ Protegido por el estatus\n╰★────★────★╯`,
antiTrabaDetected: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚫 ୭ *ANTI-TRAVA ACTIVO*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Mensaje largo detectado ✦ ꒷꒦\n\nEl usuario @${user} ha enviado un mensaje demasiado largo y será eliminado\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🚨\n│ ChatUnity Protection\n╰★────★────★╯`,
antiTrabaNoPermission: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *Permisos Faltantes*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Acción bloqueada ✦ ꒷꒦\n\nNo tengo permisos de administrador para eliminar a quien envía trava\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔒\n│ Solicita permisos admin\n╰★────★────★╯",
infoSetAge: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🗓️ ୭ *Establecer Edad*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Cómo proceder ✦ ꒷꒦\n\nPara establecer tu edad usa:\n.setedad <edad>\n\nPara eliminar tu edad usa:\n.eliminaredad\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📝\n│ Gestión perfil\n╰★────★────★╯",
infoSetIG: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🌐 ୭ *Establecer Instagram*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Cómo proceder ✦ ꒷꒦\n\nPara establecer Instagram usa:\n.setig <usuario>\n\nPara eliminarlo usa:\n.delig\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📱\n│ Gestión social\n╰★────★────★╯",
infoGroupOnly: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Comando solo para grupos\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
infoUserData: ({ messages, warn, role, age, gender, blasphemy, instagram }) => `⋆ ︵︵ ★ 𝐈𝐍𝐅𝐎 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 ★ ︵︵ ⋆\n\n\n꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧\n୧ 📝 *Mensajes:* ${messages}\n୧ ⚠️ *Advertencias:* ${warn} / 4\n୧ 🟣 *Rol:* ${role}\n୧ 🗓️ *Edad:* ${age}\n୧ 🚻 *Género:* ${gender}\n୧ 🤬 *Blasfemias:* ${blasphemy}\n${instagram ? `୧ 🌐 instagram.com/${instagram}` : '୧ 🌐 *Instagram:* No establecido'}\n꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧`,
infoSetAgeButton: () => "🗓️ Establecer Edad",
infoSetGenderMaleButton: () => "🚹 Género Masculino",
infoSetGenderFemaleButton: () => "🚺 Género Femenino",
infoSetIGButton: () => "🌐 Establecer IG",
infoFooter: () => "Establece tus datos personales:",
infoCreator: () => "𝒄𝒓𝒆𝒂𝒄𝒊ó𝒏 𝒅𝒆 𝑶𝒏𝒊𝒙🌟",
infoRoleFounder: () => "𝐅𝐮𝐧𝐝𝐚𝐝𝐨𝐫 ⚜️",
infoRoleAdmin: () => "𝐀𝐝𝐦𝐢𝐧 👑",
infoRoleMember: () => "𝐌𝐢𝐞𝐦𝐛𝐫𝐨 🤍",
infoGenderNotSet: () => "𝐍𝐨 𝐞𝐬𝐭𝐚𝐛𝐥𝐞𝐜𝐢𝐝𝐨",
infoAgeNotSet: () => "No establecida",
infoAgeYears: ({ age }) => `${age} años`,
setGenderUsage: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ Uso correcto del comando\n  ━━✫ .setgenero masculino\n  ━━✫ .setgenero femenino\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
setGenderSuccess: ({ gender, emoji }) => `✓ Género establecido como: ${gender} ${emoji}`,
deleteGenderSuccess: () => "✓ Género eliminado",
setAgeUsage: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ Ingresa una edad válida\n  ━━✫ Edad de 10 a 80 años\n  ━━✫ Usa: .setedad <edad>\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
setAgeSuccess: ({ age }) => `✓ Edad establecida como: ${age} años`,
deleteAgeSuccess: () => "✓ Edad eliminada",
rulesNotSet: ({ prefix }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⓘ Ninguna regla establecida\n  ━━✫ Los admin aún no han\n  ━━✫ establecido las reglas\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n\n📌 Para establecer las reglas usa:\n${prefix}setreglas <texto reglas>`,
rulesTitle: () => "📜 𝐑𝐞𝐠𝐥𝐚𝐬 𝐝𝐞𝐥 𝐆𝐫𝐮𝐩𝐨",
rulesDisplay: ({ rules }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📜 ୭ *Reglas del Grupo*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n${rules}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ⚖️\n│ Respeta las reglas\n╰★────★────★╯`,
dashboardTitle: () => "⚡ 𝐓𝐎𝐏 10 𝐂𝐎𝐌𝐀𝐍𝐃𝐎𝐒 ⚡",
dashboardCommand: () => "📚 COMANDO",
dashboardUses: () => "🗂️ USOS",
dashboardLastUse: () => "⏱️ ÚLTIMO USO",
dashboardNeverUsed: () => "Nunca usado",
dashboardDaysAgo: ({ days }) => `Hace ${days} días`,
dashboardHoursAgo: ({ hours }) => `Hace ${hours} horas`,
dashboardMinutesAgo: ({ minutes }) => `Hace ${minutes} minutos`,
dashboardSecondsAgo: () => "Hace pocos segundos",
dashboardStats: ({ stats }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚡ ୭ *TOP 10 COMANDOS*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n${stats}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📊\n│ Estadísticas bot\n╰★────★────★╯`,
imageSearchBaseOnly: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ Este comando está disponible\n  ━━✫ solo con la base ChatUnity\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
imageSearchUsage: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⓘ Uso del comando\n  ━━✫ ${prefix}${command} <palabra clave>\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
imageSearchForbidden: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Contenido no permitido\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
imageSearchNoResults: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😢 Ninguna imagen encontrada\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
imageSearchResults: ({ term }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🔍 ୭ *Resultados búsqueda*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Consulta: ${term} ✦ ꒷꒦`,
imageSearchImageNum: ({ num }) => `Imagen #${num}`,
imageSearchResultFor: ({ term }) => `Resultado para: ${term}`,
imageSearchFooter: () => "Powered by ChatUnity",
imageSearchOpenImage: () => "Abrir imagen",
imageSearchTitle: () => "Resultados imágenes",
imageSearchSubtitle: () => "Aquí están las imágenes encontradas en Google",
imageSearchAgainPrompt: () => "🔄 ¿Quieres buscar otras imágenes con el mismo término?",
imageSearchAgainButton: () => "Buscar de nuevo",
obfuscateNoCode: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Ingresa código JavaScript\n  ━━✫ para ofuscar o responde\n  ━━✫ a un mensaje con código\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
obfuscateProcessing: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Ofuscando en curso...\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
obfuscateSuccess: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🔒 ୭ *Código ofuscado*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Ofuscación completada ✦ ꒷꒦",
obfuscateError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Error ofuscación\n  ━━✫ ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
bonkNoPhoto: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Sin foto de perfil\n  ━━✫ El usuario no ha establecido\n  ━━✫ una foto de perfil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bonkError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Error durante la ejecución\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
hornyCardCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🔥 ୭ *Horny Card*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ ¿Cuán horny estás? 🥵🔥 ✦ ꒷꒦",
stupidCaption: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤡 ୭ *¿Cuán estúpido eres?*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ @${user} ✦ ꒷꒦`,
stupidDefaultText: () => "soy+estúpido",
wantedNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Imposible recuperar\n  ━━✫ la foto de perfil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedNoProfilePicUser: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ El usuario no tiene\n  ━━✫ foto de perfil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedYourProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ No tienes foto de perfil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedUnsupportedFormat: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Formato no soportado\n  ━━✫ Usa JPEG o PNG\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Error subida imagen\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Error API\n  ━━✫ Vuelve a intentarlo más tarde\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Error: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
wantedCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚔 ୭ *SE BUSCA*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Buscado ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 👮\n│ Powered by ChatUnity\n╰★────★────★╯",
jokeNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Imposible recuperar\n  ━━✫ la foto de perfil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeYourProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ No tienes foto de perfil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeUnsupportedFormat: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Formato no soportado\n  ━━✫ Usa JPEG o PNG\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Error subida imagen\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Error API\n  ━━✫ Vuelve a intentarlo más tarde\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Error: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
jokeCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤡 ୭ *BROMA*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Broma sobre cabeza ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 😂\n│ Powered by ChatUnity\n╰★────★────★╯",
jailNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Imposible recuperar\n  ━━✫ la foto de perfil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jailUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Error subida imagen\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jailAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Error API\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jailError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Error: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
jailCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚔 ୭ *EN LA CÁRCEL*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 👮\n│ Powered by ChatUnity\n╰★────★────★╯",
nokiaNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Imposible recuperar\n  ━━✫ la foto de perfil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaYourProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ No tienes foto de perfil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaUnsupportedFormat: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Formato no soportado\n  ━━✫ Usa JPEG o PNG\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Error subida\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Error API\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Error: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
nokiaCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📱 ୭ *NOKIA*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📞\n│ Powered by ChatUnity\n╰★────★────★╯",
adNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Imposible recuperar\n  ━━✫ la foto de perfil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adYourProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ No tienes foto de perfil\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adUnsupportedFormat: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Formato no soportado\n  ━━✫ Usa JPEG o PNG\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Error subida\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Error API\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Error: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
adCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📢 ୭ *PUBLICIDAD*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📺\n│ Powered by ChatUnity\n╰★────★────★╯",
pokeOpenNoType: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Especifica el tipo\n  ━━✫ base, imperium, premium, darkness\n  ━━✫ Ejemplo: .abrirkpokemon base\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeOpenNoPacks: ({ type }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⛔ No tienes paquetes ${type.toUpperCase()}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeOpenOpening: () => "🎁 Abriendo el paquete...",
pokeOpenRevealing: () => "✨ Revelando las cartas...",
pokeOpenNoCards: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😢 Ninguna carta encontrada\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeOpenResult: ({ type, name, rarity, shiny, cardType, level, remaining }) => `🎉 ¡Has abierto un paquete *${type.toUpperCase()}*:\n\n✨ *${name}* (${rarity})${shiny ? ' ✨ Shiny' : ''}\n🔰 Tipo: ${cardType} | Nvl: ${level}\n\n📦 Paquetes restantes: *${remaining}* ${type}`,
pokeBuyUsage: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Uso correcto\n  ━━✫ .comprarpokemon <base|imperium|premium> <cantidad>\n  ━━✫ Ejemplo: .comprarpokemon base 3\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeBuyNoCoins: ({ cost, balance }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ UnityCoins insuficientes\n  ━━✫ Requeridos: ${cost}\n  ━━✫ Saldo: ${balance}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeBuySuccess: ({ quantity, type, total, balance }) => `✅ ¡Has comprado *${quantity}* paquetes ${type.toUpperCase()}!\n📦 Total ahora: ${total}\n💸 UnityCoins restantes: ${balance}`,
pokeLeaderboardEmpty: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😢 Ningún coleccionista encontrado\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeLeaderboardTitle: () => "🏆 *Top 10 Coleccionistas Pokémon*:",
pokeInventoryTitle: () => "📂 TUS PAQUETES",
pokeInventoryBase: ({ count }) => `• 📦 Base: ${count}`,
pokeInventoryImperium: ({ count }) => `• 👑 Imperium: ${count}`,
pokeInventoryPremium: ({ count }) => `• 🌌 Premium: ${count}`,
pokeInventoryFooter: () => "🎁 ¡Usa los botones para abrir un paquete ahora!",
pokeInventoryOpenBase: () => "📦 Abrir Base",
pokeInventoryOpenImperium: () => "👑 Abrir Imperium",
pokeInventoryOpenPremium: () => "🌌 Abrir Premium",
pokeInventoryBuy: () => "➕ Comprar Paquetes",
pokeBattleNoMention: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚔️ Etiqueta un usuario\n  ━━✫ Ejemplo: .combate @usuario\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeBattleNoPokemon: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😓 No tienes Pokémon\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeBattleOpponentNoPokemon: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😓 El adversario no tiene Pokémon\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeBattleResult: ({ user1, user2, poke1, poke2, result }) => `⚔️ *¡Combate Pokémon!*\n\n👤 @${user1} eligió *${poke1.name}* (Nv. ${poke1.level})\n👤 @${user2} eligió *${poke2.name}* (Nv. ${poke2.level})\n\n${result}`,
pokeBattleWinner: ({ user }) => `🏆 @${user} gana el combate!`,
pokeBattleTie: () => "🤝 ¡Empate! Ambos Pokémon están exhaustos.",
pokeEvolveNoName: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 📛 Especifica el nombre del Pokémon\n  ━━✫ Ejemplo: .evoluciona Charmander\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeEvolveNotOwned: ({ name }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ No posees *${name}*\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeEvolveNoCoins: ({ balance, cost }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⛔ unitycoin insuficiente\n  ━━✫ Tienes: ${balance}\n  ━━✫ Requeridos: ${cost}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeEvolveNoEvolution: ({ name }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⛔ ${name} no puede evolucionar\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeEvolveEvolving: ({ name }) => `✨ *${name}* está evolucionando...`,
pokeEvolveProgress: () => "🔄 Evolución en curso...",
pokeEvolveSuccess: ({ from, to }) => `🎉 *${from}* se ha evolucionado en *${to}*!`,
pokeEvolveComplete: ({ balance }) => `✅ ¡Evolución completada!\n💰 unitycoin restantes: *${balance}*`,
tradeUsage: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 📌 Uso correcto\n  ━━✫ .intercambia @usuario <tu_num> <su_num>\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
tradeYourNotExist: ({ num }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Tu Pokémon n. ${num}\n  ━━✫ no existe\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
tradeTheirNotExist: ({ num, user }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ El Pokémon n. ${num}\n  ━━✫ de @${user} no existe\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
tradeRequest: ({ from, myPoke, theirPoke, target }) => `🔁 *Solicitud de Intercambio*\n\n@${from} quiere intercambiar:\n📤 *${myPoke.name}* (Nv. ${myPoke.level})\ncon\n📥 *${theirPoke.name}* (Nv. ${theirPoke.level}) de @${target}\n\n✅ @${target}, responde con *.aceptar* para confirmar.`,
tradeNoRequest: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ninguna solicitud de intercambio\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
tradeUnavailable: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Uno de los Pokémon\n  ━━✫ ya no está disponible\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
tradeSuccess: ({ from, to, poke1, poke2 }) => `✅ ¡Intercambio completado entre @${from} y @${to}!\n\n🎁 ${poke1.name} ⇄ ${poke2.name}`,
pityTitle: () => "📊 *Sistema Pity Darkness*",
pityOpened: ({ count }) => `🔁 Paquetes abiertos sin Darkness: *${count}*`,
pityRemaining: ({ remaining }) => `🎯 Próximo Darkness garantizado en: *${remaining}* paquetes`,
pityGuaranteed: () => "✨ ¡El próximo paquete tiene un Darkness *garantizado*!",
inventoryEmpty: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 📦 Inventario vacío\n  ━━✫ Usa .abrirkpokemon base\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
inventoryInvalidPage: ({ max }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Página no válida\n  ━━✫ Elige entre 1 y ${max}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
inventoryHeader: ({ user, total, page, totalPages, perPage }) => `╭━━━🗂️ *INVENTARIO POKÉMON* 🗂️━━━╮\n┃ 👤 *Entrenador:* @${user}\n┃ 📦 *Total:* ${total}\n┃ 📄 *Página:* ${page}/${totalPages}\n┃ 📌 *Por página:* ${perPage}\n╰━━━━━━━━━━━━━━━━━━━━━━━╯`,
inventoryDarknessButton: () => "🌑 Pokémon Darkness",
inventoryPageButton: ({ num }) => `Página ${num}`,
inventoryFooter: () => "📂 Usa `.inventario [página]` o haz clic en los botones para navegar.",
darknessInfo: () => "🌑 *PAQUETES DARKNESS* 🌑\n\nLos paquetes *Darkness* no se pueden comprar, pero se encuentran **aparentemente de la nada** cuando abres paquetes *Premium*.\n\n➡️ Cada 10 paquetes *Premium* abiertos, tienes un 50% de posibilidades de obtener un paquete *Darkness* bonus.\n\n🎲 Abriendo un paquete *Darkness* puedes encontrar Pokémon Darkness especiales con un 10% de posibilidad.\n\nUsa *.abrirkpokemon darkness* para abrir los paquetes Darkness.\n\n¡Buena suerte! 🍀",
trisAlreadyPlaying: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❗ Ya estás jugando\n  ━━✫ con alguien\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
trisNoRoomName: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❗ Debes dar un nombre a la sala\n  ━━✫ Ejemplo: ${prefix}${command} sala1\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
trisGameStarting: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🕹️ ୭ *PARTIDA COMIENZA*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Un jugador se ha unido ✦ ꒷꒦",
trisTurnOf: ({ player }) => `Turno de @${player}`,
trisRoomCreated: () => "𝐒𝐀𝐋𝐀 𝐂𝐑𝐄𝐀𝐃𝐀 ✓",
trisWaiting: ({ room }) => `══════ •⊰✧⊱• ══════\n*𝐄𝐬𝐩𝐞𝐫𝐚𝐧𝐝𝐨 𝐣𝐮𝐠𝐚𝐝𝐨𝐫𝐞𝐬 ...*\n══════════════\n🕹️ 𝐏𝐚𝐫𝐚 𝐩𝐚𝐫𝐭𝐢𝐜𝐢𝐩𝐚𝐫 𝐞𝐬𝐜𝐫𝐢𝐛𝐞\n.jugar ${room}\n══════════════\n⛔ 𝐏𝐚𝐫𝐚 𝐬𝐚𝐥𝐢𝐫 𝐝𝐞 𝐥𝐚 𝐩𝐚𝐫𝐭𝐢𝐝𝐚\n𝐞𝐧 𝐜𝐮𝐫𝐬𝐨 𝐞𝐬𝐜𝐫𝐢𝐛𝐞 .salir\n══════ •⊰✧⊱• ══════`,
slotInvalidBet: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Apuesta no válida\n  ━━✫ Ejemplo: ${prefix}${command} 100\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
slotInsufficientUC: ({ bet }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚫 UC insuficientes\n  ━━✫ Necesitas ${bet} UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
slotCooldown: ({ min, sec }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Espera ${min}m ${sec}s\n  ━━✫ antes de jugar de nuevo\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
slotWin: ({ uc, xp }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *¡HAS GANADO!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Ganancias ✦ ꒷꒦\n\n┌──────────────\n│ ➕ *${uc} UC*\n│ ➕ *${xp} XP*\n└──────────────`,
slotLose: ({ uc, xp }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤡 ୭ *¡HAS PERDIDO!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Pérdidas ✦ ꒷꒦\n\n┌──────────────\n│ ➖ *${uc} UC*\n│ ➖ *${xp} XP*\n└──────────────`,
slotBalance: ({ uc, xp, current, max, prefix }) => `\n💎 *SALDO ACTUAL*\n\n┌──────────────\n│ 👛 *UC: ${uc}*\n│ ⭐ *XP: ${xp}*\n│ 📊 *Progreso: ${current}/${max} XP*\n└──────────────\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ℹ️\n│ ¡Usa ${prefix}menuxp para más XP!\n╰★────★────★╯`,
betUsage: ({ prefix, command }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎰 ୭ *CASINO*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Cómo jugar ✦ ꒷꒦\n\nIngresa la cantidad de 💶 UnityCoins para apostar contra *ChatUnity-Bot*\n\n📌 Ejemplo:\n${prefix}${command} 100\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎲\n│ ¡Elige una denominación abajo!\n╰★────★────★╯`,
betCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Ya has apostado\n  ━━✫ Espera ⏱ ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
betLose: ({ bot, user, amount, botName, userName }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎲 ୭ *RESULTADO*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Números extraídos ✦ ꒷꒦\n\n🤖 *${botName}*: ${bot}\n👤 *${userName}*: ${user}\n\n╭★────★────★────★╮\n│ 😢 ¡HAS PERDIDO!\n│ ➖ ${amount} 💶 UC\n╰★────★────★╯`,
betWin: ({ bot, user, amount, botName, userName }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎲 ୭ *RESULTADO*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Números extraídos ✦ ꒷꒦\n\n🤖 *${botName}*: ${bot}\n👤 *${userName}*: ${user}\n\n╭★────★────★────★╮\n│ 🎉 ¡HAS GANADO!\n│ ➕ ${amount} 💶 UC\n╰★────★────★╯`,
betDraw: ({ bot, user, amount, botName, userName }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎲 ୭ *RESULTADO*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Números extraídos ✦ ꒷꒦\n\n🤖 *${botName}*: ${bot}\n👤 *${userName}*: ${user}\n\n╭★────★────★────★╮\n│ 🤝 ¡EMPATE!\n│ ↩️ ${amount} 💶 UC devueltos\n╰★────★────★╯`,
betInsufficientUC: ({ amount }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 💸 No tienes ${amount} 💶 UC\n  ━━✫ para apostar!\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rpsAlreadyPlaying: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏱ Ya has jugado\n  ━━✫ Espera ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rpsChooseOption: () => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ✊ ୭ *PIEDRA PAPEL TIJERAS*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Elige tu movimiento ✦ ꒷꒦\n\n🪨 Piedra vence a Tijeras\n📄 Papel vence a Piedra\n✂️ Tijeras vence a Papel\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎲\n│ ¡Haz tu elección!\n╰★────★────★╯`,
rpsInvalidOption: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Elección no válida\n  ━━✫ Elige: piedra/papel/tijeras\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rpsDraw: ({ player, bot, reward }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤝 ୭ *¡EMPATE!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Resultado ✦ ꒷꒦\n\n👤 Tú: ${player}\n🤖 Bot: ${bot}\n\n╭★────★────★────★╮\n│ 🎁 Premio de consolación\n│ ➕ ${reward} 💶 UC\n╰★────★────★╯`,
rpsWin: ({ player, bot, reward }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *¡HAS GANADO!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Resultado ✦ ꒷꒦\n\n👤 Tú: ${player}\n🤖 Bot: ${bot}\n\n╭★────★────★────★╮\n│ 🏆 ¡Victoria épica!\n│ ➕ ${reward} 💶 UC\n╰★────★────★╯`,
rpsLose: ({ player, bot, loss }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 😢 ୭ *¡HAS PERDIDO!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Resultado ✦ ꒷꒦\n\n👤 Tú: ${player}\n🤖 Bot: ${bot}\n\n╭★────★────★────★╮\n│ 💸 Mejor suerte la próxima vez\n│ ➖ ${loss} 💶 UC\n╰★────★────★╯`,
rpsRock: () => "🪨 Piedra",
rpsPaper: () => "📄 Papel",
rpsScissors: () => "✂️ Tijeras",
rpsButtonRock: () => "🪨 Piedra",
rpsButtonPaper: () => "📄 Papel",
rpsButtonScissors: () => "✂️ Tijeras",
rpsButtonRetry: () => "🔄 Reintentar",
bjInsufficientFunds: () => "💰 ¡Fondos insuficientes!",
bjNotYourTurn: () => "❌ ¡No es tu turno!",
bjBusted: () => "💥 ¡Te has pasado! Has superado 21!",
bjDealerBusted: () => "🎉 ¡Dealer se ha pasado! ¡Has ganado!",
bjYouWin: () => "🎉 ¡Has ganado!",
bjDealerWins: () => "😔 ¡Dealer gana!",
bjPush: () => "🤝 ¡Empate!",
bjMakeBet: () => "💵 ¡Haz tu apuesta!",
bjYourTurn: () => "📋 ¡Tu turno! ¿Pedir o Plantarse?",
bjYourScore: ({ score }) => `📋 Tu puntuación: ${score}`,
bjTimeoutTitle: () => "⏰ TIEMPO AGOTADO",
bjTimeoutMsg: ({ balance }) => `⏰ ¡Tiempo agotado! Partida cancelada.\n💶 Cartera: ${balance} UC`,
bjGameInProgress: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🎰 Partida ya en curso\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjInvalidBet: ({ max }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Apuesta no válida\n  ━━✫ Importe: 10-${max} UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
bjStartCaption: ({ name, bet, balance }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎰 ୭ *BLACKJACK*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ ${name} ✦ ꒷꒦\n\n💶 Apuesta: ${bet} UC\n📋 Saldo: ${balance} UC\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ⚡\n│ .pedir .plantarse .doblar\n╰★────★────★╯`,
bjNoGame: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ninguna partida en curso\n  ━━✫ Usa: .blackjack [apuesta]\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjNotYourGame: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ ¡No es tu turno!\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjDoubleOnlyTwo: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Doblar solo con 2 cartas\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjDoubleInsufficientFunds: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Fondos insuficientes\n  ━━✫ para doblar\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjFooter: () => "♠️ Blackjack Bot ♣️",
bjPlayer: () => "JUGADOR",
bjDealer: () => "DEALER",
bjScore: () => "PUNTUACIÓN",
bjWallet: () => "💶 CARTERA",
bjBet: () => "🎯 APUESTA",
rouletteCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Ya has apostado\n  ━━✫ Espera ⏱ ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteUsage: ({ prefix, command }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎰 ୭ *RULETA*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Cómo jugar ✦ ꒷꒦\n\nIngresa cantidad y color:\n${prefix}${command} 20 negro\n${prefix}${command} 50 rojo\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎲\n│ ¡Elige tu color!\n╰★────★────★╯`,
rouletteInvalidFormat: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Formato erróneo\n  ━━✫ Ejemplo: ${prefix}${command} 20 negro\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteInvalidAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Cantidad no válida\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteMaxBet: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Máximo 50 💶 UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteInvalidColor: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Color no válido\n  ━━✫ Elige: negro o rojo\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteInsufficientFunds: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 💶 UC insuficientes\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteBetPlaced: ({ amount, color }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎰 ୭ *APUESTA REALIZADA*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Detalles ✦ ꒷꒦\n\n💰 Importe: ${amount} 💶 UC\n🎨 Color: ${color === 'negro' ? '⚫ NEGRO' : '🔴 ROJO'}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ⏱\n│ Espera 10 segundos...\n╰★────★────★╯`,
rouletteWin: ({ amount, total, winColor }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *¡HAS GANADO!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Resultado ✦ ꒷꒦\n\n🎯 Color salido: ${winColor === 'negro' ? '⚫ NEGRO' : '🔴 ROJO'}\n\n╭★────★────★────★╮\n│ 💰 Ganancia: +${amount} 💶 UC\n│ 💎 Total: ${total} 💶 UC\n╰★────★────★╯`,
rouletteLose: ({ amount, total, winColor }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 😢 ୭ *¡HAS PERDIDO!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Resultado ✦ ꒷꒦\n\n🎯 Color salido: ${winColor === 'negro' ? '⚫ NEGRO' : '🔴 ROJO'}\n\n╭★────★────★────★╮\n│ 💸 Pérdida: -${amount} 💶 UC\n│ 💎 Total: ${total} 💶 UC\n╰★────★────★╯`,
rouletteBlack: () => "⚫ Negro",
rouletteRed: () => "🔴 Rojo",
rouletteButtonBlack10: () => "⚫ 10 UC",
rouletteButtonBlack25: () => "⚫ 25 UC",
rouletteButtonBlack50: () => "⚫ 50 UC",
rouletteButtonRed10: () => "🔴 10 UC",
rouletteButtonRed25: () => "🔴 25 UC",
rouletteButtonRed50: () => "🔴 50 UC",
// Lanzamiento de Moneda
cfCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Ya has jugado\n  ━━✫ Espera ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cfWaiting: ({ player }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🪙 ୭ *CARA O CRUZ*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Partida iniciada ✦ ꒷꒦\n\n🧑 Jugador 1: @${player}\n🕹️ Esperando al segundo jugador...\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎲\n│ ¡Escribe cara o cruz!\n╰★────★────★╯`,
cfPlayer1Ready: ({ player, choice }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🪙 ୭ *CARA O CRUZ*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Jugador 1 listo ✦ ꒷꒦\n\n🧑 @${player} eligió *${choice}*\n🎯 Esperando al Jugador 2...\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎮\n│ ¡Tu turno!\n╰★────★────★╯`,
cfInvalidChoice: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Elección no válida\n  ━━✫ Escribe: cara o cruz\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cfResult: ({ result, p1, p2, msg, prefix, command }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🪙 ୭ *RESULTADO: ${result.toUpperCase()}*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n${msg}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔄\n│ ${prefix}${command} para volver a jugar\n╰★────★────★╯`,
cfAlreadyChosen: ({ choice }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ Ya has elegido ${choice}\n  ━━✫ Espera a otro jugador\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cfNotAvailable: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Partida no disponible\n  ━━✫ ${prefix}${command} para comenzar\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cfButtonHeads: () => "🪙 Cara",
cfButtonTails: () => "🪙 Cruz",

// Piedra Papel Tijeras v2
rps2Cooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Espera ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rps2Usage: ({ prefix, command }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ✊ ୭ *PIEDRA PAPEL TIJERAS*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Cómo jugar ✦ ꒷꒦\n\n${prefix}${command} piedra\n${prefix}${command} papel\n${prefix}${command} tijeras\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎮\n│ ¡Elige tu movimiento!\n╰★────★────★╯`,
rps2InvalidChoice: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Elección no válida\n  ━━✫ ${prefix}${command} piedra/papel/tijeras\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rps2Draw: ({ bot, reward }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤝 ୭ *¡EMPATE!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Bot: ${bot} ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ 🎁 +${reward} 💶 UC\n╰★────★────★╯`,
rps2Win: ({ bot, reward }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *¡HAS GANADO!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Bot: ${bot} ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ 💰 +${reward} 💶 UC\n╰★────★────★╯`,
rps2Lose: ({ bot, loss }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 😢 ୭ *¡HAS PERDIDO!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Bot: ${bot} ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ 💸 -${loss} 💶 UC\n╰★────★────★╯`,
rps2ButtonRock: () => "🪨 Piedra",
rps2ButtonPaper: () => "📄 Papel",
rps2ButtonScissors: () => "✂️ Tijeras",

// Pokédex
pokedexNoName: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Ingresa nombre Pokémon\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokedexSearching: ({ name }) => `🔍 Buscando ${name}...`,
pokedexError: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Error búsqueda Pokémon\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokedexInfo: ({ name, id, type, abilities, height, weight, desc, url }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎌 ୭ *POKÉDEX - ${name}*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Información ✦ ꒷꒦\n\n🔹 *Nombre:* ${name}\n🔹 *ID:* ${id}\n🔹 *Tipo:* ${type}\n🔹 *Habilidades:* ${abilities}\n🔹 *Altura:* ${height}\n🔹 *Peso:* ${weight}\n\n📝 *Descripción:*\n${desc}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🌐\n│ ${url}\n╰★────★────★╯`,
flagGameActive: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Partida ya activa\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagGroupOnly: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Solo para grupos\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagNoGame: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Ninguna partida activa\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagAdminOnly: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Solo para admin\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Espera ${time}s\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagSkipped: ({ answer }) => `ㅤ⋆｡˚『 ╭ \`JUEGO INTERRUMPIDO\` ╯ 』˚｡⋆\n╭\n│ 『 🏳️ 』 \`La respuesta era:\`\n│ 『 ‼️ 』 *\`${answer}\`*\n│ 『 👑 』 _*Interrumpido por un admin*_\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagStart: ({ phrase }) => `ㅤ⋆｡˚『 ╭ \`${phrase}\` ╯ 』˚｡⋆\n╭\n│ 『 🏳️ 』 \`Responde con el nombre\` *del país*\n│ 『 ⏱️ 』 \`Tiempo disponible:\` *30 segundos*\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagTimeout: ({ answer }) => `ㅤ⋆｡˚『 ╭ \`¡TIEMPO AGOTADO!\` ╯ 』˚｡⋆\n╭\n│ 『 🏳️ 』 \`La respuesta era:\`\n│ 『 ‼️ 』 *\`${answer}\`*\n│ 『 💡 』 _*¡Sé más rápido la próxima vez!*_\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagCorrect: ({ answer, time, reward, exp, bonus }) => `ㅤ⋆｡˚『 ╭ \`¡RESPUESTA CORRECTA!\` ╯ 』˚｡⋆\n╭\n│ 『 🏳️ 』 \`País:\` *${answer}*\n│ 『 ⏱️ 』 \`Tiempo empleado:\` *${time}s*\n│ 『 🎁 』 \`Recompensas:\`\n│ 『 💰 』 *${reward}€* ${bonus > 0 ? `(+${bonus} bonus velocidad)` : ''}\n│ 『 🆙 』 *${exp} EXP*\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagAlmostThere: () => "👀 *¡Casi lo tienes!*",
flagAttemptsExhausted: () => `ㅤ⋆｡˚『 ╭ \`¡INTENTOS AGOTADOS!\` ╯ 』˚｡⋆\n╭\n│ 『 ❌ 』 \`¡Has agotado tus 3 intentos!\`\n│ 『 ⏳ 』 _*Espera a que otros intenten...*_\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagWrongHint: ({ letter, length }) => `❌ *¡Respuesta incorrecta!*\n\n💡 *Pista:*\n  • Empieza con la letra *"${letter}"*\n  • Tiene *${length} letras*`,
flagWrong2: ({ remaining }) => `❌ *¡Respuesta incorrecta!*\n\n📝 *Intentos restantes:* ${remaining}\n🤔 *¡Piensa bien tu próxima respuesta!*`,
flagWrongLast: () => `❌ *¡Respuesta incorrecta!*\n\n📝 *Último intento restante..*`,
flagPlayAgain: () => "🏳️ ¡Juega Otra Vez!",
flagError: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Error inicio juego\n  ━━✫ Vuelve a intentarlo en unos segundos\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagPhrase1: () => "🇺🇳 *¡ADIVINA LA BANDERA!* 🇺🇳",
flagPhrase2: () => "🌍 *¿Qué país representa esta bandera?*",
flagPhrase3: () => "🏳️ *Desafío geográfico: ¿reconoces esta bandera?*",
flagPhrase4: () => "🧭 *¡Adivina el país por su bandera!*",
flagPhrase5: () => "🎯 *Quiz banderas: ¿qué país es este?*",
flagPhrase6: () => "🌟 *¡Pon a prueba tus conocimientos geográficos!*",
flagPhrase7: () => "🔍 *¡Observa con atención y adivina el país!*",
songGameActive: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Partida ya en curso\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
songError: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Error en el juego\n  ━━✫ Vuelve a intentarlo más tarde\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
songStart: ({ artist, time }) => `  ⋆｡˚『 ╭ \`ADIVINA LA CANCIÓN\` ╯ 』˚｡⋆\n╭\n┃ 『 ⏱️ 』 \`Tiempo:\` *${time} segundos*\n┃ 『 👤 』 \`Artista:\` *${artist}*\n┃\n┃ ➤  \`¡Escribe el título!\`\n╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒`,
songTimeout: ({ title, artist }) => `ㅤ⋆｡˚『 ╭ \`TIEMPO AGOTADO\` ╯ 』˚｡⋆\n╭\n│\n│ ➤ \`¡Nadie ha adivinado!\`\n┃ 『  』🎵 \`Título:\` *${title}*\n┃ 『  』👤 \`Artista:\` *${artist}*\n┃\n╰⭒─ׄ─ׅ─ׄ─⭒`,
songCorrect: ({ title, artist, reward, exp }) => `ㅤㅤ⋆｡˚『 ╭ \`CORRECTA\` ╯ 』˚｡⋆\n╭\n│\n│ ➤ \`¡Respuesta Correcta!\`\n┃ 『  』🎵 \`Título:\` *${title}*\n┃ 『  』👤 \`Artista:\` *${artist}*\n┃\n┃ 『 🎁 』 \`Ganancias:\`\n│ ➤  \`${reward}\` *UC*\n│ ➤  \`${exp}\` *EXP*\n┃\n╰⭒─ׄ─ׅ─ׄ─⭒`,
songAlmostThere: () => "👀 *¡Casi lo tienes!* Inténtalo de nuevo...",
songPlayAgain: () => "『 🎵 』 Juega Otra Vez",
songExternalTitle: () => "adivina la canción",
songExternalArtist: ({ artist }) => `Artista: ${artist}`,
songExternalSource: () => "ChatUnity Bot",
logoGroupOnly: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Solo para grupos\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoNoGame: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Ninguna partida activa\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoAdminOnly: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Solo admin\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoSkipped: ({ answer }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🛑 ୭ *JUEGO INTERRUMPIDO*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ La respuesta era ✦ ꒷꒦\n\n🚗 *${answer}*`,
logoGameActive: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Partida ya en curso\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Espera ${time}s\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoStart: ({ phrase, time }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚗 ୭ *${phrase}*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Adivina la marca ✦ ꒷꒦\n\n⌛ Tiempo: ${time} segundos\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔍\n│ ¡Escribe el nombre de la marca!\n╰★────★────★╯`,
logoTimeout: ({ answer }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⏰ ୭ *¡TIEMPO AGOTADO!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ La respuesta era ✦ ꒷꒦\n\n🚗 *${answer}*\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔄\n│ Vuelve a intentar con .auto\n╰★────★────★╯`,
logoCorrect: ({ brand, time, reward, exp, bonus }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *¡RESPUESTA CORRECTA!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Detalles ✦ ꒷꒦\n\n🚗 Marca: *${brand}*\n⏱ Tiempo: *${time}s*\n\n╭★────★────★────★╮\n│ 🎁 Recompensas:\n│ • ${reward} 💰 UC${bonus > 0 ? ` (+${bonus} bonus)` : ''}\n│ • ${exp} 🆙 EXP\n╰★────★────★╯\n\n> \\by ChatUnity\\`,
logoPhrase1: () => "🚘 ¡ADIVINA EL LOGO!",
logoPhrase2: () => "🏁 ¿Qué marca es esta?",
logoPhrase3: () => "🔍 ¿Reconoces este auto?",
logoPhrase4: () => "🚗 ¡Quiz de Autos!",
logoPhrase5: () => "🏎️ ¡Adivina la marca!",
logoButtonPlayAgain: () => "🚗 Juega Otra Vez",
missionMainTitle: ({ bot }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎯 ୭ *SISTEMA DE MISIONES*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ ${bot} ✦ ꒷꒦`,
missionMainStats: ({ user, money, bank, dailyDone, dailyTotal, weeklyDone, weeklyTotal }) => `👤 Usuario: @${user}\n💰 Saldo: ${money} UC\n🏦 Banco: ${bank} UC\n📅 Diarias: ${dailyDone}/${dailyTotal} completadas\n📆 Semanales: ${weeklyDone}/${weeklyTotal} completadas\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎯\n│ Selecciona el tipo de misiones:\n╰★────★────★╯`,
missionButtonDaily: () => "📅 DIARIAS",
missionButtonWeekly: () => "📆 SEMANALES",
missionButtonClaim: () => "💰 RECLAMAR",
missionButtonBack: () => "🔙 VOLVER",
missionButtonWallet: () => "💰 CARTERA",
missionDailyTitle: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📅 ୭ *MISIONES DIARIAS*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n👤 @${user}`,
missionDailyReset: ({ time }) => `⏳ Reinicio en: ${time}`,
missionWeeklyTitle: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📆 ୭ *MISIONES SEMANALES*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n👤 @${user}`,
missionWeeklyReset: ({ time }) => `⏳ Reinicio en: ${time}`,
missionEntry: ({ num, title, progress, target, reward, status }) => `▢ *${num}. ${title}*\n➠ Progreso: ${progress}/${target}\n➠ Recompensa: ${reward} UC\n➠ Estado: ${status}`,
missionStatusCompleted: () => "✅ RECLAMADA",
missionStatusReady: () => "💰 LISTA",
missionStatusInProgress: () => "❌ EN CURSO",
missionFooterDaily: ({ prefix }) => `¡Usa "${prefix}misiones reclamar" para cobrar!`,
missionFooterWeekly: () => "Misiones semanales - ¡Recompensas mayores!",
missionFooterMain: () => "¡Completa misiones para ganar UnityCoins!",
missionNoRewards: ({ user }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ @${user} no tienes misiones\n  ━━✫ completadas para reclamar!\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
missionClaimSuccess: ({ user, total, details, money, bank }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *RECOMPENSAS RECLAMADAS*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n👤 @${user}\n💰 Total reclamado: *${total} UC*\n\n${details}\n\n╭★────★────★────★╮\n│ 💰 Saldo: ${money} UC\n│ 🏦 Banco: ${bank} UC\n╰★────★────★╯`,
missionClaimFooter: () => "Usa .cartera para ver el saldo completo",
missionSendMessages: ({ count }) => `Envía ${count} mensajes`,
missionExecuteCommands: ({ count }) => `Ejecuta ${count} comandos`,
missionNoWarn: () => "Permanece sin advertencias",
missionNoWarnWeek: () => "Permanece 7 días sin advertencias",
missionTotalMessages: ({ count }) => `Alcanza ${count} mensajes totales`,
walletNotFound: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Usuario no encontrado\n  ━━✫ en la base de datos\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
walletTitle: () => "💰 CARTERA",
walletInfo: ({ name, uc, bank }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💰 ୭ *CARTERA*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ ${name} ✦ ꒷꒦\n\n👤 Usuario: ${name}\n💰 UnityCoins: ${uc} 💶\n🏛️ Banco: ${bank} 💳\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 💎\n│ Usa .depositar para depositar\n│ Usa .retirar para retirar\n╰★────★────★╯`,
walletExternalTitle: ({ name }) => `Cartera de ${name}`,
walletExternalBody: ({ uc }) => `Saldo: ${uc} UC`,
walletButtonDeposit: () => "🏛️ Depositar",
walletButtonWithdraw: () => "💰 Retirar",
walletButtonGames: () => "🎮 Juegos",
bankNotFound: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Usuario no encontrado\n  ━━✫ en la base de datos\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
bankYourBalance: ({ balance }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🏛️ ୭ *TU CUENTA*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Saldo Bancario ✦ ꒷꒦\n\n💰 Tienes *${balance} 💶 UnityCoins*\nen tu banco 🏛️\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 💎\n│ Usa .depositar para depositar\n│ Usa .retirar para retirar\n╰★────★────★╯`,
bankUserBalance: ({ user, balance }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🏛️ ୭ *CUENTA BANCARIA*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ @${user} ✦ ꒷꒦\n\n💰 Tiene *${balance} 💶 UnityCoins*\nen el banco 🏛️`,
bankButtonDeposit: () => "🏛️ Depositar",
bankButtonWithdraw: () => "💰 Retirar",
bankButtonTransfer: () => "💸 Transferir",
transferNoMention: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Menciona al destinatario\n  ━━✫ Ejemplo: @usuario 100\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferNoAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Ingresa la cantidad\n  ━━✫ de 💶 UnityCoins a transferir\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferInvalidAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Importe no válido\n  ━━✫ Usa solo números\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferMinAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Mínimo transferible: 1 UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferInsufficient: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 💸 Saldo insuficiente\n  ━━✫ para esta transferencia\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferSuccess: ({ amount, fee, total }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💸 ୭ *TRANSFERENCIA REALIZADA*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Detalles Transacción ✦ ꒷꒦\n\n💰 Importe enviado: *${amount}* 💶 UC\n📊 Tasa 2%: *${fee}* 💶 UC\n💳 Total debitado: *${total}* 💶 UC\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ✅\n│ ¡Transferencia completada!\n╰★────★────★╯`,
transferReceived: ({ amount }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💰 ୭ *UC RECIBIDOS*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Has recibido ✦ ꒷꒦\n\n💶 *+${amount} UnityCoins*\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎁\n│ ¡Revisa tu saldo!\n╰★────★────★╯`,
transferSelf: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ No puedes transferir\n  ━━✫ a ti mismo\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
robNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🧠 Etiqueta a alguien o\n  ━━✫ responde a un mensaje\n  ━━✫ Ejemplo: ${prefix}${command} @usuario\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
robSelf: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🤡 No puedes robarte\n  ━━✫ a ti mismo\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
robCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚨 Ya has robado\n  ━━✫ Vuelve a intentar en ⏱ ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
robSuccess: ({ amount, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💰 ୭ *¡GOLPE EXITOSO!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Robo perfecto ✦ ꒷꒦\n\nHas robado *${amount} 💶 UC*\nde @${target}\n\n╭★────★────★────★╮\n│ 💸 +${amount} 💶 UC\n│ ୭ ˚. ᵎᵎ ✅ A tu saldo\n╰★────★────★╯`,
robCaught: ({ fine, name }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚓 ୭ *¡ARRESTADO!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Atrapado por la policía ✦ ꒷꒦\n\n¡${name} ha sido detenido!\n\n╭★────★────★────★╮\n│ 💸 Multa: -${fine} 💶 UC\n│ ୭ ˚. ᵎᵎ ❌ Mejor suerte la próxima vez\n╰★────★────★╯`,
robPartial: ({ amount, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💸 ୭ *ROBO PARCIAL*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Casi exitoso ✦ ꒷꒦\n\nSolo robaste *${amount} 💶 UC*\nde @${target}\n\n╭★────★────★────★╮\n│ 💰 +${amount} 💶 UC\n│ ୭ ˚. ᵎᵎ ⚠️ A tu saldo\n╰★────★────★╯`,
robButtonRetry: () => "🔄 Reintentar",
robButtonWallet: () => "💰 Cartera",
withdrawNoAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Ingresa la cantidad\n  ━━✫ de 💶 UnityCoins a retirar\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawNoFunds: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 No tienes 💶 UnityCoins\n  ━━✫ en tu cuenta bancaria\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawInvalidAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Cantidad no válida\n  ━━✫ Usa un número válido\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawMinAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Ingresa al menos 1 UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawInsufficientFunds: ({ bank }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Solo tienes *${bank}* 💶 en la cuenta\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawSuccess: ({ count, bank }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ✅ ୭ *RETIRO REALIZADO*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Has retirado ✦ ꒷꒦\n\n💶 *${count} UnityCoins*\nde tu cuenta bancaria\n\n💳 Nuevo saldo banco: *${bank} UC*\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 💼\n│ Usa .cartera para verificar\n╰★────★────★╯`,
  xpLevelDisplay: ({ level }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧  Nivel: ${level}`,
  xpProgressDisplay: ({ current, needed }) => `Progreso XP: ${current} / ${needed}`,
  xpFooterText: () => "╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐ ¡Sigue escribiendo para subir de nivel!",
  xpCaption: ({ user, level, exp, next }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧\n\n┊ 『 📊 』 Perfil XP de ${user}\n\n┃ Nivel actual: ${level}\n┃ Experiencia total: ${exp}\n┃ XP faltantes para siguiente nivel: ${next}\n\n╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
rubaxpWait: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Debes esperar antes de poder robar de nuevo\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpWaitTime: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Debes esperar ${time} antes de poder robar de nuevo\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 📍 Debes etiquetar un usuario válido\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpUserNotFound: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Usuario no encontrado en la base de datos\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpTooPoor: ({ target, limit }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😢 @${target} tiene menos de *${limit} XP*\n  ━━✫ No robes a los pobres, sé amable\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpSuccess: ({ amount, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ✅ ୭ *ROBO EFECTUADO*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Has robado ✦ ꒷꒦\n\n💰 *${amount} XP*\nde @${target}\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎮\n│ ¡Sigue así!\n╰★────★────★╯`,
rubaxpTimeFormat: ({ hours, minutes, seconds }) => `${hours} Hora(s) ${minutes} Minuto(s) ${seconds} Segundo(s)`,darxpNoMention: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Debes mencionar un usuario con @usuario\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpNoAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Ingresa la cantidad de 💫 XP a transferir\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpInvalidAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Ingresa solo números válidos\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpMinAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 El mínimo transferible es 1 💫 XP\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpInsufficientXP: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 No tienes suficiente 💫 XP para transferir\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpSuccess: ({ xp, tassa }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n  ୧ ✅ ୭ *TRANSFERENCIA EFECTUADA*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Has transferido ✦ ꒷꒦\n\n💫 *${xp} XP*\n(tasa: ${tassa} XP)\n╭★────★────★────★╮\n│ ¡Sigue jugando!\n╰★────★────★╯`,
marry_no_target: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Debes mencionar un usuario para casarte
  ━━✫ Usa: ${prefix + command} @usuario
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_self: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 No puedes casarte contigo mismo
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_user_not_found: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Usuario no encontrado en la base de datos
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_already_married_sender: ({ spouse }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💍 ୭ *YA ESTÁS CASADO*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ Consta casado con ✦ ꒷꒦

❤ ${spouse}

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
marry_already_married_target: ({ target }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 ${target} ya está casado
  ━━✫ Busca a alguien más soltero
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_pending_proposal: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Ya tienes una propuesta de matrimonio pendiente
  ━━✫ Espera a que sea aceptada o rechazada
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_proposal_text: ({ sender, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💍 ୭ *PROPUESTA DE MATRIMONIO*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ ${sender} ha pedido la mano de ✦ ꒷꒦

❤ ${target}

Responde con "Sí" para aceptar
o "No" para rechazar.

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
marry_proposal_expired: ({ sender, target }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⏳ La propuesta entre ${sender} y ${target}
  ━━✫ ha expirado por inactividad
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_proposal_rejected: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 💔 La propuesta ha sido rechazada
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_user_not_found_db: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Error: usuarios no encontrados en la base de datos
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_success: ({ sender, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💍 ୭ *MATRIMONIO REGISTRADO*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ Nueva pareja oficial ✦ ꒷꒦

❤ ${sender}  ×  ${target}

꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧
¡Que comience el amor!

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
divorce_not_married: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 No estás casado con nadie
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
divorce_spouse_not_found: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Tu cónyuge no fue encontrado en la base de datos
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
divorce_success: ({ ex }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💔 ୭ *DIVORCIO COMPLETADO*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ Te has separado de ✦ ꒷꒦

${ex}

· ୨୧ · · ୨୧ ·  ♡
Nuevo capítulo de tu vida iniciado.

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
shipNoUser: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❗ Usa el comando así:
  ━━✫ ${prefix + command} @usuario
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
shipNoUsersPair: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❗ Usa el comando así:
  ━━✫ ${prefix + command} @usuario1 [@usuario2]
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
shipInvalidUsers: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❌ Usuarios no válidos
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
shipCaption: ({ user1, user2, percent }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

💘 *@${user1}* ❤️ *@${user2}*
🔮 Compatibilidad: *${percent}%*

· ୨୧ · · ୨୧ ·  ♡`,
shipErrorImage: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❌ Error durante la generación de la imagen
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
kissNoTargetMention: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 💋 Debes mencionar a alguien o responder a un mensaje
  ━━✫ Ejemplo: ${prefix + command} @usuario
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
kissNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 💋 Debes mencionar a alguien para besarlo
  ━━✫ Ejemplo: .besa @usuario
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
kissSuccess: ({ senderName, targetName }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💋 ୭ *Beso entregado*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ ${senderName} ha dado un beso a ✦ ꒷꒦

😘 ${targetName}

· ୨୧ · · ୨୧ ·  ♡`,
odioNoText: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 😡 Debes especificar a alguien
  ━━✫ Ejemplo: ${prefix + command} @usuario
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
odioResult: ({ target, percent }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 😡 ୭ *CALCULADORA DE ODIO*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ Nivel de odio entre ✦ ꒷꒦

${target}  ✕  tú

🔥 Odio: *${percent}%*

꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧`,
rizzNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 Debes etiquetar a alguien o responder a un mensaje
  ━━✫ Ejemplo: ${prefix + command} @usuario
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rizzSuccess: ({ target, line }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ ✨ ୭ *Movida de Rizz*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ @${target} mira esto ✦ ꒷꒦

“${line}”

· ୨୧ · · ୨୧ ·  ♡`,
minacciaNoGroup: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Este comando solo puede usarse en grupos
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
minacciaDisabled: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Las amenazas están desactivadas en este grupo
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
minacciaNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 Debes especificar a quién amenazar
  ━━✫ Etiqueta un usuario o responde a un mensaje
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
minacciaText: ({ target, line }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

@${target} ${line}

· ୨୧ · · ୨୧ ·  ♡`,
zizzaniaNoGroup: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Este comando solo puede usarse en grupos
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
zizzaniaDisabled: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 La cizaña está desactivada en este grupo
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
zizzaniaText: ({ a, line, b }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

@${a} ${line} @${b}

· ୨୧ · · ୨୧ ·  ♡`,
ditalinoNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 Debes etiquetar a alguien o responder a un mensaje
  ━━✫ Ejemplo: ${prefix + command} @usuario
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
ditalinoStart: ({ target }) => `🤟🏻 Inicio una serie de caricias especiales para *${target}*...`,
ditalinoMiddle: () => "🤟🏻 Ya casi estamos...",
ditalinoEnd: () => "👋🏻 ¡Cubranse de la cascada!!",
ditalinoResult: ({ target, time }) => `✨ *${target}* explotó de placer después de *${time}ms* 🥵`,
segaNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 Debes etiquetar a alguien o responder a un mensaje
  ━━✫ Ejemplo: ${prefix + command} @usuario
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
segaStart: ({ target }) => `Ahora nos ocupamos de ${target}... 😏`,
segaFrame: ({ frame }) => `${frame}`,
segaEnd: ({ target }) => `¡Oh ${target} ha llegado al máximo placer! 😋💦`,
insultNoGroup: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Este comando solo puede usarse en grupos
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
insultDisabled: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Los insultos están desactivados en este grupo
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
insultNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 ¿A quién quieres insultar?
  ━━✫ Etiqueta a alguien o responde a un mensaje
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
insultBotLines: () => [
  `¡Oh no! ¡Has descubierto mi punto débil: los insultos! ¿Cómo podré recuperarme?`,
  `Ah, el arte de insultar a un bot. ¡Un verdadero maestro de la ironía eres!`,
  `¡Increíble! Un ser humano que insulta a un bot. ¡Giro épico!`,
  `Realmente me has herido con tu habilidad para insultar a un bot. ¡Bravo!`,
  `Tu destreza al insultar a un bot es mi fuente de entretenimiento favorita.`,
  `Insultas a un bot: ¿gran inteligencia o gran aburrimiento?`,
  `Tu maestría en los insultos a bots podría dar clases.`,
  `Pareces el Picasso de los insultos a bots, una verdadera obra maestra.`,
  `Los insultos a bots son tu talento oculto. ¿Carrera en el cabaret digital en camino?`,
  `La audacia de insultar a una entidad sin emociones. ¡Premio a la originalidad!`
],
insultUserText: ({ target, line }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

@${target} ${line}

· ୨୧ · · ୨୧ ·  ♡`,
friendNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⚠️ Etiqueta a la persona a la que quieres enviar la solicitud de amistad
  ━━✫ Ejemplo: ${prefix}${command} @etiqueta
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
friendSelf: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❌ No puedes agregarte a ti mismə a los amigos
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
friendUserNotFound: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚫 Persona no presente en el sistema
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
friendAlready: ({ target }) => `✅ @${target} ya está entre tus amigos.`,
friendPending: () => `⚠️ Ya hay una solicitud de amistad en curso.\nEspera una respuesta o la cancelación.`,
friendRequestText: ({ target, from }) => `👥 Solicitud de amistad en curso...

@${target}, ¿quieres aceptar la amistad de @${from}?

> ⏳ Tienes 60 segundos para elegir.`,
friendTimeout: ({ from, target }) => `⏳ Solicitud de amistad cancelada
> @${from} y @${target} no respondieron dentro del tiempo límite.`,
friendRejected: () => `❌ Solicitud de amistad rechazada.`,
friendAccepted: ({ from }) => `👥 ¡Ahora tú y @${from} sois amigos!`,
removeFriendNoTarget: () => `⚠️ Etiqueta a la persona que quieres eliminar de tus amigos.`,
removeFriendNotInList: ({ target }) => `🚫 @${target} no está entre tus amigos.`,
removeFriendSuccess: ({ target }) => `🚫 Tú y @${target} ya no sois amigos.`,
friendsNoData: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⚠️ No se encontraron datos de usuario
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
friendsTitle: ({ name }) => `📜 Lista de Amigos de ${name}`,
friendsLastNone: () => `👤 Último amigo: Nadie`,
friendsLastSome: ({ last }) => `👤 Último amigo: @${last}`,
friendsListHeader: () => `👥 Lista completa:`,
friendsListEmpty: () => `│   Nadie, felicidades lobo solitario`,
friendsError: () => `❌ Se ha producido un error durante la ejecución del comando.`,
lesbicaCalcNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⚠️ Debes mencionar a alguien o responder a un mensaje
  ━━✫ Ejemplo: ${prefix + command} @usuario
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
lesbicaCalcLine1: ({ tag, percentage }) => `@${tag} es ${percentage}% lesbiana, el resto es solo confusión hormonal.`,
lesbicaCalcLine2: ({ tag, percentage }) => `Prueba completada: @${tag} tiene el cerebro cableado para las mujeres al ${percentage}%.`,
lesbicaCalcLine3: ({ tag, percentage }) => `💕 @${tag} mira a las mujeres con la intensidad del ${percentage}% porno en 4K.`,
pajeroCalcLine1: ({ tag, percentage }) => `@${tag} es ${percentage}% pajero, el ${100 - percentage}% restante lo pasa buscando más porno.`,
pajeroCalcLine2: ({ tag, percentage }) => `Informe médico: @${tag} es ${percentage}% esclavo de su propio pene.`,
pajeroCalcLine3: ({ tag, percentage }) => `🍆 @${tag} piensa en pajarearse el ${percentage}% del tiempo, el resto lo pasa limpiándose.`,
puttanaCalcLine1: ({ tag, percentage }) => `@${tag} es ${percentage}% puta, el taxímetro nunca se apaga.`,
puttanaCalcLine2: ({ tag, percentage }) => `Análisis detallado: @${tag} tiene la lista de precios abierta al ${percentage}% 24/7.`,
puttanaCalcLine3: ({ tag, percentage }) => `💰 @${tag} tiene el descuento de puta del ${percentage}%, apresúrense antes de que aumente.`,
genericCalcLine: ({ tag, percentage, cmd }) => `@${tag} es ${percentage}% ${cmd}, el resto es solo vergüenza acumulada.`,
downCalcNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚨 ETIQUETA A ALGUIEN, GENIO
  ━━✫ Ejemplo: ${prefix}${command} @nombre
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
downCalcLine: ({ name, cmd, percent, frase, verdict }) => `*⚡️ VEREDICTO FINAL ⚡️*

*Sujeto:* ${name}
*Nivel de "${cmd}":* ${percent}%

*Diagnóstico:* ${frase}

*Pronóstico:* ${verdict}`,
downCalcPhrases: () => [
  "Es tan inútil que incluso la papelera de reciclaje lo rechaza.",
  "Si la evolución funcionara bien, tú seguirías siendo una célula única en el barro.",
  "Tienes la profundidad emocional de un charco y la inteligencia de una piedra mojada.",
  "Si el cerebro quemara calorías, tú engordarías incluso mientras duermes.",
  "Cuando hablas, cada neurona del planeta guarda un minuto de silencio por respeto.",
  "Si la idiotez fuera energía renovable, solo tú bastarías para iluminar Europa.",
  "Tienes la misma utilidad que un paraguas agujereado en un huracán.",
  "Si fueras un bug, ni los desarrolladores perderían tiempo en arreglarte.",
  "Tu contribución al mundo es comparable a la de una colilla apagada en un charco.",
  "Tienes la coordinación mental de una paloma borracha en una autopista."
],
downCalcVerdicts: ({ percent }) => {
  if (percent > 90) return "🔴 CASO CLÍNICO IRRECUPERABLE. La humanidad pide oficialmente el reembolso.";
  if (percent > 70) return "🟠 PELIGRO BIOLÓGICO. Prohibido reproducirlo sin permiso escrito de la OMS.";
  if (percent > 40) return "🟡 DEFECTO DE FÁBRICA. Usar solo como ejemplo en cursos de qué NO ser.";
  return "🟢 ANOMALÍA ESTADÍSTICA. Quizás haya un cerebro... en algún lugar, bajo todo ese vacío.";
},
alcolNoText: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🍷 Ningún nombre especificado, usaré el tuyo
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
alcolHigh: () => "🍾 Estás tan lleno que incluso el hígado ha pedido la jubilación anticipada.",
alcolMid: () => "🥂 Bebes como si el mañana no existiera, pero el mañana te pasa la factura.",
alcolLow: () => "🚰 Totalmente sobrio, lo único que gira es tu tristeza.",
alcolResult: ({ target, percent, phrase }) => `『💬』 ══ •⊰✰⊱• ══ 『💬』

¡MOMENTO DE LA PRUEBA DE ALCOHOLEMIA! 🍷
━━━━━━━━━━━━━━
¡${target} tiene una tasa de alcohol en sangre del ${percent}%! 🍷
『💬』 ══ •⊰✰⊱• ══ 『💬』

${phrase}`,
drugNoText: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🌿 Ningún nombre especificado, usaré el tuyo
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
drugHigh: () => "🌿 Tan drogado que si respira fuerte intoxica el barrio.",
drugMid: () => "🌿 No sabe esnifar, pero le pone tanto empeño que acabará en los manuales médicos.",
drugLow: () => "🌿 Un ejemplo a seguir... en este grupo es casi una criatura mitológica.",
drugResult: ({ target, percent, phrase }) => `『💬』 ══ •⊰✰⊱• ══ 『💬』

¡MOMENTO DE LA PRUEBA DE DROGAS! 🌿
━━━━━━━━━━━━━━
¡${target} tiene una tasa de sustancias en sangre del ${percent}%! 🌿
『💬』 ══ •⊰✰⊱• ══ 『💬』

${phrase}`,
raceCalcNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⚠️ Debes etiquetar a alguien o responder a un mensaje
  ━━✫ Ejemplo: ${prefix + command} @usuario
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
raceCalcLine: ({ tag, percent, label }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

@${tag} es ⚫ ${percent}% ${label}

· ୨୧ · · ୨୧ ·  ♡`,
cornutoNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🤔 Falta el nombre del cornudo/a
  ━━✫ Usa: .cornudo @nombre o responde a un mensaje
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cornutoSpecialText: () => `🤣 *¡BUENO, AQUÍ ESTÁ EL REY DE LOS CUERNOS!* 🤣
Se dice que si se quita los cuernos le sirven de antena 5G📡💀`,
cornutoLow: () => "🛡 Todo tranquilo... por ahora. Pero vigila igual el teléfono de tu pareja.",
cornutoMid: () => "😬 Algún chat archivado de más… la sospecha está en el aire.",
cornutoHigh: () => "👀 ¡Cornómetro en alerta máxima! Los cuernos están cargando al 78%.",
cornutoMax: () => "🫣 NIVEL MUNDIAL: si abres Google Maps aparece un triángulo de cuernos sobre tu cabeza.",
cornutoAdviceHigh: () => "🔔 Consejo: no te des la vuelta… podrían usarlos como punto de apoyo. 🤣",
cornutoAdviceLow: () => "😌 Respira, por ahora estás en el limbo entre bendito y futuro miembro del club.",
cornutoResult: ({ target, percent, message, advice }) => `🔍 CALCULADORA DE CORNUDEZ 🔍

👤 ${target}
📈 Cornudez: ${percent}%
${message}

${advice}`,
}