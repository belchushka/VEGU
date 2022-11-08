import React from "react";
import s from "./style.module.scss";
import {ILabel} from "./types";

const LabelNowrap: React.FC<ILabel> = ({ text }) => {
  return (
    <div className={s.body}>
      <p>{text}</p>
    </div>
  );
};

export const Label = React.memo(LabelNowrap);
