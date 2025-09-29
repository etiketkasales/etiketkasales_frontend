"use client";
import React from "react";
import { useWindowSize } from "react-use";

import classes from "./search.module.scss";
import Search from "~/public/shared/search.svg";
import TextInput from "~/src/shared/ui/inputs/text-input";
import SearchMedia from "./media";

interface Props {
  className: string;
  isEtiketkaPage: boolean;
}

export default function HeaderBottomSearch({
  className,
  isEtiketkaPage,
}: Props) {
  const { width } = useWindowSize();
  if (isEtiketkaPage && width <= 768)
    return <SearchMedia className={className} />;

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
