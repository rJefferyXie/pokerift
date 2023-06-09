// Types
import { POKEMON } from "../types";

// Interfaces
import Pokemon from "../../interfaces/Pokemon";

const viewPokemon = (pokemon: Pokemon | undefined) => {
  return {
    type: POKEMON.VIEW,
    payload: pokemon
  }
}

export default { viewPokemon };