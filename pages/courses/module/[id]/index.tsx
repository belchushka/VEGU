import React from 'react';
import {MainLayout} from "@box/layouts";
import {NextPageWithLayout} from "@box/pages/_app";
import {useRouter} from "next/router";
import { useFetch, useTypedSelector} from "@box/shared";
import {getModuleById, IModule} from "@box/entities";
import {ArticleRedactor} from "@box/article_redactor";

const Index: NextPageWithLayout = () => {
    const router = useRouter()
    const {id} = router.query
    const {loading} = useFetch({action:()=>getModuleById(id)})
    const module = useTypedSelector(state => state.block_module.module)
    return (
        <MainLayout title={"Модуль "+ (loading ? "" : module?.name)}>
            <ArticleRedactor meta={{moduleId: id}} apiUrl={"/module-content/"} mode={"view"}/>
        </MainLayout>
    );
};


export default Index;
