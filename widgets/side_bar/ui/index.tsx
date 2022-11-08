import React, {useCallback, useState} from "react";
import Logo from "@assets/icons/logo.svg";
import s from "./style.module.scss";
import Exit from "@assets/icons/login-box-line.svg";
import {useRouter} from "next/router";
import Link from "next/link";
import classNames from "classnames";
import {ISideBarItemComponent} from "../types";
import {useTypedDispatch} from "@box/shared";
import {logout} from "@box/entities";
import {items} from "../lib";

const SideBarItem: React.FC<ISideBarItemComponent> = ({
                                                          icon,
                                                          text,
                                                          active,
                                                          onClick,
                                                      }) => {
    return (
        <div
            className={classNames(s.sidebar_item, {[s.sidebar_item_active]: active})}
            onClick={onClick}
        >
            <div className={s.sidebar_item_animate_balloon}></div>
            <div className={classNames(s.sidebar_item_content, {[s.sidebar_item_content_active]: active})}>
                {icon({fill: active ? "#09121F" : "#8083A3"})}
                <p>{text}</p>
            </div>
        </div>
    );
};

const SideBarNowrap = () => {
    const [showDropDown, setShowDropDown] = useState(false);
    const router = useRouter();
    const dispatch = useTypedDispatch()
    const onClick = useCallback((route: string) => {
        router.push(route);
    }, []);
    const exit = () => {
        dispatch(logout())
        router.push("/");
    }
    return (
        <div className={s.body}>
            <Link href={"/"}>
                <Logo className={s.logo}/>
            </Link>
            <div className={classNames(s.items, {[s.items_opened]: showDropDown})}>
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
                    onClick={exit}
                    text={"Выйти"}
                    icon={Exit}
                />
            </div>
        </div>
    );
};

export const SideBar = React.memo(SideBarNowrap);
