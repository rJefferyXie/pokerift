interface PokemonTypes {
  type: {
    [key: string]: string;
  }
}

interface Pokemon {
  name: string,
  draw_chance: number,
  types: PokemonTypes[]
  sprites: {
    [key: string]: string
  }
}

export default Pokemon;