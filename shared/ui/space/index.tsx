import React from 'react';
import {ISpace} from "./types";

export const Space: React.FC<ISpace> = (
    {
        width,
        height
    }
) => {
    return (
        <div style={{
            width: width ? width + "px" : "auto",
            height: height ? height + "px" : "auto"
        }}></div>
    );
};
