// Redux
import { PayloadAction } from '@reduxjs/toolkit';

// Types
import { CARD } from '../types';

const initialState = {
  currentCard: undefined,
}

const cardReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case CARD.VIEW_CARD: {
      return {
        ...state,
        currentCard: action.payload,
      }
    }

    default: {
      return state;
    }
  }
}

export default cardReducer;