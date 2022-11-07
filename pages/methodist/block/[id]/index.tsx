import React from 'react';
import {MainLayout} from "@box/layouts";
import {NextPageWithLayout} from "@box/pages/_app";
import {useRouter} from "next/router";
import {Button, ButtonCard, Space, useFetch, useTypedSelector} from "@box/shared";
import {getCourseBlocks, getModules} from "@box/entities";
import Link from "next/link";

const Index: NextPageWithLayout = () => {
    const router = useRouter()
    const {id} = router.query
    const {loading} = useFetch({action: ()=> getModules(id)})
    const modules = useTypedSelector(state => state.block_module.modules)
    return (
        <div>
            {modules.map(module=>{
                return <>
                    <Space height={15}/>
                    <ButtonCard title={module.name} subtitle={""} buttons={[
                        <Link href={"/courses/module/"+module.id}>
                            <Button width={132} preset={"dark"} size={"xsm"}>
                                Пройти
                            </Button>
                        </Link>
                    ]}/>
                </>
            })}
        </div>
    );
};

Index.getLayout = (page)=>{
    return <MainLayout title={"Модули блока"}>
        {page}
    </MainLayout>
}

export default Index;
