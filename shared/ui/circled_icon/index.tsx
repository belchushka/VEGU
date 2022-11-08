import React from "react";
import classNames from "classnames";
import s from "./style.module.scss";
import {ICircledIcon} from "./types";

const CircledIconNowrap: React.FC<ICircledIcon> = ({
                                                       size = 48,
                                                       className,
                                                       onClick,
                                                       backgroundColor = "#F5F5FA",
                                                       children
                                                   }) => {
    return (
        <div
            style={{
                width: size + "px",
                height: size + "px",
                backgroundColor: backgroundColor,
            }}
            className={classNames(s.body, className)}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export const CircledIcon = React.memo(CircledIconNowrap);
