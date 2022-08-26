import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const bookerInfoUserReservationsSlice = createSlice({
  name: "userReservations",
  initialState,
  reducers: {
    bookerInfoUserReservations(state, action) {
      return action.payload;
    },
  },
});

export const { bookerInfoUserReservations } =
  bookerInfoUserReservationsSlice.actions;
export default bookerInfoUserReservationsSlice.reducer;
