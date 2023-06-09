// Redux
import { PayloadAction } from '@reduxjs/toolkit';

// Types
import { DECK } from '../types';

const initialState = {
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

    default: {
      return state;
    }
  }
}

export default deckReducer;