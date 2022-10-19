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
    addQuantity: (state, action) => {
      state.value.map((medicine) => {
        if (medicine.MedicineID === action.payload.id) {
          medicine.Quantity += 1;
        }
      });
    },
    deductQuantity: (state, action) => {
      state.value.map((medicine) => {
        if (medicine.MedicineID === action.payload.id) {
          medicine.Quantity -= 1;
        }
      });
    },
  },
});

export const { addMedicineRequest, deleteMedicineRequest, addQuantity , deductQuantity} =
  medicineSlice.actions;
export default medicineSlice.reducer;
