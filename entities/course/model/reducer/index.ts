import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "@box/store";

export interface ICourse {
  id: string;
  name: string;
  trainingTime: number;
  price: number;
  priceMonth: number;
  hours: number;
  description: string;
  skills: string;
  certificate: string;
  status: string;
  createdAt: Date;
  courseTypeId: string;
}

export interface IType {
  id: string;
  name: string;
  base: boolean;
}

interface IInitialState {
  course: ICourse | null;
  courses: Array<ICourse>;
  types: Array<IType>;
  filter: {
    courseTypes: string;
  };
  total: number;
  pages: number;
  currentPage: number;
}

const initialState: IInitialState = {
  course: null,
  courses: [],
  types: [],
  filter: {
    courseTypes: "",
  },
  total: 0,
  pages: 1,
  currentPage: 1,
};

const courseSlice = createSlice({
  name: "course",
  initialState: initialState,
  reducers: {
    setCourses(state, action) {
      state.courses = action.payload;
    },
    setCourse(state, action) {
      state.course = action.payload;
    },
    setPages(state, action) {
      state.pages = action.payload;
    },
    setTotal(state, action) {
      state.total = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setTypes(state, action) {
      state.types = action.payload;
    },
    setFilter(state, action) {
      state.filter = {
        ...state.filter,
        [action.payload.key]: action.payload.value,
      };
    },
    clearFilter(state) {
      state.filter = {
        ...initialState.filter,
      };
    },
  },
});

export const courseReducer = courseSlice.reducer;
export const {
  setCourses,
  setPages,
  setTotal,
  setCurrentPage,
  setTypes,
  setFilter,
  setCourse,
  clearFilter,
} = courseSlice.actions;

export const selectCourseType =
  (id: string) =>
  (state: AppState): IType | undefined => {
    return state.course.types.find((el: IType) => el.id == id);
  };
