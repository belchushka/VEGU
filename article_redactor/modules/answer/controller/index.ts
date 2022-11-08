import {$autHost} from "@box/shared";
import {ActionTypes} from "@box/article_redactor";
import {ICreateControllerWithLoader} from "@box/article_redactor/modules/types";

export function createAnswerController({meta, endpoint, loaderController, dispatch}: ICreateControllerWithLoader){
    const createAnswer = async ()=>{
        const id = loaderController.createLoader("default")
        try {
            const {data} = await $autHost.post(endpoint, {
                ...meta,
                answer: "",
                isCorrect: false
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
    const deleteAnswer = async ({id}:{id: string})=>{
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
    const updateAnswer = async ({id, isCorrect, answer}:{id: string, isCorrect?: boolean, answer?:string}, fetch = true)=>{
        try {
            dispatch({
                type:ActionTypes.SET_BLOCK,
                block: {
                    id,
                    ...(answer && {answer}),
                    ...(typeof isCorrect!=="undefined" && {isCorrect})
                }
            })

            if (fetch){
                const {data} = await $autHost.put(endpoint, {
                    id,
                    ...(answer && {answer}),
                    ...(typeof isCorrect!=="undefined" && {isCorrect}),
                })
            }
        }catch (e) {
            console.log(e);
        }
    }

    return {
        updateAnswer,
        createAnswer,
        deleteAnswer
    }
}
