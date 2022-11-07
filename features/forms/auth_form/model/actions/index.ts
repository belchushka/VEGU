import {AppThunk} from "@box/store";
import {$autHost, $host} from "@box/shared";
import {setAuth, setToken} from "@box/entities";
import Cookies from "js-cookie";

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

export const register: AppThunk =
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
