import React from 'react';
import Logo from "@assets/icons/logo.svg"
import s from "./style.module.scss"
import {asset_prefix, Button, useAuth} from "@box/shared";
import {HeaderSearch} from "@box/features";
import Link from "next/link";
import {UserAvatar} from "@box/entities";

export const Header: React.FC = () => {
    const {isAuth, user} = useAuth()
    return (
        <div className={s.header}>
            <Link href={"/"}>
                <Logo/>
            </Link>
            <div className={s.header_actions}>
                <HeaderSearch/>
                {!isAuth ?
                    <Link href={"/login"}><Button width={132} size={"xsm"}>Войти</Button></Link>
                    :
                    <Link href={"/profile"}>
                        <UserAvatar size={"md"} src={asset_prefix + user?.avatar?.path}/>
                    </Link>
                }
            </div>
        </div>
    );
};
