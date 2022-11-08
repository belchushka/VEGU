import {AppStore, wrapper} from "@box/store";
import {$host} from "@box/shared";
import {logout, setAuth} from "@box/entities";
import App, {AppContext} from "next/app";

type AuthorizeType = {
    ctx: AppContext;
    store: AppStore;
};

export const authorize = async ({ctx, store}: AuthorizeType) => {
    const {req} = ctx.ctx;
    // @ts-ignore
    const cookie = req?.cookies;
    if (req) {
        try {
            const token = cookie.access_token;
            if (token) {
                const {data} = await $host.get("/user/me", {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                const user = data.body;
                store.dispatch(
                    setAuth({
                        isAuth: true,
                        user: user,
                        token: cookie.access_token,
                    })
                );
            } else {
                store.dispatch(logout());
            }
        } catch (e) {
            console.log(e);
        }
    }
};

export const initialAuth = () => wrapper.getInitialAppProps((store) => async (ctx) => {
    await authorize({
        ctx,
        store,
    });
    return {
        pageProps: {
            ...(await App.getInitialProps(ctx)).pageProps,
            pathname: ctx.ctx.pathname,
        },
    };
});


