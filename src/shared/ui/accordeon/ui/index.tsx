"use client";
import React, { RefObject } from "react";
import classNames from "classnames";
import { useAccordeon } from "../lib/hooks/useAccordeon.hooks";

import classes from "./accordeon.module.scss";
import Arrow from "~/public/shared/chevron-compact-down.svg";
import { motion, AnimatePresence } from "framer-motion";

interface Props<T extends HTMLElement> {
  title: string;
  children: React.ReactNode;
  clickRef?: RefObject<T | null>;
  className?: string;
  classNameTitle?: string;
  classNameChildren?: string;
  clickOutsideControl?: boolean;
  style?: React.CSSProperties;
  defaultOpen?: boolean;
}

export default function Accordeon<T extends HTMLElement>({
  className,
  children,
  title,
  clickRef,
  classNameTitle,
  clickOutsideControl = true,
  classNameChildren,
  style,
  defaultOpen = false,
}: Props<T>) {
  const { open, handleClick, ref } = useAccordeon(
    defaultOpen,
    clickRef,
    clickOutsideControl,
  );

  return (
    <div
      ref={ref}
      className={classNames(className, classes.container, `flex-column`, {
        [classes.containerClosed]: !open,
      })}
      style={style}
    >
      <div
        role="button"
        onClick={handleClick}
        className={classNames(
          "flex-row space-between align-center pointer no-select gap-5",
        )}
      >
        <p className={classNames(classNameTitle)}>{title}</p>
        <Arrow
          className={classNames(classes.arrow, {
            [classes.open]: open,
          })}
        />
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.4 }}
            style={{ transformOrigin: "top center", overflowY: "hidden" }}
            className={classNameChildren}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
