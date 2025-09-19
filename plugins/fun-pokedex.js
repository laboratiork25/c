import fetch from 'node-fetch';
import '../lib/language.js';

const config = {
  emoji: {
    attesa: '⏳',
    completato: '✅',
    errore: '❌'
  }
};

let handler = async (m, { conn, text }) => {
  let userId = m.sender;
  let groupId = m.chat.endsWith('@g.us') ? m.chat : null;
  
  if (!text) return conn.reply(m.chat, global.t('pokedexNoInput', userId, groupId), m);

  try {
    // Feedback ricerca
    await m.react(config.emoji.attesa);
    
    // Messaggio di attesa
    await conn.sendMessage(m.chat, { 
      text: global.t('pokedexSearching', userId, groupId, { pokemon: text }),
      contextInfo: {
        mentionedJid: [m.sender]
      }
    });

    // Richiesta API
    const url = `https://some-random-api.com/pokemon/pokedex?pokemon=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    
    if (!response.ok) throw new Error('API non raggiungibile');

    const pokemon = await response.json();
    if (!pokemon?.name) throw new Error('Pokémon non trovato');

    // Formattazione risposta con variabili localizzate
    const infoPokemon = global.t('pokedexInfo', userId, groupId, {
      name: pokemon.name,
      id: pokemon.id,
      type: Array.isArray(pokemon.type) ? pokemon.type.join(', ') : pokemon.type,
      abilities: Array.isArray(pokemon.abilities) ? pokemon.abilities.join(', ') : pokemon.abilities,
      height: pokemon.height,
      weight: pokemon.weight,
      description: pokemon.description || global.t('pokedexNoDescription', userId, groupId),
      urlName: encodeURIComponent(pokemon.name.toLowerCase())
    });

    // Invio messaggio
    await conn.sendMessage(m.chat, { 
      text: infoPokemon,
      mentions: [m.sender]
    });
    
    await m.react(config.emoji.completato);

  } catch (error) {
    console.error('Errore ricerca Pokémon:', error);
    await m.react(config.emoji.errore);
    await conn.sendMessage(m.chat, { 
      text: global.t('pokedexError', userId, groupId),
      mentions: [m.sender]
    });
  }
};

handler.help = ['pokedex <pokémon>'];
handler.tags = ['utility', 'giochi'];
handler.command = ['pokedex', 'pokemon', 'pokédex', 'pokémon'];
export default handler;