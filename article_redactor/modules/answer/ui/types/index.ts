import {createAnswerController} from "@box/article_redactor";

export interface IAnswerModule {
    controller: ReturnType<typeof createAnswerController>,
    data: {
        id: string,
        isCorrect: boolean,
        answer: string
    }
}
