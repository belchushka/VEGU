import {$autHost} from "@box/shared";
import {ICreateControllerWithLoader} from "@box/article_redactor/modules/types";
import {ActionTypes, IBlock} from "@box/article_redactor";

export function createQuestionsController({meta, endpoint, loaderController, dispatch}: ICreateControllerWithLoader) {
    const loadQuestions = async ({questions}: { questions: File }) => {
        const id = loaderController.createLoader("default")
        try {
            const {data} = await $autHost.post(endpoint, {
                ...meta,
                questions,
            }, {
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.progress) {
                        loaderController.updateLoader(id, progressEvent.progress * 100)
                    }
                },
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            dispatch({
                type:ActionTypes.APPEND_BLOCKS,
                blocks: data.body.reduce((acc: {}, el: IBlock)=>{
                    return {
                        ...acc,
                        [el.id]:el
                    }
                },{})
            })
        } catch (e: any) {
            if (e?.response?.data?.trouble) {
                alert(e?.response?.data?.trouble)
            }
        }
        loaderController.deleteLoader(id)

    }

    return {
        loadQuestions
    }
}
