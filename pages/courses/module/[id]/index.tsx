import React, {useState} from 'react';
import {MainLayout} from "@box/layouts";
import {NextPageWithLayout} from "@box/pages/_app";
import {useRouter} from "next/router";
import {LoadingWrapper, Separator, useFetch, useTypedSelector} from "@box/shared";
import {getModuleById, IModule} from "@box/entities";
import {EditModuleForm} from "@box/features";
import {ArticleRedactor} from "@box/article_redactor";
import {Switch} from "@mantine/core";


const Index: NextPageWithLayout = () => {
    const router = useRouter()
    const {id} = router.query
    const {loading} = useFetch({action:()=>getModuleById(id)})
    const module = useTypedSelector(state => state.block_module.module)
    const [mode, setMode] = useState<"redactor" | "view">("redactor")
    return (
        <MainLayout title={"Модуль "+ (loading ? "" : module?.name)} headerButtons={[
            <Switch color={"green"} size={"lg"} checked={mode == "view"} onChange={(event) => setMode(event.currentTarget.checked ? "view" : "redactor")}/>
        ]}>
            <LoadingWrapper loading={loading}>
                <EditModuleForm module={module as IModule}/>
                <Separator offset={30}/>
            </LoadingWrapper>
            <ArticleRedactor meta={{moduleId: id}} apiUrl={"/module-content/"} mode={mode}/>
        </MainLayout>
    );
};


export default Index;
