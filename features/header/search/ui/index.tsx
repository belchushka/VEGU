import React from 'react';
import s from "./style.module.scss"
import classNames from "classnames";
import Search from "@assets/icons/search.svg"

export const HeaderSearch:React.FC = () => {
    return (
        <div className={s.search_wrapper}>
            <input placeholder={"Поиск"} className={ classNames("fontSmall", s.search)}/>
            <Search fill={"black"} className={s.search_icon}/>
        </div>
    );
};

