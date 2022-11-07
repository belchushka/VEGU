import React from 'react';
import {ITextModule} from "./types";
import {DeleteWrapper, TextEditor} from "@box/shared";

export const TextModule: React.FC<ITextModule> = ({
    controller,
    data
                                                  }) => {
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
                <TextEditor initialValue={data.text} debounced={true} onChange={onChange}/>
            </DeleteWrapper>
        </div>
    );
};
