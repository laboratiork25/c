import '../lib/language.js';

let handler = async (m, { conn }) => {
  const userId = m.sender;
  const groupId = m.chat;
  
  let stats = Object.entries(db.data.stats).map(([key, val]) => {
    let name = Array.isArray(plugins[key]?.help) ? plugins[key]?.help?.join(' & ') : plugins[key]?.help || key 
    if (/exec/.test(name)) return
    return { name, ...val }
  })
  
  stats = stats.sort((a, b) => b.total - a.total)
  
  let txt = stats.slice(0, 10).map(({ name, total, last }, idx) => {
    if (name.includes('-') && name.endsWith('.js')) name = name.split('-')[1].replace('.js', '')
    return global.t('dashboardEntry', userId, groupId, {
      index: idx + 1,
      name: name,
      total: total,
      lastUsed: getTime(last, userId, groupId)
    })
  }).join`\n\n`
  
  m.reply(global.t('dashboardTitle', userId, groupId, { 
    botName: conn.user.name, 
    content: txt 
  }))
}

handler.help = ['dashboard']
handler.tags = ['info']
handler.command = /^dashboard|utilizzocomandi|conteggiocomandi|commandstats|usage$/i

export default handler

export function parseMs(ms) {
  if (typeof ms !== 'number') throw 'Parameter must be filled with number'
  return {
    days: Math.trunc(ms / 86400000),
    hours: Math.trunc(ms / 3600000) % 24,
    minutes: Math.trunc(ms / 60000) % 60,
    seconds: Math.trunc(ms / 1000) % 60,
    milliseconds: Math.trunc(ms) % 1000,
    microseconds: Math.trunc(ms * 1000) % 1000,
    nanoseconds: Math.trunc(ms * 1e6) % 1000
  }
}

export function getTime(ms, userId, groupId) {
  let now = parseMs(+new Date() - ms)
  if (now.days) return global.t('timeDaysAgo', userId, groupId, { days: now.days })
  else if (now.hours) return global.t('timeHoursAgo', userId, groupId, { hours: now.hours })
  else if (now.minutes) return global.t('timeMinutesAgo', userId, groupId, { minutes: now.minutes })
  else return global.t('timeSecondsAgo', userId, groupId)
}