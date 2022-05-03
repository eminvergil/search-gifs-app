import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "cat",
};
export const InputSlice = createSlice({
  name: "inputSlice",
  initialState,
  reducers: {
    changeText: (state, action) => {
      state.text = action.payload;
    },
  },
});
export const { changeText } = InputSlice.actions;
export default InputSlice.reducer;
