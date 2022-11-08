import React from 'react';
import {MainLayout} from "@box/layouts";
import {NextPageWithLayout} from "@box/pages/_app";
import {useRouter} from "next/router";
import {Button, ButtonCard, LoadingWrapper, Space, useFetch, useTypedSelector} from "@box/shared";
import {getCourseBlocks} from "@box/entities";
import Link from "next/link";

const Index: NextPageWithLayout = () => {
    const router = useRouter()
    const {id} = router.query
    const {loading} = useFetch({action: ()=> getCourseBlocks(id)})
    const blocks = useTypedSelector(state => state.course_block.blocks)
    return (
        <div>
            <LoadingWrapper loading={loading}>
            {blocks.map(block=>{
                return <>
                    <ButtonCard title={block.name} subtitle={""} buttons={[
                        <Link href={"/courses/block/"+block.id}>
                            <Button width={132} preset={"dark"} size={"xsm"}>
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
    return <MainLayout title={"Блоки курса"}>
        {page}
    </MainLayout>
}

export default Index;
