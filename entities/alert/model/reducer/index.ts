import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  visible: boolean;
  type: "success" | "error";
  text: string;
}

const initialState: IInitialState = {
  visible: false,
  type: "success",
  text: "",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert(state, action) {
      return {
        visible: true,
        type: action.payload.type,
        text: action.payload.text,
      };
    },
    hideAlert(state, action) {
      return {
        ...state,
        visible: false,
      };
    },
  },
});

export const alertReducer = alertSlice.reducer;
export const { showAlert, hideAlert } = alertSlice.actions;
