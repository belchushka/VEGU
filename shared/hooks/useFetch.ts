import {useEffectAfterMount, useLoading, useTypedDispatch} from "@box/shared";
import {AppThunk} from "@box/store";
import {useEffect} from "react";

type TProps = {
    onSuccess?: ()=>void,
    onError?:(e: any)=>void,
    action: ()=>ReturnType<AppThunk>,
    fetchAfterMount?: boolean
}

export const useFetch = ({onSuccess=()=>null, onError=()=>null, action, fetchAfterMount = false}: TProps, dependencies: any[] = [])=>{
    const {loading, stopLoading, startLoading} = useLoading(true)

    const dispatch = useTypedDispatch()
    const fetch = async ()=>{
        startLoading()
        try {
            await dispatch(action())
            onSuccess()
        }catch (e: any) {
            onError(e)
        }
        stopLoading()
    }
    useEffect(()=>{
        if (!fetchAfterMount){
            fetch()
        }
    },[...dependencies])
    useEffectAfterMount(()=>{
        if (fetchAfterMount){
            fetch()
        }
    }, [...dependencies])
    return {
        loading,
        stopLoading
    }
}
