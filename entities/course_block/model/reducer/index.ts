import { createSlice } from "@reduxjs/toolkit";

export interface IBlock {
  id: string;
  name: string;
  position: number;
}

interface IInitialState {
  block: IBlock | null;
  blocks: Array<IBlock>;
}

const initialState: IInitialState = {
  block: null,
  blocks: [],
};

const blockSlice = createSlice({
  name: "block",
  initialState,
  reducers: {
    setCourseBlocks(state, action) {
      state.blocks = action.payload;
    },
    addCourseBlock(state, action) {
      state.blocks = [...state.blocks, action.payload];
    },
    setCourseBlock(state, action) {
      state.block = action.payload;
    },
  },
});

export const blockReducer = blockSlice.reducer;
export const { setCourseBlocks, addCourseBlock, setCourseBlock } = blockSlice.actions;
