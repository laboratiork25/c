import '../lib/language.js';
let handler = async (m, {
  conn, groupMetadata
}) => {
  if (!m.isGroup)
    throw global.t('zizzania_group_only', m.sender)
  
  let gruppi = global.db.data.chats[m.chat]
  if (gruppi.spacobot === false)
    throw global.t('zizzania_disabled', m.sender)
  
  let toM = a => '@' + a.split('@')[0]
  let ps = groupMetadata.participants.map(v => v.id)
  let a = ps.getRandom()
  let b
  do b = ps.getRandom()
  while (b === a)
  
  const randomPhrase = pickRandom([
    global.t('zizzania_1'),
    global.t('zizzania_2'),
    global.t('zizzania_3'),
    global.t('zizzania_4'),
    global.t('zizzania_5'),
    global.t('zizzania_6'),
    global.t('zizzania_7'),
    global.t('zizzania_8'),
    global.t('zizzania_9'),
    global.t('zizzania_10'),
    global.t('zizzania_11'),
    global.t('zizzania_12'),
    global.t('zizzania_13'),
    global.t('zizzania_14'),
    global.t('zizzania_15')
  ])
  
  conn.reply(m.chat, `${toM(a)} ${randomPhrase} ${toM(b)}`, null, {
    mentions: [a, b]
  })
}

handler.customPrefix = /^\.zizzania$/i
handler.command = new RegExp
export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}