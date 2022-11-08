import React from "react";
import s from "./style.module.scss";
import classNames from "classnames";
import {Modal, useBoolean} from "@box/shared";
import ContentLoader from "react-content-loader";
import { localeHours } from "@box/shared";
import {ICourseCard} from "./types";
import {RequestCourseForm} from "@box/features";

export const CourseCard: React.FC<ICourseCard> = ({
  className,
  showPrice = true,
  data,
  buttons
}) => {
  const {value, toggle} = useBoolean(false);
  return (
    <>
      <Modal
        visible={value}
        close={toggle}
      >
        <RequestCourseForm courseId={data.id}/>
      </Modal>
      <div className={classNames(s.body, className)}>
        <div className={s.body_labels}>
          {/*{course_type && <Label text={course_type.name} />}*/}
        </div>
        <h3>{data.name}</h3>
        <p className={s.body_time}>
          {data.hours} {localeHours(data.hours)}
        </p>
        {showPrice && <p className={s.body_price}>Бесплатно</p>}
        <div className={s.body_buttons}>
          {buttons}
        </div>
      </div>
    </>
  );
};

export const CardLoader = () => {
  return (
    <ContentLoader
      speed={2}
      width={"100%"}
      height={230}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="8" rx="3" ry="3" width="110" height="25" />
      <rect x="0" y="55" rx="3" ry="3" width="152" height="20" />
      <rect x="0" y="120" rx="3" ry="3" width="110" height="25" />
      {/*<rect x="0" y="72" rx="3" ry="3" width="380" height="6" />*/}
      {/*<rect x="0" y="88" rx="3" ry="3" width="178" height="6" />*/}
      {/*<circle cx="20" cy="20" r="20" />*/}
    </ContentLoader>
  );
};

