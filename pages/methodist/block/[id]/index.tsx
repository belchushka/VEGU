import React from 'react';
import {MainLayout} from "@box/layouts";
import {NextPageWithLayout} from "@box/pages/_app";
import {useRouter} from "next/router";
import {
    Button,
    ButtonCard, DeleteWrapper, DraggableWrapper,
    LoadingWrapper, Modal, Separator,
    Space, switchItems, updatePositionApi,
    useBoolean,
    useFetch, useTypedDispatch,
    useTypedSelector
} from "@box/shared";
import {deleteModule as deleteModuleAction, getModules, IBlock, setCourseBlocks, setModules} from "@box/entities";
import Link from "next/link";
import {EditBlockForm, NewModuleForm} from "@box/features";
import {DropResult} from "react-beautiful-dnd";

const Index: NextPageWithLayout = () => {
    const router = useRouter()
    const {id} = router.query
    const dispatch = useTypedDispatch()
    const {loading} = useFetch({action: () => getModules(id)})
    const modules = useTypedSelector(state => state.block_module.modules)
    const block = useTypedSelector(state => state.course_block.block)
    const {value, toggle} = useBoolean(false)
    const deleteModule = (id: string)=>dispatch(deleteModuleAction(id))

    const onDragEnd = (result: DropResult)=>{
        const res = switchItems(
            modules,
            result.source.index,
            result.destination?.index
        );
        if (res) {
            dispatch(setModules(res));
            updatePositionApi(
                "/block-module/update",
                result.draggableId,
                result.destination?.index
            );
        }
    }
    return (
        <MainLayout title={"Модули блока"} headerButtons={[<Button size={"xsm"} width={148} onClick={toggle}>Создать модуль</Button>]}>
            <Modal title={"Новый модуль"} close={toggle} visible={value}>
                <NewModuleForm onSuccess={toggle} blockId={id as string}/>
            </Modal>
            <div>
                <LoadingWrapper loading={loading}>
                    <EditBlockForm block={block as IBlock}/>
                    <Separator offset={30}/>
                    <DraggableWrapper onDragEnd={onDragEnd}>
                        {modules.map(module => {
                            return {
                                id: module.id,
                                component: <>
                                    <DeleteWrapper onDelete={deleteModule} meta={module.id}>
                                        <ButtonCard title={module.name} subtitle={""} buttons={[
                                            <Link href={"/methodist/module/" + module.id}>
                                                <Button width={132} preset={"dark"} size={"xsm"}>
                                                    Редактировать
                                                </Button>
                                            </Link>
                                        ]}/>
                                    </DeleteWrapper>
                                    <Space height={15}/>

                                </>
                            }
                        })}
                    </DraggableWrapper>
                </LoadingWrapper>
            </div>
        </MainLayout>
    );
};


export default Index;
