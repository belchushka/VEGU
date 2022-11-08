import {IWithClass, TSize} from "@types";

export interface IInput extends IWithClass{
    size?: TSize
    loading?: boolean
    placeholder?: string
    inputClassName?: string
    onInput?: (val: string)=>void
    type?: "text" | "number" | "password"
    value?: string
    name?: string
    hookFormProps?: any
    error?: string
}
