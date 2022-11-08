import {IWithClass} from "@types";


export interface IRichButton extends IWithClass{
    children: string
    onClick: ()=>void
}
