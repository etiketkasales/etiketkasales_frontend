import React from "react";

import classes from "./select-options.module.scss";
import { motion, AnimatePresence } from "framer-motion";

interface Props<T> {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  optionsClassName: string;
  options: T[];
  optionsFromBottom: boolean;
  optionsPosTop: number;
  optionsPosLeft?: number;
  optionsPosRight?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export default function SelectOptions<T>({
  active,
  setActive,
  contentRef,
  options,
  optionsClassName,
  optionsFromBottom,
  optionsPosTop,
  optionsPosLeft,
  optionsPosRight,
  renderItem,
}: Props<T>) {
  return (
    <AnimatePresence initial={false}>
      {active && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.2 }}
          ref={contentRef}
          style={{
            top: optionsFromBottom
              ? undefined
              : `calc(100% + ${optionsPosTop}px)`,
            bottom: optionsFromBottom
              ? `calc(100% + ${optionsPosTop}px)`
              : undefined,
            left: optionsPosLeft ? `${optionsPosLeft}px` : undefined,
            right: optionsPosRight ? `${optionsPosRight}px` : undefined,
            transformOrigin: optionsFromBottom ? "bottom left" : "top left",
          }}
          className={`${optionsClassName} flex-column scrollbar absolute ${classes.options}`}
          onClick={() => setActive(false)}
        >
          {options.map((item, index) => {
            return renderItem(item, index);
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
