"use client";

import classNames from "classnames";
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
  isSearchable?: boolean;
  onSearch?: (v: string) => void;
}

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
    error,
    isSearchable = false,
    onSearch,
  } = props;

  const {
    active,
    setActive,
    contentRef,
    buttonRef,
    inputRef,
    inputValue,
    setInputValue,
  } = useSelect({ activeOption });

  const displayValue = activeOption || optionHolder;

  return (
    <div
      className={classNames(
        `${containerRelative ? "relative" : ""} pointer flex-column`,
        className,
        error && classes.error,
      )}
    >
      <Button
        ref={buttonRef}
        typeButton="ghost"
        size="0"
        justifyCenter={false}
        needActiveScale={false}
        className={classNames(
          `grid-column align-center`,
          !isSearchable && "space-between",
          isSearchable && classes.searchable,
          selectButtonClassName,
          classes.button,
        )}
        onClick={() => {
          setActive(!active);
          if (inputRef.current) inputRef.current.focus();
        }}
      >
        {HeadingIconLeft}
        <div
          className={classNames(
            `flex-column flex-start`,
            selectedOptionClassName,
          )}
        >
          {doubleHeader && (
            <span className={doubleHeaderClassName}>{doubleHeader}</span>
          )}
          {isSearchable ? (
            <input
              type="text"
              className={classNames(classes.input, error && classes.inputError)}
              placeholder={optionHolder}
              onChange={(e) => {
                onSearch?.(e.target.value);
                setInputValue(e.target.value);
              }}
              name={optionHolder}
              ref={inputRef}
              value={inputValue}
            />
          ) : (
            <span className={classes.selectedOption}>{displayValue}</span>
          )}
        </div>
        {HeadingIconRight || (
          <Icon
            className={classNames(
              active && classes.active,
              isSearchable && classes.iconSearchable,
            )}
          />
        )}
      </Button>
      {error && (
        <span className={`text-body xs text-red-500 ${classes.errorText}`}>
          {error}
        </span>
      )}

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
