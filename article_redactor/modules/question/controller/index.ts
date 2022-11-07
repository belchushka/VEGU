import {$autHost} from "@box/shared";
import {ActionTypes} from "@box/article_redactor";
import {ICreateControllerWithLoader} from "@box/article_redactor/modules/types";

export function createTextController({meta, endpoint, loaderController, dispatch}: ICreateControllerWithLoader){
    const createText = async ({text}:{text: string})=>{
        const id = loaderController.createLoader("default")

        try {
            const {data} = await $autHost.post(endpoint, {
                ...meta,
                text,
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
    const deleteText = async ({id}:{id: string})=>{
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
    const updateText = async ({id, position, text}:{id: string, position?: number, text?:string})=>{
        try {
            const {data} = await $autHost.put(endpoint, {
                    id,
                    ...(position && {position}),
                    ...(text && {text}),
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
        updateText,
        createText,
        deleteText
    }
}
