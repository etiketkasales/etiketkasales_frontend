import { useCallback, useState } from "react";

import { IEtiketka } from "~/src/entities/etiketka/model";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import { MessageI } from "~/src/shared/model/shared.interface";
import { getProductById } from "../api/etiketka.api";

interface Props {
  initProductInfo: IEtiketka;
}

export const useEtiketka = ({ initProductInfo }: Props) => {
  const [productInfo, setProductInfo] = useState<IEtiketka>(initProductInfo);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<MessageI | null>(null);

  const errorHandler = (message: string, field: string) => {
    setError({
      message,
      type: "error",
      field,
    });
    return;
  };

  const updateInfo = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        const res = await getProductById(productInfo.id);
        setProductInfo(res);
      },
    });
  }, [productInfo.id]);

  return {
    loading,
    error,
    productInfo,
    updateInfo,
  };
};
