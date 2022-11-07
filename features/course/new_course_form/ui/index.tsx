import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  FormError,
  IOption,
  UserInput,
  UserSelect,
  UserTextArea,
} from "@box/shared";
import s from "./style.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { callAlert, getTypes, newCourse } from "@box/entities";
import { useTypedDispatch, useTypedSelector } from "@box/store/hooks";
import { useRouter } from "next/router";

type NewCourseFormValues = {
  name: string;
  duration: string;
  description: string;
};

export const NewCourseForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewCourseFormValues>();
  const [selectedType, setSelectedType] = useState<IOption | null>(null);
  const types = useTypedSelector((state) => state.course.types);
  const router = useRouter();
  const selectTypes: Array<IOption> = useMemo(() => {
    return types.map((el) => {
      return {
        label: el.name,
        disabled: false,
        value: el.id,
      };
    });
  }, [types]);
  const dispatch = useTypedDispatch();
  const onSubmit: SubmitHandler<NewCourseFormValues> = async (data) => {
    try {
      if (Object.keys(errors).length == 0 && selectedType) {
        const id = await dispatch(
          newCourse({
            name: data.name,
            hours: parseInt(data.duration),
            courseTypeId: selectedType.value,
            description: data.description,
          })
        );
        dispatch(callAlert("success", `Курc '${data.name}' успешно создан!`));
        router.push("/admin/course/" + id);
      }
    } catch (e: any) {
      dispatch(callAlert("error", e.response.message));
    }
  };
  useEffect(() => {
    dispatch(getTypes());
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.inputs}>
        {Object.keys(errors).length > 0 && (
          <FormError
            message={Object.values(errors)[0]?.message?.toString() || ""}
          />
        )}
        <UserSelect
          options={selectTypes}
          onSelect={(val) => setSelectedType(val)}
          value={selectedType}
          placeholder={"Тип курса"}
        />

        <UserInput
          placeholder={"Название модуля"}
          hookFormProps={register("name", {
            required: {
              value: true,
              message: "Заполните все поля",
            },
          })}
        />
        <UserInput
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
        <UserTextArea
          placeholder={"Описание модуля"}
          hookFormProps={register("description", {
            required: {
              value: true,
              message: "Заполните все поля",
            },
          })}
          rows={10}
          columns={30}
        />
      </div>
      <div className={s.btn}>
        <Button type={"gradient"} width={132} onClick={() => null}>
          <span>Создать</span>
        </Button>
      </div>
    </form>
  );
};
