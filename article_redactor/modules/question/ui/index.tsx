import React, {useContext, useEffect, useState} from 'react';
import {IQuestionModule} from "./types";
import {$autHost, ButtonGroup, DeleteWrapper, Space, TextEditor, useLoading} from "@box/shared";
import s from "./style.module.scss"
import classNames from "classnames";
import {
    AnswerModule,
    IBlock, ModeContext,
    useQuestion,
} from "@box/article_redactor";
import {Loader, LoadingOverlay, Progress} from "@mantine/core";

export const QuestionModule: React.FC<IQuestionModule> = ({
                                                              controller,
                                                              data
                                                          }) => {

    const {mode} = useContext(ModeContext)

    const {loading, stopLoading, startLoading} = useLoading(true)
    const [isPassed, setIsPassed] = useState(false)
    const [error, setError] = useState(false)

    const {state, answerController, setState} = useQuestion({
        apiUrl: "/question-answer/", meta: {
            questionId: data.id
        }
    }, data.answers.reduce((acc: {}, el: IBlock) => {
        return {
            ...acc,
            [el.id]: {
                ...el,
                ...(mode == "view" && {isCorrect: false})
            },
        };
    }, {}))

    const fetch = async () => {
        startLoading()
        try {
            const {data: dt} = await $autHost.get("/question/is-passed", {
                params: {
                    questionId: data.id
                }
            })

            const passed = dt.body.passed

            if (passed){
                setIsPassed(true)
                setState(data.answers.reduce((acc: {}, el: IBlock) => {
                    return {
                        ...acc,
                        [el.id]: {
                            ...el,
                        },
                    };
                }, {}))
            }
        } catch (e) {
            console.log(e);
        }
        setTimeout(()=>{
            stopLoading()

        },500)
    }

    useEffect(() => {
        if (mode == "view") {
            fetch()
        }else{
            stopLoading()
        }
    }, [])


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

    const onSubmit = async ()=>{
        try {
            const answers = Object.values(state).filter((el:any)=>el.isCorrect).map((el:any)=>  el.id )
            const {data: dt} = await $autHost.post("/question/pass",{
                questionId: data.id,
                answers,
            })
            const is_correct = dt.body.is_correct
            if (is_correct){
                setIsPassed(true)
            }else {
                setError(true)
                setTimeout(()=>{
                    setError(false)
                },1000)
            }
        }catch (e) {

        }
    }
    return (
        <div>

            <DeleteWrapper active={mode == "redactor"} onDelete={onDelete} meta={data.id}>
                <div
                    className={classNames(
                        s.body,
                        {[s.body_correct]: isPassed},
                        {[s.body_error]: error},
                    )}
                >
                    <LoadingOverlay overlayBlur={2} loaderProps={{color:"green"}} visible={loading}/>
                        <TextEditor
                            readonly={mode == "view"}
                            initialValue={data.question}
                            onChange={onChange}
                        />
                        <div className={s.answers}>
                            {Object.values(state).map((el: any, num) => {
                                switch (el.type) {
                                    case "loader":
                                        return <>
                                            {el.progress ?
                                                <Progress color={"green"} value={el.progress}/> :
                                                <Loader color={"green"}/>
                                            }
                                            <Space height={15}/>
                                        </>
                                    default:
                                        return <>
                                            <AnswerModule key={el.id} controller={answerController} data={{
                                                id: el.id,
                                                answer: el.answer,
                                                isCorrect: el.isCorrect
                                            }}/>
                                        </>
                                }
                            })}

                        </div>
                        {!loading ? <div className={s.buttons}>
                            {mode == "redactor" ? <ButtonGroup buttons={[
                                {
                                    title: "Добавить ответ",
                                    onClick: () => answerController.createAnswer()
                                }
                            ]}/> : null}

                            {mode == "view" && !isPassed && <ButtonGroup buttons={[
                                {
                                    title: "Ответить",
                                    onClick: () => onSubmit()
                                }
                            ]}/>}

                        </div> : null}


                </div>
            </DeleteWrapper>

        </div>
    );
};
