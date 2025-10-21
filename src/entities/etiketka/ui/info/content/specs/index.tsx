import React from "react";

import classes from "./info-specs.module.scss";
import { ISpecification } from "~/src/entities/etiketka/model";
import Specifications from "../../../specifications";

interface Props {
  specs: ISpecification[];
}

export default function EtiketkaInfoSpecs({ specs }: Props) {
  return (
    <div className={`flex-column gap-4 ${classes.container}`}>
      <h3 className="heading h6 text-neutral-grey-900">Все характеристики</h3>
      <Specifications specs={specs} />
    </div>
  );
}
