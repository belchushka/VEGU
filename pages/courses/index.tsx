import React from 'react';
import {NextPageWithLayout} from "@box/pages/_app";
import {MainLayout} from "@box/layouts";
import {Button, LoadingWrapper, Space, useFetch, useTypedSelector} from "@box/shared";
import {CourseCard, getMyCourses} from "@box/entities";
import Link from "next/link";
import s from "./style.module.scss"

const Index: NextPageWithLayout = () => {
    const {loading} = useFetch({action: ()=> getMyCourses()})
    const courses = useTypedSelector(state=>state.course.courses)
    return (
        <div className={s.body}>
            <LoadingWrapper loading={loading}>
                {courses.map(course=>{
                    return <>
                        <CourseCard data={course} buttons={[
                            <Link href={"/courses/course/"+course.id}>
                                <Button width={132} size={"xsm"}>
                                    Пройти
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
    return <MainLayout title={"Мои курсы"}>
        {page}
    </MainLayout>
}

export default Index;
