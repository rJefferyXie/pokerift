interface Deck {
  id: string,
  name: string,
  size: number,
  cards: {
    [key: string]: {
      amount: number
    }
  },
}

export default Deck;