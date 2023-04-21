import { PayloadAction } from '@reduxjs/toolkit';
import COUNTER from '../types';

const initialState = {
  counter: 0,
}

const counterReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case COUNTER.INCREMENT: {
      return {
        ...state,
        counter: state.counter + 1,
      }
    }

    case COUNTER.DECREMENT: {
      return {
        ...state,
        counter: state.counter - 1,
      }
    }

    default: {
      return state;
    }
  }
}

export default counterReducer;