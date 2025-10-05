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
        className={`flex-row align-center ${selectButtonClassName}`}
        onClick={() => {
          setActive(!active);
        }}
      >
        {HeadingIconLeft}
        <span className={`${selectedOptionClassName}`}>
          {activeOption ?? optionHolder}
        </span>
        <Icon className={active ? classes.active : ""} />
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
