import '../lib/language.js';
import fetch from 'node-fetch';

const config = {
  emoji: {
    attesa: '⏳',
    completato: '✅',
    errore: '❌'
  }
};

let handler = async (m, { conn, text }) => {
  const userId = m.sender;
  const groupId = m.chat;
  
  if (!text) return conn.reply(m.chat, global.t('pokedexNoName', userId, groupId), m);

  try {
    await m.react(config.emoji.attesa);
    
    await conn.reply(m.chat, global.t('pokedexSearching', userId, groupId, { name: text }), m);
    
    const url = `https://some-random-api.com/pokemon/pokedex?pokemon=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    
    if (!response.ok) throw new Error('API non raggiungibile');

    const pokemon = await response.json();
    if (!pokemon?.name) throw new Error('Pokémon non trovato');

    const infoPokemon = global.t('pokedexInfo', userId, groupId, {
        name: pokemon.name,
        id: pokemon.id,
        type: Array.isArray(pokemon.type) ? pokemon.type.join(', ') : pokemon.type,
        abilities: Array.isArray(pokemon.abilities) ? pokemon.abilities.join(', ') : pokemon.abilities,
        height: pokemon.height,
        weight: pokemon.weight,
        desc: pokemon.description || 'Nessuna descrizione disponibile',
        url: `https://www.pokemon.com/it/pokedex/${encodeURIComponent(pokemon.name.toLowerCase())}`
    });

    await conn.sendMessage(m.chat, { 
      image: { url: pokemon.sprites?.animated || pokemon.sprites?.normal || 'https://i.imgur.com/example.png' },
      caption: infoPokemon,
      mentions: [m.sender]
    }, { quoted: m });
    
    await m.react(config.emoji.completato);

  } catch (error) {
    console.error('Errore ricerca Pokémon:', error);
    await m.react(config.emoji.errore);
    await conn.reply(m.chat, global.t('pokedexError', userId, groupId), m);
  }
};

handler.help = ['pokedex <pokémon>', 'pokemon <pokémon>'];
handler.tags = ['utility'];
handler.command = /^(pokedex)$/i;

export default handler;
