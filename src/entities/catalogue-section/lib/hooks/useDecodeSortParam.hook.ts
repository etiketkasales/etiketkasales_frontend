import { useCallback } from "react";

export const useDecodeSortParam = () => {
  return useCallback((paramValue: string) => {
    const sortValues = decodeURIComponent(paramValue).split(",");
    const sortBy = sortValues[0].split("=")[1] || "";
    const sortOrder = sortValues[1].split("=")[1] || "";

    return {
      sortBy,
      sortOrder,
    };
  }, []);
};
