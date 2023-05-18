const regions = {
  'kanto': 2,
  'johto': 7,
  'hoenn': 15,
  'sinnoh': 6,
  'unova': 9,
  'kalos': 12,
  'alola': 21
};

const unusedPokemonData = [
  'abilities',
  'base_experience',
  'forms',
  'game_indices',
  'is_default',
  'held_items',
  'location_area_encounters',
  'species',
  'order',
  'moves' // Can't have moves for now, takes too much data. Will need to put 1-3 moves for each pokemon later.
];

const unusedSpeciesData = [
  'base_happiness',
  'color',
  'egg_groups',
  'form_descriptions',
  'forms_switchable',
  'gender_rate',
  'generation',
  'growth_rate',
  'habitat',
  'has_gender_differences',
  'hatch_counter',
  'names',
  'pal_park_encounters',
  'pokedex_numbers',
  'shape',
  'varieties',
  'flavor_text_entries',
  'genera',
  'evolution_chain',
  'capture_rate',
  'order'
];

const unusedMoveData = [
  'contest_combos',
  'contest_effect',
  'contest_type',
  'learned_by_pokemon',
  'names',
  'super_contest_effect',
  'past_values',
  'stat_changes',
  'effect_chance',
  'effect_changes',
  'flavor_text_entries',
  'generation',
  'machines',
  'priority',
];

export {
  regions,
  unusedPokemonData,
  unusedSpeciesData,
  unusedMoveData,
}