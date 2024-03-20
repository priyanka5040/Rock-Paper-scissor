import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  playerList: [],
};

export const playerReducer = createSlice({
  name: 'playerList',
  initialState,
  reducers: {
    setPlayerList: (state, action) => {
      state.playerList = action.payload;
    },
  },
})

export const { setPlayerList } = playerReducer.actions

export default playerReducer.reducer