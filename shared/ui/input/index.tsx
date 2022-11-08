import React, {ChangeEventHandler, useCallback, useRef} from 'react';
import {IInput} from "./types";
import classNames from "classnames";
import {fontSizes} from "@box/shared";
import s from "./style.module.scss"

export const Input: React.FC<IInput> = ({
                                            size = "md",
                                            placeholder,
                                            className,
                                            inputClassName,
                                            type = "text",
                                            onInput = () => null,
                                            value = "",
                                            name = "",
                                            hookFormProps,
                                            error = ""
                                        }) => {
    const bodyRef = useRef<HTMLDivElement>(null);
    const focusInput = useCallback(() => {
        if (bodyRef.current !== null) {
            bodyRef.current.querySelector("input")?.focus();
        }
    }, [bodyRef]);
    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        onInput(event.target.value)
    }
    return (
        <>
            <div ref={bodyRef} onClick={focusInput} className={classNames(s.input_wrapper, className)}>
                {hookFormProps ?
                    <input placeholder={" "} {...hookFormProps} className={classNames(fontSizes[size], inputClassName)} type={type}/>
                    :
                    <input placeholder={" "} name={name} value={value} onChange={onChange}
                           className={classNames(fontSizes[size], inputClassName)}
                           type={type}/>
                }

                <span>{placeholder}</span>
            </div>
            {error?.length>0 ? <p className={s.input_error}>{error}</p> : null}
        </>

    );
};
