import '../lib/language.js';
let leaderboardHandler = async (m, { conn }) => {
  let userId = m.sender
  let groupId = m.chat.endsWith('@g.us') ? m.chat : null
  
  let users = Object.entries(global.db.data.users)
    .map(([id, data]) => ({
      id,
      name: data.name || id,
      count: data.pokemons?.length || 0
    }))
    .filter(u => u.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  if (users.length === 0) {
    return m.reply(global.t('noCollectorsFound', userId, groupId))
  }

  let rankMsg = global.t('leaderboardTitle', userId, groupId) + users.map((u, i) =>
    global.t('leaderboardEntry', userId, groupId, { 
      position: i + 1, 
      name: u.name, 
      count: u.count 
    })
  ).join('\n')

  m.reply(rankMsg)
}

leaderboardHandler.help = ['classifica']
leaderboardHandler.tags = ['pokemon']
leaderboardHandler.command = /^(classificapokemon|pokedexrank|pokemonleaderboard)$/i

export default leaderboardHandler