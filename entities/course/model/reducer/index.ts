import {createSlice} from "@reduxjs/toolkit";

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
    filter: {
        courseTypes: Array<string>;
    };
    types: Array<IType>;
    total: number;
    pages: number;
    currentPage: number;
}

const initialState: IInitialState = {
    course: null,
    courses: [],
    filter: {
        courseTypes: [],
    },
    types: [],
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
        setCoursesPages(state, action) {
            state.pages = action.payload;
        },
        setCoursesTotal(state, action) {
            state.total = action.payload;
        },
        setCoursesCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setCoursesFilter(state, action) {
            state.filter = {
                ...state.filter,
                [action.payload.key]: action.payload.value,
            };
        },
        clearCoursesFilters(state) {
            state.filter = {
                ...initialState.filter,
            };
        },
        setTypes(state, action) {
            state.types = action.payload;
        },
    },
});

export const courseReducer = courseSlice.reducer;
export const {
    setCourses,
    setCoursesFilter,
    setCourse,
    setCoursesCurrentPage,
    setCoursesTotal,
    setCoursesPages,
    setTypes,
    clearCoursesFilters
} = courseSlice.actions;

