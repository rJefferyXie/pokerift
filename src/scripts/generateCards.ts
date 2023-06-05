// Interfaces
import Pokemon from "../interfaces/Pokemon";

const openCardPack = (deck: Pokemon[], numCards: number) => {
  const pool = deck.flatMap((card) => {
    const weight = card.draw_chance;
    return Array(weight).fill(card);
  });

  // const mythicalOnly = pool.filter(card => card.is_mythical);
  // const legendariesOnly = pool.filter(card => card.is_legendary);

  // Fill the chosenCards array with randomly selected cards from the pool
  const chosenCards = [];
  while (chosenCards.length < numCards && pool.length > 0) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    const chosenCard = pool.splice(randomIndex, 1)[0];
    chosenCards.push(chosenCard);
  }

  return chosenCards;
}

const generateStartingCards = (deck: Pokemon[]) => {
  /* Every new account gets 30 cards selected at random.
  The player is guaranteed to get 1 Legendary, 1 Mythical, and 28 normal cards. */
  const NUM_CARDS = 30;
  const chosenCards = [];

  const pool = deck.flatMap((card) => {
    const weight = card.draw_chance;
    return Array(weight).fill(card);
  });

  // Select the player's legendary card.
  const legendariesOnly = pool.filter(card => card.is_legendary);
  chosenCards.push(legendariesOnly.splice(Math.floor(Math.random() * legendariesOnly.length), 1)[0]);
 
  // Select the player's mythical card.
  const mythicalOnly = pool.filter(card => card.is_mythical);
  chosenCards.push(mythicalOnly.splice(Math.floor(Math.random() * mythicalOnly.length), 1)[0]);

  // Fill the chosenCards array with randomly selected cards from the pool.
  while (chosenCards.length < NUM_CARDS && pool.length > 0) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    const chosenCard = pool.splice(randomIndex, 1)[0];

    if (chosenCard.evolutions.length) {
      chosenCard.level = 1;
    }

    /* Make sure the player doesn't get another legendary / mythical card.
    Also make sure that the player doesn't get any duplicate cards. 
    These limiations only exist for the first 30 cards that the player gets. */
    if (!chosenCard.is_legendary && !chosenCard.is_mythical && !chosenCards.includes(chosenCard)) {
      chosenCards.push(chosenCard);
    }
  }

  console.log(chosenCards)

  return chosenCards;
}

const addRandomCard = (deck: Pokemon[]) => {
  const pool = deck.flatMap((card) => {
    const weight = card.draw_chance;
    return Array(weight).fill(card);
  });

  const randomIndex = Math.floor(Math.random() * pool.length);
  const chosenCard = pool.splice(randomIndex, 1)[0];
  if (chosenCard.evolutions.length) {
    chosenCard.level = 1;
  }
  return chosenCard;
}

export {
  openCardPack,
  addRandomCard,
  generateStartingCards
};