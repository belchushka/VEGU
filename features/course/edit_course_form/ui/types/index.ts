import {ICourse} from "@box/entities";

export interface IEditCourseForm {
    course: ICourse,
    onSuccess?: ()=>void
}
