import '../lib/language.js';

let leaderboardHandler = async (m, { conn }) => {
  const userId = m.sender;
  const groupId = m.chat;
  
  let users = Object.entries(global.db.data.users)
    .map(([id, data]) => ({
      id,
      name: data.name || id,
      count: data.pokemons?.length || 0
    }))
    .filter(u => u.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  if (users.length === 0) {
    return m.reply(global.t('pokeLeaderboardEmpty', userId, groupId));
  }

  let rankMsg = global.t('pokeLeaderboardTitle', userId, groupId) + '\n\n' + 
    users.map((u, i) => `${i + 1}. ${u.name} - ${u.count} carte`).join('\n');

  m.reply(rankMsg);
};

leaderboardHandler.help = ['classificapokemon'];
leaderboardHandler.tags = ['pokemon'];
leaderboardHandler.command = /^(classificapokemon|pokemonleaderboard)$/i;
export default leaderboardHandler;
