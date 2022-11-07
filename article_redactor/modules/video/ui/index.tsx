import React from "react";
import s from "./style.module.scss";
import { MediaBlock } from "@box/article_redactor/entities/types";

export const Video: React.FC<MediaBlock> = ({ src }) => {
  return (
    <div className={s.body}>
      <video src={src} controls={true} />
    </div>
  );
};
