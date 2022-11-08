import {IWithClass, TSize} from "@types";

export interface IButton extends IWithClass{
    width?: number
    fullWidth?: boolean
    size?: TSize
    onClick?: ()=>void
    loading?: boolean
    children: string
    preset?: "light" | "dark" | "gradient"
    height?: number
}
