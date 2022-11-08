import React from 'react';
import {IButton} from "./types";
import classNames from "classnames";
import {fontSizes} from "@box/shared/lib/fonts";
import s from "./style.module.scss"
import {Loader} from "@mantine/core";

const presets = {
    "light" : s.button_light,
    "dark" : s.button_dark,
    "gradient": "gradient_background"
}


export const Button: React.FC<IButton> = ({
                                              className,
                                              onClick = () => null,
                                              width,
                                              fullWidth = false,
                                              size = "md",
                                              loading = false,
                                              children,
                                              height,
                                              preset = "gradient"
                                          }) => {
    return (
        <button onClick={onClick} style={{
            minWidth: fullWidth ? "100%" : width ? width + "px" : "auto",
            height: height ? height + "px" : "auto",
        }} className={classNames(s.button,fontSizes[size], presets[preset] ,className)}>
            {!loading ? children : <Loader size={"sm"} color={"white"}/>}
        </button>
    );
};
