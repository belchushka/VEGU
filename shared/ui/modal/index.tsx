import React from "react";
import { IWithChildren } from "@types";
import s from "./style.module.scss";
import { AnimateWrapper, CircledIcon } from "@box/shared";
import Cross from "@assets/icons/cross.svg";

export interface IModal extends IWithChildren {
  title: string;
  close: () => void;
  visible: boolean;
}

const ModalNowrap: React.FC<IModal> = ({ title, close, children, visible }) => {
  return (
    <AnimateWrapper dropdown={false} visible={visible} className={s.wrapper}>
      <div className={s.body}>
        <div className={s.body_header}>
          <h5 className={s.body_title}>{title}</h5>
          <CircledIcon
            className={s.body_header_close}
            background={"#F5F5FA"}
            size={46}
            onClick={close}
          >
            <Cross />
          </CircledIcon>
        </div>
        <div className="">{children}</div>
      </div>
    </AnimateWrapper>
  );
};

export const Modal = React.memo(ModalNowrap);
