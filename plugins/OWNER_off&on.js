import fs from 'fs'
import path from 'path'
import '../lib/language.js';

const handler = async (m, { conn, args, command }) => {
  const userId = m.sender;
  const groupId = m.isGroup ? m.chat : null;
  
  if (!args[0]) return m.reply(global.t('scriptNameRequired', userId, groupId) || 'Scrivi il nome dello script, esempio: .offscript info')

  let file = args[0]
  if (!file.endsWith('.js')) file += '.js'

  const filePath = path.join('./plugins', file)
  if (!fs.existsSync(filePath)) return m.reply(global.t('fileNotFound', userId, groupId) || 'File non trovato.')

  let content = fs.readFileSync(filePath, 'utf-8')

  if (command === 'offscript') {
    if (content.includes('/*') && content.includes('*/')) return m.reply(global.t('scriptAlreadyOff', userId, groupId) || 'Script è già spento.')
    const lines = content.split('\n')
    const preservedLine = lines.find(line => line.includes('//Plugin fatto da Gabs & 333 Staff'))
    const rest = lines.filter(line => !line.includes('//Plugin fatto da Gabs & 333 Staff'))
    const newContent = `${preservedLine || ''}\n/*\n${rest.join('\n')}\n*/`
    fs.writeFileSync(filePath, newContent)
    return m.reply(global.t('scriptTurnedOff', userId, groupId, { file }) || `Script ${file} spento.`)
  }

  if (command === 'onscript') {
    const newContent = content
      .replace(/^\/\*/gm, '')
      .replace(/\*\/$/gm, '')
    fs.writeFileSync(filePath, newContent.trim())
    return m.reply(global.t('scriptTurnedOn', userId, groupId, { file }) || `Script ${file} riattivato.`)
  }
}

handler.command = /^(offscript|onscript)$/i
handler.rowner = true;
export default handler