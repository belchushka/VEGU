import {IWithChildren} from "@types";

export interface IModal extends IWithChildren {
    title?: string;
    close: () => void;
    visible: boolean;
    width?: number
}
