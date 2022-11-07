import { $autHost, $host } from "@box/shared";
import { AppThunk } from "@box/store";
import Cookies from "js-cookie";
import { setAuth, setAuthUser, setToken } from "@box/entities/auth";

export const login: AppThunk =
  (email: string, password: string) => async (dispatch) => {
    try {
      const { data } = await $host.post("/auth/sign-in", {
        email: email,
        password: password,
      });
      const token = data.body.accessToken;

      dispatch(setToken(token));
      Cookies.set("access_token", token);
      const { data: user_data } = await $autHost.get("/user/me");
      dispatch(
        setAuth({
          user: user_data.body,
          isAuth: true,
          token: token,
        })
      );
    } catch (e: any) {
      throw e;
    }
  };

export const register_user: AppThunk =
  (email: string, name: string, surname: string, password: string) =>
  async (dispatch) => {
    try {
      const { data } = await $host.post("/auth/sign-up", {
        email: email,
        password: password,
        name: name,
        surname: surname,
        patronymic: "no devops",
      });
      const token = data.body.accessToken;
      Cookies.set("access_token", token);
      dispatch(setToken(token));
      const { data: user_data } = await $autHost.get("/user/me");
      dispatch(
        setAuth({
          user: user_data.body,
          isAuth: true,
          token: token,
        })
      );
    } catch (e: any) {
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

export const updateAvatar: AppThunk = (avatar: File) => async (dispatch) => {
  try {
    const { data: user_data } = await $autHost.put(
      "/user/update-avatar",
      {
        avatar: avatar,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(setAuthUser(user_data.body));
  } catch (e) {
    throw e;
  }
};
