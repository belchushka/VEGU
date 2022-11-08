import React from "react";
import s from "./style.module.scss";
import {IDropdownHeader, IMainLayout} from "./types";
import {SideBar} from "@box/widgets";


const ActionHeader: React.FC<IDropdownHeader> = ({
                                                     title,
                                                     buttons
                                                 }) => {
    return <>
        <div className={s.dropdown_header}>
            <div className={s.dropdown_header_head}>
                <h2 className={s.dropdown_header_title}>{title}</h2>
                <div className={s.dropdown_header_buttons}>
                    {buttons}
                </div>
            </div>
        </div>

    </>

}


export const MainLayout: React.FC<IMainLayout> = ({title, children, headerButtons}) => {
    return (
        <div className={s.body}>
            <SideBar/>
            <div className={s.content}>
                <ActionHeader title={title} buttons={headerButtons}/>
                <div className={s.content_children}>
                    {children}
                </div>
            </div>
        </div>
    );
};

