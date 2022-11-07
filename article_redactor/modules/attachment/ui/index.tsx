import React from "react";
import s from "./style.module.scss";
import Download from "@assets/icons/download.svg";
import { MediaBlock } from "@box/article_redactor/entities/types";

export const Attachment: React.FC<MediaBlock> = ({ src, name }) => {
  return (
    <div className={s.body}>
      <a
        href={src}
        download={true}
        rel={"noreferrer"}
        target={"_blank"}
        className={s.data}
      >
        <Download />
        <p>{name}</p>
      </a>
    </div>
  );
};
