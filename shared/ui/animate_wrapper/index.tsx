import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IWithChildren, IWithClass } from "@types";

interface IAnimateWrapper extends IWithChildren, IWithClass {
  visible: boolean;
  dropdown?: boolean;
}

export const AnimateWrapper: React.FC<IAnimateWrapper> = ({
  visible,
  children,
  className,
  dropdown = true,
}) => {
  return (
    <AnimatePresence initial={true} exitBeforeEnter={true}>
      {visible && (
        <motion.div
          transition={{
            duration: 0.3,
          }}
          initial={{
            opacity: 0,
            ...(dropdown ? { height: "60px" } : {}),
          }}
          animate={{
            opacity: 1,
            ...(dropdown ? { height: "auto" } : {}),
          }}
          exit={{
            opacity: 0,
            ...(dropdown ? { height: "50px" } : {}),
          }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
