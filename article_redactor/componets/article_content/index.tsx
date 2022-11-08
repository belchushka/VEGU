import React, {useCallback, useContext} from 'react';
import {IArticleContent} from "./types";
import {
    AttachmentModule,
    AudioModule,
    ImageModule, ModeContext,
    QuestionModule,
    TextModule,
    VideoModule
} from "@box/article_redactor";
import {BarWrapper, DraggableWrapper, Space, switchItems, updatePositionApi} from "@box/shared";
import {Loader, Progress} from "@mantine/core";
import {DropResult} from "react-beautiful-dnd";

export const ArticleContent: React.FC<IArticleContent> = ({
    controllers,
    state
                                                          }) => {
    const {mode} = useContext(ModeContext)

    const onDragEnd = useCallback(
        async (result: DropResult) => {
            const res = switchItems(
                Object.values(state),
                result.source.index,
                result.destination?.index
            );
            if (Array.isArray(res)) {
                const reducedRes = res.reduce((acc, el) => {
                    return {
                        ...acc,
                        [el.id]: el,
                    };
                }, {});
                controllers.setState(reducedRes);
                const [id, type] = result.draggableId.split(":");
                updatePositionApi(
                    `/module-content/${type}`,
                    id,
                    result.destination?.index
                );
            }
        },
        [state]
    );
    return (
        <div>
            <DraggableWrapper disabled={mode=="view"} onDragEnd={onDragEnd}>
                {Object.values(state).map((el: any) => {
                    return {
                        id: el.id+":"+el.type,
                        component:<BarWrapper active={mode=="redactor"}>
                            {(()=>{
                                switch (el.type) {
                                    case "text":
                                        return <>
                                            <TextModule key={el.id} controller={controllers.textController} data={{
                                                id: el.id,
                                                text: el.text
                                            }}/>
                                            <Space height={15}/>
                                        </>
                                    case "image":
                                        return <>
                                            <ImageModule key={el.id} controller={controllers.imageController} data={{
                                                id: el.id,
                                                src: el?.file?.path
                                            }}/>
                                            <Space height={15}/>
                                        </>
                                    case "video":
                                        return <>
                                            <VideoModule key={el.id} controller={controllers.videoController} data={{
                                                id: el.id,
                                                src: el?.file?.path
                                            }}/>
                                            <Space height={15}/>
                                        </>
                                    case "attachment":
                                        return <>
                                            <AttachmentModule key={el.id} controller={controllers.attachmentController} data={{
                                                id: el.id,
                                                src: el?.file?.path,
                                                name: el.name
                                            }}/>
                                            <Space height={15}/>
                                        </>
                                    case "audio":
                                        return <>
                                            <AudioModule key={el.id} controller={controllers.audioController} data={{
                                                id: el.id,
                                                src: el?.file?.path,
                                            }}/>
                                            <Space height={15}/>
                                        </>
                                    case "loader":
                                        return <>
                                            {el.progress ?
                                                <Progress color={"green"} value={el.progress}/> :
                                                <Loader color={"green"} />
                                            }
                                            <Space height={15}/>
                                        </>
                                    case "question":
                                        return <>
                                            <QuestionModule key={el.id} controller={controllers.questionController} data={{
                                                id: el.id,
                                                question: el.question,
                                                answers: el.answers
                                            }}/>
                                            <Space height={15}/>
                                        </>
                                }
                            })()}
                        </BarWrapper>
                    }
                })}
            </DraggableWrapper>
        </div>
    );
};
