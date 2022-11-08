import React from 'react';
import {IFilter} from "./types";
import s from "./style.module.scss"
import Arrow from "@assets/icons/filter_arrow.svg"
import {Checkbox} from "@mantine/core";
import classNames from "classnames";
import {useBoolean} from "@box/shared";

export function Filter<T>({
    fields,
    title,
    onSelect,
    selected= [],
    name
                                          }: IFilter & {name: T, onSelect:(name: T, field: string)=>void}) {
    const handleSelect= (queryParam: string)=>{
        onSelect(name, queryParam)
    }
    const {value, toggle} = useBoolean(false)
    return (
        <div className={s.filter}>
            <div className={classNames(s.filter_header, {[s.filter_header_active]: value})} onClick={toggle}>
                <p>{title}</p>
                <Arrow className={s.filter_header_arrow}/>
            </div>
            <div className={classNames(s.filter_fields, {[s.filter_fields_opened]: value})}>
                {fields.map(field=>{
                    return <div key={field.queryParam} className={classNames(s.filter_fields_field, {[s.filter_fields_field_selected]:selected.includes(field.queryParam)})} onClick={()=>handleSelect(field.queryParam)}>
                        <Checkbox checked={selected.includes(field.queryParam)} color={"green"}/>
                        <p>{field.title}</p>
                    </div>
                })}
            </div>
        </div>
    );
};
