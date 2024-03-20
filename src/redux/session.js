import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentPlayer: '',
}

export const currentSessionUser = createSlice({
  name: 'currentPlayer',
  initialState,
  reducers: {
    setCurrentPlayer: (state, action) => {
      state.currentPlayer = action.payload;
      const playerList = localStorage.playerList ? JSON.parse(localStorage.playerList) : [];
        localStorage.playerList = JSON.stringify([...playerList, action.payload]);
    },
  },
})

export const { setCurrentPlayer } = currentSessionUser.actions

export default currentSessionUser.reducer