import {ReactElement, ReactNode} from "react";

export type TSize = "xsm" | "sm" | "md" | "lg" | "xl"

export interface IWithClass {
    className?: string;
}

export interface IWithChildren {
    children: ReactNode | ReactElement;
}
