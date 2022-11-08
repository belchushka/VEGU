import React from 'react';
import {IRedactorControls} from "./types";
import {ButtonGroup} from "@box/shared";

export const RedactorControls: React.FC<IRedactorControls> = ({
    controllers
                                                              }) => {

    return (
        <ButtonGroup buttons={[
            {
                title:"Добавить текст",
                onClick: ()=> controllers.textController.createText({text:""})
            },
            {
                title:"Добавить изображение",
                file: {
                    onSelect:(file)=>controllers.imageController.createImage({image: file}),
                    accept: "image/png,image/jpeg,image/jpg",
                }
            },{
                title:"Добавить видео",
                file: {
                    onSelect:(file)=>controllers.videoController.createVideo({video: file}),
                    accept: "video/mp4,video/3gp,video/mov,video/.avi,video/wmv",
                }
            },
            {
                title:"Добавить вложение",
                file: {
                    onSelect:(file)=>{
                        const name = prompt("Название файла")
                        if (name){
                            controllers.attachmentController.createAttachment({attachment: file, name: name})
                        }
                    },
                    accept: "*",
                }
            },
            {
                title: "Добавить аудио",
                file: {
                    accept: "audio/mp3, audio/wav, audio/flac",
                    onSelect: (file) =>
                        controllers.audioController.createAudio({
                            audio: file,
                        }),
                },
            },
            {
                title: "Добавить вопрос",
                onClick: ()=> controllers.questionController.createQuestion({question:""})
            },
            {
                title: "Загрузить вопросы",
                file:{
                    onSelect:(file)=>{
                            controllers.questionsController.loadQuestions({questions: file})
                    },
                    accept: "*",
                }
            },
        ]}/>
    );
};
