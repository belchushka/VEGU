import React, { useCallback, useState } from "react";
import Logo from "@assets/icons/logo.svg";
import s from "./style.module.scss";
import { SideBarItem } from "@box/shared";
import Exit from "@assets/icons/login-box-line.svg";
import { useRouter } from "next/router";
import { useLogout } from "@box/shared/hooks";
import Link from "next/link";
import classNames from "classnames";
import { CircledIcon } from "@box/shared";
import Burger from "@assets/icons/burger.svg";
import Cross from "@assets/icons/cross.svg";

const SideBarNowrap = ({ items }: { items: Array<any> }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const router = useRouter();
  const logout = useLogout();
  const onClick = useCallback((route: string) => {
    router.push(route);
  }, []);
  return (
    <div className={s.body}>
      <div className={s.mobile_header}>
        <Link href={"/"}>
          <Logo />
        </Link>
        <CircledIcon
          size={46}
          onClick={() => setShowDropDown(true)}
          background={"#F5F5FA"}
        >
          <Burger />
        </CircledIcon>
      </div>
      <Link href={"/"}>
        <Logo className={s.logo} />
      </Link>
      <div className={classNames(s.items, { [s.items_opened]: showDropDown })}>
        <div className={s.mobile_header}>
          <Link href={"/"}>
            <Logo />
          </Link>
          <CircledIcon
            size={46}
            onClick={() => setShowDropDown(false)}
            background={"#F5F5FA"}
          >
            <Cross />
          </CircledIcon>
        </div>
        {items.map((el, num) => {
          return (
            <SideBarItem
              key={num}
              active={router.pathname == el.route}
              onClick={() => {
                setShowDropDown(false);
                onClick(el.route);
              }}
              text={el.text}
              icon={el.icon}
            />
          );
        })}
        <SideBarItem
          active={false}
          onClick={() => {
            logout();
            router.push("/");
          }}
          text={"Выйти"}
          icon={() => <Exit fill={"#8083A3"} />}
        />
      </div>
    </div>
  );
};

export const SideBar = React.memo(SideBarNowrap);
