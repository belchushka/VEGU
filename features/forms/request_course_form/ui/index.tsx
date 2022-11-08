import React, {FormEventHandler} from 'react';
import {Button, Space, useLoading, useTypedDispatch} from "@box/shared";
import {requestCourse} from "../model";
import {IRequestCourseForm} from "./types";
import classNames from "classnames";

export const RequestCourseForm: React.FC<IRequestCourseForm> = ({
                                                                    courseId,
                                                                    onSuccess= ()=>null,
                                                                    className
                                                                }) => {
    const {loading, startLoading, stopLoading} = useLoading();
    const dispatch = useTypedDispatch();
    const onSubmit: FormEventHandler = async (event) => {
        event.preventDefault();
        startLoading();
        try {
            await dispatch(requestCourse(courseId));
            onSuccess()
        } catch (e) {
            console.log(e);
        }
        stopLoading();
    };
    return (
        <form onSubmit={onSubmit} className={classNames(className)}>
            <Space height={20}/>
            <Button
                fullWidth={true}
                height={55}
                loading={loading}
            >
                Отправить
            </Button>
        </form>
    );
};

