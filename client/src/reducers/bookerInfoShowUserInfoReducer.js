import { createSlice } from "@reduxjs/toolkit";

const initialState = true;

const bookerInfoShowUserInfoSlice = createSlice({
  name: "showUserInfo",
  initialState,
  reducers: {
    showUserInfoFalse: (state, action) => {
      return action.payload;
    },
    showUserInfoTrue: (state, action) => {
      return action.payload;
    },
  },
});

export const { showUserInfoFalse, showUserInfoTrue } =
  bookerInfoShowUserInfoSlice.actions;
export default bookerInfoShowUserInfoSlice.reducer;
