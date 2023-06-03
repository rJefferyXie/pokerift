// Interfaces
import Pokemon from "../interfaces/Pokemon";

const chooseCardsByRarity = (deck: Pokemon[], numCards: number) => {
  const pool = deck.flatMap((card) => {
    const weight = card.draw_chance;
    return Array(weight).fill(card);
  });

  // Fill the chosenCards array with randomly selected cards from the pool
  const chosenCards = [];
  while (chosenCards.length < numCards && pool.length > 0) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    chosenCards.push(pool.splice(randomIndex, 1)[0]);
  }

  return chosenCards;
}

export default chooseCardsByRarity;