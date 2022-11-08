import {createTextController} from "@box/article_redactor";

export interface ITextModule {
    controller: ReturnType<typeof createTextController>
    data: {
        id: string,
        text: string
    }
}
