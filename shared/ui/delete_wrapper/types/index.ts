import {IWithChildren} from "@types";

export interface IDeleteWrapper extends IWithChildren{
    inline?: boolean
    onDelete: (meta: any)=>void
    meta: any
    active?: boolean
}
