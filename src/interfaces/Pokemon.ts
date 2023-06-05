interface PokemonTypes {
  slot: number,
  type: {
    name: string,
    url: string
  }
}

interface PokemonStats {
  base_stat: number,
  effort: number,
  stat: {
    name: string,
    url: string
  }
}

interface PokemonEvolutions {
  evolvesTo: string,
  minLevel: number
}

interface Pokemon {
  id: number,
  name: string,
  genus: string,
  height: number,
  weight: number,
  level?: number,
  draw_chance: number,
  flavor_text: string,
  is_baby: boolean,
  is_mythical: boolean,
  is_legendary: boolean,
  types: PokemonTypes[],
  stats: PokemonStats[],
  evolutions: PokemonEvolutions[],
  sprites: {
    [key: string]: string
  },
}

export default Pokemon;