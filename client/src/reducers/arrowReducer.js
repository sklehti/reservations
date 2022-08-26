import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const arrowSlice = createSlice({
  name: "arrow",
  initialState,
  reducers: {
    showArrowFalse: (state, action) => {
      return action.payload;
    },
    showArrowTrue: (state, action) => {
      return action.payload;
    },
  },
});

export const { showArrowFalse, showArrowTrue } = arrowSlice.actions;
export default arrowSlice.reducer;
