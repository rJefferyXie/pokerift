// Redux
import { PayloadAction } from '@reduxjs/toolkit';

// Types
import { DECK } from '../types';

import Deck from '../../interfaces/Deck';

interface deckReducerInterface {
  currentDeck: Deck | undefined
}

const initialState: deckReducerInterface = {
  currentDeck: undefined,
}

const deckReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case DECK.VIEW_DECK: {
      return {
        ...state,
        currentDeck: action.payload,
      }
    }

    case DECK.ADD_CARD: {
      if (!state.currentDeck || action.payload === undefined) return state;

      const cardName = action.payload;
      const updatedCards = { ...state.currentDeck.cards };
      
      if (updatedCards.hasOwnProperty(cardName)) {
        // Card already exists, increment the amount
        updatedCards[cardName].amount += 1;
      } else {
        // Card is new, set the amount to 1
        updatedCards[cardName] = { amount: 1 };
      }
      return {
        ...state,
        currentDeck: {
          ...state.currentDeck,
          cards: updatedCards
        }
      }
    }

    case DECK.REMOVE_CARD: {
      if (!state.currentDeck || action.payload === undefined) return state;

      const cardToRemove = action.payload;
      const updatedCards = { ...state.currentDeck.cards };

      if (updatedCards.hasOwnProperty(cardToRemove)) {
        // Decrement the amount by 1
        updatedCards[cardToRemove].amount -= 1;
    
        // If the amount becomes 0, remove the card
        if (updatedCards[cardToRemove].amount === 0) {
          delete updatedCards[cardToRemove];
        }
      }

      return {
        ...state,
        currentDeck: {
          ...state.currentDeck,
          cards: updatedCards
        }
      }
    }

    case DECK.CHANGE_NAME: {
      if (!state.currentDeck || action.payload === undefined) return state;

      return {
        ...state,
        currentDeck: {
          ...state.currentDeck,
          name: action.payload
        }
      }
    }

    default: {
      return state;
    }
  }
}

export default deckReducer;