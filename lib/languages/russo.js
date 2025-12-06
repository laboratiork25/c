export default {
  
  // Общая система
  smsAvisoMG: () => "⚠️ Внимание!",
  smsWait: () => "⏳ Загрузка...",
  smsError: () => "❌ Произошла ошибка",
  smsSuccess: () => "✅ Операция завершена успешно",
  smsProcessing: () => "🔄 Обработка...",
  
  // Общие команды
  smsOnlyGroup: () => "❌ Эта команда работает только в группах!",
  smsOnlyAdmin: () => "❌ Только администраторы могут использовать эту команду!",
  smsOnlyOwner: () => "❌ Только владелец может использовать эту команду!",
  smsOnlyPremium: () => "💎 Эта команда доступна только для премиум-пользователей!",
  smsInvalidCommand: () => "❌ Неверная команда",
  smsNoText: () => "❌ Введите текст",
  smsNoMedia: () => "❌ Отправьте или ответьте на медиа",
  
  // AI и ChatGPT
  aiNoQuery: () => "⚠️ *Введите корректный запрос для ChatGPT!*\n\n📌 Примеры:\n{prefix}{command} Расскажи анекдот\n{prefix}{command} Посоветуй 5 фэнтези книг\n{prefix}{command} HTML код для страницы с логином",
  aiError: () => "❌ Произошла ошибка при генерации ответа. Попробуйте позже.",
  aiProcessing: () => "🤖 Обрабатываю ваш запрос...",
  
  // Система приветствия/прощания
  welcomeTitle: () => "✧ ДОБРО ПОЖАЛОВАТЬ! ✧",
  goodbyeTitle: () => "✧ ПРОЩАЙ! ✧",
  welcomeDefault: (user, group, members) => `*Добро пожаловать* @${user} 🎉\n┊ *Группа:* ${group}\n╰► *Участники:* ${members}`,
  goodbyeDefault: (user, members) => `*До свидания* @${user} 👋\n┊ Покинул(а) группу\n╰► *Осталось участников:* ${members}`,
  
  welcomeSetHelp: () => `🎉 *Установить приветственное сообщение*

*Использование:* {command} <сообщение>

*Доступные переменные:*
• @user - Упоминание пользователя
• $nome - Имя пользователя  
• $gruppo - Название группы
• $membri - Количество участников
• $numero - Номер телефона
• $tag - Тег пользователя (аналог @user)

*Пример:*
{command} Привет @user! 👋 Добро пожаловать в $gruppo! Теперь нас $membri участников! 🎉

*Чтобы восстановить сообщение по умолчанию:*
{command} reset`,
  
  goodbyeSetHelp: () => `👋 *Установить прощальное сообщение*

*Использование:* {command} <сообщение>

*Доступные переменные:*
• @user - Упоминание пользователя
• $nome - Имя пользователя  
• $gruppo - Название группы
• $membri - Количество участников
• $numero - Номер телефона
• $tag - Тег пользователя (аналог @user)

*Пример:*
{command} Пока @user! 😢 Мы будем скучать по тебе в $gruppo. Осталось $membri участников.

*Чтобы восстановить сообщение по умолчанию:*
{command} reset`,
  
  // Система предупреждений
  warnMentionUser: () => "❌ Нужно упомянуть пользователя или ответить на его сообщение.",
  warnBotImmune: () => "🚫 Нельзя предупредить бота.",
  warnUserNotFound: () => "❌ Пользователь не найден в базе данных.",
  warnMessage: (params) => `⚠️ ПРЕДУПРЕЖДЕНИЕ {warns}/3 (3 предупреждения=бан)`,
  warnBanMessage: () => "⛔ ПОЛЬЗОВАТЕЛЬ УДАЛЕН ПОСЛЕ 3 ПРЕДУПРЕЖДЕНИЙ",
  
  menuownerChooseMenu: () => "Выберите меню:",
menuownerMainMenuButton: () => "🏠 Главное меню",
menuownerAdminMenuButton: () => "🛡️ Меню админа",
menuownerSecurityMenuButton: () => "🚨 Меню безопасности",
menuownerGroupMenuButton: () => "👥 Меню группы",
menuownerAiMenuButton: () => "🤖 Меню ИИ",
menuownerTitle: () => "МЕНЮ ВЛАДЕЛЬЦА",
menuownerVersionLabel: () => "ВЕРСИЯ",
menuownerCollabLabel: () => "СОТРУДНИЧЕСТВО",
menuownerSupportLabel: () => "ПОДДЕРЖКА",
menuownerReservedCommands: () => "КОМАНДЫ, ЗАРЕЗЕРВИРОВАННЫЕ ДЛЯ ВЛАДЕЛЬЦА",
menuownerManageCommand: () => "управлять",
menuownerSetGroupsCommand: () => "установитьгруппы",
menuownerAddGroupsCommand: () => "добавитьгруппы",
menuownerResetGroupsCommand: () => "сброситьгруппы",
menuownerBanUserCommand: () => "забанитьпользователя",
menuownerUnbanUserCommand: () => "разбанитьпользователя",
menuownerCleanupCommand: () => "очистка",
menuownerGetFileCommand: () => "получитьфайл",
menuownerSaveCommand: () => "сохранитьплагин",
menuownerDpCommand: () => "удалитьплагин",
menuownerGetPluginCommand: () => "получитьплагин",
menuownerJoinCommand: () => "вступить",
menuownerOutCommand: () => "выйти",
menuownerPrefixCommand: () => "префикс",
menuownerResetPrefixCommand: () => "сброситьпрефикс",
menuownerGodModeCommand: () => "режимбога",
menuownerResetCommand: () => "сбросить",
menuownerAddCommand: () => "добавить",
menuownerRemoveCommand: () => "удалить",
menuownerEveryGroupCommand: () => "всегруппы",
menuownerBanChatCommand: () => "забанитьчат",
menuownerUnbanChatCommand: () => "разбанитьчат",
menuownerRestartCommand: () => "перезапустить",
menuownerShutdownBotCommand: () => "выключитьбота",
menuownerUpdateBotCommand: () => "обновитьбота",
menuownerPluginParam: () => "плагин",
menuownerLinkParam: () => "ссылка",
menuownerAutoAdminParam: () => "автоадмин",
menuownerNumMessagesParam: () => "кол-во сообщений",
menuownerCommandParam: () => "команда",
menuownerGroupParam: () => "группа",

  // Система меню
  mainMenuTitle: () => 'ГЛАВНОЕ МЕНЮ',
  adminMenuTitle: () => 'МЕНЮ АДМИНИСТРАТОРА',
  adminCommands: () => 'КОМАНДЫ АДМИНИСТРАТОРА',
  chooseMenu: () => 'Выберите меню:',
  mainMenuButton: () => '🏠 Главное меню',
  ownerMenuButton: () => '👑 Меню владельца',
  securityMenuButton: () => '🚨 Меню безопасности',
  groupMenuButton: () => '👥 Меню группы',
  aiMenuButton: () => '🤖 Меню ИИ',
  promoteCommand: () => 'повысить / сделатьадмином',
  demoteCommand: () => 'понизить / убратьадмина',
  warnCommands: () => 'предупредить / снятьпредупреждение',
  muteCommands: () => 'замутить / размутить',
  setDescCommand: () => 'установитьописание',
  setScheduleCommand: () => 'установитьвремя',
  setNameCommand: () => 'установитьназвание',
  hidetagCommand: () => 'скрытаяметка',
  kickCommand: () => 'кик / удалить',
  adminsCommand: () => 'админы',
  tagallCommand: () => 'меткавсех',
  openCloseCommand: () => 'открыть / закрыть',
  setWelcomeCommand: () => 'установитьприветствие',
  setByeCommand: () => 'установитьпрощание',
  inactiveCommand: () => 'неактивные',
  listNumCommand: () => 'списокномеров + префикс',
  cleanupCommand: () => 'очистка + префикс',
  clearPlayCommand: () => 'очиститьплейлист',
  rulesCommand: () => 'правила/установитьправила',
  quarantineCommand: () => 'карантин',
  dsCommand: () => 'дс',
  listWarnCommand: () => 'списокпредупреждений',
  linkCommand: () => 'ссылка',
  linkQrCommand: () => 'ссылкаqr',
  poweredBy: () => 'РАБОТАЕТ НА',
  
  // Меню группы
  groupMenuTitle: () => 'МЕНЮ ГРУППЫ',
  memberCommands: () => 'КОМАНДЫ ДЛЯ УЧАСТНИКОВ',
  musicAudioSection: () => 'МУЗЫКА & АУДИО',
  infoUtilitySection: () => 'ИНФОРМАЦИЯ & УТИЛИТЫ',
  imageEditSection: () => 'ИЗОБРАЖЕНИЯ & РЕДАКТИРОВАНИЕ',
  pokemonSection: () => 'ПОКЕМОН',
  gangSystemSection: () => 'СИСТЕМА БАНД',
  gamesCasinoSection: () => 'ИГРЫ & КАЗИНО',
  economyRankingSection: () => 'ЭКОНОМИКА & РЕЙТИНГИ',
  socialInteractionSection: () => 'СОЦИАЛЬНЫЕ ВЗАИМОДЕЙСТВИЯ',
  howMuchSection: () => 'СКОЛЬКО ЭТО?',
  personalityTestSection: () => 'ТЕСТ ЛИЧНОСТИ',
  songCommand: () => 'песня',
  audioCommand: () => 'аудио',
  videoCommand: () => 'видео',
  artistTitleCommand: () => 'исполнитель-название',
  cityCommand: () => 'город',
  textCommand: () => 'текст',
  groupCommand: () => 'группа',
  repoCommand: () => 'репозиторий',
  userCommand: () => 'пользователь',
  topicCommand: () => 'тема',
  checkSiteCommand: () => 'проверитьсайт',
  photoToStickerCommand: () => 'фото в стикер',
  stickerToPhotoCommand: () => 'стикер в фото',
  improveQualityCommand: () => 'улучшить качество фото',
  photoCommand: () => 'фото',
  hiddenPhotoCommand: () => 'скрытое фото',
  memeCommand: () => 'мем',
  fromStickerCommand: () => 'из стикера',
  blurImageCommand: () => 'размыть изображение',
  comingSoonCommand: () => 'скоро',
  quantityCommand: () => 'количество',
  headsOrTailsCommand: () => 'орел или решка',
  mathProblemCommand: () => 'математическая задача',
  rockPaperScissorsCommand: () => 'камень ножницы бумага',
  pokemonInfoCommand: () => 'инфо Покемон',
  balanceCommand: () => 'баланс',
  topUsersCommand: () => 'топ пользователей',
  buyUCCommand: () => 'купить UC',
  withdrawUCCommand: () => 'UC из банка',
  earnXPCommand: () => 'заработать XP',
  proposalCommand: () => 'предложение',
  endRelationshipCommand: () => 'закончить отношения',
  affinityCommand: () => 'сходство',
  charmCommand: () => 'очарование',
  createFightCommand: () => 'создать споры',
  truthOrDareCommand: () => 'правда или действие',
  versionLabel: () => 'ВЕРСИЯ',
  supportLabel: () => 'ПОДДЕРЖКА',
  
  // Меню владельца
  ownerMenuTitle: () => 'МЕНЮ ВЛАДЕЛЬЦА',
  ownerReservedCommands: () => 'КОМАНДЫ, ЗАРЕЗЕРВИРОВАННЫЕ ДЛЯ ВЛАДЕЛЬЦА',
  setNameCommand: () => 'установитьназвание',
  resetNameCommand: () => 'сброситьназвание',
  manageCommand: () => 'управлять',
  setGroupsCommand: () => 'установитьгруппы',
  addGroupsCommand: () => 'добавитьгруппы',
  resetGroupsCommand: () => 'сброситьгруппы',
  setPpCommand: () => 'установитьобложку',
  banUserCommand: () => 'забанитьпользователя',
  unbanUserCommand: () => 'разбанитьпользователя',
  blockUserCommand: () => 'заблокироватьпользователя',
  unblockUserCommand: () => 'разблокироватьпользователя',
  getFileCommand: () => 'получитьфайл',
  saveCommand: () => 'сохранить',
  dpCommand: () => 'удалитьплагин',
  getPluginCommand: () => 'получитьплагин',
  joinCommand: () => 'вступить',
  outCommand: () => 'выйти',
  prefixCommand: () => 'префикс',
  resetPrefixCommand: () => 'сброситьпрефикс',
  godModeCommand: () => 'режимбога',
  resetCommand: () => 'сбросить',
  addCommand: () => 'добавить',
  removeCommand: () => 'удалить',
  everyGroupCommand: () => 'всегруппы',
  banChatCommand: () => 'забанитьчат',
  unbanChatCommand: () => 'разбанитьчат',
  restartCommand: () => 'перезапустить',
  shutdownBotCommand: () => 'выключитьбота',
  updateBotCommand: () => 'обновитьбота',
  imageParam: () => 'изображение',
  pluginParam: () => 'плагин',
  linkParam: () => 'ссылка',
  autoAdminParam: () => 'автоадмин',
  numMessagesParam: () => 'кол-во сообщений',
  commandParam: () => 'команда',
  groupParam: () => 'группа',
  
  // Меню ИИ
  aiMenuTitle: () => 'МЕНЮ БОТА',
  generalCommands: () => 'ОБЩИЕ КОМАНДЫ',
  iaCommand: () => 'ии',
  alyaCommand: () => 'Alya',
  geminiCommand: () => 'gemini',
  chatgptCommand: () => 'chatgpt',
  deepseekCommand: () => 'deepseek',
  voiceCommand: () => 'голосовое',
  imageCommand: () => 'изображение',
  image2Command: () => 'изображение2',
  image3Command: () => 'изображение3',
  animalInfoCommand: () => 'инфоживотное',
  kcalCommand: () => 'ккал',
  summaryCommand: () => 'резюме',
  recipeCommand: () => 'рецепт',
  
  // Меню безопасности
  securityMenuTitle: () => 'МЕНЮ ФУНКЦИЙ',
  activateDisable: () => 'ВКЛЮЧИТЬ/ВЫКЛЮЧИТЬ',
  howToUse: () => 'КАК ИСПОЛЬЗОВАТЬ',
  activateFunction: () => 'включить [функция]',
  disableFunction: () => 'выключить [функция]',

// Плагин Ping/Status
systemStatusTitle: () => "⋆ ★ 🚀 СТАТУС СИСТЕМЫ 🚀 ★ ⋆",
uptime: () => "⌛ *Аптайм:*",
ping: () => "⚡ *Пинг:*",
cpuLabel: () => "💻 *CPU:*",
cpuUsage: () => "🔋 *Использование:*",
ramLabel: () => "💾 *ОЗУ:*",
freeRam: () => "🟢 *Свободно:*",
version: () => "Версия:",

systemStatus: (params) => `${params?.title || '⋆ ★ 🚀 СТАТУС СИСТЕМЫ 🚀 ★ ⋆'}
╭♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩
୧ ⌛ *Аптайм:* ${params?.uptime || 'Н/Д'}
୧ ⚡ *Пинг:* ${params?.ping || 'Н/Д'} мс
  💻 *CPU:* ${params?.cpuModel || 'Неизвестно'}
  🔋 *Использование:* ${params?.cpuSpeed || 'Н/Д'} МГц
  💾 *ОЗУ:* ${params?.ramUsed || 'Н/Д'} / ${params?.ramTotal || 'Н/Д'}
  🟢 *Свободно:* ${params?.ramFree || 'Н/Д'}
╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩`,

menuFooter: () => "Выберите меню:",
menuAdmin: () => "🛡️ Меню админа",
menuOwner: () => "👑 Меню владельца",
menuSecurity: () => "🚨 Меню безопасности",
menuGroup: () => "👥 Меню группы",
menuAI: () => "🤖 Меню ИИ",
mainMenuTitle: () => "МЕНЮ БОТА",
staffCommand: () => "персонал",
candidatesCommand: () => "кандидаты",
installCommand: () => "установить",
guideCommand: () => "руководство",
channelsCommand: () => "каналы",
systemCommand: () => "система",
faqCommand: () => "ЧАВО",
pingCommand: () => "пинг",
reportCommand: () => "сообщить",
suggestCommand: () => "предложить",
newsCommand: () => "новости",
versionLabel: () => "ВЕРСИЯ",
usersLabel: () => "ПОЛЬЗОВАТЕЛИ",
chooseMenu: () => "Выберите меню:",
mainMenuButton: () => "🏠 Главное меню",
ownerMenuButton: () => "👑 Меню владельца",
securityMenuButton: () => "🚨 Меню безопасности",
groupMenuButton: () => "👥 Меню группы",
aiMenuButton: () => "🤖 Меню ИИ",
adminMenuTitle: () => "МЕНЮ АДМИНИСТРАТОРА",
promoteCommand: () => "п /сделатьадмином",
demoteCommand: () => "р /убратьадмина",
warnCommands: () => "предупредить / снятьпредупреждение",
setScheduleCommand: () => "установитьвремя",
setNameCommand: () => "установитьназвание",
hidetagCommand: () => "скрытаяметка",
tagallCommand: () => "меткавсех",
kickCommand: () => "кик / удалить",
adminsCommand: () => "админы",
openCloseCommand: () => "открыть / закрыть",
setWelcomeCommand: () => "установитьприветствие",
setByeCommand: () => "установитьпрощание",
inactiveCommand: () => "неактивные",
listNumCommand: () => "списокномеров + префикс",
cleanupCommand: () => "очистка + префикс",
rulesCommand: () => "правила /установитьправила",
listWarnCommand: () => "списокпредупреждений",
linkCommand: () => "ссылка",
linkQrCommand: () => "ссылкаqr",
requestsCommand: () => "запросы",
adminCommands: () => "КОМАНДЫ АДМИНИСТРАТОРА",
poweredBy: () => "РАБОТАЕТ НА",
candidatesTitle: () => "🚀 ПРИСОЕДИНЯЙТЕСЬ К ПЕРСОНАЛУ CHATUNITY 🚀",
candidatesIntro: () => "Хотите стать частью персонала ChatUnity, получить опыт и быть признанным членом команды?",
candidatesCall: () => "Это ваш шанс! Заполните форму (остается анонимной) чтобы подать заявку и показать свои навыки.",
candidatesWhatAwaits: () => "🔥 Что вас ждет:",
candidatesBenefit1: () => "✨ Официальное признание в боте как официальный сотрудник",
candidatesBenefit2: () => "💼 Практический опыт в мире ботов и управления сообществом",
candidatesBenefit3: () => "🎯 Эксклюзивный доступ к бета-ботам и функциям в предварительном просмотре",
candidatesBenefit4: () => "🤝 Прямое сотрудничество с командой разработчиков ChatUnity",
candidatesCTA: () => "Не упустите эту уникальную возможность! Подайте заявку сразу и покажите, что у вас есть всё необходимое, чтобы изменить ситуацию!",
candidatesFormLabel: () => "📋 Форма заявки:",

installTitle: () => "⋆ ︵︵ ★ 💬 CHATUNITY-BOT 💬 ★ ︵︵ ⋆",
installIntro: () => "Хотите установить ChatUnity Bot на свое устройство?",
installDescription: () => "Следуйте полному руководству по установке на GitHub со всеми подробными шагами для Termux, Windows и других операционных систем.",
installGuideLabel: () => "📖 Полное руководство",
installRepoLabel: () => "📂 Репозиторий GitHub",
installVideoLabel: () => "🎥 Видеоурок",
installFeatures: () => "✨ Что вы найдете:",
installFeature1: () => "📱 Полная установка для Termux",
installFeature2: () => "💻 Установка для Windows и других ОС",
installFeature3: () => "🔧 Решение распространенных проблем",
installFeature4: () => "📝 Команды автоматической настройки",
installCTA: () => "Посетите репозиторий GitHub, чтобы начать установку и открыть для себя все функции бота!",
installNeedHelp: () => "Нужна помощь? Присоединяйтесь к нашему каналу поддержки!",

systemTitle: () => "⋆ ︵★ 🖥️ СОСТОЯНИЕ СИСТЕМЫ ★︵ ⋆",
systemHost: () => "🚩 *Хост*",
systemOS: () => "🏆 *Операционная система*",
systemArch: () => "💫 *Архитектура*",
systemTotalRAM: () => "🥷 *Всего ОЗУ*",
systemFreeRAM: () => "🚀 *Свободно ОЗУ*",
systemUsedRAM: () => "⌛ *Использовано ОЗУ*",
systemUptime: () => "🕒 *Аптайм*",
systemNodeMemory: () => "🪴 *Память Node.js:*",
systemRSS: () => "RSS",
systemHeapTotal: () => "Всего Heap",
systemHeapUsed: () => "Использовано Heap",
systemExternal: () => "Внешняя",
systemArrayBuffer: () => "ArrayBuffer",
systemDiskSpace: () => "☁️ *Место на диске:*",
systemDiskTotal: () => "Всего",
systemDiskUsed: () => "Использовано",
systemDiskAvailable: () => "Доступно",
systemDiskPercent: () => "Процент использования",
systemDiskError: () => "❌ Ошибка при получении места на диске.",

reportNoText: () => "⚠️ Введите подробное описание проблемы, которую вы хотите сообщить.",
reportTooShort: () => "⚠️ Описание слишком короткое. Укажите не менее 10 символов для полного отчета.",
reportTooLong: () => "⚠️ Описание превышает максимальный лимит в 1000 символов. Сократите текст.",
reportTitle: () => "❌️ `С О О Б Щ Е Н И Е` ❌️",
reportNumber: () => "📱 Номер",
reportUser: () => "👤 Пользователь",
reportMessage: () => "📝 Сообщение",
reportQuote: () => "📎 Цитата",
reportSuccess: () => "✅ Ваше сообщение успешно отправлено команде разработчиков.\n\n_⚠️ Внимание: ложные или неуместные сообщения могут привести к ограничениям в использовании бота._",
reportChannelTitle: () => "⚠️ СООБЩЕНИЕ ОБ ОШИБКЕ ⚠️",
reportChannelBody: () => "Получено новое сообщение",
reportAnonymous: () => "Анонимно",
suggestNoText: () => "⚠️ Введите ваше предложение команды.\n\n*Пример:* .предложить (название команды) (описание функциональности)",
suggestTooShort: () => "⚠️ Описание слишком короткое. Укажите не менее 10 символов для полного предложения.",
suggestTooLong: () => "⚠️ Описание превышает максимальный лимит в 1000 символов. Сократите текст.",
suggestTitle: () => "💡 `П Р Е Д Л О Ж Е Н И Е` 💡",
suggestNumber: () => "📱 Номер",
suggestUser: () => "👤 Пользователь",
suggestMessage: () => "📝 Предложение",
suggestQuote: () => "📎 Цитата",
suggestSuccess: () => "✅ Ваше предложение успешно отправлено команде разработчиков.\n\n_⚠️ Внимание: предложения незаконных или неуместных команд могут привести к ограничениям в использовании бота._",
suggestChannelTitle: () => "💡 ПРЕДЛОЖЕНИЕ КОМАНДЫ 💡",
suggestChannelBody: () => "Получено новое предложение",
suggestAnonymous: () => "Анонимно",
unwarnNoUser: () => "❌ Нужно упомянуть пользователя или ответить на его сообщение, чтобы снять предупреждение.",
unwarnUserNotFound: () => "❌ Пользователь не найден в базе данных.",
unwarnNoWarnings: () => "ℹ️ У этого пользователя нет активных предупреждений для снятия.",
unwarnSuccess: (params) => `✅ Предупреждение снято\n\nОставшиеся предупреждения: ${params?.remaining || 0}/3`,
setnameNoText: () => "⚠️ Введите новое название, которое вы хотите присвоить группе.",
setnameSuccess: () => "✅ Название группы успешно изменено!",
setnameError: () => "❌ Произошла ошибка при изменении названия группы. Попробуйте снова.",
hidetagDefaultMessage: () => "📢 Сообщение для всех",
hidetagStickerError: () => "❌ Не удалось загрузить стикер. Попробуйте снова.",
tagallTitle: () => "⋆ ︵︵ ★ 📢 УЧАСТНИКИ ГРУППЫ ★ ︵︵ ⋆",
tagallBot: () => "🤖 БОТ",
tagallMessage: () => "📝 Сообщение",
tagallEmptyMessage: () => "📢 Внимание участников группы!",
tagallMemberCount: (params) => `👥 Всего участников: ${params?.count || 0}`,
adminsCooldown: (params) => `⏳ Вы должны подождать еще ${params?.time || 'немного'} прежде чем снова вызывать админов.\n\n_У этой команды есть лимит использования для предотвращения злоупотреблений._`,
adminsTitle: () => "⋆︵★ 🔔 АДМИНИСТРАТОРЫ ★︵⋆",
adminsMessage: () => "📝 Причина вызова",
adminsWarning: () => "⚠️ Эта команда должна использоваться только для срочных проблем или важных ситуаций. Неправильное использование может привести к удалению из группы.",
adminsNoMessage: () => "Запрос помощи",
adminsNotification: () => "🔔 Администраторы уведомлены",
adminsExternalTitle: (params) => `${params?.groupName || 'Группа'}`,
adminsExternalBody: () => "Вызов администраторов...",
groupOpen: () => "✅ Чат открыт для всех\n\n୧ Все участники теперь могут отправлять сообщения в группе.",
groupClose: () => "🔒 Чат только для админов\n\n୧ Только администраторы могут отправлять сообщения в группе.",
setwelcomeNoText: () => "⚠️ Введите пользовательское приветственное сообщение, которое вы хотите настроить.\n\n*Доступные переменные:*\n୧ @user - Упоминание пользователя\n୧ @group - Название группы\n୧ @desc - Описание группы",
setwelcomeSuccess: () => "✅ Приветственное сообщение настроено\n\n୧ Приветственное сообщение успешно установлено для этой группы.",
setbyeNoText: () => "⚠️ Введите пользовательское прощальное сообщение, которое вы хотите настроить.\n\n*Доступные переменные:*\n୧ @user - Упоминание пользователя\n୧ @group - Название группы",
setbyeSuccess: () => "✅ Прощальное сообщение настроено\n\n୧ Прощальное сообщение успешно установлено для этой группы.",
inactiveMenuTitle: () => "🌙 Управление неактивными участниками",
inactiveMenuFound: (params) => `💤 Найдено неактивных участников: *${params?.inactive || 0}/${params?.total || 0}*\n\n⏰ Неактивны более 7 дней\n\nВыберите опцию ниже:`,
inactiveListTitle: () => "📋 Список неактивных участников",
inactiveListNone: () => "✅ Неактивных участников не найдено!\n\n🎉 Все участники активны в группе.",
inactiveListItem: (params) => `${params?.index}. @${params?.user}`,
inactiveRemoveStart: (params) => `⚠️ Удаление неактивных: вы собираетесь удалить *${params?.count}* участников.\n\n❗ Это действие нельзя отменить!\n\nПодтверждаете продолжение?`,
inactiveRemoveSuccess: (params) => `✅ Удаление завершено!\n\n🗑️ Удалено участников: *${params?.removed}*${params?.errors ? `\n⚠️ Ошибки: *${params.errors}* участников не удалено` : ''}`,
inactiveRemoveNone: () => "✅ Нечего удалять! Все участники группы активны.",
inactiveConfirmTitle: () => "⚠️ Подтверждение удаления",
inactiveBackButton: () => "🔄 Назад в меню",
inactiveListButton: () => "📋 Просмотреть список",
inactiveRemoveButton: () => "🗑️ Удалить неактивных",
inactiveConfirmButton: () => "✅ Подтвердить удаление",
inactiveCancelButton: () => "❌ Отмена",
inactiveNotAdmin: () => "❌ Только *админы* могут использовать эту функцию.",
inactiveUnknown: () => "❌ Неверная опция. Используйте кнопки.",
inactiveResultTitle: () => "📊 Результат удаления неактивных",
inactiveGroupLabel: () => "👥 Группа",
inactiveFooter: () => "Управление неактивными группы",
noBotAdmin: () => "⚠️ Я должен быть админом для удаления пользователей",
  noMention: () => "⚠️ Упомяните или ответьте на сообщение человека для удаления",
  cannotRemoveOwner: () => "⚠️ Вы не можете удалить создателя бота",
  cannotRemoveBot: () => "⚠️ Вы не можете удалить самого бота",
  cannotRemoveSelf: () => "⚠️ Вы не можете удалить себя",
  targetIsGroupOwner: () => "⚠️ Вы не можете удалить создателя группы",
  targetIsAdmin: () => "⚠️ Вы не можете удалить админа группы",
  kickSuccess: (params) => `╭─────────────────\n│ ✦ @${params?.target} был удален\n│ ✦ от @${params?.executor}${params?.reason ? `\n│\n│ 📝 Причина: ${params.reason}` : ''}\n╰─────────────────`,
  title: () => "⚠️ Предупрежденные пользователи",
totalUsers: (params) => `Всего: ${params?.count || 0} пользователей`,
userEntry: (params) => `${params?.index}. ${params?.name || 'Неизвестно'} (${params?.warns}/3)`,
noWarns: () => "✓ Ни один пользователь не получил предупреждений",
unknownUser: () => "Неизвестно",
noBotAdmin: () => "⚠️ Я должен быть админом для получения ссылки группы",
qrCaption: (params) => `╭─────────────────\n│ 🔗 QR-код группы\n│ *${params?.groupName}*\n│\n│ Отсканируйте чтобы присоединиться\n╰─────────────────`,
qrError: () => "❌ Ошибка при генерации QR-кода",
noBotAdmin: () => "⚠️ Я должен быть админом для управления запросами",
noAdmin: () => "⚠️ Только админы группы могут использовать эту команду",
noPending: () => "✓ Нет ожидающих запросов",
pendingCount: (params) => `╭─────────────────\n│ 📨 Ожидающие запросы: ${params?.count}\n│\n│ Выберите опцию\n╰─────────────────`,
menuFooter: () => "Управление запросами группы",
buttonAcceptAll: () => "✅ Принять все",
buttonRejectAll: () => "❌ Отклонить все",
buttonAccept39: () => "🇮🇹 Принять +39",
buttonManage: () => "📥 Управлять запросами",
acceptedSuccess: (params) => `✅ Принято ${params?.count} запросов`,
rejectedSuccess: (params) => `❌ Отклонено ${params?.count} запросов`,
no39Found: () => "⚠️ Не найдено запросов с префиксом +39",
accepted39Success: (params) => `✅ Принято ${params?.count} запросов с префиксом +39`,
errorAccepting: () => "❌ Ошибка при принятии запросов",
errorRejecting: () => "❌ Ошибка при отклонении запросов",
invalidNumber: () => "⚠️ Неверный номер. Используйте число больше 0",
invalidInput: () => "⚠️ Неверный ввод. Отправьте число или '39'",
manageCustom: (params) => `╭─────────────────\n│ 📥 Персональное управление\n│\n│ Сколько запросов вы хотите принять?\n│\n│ ✦ Используйте: .${params?.command} принять <число>\n│ ✦ Пример: .${params?.command} принять 7\n╰─────────────────`,
manageFooter: () => "Персональное управление запросами",
notAvailable: () => "⚠️ Эта команда доступна только с базой ChatUnity",
imageNotFound: () => "⚠️ Ошибка при загрузке изображений",
mainTitle: () => "🌐 Наши социальные сети",
mainSubtitle: () => "Следите за нами везде, чтобы оставаться в курсе",
mainFooter: () => "Powered by ChatUnity",
instagramTitle: () => "📸 Instagram",
instagramBody: () => "Следите за нами в Instagram для фото и ежедневных историй!",
instagramButton: () => "Открыть Instagram",
tiktokTitle: () => "🎵 TikTok",
tiktokBody: () => "Креативный и веселый контент на TikTok!",
tiktokButton: () => "Открыть TikTok",
youtubeTitle: () => "🎬 YouTube",
youtubeBody: () => "Видео, уроки и стримы на нашем YouTube канале!",
youtubeButton: () => "Открыть YouTube",
discordTitle: () => "💬 Discord",
discordBody: () => "Присоединяйтесь к нашему сообществу в Discord!",
discordButton: () => "Открыть Discord",
telegramTitle: () => "✈️ Telegram",
telegramBody: () => "Новости и обновления на Telegram канале!",
telegramButton: () => "Открыть Telegram",
whatsappTitle: () => "💚 WhatsApp канал",
whatsappBody: () => "Будьте в курсе на нашем официальном WhatsApp канале!",
whatsappButton: () => "Открыть канал",
cardFooter: () => "ChatUnity Social",
followUpMessage: () => "👆 Листайте карточки чтобы увидеть все наши социальные каналы!\n\n✦ Следите за нами чтобы оставаться в курсе",
followUpFooter: () => "ChatUnity Team",
menuButton: () => "📋 Вернуться в меню",
errorLoading: () => "⚠️ Ошибка при загрузке социальных сетей",


   linkTitle: () => "🔗 ССЫЛКА ГРУППЫ",
   linkFooter: () => "Скопируйте ссылку и поделитесь",
    copyButton: () => "📋 Копировать ссылку",


  
  pingTitle: () => "⚡ PONG!",
  pingResponse: (params) => `⚡ *Пинг:* ${params?.ping || 'Н/Д'} мс`,
  socialNotAvailable: () => "⚠️ Команда недоступна в данный момент. Попробуйте позже.",
socialInstagramTitle: () => "📸 Instagram",
socialInstagramBody: () => "Следите за нами в Instagram для эксклюзивного контента, обновлений и новостей бота!",
socialInstagramButton: () => "Подписаться в Instagram",
socialTiktokTitle: () => "🎵 TikTok",
socialTiktokBody: () => "Откройте для себя наши видео на TikTok и будьте в курсе самого вирусного контента!",
socialTiktokButton: () => "Подписаться на TikTok",
socialYoutubeTitle: () => "📺 YouTube",
socialYoutubeBody: () => "Подпишитесь на наш YouTube канал для уроков, руководств и видеообновлений!",
socialYoutubeButton: () => "Подписаться на YouTube",
socialDiscordTitle: () => "💬 Discord",
socialDiscordBody: () => "Присоединяйтесь к нашему сообществу Discord для поддержки, чатов и многого другого!",
socialDiscordButton: () => "Войти в Discord",
socialTelegramTitle: () => "✈️ Telegram",
socialTelegramBody: () => "Следите за нами в Telegram для мгновенных новостей и прямых сообщений!",
socialTelegramButton: () => "Подписаться в Telegram",
socialWhatsappTitle: () => "💚 WhatsApp",
socialWhatsappBody: () => "Подпишитесь на наш WhatsApp канал для получения официальных обновлений!",
socialWhatsappButton: () => "Подписаться в WhatsApp",
socialCardFooter: () => "ChatUnity Social",
socialMainTitle: () => "⋆ ︵︵ ★ 🌐 СОЦИАЛЬНЫЕ СЕТИ ★ ︵︵ ⋆",
socialMainSubtitle: () => "Следите за нашими официальными каналами",
socialMainFooter: () => "Оставайтесь на связи с ChatUnity",
socialFollowUpMessage: () => "✨ Спасибо за ваш интерес!\n\n୧ Следите за нами во всех наших социальных сетях, чтобы не пропустить ни одного обновления.",
socialFollowUpFooter: () => "ChatUnity - Всегда на связи",
socialMenuButton: () => "🏠 Главное меню",
socialErrorLoading: () => "❌ Произошла ошибка при загрузке социальных сетей. Попробуйте позже.",
listawarnTitle: () => "꒷꒦ ✦ Список предупрежденных пользователей ✦ ꒷꒦",
listawarnMode: () => "Режим",
listawarnGroup: () => "Группа",
listawarnTotal: ({ count }) => `Всего: ${count} ${count === 1 ? 'предупрежденный пользователь' : 'предупрежденных пользователей'}`,
listawarnNoWarns: () => "✨ Нет предупрежденных пользователей",
listawarnUnknownUser: () => "Неизвестный пользователь",
listawarnUserNumber: ({ index }) => `${index}.`,
listawarnTag: () => "Тег:",
listawarnGroups: () => "Группа(ы):",
listawarnNoActiveWarns: () => "Нет активных предупреждений",
listawarnErrorRetrieving: () => "Ошибка при получении",
listawarnTotalWarns: ({ count }) => `${count} всего`,
listawarnOwnerOnly: () => "❌ Эта команда может использоваться в личных сообщениях только владельцами.",
listawarnAllUsers: () => "Все пользователи",
kickNoBotAdmin: () => "❌ Бот должен быть администратором для удаления пользователей.",
kickNoMention: () => "⚠️ Упомяните или процитируйте пользователя для удаления из группы.",
kickCannotRemoveOwner: () => "🛡️ Вы не можете удалить создателя бота.",
kickCannotRemoveBot: () => "🤖 Вы не можете удалить бота из группы.",
kickCannotRemoveSelf: () => "😅 Вы не можете удалить себя с помощью этой команды.",
kickTargetIsGroupOwner: () => "👑 Пользователь, которого вы попытались удалить, является создателем группы.",
kickTargetIsAdmin: () => "🛡️ Пользователь, которого вы попытались удалить, является администратором.",
kickSuccess: ({ target, executor, reason }) => `꒷꒦ ✦ Пользователь удален ✦ ꒷꒦\n\n┊ 『 👤 』 Пользователь: @${target}\n┊ 『 ⚖️ 』 Удален: @${executor}${reason ? `\n┊ 『 📝 』 Причина: ${reason}` : ''}\n\n╰★────★────★`,
linkgroupNoBotAdmin: () => "❌ Бот должен быть администратором для получения ссылки группы.",
linkgroupLinkTitle: ({ groupName }) => `꒷꒦ ✦ Ссылка группы ✦ ꒷꒦\n\n┊ 『 📱 』 Группа: ${groupName}\n┊ 『 🔗 』 Нажмите кнопку чтобы скопировать ссылку`,
linkgroupLinkFooter: () => "Powered by ChatUnity Bot",
linkgroupCopyButton: () => "📋 Копировать ссылку",
joinNoLink: ({ prefix, command }) => `⚠️ Введите ссылку группы.\n\n┊ 『 💡 』 Пример: ${prefix}${command} <ссылка> <дни | inf>`,
joinInvalidLink: () => "❌ Неверная ссылка группы.",
joinSuccessInfinite: () => "꒷꒦ ✦ Вступление в группу ✦ ꒷꒦\n\n┊ 『 ✅ 』 Я успешно присоединился к группе\n┊ 『 ⏰ 』 Пребывание: Неограниченно\n\n╰★────★────★",
joinSuccessExpired: ({ days }) => `꒷꒦ ✦ Вступление в группу ✦ ꒷꒦\n\n┊ 『 ✅ 』 Я успешно присоединился к группе\n┊ 『 ⏰ 』 Пребывание: ${days} дней\n\n╰★────★────★`,
banuserNoTarget: () => "⚠️ Пожалуйста, отметьте пользователя, ответьте на сообщение или напишите номер телефона.\n\n┊ 『 💡 』 Пример: @3934xxxxxxx",
banuserInvalidNumber: () => "❌ Неверный номер телефона.",
banuserSuccess: ({ target }) => `꒷꒦ ✦ Пользователь заблокирован ✦ ꒷꒦\n\n┊ 『 🚫 』 Пользователь: @${target}\n┊ 『 ⚠️ 』 Этот пользователь заблокирован в боте\n┊ 『 📵 』 Он больше не сможет использовать команды\n\n╰★────★────★`,
unbanuserNoTarget: () => "⚠️ Отметьте пользователя, ответьте на сообщение или напишите номер телефона.\n\n┊ 『 💡 』 Пример: @3934xxxxxxx",
unbanuserInvalidNumber: () => "❌ Неверный номер телефона.",
unbanuserSuccess: ({ target }) => `꒷꒦ ✦ Пользователь разблокирован ✦ ꒷꒦\n\n┊ 『 ✅ 』 Пользователь: @${target}\n┊ 『 🎉 』 Этот пользователь разблокирован\n┊ 『 📱 』 Теперь может использовать команды бота\n\n╰★────★────★`,
listanumNoPrefix: () => "⚠️ Введите телефонный префикс для поиска.\n\n┊ 『 💡 』 Пример: .listanum 39",
listanumInvalidPrefix: () => "❌ Префикс должен быть действительным числом.",
listanumTitle: ({ prefix }) => `꒷꒦ ✦ Список номеров +${prefix} ✦ ꒷꒦`,
listanumNoUsers: ({ prefix }) => `꒷꒦ ✦ Нет пользователей ✦ ꒷꒦\n\n┊ 『 ℹ️ 』 Не найдено пользователей с префиксом +${prefix}\n\n╰★────★────★`,
puliziaStart: ({ prefix }) => `꒷꒦ ✦ Очистка начата ✦ ꒷꒦\n\n┊ 『 🔄 』 Удаление пользователей с префиксом +${prefix}\n┊ 『 ⏳ 』 Ожидайте завершения...\n\n╰★────★────★`,
puliziaNoBotAdmin: () => "❌ Бот должен быть администратором для удаления пользователей.",
puliziaNoRestrict: () => "❌ Режим ограничений не включен.",
puliziaUserLeft: ({ user }) => `@${user} был удален`,
getNoInput: () => "⚠️ Неправильное использование команды.\n\n╰★─ Одиночные примеры ─★╮\n┊ getplugin menu-gruppo script\n┊ getfile config.js file\n\n╰★─ Множественные примеры ─★╮\n┊ getplugin admin & menu & config\n┊ getplugin admin & menu & config script\n┊ getplugin admin script & menu file\n┊ (максимум 3 плагина одновременно)\n\n╰♡꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷",
getNoPluginFound: () => "❌ Не найдено действительных плагинов в множественном запросе.",
getMultiSelect: ({ pluginList }) => `꒷꒦ ✦ Выбранные плагины ✦ ꒷꒦\n\n${pluginList}\n\n┊ 『 ❓ 』Как вы хотите получить все плагины?\n\n╰★────★────★`,
getMultiScriptBtn: () => "📄 Все скрипты",
getMultiFileBtn: () => "📎 Все файлы",
getMultiResult: ({ successCount, total, results }) => `꒷꒦ ✦ Множественный запрос ✦ ꒷꒦\n\n┊ 『 📦 』 ${successCount}/${total} плагинов найдено\n\n${results}\n\n╰★────★────★`,
getFileSelect: ({ filename }) => `꒷꒦ ✦ Выбранный файл ✦ ꒷꒦\n\n┊ 『 📁 』 ${filename}\n\n┊ 『 ❓ 』 Что вы хотите сделать?\n\n╰★────★────★`,
getScriptBtn: () => "📄 Скрипт",
getFileBtn: () => "📎 Файл",
getNoSimilar: ({ type, name }) => `❌ Не найдено ${type} похожего на "${name}".`,
getFoundConfirm: ({ filename, score }) => `꒷꒦ ✦ Найдено ✦ ꒷꒦\n\n┊ 『 ✨ 』 "${filename}"\n┊ 『 📊 』 Точность: ${score}%\n\n┊ 『 ❓ 』 Подтверждаете?\n\n╰♡꒷ ๑ Ответьте: да/нет`,
getMultiChoice: ({ name, options }) => `꒷꒦ ✦ Результаты для "${name}" ✦ ꒷꒦\n\n${options}\n\n┊ 『 📝 』 Выберите номер или "нет" для отмены\n\n╰★────★────★`,
getDirNotFound: ({ dir }) => `❌ Директория ${dir} не найдена.`,
getFileSuccess: ({ prefix, filename, type }) => `${prefix}꒷꒦ ✦ Успех ✦ ꒷꒦\n\n┊ 『 ✅ 』 Вот ${type}: ${filename}\n\n╰★────★────★`,
getScriptSuccess: ({ prefix, filename, content }) => `${prefix}꒷꒦ ✦ Код ${filename} ✦ ꒷꒦\n\n${content}\n\n╰★────★────★`,
getInvalidOption: () => "❌ Неверная опция! Используйте \"file\" или \"script\".",
getScriptOnlyJS: () => "❌ Опция скрипт доступна только для JavaScript файлов.",
getSyntaxError: ({ prefix, filename, error }) => `${prefix}꒷꒦ ✦ Ошибка синтаксиса ✦ ꒷꒦\n\n┊ 『 ⛔️ 』 Файл: ${filename}\n\n${error}\n\n╰★────★────★`,
getFileError: ({ prefix, filename, error }) => `${prefix}❌ Ошибка: Файл ${filename} не существует или не может быть прочитан.\n\n${error}`,
getProcessError: ({ filename, error }) => `❌ Ошибка при обработке ${filename}: ${error}`,
getOperationCancelled: () => "꒷꒦ ✦ Операция отменена ✦ ꒷꒦\n\n┊ 『 ❌ 』 Запрос успешно отменен\n\n╰★────★────★",
getGenericError: ({ error }) => `❌ Ошибка: ${error}`,
leaveNotAdmin: () => "⚠️ Эта команда может использоваться только админами и владельцами группы.",
leaveMessage: () => "꒷꒦ ✦ До свидания ✦ ꒷꒦\n\n┊ 『 👋 』 Бот покидает группу\n\n╰★────★────★",
leaveError: () => "❌ Произошла ошибка при выходе из группы.",
saveNoName: () => "⚠️ Укажите название плагина для сохранения.",
saveNoQuoted: () => "⚠️ Необходимо ответить на сообщение с кодом плагина.",
saveSaveSuccess: ({ path }) => `꒷꒦ ✦ Плагин сохранен ✦ ꒷꒦\n\n┊ 『 ✅ 』 Файл успешно создан\n┊ 『 📁 』 Путь: ${path}\n\n╰★────★────★`,
saveErrorWrite: ({ error }) => `❌ Ошибка при сохранении плагина.\n\n${error}`,
deleteNoPlugins: () => "⚠️ Нет доступных плагинов для удаления.",
deleteHelp: ({ usedPrefix, pluginList, total }) => `꒷꒦ ✦ Менеджер удаления плагинов ✦ ꒷꒦\n\n┊ 『 📌 』 Использование команды:\n┊ ${usedPrefix}deleteplugin <название>\n\n┊ 『 ✨ 』 Пример:\n┊ ${usedPrefix}deleteplugin menu-official\n\n┊ 『 📋 』 Доступные плагины:\n${pluginList}${total > 15 ? `\n┊ ... и другие ${total - 15} плагинов` : ''}\n\n╰★────★────★`,
deleteInvalidNumber: ({ max }) => `❌ Неверный номер! Диапазон: 1-${max}`,
deleteNoSimilar: ({ input }) => `❌ Не найдено плагинов похожих на "${input}".`,
deleteConfirm: ({ filename, score }) => `꒷꒦ ✦ Плагин найден ✦ ꒷꒦\n\n┊ 『 ✨ 』 "${filename}"\n┊ 『 📊 』 Совпадение: ${score}%\n\n┊ 『 🗑️ 』 Хотите удалить?\n\n╰♡꒷ ๑ Ответьте: да/нет`,
deleteMultiChoice: ({ input, options }) => `꒷꒦ ✦ Результаты для "${input}" ✦ ꒷꒦\n\n${options}\n\n┊ 『 📝 』 Выберите номер или "нет" для отмены\n\n╰★────★────★`,
deleteNotFound: ({ path }) => `꒷꒦ ✦ Внимание ✦ ꒷꒦\n\n┊ 『 📁 』 Файл не найден в файловой системе\n\n┊ 『 🔍 』 Искомый путь:\n┊ ${path}\n\n╰★────★────★`,
deleteSuccess: ({ pluginName, sender, time }) => `꒷꒦ ✦ Плагин удален ✦ ꒷꒦\n\n┊ 『 🗑️ 』 Плагин успешно удален\n\n┊ 『 📝 』 Название: ${pluginName}.js\n┊ 『 👤 』 Удален: @${sender}\n┊ 『 🕐 』 Время: ${time}\n\n┊ 『 ⚠️ 』 Примечание: Боту может потребоваться\n┊ перезапуск для применения изменений\n\n╰★────★────★\n\n🎯 Операция завершена!`,
deleteError: ({ error }) => `꒷꒦ ✦ Ошибка системы ✦ ꒷꒦\n\n┊ 『 ❌ 』 Невозможно удалить плагин\n\n┊ 『 🔍 』 Детали ошибки:\n┊ ${error}\n\n┊ 『 💡 』 Возможные решения:\n┊ -  Проверьте права доступа к файлу\n┊ -  Убедитесь, что плагин не используется\n┊ -  Попробуйте через несколько секунд\n\n╰★────★────★`,
deleteOperationCancelled: () => "꒷꒦ ✦ Операция отменена ✦ ꒷꒦\n\n┊ 『 ❌ 』 Удаление отменено\n\n╰★────★────★",
deleteGenericError: ({ error }) => `❌ Ошибка: ${error}`,
broadcastNoOwner: () => "❌ Только владелец может использовать эту команду!",
broadcastNoGroups: () => "❌ Бот не находится ни в одной группе!",
broadcastHeader: () => "꒷꒦ ✦ Сообщение от ChatUnity ✦ ꒷꒦",
broadcastIntro: () => "┊ 『 👑 』 Уважаемые участники группы, поступило новое сообщение от владельца:",
broadcastLabel: () => "┊ 『 📝 』 Сообщение:",
broadcastNote: () => "┊ 『 ⚠️ 』 Это сообщение было отправлено всем участникам группы",
broadcastFooter: () => "╰★────★────★\n\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ChatUnity",
broadcastSuccess: ({ count }) => `꒷꒦ ✦ Рассылка завершена ✦ ꒷꒦\n\n┊ 『 ✅ 』 Сообщение успешно отправлено\n┊ 『 📊 』 Охвачено групп: ${count}\n┊ 『 👥 』 Все участники были упомянуты\n\n╰★────★────★`,
broadcastDefaultMessage: () => "Это стандартное сообщение, отправленное во все группы.",
broadcastError: ({ group, error }) => `❌ Ошибка при отправке сообщения в группу ${group}: ${error}`,
banChatSuccess: () => "꒷꒦ ✦ Чат заблокирован ✦ ꒷꒦\n\n┊ 『 🚫 』 Чат успешно заблокирован\n┊ 『 ⚠️ 』 Бот больше не будет отвечать в этом чате\n\n╰★────★────★",
unbanChatSuccess: () => "꒷꒦ ✦ Чат разблокирован ✦ ꒷꒦\n\n┊ 『 ✅ 』 Чат успешно разблокирован\n┊ 『 🎉 』 Бот снова может отвечать в этом чате\n\n╰★────★────★",
restartInitiating: () => "꒷꒦ ✦ Перезапуск выполняется ✦ ꒷꒦\n\n┊ 『 ⏳ 』 Пожалуйста, подождите...\n\n╰★────★────★",
restartProgress: () => "🚀🚀🚀🚀🚀🚀",
restartSuccess: () => "꒷꒦ ✦ Перезапуск завершен ✦ ꒷꒦\n\n┊ 『 ✅ 』 Бот успешно перезапущен\n┊ 『 🎉 』 Операционная система\n\n╰★────★────★",
restartError: ({ error }) => `꒷꒦ ✦ Ошибка перезапуска ✦ ꒷꒦\n\n┊ 『 ❌ 』 Невозможно перезапустить бота\n┊ 『 🔍 』 Ошибка: ${error}\n\n╰★────★────★`,
shutdownInitiating: () => "꒷꒦ ✦ Выключение бота ✦ ꒷꒦\n\n┊ 『 🔌 』 Выключаю бота...\n┊ 『 🚫 』 Все чаты заблокированы\n┊ 『 ⏳ 』 Ожидайте закрытия\n\n╰★────★────★",
shutdownSuccess: () => "꒷꒦ ✦ Бот выключен ✦ ꒷꒦\n\n┊ 『 ✅ 』 Выключение завершено\n┊ 『 💤 』 Бот офлайн\n\n╰★────★────★",
shutdownChatsBanned: ({ count }) => `┊ 『 📊 』 ${count} чатов заблокировано`,
shutdownError: ({ error }) => `꒷꒦ ✦ Ошибка выключения ✦ ꒷꒦\n\n┊ 『 ❌ 』 Невозможно выключить бота\n┊ 『 🔍 』 Ошибка: ${error}\n\n╰★────★────★`,
updateInitiating: () => "꒷꒦ ✦ Обновление бота ✦ ꒷꒦\n\n┊ 『 🔄 』 Проверка обновлений...\n┊ 『 ⏳ 』 Пожалуйста, подождите\n\n╰★────★────★",
updateSuccess: ({ output }) => `꒷꒦ ✦ Обновление завершено ✦ ꒷꒦\n\n┊ 『 ✅ 』 Бот успешно обновлен\n\n┊ 『 📋 』 Детали:\n${output}\n\n╰★────★────★`,
updateError: ({ error }) => `꒷꒦ ✦ Ошибка обновления ✦ ꒷꒦\n\n┊ 『 ❌ 』 Невозможно обновить бота\n┊ 『 🔍 』 Ошибка: ${error}\n\n┊ 『 💡 』 Возможные решения:\n┊ -  Проверьте интернет-соединение\n┊ -  Проверьте права Git\n┊ -  Убедитесь, что вы на правильной ветке\n\n╰★────★────★`,
updateNoChanges: () => "꒷꒦ ✦ Уже обновлен ✦ ꒷꒦\n\n┊ 『 ℹ️ 』 Бот уже имеет последнюю версию\n┊ 『 ✅ 』 Нет доступных обновлений\n\n╰★────★────★",
groupMenuTitle: () => "МЕНЮ ГРУППЫ",
chooseMenu: () => "Выберите категорию из меню:",
mainMenuButton: () => "🏠 Главное меню",
adminMenuButton: () => "🛡️ Меню админа",
ownerMenuButton: () => "👑 Меню владельца",
securityMenuButton: () => "🚨 Меню безопасности",
aiMenuButton: () => "🤖 Меню ИИ",
musicAudioSection: () => "МУЗЫКА & АУДИО",
infoUtilitySection: () => "ИНФОРМАЦИЯ & УТИЛИТЫ",
imageEditSection: () => "ИЗОБРАЖЕНИЯ & РЕДАКТИРОВАНИЕ",
pokemonSection: () => "ПОКЕМОН",
gamesCasinoSection: () => "ИГРЫ & КАЗИНО",
economyRankingSection: () => "ЭКОНОМИКА & РЕЙТИНГИ",
socialInteractionSection: () => "СОЦИАЛЬНЫЕ ВЗАИМОДЕЙСТВИЯ",
howMuchSection: () => "СКОЛЬКО ЭТО?",
personalityTestSection: () => "ТЕСТ ЛИЧНОСТИ",
memberCommands: () => "КОМАНДЫ ДЛЯ УЧАСТНИКОВ",
versionLabel: () => "ВЕРСИЯ",
collabLabel: () => "СОТРУДНИЧЕСТВО",
songCommand: () => "песня",
audioCommand: () => "аудио",
videoCommand: () => "видео",
cityCommand: () => "город",
textCommand: () => "текст",
groupCommand: () => "группа",
userCommand: () => "пользователь",
checkSiteCommand: () => "проверитьсайт",
photoToStickerCommand: () => "фото в стикер",
stickerToPhotoCommand: () => "стикер в фото",
improveQualityCommand: () => "улучшить качество фото",
photoCommand: () => "фото",
hiddenPhotoCommand: () => "скрытое фото",
memeCommand: () => "мем",
fromStickerCommand: () => "из стикера",
blurImageCommand: () => "размыть изображение",
comingSoonCommand: () => "скоро",
quantityCommand: () => "количество",
headsOrTailsCommand: () => "орел или решка",
mathProblemCommand: () => "математическая задача",
rockPaperScissorsCommand: () => "камень ножницы бумага",
pokemonInfoCommand: () => "инфо Покемон",
balanceCommand: () => "баланс",
topUsersCommand: () => "топ пользователей",
withdrawUCCommand: () => "UC из банка",
earnXPCommand: () => "заработать XP",
endRelationshipCommand: () => "закончить отношения",
affinityCommand: () => "сходство",
charmCommand: () => "очарование",
createFightCommand: () => "создать споры",
truthOrDareCommand: () => "правда или действие",
playNoText: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n ❗ Введите название или ссылку\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
playNoResults: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n ❗ Результаты не найдены\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
playAudioLoading: () => "┊ ┊ ┊ ┊‿ ˚➶ ｡˚\n┊ ┊ ┊ ┊. ➶ ˚\n┊ ┊ ┊ ˚✧ 🎵 Аудио в пути\n┊ ˚➶ ｡˚ ☁︎ Подождите несколько секунд...",
playVideoLoading: () => "┊ ┊ ┊ ┊‿ ˚➶ ｡˚\n┊ ┊ ┊ ┊. ➶ ˚\n┊ ┊ ┊ ˚✧ 🎬 Видео в пути\n┊ ˚➶ ｡˚ ☁︎ Подождите несколько секунд...",
playDownloadComplete: () => "✅ Загрузка завершена!",
playTooLong: ({ maxMinutes, duration }) => `╭★────★────★\n|ㅤㅤㅤㅤㅤㅤㅤ꒰¡ВИДЕО СЛИШКОМ ДЛИННОЕ!꒱\n|˚₊꒷ ⏳ ꒱ ฅ﹕Максимум: ${maxMinutes} минут ₊˚๑\n|˚₊꒷ ⌛ ꒱ ฅ﹕Длительность: ${duration} ₊˚๑\n╰★────★────★`,
playVideoInfo: ({ title, timestamp, views, author, ago, url }) => `⋆ ︵︵ ★ 🎥 ИНФОРМАЦИЯ О ВИДЕО 🎥 ★ ︵︵ ⋆\n\n\n꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧\n୧ ✍️ *Название:* ${title}\n୧ ⏳ *Длительность:* ${timestamp}\n୧ 👀 *Просмотры:* ${views}\n୧ 🔰 *Канал:* ${author}\n୧ 🔳 *Опубликовано:* ${ago}\n୧ 🔗 *Ссылка:* ${url}\n꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧\n\n\n╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩\n  > Выберите формат для загрузки\n╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩`,
playChooseFormat: () => "Выберите формат:",
playAudioButton: () => "🎵 Аудио",
playVideoButton: () => "🎬 Видео",
playSaveButton: () => "💾 Сохранить плейлист",
playError: ({ error }) => `꒰🩸꒱ ◦- ≫ ОШИБКА\n ★・・・・・・・★\n  ${error}\n ★・・・・・・・★`,
playNoValidLink: () => "꒰🩸꒱ ◦- ≫ ОШИБКА\n ★・・・・・・・★\n  Действительная ссылка не найдена\n ★・・・・・・・★",
playlistEmpty: ({ userName }) => `ℹ️ ${userName ? `У ${userName} нет сохраненных треков` : 'Ваш плейлист пуст!'}`,
playlistHeader: ({ userName }) => `📋 ${userName ? `Плейлист ${userName}` : 'Ваш плейлист'}`,
playlistMore: ({ count }) => `...и другие ${count} треков`,
playlistSelectToPlay: () => "Выберите трек для воспроизведения",
saveNoText: () => "⚠️ Укажите трек для поиска",
saveSearching: ({ query }) => `⌛ Ищу "${query}"...`,
saveNoResults: () => "⚠️ Результаты не найдены",
saveAlreadyExists: () => "⚠️ Песня уже в плейлисте! Используйте .playlist чтобы увидеть сохраненные треки.",
saveSaved: () => "✅ Песня сохранена!",
saveViewPlaylist: () => "📋 Посмотреть плейлист",
savePlay: () => "🎵 Воспроизвести",
saveDelete: () => "🗑️ Удалить",
saveSaveNew: () => "💾 Сохранить новую",
deleteSelect: () => "🗑️ Выберите трек для удаления",
deleteUse: () => "Используйте: .удалить <номер>",
deleteInvalid: () => "⚠️ Неверный номер!",
deleteSuccess: () => "✅ Трек удален!",
deleteRestore: () => "💾 Восстановить",
backButton: () => "🔙 Назад",
playlistError: ({ error }) => `⚠️ Ошибка: ${error}`,
playlistSignature: () => "꙰ Создание Gab333 ꙰",
ytSearchMissingFiles: () => "❗ Для использования этой команды используйте базу ChatUnity",
ytSearchMissingQuery: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n 📌 Введите название видео\n Пример: .ytsearch compilation\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
ytSearchNoResults: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n ❌ Результаты не найдены\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
ytSearchTitle: () => "🔎 Поиск YouTube",
ytSearchFooter: () => "ChatUnity ✦ Downloader",
ytSearchResultTitle: () => "🎬 Результаты YouTube",
ytSearchResultHeader: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n ୧ 🎬 ୭ Результаты поиска\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Вот найденные результаты ✦ ꒷꒦",
ytSearchSelectPrompt: () => "╭★────★────★────★╮\n│ 🔢 Выберите видео\n│ из результатов выше\n╰★────★────★╯",
ytSearchDuration: () => "📺 Длительность:",
ytSearchViews: () => "👁 Просмотры:",
ytSearchChannel: () => "👤 Канал:",
toAudioNoMedia: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ⚠️ Ответьте на видео или аудио\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
toAudioDownloadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Ошибка при загрузке\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
toAudioConvertError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Ошибка при конвертации\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",


weatherNoCity: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❗ Введите название города\n  Использование: .погода [название города]\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
weatherInfo: ({ name, country, temp, feels, min, max, humidity, main, desc, wind, pressure }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🌍 ୭ *Погода ${name}, ${country}*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Информация о погоде ✦ ꒷꒦\n\n🌡 Температура: ${temp}°C\n🌡 Ощущается как: ${feels}°C\n🌡 Минимальная: ${min}°C\n🌡 Максимальная: ${max}°C\n💧 Влажность: ${humidity}%\n☁ Погода: ${main}\n🌫 Описание: ${desc}\n💨 Ветер: ${wind} м/с\n🔽 Давление: ${pressure} гПа\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🌤️\n│ Powered by OpenWeather\n╰★────★────★╯`,
weatherCityNotFound: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  🚫 Город не найден\n  Проверьте написание\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
weatherError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ⚠️ Ошибка при получении\n  Попробуйте позже\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
translateHelp: ({ prefix, command, languages }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🌍 ୭ *ПЕРЕВОДЧИК*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Примеры использования ✦ ꒷꒦\n\n│ ${prefix}${command} Привет\n│ ${prefix}${command} en Привет\n│ ${prefix}${command} ja Hello\n│ ${prefix}${command} [ответить на сообщение]\n│ ${prefix}говори ar текст\n\n꒷꒦ ✦ Доступные языки ✦ ꒷꒦\n\n${languages}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🌐\n│ ChatUnity Переводчик\n╰★────★────★╯`,
translateNoText: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Отсутствует текст для аудио\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
translateNoLang: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Язык не указан\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
translateWhatToTranslate: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ И что мне переводить?\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
translateTooLong: ({ max, length }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Текст слишком длинный\n  Максимум: ${max} символов\n  Ваш: ${length} символов\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
translateResult: ({ fromLang, toLang, translation }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🌍 ୭ *ПЕРЕВОДЧИК*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Из: ${fromLang} ✦ ꒷꒦\n꒷꒦ ✦ В: ${toLang} ✦ ꒷꒦\n\n${translation}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎯\n│ Перевод завершен\n╰★────★────★╯`,
translateListenOriginal: () => "🔊 Слушать оригинал",
translateListenTranslation: () => "🎵 Слушать перевод",
translateFooter: () => "ChatUnity Переводчик",
translateTTSError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Ошибка аудио: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
translateError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ Ошибка при переводе\n  Попробуйте позже\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
antiLinkNotAdmin: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *Спасен пока что*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Я не админ ✦ ꒷꒦\n\nЯ ничего не могу сделать",
antiLinkDetected: ({ user, qrDetected }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚫 ୭ *АНТИ-ССЫЛКА АКТИВИРОВАНА*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Нарушение правил ✦ ꒷꒦\n\n${user} 🤨 Вы нарушили правила группы${qrDetected ? ', ты думаешь я не вижу QR? 😂' : '.'}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 👮\n│ Автоматически исключен\n╰★────★────★╯`,
antiLinkRestrictOff: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *Ограничения отключены*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Требуется действие ✦ ꒷꒦\n\nСвяжитесь с владельцем бота для активации RESTRICT\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔧\n│ Функция недоступна\n╰★────★────★╯",
antiMediaWarning: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *АНТИМЕДИА АКТИВЕН*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Нарушение правил ✦ ꒷꒦\n\nРазрешены только фото и видео с 1 просмотром\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🚫\n│ Медиа удалено\n╰★────★────★╯",
antiSpamDetected: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚫 ୭ *АНТИСПАМ ОБНАРУЖЕН*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Спам обнаружен ✦ ꒷꒦\n\nПользователь удален за спам-поведение\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ⚡\n│ ChatUnity x 333 Protection\n╰★────★────★╯",
antiTrabaAdminWarning: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *ВНИМАНИЕ АДМИН*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Обнаружен трава ✦ ꒷꒦\n\nЭЙ @${user} ты случайно развлекаешься отправкой трава сюда? Какая удача для тебя, что ты админ! -.-\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🛡️\n│ Защищено статусом\n╰★────★────★╯`,
antiTrabaDetected: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚫 ୭ *АНТИ-ТРАВА АКТИВИРОВАН*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Обнаружено длинное сообщение ✦ ꒷꒦\n\nПользователь @${user} отправил слишком длинное сообщение и будет удален\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🚨\n│ ChatUnity Protection\n╰★────★────★╯`,
antiTrabaNoPermission: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *Отсутствуют права*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Действие заблокировано ✦ ꒷꒦\n\nУ меня нет прав администратора для удаления тех, кто отправляет трава\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔒\n│ Запросите права админа\n╰★────★────★╯",
infoSetAge: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🗓️ ୭ *Установить возраст*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Как продолжить ✦ ꒷꒦\n\nЧтобы установить ваш возраст используйте:\n.установитьвозраст <возраст>\n\nЧтобы удалить ваш возраст используйте:\n.удалитьвозраст\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📝\n│ Управление профилем\n╰★────★────★╯",
infoSetIG: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🌐 ୭ *Установить Instagram*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Как продолжить ✦ ꒷꒦\n\nЧтобы установить Instagram используйте:\n.установитьig <username>\n\nЧтобы удалить используйте:\n.удалитьig\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📱\n│ Управление социальными сетями\n╰★────★────★╯",
infoGroupOnly: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Команда только для групп\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
infoUserData: ({ messages, warn, role, age, gender, blasphemy, instagram }) => `⋆ ︵︵ ★ ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ ★ ︵︵ ⋆\n\n\n꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧\n୧ 📝 *Сообщения:* ${messages}\n୧ ⚠️ *Предупреждения:* ${warn} / 4\n୧ 🟣 *Роль:* ${role}\n୧ 🗓️ *Возраст:* ${age}\n୧ 🚻 *Пол:* ${gender}\n୧ 🤬 *Ругань:* ${blasphemy}\n${instagram ? `୧ 🌐 instagram.com/${instagram}` : '୧ 🌐 *Instagram:* Не установлен'}\n꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧`,
infoSetAgeButton: () => "🗓️ Установить возраст",
infoSetGenderMaleButton: () => "🚹 Мужской пол",
infoSetGenderFemaleButton: () => "🚺 Женский пол",
infoSetIGButton: () => "🌐 Установить IG",
infoFooter: () => "Установите ваши персональные данные:",
infoCreator: () => "создано Onix🌟",
infoRoleFounder: () => "Основатель ⚜️",
infoRoleAdmin: () => "Админ 👑",
infoRoleMember: () => "Участник 🤍",
infoGenderNotSet: () => "Не установлен",
infoAgeNotSet: () => "Не установлен",
infoAgeYears: ({ age }) => `${age} лет`,
setGenderUsage: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ Правильное использование команды\n  ━━✫ .установитьпол мужчина\n  ━━✫ .установитьпол женщина\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
setGenderSuccess: ({ gender, emoji }) => `✓ Пол установлен как: ${gender} ${emoji}`,
deleteGenderSuccess: () => "✓ Пол удален",
setAgeUsage: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ Введите действительный возраст\n  ━━✫ Возраст от 10 до 80 лет\n  ━━✫ Используйте: .установитьвозраст <возраст>\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
setAgeSuccess: ({ age }) => `✓ Возраст установлен как: ${age} лет`,
deleteAgeSuccess: () => "✓ Возраст удален",
rulesNotSet: ({ prefix }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⓘ Правила не установлены\n  ━━✫ Админы еще не установили\n  ━━✫ правила\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n\n📌 Чтобы установить правила используйте:\n${prefix}установитьправила <текст правил>`,
rulesTitle: () => "📜 Правила группы",
rulesDisplay: ({ rules }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📜 ୭ *Правила группы*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n${rules}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ⚖️\n│ Соблюдайте правила\n╰★────★────★╯`,
dashboardTitle: () => "⚡ ТОП 10 КОМАНД ⚡",
dashboardCommand: () => "📚 КОМАНДА",
dashboardUses: () => "🗂️ ИСПОЛЬЗОВАНИЯ",
dashboardLastUse: () => "⏱️ ПОСЛЕДНЕЕ ИСПОЛЬЗОВАНИЕ",
dashboardNeverUsed: () => "Никогда не использовалась",
dashboardDaysAgo: ({ days }) => `${days} дней назад`,
dashboardHoursAgo: ({ hours }) => `${hours} часов назад`,
dashboardMinutesAgo: ({ minutes }) => `${minutes} минут назад`,
dashboardSecondsAgo: () => "несколько секунд назад",
dashboardStats: ({ stats }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚡ ୭ *ТОП 10 КОМАНД*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n${stats}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📊\n│ Статистика бота\n╰★────★────★╯`,
imageSearchBaseOnly: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ Эта команда доступна\n  ━━✫ только с базой ChatUnity\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
imageSearchUsage: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⓘ Использование команды\n  ━━✫ ${prefix}${command} <ключевое слово>\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
imageSearchForbidden: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Контент не разрешен\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
imageSearchNoResults: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😢 Изображения не найдены\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
imageSearchResults: ({ term }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🔍 ୭ *Результаты поиска*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Запрос: ${term} ✦ ꒷꒦`,
imageSearchImageNum: ({ num }) => `Изображение #${num}`,
imageSearchResultFor: ({ term }) => `Результат для: ${term}`,
imageSearchFooter: () => "Powered by ChatUnity",
imageSearchOpenImage: () => "Открыть изображение",
imageSearchTitle: () => "Результаты изображений",
imageSearchSubtitle: () => "Вот изображения, найденные в Google",
imageSearchAgainPrompt: () => "🔄 Хотите найти другие изображения с тем же запросом?",
imageSearchAgainButton: () => "Искать снова",
obfuscateNoCode: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Введите JavaScript код\n  ━━✫ для обфускации или ответьте\n  ━━✫ на сообщение с кодом\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
obfuscateProcessing: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Выполняется обфускация...\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
obfuscateSuccess: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🔒 ୭ *Код обфусцирован*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Обфускация завершена ✦ ꒷꒦",
obfuscateError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ошибка обфускации\n  ━━✫ ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
bonkNoPhoto: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Нет фото профиля\n  ━━✫ Пользователь не установил\n  ━━✫ фото профиля\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bonkError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ошибка при выполнении\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
hornyCardCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🔥 ୭ *Horny Card*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Насколько ты возбужден? 🥵🔥 ✦ ꒷꒦",
stupidCaption: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤡 ୭ *Насколько ты глуп?*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ @${user} ✦ ꒷꒦`,
stupidDefaultText: () => "я+глуп",
wantedNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Невозможно получить\n  ━━✫ фото профиля\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedNoProfilePicUser: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ У пользователя нет\n  ━━✫ фото профиля\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedYourProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ У вас нет фото профиля\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedUnsupportedFormat: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Формат не поддерживается\n  ━━✫ Используйте JPEG или PNG\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ошибка загрузки изображения\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ошибка API\n  ━━✫ Попробуйте позже\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ошибка: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
wantedCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚔 ୭ *РАЗЫСКИВАЕТСЯ*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ В розыске ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 👮\n│ Powered by ChatUnity\n╰★────★────★╯",
jokeNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Невозможно получить\n  ━━✫ фото профиля\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeYourProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ У вас нет фото профиля\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeUnsupportedFormat: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Формат не поддерживается\n  ━━✫ Используйте JPEG или PNG\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ошибка загрузки изображения\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ошибка API\n  ━━✫ Попробуйте позже\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ошибка: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
jokeCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤡 ୭ *ШУТКА*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Joke over head ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 😂\n│ Powered by ChatUnity\n╰★────★────★╯",
jailNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Невозможно получить\n  ━━✫ фото профиля\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jailUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ошибка загрузки изображения\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jailAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ошибка API\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jailError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ошибка: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
jailCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚔 ୭ *В ТЮРЬМЕ*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 👮\n│ Powered by ChatUnity\n╰★────★────★╯",
nokiaNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Невозможно получить\n  ━━✫ фото профиля\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaYourProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ У вас нет фото профиля\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaUnsupportedFormat: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Формат не поддерживается\n  ━━✫ Используйте JPEG или PNG\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ошибка загрузки\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ошибка API\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ошибка: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
nokiaCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📱 ୭ *NOKIA*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📞\n│ Powered by ChatUnity\n╰★────★────★╯",
adNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Невозможно получить\n  ━━✫ фото профиля\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adYourProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ У вас нет фото профиля\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adUnsupportedFormat: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Формат не поддерживается\n  ━━✫ Используйте JPEG или PNG\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ошибка загрузки\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ошибка API\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ошибка: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
adCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📢 ୭ *РЕКЛАМА*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📺\n│ Powered by ChatUnity\n╰★────★────★╯",
pokeOpenNoType: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Укажите тип\n  ━━✫ base, imperium, premium, darkness\n  ━━✫ Пример: .открытьпокемон base\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeOpenNoPacks: ({ type }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⛔ У вас нет пакетов ${type.toUpperCase()}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeOpenOpening: () => "🎁 Открываю пакет...",
pokeOpenRevealing: () => "✨ Открываю карты...",
pokeOpenNoCards: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😢 Карты не найдены\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeOpenResult: ({ type, name, rarity, shiny, cardType, level, remaining }) => `🎉 Вы открыли пакет *${type.toUpperCase()}*:\n\n✨ *${name}* (${rarity})${shiny ? ' ✨ Сияющий' : ''}\n🔰 Тип: ${cardType} | Ур: ${level}\n\n📦 Осталось пакетов: *${remaining}* ${type}`,
pokeBuyUsage: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Правильное использование\n  ━━✫ .купитьпокемон <base|imperium|premium> <количество>\n  ━━✫ Пример: .купитьпокемон base 3\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeBuyNoCoins: ({ cost, balance }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Недостаточно UnityCoins\n  ━━✫ Требуется: ${cost}\n  ━━✫ Баланс: ${balance}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeBuySuccess: ({ quantity, type, total, balance }) => `✅ Вы купили *${quantity}* пакетов ${type.toUpperCase()}!\n📦 Всего теперь: ${total}\n💸 Осталось UnityCoins: ${balance}`,
pokeLeaderboardEmpty: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😢 Коллекционеры не найдены\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeLeaderboardTitle: () => "🏆 *Топ 10 Коллекционеров Покемонов*:",
pokeInventoryTitle: () => "📂 ВАШИ ПАКЕТЫ",
pokeInventoryBase: ({ count }) => `• 📦 Базовые: ${count}`,
pokeInventoryImperium: ({ count }) => `• 👑 Империум: ${count}`,
pokeInventoryPremium: ({ count }) => `• 🌌 Премиум: ${count}`,
pokeInventoryFooter: () => "🎁 Используйте кнопки чтобы открыть пакет сразу!",
pokeInventoryOpenBase: () => "📦 Открыть Базовый",
pokeInventoryOpenImperium: () => "👑 Открыть Империум",
pokeInventoryOpenPremium: () => "🌌 Открыть Премиум",
pokeInventoryBuy: () => "➕ Купить Пакеты",
pokeBattleNoMention: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚔️ Отметьте пользователя\n  ━━✫ Пример: .сразиться @пользователь\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeBattleNoPokemon: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😓 У вас нет Покемонов\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeBattleOpponentNoPokemon: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😓 У соперника нет Покемонов\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeBattleResult: ({ user1, user2, poke1, poke2, result }) => `⚔️ *Битва Покемонов!*\n\n👤 @${user1} выбрал *${poke1.name}* (Ур. ${poke1.level})\n👤 @${user2} выбрал *${poke2.name}* (Ур. ${poke2.level})\n\n${result}`,
pokeBattleWinner: ({ user }) => `🏆 @${user} побеждает в битве!`,
pokeBattleTie: () => "🤝 Ничья! Оба Покемона истощены.",
pokeEvolveNoName: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 📛 Укажите имя Покемона\n  ━━✫ Пример: .эволюционировать Charmander\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeEvolveNotOwned: ({ name }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ У вас нет *${name}*\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeEvolveNoCoins: ({ balance, cost }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⛔ Недостаточно unitycoin\n  ━━✫ У вас: ${balance}\n  ━━✫ Требуется: ${cost}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeEvolveNoEvolution: ({ name }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⛔ ${name} не может эволюционировать\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeEvolveEvolving: ({ name }) => `✨ *${name}* эволюционирует...`,
pokeEvolveProgress: () => "🔄 Эволюция выполняется...",
pokeEvolveSuccess: ({ from, to }) => `🎉 *${from}* эволюционировал в *${to}*!`,
pokeEvolveComplete: ({ balance }) => `✅ Эволюция завершена!\n💰 Осталось unitycoin: *${balance}*`,
tradeUsage: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 📌 Правильное использование\n  ━━✫ .обменять @пользователь <ваш_номер> <его_номер>\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
tradeYourNotExist: ({ num }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ваш Покемон № ${num}\n  ━━✫ не существует\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
tradeTheirNotExist: ({ num, user }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Покемон № ${num}\n  ━━✫ у @${user} не существует\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
tradeNoRequest: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Нет запроса на обмен\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
tradeUnavailable: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Один из Покемонов\n  ━━✫ больше не доступен\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
tradeSuccess: ({ from, to, poke1, poke2 }) => `✅ Обмен завершен между @${from} и @${to}!\n\n🎁 ${poke1.name} ⇄ ${poke2.name}`,
pityTitle: () => "📊 *Система Гарантии Darkness*",
pityOpened: ({ count }) => `🔁 Пакетов открыто без Darkness: *${count}*`,
pityRemaining: ({ remaining }) => `🎯 Следующий Darkness гарантирован через: *${remaining}* пакетов`,
pityGuaranteed: () => "✨ Следующий пакет имеет *гарантированный* Darkness!",
inventoryEmpty: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 📦 Инвентарь пуст\n  ━━✫ Используйте .открытьпокемон base\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
inventoryInvalidPage: ({ max }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Неверная страница\n  ━━✫ Выберите от 1 до ${max}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
inventoryHeader: ({ user, total, page, totalPages, perPage }) => `╭━━━🗂️ *ИНВЕНТАРЬ ПОКЕМОНОВ* 🗂️━━━╮\n┃ 👤 *Тренер:* @${user}\n┃ 📦 *Всего:* ${total}\n┃ 📄 *Страница:* ${page}/${totalPages}\n┃ 📌 *На странице:* ${perPage}\n╰━━━━━━━━━━━━━━━━━━━━━━━╯`,
inventoryDarknessButton: () => "🌑 Покемоны Darkness",
inventoryPageButton: ({ num }) => `Страница ${num}`,
inventoryFooter: () => "📂 Используйте `.инвентарь [страница]` или нажимайте кнопки для навигации.",
darknessInfo: () => "🌑 *ПАКЕТЫ DARKNESS* 🌑\n\nПакеты *Darkness* нельзя купить, они находятся **как бы из ниоткуда** когда вы открываете пакеты *Premium*.\n\n➡️ Каждые 10 открытых пакетов *Premium* дают 50% шанс получить бонусный пакет *Darkness*.\n\n🎲 Открывая пакет *Darkness* вы можете найти специальных Покемонов Darkness с 10% шансом.\n\nИспользуйте *.открытьпокемон darkness* чтобы открыть пакеты Darkness.\n\nУдачи! 🍀",
trisAlreadyPlaying: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❗ Вы уже играете\n  ━━✫ с кем-то\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
trisNoRoomName: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❗ Дайте название комнате\n  ━━✫ Пример: ${prefix}${command} комната1\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
trisGameStarting: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🕹️ ୭ *ИГРА НАЧИНАЕТСЯ*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Игрок присоединился ✦ ꒷꒦",
trisTurnOf: ({ player }) => `Ход @${player}`,
trisRoomCreated: () => "КОМНАТА СОЗДАНА ✓",
trisWaiting: ({ room }) => `══════ •⊰✧⊱• ══════\n*Ожидание игроков ...*\n══════════════\n🕹️ Для участия введите\n.играть ${room}\n══════════════\n⛔ Для выхода из игры\nвведите .выйти\n══════ •⊰✧⊱• ══════`,
slotInvalidBet: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Неверная ставка\n  ━━✫ Пример: ${prefix}${command} 100\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
slotInsufficientUC: ({ bet }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚫 Недостаточно UC\n  ━━✫ Требуется ${bet} UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
slotCooldown: ({ min, sec }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Подождите ${min}м ${sec}с\n  ━━✫ перед следующей игрой\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
slotWin: ({ uc, xp }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *ВЫ ВЫИГРАЛИ!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Выигрыш ✦ ꒷꒦\n\n┌──────────────\n│ ➕ *${uc} UC*\n│ ➕ *${xp} XP*\n└──────────────`,
slotLose: ({ uc, xp }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤡 ୭ *ВЫ ПРОИГРАЛИ!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Потери ✦ ꒷꒦\n\n┌──────────────\n│ ➖ *${uc} UC*\n│ ➖ *${xp} XP*\n└──────────────`,
slotBalance: ({ uc, xp, current, max, prefix }) => `\n💎 *ТЕКУЩИЙ БАЛАНС*\n\n┌──────────────\n│ 👛 *UC: ${uc}*\n│ ⭐ *XP: ${xp}*\n│ 📊 *Прогресс: ${current}/${max} XP*\n└──────────────\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ℹ️\n│ Используйте ${prefix}менюxp для больше XP!\n╰★────★────★╯`,
betUsage: ({ prefix, command }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎰 ୭ *КАЗИНО*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Как играть ✦ ꒷꒦\n\nВведите количество 💶 UnityCoins для ставки против *ChatUnity-Bot*\n\n📌 Пример:\n${prefix}${command} 100\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎲\n│ Выберите ставку ниже!\n╰★────★────★╯`,
betCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Вы уже сделали ставку\n  ━━✫ Подождите ⏱ ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
betLose: ({ bot, user, amount, botName, userName }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎲 ୭ *РЕЗУЛЬТАТ*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Выпавшие числа ✦ ꒷꒦\n\n🤖 *${botName}*: ${bot}\n👤 *${userName}*: ${user}\n\n╭★────★────★────★╮\n│ 😢 ВЫ ПРОИГРАЛИ!\n│ ➖ ${amount} 💶 UC\n╰★────★────★╯`,
betWin: ({ bot, user, amount, botName, userName }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎲 ୭ *РЕЗУЛЬТАТ*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Выпавшие числа ✦ ꒷꒦\n\n🤖 *${botName}*: ${bot}\n👤 *${userName}*: ${user}\n\n╭★────★────★────★╮\n│ 🎉 ВЫ ВЫИГРАЛИ!\n│ ➕ ${amount} 💶 UC\n╰★────★────★╯`,
betDraw: ({ bot, user, amount, botName, userName }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎲 ୭ *РЕЗУЛЬТАТ*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Выпавшие числа ✦ ꒷꒦\n\n🤖 *${botName}*: ${bot}\n👤 *${userName}*: ${user}\n\n╭★────★────★────★╮\n│ 🤝 НИЧЬЯ!\n│ ↩️ ${amount} 💶 UC возвращены\n╰★────★────★╯`,
betInsufficientUC: ({ amount }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 💸 У вас нет ${amount} 💶 UC\n  ━━✫ для ставки!\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rpsAlreadyPlaying: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏱ Вы уже играли\n  ━━✫ Подождите ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rpsChooseOption: () => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ✊ ୭ *КАМЕНЬ НОЖНИЦЫ БУМАГА*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Выберите ваш ход ✦ ꒷꒦\n\n🪨 Камень бьет Ножницы\n📄 Бумага бьет Камень\n✂️ Ножницы бьют Бумагу\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎲\n│ Сделайте ваш выбор!\n╰★────★────★╯`,
rpsInvalidOption: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Неверный выбор\n  ━━✫ Выберите: камень/бумага/ножницы\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rpsDraw: ({ player, bot, reward }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤝 ୭ *НИЧЬЯ!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Результат ✦ ꒷꒦\n\n👤 Вы: ${player}\n🤖 Бот: ${bot}\n\n╭★────★────★────★╮\n│ 🎁 Утешительный приз\n│ ➕ ${reward} 💶 UC\n╰★────★────★╯`,
rpsWin: ({ player, bot, reward }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *ВЫ ВЫИГРАЛИ!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Результат ✦ ꒷꒦\n\n👤 Вы: ${player}\n🤖 Бот: ${bot}\n\n╭★────★────★────★╮\n│ 🏆 Эпичная победа!\n│ ➕ ${reward} 💶 UC\n╰★────★────★╯`,
rpsLose: ({ player, bot, loss }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 😢 ୭ *ВЫ ПРОИГРАЛИ!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Результат ✦ ꒷꒦\n\n👤 Вы: ${player}\n🤖 Бот: ${bot}\n\n╭★────★────★────★╮\n│ 💸 Удачи в следующий раз\n│ ➖ ${loss} 💶 UC\n╰★────★────★╯`,
rpsRock: () => "🪨 Камень",
rpsPaper: () => "📄 Бумага",
rpsScissors: () => "✂️ Ножницы",
rpsButtonRock: () => "🪨 Камень",
rpsButtonPaper: () => "📄 Бумага",
rpsButtonScissors: () => "✂️ Ножницы",
rpsButtonRetry: () => "🔄 Попробовать снова",
bjInsufficientFunds: () => "💰 Недостаточно средств!",
bjNotYourTurn: () => "❌ Не ваш ход!",
bjBusted: () => "💥 Перебор! Вы превысили 21!",
bjDealerBusted: () => "🎉 Дилер перебрал! Вы выиграли!",
bjYouWin: () => "🎉 Вы выиграли!",
bjDealerWins: () => "😔 Дилер выигрывает!",
bjPush: () => "🤝 Ничья!",
bjMakeBet: () => "💵 Сделайте вашу ставку!",
bjYourTurn: () => "📋 Ваш ход! Взять или Остановиться?",
bjYourScore: ({ score }) => `📋 Ваш счет: ${score}`,
bjTimeoutTitle: () => "⏰ ВРЕМЯ ВЫШЛО",
bjTimeoutMsg: ({ balance }) => `⏰ Время вышло! Игра отменена.\n💶 Кошелек: ${balance} UC`,
bjGameInProgress: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🎰 Игра уже идет\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjInvalidBet: ({ max }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Неверная ставка\n  ━━✫ Сумма: 10-${max} UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
bjStartCaption: ({ name, bet, balance }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎰 ୭ *БЛЭКДЖЕК*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ ${name} ✦ ꒷꒦\n\n💶 Ставка: ${bet} UC\n📋 Баланс: ${balance} UC\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ⚡\n│ .hit .stand .double\n╰★────★────★╯`,
bjNoGame: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Нет активной игры\n  ━━✫ Используйте: .блэкджек [ставка]\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjNotYourGame: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Не ваш ход!\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjDoubleOnlyTwo: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Удваивать можно только с 2 картами\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjDoubleInsufficientFunds: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Недостаточно средств\n  ━━✫ для удвоения\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjFooter: () => "♠️ Блэкджек Бот ♣️",
bjPlayer: () => "ИГРОК",
bjDealer: () => "ДИЛЕР",
bjScore: () => "СЧЕТ",
bjWallet: () => "💶 КОШЕЛЕК",
bjBet: () => "🎯 СТАВКА",
rouletteCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Вы уже сделали ставку\n  ━━✫ Подождите ⏱ ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteUsage: ({ prefix, command }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎰 ୭ *РУЛЕТКА*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Как играть ✦ ꒷꒦\n\nВведите сумму и цвет:\n${prefix}${command} 20 black\n${prefix}${command} 50 red\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎲\n│ Выберите ваш цвет!\n╰★────★────★╯`,
rouletteInvalidFormat: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Неверный формат\n  ━━✫ Пример: ${prefix}${command} 20 black\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteInvalidAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Неверная сумма\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteMaxBet: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Максимум 50 💶 UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteInvalidColor: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Неверный цвет\n  ━━✫ Выберите: black или red\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteInsufficientFunds: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Недостаточно 💶 UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteBetPlaced: ({ amount, color }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎰 ୭ *СТАВКА СДЕЛАНА*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Детали ✦ ꒷꒦\n\n💰 Сумма: ${amount} 💶 UC\n🎨 Цвет: ${color === 'black' ? '⚫ ЧЕРНЫЙ' : '🔴 КРАСНЫЙ'}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ⏱\n│ Ждите 10 секунд...\n╰★────★────★╯`,
rouletteWin: ({ amount, total, winColor }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *ВЫ ВЫИГРАЛИ!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Результат ✦ ꒷꒦\n\n🎯 Выпавший цвет: ${winColor === 'black' ? '⚫ ЧЕРНЫЙ' : '🔴 КРАСНЫЙ'}\n\n╭★────★────★────★╮\n│ 💰 Выигрыш: +${amount} 💶 UC\n│ 💎 Всего: ${total} 💶 UC\n╰★────★────★╯`,
rouletteLose: ({ amount, total, winColor }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 😢 ୭ *ВЫ ПРОИГРАЛИ!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Результат ✦ ꒷꒦\n\n🎯 Выпавший цвет: ${winColor === 'black' ? '⚫ ЧЕРНЫЙ' : '🔴 КРАСНЫЙ'}\n\n╭★────★────★────★╮\n│ 💸 Проигрыш: -${amount} 💶 UC\n│ 💎 Всего: ${total} 💶 UC\n╰★────★────★╯`,
rouletteBlack: () => "⚫ Черный",
rouletteRed: () => "🔴 Красный",
rouletteButtonBlack10: () => "⚫ 10 UC",
rouletteButtonBlack25: () => "⚫ 25 UC",
rouletteButtonBlack50: () => "⚫ 50 UC",
rouletteButtonRed10: () => "🔴 10 UC",
rouletteButtonRed25: () => "🔴 25 UC",
rouletteButtonRed50: () => "🔴 50 UC",
// Подбрасывание монеты
cfCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Вы уже играли\n  ━━✫ Подождите ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cfWaiting: ({ player }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🪙 ୭ *ОРЕЛ ИЛИ РЕШКА*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Игра начата ✦ ꒷꒦\n\n🧑 Игрок 1: @${player}\n🕹️ Ожидание второго игрока...\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎲\n│ Напишите орел или решка!\n╰★────★────★╯`,
cfPlayer1Ready: ({ player, choice }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🪙 ୭ *ОРЕЛ ИЛИ РЕШКА*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Игрок 1 готов ✦ ꒷꒦\n\n🧑 @${player} выбрал *${choice}*\n🎯 Ожидание Игрока 2...\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎮\n│ Ваш ход!\n╰★────★────★╯`,
cfInvalidChoice: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Неверный выбор\n  ━━✫ Напишите: орел или решка\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cfResult: ({ result, p1, p2, msg, prefix, command }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🪙 ୭ *РЕЗУЛЬТАТ: ${result.toUpperCase()}*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n${msg}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔄\n│ ${prefix}${command} чтобы сыграть снова\n╰★────★────★╯`,
cfAlreadyChosen: ({ choice }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ Вы уже выбрали ${choice}\n  ━━✫ Ждите другого игрока\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cfNotAvailable: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Игра недоступна\n  ━━✫ ${prefix}${command} чтобы начать\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cfButtonHeads: () => "🪙 Орел",
cfButtonTails: () => "🪙 Решка",

// Камень-Ножницы-Бумага v2
rps2Cooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Подождите ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rps2Usage: ({ prefix, command }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ✊ ୭ *КАМЕНЬ НОЖНИЦЫ БУМАГА*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Как играть ✦ ꒷꒦\n\n${prefix}${command} камень\n${prefix}${command} бумага\n${prefix}${command} ножницы\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎮\n│ Сделайте ваш ход!\n╰★────★────★╯`,
rps2InvalidChoice: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Неверный выбор\n  ━━✫ ${prefix}${command} камень/бумага/ножницы\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rps2Draw: ({ bot, reward }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤝 ୭ *НИЧЬЯ!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Бот: ${bot} ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ 🎁 +${reward} 💶 UC\n╰★────★────★╯`,
rps2Win: ({ bot, reward }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *ВЫ ВЫИГРАЛИ!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Бот: ${bot} ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ 💰 +${reward} 💶 UC\n╰★────★────★╯`,
rps2Lose: ({ bot, loss }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 😢 ୭ *ВЫ ПРОИГРАЛИ!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Бот: ${bot} ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ 💸 -${loss} 💶 UC\n╰★────★────★╯`,
rps2ButtonRock: () => "🪨 Камень",
rps2ButtonPaper: () => "📄 Бумага",
rps2ButtonScissors: () => "✂️ Ножницы",

// Покедекс
pokedexNoName: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Введите имя Покемона\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokedexSearching: ({ name }) => `🔍 Ищу ${name}...`,
pokedexError: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Ошибка поиска Покемона\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokedexInfo: ({ name, id, type, abilities, height, weight, desc, url }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎌 ୭ *ПОКЕДЕКС - ${name}*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Информация ✦ ꒷꒦\n\n🔹 *Имя:* ${name}\n🔹 *ID:* ${id}\n🔹 *Тип:* ${type}\n🔹 *Способности:* ${abilities}\n🔹 *Рост:* ${height}\n🔹 *Вес:* ${weight}\n\n📝 *Описание:*\n${desc}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🌐\n│ ${url}\n╰★────★────★╯`,
flagGameActive: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Игра уже активна\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagGroupOnly: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Только для групп\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagNoGame: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Нет активной игры\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagAdminOnly: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Только для админов\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Подождите ${time}с\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagSkipped: ({ answer }) => `ㅤ⋆｡˚『 ╭ \`ИГРА ПРЕРВАНА\` ╯ 』˚｡⋆\n╭\n│ 『 🏳️ 』 \`Правильный ответ:\`\n│ 『 ‼️ 』 *\`${answer}\`*\n│ 『 👑 』 _*Прервано администратором*_\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagStart: ({ phrase }) => `ㅤ⋆｡˚『 ╭ \`${phrase}\` ╯ 』˚｡⋆\n╭\n│ 『 🏳️ 』 \`Ответьте названием\` *страны*\n│ 『 ⏱️ 』 \`Доступное время:\` *30 секунд*\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagTimeout: ({ answer }) => `ㅤ⋆｡˚『 ╭ \`ВРЕМЯ ВЫШЛО!\` ╯ 』˚｡⋆\n╭\n│ 『 🏳️ 』 \`Правильный ответ:\`\n│ 『 ‼️ 』 *\`${answer}\`*\n│ 『 💡 』 _*Будьте быстрее в следующий раз!*_\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagCorrect: ({ answer, time, reward, exp, bonus }) => `ㅤ⋆｡˚『 ╭ \`ПРАВИЛЬНЫЙ ОТВЕТ!\` ╯ 』˚｡⋆\n╭\n│ 『 🏳️ 』 \`Страна:\` *${answer}*\n│ 『 ⏱️ 』 \`Затраченное время:\` *${time}с*\n│ 『 🎁 』 \`Награды:\`\n│ 『 💰 』 *${reward}€* ${bonus > 0 ? `(+${bonus} бонус скорости)` : ''}\n│ 『 🆙 』 *${exp} EXP*\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagAlmostThere: () => "👀 *Почти угадали!*",
flagAttemptsExhausted: () => `ㅤ⋆｡˚『 ╭ \`ПОПЫТКИ ИСЧЕРПАНЫ!\` ╯ 』˚｡⋆\n╭\n│ 『 ❌ 』 \`Вы исчерпали 3 попытки!\`\n│ 『 ⏳ 』 _*Ждите пока другие попробуют...*_\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagWrongHint: ({ letter, length }) => `❌ *Неправильный ответ!*\n\n💡 *Подсказка:*\n  • Начинается с буквы *"${letter}"*\n  • Состоит из *${length} букв*`,
flagWrong2: ({ remaining }) => `❌ *Неправильный ответ!*\n\n📝 *Осталось попыток:* ${remaining}\n🤔 *Подумайте над следующим ответом!*`,
flagWrongLast: () => `❌ *Неправильный ответ!*\n\n📝 *Последняя попытка осталась..*`,
flagPlayAgain: () => "🏳️ Играть Снова!",
flagError: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ошибка запуска игры\n  ━━✫ Попробуйте через несколько секунд\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagPhrase1: () => "🇺🇳 *УГАДАЙТЕ ФЛАГ!* 🇺🇳",
flagPhrase2: () => "🌍 *Какую страну представляет этот флаг?*",
flagPhrase3: () => "🏳️ *Географический вызов: узнаете этот флаг?*",
flagPhrase4: () => "🧭 *Угадайте страну по ее флагу!*",
flagPhrase5: () => "🎯 *Викторина флагов: какая это страна?*",
flagPhrase6: () => "🌟 *Проверьте свои географические знания!*",
flagPhrase7: () => "🔍 *Внимательно посмотрите и угадайте страну!*",
songGameActive: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Игра уже идет\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
songError: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Ошибка в игре\n  ━━✫ Попробуйте позже\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
songStart: ({ artist, time }) => `  ⋆｡˚『 ╭ \`УГАДАЙТЕ ПЕСНЮ\` ╯ 』˚｡⋆\n╭\n┃ 『 ⏱️ 』 \`Время:\` *${time} секунд*\n┃ 『 👤 』 \`Исполнитель:\` *${artist}*\n┃\n┃ ➤  \`Напишите название!\`\n╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒`,
songTimeout: ({ title, artist }) => `ㅤ⋆｡˚『 ╭ \`ВРЕМЯ ВЫШЛО\` ╯ 』˚｡⋆\n╭\n│\n│ ➤ \`Никто не угадал!\`\n┃ 『  』🎵 \`Название:\` *${title}*\n┃ 『  』👤 \`Исполнитель:\` *${artist}*\n┃\n╰⭒─ׄ─ׅ─ׄ─⭒`,
songCorrect: ({ title, artist, reward, exp }) => `ㅤㅤ⋆｡˚『 ╭ \`ПРАВИЛЬНО\` ╯ 』˚｡⋆\n╭\n│\n│ ➤ \`Правильный ответ!\`\n┃ 『  』🎵 \`Название:\` *${title}*\n┃ 『  』👤 \`Исполнитель:\` *${artist}*\n┃\n┃ 『 🎁 』 \`Выигрыш:\`\n│ ➤  \`${reward}\` *UC*\n│ ➤  \`${exp}\` *EXP*\n┃\n╰⭒─ׄ─ׅ─ׄ─⭒`,
songAlmostThere: () => "👀 *Почти угадали!* Попробуйте...",
songPlayAgain: () => "『 🎵 』 Играть снова",
songExternalTitle: () => "угадай песню",
songExternalArtist: ({ artist }) => `Исполнитель: ${artist}`,
songExternalSource: () => "ChatUnity Bot",
logoGroupOnly: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Только для групп\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoNoGame: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Нет активной игры\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoAdminOnly: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Только админы\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoSkipped: ({ answer }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🛑 ୭ *ИГРА ПРЕРВАНА*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Правильный ответ ✦ ꒷꒦\n\n🚗 *${answer}*`,
logoGameActive: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Игра уже идет\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Ждите ${time}с\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoStart: ({ phrase, time }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚗 ୭ *${phrase}*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Угадайте бренд ✦ ꒷꒦\n\n⌛ Время: ${time} секунд\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔍\n│ Напишите название бренда!\n╰★────★────★╯`,
logoTimeout: ({ answer }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⏰ ୭ *ВРЕМЯ ВЫШЛО!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Правильный ответ ✦ ꒷꒦\n\n🚗 *${answer}*\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔄\n│ Попробуйте снова с .авто\n╰★────★────★╯`,
logoCorrect: ({ brand, time, reward, exp, bonus }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *ПРАВИЛЬНЫЙ ОТВЕТ!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Детали ✦ ꒷꒦\n\n🚗 Бренд: *${brand}*\n⏱ Время: *${time}с*\n\n╭★────★────★────★╮\n│ 🎁 Награды:\n│ • ${reward} 💰 UC${bonus > 0 ? ` (+${bonus} бонус)` : ''}\n│ • ${exp} 🆙 EXP\n╰★────★────★╯\n\n> \\by ChatUnity\\`,
logoPhrase1: () => "🚘 УГАДАЙТЕ ЛОГОТИП!",
logoPhrase2: () => "🏁 Какой это бренд?",
logoPhrase3: () => "🔍 Узнаете эту машину?",
logoPhrase4: () => "🚗 Викторина Авто!",
logoPhrase5: () => "🏎️ Угадайте бренд!",
logoButtonPlayAgain: () => "🚗 Играть Снова",
missionMainTitle: ({ bot }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎯 ୭ *СИСТЕМА ЗАДАНИЙ*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ ${bot} ✦ ꒷꒦`,
missionMainStats: ({ user, money, bank, dailyDone, dailyTotal, weeklyDone, weeklyTotal }) => `👤 Пользователь: @${user}\n💰 Баланс: ${money} UC\n🏦 Банк: ${bank} UC\n📅 Ежедневные: ${dailyDone}/${dailyTotal} выполнено\n📆 Недельные: ${weeklyDone}/${weeklyTotal} выполнено\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎯\n│ Выберите тип заданий:\n╰★────★────★╯`,
missionButtonDaily: () => "📅 ЕЖЕДНЕВНЫЕ",
missionButtonWeekly: () => "📆 НЕДЕЛЬНЫЕ",
missionButtonClaim: () => "💰 ПОЛУЧИТЬ",
missionButtonBack: () => "🔙 НАЗАД",
missionButtonWallet: () => "💰 КОШЕЛЕК",
missionDailyTitle: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📅 ୭ *ЕЖЕДНЕВНЫЕ ЗАДАНИЯ*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n👤 @${user}`,
missionDailyReset: ({ time }) => `⏳ Сброс через: ${time}`,
missionWeeklyTitle: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📆 ୭ *НЕДЕЛЬНЫЕ ЗАДАНИЯ*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n👤 @${user}`,
missionWeeklyReset: ({ time }) => `⏳ Сброс через: ${time}`,
missionEntry: ({ num, title, progress, target, reward, status }) => `▢ *${num}. ${title}*\n➠ Прогресс: ${progress}/${target}\n➠ Награда: ${reward} UC\n➠ Статус: ${status}`,
missionStatusCompleted: () => "✅ ПОЛУЧЕНО",
missionStatusReady: () => "💰 ГОТОВО",
missionStatusInProgress: () => "❌ В ПРОЦЕССЕ",
missionFooterDaily: ({ prefix }) => `Используйте "${prefix}задания получить" для получения!`,
missionFooterWeekly: () => "Недельные задания - Большие награды!",
missionFooterMain: () => "Выполняйте задания чтобы заработать UnityCoins!",
missionNoRewards: ({ user }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ @${user} у вас нет заданий\n  ━━✫ для получения!\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
missionClaimSuccess: ({ user, total, details, money, bank }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *НАГРАДЫ ПОЛУЧЕНЫ*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n👤 @${user}\n💰 Всего получено: *${total} UC*\n\n${details}\n\n╭★────★────★────★╮\n│ 💰 Баланс: ${money} UC\n│ 🏦 Банк: ${bank} UC\n╰★────★────★╯`,
missionClaimFooter: () => "Используйте .кошелек чтобы увидеть полный баланс",
missionSendMessages: ({ count }) => `Отправьте ${count} сообщений`,
missionExecuteCommands: ({ count }) => `Выполните ${count} команд`,
missionNoWarn: () => "Оставайтесь без предупреждений",
missionNoWarnWeek: () => "Оставайтесь 7 дней без предупреждений",
missionTotalMessages: ({ count }) => `Достигните ${count} всего сообщений`,
walletNotFound: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Пользователь не найден\n  ━━✫ в базе данных\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
walletTitle: () => "💰 КОШЕЛЕК",
walletInfo: ({ name, uc, bank }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💰 ୭ *КОШЕЛЕК*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ ${name} ✦ ꒷꒦\n\n👤 Пользователь: ${name}\n💰 UnityCoins: ${uc} 💶\n🏛️ Банк: ${bank} 💳\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 💎\n│ Используйте .депозит для пополнения\n│ Используйте .снять для вывода\n╰★────★────★╯`,
walletExternalTitle: ({ name }) => `Кошелек ${name}`,
walletExternalBody: ({ uc }) => `Баланс: ${uc} UC`,
walletButtonDeposit: () => "🏛️ Пополнить",
walletButtonWithdraw: () => "💰 Снять",
walletButtonGames: () => "🎮 Игры",
bankNotFound: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Пользователь не найден\n  ━━✫ в базе данных\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
bankYourBalance: ({ balance }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🏛️ ୭ *ВАШ СЧЕТ*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Банковский баланс ✦ ꒷꒦\n\n💰 У вас *${balance} 💶 UnityCoins*\nв вашем банке 🏛️\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 💎\n│ Используйте .депозит для пополнения\n│ Используйте .снять для вывода\n╰★────★────★╯`,
bankUserBalance: ({ user, balance }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🏛️ ୭ *БАНКОВСКИЙ СЧЕТ*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ @${user} ✦ ꒷꒦\n\n💰 Имеет *${balance} 💶 UnityCoins*\nв банке 🏛️`,
bankButtonDeposit: () => "🏛️ Пополнить",
bankButtonWithdraw: () => "💰 Снять",
bankButtonTransfer: () => "💸 Перевести",
transferNoMention: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Отметьте получателя\n  ━━✫ Пример: @пользователь 100\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferNoAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Введите количество\n  ━━✫ 💶 UnityCoins для перевода\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferInvalidAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Неверная сумма\n  ━━✫ Используйте только числа\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferMinAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Минимум для перевода: 1 UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferInsufficient: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 💸 Недостаточно средств\n  ━━✫ для этого перевода\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferSuccess: ({ amount, fee, total }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💸 ୭ *ПЕРЕВОД ВЫПОЛНЕН*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Детали транзакции ✦ ꒷꒦\n\n💰 Отправленная сумма: *${amount}* 💶 UC\n📊 Комиссия 2%: *${fee}* 💶 UC\n💳 Всего списано: *${total}* 💶 UC\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ✅\n│ Перевод завершен!\n╰★────★────★╯`,
transferReceived: ({ amount }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💰 ୭ *ПОЛУЧЕНО UC*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Вы получили ✦ ꒷꒦\n\n💶 *+${amount} UnityCoins*\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎁\n│ Проверьте ваш баланс!\n╰★────★────★╯`,
transferSelf: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ Нельзя переводить\n  ━━✫ себе\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
robNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🧠 Отметьте кого-то или\n  ━━✫ ответьте на сообщение\n  ━━✫ Пример: ${prefix}${command} @пользователь\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
robSelf: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🤡 Нельзя украсть\n  ━━✫ у себя\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
robCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚨 Вы уже крали\n  ━━✫ Попробуйте через ⏱ ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
robSuccess: ({ amount, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💰 ୭ *УСПЕШНАЯ КРАЖА!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Идеальная кража ✦ ꒷꒦\n\nВы украли *${amount} 💶 UC*\nу @${target}\n\n╭★────★────★────★╮\n│ 💸 +${amount} 💶 UC\n│ ୭ ˚. ᵎᵎ ✅ К вашему балансу\n╰★────★────★╯`,
robCaught: ({ fine, name }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚓 ୭ *АРЕСТОВАН!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Пойман полицией ✦ ꒷꒦\n\n${name} был остановлен!\n\n╭★────★────★────★╮\n│ 💸 Штраф: -${fine} 💶 UC\n│ ୭ ˚. ᵎᵎ ❌ Удачи в следующий раз\n╰★────★────★╯`,
robPartial: ({ amount, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💸 ୭ *ЧАСТИЧНАЯ КРАЖА*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Почти удалось ✦ ꒷꒦\n\nВы украли только *${amount} 💶 UC*\nу @${target}\n\n╭★────★────★────★╮\n│ 💰 +${amount} 💶 UC\n│ ୭ ˚. ᵎᵎ ⚠️ К вашему балансу\n╰★────★────★╯`,
robButtonRetry: () => "🔄 Попробовать снова",
robButtonWallet: () => "💰 Кошелек",
withdrawNoAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Введите количество\n  ━━✫ 💶 UnityCoins для снятия\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawNoFunds: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 У вас нет 💶 UnityCoins\n  ━━✫ на банковском счете\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawInvalidAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Неверное количество\n  ━━✫ Используйте действительное число\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawMinAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Введите минимум 1 UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawInsufficientFunds: ({ bank }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 У вас только *${bank}* 💶 на счете\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawSuccess: ({ count, bank }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ✅ ୭ *СНЯТИЕ ВЫПОЛНЕНО*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Вы сняли ✦ ꒷꒦\n\n💶 *${count} UnityCoins*\nс банковского счета\n\n💳 Новый банковский баланс: *${bank} UC*\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 💼\n│ Используйте .кошелек для проверки\n╰★────★────★╯`,
  xpLevelDisplay: ({ level }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧  Уровень: ${level}`,
  xpProgressDisplay: ({ current, needed }) => `Прогресс XP: ${current} / ${needed}`,
  xpFooterText: () => "╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐ Продолжайте писать чтобы повысить уровень!",
  xpCaption: ({ user, level, exp, next }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧\n\n┊ 『 📊 』 Профиль XP ${user}\n\n┃ Текущий уровень: ${level}\n┃ Всего опыта: ${exp}\n┃ XP до следующего уровня: ${next}\n\n╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
rubaxpWait: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Вы должны подождать прежде чем снова красть\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpWaitTime: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ Вы должны подождать еще ${time} прежде чем снова красть\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 📍 Вы должны отметить действительного пользователя\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpUserNotFound: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ Пользователь не найден в базе данных\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpTooPoor: ({ target, limit }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😢 @${target} имеет меньше *${limit} XP*\n  ━━✫ Не крадите у бедных, будьте добры\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpSuccess: ({ amount, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ✅ ୭ *КРАЖА ВЫПОЛНЕНА*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Вы украли ✦ ꒷꒦\n\n💰 *${amount} XP*\nу @${target}\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎮\n│ Продолжайте в том же духе!\n╰★────★────★╯`,
rubaxpTimeFormat: ({ hours, minutes, seconds }) => `${hours} Час(ов) ${minutes} Минут(ы) ${seconds} Секунд(ы)`,darxpNoMention: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Вы должны упомянуть пользователя с @user\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpNoAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Введите количество 💫 XP для перевода\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpInvalidAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Введите только действительные числа\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpMinAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 Минимум для перевода 1 💫 XP\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpInsufficientXP: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 У вас недостаточно 💫 XP для перевода\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpSuccess: ({ xp, tassa }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n  ୧ ✅ ୭ *ПЕРЕВОД ВЫПОЛНЕН*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ Вы перевели ✦ ꒷꒦\n\n💫 *${xp} XP*\n(комиссия: ${tassa} XP)\n╭★────★────★────★╮\n│ Продолжайте играть!\n╰★────★────★╯`,
marry_no_target: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Вы должны упомянуть пользователя для брака
  ━━✫ Используйте: ${prefix + command} @пользователь
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_self: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Нельзя жениться на себе
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_user_not_found: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Пользователь не найден в базе данных
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_already_married_sender: ({ spouse }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💍 ୭ *ВЫ УЖЕ В БРАКЕ*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ Вы состоите в браке с ✦ ꒷꒦

❤ ${spouse}

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
marry_already_married_target: ({ target }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 ${target} уже в браке
  ━━✫ Ищите кого-то другого
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_pending_proposal: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 У вас уже есть ожидающее предложение брака
  ━━✫ Ждите пока его примут или откажут
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_proposal_text: ({ sender, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💍 ୭ *ПРЕДЛОЖЕНИЕ БРАКА*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ ${sender} попросил руку ✦ ꒷꒦

❤ ${target}

Ответьте "Да" чтобы принять
или "Нет" чтобы отказать.

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
marry_proposal_expired: ({ sender, target }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⏳ Предложение между ${sender} и ${target}
  ━━✫ истекло из-за неактивности
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_proposal_rejected: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 💔 Предложение было отклонено
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_user_not_found_db: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Ошибка: пользователи не найдены в базе данных
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_success: ({ sender, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💍 ୭ *БРАК ЗАРЕГИСТРИРОВАН*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ Новая официальная пара ✦ ꒷꒦

❤ ${sender}  ×  ${target}

꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧
Пусть любовь начнется!

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
divorce_not_married: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Вы не в браке с кем-либо
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
divorce_spouse_not_found: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Ваш супруг не найден в базе данных
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
divorce_success: ({ ex }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💔 ୭ *РАЗВОД ЗАВЕРШЕН*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ Вы расстались с ✦ ꒷꒦

${ex}

· ୨୧ · · ୨୧ ·  ♡
Новая глава вашей жизни началась.

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
shipNoUser: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❗ Используйте команду так:
  ━━✫ ${prefix + command} @пользователь
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
shipNoUsersPair: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❗ Используйте команду так:
  ━━✫ ${prefix + command} @пользователь1 [@пользователь2]
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
shipInvalidUsers: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❌ Недействительные пользователи
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
shipCaption: ({ user1, user2, percent }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

💘 *@${user1}* ❤️ *@${user2}*
🔮 Совместимость: *${percent}%*

· ୨୧ · · ୨୧ ·  ♡`,
shipErrorImage: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❌ Ошибка при генерации изображения
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
kissNoTargetMention: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 💋 Вы должны упомянуть кого-то или ответить на сообщение
  ━━✫ Пример: ${prefix + command} @пользователь
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
kissNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 💋 Вы должны упомянуть кого-то чтобы поцеловать
  ━━✫ Пример: .поцеловать @пользователь
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
kissSuccess: ({ senderName, targetName }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💋 ୭ *Поцелуй доставлен*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ ${senderName} поцеловал(а) ✦ ꒷꒦

😘 ${targetName}

· ୨୧ · · ୨୧ ·  ♡`,
odioNoText: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 😡 Вы должны указать кого-то
  ━━✫ Пример: ${prefix + command} @пользователь
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
odioResult: ({ target, percent }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 😡 ୭ *КАЛЬКУЛЯТОР НЕНАВИСТИ*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ Уровень ненависти между ✦ ꒷꒦

${target}  ✕  вами

🔥 Ненависть: *${percent}%*

꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧`,
rizzNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 Вы должны отметить кого-то или ответить на сообщение
  ━━✫ Пример: ${prefix + command} @пользователь
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rizzSuccess: ({ target, line }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ ✨ ୭ *Ход Риза*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ @${target} смотри сюда ✦ ꒷꒦

"${line}"

· ୨୧ · · ୨୧ ·  ♡`,
minacciaNoGroup: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Эта команда может использоваться только в группах
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
minacciaDisabled: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Угрозы отключены в этой группе
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
minacciaNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 Вы должны указать кого-то для угрозы
  ━━✫ Отметьте пользователя или ответьте на сообщение
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
minacciaText: ({ target, line }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

@${target} ${line}

· ୨୧ · · ୨୧ ·  ♡`,
zizzaniaNoGroup: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Эта команда может использоваться только в группах
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
zizzaniaDisabled: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Ссоры отключены в этой группе
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
zizzaniaText: ({ a, line, b }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

@${a} ${line} @${b}

· ୨୧ · · ୨୧ ·  ♡`,
ditalinoNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 Вы должны отметить кого-то или ответить на сообщение
  ━━✫ Пример: ${prefix + command} @пользователь
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
ditalinoStart: ({ target }) => `🤟🏻 Начинаю серию специальных ласк для *${target}*...`,
ditalinoMiddle: () => "🤟🏻 Почти там...",
ditalinoEnd: () => "👋🏻 Укройтесь от водопада!!",
ditalinoResult: ({ target, time }) => `✨ *${target}* взорвался(ась) от удовольствия после *${time}мс* 🥵`,
segaNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 Вы должны отметить кого-то или ответить на сообщение
  ━━✫ Пример: ${prefix + command} @пользователь
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
segaStart: ({ target }) => `Теперь займемся ${target}... 😏`,
segaFrame: ({ frame }) => `${frame}`,
segaEnd: ({ target }) => `Ох ${target} достиг(ла) максимального удовольствия! 😋💦`,
insultNoGroup: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Эта команда может использоваться только в группах
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
insultDisabled: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 Оскорбления отключены в этой группе
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
insultNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 Кого вы хотите оскорбить?
  ━━✫ Отметьте кого-то или ответьте на сообщение
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
insultBotLines: () => [
  `О нет! Вы обнаружили мою слабость: оскорбления! Как я когда-либо оправлюсь?`,
  `Ах, искусство оскорблять бота. Настоящий мастер иронии!`,
  `Невероятно! Человек, оскорбляющий бота. Эпический поворот!`,
  `Вы действительно ранили меня своим умением оскорблять бота. Отлично!`,
  `Ваше умение оскорблять бота - мой любимый источник развлечения.`,
  `Оскорблять бота: большой интеллект или большая скука?`,
  `Ваше мастерство в оскорблениях ботов могло бы создать школу.`,
  `Вы похожи на Пикассо оскорблений ботов, настоящий шедевр.`,
  `Оскорбления ботов - ваш скрытый талант. Карьера в цифровом кабаре на подходе?`,
  `Дерзость оскорблять сущность без эмоций. Награда за оригинальность!`
],
insultUserText: ({ target, line }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

@${target} ${line}

· ୨୧ · · ୨୧ ·  ♡`,
friendNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⚠️ Отметьте человека которому хотите отправить запрос дружбы
  ━━✫ Пример: ${prefix}${command} @тег
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
friendSelf: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❌ Нельзя добавить себя в друзья
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
friendUserNotFound: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚫 Человек отсутствует в системе
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
friendAlready: ({ target }) => `✅ @${target} уже в ваших друзьях.`,
friendPending: () => `⚠️ Запрос дружбы уже в процессе.\nЖдите ответа или отмены.`,
friendRequestText: ({ target, from }) => `👥 Запрос дружбы в процессе...

@${target}, хотите принять дружбу от @${from}?

> ⏳ У вас 60 секунд чтобы выбрать.`,
friendTimeout: ({ from, target }) => `⏳ Запрос дружбы отменен
> @${from} и @${target} не ответили вовремя.`,
friendRejected: () => `❌ Запрос дружбы отклонен.`,
friendAccepted: ({ from }) => `👥 Теперь вы и @${from} друзья!`,
removeFriendNoTarget: () => `⚠️ Отметьте человека которого хотите удалить из друзей.`,
removeFriendNotInList: ({ target }) => `🚫 @${target} не в ваших друзьях.`,
removeFriendSuccess: ({ target }) => `🚫 Вы и @${target} больше не друзья.`,
friendsNoData: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⚠️ Данные пользователя не найдены
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
friendsTitle: ({ name }) => `📜 Список друзей ${name}`,
friendsLastNone: () => `👤 Последний друг: Никто`,
friendsLastSome: ({ last }) => `👤 Последний друг: @${last}`,
friendsListHeader: () => `👥 Полный список:`,
friendsListEmpty: () => `│   Никого, поздравляю одинокий волк`,
friendsError: () => `❌ Произошла ошибка при выполнении команды.`,
lesbicaCalcNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⚠️ Вы должны упомянуть кого-то или ответить на сообщение
  ━━✫ Пример: ${prefix + command} @пользователь
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
lesbicaCalcLine1: ({ tag, percentage }) => `@${tag} на ${percentage}% лесбиянка, остальное просто гормональная путаница.`,
lesbicaCalcLine2: ({ tag, percentage }) => `Тест завершен: @${tag} имеет мозг настроенный на женщин на ${percentage}%.`,
lesbicaCalcLine3: ({ tag, percentage }) => `💕 @${tag} смотрит на женщин с интенсивностью ${percentage}% порно в 4K.`,
pajeroCalcLine1: ({ tag, percentage }) => `@${tag} на ${percentage}% онанист, остальные ${100 - percentage}% тратит на поиск другого порно.`,
pajeroCalcLine2: ({ tag, percentage }) => `Медицинское заключение: @${tag} на ${percentage}% раб своего члена.`,
pajeroCalcLine3: ({ tag, percentage }) => `🍆 @${tag} думает о мастурбации ${percentage}% времени, остальное тратит на уборку.`,
puttanaCalcLine1: ({ tag, percentage }) => `@${tag} на ${percentage}% шлюха, таксометр никогда не выключается.`,
puttanaCalcLine2: ({ tag, percentage }) => `Детальный анализ: @${tag} имеет открытый прайс-лист на ${percentage}% 24/7.`,
puttanaCalcLine3: ({ tag, percentage }) => `💰 @${tag} имеет скидку шлюхи ${percentage}%, торопитесь пока не подорожала.`,
genericCalcLine: ({ tag, percentage, cmd }) => `@${tag} на ${percentage}% ${cmd}, остальное просто накопленный стыд.`,
downCalcNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚨 ОТМЕТЬТЕ КОГО-ТО, ГЕНИЙ
  ━━✫ Пример: ${prefix}${command} @имя
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
downCalcLine: ({ name, cmd, percent, frase, verdict }) => `*⚡️ ФИНАЛЬНЫЙ ВЕРДИКТ ⚡️*

*Субъект:* ${name}
*Уровень "${cmd}":* ${percent}%

*Диагноз:* ${frase}

*Прогноз:* ${verdict}`,
downCalcPhrases: () => [
  "Он настолько бесполезен, что даже корзина для переработки его отвергает.",
  "Если бы эволюция работала правильно, ты бы все еще был одной клеткой в грязи.",
  "У вас эмоциональная глубина лужи и интеллект мокрого камня.",
  "Если бы мозг сжигал калории, ты бы толстел даже во сне.",
  "Когда вы говорите, каждый нейрон на планете соблюдает минуту молчания из уважения.",
  "Если бы глупость была возобновляемой энергией, только ты мог бы освещать Европу.",
  "У вас такая же полезность, как у дырявого зонта в ураган.",
  "Если бы ты был багом, даже разработчики не стали бы тратить время на исправление.",
  "Ваш вклад в мир сравним с вкладом потушенного окурка в луже.",
  "У вас умственная координация пьяного голубя на шоссе."
],
downCalcVerdicts: ({ percent }) => {
  if (percent > 90) return "🔴 КЛИНИЧЕСКИЙ СЛУЧАЙ НЕВОССТАНАВЛИВАЕМ. Человечество официально требует возврата.";
  if (percent > 70) return "🟠 БИОЛОГИЧЕСКАЯ ОПАСНОСТЬ. Запрещено размножаться без письменного разрешения ВОЗ.";
  if (percent > 40) return "🟡 БРАК ПРОИЗВОДСТВА. Использовать только как пример на курсах чего НЕ становиться.";
  return "🟢 СТАТИСТИЧЕСКАЯ АНОМАЛИЯ. Возможно мозг есть... где-то, под всей этой пустотой.";
},
alcolNoText: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🍷 Имя не указано, использую ваше
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
alcolHigh: () => "🍾 Вы настолько полны, что даже печень запросила досрочную пенсию.",
alcolMid: () => "🥂 Пьете как будто завтра не существует, но завтра предъявит счет.",
alcolLow: () => "🚰 Совершенно трезв, единственное что крутится - ваша грусть.",
alcolResult: ({ target, percent, phrase }) => `『💬』 ══ •⊰✰⊱• ══ 『💬』

МОМЕНТ ТЕСТА НА АЛКОГОЛЬ! 🍷
━━━━━━━━━━━━━━
${target} имеет уровень алкоголя ${percent}%! 🍷
『💬』 ══ •⊰✰⊱• ══ 『💬』

${phrase}`,
drugNoText: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🌿 Имя не указано, использую ваше
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
drugHigh: () => "🌿 Настолько обдолбанный, что если дышит сильно - отравляет район.",
drugMid: () => "🌿 Не умеет нюхать, но так старается, что попадет в медицинские учебники.",
drugLow: () => "🌿 Пример для подражания... в этой группе почти мифическое существо.",
drugResult: ({ target, percent, phrase }) => `『💬』 ══ •⊰✰⊱• ══ 『💬』

МОМЕНТ ТЕСТА НА НАРКОТИКИ! 🌿
━━━━━━━━━━━━━━
${target} имеет уровень веществ в крови ${percent}%! 🌿
『💬』 ══ •⊰✰⊱• ══ 『💬』

${phrase}`,
raceCalcNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⚠️ Вы должны отметить кого-то или ответить на сообщение
  ━━✫ Пример: ${prefix + command} @пользователь
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
raceCalcLine: ({ tag, percent, label }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

@${tag} это ⚫ ${percent}% ${label}

· ୨୧ · · ୨୧ ·  ♡`,
cornutoNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🤔 Отсутствует имя рогоносца/цы
  ━━✫ Используйте: .рогоносец @имя или ответьте на сообщение
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cornutoSpecialText: () => `🤣 *НУ ВОТ, КОРОЛЬ РОГОВ!* 🤣
Говорят, если снимет рога - получится антенна 5G📡💀`,
cornutoLow: () => "🛡 Все спокойно... пока. Но все равно следите за телефоном партнера.",
cornutoMid: () => "😬 Слишком много архивных чатов... подозрение в воздухе.",
cornutoHigh: () => "👀 Рогометр в максимальной тревоге! Рога заряжаются на 78%.",
cornutoMax: () => "🫣 МИРОВОЙ УРОВЕНЬ: если открыть Google Maps появится треугольник рогов на вашей голове.",
cornutoAdviceHigh: () => "🔔 Совет: не оборачивайтесь... могут использовать как опору. 🤣",
cornutoAdviceLow: () => "😌 Дышите, пока вы в лимбе между блаженным и будущим членом клуба.",
cornutoResult: ({ target, percent, message, advice }) => `🔍 КАЛЬКУЛЯТОР РОГОНОСНОСТИ 🔍

👤 ${target}
📈 Рогоносность: ${percent}%
${message}

${advice}`,

}