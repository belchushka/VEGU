import {createAttachmentController} from "@box/article_redactor";

export interface IAttachmentModule {
    controller: ReturnType<typeof createAttachmentController>
    data: {
        id: string,
        name: string
        src: string
    }
}
