"use client";
import React from "react";
import { useEtiketka } from "~/src/entities/etiketka/lib/hooks/useEtiketka.hook";
import ObjectUtils from "~/src/shared/lib/utils/object.utils";

import classes from "./etiketka.module.scss";
import EtiketkaMain from "./main";
import EtiketkaInfo from "./info";
import { productSkeleton } from "../model/etiketka.skeleton";
import { IEtiketka } from "../model";

interface Props {
  initProductInfo: IEtiketka;
}

export default function EtiketkaSection({ initProductInfo }: Props) {
  const { loading, error, productInfo, updateInfo } = useEtiketka({
    initProductInfo,
  });

  const commonProps = {
    updateInfo,
    loading,
    error,
  };

  if (ObjectUtils.checkIfSkeleton(initProductInfo, productSkeleton))
    return null;

  return (
    <section className={`flex-column gap-5 ${classes.container}`}>
      <EtiketkaMain {...commonProps} item={productInfo} />
      <EtiketkaInfo item={productInfo} />
    </section>
  );
}
