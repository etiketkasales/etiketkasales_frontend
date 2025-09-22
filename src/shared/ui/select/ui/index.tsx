"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelect } from "../hook/useSelect.hook";

import classes from "./select.module.scss";
import SelectIcon from "~/public/shared/select-icon.svg";
import Button from "~/src/shared/ui/button";

interface Props<T> {
  selectOptions: Array<T>;
  currentOption: string;
  renderItem: (item: T, index: number) => React.ReactNode;
  optionsPosTop: number;
  optionsPosLeft?: number;
  optionsPosRight?: number;
  containerRelative?: boolean;
  className?: string;
  selectButtonClassName?: string;
  selectedOptionClassName?: string;
  optionsClassName?: string;
  doubledHeader?: boolean;
  optionHolder?: string;
  holder?: string;
  error?: string;
}

export default function Select<T>({
  selectOptions,
  currentOption,
  renderItem,
  optionsPosTop,
  optionsPosLeft,
  optionsPosRight,
  containerRelative = true,
  className,
  selectButtonClassName,
  selectedOptionClassName,
  optionsClassName,
  doubledHeader,
  optionHolder,
  holder,
  error,
}: Props<T>) {
  const { active, setActive, contentRef } = useSelect();

  return (
    <div
      ref={contentRef}
      className={`flex-column${containerRelative ? " relative" : ""} ${error ? classes.error : ""} ${className}`}
    >
      <div className="flex-column gap-1">
        <Button
          typeButton="ghost"
          size="0"
          onClick={() => {
            setActive(!active);
          }}
          className={`${selectButtonClassName} ${active ? classes.active : ""}`}
          needActiveScale={false}
          justifyCenter={false}
        >
          <div className="flex-row align-center space-between gap-1">
            {doubledHeader ? (
              <div className="flex-column flex-start">
                <span className="text-12 second-family gray-2 regular">
                  {holder}
                </span>
                <span className="black regular text-16 second-family nowrap-text">
                  {currentOption ? currentOption : optionHolder}
                </span>
              </div>
            ) : (
              <span className={`${selectedOptionClassName}`}>
                {currentOption ? currentOption : holder}
              </span>
            )}
            <SelectIcon />
          </div>
        </Button>
      </div>
      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ ease: "easeInOut", duration: 0.2 }}
            className={`${optionsClassName} ${classes.options} scrollbar flex-column gap-3`}
            style={{
              top: `calc(100% + ${optionsPosTop}px)`,
              minWidth: "fit-content",
            }}
            onClick={() => {
              setActive(false);
            }}
          >
            {selectOptions.map((item, index) => {
              return renderItem(item, index);
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
