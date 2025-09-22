"use client";
import React, { useState } from "react";

import classes from "./info.module.scss";
import EtiketkaMainContainer from "~/src/entities/etiketka/ui/container";
import EtiketkaInfoButtons from "./buttons";
import EtiketkaInfoContent from "./content";
import { CurrentIndexI } from "../../model/etiketka.interface";

export default function EtiketkaInfo() {
  const [currentIndex, setCurrentIndex] = useState<CurrentIndexI>("descr");

  return (
    <EtiketkaMainContainer
      className={`padding-40 flex-start flex-row gap-100 ${classes.container}`}
    >
      <EtiketkaInfoButtons
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      <EtiketkaInfoContent currentIndex={currentIndex} />
    </EtiketkaMainContainer>
  );
}
