import { $autHost } from "@box/shared";
import { AppThunk } from "@box/store";
import Cookies from "js-cookie";
import {  setAuthUser, wipeSession } from "@box/entities/auth";

export const logout: AppThunk = () => async (dispatch) => {
    try {
        Cookies.remove("access_token");
        dispatch(wipeSession())
    } catch (e) {
        throw e;
    }
};

export const getMe: AppThunk = () => async (dispatch) => {
  try {
    const { data: user_data } = await $autHost.get("/user/me");
    dispatch(setAuthUser(user_data.body));
  } catch (e) {
    throw e;
  }
};


