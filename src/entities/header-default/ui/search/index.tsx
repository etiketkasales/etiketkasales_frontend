import React from "react";
import classNames from "classnames";

import classes from "./header-search.module.scss";
import RightIcon from "~/public/shared/search.svg";
import TextInput from "~/src/shared/ui/inputs/text-input";

interface Props {
  classNameInput?: string;
  className?: string;
}

export default function HeaderSearch({ classNameInput, className }: Props) {
  return (
    <TextInput
      placeholder="Поиск по сайту"
      classNameLabel={classNames(
        classes.input,
        classNameInput,
        "text-neutral-900 text-body l",
      )}
      wrapperClassName={classNames(className)}
      name="search-etiketka"
      id="search-etiketka"
      RightIcon={RightIcon}
      iconButtonClassName={classes.icon}
    />
  );
}
