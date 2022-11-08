import React, {MouseEventHandler, useCallback, useState} from 'react';
import {IDeleteWrapper} from "./types";
import classNames from "classnames";
import s from "./style.module.scss"
import Cross from "@assets/icons/cross.svg";


export const DeleteWrapper: React.FC<IDeleteWrapper> = ({
                                                            inline,
                                                            onDelete,
                                                            meta,
                                                            children,
    active = true
                                                        }) => {
    const [showCross, setShowCross] = useState(false);
    const onMouseEnter: MouseEventHandler = useCallback((ev) => {
            setShowCross(true);
    }, []);
    const onMouseLeave: MouseEventHandler = useCallback((ev) => {
        setShowCross(false);
    }, []);
    return (
        <div
            onMouseEnter={active ? onMouseEnter: ()=>null}
            onMouseLeave={active ? onMouseLeave: ()=>null}
            className={classNames(s.wrapper, {[s.wrapper_inline]: inline})}
        >
            <div
                onClick={() => active ? onDelete(meta) : null}
                className={classNames(s.cross, {[s.cross_visible]: showCross})}
            >
                <div className="">
                    <Cross/>
                </div>
            </div>
            {children}
        </div>
    );
};
