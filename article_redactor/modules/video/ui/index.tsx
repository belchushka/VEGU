import React, {useContext} from "react";
import s from "./style.module.scss";
import {IVideoModule} from "./types";
import {asset_prefix, DeleteWrapper} from "@box/shared";
import {ModeContext} from "@box/article_redactor";

export const VideoModule: React.FC<IVideoModule> = ({data, controller}) => {
    const {mode} = useContext(ModeContext)
    const onDelete = (id: string) => {
        controller.deleteVideo({
            id
        })
    }
    return (
        <DeleteWrapper active={mode=="redactor"} onDelete={onDelete} meta={data.id}>
            <div className={s.body}>
                <video src={asset_prefix + data.src} controls={true}/>
            </div>
        </DeleteWrapper>
    );
};
