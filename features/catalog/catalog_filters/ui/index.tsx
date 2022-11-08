import React from 'react';
import s from "./style.module.scss"
import {Filter, useFetch, useTypedDispatch, useTypedSelector} from "@box/shared";
import {clearCoursesFilters, getCourseTypes, setCoursesFilter} from "@box/entities";
import {ICatalogFilters} from "./types";
import classNames from "classnames";

export const CatalogFilters: React.FC<ICatalogFilters> = ({
    className
                                                          }) => {
    const dispatch = useTypedDispatch()
    const {loading} = useFetch({
        action: () => getCourseTypes()
    })
    const {filter: filters, types} = useTypedSelector(state => state.course)
    const onSelect = (name: "courseTypes", field: string) => {
        if (filters[name].includes(field)){
            dispatch(setCoursesFilter({
                key: name,
                value: filters[name].filter(el=>el!==field)
            }))
            return
        }
        dispatch(setCoursesFilter({
            key: name,
            value: [...filters[name], field]
        }))
    }
    console.log(filters);
    const clear = () => dispatch(clearCoursesFilters())
    return (
        <div className={classNames(s.catalog_filters,className)}>
            <div className={s.catalog_filters_header}>
                <p>Фильтры</p>
                <p onClick={clear}>Очистить</p>
            </div>
            <div>
                <Filter<"courseTypes">
                    name={"courseTypes"} title={"Тип обучения"} fields={types.map(el => {
                    return {
                        title: el.name,
                        queryParam: el.id
                    }
                })} onSelect={onSelect}
                    selected={filters.courseTypes}/>
            </div>
        </div>
    );
};
