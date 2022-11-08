import { createSlice } from "@reduxjs/toolkit";
import {IUser} from "@box/entities";

interface IInitialState {
  token: null | string;
  user: IUser | null;
  isAuth: boolean;
}

const initialState: IInitialState = {
  token: null,
  user: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      return {
        ...action.payload,
      };
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setAuthUser(state, action) {
      state.user = action.payload;
    },
    wipeSession: () => initialState,
  },
});

export const authReducer = authSlice.reducer;
export const { setAuth, wipeSession, setToken, setAuthUser } = authSlice.actions;
