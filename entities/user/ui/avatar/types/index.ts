import {IWithClass, TSize} from "@types";

export interface IUserAvatar extends IWithClass {
    src?: string | null;
    size?: TSize;
    onClick?: () => void;
}
