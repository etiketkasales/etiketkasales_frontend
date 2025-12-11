"use client";
import React from "react";

import classes from "./second-stage.module.scss";
import NewProductModalStage from "..";
import NewProductInputSeparator from "../../input-separator";
import LoaderCircle from "~/src/shared/ui/loader-circle";
import { INewProduct } from "~/src/entities/profile-section/model";
import { MessageI } from "~/src/shared/model";
import { useGetFilters } from "~/src/entities/profile-section/lib/hooks";

interface Props {
  modalStage: number;
  onInputChange: (v: string, field: keyof INewProduct) => void;
  newProduct: INewProduct;
  error: MessageI | null;
}

export default function NewProductSecondStage({
  modalStage,
  onInputChange,
  newProduct,
  error,
}: Props) {
  const { filtersToMap, loading, error: loadingError } = useGetFilters();

  const noFilters = !filtersToMap.length || loadingError;

  return (
    <NewProductModalStage
      isActive={modalStage === 2}
      className={`flex-column gap-3 ${classes.container}`}
    >
      {loading && <LoaderCircle radius={0} />}
      {noFilters && !loading ? (
        filtersToMap.map((item, index) => (
          <NewProductInputSeparator
            {...item}
            key={`${index}-${item.field}`}
            newProduct={newProduct}
            onChange={onInputChange}
            error={error}
          />
        ))
      ) : (
        <span className={`text-body m text-neutral-1000`}>
          Не удалось найти подходящих фильтров
        </span>
      )}
    </NewProductModalStage>
  );
}
