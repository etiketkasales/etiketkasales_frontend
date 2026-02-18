"use client";
import classNames from "classnames";
import { useModal } from "~/src/shared/ui/modals/lib/hooks";

import classes from "./modal.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import Container from "~/src/shared/ui/container/ui";
import ModalTitle from "../title";
import Loader from "../../../loader";
import { IModalBaseProps } from "~/src/shared/ui/modals/model";

interface Props extends IModalBaseProps {
  wrapperClassName?: string;
  containerClassName?: string;
  bgColor?: string;
  titleClassName?: string;
  titleTextClassName?: string;
  needBackButton?: boolean;
  backButtonClassName?: string;
  loading?: boolean;
  loaderRadius?: number;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  customClickOutside,
  wrapperClassName,
  containerClassName,
  bgColor,
  titleClassName,
  titleTextClassName,
  needBackButton = false,
  backButtonClassName,
  loading = false,
  loaderRadius = 20,
}: Props) {
  const { contentRef } = useModal({ isOpen, onClose, customClickOutside });

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          className={classNames(wrapperClassName, classes.wrapper)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Container
            ref={contentRef}
            bgColor={bgColor}
            className={classNames(containerClassName, "relative scrollbar")}
          >
            {loading && <Loader radius={loaderRadius} />}
            <ModalTitle
              title={title}
              onClose={onClose}
              className={titleClassName}
              textClassName={titleTextClassName}
              needButton={needBackButton}
              backButtonClassName={backButtonClassName}
            />
            {children}
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
