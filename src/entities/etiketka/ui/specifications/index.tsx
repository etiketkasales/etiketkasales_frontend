import React from "react";
import classNames from "classnames";

import SpecsItem from "./item";
import { ISpecification } from "~/src/entities/etiketka/model/etiketka.interface";

interface Props {
  specs: ISpecification[];
  className?: string;
}

export default function Specifications({ className, specs }: Props) {
  if (!Array.isArray(specs)) return null;

  return (
    <ul className={classNames(`flex-column gap-3`, className)}>
      {specs.map((item, index) => (
        <SpecsItem key={item.value + index} {...item} />
      ))}
    </ul>
  );
}
