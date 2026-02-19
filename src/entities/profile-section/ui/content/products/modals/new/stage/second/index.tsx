"use client";
import { useEffect } from "react";
import { useGetFilters } from "~/src/entities/profile-section/lib/hooks";

import NewProductModalStage from "..";
import NewProductInputSeparator from "../../input-separator";
import Loader from "~/src/shared/ui/loader";
import { INewProduct } from "~/src/entities/profile-section/model";
import { MessageI } from "~/src/shared/model";

interface Props {
  modalStage: number;
  onInputChange: (v: string, field: keyof INewProduct) => void;
  newProduct: INewProduct;
  error: MessageI | null;
  setRequiredFields: (requiredFields: (keyof INewProduct)[]) => void;
}

export default function NewProductSecondStage({
  modalStage,
  onInputChange,
  newProduct,
  error,
  setRequiredFields,
}: Props) {
  const {
    filtersToMap,
    loading,
    error: loadingError,
  } = useGetFilters({ setRequiredFields });

  const noFilters = !filtersToMap.length || loadingError !== null;

  return (
    <NewProductModalStage
      isActive={modalStage === 2}
      className={`flex-column gap-3`}
    >
      {loading && <Loader radius={0} />}
      {!noFilters ? (
        filtersToMap.map((item, index) => (
          <NewProductInputSeparator
            {...item}
            key={`${index}-${item.field}`}
            newProduct={newProduct}
            onChange={onInputChange}
            error={error}
          />
        ))
      ) : !loading ? (
        <span className={`text-body m text-neutral-1000`}>
          Не удалось найти фильтров для продолжения
        </span>
      ) : null}
    </NewProductModalStage>
  );
}
