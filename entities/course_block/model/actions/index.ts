import { AppThunk } from "@box/store";
import { $autHost } from "@box/shared";
import {
  addCourseBlock as addCourseBlockReducer,
  IBlock,
  setCourseBlock as setCourseBlockReducer,
  setCourseBlocks as setCourseBlocksReducer,
} from "@box/entities/course_block";
import {getCourse} from "@box/entities";

export const getCourseBlocks: AppThunk = (id: number) => async (dispatch) => {
  try {
    const { data } = await $autHost.get("/course-block/list", {
      params: {
        courseId: id,
      },
    });
    await dispatch(getCourse(id))
    dispatch(setCourseBlocksReducer(data.body));
  } catch (e) {
    throw e;
  }
};

export const createCourseBlock: AppThunk =
  (courseId: number, name: string) => async (dispatch) => {
    try {
      const { data } = await $autHost.post("/course-block/create", {
        courseId,
        name,
      });
      dispatch(addCourseBlockReducer(data.body));
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

export const getCourseBlockById: AppThunk<IBlock | any> =
  (id: number) => async (dispatch) => {
    try {
      const { data } = await $autHost.get("/course-block/get", {
        params: {
          id: id,
        },
      });
      dispatch(setCourseBlockReducer(data.body));
      return data.body;
    } catch (e) {
      throw e;
    }
  };

export const updateCourseBlock: AppThunk = (data) => async (dispatch) => {
  try {
    await $autHost.put("/course-block/update", data);
  } catch (e) {
    throw e;
  }
};

export const deleteCourseBlock: AppThunk = (id: string) => async (dispatch) => {
  try {
    const { data } = await $autHost.delete("/course-block/remove", {
      data: {
        id: id,
      },
    });
    dispatch(setCourseBlocksReducer(data.body));
  } catch (e) {
    throw e;
  }
};
