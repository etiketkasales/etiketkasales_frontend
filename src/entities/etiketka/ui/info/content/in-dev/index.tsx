import React from "react";

import classes from "./in-dev.module.scss";
import ImageContainer from "~/src/shared/ui/image-container/ui";

export default function EtiketkaInDev() {
  return (
    <div className={`${classes.container} flex-column align-center`}>
      <ImageContainer
        src={`/header/logo.png`}
        width={262}
        height={50}
        fixedSize
      />
      <h4 className="heading h4 text-neutral-grey-900">Раздел в разработке</h4>
    </div>
  );
}
