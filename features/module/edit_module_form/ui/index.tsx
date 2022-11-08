import React from 'react';
import {IEditCourseForm} from "./types";
import {Button, Input, Space, useTypedDispatch} from "@box/shared";
import {SubmitHandler, useForm} from "react-hook-form";
import {appAlert, updateModule} from "@box/entities";

type FormFields = {
    name: string
}

export const EditModuleForm: React.FC<IEditCourseForm> = ({
    module,
    onSuccess= ()=>null

                                                          }) => {
    const {register, handleSubmit,formState:{errors}} = useForm<FormFields>({
        defaultValues:{
            name: module?.name || ""
        }
    })
    const dispatch = useTypedDispatch()
    const onSubmit: SubmitHandler<FormFields> = async (data)=>{
        try{
            if (Object.values(errors).length==0){
                await dispatch(updateModule({
                    id: module.id,
                    ...data
                }))
                onSuccess()
            }
            appAlert("success","Изменения сохранены")

        }catch (e) {
            appAlert("error","Ошибка")
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input hookFormProps={register("name", {required:true})} placeholder={"Название модуля"}/>
                <Space height={15}/>
                <Button width={132} size={"xsm"}>
                    Сохранить
                </Button>
            </form>
        </div>
    );
};
