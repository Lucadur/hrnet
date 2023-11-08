// EmployeeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeesList: [],
};

export const employeesListSlice = createSlice({
  name: "employeesList",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employeesList.push(action.payload);
    },
  },
});

export const { addEmployee } = employeesListSlice.actions;

export default employeesListSlice.reducer;
