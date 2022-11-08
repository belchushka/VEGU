import React, {useContext} from "react";
import s from "./style.module.scss";
import {IAudioModule} from "./types";
import {asset_prefix, DeleteWrapper} from "@box/shared";
import {ModeContext} from "@box/article_redactor";

export const AudioModule: React.FC<IAudioModule> = ({data, controller}) => {
    const {mode} = useContext(ModeContext)

    const onDelete = (id: string) => {
        controller.deleteAudio({
            id
        })
    }
    return (
        <DeleteWrapper active={mode=="redactor"} inline={true} onDelete={onDelete} meta={data.id}>
            <div className={s.body}>
                <audio controls={true} src={asset_prefix + data.src}></audio>
            </div>
        </DeleteWrapper>
    );
};
