import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterReducer';

const rootReducer = combineReducers({
  counterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;