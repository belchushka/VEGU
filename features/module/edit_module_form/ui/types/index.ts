import {IBlock} from "@box/entities";

export interface IEditCourseForm {
    block: IBlock,
    onSuccess?: ()=>void
}
