"use client";
import React from "react";
import { useEtiketka } from "~/src/entities/etiketka/lib/hooks/useEtiketka.hook";
import { useInitializeEtiketka } from "~/src/entities/etiketka/lib/hooks/useInitializeEtiketka.hook";

import classes from "./etiketka.module.scss";
import EtiketkaMain from "./main";
import EtiketkaInfo from "./info";
import ObjectUtils from "~/src/shared/lib/utils/object.utils";
import { etiketkaSkeleton } from "../model/etiketka.skeleton";

export default function EtiketkaSection() {
  const { etiketkaInfo, loading, error, handleGetEtiketka, specs } =
    useEtiketka();
  useInitializeEtiketka({ etiketkaInfo });

  const commonProps = {
    loading,
    error,
  };

  if (ObjectUtils.checkIfSkeleton(etiketkaInfo, etiketkaSkeleton)) return null;

  return (
    <section className={`flex-column gap-5 ${classes.container}`}>
      <EtiketkaMain
        {...commonProps}
        characteristics={specs}
        item={etiketkaInfo}
      />
      <EtiketkaInfo />
    </section>
  );
}
