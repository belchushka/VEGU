import React from "react";

export interface ISideBarItem {
    icon: React.FC,
    text: string,
    route: string,
    permissions: Array<any>
}


export interface ISideBarItemComponent {
    icon: React.FC;
    text: string;
    active: boolean;
    onClick: () => void;
}
