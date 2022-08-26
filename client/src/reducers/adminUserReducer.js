import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const adminUserSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminFalse: (state) => {
      state.value = false;
    },
    adminTrue: (state, action) => {
      return action.payload;
    },
  },
});

export const { adminFalse, adminTrue } = adminUserSlice.actions;
export default adminUserSlice.reducer;
