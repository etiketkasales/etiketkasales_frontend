import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  getEtiketkaByUrl,
  getSpecificationsById,
} from "~/src/entities/etiketka/lib/api/etiketka.api";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";

import {
  CharacterI,
  EtiketkaI,
} from "~/src/entities/etiketka/model/etiketka.interface";
import { etiketkaSkeleton } from "~/src/entities/etiketka/model/etiketka.skeleton";
import { MessageI } from "~/src/shared/model/shared.interface";
import { useInitializeEtiketka } from "./useInitializeEtiketka.hook";

export const useEtiketka = () => {
  const { url } = useParams();
  const [etiketkaInfo, setEtiketkaInfo] = useState<EtiketkaI>(etiketkaSkeleton);
  const [specs, setSpec] = useState<CharacterI[]>([]);
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

  const handleGetEtiketka = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        if (!url) return;
        const res = await getEtiketkaByUrl(url.toString());
        if (!res) {
          errorHandler("Этикетка не найдена", "global");
          return;
        }
        setEtiketkaInfo(res);
      },
      setError,
    });
  }, [url]);

  const handleGetSpecialities = async (item_id: number) => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        const response = await getSpecificationsById(item_id);
        if (!response) return;
        setSpec(response);
      },
      setError,
    });
  };

  useEffect(() => {
    handleGetEtiketka();
  }, [url, handleGetEtiketka]);

  useEffect(() => {
    if (!etiketkaInfo.id) return;
    handleGetSpecialities(etiketkaInfo.id);
  }, [etiketkaInfo.id]);

  return {
    etiketkaInfo,
    loading,
    error,
    handleGetEtiketka,
    specs,
  };
};
