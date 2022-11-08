import React, {useContext} from "react";
import s from "./style.module.scss";
import Download from "@assets/icons/download.svg";
import {IAttachmentModule} from "./types";
import {asset_prefix, DeleteWrapper} from "@box/shared";
import {ModeContext} from "@box/article_redactor";

export const AttachmentModule: React.FC<IAttachmentModule> = ({ data, controller }) => {
    const {mode} = useContext(ModeContext)


    const onDelete = (id: string) => {
        controller.deleteAttachment({
            id
        })
    }
  return (
      <DeleteWrapper active={mode=="redactor"} inline={true} onDelete={onDelete} meta={data.id}>
          <div className={s.body}>
              <a
                  href={ asset_prefix + data.src}
                  download={true}
                  rel={"noreferrer"}
                  target={"_blank"}
                  className={s.data}
              >
                  <Download />
                  <p>{data.name}</p>
              </a>
          </div>
      </DeleteWrapper>
  );
};
