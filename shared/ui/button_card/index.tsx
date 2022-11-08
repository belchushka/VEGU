import React from "react";
import s from "./style.module.scss";
import classNames from "classnames";
import {IButtonCard} from "./types";


export const ButtonCard: React.FC<IButtonCard> = ({
                                                      title,
                                                      subtitle,
                                                      className,
                                                      buttons
                                                  }) => {
    return (
        <div className={classNames(s.button_card, className)}>
            <div className={s.button_card_content}>
                <h5>{title}</h5>
                <p>{subtitle}</p>
            </div>
            <div className={s.button_card_buttons}>
                {buttons}
            </div>
        </div>
    );
};

