import React from "react";
import { IWithChildren } from "@types";
import s from "./style.module.scss";
import { SideBar } from "@box/widgets";
import Courses from "@assets/icons/briefcase-5-line.svg";
import Checkups from "@assets/icons/search-eye-line.svg";
import Profile from "@assets/icons/user-line.svg";
import Messages from "@assets/icons/question-answer-line.svg";
import { AnimateWrapper } from "@box/shared";

interface IMainLayout extends IWithChildren {
  title: string;
}

const items = [
  {
    icon: (active: boolean) => (
      <Courses fill={active ? "#09121F" : "#8083A3"} />
    ),
    text: "Созданные курсы",
    route: "/admin",
  },
  {
    icon: (active: boolean) => (
      <Courses fill={active ? "#09121F" : "#8083A3"} />
    ),
    text: "Мои курсы",
    route: "/my_courses",
  },
  {
    icon: (active: boolean) => (
      <Checkups fill={active ? "#09121F" : "#8083A3"} />
    ),
    text: "Проверки",
    route: "/admin/checkups",
  },
  {
    icon: (active: boolean) => (
      <Profile fill={active ? "#09121F" : "#8083A3"} />
    ),
    text: "Профиль",
    route: "/profile",
  },
  {
    icon: (active: boolean) => (
      <Messages fill={active ? "#09121F" : "#8083A3"} />
    ),
    text: "Сообщения",
    route: "/messages",
  },
];

const MainLayoutNowrap: React.FC<IMainLayout> = ({ title, children }) => {
  return (
    <div className={s.body}>
      <SideBar items={items} />
      <div className={s.content}>
        <h2 className={s.content_title}>{title}</h2>
        <AnimateWrapper visible={true}>{children}</AnimateWrapper>
      </div>
    </div>
  );
};

export const MainLayout = React.memo(MainLayoutNowrap);
