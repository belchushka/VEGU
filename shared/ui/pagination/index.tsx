import React from "react";
import s from "./style.module.scss";
import classNames from "classnames";
import Arrow from "@assets/icons/pointing-arrow.svg";

interface IPagination {
  onNext: () => void;
  onPrev: () => void;
  total: number;
  onSelect: (page: number) => void;
  className?: string;
  currentPage: number;
}

const PaginationNowrap: React.FC<IPagination> = ({
  onNext,
  onPrev,
  total,
  className,
  onSelect,
  currentPage,
}) => {
  return (
    <div className={classNames(s.body, className)}>
      <div className={classNames(s.nav_button)} onClick={onPrev}>
        <Arrow fill={"black"} />
      </div>
      <div className={s.pages}>
        {new Array(total).fill(0).map((_, num) => {
          return (
            <div
              onClick={() => onSelect(num + 1)}
              key={num + 1}
              className={classNames(s.pages_inner, {
                [s.pages_inner_active]: currentPage == num + 1,
              })}
            >
              <span>{num + 1}</span>
            </div>
          );
        })}
      </div>
      <div
        className={classNames(s.nav_button, s.nav_button_next)}
        onClick={onNext}
      >
        <Arrow fill={"black"} />
      </div>
    </div>
  );
};

export const Pagination = React.memo(PaginationNowrap);
