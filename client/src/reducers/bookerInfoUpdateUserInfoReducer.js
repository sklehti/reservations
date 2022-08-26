import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const bookerInfoUpdateUserInfoSlice = createSlice({
  name: "updateUserInfo",
  initialState,
  reducers: {
    updateUserInfoFalse: (state, action) => {
      return action.payload;
    },
    updateUserInfoTrue: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateUserInfoFalse, updateUserInfoTrue } =
  bookerInfoUpdateUserInfoSlice.actions;
export default bookerInfoUpdateUserInfoSlice.reducer;
