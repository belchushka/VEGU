import { AppThunk } from "@box/store";
import { $autHost } from "@box/shared";
import {
  addModule, getCourseBlockById, getCourseBlocks,
  IBlock,
  setModule,
  setModules,
} from "@box/entities";

export const getModules: AppThunk = (id: number) => async (dispatch) => {
  try {
    const { data } = await $autHost.get("/block-module/list", {
      params: {
        blockId: id,
      },
    });
    await dispatch(getCourseBlockById(id))
    dispatch(setModules(data.body));
  } catch (e) {
    throw e;
  }
};

export const createModule: AppThunk =
  (blockId: number, name: string) => async (dispatch) => {
    try {
      const { data } = await $autHost.post("/block-module/create", {
        blockId,
        name,
      });
      dispatch(addModule(data.body));
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

export const getModuleById: AppThunk<IBlock | any> =
  (id: number) => async (dispatch) => {
    try {
      const { data } = await $autHost.get("/block-module/get", {
        params: {
          id: id,
        },
      });
      dispatch(setModule(data.body));
      return data.body;
    } catch (e) {
      throw e;
    }
  };

export const updateModule: AppThunk = (data) => async (dispatch) => {
  try {
    await $autHost.put("/block-module/update", data);
  } catch (e) {
    throw e;
  }
};

export const deleteModule: AppThunk = (id: string) => async (dispatch) => {
  try {
    const { data } = await $autHost.delete("/block-module/remove", {
      data: {
        id: id,
      },
    });
    dispatch(setModules(data.body));
  } catch (e) {
    throw e;
  }
};
