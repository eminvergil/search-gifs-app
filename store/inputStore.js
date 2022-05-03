import { configureStore } from "@reduxjs/toolkit";
import inputReducer from "./slice/inputSlice";

export const store = configureStore({
  reducer: {
    inputItem: inputReducer,
  },
});
