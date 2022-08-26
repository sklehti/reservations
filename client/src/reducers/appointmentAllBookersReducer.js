import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const appointmentAllBookersSlice = createSlice({
  name: "appointmentAllBookers",
  initialState,
  reducers: {
    allBookers(state, action) {
      return action.payload;
    },
  },
});

export const { allBookers } = appointmentAllBookersSlice.actions;
export default appointmentAllBookersSlice.reducer;
