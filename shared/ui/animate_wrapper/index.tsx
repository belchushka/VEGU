import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IWithChildren, IWithClass } from "@types";

interface IAnimateWrapper extends IWithChildren, IWithClass {
  visible: boolean;
}

export const AnimateWrapper: React.FC<IAnimateWrapper> = ({
  visible,
  children,
  className,
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
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
