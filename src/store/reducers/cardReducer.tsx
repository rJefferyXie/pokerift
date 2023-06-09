// Redux
import { PayloadAction } from '@reduxjs/toolkit';

// Types
import { CARD } from '../types';

const initialState = {
  card: undefined,
}

const cardReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case CARD.VIEW_CARD: {
      return {
        ...state,
        card: action.payload,
      }
    }

    default: {
      return state;
    }
  }
}

export default cardReducer;