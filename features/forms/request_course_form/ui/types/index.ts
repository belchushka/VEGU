import {IWithClass} from "@types";

export interface IRequestCourseForm extends IWithClass{
    courseId: string
    onSuccess?: ()=>void,
}
