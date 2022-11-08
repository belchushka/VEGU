import React, {useContext} from 'react';
import {ITextModule} from "./types";
import {DeleteWrapper, TextEditor} from "@box/shared";
import {ModeContext} from "@box/article_redactor";

export const TextModule: React.FC<ITextModule> = ({
    controller,
    data
                                                  }) => {
    const {mode} = useContext(ModeContext)

    const onChange = (val:string)=>{
        controller.updateText({
            id: data.id,
            text: val
        })
    }
    const onDelete = (id: string)=>{
        controller.deleteText({
            id
        })
    }
    return (
        <div>
            <DeleteWrapper onDelete={onDelete} meta={data.id}>
                <TextEditor readonly={mode == "view"} initialValue={data.text} debounced={true} onChange={onChange}/>
            </DeleteWrapper>
        </div>
    );
};
