"use client";
import React from "react";

import SectionWrapperBody from "./body";
import SectionWrapperHeading from "./heading";
import { IEtiketka } from "~/src/entities/etiketka/model/etiketka.interface";

interface Props {
  arrayProducts: Array<IEtiketka>;
  title: string;
  categoryId: number;
  className?: string;
  loading: boolean;
}

export default function SectionWrapper({
  arrayProducts,
  title,
  categoryId,
  className,
  loading,
}: Props) {
  if (!arrayProducts || !arrayProducts.length) return null;
  return (
    <section className={`section-wrapper flex-column gap-6 ${className}`}>
      <SectionWrapperHeading title={title} categoryId={categoryId} />
      <SectionWrapperBody arrayProducts={arrayProducts} />
    </section>
  );
}
