import React from "react";
import {$autHost} from "@box/shared";
import {ActionTypes, ReducerAction} from "@box/article_redactor";

export function createVideoController(endpoint: string, meta: {}, dispatch: React.Dispatch<ReducerAction>){
    const createVideo = async ({video}:{video: File})=>{
        try {
            const {data} = await $autHost.post(endpoint, {
                ...meta,
                video,
            }, {
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
    }
    const deleteVideo = async ({id}:{id: string})=>{
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
    const updateVideo = async ({id, position, text}:{id: string, position?: number, text?:string})=>{
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
        deleteVideo,
        createVideo
    }
}
