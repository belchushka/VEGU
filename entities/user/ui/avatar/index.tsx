import React from "react";
import EmptyAvatar from "@assets/icons/EmptyAvatar.png";
import classNames from "classnames";
import s from "./style.module.scss";
import {IUserAvatar} from "./types";
import Image from "next/image";

const sizes = {
  "xsm": s.avatar_sm,
  "sm" : s.avatar_sm,
  "md": s.avatar_md,
  "lg": s.avatar_lg,
  "xl": s.avatar_xl
}


export const UserAvatar: React.FC<IUserAvatar> = ({
  src,
  size = "md",
  onClick = () => null,
  className,
}) => {
  return (
    <div
      className={classNames(
        s.avatar,
        sizes[size],
        className
      )}
      onClick={onClick}
    >
      <img src={src ? src : EmptyAvatar.src} alt="" />
    </div>
  );
};

