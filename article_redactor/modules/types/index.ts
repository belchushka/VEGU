import React from "react";
import {createLoaderController, ReducerAction} from "@box/article_redactor";

export interface ICreateController {
    endpoint: string,
    meta: {},
    dispatch: React.Dispatch<ReducerAction>
}

export interface ICreateControllerWithLoader extends ICreateController{
    loaderController: ReturnType<typeof createLoaderController>
}
