import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUpdateSearchParams } from "~/src/shared/lib/hooks/useUpdateSearchParams.hook";

import { RangeInputType } from "../../model";

export interface IRange {
  max: string;
  min: string;
}

interface Props {
  filterName: string;
  filterTitle: string;
  minLimit: number;
  maxLimit: number;
}

export const useFiltersRange = ({ filterName, minLimit, maxLimit }: Props) => {
  const searchParams = useSearchParams();
  const [rangeValue, setRangeValue] = useState<IRange>({
    min: "",
    max: "",
  });
  const [isImportant, setIsImportant] = useState<boolean>(false);
  const maxTimeout = useRef<ReturnType<typeof setTimeout>>(null);
  const minTimeout = useRef<ReturnType<typeof setTimeout>>(null);
  const updateSearchParams = useUpdateSearchParams();

  const updateParamsLocal = useCallback(
    (
      type: RangeInputType | RangeInputType[],
      value: string | undefined,
      action?: "multiClear" | "set",
    ) => {
      const key = Array.isArray(type)
        ? type.map((t) => t + "_" + filterName)
        : type + "_" + filterName;
      updateSearchParams({
        key,
        value,
        action: action || "set",
        routerReplace: true,
      });
    },
    [filterName, updateSearchParams],
  );

  const onInputChange = useCallback(
    (type: RangeInputType, value: string) => {
      const numValue = Number(value);
      if (isNaN(numValue)) return;
      setIsImportant(true);
      setRangeValue((prev) => ({
        ...prev,
        [type]: value.toString(),
      }));

      if (type === "min") {
        if (minTimeout.current) clearTimeout(minTimeout.current);
        minTimeout.current = setTimeout(() => {
          updateParamsLocal(type, value);
        }, 200);
      } else if (type === "max") {
        if (maxTimeout.current) clearTimeout(maxTimeout.current);
        maxTimeout.current = setTimeout(() => {
          updateParamsLocal(type, value);
        }, 200);
      }
    },
    [updateParamsLocal],
  );

  const clearRange = useCallback(() => {
    updateParamsLocal(["max", "min"], "", "multiClear");
  }, [updateParamsLocal]);

  useEffect(() => {
    const minParam = searchParams.get(`min_${filterName}`);
    const maxParam = searchParams.get(`max_${filterName}`);

    const [numMax, numMin] = [Number(maxParam), Number(minParam)];

    const newValue: IRange = {
      min: isNaN(numMin) || numMin <= 0 ? "" : numMin.toString(),
      max: isNaN(numMax) || numMax <= 0 ? "" : numMax.toString(),
    };
    setRangeValue((prev) => {
      if (prev.min === newValue.min && prev.max === newValue.max) return prev;
      return newValue;
    });
  }, [searchParams, minLimit, maxLimit, filterName]);

  useEffect(() => {
    if (!rangeValue.min && !rangeValue.max) {
      setIsImportant(false);
    } else {
      setIsImportant(true);
    }
  }, [rangeValue]);

  useEffect(() => {
    return () => {
      if (maxTimeout.current) clearTimeout(maxTimeout.current);
      if (minTimeout.current) clearTimeout(minTimeout.current);
    };
  }, []);

  return {
    rangeValue,
    isImportant,
    clearRange,
    onInputChange,
  };
};
