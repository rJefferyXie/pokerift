interface Deck {
  name: string,
  cards: {
    [key: string]: {
      amount: number
    }
  },
}

export default Deck;