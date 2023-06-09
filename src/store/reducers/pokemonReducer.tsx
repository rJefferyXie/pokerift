// Redux
import { PayloadAction } from '@reduxjs/toolkit';

// Types
import { POKEMON } from '../types';

const initialState = {
  pokemon: undefined,
}

const pokemonReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case POKEMON.VIEW: {
      return {
        ...state,
        pokemon: action.payload,
      }
    }

    default: {
      return state;
    }
  }
}

export default pokemonReducer;