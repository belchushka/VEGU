import React from "react";
import EmptyAvatar from "@assets/icons/EmptyAvatar.png";
import classNames from "classnames";
import s from "./style.module.scss";
import { IWithClass } from "@types";

interface IUserAvatar extends IWithClass {
  src?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
}

const UserAvatar: React.FC<IUserAvatar> = ({
  src,
  size = "md",
  onClick = () => null,
  className,
}) => {
  return (
    <div
      className={classNames(
        s.avatar,
        { [s.avatar_sm]: size == "sm" },
        { [s.avatar_md]: size == "md" },
        { [s.avatar_lg]: size == "lg" },
        { [s.avatar_xl]: size == "xl" },
        className
      )}
      onClick={onClick}
    >
      <img src={src ? src : EmptyAvatar.src} alt="" />
    </div>
  );
};

export default UserAvatar;
