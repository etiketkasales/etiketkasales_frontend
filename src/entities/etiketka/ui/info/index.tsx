"use client";
import React, { useEffect, useState } from "react";
import classNames from "classnames";

import classes from "./info.module.scss";
import EtiketkaMainContainer from "~/src/entities/etiketka/ui/container";
import EtiketkaInfoButtons from "./buttons";
import EtiketkaInfoContent from "./content";
import { CurrentIndexI, IEtiketka } from "../../model";

interface Props {
  item: IEtiketka;
}

export default function EtiketkaInfo({ item }: Props) {
  const [isInDev, setIsInDev] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<CurrentIndexI>("descr");

  useEffect(() => {
    setIsInDev(currentIndex === "seller" || currentIndex === "sertificates");
  }, [currentIndex]);

  return (
    <EtiketkaMainContainer
      className={classNames(`flex-start flex-row`, classes.container, {
        [classes.inDev]: isInDev,
      })}
    >
      <EtiketkaInfoButtons
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      <EtiketkaInfoContent currentIndex={currentIndex} item={item} />
    </EtiketkaMainContainer>
  );
}
