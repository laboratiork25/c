export default {
  
  // 通用系统
  smsAvisoMG: () => "⚠️ 注意！",
  smsWait: () => "⏳ 加载中...",
  smsError: () => "❌ 发生错误",
  smsSuccess: () => "✅ 操作成功完成",
  smsProcessing: () => "🔄 正在处理...",
  
  // 通用命令
  smsOnlyGroup: () => "❌ 此命令仅在群组中有效！",
  smsOnlyAdmin: () => "❌ 只有管理员可以使用此命令！",
  smsOnlyOwner: () => "❌ 只有所有者可以使用此命令！",
  smsOnlyPremium: () => "💎 此命令仅适用于高级用户！",
  smsInvalidCommand: () => "❌ 无效命令",
  smsNoText: () => "❌ 请输入文本",
  smsNoMedia: () => "❌ 发送或回复媒体文件",
  
  // AI 和 ChatGPT
  aiNoQuery: () => "⚠️ *请输入有效的 ChatGPT 请求！*\n\n📌 示例：\n{prefix}{command} 给我讲个笑话\n{prefix}{command} 推荐5本奇幻书籍\n{prefix}{command} 登录页面的HTML代码",
  aiError: () => "❌ 生成回复时发生错误。请稍后重试。",
  aiProcessing: () => "🤖 正在处理您的请求...",
  
  // 欢迎/告别系统
  welcomeTitle: () => "✧ 欢迎！✧",
  goodbyeTitle: () => "✧ 再见！✧",
  welcomeDefault: (user, group, members) => `*欢迎* @${user} 🎉\n┊ *群组:* ${group}\n╰► *成员:* ${members}`,
  goodbyeDefault: (user, members) => `*再见* @${user} 👋\n┊ 已离开群组\n╰► *剩余成员:* ${members}`,
  
  welcomeSetHelp: () => `🎉 *设置欢迎消息*

*用法:* {command} <消息>

*可用变量:*
• @user - 用户标签
• $nome - 用户名
• $gruppo - 群组名称
• $membri - 成员数量
• $numero - 电话号码
• $tag - 用户标签（@user的别名）

*示例:*
{command} 你好 @user! 👋 欢迎来到 $gruppo！现在我们有 $membri 名成员！🎉

*恢复默认消息:*
{command} reset`,
  
  goodbyeSetHelp: () => `👋 *设置告别消息*

*用法:* {command} <消息>

*可用变量:*
• @user - 用户标签
• $nome - 用户名
• $gruppo - 群组名称
• $membri - 成员数量
• $numero - 电话号码
• $tag - 用户标签（@user的别名）

*示例:*
{command} 再见 @user! 😢 我们会在 $gruppo 想念你。还剩 $membri 名成员。

*恢复默认消息:*
{command} reset`,
  
  // 警告系统
  warnMentionUser: () => "❌ 你需要提及用户或回复他的消息。",
  warnBotImmune: () => "🚫 你不能警告机器人。",
  warnUserNotFound: () => "❌ 在数据库中找不到用户。",
  warnMessage: (params) => `⚠️ 警告 {warns}/3 (3次警告=封禁)`,
  warnBanMessage: () => "⛔ 用户因3次警告被移除",
  
  menuownerChooseMenu: () => "选择一个菜单：",
menuownerMainMenuButton: () => "🏠 主菜单",
menuownerAdminMenuButton: () => "🛡️ 管理菜单",
menuownerSecurityMenuButton: () => "🚨 安全菜单",
menuownerGroupMenuButton: () => "👥 群组菜单",
menuownerAiMenuButton: () => "🤖 AI菜单",
menuownerTitle: () => "所有者菜单",
menuownerVersionLabel: () => "版本",
menuownerCollabLabel: () => "合作",
menuownerSupportLabel: () => "支持",
menuownerReservedCommands: () => "所有者保留命令",
menuownerManageCommand: () => "管理",
menuownerSetGroupsCommand: () => "设置群组",
menuownerAddGroupsCommand: () => "添加群组",
menuownerResetGroupsCommand: () => "重置群组",
menuownerBanUserCommand: () => "封禁用户",
menuownerUnbanUserCommand: () => "解封用户",
menuownerCleanupCommand: () => "清理",
menuownerGetFileCommand: () => "获取文件",
menuownerSaveCommand: () => "保存插件",
menuownerDpCommand: () => "删除插件",
menuownerGetPluginCommand: () => "获取插件",
menuownerJoinCommand: () => "加入",
menuownerOutCommand: () => "退出",
menuownerPrefixCommand: () => "前缀",
menuownerResetPrefixCommand: () => "重置前缀",
menuownerGodModeCommand: () => "上帝模式",
menuownerResetCommand: () => "重置",
menuownerAddCommand: () => "添加",
menuownerRemoveCommand: () => "移除",
menuownerEveryGroupCommand: () => "所有群组",
menuownerBanChatCommand: () => "封禁聊天",
menuownerUnbanChatCommand: () => "解封聊天",
menuownerRestartCommand: () => "重启",
menuownerShutdownBotCommand: () => "关闭机器人",
menuownerUpdateBotCommand: () => "更新机器人",
menuownerPluginParam: () => "插件",
menuownerLinkParam: () => "链接",
menuownerAutoAdminParam: () => "自动管理",
menuownerNumMessagesParam: () => "消息数量",
menuownerCommandParam: () => "命令",
menuownerGroupParam: () => "群组",

  // 菜单系统
  mainMenuTitle: () => '主菜单',
  adminMenuTitle: () => '管理菜单',
  adminCommands: () => '管理命令',
  chooseMenu: () => '选择一个菜单：',
  mainMenuButton: () => '🏠 主菜单',
  ownerMenuButton: () => '👑 所有者菜单',
  securityMenuButton: () => '🚨 安全菜单',
  groupMenuButton: () => '👥 群组菜单',
  aiMenuButton: () => '🤖 AI菜单',
  promoteCommand: () => '晋升 /设为管理',
  demoteCommand: () => '降级 /取消管理',
  warnCommands: () => '警告 /取消警告',
  muteCommands: () => '禁言 /解除禁言',
  setDescCommand: () => '设置描述',
  setScheduleCommand: () => '设置时间',
  setNameCommand: () => '设置名称',
  hidetagCommand: () => '隐藏标签',
  kickCommand: () => '踢出 /移除',
  adminsCommand: () => '管理员',
  tagallCommand: () => '标记所有人',
  openCloseCommand: () => '开启 /关闭',
  setWelcomeCommand: () => '设置欢迎',
  setByeCommand: () => '设置告别',
  inactiveCommand: () => '不活跃成员',
  listNumCommand: () => '列出号码 + 前缀',
  cleanupCommand: () => '清理 + 前缀',
  clearPlayCommand: () => '清除播放',
  rulesCommand: () => '规则/设置规则',
  quarantineCommand: () => '隔离',
  dsCommand: () => 'ds',
  listWarnCommand: () => '警告列表',
  linkCommand: () => '链接',
  linkQrCommand: () => '链接二维码',
  poweredBy: () => '技术支持',
  
  // 群组菜单
  groupMenuTitle: () => '群组菜单',
  memberCommands: () => '成员命令',
  musicAudioSection: () => '音乐和音频',
  infoUtilitySection: () => '信息和实用工具',
  imageEditSection: () => '图片和编辑',
  pokemonSection: () => '宝可梦',
  gangSystemSection: () => '帮派系统',
  gamesCasinoSection: () => '游戏和赌场',
  economyRankingSection: () => '经济和排名',
  socialInteractionSection: () => '社交互动',
  howMuchSection: () => '有多少？',
  personalityTestSection: () => '个性测试',
  songCommand: () => '歌曲',
  audioCommand: () => '音频',
  videoCommand: () => '视频',
  artistTitleCommand: () => '艺术家-标题',
  cityCommand: () => '城市',
  textCommand: () => '文本',
  groupCommand: () => '群组',
  repoCommand: () => '仓库',
  userCommand: () => '用户',
  topicCommand: () => '话题',
  checkSiteCommand: () => '检查网站',
  photoToStickerCommand: () => '照片转贴纸',
  stickerToPhotoCommand: () => '贴纸转照片',
  improveQualityCommand: () => '提高照片质量',
  photoCommand: () => '照片',
  hiddenPhotoCommand: () => '隐藏照片',
  memeCommand: () => '表情包',
  fromStickerCommand: () => '从贴纸',
  blurImageCommand: () => '模糊图片',
  comingSoonCommand: () => '即将推出',
  quantityCommand: () => '数量',
  headsOrTailsCommand: () => '正面或反面',
  mathProblemCommand: () => '数学问题',
  rockPaperScissorsCommand: () => '石头剪刀布',
  pokemonInfoCommand: () => '宝可梦信息',
  balanceCommand: () => '余额',
  topUsersCommand: () => '顶级用户',
  buyUCCommand: () => '购买UC',
  withdrawUCCommand: () => '从银行取UC',
  earnXPCommand: () => '赚取XP',
  proposalCommand: () => '提议',
  endRelationshipCommand: () => '结束关系',
  affinityCommand: () => '亲和力',
  charmCommand: () => '魅力',
  createFightCommand: () => '创建争吵',
  truthOrDareCommand: () => '真心话大冒险',
  versionLabel: () => '版本',
  supportLabel: () => '支持',
  
  // 所有者菜单
  ownerMenuTitle: () => '所有者菜单',
  ownerReservedCommands: () => '所有者保留命令',
  setNameCommand: () => '设置名称',
  resetNameCommand: () => '重置名称',
  manageCommand: () => '管理',
  setGroupsCommand: () => '设置群组',
  addGroupsCommand: () => '添加群组',
  resetGroupsCommand: () => '重置群组',
  setPpCommand: () => '设置头像',
  banUserCommand: () => '封禁用户',
  unbanUserCommand: () => '解封用户',
  blockUserCommand: () => '屏蔽用户',
  unblockUserCommand: () => '解除屏蔽用户',
  getFileCommand: () => '获取文件',
  saveCommand: () => '保存',
  dpCommand: () => '删除插件',
  getPluginCommand: () => '获取插件',
  joinCommand: () => '加入',
  outCommand: () => '退出',
  prefixCommand: () => '前缀',
  resetPrefixCommand: () => '重置前缀',
  godModeCommand: () => '上帝模式',
  resetCommand: () => '重置',
  addCommand: () => '添加',
  removeCommand: () => '移除',
  everyGroupCommand: () => '所有群组',
  banChatCommand: () => '封禁聊天',
  unbanChatCommand: () => '解封聊天',
  restartCommand: () => '重启',
  shutdownBotCommand: () => '关闭机器人',
  updateBotCommand: () => '更新机器人',
  imageParam: () => '图片',
  pluginParam: () => '插件',
  linkParam: () => '链接',
  autoAdminParam: () => '自动管理',
  numMessagesParam: () => '消息数量',
  commandParam: () => '命令',
  groupParam: () => '群组',
  
  // AI菜单
  aiMenuTitle: () => '机器人菜单',
  generalCommands: () => '通用命令',
  iaCommand: () => '人工智能',
  alyaCommand: () => 'Alya',
  geminiCommand: () => 'gemini',
  chatgptCommand: () => 'chatgpt',
  deepseekCommand: () => 'deepseek',
  voiceCommand: () => '语音',
  imageCommand: () => '图片',
  image2Command: () => '图片2',
  image3Command: () => '图片3',
  animalInfoCommand: () => '动物信息',
  kcalCommand: () => '卡路里',
  summaryCommand: () => '摘要',
  recipeCommand: () => '食谱',
  
  // 安全菜单
  securityMenuTitle: () => '功能菜单',
  activateDisable: () => '启用/禁用',
  howToUse: () => '使用方法',
  activateFunction: () => '启用 [功能]',
  disableFunction: () => '禁用 [功能]',

// Ping/状态插件
systemStatusTitle: () => "⋆ ★ 🚀 系统状态 🚀 ★ ⋆",
uptime: () => "⌛ *运行时间:*",
ping: () => "⚡ *延迟:*",
cpuLabel: () => "💻 *CPU:*",
cpuUsage: () => "🔋 *使用率:*",
ramLabel: () => "💾 *内存:*",
freeRam: () => "🟢 *可用:*",
version: () => "版本:",

systemStatus: (params) => `${params?.title || '⋆ ★ 🚀 系统状态 🚀 ★ ⋆'}
╭♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩
୧ ⌛ *运行时间:* ${params?.uptime || 'N/A'}
୧ ⚡ *延迟:* ${params?.ping || 'N/A'} 毫秒
  💻 *CPU:* ${params?.cpuModel || '未知'}
  🔋 *使用率:* ${params?.cpuSpeed || 'N/A'} MHz
  💾 *内存:* ${params?.ramUsed || 'N/A'} / ${params?.ramTotal || 'N/A'}
  🟢 *可用:* ${params?.ramFree || 'N/A'}
╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩`,

menuFooter: () => "选择一个菜单：",
menuAdmin: () => "🛡️ 管理菜单",
menuOwner: () => "👑 所有者菜单",
menuSecurity: () => "🚨 安全菜单",
menuGroup: () => "👥 群组菜单",
menuAI: () => "🤖 AI菜单",
mainMenuTitle: () => "机器人菜单",
staffCommand: () => "工作人员",
candidatesCommand: () => "候选人",
installCommand: () => "安装",
guideCommand: () => "指南",
channelsCommand: () => "频道",
systemCommand: () => "系统",
faqCommand: () => "常见问题",
pingCommand: () => "延迟",
reportCommand: () => "报告",
suggestCommand: () => "建议",
newsCommand: () => "新闻",
versionLabel: () => "版本",
usersLabel: () => "用户",
chooseMenu: () => "选择一个菜单：",
mainMenuButton: () => "🏠 主菜单",
ownerMenuButton: () => "👑 所有者菜单",
securityMenuButton: () => "🚨 安全菜单",
groupMenuButton: () => "👥 群组菜单",
aiMenuButton: () => "🤖 AI菜单",
adminMenuTitle: () => "管理菜单",
promoteCommand: () => "p /设为管理",
demoteCommand: () => "r /取消管理",
warnCommands: () => "警告 /取消警告",
setScheduleCommand: () => "设置时间",
setNameCommand: () => "设置名称",
hidetagCommand: () => "隐藏标签",
tagallCommand: () => "标记所有人",
kickCommand: () => "踢出 /移除",
adminsCommand: () => "管理员",
openCloseCommand: () => "开启 /关闭",
setWelcomeCommand: () => "设置欢迎",
setByeCommand: () => "设置告别",
inactiveCommand: () => "不活跃成员",
listNumCommand: () => "列出号码 + 前缀",
cleanupCommand: () => "清理 + 前缀",
rulesCommand: () => "规则 /设置规则",
listWarnCommand: () => "警告列表",
linkCommand: () => "链接",
linkQrCommand: () => "链接二维码",
requestsCommand: () => "请求",
adminCommands: () => "管理命令",
poweredBy: () => '技术支持',
candidatesTitle: () => "🚀 加入CHATUNITY工作人员 🚀",
candidatesIntro: () => "想成为ChatUnity团队的一员，积累经验并被认可为团队成员吗？",
candidatesCall: () => "这是你的机会！填写表格（将保持匿名）申请并展示你的技能。",
candidatesWhatAwaits: () => "🔥 等待你的是什么：",
candidatesBenefit1: () => "✨ 在机器人中作为官方合作者获得官方认可",
candidatesBenefit2: () => "💼 在机器人和社区管理领域的实践经验",
candidatesBenefit3: () => "🎯 独家访问测试版机器人和预览功能",
candidatesBenefit4: () => "🤝 直接与ChatUnity开发团队合作",
candidatesCTA: () => "不要错过这个独特的机会！立即申请，证明你有能力带来改变！",
candidatesFormLabel: () => "📋 申请表格：",

installTitle: () => "⋆ ︵︵ ★ 💬 CHATUNITY-机器人 💬 ★ ︵︵ ⋆",
installIntro: () => "想在你的设备上安装ChatUnity机器人吗？",
installDescription: () => "按照GitHub上的完整安装指南，包含适用于Termux、Windows和其他操作系统的详细步骤。",
installGuideLabel: () => "📖 完整指南",
installRepoLabel: () => "📂 GitHub仓库",
installVideoLabel: () => "🎥 视频教程",
installFeatures: () => "✨ 你将找到：",
installFeature1: () => "📱 Termux完整安装",
installFeature2: () => "💻 Windows和其他操作系统安装",
installFeature3: () => "🔧 常见问题解决",
installFeature4: () => "📝 自动设置命令",
installCTA: () => "访问GitHub仓库开始安装并发现机器人的所有功能！",
installNeedHelp: () => "需要帮助吗？加入我们的支持频道！",

systemTitle: () => "⋆ ︵★ 🖥️ 系统状态 ★︵ ⋆",
systemHost: () => "🚩 *主机*",
systemOS: () => "🏆 *操作系统*",
systemArch: () => "💫 *架构*",
systemTotalRAM: () => "🥷 *总内存*",
systemFreeRAM: () => "🚀 *可用内存*",
systemUsedRAM: () => "⌛ *已用内存*",
systemUptime: () => "🕒 *运行时间*",
systemNodeMemory: () => "🪴 *Node.js内存:*",
systemRSS: () => "RSS",
systemHeapTotal: () => "堆总计",
systemHeapUsed: () => "已用堆",
systemExternal: () => "外部",
systemArrayBuffer: () => "ArrayBuffer",
systemDiskSpace: () => "☁️ *磁盘空间:*",
systemDiskTotal: () => "总计",
systemDiskUsed: () => "已用",
systemDiskAvailable: () => "可用",
systemDiskPercent: () => "使用百分比",
systemDiskError: () => "❌ 获取磁盘空间时出错。",

reportNoText: () => "⚠️ 请输入你要报告的问题的详细描述。",
reportTooShort: () => "⚠️ 描述太短。请提供至少10个字符以完成报告。",
reportTooLong: () => "⚠️ 描述超过1000个字符的最大限制。请缩短文本。",
reportTitle: () => "❌️ `报 告` ❌️",
reportNumber: () => "📱 号码",
reportUser: () => "👤 用户",
reportMessage: () => "📝 消息",
reportQuote: () => "📎 引用",
reportSuccess: () => "✅ 你的报告已成功发送给开发团队。\n\n_⚠️ 注意：虚假或不适当的报告可能导致机器人使用受限。_",
reportChannelTitle: () => "⚠️ 错误报告 ⚠️",
reportChannelBody: () => "收到新报告",
reportAnonymous: () => "匿名",
suggestNoText: () => "⚠️ 请输入你的命令建议。\n\n*示例:* .建议 (命令名称) (功能描述)",
suggestTooShort: () => "⚠️ 描述太短。请提供至少10个字符以完成建议。",
suggestTooLong: () => "⚠️ 描述超过1000个字符的最大限制。请缩短文本。",
suggestTitle: () => "💡 `建 议` 💡",
suggestNumber: () => "📱 号码",
suggestUser: () => "👤 用户",
suggestMessage: () => "📝 建议",
suggestQuote: () => "📎 引用",
suggestSuccess: () => "✅ 你的建议已成功发送给开发团队。\n\n_⚠️ 注意：非法或不适当的命令建议可能导致机器人使用受限。_",
suggestChannelTitle: () => "💡 命令建议 💡",
suggestChannelBody: () => "收到新建议",
suggestAnonymous: () => "匿名",
unwarnNoUser: () => "❌ 你需要提及用户或回复他的消息以移除警告。",
unwarnUserNotFound: () => "❌ 在数据库中找不到用户。",
unwarnNoWarnings: () => "ℹ️ 此用户没有活跃的警告可移除。",
unwarnSuccess: (params) => `✅ 警告已移除\n\n剩余警告: ${params?.remaining || 0}/3`,
setnameNoText: () => "⚠️ 请输入你要为群组设置的新名称。",
setnameSuccess: () => "✅ 群组名称修改成功！",
setnameError: () => "❌ 修改群组名称时发生错误。请重试。",
hidetagDefaultMessage: () => "📢 给所有人的消息",
hidetagStickerError: () => "❌ 无法下载贴纸。请重试。",
tagallTitle: () => "⋆ ︵︵ ★ 📢 群组成员 ★ ︵︵ ⋆",
tagallBot: () => "🤖 机器人",
tagallMessage: () => "📝 消息",
tagallEmptyMessage: () => "📢 注意群组成员！",
tagallMemberCount: (params) => `👥 总成员: ${params?.count || 0}`,
adminsCooldown: (params) => `⏳ 你需要等待 ${params?.time || '一会儿'} 才能再次呼叫管理员。\n\n_此命令有使用限制以避免滥用。_`,
adminsTitle: () => "⋆︵★ 🔔 管理员 ★︵⋆",
adminsMessage: () => "📝 呼叫原因",
adminsWarning: () => "⚠️ 此命令应仅用于紧急问题或重要情况。不当使用可能导致被移出群组。",
adminsNoMessage: () => "请求协助",
adminsNotification: () => "🔔 管理员已收到通知",
adminsExternalTitle: (params) => `${params?.groupName || '群组'}`,
adminsExternalBody: () => "呼叫管理员...",
groupOpen: () => "✅ 聊天对所有人开放\n\n୧ 所有成员现在都可以在群组中发送消息。",
groupClose: () => "🔒 仅限管理员聊天\n\n୧ 只有管理员可以在群组中发送消息。",
setwelcomeNoText: () => "⚠️ 请输入你要配置的个性化欢迎消息。\n\n*可用变量:*\n୧ @user - 提及用户\n୧ @group - 群组名称\n୧ @desc - 群组描述",
setwelcomeSuccess: () => "✅ 欢迎消息已配置\n\n୧ 欢迎消息已成功为此群组设置。",
setbyeNoText: () => "⚠️ 请输入你要配置的个性化告别消息。\n\n*可用变量:*\n୧ @user - 提及用户\n୧ @group - 群组名称",
setbyeSuccess: () => "✅ 告别消息已配置\n\n୧ 告别消息已成功为此群组设置。",
inactiveMenuTitle: () => "🌙 不活跃成员管理",
inactiveMenuFound: (params) => `💤 找到不活跃成员: *${params?.inactive || 0}/${params?.total || 0}*\n\n⏰ 超过7天不活跃\n\n请在下方选择一个选项：`,
inactiveListTitle: () => "📋 不活跃成员列表",
inactiveListNone: () => "✅ 未找到不活跃成员！\n\n🎉 群组中所有成员都很活跃。",
inactiveListItem: (params) => `${params?.index}. @${params?.user}`,
inactiveRemoveStart: (params) => `⚠️ 移除不活跃成员：即将删除 *${params?.count}* 名成员。\n\n❗ 此操作无法撤销！\n\n确认要继续吗？`,
inactiveRemoveSuccess: (params) => `✅ 移除完成！\n\n🗑️ 已移除成员: *${params?.removed}*${params?.errors ? `\n⚠️ 错误: *${params.errors}* 名成员未移除` : ''}`,
inactiveRemoveNone: () => "✅ 没有要移除的成员！群组所有成员都很活跃。",
inactiveConfirmTitle: () => "⚠️ 确认移除",
inactiveBackButton: () => "🔄 返回菜单",
inactiveListButton: () => "📋 查看列表",
inactiveRemoveButton: () => "🗑️ 移除不活跃成员",
inactiveConfirmButton: () => "✅ 确认移除",
inactiveCancelButton: () => "❌ 取消",
inactiveNotAdmin: () => "❌ 只有*管理员*可以使用此功能。",
inactiveUnknown: () => "❌ 无效选项。请使用按钮。",
inactiveResultTitle: () => "📊 不活跃成员移除结果",
inactiveGroupLabel: () => "👥 群组",
inactiveFooter: () => "不活跃群组管理",
noBotAdmin: () => "⚠️ 我必须成为管理员才能移除用户",
  noMention: () => "⚠️ 提及或回复要移除的人的消息",
  cannotRemoveOwner: () => "⚠️ 你不能移除机器人的创建者",
  cannotRemoveBot: () => "⚠️ 你不能移除机器人本身",
  cannotRemoveSelf: () => "⚠️ 你不能移除自己",
  targetIsGroupOwner: () => "⚠️ 你不能移除群组的创建者",
  targetIsAdmin: () => "⚠️ 你不能移除群组的管理员",
  kickSuccess: (params) => `╭─────────────────\n│ ✦ @${params?.target} 已被移除\n│ ✦ 由 @${params?.executor}${params?.reason ? `\n│\n│ 📝 原因: ${params.reason}` : ''}\n╰─────────────────`,
  title: () => "⚠️ 已警告用户",
totalUsers: (params) => `总计: ${params?.count || 0} 用户`,
userEntry: (params) => `${params?.index}. ${params?.name || '未知'} (${params?.warns}/3)`,
noWarns: () => "✓ 没有用户收到警告",
unknownUser: () => "未知",
noBotAdmin: () => "⚠️ 我必须成为管理员才能获取群组链接",
qrCaption: (params) => `╭─────────────────\n│ 🔗 群组二维码\n│ *${params?.groupName}*\n│\n│ 扫描加入\n╰─────────────────`,
qrError: () => "❌ 生成二维码时出错",
noBotAdmin: () => "⚠️ 我必须成为管理员才能管理请求",
noAdmin: () => "⚠️ 只有群组管理员可以使用此命令",
noPending: () => "✓ 没有待处理请求",
pendingCount: (params) => `╭─────────────────\n│ 📨 待处理请求: ${params?.count}\n│\n│ 选择一个选项\n╰─────────────────`,
menuFooter: () => "群组请求管理",
buttonAcceptAll: () => "✅ 全部接受",
buttonRejectAll: () => "❌ 全部拒绝",
buttonAccept39: () => "🇮🇹 接受 +39",
buttonManage: () => "📥 管理请求",
acceptedSuccess: (params) => `✅ 已接受 ${params?.count} 个请求`,
rejectedSuccess: (params) => `❌ 已拒绝 ${params?.count} 个请求`,
no39Found: () => "⚠️ 未找到带+39前缀的请求",
accepted39Success: (params) => `✅ 已接受 ${params?.count} 个带+39前缀的请求`,
errorAccepting: () => "❌ 接受请求时出错",
errorRejecting: () => "❌ 拒绝请求时出错",
invalidNumber: () => "⚠️ 无效数字。请使用大于0的数字",
invalidInput: () => "⚠️ 无效输入。请发送数字或'39'",
manageCustom: (params) => `╭─────────────────\n│ 📥 个性化管理\n│\n│ 你想接受多少个请求？\n│\n│ ✦ 使用: .${params?.command} 接受 <数字>\n│ ✦ 示例: .${params?.command} 接受 7\n╰─────────────────`,
manageFooter: () => "个性化请求管理",
notAvailable: () => "⚠️ 此命令仅适用于ChatUnity基础版",
imageNotFound: () => "⚠️ 加载图片时出错",
mainTitle: () => "🌐 我们的社交网络",
mainSubtitle: () => "随处关注我们以保持更新",
mainFooter: () => "技术支持 ChatUnity",
instagramTitle: () => "📸 Instagram",
instagramBody: () => "在Instagram上关注我们获取每日照片和故事！",
instagramButton: () => "打开Instagram",
tiktokTitle: () => "🎵 TikTok",
tiktokBody: () => "在TikTok上发现创意和有趣的内容！",
tiktokButton: () => "打开TikTok",
youtubeTitle: () => "🎬 YouTube",
youtubeBody: () => "在我们的YouTube频道上观看视频、教程和直播！",
youtubeButton: () => "打开YouTube",
discordTitle: () => "💬 Discord",
discordBody: () => "加入我们的Discord社区！",
discordButton: () => "打开Discord",
telegramTitle: () => "✈️ Telegram",
telegramBody: () => "在Telegram频道上获取新闻和更新！",
telegramButton: () => "打开Telegram",
whatsappTitle: () => "💚 WhatsApp频道",
whatsappBody: () => "在我们的官方WhatsApp频道上保持更新！",
whatsappButton: () => "打开频道",
cardFooter: () => "ChatUnity社交",
followUpMessage: () => "👆 滑动卡片查看我们所有的社交频道！\n\n✦ 关注我们以保持更新",
followUpFooter: () => "ChatUnity团队",
menuButton: () => "📋 返回菜单",
errorLoading: () => "⚠️ 加载社交信息时出错",


   linkTitle: () => "🔗 群组链接",
   linkFooter: () => "复制链接并分享",
    copyButton: () => "📋 复制链接",


  
  pingTitle: () => "⚡ PONG！",
  pingResponse: (params) => `⚡ *延迟:* ${params?.ping || 'N/A'} 毫秒`,
  socialNotAvailable: () => "⚠️ 命令当前不可用。请稍后重试。",
socialInstagramTitle: () => "📸 Instagram",
socialInstagramBody: () => "在Instagram上关注我们获取独家内容、更新和机器人新闻！",
socialInstagramButton: () => "在Instagram上关注",
socialTiktokTitle: () => "🎵 TikTok",
socialTiktokBody: () => "在TikTok上发现我们的视频，了解最热门的内容！",
socialTiktokButton: () => "在TikTok上关注",
socialYoutubeTitle: () => "📺 YouTube",
socialYoutubeBody: () => "订阅我们的YouTube频道获取教程、指南和视频更新！",
socialYoutubeButton: () => "在YouTube上订阅",
socialDiscordTitle: () => "💬 Discord",
socialDiscordBody: () => "加入我们的Discord社区获取支持、聊天等！",
socialDiscordButton: () => "加入Discord",
socialTelegramTitle: () => "✈️ Telegram",
socialTelegramBody: () => "在Telegram上关注我们获取即时新闻和直接沟通！",
socialTelegramButton: () => "在Telegram上关注",
socialWhatsappTitle: () => "💚 WhatsApp",
socialWhatsappBody: () => "订阅我们的WhatsApp频道获取官方更新！",
socialWhatsappButton: () => "在WhatsApp上关注",
socialCardFooter: () => "ChatUnity社交",
socialMainTitle: () => "⋆ ︵︵ ★ 🌐 社交媒体 ★ ︵︵ ⋆",
socialMainSubtitle: () => "关注我们的官方频道",
socialMainFooter: () => "与ChatUnity保持连接",
socialFollowUpMessage: () => "✨ 感谢你的兴趣！\n\n୧ 关注我们所有的社交频道，不错过任何更新。",
socialFollowUpFooter: () => "ChatUnity - 永远连接",
socialMenuButton: () => "🏠 主菜单",
socialErrorLoading: () => "❌ 加载社交信息时发生错误。请稍后重试。",
listawarnTitle: () => "꒷꒦ ✦ 已警告用户列表 ✦ ꒷꒦",
listawarnMode: () => "模式",
listawarnGroup: () => "群组",
listawarnTotal: ({ count }) => `总计: ${count} ${count === 1 ? '名用户被警告' : '名用户被警告'}`,
listawarnNoWarns: () => "✨ 没有用户被警告",
listawarnUnknownUser: () => "未知用户",
listawarnUserNumber: ({ index }) => `${index}.`,
listawarnTag: () => "标签:",
listawarnGroups: () => "群组:",
listawarnNoActiveWarns: () => "没有活跃警告",
listawarnErrorRetrieving: () => "检索时出错",
listawarnTotalWarns: ({ count }) => `${count} 总计`,
listawarnOwnerOnly: () => "❌ 此命令仅可由所有者在私聊中使用。",
listawarnAllUsers: () => "所有用户",
kickNoBotAdmin: () => "❌ 机器人必须是管理员才能移除用户。",
kickNoMention: () => "⚠️ 提及或引用要从群组中移除的用户。",
kickCannotRemoveOwner: () => "🛡️ 你不能移除机器人的创建者。",
kickCannotRemoveBot: () => "🤖 你不能从群组中移除机器人。",
kickCannotRemoveSelf: () => "😅 你不能用此命令移除自己。",
kickTargetIsGroupOwner: () => "👑 你尝试移除的用户是群组的创建者。",
kickTargetIsAdmin: () => "🛡️ 你尝试移除的用户是管理员。",
kickSuccess: ({ target, executor, reason }) => `꒷꒦ ✦ 用户已移除 ✦ ꒷꒦\n\n┊ 『 👤 』 用户: @${target}\n┊ 『 ⚖️ 』 移除者: @${executor}${reason ? `\n┊ 『 📝 』 原因: ${reason}` : ''}\n\n╰★────★────★`,
linkgroupNoBotAdmin: () => "❌ 机器人必须是管理员才能获取群组链接。",
linkgroupLinkTitle: ({ groupName }) => `꒷꒦ ✦ 群组链接 ✦ ꒷꒦\n\n┊ 『 📱 』 群组: ${groupName}\n┊ 『 🔗 』 点击按钮复制链接`,
linkgroupLinkFooter: () => "技术支持 ChatUnity机器人",
linkgroupCopyButton: () => "📋 复制链接",
joinNoLink: ({ prefix, command }) => `⚠️ 请输入群组链接。\n\n┊ 『 💡 』 示例: ${prefix}${command} <链接> <天数 | 无限>`,
joinInvalidLink: () => "❌ 无效的群组链接。",
joinSuccessInfinite: () => "꒷꒦ ✦ 加入群组 ✦ ꒷꒦\n\n┊ 『 ✅ 』 我已成功加入群组\n┊ 『 ⏰ 』 停留时间: 无限期\n\n╰★────★────★",
joinSuccessExpired: ({ days }) => `꒷꒦ ✦ 加入群组 ✦ ꒷꒦\n\n┊ 『 ✅ 』 我已成功加入群组\n┊ 『 ⏰ 』 停留时间: ${days} 天\n\n╰★────★────★`,
banuserNoTarget: () => "⚠️ 请标记用户、回复消息或写下电话号码。\n\n┊ 『 💡 』 示例: @3934xxxxxxx",
banuserInvalidNumber: () => "❌ 无效的电话号码。",
banuserSuccess: ({ target }) => `꒷꒦ ✦ 用户已封禁 ✦ ꒷꒦\n\n┊ 『 🚫 』 用户: @${target}\n┊ 『 ⚠️ 』 此用户已被机器人封禁\n┊ 『 📵 』 将无法再使用命令\n\n╰★────★────★`,
unbanuserNoTarget: () => "⚠️ 标记用户、回复消息或写下电话号码。\n\n┊ 『 💡 』 示例: @3934xxxxxxx",
unbanuserInvalidNumber: () => "❌ 无效的电话号码。",
unbanuserSuccess: ({ target }) => `꒷꒦ ✦ 用户已解封 ✦ ꒷꒦\n\n┊ 『 ✅ 』 用户: @${target}\n┊ 『 🎉 』 此用户已被解封\n┊ 『 📱 』 现在可以使用机器人命令\n\n╰★────★────★`,
listanumNoPrefix: () => "⚠️ 请输入要搜索的电话前缀。\n\n┊ 『 💡 』 示例: .列出号码 39",
listanumInvalidPrefix: () => "❌ 前缀必须是有效数字。",
listanumTitle: ({ prefix }) => `꒷꒦ ✦ +${prefix} 号码列表 ✦ ꒷꒦`,
listanumNoUsers: ({ prefix }) => `꒷꒦ ✦ 无用户 ✦ ꒷꒦\n\n┊ 『 ℹ️ 』 未找到带+${prefix}前缀的用户\n\n╰★────★────★`,
puliziaStart: ({ prefix }) => `꒷꒦ ✦ 清理已开始 ✦ ꒷꒦\n\n┊ 『 🔄 』 移除带+${prefix}前缀的用户\n┊ 『 ⏳ 』 请等待完成...\n\n╰★────★────★`,
puliziaNoBotAdmin: () => "❌ 机器人必须是管理员才能移除用户。",
puliziaNoRestrict: () => "❌ 限制模式未启用。",
puliziaUserLeft: ({ user }) => `@${user} 已被移除`,
getNoInput: () => "⚠️ 命令使用不正确。\n\n╰★─ 单例示例 ─★╮\n┊ 获取插件 群组菜单 脚本\n┊ 获取文件 config.js 文件\n\n╰★─ 多例示例 ─★╮\n┊ 获取插件 管理 & 菜单 & 配置\n┊ 获取插件 管理 & 菜单 & 配置 脚本\n┊ 获取插件 管理 脚本 & 菜单 文件\n┊ (最多同时3个插件)\n\n╰♡꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷",
getNoPluginFound: () => "❌ 在多请求中未找到有效插件。",
getMultiSelect: ({ pluginList }) => `꒷꒦ ✦ 已选插件 ✦ ꒷꒦\n\n${pluginList}\n\n┊ 『 ❓ 』你想如何接收所有插件？\n\n╰★────★────★`,
getMultiScriptBtn: () => "📄 全部脚本",
getMultiFileBtn: () => "📎 全部文件",
getMultiResult: ({ successCount, total, results }) => `꒷꒦ ✦ 多重请求 ✦ ꒷꒦\n\n┊ 『 📦 』 ${successCount}/${total} 个插件找到\n\n${results}\n\n╰★────★────★`,
getFileSelect: ({ filename }) => `꒷꒦ ✦ 已选文件 ✦ ꒷꒦\n\n┊ 『 📁 』 ${filename}\n\n┊ 『 ❓ 』你想做什么？\n\n╰★────★────★`,
getScriptBtn: () => "📄 脚本",
getFileBtn: () => "📎 文件",
getNoSimilar: ({ type, name }) => `❌ 未找到与"${name}"相似的${type}。`,
getFoundConfirm: ({ filename, score }) => `꒷꒦ ✦ 已找到 ✦ ꒷꒦\n\n┊ 『 ✨ 』 "${filename}"\n┊ 『 📊 』 准确率: ${score}%\n\n┊ 『 ❓ 』确认吗？\n\n╰♡꒷ ๑ 回复: 是/否`,
getMultiChoice: ({ name, options }) => `꒷꒦ ✦ "${name}"的结果 ✦ ꒷꒦\n\n${options}\n\n┊ 『 📝 』选择数字或"否"取消\n\n╰★────★────★`,
getDirNotFound: ({ dir }) => `❌ 未找到目录 ${dir}。`,
getFileSuccess: ({ prefix, filename, type }) => `${prefix}꒷꒦ ✦ 成功 ✦ ꒷꒦\n\n┊ 『 ✅ 』这是${type}: ${filename}\n\n╰★────★────★`,
getScriptSuccess: ({ prefix, filename, content }) => `${prefix}꒷꒦ ✦ ${filename}的代码 ✦ ꒷꒦\n\n${content}\n\n╰★────★────★`,
getInvalidOption: () => "❌ 无效选项！使用\"文件\"或\"脚本\"。",
getScriptOnlyJS: () => "❌ 脚本选项仅适用于JavaScript文件。",
getSyntaxError: ({ prefix, filename, error }) => `${prefix}꒷꒦ ✦ 语法错误 ✦ ꒷꒦\n\n┊ 『 ⛔️ 』 文件: ${filename}\n\n${error}\n\n╰★────★────★`,
getFileError: ({ prefix, filename, error }) => `${prefix}❌ 错误: 文件 ${filename} 不存在或无法读取。\n\n${error}`,
getProcessError: ({ filename, error }) => `❌ 处理 ${filename} 时出错: ${error}`,
getOperationCancelled: () => "꒷꒦ ✦ 操作已取消 ✦ ꒷꒦\n\n┊ 『 ❌ 』 请求已成功取消\n\n╰★────★────★",
getGenericError: ({ error }) => `❌ 错误: ${error}`,
leaveNotAdmin: () => "⚠️ 此命令只能由群组管理员和所有者使用。",
leaveMessage: () => "꒷꒦ ✦ 再见 ✦ ꒷꒦\n\n┊ 『 👋 』 机器人正在离开群组\n\n╰★────★────★",
leaveError: () => "❌ 离开群组时发生错误。",
saveNoName: () => "⚠️ 指定要保存的插件名称。",
saveNoQuoted: () => "⚠️ 需要回复包含插件代码的消息。",
saveSaveSuccess: ({ path }) => `꒷꒦ ✦ 插件已保存 ✦ ꒷꒦\n\n┊ 『 ✅ 』 文件创建成功\n┊ 『 📁 』 路径: ${path}\n\n╰★────★────★`,
saveErrorWrite: ({ error }) => `❌ 保存插件时出错。\n\n${error}`,
deleteNoPlugins: () => "⚠️ 没有可删除的可用插件。",
deleteHelp: ({ usedPrefix, pluginList, total }) => `꒷꒦ ✦ 删除插件管理器 ✦ ꒷꒦\n\n┊ 『 📌 』 命令用法:\n┊ ${usedPrefix}删除插件 <名称>\n\n┊ 『 ✨ 』 示例:\n┊ ${usedPrefix}删除插件 官方菜单\n\n┊ 『 📋 』 可用插件:\n${pluginList}${total > 15 ? `\n┊ ... 和其他 ${total - 15} 个插件` : ''}\n\n╰★────★────★`,
deleteInvalidNumber: ({ max }) => `❌ 无效数字！范围: 1-${max}`,
deleteNoSimilar: ({ input }) => `❌ 未找到与"${input}"相似的插件。`,
deleteConfirm: ({ filename, score }) => `꒷꒦ ✦ 找到插件 ✦ ꒷꒦\n\n┊ 『 ✨ 』 "${filename}"\n┊ 『 📊 』 匹配度: ${score}%\n\n┊ 『 🗑️ 』 要删除它吗？\n\n╰♡꒷ ๑ 回复: 是/否`,
deleteMultiChoice: ({ input, options }) => `꒷꒦ ✦ "${input}"的结果 ✦ ꒷꒦\n\n${options}\n\n┊ 『 📝 』 选择数字或"否"取消\n\n╰★────★────★`,
deleteNotFound: ({ path }) => `꒷꒦ ✦ 注意 ✦ ꒷꒦\n\n┊ 『 📁 』 在文件系统中未找到文件\n\n┊ 『 🔍 』 搜索路径:\n┊ ${path}\n\n╰★────★────★`,
deleteSuccess: ({ pluginName, sender, time }) => `꒷꒦ ✦ 插件已删除 ✦ ꒷꒦\n\n┊ 『 🗑️ 』 插件删除成功\n\n┊ 『 📝 』 名称: ${pluginName}.js\n┊ 『 👤 』 删除者: @${sender}\n┊ 『 🕐 』 时间: ${time}\n\n┊ 『 ⚠️ 』 注意: 机器人可能需要\n┊ 重启以应用更改\n\n╰★────★────★\n\n🎯 操作完成！`,
deleteError: ({ error }) => `꒷꒦ ✦ 系统错误 ✦ ꒷꒦\n\n┊ 『 ❌ 』 无法删除插件\n\n┊ 『 🔍 』 错误详情:\n┊ ${error}\n\n┊ 『 💡 』 可能的解决方案:\n┊ -  检查文件权限\n┊ -  验证插件未被使用\n┊ -  几秒后重试\n\n╰★────★────★`,
deleteOperationCancelled: () => "꒷꒦ ✦ 操作已取消 ✦ ꒷꒦\n\n┊ 『 ❌ 』 删除已取消\n\n╰★────★────★",
deleteGenericError: ({ error }) => `❌ 错误: ${error}`,
broadcastNoOwner: () => "❌ 只有所有者可以使用此命令！",
broadcastNoGroups: () => "❌ 机器人不在任何群组中！",
broadcastHeader: () => "꒷꒦ ✦ 来自ChatUnity的消息 ✦ ꒷꒦",
broadcastIntro: () => "┊ 『 👑 』 亲爱的群组成员，所有者发来了新消息：",
broadcastLabel: () => "┊ 『 📝 』 消息:",
broadcastNote: () => "┊ 『 ⚠️ 』 此消息已发送给所有群组成员",
broadcastFooter: () => "╰★────★────★\n\n> © 技术支持 ChatUnity",
broadcastSuccess: ({ count }) => `꒷꒦ ✦ 广播完成 ✦ ꒷꒦\n\n┊ 『 ✅ 』 消息发送成功\n┊ 『 📊 』 到达群组: ${count}\n┊ 『 👥 』 所有成员已被提及\n\n╰★────★────★`,
broadcastDefaultMessage: () => "这是发送给所有群组的默认消息。",
broadcastError: ({ group, error }) => `❌ 发送消息到群组 ${group} 时出错: ${error}`,
banChatSuccess: () => "꒷꒦ ✦ 聊天已封禁 ✦ ꒷꒦\n\n┊ 『 🚫 』 聊天封禁成功\n┊ 『 ⚠️ 』 机器人将不再在此聊天中回复\n\n╰★────★────★",
unbanChatSuccess: () => "꒷꒦ ✦ 聊天已解封 ✦ ꒷꒦\n\n┊ 『 ✅ 』 聊天解封成功\n┊ 『 🎉 』 机器人可以再次在此聊天中回复\n\n╰★────★────★",
restartInitiating: () => "꒷꒦ ✦ 正在重启 ✦ ꒷꒦\n\n┊ 『 ⏳ 』 请稍候...\n\n╰★────★────★",
restartProgress: () => "🚀🚀🚀🚀🚀🚀",
restartSuccess: () => "꒷꒦ ✦ 重启完成 ✦ ꒷꒦\n\n┊ 『 ✅ 』 机器人重启成功\n┊ 『 🎉 』 操作系统\n\n╰★────★────★",
restartError: ({ error }) => `꒷꒦ ✦ 重启错误 ✦ ꒷꒦\n\n┊ 『 ❌ 』 无法重启机器人\n┊ 『 🔍 』 错误: ${error}\n\n╰★────★────★`,
shutdownInitiating: () => "꒷꒦ ✦ 关闭机器人 ✦ ꒷꒦\n\n┊ 『 🔌 』 正在关闭机器人...\n┊ 『 🚫 』 所有聊天已被封禁\n┊ 『 ⏳ 』 等待关闭\n\n╰★────★────★",
shutdownSuccess: () => "꒷꒦ ✦ 机器人已关闭 ✦ ꒷꒦\n\n┊ 『 ✅ 』 关闭完成\n┊ 『 💤 』 机器人离线\n\n╰★────★────★",
shutdownChatsBanned: ({ count }) => `┊ 『 📊 』 ${count} 个聊天被封禁`,
shutdownError: ({ error }) => `꒷꒦ ✦ 关闭错误 ✦ ꒷꒦\n\n┊ 『 ❌ 』 无法关闭机器人\n┊ 『 🔍 』 错误: ${error}\n\n╰★────★────★`,
updateInitiating: () => "꒷꒦ ✦ 更新机器人 ✦ ꒷꒦\n\n┊ 『 🔄 』 检查更新中...\n┊ 『 ⏳ 』 请稍候\n\n╰★────★────★",
updateSuccess: ({ output }) => `꒷꒦ ✦ 更新完成 ✦ ꒷꒦\n\n┊ 『 ✅ 』 机器人更新成功\n\n┊ 『 📋 』 详情:\n${output}\n\n╰★────★────★`,
updateError: ({ error }) => `꒷꒦ ✦ 更新错误 ✦ ꒷꒦\n\n┊ 『 ❌ 』 无法更新机器人\n┊ 『 🔍 』 错误: ${error}\n\n┊ 『 💡 』 可能的解决方案:\n┊ -  检查互联网连接\n┊ -  检查Git权限\n┊ -  确保在有效分支上\n\n╰★────★────★`,
updateNoChanges: () => "꒷꒦ ✦ 已是最新 ✦ ꒷꒦\n\n┊ 『 ℹ️ 』 机器人已是最新版本\n┊ 『 ✅ 』 无可用更新\n\n╰★────★────★",
groupMenuTitle: () => "群组菜单",
chooseMenu: () => "从菜单中选择一个类别：",
mainMenuButton: () => "🏠 主菜单",
adminMenuButton: () => "🛡️ 管理菜单",
ownerMenuButton: () => "👑 所有者菜单",
securityMenuButton: () => "🚨 安全菜单",
aiMenuButton: () => "🤖 AI菜单",
musicAudioSection: () => "音乐和音频",
infoUtilitySection: () => "信息和实用工具",
imageEditSection: () => "图片和编辑",
pokemonSection: () => "宝可梦",
gamesCasinoSection: () => "游戏和赌场",
economyRankingSection: () => "经济和排名",
socialInteractionSection: () => "社交互动",
howMuchSection: () => "有多少？",
personalityTestSection: () => "个性测试",
memberCommands: () => "成员命令",
versionLabel: () => "版本",
collabLabel: () => "合作",
songCommand: () => "歌曲",
audioCommand: () => "音频",
videoCommand: () => "视频",
cityCommand: () => "城市",
textCommand: () => "文本",
groupCommand: () => "群组",
userCommand: () => "用户",
checkSiteCommand: () => "检查网站",
photoToStickerCommand: () => "照片转贴纸",
stickerToPhotoCommand: () => "贴纸转照片",
improveQualityCommand: () => "提高照片质量",
photoCommand: () => "照片",
hiddenPhotoCommand: () => "隐藏照片",
memeCommand: () => "表情包",
fromStickerCommand: () => "从贴纸",
blurImageCommand: () => "模糊图片",
comingSoonCommand: () => "即将推出",
quantityCommand: () => "数量",
headsOrTailsCommand: () => "正面或反面",
mathProblemCommand: () => "数学问题",
rockPaperScissorsCommand: () => "石头剪刀布",
pokemonInfoCommand: () => "宝可梦信息",
balanceCommand: () => "余额",
topUsersCommand: () => "顶级用户",
withdrawUCCommand: () => "从银行取UC",
earnXPCommand: () => "赚取XP",
endRelationshipCommand: () => "结束关系",
affinityCommand: () => "亲和力",
charmCommand: () => "魅力",
createFightCommand: () => "创建争吵",
truthOrDareCommand: () => "真心话大冒险",
playNoText: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n ❗ 输入标题或链接\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
playNoResults: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n ❗ 未找到结果\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
playAudioLoading: () => "┊ ┊ ┊ ┊‿ ˚➶ ｡˚\n┊ ┊ ┊ ┊. ➶ ˚\n┊ ┊ ┊ ˚✧ 🎵 音频即将到达\n┊ ˚➶ ｡˚ ☁︎ 请稍等片刻...",
playVideoLoading: () => "┊ ┊ ┊ ┊‿ ˚➶ ｡˚\n┊ ┊ ┊ ┊. ➶ ˚\n┊ ┊ ┊ ˚✧ 🎬 视频即将到达\n┊ ˚➶ ｡˚ ☁︎ 请稍等片刻...",
playDownloadComplete: () => "✅ 下载完成！",
playTooLong: ({ maxMinutes, duration }) => `╭★────★────★\n|ㅤㅤㅤㅤㅤㅤㅤ꒰视频太长！꒱\n|˚₊꒷ ⏳ ꒱ ฅ﹕最长: ${maxMinutes} 分钟 ₊˚๑\n|˚₊꒷ ⌛ ꒱ ฅ﹕时长: ${duration} ₊˚๑\n╰★────★────★`,
playVideoInfo: ({ title, timestamp, views, author, ago, url }) => `⋆ ︵︵ ★ 🎥 视频信息 🎥 ★ ︵︵ ⋆\n\n\n꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧\n୧ ✍️ *标题:* ${title}\n୧ ⏳ *时长:* ${timestamp}\n୧ 👀 *观看次数:* ${views}\n୧ 🔰 *频道:* ${author}\n୧ 🔳 *发布时间:* ${ago}\n୧ 🔗 *链接:* ${url}\n꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧\n\n\n╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩\n  > 选择下载格式\n╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩`,
playChooseFormat: () => "选择一个格式：",
playAudioButton: () => "🎵 音频",
playVideoButton: () => "🎬 视频",
playSaveButton: () => "💾 保存播放列表",
playError: ({ error }) => `꒰🩸꒱ ◦- ≫ 错误\n ★・・・・・・・★\n  ${error}\n ★・・・・・・・★`,
playNoValidLink: () => "꒰🩸꒱ ◦- ≫ 错误\n ★・・・・・・・★\n  未找到有效链接\n ★・・・・・・・★",
playlistEmpty: ({ userName }) => `ℹ️ ${userName ? `${userName} 没有保存的曲目` : '你的播放列表是空的！'}`,
playlistHeader: ({ userName }) => `📋 ${userName ? `${userName}的播放列表` : '你的播放列表'}`,
playlistMore: ({ count }) => `...和其他 ${count} 首曲目`,
playlistSelectToPlay: () => "选择要播放的曲目",
saveNoText: () => "⚠️ 指定要搜索的曲目",
saveSearching: ({ query }) => `⌛ 搜索 "${query}"...`,
saveNoResults: () => "⚠️ 未找到结果",
saveAlreadyExists: () => "⚠️ 歌曲已在播放列表中！使用 .播放列表 查看保存的歌曲。",
saveSaved: () => "✅ 歌曲已保存！",
saveViewPlaylist: () => "📋 查看播放列表",
savePlay: () => "🎵 播放",
saveDelete: () => "🗑️ 删除",
saveSaveNew: () => "💾 保存新歌曲",
deleteSelect: () => "🗑️ 选择要删除的曲目",
deleteUse: () => "使用: .删除 <数字>",
deleteInvalid: () => "⚠️ 无效数字！",
deleteSuccess: () => "✅ 曲目已删除！",
deleteRestore: () => "💾 恢复",
backButton: () => "🔙 返回",
playlistError: ({ error }) => `⚠️ 错误: ${error}`,
playlistSignature: () => "꙰ 创作 Gab333 ꙰",
ytSearchMissingFiles: () => "❗ 要使用此命令，请使用ChatUnity基础版",
ytSearchMissingQuery: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n 📌 输入视频名称\n 示例: .油管搜索 合集\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
ytSearchNoResults: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n ❌ 未找到结果\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
ytSearchTitle: () => "🔎 YouTube搜索",
ytSearchFooter: () => "ChatUnity ✦ 下载器",
ytSearchResultTitle: () => "🎬 YouTube结果",
ytSearchResultHeader: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n ୧ 🎬 ୭ 搜索结果\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 找到的结果如下 ✦ ꒷꒦",
ytSearchSelectPrompt: () => "╭★────★────★────★╮\n│ 🔢 从上方结果中选择视频\n╰★────★────★╯",
ytSearchDuration: () => "📺 时长:",
ytSearchViews: () => "👁 观看次数:",
ytSearchChannel: () => "👤 频道:",
toAudioNoMedia: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ⚠️ 回复视频或音频\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
toAudioDownloadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ 下载时出错\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
toAudioConvertError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ 转换时出错\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",


weatherNoCity: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❗ 输入城市名称\n  用法: .天气 [城市名称]\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
weatherInfo: ({ name, country, temp, feels, min, max, humidity, main, desc, wind, pressure }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🌍 ୭ *${name}, ${country}的天气*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 天气信息 ✦ ꒷꒦\n\n🌡 温度: ${temp}°C\n🌡 体感: ${feels}°C\n🌡 最低: ${min}°C\n🌡 最高: ${max}°C\n💧 湿度: ${humidity}%\n☁ 天气: ${main}\n🌫 描述: ${desc}\n💨 风速: ${wind} 米/秒\n🔽 气压: ${pressure} 百帕\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🌤️\n│ 技术支持 OpenWeather\n╰★────★────★╯`,
weatherCityNotFound: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  🚫 城市未找到\n  检查拼写\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
weatherError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ⚠️ 获取时出错\n  请稍后重试\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
translateHelp: ({ prefix, command, languages }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🌍 ୭ *翻译器*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 使用示例 ✦ ꒷꒦\n\n│ ${prefix}${command} 你好\n│ ${prefix}${command} en 你好\n│ ${prefix}${command} ja Hello\n│ ${prefix}${command} [回复消息]\n│ ${prefix}说话 ar 文本\n\n꒷꒦ ✦ 可用语言 ✦ ꒷꒦\n\n${languages}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🌐\n│ ChatUnity翻译器\n╰★────★────★╯`,
translateNoText: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ 音频缺少文本\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
translateNoLang: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ 未指定语言\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
translateWhatToTranslate: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ 那我应该翻译什么？\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
translateTooLong: ({ max, length }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ 文本太长\n  最长: ${max} 字符\n  你的: ${length} 字符\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
translateResult: ({ fromLang, toLang, translation }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🌍 ୭ *翻译器*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 从: ${fromLang} ✦ ꒷꒦\n꒷꒦ ✦ 到: ${toLang} ✦ ꒷꒦\n\n${translation}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎯\n│ 翻译完成\n╰★────★────★╯`,
translateListenOriginal: () => "🔊 听原文",
translateListenTranslation: () => "🎵 听翻译",
translateFooter: () => "ChatUnity翻译器",
translateTTSError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ 音频错误: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
translateError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ❌ 翻译时出错\n  请稍后重试\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
antiLinkNotAdmin: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *暂时保存*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 我不是管理员 ✦ ꒷꒦\n\n我无能为力",
antiLinkDetected: ({ user, qrDetected }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚫 ୭ *反链接已激活*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 违反规则 ✦ ꒷꒦\n\n${user} 🤨 你违反了群组规则${qrDetected ? '，你以为我看不到二维码吗？😂' : '。'}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 👮\n│ 自动踢出\n╰★────★────★╯`,
antiLinkRestrictOff: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *限制已禁用*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 需要操作 ✦ ꒷꒦\n\n联系机器人所有者激活RESTRICT\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔧\n│ 功能不可用\n╰★────★────★╯",
antiMediaWarning: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *反媒体已激活*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 违反规则 ✦ ꒷꒦\n\n只允许1次查看的照片和视频\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🚫\n│ 媒体已删除\n╰★────★────★╯",
antiSpamDetected: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚫 ୭ *检测到反垃圾邮件*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 检测到垃圾邮件 ✦ ꒷꒦\n\n用户因垃圾邮件行为已被移除\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ⚡\n│ ChatUnity x 333保护\n╰★────★────★╯",
antiTrabaAdminWarning: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *管理员注意*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 检测到长消息 ✦ ꒷꒦\n\n嘿 @${user} 你在这里发长消息很开心吗？你真幸运是管理员！ -.- \n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🛡️\n│ 受身份保护\n╰★────★────★╯`,
antiTrabaDetected: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚫 ୭ *反长消息已激活*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 检测到长消息 ✦ ꒷꒦\n\n用户 @${user} 发送了太长的消息将被移除\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🚨\n│ ChatUnity保护\n╰★────★────★╯`,
antiTrabaNoPermission: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚠️ ୭ *权限不足*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 操作被阻止 ✦ ꒷꒦\n\n我没有管理员权限来移除发送长消息的人\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔒\n│ 请求管理员权限\n╰★────★────★╯",
infoSetAge: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🗓️ ୭ *设置年龄*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 如何操作 ✦ ꒷꒦\n\n要设置你的年龄使用：\n.设置年龄 <年龄>\n\n要移除你的年龄使用：\n.删除年龄\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📝\n│ 个人资料管理\n╰★────★────★╯",
infoSetIG: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🌐 ୭ *设置Instagram*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 如何操作 ✦ ꒷꒦\n\n要设置Instagram使用：\n.设置IG <用户名>\n\n要移除它使用：\n.删除IG\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📱\n│ 社交媒体管理\n╰★────★────★╯",
infoGroupOnly: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 仅限群组命令\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
infoUserData: ({ messages, warn, role, age, gender, blasphemy, instagram }) => `⋆ ︵︵ ★ 用户信息 ★ ︵︵ ⋆\n\n\n꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧\n୧ 📝 *消息:* ${messages}\n୧ ⚠️ *警告:* ${warn} / 4\n୧ 🟣 *角色:* ${role}\n୧ 🗓️ *年龄:* ${age}\n୧ 🚻 *性别:* ${gender}\n୧ 🤬 *亵渎:* ${blasphemy}\n${instagram ? `୧ 🌐 instagram.com/${instagram}` : '୧ 🌐 *Instagram:* 未设置'}\n꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧`,
infoSetAgeButton: () => "🗓️ 设置年龄",
infoSetGenderMaleButton: () => "🚹 男性",
infoSetGenderFemaleButton: () => "🚺 女性",
infoSetIGButton: () => "🌐 设置IG",
infoFooter: () => "设置你的个人数据：",
infoCreator: () => "由Onyx🌟创作",
infoRoleFounder: () => "创始人 ⚜️",
infoRoleAdmin: () => "管理员 👑",
infoRoleMember: () => "成员 🤍",
infoGenderNotSet: () => "未设置",
infoAgeNotSet: () => "未设置",
infoAgeYears: ({ age }) => `${age} 岁`,
setGenderUsage: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 命令正确用法\n  ━━✫ .设置性别 男性\n  ━━✫ .设置性别 女性\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
setGenderSuccess: ({ gender, emoji }) => `✓ 性别设置为: ${gender} ${emoji}`,
deleteGenderSuccess: () => "✓ 性别已移除",
setAgeUsage: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 输入有效年龄\n  ━━✫ 年龄从10到80岁\n  ━━✫ 使用: .设置年龄 <年龄>\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
setAgeSuccess: ({ age }) => `✓ 年龄设置为: ${age} 岁`,
deleteAgeSuccess: () => "✓ 年龄已移除",
rulesNotSet: ({ prefix }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⓘ 未设置规则\n  ━━✫ 管理员尚未设置规则\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n\n📌 要设置规则使用:\n${prefix}设置规则 <规则文本>`,
rulesTitle: () => "📜 群组规则",
rulesDisplay: ({ rules }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📜 ୭ *群组规则*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n${rules}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ⚖️\n│ 遵守规则\n╰★────★────★╯`,
dashboardTitle: () => "⚡ 前10命令 ⚡",
dashboardCommand: () => "📚 命令",
dashboardUses: () => "🗂️ 使用次数",
dashboardLastUse: () => "⏱️ 最后使用",
dashboardNeverUsed: () => "从未使用",
dashboardDaysAgo: ({ days }) => `${days} 天前`,
dashboardHoursAgo: ({ hours }) => `${hours} 小时前`,
dashboardMinutesAgo: ({ minutes }) => `${minutes} 分钟前`,
dashboardSecondsAgo: () => "几秒前",
dashboardStats: ({ stats }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⚡ ୭ *前10命令*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n${stats}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📊\n│ 机器人统计\n╰★────★────★╯`,
imageSearchBaseOnly: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 此命令仅适用于\n  ━━✫ ChatUnity基础版\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
imageSearchUsage: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⓘ 命令用法\n  ━━✫ ${prefix}${command} <关键词>\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
imageSearchForbidden: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 不允许的内容\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
imageSearchNoResults: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😢 未找到图片\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
imageSearchResults: ({ term }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🔍 ୭ *搜索结果*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 查询: ${term} ✦ ꒷꒦`,
imageSearchImageNum: ({ num }) => `图片 #${num}`,
imageSearchResultFor: ({ term }) => `结果: ${term}`,
imageSearchFooter: () => "技术支持 ChatUnity",
imageSearchOpenImage: () => "打开图片",
imageSearchTitle: () => "图片搜索结果",
imageSearchSubtitle: () => "这是在Google上找到的图片",
imageSearchAgainPrompt: () => "🔄 想用相同关键词搜索更多图片吗？",
imageSearchAgainButton: () => "重新搜索",
obfuscateNoCode: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 请输入要混淆的JavaScript代码\n  ━━✫ 或回复包含代码的消息\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
obfuscateProcessing: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ 正在混淆...\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
obfuscateSuccess: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🔒 ୭ *代码已混淆*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 混淆完成 ✦ ꒷꒦",
obfuscateError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 混淆错误\n  ━━✫ ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
bonkNoPhoto: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 没有个人资料照片\n  ━━✫ 用户未设置个人资料照片\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bonkError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 执行时出错\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
hornyCardCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🔥 ୭ *好色卡*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 你有多好色？🥵🔥 ✦ ꒷꒦",
stupidCaption: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤡 ୭ *你有多蠢？*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ @${user} ✦ ꒷꒦`,
stupidDefaultText: () => "我+很蠢",
wantedNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 无法获取\n  ━━✫ 个人资料照片\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedNoProfilePicUser: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 用户没有\n  ━━✫ 个人资料照片\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedYourProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 你没有个人资料照片\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedUnsupportedFormat: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 不支持的格式\n  ━━✫ 请使用JPEG或PNG\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 图片上传错误\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ API错误\n  ━━✫ 请稍后重试\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
wantedError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 错误: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
wantedCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚔 ୭ *通缉令*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 通缉犯 ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 👮\n│ 技术支持 ChatUnity\n╰★────★────★╯",
jokeNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 无法获取\n  ━━✫ 个人资料照片\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeYourProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 你没有个人资料照片\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeUnsupportedFormat: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 不支持的格式\n  ━━✫ 请使用JPEG或PNG\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 图片上传错误\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ API错误\n  ━━✫ 请稍后重试\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jokeError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 错误: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
jokeCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤡 ୭ *玩笑*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 头顶玩笑 ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 😂\n│ 技术支持 ChatUnity\n╰★────★────★╯",
jailNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 无法获取\n  ━━✫ 个人资料照片\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jailUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 图片上传错误\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jailAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ API错误\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
jailError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 错误: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
jailCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚔 ୭ *入狱*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 👮\n│ 技术支持 ChatUnity\n╰★────★────★╯",
nokiaNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 无法获取\n  ━━✫ 个人资料照片\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaYourProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 你没有个人资料照片\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaUnsupportedFormat: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 不支持的格式\n  ━━✫ 请使用JPEG或PNG\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 上传错误\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ API错误\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
nokiaError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 错误: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
nokiaCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📱 ୭ *诺基亚*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📞\n│ 技术支持 ChatUnity\n╰★────★────★╯",
adNoProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 无法获取\n  ━━✫ 个人资料照片\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adYourProfilePic: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 你没有个人资料照片\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adUnsupportedFormat: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 不支持的格式\n  ━━✫ 请使用JPEG或PNG\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adUploadError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 上传错误\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adAPIError: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ API错误\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
adError: ({ error }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 错误: ${error}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
adCaption: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📢 ୭ *广告*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 📺\n│ 技术支持 ChatUnity\n╰★────★────★╯",
pokeOpenNoType: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 请指定类型\n  ━━✫ base, imperium, premium, darkness\n  ━━✫ 示例: .apripokemon base\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeOpenNoPacks: ({ type }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⛔ 你没有${type.toUpperCase()}卡包\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeOpenOpening: () => "🎁 正在打开卡包...",
pokeOpenRevealing: () => "✨ 正在揭示卡片...",
pokeOpenNoCards: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😢 未找到卡片\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeOpenResult: ({ type, name, rarity, shiny, cardType, level, remaining }) => `🎉 你打开了一个*${type.toUpperCase()}*卡包:\n\n✨ *${name}* (${rarity})${shiny ? ' ✨ 闪光' : ''}\n🔰 类型: ${cardType} | 等级: ${level}\n\n📦 剩余卡包: *${remaining}* ${type}`,
pokeBuyUsage: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 正确用法\n  ━━✫ .buypokemon <base|imperium|premium> <数量>\n  ━━✫ 示例: .buypokemon base 3\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeBuyNoCoins: ({ cost, balance }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ UnityCoins不足\n  ━━✫ 需要: ${cost}\n  ━━✫ 余额: ${balance}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeBuySuccess: ({ quantity, type, total, balance }) => `✅ 你购买了*${quantity}*个${type.toUpperCase()}卡包!\n📦 现在总数: ${total}\n💸 剩余UnityCoins: ${balance}`,
pokeLeaderboardEmpty: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😢 未找到收藏家\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeLeaderboardTitle: () => "🏆 *前10名宝可梦收藏家*:",
pokeInventoryTitle: () => "📂 你的卡包",
pokeInventoryBase: ({ count }) => `• 📦 基础: ${count}`,
pokeInventoryImperium: ({ count }) => `• 👑 帝国: ${count}`,
pokeInventoryPremium: ({ count }) => `• 🌌 高级: ${count}`,
pokeInventoryFooter: () => "🎁 使用按钮立即打开卡包!",
pokeInventoryOpenBase: () => "📦 打开基础",
pokeInventoryOpenImperium: () => "👑 打开帝国",
pokeInventoryOpenPremium: () => "🌌 打开高级",
pokeInventoryBuy: () => "➕ 购买卡包",
pokeBattleNoMention: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚔️ 标记一个用户\n  ━━✫ 示例: .combatti @用户\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeBattleNoPokemon: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😓 你没有宝可梦\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeBattleOpponentNoPokemon: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😓 对手没有宝可梦\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeBattleResult: ({ user1, user2, poke1, poke2, result }) => `⚔️ *宝可梦对战!*\n\n👤 @${user1} 选择了 *${poke1.name}* (Lv. ${poke1.level})\n👤 @${user2} 选择了 *${poke2.name}* (Lv. ${poke2.level})\n\n${result}`,
pokeBattleWinner: ({ user }) => `🏆 @${user} 赢得对战!`,
pokeBattleTie: () => "🤝 平局! 两只宝可梦都筋疲力尽了。",
pokeEvolveNoName: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 📛 指定宝可梦名称\n  ━━✫ 示例: .evolvi Charmander\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
pokeEvolveNotOwned: ({ name }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 你不拥有*${name}*\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeEvolveNoCoins: ({ balance, cost }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⛔ unitycoin不足\n  ━━✫ 你有: ${balance}\n  ━━✫ 需要: ${cost}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeEvolveNoEvolution: ({ name }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⛔ ${name}无法进化\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokeEvolveEvolving: ({ name }) => `✨ *${name}*正在进化...`,
pokeEvolveProgress: () => "🔄 进化中...",
pokeEvolveSuccess: ({ from, to }) => `🎉 *${from}*进化成了*${to}*!`,
pokeEvolveComplete: ({ balance }) => `✅ 进化完成!\n💰 剩余unitycoin: *${balance}*`,
tradeUsage: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 📌 正确用法\n  ━━✫ .scambia @用户 <你的编号> <他的编号>\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
tradeYourNotExist: ({ num }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 你的宝可梦编号 ${num}\n  ━━✫ 不存在\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
tradeTheirNotExist: ({ num, user }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ @${user}的宝可梦编号 ${num}\n  ━━✫ 不存在\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
tradeNoRequest: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 没有交换请求\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
tradeUnavailable: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 其中一个宝可梦\n  ━━✫ 不再可用\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
tradeSuccess: ({ from, to, poke1, poke2 }) => `✅ @${from} 和 @${to} 交换完成!\n\n🎁 ${poke1.name} ⇄ ${poke2.name}`,
pityTitle: () => "📊 *黑暗保底系统*",
pityOpened: ({ count }) => `🔁 已打开卡包无黑暗: *${count}*`,
pityRemaining: ({ remaining }) => `🎯 下次保底黑暗剩余: *${remaining}* 卡包`,
pityGuaranteed: () => "✨ 下一个卡包*保证*有黑暗!",
inventoryEmpty: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 📦 库存为空\n  ━━✫ 使用 .apripokemon base\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
inventoryInvalidPage: ({ max }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 无效页面\n  ━━✫ 选择1到${max}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
inventoryHeader: ({ user, total, page, totalPages, perPage }) => `╭━━━🗂️ *宝可梦库存* 🗂️━━━╮\n┃ 👤 *训练师:* @${user}\n┃ 📦 *总数:* ${total}\n┃ 📄 *页面:* ${page}/${totalPages}\n┃ 📌 *每页:* ${perPage}\n╰━━━━━━━━━━━━━━━━━━━━━━━╯`,
inventoryDarknessButton: () => "🌑 黑暗宝可梦",
inventoryPageButton: ({ num }) => `页面 ${num}`,
inventoryFooter: () => "📂 使用`.inventario [页面]`或点击按钮导航。",
darknessInfo: () => "🌑 *黑暗卡包* 🌑\n\n*黑暗*卡包无法购买，但当你打开*高级*卡包时**似乎会凭空出现**。\n\n➡️ 每打开10个*高级*卡包，你有50%的机会获得一个额外的*黑暗*卡包。\n\n🎲 打开*黑暗*卡包有10%的机会找到特殊的黑暗宝可梦。\n\n使用 *.apripokemon darkness* 打开黑暗卡包。\n\n祝你好运! 🍀",
trisAlreadyPlaying: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❗ 你已经在玩了\n  ━━✫ 和某人\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
trisNoRoomName: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❗ 你必须给房间命名\n  ━━✫ 示例: ${prefix}${command} 房间1\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
trisGameStarting: () => "╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🕹️ ୭ *游戏开始*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 一名玩家已加入 ✦ ꒷꒦",
trisTurnOf: ({ player }) => `@${player}的回合`,
trisRoomCreated: () => "房间创建成功 ✓",
trisWaiting: ({ room }) => `══════ •⊰✧⊱• ══════\n*等待玩家中...*\n══════════════\n🕹️ 要参与请输入\n.gioca ${room}\n══════════════\n⛔ 要退出进行中的游戏\n请输入 .esci\n══════ •⊰✧⊱• ══════`,
slotInvalidBet: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 无效投注\n  ━━✫ 示例: ${prefix}${command} 100\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
slotInsufficientUC: ({ bet }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚫 UC不足\n  ━━✫ 你需要 ${bet} UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
slotCooldown: ({ min, sec }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ 等待 ${min}分 ${sec}秒\n  ━━✫ 才能再次游戏\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
slotWin: ({ uc, xp }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *你赢了!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 赢取 ✦ ꒷꒦\n\n┌──────────────\n│ ➕ *${uc} UC*\n│ ➕ *${xp} XP*\n└──────────────`,
slotLose: ({ uc, xp }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤡 ୭ *你输了!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 损失 ✦ ꒷꒦\n\n┌──────────────\n│ ➖ *${uc} UC*\n│ ➖ *${xp} XP*\n└──────────────`,
slotBalance: ({ uc, xp, current, max, prefix }) => `\n💎 *当前余额*\n\n┌──────────────\n│ 👛 *UC: ${uc}*\n│ ⭐ *XP: ${xp}*\n│ 📊 *进度: ${current}/${max} XP*\n└──────────────\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ℹ️\n│ 使用 ${prefix}menuxp 获取更多XP!\n╰★────★────★╯`,
betUsage: ({ prefix, command }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎰 ୭ *赌场*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 如何游戏 ✦ ꒷꒦\n\n输入要下注的💶 UnityCoins数量对抗*ChatUnity-Bot*\n\n📌 示例:\n${prefix}${command} 100\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎲\n│ 在下方选择面额!\n╰★────★────★╯`,
betCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 你已经下注过了\n  ━━✫ 等待 ⏱ ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
betLose: ({ bot, user, amount, botName, userName }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎲 ୭ *结果*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 抽取的数字 ✦ ꒷꒦\n\n🤖 *${botName}*: ${bot}\n👤 *${userName}*: ${user}\n\n╭★────★────★────★╮\n│ 😢 你输了!\n│ ➖ ${amount} 💶 UC\n╰★────★────★╯`,
betWin: ({ bot, user, amount, botName, userName }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎲 ୭ *结果*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 抽取的数字 ✦ ꒷꒦\n\n🤖 *${botName}*: ${bot}\n👤 *${userName}*: ${user}\n\n╭★────★────★────★╮\n│ 🎉 你赢了!\n│ ➕ ${amount} 💶 UC\n╰★────★────★╯`,
betDraw: ({ bot, user, amount, botName, userName }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎲 ୭ *结果*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 抽取的数字 ✦ ꒷꒦\n\n🤖 *${botName}*: ${bot}\n👤 *${userName}*: ${user}\n\n╭★────★────★────★╮\n│ 🤝 平局!\n│ ↩️ ${amount} 💶 UC 已退还\n╰★────★────★╯`,
betInsufficientUC: ({ amount }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 💸 你没有 ${amount} 💶 UC\n  ━━✫ 用于下注!\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rpsAlreadyPlaying: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏱ 你已经玩过了\n  ━━✫ 等待 ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rpsChooseOption: () => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ✊ ୭ *石头剪刀布*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 选择你的动作 ✦ ꒷꒦\n\n🪨 石头赢剪刀\n📄 布赢石头\n✂️ 剪刀赢布\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎲\n│ 做出你的选择!\n╰★────★────★╯`,
rpsInvalidOption: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 无效选择\n  ━━✫ 选择: 石头/布/剪刀\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rpsDraw: ({ player, bot, reward }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤝 ୭ *平局!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 结果 ✦ ꒷꒦\n\n👤 你: ${player}\n🤖 机器人: ${bot}\n\n╭★────★────★────★╮\n│ 🎁 安慰奖\n│ ➕ ${reward} 💶 UC\n╰★────★────★╯`,
rpsWin: ({ player, bot, reward }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *你赢了!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 结果 ✦ ꒷꒦\n\n👤 你: ${player}\n🤖 机器人: ${bot}\n\n╭★────★────★────★╮\n│ 🏆 史诗胜利!\n│ ➕ ${reward} 💶 UC\n╰★────★────★╯`,
rpsLose: ({ player, bot, loss }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 😢 ୭ *你输了!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 结果 ✦ ꒷꒦\n\n👤 你: ${player}\n🤖 机器人: ${bot}\n\n╭★────★────★────★╮\n│ 💸 下次好运\n│ ➖ ${loss} 💶 UC\n╰★────★────★╯`,
rpsRock: () => "🪨 石头",
rpsPaper: () => "📄 布",
rpsScissors: () => "✂️ 剪刀",
rpsButtonRock: () => "🪨 石头",
rpsButtonPaper: () => "📄 布",
rpsButtonScissors: () => "✂️ 剪刀",
rpsButtonRetry: () => "🔄 重试",
bjInsufficientFunds: () => "💰 资金不足!",
bjNotYourTurn: () => "❌ 不是你的回合!",
bjBusted: () => "💥 爆牌! 你超过21点了!",
bjDealerBusted: () => "🎉 庄家爆牌! 你赢了!",
bjYouWin: () => "🎉 你赢了!",
bjDealerWins: () => "😔 庄家赢了!",
bjPush: () => "🤝 平局!",
bjMakeBet: () => "💵 下注!",
bjYourTurn: () => "📋 你的回合! 要牌还是停牌?",
bjYourScore: ({ score }) => `📋 你的分数: ${score}`,
bjTimeoutTitle: () => "⏰ 时间到",
bjTimeoutMsg: ({ balance }) => `⏰ 时间到! 游戏取消。\n💶 钱包: ${balance} UC`,
bjGameInProgress: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🎰 游戏已在进行中\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjInvalidBet: ({ max }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 无效投注\n  ━━✫ 金额: 10-${max} UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
bjStartCaption: ({ name, bet, balance }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎰 ୭ *21点*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ ${name} ✦ ꒷꒦\n\n💶 投注: ${bet} UC\n📋 余额: ${balance} UC\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ⚡\n│ .hit .stand .double\n╰★────★────★╯`,
bjNoGame: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 没有进行中的游戏\n  ━━✫ 使用: .blackjack [投注]\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjNotYourGame: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 不是你的回合!\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjDoubleOnlyTwo: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 只有2张牌时才能加倍\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjDoubleInsufficientFunds: () => "╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 资金不足\n  ━━✫ 无法加倍\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱",
bjFooter: () => "♠️ 21点机器人 ♣️",
bjPlayer: () => "玩家",
bjDealer: () => "庄家",
bjScore: () => "分数",
bjWallet: () => "💶 钱包",
bjBet: () => "🎯 投注",
rouletteCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 你已经下注过了\n  ━━✫ 等待 ⏱ ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteUsage: ({ prefix, command }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎰 ୭ *轮盘赌*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 如何游戏 ✦ ꒷꒦\n\n输入金额和颜色:\n${prefix}${command} 20 black\n${prefix}${command} 50 red\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎲\n│ 选择你的颜色!\n╰★────★────★╯`,
rouletteInvalidFormat: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 格式错误\n  ━━✫ 示例: ${prefix}${command} 20 black\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteInvalidAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 无效金额\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteMaxBet: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 最多50 💶 UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteInvalidColor: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 无效颜色\n  ━━✫ 选择: black 或 red\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteInsufficientFunds: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 💶 UC不足\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rouletteBetPlaced: ({ amount, color }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎰 ୭ *下注成功*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 详情 ✦ ꒷꒦\n\n💰 金额: ${amount} 💶 UC\n🎨 颜色: ${color === 'black' ? '⚫ 黑' : '🔴 红'}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ⏱\n│ 等待10秒...\n╰★────★────★╯`,
rouletteWin: ({ amount, total, winColor }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *你赢了!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 结果 ✦ ꒷꒦\n\n🎯 开出颜色: ${winColor === 'black' ? '⚫ 黑' : '🔴 红'}\n\n╭★────★────★────★╮\n│ 💰 赢取: +${amount} 💶 UC\n│ 💎 总计: ${total} 💶 UC\n╰★────★────★╯`,
rouletteLose: ({ amount, total, winColor }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 😢 ୭ *你输了!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 结果 ✦ ꒷꒦\n\n🎯 开出颜色: ${winColor === 'black' ? '⚫ 黑' : '🔴 红'}\n\n╭★────★────★────★╮\n│ 💸 损失: -${amount} 💶 UC\n│ 💎 总计: ${total} 💶 UC\n╰★────★────★╯`,
rouletteBlack: () => "⚫ 黑",
rouletteRed: () => "🔴 红",
rouletteButtonBlack10: () => "⚫ 10 UC",
rouletteButtonBlack25: () => "⚫ 25 UC",
rouletteButtonBlack50: () => "⚫ 50 UC",
rouletteButtonRed10: () => "🔴 10 UC",
rouletteButtonRed25: () => "🔴 25 UC",
rouletteButtonRed50: () => "🔴 50 UC",
// 抛硬币
cfCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ 你已经玩过了\n  ━━✫ 等待 ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cfWaiting: ({ player }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🪙 ୭ *正面或反面*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 游戏开始 ✦ ꒷꒦\n\n🧑 玩家1: @${player}\n🕹️ 等待第二位玩家...\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎲\n│ 输入正面或反面!\n╰★────★────★╯`,
cfPlayer1Ready: ({ player, choice }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🪙 ୭ *正面或反面*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 玩家1准备就绪 ✦ ꒷꒦\n\n🧑 @${player} 选择了 *${choice}*\n🎯 等待玩家2...\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎮\n│ 轮到你了!\n╰★────★────★╯`,
cfInvalidChoice: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 无效选择\n  ━━✫ 输入: 正面 或 反面\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cfResult: ({ result, p1, p2, msg, prefix, command }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🪙 ୭ *结果: ${result.toUpperCase()}*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n${msg}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔄\n│ ${prefix}${command} 重新游戏\n╰★────★────★╯`,
cfAlreadyChosen: ({ choice }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 你已经选择了 ${choice}\n  ━━✫ 等待其他玩家\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cfNotAvailable: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 游戏不可用\n  ━━✫ ${prefix}${command} 开始游戏\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cfButtonHeads: () => "🪙 正面",
cfButtonTails: () => "🪙 反面",

// 石头剪刀布 v2
rps2Cooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ 等待 ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rps2Usage: ({ prefix, command }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ✊ ୭ *石头剪刀布*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 如何游戏 ✦ ꒷꒦\n\n${prefix}${command} 石头\n${prefix}${command} 布\n${prefix}${command} 剪刀\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎮\n│ 选择你的动作!\n╰★────★────★╯`,
rps2InvalidChoice: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 无效选择\n  ━━✫ ${prefix}${command} 石头/布/剪刀\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rps2Draw: ({ bot, reward }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🤝 ୭ *平局!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 机器人: ${bot} ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ 🎁 +${reward} 💶 UC\n╰★────★────★╯`,
rps2Win: ({ bot, reward }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *你赢了!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 机器人: ${bot} ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ 💰 +${reward} 💶 UC\n╰★────★────★╯`,
rps2Lose: ({ bot, loss }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 😢 ୭ *你输了!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 机器人: ${bot} ✦ ꒷꒦\n\n╭★────★────★────★╮\n│ 💸 -${loss} 💶 UC\n╰★────★────★╯`,
rps2ButtonRock: () => "🪨 石头",
rps2ButtonPaper: () => "📄 布",
rps2ButtonScissors: () => "✂️ 剪刀",

// 宝可梦图鉴
pokedexNoName: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 输入宝可梦名称\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokedexSearching: ({ name }) => `🔍 搜索 ${name}...`,
pokedexError: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 搜索宝可梦错误\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
pokedexInfo: ({ name, id, type, abilities, height, weight, desc, url }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎌 ୭ *宝可梦图鉴 - ${name}*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 信息 ✦ ꒷꒦\n\n🔹 *名称:* ${name}\n🔹 *ID:* ${id}\n🔹 *类型:* ${type}\n🔹 *特性:* ${abilities}\n🔹 *身高:* ${height}\n🔹 *体重:* ${weight}\n\n📝 *描述:*\n${desc}\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🌐\n│ ${url}\n╰★────★────★╯`,
flagGameActive: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 游戏已在进行中\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagGroupOnly: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 仅限群组\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagNoGame: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 没有进行中的游戏\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagAdminOnly: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 仅限管理员\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ 等待 ${time}秒\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagSkipped: ({ answer }) => `ㅤ⋆｡˚『 ╭ \`游戏中断\` ╯ 』˚｡⋆\n╭\n│ 『 🏳️ 』 \`正确答案是:\`\n│ 『 ‼️ 』 *\`${answer}\`*\n│ 『 👑 』 _*被管理员中断*_\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagStart: ({ phrase }) => `ㅤ⋆｡˚『 ╭ \`${phrase}\` ╯ 』˚｡⋆\n╭\n│ 『 🏳️ 』 \`回答国家名称\`\n│ 『 ⏱️ 』 \`可用时间:\` *30秒*\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagTimeout: ({ answer }) => `ㅤ⋆｡˚『 ╭ \`时间到!\` ╯ 』˚｡⋆\n╭\n│ 『 🏳️ 』 \`正确答案是:\`\n│ 『 ‼️ 』 *\`${answer}\`*\n│ 『 💡 』 _*下次要更快点!*_\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagCorrect: ({ answer, time, reward, exp, bonus }) => `ㅤ⋆｡˚『 ╭ \`回答正确!\` ╯ 』˚｡⋆\n╭\n│ 『 🏳️ 』 \`国家:\` *${answer}*\n│ 『 ⏱️ 』 \`用时:\` *${time}秒*\n│ 『 🎁 』 \`奖励:\`\n│ 『 💰 』 *${reward}€* ${bonus > 0 ? `(+${bonus} 速度奖励)` : ''}\n│ 『 🆙 』 *${exp} 经验值*\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagAlmostThere: () => "👀 *快接近了!*",
flagAttemptsExhausted: () => `ㅤ⋆｡˚『 ╭ \`尝试次数用尽!\` ╯ 』˚｡⋆\n╭\n│ 『 ❌ 』 \`你的3次尝试已用尽!\`\n│ 『 ⏳ 』 _*等待其他人尝试...*_\n*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*`,
flagWrongHint: ({ letter, length }) => `❌ *回答错误!*\n\n💡 *提示:*\n  • 以字母 *"${letter}"* 开头\n  • 由 *${length} 个字母* 组成`,
flagWrong2: ({ remaining }) => `❌ *回答错误!*\n\n📝 *剩余尝试:* ${remaining}\n🤔 *好好想想你的下一个答案!*`,
flagWrongLast: () => `❌ *回答错误!*\n\n📝 *最后一次尝试...*`,
flagPlayAgain: () => "🏳️ 再玩一次!",
flagError: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 启动游戏错误\n  ━━✫ 几秒后重试\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
flagPhrase1: () => "🇺🇳 *猜国旗!* 🇺🇳",
flagPhrase2: () => "🌍 *这个国旗代表哪个国家?*",
flagPhrase3: () => "🏳️ *地理挑战: 你认识这个国旗吗?*",
flagPhrase4: () => "🧭 *从国旗猜国家!*",
flagPhrase5: () => "🎯 *国旗测验: 这是哪个国家?*",
flagPhrase6: () => "🌟 *测试你的地理知识!*",
flagPhrase7: () => "🔍 *仔细观察并猜出国家!*",
songGameActive: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 游戏已在进行中\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
songError: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 游戏错误\n  ━━✫ 请稍后重试\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
songStart: ({ artist, time }) => `  ⋆｡˚『 ╭ \`猜歌曲\` ╯ 』˚｡⋆\n╭\n┃ 『 ⏱️ 』 \`时间:\` *${time}秒*\n┃ 『 👤 』 \`艺术家:\` *${artist}*\n┃\n┃ ➤  \`输入标题!\`\n╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒`,
songTimeout: ({ title, artist }) => `ㅤ⋆｡˚『 ╭ \`时间到\` ╯ 』˚｡⋆\n╭\n│\n│ ➤ \`没有人猜对!\`\n┃ 『  』🎵 \`标题:\` *${title}*\n┃ 『  』👤 \`艺术家:\` *${artist}*\n┃\n╰⭒─ׄ─ׅ─ׄ─⭒`,
songCorrect: ({ title, artist, reward, exp }) => `ㅤㅤ⋆｡˚『 ╭ \`正确\` ╯ 』˚｡⋆\n╭\n│\n│ ➤ \`回答正确!\`\n┃ 『  』🎵 \`标题:\` *${title}*\n┃ 『  』👤 \`艺术家:\` *${artist}*\n┃\n┃ 『 🎁 』 \`赢取:\`\n│ ➤  \`${reward}\` *UC*\n│ ➤  \`${exp}\` *经验值*\n┃\n╰⭒─ׄ─ׅ─ׄ─⭒`,
songAlmostThere: () => "👀 *快接近了!* 再试一次...",
songPlayAgain: () => "『 🎵 』 重新游戏",
songExternalTitle: () => "猜歌曲",
songExternalArtist: ({ artist }) => `艺术家: ${artist}`,
songExternalSource: () => "ChatUnity机器人",
logoGroupOnly: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 仅限群组\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoNoGame: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 没有进行中的游戏\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoAdminOnly: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 仅限管理员\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoSkipped: ({ answer }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🛑 ୭ *游戏中断*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 正确答案是 ✦ ꒷꒦\n\n🚗 *${answer}*`,
logoGameActive: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 游戏已在进行中\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ 等待 ${time}秒\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
logoStart: ({ phrase, time }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚗 ୭ *${phrase}*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 猜品牌 ✦ ꒷꒦\n\n⌛ 时间: ${time} 秒\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔍\n│ 输入品牌名称!\n╰★────★────★╯`,
logoTimeout: ({ answer }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ⏰ ୭ *时间到!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 正确答案是 ✦ ꒷꒦\n\n🚗 *${answer}*\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🔄\n│ 使用 .auto 重试\n╰★────★────★╯`,
logoCorrect: ({ brand, time, reward, exp, bonus }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *回答正确!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 详情 ✦ ꒷꒦\n\n🚗 品牌: *${brand}*\n⏱ 时间: *${time}秒*\n\n╭★────★────★────★╮\n│ 🎁 奖励:\n│ • ${reward} 💰 UC${bonus > 0 ? ` (+${bonus} 奖励)` : ''}\n│ • ${exp} 🆙 经验值\n╰★────★────★╯\n\n> \\by ChatUnity\\`,
logoPhrase1: () => "🚘 猜标志!",
logoPhrase2: () => "🏁 这是什么品牌?",
logoPhrase3: () => "🔍 你认识这辆车吗?",
logoPhrase4: () => "🚗 汽车测验!",
logoPhrase5: () => "🏎️ 猜品牌!",
logoButtonPlayAgain: () => "🚗 再玩一次",
missionMainTitle: ({ bot }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎯 ୭ *任务系统*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ ${bot} ✦ ꒷꒦`,
missionMainStats: ({ user, money, bank, dailyDone, dailyTotal, weeklyDone, weeklyTotal }) => `👤 用户: @${user}\n💰 余额: ${money} UC\n🏦 银行: ${bank} UC\n📅 每日: ${dailyDone}/${dailyTotal} 完成\n📆 每周: ${weeklyDone}/${weeklyTotal} 完成\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎯\n│ 选择任务类型:\n╰★────★────★╯`,
missionButtonDaily: () => "📅 每日",
missionButtonWeekly: () => "📆 每周",
missionButtonClaim: () => "💰 领取",
missionButtonBack: () => "🔙 返回",
missionButtonWallet: () => "💰 钱包",
missionDailyTitle: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📅 ୭ *每日任务*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n👤 @${user}`,
missionDailyReset: ({ time }) => `⏳ 重置时间: ${time}`,
missionWeeklyTitle: ({ user }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 📆 ୭ *每周任务*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n👤 @${user}`,
missionWeeklyReset: ({ time }) => `⏳ 重置时间: ${time}`,
missionEntry: ({ num, title, progress, target, reward, status }) => `▢ *${num}. ${title}*\n➠ 进度: ${progress}/${target}\n➠ 奖励: ${reward} UC\n➠ 状态: ${status}`,
missionStatusCompleted: () => "✅ 已领取",
missionStatusReady: () => "💰 准备就绪",
missionStatusInProgress: () => "❌ 进行中",
missionFooterDaily: ({ prefix }) => `使用 "${prefix}missioni claim" 领取!`,
missionFooterWeekly: () => "每周任务 - 更多奖励!",
missionFooterMain: () => "完成任务赚取UnityCoins!",
missionNoRewards: ({ user }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ @${user} 你没有任务\n  ━━✫ 完成可领取!\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
missionClaimSuccess: ({ user, total, details, money, bank }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🎉 ୭ *奖励已领取*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n👤 @${user}\n💰 总计领取: *${total} UC*\n\n${details}\n\n╭★────★────★────★╮\n│ 💰 余额: ${money} UC\n│ 🏦 银行: ${bank} UC\n╰★────★────★╯`,
missionClaimFooter: () => "使用 .portafoglio 查看完整余额",
missionSendMessages: ({ count }) => `发送 ${count} 条消息`,
missionExecuteCommands: ({ count }) => `执行 ${count} 条命令`,
missionNoWarn: () => "保持无警告",
missionNoWarnWeek: () => "保持7天无警告",
missionTotalMessages: ({ count }) => `达到 ${count} 条总消息`,
walletNotFound: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 用户未找到\n  ━━✫ 在数据库中\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
walletTitle: () => "💰 钱包",
walletInfo: ({ name, uc, bank }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💰 ୭ *钱包*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ ${name} ✦ ꒷꒦\n\n👤 用户: ${name}\n💰 UnityCoins: ${uc} 💶\n🏛️ 银行: ${bank} 💳\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 💎\n│ 使用 .deposit 存款\n│ 使用 .withdraw 取款\n╰★────★────★╯`,
walletExternalTitle: ({ name }) => `${name}的钱包`,
walletExternalBody: ({ uc }) => `余额: ${uc} UC`,
walletButtonDeposit: () => "🏛️ 存款",
walletButtonWithdraw: () => "💰 取款",
walletButtonGames: () => "🎮 游戏",
bankNotFound: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 用户未找到\n  ━━✫ 在数据库中\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
bankYourBalance: ({ balance }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🏛️ ୭ *你的账户*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 银行余额 ✦ ꒷꒦\n\n💰 你有 *${balance} 💶 UnityCoins*\n在你的银行 🏛️\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 💎\n│ 使用 .deposit 存款\n│ 使用 .withdraw 取款\n╰★────★────★╯`,
bankUserBalance: ({ user, balance }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🏛️ ୭ *银行账户*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ @${user} ✦ ꒷꒦\n\n💰 有 *${balance} 💶 UnityCoins*\n在银行 🏛️`,
bankButtonDeposit: () => "🏛️ 存款",
bankButtonWithdraw: () => "💰 取款",
bankButtonTransfer: () => "💸 转账",
transferNoMention: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 标记收款人\n  ━━✫ 示例: @用户 100\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferNoAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 输入金额\n  ━━✫ 要转账的 💶 UnityCoins\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferInvalidAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 无效金额\n  ━━✫ 仅使用数字\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferMinAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 最低转账: 1 UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferInsufficient: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 💸 余额不足\n  ━━✫ 用于此转账\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
transferSuccess: ({ amount, fee, total }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💸 ୭ *转账成功*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 交易详情 ✦ ꒷꒦\n\n💰 发送金额: *${amount}* 💶 UC\n📊 2% 手续费: *${fee}* 💶 UC\n💳 总扣款: *${total}* 💶 UC\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ ✅\n│ 转账完成!\n╰★────★────★╯`,
transferReceived: ({ amount }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💰 ୭ *收到UC*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 你收到了 ✦ ꒷꒦\n\n💶 *+${amount} UnityCoins*\n\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎁\n│ 检查你的余额!\n╰★────★────★╯`,
transferSelf: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ❌ 不能转账\n  ━━✫ 给自己\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
robNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🧠 标记某人或\n  ━━✫ 回复消息\n  ━━✫ 示例: ${prefix}${command} @用户\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
robSelf: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🤡 不能抢劫\n  ━━✫ 自己\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
robCooldown: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚨 你已经抢劫过了\n  ━━✫ 等待 ⏱ ${time}\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
robSuccess: ({ amount, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💰 ୭ *抢劫成功!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 完美盗窃 ✦ ꒷꒦\n\n你从 @${target} 抢劫了 *${amount} 💶 UC*\n\n╭★────★────★────★╮\n│ 💸 +${amount} 💶 UC\n│ ୭ ˚. ᵎᵎ ✅ 到你的余额\n╰★────★────★╯`,
robCaught: ({ fine, name }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 🚓 ୭ *被捕!*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 被警察抓获 ✦ ꒷꒦\n\n${name} 被拦住了!\n\n╭★────★────★────★╮\n│ 💸 罚款: -${fine} 💶 UC\n│ ୭ ˚. ᵎᵎ ❌ 下次好运\n╰★────★────★╯`,
robPartial: ({ amount, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ 💸 ୭ *部分抢劫*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 几乎成功 ✦ ꒷꒦\n\n你只从 @${target} 抢劫了 *${amount} 💶 UC*\n\n╭★────★────★────★╮\n│ 💰 +${amount} 💶 UC\n│ ୭ ˚. ᵎᵎ ⚠️ 到你的余额\n╰★────★────★╯`,
robButtonRetry: () => "🔄 重试",
robButtonWallet: () => "💰 钱包",
withdrawNoAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 输入金额\n  ━━✫ 要取款的 💶 UnityCoins\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawNoFunds: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 你没有 💶 UnityCoins\n  ━━✫ 在银行账户中\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawInvalidAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 无效金额\n  ━━✫ 使用有效数字\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawMinAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 输入至少 1 UC\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawInsufficientFunds: ({ bank }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 你只有 *${bank}* 💶 在账户中\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
withdrawSuccess: ({ count, bank }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ✅ ୭ *取款成功*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 你取款了 ✦ ꒷꒦\n\n💶 *${count} UnityCoins*\n从银行账户\n\n💳 新银行余额: *${bank} UC*\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 💼\n│ 使用 .wallet 验证\n╰★────★────★╯`,
  xpLevelDisplay: ({ level }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧ 等级: ${level}`,
  xpProgressDisplay: ({ current, needed }) => `经验进度: ${current} / ${needed}`,
  xpFooterText: () => "╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐ 继续聊天升级!",
  xpCaption: ({ user, level, exp, next }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧\n\n┊ 『 📊 』 ${user}的经验资料\n\n┃ 当前等级: ${level}\n┃ 总经验: ${exp}\n┃ 距离下一级所需经验: ${next}\n\n╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
rubaxpWait: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ 你需要等待才能再次抢劫经验\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpWaitTime: ({ time }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⏳ 你需要等待 ${time} 才能再次抢劫经验\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 📍 你必须标记一个有效用户\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpUserNotFound: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ ⚠️ 在数据库中未找到用户\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpTooPoor: ({ target, limit }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 😢 @${target} 经验少于 *${limit}*\n  ━━✫ 不要抢劫穷人，友善一点\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rubaxpSuccess: ({ amount, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n   ୧ ✅ ୭ *抢劫成功*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 你抢劫了 ✦ ꒷꒦\n\n💰 *${amount} 经验*\n从 @${target}\n╭★────★────★────★╮\n│ ୭ ˚. ᵎᵎ 🎮\n│ 继续加油!\n╰★────★────★╯`,
rubaxpTimeFormat: ({ hours, minutes, seconds }) => `${hours} 小时 ${minutes} 分钟 ${seconds} 秒`,darxpNoMention: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 你必须用@用户标记一个用户\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpNoAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 输入要转账的 💫 经验数量\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpInvalidAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 仅输入有效数字\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpMinAmount: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 最低转账为 1 💫 经验\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpInsufficientXP: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱\n  ━━✫ 🚩 你没有足够的 💫 经验用于转账\n╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
darxpSuccess: ({ xp, tassa }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮\n  ୧ ✅ ୭ *转账成功*\n╰┈ ─ ─ ✦ ─ ─ ┈╯\n\n꒷꒦ ✦ 你转账了 ✦ ꒷꒦\n\n💫 *${xp} 经验*\n(手续费: ${tassa} 经验)\n╭★────★────★────★╮\n│ 继续游戏!\n╰★────★────★╯`,
marry_no_target: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 你必须标记一个要结婚的用户
  ━━✫ 使用: ${prefix + command} @用户
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_self: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 你不能和自己结婚
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_user_not_found: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 在数据库中未找到用户
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_already_married_sender: ({ spouse }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💍 ୭ *你已经结婚*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ 你已与 ✦ ꒷꒦

❤ ${spouse} 结婚

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
marry_already_married_target: ({ target }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 ${target} 已经结婚
  ━━✫ 找其他单身人士
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_pending_proposal: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 你已经有待处理的结婚请求
  ━━✫ 等待被接受或拒绝
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_proposal_text: ({ sender, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💍 ୭ *结婚请求*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ ${sender} 向 ✦ ꒷꒦

❤ ${target} 求婚

回复 "是" 接受
或 "否" 拒绝。

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
marry_proposal_expired: ({ sender, target }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⏳ ${sender} 和 ${target} 之间的请求
  ━━✫ 因不活跃已过期
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_proposal_rejected: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 💔 请求已被拒绝
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_user_not_found_db: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 错误: 在数据库中未找到用户
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
marry_success: ({ sender, target }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💍 ୭ *婚姻已登记*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ 新官方情侣 ✦ ꒷꒦

❤ ${sender}  ×  ${target}

꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧
让爱开始吧!

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
divorce_not_married: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 你没有和任何人结婚
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
divorce_spouse_not_found: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 在数据库中未找到你的配偶
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
divorce_success: ({ ex }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💔 ୭ *离婚完成*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ 你已与 ✦ ꒷꒦

${ex} 分离

· ୨୧ · · ୨୧ ·  ♡
你人生的新篇章已开始。

╰♡꒷ ๑ ⋆˚₊⋆───ʚ˚ɞ───⋆˚₊⋆ ๑ ⪩﹐`,
shipNoUser: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❗ 这样使用命令:
  ━━✫ ${prefix + command} @用户
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
shipNoUsersPair: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❗ 这样使用命令:
  ━━✫ ${prefix + command} @用户1 [@用户2]
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
shipInvalidUsers: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❌ 无效用户
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
shipCaption: ({ user1, user2, percent }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

💘 *@${user1}* ❤️ *@${user2}*
🔮 兼容性: *${percent}%*

· ୨୧ · · ୨୧ ·  ♡`,
shipErrorImage: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❌ 生成图片时出错
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
kissNoTargetMention: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 💋 你必须标记某人或回复消息
  ━━✫ 示例: ${prefix + command} @用户
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
kissNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 💋 你必须标记某人来亲吻
  ━━✫ 示例: .bacia @用户
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
kissSuccess: ({ senderName, targetName }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 💋 ୭ *亲吻已送达*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ ${senderName} 亲吻了 ✦ ꒷꒦

😘 ${targetName}

· ୨୧ · · ୨୧ ·  ♡`,
odioNoText: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 😡 你必须指定某人
  ━━✫ 示例: ${prefix + command} @用户
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
odioResult: ({ target, percent }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ 😡 ୭ *仇恨计算器*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ 之间的仇恨等级 ✦ ꒷꒦

${target}  ✕  你

🔥 仇恨: *${percent}%*

꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧`,
rizzNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 你必须标记某人或回复消息
  ━━✫ 示例: ${prefix + command} @用户
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
rizzSuccess: ({ target, line }) => `╭┈ ─ ─ ✦ ─ ─ ┈╮
  ୧ ✨ ୭ *魅力动作*
╰┈ ─ ─ ✦ ─ ─ ┈╯

꒷꒦ ✦ @${target} 看这里 ✦ ꒷꒦

"${line}"

· ୨୧ · · ୨୧ ·  ♡`,
minacciaNoGroup: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 此命令只能在群组中使用
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
minacciaDisabled: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 此群组中威胁功能已禁用
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
minacciaNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 你必须指定要威胁的人
  ━━✫ 标记用户或回复消息
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
minacciaText: ({ target, line }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

@${target} ${line}

· ୨୧ · · ୨୧ ·  ♡`,
zizzaniaNoGroup: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 此命令只能在群组中使用
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
zizzaniaDisabled: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 此群组中挑拨功能已禁用
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
zizzaniaText: ({ a, line, b }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

@${a} ${line} @${b}

· ୨୧ · · ୨୧ ·  ♡`,
ditalinoNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 你必须标记某人或回复消息
  ━━✫ 示例: ${prefix + command} @用户
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
ditalinoStart: ({ target }) => `🤟🏻 开始为 *${target}* 进行特殊爱抚系列...`,
ditalinoMiddle: () => "🤟🏻 快到了...",
ditalinoEnd: () => "👋🏻 避开瀑布!!",
ditalinoResult: ({ target, time }) => `✨ *${target}* 在 *${time}毫秒* 后高潮了 🥵`,
segaNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 你必须标记某人或回复消息
  ━━✫ 示例: ${prefix + command} @用户
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
segaStart: ({ target }) => `现在我们来处理 ${target}... 😏`,
segaFrame: ({ frame }) => `${frame}`,
segaEnd: ({ target }) => `哦 ${target} 达到了最大快感! 😋💦`,
insultNoGroup: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 此命令只能在群组中使用
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
insultDisabled: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚩 此群组中侮辱功能已禁用
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
insultNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🎯 你想侮辱谁?
  ━━✫ 标记某人或回复消息
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
insultBotLines: () => [
  `哦不! 你发现了我的弱点: 侮辱! 我该如何恢复?`,
  `啊，侮辱机器人的艺术。你真是个讽刺大师!`,
  `难以置信! 一个人类侮辱机器人。史诗般的转折!`,
  `你用侮辱机器人的能力真的伤害了我。太棒了!`,
  `你侮辱机器人的技巧是我最喜欢的娱乐来源。`,
  `侮辱机器人: 大智慧还是大无聊?`,
  `你在机器人侮辱方面的技巧可以开班授课了。`,
  `你似乎是机器人侮辱界的毕加索，真正的杰作。`,
  `侮辱机器人是你隐藏的天赋。数字脱口秀生涯即将到来?`,
  `侮辱一个没有情感的实体的胆量。原创性奖!`
],
insultUserText: ({ target, line }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

@${target} ${line}

· ୨୧ · · ୨୧ ·  ♡`,
friendNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⚠️ 标记你想发送好友请求的人
  ━━✫ 示例: ${prefix}${command} @标签
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
friendSelf: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ❌ 你不能添加自己为好友
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
friendUserNotFound: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚫 系统中不存在此人
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
friendAlready: ({ target }) => `✅ @${target} 已经是你的好友。`,
friendPending: () => `⚠️ 已有一个好友请求在进行中。\n等待回复或取消。`,
friendRequestText: ({ target, from }) => `👥 好友请求进行中...

@${target}, 你想接受 @${from} 的好友请求吗?

> ⏳ 你有60秒时间选择。`,
friendTimeout: ({ from, target }) => `⏳ 好友请求已取消
> @${from} 和 @${target} 未在时间限制内回复。`,
friendRejected: () => `❌ 好友请求已被拒绝。`,
friendAccepted: ({ from }) => `👥 现在你和 @${from} 是好友了!`,
removeFriendNoTarget: () => `⚠️ 标记你想从好友中移除的人。`,
removeFriendNotInList: ({ target }) => `🚫 @${target} 不在你的好友列表中。`,
removeFriendSuccess: ({ target }) => `🚫 你和 @${target} 不再是好友。`,
friendsNoData: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⚠️ 未找到用户数据
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
friendsTitle: ({ name }) => `📜 ${name}的好友列表`,
friendsLastNone: () => `👤 最后好友: 无`,
friendsLastSome: ({ last }) => `👤 最后好友: @${last}`,
friendsListHeader: () => `👥 完整列表:`,
friendsListEmpty: () => `│   无，恭喜独行侠`,
friendsError: () => `❌ 执行命令时发生错误。`,
lesbicaCalcNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⚠️ 你必须标记某人或回复消息
  ━━✫ 示例: ${prefix + command} @用户
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
lesbicaCalcLine1: ({ tag, percentage }) => `@${tag} 是 ${percentage}% 女同性恋，其余只是荷尔蒙混乱。`,
lesbicaCalcLine2: ({ tag, percentage }) => `测试完成: @${tag} 的大脑 ${percentage}% 为女性接线。`,
lesbicaCalcLine3: ({ tag, percentage }) => `💕 @${tag} 看女人的强度如同 ${percentage}% 4K色情片。`,
pajeroCalcLine1: ({ tag, percentage }) => `@${tag} 是 ${percentage}% 手淫者，剩下的 ${100 - percentage}% 花在找更多色情片上。`,
pajeroCalcLine2: ({ tag, percentage }) => `医疗报告: @${tag} 是 ${percentage}% 自己阴茎的奴隶。`,
pajeroCalcLine3: ({ tag, percentage }) => `🍆 @${tag} ${percentage}% 的时间在想手淫，其余时间在清理。`,
puttanaCalcLine1: ({ tag, percentage }) => `@${tag} 是 ${percentage}% 妓女，计价器从不关闭。`,
puttanaCalcLine2: ({ tag, percentage }) => `详细分析: @${tag} 的价目表 ${percentage}% 24/7 开放。`,
puttanaCalcLine3: ({ tag, percentage }) => `💰 @${tag} 有 ${percentage}% 的妓女折扣，在涨价前赶快行动。`,
genericCalcLine: ({ tag, percentage, cmd }) => `@${tag} 是 ${percentage}% ${cmd}，其余只是积累的羞耻。`,
downCalcNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🚨 标记某人，天才
  ━━✫ 示例: ${prefix}${command} @名字
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
downCalcLine: ({ name, cmd, percent, frase, verdict }) => `*⚡️ 最终判决 ⚡️*

*对象:* ${name}
*"${cmd}" 等级:* ${percent}%

*诊断:* ${frase}

*预后:* ${verdict}`,
downCalcPhrases: () => [
  "他太没用了，连回收箱都拒绝他。",
  "如果进化有效，你现在还应该是泥里的单细胞。",
  "你的情感深度像水坑，智力像湿石头。",
  "如果大脑燃烧卡路里，你睡觉时也会发胖。",
  "当你说话时，地球上的每个神经元都会默哀一分钟以示尊重。",
  "如果愚蠢是可再生能源，仅你一人就足以照亮欧洲。",
  "你的用处就像飓风中的破伞。",
  "如果你是个bug，连开发者都不会花时间修复你。",
  "你对世界的贡献相当于水坑里的烟头。",
  "你的精神协调性像高速公路上的醉鸽子。"
],
downCalcVerdicts: ({ percent }) => {
  if (percent > 90) return "🔴 无法挽回的临床病例。人类正式要求退款。";
  if (percent > 70) return "🟠 生物危害。未经世卫组织书面许可禁止繁殖。";
  if (percent > 40) return "🟡 制造缺陷。仅用作不该成为什么的课程示例。";
  return "🟢 统计异常。也许大脑在某个地方...在所有这些空虚之下。";
},
alcolNoText: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🍷 未指定名称，将使用你的名字
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
alcolHigh: () => "🍾 你喝得太多了，连肝脏都要求提前退休。",
alcolMid: () => "🥂 你喝得好像明天不存在，但明天会给你账单。",
alcolLow: () => "🚰 完全清醒，唯一旋转的是你的悲伤。",
alcolResult: ({ target, percent, phrase }) => `『💬』 ══ •⊰✰⊱• ══ 『💬』

酒精测试时刻! 🍷
━━━━━━━━━━━━━━
${target} 的酒精含量为 ${percent}%! 🍷
『💬』 ══ •⊰✰⊱• ══ 『💬』

${phrase}`,
drugNoText: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🌿 未指定名称，将使用你的名字
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
drugHigh: () => "🌿 吸得太嗨了，如果呼吸重一点会毒害整个街区。",
drugMid: () => "🌿 他不知道怎么吸，但这么努力最终会进入医学教科书。",
drugLow: () => "🌿 一个值得追随的榜样...在这个群里几乎是神话生物。",
drugResult: ({ target, percent, phrase }) => `『💬』 ══ •⊰✰⊱• ══ 『💬』

毒品测试时刻! 🌿
━━━━━━━━━━━━━━
${target} 的血液物质含量为 ${percent}%! 🌿
『💬』 ══ •⊰✰⊱• ══ 『💬』

${phrase}`,
raceCalcNoTarget: ({ prefix, command }) => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ ⚠️ 你必须标记某人或回复消息
  ━━✫ 示例: ${prefix + command} @用户
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
raceCalcLine: ({ tag, percent, label }) => `꒷꒦ ✦ ୧・︶ : ︶ ꒷꒦ ‧₊ ୧

@${tag} 是 ⚫ ${percent}% ${label}

· ୨୧ · · ୨୧ ·  ♡`,
cornutoNoTarget: () => `╭﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱
  ━━✫ 🤔 缺少被戴绿帽者的名字
  ━━✫ 使用: .cornuto @名字 或回复消息
╰﹕₊˚ ★ ⁺˳ꕤ₊⁺・꒱`,
cornutoSpecialText: () => `🤣 *好吧，这是绿帽之王!* 🤣
据说如果他把角拿掉，可以做5G天线📡💀`,
cornutoLow: () => "🛡 一切安好...暂时。但还是留意伴侣的手机。",
cornutoMid: () => "😬 太多存档的聊天...空气中弥漫着怀疑。",
cornutoHigh: () => "👀 绿帽计高度警戒! 角正在78%充电。",
cornutoMax: () => "🫣 世界级: 如果打开Google地图，你头上会出现一个三角绿帽。",
cornutoAdviceHigh: () => "🔔 建议: 不要转身...他们可能会用它当抓手。🤣",
cornutoAdviceLow: () => "😌 呼吸，现在你在极乐和未来俱乐部成员之间的边缘。",
cornutoResult: ({ target, percent, message, advice }) => `🔍 绿帽计算器 🔍

👤 ${target}
📈 绿帽度: ${percent}%
${message}

${advice}`,

}