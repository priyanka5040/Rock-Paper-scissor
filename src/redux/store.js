import { configureStore } from '@reduxjs/toolkit'
import currentSessionUser from './session';
import playerReducer from './playerList';

export const store = configureStore({
  reducer: {
    currentPlayer: currentSessionUser,
    playerList: playerReducer,
  },
})