import React from "react";
import s from "./style.module.scss";
import { MediaBlock } from "@box/article_redactor/entities/types";

export const Image: React.FC<MediaBlock> = ({ src }) => {
  return (
    <div className={s.body}>
      <img src={src} alt="" />
    </div>
  );
};
