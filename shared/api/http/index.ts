import axios from "axios";
import { store } from "@box/store";
import Router from "next/router";

const $host = axios.create({
    baseURL: "https://vegudev.ares-ufa.ru/api/",
});

const $autHost = axios.create({
    baseURL: "https://vegudev.ares-ufa.ru/api/",
});

$autHost.interceptors.request.use(async (config: any) => {
    if (config.headers) {
        const token = store.getState().auth.token;
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
});

$autHost.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (401 === error.response.status) {
            Router.replace("/auth", {
                query: {
                    to: Router.asPath,
                },
            });
        } else {
            return Promise.reject(error);
        }
    }
);

export { $host, $autHost };
