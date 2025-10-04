import React from "react";
import classNames from "classnames";

import classes from "./header-search.module.scss";
import RightIcon from "~/public/shared/search.svg";
import Container from "~/src/shared/ui/container/ui";
import TextInput from "~/src/shared/ui/inputs/text-input";

export default function HeaderSearch() {
  return (
    <Container
      bgColor={"neutral-300"}
      className={classNames(`flex-row gap-6px align-center`, classes.container)}
    >
      <TextInput
        placeholder="Поиск по сайту"
        classNameLabel={classNames(
          classes.input,
          "text-neutral-900 text-body l",
        )}
        name="search-etiketka"
        id="search-etiketka"
      />
      <RightIcon className={classes.icon} />
    </Container>
  );
}
