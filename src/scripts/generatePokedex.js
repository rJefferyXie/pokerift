import axios from 'axios';
import { unusedPokemonData, unusedSpeciesData, unusedMoveData } from './constants';

const storedMoves = {};
const storedEvolutions = {};

const getPokedex = async () => {
  await axios.get('https://pokeapi.co/api/v2/pokedex/1/')
  .then(async (res) => {
    const pokemonEntries = res.data.pokemon_entries.slice(279, 281);
    const pokemonAndSpeciesData = await getPokemonAndSpeciesData(pokemonEntries);
    console.log(pokemonAndSpeciesData);
  })
  .catch((err) => {
    console.error(err);
  });
}

const getPokemonAndSpeciesData = async (pokemonEntries) => {
  return await Promise.all(pokemonEntries.map(async (entry) => {
    const speciesURL = entry.pokemon_species.url;
    const pokemonURL = entry.pokemon_species.url.replace('https://pokeapi.co/api/v2/pokemon-species/', 'https://pokeapi.co/api/v2/pokemon/');
    const speciesData = await axios.get(speciesURL).then((res) => res.data).then((data) => cleanSpeciesData(data));
    const pokemonData = await axios.get(pokemonURL).then((res) => res.data).then((data) => cleanPokemonData(data));

    return {
      "speciesData": speciesData,
      "pokemonData": pokemonData
    }}
  ));
}

const cleanPokemonData = async (pokemonData) => {
  unusedPokemonData.forEach(key => {
    delete pokemonData[key];
  });

  // Pokemon Images
  pokemonData.sprites = {
    'default': pokemonData.sprites.other['official-artwork'].front_default,
    'shiny': pokemonData.sprites.other['official-artwork'].front_shiny
  }

  pokemonData.moves = await getMoves(pokemonData);

  return pokemonData;
}

const getMoves = async (pokemonData) => {
  const allMoves = await Promise.all(pokemonData.moves.map(async (move) => {
    move = move.move;

    // Store moves dynamically to prevent requesting the same URL twice
    if (!storedMoves[move.name]) {
      storedMoves[move.name] = await axios.get(move.url).then((res) => res.data);
    }

    // Only take moves that damage the enemy
    if (storedMoves[move.name].power) {
      return storedMoves[move.name];
    }
  }));

  const filteredMoves = allMoves.filter(move => move !== undefined);
  const cleanedMoves = filteredMoves.map(move => {
    return cleanMoveData(move);
  })
  
  return cleanedMoves;
}

const cleanMoveData = (move) => {
  unusedMoveData.forEach(key => {
    delete move[key];
  });

  return move;
}

const cleanSpeciesData = async (speciesData) => {
  // Pokemon Nickname / Title
  speciesData.genus = speciesData.genera.find(genus => {
    return genus.language.name === 'en';
  }).genus;

  // Pokemon Description
  speciesData.flavor_text = speciesData.flavor_text_entries.find(fte => {
    return fte.language.name === 'en';
  }).flavor_text;

  if (speciesData.evolves_from_species) {
    speciesData.evolves_from_species = speciesData.evolves_from_species.name;
  }

  speciesData.evolutions = await getEvolutionData(speciesData);

  unusedSpeciesData.forEach(key => {
    delete speciesData[key];
  });

  return speciesData;
}

const getEvolutionData = async (speciesData) => {
  const evoURL = speciesData.evolution_chain.url;
  if (!storedEvolutions[evoURL]) {
    storedEvolutions[evoURL] = await axios.get(evoURL).then(res => res.data);
  }

  let evolutions = [];
  const chain = storedEvolutions[evoURL].chain;
  if (chain.evolves_to) {
    const firstEvolutions = [];
    const secondEvolutions = [];

    chain.evolves_to.forEach((evo) => {
      if (![chain.species.name, evo.species.name].includes(speciesData.evolves_from_species)) {
        const evolution = cleanEvolutionData(evo, speciesData.evolves_from_species);
        firstEvolutions.push(evolution);
      }

      if (evo.evolves_to) {
        evo.evolves_to.forEach((nextEvo) => {
          if (![evo.species.name, nextEvo.species.name].includes(speciesData.evolves_from_species)) {
            const evolution = cleanEvolutionData(nextEvo, speciesData.evolves_from_species);
            secondEvolutions.push(evolution);
          }       
        });
      }
    });

    if (firstEvolutions.length > 0) {
      evolutions = evolutions.concat(firstEvolutions);
    } else {
      evolutions = evolutions.concat(secondEvolutions);
    }
  }

  return evolutions;
}

const cleanEvolutionData = (evoData, hasEvolved) => {
  const evolutionDetails = {}

  // Setting Level for Evolution
  if (!evoData.evolution_details[0].min_level) {
    evolutionDetails.minLevel = 20;

    if (hasEvolved) {
      evolutionDetails.minLevel = 40;
    }
  } else {
    evolutionDetails.minLevel = evoData.evolution_details[0].min_level;
  }

  evolutionDetails.evolvesTo = evoData.species.name;
  return evolutionDetails;
}

export default getPokedex;