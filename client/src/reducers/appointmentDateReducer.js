import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const appointmentSlice = createSlice({
  name: "appointmentDate",
  initialState,
  reducers: {
    playingDates(state, action) {
      const date = action.payload;
      return date;
    },
  },
});

export const { playingDates } = appointmentSlice.actions;
export default appointmentSlice.reducer;
