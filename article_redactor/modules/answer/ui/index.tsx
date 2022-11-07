import React from 'react';
import {IQuestionModule} from "./types";
import {DeleteWrapper, TextEditor} from "@box/shared";
import s from "./style.module.scss"
import classNames from "classnames";

export const QuestionModule: React.FC<IQuestionModule> = ({
                                                              controller,
                                                              data
                                                          }) => {
    const onChange = (val: string) => {
        controller.updateQuestion({
            id: data.id,
            question: val
        })
    }
    const onDelete = (id: string) => {
        controller.deleteQuestion({
            id
        })
    }
    return (
        <div>
            <DeleteWrapper onDelete={onDelete} meta={data.id}>
                <div
                    className={classNames(
                        s.body,
                    )}
                >
                    <TextEditor
                        initialValue={data.question}
                        onChange={onChange}
                    />
                    <div className={s.answers}>

                    </div>
                    <div className={s.buttons}>

                    </div>
                </div>
            </DeleteWrapper>
        </div>
    );
};
