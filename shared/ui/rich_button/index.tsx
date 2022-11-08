import React from 'react';
import {IRichButton} from "./types";
import s from "./style.module.scss"
import classNames from "classnames";

export const RichButton: React.FC<IRichButton> = ({
    onClick,
    children,
    className
                                                  }) => {
    return (
        <div onClick={onClick} className={classNames(s.button, className)}>
            <p>{children}</p>
        </div>
    );
};

