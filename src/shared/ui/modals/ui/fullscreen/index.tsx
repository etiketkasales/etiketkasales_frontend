import classNames from "classnames";
import { useModal } from "~/src/shared/ui/modals/lib/hooks";

import classes from "./fs-modal.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import ModalTitle from "../title";
import { IModalBaseProps } from "~/src/shared/ui/modals/model";

interface Props extends IModalBaseProps {
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
          <ModalTitle
            title={title}
            onClose={onClose}
            className={classNames(classNameTitle, classes.title)}
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
