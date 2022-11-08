import Courses from "@assets/icons/briefcase-5-line.svg";
import Checkups from "@assets/icons/search-eye-line.svg";
import Profile from "@assets/icons/user-line.svg";
import Messages from "@assets/icons/question-answer-line.svg";
import {ISideBarItem} from "../types";

export const items: Array<ISideBarItem> = [
    {
        icon: Courses,
        text: "Созданные курсы",
        route: "/methodist",
        permissions: []
    },
    {
        icon: Courses,
        text: "Мои курсы",
        route: "/courses",
        permissions: []

    },
    {
        icon: Checkups,
        text: "Проверки",
        route: "/admin/checkups",
        permissions: []

    },
    {
        icon: Profile,
        text: "Профиль",
        route: "/profile",
        permissions: []

    },
    {
        icon: Messages,
        text: "Сообщения",
        route: "/messages",
        permissions: []

    },
]
