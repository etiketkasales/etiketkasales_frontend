"use client";
import React from "react";
import { useEtiketka } from "~/src/entities/etiketka/lib/hooks/useEtiketka.hook";

import classes from "./etiketka.module.scss";
import EtiketkaMain from "./main";
import EtiketkaInfo from "./info";
import ObjectUtils from "~/src/shared/lib/utils/object.utils";
import { productSkeleton } from "../model/etiketka.skeleton";
import { IEtiketka } from "../model/etiketka.interface";

interface Props {
  initProductInfo: IEtiketka;
}

export default function EtiketkaSection({ initProductInfo }: Props) {
  const { etiketkaInfo, loading, error, handleGetEtiketka, specs } =
    useEtiketka();

  const commonProps = {
    loading,
    error,
  };

  if (ObjectUtils.checkIfSkeleton(initProductInfo, productSkeleton))
    return null;

  return (
    <section className={`flex-column gap-5 ${classes.container}`}>
      <EtiketkaMain {...commonProps} item={initProductInfo} />
      <EtiketkaInfo initProductInfo={initProductInfo} />
    </section>
  );
}
