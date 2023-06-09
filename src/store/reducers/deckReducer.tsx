// Redux
import { PayloadAction } from '@reduxjs/toolkit';

// Types
import { DECK } from '../types';

const initialState = {
  deck: undefined,
}

const deckReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case DECK.VIEW: {
      return {
        ...state,
        deck: action.payload,
      }
    }

    default: {
      return state;
    }
  }
}

export default deckReducer;