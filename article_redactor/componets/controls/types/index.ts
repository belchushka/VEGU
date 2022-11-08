import {IWithClass} from "@types";
import {useRedactor} from "@box/article_redactor";

export interface IRedactorControls extends IWithClass{
    controllers: Omit<ReturnType<typeof useRedactor>, "state" | "setState">
}
