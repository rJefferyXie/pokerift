import Kanto from '../../public/images/wallpapers/kanto.png';
import Johto from '../../public/images/wallpapers/johto.png';
import Hoenn from '../../public/images/wallpapers/hoenn.png';
import Sinnoh from '../../public/images/wallpapers/sinnoh.png';
import Unova from '../../public/images/wallpapers/unova.png';
import Kalos from '../../public/images/wallpapers/kalos.png';
import Alola from '../../public/images/wallpapers/alola.png';

export interface Region {
  name: string,
  image: string,
  description: string,
  starters: string[],
  highlightedPokemon: string[]
}

export const Regions: Region[] = [
  {
    name: 'Kanto',
    image: Kanto.src,
    description: 'The Kanto region (カントー地方) is based on the real Kantō region (関東) in Japan. Celadon City and Saffron City are based on the sprawling city of Tokyo, the most important economic center of Japan. Vermilion City is based on Yokohama, the largest seaport in Japan. Kantō and Kansai are the two most populous areas of Honshū, the largest island of Japan, and much like Kanto and Johto, represent a harmony of contrasting cultures living together.',
    starters: ['Bulbasaur', 'Charmander', 'Squirtle'],
    highlightedPokemon: ["venusaur", "charizard", "blastoise", "articuno", "zapdos", "moltres"]
  },
  {
    name: 'Johto',
    image: Johto.src,
    description: 'The Johto region (ジョウト地方) is based on the real Kansai region in Japan. Kansai and Kantō are the two most populous areas of Honshū, the largest island of Japan, and much like Johto and Kanto, represent a harmony of contrasting cultures living together. Compared to modern Kantō, Kansai is linked to the past, and known for its historical temples, shrines, palaces, gardens, and architecture.',
    starters: ['Chikorita', 'Cyndaquil', 'Totodile'],
    highlightedPokemon: ["meganium", "typhlosion", "feraligatr", "ho-oh", "lugia", "celibi"]
  },
  {
    name: 'Hoenn',
    image: Hoenn.src,
    description: 'The Hoenn region (ホウエン地方) is based on the real-world Japanese main island of Kyushu, rotated 90° counterclockwise. Hoenn was created after Primal Groudon and Primal Kyogre were formed. Primal Groudon raised the landmasses and Primal Kyogre filled the seas that would later become Hoenn. A meeting between these two caused a great battle for supremacy until it was quelled by Mega Rayquaza.',
    starters: ['Treecko', 'Torchic', 'Mudkip'],
    highlightedPokemon: ["sceptile", "blaziken", "swampert", "groudon", "kyogre", "rayquaza"]
  },
  {
    name: 'Sinnoh',
    image: Sinnoh.src,
    description: `The Sinnoh region (シンオウ地方) is based on the geography of the Japanese island of Hokkaido and southern part of the Russian island Sakhalin, as well as Kunashir, which is claimed by Japan, but administered by Russia. Jubilife City is Sinnoh's largest city, which is based on Sapporo City, Hokkaido's largest city, while Veilstone City is based upon Abashiri City, a major port city.`,
    starters: ['Turtwig', 'Chimchar', 'Piplup'],
    highlightedPokemon: ["torterra", "infernape", "empoleon", "dialga", "palkia", "giratina"]
  },
  {
    name: 'Unova',
    image: Unova.src,
    description: `The Unova region (イッシュ地方) is derived from the Japanese word for "one variety", 一種 isshu. One of the largest cities in Unova, Castelia City, is based on Lower Manhattan, but to the immediate north of Castelia is (as opposed to a continuing metropolis as in real life) a vast desert. The Battle Subway is a reference to the New York City Subway, which is the most extensive public transit system in the world, as well as one of the oldest.`,
    starters: ['Snivy', 'Tepig', 'Oshawott'],
    highlightedPokemon: ["serperior", "emboar", "samurott", "reshiram", "zekrom", "kyurem"]
  },
  {
    name: 'Kalos',
    image: Kalos.src,
    description: 'The Kalos region (カロス地方) is shaped like a five-pointed star, with one of its biggest cities being Lumiose City in the north-central part of the region. It features a vast network of rivers and waterways snaking through much of its landscape, cities and towns. North-east of Lumiose City lies a mountain range where more frigid temperatures exist, extending down into the plains below.',
    starters: ['Chespin', 'Fennekin', 'Froakie'],
    highlightedPokemon: ["chesnaught", "delphox", "greninja", "xerneas", "yveltal", "zygarde"]
  },
  {
    name: 'Alola',
    image: Alola.src,
    description: "The Alola region (アローラ地方) is made up of five islands: the natural islands Melemele Island, Akala Island, Ula'ula Island, and Poni Island; and the artificial island Aether Paradise. It is a popular resort destination and attracts a lot of tourists from other regions. In Alola, humans and Pokémon coexist in a very close relationship, and a culture has developed that is different from other regions.",
    starters: ['Rowlet', 'Litten', 'Popplio'],
    highlightedPokemon: ["decidueye", "incineroar", "primarina", "lunala", "solgaleo", "necrozma"]
  }
];