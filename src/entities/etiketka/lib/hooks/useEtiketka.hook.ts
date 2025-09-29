import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";

import {
  CharacterI,
  EtiketkaI,
} from "~/src/entities/etiketka/model/etiketka.interface";
import { etiketkaSkeleton } from "~/src/entities/etiketka/model/etiketka.skeleton";
import { MessageI } from "~/src/shared/model/shared.interface";

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
      },
      setError,
    });
  }, [url]);

  const handleGetSpecialities = async (item_id: number) => {
    await promiseWrapper({
      setLoading,
      callback: async () => {},
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
