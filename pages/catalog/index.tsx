import React, {useMemo, useState} from 'react';
import {Header} from "@box/widgets";
import {
    Button,
    Container,
    LoadingWrapper,
    Modal,
    Space,
    useBoolean,
    useFetch,
    useTypedSelector,
    Separator, declOfNum
} from "@box/shared";
import {CourseCard, getCourses, ICourse} from "@box/entities";
import {CatalogFilters, CatalogSearch, CoursesPagination, RequestCourseForm} from "@box/features";
import s from "./style.module.scss"
import classNames from "classnames";
import {Loader} from "@mantine/core";
import Head from "next/head";

const Index = () => {
    const {courses, currentPage, filter, total} = useTypedSelector(state => state.course)
    const {loading} = useFetch({action: () => getCourses()}, [currentPage, filter])
    const [selectedCourseId, setSelectedCourseId] = useState<string>("")
    const selectedCourse: ICourse | undefined = useMemo(() => {
        return courses.find(el => el.id == selectedCourseId)
    }, [selectedCourseId])
    const {value, toggle} = useBoolean(false)
    const openModal = (courseId: string) => {
        setSelectedCourseId(courseId)
        toggle()
    }
    return (
        <>
            <Head>
                <title>Каталог курсов</title>
            </Head>
            <Container>
                <Header/>
            </Container>
            <Modal title={"Заявка"} width={650} close={toggle} visible={value}>
                {selectedCourse ?
                    <>
                        <CourseCard data={selectedCourse}/>
                        <Separator offset={30}/>
                        <RequestCourseForm courseId={selectedCourseId}/>
                    </>
                    : null
                }
            </Modal>
            <div className={classNames(s.banner, "gradient_background")}>
                {loading ? (
                    <Loader color={"white"}/>
                ) : (
                    <h2>
                        {total} {declOfNum(total, ["курс", "курса", "курсов"])}{" "}
                        {declOfNum(total, ["доступен", "доступно", "доступно"])}{" "}
                    </h2>
                )}
            </div>
            <Container>
                <CatalogSearch className={s.search}/>
                <LoadingWrapper loading={loading}>
                    <div className={s.body}>
                        <div className={s.body_courses}>
                            {courses.map(course => {
                                return <>
                                    <Space height={15}/>
                                    <CourseCard data={course} buttons={[
                                        <Button size={"xsm"} onClick={() => openModal(course.id)}
                                                width={132}>Записаться</Button>,
                                        <Button size={"xsm"} preset={"light"} width={132}>Подробнее</Button>,
                                    ]}/>
                                </>
                            })}
                            <CoursesPagination/>
                        </div>
                        <CatalogFilters className={s.filters}/>
                    </div>
                </LoadingWrapper>
            </Container>
        </>

    );
};

export default Index;
