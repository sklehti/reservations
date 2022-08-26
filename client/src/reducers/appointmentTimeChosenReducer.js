import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const appointmentTimeChosenSlice = createSlice({
  name: "appointmentTimeChosen",
  initialState,
  reducers: {
    timeChosenFalse: (state, action) => {
      return action.payload;
    },
    timeChosenTrue: (state, action) => {
      return action.payload;
    },
  },
});

export const { timeChosenFalse, timeChosenTrue } =
  appointmentTimeChosenSlice.actions;
export default appointmentTimeChosenSlice.reducer;
