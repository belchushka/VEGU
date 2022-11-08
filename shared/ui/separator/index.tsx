import React from "react";
import s from "./style.module.scss";
import {ISeparator} from "./types";

export const Separator: React.FC<ISeparator> = ({ offset }) => {
  return (
    <div
      className={s.separator}
      style={{
        marginTop: offset + "px",
        marginBottom: offset + "px",
      }}
    ></div>
  );
};
