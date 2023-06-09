interface ColorMap {
  [key: string]: string
}

const TypeColorSchemes: ColorMap = { 
  "bug": "#C6D16E",
  "dark": "#A29288",
  "dragon": "#A27DFA",
  "electric": "#FAE078",
  "fairy": "#F4BDC9",
  "fighting": "#D67873",
  "flying": "#C6B7F5",
  "fire": "#F5AC78",
  "ghost": "#A292BC",
  "grass": "#A7DB8D",
  "ground": "#EBD69D",
  "ice": "#BCE6E6",
  "normal": "#C6C6A7",
  "poison": "#C183C1",
  "psychic": "#FA92B2",
  "rock": "#D1C17D",
  "steel": "#D1D1E0",
  "water": "#9DB7F5"
}

interface StatMap {
  [key: number]: string
}

const StatStrings: StatMap = {
  0: "Health",
  1: "Attack",
  2: "Defense",
  3: "Sp. Attack",
  4: "Sp. Defense",
  5: "Speed"
}

export {
  TypeColorSchemes,
  StatStrings
};