import React from 'react';
import {IBarWrapper} from "./types";
import s from "./style.module.scss"

export const BarWrapper: React.FC<IBarWrapper> = (
    {children, active= true}
) => {
    return (
        <div>
            {active ? <div className={s.drag_element}>
                <div></div>
            </div> : null}

            {children}
        </div>
    );
};
