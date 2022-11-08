import React from 'react';
import {IArticleRedactor} from "./types";
import {
    useRedactor,
    ModeContext,
    RedactorControls, ArticleContent,
} from "@box/article_redactor";

export const ArticleRedactor: React.FC<IArticleRedactor> = ({
                                                                meta,
                                                                apiUrl,
                                                                mode
                                                            }) => {
    const {
        textController,
        imageController,
        videoController,
        attachmentController,
        audioController,
        questionController,
        questionsController,
        setState,
        state
    } = useRedactor({apiUrl, meta});

    return (
        <ModeContext.Provider value={{
            mode: mode
        }}>
            <ArticleContent controllers={{
                textController,
                imageController,
                videoController,
                attachmentController,
                audioController,
                questionController,
                setState
            }} state={state}/>
            {mode == "redactor" ? <RedactorControls controllers={{
                textController,
                imageController,
                videoController,
                attachmentController,
                audioController,
                questionController,
                questionsController
            }}/> : null}

        </ModeContext.Provider>
    );
};
