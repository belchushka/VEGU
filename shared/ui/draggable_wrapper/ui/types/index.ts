import {DropResult} from "react-beautiful-dnd";
import {ReactElement, ReactNode} from "react";

export interface IDraggableWrapper {
    onDragEnd: (result: DropResult) => void;
    children: Array<{
        id: string,
        component: ReactElement | ReactNode
    }>
    disabled?: boolean
}
