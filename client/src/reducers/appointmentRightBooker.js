import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const appointmentRightBookerSlice = createSlice({
  name: "appointmentRightBooker",
  initialState,
  reducers: {
    rightBooker(state, action) {
      return action.payload;
    },
  },
});

export const { rightBooker } = appointmentRightBookerSlice.actions;
export default appointmentRightBookerSlice.reducer;
