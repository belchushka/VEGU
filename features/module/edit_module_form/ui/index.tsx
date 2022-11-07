import React from 'react';
import {IEditCourseForm} from "./types";
import {Button, Input, Space, useTypedDispatch} from "@box/shared";
import {SubmitHandler, useForm} from "react-hook-form";
import { updateCourseBlock} from "@box/entities";

type FormFields = {
    name: string
}

export const EditBlockForm: React.FC<IEditCourseForm> = ({
    block,
    onSuccess= ()=>null

                                                          }) => {
    const {register, handleSubmit,formState:{errors}} = useForm<FormFields>({
        defaultValues:{
            name: block?.name || ""
        }
    })
    const dispatch = useTypedDispatch()
    const onSubmit: SubmitHandler<FormFields> = async (data)=>{
        try{
            if (Object.values(errors).length==0){
                await dispatch(updateCourseBlock({
                    id: block.id,
                    ...data
                }))
                onSuccess()
            }
        }catch (e) {
            console.log(e);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input hookFormProps={register("name", {required:true})} placeholder={"Название блока"}/>
                <Space height={15}/>
                <Button width={132} size={"xsm"}>
                    Сохранить
                </Button>
            </form>
        </div>
    );
};
