import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const bookerInfoUserInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    bookerInfoUserInfo(state, action) {
      return action.payload;
    },
  },
});

export const { bookerInfoUserInfo } = bookerInfoUserInfoSlice.actions;
export default bookerInfoUserInfoSlice.reducer;
