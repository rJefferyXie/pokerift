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

const addCard = (card: string) => {
  return {
    type: DECK.ADD_CARD,
    payload: card
  }
}

const removeCard = (card: string) => {
  return {
    type: DECK.REMOVE_CARD,
    payload: card
  }
}

const changeName = (name: string) => {
  return {
    type: DECK.CHANGE_NAME,
    payload: name
  }
}

export default { 
  viewDeck,
  addCard,
  removeCard,
  changeName
};