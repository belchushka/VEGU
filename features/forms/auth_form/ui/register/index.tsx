import React, {useCallback} from "react";
import s from "../style.module.scss";
import {Button, Input, useTypedDispatch} from "@box/shared";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {useLoading} from "@box/shared/hooks";
import {register as registerFunc} from "../../model";

type RegisterFormValues = {
    email: string;
    password: string;
    password_repeat: string;
    name: string;
    surname: string;
};

export const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<RegisterFormValues>();
    const password_value = watch("password");
    const router = useRouter();
    const dispatch = useTypedDispatch();
    const {stopLoading, startLoading, loading} = useLoading();
    const onSubmit: SubmitHandler<RegisterFormValues> = useCallback(
        async (data: any) => {
            startLoading();
            try {
                if (Object.keys(errors).length == 0) {
                    await dispatch(
                        registerFunc(data.email, data.name, data.surname, data.password)
                    );
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
            <h1 className={s.body_header}>Регистрация</h1>
            <p className={s.body_subtitle}>Создайте свой профиль</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={s.input_block}>
                    <h3>Персональные данные</h3>
                    <Input
                        error={errors['email']?.message || ""}
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
                        error={errors['name']?.message || ""}
                        className={s.input}
                        placeholder={"Имя"}
                        hookFormProps={register("name", {
                            required: {
                                value: true,
                                message: "Поле должно быть заполнено",
                            },
                        })}
                    />
                    <Input
                        error={errors['surname']?.message || ""}
                        className={s.input}
                        placeholder={"Фамилия"}
                        hookFormProps={register("surname", {
                            required: {
                                value: true,
                                message: "Поле должно быть заполнено",
                            },
                        })}
                    />
                    <div className={s.input_block}>
                        <h3>Безопасность</h3>
                        <Input
                            error={errors['password']?.message || ""}
                            className={s.input}
                            placeholder={"Пароль"}
                            type={"password"}
                            hookFormProps={register("password", {
                                required: {
                                    value: true,
                                    message: "Поле должно быть заполнено",
                                },
                                minLength: {
                                    value: 8,
                                    message: "Минимальная длина пароля - 8 символов",
                                },
                            })}
                        />
                        <Input
                            error={errors['password_repeat']?.message || ""}
                            className={s.input}
                            type={"password"}
                            placeholder={"Повторите пароль"}
                            hookFormProps={register("password_repeat", {
                                required: {
                                    value: true,
                                    message: "Поле должно быть заполнено",
                                },
                                validate: (value) =>
                                    value == password_value || "Пароли должны совпадать",
                            })}
                        />
                    </div>
                </div>
                <Button
                    loading={loading}
                    className={s.submit_button}
                    fullWidth={true}
                    height={50}
                >
                    Зарегистрироваться
                </Button>
            </form>
            <div className={s.bottom_buttons}>
                <p className={s.body_bottom_link}>
                    Нажимая кнопку, я соглашаюсь на обработку{" "}
                    <span>персональных данных</span>
                </p>
            </div>
        </div>
    );
};
