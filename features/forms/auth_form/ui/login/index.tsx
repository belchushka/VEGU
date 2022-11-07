import React, {useCallback} from "react";
import s from "../style.module.scss";
import {Button, useTypedDispatch, Input} from "@box/shared";
import {SubmitHandler, useForm} from "react-hook-form";
import {login} from "../../model";
import {useRouter} from "next/router";
import {useLoading} from "@box/shared/hooks";
import Link from "next/link";

type LoginFormValues = {
    email: string;
    password: string;
};

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginFormValues>();
    const dispatch = useTypedDispatch();
    const router = useRouter();
    const {loading, startLoading, stopLoading} = useLoading();
    const onSubmit: SubmitHandler<LoginFormValues> = useCallback(
      async (data) => {
        startLoading();
        try {
          if (Object.keys(errors).length == 0) {
            await dispatch(login(data.email, data.password));
            // dispatch(callAlert("success", "Вы успешно авторизовались!"));
            router.replace("/");
          }
        } catch (e: any) {
            console.log(e);
        }
        stopLoading();
      },
      [errors]
    );
    return (
        <div className={s.body}>
            <h1 className={s.body_header}>Вход</h1>
            <p className={s.body_subtitle}>Войдите в свой профиль</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={s.input_block}>
                    <Input
                        error={errors["email"]?.message || ""}
                        className={s.input}
                        placeholder={"Электронная почта"}
                        hookFormProps={register("email", {
                            required: {
                                value: true,
                                message: "Поле должно быть заполнено",
                            },
                            pattern: {
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                                message: "Поле email должно быть валидным",
                            },
                        })}
                    />
                    <Input
                        error={errors["password"]?.message || ""}

                        className={s.input}
                        placeholder={"Пароль"}
                        type={"password"}
                        hookFormProps={register("password", {
                            required: {
                                value: true,
                                message: "Поле должно быть заполнено",
                            },
                        })}
                    />
                </div>
                <Button
                    className={s.submit_button}
                    fullWidth={true}
                    height={50}
                    loading={loading}
                >
                    Войти
                </Button>
            </form>
            <div className={s.bottom_buttons}>
                <Link href={"password_reset"}>
                    <p className={s.body_bottom_link}>Не помню пароль</p>
                </Link>
            </div>
        </div>
    );
};
