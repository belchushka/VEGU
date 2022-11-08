import {ActionTypes, ReducerAction} from "@box/article_redactor";
import {v4 as uuidv4} from "uuid";

export const createLoaderController = (dispatch: React.Dispatch<ReducerAction>)=>{

    const createLoader = (type: "progress" | "default")=>{
        const id = uuidv4()
        dispatch({
            type: ActionTypes.SET_BLOCK,
            block:{
                id: id,
                type:"loader",
                ...(type == "progress" && {progress: 0})
            }
        })
        return id
    }

    const updateLoader = (id: string,progress: number)=>{
        dispatch({
            type: ActionTypes.SET_BLOCK,
            block:{
                id: id,
                progress
            }
        })
    }

    const deleteLoader = (id: string) =>{
        dispatch({
            type: ActionTypes.DELETE_BLOCK,
            id
        })
    }

    return {
        updateLoader,
        createLoader,
        deleteLoader
    }
}
