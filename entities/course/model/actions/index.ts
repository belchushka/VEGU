import { AppThunk } from "@box/store";
import { $autHost, $host } from "@box/shared";
import {
  setCourse,
  setCourses,
  setPages,
  setTotal,
  setTypes,
} from "@box/entities";

export const newCourse: AppThunk =
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

export const getTypes: AppThunk = () => async (dispatch) => {
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
    const { data } = await $host.get("/course/list", {
      params: {
        page: state.course.currentPage,
        ...state.course.filter,
      },
    });
    const { data: pages } = await $host.get("/course/get-page-count", {
      params: {
        ...state.course.filter,
      },
    });
    const { data: total } = await $host.get("/course/get-count", {
      params: {
        ...state.course.filter,
      },
    });
    const { data: types } = await $host.get("/course-type/list");

    dispatch(setCourses(data.body));
    dispatch(setPages(pages.body.count));
    dispatch(setTotal(total.body.count));
    dispatch(setTypes(types.body));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getCourse: AppThunk = (id) => async (dispatch) => {
  try {
    const { data: course } = await $host.get("/course/get/" + id);
    const { data: types } = await $host.get("/course-type/list");

    dispatch(setCourse(course.body));
    dispatch(setTypes(types.body));
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
      const { data: types } = await $host.get("/course-type/list");

      dispatch(setCourses(data.body));
      dispatch(setTypes(types.body));
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

export const getBoughtCourses: AppThunk =
  (props) => async (dispatch, getState) => {
    try {
      const state = getState();
      const { data } = await $autHost.get("/course/list-my", {
        params: {
          page: state.course.currentPage,
          ...state.course.filter,
        },
      });
      const { data: types } = await $host.get("/course-type/list");

      dispatch(setCourses(data.body));
      dispatch(setTypes(types.body));
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
