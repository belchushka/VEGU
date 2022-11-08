import React, {useContext} from 'react';
import {IAnswerModule} from "./types";
import {DeleteWrapper, TextEditor} from "@box/shared";
import s from "./style.module.scss"
import {Checkbox} from "@mantine/core";
import {ModeContext} from "@box/article_redactor";


export const AnswerModule: React.FC<IAnswerModule> = ({
                                                          controller,
                                                          data
                                                      }) => {
    const {mode} = useContext(ModeContext)

    const onChange = (val: string) => {
        controller.updateAnswer({
            id: data.id,
            answer: val
        })
    }

    const onCheck = (val: boolean) => {
        controller.updateAnswer({
            id: data.id,
            isCorrect: val
        }, mode == "redactor")
    }

    const onDelete = (id: string) => {
        controller.deleteAnswer({
            id
        })
    }
    return (
        <div>
            <DeleteWrapper active={mode=="redactor"} onDelete={onDelete} meta={data.id}>
                <div className={s.body}>
                    <Checkbox
                        checked={data.isCorrect}
                        color={"green"}
                        size={"xl"}
                        onChange={(ev) => onCheck(ev.target.checked)}
                    />
                    <TextEditor
                        readonly={mode=="view"}
                        initialValue={data.answer}
                        debounced={true}
                        onChange={(val) => onChange(val)}
                    />
                </div>
            </DeleteWrapper>
        </div>
    );
};
