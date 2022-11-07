import React from "react";
import s from "./style.module.scss";

interface ISeparator {
  offset: number;
}

const SeparatorNowrap: React.FC<ISeparator> = ({ offset }) => {
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

export const Separator = React.memo(SeparatorNowrap);
