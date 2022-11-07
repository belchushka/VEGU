import React from "react";
import {$autHost} from "@box/shared";
import {ActionTypes, ReducerAction} from "@box/article_redactor";

export function createTextController(endpoint: string, meta: {}, dispatch: React.Dispatch<ReducerAction>){
    const createText = async ({text}:{text: string})=>{
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
