import React from "react";
import classNames from "classnames";
import { useModal } from "~/src/shared/lib/hooks/useModal.hook";

import classes from "./fs-modal.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import FullscreenModalTitle from "./title";
import { IModalBaseProps } from "~/src/shared/model";

interface Props extends IModalBaseProps {
  title: string;
  classNameWrapper?: string;
  classNameTitle?: string;
  bottomChild?: React.ReactNode;
  classNameBottomChild?: string;
}

export default function FullscreenModal({
  isOpen,
  onClose,
  children,
  title,
  classNameWrapper,
  classNameTitle,
  bottomChild,
  classNameBottomChild,
}: Props) {
  const { contentRef } = useModal({ isOpen, onClose });

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          ref={contentRef}
          className={classNames(
            classes.wrapper,
            `flex-column gap-3 ${classNameWrapper || "container-neutral-300"}`,
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FullscreenModalTitle
            title={title}
            onClose={onClose}
            className={classNameTitle}
          />
          {children}
          {bottomChild && (
            <div
              className={classNames(
                classes.bottomContainer,
                classNameBottomChild,
              )}
            >
              {bottomChild}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
