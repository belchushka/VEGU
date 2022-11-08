import React from "react";
import s from "./style.module.scss";
import {asset_prefix, Button, Input, useAuth, useTypedDispatch,} from "@box/shared";
import {SubmitHandler, useForm} from "react-hook-form";
import {updateAvatar, updateInfo} from "../model";
import {FileButton} from "@mantine/core";
import {UserAvatar} from "@box/entities/user";
import {appAlert} from "@box/entities";

type UpdateFormValues = {
    name: string;
    surname: string;
    patronymic: string;
};

export const ProfileForm = () => {
    const {user} = useAuth()
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<UpdateFormValues>();
    const dispatch = useTypedDispatch();
    const onSubmit: SubmitHandler<UpdateFormValues> = async (data) => {
        try {
            await dispatch(updateInfo({
                name: data.name,
                surname: data.surname,
                patronymic: data.patronymic,
            }))
            appAlert("success","Изменения сохранены")

        } catch (e) {
            appAlert("error","Ошибка")

        }
    };
    const onAvatar = async (file: File | null) => {
        if (file) {
            try {
                await dispatch(updateAvatar(file));
                appAlert("success","Изменения сохранены")

            } catch (e) {
                appAlert("error","Ошибка")

            }
        }
    };
    return (
        <div className={s.body}>
            <FileButton onChange={onAvatar}>
                {(props) => {
                    return (
                        <UserAvatar
                            src={user?.avatar?.path ? asset_prefix + user.avatar.path : null}
                            size={"xl"}
                            {...props}
                        />
                    );
                }}
            </FileButton>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    error={errors["name"]?.message || ""}
                    placeholder={"Имя"}
                    hookFormProps={register("name", {
                        value: user?.name || "",
                        required: {
                            value: true,
                            message: "Поле должно быть заполнено",
                        },
                    })}
                />
                <Input
                    error={errors["surname"]?.message || ""}
                    placeholder={"Фамилия"}
                    hookFormProps={register("surname", {
                        value: user?.surname || "",
                        required: {
                            value: true,
                            message: "Поле должно быть заполнено",
                        },
                    })}
                />
                <Input
                    error={errors["patronymic"]?.message || ""}
                    placeholder={"Отчество"}
                    hookFormProps={register("patronymic", {
                        value: user?.patronymic || "",
                        required: {
                            value: true,
                            message: "Поле должно быть заполнено",
                        },
                    })}
                />
                <Button size={"sm"} width={200}>
                    Сохранить
                </Button>
            </form>
        </div>
    );
};
