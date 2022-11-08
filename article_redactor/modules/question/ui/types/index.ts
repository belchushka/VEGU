import {createQuestionController} from "@box/article_redactor/modules/question";
import {IBlock} from "@box/article_redactor";

export interface IQuestionModule {
    controller: ReturnType<typeof createQuestionController>
    data: {
        id: string,
        question: string,
        answers: Array<IBlock>
    }
}
