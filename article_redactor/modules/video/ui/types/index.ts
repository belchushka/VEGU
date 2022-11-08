import {createVideoController} from "@box/article_redactor/modules/video";

export interface IVideoModule {
    controller: ReturnType<typeof createVideoController>
    data: {
        id: string,
        src: string
    }
}
