import {useCallback, useMemo, useReducer} from "react";
import {
    ActionTypes,
    createAnswerController,
    createLoaderController,
    initialState as reducerInitialState,
    reducer
} from "@box/article_redactor";

export const useQuestion = ({apiUrl, meta}: {apiUrl: string, meta:{}}, initialState= reducerInitialState)=>{
    const [state, dispatch] = useReducer(reducer, initialState)
    const loaderController = useMemo(()=>createLoaderController(dispatch), [])
    const answerController = useMemo(()=>createAnswerController({
        endpoint: apiUrl,
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
    return {
        state,
        answerController,
        setState
    }
}
