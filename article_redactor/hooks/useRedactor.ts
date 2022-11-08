import {useCallback, useEffect, useMemo, useReducer} from "react";
import {
    ActionTypes, createAttachmentController, createAudioController,
    createImageController, createLoaderController, createQuestionsController,
    createTextController, createVideoController,
    IBlock,
    initialState,
    reducer
} from "@box/article_redactor";
import {$autHost} from "@box/shared";
import {createQuestionController} from "@box/article_redactor/modules/question";

export const useRedactor = ({apiUrl, meta}: {apiUrl: string, meta:{}})=>{
    const [state, dispatch] = useReducer(reducer, initialState)
    const loaderController = useMemo(()=>createLoaderController(dispatch), [])

    const textController = useMemo(()=>createTextController({
        endpoint: apiUrl+"text",
        meta,
        dispatch,
        loaderController
    }), [])

    const questionsController = useMemo(()=>createQuestionsController({
        endpoint: apiUrl+"questions",
        meta,
        dispatch,
        loaderController
    }), [])

    const questionController = useMemo(()=>createQuestionController({
        endpoint: apiUrl+"question",
        meta,
        dispatch,
        loaderController
    }), [])

    const imageController = useMemo(()=>createImageController({
        endpoint: apiUrl+"image",
        meta,
        dispatch,
        loaderController
    }), [])

    const videoController = useMemo(()=>createVideoController({
        endpoint: apiUrl+"video",
        meta,
        dispatch,
        loaderController
    }), [])

    const attachmentController = useMemo(()=>createAttachmentController({
        endpoint: apiUrl+"attachment",
        meta,
        dispatch,
        loaderController
    }), [])

    const audioController = useMemo(()=>createAudioController({
        endpoint: apiUrl+"audio",
        meta,
        dispatch,
        loaderController
    }), [])

    const setState = useCallback((new_state: typeof initialState)=>{
        dispatch({
            type: ActionTypes.SET_STATE,
            state: new_state
        })
    },[])

    const fetch = useCallback(async () => {
        try {
            const { data } = await $autHost.get(apiUrl+"get", {
                params: {
                    ...meta
                },
            });
            setState(data.body.reduce((acc: {}, el: IBlock) => {
                return {
                    ...acc,
                    [el.id]: el,
                };
            }, {}))
        } catch (e) {
            console.log(e);
        }
    }, []);
    useEffect(() => {
        fetch();
    }, []);
    return {
        state,
        questionsController,
        textController,
        imageController,
        videoController,
        audioController,
        attachmentController,
        questionController,
        setState
    }
}
