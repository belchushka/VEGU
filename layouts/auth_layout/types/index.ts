import {IWithChildren} from "@types";
import {ReactNode} from "react";

export interface IAuthLayout extends IWithChildren {
    text?: string;
    button: ReactNode;
}
