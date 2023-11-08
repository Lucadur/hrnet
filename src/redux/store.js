import { configureStore } from "@reduxjs/toolkit";
import employeesListReducer from "./EmployeeSlice";

export const store = configureStore({
  reducer: {
    employeesList: employeesListReducer,
  },
});
