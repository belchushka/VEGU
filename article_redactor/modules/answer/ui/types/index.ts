import {createQuestionController} from "@box/article_redactor/modules/question";

export interface IQuestionModule {
    controller: ReturnType<typeof createQuestionController>
    data: {
        id: string,
        question: string
    }
}
