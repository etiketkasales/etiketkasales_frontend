"use client";
import React from "react";
import { useWindowSize } from "react-use";

import classes from "./search.module.scss";
import ChevronLeft from "~/public/etiketka-page/chevron-compact-left.svg";
import Search from "~/public/shared/search.svg";
import TextInput from "~/src/shared/ui/inputs/text-input";
import Button from "~/src/shared/ui/button";
import AddToFavourites from "~/src/shared/ui/add-to-favourites/ui";
import Wrapper from "~/src/shared/ui/wrapper";

interface Props {
  className: string;
  isEtiketkaPage: boolean;
}

export default function HeaderBottomSearch({
  className,
  isEtiketkaPage,
}: Props) {
  const { width } = useWindowSize();
  if (isEtiketkaPage && width <= 768) {
    return (
      <div className="flex-row align-center gap-4">
        {
          <Button
            typeButton="ghost"
            size="0"
            onClick={() => {
              history.back();
            }}
          >
            <ChevronLeft />
          </Button>
        }
        <Wrapper
          padding={"10px"}
          radius={12}
          color={"neutral-300"}
          className={`${classes.container} ${className}`}
        >
          <TextInput
            RightIcon={Search}
            rightIconClick={() => {}}
            gap={6}
            name="search-etiketka"
            title="Поиск товаров"
            placeholder="Поиск по сайту"
            classNameInput={`${classes.input} black text-16 second-family regular`}
          />
        </Wrapper>
        {isEtiketkaPage && width <= 768 && <AddToFavourites />}
      </div>
    );
  }
  return (
    <div
      className={`padding-10 radius-12 bg-gray-container ${classes.container} ${className}`}
    >
      <TextInput
        RightIcon={Search}
        rightIconClick={() => {}}
        gap={6}
        name="search"
        title="Поиск товаров"
        placeholder="Поиск по сайту"
        classNameInput={`${classes.input} black text-16 second-family regular`}
      />
    </div>
  );
}
