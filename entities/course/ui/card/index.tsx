import React, { useState } from "react";
import s from "./style.module.scss";
import classNames from "classnames";
import { Button, Label } from "@box/shared";
import { RequestModal } from "@box/features";
import ContentLoader from "react-content-loader";
import { useRouter } from "next/router";
import { useTypedSelector } from "@box/store/hooks";
import { ICourse, IType, selectCourseType } from "@box/entities";
import { RoleType } from "@types";
import { localeHours } from "@box/shared/lib";

interface ICourseCard {
  className?: string;
  showPrice?: boolean;
  type?: RoleType;
  data: ICourse;
  showButtons?: boolean;
}

export const CourseCard: React.FC<ICourseCard> = ({
  className,
  showPrice = true,
  type = "user",
  data,
  showButtons = true,
}) => {
  const [showModal, setShowModal] = useState(false);
  const course_type: IType | undefined = useTypedSelector(
    selectCourseType(data.courseTypeId)
  );
  const router = useRouter();
  const isAuth = useTypedSelector((state) => state.auth.isAuth);
  const handleClick = () => {
    if (isAuth) {
      setShowModal(true);
    } else {
      router.push({
        pathname: "/login",
        query: {
          to: router.asPath,
        },
      });
    }
  };
  return (
    <>
      <RequestModal
        visible={showModal}
        data={data}
        close={() => setShowModal(false)}
      />
      <div className={classNames(s.body, className)}>
        <div className={s.body_labels}>
          {course_type && <Label text={course_type.name} />}
        </div>
        <h3>{data.name}</h3>
        <p className={s.body_time}>
          {data.hours} {localeHours(data.hours)}
        </p>
        {showPrice && <p className={s.body_price}>Бесплатно</p>}
        <div className={s.body_buttons}>
          {(() => {
            if (showButtons) {
              switch (type) {
                case "my":
                  return (
                    <Button
                      width={132}
                      onClick={() =>
                        router.push("/my_courses/course/" + data.id)
                      }
                      type={"grey"}
                    >
                      <span>Пройти</span>
                    </Button>
                  );
                case "admin":
                  return (
                    <>
                      <Button
                        onClick={() =>
                          router.push("/catalog/course/" + data.id)
                        }
                        type={"gradient"}
                        width={132}
                      >
                        <span>Подробнее</span>
                      </Button>
                      <Button
                        type={"white"}
                        width={132}
                        onClick={() => router.push("/admin/course/" + data.id)}
                      >
                        <span>Редактировать</span>
                      </Button>
                    </>
                  );
                case "user":
                  return (
                    <>
                      <Button
                        onClick={handleClick}
                        type={"gradient"}
                        width={132}
                      >
                        <span>Записаться</span>
                      </Button>
                      <Button
                        type={"white"}
                        width={132}
                        onClick={() =>
                          router.push("/catalog/course/" + data.id)
                        }
                      >
                        <span>Подробнее</span>
                      </Button>
                    </>
                  );
              }
            }
          })()}
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
