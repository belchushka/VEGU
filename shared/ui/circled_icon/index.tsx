import React from "react";
import { IWithChildren } from "@types";
import classNames from "classnames";
import s from "./style.module.scss";

interface ICircledIcon extends IWithChildren {
  className?: string;
  size: number;
  onClick: () => void;
  background: string;
}

const CircledIconNowrap: React.FC<ICircledIcon> = ({
  size,
  className,
  children,
  onClick,
  background,
}) => {
  return (
    <div
      style={{
        width: size + "px",
        height: size + "px",
        backgroundColor: background,
      }}
      className={classNames(s.body, className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CircledIcon = React.memo(CircledIconNowrap);
