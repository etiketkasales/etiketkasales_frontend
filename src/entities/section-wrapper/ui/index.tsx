"use client";
import classNames from "classnames";

import SectionWrapperBody from "./body";
import SectionWrapperHeading from "./heading";
import { IEtiketka } from "~/src/entities/etiketka/model";

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
}: Props) {
  if (!Array.isArray(arrayProducts)) return null;
  return (
    <section
      className={classNames(`section-wrapper flex-column gap-6`, className)}
    >
      <SectionWrapperHeading title={title} categoryId={categoryId} />
      <SectionWrapperBody arrayProducts={arrayProducts} />
    </section>
  );
}
