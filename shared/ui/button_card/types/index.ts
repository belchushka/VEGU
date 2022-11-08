import {ReactElement, ReactNode} from "react";
import {IWithClass} from "@types";


export interface IButtonCard extends IWithClass{
    title: string,
    subtitle: string
    buttons: ReactNode | ReactElement
}
