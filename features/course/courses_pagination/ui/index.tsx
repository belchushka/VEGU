import React  from "react";
import { useTypedDispatch, useTypedSelector } from "@box/shared";
import { Pagination } from "@box/shared";
import { setCoursesCurrentPage } from "@box/entities";
import s from "./style.module.scss";

const CoursesPaginationNowrap = () => {
  const { pages, currentPage } = useTypedSelector(
    (state) => state.course
  );
  const dispatch = useTypedDispatch();
  const onNext = () =>
    currentPage < pages && dispatch(setCoursesCurrentPage(currentPage + 1));
  const onPrev = () =>
    currentPage - 1 >= 1 && dispatch(setCoursesCurrentPage(currentPage - 1));
  const onSelect = (page: number) =>
    page <= pages && page >= 1 && dispatch(setCoursesCurrentPage(page));
  return (
    <>
      <Pagination
        onNext={onNext}
        onPrev={onPrev}
        total={pages}
        onSelect={onSelect}
        currentPage={currentPage}
        className={s.pagination}
      />
    </>
  );
};

export const CoursesPagination = React.memo(CoursesPaginationNowrap);
