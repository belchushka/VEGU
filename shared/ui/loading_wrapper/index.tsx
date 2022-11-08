import React from 'react';
import {ILoadingWrapper} from "./types";
import {AnimateWrapper} from "@box/shared";
import {Loader, LoadingOverlay} from "@mantine/core";
import s from "./style.module.scss"

export const LoadingWrapper: React.FC<ILoadingWrapper> = ({
    children,
    loading
                                                          }) => {
    return (
        <>
            {loading ?  <div className={s.loader}><Loader style={{margin: "auto"}} color="green"    /></div> : null}
            <AnimateWrapper visible={!loading}>
                {children}
            </AnimateWrapper>
        </>
    );
};
