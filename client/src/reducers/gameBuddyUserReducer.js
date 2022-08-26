import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  level: "",
  times: "",
};

const gameBuddyUserSlice = createSlice({
  name: "gameBuddyUser",
  initialState,
  reducers: {
    gameBuddyUser(state, action) {
      return action.payload;
    },
  },
});

export const { gameBuddyUser } = gameBuddyUserSlice.actions;
export default gameBuddyUserSlice.reducer;
