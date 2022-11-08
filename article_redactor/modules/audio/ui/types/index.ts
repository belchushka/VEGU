import {createAudioController} from "@box/article_redactor";

export interface IAudioModule {
    controller: ReturnType<typeof createAudioController>
    data: {
        id: string,
        src: string
    }
}
