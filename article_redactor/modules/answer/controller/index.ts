import {$autHost} from "@box/shared";
import {ActionTypes} from "@box/article_redactor";
import {ICreateControllerWithLoader} from "@box/article_redactor/modules/types";

export function createQuestionController({meta, endpoint, loaderController, dispatch}: ICreateControllerWithLoader){
    const createQuestion = async ({question}:{question: string})=>{
        const id = loaderController.createLoader("default")
        try {
            const {data} = await $autHost.post(endpoint, {
                ...meta,
                question,
            })
            dispatch({
                type:ActionTypes.SET_BLOCK,
                block: data.body
            })
        }catch (e) {
            console.log(e);
        }
        loaderController.deleteLoader(id)

    }
    const deleteQuestion = async ({id}:{id: string})=>{
        try {
            const {data} = await $autHost.delete(endpoint, {
                data:{
                    id
                }
            })
            dispatch({
                type:ActionTypes.DELETE_BLOCK,
                id: id
            })
        }catch (e) {
            console.log(e);
        }
    }
    const updateQuestion = async ({id, position, question}:{id: string, position?: number, question?:string})=>{
        try {
            const {data} = await $autHost.put(endpoint, {
                    id,
                    ...(position && {position}),
                    ...(question && {question}),
            })
            dispatch({
                type:ActionTypes.SET_BLOCK,
                block: data.body
            })
        }catch (e) {
            console.log(e);
        }
    }

    return {
        updateQuestion,
        createQuestion,
        deleteQuestion
    }
}
