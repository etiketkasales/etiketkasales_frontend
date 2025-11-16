"use client";
import React from "react";
import { useSelect } from "../hook/useSelect.hook";

import classes from "./select.module.scss";
import Icon from "~/public/select/icon.svg";
import Button from "~/src/shared/ui/button";
import SelectOptions from "./options";

interface Props<T> {
  activeOption: string;
  options: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  optionsPosTop: number;
  optionsFromBottom?: boolean;
  optionsPosLeft?: number;
  optionsPosRight?: number;
  containerRelative?: boolean;
  className?: string;
  selectButtonClassName?: string;
  selectedOptionClassName?: string;
  optionsClassName?: string;
  optionHolder?: string;
  error?: string | null;
  HeadingIconLeft?: React.ReactNode;
  HeadingIconRight?: React.ReactNode;
  doubleHeader?: string;
  doubleHeaderClassName?: string;
}

// TO DO: добавить обработку двойного хедера у кнопки

export default function Select<T>(props: Props<T>) {
  const {
    options,
    activeOption,
    renderItem,
    optionsPosTop,
    optionsPosLeft,
    optionsPosRight,
    containerRelative = true,
    className = "",
    selectButtonClassName = "",
    selectedOptionClassName = "",
    optionsClassName = "",
    optionHolder,
    optionsFromBottom = false,
    HeadingIconLeft = null,
    HeadingIconRight = null,
    doubleHeader,
    doubleHeaderClassName = "text-body xs text-neutral-700",
  } = props;
  const { active, setActive, contentRef, buttonRef } = useSelect();

  return (
    <div
      className={`${containerRelative ? "relative" : ""} pointer ${className}`}
    >
      <Button
        ref={buttonRef}
        typeButton="ghost"
        size="0"
        justifyCenter={false}
        needActiveScale={false}
        className={`grid-column space-between align-center ${classes.button} ${selectButtonClassName}`}
        onClick={() => {
          setActive(!active);
        }}
      >
        {HeadingIconLeft}
        <div className={`flex-column flex-start ${selectedOptionClassName}`}>
          {doubleHeader && (
            <span className={doubleHeaderClassName}>{doubleHeader}</span>
          )}
          <span className={classes.selectedOption}>
            {activeOption || optionHolder}
          </span>
        </div>
        {HeadingIconRight || <Icon className={active ? classes.active : ""} />}
      </Button>
      <SelectOptions
        active={active}
        setActive={setActive}
        options={options}
        contentRef={contentRef}
        optionsClassName={optionsClassName}
        optionsFromBottom={optionsFromBottom}
        optionsPosTop={optionsPosTop}
        optionsPosLeft={optionsPosLeft}
        optionsPosRight={optionsPosRight}
        renderItem={renderItem}
      />
    </div>
  );
}
