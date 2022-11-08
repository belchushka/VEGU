import {IWithChildren} from "@types";

export interface IAuthGuard extends IWithChildren {
    permissions: Array<any>
}
