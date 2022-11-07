import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Button, Input, useTypedDispatch} from "@box/shared";
import s from "./style.module.scss";
import {useLoading} from "@box/shared/hooks";
import {INewBlockForm} from "./types";
import {createCourseBlock} from "@box/entities";

type IFormValues = {
    name: string;
};

export const NewBlockForm: React.FC<INewBlockForm> = ({
                                                   courseId,
                                                   onSuccess = () => null
                                               }) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<IFormValues>();
    const dispatch = useTypedDispatch();
    const {loading, startLoading, stopLoading} = useLoading();
    const onSubmit: SubmitHandler<IFormValues> = async (data) => {
        startLoading();
        try {
            if (Object.keys(errors).length == 0) {
                await dispatch(createCourseBlock(courseId, data.name))
                onSuccess()
            }
        } catch (e) {
        }
        stopLoading();
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                error={errors["name"]?.message || ""}
                placeholder={"Название"}
                hookFormProps={register("name", {
                    required: {
                        value: true,
                        message: "Заполните все поля",
                    },
                })}
            />
            <Button
                loading={loading}
                className={s.button}
                fullWidth={true}
                size={"sm"}
                height={50}
            >
                Создать
            </Button>
        </form>
    );
};

