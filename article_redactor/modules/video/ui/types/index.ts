import {createImageController} from "@box/article_redactor";

export interface IImageModule {
    controller: ReturnType<typeof createImageController>
    data: {
        id: string,
        src: string
    }
}
