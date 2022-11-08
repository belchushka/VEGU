import { AppThunk } from "@box/store";
import { $autHost, $host } from "@box/shared";
import {
  setCourse,
  setCourses, setCoursesPages, setCoursesTotal, setTypes,
} from "@box/entities";

export const createCourse: AppThunk =
  (props: {
    name: string;
    description: string;
    hours: number;
    typeId: string;
  }) =>
  async (dispatch) => {
    try {
      const { data } = await $autHost.post("/course/create", props);
      return data.body.id;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

export const updateCourse: AppThunk = (data) => async (dispatch) => {
  try {
    await $autHost.put("/course/update", data);
  } catch (e) {
    throw e;
  }
};

export const getCourseTypes: AppThunk = () => async (dispatch) => {
  try {
    const { data: types } = await $host.get("/course-type/list");
    dispatch(setTypes(types.body));
  } catch (e) {
    console.log(e);
  }
};

export const getCourses: AppThunk = (props) => async (dispatch, getState) => {
  try {
    const state = getState();
    const filters = Object.entries(state.course.filter).reduce((acc: {},el)=>{
      return {
        ...acc,
        [el[0]]:el[1].join(",")
      }
    }, {})
    const { data } = await $host.get("/course/list", {
      params: {
        page: state.course.currentPage,
        ...filters,
      },
    });
    const { data: pages } = await $host.get("/course/get-page-count", {
      params: {
        ...filters,
      },
    });
    const { data: total } = await $host.get("/course/get-count", {
      params: {
        ...filters,
      },
    });

    dispatch(setCourses(data.body));
    dispatch(setCoursesPages(pages.body.count));
    dispatch(setCoursesTotal(total.body.count));
  } catch (e) {
    throw e;
  }
};

export const getCourse: AppThunk = (id) => async (dispatch) => {
  try {
    const { data: course } = await $host.get("/course/get/" + id);
    dispatch(setCourse(course.body));
  } catch (e) {
    throw e;
  }
};

export const getAdminCourses: AppThunk =
  (props) => async (dispatch, getState) => {
    try {
      const state = getState();
      const { data } = await $autHost.get("/course/list-my-created", {
        params: {
          page: state.course.currentPage,
          ...state.course.filter,
        },
      });
      dispatch(setCourses(data.body));
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

export const getMyCourses: AppThunk =
  (props) => async (dispatch, getState) => {
    try {
      const state = getState();
      const { data } = await $autHost.get("/course/list-my", {
        params: {
          page: state.course.currentPage,
          ...state.course.filter,
        },
      });

      dispatch(setCourses(data.body));
    } catch (e) {
      throw e;
    }
  };
