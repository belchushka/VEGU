import React, { useState} from 'react';
import {NextPageWithLayout} from "@box/pages/_app";
import {MainLayout} from "@box/layouts";
import {Button, LoadingWrapper, Modal, Space, useBoolean, useFetch, useTypedSelector} from "@box/shared";
import {CourseCard, getAdminCourses} from "@box/entities";
import Link from "next/link";
import s from "./style.module.scss"
import {NewCourseForm} from "@box/features";

const Index: NextPageWithLayout = () => {
    const {loading} = useFetch({action: ()=> getAdminCourses()})
    const courses = useTypedSelector(state=>state.course.courses)
    return (
        <div className={s.body}>
            <LoadingWrapper loading={loading}>
                {courses.map(course=>{
                    return <>
                        <CourseCard data={course} buttons={[
                            <Link href={"/methodist/course/"+course.id}>
                                <Button size={"xsm"}>
                                    Редактировать
                                </Button>
                            </Link>
                        ]}/>
                        <Space height={15}/>

                    </>
                })}
            </LoadingWrapper>
        </div>
    );
};

Index.getLayout = (page)=>{
    const {value,setValue, toggle} = useBoolean(false)
    return <MainLayout title={"Созданные курсы"} headerButtons={[<Button size={"xsm"} width={148} onClick={toggle}>Создать курс</Button>]}>
        <Modal title={"Новый курс"} close={toggle} visible={value}>
            <NewCourseForm onSuccess={()=>setValue(false)}/>
        </Modal>
        {page}
    </MainLayout>
}

export default Index;
