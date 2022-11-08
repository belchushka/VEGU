import {ICourse} from "@box/entities";
import {ReactElement, ReactNode} from "react";

export interface ICourseCard {
    className?: string;
    showPrice?: boolean;
    data: ICourse;
    buttons?: ReactNode | ReactElement
}
