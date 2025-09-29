import classNames from "classnames";
import React from "react";

import classes from "./search-media.module.scss";
import Search from "~/public/shared/search.svg";
import ChevronLeft from "~/public/etiketka-page/chevron-compact-left.svg";
import Button from "~/src/shared/ui/button";
import Container from "~/src/shared/ui/container/ui";
import TextInput from "~/src/shared/ui/inputs/text-input";
import AddToFavourites from "~/src/shared/ui/add-to-favourites/ui";

interface Props {
  className: string;
}

export default function SearchMedia({ className }: Props) {
  return (
    <div className="flex-row align-center gap-4">
      <Button
        typeButton="ghost"
        size="0"
        onClick={() => {
          history.back();
        }}
      >
        <ChevronLeft />
      </Button>
      <Container
        bgColor={"neutral-300"}
        className={classNames(classes.container, className)}
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
      </Container>
      <AddToFavourites />
    </div>
  );
}
