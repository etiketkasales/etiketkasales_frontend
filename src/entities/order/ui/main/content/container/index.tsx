import React from "react";
import classNames from "classnames";

import classes from "./order-container.module.scss";
import Container from "~/src/shared/ui/container/ui";
import { motion, TargetAndTransition, VariantLabels } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  asMotion?: boolean;
  variants?: {
    initial: TargetAndTransition | VariantLabels;
    animate: TargetAndTransition | VariantLabels;
    exit: TargetAndTransition | VariantLabels;
  };
  title?: string;
  titleClassName?: string;
}

export default function OrderContainer({
  children,
  className,
  asMotion,
  variants,
  title,
  titleClassName = "heading h6 text-neutral-1000",
}: Props) {
  if (asMotion) {
    return (
      <motion.div
        className={classNames(
          className,
          classes.wrapper,
          classes.motionWrapper,
        )}
        transition={{ duration: 0.5 }}
        {...variants}
      >
        {title && <h6 className={titleClassName}>{title}</h6>}
        {children}
      </motion.div>
    );
  }

  return (
    <Container className={classNames(className, classes.wrapper)}>
      {title && <h6 className={titleClassName}>{title}</h6>}
      {children}
    </Container>
  );
}
