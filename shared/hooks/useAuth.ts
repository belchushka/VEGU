import {useTypedSelector} from "@box/shared";

export const useAuth = ()=>{
    return useTypedSelector(state => state.auth)
}
