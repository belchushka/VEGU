import React, { useEffect } from "react";
import { useRouter } from "next/router";
import s from "./style.module.scss";
import {Container, useAuth, useLoading} from "@box/shared";
import {IAuthLayout} from "./types";
import {Loader} from "@mantine/core";


export const AuthLayout: React.FC<IAuthLayout> = ({
                                                      text = "",
                                                      button,
                                                      children,
                                                  }) => {
    const router = useRouter();
    const {isAuth} = useAuth();
    const { loading, startLoading, stopLoading } = useLoading();
    useEffect(() => {
        startLoading();
        if (isAuth) {
            router.replace("/");
        } else {
            stopLoading();
        }
    }, []);
    if (loading) {
        return <Loader />;
    }
    return (
        <Container>
            <div className={s.body}>
                <div className={s.body_left}>
                    <h2>
                        Учим что-то новое
                        <br />
                        прямо сегодня
                    </h2>
                    <div className={s.body_left_alert}>
                        <p>{text}</p>
                        {button}
                    </div>
                </div>
                <div className={s.body_right}>{children}</div>
            </div>
        </Container>
    );
};
