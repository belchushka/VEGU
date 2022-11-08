import {IWithChildren, IWithClass} from "@types";

export interface ICircledIcon extends IWithClass, IWithChildren{
    size?: number;
    onClick?: () => void;
    backgroundColor?: string;
}
