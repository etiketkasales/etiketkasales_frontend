import { useCallback, useState } from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";
import { getProductById } from "../api/etiketka.api";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";

import { IEtiketka } from "~/src/entities/etiketka/model";

interface Props {
  initProductInfo: IEtiketka;
}

export const useEtiketka = ({ initProductInfo }: Props) => {
  const { loaded } = useAppSelector(selectNavigation);
  const [productInfo, setProductInfo] = useState<IEtiketka>(initProductInfo);
  const [loading, setLoading] = useState<boolean>(false);

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
    loading: loading || !loaded,
    productInfo,
    updateInfo,
  };
};
