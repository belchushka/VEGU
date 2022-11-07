import React, {useCallback} from "react";
import s from "../style.module.scss";
import {Button, Input, useTypedDispatch} from "@box/shared";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {useLoading} from "@box/shared/hooks";

type LoginFormValues = {
    email: string;
};

export const PasswordResetForm = () => {
    const {
        register: registerLogin,
        handleSubmit: handleSubmitLogin,
        formState: {errors},
    } = useForm<LoginFormValues>();
    const dispatch = useTypedDispatch();
    const router = useRouter();
    const {loading, startLoading, stopLoading} = useLoading();
    const onLoginSubmit: SubmitHandler<LoginFormValues> = useCallback(
        async (data) => {
            startLoading();
            try {
                if (Object.keys(errors).length == 0) {
                    // await dispatch(login(data.email, data.password));
                    router.replace("/login");
                }
            } catch (e: any) {
                if (typeof e == "string") {
                    alert(e);
                    return;
                }
            }
            stopLoading();
        },
        [errors]
    );
    return (
        <div className={s.body}>
            <h2 className={s.body_header}>Восстановление пароля</h2>
            <p className={s.body_subtitle}>Вы получите письмо с ссылкой на восстановление</p>
            <form onSubmit={handleSubmitLogin(onLoginSubmit)}>
                <div className={s.input_block}>
                    <Input
                        error={errors['email']?.message || ""}
                        className={s.input}
                        placeholder={"Электронная почта"}
                        hookFormProps={registerLogin("email", {
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
                </div>
                <Button
                    className={s.submit_button}
                    fullWidth={true}
                    height={50}
                    loading={loading}
                >
                    Восстановить пароль
                </Button>
            </form>
        </div>
    );
};
