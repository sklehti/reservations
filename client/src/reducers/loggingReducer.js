import { createSlice } from "@reduxjs/toolkit";

const initialState = true;

const loggingSlice = createSlice({
  name: "logging",
  initialState,
  reducers: {
    registeredFalse: (state, action) => {
      return action.payload;
    },
    registeredTrue: (state, action) => {
      return action.payload;
    },
  },
});

export const { registeredFalse, registeredTrue } = loggingSlice.actions;
export default loggingSlice.reducer;
