import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const gameBuddyBuddiesSlice = createSlice({
  name: "gameBuddies",
  initialState,
  reducers: {
    gameBuddies(state, action) {
      return action.payload;
    },
  },
});

export const { gameBuddies } = gameBuddyBuddiesSlice.actions;
export default gameBuddyBuddiesSlice.reducer;
