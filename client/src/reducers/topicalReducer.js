import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const topicalSlice = createSlice({
  name: "topical",
  initialState,
  reducers: {
    allTopicals(state, action) {
      const topical = action.payload;
      state.push(topical);
      return state;
    },
  },
});

export const { allTopicals } = topicalSlice.actions;
export default topicalSlice.reducer;
