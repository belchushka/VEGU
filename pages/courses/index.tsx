import React from 'react';
import {NextPageWithLayout} from "@box/pages/_app";
import {MainLayout} from "@box/layouts";
import {Button, Space, useFetch, useTypedSelector} from "@box/shared";
import {CourseCard, getAdminCourses} from "@box/entities";
import Link from "next/link";
import s from "./style.module.scss"

const Index: NextPageWithLayout = () => {
    const {loading} = useFetch({action: ()=> getAdminCourses()})
    const courses = useTypedSelector(state=>state.course.courses)
    return (
        <div className={s.body}>
            {courses.map(course=>{
                return <>
                    <Space height={15}/>
                    <CourseCard data={course} buttons={[
                        <Link href={"/methodist/course/"+course.id}>
                            <Button size={"xsm"}>
                                Редактировать
                            </Button>
                        </Link>
                    ]}/>
                </>
            })}
        </div>
    );
};

Index.getLayout = (page)=>{
    return <MainLayout title={"Созданные курсы"}>
        {page}
    </MainLayout>
}

export default Index;
