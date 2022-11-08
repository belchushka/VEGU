import {IWithClass} from "@types";
import {useRedactor} from "@box/article_redactor";

type HookType =  ReturnType<typeof useRedactor>

export interface IArticleContent extends IWithClass{
    controllers: Omit<HookType, "state" | "questionsController">
    state: Omit<HookType, "state">
}
