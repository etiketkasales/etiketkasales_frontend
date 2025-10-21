"use client";
import React, { useState } from "react";

import classes from "./characteristics.module.scss";
import CharacteristicsButton from "./button";
import { ISpecification } from "~/src/entities/etiketka/model";
import Specifications from "../../../specifications";

interface Props {
  characteristics: ISpecification[];
  loaded: boolean;
}

export default function CharacteristicsSection({ characteristics }: Props) {
  const [viewAll, setViewAll] = useState<boolean>(false);

  return (
    <div className={`flex-column gap-3 ${classes.container}`}>
      <Specifications
        specs={characteristics.slice(0, viewAll ? characteristics.length : 5)}
      />
      {characteristics.length > 5 && (
        <CharacteristicsButton viewAll={viewAll} setViewAll={setViewAll} />
      )}
    </div>
  );
}
