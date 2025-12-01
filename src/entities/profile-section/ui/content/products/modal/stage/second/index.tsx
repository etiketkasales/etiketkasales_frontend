"use client";
import React, { useMemo } from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectCatalogue } from "~/src/app/store/reducers/catalogue.slice";
import { convertParsedFiltersToInputs } from "~/src/entities/profile-section/lib/functions";

import classes from "./second-stage.module.scss";
import NewProductModalStage from "..";
import NewProductInputSeparator from "../../input-separator";
import { INewProduct } from "~/src/entities/profile-section/model";

interface Props {
  modalStage: number;
  onInputChange: (v: string, field: keyof INewProduct) => void;
  newProduct: INewProduct;
}

export default function NewProductSecondStage({
  modalStage,
  onInputChange,
  newProduct,
}: Props) {
  const { parsedFilters } = useAppSelector(selectCatalogue);
  const inputs = useMemo(() => {
    if (!parsedFilters) return [];
    return convertParsedFiltersToInputs(parsedFilters);
  }, [parsedFilters]);

  return (
    <NewProductModalStage
      isActive={modalStage === 2}
      className={`flex-column gap-3 ${classes.container}`}
    >
      {inputs &&
        inputs.map((item, index) => (
          <NewProductInputSeparator
            {...item}
            key={`${index}-${item.field}`}
            newProduct={newProduct}
            onChange={onInputChange}
          />
        ))}
    </NewProductModalStage>
  );
}
