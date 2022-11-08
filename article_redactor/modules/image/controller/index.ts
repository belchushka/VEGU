import {$autHost} from "@box/shared";
import {ActionTypes} from "@box/article_redactor";
import { ICreateControllerWithLoader} from "@box/article_redactor/modules/types";

export function createImageController({meta,endpoint,dispatch,loaderController}: ICreateControllerWithLoader){
    const createImage = async ({image}:{image: File})=>{
        const id = loaderController.createLoader("progress")

        try {
            const {data} = await $autHost.post(endpoint, {
                ...meta,
                image,
            }, {
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.progress) {
                        loaderController.updateLoader(id, progressEvent.progress * 100)
                    }
                },
                headers: {
                    "Content-Type":"multipart/form-data"
                }
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
    const deleteImage = async ({id}:{id: string})=>{
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
    const updateImage = async ({id, position, text}:{id: string, position?: number, text?:string})=>{
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
        deleteImage,
        createImage
    }
}
