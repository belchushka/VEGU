import { useEffect } from "react";
import { ProfileForm } from "@box/features";
import { getMe } from "@box/entities";
import {useTypedDispatch} from "@box/shared";
import {NextPageWithLayout} from "@box/pages/_app";

const Index = () => {
    const dispatch = useTypedDispatch();
    const fetch = async () => {
        try {
            await dispatch(getMe());
        } catch (e) {}
    };
    useEffect(() => {
        fetch();
    }, []);
    return <ProfileForm/>;
};



export default Index;
