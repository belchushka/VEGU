import { createSlice } from "@reduxjs/toolkit";

export interface IModule {
  id: string;
  name: string;
}

interface IInitialState {
  module: IModule | null;
  modules: Array<IModule>;
}

const initialState: IInitialState = {
  module: null,
  modules: [],
};

const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {
    setModule(state, action) {
      state.module = action.payload;
    },
    setModules(state, action) {
      state.modules = action.payload;
    },
    addModule(state, action) {
      state.modules = [...state.modules, action.payload];
    },
  },
});

export const moduleReducer = moduleSlice.reducer;
export const { setModules, addModule, setModule } = moduleSlice.actions;
