import React from "react";
import s from "./style.module.scss";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { hideAlert } from "@box/entities";
import { Alert as MantineAlert } from "@mantine/core";
import {useTypedDispatch, useTypedSelector} from "@box/shared";

const AlertNowrap = () => {
  const { type, text, visible } = useTypedSelector((state) => state.alert);
  const dispatch = useTypedDispatch();
  const hide = () => {
    dispatch(hideAlert({}));
  };
  return (
    <AnimatePresence initial={true} exitBeforeEnter={true}>
      {visible && (
        <motion.div
          transition={{
            duration: 0.3,
          }}
          initial={{
            right: "-600px",
          }}
          animate={{
            right:
              typeof window !== "undefined" && window?.innerWidth > 600
                ? "20px"
                : 0,
          }}
          exit={{
            right: "-600px",
          }}
          className={classNames(s.body, { [s.body_error]: type == "error" })}
        >
          <MantineAlert
            onClose={hide}
            withCloseButton={true}
            title={type == "success" ? "Успешно" : "Ошибка"}
            color={type == "success" ? "green" : "red"}
          >
            <p>{text}</p>
          </MantineAlert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const Alert = React.memo(AlertNowrap);
