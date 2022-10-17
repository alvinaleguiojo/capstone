import { createSlice } from "@reduxjs/toolkit";

export const medicineSlice = createSlice({
  name: "medicines",
  initialState: { value: [] },
  reducers: {
    addMedicineRequest: (state, action) => {
      state.value.push(action.payload);
    },
    deleteMedicineRequest: (state, action) => {
      state.value = state.value.filter(
        (medicine) => medicine.MedicineID !== action.payload.id
      );
    },
  },
});

export const { addMedicineRequest, deleteMedicineRequest } =
  medicineSlice.actions;
export default medicineSlice.reducer;
