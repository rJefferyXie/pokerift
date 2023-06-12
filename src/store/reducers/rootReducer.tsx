// Redux
import { combineReducers } from '@reduxjs/toolkit';

// Reducers
import deckReducer from './deckReducer';
import cardReducer from './cardReducer';
import alertReducer from './alertReducer';

const rootReducer = combineReducers({
  deck: deckReducer,
  card: cardReducer,
  alert: alertReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;