import React, {useState} from "react";
import {
    Button, Input, useFetch, useLoading,
    useTypedDispatch, useTypedSelector
} from "@box/shared";
import s from "./style.module.scss";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {appAlert, createCourse, getCourseTypes} from "@box/entities";
import {Select} from "@mantine/core";
import {INewCourseForm} from "@box/features/course/new_course_form/ui/types";

type NewCourseFormValues = {
    name: string;
    duration: string;
    description: string;
};

export const NewCourseForm: React.FC<INewCourseForm> = ({
                                                            onSuccess = () => null
                                                        }) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<NewCourseFormValues>();
    const dispatch = useTypedDispatch();
    const {loading: loadingData} = useFetch({action: () => getCourseTypes()})
    const types = useTypedSelector((state) => state.course.types);
    const [selectedType, setSelectedType] = useState<any>(null);
    const {loading, stopLoading, startLoading} = useLoading()
    const onSubmit: SubmitHandler<NewCourseFormValues> = async (data) => {
        startLoading()
        try {
            if (Object.keys(errors).length == 0 && selectedType) {
                const id = await dispatch(
                    createCourse({
                        name: data.name,
                        hours: parseInt(data.duration),
                        courseTypeId: selectedType,
                        description: data.description,
                    })
                );
                appAlert("success","Курс создан")
                onSuccess()
            }
        } catch (e: any) {
            appAlert("error","Ошибка создания")

        }
        stopLoading()
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={s.inputs}>
                <Select onChange={setSelectedType} color={"green"} placeholder={"Тип курса"} data={types.map(type => {
                    return {
                        label: type.name,
                        value: type.id
                    }
                })}/>
                <Input
                    error={errors["name"]?.message || ""}
                    placeholder={"Название модуля"}
                    hookFormProps={register("name", {
                        required: {
                            value: true,
                            message: "Заполните все поля",
                        },
                    })}
                />
                <Input
                    error={errors["duration"]?.message || ""}

                    placeholder={"Продолжительность модуля(часов)"}
                    hookFormProps={register("duration", {
                        required: {
                            value: true,
                            message: "Заполните все поля",
                        },
                        min: {
                            value: 1,
                            message: "Продолжительность не может быть меньше 1 часа",
                        },
                    })}
                    type={"number"}
                />
                <Input
                    error={errors["description"]?.message || ""}

                    placeholder={"Описание модуля"}
                    hookFormProps={register("description", {
                        required: {
                            value: true,
                            message: "Заполните все поля",
                        },
                    })}
                />
            </div>
            <div className={s.btn}>
                <Button loading={loadingData || loading} size={"sm"} height={50} fullWidth={true} onClick={() => null}>
                    Создать
                </Button>
            </div>
        </form>
    );
};
