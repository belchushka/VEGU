import React from "react";
import { Input, Button, useTypedDispatch } from "@box/shared";
import { SubmitHandler, useForm } from "react-hook-form";
import s from "./style.module.scss";
import { createModule } from "@box/entities";
import { useLoading } from "@box/shared/hooks";
import {INewModuleForm} from "./types";


type IFormValues = {
  name: string;
};

export const NewModuleForm: React.FC<INewModuleForm> = ({
  blockId,
  onSuccess= ()=>null
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();
  const dispatch = useTypedDispatch();
  const { loading, stopLoading, startLoading } = useLoading();
  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    startLoading();
    try {
      if (Object.keys(errors).length == 0) {
        await dispatch(createModule(blockId, data.name));
        onSuccess()
      }
    } catch (e) {}
    stopLoading();
  };
  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder={"Название"}
          error={errors['name']?.message || ""}
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
          size={"sm"}
          fullWidth={true}
          height={50}
        >
          Создать
        </Button>
      </form>
  );
};

