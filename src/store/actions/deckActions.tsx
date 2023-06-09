// Types
import { DECK } from "../types";

// Interfaces
import Deck from "../../interfaces/Deck";

const viewDeck = (deck: Deck | undefined) => {
  return {
    type: DECK.VIEW_DECK,
    payload: deck
  }
}

export default { viewDeck };