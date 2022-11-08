import React, {useContext} from "react";
import s from "./style.module.scss";
import {IImageModule} from "./types";
import {asset_prefix, DeleteWrapper} from "@box/shared";
import {ModeContext} from "@box/article_redactor";

export const ImageModule: React.FC<IImageModule> = ({controller, data}) => {
    const {mode} = useContext(ModeContext)

    const onDelete = (id: string) => {
        controller.deleteImage({
            id
        })
    }
    return (
        <DeleteWrapper active={mode=="redactor"} inline={true} onDelete={onDelete} meta={data.id}>
            <div className={s.body}>
                <img src={asset_prefix+data.src} alt=""/>
            </div>
        </DeleteWrapper>
    );
};
