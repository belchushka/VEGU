import React from 'react';
import SearchIcon from "@assets/icons/search.svg";
import s from "./style.module.scss";
import {ICatalogSearch} from "./types";
import classNames from "classnames";

export const CatalogSearch: React.FC<ICatalogSearch>= ({
    className
                                                       }) => {
    return (
        <div className={classNames(s.catalog_search, className)}>
            <input type="text" placeholder={"Поиск"} />
            <div className={s.catalog_search_icon}>
                <SearchIcon fill={"white"} />
            </div>
        </div>
    );
};
