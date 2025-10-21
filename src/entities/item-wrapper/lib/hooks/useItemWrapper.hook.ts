import { useCallback, useState } from "react";

import { getProductById } from "~/src/entities/etiketka/lib/api/etiketka.api";
import { IEtiketka } from "~/src/entities/etiketka/model";

interface Props {
  initInfo: IEtiketka;
}

export const useItemWrapper = ({ initInfo }: Props) => {
  const [itemInfo, setItemInfo] = useState<IEtiketka>(initInfo);

  const updateInfo = useCallback(async () => {
    try {
      const res = await getProductById(itemInfo.id);
      setItemInfo(res);
    } catch (err) {
      console.error(err);
    }
  }, [itemInfo.id]);

  return {
    itemInfo,
    updateInfo,
  };
};
