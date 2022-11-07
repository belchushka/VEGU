import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  avatar: {
    id: string;
    path: string;
  } | null;
}

interface IInitialState {
  user: IUser | null;
  users: Array<IUser>;
}

const initialState: IInitialState = {
  user: null,
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const userReducer = userSlice.reducer;
export const {} = userSlice.actions;
