import React from 'react';
import {MainLayout} from "@box/layouts";
import {NextPageWithLayout} from "@box/pages/_app";
import {useRouter} from "next/router";
import {
    Button,
    ButtonCard, DeleteWrapper, DraggableWrapper,
    LoadingWrapper, Modal,
    RichButton, Separator,
    Space, switchItems, updatePositionApi,
    useBoolean,
    useFetch, useTypedDispatch,
    useTypedSelector
} from "@box/shared";
import {deleteCourseBlock, getCourseBlocks, ICourse, setCourseBlocks} from "@box/entities";
import Link from "next/link";
import {EditCourseForm, NewBlockForm} from "@box/features";
import {DropResult} from "react-beautiful-dnd";

const Index: NextPageWithLayout = () => {
    const router = useRouter()
    const {id} = router.query
    const dispatch = useTypedDispatch()
    const {loading} = useFetch({action: () => getCourseBlocks(id)})
    const blocks = useTypedSelector(state => state.course_block.blocks)
    const course = useTypedSelector(state => state.course.course)
    const {value, toggle} = useBoolean(false)
    const deleteBlock = (id: string)=>dispatch(deleteCourseBlock(id))
    const onDragEnd = (result: DropResult)=>{
        const res = switchItems(
            blocks,
            result.source.index,
            result.destination?.index
        );
        if (res) {
            dispatch(setCourseBlocks(res));
            updatePositionApi(
                "/course-block/update",
                result.draggableId,
                result.destination?.index
            );
        }
    }
    return (
        <MainLayout title={"Блоки курса"} headerButtons={[<Button size={"xsm"} width={148} onClick={toggle}>Создать блок</Button>]}>
            <Modal title={"Новый блок"} close={toggle} visible={value}>
                <NewBlockForm onSuccess={toggle} courseId={id as string}/>
            </Modal>
            <div>
                <LoadingWrapper loading={loading}>
                    <EditCourseForm course={course as ICourse}/>
                    <Separator offset={30}/>
                    <DraggableWrapper onDragEnd={onDragEnd}>
                        {blocks.map(block => {
                            return {
                                id: block.id,
                                component: <><DeleteWrapper onDelete={deleteBlock} meta={block.id}>
                                    <ButtonCard title={block.name} subtitle={""} buttons={[
                                        <Link href={"/methodist/block/" + block.id}>
                                            <Button width={132} preset={"dark"} size={"xsm"}>
                                                Редатировать
                                            </Button>
                                        </Link>
                                    ]}/>
                                </DeleteWrapper>
                                    <Space height={15}/></>
                            }
                        })}
                    </DraggableWrapper>
                </LoadingWrapper>
            </div>
        </MainLayout>
    );
};


export default Index;
