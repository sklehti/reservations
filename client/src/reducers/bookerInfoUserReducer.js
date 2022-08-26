import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const bookerInfoUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    bookerInfoUser(state, action) {
      return action.payload;
    },
  },
});

export const { bookerInfoUser } = bookerInfoUserSlice.actions;
export default bookerInfoUserSlice.reducer;
