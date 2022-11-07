import React from "react";
import s from "./style.module.scss";

interface ILabel {
  text: string;
}

const LabelNowrap: React.FC<ILabel> = ({ text }) => {
  return (
    <div className={s.body}>
      <span>{text}</span>
    </div>
  );
};

export const Label = React.memo(LabelNowrap);
