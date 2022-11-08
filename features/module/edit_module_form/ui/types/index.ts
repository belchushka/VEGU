import { IModule} from "@box/entities";

export interface IEditCourseForm {
    module: IModule,
    onSuccess?: ()=>void
}
