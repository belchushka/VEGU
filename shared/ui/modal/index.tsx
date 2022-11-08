import React from "react";
import s from "./style.module.scss";
import { AnimateWrapper, CircledIcon } from "@box/shared";
import Cross from "@assets/icons/cross.svg";
import {IModal} from "./types";

export const Modal: React.FC<IModal> = ({ title = "", close, children, visible, width = 530 }) => {
  return (
    <AnimateWrapper visible={visible} className={s.wrapper}>
      <div style={{
        maxWidth: width+"px"
      }} className={s.body}>
        <div className={s.body_header}>
          <h5 className={s.body_title}>{title}</h5>
          <CircledIcon
            className={s.body_header_close}
            size={46}
            onClick={close}
          ><Cross/></CircledIcon>
        </div>
        <div>{children}</div>
      </div>
    </AnimateWrapper>
  );
};

