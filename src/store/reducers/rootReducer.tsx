// Redux
import { combineReducers } from '@reduxjs/toolkit';

// Reducers
import deckReducer from './deckReducer';
import pokemonReducer from './pokemonReducer';

const rootReducer = combineReducers({
  deckReducer,
  pokemonReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;