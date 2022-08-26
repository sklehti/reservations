import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const appointmentDateTodaySlice = createSlice({
  name: "appointmentDateToday",

  initialState,
  reducers: {
    dateToday(state, action) {
      return action.payload;
    },
  },
});

export const { dateToday } = appointmentDateTodaySlice.actions;
export default appointmentDateTodaySlice.reducer;
