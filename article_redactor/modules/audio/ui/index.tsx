import React from "react";
import s from "./style.module.scss";
import {IVideoModule} from "./types";
import {asset_prefix, DeleteWrapper} from "@box/shared";

export const VideoModule: React.FC<IVideoModule> = ({data, controller}) => {
    const onDelete = (id: string) => {
        controller.deleteVideo({
            id
        })
    }
    return (
        <DeleteWrapper onDelete={onDelete} meta={data.id}>
            <div className={s.body}>
                <video src={asset_prefix + data.src} controls={true}/>
            </div>
        </DeleteWrapper>
    );
};
