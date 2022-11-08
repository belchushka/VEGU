import {IWithChildren} from "@types";
import {ReactElement, ReactNode} from "react";

export interface IMainLayout extends IWithChildren {
    title: string;
    headerButtons?: ReactNode | ReactElement
}

export interface IDropdownHeader {
    title: string,
    buttons?: ReactNode | ReactElement
}
