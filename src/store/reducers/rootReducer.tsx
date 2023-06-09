// Redux
import { combineReducers } from '@reduxjs/toolkit';

// Reducers
import deckReducer from './deckReducer';
import cardReducer from './cardReducer';

const rootReducer = combineReducers({
  deck: deckReducer,
  card: cardReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;