import React from 'react';
import {IContainer} from "./types";
import classNames from "classnames";
import s from "./style.module.scss"

export const Container: React.FC<IContainer> = ({
    className,
    children
                                                }) => {
    return (
        <div className={classNames(s.container,className)}>
            {children}
        </div>
    );
};
