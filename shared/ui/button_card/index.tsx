import React from "react";
import s from "./style.module.scss";
import classNames from "classnames";
import { Button } from "@box/shared";
import { useRouter } from "next/router";

interface IBlockCard {
  title: string;
  subtitle: string;
  onButtonClick: () => void;
  className?: string;
  buttonTitle?: string;
}

const ButtonCardNowrap: React.FC<IBlockCard> = ({
  title,
  subtitle,
  onButtonClick,
  className,
  buttonTitle = "Редактировать",
}) => {
  const router = useRouter();
  return (
    <div className={classNames(s.body, className)}>
      <div className="">
        <h5>{title}</h5>
        <p>{subtitle}</p>
      </div>
      <Button type={"gradient"} onClick={onButtonClick} width={123} height={36}>
        <span>{buttonTitle}</span>
      </Button>
    </div>
  );
};

export const ButtonCard = React.memo(ButtonCardNowrap);
