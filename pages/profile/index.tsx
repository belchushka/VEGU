import { useEffect } from "react";
import { ProfileForm } from "@box/features";
import { getMe } from "@box/entities";
import {useTypedDispatch} from "@box/shared";
import {NextPageWithLayout} from "@box/pages/_app";
import {MainLayout} from "@box/layouts";
import Head from "next/head";

const Index: NextPageWithLayout = () => {
    const dispatch = useTypedDispatch();
    const fetch = async () => {
        try {
            await dispatch(getMe());
        } catch (e) {}
    };
    useEffect(() => {
        fetch();
    }, []);
    return <>
        <Head>
            <title>Профиль</title>
        </Head>
        <ProfileForm />
    </>
};

Index.getLayout = (page)=>{
    return <MainLayout title={"Профиль"}>{page}</MainLayout>
}


Index.protected = [];

export default Index;
