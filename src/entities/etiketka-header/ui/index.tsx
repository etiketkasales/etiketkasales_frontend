import React, { useRef } from "react";

import classes from "./etiketka-header.module.scss";
import BackIcon from "~/public/header/back-icon.svg";
import HeaderDefault, { IHeaderDefaultProps } from "../../header-default/ui";
import Button from "~/src/shared/ui/button";
import HeaderSearch from "../../header-default/ui/search";

interface Props extends IHeaderDefaultProps {
  addToFavourites?: () => void;
}

export default function EtiketkaHeader({ addToFavourites, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <HeaderDefault
      mediaBgColor="neutral-100"
      CustomMediaHeader={
        <div ref={ref} className={`flex-row align-center gap-4 space-between`}>
          <Button typeButton="ghost" onClick={() => history.back()}>
            <BackIcon />
          </Button>
          <HeaderSearch />
        </div>
      }
      customRefMedia={ref}
      className={classes.container}
      {...rest}
    />
  );
}
