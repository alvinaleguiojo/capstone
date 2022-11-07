import { createSlice } from "@reduxjs/toolkit";

export const termsSlice = createSlice({
  name: "terms",
  initialState: { value: false },
  reducers: {
    termsModal: (state, action) => {
      return !state.value
    },
  },
});

export const { termsModal } = termsSlice.actions;
export default termsSlice.reducer;
