// Redux
import { PayloadAction } from '@reduxjs/toolkit';

// Types
import { ALERT } from '../types';

const initialState = {
  showing: false,
  content: '',
  severity: ''
}

const alertReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case ALERT.SET_SHOWING: {
      return {
        ...state,
        showing: action.payload,
      }
    }

    case ALERT.SET_CONTENT: {
      return {
        ...state,
        content: action.payload
      }
    }

    case ALERT.SET_SEVERITY: {
      return {
        ...state,
        severity: action.payload
      }
    }

    default: {
      return state;
    }
  }
}

export default alertReducer;